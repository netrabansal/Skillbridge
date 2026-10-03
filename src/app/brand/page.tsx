import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { TokenSwatch } from "./token-swatch";

export const metadata: Metadata = {
  title: "Brand foundation",
  robots: { index: false },
};

const themeTokens: { token: string; name: string; against?: string; note?: string }[] = [
  { token: "--background", name: "Background" },
  { token: "--surface", name: "Surface", note: "Cards, popovers" },
  { token: "--surface-sunken", name: "Surface sunken", note: "Wells, tracks" },
  { token: "--foreground", name: "Foreground", against: "--background" },
  { token: "--muted-foreground", name: "Muted text", against: "--background" },
  { token: "--border", name: "Border" },
  { token: "--border-strong", name: "Border strong" },
  { token: "--primary", name: "Primary", note: "Buttons, active states" },
  { token: "--logo-ink", name: "Logo ink" },
];

const semanticTokens: { token: string; name: string; against: string }[] = [
  { token: "--success", name: "Success", against: "--success-soft" },
  { token: "--warning", name: "Warning", against: "--warning-soft" },
  { token: "--danger", name: "Danger", against: "--danger-soft" },
  { token: "--info", name: "Info", against: "--info-soft" },
];

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={`${id}-title`} className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

/** Renders children with a fixed theme, regardless of the page theme, so both can be compared side by side. */
function ThemePanel({ theme, children }: { theme: "light" | "dark"; children: React.ReactNode }) {
  return (
    <div data-theme={theme} className="rounded-xl border border-border bg-background p-6 text-foreground sm:p-8">
      <p className="mb-6 font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {theme === "light" ? "Light theme" : "Dark theme"}
      </p>
      {children}
    </div>
  );
}

/** Visual specimens only: inert so they can't be focused or clicked as if they did something. */
function ComponentShowcase() {
  return (
    <div className="space-y-6" inert aria-label="Component specimens (not interactive)">
      <div className="flex flex-wrap gap-3">
        <Button>Generate roadmap</Button>
        <Button variant="secondary">Retake assessment</Button>
        <Button variant="ghost">Skip for now</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge tone="success">On track</Badge>
        <Badge tone="warning">Small gap</Badge>
        <Badge tone="danger">Critical gap</Badge>
        <Badge tone="info">In progress</Badge>
        <Badge>Beginner</Badge>
      </div>
      <Input placeholder="Search careers, e.g. Data Analyst" aria-label="Search careers" />
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>React fundamentals</CardTitle>
            <CardDescription>Required for Frontend Developer · Level 3 of 4</CardDescription>
          </div>
          <Badge tone="warning">1 level to go</Badge>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Progress value={62} label="React fundamentals progress" />
          <span className="font-label text-sm tabular-nums">62%</span>
        </div>
      </Card>
    </div>
  );
}

export default function BrandPage() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6">
        <header className="py-16 sm:py-20">
          <Eyebrow>Internal · for sign-off</Eyebrow>
          <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-7xl">Brand foundation</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Every color, typeface and component in SkillBridge comes from the tokens on this page. Values are read live
            from the stylesheet, so what you see here is exactly what the product uses.
          </p>
        </header>

        <Section id="references" eyebrow="00 · Source" title="Supplied references">
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <figure className="overflow-hidden rounded-xl border border-border bg-white">
              <Image
                src="/brand/source/skillbridge-logo-original.png"
                alt="Original SkillBridge logo as supplied"
                width={1600}
                height={499}
                className="h-auto w-full"
              />
            </figure>
            <figure className="overflow-hidden rounded-xl border border-border">
              <Image
                src="/brand/source/palette-reference.png"
                alt="Supplied palette and typography reference: Cream #F0E7D5 and Midnight Indigo #212842"
                width={735}
                height={899}
                className="h-auto w-full"
              />
            </figure>
          </div>
        </Section>

        <Section id="logo" eyebrow="01 · Logo" title="Wordmark">
          <div className="grid gap-6 md:grid-cols-2">
            <div data-theme="light" className="grid grid-cols-[minmax(0,1fr)] place-items-center rounded-xl border border-border bg-background px-8 py-16">
              <Logo height={44} />
            </div>
            <div data-theme="dark" className="grid grid-cols-[minmax(0,1fr)] place-items-center rounded-xl border border-border bg-background px-8 py-16">
              <Logo height={44} />
            </div>
          </div>
          <div className="mt-6 grid gap-6 text-sm text-muted-foreground md:grid-cols-3">
            <p>
              <span className="font-medium text-foreground">Light:</span> the supplied artwork and navy (#0C2A4C), with
              only the white background removed.
            </p>
            <p>
              <span className="font-medium text-foreground">Dark:</span> the same artwork in Cream. The supplied navy has
              1.0:1 contrast on Midnight Indigo. <Badge tone="warning">Pending approval</Badge>
            </p>
            <p>
              <span className="font-medium text-foreground">Minimum size:</span> 20px tall on screen. Clear space on all
              sides equals the height of the “S”.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-end gap-8">
            {[20, 28, 36].map((h) => (
              <div key={h} className="space-y-2">
                <Logo height={h} />
                <p className="font-label text-xs text-muted-foreground">{h}px</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="color" eyebrow="02 · Color" title="Palette">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { name: "Cream", hex: "#F0E7D5", bg: "bg-cream", fg: "text-indigo", role: "Light background · dark-mode text" },
              { name: "Midnight Indigo", hex: "#212842", bg: "bg-indigo", fg: "text-cream", role: "Text & primary · dark-mode background" },
              { name: "Logo ink", hex: "#0C2A4C", bg: "bg-[#0C2A4C]", fg: "text-cream", role: "Reserved for the wordmark" },
            ].map((c) => (
              <div key={c.name} className={`${c.bg} ${c.fg} flex aspect-[4/3] flex-col justify-end rounded-xl border border-border p-6`}>
                <p className="font-display text-3xl">{c.name}</p>
                <p className="mt-1 font-label text-sm tracking-wider">{c.hex}</p>
                <p className="mt-3 text-xs opacity-80">{c.role}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-14 text-lg font-semibold">Theme tokens</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Tints and shades of Cream and Midnight Indigo only. Contrast is measured against the background.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {(["light", "dark"] as const).map((t) => (
              <ThemePanel key={t} theme={t}>
                <div className="grid gap-5 sm:grid-cols-2">
                  {themeTokens.map((tok) => (
                    <TokenSwatch key={tok.token} {...tok} />
                  ))}
                </div>
              </ThemePanel>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold">Status colors</h3>
            <Badge tone="warning">Proposed — not in supplied palette</Badge>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Needed for skill-gap severity, quiz results and errors. Muted to sit with the palette. Contrast is measured
            against each color&apos;s soft background.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {(["light", "dark"] as const).map((t) => (
              <ThemePanel key={t} theme={t}>
                <div className="grid gap-5 sm:grid-cols-2">
                  {semanticTokens.map((tok) => (
                    <TokenSwatch key={tok.token} {...tok} />
                  ))}
                </div>
              </ThemePanel>
            ))}
          </div>
        </Section>

        <Section id="type" eyebrow="03 · Typography" title="Typefaces">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <Eyebrow>Display</Eyebrow>
                <Badge tone="warning">Provisional</Badge>
              </div>
              <p className="mt-6 font-display text-6xl leading-none">Aa</p>
              <p className="mt-6 text-sm font-medium">Italiana (stand-in)</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Closest free match to the high-contrast display face in your reference. Replaced once the exact font is
                confirmed. Used for page titles and hero headings only.
              </p>
            </Card>
            <Card className="flex flex-col">
              <Eyebrow>Label</Eyebrow>
              <p className="mt-6 font-label text-6xl leading-none">Aa 0–9</p>
              <p className="mt-6 text-sm font-medium">Antonio</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Condensed face matching the hex-code labels in your reference. Used for eyebrows, stats and numerals.
              </p>
            </Card>
            <Card className="flex flex-col">
              <Eyebrow>Interface &amp; body</Eyebrow>
              <p className="mt-6 text-6xl leading-none font-semibold">Aa</p>
              <p className="mt-6 text-sm font-medium">Inter</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Echoes the wordmark&apos;s letterforms. Readable at small sizes for dashboards, forms and long text.
              </p>
            </Card>
          </div>

          <div className="mt-12 divide-y divide-border rounded-xl border border-border bg-surface">
            {[
              { label: "Display XL · 72", cls: "font-display text-5xl sm:text-7xl leading-[1.05]", text: "Bridge the gap" },
              { label: "Display L · 48", cls: "font-display text-4xl sm:text-5xl", text: "Your personalized roadmap" },
              { label: "Heading · 24 / 600", cls: "text-2xl font-semibold tracking-tight", text: "Skills you already have" },
              { label: "Title · 18 / 600", cls: "text-lg font-semibold", text: "SQL for data analysis" },
              { label: "Body · 16 / 400", cls: "text-base leading-relaxed max-w-2xl", text: "Rate how confident you are with each skill. Be honest: your roadmap is only as accurate as your starting point." },
              { label: "Small · 14 / 400", cls: "text-sm text-muted-foreground", text: "Estimated 6 hours · 4 resources · 1 practice project" },
              { label: "Stat · Antonio 48", cls: "font-label text-5xl tabular-nums", text: "72% ready" },
            ].map((row) => (
              <div key={row.label} className="grid gap-2 px-6 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline">
                <p className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">{row.label}</p>
                <p className={row.cls}>{row.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="components" eyebrow="04 · Components" title="Core components">
          <div className="grid gap-6 lg:grid-cols-2">
            <ThemePanel theme="light">
              <ComponentShowcase />
            </ThemePanel>
            <ThemePanel theme="dark">
              <ComponentShowcase />
            </ThemePanel>
          </div>
        </Section>
    </div>
  );
}
