"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getRole, roles } from "@/data/roles";
import { careerSummaries } from "@/lib/progress";
import { actions, useAppState } from "@/lib/store";
import { toast } from "@/lib/toast";

function useCareer(slug: string) {
  const state = useAppState();
  if (!state) return { state, career: undefined };
  return { state, career: careerSummaries(state, roles).find((c) => c.role.slug === slug) };
}

/** Small badge for role cards: "Your goal · 32%" or "Saved · 12%". Renders nothing without saved progress. */
export function RoleProgressBadge({ slug }: { slug: string }) {
  const { career } = useCareer(slug);
  if (!career) return null;
  const label = career.isActive ? "Your goal" : "Saved progress";
  return (
    <Badge tone={career.isActive ? "info" : "neutral"} className="relative z-10">
      {label}
      {career.generated ? ` · ${career.percent}%` : ""}
    </Badge>
  );
}

/** Role detail page: the user's relationship to this role, with the right next action. */
export function RoleProgressPanel({ slug }: { slug: string }) {
  const { state, career } = useCareer(slug);
  const role = getRole(slug)!;
  if (!state) return <div aria-hidden="true" className="h-12 animate-pulse rounded-full bg-surface-sunken" />;

  if (!career) {
    return (
      <Link href={`/start?role=${slug}`} className={buttonVariants({ size: "lg", className: "w-full" })}>
        Build My Roadmap
        <ArrowRight aria-hidden="true" />
      </Link>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 text-sm">
        <Badge tone={career.isActive ? "info" : "neutral"}>{career.isActive ? "Your current goal" : "Saved progress"}</Badge>
        {career.generated && <span className="font-label tabular-nums">{career.percent}%</span>}
      </div>
      {career.generated && <Progress value={career.percent} label={`${role.title} progress`} className="h-1.5" />}
      <p className="text-xs text-muted-foreground">
        {career.generated
          ? `${career.completed} of ${career.total} skills complete`
          : career.rated
            ? `Assessment: ${career.rated} of ${career.total} skills rated`
            : "Not assessed yet"}
      </p>
      {career.isActive ? (
        <Link href={career.generated ? "/roadmap" : "/assess"} className={buttonVariants({ size: "lg", className: "w-full" })}>
          {career.generated ? "Open my roadmap" : "Continue assessment"}
          <ArrowRight aria-hidden="true" />
        </Link>
      ) : state.setup ? (
        <button
          type="button"
          onClick={() => {
            actions.switchGoal(slug);
            toast(`${role.title} is now your active goal`, { description: "Your other careers are saved and unchanged." });
          }}
          className={buttonVariants({ size: "lg", className: "w-full" })}
        >
          Make this my goal
        </button>
      ) : (
        <Link href={`/start?role=${slug}`} className={buttonVariants({ size: "lg", className: "w-full" })}>
          Set up this goal
        </Link>
      )}
    </div>
  );
}
