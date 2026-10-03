import { roles } from "@/data/roles";
import type { Level } from "./assessment";
import type { QuizAttempt, QuizRecord, SkillProgress } from "./learning";
import type { LearningState } from "./roadmap";
import { experienceOptions, hoursOptions, timelineOptions, type CareerSetup } from "./setup";
import type { ActivityEntry, AppState, RoadmapMeta, RoleAssessment } from "./store";
import { localDay } from "./streak";

/**
 * Local persistence for SkillBridge. There is no backend or account system yet, so progress is saved in this
 * browser's localStorage under a single versioned key. Everything loaded (from storage or an imported backup) is
 * validated and normalised here, so a damaged or hand-edited value can't break the app.
 *
 * When accounts arrive, a server adapter can replace localStorage behind lib/store.ts without touching pages.
 */

export const STORAGE_KEY = "sb-state";
/** Where unreadable saved data is moved, so it's never silently overwritten. */
export const UNREADABLE_KEY = "sb-state-unreadable";
export const SCHEMA_VERSION = 1;

export const emptyState: AppState = {
  version: SCHEMA_VERSION,
  setup: null,
  assessments: {},
  roadmaps: {},
  learning: {},
  activity: [],
  learningDays: [],
};

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === "string";
const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const isIso = (v: unknown): v is string => isStr(v) && !Number.isNaN(Date.parse(v));
const isLevel = (v: unknown): v is Level => v === 0 || v === 1 || v === 2 || v === 3;
const strings = (v: unknown) => (Array.isArray(v) ? [...new Set(v.filter(isStr))] : []);

const roleSkills = new Map(roles.map((r) => [r.slug, new Set(r.categories.flatMap((c) => c.skills.map((s) => s.id)))]));
const knownRole = (slug: string) => roleSkills.has(slug);

function normalizeSetup(v: unknown): CareerSetup | null {
  if (!isObj(v) || !isStr(v.roleSlug) || !knownRole(v.roleSlug)) return null;
  const experience = experienceOptions.find((o) => o.value === v.experience)?.value ?? "new";
  const hoursPerWeek = hoursOptions.find((o) => o.value === v.hoursPerWeek)?.value ?? "8";
  const timeline = timelineOptions.find((o) => o.value === v.timeline)?.value ?? "flexible";
  return { roleSlug: v.roleSlug, experience, hoursPerWeek, timeline, savedAt: isIso(v.savedAt) ? v.savedAt : new Date(0).toISOString() };
}

function normalizeAssessment(slug: string, v: unknown): RoleAssessment | null {
  if (!isObj(v)) return null;
  const skills = roleSkills.get(slug)!;
  const ratings: RoleAssessment["ratings"] = {};
  if (isObj(v.ratings)) for (const [id, level] of Object.entries(v.ratings)) if (skills.has(id) && isLevel(level)) ratings[id] = level;
  const quiz: RoleAssessment["quiz"] = {};
  if (isObj(v.quiz)) for (const [id, choice] of Object.entries(v.quiz)) if (isNum(choice)) quiz[id] = choice;
  return { ratings, quiz, updatedAt: isIso(v.updatedAt) ? v.updatedAt : new Date(0).toISOString() };
}

function normalizeQuiz(v: unknown): QuizRecord | undefined {
  if (!isObj(v) || !isNum(v.best) || !isNum(v.total) || v.total <= 0) return undefined;
  const history = Array.isArray(v.history)
    ? v.history.filter((h): h is QuizAttempt => isObj(h) && isNum(h.score) && isNum(h.total) && isIso(h.at)).slice(0, 10)
    : [];
  return {
    best: Math.min(v.best, v.total),
    total: v.total,
    last: isNum(v.last) ? v.last : v.best,
    attempts: isNum(v.attempts) ? v.attempts : 1,
    lastAt: isIso(v.lastAt) ? v.lastAt : new Date(0).toISOString(),
    history,
  };
}

function normalizeLearning(slug: string, v: unknown): LearningState | null {
  if (!isObj(v)) return null;
  const skills = roleSkills.get(slug)!;
  const progress: Record<string, SkillProgress> = {};
  if (isObj(v.skills)) {
    for (const [id, p] of Object.entries(v.skills)) {
      if (!skills.has(id) || !isObj(p)) continue;
      progress[id] = {
        topics: strings(p.topics),
        projects: strings(p.projects),
        quiz: normalizeQuiz(p.quiz),
        updatedAt: isIso(p.updatedAt) ? p.updatedAt : undefined,
      };
    }
  }
  return {
    started: strings(v.started).filter((id) => skills.has(id)),
    current: isStr(v.current) && skills.has(v.current) ? v.current : null,
    skills: progress,
  };
}

const ACTIVITY_KINDS = new Set(["quiz", "topic", "project", "level-up", "skill-complete"]);

function normalizeActivity(v: unknown): ActivityEntry[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter(
      (a): a is ActivityEntry =>
        isObj(a) &&
        isStr(a.id) &&
        isIso(a.at) &&
        isStr(a.roleSlug) &&
        knownRole(a.roleSlug) &&
        isStr(a.skillId) &&
        isStr(a.skillName) &&
        isStr(a.kind) &&
        ACTIVITY_KINDS.has(a.kind),
    )
    .slice(0, 100);
}

/** Days from recorded quiz attempts, for data saved before learning days existed. Nothing is guessed. */
function backfillLearningDays(activity: ActivityEntry[], learning: Record<string, LearningState>): string[] {
  const days = new Set<string>();
  for (const a of activity) if (a.kind === "quiz") days.add(localDay(new Date(a.at)));
  for (const l of Object.values(learning)) {
    for (const p of Object.values(l.skills ?? {})) for (const h of p.quiz?.history ?? []) days.add(localDay(new Date(h.at)));
  }
  return [...days].sort();
}

const LEARNING_KINDS = new Set(["quiz", "topic", "project"]);

/** Days with recorded learning for one career (or every career but it), from activity and quiz history. */
function evidenceDays(state: AppState, keep: (roleSlug: string) => boolean): Set<string> {
  const days = new Set<string>();
  for (const a of state.activity) if (keep(a.roleSlug) && LEARNING_KINDS.has(a.kind)) days.add(localDay(new Date(a.at)));
  for (const [slug, l] of Object.entries(state.learning)) {
    if (!keep(slug)) continue;
    for (const p of Object.values(l.skills ?? {})) for (const h of p.quiz?.history ?? []) days.add(localDay(new Date(h.at)));
  }
  return days;
}

/**
 * Learning days to keep when a career is deleted: drop a day only if its sole recorded evidence belonged to that
 * career. Older days with no surviving record either way are kept, since they were genuinely recorded.
 */
export function learningDaysWithout(state: AppState, roleSlug: string): string[] {
  const deleted = evidenceDays(state, (slug) => slug === roleSlug);
  const remaining = evidenceDays(state, (slug) => slug !== roleSlug);
  return state.learningDays.filter((d) => !deleted.has(d) || remaining.has(d));
}

function perRole<T>(v: unknown, fn: (slug: string, value: unknown) => T | null): Record<string, T> {
  const out: Record<string, T> = {};
  if (!isObj(v)) return out;
  for (const [slug, value] of Object.entries(v)) {
    if (!knownRole(slug)) continue;
    const n = fn(slug, value);
    if (n) out[slug] = n;
  }
  return out;
}

/** Validate and clean any saved or imported value. Returns null only if it isn't SkillBridge data at all. */
export function normalizeState(input: unknown): AppState | null {
  if (!isObj(input)) return null;
  const learning = perRole(input.learning, normalizeLearning);
  const activity = normalizeActivity(input.activity);
  const learningDays = Array.isArray(input.learningDays)
    ? strings(input.learningDays).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort()
    : backfillLearningDays(activity, learning);
  return {
    version: SCHEMA_VERSION,
    setup: normalizeSetup(input.setup),
    assessments: perRole(input.assessments, normalizeAssessment),
    roadmaps: perRole<RoadmapMeta>(input.roadmaps, (_, v) => (isObj(v) && isIso(v.generatedAt) ? { generatedAt: v.generatedAt } : null)),
    learning,
    activity,
    learningDays,
  };
}

export type LoadResult = { state: AppState; problem: null | "unreadable" };

/** Parse the raw stored string. Damaged data is reported, never thrown. */
export function loadState(raw: string | null): LoadResult {
  if (raw === null) return { state: emptyState, problem: null };
  try {
    const state = normalizeState(JSON.parse(raw));
    return state ? { state, problem: null } : { state: emptyState, problem: "unreadable" };
  } catch {
    return { state: emptyState, problem: "unreadable" };
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Backups: a JSON file the user can download and import again (e.g. to move browsers).

export const BACKUP_APP_ID = "skillbridge";

export function createBackup(state: AppState) {
  return JSON.stringify({ app: BACKUP_APP_ID, schemaVersion: SCHEMA_VERSION, exportedAt: new Date().toISOString(), data: state }, null, 2);
}

export type BackupResult = { ok: true; state: AppState } | { ok: false; error: string };

export function readBackup(text: string): BackupResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: "That file isn't valid JSON." };
  }
  if (!isObj(parsed) || parsed.app !== BACKUP_APP_ID || !("data" in parsed)) {
    return { ok: false, error: "That file isn't a SkillBridge backup." };
  }
  if (isNum(parsed.schemaVersion) && parsed.schemaVersion > SCHEMA_VERSION) {
    return { ok: false, error: "That backup comes from a newer version of SkillBridge." };
  }
  const state = normalizeState(parsed.data);
  return state ? { ok: true, state } : { ok: false, error: "The backup's contents couldn't be read." };
}
