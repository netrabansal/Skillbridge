import type { Metadata } from "next";
import { DashboardView } from "./dashboard-view";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
      <DashboardView />
    </div>
  );
}
