"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { getRole } from "@/data/roles";
import { cn } from "@/lib/cn";
import { recommendNext, roadmapFor } from "@/lib/progress";
import { learnHref } from "@/lib/routes";
import { useAppState } from "@/lib/store";

export const mainNav = [
  { href: "/roles", label: "Explore Roles" },
  { href: "/roadmap", label: "My Roadmap" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu on navigation and on Escape.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo href="/" height={22} />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm whitespace-nowrap transition-colors",
                      active
                        ? "bg-surface-sunken font-medium text-foreground"
                        : "text-muted-foreground hover:bg-surface-sunken/60 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Between md and lg the nav needs the room; the hero carries its own CTA. */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <HeaderCta size="sm" />
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-foreground hover:bg-surface-sunken md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-border bg-background md:hidden"
      >
        <nav aria-label="Main" className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <ul className="space-y-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-3 text-base transition-colors",
                      active ? "bg-surface-sunken font-medium" : "hover:bg-surface-sunken",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
            <ThemeToggle />
            <HeaderCta size="md" />
          </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * The header's main call to action follows where the user is: new visitors build a roadmap, people mid-assessment
 * continue it, and anyone with a roadmap resumes their next skill. (Server render shows the new-visitor version.)
 */
function HeaderCta({ size }: { size: "sm" | "md" }) {
  const state = useAppState();
  const role = getRole(state?.setup?.roleSlug);
  let cta = { href: "/start", label: "Build My Roadmap" };
  if (state && role) {
    if (state.roadmaps[role.slug]) {
      const next = recommendNext(roadmapFor(state, role));
      cta = { href: next ? learnHref(role.slug, next.node.skill.id) : "/roadmap", label: "Resume roadmap" };
    } else {
      cta = { href: "/assess", label: "Continue assessment" };
    }
  }
  return (
    <Link href={cta.href} className={buttonVariants({ size })}>
      {cta.label}
    </Link>
  );
}
