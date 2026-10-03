import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <span className="grid size-14 place-items-center rounded-full border border-border bg-surface-sunken">
        <Compass aria-hidden="true" className="size-6" strokeWidth={1.6} />
      </span>
      <p className="mt-6 font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">404</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground">That page doesn&apos;t exist, or the link is out of date.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard" className={buttonVariants()}>
          Go to dashboard
        </Link>
        <Link href="/roles" className={buttonVariants({ variant: "secondary" })}>
          Explore roles
        </Link>
      </div>
    </div>
  );
}
