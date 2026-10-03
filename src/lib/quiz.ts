import type { Lesson } from "@/data/learning";
import { roleQuestions } from "@/data/learning/role-questions";
import type { Skill } from "@/data/roles";

/**
 * "Test My Knowledge" quizzes. Each role skill gets:
 *   - Core:     the skill's lesson questions (shared by any role learning the same skill)
 *   - Applied:  a scenario written for this role, so roles never get an identical quiz
 *   - Advanced: an edge-case question, only for skills the role needs at Mastered
 *
 * A quiz measures understanding; on its own it never changes a skill's level. See lib/learning.ts for the rule
 * that combines it with topics and projects.
 */

export type QuestionLevel = "Core" | "Applied" | "Advanced";

export type QuizQuestion = {
  id: string;
  level: QuestionLevel;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export function buildSkillQuiz(roleSlug: string, skill: Skill, lesson: Lesson): QuizQuestion[] {
  const core: QuizQuestion[] = lesson.quiz.map((q, i) => ({ id: `core-${i}`, level: "Core", ...q }));
  const extra = roleQuestions[roleSlug]?.[skill.id];
  const toQuestion = (id: string, level: QuestionLevel, [question, options, answer, explanation]: [string, string[], number, string]) => ({
    id,
    level,
    question,
    options,
    answer,
    explanation,
  });
  const questions = [...core];
  if (extra?.applied) questions.push(toQuestion("applied", "Applied", extra.applied));
  if (skill.required === 3 && extra?.advanced) questions.push(toQuestion("advanced", "Advanced", extra.advanced));
  return questions;
}

/** Correct answers needed to pass: two thirds, rounded up (3 of 4, 4 of 5). */
export function passMark(total: number) {
  return Math.ceil((total * 2) / 3);
}

export function isPass(score: number, total: number) {
  return total > 0 && score >= passMark(total);
}

// ---------------------------------------------------------------------------------------------------------------
// Quiz session state: one question at a time, submit for immediate feedback, move back and forth, retry.

export type QuizSession = {
  /** Question order for this attempt, and option order for each question (both shuffled per attempt). */
  order: number[];
  optionOrder: number[][];
  index: number;
  /** Selected option (original index) per question position, before or after submitting. */
  selected: (number | null)[];
  submitted: boolean[];
  finished: boolean;
  attempt: number;
};

export type QuizAction =
  | { type: "select"; option: number }
  | { type: "submit" }
  | { type: "next" }
  | { type: "prev" }
  | { type: "goto"; index: number }
  | { type: "finish" }
  | { type: "retry"; questions: QuizQuestion[]; random?: () => number };

function shuffle(n: number, random: () => number) {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * New attempt. Core questions keep their teaching order and come first; option order is shuffled so an answer's
 * position never gives it away.
 */
export function startSession(questions: QuizQuestion[], attempt = 1, random: () => number = Math.random): QuizSession {
  return {
    order: questions.map((_, i) => i),
    optionOrder: questions.map((q) => shuffle(q.options.length, random)),
    index: 0,
    selected: questions.map(() => null),
    submitted: questions.map(() => false),
    finished: false,
    attempt,
  };
}

export function quizReducer(state: QuizSession, action: QuizAction): QuizSession {
  const last = state.order.length - 1;
  switch (action.type) {
    case "select": {
      // Answers are locked once submitted.
      if (state.finished || state.submitted[state.index]) return state;
      const selected = [...state.selected];
      selected[state.index] = action.option;
      return { ...state, selected };
    }
    case "submit": {
      if (state.selected[state.index] === null || state.submitted[state.index]) return state;
      const submitted = [...state.submitted];
      submitted[state.index] = true;
      return { ...state, submitted };
    }
    case "next":
      // Can only move past a question once it's been answered.
      if (!state.submitted[state.index] || state.index >= last) return state;
      return { ...state, index: state.index + 1 };
    case "prev":
      return state.index > 0 ? { ...state, index: state.index - 1 } : state;
    case "goto": {
      // Jump to any answered question, or the first unanswered one.
      const firstOpen = state.submitted.indexOf(false);
      const allowed = action.index >= 0 && action.index <= last && (state.submitted[action.index] || action.index === firstOpen);
      return allowed ? { ...state, index: action.index } : state;
    }
    case "finish":
      return state.submitted.every(Boolean) ? { ...state, finished: true } : state;
    case "retry":
      return startSession(action.questions, state.attempt + 1, action.random);
  }
}

export function sessionScore(questions: QuizQuestion[], state: QuizSession) {
  return state.order.reduce((n, qi, pos) => n + (state.submitted[pos] && state.selected[pos] === questions[qi].answer ? 1 : 0), 0);
}

export type QuizSummary = {
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  perfect: boolean;
  byLevel: { level: QuestionLevel; correct: number; total: number }[];
  missed: QuizQuestion[];
};

export function summarize(questions: QuizQuestion[], state: QuizSession): QuizSummary {
  const score = sessionScore(questions, state);
  const total = questions.length;
  const levels: QuestionLevel[] = ["Core", "Applied", "Advanced"];
  const correctAt = (pos: number) => state.selected[pos] === questions[state.order[pos]].answer;
  return {
    score,
    total,
    percent: total ? Math.round((score / total) * 100) : 0,
    passed: isPass(score, total),
    perfect: score === total,
    byLevel: levels
      .map((level) => {
        const positions = state.order.map((qi, pos) => ({ qi, pos })).filter(({ qi }) => questions[qi].level === level);
        return { level, total: positions.length, correct: positions.filter(({ pos }) => correctAt(pos)).length };
      })
      .filter((l) => l.total > 0),
    missed: state.order.filter((qi, pos) => !correctAt(pos)).map((qi) => questions[qi]),
  };
}
