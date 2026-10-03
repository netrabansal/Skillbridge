import Link from "next/link";
import { Pencil } from "lucide-react";
import { RoleIcon } from "@/components/role-icon";
import { buttonVariants } from "@/components/ui/button";
import type { Role } from "@/data/roles";
import { optionLabel, type CareerSetup } from "@/lib/setup";

export function SetupDetails({ setup, role }: { setup: CareerSetup; role: Role }) {
  return (
    <section aria-labelledby="setup-details-title" className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 id="setup-details-title" className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Your setup
        </h2>
        <Link href={`/start?role=${role.slug}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <Pencil aria-hidden="true" />
          Edit
        </Link>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <RoleIcon icon={role.icon} />
        <div>
          <p className="font-semibold tracking-tight">{role.title}</p>
          <Link href={`/roles/${role.slug}`} className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
            About this role
          </Link>
        </div>
      </div>
      <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
        {[
          { label: "Experience", value: optionLabel.experience(setup.experience) },
          { label: "Time per week", value: optionLabel.hours(setup.hoursPerWeek) },
          { label: "Timeline", value: optionLabel.timeline(setup.timeline) },
        ].map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="text-right font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
