"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  BookCheck,
  CircleCheck,
  ClipboardCheck,
  ClipboardList,
  Compass,
  Flag,
  Flame,
  Hammer,
  Map as MapIcon,
  PartyPopper,
  Target,
  TrendingUp,
} from "lucide-react";
import { JourneyStepper, journeySteps } from "@/components/journey-stepper";
import { ProgressRing } from "@/components/progress/progress-ring";
import { SetupLoading } from "@/components/progress/setup-states";
import { statusMeta } from "@/components/roadmap/status";
import { RoleIcon } from "@/components/role-icon";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Progress } from "@/components/ui/progress";
import { getSkillLearning } from "@/data/learning";
import { getRole, roleSkillCount, type Role } from "@/data/roles";
import { assessmentProgress, levelLabel } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { emptyProgress, progressSummary } from "@/lib/learning";
import { journeyStage, recommendNext, roadmapFor, type Recommendation } from "@/lib/progress";
import type { Roadmap } from "@/lib/roadmap";
import { learnHref } from "@/lib/routes";
import type { CareerSetup } from "@/lib/setup";
import { useAppState, type ActivityEntry, type AppState } from "@/lib/store";
import { computeStreak, localDay, type Streak } from "@/lib/streak";

export function DashboardView() {
  const state = useAppState();
  if (state === undefined) return <SetupLoading />;
  const role = getRole(state.setup?.roleSlug);
  if (!state.setup || !role) return <NoGoal />;
  return <Dashboard state={state} role={role} setup={state.setup} />;
}

type Stage = "assess" | "finish" | "generate" | "learning";
type Rated = { rated: number; total: number };

function Dashboard({ state, role, setup }: { state: AppState; role: Role; setup: CareerSetup }) {
  const assessment = state.assessments[role.slug];
  // The same calculation the roadmap and assessment use, from the same saved skill levels.
  const roadmap = useMemo(() => roadmapFor(state, role), [state, role]);
  const streak = useMemo(() => computeStreak(state.learningDays), [state.learningDays]);
  const rated = assessmentProgress(role, assessment?.ratings ?? {});
  const generated = Boolean(state.roadmaps[role.slug]);
  const stage: Stage = generated ? "learning" : rated.rated === 0 ? "assess" : rated.rated < rated.total ? "finish" : "generate";
  const recommendation = generated ? recommendNext(roadmap) : null;

  return (
    <>
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-12">
        <div className="shrink-0">
          <Eyebrow>Dashboard</Eyebrow>
          <h1 className="mt-2 font-display text-4xl tracking-tight whitespace-nowrap sm:text-5xl">Your progress</h1>
        </div>
        <JourneyStepper current={journeyStage(state, role)} className="min-w-0 lg:flex-1 lg:pb-2" />
      </div>

      <GoalHero role={role} stage={stage} roadmap={roadmap} rated={rated} recommendation={recommendation} />

      <StatTiles role={role} roadmap={generated ? roadmap : null} streak={streak} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-8">
          {stage !== "learning" ? (
            <AssessmentFirst role={role} stage={stage} rated={rated} />
          ) : recommendation ? (
            <RecommendedSkill role={role} recommendation={recommendation} state={state} />
          ) : (
            <AllComplete role={role} />
          )}
          {stage === "learning" && <AreaProgress roadmap={roadmap} />}
        </div>
        <aside className="space-y-8">
          <StreakCard streak={streak} />
          <RecentActivity state={state} role={role} setup={setup} />
        </aside>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------------------------------------------

function GoalHero({
  role,
  stage,
  roadmap,
  rated,
  recommendation,
}: {
  role: Role;
  stage: Stage;
  roadmap: Roadmap;
  rated: Rated;
  recommendation: Recommendation | null;
}) {
  const cta =
    stage === "learning"
      ? recommendation
        ? { href: learnHref(role.slug, recommendation.node.skill.id), label: "Resume roadmap", note: `Continue with ${recommendation.node.skill.name}` }
        : { href: "/roadmap", label: "View roadmap", note: "Every skill meets the requirement" }
      : stage === "assess"
        ? { href: "/assess", label: "Start your first assessment", note: `${rated.total} skills · about 5 minutes` }
        : stage === "finish"
          ? { href: "/assess", label: "Continue assessment", note: `${rated.rated} of ${rated.total} skills rated` }
          : { href: "/assess#finish", label: "Generate your roadmap", note: "Your assessment is complete" };

  return (
    <section aria-labelledby="goal-title" className="rounded-3xl border border-border bg-surface p-6 shadow-elev-2 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="min-w-0">
          <Eyebrow>Current career goal</Eyebrow>
          <div className="mt-3 flex items-center gap-4">
            <RoleIcon icon={role.icon} size="lg" />
            <div className="min-w-0">
              <h2 id="goal-title" className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
                {role.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {role.category} · {roleSkillCount(role)} skills ·{" "}
                <Link href={`/start?role=${role.slug}`} className="underline underline-offset-4 hover:text-foreground">
                  Change goal
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={cta.href} className={buttonVariants({ size: "lg", className: "h-14 px-8 text-base" })}>
              {cta.label}
              <ArrowRight aria-hidden="true" />
            </Link>
            {stage === "learning" ? (
              <Link href="/roadmap" className={buttonVariants({ variant: "ghost", size: "lg" })}>
                <MapIcon aria-hidden="true" />
                View full roadmap
              </Link>
            ) : (
              <Link href={`/start?role=${role.slug}`} className={buttonVariants({ variant: "ghost", size: "lg" })}>
                <Compass aria-hidden="true" />
                Back to career selection
              </Link>
            )}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{cta.note}</p>
        </div>

        {stage === "learning" ? (
          <div className="flex items-center gap-5 lg:flex-col lg:text-center">
            <ProgressRing percent={roadmap.progress.percent} />
            <div className="max-w-[13rem]">
              <p className="text-sm font-medium">Overall learning progress</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {roadmap.progress.earned} of {roadmap.progress.required} required proficiency levels
              </p>
            </div>
          </div>
        ) : (
          <ol className="space-y-3 text-sm lg:w-64" aria-label="Getting started">
            {[
              { label: "Choose a career goal", done: true, current: false },
              { label: "Assess your skills", done: stage === "generate", current: stage !== "generate" },
              { label: "Get your roadmap", done: false, current: stage === "generate" },
            ].map((step, i) => (
              <li key={step.label} className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border font-label text-xs",
                    step.done && "border-success bg-success text-background",
                    step.current && "border-primary ring-4 ring-primary/10",
                    !step.done && !step.current && "border-border-strong text-muted-foreground",
                  )}
                >
                  {step.done ? <CircleCheck aria-hidden="true" className="size-4" /> : i + 1}
                </span>
                <span className={cn(step.current ? "font-medium" : "text-muted-foreground")}>
                  {step.label}
                  {step.done && <span className="sr-only"> (done)</span>}
                  {step.current && <span className="sr-only"> (current step)</span>}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

function StatTile({
  label,
  value,
  note,
  icon,
  children,
}: {
  label: string;
  value: string;
  note: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="flex items-center gap-2 font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-3 font-label text-4xl tabular-nums">{value}</p>
      {children}
      <div className="mt-2 text-sm text-muted-foreground">{note}</div>
    </div>
  );
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

function StatTiles({ role, roadmap, streak }: { role: Role; roadmap: Roadmap | null; streak: Streak }) {
  const pending = "Shown after your assessment";
  const c = roadmap?.counts;
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatTile
        label="Overall progress"
        value={roadmap ? `${roadmap.progress.percent}%` : "—"}
        note={roadmap ? `${roadmap.progress.earned} of ${roadmap.progress.required} required levels` : pending}
      >
        {roadmap && <Progress value={roadmap.progress.percent} label="Overall learning progress" className="mt-3" />}
      </StatTile>
      <StatTile
        label="Skills completed"
        icon={<span aria-hidden="true" className={cn("size-2.5 rounded-full", statusMeta.completed.dot)} />}
        value={c ? `${c.completed}/${c.total}` : "—"}
        note={c ? `At the level a ${role.title} needs · ${c.atMastered} fully Mastered` : pending}
      />
      <StatTile
        label="Skills remaining"
        icon={<span aria-hidden="true" className={cn("size-2.5 rounded-full", statusMeta["not-started"].dot)} />}
        value={c ? String(c.total - c.completed) : "—"}
        note={
          c ? (
            <span className="flex flex-wrap gap-x-3">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className={cn("size-2 rounded-full", statusMeta["in-progress"].dot)} />
                {c.inProgress} in progress
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className={cn("size-2 rounded-full", statusMeta["not-started"].dot)} />
                {c.notStarted} not started
              </span>
            </span>
          ) : (
            pending
          )
        }
      />
      <StatTile
        label="Learning streak"
        icon={<Flame aria-hidden="true" className={cn("size-3.5", streak.current > 0 && "text-warning")} />}
        value={plural(streak.current, "day")}
        note={streakNote(streak)}
      />
    </div>
  );
}

function streakNote(streak: Streak) {
  if (streak.activeToday) return `You've learned today · longest ${plural(streak.longest, "day")}`;
  if (streak.current > 0) return "Learn something today to keep it going";
  if (streak.lastDay) return `Last learned ${formatDay(streak.lastDay)} · longest ${plural(streak.longest, "day")}`;
  return "Complete a topic, project or knowledge check to start one";
}

function RecommendedSkill({ role, recommendation, state }: { role: Role; recommendation: Recommendation; state: AppState }) {
  const { node, reasons, upNext } = recommendation;
  const meta = statusMeta[node.status];
  const StatusIcon = meta.icon;
  const learning = getSkillLearning(role.slug, node.skill.id);
  const summary = learning
    ? progressSummary(learning.lesson, state.learning[role.slug]?.skills?.[node.skill.id] ?? emptyProgress)
    : null;

  return (
    <section aria-labelledby="recommended-title" className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div data-theme="dark" className="bg-background p-6 text-foreground sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Eyebrow>Recommended next skill</Eyebrow>
          <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", meta.node, meta.text)}>
            <StatusIcon aria-hidden="true" className="size-3.5" />
            {node.isCurrent ? "Current focus" : meta.label}
          </span>
        </div>
        <h2 id="recommended-title" className="mt-3 font-display text-4xl leading-tight tracking-tight">
          {node.skill.name}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {node.category.name} · {levelLabel(node.level)} → {levelLabel(node.required)} · about {node.hoursRemaining} hours
        </p>

        <ul className="mt-5 space-y-2 text-sm" aria-label="Why this skill">
          {reasons.map((r) => (
            <li key={r} className="flex gap-2.5">
              <Target aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>{r}</span>
            </li>
          ))}
        </ul>

        {summary && (
          <div className="mt-6">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Learning progress</span>
              <span className="font-label text-lg tabular-nums">{summary.percent}%</span>
            </div>
            <Progress value={summary.percent} label={`${node.skill.name} learning progress`} className="mt-1.5 h-1.5" />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {summary.topicsDone} of {summary.topicsTotal} topics · {summary.projectsDone} of {summary.projectsTotal} projects ·{" "}
              {summary.quiz ? `quiz best ${summary.quiz.best}/${summary.quiz.total}` : "quiz not taken"}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link href={learnHref(role.slug, node.skill.id)} className={buttonVariants({ size: "lg" })}>
            {summary && summary.percent > 0 ? "Continue learning" : "Start learning"}
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link href={`${learnHref(role.slug, node.skill.id)}?quiz=1`} className={buttonVariants({ variant: "secondary", size: "lg" })}>
            <ClipboardCheck aria-hidden="true" />
            Test my knowledge
          </Link>
        </div>
      </div>

      {upNext.length > 0 && (
        <div className="p-6">
          <p className="text-sm font-semibold">Up after that</p>
          <ol className="mt-3 space-y-2">
            {upNext.map((n) => {
              const m = statusMeta[n.status];
              return (
                <li key={n.skill.id}>
                  <Link
                    href={learnHref(role.slug, n.skill.id)}
                    className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:border-border-strong"
                  >
                    <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full", m.dot)} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{n.skill.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {m.label} · needs {levelLabel(n.required)}
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
}

function AllComplete({ role }: { role: Role }) {
  return (
    <section className="rounded-2xl border border-success/40 bg-success-soft p-8 text-center">
      <PartyPopper aria-hidden="true" className="mx-auto size-8 text-success" />
      <h2 className="mt-4 text-xl font-semibold">Every {role.title} skill meets the requirement</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Keep sharp with knowledge checks, polish your portfolio projects, and start applying.
      </p>
      <Link href="/roadmap" className={buttonVariants({ className: "mt-6" })}>
        View roadmap
      </Link>
    </section>
  );
}

/** Empty state before the roadmap exists: what to do next, and what the dashboard will show afterwards. */
function AssessmentFirst({ role, stage, rated }: { role: Role; stage: Stage; rated: Rated }) {
  const heading =
    stage === "assess" ? "Start with a quick skill assessment" : stage === "finish" ? "Finish your skill assessment" : "Generate your roadmap";
  const body =
    stage === "assess"
      ? `Rate yourself on the ${rated.total} skills a ${role.title} needs. It takes about five minutes, and you can change answers any time.`
      : stage === "finish"
        ? `You've rated ${rated.rated} of ${rated.total} skills. Your answers are saved, so pick up where you left off.`
        : "Your assessment is complete. Generate your roadmap to unlock progress tracking and recommendations.";
  return (
    <section aria-labelledby="first-title" className="rounded-2xl border border-dashed border-border-strong bg-surface p-6 sm:p-8">
      <span className="grid size-12 place-items-center rounded-full border border-border bg-surface-sunken">
        <ClipboardList aria-hidden="true" className="size-5" strokeWidth={1.6} />
      </span>
      <h2 id="first-title" className="mt-5 text-2xl font-semibold tracking-tight">
        {heading}
      </h2>
      <p className="mt-2 max-w-xl text-muted-foreground">{body}</p>
      {stage !== "assess" && <Progress value={(rated.rated / rated.total) * 100} label="Assessment progress" className="mt-5 max-w-sm" />}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={stage === "generate" ? "/assess#finish" : "/assess"} className={buttonVariants({ size: "lg" })}>
          {stage === "assess" ? "Start your first assessment" : stage === "finish" ? "Continue assessment" : "Generate your roadmap"}
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link href={`/start?role=${role.slug}`} className={buttonVariants({ variant: "secondary", size: "lg" })}>
          Back to career selection
        </Link>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-sm font-medium">After your assessment, this dashboard shows</p>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {[
            "Your overall progress toward the role",
            "Skills completed and still to learn",
            "A recommended next skill, in prerequisite order",
            "Your learning streak and recent activity",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AreaProgress({ roadmap }: { roadmap: Roadmap }) {
  return (
    <section aria-labelledby="areas-title" className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 id="areas-title" className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Progress by area
        </h2>
        <Link href="/roadmap" className="text-sm underline-offset-4 hover:underline">
          View roadmap
        </Link>
      </div>
      <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
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

const asDate = (day: string) => {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d);
};

function StreakCard({ streak }: { streak: Streak }) {
  const today = localDay();
  return (
    <section aria-labelledby="streak-title" className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="streak-title" className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Learning streak
          </h2>
          <p className="mt-2 flex items-center gap-2 font-label text-4xl tabular-nums">
            <Flame aria-hidden="true" className={cn("size-7", streak.current > 0 ? "text-warning" : "text-muted-foreground")} />
            {streak.current}
            <span className="text-base text-muted-foreground">{streak.current === 1 ? "day" : "days"}</span>
          </p>
        </div>
        <dl className="text-right text-xs text-muted-foreground">
          <dt>Longest</dt>
          <dd className="font-label text-lg text-foreground tabular-nums">{streak.longest}</dd>
        </dl>
      </div>

      <ol className="mt-5 grid grid-cols-7 gap-1.5" aria-label="Learning in the last 14 days">
        {streak.recent.map(({ day, active }) => {
          const date = asDate(day);
          const label = date.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
          const isToday = day === today;
          const status = `${label}: ${active ? "learned" : "no learning recorded"}${isToday ? " (today)" : ""}`;
          return (
            <li key={day} className="flex flex-col items-center gap-1">
              <span
                title={status}
                className={cn(
                  "aspect-square w-full rounded-md border",
                  active ? "border-success bg-success" : "border-border bg-surface-sunken",
                  isToday && "ring-2 ring-ring ring-offset-1 ring-offset-surface",
                )}
              >
                <span className="sr-only">{status}</span>
              </span>
              <span aria-hidden="true" className="text-[0.6rem] text-muted-foreground">
                {date.toLocaleDateString(undefined, { weekday: "narrow" })}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-xs text-muted-foreground">
        A day counts when you complete a topic, finish a project or take a knowledge check. {streakNote(streak)}.
      </p>
    </section>
  );
}

type FeedItem = { id: string; at: string; title: string; detail?: string; href?: string; icon: React.ReactNode };

function activityItem(a: ActivityEntry, roleSlug: string): FeedItem {
  const base = { id: a.id, at: a.at, href: learnHref(roleSlug, a.skillId), detail: a.skillName };
  switch (a.kind) {
    case "topic":
      return { ...base, title: `Completed topic: ${a.title}`, icon: <BookCheck className="size-4" /> };
    case "project":
      return { ...base, title: `Finished project: ${a.title}`, icon: <Hammer className="size-4" /> };
    case "quiz":
      return {
        ...base,
        title: `Knowledge check ${a.score}/${a.total} (${a.passed ? "passed" : "not passed"})`,
        icon: <ClipboardCheck className="size-4" />,
      };
    case "level-up":
      return { ...base, title: `Reached ${levelLabel(a.level)} through learning`, icon: <TrendingUp className="size-4" /> };
    case "skill-complete":
      return { ...base, title: `Marked complete at ${levelLabel(a.level)}`, icon: <CircleCheck className="size-4" /> };
  }
}

function RecentActivity({ state, role, setup }: { state: AppState; role: Role; setup: CareerSetup }) {
  const roleEvents = state.activity.filter((a) => a.roleSlug === role.slug);
  const milestones: FeedItem[] = [{ id: "goal", at: setup.savedAt, title: `Career goal set: ${role.title}`, icon: <Flag className="size-4" /> }];
  const generated = state.roadmaps[role.slug];
  if (generated) {
    milestones.push({ id: "roadmap", at: generated.generatedAt, title: "Roadmap generated", href: "/roadmap", icon: <MapIcon className="size-4" /> });
  }
  const items = [...roleEvents.map((a) => activityItem(a, role.slug)), ...milestones].sort((a, b) => b.at.localeCompare(a.at));
  const shown = items.slice(0, 8);
  const stage = journeyStage(state, role);

  return (
    <section aria-labelledby="activity-title" className="rounded-2xl border border-border bg-surface p-6">
      <h2 id="activity-title" className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Recent learning activity
      </h2>
      {roleEvents.length === 0 && (
        <p className="mt-4 rounded-xl bg-surface-sunken/70 px-4 py-3 text-sm text-muted-foreground">
          No learning recorded yet. Complete a topic, finish a project or take a knowledge check, and it will appear here.
        </p>
      )}
      <ol className="mt-4 space-y-4">
        {shown.map((item) => (
          <li key={item.id} className="flex gap-3 text-sm">
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border bg-surface-sunken text-muted-foreground"
            >
              {item.icon}
            </span>
            <div className="min-w-0">
              <p className="font-medium leading-snug">
                {item.href ? (
                  <Link href={item.href} className="underline-offset-4 hover:underline">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.detail ? `${item.detail} · ` : ""}
                {formatWhen(item.at)}
              </p>
            </div>
          </li>
        ))}
      </ol>
      {items.length > shown.length && (
        <p className="mt-4 text-xs text-muted-foreground">
          Showing the latest {shown.length} of {items.length}.
        </p>
      )}
      <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
        Stage {stage + 1} of {journeySteps.length}: {journeySteps[stage]}
      </p>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------

function formatDay(day: string) {
  const today = localDay();
  if (day === today) return "today";
  if (day === localDay(new Date(Date.now() - 86_400_000))) return "yesterday";
  return asDate(day).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  const day = formatDay(localDay(date));
  if (day !== "today" && day !== "yesterday") return day;
  return `${day[0].toUpperCase()}${day.slice(1)}, ${date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
}

/** First visit: no career goal yet. */
function NoGoal() {
  return (
    <div className="mx-auto max-w-3xl">
      <Eyebrow>Dashboard</Eyebrow>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-6xl">Welcome to SkillBridge</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Your dashboard tracks your progress toward a tech career. Start by choosing the role you&apos;re aiming for.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/start" className={buttonVariants({ size: "lg", className: "h-14 px-8 text-base" })}>
          Choose a career goal
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link href="/roles" className={buttonVariants({ variant: "secondary", size: "lg", className: "h-14" })}>
          Explore roles
        </Link>
      </div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Choose your goal", body: "Pick from eight tech career paths." },
          { title: "Assess your skills", body: "Rate what you already know in about five minutes." },
          { title: "Follow your roadmap", body: "Learn in prerequisite order and track your progress here." },
        ].map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-border bg-surface p-5">
            <span className="grid size-8 place-items-center rounded-full bg-primary font-label text-sm text-primary-foreground">{i + 1}</span>
            <p className="mt-4 font-semibold">{s.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
