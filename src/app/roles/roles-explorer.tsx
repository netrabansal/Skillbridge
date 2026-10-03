"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { RoleIcon } from "@/components/role-icon";
import { RoleProgressBadge } from "@/components/role-progress";
import { roleCategories, roleSkillCount, searchRoles, type RoleCategory } from "@/data/roles";
import { cn } from "@/lib/cn";

export function RolesExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<RoleCategory | "All">("All");

  const results = useMemo(
    () => searchRoles(query).filter(({ role }) => category === "All" || role.category === category),
    [query, category],
  );

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-96">
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="role-filter" className="sr-only">
            Filter roles
          </label>
          <input
            id="role-filter"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by role, skill or tool"
            className="h-11 w-full rounded-full border border-border bg-surface pr-4 pl-11 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/10"
          />
        </div>
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {(["All", ...roleCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? "role" : "roles"}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ role, via }) => (
            <li
              key={role.slug}
              className="group relative flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-elev-1 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-elev-2"
            >
              <div className="flex items-start justify-between gap-4">
                <RoleIcon icon={role.icon} />
                <span className="flex flex-col items-end gap-2">
                  <span className="font-label text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">{role.category}</span>
                  <RoleProgressBadge slug={role.slug} />
                </span>
              </div>
              <h2 className="mt-5 text-lg font-semibold tracking-tight">
                {/* Stretched link: the whole card opens the role, the roadmap link below sits above it. */}
                <Link href={`/roles/${role.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                  {role.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{role.summary}</p>
              {via && <p className="mt-3 text-xs">Matches “{via}”</p>}
              <div className="mt-auto pt-6">
                <p className="border-t border-border pt-4 text-xs text-muted-foreground">
                  {roleSkillCount(role)} skills · {role.startingPoint}
                </p>
              </div>
              <Link
                href={`/start?role=${role.slug}`}
                className="relative z-10 mt-4 inline-flex items-center gap-1.5 self-start rounded-full text-sm font-medium underline-offset-4 hover:underline"
              >
                Build roadmap
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-border-strong px-6 py-14 text-center">
          <p className="font-medium">No roles match your filters</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different skill or tool, or clear the filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-full border border-border-strong px-4 py-2 text-sm hover:bg-surface-sunken"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
