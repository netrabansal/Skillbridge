"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { statusMeta } from "@/components/roadmap/status";
import { getRole } from "@/data/roles";
import { levelLabel } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { learnHref, useSkillPage } from "./skill-page-context";

/** Prerequisites or unlocked skills, linking to their learning pages with live status. */
export function SkillLinks({ kind }: { kind: "prerequisites" | "unlocks" }) {
  const { role, skill, roadmap } = useSkillPage();
  const fullRole = getRole(role.slug)!;
  const all = fullRole.categories.flatMap((c) => c.skills);
  const ids = kind === "prerequisites" ? skill.requires : all.filter((s) => s.requires.includes(skill.id)).map((s) => s.id);

  if (!ids.length) {
    return (
      <p className="text-sm text-muted-foreground">
        {kind === "prerequisites" ? "None. This is a good place to start." : "Nothing depends on this. It's a finishing skill for the role."}
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {ids.map((id) => {
        const s = all.find((x) => x.id === id)!;
        const node = roadmap?.byId.get(id);
        const meta = node ? statusMeta[node.status] : null;
        return (
          <li key={id}>
            <Link
              href={learnHref(role.slug, id)}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-border-strong"
            >
              <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full", meta?.dot ?? "bg-border")} />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{s.name}</span>
                <span className={cn("block text-xs", meta?.text ?? "text-muted-foreground")}>
                  {meta ? `${meta.label} · ` : ""}needs {levelLabel(s.required)}
                </span>
              </span>
              <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Link to the next skill in the user's learning plan, if there is one. */
export function NextInPlan() {
  const { role, skill, roadmap } = useSkillPage();
  if (!roadmap) return null;
  const next = roadmap.plan.find((n) => n.skill.id !== skill.id && n.ready) ?? roadmap.plan.find((n) => n.skill.id !== skill.id);
  if (!next) return null;
  return (
    <Link
      href={learnHref(role.slug, next.skill.id)}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
    >
      <span>
        <span className="block text-xs text-muted-foreground">Next in your learning plan</span>
        <span className="mt-0.5 block font-semibold tracking-tight">{next.skill.name}</span>
      </span>
      <ArrowRight aria-hidden="true" className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
