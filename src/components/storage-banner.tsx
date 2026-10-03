"use client";

import Link from "next/link";
import { CircleAlert, X } from "lucide-react";
import { dismissRecoveredNotice, useStorageHealth } from "@/lib/store";

/** Tells the user, site-wide, when their progress isn't being saved or saved data couldn't be read. */
export function StorageBanner() {
  const health = useStorageHealth();
  if (!health || (health.status === "ok" && !health.recoveredUnreadable)) return null;

  return (
    <div role="alert" className="border-b border-danger/30 bg-danger-soft text-danger">
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-3 text-sm sm:px-6">
        <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <p className="flex-1">
          {health.status === "memory" ? (
            <>
              <span className="font-semibold">Your progress isn&apos;t being saved.</span> This browser is blocking storage or it&apos;s
              full, so changes will be lost when you close this tab.{" "}
              <Link href="/profile#your-data" className="font-medium underline underline-offset-4">
                Download a backup
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold">Saved progress couldn&apos;t be read</span>, so SkillBridge started fresh. The
              original data was kept, not deleted.{" "}
              <Link href="/profile#your-data" className="font-medium underline underline-offset-4">
                See options in Profile
              </Link>
            </>
          )}
        </p>
        {health.status === "ok" && (
          <button type="button" onClick={dismissRecoveredNotice} aria-label="Dismiss" className="grid size-6 place-items-center rounded-full hover:bg-danger/10">
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
