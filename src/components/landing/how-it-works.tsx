import { ClipboardCheck, Route, Target } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";

const steps = [
  {
    icon: Target,
    title: "Choose your goal",
    body: "Pick the tech role you're aiming for. We load the skills employers expect for it, from foundations through to job-ready.",
    detail: "8 career paths mapped",
  },
  {
    icon: ClipboardCheck,
    title: "Assess your skills",
    body: "Rate what you already know, then confirm it with short knowledge checks. Skills you learned anywhere count.",
    detail: "Self-rating plus quick checks",
  },
  {
    icon: Route,
    title: "Follow your personalized roadmap",
    body: "See your skill gaps in priority order. Learn, practice and test your way through them, and watch your readiness grow.",
    detail: "Updates as you progress",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="how-title" className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            From “I want that job” to a clear plan in three steps
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {/* Connector line behind the step numbers on wider screens */}
          <span aria-hidden="true" className="absolute top-7 right-[calc(33.333%-3.083rem)] left-7 hidden border-t border-dashed border-border-strong md:block" />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <span className="relative grid size-14 shrink-0 place-items-center rounded-full border border-border-strong bg-background">
                  <step.icon aria-hidden="true" className="size-6" strokeWidth={1.6} />
                  <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-primary font-label text-xs text-primary-foreground">
                    {i + 1}
                  </span>
                </span>
                <h3 className="text-xl font-semibold tracking-tight md:mt-6">{step.title}</h3>
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">{step.body}</p>
              <p className="mt-4 font-label text-xs uppercase tracking-[0.18em]">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
