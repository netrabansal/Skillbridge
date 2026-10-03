import type { Role, Skill } from "@/data/roles";
import { hoursOptions, type HoursPerWeek } from "./setup";

export type Level = 0 | 1 | 2 | 3;

export const levels: { value: Level; label: string; description: string }[] = [
  { value: 0, label: "Not Started", description: "I haven't learned this yet" },
  { value: 1, label: "Familiar", description: "I know the basics but still need guidance" },
  { value: 2, label: "Comfortable", description: "I can use it on my own for real tasks" },
  { value: 3, label: "Mastered", description: "I could teach it or handle tricky edge cases" },
];

export const levelLabel = (level: Level) => levels[level].label;

/** The level the role needs for this skill (defined per skill in data/skills.ts). */
export function targetLevel(skill: Skill): Level {
  return skill.required;
}

export type Ratings = Record<string, Level>;
export type QuizAnswers = Record<string, number>;

export function assessmentProgress(role: Role, ratings: Ratings) {
  const byCategory = role.categories.map((c) => ({
    category: c,
    rated: c.skills.filter((s) => ratings[s.id] !== undefined).length,
    total: c.skills.length,
  }));
  const rated = byCategory.reduce((n, c) => n + c.rated, 0);
  const total = byCategory.reduce((n, c) => n + c.total, 0);
  return { rated, total, percent: total ? Math.round((rated / total) * 100) : 0, byCategory };
}

/** skillId → whether the user answered that skill's quiz question correctly (only for answered questions). */
export function quizResults(role: Role, quiz: QuizAnswers): Map<string, boolean> {
  const results = new Map<string, boolean>();
  for (const q of role.quiz) {
    if (quiz[q.id] !== undefined) results.set(q.skillId, quiz[q.id] === q.answer);
  }
  return results;
}

/** Months to cover `hours` of learning at the user's weekly pace, as a range. */
export function monthsAtPace(hours: number, hoursPerWeek: HoursPerWeek) {
  const weekly = hoursOptions.find((o) => o.value === hoursPerWeek)?.hours ?? 7.5;
  const months = hours / (weekly * 4.33);
  if (months < 0.75) return { low: 0, high: 1 };
  return { low: Math.max(1, Math.round(months * 0.85)), high: Math.max(1, Math.round(months * 1.15)) };
}

export function formatMonths({ low, high }: { low: number; high: number }) {
  if (high <= 1) return "under a month";
  if (low === high) return `about ${low} months`;
  return `${low}–${high} months`;
}
