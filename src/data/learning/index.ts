import { aiLessons } from "./ai";
import { cloudLessons } from "./cloud";
import { dataLessons } from "./data";
import { engineeringLessons } from "./engineering";
import { infraLessons } from "./infra";
import linkStatus from "./link-status.json";
import { learningMap } from "./map";
import { securityLessons } from "./security";
import type { Lesson, RawLesson, RawLessons } from "./types";
import { webBackendLessons } from "./web-backend";
import { frontendLessons } from "./web-frontend";

export type { Difficulty, Lesson, LessonQuestion, Project, Resource, Topic } from "./types";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function normalize(id: string, raw: RawLesson): Lesson {
  return {
    id,
    overview: raw.overview,
    topics: raw.topics.map(([title, detail]) => ({ id: slug(title), title, detail })),
    resources: raw.resources.map(([title, url, provider, kind]) => ({ title, url, provider, kind })),
    projects: raw.projects.map(([title, difficulty, hours, description]) => ({ id: slug(title), title, difficulty, hours, description })),
    quiz: raw.quiz.map(([question, options, answer, explanation]) => ({ question, options, answer, explanation })),
  };
}

const all: RawLessons = {
  ...frontendLessons,
  ...webBackendLessons,
  ...engineeringLessons,
  ...dataLessons,
  ...aiLessons,
  ...infraLessons,
  ...cloudLessons,
  ...securityLessons,
};

export const lessons: Record<string, Lesson> = Object.fromEntries(Object.entries(all).map(([id, raw]) => [id, normalize(id, raw)]));

export type SkillLearning = { lesson: Lesson; why: string };

/** The lesson and role-specific "why it matters" for a skill in a role, if one exists. */
export function getSkillLearning(roleSlug: string, skillId: string): SkillLearning | undefined {
  const entry = learningMap[roleSlug]?.[skillId];
  if (!entry) return undefined;
  const lesson = lessons[entry[0]];
  return lesson ? { lesson, why: entry[1] } : undefined;
}

type LinkResult = { ok: boolean; status: number; method?: "automated" | "browser"; on?: string };
const linkResults = linkStatus.results as Record<string, LinkResult>;

/**
 * Result of the last link check for a resource (scripts/check-links.mjs). `null` means it hasn't been verified:
 * either it failed or the site blocks automated checks and nobody has opened it in a browser yet.
 */
export function linkCheck(url: string): { on: string; method: "automated" | "browser" } | null {
  const r = linkResults[url];
  if (!r?.ok || !r.on) return null;
  return { on: r.on, method: r.method ?? "automated" };
}
