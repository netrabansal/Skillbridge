import { cn } from "@/lib/cn";
import type { Level } from "@/lib/assessment";

/** Three ascending bars; the number filled equals the level (Not Started = none). */
export function LevelMeter({ level, className }: { level: Level; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex h-3 items-end gap-[2px]", className)}>
      {[1, 2, 3].map((bar) => (
        <span
          key={bar}
          className={cn("w-[3px] rounded-full", bar <= level ? "bg-current" : "bg-current opacity-25")}
          style={{ height: `${bar * 33.3}%` }}
        />
      ))}
    </span>
  );
}
