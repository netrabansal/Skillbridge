"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Info, Pencil } from "lucide-react";
import { RoleIcon } from "@/components/role-icon";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RadioCard } from "@/components/ui/radio-card";
import { getRole, roles, roleSkillCount } from "@/data/roles";
import { SetupLoading } from "@/components/progress/setup-states";
import {
  estimateMonths,
  experienceOptions,
  hoursOptions,
  optionLabel,
  timelineOptions,
  type CareerSetup,
  type ExperienceLevel,
  type HoursPerWeek,
  type Timeline,
} from "@/lib/setup";
import { cn } from "@/lib/cn";
import { careerSummaries } from "@/lib/progress";
import { actions, useAppState, type AppState } from "@/lib/store";
import { toast } from "@/lib/toast";

const steps = [
  { title: "Which role are you aiming for?", short: "Target role" },
  { title: "Where are you starting from?", short: "Experience" },
  { title: "How much time can you give it?", short: "Time" },
  { title: "Check your setup", short: "Review" },
] as const;

const timelineMonths: Record<Timeline, number | null> = { asap: 3, "6m": 6, "12m": 12, flexible: null };

export function SetupFlow({ initialRole }: { initialRole: string | null }) {
  const state = useAppState();
  // Wait for saved state so a returning user's answers are prefilled rather than lost.
  if (state === undefined) return <div className="mt-10"><SetupLoading /></div>;
  return <SetupForm initialRole={initialRole} saved={state.setup} state={state} />;
}

function SetupForm({ initialRole, saved, state }: { initialRole: string | null; saved: CareerSetup | null; state: AppState }) {
  const router = useRouter();
  // Arriving with a role from the landing page skips straight to the next question.
  const [step, setStep] = useState(initialRole ? 1 : 0);
  const [roleSlug, setRoleSlug] = useState<string | null>(initialRole ?? saved?.roleSlug ?? null);
  const [experience, setExperience] = useState<ExperienceLevel | null>(saved?.experience ?? null);
  const [hours, setHours] = useState<HoursPerWeek | null>(saved?.hoursPerWeek ?? null);
  const [timeline, setTimeline] = useState<Timeline | null>(saved?.timeline ?? null);
  const [saving, setSaving] = useState(false);

  const role = getRole(roleSlug);
  const canContinue = [Boolean(role), Boolean(experience), Boolean(hours && timeline), true][step];

  // Move focus to the new question so keyboard and screen reader users land in the right place.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  function next() {
    if (!canContinue) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    if (!role || !experience || !hours || !timeline) return;
    setSaving(true);
    const previous = getRole(saved?.roleSlug);
    const switching = previous && previous.slug !== role.slug;
    actions.saveSetup({ roleSlug: role.slug, experience, hoursPerWeek: hours, timeline });
    // A career that already has a roadmap picks up where it left off; otherwise continue to its assessment.
    const hasRoadmap = Boolean(state.roadmaps[role.slug]);
    toast(switching ? `Goal switched to ${role.title}` : "Career goal saved", {
      description: switching
        ? `Your ${previous.title} progress is saved. Switch back any time from Profile.`
        : hasRoadmap
          ? "Your roadmap is ready where you left off."
          : "Next, rate your current skills.",
    });
    router.push(hasRoadmap ? "/roadmap" : "/assess");
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        aria-labelledby="setup-question"
      >
        {role && step > 0 && (
          <p className="mb-6 flex items-center gap-2 text-sm lg:hidden">
            <RoleIcon icon={role.icon} size="sm" />
            <span className="text-muted-foreground">Goal:</span>
            <span className="font-medium">{role.title}</span>
            <button type="button" onClick={() => setStep(0)} className="ml-1 text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Change
            </button>
          </p>
        )}
        <SwitchNotice state={state} fromSlug={saved?.roleSlug ?? null} toSlug={roleSlug} />
        <div className="flex items-center gap-3">
          <Eyebrow>
            Step {step + 1} of {steps.length} · {steps[step].short}
          </Eyebrow>
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {steps.map((s, i) => (
            <span key={s.short} className={cn("h-1 w-10 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-border")} />
          ))}
        </div>
        <h1
          id="setup-question"
          ref={headingRef}
          tabIndex={-1}
          className="mt-6 font-display text-4xl tracking-tight focus:outline-none sm:text-5xl"
        >
          {steps[step].title}
        </h1>

        <div key={step} className="mt-8 animate-fade-up">
          {step === 0 && (
            <fieldset>
              <legend className="mb-5 text-muted-foreground">Pick one. You can change it later.</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {roles.map((r) => (
                  <RadioCard
                    key={r.slug}
                    name="role"
                    value={r.slug}
                    checked={roleSlug === r.slug}
                    onChange={setRoleSlug}
                    title={r.title}
                    description={r.category}
                    icon={<RoleIcon icon={r.icon} size="sm" />}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="mb-5 text-muted-foreground">
                This sets a sensible starting point. Your skill assessment fine-tunes it next.
              </legend>
              <div className="grid gap-3">
                {experienceOptions.map((o) => (
                  <RadioCard
                    key={o.value}
                    name="experience"
                    value={o.value}
                    checked={experience === o.value}
                    onChange={(v) => setExperience(v as ExperienceLevel)}
                    title={o.label}
                    description={o.hint}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <div className="space-y-10">
              <fieldset>
                <legend className="mb-4 text-sm font-medium">Hours per week for learning</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {hoursOptions.map((o) => (
                    <RadioCard
                      key={o.value}
                      name="hours"
                      value={o.value}
                      checked={hours === o.value}
                      onChange={(v) => setHours(v as HoursPerWeek)}
                      title={o.label}
                      description={o.hint}
                    />
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-4 text-sm font-medium">When would you like to be job-ready?</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {timelineOptions.map((o) => (
                    <RadioCard
                      key={o.value}
                      name="timeline"
                      value={o.value}
                      checked={timeline === o.value}
                      onChange={(v) => setTimeline(v as Timeline)}
                      title={o.label}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {step === 3 && role && experience && hours && timeline && (
            <Review
              roleSlug={role.slug}
              experience={experience}
              hours={hours}
              timeline={timeline}
              onEdit={setStep}
            />
          )}
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft aria-hidden="true" />
              Back
            </Button>
          ) : (
            <span />
          )}
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <Button type="submit" size="lg" disabled={!canContinue || saving} aria-describedby={!canContinue ? "continue-hint" : undefined}>
              {step === steps.length - 1 ? "Continue to skill assessment" : "Continue"}
              <ArrowRight aria-hidden="true" />
            </Button>
            {!canContinue && (
              <p id="continue-hint" className="text-center text-xs text-muted-foreground sm:text-right">
                {step === 2 ? "Choose your hours and a timeline to continue" : "Choose an option to continue"}
              </p>
            )}
          </div>
        </div>
      </form>

      <SetupSummary roleSlug={roleSlug} experience={experience} hours={hours} timeline={timeline} onEdit={setStep} />
    </div>
  );
}

function Review({
  roleSlug,
  experience,
  hours,
  timeline,
  onEdit,
}: {
  roleSlug: string;
  experience: ExperienceLevel;
  hours: HoursPerWeek;
  timeline: Timeline;
  onEdit: (step: number) => void;
}) {
  const role = getRole(roleSlug)!;
  const estimate = estimateMonths(role.typicalHours, experience, hours);
  const target = timelineMonths[timeline];
  const ambitious = target !== null && estimate.low > target;

  return (
    <div className="space-y-6">
      <dl className="divide-y divide-border rounded-xl border border-border bg-surface">
        {[
          { label: "Target role", value: role.title, step: 0 },
          { label: "Experience", value: optionLabel.experience(experience), step: 1 },
          { label: "Time per week", value: optionLabel.hours(hours), step: 2 },
          { label: "Timeline", value: optionLabel.timeline(timeline), step: 2 },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <dt className="text-xs text-muted-foreground">{row.label}</dt>
              <dd className="mt-0.5 font-medium">{row.value}</dd>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onEdit(row.step)} aria-label={`Edit ${row.label.toLowerCase()}`}>
              <Pencil aria-hidden="true" />
              Edit
            </Button>
          </div>
        ))}
      </dl>

      <div className="rounded-xl border border-border bg-surface-sunken/60 p-5">
        <div className="flex items-start gap-3">
          <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-medium">
              Roughly {estimate.low}–{estimate.high} months to entry level at your pace
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              A first estimate for the {roleSkillCount(role)} skills a {role.title} needs. Your skill assessment, next,
              makes it accurate by showing what you can skip.
            </p>
            {ambitious && (
              <p className="mt-3 rounded-lg bg-warning-soft px-3 py-2 text-sm text-warning">
                Your timeline is ambitious for this many hours a week. More hours, or a skill assessment showing what
                you already know, could close the gap.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SetupSummary({
  roleSlug,
  experience,
  hours,
  timeline,
  onEdit,
}: {
  roleSlug: string | null;
  experience: ExperienceLevel | null;
  hours: HoursPerWeek | null;
  timeline: Timeline | null;
  onEdit: (step: number) => void;
}) {
  const role = getRole(roleSlug);
  return (
    <aside aria-label="Your setup so far" className="hidden lg:block">
      <div className="sticky top-24 rounded-2xl border border-border bg-surface p-6 shadow-elev-2">
        <Eyebrow>Your setup</Eyebrow>
        {role ? (
          <div className="mt-4 flex items-center gap-3">
            <RoleIcon icon={role.icon} />
            <div className="min-w-0">
              <p className="font-semibold tracking-tight">{role.title}</p>
              <button type="button" onClick={() => onEdit(0)} className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
                Change role
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No role chosen yet.</p>
        )}
        <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          {[
            { label: "Experience", value: experience && optionLabel.experience(experience) },
            { label: "Time per week", value: hours && optionLabel.hours(hours) },
            { label: "Timeline", value: timeline && optionLabel.timeline(timeline) },
          ].map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className={cn("text-right", row.value ? "font-medium" : "text-muted-foreground")}>{row.value ?? "—"}</dd>
            </div>
          ))}
        </dl>
        {role && (
          <div className="mt-6 border-t border-border pt-5">
            <p className="text-xs text-muted-foreground">
              Next, you&apos;ll rate {roleSkillCount(role)} skills across
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {role.categories.map((c) => (
                <li key={c.id} className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs">
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}

/** Makes it explicit that choosing a different career keeps the existing one's progress. */
function SwitchNotice({ state, fromSlug, toSlug }: { state: AppState; fromSlug: string | null; toSlug: string | null }) {
  if (!fromSlug || !toSlug || fromSlug === toSlug) return null;
  const careers = careerSummaries(state, roles);
  const from = careers.find((c) => c.role.slug === fromSlug);
  const to = careers.find((c) => c.role.slug === toSlug);
  const toRole = getRole(toSlug)!;
  if (!from) return null;
  const describe = (c: NonNullable<typeof from>) =>
    c.generated ? `roadmap at ${c.percent}%` : c.rated ? `assessment with ${c.rated} of ${c.total} skills rated` : "goal";
  return (
    <div role="note" className="mb-8 flex gap-3 rounded-2xl border border-info/30 bg-info-soft p-4 text-sm">
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-info" />
      <div>
        <p className="font-medium text-info">
          Switching your goal from {from.role.title} to {toRole.title}
        </p>
        <p className="mt-1 text-foreground/80">
          Your {from.role.title} {describe(from)} stays saved and won&apos;t be overwritten. Switch back any time from Profile.
          {to && (to.generated || to.rated > 0) && ` You already have a ${toRole.title} ${describe(to)}, so you'll pick up where you left off.`}
        </p>
      </div>
    </div>
  );
}
