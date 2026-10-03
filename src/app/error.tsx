"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

/** Shown if a page throws while rendering. Saved progress is untouched. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <span className="grid size-14 place-items-center rounded-full border border-border bg-surface-sunken">
        <TriangleAlert aria-hidden="true" className="size-6 text-warning" />
      </span>
      <h1 className="mt-6 font-display text-4xl tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">
        This page hit an unexpected error. Your saved progress hasn&apos;t been changed. Try again, or head back to your
        dashboard.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>
          <RotateCcw aria-hidden="true" />
          Try again
        </Button>
        <Link href="/dashboard" className={buttonVariants({ variant: "secondary" })}>
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
