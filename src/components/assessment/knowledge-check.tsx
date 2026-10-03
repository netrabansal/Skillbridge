"use client";

import { useId, useState } from "react";
import { ChevronDown, CircleCheck, CircleX, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Role } from "@/data/roles";
import { levelLabel, type QuizAnswers, type Ratings } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { actions } from "@/lib/store";

/**
 * Optional multiple-choice check tied to specific skills. Correct answers mark a skill as verified on the
 * roadmap; a wrong answer on a skill rated Comfortable or higher suggests a refresher. Never required.
 */
export function KnowledgeCheck({ role, ratings, quiz }: { role: Role; ratings: Ratings; quiz: QuizAnswers }) {
  const answered = role.quiz.filter((q) => quiz[q.id] !== undefined);
  const correct = answered.filter((q) => quiz[q.id] === q.answer).length;
  const [open, setOpen] = useState(answered.length > 0);
  const panelId = useId();
  const skillName = (skillId: string) => role.categories.flatMap((c) => c.skills).find((s) => s.id === skillId)?.name ?? skillId;

  const refreshers = role.quiz.filter((q) => quiz[q.id] !== undefined && quiz[q.id] !== q.answer && (ratings[q.skillId] ?? 0) >= 2);

  return (
    <section id="knowledge-check" aria-labelledby="quiz-title" className="scroll-mt-28 rounded-2xl border border-dashed border-border-strong bg-surface/60">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 id="quiz-title" className="text-lg font-semibold tracking-tight">
              Knowledge check
            </h2>
            <Badge>Optional</Badge>
            {answered.length > 0 && (
              <Badge tone={correct === answered.length ? "success" : "info"}>
                {correct} of {answered.length} correct
              </Badge>
            )}
          </div>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {role.quiz.length} quick questions to sense-check your ratings. Skip it if you like. It won&apos;t block your
            roadmap.
          </p>
        </div>
        <Button variant="secondary" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)} className="shrink-0">
          {open ? "Hide questions" : answered.length ? "Show questions" : "Take the knowledge check"}
          <ChevronDown aria-hidden="true" className={cn("transition-transform", open && "rotate-180")} />
        </Button>
      </div>

      <div id={panelId} hidden={!open} className="border-t border-border px-6 pt-2 pb-6">
        <ol className="divide-y divide-border">
          {role.quiz.map((q, qi) => {
            const chosen = quiz[q.id];
            const isAnswered = chosen !== undefined;
            const isCorrect = chosen === q.answer;
            return (
              <li key={q.id} className="py-6">
                <fieldset>
                  <legend className="text-sm font-medium">
                    <span className="mr-2 font-label text-muted-foreground">{qi + 1}.</span>
                    {q.question}
                  </legend>
                  <p className="mt-1 text-xs text-muted-foreground">Checks: {skillName(q.skillId)}</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {q.options.map((option, oi) => {
                      const isChosen = chosen === oi;
                      const isAnswer = oi === q.answer;
                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={isAnswered}
                          aria-pressed={isChosen}
                          onClick={() => actions.answerQuiz(role.slug, q.id, oi)}
                          className={cn(
                            "flex items-start gap-3 rounded-xl border p-3 text-left text-sm transition-colors",
                            !isAnswered && "border-border bg-surface hover:border-border-strong",
                            isAnswered && isAnswer && "border-success bg-success-soft text-success",
                            isAnswered && isChosen && !isAnswer && "border-danger bg-danger-soft text-danger",
                            isAnswered && !isChosen && !isAnswer && "border-border bg-surface opacity-60",
                          )}
                        >
                          <span className="mt-px font-label text-xs text-muted-foreground">{String.fromCharCode(65 + oi)}</span>
                          <span className="flex-1">{option}</span>
                          {isAnswered && isAnswer && <CircleCheck aria-label="Correct answer" className="size-4 shrink-0" />}
                          {isAnswered && isChosen && !isAnswer && <CircleX aria-label="Your answer" className="size-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && (
                    <p role="status" className="mt-3 text-sm">
                      <span className={cn("font-medium", isCorrect ? "text-success" : "text-danger")}>
                        {isCorrect ? "Correct. " : "Not quite. "}
                      </span>
                      <span className="text-muted-foreground">{q.explanation}</span>
                    </p>
                  )}
                </fieldset>
              </li>
            );
          })}
        </ol>

        {answered.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {refreshers.length > 0
                ? `You rated ${refreshers.map((q) => `${skillName(q.skillId)} (${levelLabel(ratings[q.skillId] ?? 0)})`).join(", ")} highly, but missed its question. Your roadmap will suggest a refresher.`
                : answered.length === role.quiz.length
                  ? "All done. Correct answers show as verified on your roadmap."
                  : "Answer the rest whenever you like. Your answers are saved."}
            </p>
            <Button variant="ghost" size="sm" onClick={() => actions.resetQuiz(role.slug)} className="shrink-0">
              <RotateCcw aria-hidden="true" />
              Retake
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
