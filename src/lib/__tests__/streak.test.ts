import { describe, expect, it } from "vitest";
import { addDays, computeStreak, localDay } from "@/lib/streak";

describe("addDays", () => {
  it("crosses month, year and leap-day boundaries", () => {
    expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
    expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
    expect(addDays("2026-03-29", 1)).toBe("2026-03-30"); // around European DST change
    expect(addDays("2026-11-01", 1)).toBe("2026-11-02"); // around US DST change
  });

  it("formats local days", () => {
    expect(localDay(new Date(2026, 9, 2, 23, 59))).toBe("2026-10-02");
  });
});

describe("computeStreak", () => {
  const today = "2026-10-02";

  it("is zero with no learning", () => {
    const s = computeStreak([], today);
    expect(s).toMatchObject({ current: 0, longest: 0, activeToday: false, lastDay: null, totalDays: 0 });
    expect(s.recent).toHaveLength(14);
    expect(s.recent.every((d) => !d.active)).toBe(true);
    expect(s.recent.at(-1)!.day).toBe(today);
  });

  it("counts consecutive days ending today", () => {
    expect(computeStreak(["2026-09-30", "2026-10-01", "2026-10-02"], today)).toMatchObject({ current: 3, activeToday: true });
  });

  it("keeps the streak alive until today ends", () => {
    expect(computeStreak(["2026-09-30", "2026-10-01"], today)).toMatchObject({ current: 2, activeToday: false });
  });

  it("resets after a missed day", () => {
    expect(computeStreak(["2026-09-28", "2026-09-29", "2026-09-30"], today).current).toBe(0);
  });

  it("tracks the longest streak separately and ignores duplicates and order", () => {
    const s = computeStreak(["2026-10-02", "2026-09-10", "2026-09-11", "2026-09-12", "2026-09-12", "2026-09-13", "2026-10-01"], today);
    expect(s.current).toBe(2);
    expect(s.longest).toBe(4);
    expect(s.totalDays).toBe(6);
    expect(s.lastDay).toBe("2026-10-02");
  });

  it("marks active days in the recent window", () => {
    const s = computeStreak(["2026-09-19", "2026-10-02", "2026-09-01"], today);
    expect(s.recent[0].day).toBe("2026-09-19");
    expect(s.recent.filter((d) => d.active).map((d) => d.day)).toEqual(["2026-09-19", "2026-10-02"]);
  });

  it("counts a streak across a month boundary", () => {
    expect(computeStreak(["2026-09-29", "2026-09-30", "2026-10-01"], "2026-10-01").current).toBe(3);
  });
});
