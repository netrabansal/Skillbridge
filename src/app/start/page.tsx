import type { Metadata } from "next";
import { JourneyStepper } from "@/components/journey-stepper";
import { getRole } from "@/data/roles";
import { SetupFlow } from "./setup-flow";

export const metadata: Metadata = {
  title: "Set up your career goal",
};

export default async function StartPage({ searchParams }: PageProps<"/start">) {
  const { role } = await searchParams;
  const initialRole = getRole(typeof role === "string" ? role : undefined)?.slug ?? null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
      <JourneyStepper current={0} />
      <SetupFlow initialRole={initialRole} />
    </div>
  );
}
