import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type RadioCardProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

/** A native radio input presented as a selectable card. Arrow keys move between cards in the same group. */
export function RadioCard({ name, value, checked, onChange, title, description, icon, className }: RadioCardProps) {
  const id = `${name}-${value}`;
  return (
    <div className={cn("relative", className)}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className={cn(
          "flex h-full cursor-pointer items-center gap-3.5 rounded-xl border bg-surface p-4 transition-all",
          "hover:border-border-strong",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
          checked ? "border-primary ring-1 ring-primary" : "border-border",
        )}
      >
        {icon}
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium">{title}</span>
          {description && <span className="mt-0.5 block text-sm text-muted-foreground">{description}</span>}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
            checked ? "border-primary bg-primary text-primary-foreground" : "border-border-strong text-transparent",
          )}
        >
          <Check className="size-3" strokeWidth={3} />
        </span>
      </label>
    </div>
  );
}
