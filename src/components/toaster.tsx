"use client";

import { useEffect, useState } from "react";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { TOAST_EVENT, type Toast } from "@/lib/toast";

const icons = { success: CircleCheck, info: Info, error: CircleAlert };
const tones = { success: "text-success", info: "text-info", error: "text-danger" };

let seq = 0;

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const onToast = (e: Event) => {
      // Ids are assigned here so they're unique even if the sender's module was reloaded.
      const t = { ...(e as CustomEvent<Toast>).detail, id: ++seq };
      setToasts((list) => [...list.slice(-2), t]);
      // Errors stay until dismissed; everything else clears itself.
      if (t.tone !== "error") setTimeout(() => setToasts((list) => list.filter((x) => x.id !== t.id)), 5000);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  const dismiss = (id: number) => setToasts((list) => list.filter((x) => x.id !== id));

  // Two persistent live regions (polite for updates, assertive for errors) so each message is announced once.
  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex flex-col items-center gap-2 px-4">
      <div aria-live="polite" className="contents">
        {toasts.filter((t) => t.tone !== "error").map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
      <div aria-live="assertive" className="contents">
        {toasts.filter((t) => t.tone === "error").map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </div>
  );
}

function ToastCard({ toast: t, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  const Icon = icons[t.tone];
  return (
    <div className="pointer-events-auto flex w-full max-w-md animate-fade-up items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-elev-3">
      <Icon aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", tones[t.tone])} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{t.title}</p>
        {t.description && <p className="mt-0.5 text-sm text-muted-foreground">{t.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(t.id)}
        aria-label="Dismiss notification"
        className="grid size-7 shrink-0 place-items-center rounded-full hover:bg-surface-sunken"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
