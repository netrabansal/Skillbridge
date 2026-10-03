import { cn } from "@/lib/cn";

/** Circular overall-progress indicator, drawn in the brand primary colour. */
export function ProgressRing({ percent, size = "lg", className }: { percent: number; size?: "md" | "lg"; className?: string }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div
      className={cn("relative shrink-0", size === "lg" ? "size-36" : "size-28", className)}
      role="img"
      aria-label={`Overall progress ${percent}%`}
    >
      <svg viewBox="0 0 128 128" className="size-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth="10" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(100, Math.max(0, percent)) / 100)}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className={cn("absolute inset-0 grid place-items-center font-label tabular-nums", size === "lg" ? "text-4xl" : "text-3xl")}>
        {percent}%
      </span>
    </div>
  );
}
