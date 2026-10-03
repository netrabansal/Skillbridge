import { ArrowUpRight, BadgeCheck, CircleHelp } from "lucide-react";
import { linkCheck, type Resource } from "@/data/learning";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** External learning resources, each labelled with the result of the last link check. */
export function ResourceList({ resources }: { resources: Resource[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {resources.map((r) => {
        const check = linkCheck(r.url);
        const host = new URL(r.url).hostname.replace(/^www\./, "");
        return (
          <li key={r.url}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-elev-2"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-surface-sunken px-2.5 py-0.5 text-xs font-medium">{r.kind}</span>
                <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span className="mt-3 font-semibold leading-snug tracking-tight">
                {r.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {r.provider} · {host}
              </span>
              <span className="mt-auto pt-4 text-xs">
                {check ? (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <BadgeCheck aria-hidden="true" className="size-3.5 text-success" />
                    {check.method === "browser" ? "Opened in a browser" : "Link checked"} {formatDate(check.on)}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <CircleHelp aria-hidden="true" className="size-3.5" />
                    Not verified: the site blocks automated checks
                  </span>
                )}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
