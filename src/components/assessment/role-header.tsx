"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowLeftRight, Check } from "lucide-react";
import { RoleIcon } from "@/components/role-icon";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { roles, roleSkillCount, type Role } from "@/data/roles";
import { cn } from "@/lib/cn";
import { actions, type AppState } from "@/lib/store";
import { toast } from "@/lib/toast";

/** The selected role, shown at the top of the assessment, with an in-place role switcher. */
export function RoleHeader({ role, state }: { role: Role; state: AppState }) {
  const [switching, setSwitching] = useState(false);
  const panelId = useId();

  return (
    <section aria-labelledby="assess-title" className="rounded-2xl border border-border bg-surface p-6 shadow-elev-2 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 sm:gap-5">
          <RoleIcon icon={role.icon} size="lg" />
          <div className="min-w-0">
            <Eyebrow>Skill assessment for</Eyebrow>
            <h1 id="assess-title" className="mt-1.5 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
              {role.title}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {roleSkillCount(role)} skills in {role.categories.length} categories · about 5 minutes
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="secondary" size="sm" aria-expanded={switching} aria-controls={panelId} onClick={() => setSwitching((s) => !s)}>
            <ArrowLeftRight aria-hidden="true" />
            Change role
          </Button>
          <Link
            href={`/start?role=${role.slug}`}
            className="inline-flex h-8 items-center rounded-full px-3.5 text-sm text-muted-foreground hover:bg-surface-sunken hover:text-foreground"
          >
            Edit setup
          </Link>
        </div>
      </div>

      <div id={panelId} hidden={!switching} className="mt-6 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          Answers are saved separately for each role, so you can switch back at any time without losing them.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => {
            const active = r.slug === role.slug;
            const rated = Object.keys(state.assessments[r.slug]?.ratings ?? {}).length;
            return (
              <li key={r.slug}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    if (r.slug !== role.slug) {
                      actions.changeRole(r.slug);
                      toast(`Now assessing for ${r.title}`, {
                        description: `Your ${role.title} answers and roadmap are saved separately.`,
                      });
                    }
                    setSwitching(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                    active ? "border-primary ring-1 ring-primary" : "border-border hover:border-border-strong",
                  )}
                >
                  <RoleIcon icon={r.icon} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{r.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      {rated ? `${rated} of ${roleSkillCount(r)} rated` : "Not started"}
                    </span>
                  </span>
                  {active && <Check aria-hidden="true" className="size-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
