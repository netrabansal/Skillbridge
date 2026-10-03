import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center shadow-elev-2 sm:px-12 sm:py-20">
        <span aria-hidden="true" className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-label text-[9rem] leading-none text-foreground/[0.04] select-none sm:text-[14rem]">
          {"</>"}
        </span>
        <h2 id="closing-title" className="relative mx-auto max-w-3xl font-display text-4xl leading-tight tracking-tight sm:text-6xl">
          Your next role is a set of skills. Let&apos;s map them.
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-muted-foreground">
          Set your goal and starting point in about two minutes. Your roadmap starts from what you already know.
        </p>
        <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/start" className={buttonVariants({ size: "lg" })}>
            Build My Roadmap
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/roles" className={buttonVariants({ size: "lg", variant: "secondary" })}>
            Explore Roles
          </Link>
        </div>
      </div>
    </section>
  );
}
