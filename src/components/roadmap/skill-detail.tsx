"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, BookOpen, CircleAlert, CircleCheck, ClipboardCheck, Clock, Lock, Play, X } from "lucide-react";
import { LevelPicker } from "@/components/assessment/level-picker";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getSkillLearning } from "@/data/learning";
import type { Role } from "@/data/roles";
import { levelLabel } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { emptyProgress, progressSummary } from "@/lib/learning";
import type { Roadmap, RoadmapNode } from "@/lib/roadmap";
import { learnHref } from "@/lib/routes";
import { actions, useAppState } from "@/lib/store";
import { LevelPips } from "./skill-node";
import { statusMeta } from "./status";

/**
 * Skill detail sheet (native <dialog>: focus trap, Escape and focus return come for free).
 * Every action writes to the shared store, so the graph behind it updates immediately.
 */
export function SkillDetail({
  role,
  roadmap,
  skillId,
  onClose,
  onNavigate,
}: {
  role: Role;
  roadmap: Roadmap;
  skillId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const node = skillId ? roadmap.byId.get(skillId) : undefined;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (node && !dialog.open) dialog.showModal();
    if (!node && dialog.open) dialog.close();
  }, [node]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="skill-detail-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={cn(
        "m-0 mt-auto h-[88dvh] max-h-none w-full max-w-none rounded-t-3xl border border-border bg-background p-0 text-foreground shadow-elev-3",
        "sm:mt-0 sm:ml-auto sm:h-dvh sm:max-w-lg sm:rounded-none sm:rounded-l-3xl",
        "backdrop:bg-indigo/40 backdrop:backdrop-blur-[2px]",
      )}
    >
      {node && <DetailBody role={role} roadmap={roadmap} node={node} onClose={onClose} onNavigate={onNavigate} />}
    </dialog>
  );
}

function DetailBody({
  role,
  roadmap,
  node,
  onClose,
  onNavigate,
}: {
  role: Role;
  roadmap: Roadmap;
  node: RoadmapNode;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const meta = statusMeta[node.status];
  const StatusIcon = meta.icon;
  const unmetPrereqs = node.prerequisites.map((id) => roadmap.byId.get(id)!).filter((p) => p.status !== "completed");
  const id = node.skill.id;
  const planPosition = roadmap.plan.indexOf(node) + 1;

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-start justify-between gap-4 border-b border-border px-6 pt-6 pb-5">
        <div className="min-w-0">
          <p className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {node.category.name} · {node.category.phase}
          </p>
          <h2 id="skill-detail-title" className="mt-2 font-display text-3xl leading-tight tracking-tight">
            {node.skill.name}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", meta.node, meta.text)}>
              <StatusIcon aria-hidden="true" className="size-3.5" />
              {meta.label}
            </span>
            {node.isCurrent && <span className="rounded-full bg-info px-2.5 py-1 text-xs font-semibold text-background">Current focus</span>}
            <span className="text-xs text-muted-foreground">
              Step {node.depth + 1}
              {planPosition > 0 && ` · #${planPosition} of ${roadmap.plan.length} in what you're missing`}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close skill details"
          className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-surface-sunken"
        >
          <X className="size-5" />
        </button>
      </header>

      <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
        <p className="text-muted-foreground">{node.skill.description}</p>

        <LearningCard role={role} node={node} />

        <section aria-labelledby="detail-level" className="rounded-2xl border border-border bg-surface p-5">
          <h3 id="detail-level" className="sr-only">
            Your level
          </h3>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Your level</dt>
              <dd className="mt-1 font-medium">{node.rated || node.level > 0 ? levelLabel(node.level) : "Not rated"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{role.title} needs</dt>
              <dd className="mt-1 font-medium">{levelLabel(node.required)}</dd>
            </div>
          </dl>
          <div className={cn("mt-4 flex items-center gap-3", meta.text)}>
            <LevelPips level={Math.min(node.level, node.required)} required={node.required} />
            <span className="text-xs text-muted-foreground">
              {node.status === "completed"
                ? node.level > node.required
                  ? `Above the requirement`
                  : "Meets the requirement"
                : `${node.required - node.level} ${node.required - node.level === 1 ? "level" : "levels"} to go · about ${node.hoursRemaining} hours`}
            </span>
          </div>

          <p id={`detail-update-${id}`} className="mt-5 text-sm font-medium">
            Update your level
          </p>
          <LevelPicker
            name={`detail-${id}`}
            value={node.rated || node.level > 0 ? node.level : undefined}
            onChange={(level) => actions.setRating(role.slug, id, level)}
            labelledBy={`detail-update-${id}`}
            className="mt-2"
          />
          <p className="mt-2 text-xs text-muted-foreground">Changes update your assessment and roadmap straight away.</p>
        </section>

        {node.quiz && (
          <p
            className={cn(
              "flex gap-2 rounded-xl px-4 py-3 text-sm",
              node.quiz === "verified" ? "bg-success-soft text-success" : "bg-warning-soft text-warning",
            )}
          >
            {node.quiz === "verified" ? <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" /> : <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />}
            {node.quiz === "verified"
              ? "You answered this skill's knowledge-check question correctly."
              : "You missed this skill's knowledge-check question. A quick refresher is worth it before moving on."}
          </p>
        )}

        {node.status !== "completed" && unmetPrereqs.length > 0 && (
          <p className="flex gap-2 rounded-xl bg-surface-sunken px-4 py-3 text-sm">
            <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            We recommend finishing {unmetPrereqs.map((p) => p.skill.name).join(", ")} first. You can still start this now.
          </p>
        )}

        <SkillLinks title="Learn first" empty="No prerequisites. A good place to start." ids={node.prerequisites} roadmap={roadmap} onNavigate={onNavigate} />
        <SkillLinks title="Unlocks" empty="Nothing depends on this. It's a finishing skill for the role." ids={node.dependents} roadmap={roadmap} onNavigate={onNavigate} />
      </div>

      <footer className="flex flex-col gap-2 border-t border-border px-6 py-4 sm:flex-row-reverse sm:items-center sm:justify-between">
        {node.status === "completed" ? (
          <p className="flex items-center gap-2 text-sm text-success">
            <CircleCheck aria-hidden="true" className="size-4" />
            Completed for this role
          </p>
        ) : (
          <div className="flex flex-col gap-2 sm:flex-row-reverse">
            <Button onClick={() => actions.reachLevel(role.slug, node.skill, node.required)}>
              <CircleCheck aria-hidden="true" />
              I&apos;ve reached {levelLabel(node.required)}
            </Button>
            {node.isCurrent ? (
              <Button variant="ghost" onClick={() => actions.clearCurrent(role.slug)}>
                Stop focusing on this
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => actions.startSkill(role.slug, id)}>
                <Play aria-hidden="true" />
                {node.status === "in-progress" ? "Make this my focus" : "Start learning"}
              </Button>
            )}
          </div>
        )}
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock aria-hidden="true" className="size-3.5" />
          {node.hoursRemaining ? `~${node.hoursRemaining} h remaining` : "Nothing remaining"}
        </p>
      </footer>
    </div>
  );
}

function LearningCard({ role, node }: { role: Role; node: RoadmapNode }) {
  const state = useAppState();
  const learning = getSkillLearning(role.slug, node.skill.id);
  if (!learning) return null;
  const progress = state?.learning[role.slug]?.skills?.[node.skill.id] ?? emptyProgress;
  const summary = progressSummary(learning.lesson, progress);
  return (
    <section aria-labelledby="detail-learn" className="rounded-2xl border border-border bg-surface-sunken/50 p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 id="detail-learn" className="text-sm font-semibold">
          Learning progress
        </h3>
        <span className="font-label text-lg tabular-nums">{summary.percent}%</span>
      </div>
      <Progress value={summary.percent} label="Learning progress" className="mt-2 h-1.5" />
      <p className="mt-2 text-xs text-muted-foreground">
        {summary.topicsDone} of {summary.topicsTotal} topics · {summary.projectsDone} of {summary.projectsTotal} projects ·{" "}
        {summary.quiz ? `quiz best ${summary.quiz.best}/${summary.quiz.total}` : "quiz not taken"}
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link href={learnHref(role.slug, node.skill.id)} className={buttonVariants({ className: "w-full" })}>
          <BookOpen aria-hidden="true" />
          Open learning page
        </Link>
        <Link href={`${learnHref(role.slug, node.skill.id)}?quiz=1`} className={buttonVariants({ variant: "secondary", className: "w-full" })}>
          <ClipboardCheck aria-hidden="true" />
          Test My Knowledge
        </Link>
      </div>
    </section>
  );
}

function SkillLinks({
  title,
  empty,
  ids,
  roadmap,
  onNavigate,
}: {
  title: string;
  empty: string;
  ids: string[];
  roadmap: Roadmap;
  onNavigate: (id: string) => void;
}) {
  return (
    <section>
      <h3 className="text-sm font-semibold">{title}</h3>
      {ids.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {ids.map((sid) => {
            const n = roadmap.byId.get(sid)!;
            const m = statusMeta[n.status];
            return (
              <li key={sid}>
                <button
                  type="button"
                  onClick={() => onNavigate(sid)}
                  className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-left text-sm transition-colors hover:border-border-strong"
                >
                  <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full", m.dot)} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{n.skill.name}</span>
                    <span className={cn("block text-xs", m.text)}>
                      {m.label} · needs {levelLabel(n.required)}
                    </span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
