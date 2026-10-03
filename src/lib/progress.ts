import type { Role } from "@/data/roles";
import { assessmentProgress, levelLabel } from "./assessment";
import { computeRoadmap, type Roadmap, type RoadmapNode } from "./roadmap";
import { learnHref } from "./routes";
import type { AppState } from "./store";

export type NextStep = { eyebrow: string; title: string; body: string; href: string; cta: string };

/** Where the user is in the seven-stage journey (zero-based, matches journeySteps). */
export function journeyStage(state: AppState, role: Role) {
  if (state.roadmaps[role.slug]) return 4; // chose, assessed, saw gaps, got roadmap → now learning
  return 1;
}

export function roadmapFor(state: AppState, role: Role) {
  const a = state.assessments[role.slug];
  return computeRoadmap(role, a?.ratings ?? {}, a?.quiz ?? {}, state.learning[role.slug]);
}

export function getNextStep(state: AppState, role: Role): NextStep {
  const assessment = state.assessments[role.slug] ?? { ratings: {}, quiz: {} };
  const progress = assessmentProgress(role, assessment.ratings);

  if (state.roadmaps[role.slug]) {
    const { focus } = roadmapFor(state, role);
    if (!focus) {
      return {
        eyebrow: "Roadmap complete",
        title: "You meet every requirement",
        body: `Every ${role.title} skill is at or above its required level. Polish your portfolio and start applying.`,
        href: "/roadmap",
        cta: "View my roadmap",
      };
    }
    return {
      eyebrow: focus.isCurrent ? "Current focus" : "Up next",
      title: focus.isCurrent ? `Continue with ${focus.skill.name}` : `Start ${focus.skill.name}`,
      body: `${focus.category.name} · ${levelLabel(focus.level)} → ${levelLabel(focus.required)}, about ${focus.hoursRemaining} hours.`,
      href: learnHref(role.slug, focus.skill.id),
      cta: "Continue Learning",
    };
  }

  if (progress.rated === 0) {
    return {
      eyebrow: "Up next · Stage 2",
      title: "Assess your skills",
      body: `Rate yourself on the ${progress.total} skills a ${role.title} needs. Your roadmap then skips what you already know and puts your biggest gaps first.`,
      href: "/assess",
      cta: "Start skill assessment",
    };
  }

  if (progress.rated < progress.total) {
    return {
      eyebrow: "Up next · Stage 2",
      title: "Finish your skill assessment",
      body: `${progress.rated} of ${progress.total} skills rated. Your answers are saved, so pick up where you left off.`,
      href: "/assess",
      cta: "Continue assessment",
    };
  }

  return {
    eyebrow: "Up next · Stage 4",
    title: "Generate your roadmap",
    body: "Your assessment is complete. Generate your personalized roadmap to see exactly what you're missing.",
    href: "/assess#finish",
    cta: "Review and generate",
  };
}

export type Recommendation = { node: RoadmapNode; reasons: string[]; upNext: RoadmapNode[] };

/**
 * The next skill to learn, from the user's incomplete skills, prerequisites and roadmap order (the same rules as
 * "Continue Learning"), with plain-language reasons. null when every skill is complete.
 */
export function recommendNext(roadmap: Roadmap): Recommendation | null {
  const node = roadmap.focus;
  if (!node) return null;
  const name = (id: string) => roadmap.byId.get(id)!.skill.name;
  const reasons: string[] = [];

  if (node.isCurrent) reasons.push("You chose it as your current focus.");
  if (node.prerequisites.length === 0) reasons.push("It has no prerequisites, so it's a good place to start.");
  else if (node.ready) reasons.push(`Its prerequisites are complete: ${node.prerequisites.map(name).join(", ")}.`);
  else {
    const missing = node.prerequisites.filter((p) => roadmap.byId.get(p)!.status !== "completed").map(name);
    reasons.push(`It's the earliest skill left in your path. Finishing ${missing.join(", ")} first will help.`);
  }
  if (node.status === "in-progress") {
    reasons.push(
      node.level > 0
        ? `You're already at ${levelLabel(node.level)}; a ${levelLabel(node.required)} level is needed.`
        : "You've already started it.",
    );
  }
  const position = roadmap.plan.indexOf(node) + 1;
  reasons.push(`It's #${position} of ${roadmap.plan.length} remaining skills in your roadmap order.`);

  const upNext = roadmap.plan.filter((n) => n !== node && n.ready).slice(0, 3);
  return { node, reasons, upNext };
}

export type CareerSummary = {
  role: Role;
  isActive: boolean;
  /** Roadmap generated (assessment finished). */
  generated: boolean;
  rated: number;
  total: number;
  /** From the same roadmap calculation used everywhere else. */
  percent: number;
  completed: number;
  lastActivityAt: string | null;
};

/**
 * Every career the user has progress on (plus the active goal), most recently active first. Each career's
 * assessment, roadmap and learning progress are stored separately, so these never interfere with each other.
 */
export function careerSummaries(state: AppState, allRoles: Role[]): CareerSummary[] {
  const active = state.setup?.roleSlug;
  return allRoles
    .filter(
      (r) =>
        r.slug === active ||
        Object.keys(state.assessments[r.slug]?.ratings ?? {}).length > 0 ||
        state.roadmaps[r.slug] ||
        (state.learning[r.slug]?.started.length ?? 0) > 0,
    )
    .map((role) => {
      const roadmap = roadmapFor(state, role);
      const rated = Object.keys(state.assessments[role.slug]?.ratings ?? {}).length;
      const times = [
        state.assessments[role.slug]?.updatedAt,
        state.roadmaps[role.slug]?.generatedAt,
        state.activity.find((a) => a.roleSlug === role.slug)?.at,
      ].filter((t): t is string => Boolean(t));
      return {
        role,
        isActive: role.slug === active,
        generated: Boolean(state.roadmaps[role.slug]),
        rated,
        total: roadmap.counts.total,
        percent: roadmap.progress.percent,
        completed: roadmap.counts.completed,
        lastActivityAt: times.sort().at(-1) ?? null,
      };
    })
    .sort((a, b) => Number(b.isActive) - Number(a.isActive) || (b.lastActivityAt ?? "").localeCompare(a.lastActivityAt ?? ""));
}
