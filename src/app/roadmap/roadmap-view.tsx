"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ArrowRight, CircleCheck, ClipboardList, Lock, PartyPopper } from "lucide-react";
import { LevelMeter } from "@/components/assessment/level-meter";
import { JourneyStepper } from "@/components/journey-stepper";
import { NextStepCard } from "@/components/progress/next-step-card";
import { ProgressRing } from "@/components/progress/progress-ring";
import { SetupDetails } from "@/components/progress/setup-details";
import { NoSetupState, PageIntro, SetupLoading } from "@/components/progress/setup-states";
import { SkillDetail } from "@/components/roadmap/skill-detail";
import { SkillGraph } from "@/components/roadmap/skill-graph";
import { LevelPips } from "@/components/roadmap/skill-node";
import { statusMeta } from "@/components/roadmap/status";
import { RoleIcon } from "@/components/role-icon";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Progress } from "@/components/ui/progress";
import { getRole, type Role } from "@/data/roles";
import { formatMonths, levelLabel, monthsAtPace } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { getNextStep, journeyStage, roadmapFor } from "@/lib/progress";
import type { Roadmap, RoadmapNode } from "@/lib/roadmap";
import { optionLabel, type CareerSetup } from "@/lib/setup";
import { learnHref } from "@/lib/routes";
import { useAppState, type AppState } from "@/lib/store";

export function RoadmapView() {
  const state = useAppState();
  if (state === undefined) return <SetupLoading />;

  const role = getRole(state.setup?.roleSlug);
  if (!state.setup || !role) {
    return (
      <>
        <PageIntro eyebrow="My Roadmap" title="Your roadmap starts with a goal" />
        <NoSetupState
          title="You haven't built a roadmap yet"
          body="Choose the tech role you're aiming for and tell us your starting point. It takes about two minutes."
        />
      </>
    );
  }

  return state.roadmaps[role.slug] ? (
    <PersonalRoadmap state={state} role={role} setup={state.setup} />
  ) : (
    <RoadmapPending state={state} role={role} />
  );
}

/** Before the assessment is finished: the next step plus the role's outline. */
function RoadmapPending({ state, role }: { state: AppState; role: Role }) {
  const ratings = state.assessments[role.slug]?.ratings ?? {};
  return (
    <>
      <PageIntro eyebrow="My Roadmap" title={`Your ${role.title} roadmap`}>
        Career goal saved. Assess your skills to turn this outline into your personalized roadmap.
      </PageIntro>
      <JourneyStepper current={journeyStage(state, role)} className="mb-10" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <NextStepCard step={getNextStep(state, role)} />
          <section aria-labelledby="outline-title">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="outline-title" className="text-xl font-semibold tracking-tight">
                Roadmap outline
              </h2>
              <Badge>Before assessment</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Every skill a {role.title} needs, and the level it&apos;s needed at.</p>
            <ol className="mt-6 space-y-4">
              {role.categories.map((category, i) => (
                <li key={category.id} className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-full border border-border-strong font-label text-sm">{i + 1}</span>
                    <h3 className="font-semibold">{category.name}</h3>
                    <span className="ml-auto text-xs text-muted-foreground">{category.phase}</span>
                  </div>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {category.skills.map((skill) => {
                      const rated = ratings[skill.id];
                      return (
                        <li key={skill.id} className="flex items-center justify-between gap-3 rounded-lg bg-surface-sunken/60 px-3.5 py-2.5 text-sm">
                          <span>{skill.name}</span>
                          <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                            {rated !== undefined ? (
                              <>
                                <LevelMeter level={rated} />
                                {levelLabel(rated)}
                              </>
                            ) : (
                              `Needs ${levelLabel(skill.required)}`
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SetupDetails setup={state.setup!} role={role} />
        </aside>
      </div>
    </>
  );
}

function PersonalRoadmap({ state, role, setup }: { state: AppState; role: Role; setup: CareerSetup }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("skill");

  // The store returns stable references until something changes, so this only recomputes on real updates.
  const roadmap = useMemo(() => roadmapFor(state, role), [state, role]);

  const openSkill = useCallback(
    (id: string) => {
      const href = `${pathname}?skill=${encodeURIComponent(id)}`;
      // Opening from the page adds a history entry (Back closes it); moving between skills replaces it.
      if (selectedId) router.replace(href, { scroll: false });
      else router.push(href, { scroll: false });
    },
    [pathname, router, selectedId],
  );
  const closeSkill = useCallback(() => {
    if (new URLSearchParams(window.location.search).has("skill")) router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return (
    <>
      <JourneyStepper current={journeyStage(state, role)} className="mb-8" />
      <Summary role={role} setup={setup} roadmap={roadmap} onContinue={(id) => router.push(learnHref(role.slug, id))} />

      <section aria-labelledby="path-title" className="mt-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Recommended learning order</Eyebrow>
            <h2 id="path-title" className="mt-2 font-display text-4xl tracking-tight">
              Your learning path
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Skills are arranged by their prerequisites. Each line connects a skill to one it unlocks, left to right.
              Select any skill to see its details or update your progress.
            </p>
          </div>
          <Legend />
        </div>
        <div className="mt-6">
          <SkillGraph roadmap={roadmap} selectedId={selectedId} onSelect={openSkill} />
        </div>
      </section>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <MissingList roadmap={roadmap} role={role} onSelect={openSkill} />
        <aside className="space-y-6">
          <KnownList roadmap={roadmap} onSelect={openSkill} />
          <AreaProgress roadmap={roadmap} />
          <SetupDetails setup={setup} role={role} />
        </aside>
      </div>

      <SkillDetail role={role} roadmap={roadmap} skillId={selectedId} onClose={closeSkill} onNavigate={openSkill} />
    </>
  );
}

function Summary({
  role,
  setup,
  roadmap,
  onContinue,
}: {
  role: Role;
  setup: CareerSetup;
  roadmap: Roadmap;
  onContinue: (id: string) => void;
}) {
  const { counts, progress, focus } = roadmap;
  const months = monthsAtPace(roadmap.hoursRemaining, setup.hoursPerWeek);
  const stats = [
    { status: "completed" as const, label: "Completed", value: counts.completed, note: counts.atMastered ? `${counts.atMastered} at Mastered level` : "At the required level" },
    { status: "in-progress" as const, label: "In progress", value: counts.inProgress, note: "Started, below the required level" },
    { status: "not-started" as const, label: "Remaining", value: counts.notStarted, note: "Not started yet" },
  ];

  return (
    <section aria-labelledby="roadmap-title" className="rounded-3xl border border-border bg-surface p-6 shadow-elev-2 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex items-center gap-4">
            <RoleIcon icon={role.icon} size="lg" />
            <div>
              <Eyebrow>Target role</Eyebrow>
              <h1 id="roadmap-title" className="mt-1 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
                {role.title}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            You already meet the requirement for{" "}
            <span className="font-semibold">
              {counts.completed} of {counts.total}
            </span>{" "}
            skills.{" "}
            {counts.completed === counts.total ? (
              "Nothing is missing."
            ) : (
              <span className="text-muted-foreground">
                You&apos;re missing {counts.total - counts.completed}: {counts.inProgress} {counts.inProgress === 1 ? "is" : "are"} under way
                and {counts.notStarted} {counts.notStarted === 1 ? "hasn't" : "haven't"} been started.
              </span>
            )}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            {focus ? (
              <Button size="lg" onClick={() => onContinue(focus.skill.id)}>
                Continue Learning
                <ArrowRight aria-hidden="true" />
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-success">
                <PartyPopper aria-hidden="true" className="size-4" />
                Every skill meets the requirement
              </span>
            )}
            <Link href="/assess" className={buttonVariants({ variant: "ghost", size: "lg" })}>
              <ClipboardList aria-hidden="true" />
              Update assessment
            </Link>
          </div>
          {focus && (
            <p className="mt-3 text-sm text-muted-foreground">
              {focus.isCurrent ? "Current focus" : "Up next"}: <span className="font-medium text-foreground">{focus.skill.name}</span> ·{" "}
              {levelLabel(focus.level)} → {levelLabel(focus.required)}, about {focus.hoursRemaining} hours
            </p>
          )}
        </div>

        <ProgressSummary percent={progress.percent} earned={progress.earned} required={progress.required} />
      </div>

      <div className="mt-8 border-t border-border pt-6">
        {/* Composition bar: one segment per skill status */}
        <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-sunken" aria-hidden="true">
          {stats.map((s) =>
            s.value ? <span key={s.status} className={statusMeta[s.status].bar} style={{ width: `${(s.value / counts.total) * 100}%` }} /> : null,
          )}
        </div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.status}>
              <dt className="flex items-center gap-2 text-sm">
                <span aria-hidden="true" className={cn("size-2.5 rounded-full", statusMeta[s.status].dot)} />
                {s.label}
              </dt>
              <dd className="mt-1 font-label text-3xl tabular-nums">{s.value}</dd>
              <dd className="text-xs text-muted-foreground">{s.note}</dd>
            </div>
          ))}
          <div>
            <dt className="text-sm">Time remaining</dt>
            <dd className="mt-1 font-label text-3xl tabular-nums">~{roadmap.hoursRemaining} h</dd>
            <dd className="text-xs text-muted-foreground">
              {roadmap.hoursRemaining ? `${formatMonths(months)} at ${optionLabel.hours(setup.hoursPerWeek).toLowerCase()} a week` : "Nothing left"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function ProgressSummary({ percent, earned, required }: { percent: number; earned: number; required: number }) {
  return (
    <div className="flex items-center gap-5 lg:flex-col lg:text-center">
      <ProgressRing percent={percent} />
      <div className="max-w-[12rem]">
        <p className="text-sm font-medium">Overall progress</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {earned} of {required} required proficiency levels, across every skill this role needs
        </p>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs" aria-label="Legend">
      {(["completed", "in-progress", "not-started"] as const).map((s) => (
        <li key={s} className="flex items-center gap-1.5">
          <span aria-hidden="true" className={cn("size-3 rounded-full border", statusMeta[s].node)} />
          {statusMeta[s].label}
        </li>
      ))}
      <li className="flex items-center gap-1.5">
        <span aria-hidden="true" className="size-3 rounded-full border border-info bg-info-soft ring-2 ring-info ring-offset-1 ring-offset-background" />
        Current focus
      </li>
      <li className="flex items-center gap-1.5">
        <Lock aria-hidden="true" className="size-3" />
        Prerequisites first
      </li>
    </ul>
  );
}

function MissingList({ roadmap, role, onSelect }: { roadmap: Roadmap; role: Role; onSelect: (id: string) => void }) {
  return (
    <section aria-labelledby="missing-title">
      <h2 id="missing-title" className="text-2xl font-semibold tracking-tight">
        What you&apos;re missing
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {roadmap.plan.length
          ? `${roadmap.plan.length} skills below the level a ${role.title} needs, in the order to learn them.`
          : `Nothing. Every skill meets the level a ${role.title} needs.`}
      </p>
      {roadmap.plan.length > 0 && (
        <ol className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {roadmap.plan.map((node, i) => (
            <li key={node.skill.id}>
              <PlanRow node={node} index={i} roadmap={roadmap} onSelect={onSelect} />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function PlanRow({ node, index, roadmap, onSelect }: { node: RoadmapNode; index: number; roadmap: Roadmap; onSelect: (id: string) => void }) {
  const meta = statusMeta[node.status];
  const blockers = node.prerequisites.filter((p) => roadmap.byId.get(p)?.status !== "completed").map((p) => roadmap.byId.get(p)!.skill.name);
  return (
    <button
      type="button"
      onClick={() => onSelect(node.skill.id)}
      aria-haspopup="dialog"
      className={cn("flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-sunken/60", node.isCurrent && "bg-info-soft/60")}
    >
      <span className="w-6 shrink-0 text-right font-label text-sm text-muted-foreground tabular-nums">{index + 1}</span>
      <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full", meta.dot)} />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">{node.skill.name}</span>
          {node.isCurrent && <span className="rounded-full bg-info px-2 py-px text-[0.65rem] font-semibold text-background">Current</span>}
          {!node.isCurrent && node.isFocus && <span className="rounded-full border border-info px-2 py-px text-[0.65rem] font-semibold text-info">Up next</span>}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          <span className={meta.text}>{meta.label}</span> · {node.category.name}
          {blockers.length > 0 && ` · after ${blockers.join(", ")}`}
        </span>
      </span>
      <span className="hidden shrink-0 items-center gap-2 text-xs sm:flex">
        <span className="text-muted-foreground">{node.level > 0 ? levelLabel(node.level) : "Not started"}</span>
        <span aria-hidden="true" className="text-muted-foreground">→</span>
        <span className="font-medium">{levelLabel(node.required)}</span>
      </span>
      <span className="w-12 shrink-0 text-right font-label text-xs text-muted-foreground tabular-nums">~{node.hoursRemaining} h</span>
    </button>
  );
}

function KnownList({ roadmap, onSelect }: { roadmap: Roadmap; onSelect: (id: string) => void }) {
  return (
    <section aria-labelledby="known-title" className="rounded-2xl border border-border bg-surface p-6">
      <h2 id="known-title" className="font-semibold tracking-tight">
        What you already know
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">Skills at or above the required level.</p>
      {roadmap.completed.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">None yet. Mark skills as you reach their required level.</p>
      ) : (
        <ul className="mt-4 space-y-1.5">
          {roadmap.completed.map((n) => (
            <li key={n.skill.id}>
              <button
                type="button"
                onClick={() => onSelect(n.skill.id)}
                aria-haspopup="dialog"
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-surface-sunken"
              >
                <CircleCheck aria-hidden="true" className="size-4 shrink-0 text-success" />
                <span title={n.skill.name} className="min-w-0 flex-1 truncate">
                  {n.skill.name}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-success">
                  <LevelPips level={Math.min(n.level, n.required)} required={n.required} />
                  <span className="text-muted-foreground">{levelLabel(n.level)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function AreaProgress({ roadmap }: { roadmap: Roadmap }) {
  return (
    <section aria-labelledby="area-title" className="rounded-2xl border border-border bg-surface p-6">
      <h2 id="area-title" className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Progress by area
      </h2>
      <ul className="mt-5 space-y-4">
        {roadmap.categoryProgress.map(({ category, percent }) => (
          <li key={category.id}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate">{category.name}</span>
              <span className="font-label tabular-nums text-muted-foreground">{percent}%</span>
            </div>
            <Progress value={percent} label={`${category.name} progress`} className="mt-1.5 h-1.5" />
          </li>
        ))}
      </ul>
    </section>
  );
}
