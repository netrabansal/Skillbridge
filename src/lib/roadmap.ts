import type { Role, Skill, SkillCategory } from "@/data/roles";
import { quizResults, type Level, type QuizAnswers, type Ratings } from "./assessment";
import type { SkillProgress } from "./learning";

/**
 * The personalized roadmap, computed live from the user's skill levels, the role's required level for each
 * skill and the prerequisite graph. Nothing here is stored: change a level and the roadmap changes with it.
 *
 * Status rules
 *   completed    level ≥ the role's required level (so Mastered is always completed)
 *   in-progress  some proficiency (Familiar/Comfortable) below the requirement, or the user has started it
 *   not-started  no proficiency yet and not started
 */

export type SkillStatus = "completed" | "in-progress" | "not-started";

export type LearningState = {
  started: string[];
  current: string | null;
  /** Topics, projects and quiz results per skill (see lib/learning.ts). */
  skills?: Record<string, SkillProgress>;
};

export type RoadmapNode = {
  skill: Skill;
  category: SkillCategory;
  level: Level;
  rated: boolean;
  required: Level;
  status: SkillStatus;
  /** The skill the user chose to focus on. */
  isCurrent: boolean;
  /** Where "Continue Learning" goes (the current skill, or the recommended next one). */
  isFocus: boolean;
  /** Every prerequisite is completed. */
  ready: boolean;
  /** Longest prerequisite chain below this skill; skills at the same depth can be learned in parallel. */
  depth: number;
  prerequisites: string[];
  dependents: string[];
  hoursRemaining: number;
  quiz?: "verified" | "refresher";
  /** Position in the recommended learning order (1-based). */
  order: number;
};

export type Roadmap = {
  nodes: RoadmapNode[];
  byId: Map<string, RoadmapNode>;
  /** Nodes grouped by depth, for the dependency graph. */
  columns: RoadmapNode[][];
  /** Skills still needing work, in recommended learning order. */
  plan: RoadmapNode[];
  completed: RoadmapNode[];
  counts: { completed: number; inProgress: number; notStarted: number; total: number; atMastered: number };
  /** Proficiency earned toward the role's requirements: Σ min(level, required) / Σ required. */
  progress: { percent: number; earned: number; required: number };
  hoursRemaining: number;
  focus: RoadmapNode | null;
  categoryProgress: { category: SkillCategory; percent: number }[];
};

const statusRank: Record<SkillStatus, number> = { completed: 0, "in-progress": 1, "not-started": 2 };

export function computeRoadmap(role: Role, ratings: Ratings, quiz: QuizAnswers, learning?: LearningState): Roadmap {
  const started = new Set(learning?.started ?? []);
  const quizBySkill = quizResults(role, quiz);
  const entries = role.categories.flatMap((category, ci) => category.skills.map((skill, si) => ({ skill, category, ci, si })));
  const skillById = new Map(entries.map((e) => [e.skill.id, e]));

  const requiredTotal = entries.reduce((n, e) => n + e.skill.required, 0);
  const hoursPerStep = requiredTotal ? role.typicalHours / requiredTotal : 0;

  // Depth = longest prerequisite chain (the data is validated acyclic; the guard just avoids infinite loops).
  const depthCache = new Map<string, number>();
  const depthOf = (id: string, seen = new Set<string>()): number => {
    const cached = depthCache.get(id);
    if (cached !== undefined) return cached;
    if (seen.has(id)) return 0;
    seen.add(id);
    const reqs = (skillById.get(id)?.skill.requires ?? []).filter((r) => skillById.has(r));
    const depth = reqs.length ? 1 + Math.max(...reqs.map((r) => depthOf(r, seen))) : 0;
    depthCache.set(id, depth);
    return depth;
  };

  const dependents = new Map<string, string[]>();
  for (const { skill } of entries) {
    for (const r of skill.requires) dependents.set(r, [...(dependents.get(r) ?? []), skill.id]);
  }

  const nodes: RoadmapNode[] = entries.map(({ skill, category }) => {
    const level: Level = ratings[skill.id] ?? 0;
    const required = skill.required;
    const status: SkillStatus =
      level >= required ? "completed" : level > 0 || started.has(skill.id) ? "in-progress" : "not-started";
    const quizCorrect = quizBySkill.get(skill.id);
    return {
      skill,
      category,
      level,
      rated: ratings[skill.id] !== undefined,
      required,
      status,
      isCurrent: false,
      isFocus: false,
      ready: true,
      depth: depthOf(skill.id),
      prerequisites: skill.requires.filter((r) => skillById.has(r)),
      dependents: dependents.get(skill.id) ?? [],
      hoursRemaining: Math.round(Math.max(0, required - level) * hoursPerStep),
      quiz: quizCorrect === true ? "verified" : quizCorrect === false && level >= 2 ? "refresher" : undefined,
      order: 0,
    };
  });
  const byId = new Map(nodes.map((n) => [n.skill.id, n]));
  for (const n of nodes) n.ready = n.prerequisites.every((p) => byId.get(p)?.status === "completed");

  // Recommended order: a topological sort. Among skills whose prerequisites are already placed, finished work
  // comes first, then skills in progress, then shallower skills, then the order the role lists them in.
  const placed = new Set<string>();
  const ordered: RoadmapNode[] = [];
  const position = (n: RoadmapNode) => {
    const e = skillById.get(n.skill.id)!;
    return [statusRank[n.status], n.depth, e.ci, e.si];
  };
  while (ordered.length < nodes.length) {
    const available = nodes.filter((n) => !placed.has(n.skill.id) && n.prerequisites.every((p) => placed.has(p)));
    if (!available.length) break; // only possible with a cycle in the data
    available.sort((a, b) => {
      const pa = position(a);
      const pb = position(b);
      for (let i = 0; i < pa.length; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
      return 0;
    });
    const next = available[0];
    placed.add(next.skill.id);
    ordered.push(next);
  }
  ordered.forEach((n, i) => (n.order = i + 1));

  const plan = ordered.filter((n) => n.status !== "completed");
  const current = learning?.current ? byId.get(learning.current) : undefined;
  if (current && current.status !== "completed") current.isCurrent = true;
  const focus =
    (current?.isCurrent ? current : undefined) ??
    plan.find((n) => n.status === "in-progress" && n.ready) ??
    plan.find((n) => n.ready) ??
    plan[0] ??
    null;
  if (focus) focus.isFocus = true;

  const maxDepth = Math.max(0, ...nodes.map((n) => n.depth));
  const columns = Array.from({ length: maxDepth + 1 }, (_, d) =>
    nodes
      .filter((n) => n.depth === d)
      .sort((a, b) => {
        const ea = skillById.get(a.skill.id)!;
        const eb = skillById.get(b.skill.id)!;
        return ea.ci - eb.ci || ea.si - eb.si;
      }),
  );

  const earned = nodes.reduce((n, x) => n + Math.min(x.level, x.required), 0);
  const categoryProgress = role.categories.map((category) => {
    const catNodes = nodes.filter((n) => n.category.id === category.id);
    const req = catNodes.reduce((n, x) => n + x.required, 0);
    const got = catNodes.reduce((n, x) => n + Math.min(x.level, x.required), 0);
    return { category, percent: req ? Math.round((got / req) * 100) : 100 };
  });

  return {
    nodes,
    byId,
    columns,
    plan,
    completed: ordered.filter((n) => n.status === "completed"),
    counts: {
      completed: nodes.filter((n) => n.status === "completed").length,
      inProgress: nodes.filter((n) => n.status === "in-progress").length,
      notStarted: nodes.filter((n) => n.status === "not-started").length,
      total: nodes.length,
      atMastered: nodes.filter((n) => n.level === 3).length,
    },
    progress: { percent: requiredTotal ? Math.round((earned / requiredTotal) * 100) : 0, earned, required: requiredTotal },
    hoursRemaining: nodes.reduce((n, x) => n + x.hoursRemaining, 0),
    focus,
    categoryProgress,
  };
}
