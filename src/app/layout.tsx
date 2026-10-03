import type { Metadata, Viewport } from "next";
import { Antonio, Inter, Italiana } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StorageBanner } from "@/components/storage-banner";
import { Toaster } from "@/components/toaster";
import { themeScript } from "@/components/theme/theme-script";
import "./globals.css";

// UI and body text — matches the grotesque letterforms of the SkillBridge wordmark.
const sans = Inter({
  variable: "--font-brand-sans",
  subsets: ["latin"],
});

// Display headings — PROVISIONAL stand-in for the high-contrast display face in the palette reference.
// Swap this import for the exact font (or next/font/local with licensed files) once confirmed.
const display = Italiana({
  variable: "--font-brand-display",
  subsets: ["latin"],
  weight: "400",
});

// Labels and numerals — matches the condensed face used for the hex codes in the palette reference.
const label = Antonio({
  variable: "--font-brand-label",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SkillBridge — Know your skill gap. Bridge it.",
    template: "%s · SkillBridge",
  },
  description:
    "SkillBridge shows you exactly which skills stand between you and your target tech role, then builds a personalized roadmap to close the gap.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0e7d5" },
    { media: "(prefers-color-scheme: dark)", color: "#212842" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${label.variable} h-full antialiased`}
    >
      <head>
        {/* type switches to text/plain on the client so React never tries to run it again (Next.js docs pattern) */}
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <StorageBanner />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
