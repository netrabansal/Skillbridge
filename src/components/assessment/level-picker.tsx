"use client";

import { levels, type Level } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { LevelMeter } from "./level-meter";

type LevelPickerProps = {
  /** Used as the radio group name; must be unique on the page. */
  name: string;
  value: Level | undefined;
  onChange: (level: Level) => void;
  labelledBy: string;
  describedBy?: string;
  className?: string;
};

/** Four-level proficiency selector built on native radios, so arrow keys and screen readers work as expected. */
export function LevelPicker({ name, value, onChange, labelledBy, describedBy, className }: LevelPickerProps) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={cn("grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface-sunken/70 p-1 sm:grid-cols-4", className)}
    >
      {levels.map((l) => {
        const id = `${name}-${l.value}`;
        const checked = value === l.value;
        return (
          <div key={l.value} className="relative">
            <input
              type="radio"
              id={id}
              name={name}
              value={l.value}
              checked={checked}
              onChange={() => onChange(l.value)}
              className="peer sr-only"
            />
            <label
              htmlFor={id}
              title={l.description}
              className={cn(
                "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg px-2 text-xs font-medium whitespace-nowrap transition-all select-none",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-ring",
                checked
                  ? "bg-primary text-primary-foreground shadow-elev-1"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground",
              )}
            >
              <LevelMeter level={l.value} />
              {l.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
