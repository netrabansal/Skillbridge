import type { Metadata } from "next";
import { Suspense } from "react";
import { SetupLoading } from "@/components/progress/setup-states";
import { RoadmapView } from "./roadmap-view";

export const metadata: Metadata = { title: "My Roadmap" };

export default function RoadmapPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
      {/* The selected skill lives in the URL (?skill=), which needs a Suspense boundary for useSearchParams. */}
      <Suspense fallback={<SetupLoading />}>
        <RoadmapView />
      </Suspense>
    </div>
  );
}
