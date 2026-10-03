import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

/** Shown on personal pages before a career setup has been saved on this device. */
export function NoSetupState({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-14 text-center sm:px-10">
      <span className="mx-auto grid size-14 place-items-center rounded-full border border-border bg-surface-sunken">
        <Compass aria-hidden="true" className="size-6" strokeWidth={1.6} />
      </span>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-muted-foreground">{body}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/start" className={buttonVariants({ size: "lg" })}>
          Build My Roadmap
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link href="/roles" className={buttonVariants({ size: "lg", variant: "secondary" })}>
          Explore Roles
        </Link>
      </div>
    </div>
  );
}

/** Placeholder while the saved setup is read on the client. */
export function SetupLoading() {
  return (
    <div aria-busy="true" aria-label="Loading your setup" className="space-y-4">
      <div className="h-10 w-2/3 animate-pulse rounded-lg bg-surface-sunken" />
      <div className="h-40 animate-pulse rounded-2xl bg-surface-sunken" />
      <div className="h-40 animate-pulse rounded-2xl bg-surface-sunken" />
    </div>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-10">
      <p className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-6xl">{title}</h1>
      {children && <div className="mt-4 max-w-2xl text-lg text-muted-foreground">{children}</div>}
    </header>
  );
}
