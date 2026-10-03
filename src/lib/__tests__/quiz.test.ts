import { describe, expect, it } from "vitest";
import { getSkillLearning, lessons } from "@/data/learning";
import { roleQuestions } from "@/data/learning/role-questions";
import { roles } from "@/data/roles";
import { earnedLevel, emptyProgress } from "@/lib/learning";
import { buildSkillQuiz, isPass, passMark, quizReducer, startSession, summarize, type QuizSession } from "@/lib/quiz";

const allRoleSkills = roles.flatMap((role) => role.categories.flatMap((c) => c.skills.map((skill) => ({ role, skill }))));

describe("quiz composition", () => {
  it.each(allRoleSkills.map(({ role, skill }) => [`${role.slug}/${skill.id}`, role, skill] as const))(
    "%s has a well-formed, role-specific quiz",
    (_, role, skill) => {
      const learning = getSkillLearning(role.slug, skill.id)!;
      const quiz = buildSkillQuiz(role.slug, skill, learning.lesson);

      expect(quiz.filter((q) => q.level === "Core")).toHaveLength(learning.lesson.quiz.length);
      expect(quiz.filter((q) => q.level === "Applied")).toHaveLength(1);
      // Advanced questions only (and always) for skills this role needs at Mastered.
      expect(quiz.filter((q) => q.level === "Advanced")).toHaveLength(skill.required === 3 ? 1 : 0);

      for (const q of quiz) {
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
        expect(new Set(q.options).size).toBe(q.options.length);
        expect(q.explanation.length).toBeGreaterThan(10);
      }
      expect(new Set(quiz.map((q) => q.question)).size).toBe(quiz.length);
    },
  );

  it("never gives two roles an identical quiz, even when they share a lesson", () => {
    const signatures = new Map<string, string>();
    for (const { role, skill } of allRoleSkills) {
      const quiz = buildSkillQuiz(role.slug, skill, getSkillLearning(role.slug, skill.id)!.lesson);
      const signature = quiz.map((q) => q.question).join("|");
      expect(signatures.has(signature), `${role.slug}/${skill.id} duplicates ${signatures.get(signature)}`).toBe(false);
      signatures.set(signature, `${role.slug}/${skill.id}`);
    }
  });

  it("doesn't reuse any question text across lessons or role questions", () => {
    const texts = [
      ...Object.values(lessons).flatMap((l) => l.quiz.map((q) => q.question)),
      ...Object.values(roleQuestions).flatMap((skills) =>
        Object.values(skills).flatMap((s) => [s.applied[0], ...(s.advanced ? [s.advanced[0]] : [])]),
      ),
    ];
    const seen = new Set<string>();
    const dupes = texts.filter((t) => (seen.has(t) ? true : (seen.add(t), false)));
    expect(dupes).toEqual([]);
  });

  it("has no role questions for skills that don't exist", () => {
    for (const [roleSlug, skills] of Object.entries(roleQuestions)) {
      const role = roles.find((r) => r.slug === roleSlug)!;
      const ids = new Set(role.categories.flatMap((c) => c.skills.map((s) => s.id)));
      for (const id of Object.keys(skills)) expect(ids.has(id), `${roleSlug}/${id}`).toBe(true);
    }
  });
});

describe("pass mark", () => {
  it("is two thirds, rounded up", () => {
    expect(passMark(3)).toBe(2);
    expect(passMark(4)).toBe(3);
    expect(passMark(5)).toBe(4);
    expect(isPass(2, 4)).toBe(false);
    expect(isPass(3, 4)).toBe(true);
    expect(isPass(0, 0)).toBe(false);
  });
});

describe("quiz session", () => {
  const role = roles.find((r) => r.slug === "backend-developer")!;
  const skill = role.categories.flatMap((c) => c.skills).find((s) => s.id === "databases-sql")!; // needs Mastered → 5 questions
  const questions = buildSkillQuiz(role.slug, skill, getSkillLearning(role.slug, skill.id)!.lesson);
  const seeded = () => {
    let x = 42;
    return () => ((x = (x * 16807) % 2147483647) - 1) / 2147483646;
  };
  const answerCurrent = (s: QuizSession, correct: boolean) => {
    const q = questions[s.order[s.index]];
    const option = correct ? q.answer : (q.answer + 1) % q.options.length;
    return quizReducer(quizReducer(s, { type: "select", option }), { type: "submit" });
  };

  it("shuffles options as a permutation and keeps every question", () => {
    const s = startSession(questions, 1, seeded());
    expect(s.order).toEqual(questions.map((_, i) => i));
    s.optionOrder.forEach((order, i) => expect([...order].sort()).toEqual(questions[i].options.map((_, j) => j)));
  });

  it("requires an answer before submitting, and a submission before moving on", () => {
    let s = startSession(questions, 1, seeded());
    expect(quizReducer(s, { type: "submit" })).toBe(s); // nothing selected
    expect(quizReducer(s, { type: "next" })).toBe(s); // not submitted
    s = quizReducer(s, { type: "select", option: 0 });
    expect(quizReducer(s, { type: "next" }).index).toBe(0);
    s = quizReducer(s, { type: "submit" });
    expect(quizReducer(s, { type: "next" }).index).toBe(1);
  });

  it("locks an answer once submitted", () => {
    let s = startSession(questions, 1, seeded());
    s = answerCurrent(s, true);
    const locked = quizReducer(s, { type: "select", option: (questions[0].answer + 1) % questions[0].options.length });
    expect(locked.selected[0]).toBe(questions[0].answer);
  });

  it("navigates back to answered questions but not ahead to unanswered ones", () => {
    let s = startSession(questions, 1, seeded());
    s = answerCurrent(s, true);
    s = quizReducer(s, { type: "next" });
    expect(quizReducer(s, { type: "prev" }).index).toBe(0);
    expect(quizReducer(s, { type: "goto", index: 0 }).index).toBe(0);
    expect(quizReducer(s, { type: "goto", index: 3 }).index).toBe(1); // unanswered, not reachable
    expect(quizReducer({ ...s, index: 0 }, { type: "prev" }).index).toBe(0);
  });

  it("scores answers, only finishes when all are answered, and summarizes by level", () => {
    let s = startSession(questions, 1, seeded());
    const pattern = [true, false, true, true, true];
    pattern.forEach((correct, i) => {
      s = answerCurrent(s, correct);
      if (i < pattern.length - 1) {
        expect(quizReducer(s, { type: "finish" }).finished).toBe(false);
        s = quizReducer(s, { type: "next" });
      }
    });
    s = quizReducer(s, { type: "finish" });
    expect(s.finished).toBe(true);

    const summary = summarize(questions, s);
    expect(summary).toMatchObject({ score: 4, total: 5, percent: 80, passed: true, perfect: false });
    expect(summary.missed).toEqual([questions[1]]);
    expect(summary.byLevel).toEqual([
      { level: "Core", correct: 2, total: 3 },
      { level: "Applied", correct: 1, total: 1 },
      { level: "Advanced", correct: 1, total: 1 },
    ]);
  });

  it("starts a clean, reshuffled attempt on retry", () => {
    let s = startSession(questions, 1, seeded());
    s = answerCurrent(s, true);
    const retried = quizReducer(s, { type: "retry", questions, random: seeded() });
    expect(retried.attempt).toBe(2);
    expect(retried.index).toBe(0);
    expect(retried.selected.every((x) => x === null)).toBe(true);
    expect(retried.submitted.every((x) => !x)).toBe(true);
    expect(retried.finished).toBe(false);
  });
});

describe("completion rule", () => {
  const lesson = lessons["docker"];
  const allTopics = lesson.topics.map((t) => t.id);
  const allProjects = lesson.projects.map((p) => p.id);
  const quiz = (best: number, total: number) => ({ best, total, last: best, attempts: 1, lastAt: "2026-10-02T00:00:00Z" });

  it("never raises a level from a quiz alone, even with full marks", () => {
    expect(earnedLevel(lesson, { ...emptyProgress, quiz: quiz(4, 4) })).toBe(0);
  });

  it("earns Familiar from half the topics", () => {
    expect(earnedLevel(lesson, { ...emptyProgress, topics: allTopics.slice(0, Math.ceil(allTopics.length / 2)) })).toBe(1);
  });

  it("earns Comfortable only with every topic, a project and a passing quiz", () => {
    expect(earnedLevel(lesson, { topics: allTopics, projects: [allProjects[0]], quiz: quiz(2, 4) })).toBe(1); // not passed
    expect(earnedLevel(lesson, { topics: allTopics, projects: [], quiz: quiz(4, 4) })).toBe(1); // no project
    expect(earnedLevel(lesson, { topics: allTopics, projects: [allProjects[0]], quiz: quiz(3, 4) })).toBe(2);
  });

  it("earns Mastered only with everything done and full marks", () => {
    expect(earnedLevel(lesson, { topics: allTopics, projects: allProjects, quiz: quiz(3, 4) })).toBe(2);
    expect(earnedLevel(lesson, { topics: allTopics, projects: allProjects, quiz: quiz(4, 4) })).toBe(3);
  });
});
