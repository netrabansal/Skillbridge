import type { Metadata } from "next";
import { PageIntro } from "@/components/progress/setup-states";
import { RolesExplorer } from "./roles-explorer";

export const metadata: Metadata = {
  title: "Explore Roles",
  description: "Compare tech career paths and the skills each one needs, from foundations to job-ready.",
};

export default function RolesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
      <PageIntro eyebrow="Explore Roles" title="Find the role that fits you">
        Compare career paths and the skills each one needs. Open a role to see its full skill map, or start building
        your roadmap straight away.
      </PageIntro>
      <RolesExplorer />
    </div>
  );
}
