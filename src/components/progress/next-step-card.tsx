import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { NextStep } from "@/lib/progress";

/** The user's next action in the journey, always a real destination. */
export function NextStepCard({ step }: { step: NextStep }) {
  return (
    <section
      aria-labelledby="next-step-title"
      data-theme="dark"
      className="rounded-2xl border border-border bg-background p-6 text-foreground shadow-elev-3 sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border bg-surface">
            <Compass aria-hidden="true" className="size-5" strokeWidth={1.6} />
          </span>
          <div>
            <p className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">{step.eyebrow}</p>
            <h2 id="next-step-title" className="mt-1.5 text-xl font-semibold tracking-tight">
              {step.title}
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </div>
        </div>
        <Link href={step.href} className={buttonVariants({ size: "lg", className: "shrink-0" })}>
          {step.cta}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
