import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export const journeySteps = [
  "Choose a career",
  "Assess your skills",
  "Identify gaps",
  "Get your roadmap",
  "Learn & practice",
  "Test knowledge",
  "Track progress",
] as const;

/**
 * The seven-stage SkillBridge journey. `current` is the zero-based stage the user is on;
 * earlier stages show as complete.
 */
export function JourneyStepper({ current, className }: { current: number; className?: string }) {
  return (
    <nav aria-label="Your SkillBridge journey" className={className}>
      {/* Compact version for small screens */}
      <div className="md:hidden">
        <p className="text-sm">
          <span className="font-label tracking-wider text-muted-foreground">
            Stage {current + 1} of {journeySteps.length}
          </span>
          <span className="mx-2 text-border-strong">·</span>
          <span className="font-medium">{journeySteps[current]}</span>
        </p>
        <div className="mt-2.5 flex gap-1" aria-hidden="true">
          {journeySteps.map((s, i) => (
            <span key={s} className={cn("h-1 flex-1 rounded-full", i <= current ? "bg-primary" : "bg-border")} />
          ))}
        </div>
      </div>

      <ol className="hidden items-center md:flex">
        {journeySteps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step} aria-current={active ? "step" : undefined} className="flex flex-1 items-center last:flex-none">
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full border font-label text-[0.7rem]",
                    done && "border-primary bg-primary text-primary-foreground",
                    active && "border-primary bg-background text-foreground ring-4 ring-primary/10",
                    !done && !active && "border-border-strong text-muted-foreground",
                  )}
                >
                  {done ? <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} /> : i + 1}
                </span>
                <span
                  className={cn(
                    "text-xs whitespace-nowrap",
                    active ? "font-medium text-foreground" : "text-muted-foreground",
                    !active && "sr-only xl:not-sr-only",
                  )}
                >
                  {step}
                  {done && <span className="sr-only"> (complete)</span>}
                </span>
              </span>
              {i < journeySteps.length - 1 && (
                <span aria-hidden="true" className={cn("mx-3 h-px flex-1", done ? "bg-primary" : "bg-border")} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
