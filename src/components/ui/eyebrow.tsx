import { cn } from "@/lib/cn";

/** Small uppercase label set in the brand label face — section kickers, metadata. */
export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-label text-xs font-normal uppercase tracking-[0.18em] text-muted-foreground", className)}
      {...props}
    />
  );
}
