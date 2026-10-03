"use client";

import Link from "next/link";
import { CircleCheck, ClipboardCheck, Play, Target } from "lucide-react";
import { LevelPicker } from "@/components/assessment/level-picker";
import { LevelPips } from "@/components/roadmap/skill-node";
import { statusMeta } from "@/components/roadmap/status";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Progress } from "@/components/ui/progress";
import { getRole } from "@/data/roles";
import { levelLabel } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { nextEarnStep, progressSummary } from "@/lib/learning";
import { actions } from "@/lib/store";
import { toast } from "@/lib/toast";
import { useSkillPage } from "./skill-page-context";

/** This page belongs to a career that isn't the active goal: say where progress is saved, and offer to switch. */
function OtherCareerNote({ roleSlug, roleTitle, goalSlug }: { roleSlug: string; roleTitle: string; goalSlug: string | undefined }) {
  const goal = getRole(goalSlug);
  return (
    <div className="mt-4 rounded-lg bg-info-soft px-3 py-2.5 text-sm">
      {goal ? (
        <>
          <p>
            Your current goal is {goal.title}. Progress here is saved to your {roleTitle} career and won&apos;t change your{" "}
            {goal.title} roadmap.
          </p>
          <button
            type="button"
            onClick={() => {
              actions.switchGoal(roleSlug);
              toast(`${roleTitle} is now your active goal`, { description: `Your ${goal.title} progress is saved and unchanged.` });
            }}
            className="mt-1.5 font-medium underline underline-offset-4"
          >
            Make {roleTitle} my goal
          </button>
        </>
      ) : (
        <>
          <p>You haven&apos;t set a career goal yet. Progress here is saved to a {roleTitle} career in this browser.</p>
          <Link href={`/start?role=${roleSlug}`} className="mt-1.5 inline-block font-medium underline underline-offset-4">
            Set {roleTitle} as my goal
          </Link>
        </>
      )}
    </div>
  );
}

export function StatusChip() {
  const { node } = useSkillPage();
  if (!node) return <span className="inline-block h-7 w-28 animate-pulse rounded-full bg-surface-sunken" />;
  const meta = statusMeta[node.status];
  const Icon = meta.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium", meta.node, meta.text)}>
      <Icon aria-hidden="true" className="size-4" />
      {meta.label}
      {node.isCurrent && <span className="ml-1 rounded-full bg-info px-2 py-px text-xs font-semibold text-background">Current focus</span>}
    </span>
  );
}

/** Sidebar: proficiency, learning progress, and the main actions for this skill. */
export function ProgressPanel() {
  const { role, skill, lesson, state, node, progress, openQuiz } = useSkillPage();

  if (!node) {
    return <div aria-busy="true" aria-label="Loading your progress" className="h-96 animate-pulse rounded-2xl bg-surface-sunken" />;
  }

  const meta = statusMeta[node.status];
  const summary = progressSummary(lesson, progress);
  const nextStep = nextEarnStep(lesson, progress, node.level);
  const completed = node.status === "completed";

  return (
    <section aria-labelledby="progress-title" className="rounded-2xl border border-border bg-surface p-6 shadow-elev-2">
      <Eyebrow id="progress-title">Your progress</Eyebrow>
      {state && state.setup?.roleSlug !== role.slug && <OtherCareerNote roleSlug={role.slug} roleTitle={role.title} goalSlug={state.setup?.roleSlug} />}

      <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Your level</dt>
          <dd className="mt-1 font-semibold">{node.rated || node.level > 0 ? levelLabel(node.level) : "Not rated"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{role.title} needs</dt>
          <dd className="mt-1 font-semibold">{levelLabel(node.required)}</dd>
        </div>
      </dl>
      <div className={cn("mt-3 flex items-center gap-2", meta.text)}>
        <LevelPips level={Math.min(node.level, node.required)} required={node.required} />
        <span className="text-xs text-muted-foreground">
          {completed ? "Requirement met" : `${node.required - node.level} ${node.required - node.level === 1 ? "level" : "levels"} to go`}
        </span>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium">Learning progress</p>
          <p className="font-label text-2xl tabular-nums">{summary.percent}%</p>
        </div>
        <Progress value={summary.percent} label={`${skill.name} learning progress`} className="mt-2" />
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          <li>
            Topics {summary.topicsDone} of {summary.topicsTotal}
          </li>
          <li>
            Projects {summary.projectsDone} of {summary.projectsTotal}
          </li>
          <li>{summary.quiz ? `Knowledge check: best ${summary.quiz.best} of ${summary.quiz.total}` : "Knowledge check: not taken"}</li>
        </ul>
        {nextStep && nextStep.steps.length > 0 && (
          <p className="mt-3 flex gap-2 rounded-lg bg-surface-sunken/70 px-3 py-2 text-xs">
            <Target aria-hidden="true" className="mt-px size-3.5 shrink-0" />
            <span>
              To reach {levelLabel(nextStep.level)} through learning: {nextStep.steps.join(", ")}.
            </span>
          </p>
        )}
      </div>

      <div className="mt-6 space-y-2">
        {completed ? (
          <p className="flex items-center justify-center gap-2 rounded-full bg-success-soft px-4 py-2.5 text-sm font-medium text-success">
            <CircleCheck aria-hidden="true" className="size-4" />
            Completed for this role
          </p>
        ) : (
          <Button className="w-full" onClick={() => actions.reachLevel(role.slug, skill, node.required)}>
            <CircleCheck aria-hidden="true" />
            Mark as Completed
          </Button>
        )}
        <Button variant="secondary" className="w-full" onClick={openQuiz}>
          <ClipboardCheck aria-hidden="true" />
          Test My Knowledge
        </Button>
        {!completed &&
          (node.isCurrent ? (
            <Button variant="ghost" className="w-full" onClick={() => actions.clearCurrent(role.slug)}>
              Stop focusing on this
            </Button>
          ) : (
            <Button variant="ghost" className="w-full" onClick={() => actions.startSkill(role.slug, skill.id)}>
              <Play aria-hidden="true" />
              Make this my current focus
            </Button>
          ))}
        {!completed && (
          <p className="text-center text-xs text-muted-foreground">
            Marking complete sets your level to {levelLabel(node.required)}.
          </p>
        )}
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p id={`panel-level-${skill.id}`} className="text-sm font-medium">
          Update your level
        </p>
        <LevelPicker
          name={`panel-${skill.id}`}
          value={node.rated || node.level > 0 ? node.level : undefined}
          onChange={(level) => actions.setRating(role.slug, skill.id, level)}
          labelledBy={`panel-level-${skill.id}`}
          className="mt-2 sm:grid-cols-2"
        />
        <p className="mt-2 text-xs text-muted-foreground">Changes update your assessment, roadmap and dashboard straight away.</p>
      </div>
    </section>
  );
}
