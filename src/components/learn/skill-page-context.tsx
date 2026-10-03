"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CircleCheck, PartyPopper, Sparkles, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Lesson } from "@/data/learning";
import type { Role, Skill } from "@/data/roles";
import { levelLabel, type Level } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { emptyProgress, type SkillProgress } from "@/lib/learning";
import { learnHref } from "@/lib/routes";
import { roadmapFor } from "@/lib/progress";
import type { Roadmap, RoadmapNode } from "@/lib/roadmap";
import { useAppState, type AppState, type LearningResult } from "@/lib/store";
import { SkillQuiz } from "./skill-quiz";

type Notice = { id: number; title: string; body?: string };
type Celebration = { level: Level; from: number; to: number; next: RoadmapNode | null };

type SkillPageValue = {
  role: Role;
  skill: Skill;
  lesson: Lesson;
  /** undefined until saved state has loaded in the browser */
  state: AppState | undefined;
  roadmap: Roadmap | undefined;
  node: RoadmapNode | undefined;
  progress: SkillProgress;
  /** Show feedback for a learning action that may have raised the skill's level. */
  report: (result: LearningResult, action: string) => void;
  openQuiz: () => void;
};

const SkillPageContext = createContext<SkillPageValue | null>(null);

export function useSkillPage() {
  const ctx = useContext(SkillPageContext);
  if (!ctx) throw new Error("useSkillPage must be used inside <SkillPageProvider>");
  return ctx;
}

export { learnHref } from "@/lib/routes";

export function SkillPageProvider({
  role,
  skill,
  lesson,
  children,
}: {
  role: Role;
  skill: Skill;
  lesson: Lesson;
  children: React.ReactNode;
}) {
  const state = useAppState();
  const learning = state?.learning[role.slug];
  // Same calculation as the roadmap and dashboard (lib/progress.ts roadmapFor).
  const roadmap = useMemo(() => (state ? roadmapFor(state, role) : undefined), [state, role]);
  const node = roadmap?.byId.get(skill.id);
  const progress = learning?.skills?.[skill.id] ?? emptyProgress;

  const [notice, setNotice] = useState<Notice | null>(null);
  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);

  // Links like /learn/<role>/<skill>?quiz=1 (e.g. from the roadmap) open the quiz straight away.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("quiz") !== "1") return;
    // Strip the flag only when actually opening, so a cancelled (e.g. Strict Mode) run doesn't lose it.
    const frame = requestAnimationFrame(() => {
      params.delete("quiz");
      const query = params.toString();
      window.history.replaceState(window.history.state, "", window.location.pathname + (query ? `?${query}` : ""));
      setQuizOpen(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Celebrate when this skill becomes complete, however it happened (topics, projects, quiz or a manual update).
  const last = useRef<{ status?: string; percent?: number }>({});
  useEffect(() => {
    if (!node || !roadmap) return;
    const prev = last.current;
    if (prev.status && prev.status !== "completed" && node.status === "completed") {
      setNotice(null);
      setCelebration({ level: node.level, from: prev.percent ?? roadmap.progress.percent, to: roadmap.progress.percent, next: roadmap.focus });
    }
    last.current = { status: node.status, percent: roadmap.progress.percent };
  }, [node, roadmap]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 5000);
    return () => clearTimeout(t);
  }, [notice]);

  const report = useCallback(
    (result: LearningResult, action: string) => {
      if (result.raisedTo === null) return;
      // Completion gets the bigger celebration via the effect above; this covers smaller level-ups.
      if (result.raisedTo >= skill.required) return;
      setNotice({
        id: Date.now(),
        title: `You've reached ${levelLabel(result.raisedTo)}`,
        body: `${action} raised your ${skill.name} level. Your roadmap and dashboard are updated.`,
      });
    },
    [skill],
  );

  const value: SkillPageValue = {
    role,
    skill,
    lesson,
    state,
    roadmap,
    node,
    progress,
    report,
    openQuiz: () => setQuizOpen(true),
  };

  return (
    <SkillPageContext.Provider value={value}>
      {children}
      <SkillQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />

      {/* Polite live region for level-up messages */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        {notice && (
          <div
            key={notice.id}
            role="status"
            className="pointer-events-auto flex max-w-md animate-fade-up items-start gap-3 rounded-2xl border border-info/40 bg-surface p-4 shadow-elev-3"
          >
            <Sparkles aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-info" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{notice.title}</p>
              {notice.body && <p className="mt-0.5 text-sm text-muted-foreground">{notice.body}</p>}
            </div>
            <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss" className="grid size-7 place-items-center rounded-full hover:bg-surface-sunken">
              <X className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Held back while the quiz dialog is open (it sits in the top layer), then shown and focused. */}
      {celebration && !quizOpen && (
        <CelebrationBanner role={role} skill={skill} celebration={celebration} onClose={() => setCelebration(null)} />
      )}
    </SkillPageContext.Provider>
  );
}

function CelebrationBanner({
  role,
  skill,
  celebration,
  onClose,
}: {
  role: Role;
  skill: Skill;
  celebration: Celebration;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const { next } = celebration;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:pb-6">
      <div
        ref={ref}
        tabIndex={-1}
        role="alertdialog"
        aria-labelledby="celebrate-title"
        aria-describedby="celebrate-body"
        className="mx-auto max-w-xl animate-fade-up rounded-3xl border border-success/40 bg-surface p-6 shadow-elev-3 focus:outline-none"
      >
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-success text-background">
            <PartyPopper aria-hidden="true" className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p id="celebrate-title" className="text-lg font-semibold tracking-tight">
              Skill complete: {skill.name}
            </p>
            <p id="celebrate-body" className="mt-1 text-sm text-muted-foreground">
              You&apos;re at {levelLabel(celebration.level)}, which meets what a {role.title} needs. Overall progress went from{" "}
              <span className="font-medium text-foreground">{celebration.from}%</span> to{" "}
              <span className="font-medium text-foreground">{celebration.to}%</span>.
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-surface-sunken">
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          {next ? (
            <Link href={learnHref(role.slug, next.skill.id)} onClick={onClose} className={buttonVariants({ className: "justify-center" })}>
              Next up: {next.skill.name}
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <p className="flex items-center gap-2 text-sm font-medium text-success">
              <CircleCheck aria-hidden="true" className="size-4" />
              Every {role.title} skill is complete
            </p>
          )}
          <Link href="/roadmap" onClick={onClose} className={cn(buttonVariants({ variant: "ghost" }), "justify-center")}>
            View roadmap
          </Link>
        </div>
      </div>
    </div>
  );
}
