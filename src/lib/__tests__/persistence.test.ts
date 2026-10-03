import { describe, expect, it } from "vitest";
import { roles } from "@/data/roles";
import { createBackup, emptyState, learningDaysWithout, loadState, normalizeState, readBackup, SCHEMA_VERSION } from "@/lib/persistence";
import { careerSummaries, roadmapFor } from "@/lib/progress";
import type { AppState } from "@/lib/store";

const at = "2026-10-01T09:00:00.000Z";
const later = "2026-10-02T09:00:00.000Z";

const cloud = roles.find((r) => r.slug === "cloud-engineer")!;
const frontend = roles.find((r) => r.slug === "frontend-developer")!;
const skillIds = (slug: string) => roles.find((r) => r.slug === slug)!.categories.flatMap((c) => c.skills.map((s) => s.id));

function sampleState(): AppState {
  return {
    version: SCHEMA_VERSION,
    setup: { roleSlug: "cloud-engineer", experience: "basics", hoursPerWeek: "8", timeline: "12m", savedAt: at },
    assessments: {
      "cloud-engineer": { ratings: { "foundations-linux": 3, "networking-vpc": 1 }, quiz: {}, updatedAt: at },
      "frontend-developer": { ratings: { "html-semantic": 2 }, quiz: {}, updatedAt: at },
    },
    roadmaps: { "cloud-engineer": { generatedAt: at }, "frontend-developer": { generatedAt: later } },
    learning: {
      "cloud-engineer": {
        started: ["networking-vpc"],
        current: "networking-vpc",
        skills: {
          "networking-vpc": {
            topics: ["vpcs-and-cidr-planning"],
            projects: [],
            quiz: { best: 4, total: 5, last: 4, attempts: 1, lastAt: at, history: [{ score: 4, total: 5, at }] },
            updatedAt: at,
          },
        },
      },
    },
    activity: [
      { id: "a1", at, roleSlug: "cloud-engineer", skillId: "networking-vpc", skillName: "Virtual networks", kind: "topic", title: "VPCs and CIDR planning" },
    ],
    learningDays: ["2026-10-01"],
  };
}

describe("normalizeState", () => {
  it("returns null for values that aren't SkillBridge data", () => {
    expect(normalizeState(null)).toBeNull();
    expect(normalizeState("text")).toBeNull();
    expect(normalizeState([1, 2])).toBeNull();
  });

  it("keeps valid data unchanged", () => {
    const s = sampleState();
    expect(normalizeState(JSON.parse(JSON.stringify(s)))).toEqual(s);
  });

  it("drops unknown roles, unknown skills and invalid levels", () => {
    const s = sampleState() as unknown as Record<string, Record<string, unknown>>;
    (s.assessments["cloud-engineer"] as { ratings: Record<string, unknown> }).ratings = {
      "foundations-linux": 2,
      "not-a-skill": 3,
      "networking-vpc": 7,
      "platform-compute": "2",
      "html-semantic": 1, // a Frontend skill, not a Cloud one
    };
    s.assessments["made-up-role"] = { ratings: {}, quiz: {}, updatedAt: at };
    s.roadmaps["made-up-role"] = { generatedAt: at };
    s.roadmaps["frontend-developer"] = { generatedAt: "not a date" };
    const n = normalizeState(s)!;
    expect(n.assessments["cloud-engineer"].ratings).toEqual({ "foundations-linux": 2 });
    expect(Object.keys(n.assessments).sort()).toEqual(["cloud-engineer", "frontend-developer"]);
    expect(Object.keys(n.roadmaps)).toEqual(["cloud-engineer"]);
  });

  it("clears a setup whose role doesn't exist and fills invalid options with defaults", () => {
    expect(normalizeState({ setup: { roleSlug: "astronaut" } })!.setup).toBeNull();
    const setup = normalizeState({ setup: { roleSlug: "cloud-engineer", experience: "wizard" } })!.setup!;
    expect(setup.roleSlug).toBe("cloud-engineer");
    expect(setup.experience).toBe("new");
  });

  it("caps a quiz's best score at its total and drops malformed activity", () => {
    const s = sampleState();
    s.learning["cloud-engineer"].skills!["networking-vpc"].quiz!.best = 9;
    (s.activity as unknown[]).push({ id: "bad", at: "yesterday", kind: "topic" }, { id: "x", at, roleSlug: "cloud-engineer", skillId: "a", skillName: "A", kind: "hack" });
    const n = normalizeState(s)!;
    expect(n.learning["cloud-engineer"].skills!["networking-vpc"].quiz!.best).toBe(5);
    expect(n.activity).toHaveLength(1);
  });

  it("back-fills learning days from recorded quiz attempts only when none were saved", () => {
    const s = sampleState() as Partial<AppState>;
    delete s.learningDays;
    expect(normalizeState(s)!.learningDays).toEqual(["2026-10-01"]);
    expect(normalizeState({ ...sampleState(), learningDays: [] })!.learningDays).toEqual([]);
  });
});

describe("loadState", () => {
  it("starts empty when nothing is saved", () => {
    expect(loadState(null)).toEqual({ state: emptyState, problem: null });
  });

  it("reports unreadable data instead of throwing", () => {
    expect(loadState("{oops").problem).toBe("unreadable");
    expect(loadState("42").problem).toBe("unreadable");
  });

  it("loads valid saved data", () => {
    const s = sampleState();
    expect(loadState(JSON.stringify(s))).toEqual({ state: s, problem: null });
  });
});

describe("backups", () => {
  it("round-trips through createBackup and readBackup", () => {
    const s = sampleState();
    const result = readBackup(createBackup(s));
    expect(result).toEqual({ ok: true, state: s });
  });

  it("rejects files that aren't valid SkillBridge backups", () => {
    expect(readBackup("not json")).toEqual({ ok: false, error: "That file isn't valid JSON." });
    expect(readBackup(JSON.stringify({ hello: 1 })).ok).toBe(false);
    expect(readBackup(JSON.stringify({ app: "other", data: {} })).ok).toBe(false);
    expect(readBackup(JSON.stringify({ app: "skillbridge", data: "x" })).ok).toBe(false);
  });

  it("rejects backups from a newer schema", () => {
    const text = JSON.stringify({ app: "skillbridge", schemaVersion: SCHEMA_VERSION + 1, data: sampleState() });
    expect(readBackup(text)).toEqual({ ok: false, error: "That backup comes from a newer version of SkillBridge." });
  });
});

describe("learningDaysWithout", () => {
  it("drops days recorded only by the deleted career", () => {
    expect(learningDaysWithout(sampleState(), "cloud-engineer")).toEqual([]);
  });

  it("keeps days another career also recorded", () => {
    const s = sampleState();
    s.activity.push({ id: "a2", at, roleSlug: "frontend-developer", skillId: "html-semantic", skillName: "Semantic HTML", kind: "topic", title: "Landmarks" });
    expect(learningDaysWithout(s, "cloud-engineer")).toEqual(["2026-10-01"]);
  });

  it("keeps older days with no surviving record either way", () => {
    const s = { ...sampleState(), learningDays: ["2026-09-01", "2026-10-01"] };
    expect(learningDaysWithout(s, "cloud-engineer")).toEqual(["2026-09-01"]);
  });
});

describe("careerSummaries", () => {
  it("lists every career with saved progress, active goal first, without mixing their data", () => {
    const s = sampleState();
    const list = careerSummaries(s, roles);
    expect(list.map((c) => c.role.slug)).toEqual(["cloud-engineer", "frontend-developer"]);
    expect(list[0].isActive).toBe(true);
    expect(list[0].total).toBe(skillIds("cloud-engineer").length);
    expect(list[1].total).toBe(skillIds("frontend-developer").length);
    // The same calculation the roadmap and dashboard use.
    expect(list[0].percent).toBe(roadmapFor(s, cloud).progress.percent);
    expect(list[1].percent).toBe(roadmapFor(s, frontend).progress.percent);
    expect(list[1].rated).toBe(1);
  });

  it("omits careers with nothing saved", () => {
    const list = careerSummaries({ ...emptyState, setup: sampleState().setup }, roles);
    expect(list.map((c) => c.role.slug)).toEqual(["cloud-engineer"]);
  });
});
