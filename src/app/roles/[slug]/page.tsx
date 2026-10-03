import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { RoleIcon } from "@/components/role-icon";
import { RoleProgressPanel } from "@/components/role-progress";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getRole, rolePhases, roles, roleSkillCount } from "@/data/roles";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/roles/[slug]">): Promise<Metadata> {
  const role = getRole((await params).slug);
  return role ? { title: role.title, description: role.summary } : {};
}

export default async function RolePage({ params }: PageProps<"/roles/[slug]">) {
  const role = getRole((await params).slug);
  if (!role) notFound();

  const related = roles.filter((r) => r.category === role.category && r.slug !== role.slug).slice(0, 3);
  const others = related.length ? related : roles.filter((r) => r.slug !== role.slug).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
      <Link href="/roles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft aria-hidden="true" className="size-4" />
        All roles
      </Link>

      <header className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
        <div>
          <div className="flex items-center gap-4">
            <RoleIcon icon={role.icon} size="lg" />
            <Eyebrow>{role.category}</Eyebrow>
          </div>
          <h1 className="mt-6 font-display text-5xl tracking-tight sm:text-7xl">{role.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{role.description}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-elev-2">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Skills assessed</dt>
              <dd className="mt-1 font-label text-3xl">{roleSkillCount(role)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Starting point</dt>
              <dd className="mt-1 font-medium">{role.startingPoint}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <RoleProgressPanel slug={role.slug} />
          </div>
        </div>
      </header>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section aria-labelledby="skills-title">
          <h2 id="skills-title" className="text-2xl font-semibold tracking-tight">
            Skills you&apos;ll need
          </h2>
          <p className="mt-1 text-muted-foreground">In the order they&apos;re usually learned.</p>
          <ol className="mt-6 space-y-4">
            {rolePhases(role).map((phase, i) => (
              <li key={phase.name} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full border border-border-strong font-label text-sm">{i + 1}</span>
                  <h3 className="font-semibold">{phase.name}</h3>
                </div>
                <div className="mt-5 space-y-5">
                  {phase.categories.map((c) => (
                    <div key={c.id}>
                      <h4 className="text-sm font-medium">{c.name}</h4>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {c.skills.map((s) => (
                          <li key={s.id} title={s.description} className="rounded-full bg-surface-sunken px-3 py-1.5 text-sm">
                            {s.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="space-y-10">
          <section aria-labelledby="day-title">
            <h2 id="day-title" className="text-lg font-semibold tracking-tight">
              What you&apos;ll do
            </h2>
            <ul className="mt-4 space-y-3">
              {role.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-relaxed">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="related-title">
            <h2 id="related-title" className="text-lg font-semibold tracking-tight">
              Related roles
            </h2>
            <ul className="mt-4 space-y-2">
              {others.map((r) => (
                <li key={r.slug}>
                  <Link href={`/roles/${r.slug}`} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-strong">
                    <RoleIcon icon={r.icon} size="sm" />
                    <span className="text-sm font-medium">{r.title}</span>
                    <ArrowRight aria-hidden="true" className="ml-auto size-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
