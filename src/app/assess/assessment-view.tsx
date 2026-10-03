"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check, CircleAlert, Sparkles } from "lucide-react";
import { KnowledgeCheck } from "@/components/assessment/knowledge-check";
import { LevelMeter } from "@/components/assessment/level-meter";
import { LevelPicker } from "@/components/assessment/level-picker";
import { RoleHeader } from "@/components/assessment/role-header";
import { JourneyStepper } from "@/components/journey-stepper";
import { NoSetupState, SetupLoading } from "@/components/progress/setup-states";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getRole, type Role, type SkillCategory } from "@/data/roles";
import { assessmentProgress, levelLabel, levels, type Level, type Ratings } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { actions, useAppState } from "@/lib/store";
import { toast } from "@/lib/toast";

export function AssessmentView() {
  const state = useAppState();
  if (state === undefined) {
    return (
      <>
        <JourneyStepper current={1} className="mb-8" />
        <SetupLoading />
      </>
    );
  }

  const role = getRole(state.setup?.roleSlug);
  if (!state.setup || !role) {
    // No goal yet, so the journey is still at its first stage.
    return (
      <>
        <JourneyStepper current={0} className="mb-8" />
        <NoSetupState
          title="Choose a target role first"
          body="Your skill assessment is built around the role you're aiming for. Pick one and tell us your starting point. It takes about two minutes."
        />
      </>
    );
  }

  const assessment = state.assessments[role.slug] ?? { ratings: {}, quiz: {} };
  return (
    <div className="space-y-8">
      <JourneyStepper current={1} />
      <RoleHeader role={role} state={state} />
      {/* key resets local UI state (e.g. the finish panel) when switching roles */}
      <Assessment key={role.slug} role={role} ratings={assessment.ratings} quiz={assessment.quiz} hasRoadmap={Boolean(state.roadmaps[role.slug])} />
    </div>
  );
}

function Assessment({
  role,
  ratings,
  quiz,
  hasRoadmap,
}: {
  role: Role;
  ratings: Ratings;
  quiz: Record<string, number>;
  hasRoadmap: boolean;
}) {
  const progress = assessmentProgress(role, ratings);
  const rate = (skillId: string, level: Level) => actions.setRating(role.slug, skillId, level);

  return (
    <>
      {/* Compact progress for small screens */}
      <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden">
        <div className="flex items-center justify-between text-sm">
          <span>
            <span className="font-medium">{progress.rated}</span>
            <span className="text-muted-foreground"> of {progress.total} skills rated</span>
          </span>
          <span className="font-label tabular-nums">{progress.percent}%</span>
        </div>
        <Progress value={progress.percent} label="Assessment progress" className="mt-2 h-1.5" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
        <ProgressSidebar progress={progress} />

        <div className="min-w-0 space-y-6">
          <LevelGuide role={role} />
          {role.categories.map((category, i) => (
            <CategorySection key={category.id} index={i} category={category} ratings={ratings} onRate={rate} roleSlug={role.slug} />
          ))}
          <KnowledgeCheck role={role} ratings={ratings} quiz={quiz} />
          <FinishPanel role={role} ratings={ratings} quiz={quiz} progress={progress} hasRoadmap={hasRoadmap} />
        </div>
      </div>
    </>
  );
}

type ProgressInfo = ReturnType<typeof assessmentProgress>;

function ProgressSidebar({ progress }: { progress: ProgressInfo }) {
  return (
    <aside aria-label="Assessment progress" className="hidden lg:block">
      <div className="sticky top-24 space-y-5">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">Progress</p>
          <p className="mt-2 font-label text-5xl tabular-nums">{progress.percent}%</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {progress.rated} of {progress.total} skills rated
          </p>
          <Progress value={progress.percent} label="Assessment progress" className="mt-4" />
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Check aria-hidden="true" className="size-3.5" />
            Answers save automatically
          </p>
        </div>
        <nav aria-label="Assessment categories" className="rounded-2xl border border-border bg-surface p-2">
          <ul>
            {progress.byCategory.map(({ category, rated, total }) => {
              const done = rated === total;
              return (
                <li key={category.id}>
                  <a
                    href={`#cat-${category.id}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-sunken"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border",
                        done ? "border-primary bg-primary text-primary-foreground" : "border-border-strong",
                      )}
                    >
                      {done && <Check className="size-3" strokeWidth={3} />}
                    </span>
                    <span title={category.name} className="min-w-0 flex-1 truncate">
                      {category.name}
                    </span>
                    <span className="font-label text-xs text-muted-foreground tabular-nums">
                      {rated}/{total}
                      <span className="sr-only"> rated</span>
                    </span>
                  </a>
                </li>
              );
            })}
            <li className="mt-1 border-t border-border pt-1">
              <a href="#knowledge-check" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface-sunken hover:text-foreground">
                <Sparkles aria-hidden="true" className="size-4" />
                Knowledge check (optional)
              </a>
            </li>
            <li>
              <a href="#finish" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface-sunken hover:text-foreground">
                <ArrowRight aria-hidden="true" className="size-4" />
                Generate roadmap
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

function LevelGuide({ role }: { role: Role }) {
  return (
    <section aria-labelledby="levels-title" className="rounded-2xl border border-border bg-surface-sunken/50 p-5 sm:p-6">
      <h2 id="levels-title" className="text-sm font-semibold">
        How to rate yourself
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Be honest: your roadmap skips what you already know. You can change any answer at any time.
      </p>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {levels.map((l) => (
          <div key={l.value}>
            <dt className="flex items-center gap-2 text-sm font-medium">
              <LevelMeter level={l.value} />
              {l.label}
            </dt>
            <dd className="mt-1 text-sm text-muted-foreground">{l.description}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
        Each skill shows the level a {role.title} needs. Anything below it goes into your roadmap, and Mastered skills
        always count as complete.
      </p>
    </section>
  );
}

function CategorySection({
  index,
  category,
  ratings,
  onRate,
  roleSlug,
}: {
  index: number;
  category: SkillCategory;
  ratings: Ratings;
  onRate: (skillId: string, level: Level) => void;
  roleSlug: string;
}) {
  const unrated = category.skills.filter((s) => ratings[s.id] === undefined);
  const rated = category.skills.length - unrated.length;

  return (
    <section id={`cat-${category.id}`} aria-labelledby={`cat-${category.id}-title`} className="scroll-mt-32 rounded-2xl border border-border bg-surface lg:scroll-mt-24">
      <header className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border-strong font-label text-sm">{index + 1}</span>
          <div>
            <h2 id={`cat-${category.id}-title`} className="font-semibold tracking-tight">
              {category.name}
            </h2>
            <p className="text-xs text-muted-foreground">
              {category.phase} · {rated} of {category.skills.length} rated
            </p>
          </div>
        </div>
        {unrated.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="self-start text-muted-foreground sm:self-auto"
            onClick={() => actions.setRatings(roleSlug, Object.fromEntries(unrated.map((s) => [s.id, 0 as Level])))}
          >
            {unrated.length === category.skills.length ? "I haven't started any of these" : "Mark the rest Not Started"}
          </Button>
        )}
      </header>
      <ul className="divide-y divide-border">
        {category.skills.map((skill) => {
          const nameId = `skill-${skill.id}-name`;
          const descId = `skill-${skill.id}-desc`;
          return (
            <li key={skill.id} className="flex flex-col gap-3 px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6">
              <div className="min-w-0">
                <p id={nameId} className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  {skill.name}
                  <span className="rounded-full border border-border px-2 py-px text-[0.65rem] font-normal text-muted-foreground">
                    Needs {levelLabel(skill.required)}
                  </span>
                </p>
                <p id={descId} className="mt-0.5 text-sm text-muted-foreground">
                  {skill.description}
                </p>
              </div>
              <LevelPicker
                name={`skill-${skill.id}`}
                value={ratings[skill.id]}
                onChange={(level) => onRate(skill.id, level)}
                labelledBy={nameId}
                describedBy={descId}
                className="w-full shrink-0 md:w-[27rem]"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function FinishPanel({
  role,
  ratings,
  quiz,
  progress,
  hasRoadmap,
}: {
  role: Role;
  ratings: Ratings;
  quiz: Record<string, number>;
  progress: ProgressInfo;
  hasRoadmap: boolean;
}) {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const unrated = progress.total - progress.rated;
  const counts = levels.map((l) => ({ ...l, count: Object.values(ratings).filter((v) => v === l.value).length }));
  const quizAnswered = role.quiz.filter((q) => quiz[q.id] !== undefined).length;

  function jumpToFirstUnrated() {
    const skill = role.categories.flatMap((c) => c.skills).find((s) => ratings[s.id] === undefined);
    if (!skill) return;
    const first = document.getElementById(`skill-${skill.id}-0`);
    first?.closest("li")?.scrollIntoView({ behavior: "smooth", block: "center" });
    first?.focus({ preventScroll: true });
  }

  function generate() {
    setGenerating(true);
    actions.generateRoadmap(role.slug);
    toast("Roadmap generated", { description: "Your progress, dashboard and next recommended skill are ready." });
    router.push("/roadmap");
  }

  return (
    <section id="finish" aria-labelledby="finish-title" data-theme="dark" className="scroll-mt-32 rounded-2xl border border-border bg-background p-6 text-foreground shadow-elev-3 sm:p-8 lg:scroll-mt-24">
      <h2 id="finish-title" className="font-display text-3xl tracking-tight sm:text-4xl">
        Ready for your roadmap?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {progress.rated} of {progress.total} skills rated
        {quizAnswered > 0 && ` · ${quizAnswered} of ${role.quiz.length} knowledge-check questions answered`}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Your ratings by level">
        {counts.map((c) => (
          <li key={c.value} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs">
            <LevelMeter level={c.value} />
            {c.label}
            <span className="font-label tabular-nums text-muted-foreground">{c.count}</span>
          </li>
        ))}
      </ul>

      {unrated > 0 && (
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="flex gap-2">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-warning" />
            <span>
              {unrated === progress.total
                ? "You haven't rated any skills yet. Your roadmap will start from scratch."
                : `${unrated} ${unrated === 1 ? "skill isn't" : "skills aren't"} rated yet. ${unrated === 1 ? "It" : "They"}'ll count as Not Started.`}
            </span>
          </p>
          <Button variant="secondary" size="sm" onClick={jumpToFirstUnrated} className="shrink-0">
            Rate {unrated === 1 ? "it" : "them"} now
          </Button>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" onClick={generate} disabled={generating}>
          Generate My Roadmap
          <ArrowRight aria-hidden="true" />
        </Button>
        {hasRoadmap && (
          <Link href="/roadmap" className={buttonVariants({ variant: "ghost", size: "lg" })}>
            View my roadmap
          </Link>
        )}
      </div>
    </section>
  );
}
