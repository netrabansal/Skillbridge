import { describe, expect, it } from "vitest";
import { roles, roleSkills } from "@/data/roles";
import type { Level } from "@/lib/assessment";
import { computeRoadmap } from "@/lib/roadmap";

/** A deterministic spread of levels so every status appears. */
const levelFor = (i: number) => ([0, 1, 2, 3, 0, 2, 1] as Level[])[i % 7];

describe.each(roles.map((r) => [r.title, r] as const))("%s roadmap", (_, role) => {
  const skills = roleSkills(role);
  const ids = new Set(skills.map((s) => s.id));
  const ratings = Object.fromEntries(skills.map((s, i) => [s.id, levelFor(i)]));
  const roadmap = computeRoadmap(role, ratings, {});

  it("has unique skill ids and prerequisites that belong to the same role, with no cycles", () => {
    expect(ids.size).toBe(skills.length);
    for (const s of skills) for (const p of s.requires) expect(ids.has(p), `${s.id} requires unknown ${p}`).toBe(true);
    // computeRoadmap assigns a finite depth to every node only if the graph is acyclic.
    for (const n of roadmap.nodes) expect(Number.isFinite(n.depth)).toBe(true);
  });

  it("covers every skill once", () => {
    expect(roadmap.nodes.map((n) => n.skill.id).sort()).toEqual([...ids].sort());
    expect(roadmap.counts.total).toBe(skills.length);
    expect(roadmap.plan.length + roadmap.completed.length).toBe(skills.length);
  });

  it("marks a skill completed when it meets the required level, and Mastered always counts as completed", () => {
    for (const n of roadmap.nodes) {
      const expected = n.level === 3 || n.level >= n.required ? "completed" : n.level > 0 ? "in-progress" : "not-started";
      expect(n.status, n.skill.id).toBe(expected);
    }
  });

  it("calculates progress as earned levels over required levels, and counts that add up", () => {
    const required = skills.reduce((t, s) => t + roadmap.byId.get(s.id)!.required, 0);
    const earned = skills.reduce((t, s) => t + Math.min(ratings[s.id], roadmap.byId.get(s.id)!.required), 0);
    expect(roadmap.progress).toEqual({ earned, required, percent: Math.round((100 * earned) / required) });
    const { completed, inProgress, notStarted, total } = roadmap.counts;
    expect(completed + inProgress + notStarted).toBe(total);
    expect(completed).toBe(roadmap.completed.length);
  });

  it("orders the plan so prerequisites still to learn come before the skills they unlock", () => {
    const position = new Map(roadmap.plan.map((n, i) => [n.skill.id, i]));
    for (const n of roadmap.plan) {
      for (const p of n.prerequisites) {
        if (position.has(p)) expect(position.get(p)!, `${p} before ${n.skill.id}`).toBeLessThan(position.get(n.skill.id)!);
      }
      expect(n.ready).toBe(n.prerequisites.every((p) => roadmap.byId.get(p)!.status === "completed"));
    }
  });

  it("is 0% for a new learner and 100% when every requirement is met", () => {
    expect(computeRoadmap(role, {}, {}).progress.percent).toBe(0);
    const done = computeRoadmap(role, Object.fromEntries(skills.map((s) => [s.id, 3 as Level])), {});
    expect(done.progress.percent).toBe(100);
    expect(done.plan).toHaveLength(0);
    expect(done.focus).toBeNull();
  });
});
