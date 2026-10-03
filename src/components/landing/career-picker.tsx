"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { RoleIcon } from "@/components/role-icon";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getRole, rolePhases, roles, roleSkillCount, type Role } from "@/data/roles";
import { cn } from "@/lib/cn";
import { RoleSearch } from "./role-search";

/**
 * The interactive top half of the landing page. The hero search, the preview and the career cards share
 * one selection, so picking a role anywhere updates everything, and "Build My Roadmap" carries it into /start.
 */
export function CareerPicker() {
  const router = useRouter();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const selected = getRole(selectedSlug);

  // The sticky selection bar only appears once the hero's own CTA has scrolled out of view.
  const heroCtaRef = useRef<HTMLFormElement>(null);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setHeroCtaVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function select(slug: string | null) {
    setSelectedSlug(slug);
    if (slug) setQuery(getRole(slug)?.title ?? "");
  }

  function buildRoadmap() {
    router.push(selectedSlug ? `/start?role=${selectedSlug}` : "/start");
  }

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_80%_60%_at_30%_0%,black,transparent)]"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Eyebrow>Tech career skill-gap analysis</Eyebrow>
            <h1 id="hero-title" className="mt-5 font-display text-[2.75rem] leading-[1.02] tracking-tight sm:text-7xl">
              What tech career are you aiming for?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Tell us your target role. SkillBridge maps the skills you already have against the ones it needs, then
              builds a personalized roadmap to close the gap.
            </p>

            <form
              ref={heroCtaRef}
              className="mt-10 max-w-xl"
              onSubmit={(e) => {
                e.preventDefault();
                buildRoadmap();
              }}
            >
              <div className="relative flex items-center rounded-full border border-border-strong bg-surface shadow-elev-2 transition-shadow focus-within:border-ring focus-within:ring-4 focus-within:ring-ring/10">
                <RoleSearch query={query} onQueryChange={setQuery} selectedSlug={selectedSlug} onSelect={select} />
                <div className="hidden pr-1.5 sm:block">
                  <Button type="submit" size="lg" className="h-11">
                    Build My Roadmap
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <Button type="submit" size="lg" className="mt-3 w-full sm:hidden">
                Build My Roadmap
                <ArrowRight aria-hidden="true" />
              </Button>
              <p className="mt-4 px-1 text-sm text-muted-foreground" aria-live="polite">
                {selected ? (
                  <>
                    <span className="font-medium text-foreground">{selected.title}</span> selected. Next, tell us your
                    starting point. It takes about 2 minutes.
                  </>
                ) : (
                  <>Search above or pick a popular path below. No account needed to start.</>
                )}
              </p>
            </form>
          </div>

          <RoadmapPreview role={selected} />
        </div>
      </section>

      {/* Popular career paths */}
      <section id="popular-roles" aria-labelledby="popular-title" className="scroll-mt-20 border-t border-border bg-surface-sunken/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Popular career paths</Eyebrow>
              <h2 id="popular-title" className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
                Or start from a popular path
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Choose a card to set it as your goal. Each path is mapped from foundations to job-ready skills.
              </p>
            </div>
            <Link
              href="/roles"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              Explore all roles
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <fieldset className="mt-12">
            <legend className="sr-only">Choose your target career</legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {roles.map((role) => (
                <CareerCard key={role.slug} role={role} selected={role.slug === selectedSlug} onSelect={() => select(role.slug)} />
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      <SelectionBar
        role={heroCtaVisible ? undefined : selected}
        onBuild={buildRoadmap}
        onClear={() => {
          select(null);
          setQuery("");
        }}
      />
    </>
  );
}

function CareerCard({ role, selected, onSelect }: { role: Role; selected: boolean; onSelect: () => void }) {
  const id = `career-${role.slug}`;
  return (
    <div data-selected={selected} className="group relative h-full">
      <input type="radio" name="career" id={id} value={role.slug} checked={selected} onChange={onSelect} className="peer sr-only" />
      <label
        htmlFor={id}
        className={cn(
          "flex h-full cursor-pointer flex-col rounded-xl border bg-surface p-5 shadow-elev-1 transition-all duration-200",
          "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-elev-2",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
          selected ? "border-primary shadow-elev-2 ring-1 ring-primary" : "border-border",
        )}
      >
        <span className="flex items-start justify-between">
          <RoleIcon
            icon={role.icon}
            className={cn("transition-colors", selected && "border-primary bg-primary text-primary-foreground")}
          />
          <span
            aria-hidden="true"
            className={cn(
              "grid size-6 place-items-center rounded-full border transition-colors",
              selected ? "border-primary bg-primary text-primary-foreground" : "border-border-strong text-transparent",
            )}
          >
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
        </span>
        <span className="mt-5 font-label text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">{role.category}</span>
        <span className="mt-1.5 text-lg font-semibold tracking-tight">{role.title}</span>
        <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{role.summary}</span>
        <span className="mt-4 flex flex-wrap gap-1.5">
          {role.highlights.map((h) => (
            <span key={h} className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs">
              {h}
            </span>
          ))}
        </span>
        {/* Right padding reserves room for the Details link, which sits outside the label (no links inside labels). */}
        <span className="mt-auto block pt-5">
          <span className="block border-t border-border pt-4 pr-20 text-xs text-muted-foreground">
            {roleSkillCount(role)} skills · {role.categories.length} areas
          </span>
        </span>
      </label>
      <Link
        href={`/roles/${role.slug}`}
        aria-label={`${role.title} details`}
        className="absolute right-4 bottom-4 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-surface-sunken"
      >
        Details
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </Link>
    </div>
  );
}

/** Live preview of the selected role's path. Shows Frontend Developer as a labelled example until a role is picked. */
function RoadmapPreview({ role }: { role: Role | undefined }) {
  const shown = role ?? roles[0];
  return (
    <div aria-label="Roadmap preview" role="region" className="relative hidden lg:block">
      <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-2xl border border-border bg-surface-sunken" />
      <div className="relative rounded-2xl border border-border bg-surface p-7 shadow-elev-3">
        <div className="flex items-center justify-between gap-4">
          <Eyebrow>{role ? "Your roadmap preview" : "Example roadmap"}</Eyebrow>
          {!role && <span className="text-xs text-muted-foreground">Pick a role to preview yours</span>}
        </div>
        <div key={shown.slug} className="animate-fade-up">
          <div className="mt-5 flex items-center gap-3">
            <RoleIcon icon={shown.icon} />
            <div>
              <p className="text-lg font-semibold tracking-tight">{shown.title}</p>
              <p className="text-sm text-muted-foreground">
                {roleSkillCount(shown)} skills · {shown.startingPoint}
              </p>
            </div>
          </div>
          <ol className="mt-7 space-y-5">
            {rolePhases(shown).map((phase, i, phases) => (
              <li key={phase.name} className="relative flex gap-4">
                {i < phases.length - 1 && (
                  <span aria-hidden="true" className="absolute top-8 bottom-[-1.25rem] left-[0.9375rem] w-px bg-border" />
                )}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border-strong bg-background font-label text-sm">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-1">
                  <p className="text-sm font-medium">{phase.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{phase.categories.map((c) => c.name).join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-7 border-t border-border pt-5 text-xs text-muted-foreground">
          Your final roadmap skips what you already know and puts your biggest gaps first.
        </p>
      </div>
    </div>
  );
}

function SelectionBar({
  role,
  onBuild,
  onClear,
}: {
  role: Role | undefined;
  onBuild: () => void;
  onClear: () => void;
}) {
  // Keep the last role rendered while the bar animates out.
  const [shown, setShown] = useState(role);
  if (role && role !== shown) setShown(role);
  const visible = Boolean(role);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-300 sm:pb-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      {shown && (
        <div
          data-theme="dark"
          role="region"
          aria-label="Selected career"
          className="mx-auto flex max-w-xl items-center gap-3 rounded-2xl border border-border bg-background p-2 pl-3 text-foreground shadow-elev-3 sm:rounded-full"
        >
          <RoleIcon icon={shown.icon} size="sm" className="hidden sm:grid" />
          <p className="min-w-0 flex-1 truncate text-sm">
            <span className="text-muted-foreground">Goal: </span>
            <span className="font-medium">{shown.title}</span>
          </p>
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear selected career"
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground"
          >
            <X className="size-4" />
          </button>
          <Button onClick={onBuild} className="shrink-0">
            Build My Roadmap
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}
