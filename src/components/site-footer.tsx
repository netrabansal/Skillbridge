import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { roles } from "@/data/roles";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/roles", label: "Explore Roles" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/start", label: "Build My Roadmap" },
    ],
  },
  {
    title: "Popular roles",
    links: roles.slice(0, 5).map((r) => ({ href: `/roles/${r.slug}`, label: r.title })),
  },
  {
    title: "Your progress",
    links: [
      { href: "/roadmap", label: "My Roadmap" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/profile", label: "Profile" },
    ],
  },
];

/** Always rendered on Midnight Indigo: it scopes the dark tokens locally, so the logo and text switch to Cream. */
export function SiteFooter() {
  return (
    <footer data-theme="dark" className="mt-auto border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo href="/" height={24} />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Pick the tech career you want. We map the skills you have against the skills it needs, and build a
              personalized roadmap to close the gap.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-foreground/85 transition-colors hover:text-foreground hover:underline underline-offset-4">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SkillBridge. Built for people bridging into tech.</p>
          <p className="font-label tracking-[0.18em] uppercase">Choose · Assess · Bridge</p>
        </div>
      </div>
    </footer>
  );
}
