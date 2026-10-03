import type { Metadata } from "next";
import { AssessmentView } from "./assessment-view";

export const metadata: Metadata = { title: "Skill assessment" };

export default function AssessPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
      <AssessmentView />
    </div>
  );
}
