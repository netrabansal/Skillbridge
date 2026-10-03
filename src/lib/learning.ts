import type { Lesson } from "@/data/learning";
import type { Level } from "./assessment";
import { isPass } from "./quiz";

/**
 * Learning progress for one skill: topics and projects the user has completed, and their knowledge-check results.
 * Progress earns proficiency, which is written to the shared skill level so the roadmap, dashboard and
 * assessment all stay consistent:
 *
 *   Familiar     at least half the topics
 *   Comfortable  every topic, at least one project, and the quiz passed (two thirds, rounded up)
 *   Mastered     every topic, every project, and a perfect quiz score
 *
 * Earned levels only ever raise a skill's level; they never lower one the user set themselves.
 */

export type QuizAttempt = { score: number; total: number; at: string };

export type QuizRecord = {
  /** Best score for the current quiz length (reset if the quiz's length changes). */
  best: number;
  total: number;
  last: number;
  attempts: number;
  lastAt: string;
  /** Most recent attempts, newest first (kept to 10). */
  history?: QuizAttempt[];
};

export type SkillProgress = { topics: string[]; projects: string[]; quiz?: QuizRecord; updatedAt?: string };

export const emptyProgress: SkillProgress = { topics: [], projects: [] };

export function quizPassed(quiz: QuizRecord | undefined) {
  return Boolean(quiz && isPass(quiz.best, quiz.total));
}

function counts(lesson: Lesson, p: SkillProgress) {
  const topicIds = new Set(lesson.topics.map((t) => t.id));
  const projectIds = new Set(lesson.projects.map((x) => x.id));
  return {
    topicsDone: p.topics.filter((id) => topicIds.has(id)).length,
    topicsTotal: lesson.topics.length,
    projectsDone: p.projects.filter((id) => projectIds.has(id)).length,
    projectsTotal: lesson.projects.length,
  };
}

export function earnedLevel(lesson: Lesson, p: SkillProgress): Level {
  const c = counts(lesson, p);
  const allTopics = c.topicsDone === c.topicsTotal;
  const perfect = Boolean(p.quiz && p.quiz.best === p.quiz.total);
  if (allTopics && c.projectsDone === c.projectsTotal && perfect) return 3;
  if (allTopics && c.projectsDone >= 1 && quizPassed(p.quiz)) return 2;
  if (c.topicsDone >= Math.ceil(c.topicsTotal / 2)) return 1;
  return 0;
}

/** Share of the lesson completed: topics 50%, projects 30%, best quiz score 20%. */
export function learningPercent(lesson: Lesson, p: SkillProgress) {
  const c = counts(lesson, p);
  const quizShare = p.quiz && p.quiz.total ? p.quiz.best / p.quiz.total : 0;
  const value = 0.5 * (c.topicsDone / c.topicsTotal) + 0.3 * (c.projectsDone / c.projectsTotal) + 0.2 * quizShare;
  return Math.round(value * 100);
}

export function progressSummary(lesson: Lesson, p: SkillProgress) {
  return { ...counts(lesson, p), quiz: p.quiz, percent: learningPercent(lesson, p), earned: earnedLevel(lesson, p) };
}

/**
 * What the user still needs to do to earn the level above their current one through learning
 * (null when they're already at Mastered).
 */
export function nextEarnStep(lesson: Lesson, p: SkillProgress, currentLevel: Level): { level: Level; steps: string[] } | null {
  const c = counts(lesson, p);
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const target = (Math.max(currentLevel, earnedLevel(lesson, p)) + 1) as Level;
  const topicsLeft = c.topicsTotal - c.topicsDone;
  const steps: string[] = [];
  if (target === 1) {
    steps.push(`complete ${plural(Math.ceil(c.topicsTotal / 2) - c.topicsDone, "more topic")}`);
  } else if (target === 2) {
    if (topicsLeft) steps.push(`complete the remaining ${plural(topicsLeft, "topic")}`);
    if (c.projectsDone < 1) steps.push("finish a project");
    if (!quizPassed(p.quiz)) steps.push("pass the knowledge check");
  } else if (target === 3) {
    if (topicsLeft) steps.push(`complete the remaining ${plural(topicsLeft, "topic")}`);
    if (c.projectsDone < c.projectsTotal) steps.push(`finish ${c.projectsDone ? plural(c.projectsTotal - c.projectsDone, "more project") : `all ${c.projectsTotal} projects`}`);
    if (!p.quiz || p.quiz.best < p.quiz.total) steps.push("score full marks on the knowledge check");
  } else {
    return null;
  }
  return { level: target, steps };
}
