import { Circle, CircleCheck, CircleDot, type LucideIcon } from "lucide-react";
import type { SkillStatus } from "@/lib/roadmap";

/**
 * Roadmap status colours: completed = green (success), in progress / current = blue (info),
 * not started = neutral gray. Everything else stays on the brand palette.
 */
export const statusMeta: Record<
  SkillStatus,
  { label: string; icon: LucideIcon; text: string; dot: string; node: string; accent: string; bar: string }
> = {
  completed: {
    label: "Completed",
    icon: CircleCheck,
    text: "text-success",
    dot: "bg-success",
    node: "border-success/50 bg-success/[0.1]",
    accent: "border-l-success",
    bar: "bg-success",
  },
  "in-progress": {
    label: "In progress",
    icon: CircleDot,
    text: "text-info",
    dot: "bg-info",
    node: "border-info/55 bg-info/[0.14]",
    accent: "border-l-info",
    bar: "bg-info",
  },
  "not-started": {
    label: "Not started",
    icon: Circle,
    text: "text-muted-foreground",
    dot: "bg-border-strong",
    node: "border-border bg-surface",
    accent: "border-l-border-strong",
    bar: "bg-border-strong",
  },
};
