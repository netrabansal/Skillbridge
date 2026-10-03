"use client";

import Link from "next/link";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, CircleX, Info, Map as MapIcon, RotateCcw, X } from "lucide-react";
import { LevelPicker } from "@/components/assessment/level-picker";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { levelLabel, type Level } from "@/lib/assessment";
import { cn } from "@/lib/cn";
import { nextEarnStep, type SkillProgress } from "@/lib/learning";
import {
  buildSkillQuiz,
  passMark,
  quizReducer,
  startSession,
  summarize,
  type QuestionLevel,
  type QuizQuestion,
  type QuizSession,
  type QuizSummary,
} from "@/lib/quiz";
import { actions, type LearningResult } from "@/lib/store";
import { useSkillPage } from "./skill-page-context";

const levelTone: Record<QuestionLevel, "neutral" | "info" | "warning"> = { Core: "neutral", Applied: "info", Advanced: "warning" };

export function SkillQuiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { skill } = useSkillPage();
  // Each opening starts a fresh run; the runner only mounts while open, so shuffling happens in the browser.
  const [run, setRun] = useState(0);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function close() {
    if (!open) return;
    onClose();
    setRun((r) => r + 1);
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="quiz-dialog-title"
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(42rem,calc(100%-2rem))] max-w-none overflow-hidden rounded-3xl border border-border bg-background p-0 text-foreground shadow-elev-3 backdrop:bg-indigo/40 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
          <div className="min-w-0">
            <p className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">Test my knowledge</p>
            <h2 id="quiz-dialog-title" className="truncate font-semibold tracking-tight">
              {skill.name}
            </h2>
          </div>
          <button type="button" onClick={close} aria-label="Close quiz" className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-surface-sunken">
            <X className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto">{open && <QuizRunner key={run} onClose={close} />}</div>
      </div>
    </dialog>
  );
}

function QuizRunner({ onClose }: { onClose: () => void }) {
  const { role, skill, lesson, node, progress } = useSkillPage();
  const questions = useMemo(() => buildSkillQuiz(role.slug, skill, lesson), [role.slug, skill, lesson]);
  const [session, dispatch] = useReducer(quizReducer, questions, (q) => startSession(q));
  const [phase, setPhase] = useState<"intro" | "quiz">("intro");
  const [result, setResult] = useState<{ summary: QuizSummary; saved: LearningResult; levelBefore: Level } | null>(null);
  const recorded = useRef(-1);

  function finish() {
    dispatch({ type: "finish" });
    if (recorded.current === session.attempt) return; // save each attempt exactly once
    recorded.current = session.attempt;
    const summary = summarize(questions, session);
    const levelBefore = node?.level ?? 0;
    const saved = actions.recordQuiz(role.slug, skill, lesson, summary.score, summary.total);
    setResult({ summary, saved, levelBefore });
  }

  function retry() {
    setResult(null);
    dispatch({ type: "retry", questions });
  }

  if (phase === "intro") return <QuizIntro questions={questions} progress={progress} onStart={() => setPhase("quiz")} />;
  if (session.finished && result) {
    return <QuizResults questions={questions} session={session} result={result} onRetry={retry} onClose={onClose} />;
  }
  return <QuizQuestionView questions={questions} session={session} dispatch={dispatch} onFinish={finish} />;
}

function QuizIntro({ questions, progress, onStart }: { questions: QuizQuestion[]; progress: SkillProgress; onStart: () => void }) {
  const { role, skill } = useSkillPage();
  const count = (level: QuestionLevel) => questions.filter((q) => q.level === level).length;
  const history = progress.quiz?.history ?? [];
  return (
    <div className="px-6 py-6">
      <p className="text-lg font-medium">
        {questions.length} questions on {skill.name}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs">
        <li>
          <Badge tone="neutral">{count("Core")} core</Badge>
        </li>
        {count("Applied") > 0 && (
          <li>
            <Badge tone="info">{count("Applied")} applied, for a {role.title}</Badge>
          </li>
        )}
        {count("Advanced") > 0 && (
          <li>
            <Badge tone="warning">{count("Advanced")} advanced, as a {role.title} needs Mastered</Badge>
          </li>
        )}
      </ul>

      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Pass mark</dt>
          <dd className="mt-0.5 font-medium">
            {passMark(questions.length)} of {questions.length}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Previous best</dt>
          <dd className="mt-0.5 font-medium">
            {progress.quiz && progress.quiz.total === questions.length ? `${progress.quiz.best} of ${progress.quiz.total}` : "Not taken yet"}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex gap-3 rounded-xl bg-surface-sunken/70 p-4 text-sm">
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <div>
          <p className="font-medium">How your score counts</p>
          <p className="mt-1 text-muted-foreground">
            The quiz shows how well you understand {skill.name}. On its own it never changes your level. Passing, plus every
            topic and at least one project, earns Comfortable. Full marks, plus every topic and every project, earns Mastered.
          </p>
        </div>
      </div>

      {history.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium">Recent attempts</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {history.slice(0, 3).map((h) => (
              <li key={h.at}>
                {h.score} of {h.total} · {new Date(h.at).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-xs text-muted-foreground">Answers are checked one at a time. Closing before the end discards the attempt.</p>
      <div className="mt-4 flex justify-end">
        <Button size="lg" onClick={onStart} autoFocus>
          Start quiz
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function QuizQuestionView({
  questions,
  session,
  dispatch,
  onFinish,
}: {
  questions: QuizQuestion[];
  session: QuizSession;
  dispatch: React.Dispatch<Parameters<typeof quizReducer>[1]>;
  onFinish: () => void;
}) {
  const { role } = useSkillPage();
  const pos = session.index;
  const q = questions[session.order[pos]];
  const selected = session.selected[pos];
  const submitted = session.submitted[pos];
  const correct = submitted && selected === q.answer;
  const isLast = pos === session.order.length - 1;
  const answeredCount = session.submitted.filter(Boolean).length;
  const headingRef = useRef<HTMLLegendElement>(null);

  // Move focus to each new question so keyboard and screen reader users follow along.
  useEffect(() => headingRef.current?.focus(), [pos]);

  return (
    <form
      className="px-6 py-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitted) dispatch({ type: "submit" });
        else if (!isLast) dispatch({ type: "next" });
        else onFinish();
      }}
    >
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>
          Question {pos + 1} of {questions.length}
        </span>
        <Badge tone={levelTone[q.level]}>{q.level === "Applied" ? `Applied · ${role.title}` : q.level}</Badge>
      </div>
      <Progress value={(answeredCount / questions.length) * 100} label="Quiz progress" className="mt-2 h-1.5" />

      <ol className="mt-3 flex gap-1.5" aria-label="Questions">
        {session.order.map((qi, i) => {
          const done = session.submitted[i];
          const right = done && session.selected[i] === questions[qi].answer;
          const reachable = done || i === session.submitted.indexOf(false);
          return (
            <li key={qi}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => dispatch({ type: "goto", index: i })}
                aria-current={i === pos ? "step" : undefined}
                aria-label={`Question ${i + 1}${done ? (right ? ", correct" : ", incorrect") : ", not answered"}`}
                className={cn(
                  "grid size-7 place-items-center rounded-full border font-label text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  i === pos && "ring-2 ring-ring ring-offset-2 ring-offset-background",
                  done && right && "border-success bg-success text-background",
                  done && !right && "border-danger bg-danger text-background",
                  !done && "border-border-strong",
                )}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </ol>

      <fieldset key={`${session.attempt}-${pos}`} className="mt-6">
        <legend ref={headingRef} tabIndex={-1} className="text-lg font-medium leading-snug focus:outline-none">
          {q.question}
        </legend>
        <div className="mt-5 space-y-2">
          {session.optionOrder[session.order[pos]].map((oi, position) => {
            const isChosen = selected === oi;
            const isAnswer = oi === q.answer;
            return (
              <label
                key={oi}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors",
                  !submitted && "cursor-pointer",
                  !submitted && (isChosen ? "border-primary bg-surface ring-1 ring-primary" : "border-border hover:border-border-strong"),
                  submitted && isAnswer && "border-success bg-success-soft text-success",
                  submitted && isChosen && !isAnswer && "border-danger bg-danger-soft text-danger",
                  submitted && !isChosen && !isAnswer && "border-border opacity-60",
                )}
              >
                <input
                  type="radio"
                  name={`quiz-${session.attempt}-${pos}`}
                  className="peer sr-only"
                  checked={isChosen}
                  disabled={submitted}
                  onChange={() => dispatch({ type: "select", option: oi })}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-px grid size-5 shrink-0 place-items-center rounded-full border font-label text-[0.65rem] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
                    isChosen && !submitted ? "border-primary bg-primary text-primary-foreground" : "border-current opacity-70",
                  )}
                >
                  {String.fromCharCode(65 + position)}
                </span>
                <span className="flex-1">{q.options[oi]}</span>
                {submitted && isAnswer && <CircleCheck aria-label="Correct answer" className="size-4 shrink-0" />}
                {submitted && isChosen && !isAnswer && <CircleX aria-label="Your answer" className="size-4 shrink-0" />}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div aria-live="polite">
        {submitted && (
          <div className={cn("mt-4 rounded-xl px-4 py-3 text-sm", correct ? "bg-success-soft" : "bg-danger-soft")}>
            <p className={cn("font-semibold", correct ? "text-success" : "text-danger")}>{correct ? "Correct" : "Not quite"}</p>
            {!correct && (
              <p className="mt-1">
                Correct answer: <span className="font-medium">{q.options[q.answer]}</span>
              </p>
            )}
            <p className="mt-1 text-foreground/80">{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={() => dispatch({ type: "prev" })} disabled={pos === 0}>
          <ArrowLeft aria-hidden="true" />
          Previous
        </Button>
        {!submitted ? (
          <Button type="submit" disabled={selected === null}>
            Submit answer
          </Button>
        ) : !isLast ? (
          <Button type="submit">
            Next question
            <ArrowRight aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" disabled={answeredCount < questions.length}>
            See results
            <ArrowRight aria-hidden="true" />
          </Button>
        )}
      </div>
    </form>
  );
}

function suggestion(summary: QuizSummary): string {
  if (summary.perfect) return "Full marks. If you can also apply this confidently in real work, Comfortable or Mastered may fit.";
  if (summary.passed) return "A pass suggests solid understanding. Comfortable may fit if you've used it in practice.";
  if (summary.score / summary.total >= 1 / 3) return "Some gaps remain. Familiar is probably the honest choice for now.";
  return "Worth revisiting the topics before rating yourself higher than Familiar.";
}

function QuizResults({
  questions,
  session,
  result,
  onRetry,
  onClose,
}: {
  questions: QuizQuestion[];
  session: QuizSession;
  result: { summary: QuizSummary; saved: LearningResult; levelBefore: Level };
  onRetry: () => void;
  onClose: () => void;
}) {
  const { role, skill, lesson, node, progress } = useSkillPage();
  const { summary, saved, levelBefore } = result;
  const headingRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => headingRef.current?.focus(), []);
  const currentLevel = node?.level ?? levelBefore;
  const nextStep = nextEarnStep(lesson, progress, currentLevel);
  const position = (q: QuizQuestion) => session.order.indexOf(questions.indexOf(q));

  return (
    <div className="px-6 py-6">
      <div className="text-center">
        <p ref={headingRef} tabIndex={-1} className="font-label text-6xl tabular-nums focus:outline-none">
          {summary.score}/{summary.total}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{summary.percent}% correct</p>
        <p className={cn("mt-3 inline-flex items-center gap-1.5 font-semibold", summary.passed ? "text-success" : "text-warning")}>
          {summary.passed ? <CircleCheck aria-hidden="true" className="size-4" /> : <Info aria-hidden="true" className="size-4" />}
          {summary.perfect ? "Full marks" : summary.passed ? "Passed" : `Not passed yet (pass mark ${passMark(summary.total)} of ${summary.total})`}
        </p>
      </div>

      <dl className={cn("mt-6 grid gap-2", summary.byLevel.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
        {summary.byLevel.map((l) => (
          <div key={l.level} className="rounded-xl border border-border bg-surface px-2 py-3 text-center">
            <dt className="text-xs text-muted-foreground">{l.level}</dt>
            <dd className="mt-1 font-label text-2xl tabular-nums">
              {l.correct}/{l.total}
            </dd>
          </div>
        ))}
      </dl>

      {summary.missed.length > 0 && (
        <details className="mt-6 rounded-xl border border-border bg-surface">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
            Review {summary.missed.length} missed {summary.missed.length === 1 ? "question" : "questions"}
          </summary>
          <ul className="space-y-4 border-t border-border px-4 py-4 text-sm">
            {summary.missed.map((q) => (
              <li key={q.id}>
                <p className="font-medium">
                  {position(q) + 1}. {q.question}
                </p>
                <p className="mt-1 text-success">Answer: {q.options[q.answer]}</p>
                <p className="mt-0.5 text-muted-foreground">{q.explanation}</p>
              </li>
            ))}
          </ul>
        </details>
      )}

      <section aria-labelledby="quiz-effect" className="mt-6 rounded-xl bg-surface-sunken/70 p-4 text-sm">
        <h3 id="quiz-effect" className="font-medium">
          What this means for your progress
        </h3>
        <p className="mt-1 text-muted-foreground">
          {saved.raisedTo !== null
            ? `Together with your completed topics and projects, this raised your level from ${levelLabel(levelBefore)} to ${levelLabel(saved.raisedTo)}.`
            : `Saved to your progress. Your level stays ${levelLabel(currentLevel)}.` +
              (nextStep && nextStep.steps.length ? ` To reach ${levelLabel(nextStep.level)} through learning: ${nextStep.steps.join(", ")}.` : "")}
        </p>
      </section>

      <section aria-labelledby="quiz-update" className="mt-6">
        <h3 id="quiz-update" className="text-sm font-medium">
          Update your proficiency
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{suggestion(summary)} You decide; nothing changes unless you pick a level.</p>
        <LevelPicker
          name={`quiz-level-${skill.id}`}
          value={node && (node.rated || node.level > 0) ? node.level : undefined}
          onChange={(level) => actions.setRating(role.slug, skill.id, level)}
          labelledBy="quiz-update"
          className="mt-3"
        />
        {node && (
          <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
            Current level: {levelLabel(node.level)}. A {role.title} needs {levelLabel(node.required)}.
          </p>
        )}
      </section>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button variant="secondary" onClick={onRetry}>
          <RotateCcw aria-hidden="true" />
          Retry quiz
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/roadmap" className={buttonVariants({ variant: "ghost" })} onClick={onClose}>
            <MapIcon aria-hidden="true" />
            Back to roadmap
          </Link>
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  );
}
