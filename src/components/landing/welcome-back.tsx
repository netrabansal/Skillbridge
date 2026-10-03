"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RoleIcon } from "@/components/role-icon";
import { buttonVariants } from "@/components/ui/button";
import { getRole } from "@/data/roles";
import { recommendNext, roadmapFor } from "@/lib/progress";
import { learnHref } from "@/lib/routes";
import { useAppState } from "@/lib/store";

/** For returning visitors: a quick way back into their saved goal from the landing page. */
export function WelcomeBack() {
  const state = useAppState();
  const role = getRole(state?.setup?.roleSlug);
  if (!state || !role) return null;

  const generated = Boolean(state.roadmaps[role.slug]);
  const roadmap = generated ? roadmapFor(state, role) : null;
  const next = roadmap ? recommendNext(roadmap) : null;
  const href = next ? learnHref(role.slug, next.node.skill.id) : generated ? "/roadmap" : "/assess";

  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-3 text-sm">
          <RoleIcon icon={role.icon} size="sm" />
          <span>
            <span className="font-medium">Welcome back.</span>{" "}
            <span className="text-muted-foreground">
              {roadmap
                ? `You're ${roadmap.progress.percent}% of the way to ${role.title}.`
                : `Your ${role.title} goal is saved. Your assessment is next.`}
            </span>
          </span>
        </p>
        <div className="flex gap-2">
          <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Dashboard
          </Link>
          <Link href={href} className={buttonVariants({ size: "sm" })}>
            {roadmap ? "Resume roadmap" : "Continue assessment"}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
