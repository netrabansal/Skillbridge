import { describe, expect, it } from "vitest";
import { getRole } from "@/data/roles";
import type { Level } from "@/lib/assessment";
import { recommendNext } from "@/lib/progress";
import { computeRoadmap } from "@/lib/roadmap";

const role = getRole("backend-developer")!;
const skills = role.categories.flatMap((c) => c.skills);
const allAt = (level: (required: Level) => Level) => Object.fromEntries(skills.map((s) => [s.id, level(s.required)]));

describe("recommendNext", () => {
  it("starts a beginner on a skill with no prerequisites", () => {
    const rec = recommendNext(computeRoadmap(role, {}, {}))!;
    expect(rec.node.prerequisites).toEqual([]);
    expect(rec.reasons.some((r) => r.includes("no prerequisites"))).toBe(true);
  });

  it("only recommends skills whose prerequisites are complete when one is available", () => {
    // Programming language done; everything else not started.
    const rec = recommendNext(computeRoadmap(role, { "programming-language": 3 }, {}))!;
    expect(rec.node.ready).toBe(true);
    for (const p of rec.node.prerequisites) expect(["programming-language"]).toContain(p);
    for (const n of rec.upNext) expect(n.ready).toBe(true);
  });

  it("prefers skills already in progress, then roadmap order", () => {
    const ratings = { "programming-language": 3 as Level, "databases-sql": 1 as Level };
    const rec = recommendNext(computeRoadmap(role, ratings, {}))!;
    expect(rec.node.skill.id).toBe("databases-sql");
    expect(rec.reasons.some((r) => r.includes("already at Familiar"))).toBe(true);
  });

  it("honours the user's chosen current focus", () => {
    const rec = recommendNext(
      computeRoadmap(role, { "programming-language": 3 }, {}, { started: ["git-basics"], current: "git-basics" }),
    )!;
    expect(rec.node.skill.id).toBe("git-basics");
    expect(rec.reasons[0]).toContain("current focus");
  });

  it("recommends nothing when every skill meets its requirement", () => {
    const roadmap = computeRoadmap(role, allAt((r) => r), {});
    expect(roadmap.counts.completed).toBe(skills.length);
    expect(recommendNext(roadmap)).toBeNull();
  });

  it("counts completed and remaining from the same skill levels the assessment saves", () => {
    const roadmap = computeRoadmap(role, { "programming-language": 3, "git-basics": 2, "apis-http": 1 }, {});
    expect(roadmap.counts.completed).toBe(2); // language (needs Mastered) and git (needs Comfortable) meet the bar
    expect(roadmap.counts.atMastered).toBe(1);
    expect(roadmap.counts.inProgress).toBe(1); // HTTP at Familiar, needs Comfortable
    expect(roadmap.counts.completed + roadmap.counts.inProgress + roadmap.counts.notStarted).toBe(skills.length);
  });
});
