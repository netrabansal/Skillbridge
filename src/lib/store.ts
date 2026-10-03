"use client";

import { useSyncExternalStore } from "react";
import type { Lesson } from "@/data/learning";
import type { Level, QuizAnswers, Ratings } from "./assessment";
import { earnedLevel, emptyProgress, type SkillProgress } from "./learning";
import { emptyState, learningDaysWithout, loadState, STORAGE_KEY, UNREADABLE_KEY } from "./persistence";
import { isPass } from "./quiz";
import type { LearningState } from "./roadmap";
import type { CareerSetup } from "./setup";
import { localDay } from "./streak";

/**
 * SkillBridge's shared application state: the career setup, a skill assessment per role, and learning
 * progress per role. One store, persisted to localStorage (see lib/persistence.ts), readable from any page via
 * useAppState(). This is local, per-browser storage, not an account: nothing is sent to a server.
 *
 * Skill levels live in one place (assessments[role].ratings). The assessment and the roadmap both read and
 * write them, so a change in either is reflected everywhere. Everything is keyed by role, so switching roles
 * never discards earlier answers.
 */

export type { QuizAnswers, Ratings };

export type RoleAssessment = {
  ratings: Ratings;
  quiz: QuizAnswers;
  updatedAt: string;
};

/** Marks that the user finished the assessment and generated their roadmap. The roadmap itself is computed live. */
export type RoadmapMeta = { generatedAt: string };

/** A recorded learning event, shown in recent activity (newest first, capped). */
export type ActivityEntry = { id: string; at: string; roleSlug: string; skillId: string; skillName: string } & (
  | { kind: "quiz"; score: number; total: number; passed: boolean }
  | { kind: "topic"; title: string }
  | { kind: "project"; title: string }
  /** Learning progress earned a higher level. */
  | { kind: "level-up"; level: Level }
  /** The user marked the skill complete. */
  | { kind: "skill-complete"; level: Level }
);

type NewActivity = ActivityEntry extends infer A ? (A extends ActivityEntry ? Omit<A, "id" | "at" | "roleSlug" | "skillId" | "skillName"> : never) : never;

export type AppState = {
  version: number;
  setup: CareerSetup | null;
  assessments: Record<string, RoleAssessment>;
  roadmaps: Record<string, RoadmapMeta>;
  learning: Record<string, LearningState>;
  activity: ActivityEntry[];
  /**
   * Local calendar days (YYYY-MM-DD) with at least one completed topic, finished project or knowledge check.
   * The learning streak is computed from these.
   */
  learningDays: string[];
};

const LEGACY_SETUP_KEY = "sb-career-setup";
const CHANGE_EVENT = "sb-state-change";
const ACTIVITY_LIMIT = 100;

// ---------------------------------------------------------------------------------------------------------------
// Storage health: whether progress is actually being saved, so the UI can say so honestly.

export type StorageHealth = {
  /** ok: saving normally · memory: storage is blocked or full, so changes last only until the tab closes */
  status: "ok" | "memory";
  /** Saved data couldn't be read; it was moved aside to UNREADABLE_KEY rather than overwritten. */
  recoveredUnreadable: boolean;
  lastSavedAt: string | null;
};

let health: StorageHealth = { status: "ok", recoveredUnreadable: false, lastSavedAt: null };
const HEALTH_EVENT = "sb-storage-health";

function setHealth(patch: Partial<StorageHealth>) {
  health = { ...health, ...patch };
  if (typeof window !== "undefined") window.dispatchEvent(new Event(HEALTH_EVENT));
}

export function useStorageHealth(): StorageHealth | undefined {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(HEALTH_EVENT, cb);
      return () => window.removeEventListener(HEALTH_EVENT, cb);
    },
    () => health,
    () => undefined,
  );
}

export function dismissRecoveredNotice() {
  setHealth({ recoveredUnreadable: false });
}

// ---------------------------------------------------------------------------------------------------------------
// Loading and saving

let cachedRaw: string | null | undefined;
let cachedState: AppState = emptyState;
/** Set when storage can't be written; the in-memory state is then the source of truth for this tab. */
let memoryOnly = false;

function readRaw(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) return raw;
    // One-time migration from the setup-only storage used before assessments existed.
    const legacy = localStorage.getItem(LEGACY_SETUP_KEY);
    if (legacy) {
      const migrated = JSON.stringify({ ...emptyState, setup: JSON.parse(legacy) });
      localStorage.setItem(STORAGE_KEY, migrated);
      localStorage.removeItem(LEGACY_SETUP_KEY);
      return migrated;
    }
    return null;
  } catch {
    // Storage is blocked (some private modes, strict privacy settings).
    memoryOnly = true;
    if (health.status !== "memory") setHealth({ status: "memory" });
    return null;
  }
}

function getSnapshot(): AppState {
  if (memoryOnly) return cachedState;
  const raw = readRaw();
  if (memoryOnly) return cachedState;
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    const { state, problem } = loadState(raw);
    if (problem === "unreadable" && raw !== null) {
      // Never overwrite data we couldn't read: keep a copy the user can download from Profile.
      try {
        localStorage.setItem(UNREADABLE_KEY, raw);
        localStorage.removeItem(STORAGE_KEY);
        cachedRaw = null;
      } catch {}
      setHealth({ recoveredUnreadable: true });
    }
    cachedState = state;
  }
  return cachedState;
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function update(fn: (state: AppState) => AppState) {
  const next = fn(getSnapshot());
  cachedState = next;
  if (!memoryOnly) {
    const raw = JSON.stringify(next);
    try {
      localStorage.setItem(STORAGE_KEY, raw);
      cachedRaw = raw;
      setHealth({ status: "ok", lastSavedAt: new Date().toISOString() });
    } catch {
      // Storage full or blocked: keep working in memory for this tab and tell the user.
      memoryOnly = true;
      setHealth({ status: "memory" });
    }
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** `undefined` during server rendering and before hydration; the persisted state afterwards. */
export function useAppState(): AppState | undefined {
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}

/** The raw text of data that couldn't be read, if any was set aside. */
export function readUnreadableData(): string | null {
  try {
    return localStorage.getItem(UNREADABLE_KEY);
  } catch {
    return null;
  }
}

/** The current state, for exporting a backup. */
export function snapshotState(): AppState {
  return getSnapshot();
}

// ---------------------------------------------------------------------------------------------------------------
// Updates

const now = () => new Date().toISOString();

function withAssessment(state: AppState, roleSlug: string, fn: (a: RoleAssessment) => Partial<RoleAssessment>): AppState {
  const current = state.assessments[roleSlug] ?? { ratings: {}, quiz: {}, updatedAt: now() };
  return {
    ...state,
    assessments: { ...state.assessments, [roleSlug]: { ...current, ...fn(current), updatedAt: now() } },
  };
}

/** Adds a learning event to recent activity; `countsForStreak` also records today as a learning day. */
function withActivity(
  s: AppState,
  base: { roleSlug: string; skillId: string; skillName: string },
  event: NewActivity,
  countsForStreak: boolean,
): AppState {
  const at = now();
  const entry = { ...base, ...event, id: `${at}-${base.skillId}-${event.kind}`, at } as ActivityEntry;
  const day = localDay();
  return {
    ...s,
    activity: [entry, ...s.activity].slice(0, ACTIVITY_LIMIT),
    learningDays: countsForStreak && !s.learningDays.includes(day) ? [...s.learningDays, day].sort() : s.learningDays,
  };
}

/** Outcome of a learning action, so the UI can give feedback. */
export type LearningResult = { raisedTo: Level | null };

/**
 * Applies a change to one skill's learning progress, marks the skill as started, records the activity, and raises
 * the shared skill level if the new progress has earned a higher one (never lowers it).
 */
function updateSkillProgress(
  roleSlug: string,
  skill: { id: string; name: string },
  lesson: Lesson,
  change: (p: SkillProgress) => SkillProgress,
  event: NewActivity | null,
): LearningResult {
  const skillId = skill.id;
  const base = { roleSlug, skillId, skillName: skill.name };
  let raisedTo: Level | null = null;
  update((s) => {
    const l = s.learning[roleSlug] ?? { started: [], current: null };
    const progress = { ...change(l.skills?.[skillId] ?? emptyProgress), updatedAt: now() };
    const started = l.started.includes(skillId) ? l.started : [...l.started, skillId];
    let next: AppState = {
      ...s,
      learning: { ...s.learning, [roleSlug]: { ...l, started, skills: { ...l.skills, [skillId]: progress } } },
    };
    const earned = earnedLevel(lesson, progress);
    const currentLevel = s.assessments[roleSlug]?.ratings[skillId] ?? 0;
    if (event) next = withActivity(next, base, event, true);
    if (earned > currentLevel) {
      raisedTo = earned;
      next = withAssessment(next, roleSlug, (a) => ({ ratings: { ...a.ratings, [skillId]: earned } }));
      next = withActivity(next, base, { kind: "level-up", level: earned }, false);
    }
    return next;
  });
  return { raisedTo };
}

const toggle = (list: string[], id: string, on: boolean) =>
  on ? (list.includes(id) ? list : [...list, id]) : list.filter((x) => x !== id);

export const actions = {
  /** Ticking a topic is recorded as learning activity; unticking isn't. */
  setTopic(roleSlug: string, skill: { id: string; name: string }, lesson: Lesson, topicId: string, done: boolean) {
    const title = lesson.topics.find((t) => t.id === topicId)?.title ?? topicId;
    return updateSkillProgress(
      roleSlug,
      skill,
      lesson,
      (p) => ({ ...p, topics: toggle(p.topics, topicId, done) }),
      done ? { kind: "topic", title } : null,
    );
  },

  setProject(roleSlug: string, skill: { id: string; name: string }, lesson: Lesson, projectId: string, done: boolean) {
    const title = lesson.projects.find((x) => x.id === projectId)?.title ?? projectId;
    return updateSkillProgress(
      roleSlug,
      skill,
      lesson,
      (p) => ({ ...p, projects: toggle(p.projects, projectId, done) }),
      done ? { kind: "project", title } : null,
    );
  },

  /** Save a quiz attempt to the skill's progress and to recent activity. */
  recordQuiz(roleSlug: string, skill: { id: string; name: string }, lesson: Lesson, score: number, total: number) {
    const at = now();
    return updateSkillProgress(
      roleSlug,
      skill,
      lesson,
      (p) => {
        const sameLength = p.quiz?.total === total;
        return {
          ...p,
          quiz: {
            best: sameLength ? Math.max(p.quiz!.best, score) : score,
            total,
            last: score,
            attempts: (p.quiz?.attempts ?? 0) + 1,
            lastAt: at,
            history: [{ score, total, at }, ...(p.quiz?.history ?? [])].slice(0, 10),
          },
        };
      },
      { kind: "quiz", score, total, passed: isPass(score, total) },
    );
  },

  saveSetup(setup: Omit<CareerSetup, "savedAt">) {
    update((s) => ({ ...s, setup: { ...setup, savedAt: now() } }));
  },

  /** Switch the target role while keeping the rest of the setup (and every role's answers). */
  changeRole(roleSlug: string) {
    update((s) => (s.setup ? { ...s, setup: { ...s.setup, roleSlug, savedAt: now() } } : s));
  },

  setRating(roleSlug: string, skillId: string, level: Level) {
    update((s) => withAssessment(s, roleSlug, (a) => ({ ratings: { ...a.ratings, [skillId]: level } })));
  },

  setRatings(roleSlug: string, ratings: Ratings) {
    update((s) => withAssessment(s, roleSlug, (a) => ({ ratings: { ...a.ratings, ...ratings } })));
  },

  answerQuiz(roleSlug: string, questionId: string, option: number) {
    update((s) => withAssessment(s, roleSlug, (a) => ({ quiz: { ...a.quiz, [questionId]: option } })));
  },

  resetQuiz(roleSlug: string) {
    update((s) => withAssessment(s, roleSlug, () => ({ quiz: {} })));
  },

  generateRoadmap(roleSlug: string) {
    update((s) => ({ ...s, roadmaps: { ...s.roadmaps, [roleSlug]: { generatedAt: now() } } }));
  },

  /** Start learning a skill and make it the current focus. */
  startSkill(roleSlug: string, skillId: string) {
    update((s) => {
      const l = s.learning[roleSlug] ?? { started: [], current: null };
      const started = l.started.includes(skillId) ? l.started : [...l.started, skillId];
      return { ...s, learning: { ...s.learning, [roleSlug]: { ...l, started, current: skillId } } };
    });
  },

  /** Stop focusing on a skill (it keeps its level and started state). */
  clearCurrent(roleSlug: string) {
    update((s) => {
      const l = s.learning[roleSlug];
      return l ? { ...s, learning: { ...s.learning, [roleSlug]: { ...l, current: null } } } : s;
    });
  },

  /**
   * The user confirms they've reached `level`; never lowers an existing rating. Shown in recent activity, but not
   * counted towards the streak (it's a declaration, not a learning session).
   */
  reachLevel(roleSlug: string, skill: { id: string; name: string }, level: Level) {
    const skillId = skill.id;
    update((s) => {
      let next = withAssessment(s, roleSlug, (a) => ({
        ratings: { ...a.ratings, [skillId]: Math.max(a.ratings[skillId] ?? 0, level) as Level },
      }));
      next = withActivity(next, { roleSlug, skillId, skillName: skill.name }, { kind: "skill-complete", level }, false);
      const l = next.learning[roleSlug];
      if (l?.current !== skillId) return next;
      return { ...next, learning: { ...next.learning, [roleSlug]: { ...l, current: null } } };
    });
  },

  /**
   * Make another career the active goal. Every career keeps its own assessment, roadmap and learning progress,
   * so switching never overwrites anything. Without a saved setup there's nothing to switch, so this is a no-op.
   */
  switchGoal(roleSlug: string) {
    update((s) => (s.setup ? { ...s, setup: { ...s.setup, roleSlug, savedAt: now() } } : s));
  },

  /** Delete one career's assessment, roadmap, learning progress and activity, and streak days only it recorded. */
  deleteCareer(roleSlug: string) {
    update((s) => {
      const drop = <T,>(rec: Record<string, T>) => Object.fromEntries(Object.entries(rec).filter(([k]) => k !== roleSlug));
      return {
        ...s,
        assessments: drop(s.assessments),
        roadmaps: drop(s.roadmaps),
        learning: drop(s.learning),
        activity: s.activity.filter((a) => a.roleSlug !== roleSlug),
        learningDays: learningDaysWithout(s, roleSlug),
      };
    });
  },

  /** Replace everything with an imported backup (already validated by readBackup). */
  replaceState(state: AppState) {
    update(() => state);
  },

  clearAll() {
    update(() => emptyState);
  },
};
