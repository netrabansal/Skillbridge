"use client";

import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/cn";
import { actions } from "@/lib/store";
import { useSkillPage } from "./skill-page-context";

export function TopicChecklist() {
  const { role, skill, lesson, progress, state, report } = useSkillPage();
  const done = new Set(progress.topics);
  const count = lesson.topics.filter((t) => done.has(t.id)).length;

  return (
    <div>
      <div className="flex items-center gap-3">
        <Progress value={(count / lesson.topics.length) * 100} label="Topics completed" className="h-1.5 max-w-48" />
        <span className="text-sm text-muted-foreground">
          {count} of {lesson.topics.length} completed
        </span>
      </div>
      <ol className="mt-5 space-y-2">
        {lesson.topics.map((topic, i) => {
          const checked = done.has(topic.id);
          const id = `topic-${skill.id}-${topic.id}`;
          return (
            <li key={topic.id}>
              <label
                htmlFor={id}
                className={cn(
                  "flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors",
                  checked ? "border-success/40 bg-success/[0.07]" : "border-border bg-surface hover:border-border-strong",
                )}
              >
                <input
                  id={id}
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  disabled={!state}
                  onChange={(e) => report(actions.setTopic(role.slug, skill, lesson, topic.id, e.target.checked), "Completing topics")}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
                    checked ? "border-success bg-success text-background" : "border-border-strong",
                  )}
                >
                  {checked && <Check className="size-3.5" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-label text-xs text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className={cn("font-medium", checked && "text-muted-foreground line-through decoration-1")}>{topic.title}</span>
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{topic.detail}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
