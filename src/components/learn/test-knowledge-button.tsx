"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isPass } from "@/lib/quiz";
import { useSkillPage } from "./skill-page-context";

export function TestKnowledgeButton() {
  const { openQuiz, progress } = useSkillPage();
  const history = progress.quiz?.history ?? [];
  return (
    <div className="shrink-0 sm:text-right">
      <Button size="lg" onClick={openQuiz}>
        Test My Knowledge
        <ArrowRight aria-hidden="true" />
      </Button>
      {progress.quiz && (
        <p className="mt-2 text-xs text-muted-foreground">
          Best {progress.quiz.best} of {progress.quiz.total} · {progress.quiz.attempts} {progress.quiz.attempts === 1 ? "attempt" : "attempts"}
        </p>
      )}
      {history.length > 0 && (
        <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground" aria-label="Recent attempts">
          {history.slice(0, 3).map((h) => (
            <li key={h.at}>
              {h.score}/{h.total} {isPass(h.score, h.total) ? "passed" : "not passed"} ·{" "}
              {new Date(h.at).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
