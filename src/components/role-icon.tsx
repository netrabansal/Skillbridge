import { BrainCircuit, ChartColumn, Cloud, CodeXml, Infinity as InfinityIcon, Layers, Server, ShieldCheck } from "lucide-react";
import type { RoleIcon as RoleIconName } from "@/data/roles";
import { cn } from "@/lib/cn";

const icons = {
  frontend: CodeXml,
  backend: Server,
  fullstack: Layers,
  data: ChartColumn,
  ai: BrainCircuit,
  devops: InfinityIcon,
  security: ShieldCheck,
  cloud: Cloud,
} satisfies Record<RoleIconName, React.ComponentType<{ className?: string }>>;

/** A role's icon in a soft rounded tile. */
export function RoleIcon({ icon, size = "md", className }: { icon: RoleIconName; size?: "sm" | "md" | "lg"; className?: string }) {
  const Icon = icons[icon];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-lg border border-border bg-surface-sunken text-foreground",
        size === "sm" && "size-8 [&_svg]:size-4",
        size === "md" && "size-11 [&_svg]:size-5",
        size === "lg" && "size-14 rounded-xl [&_svg]:size-6",
        className,
      )}
    >
      <Icon strokeWidth={1.6} />
    </span>
  );
}
