"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Roadmap } from "@/lib/roadmap";
import { SkillNode } from "./skill-node";

type Edge = { from: string; to: string; d: string };

/**
 * The prerequisite graph. Columns are dependency depth: everything in a column can be learned once the
 * columns to its left are done. Lines run from each prerequisite to the skill it unlocks.
 * On small screens the same graph is shown as a vertical timeline.
 */
export function SkillGraph({
  roadmap,
  selectedId,
  onSelect,
}: {
  roadmap: Roadmap;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? selectedId;
  const related = new Set<string>();
  if (active) {
    const n = roadmap.byId.get(active);
    n?.prerequisites.forEach((p) => related.add(p));
    n?.dependents.forEach((d) => related.add(d));
  }

  return (
    <>
      <DesktopGraph roadmap={roadmap} active={active} related={related} onSelect={onSelect} onHover={setHovered} />
      <MobileTimeline roadmap={roadmap} onSelect={onSelect} />
    </>
  );
}

function DesktopGraph({
  roadmap,
  active,
  related,
  onSelect,
  onHover,
}: {
  roadmap: Roadmap;
  active: string | null;
  related: Set<string>;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());
  const [overflow, setOverflow] = useState({ left: false, right: false });
  const checkOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setOverflow({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Measure node positions after layout and whenever the graph resizes (fonts loading, window resizing).
  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const compute = () => {
      const base = inner.getBoundingClientRect();
      if (!base.width) return; // hidden (mobile layout)
      const next: Edge[] = [];
      for (const node of roadmap.nodes) {
        const to = nodeRefs.current.get(node.skill.id);
        for (const prereq of node.prerequisites) {
          const from = nodeRefs.current.get(prereq);
          if (!from || !to) continue;
          const a = from.getBoundingClientRect();
          const b = to.getBoundingClientRect();
          const x1 = a.right - base.left;
          const y1 = a.top + a.height / 2 - base.top;
          const x2 = b.left - base.left;
          const y2 = b.top + b.height / 2 - base.top;
          const bend = Math.max(28, (x2 - x1) * 0.5);
          next.push({
            from: prereq,
            to: node.skill.id,
            d: `M${x1},${y1} C${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}`,
          });
        }
      }
      setEdges(next);
      setSize({ w: inner.scrollWidth, h: inner.scrollHeight });
      checkOverflow();
    };
    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [roadmap, checkOverflow]);

  return (
    <div className="relative hidden md:block">
      {overflow.right && (
        <p className="absolute -bottom-6 right-0 text-xs text-muted-foreground" aria-hidden="true">
          Scroll to see all {roadmap.columns.length} steps →
        </p>
      )}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-px left-px z-20 w-10 rounded-l-2xl bg-gradient-to-r from-background to-transparent transition-opacity",
          overflow.left ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-px right-px z-20 w-16 rounded-r-2xl bg-gradient-to-l from-background to-transparent transition-opacity",
          overflow.right ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={scrollRef}
        onScroll={checkOverflow}
        role="region"
        aria-label={`Skill dependency graph, ${roadmap.columns.length} steps`}
        tabIndex={0}
        className="overflow-x-auto rounded-2xl border border-border bg-surface-sunken/40"
      >
        <div ref={innerRef} className="relative inline-flex min-w-full items-stretch gap-12 p-6">
          <svg aria-hidden="true" className="pointer-events-none absolute top-0 left-0" width={size.w} height={size.h}>
            {edges.map((e) => {
              const isActive = active !== null && (e.from === active || e.to === active);
              const fromDone = roadmap.byId.get(e.from)?.status === "completed";
              return (
                <path
                  key={`${e.from}-${e.to}`}
                  d={e.d}
                  fill="none"
                  stroke={isActive ? "var(--foreground)" : fromDone ? "var(--success)" : "var(--border-strong)"}
                  strokeOpacity={isActive ? 0.9 : active ? 0.25 : fromDone ? 0.55 : 0.8}
                  strokeWidth={isActive ? 2 : 1.25}
                  className="transition-[stroke,stroke-opacity]"
                />
              );
            })}
            {edges.map((e) => {
              // Small terminal dot where a line enters the skill it unlocks.
              const end = e.d.split(" ").at(-1)!.split(",").map(Number);
              const isActive = active !== null && (e.from === active || e.to === active);
              return (
                <circle
                  key={`dot-${e.from}-${e.to}`}
                  cx={end[0]}
                  cy={end[1]}
                  r={isActive ? 3 : 2.25}
                  fill={isActive ? "var(--foreground)" : "var(--border-strong)"}
                  fillOpacity={active && !isActive ? 0.3 : 1}
                />
              );
            })}
          </svg>

          {roadmap.columns.map((column, depth) => (
            <div key={depth} className="relative z-10 flex w-48 shrink-0 flex-col">
              <p className="mb-4 font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {depth === 0 ? "Start here" : `Step ${depth + 1}`}
              </p>
              <ol className="flex flex-1 flex-col justify-center gap-3">
                {column.map((node) => (
                  <li key={node.skill.id}>
                    <SkillNode
                      ref={(el) => {
                        if (el) nodeRefs.current.set(node.skill.id, el);
                        else nodeRefs.current.delete(node.skill.id);
                      }}
                      node={node}
                      onSelect={onSelect}
                      onHover={onHover}
                      highlighted={active === node.skill.id || related.has(node.skill.id)}
                      className={cn(active && active !== node.skill.id && !related.has(node.skill.id) && "opacity-60")}
                    />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileTimeline({ roadmap, onSelect }: { roadmap: Roadmap; onSelect: (id: string) => void }) {
  const name = (id: string) => roadmap.byId.get(id)?.skill.name ?? id;
  return (
    <ol aria-label="Skill learning order" className="space-y-6 md:hidden">
      {roadmap.columns.map((column, depth) => (
        <li key={depth} className="relative pl-8">
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 grid size-6 place-items-center rounded-full border border-border-strong bg-background font-label text-xs"
          >
            {depth + 1}
          </span>
          {depth < roadmap.columns.length - 1 && (
            <span aria-hidden="true" className="absolute top-7 bottom-[-1.5rem] left-[0.6875rem] w-px bg-border" />
          )}
          <p className="pt-0.5 font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {depth === 0 ? "Start here" : `Step ${depth + 1}`}
          </p>
          <ul className="mt-3 space-y-2.5">
            {column.map((node) => (
              <li key={node.skill.id}>
                <SkillNode
                  node={node}
                  onSelect={onSelect}
                  note={node.prerequisites.length ? `After ${node.prerequisites.map(name).join(", ")}` : undefined}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
