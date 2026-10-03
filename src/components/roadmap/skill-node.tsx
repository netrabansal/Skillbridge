"use client";

import { forwardRef } from "react";
import { Lock } from "lucide-react";
import { levelLabel } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import type { RoadmapNode } from "@/lib/roadmap";
import { statusMeta } from "./status";

/** Proficiency pips: one per required level, filled up to the user's level. */
export function LevelPips({ level, required, className }: { level: number; required: number; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex gap-1", className)}>
      {Array.from({ length: required }, (_, i) => (
        <span key={i} className={cn("h-1.5 w-4 rounded-full", i < level ? "bg-current" : "bg-current opacity-20")} />
      ))}
    </span>
  );
}

type SkillNodeProps = {
  node: RoadmapNode;
  onSelect: (id: string) => void;
  onHover?: (id: string | null) => void;
  highlighted?: boolean;
  /** Extra line under the name, e.g. prerequisites in the mobile timeline. */
  note?: string;
  className?: string;
};

export const SkillNode = forwardRef<HTMLButtonElement, SkillNodeProps>(function SkillNode(
  { node, onSelect, onHover, highlighted, note, className },
  ref,
) {
  const meta = statusMeta[node.status];
  const locked = node.status === "not-started" && !node.ready;
  const Icon = locked ? Lock : meta.icon;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onSelect(node.skill.id)}
      onMouseEnter={() => onHover?.(node.skill.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(node.skill.id)}
      onBlur={() => onHover?.(null)}
      aria-haspopup="dialog"
      className={cn(
        "group relative flex w-full flex-col rounded-xl border border-l-4 p-3 pl-2.5 text-left transition-all",
        "hover:-translate-y-0.5 hover:shadow-elev-2",
        meta.node,
        meta.accent,
        node.isCurrent && "ring-2 ring-info ring-offset-2 ring-offset-background",
        highlighted && !node.isCurrent && "shadow-elev-2 ring-1 ring-foreground/40",
        className,
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className={cn("inline-flex items-center gap-1.5 text-[0.7rem] font-medium", meta.text)}>
          <Icon aria-hidden="true" className="size-3.5" strokeWidth={2.25} />
          {locked ? "Prerequisites first" : meta.label}
        </span>
        {node.isCurrent ? (
          <span className="rounded-full bg-info px-2 py-px text-[0.65rem] font-semibold text-background">Current</span>
        ) : node.isFocus ? (
          <span className="rounded-full border border-info px-2 py-px text-[0.65rem] font-semibold text-info">Up next</span>
        ) : null}
      </span>
      <span className="mt-1.5 line-clamp-2 text-sm leading-snug font-medium text-foreground">{node.skill.name}</span>
      {note && <span className="mt-1 text-xs text-muted-foreground">{note}</span>}
      <span className={cn("mt-2.5 flex items-center justify-between gap-2", meta.text)}>
        <LevelPips level={Math.min(node.level, node.required)} required={node.required} />
        <span className="text-[0.7rem] text-muted-foreground">
          {node.status === "completed" ? levelLabel(node.level) : `Needs ${levelLabel(node.required)}`}
        </span>
      </span>
    </button>
  );
});
