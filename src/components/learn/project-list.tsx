"use client";

import { CircleCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Difficulty } from "@/data/learning";
import { cn } from "@/lib/cn";
import { actions } from "@/lib/store";
import { useSkillPage } from "./skill-page-context";

const difficultyTone: Record<Difficulty, "success" | "warning" | "danger"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
};

export function ProjectList() {
  const { role, skill, lesson, progress, state, report } = useSkillPage();
  const done = new Set(progress.projects);

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {lesson.projects.map((project) => {
        const complete = done.has(project.id);
        return (
          <li
            key={project.id}
            className={cn(
              "flex flex-col rounded-2xl border p-5 transition-colors",
              complete ? "border-success/40 bg-success/[0.07]" : "border-border bg-surface",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={difficultyTone[project.difficulty]}>{project.difficulty}</Badge>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock aria-hidden="true" className="size-3.5" />
                About {project.hours} {project.hours === 1 ? "hour" : "hours"}
              </span>
            </div>
            <h3 className="mt-3 font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="mt-4">
              <Button
                variant={complete ? "ghost" : "secondary"}
                size="sm"
                disabled={!state}
                aria-pressed={complete}
                onClick={() => report(actions.setProject(role.slug, skill, lesson, project.id, !complete), "Finishing a project")}
              >
                {complete ? (
                  <>
                    <CircleCheck aria-hidden="true" className="text-success" />
                    Done · undo
                  </>
                ) : (
                  "Mark project as done"
                )}
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
