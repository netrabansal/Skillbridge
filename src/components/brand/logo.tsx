import Link from "next/link";
import { cn } from "@/lib/cn";

/** Intrinsic size of /brand/skillbridge-logo.png (trimmed from the supplied file, original artwork untouched). */
const LOGO_WIDTH = 1512;
const LOGO_HEIGHT = 208;

type LogoProps = {
  /** Rendered height in px; width follows the logo's aspect ratio. Keep >= 20 for legibility. */
  height?: number;
  href?: string;
  className?: string;
};

/**
 * The SkillBridge wordmark. Rendered as a CSS mask filled with --logo-ink, so it is the supplied
 * navy (#0C2A4C) in light mode and switches to Cream in dark mode, where the navy would be invisible.
 * Keep clear space around it at least equal to the height of the "S" (documented on /brand).
 */
export function Logo({ height = 28, href, className }: LogoProps) {
  const mark = (
    <span
      role="img"
      aria-label="SkillBridge"
      className="block bg-logo-ink forced-colors:bg-[CanvasText] forced-colors:[forced-color-adjust:none]"
      style={{
        // Width is derived from height; the aspect ratio lets it shrink to fit narrow containers.
        width: (height * LOGO_WIDTH) / LOGO_HEIGHT,
        maxWidth: "100%",
        aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}`,
        maskImage: "url(/brand/skillbridge-logo.png)",
        WebkitMaskImage: "url(/brand/skillbridge-logo.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );

  if (!href) return <span className={cn("inline-block max-w-full", className)}>{mark}</span>;

  return (
    <Link href={href} aria-label="SkillBridge home" className={cn("inline-block max-w-full rounded-sm", className)}>
      {mark}
    </Link>
  );
}
