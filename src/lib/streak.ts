/**
 * Learning streaks, computed from the calendar days (in the user's local time zone) on which they recorded
 * learning: completing a topic, finishing a project or taking a knowledge check. Nothing is estimated.
 *
 * The current streak counts consecutive days ending today, or ending yesterday if they haven't learned yet today
 * (the streak is still alive until today ends).
 */

/** Local calendar day as YYYY-MM-DD. */
export function localDay(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Shift a YYYY-MM-DD day by whole calendar days (safe across DST and month/year boundaries). */
export function addDays(day: string, delta: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return localDay(new Date(y, m - 1, d + delta));
}

export type Streak = {
  current: number;
  longest: number;
  activeToday: boolean;
  lastDay: string | null;
  totalDays: number;
  /** The last `window` days, oldest first, for an activity strip. */
  recent: { day: string; active: boolean }[];
};

export function computeStreak(days: Iterable<string>, today: string = localDay(), window = 14): Streak {
  const set = new Set(days);
  const sorted = [...set].sort();

  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of sorted) {
    run = prev && addDays(prev, 1) === day ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = day;
  }

  const activeToday = set.has(today);
  let cursor = activeToday ? today : addDays(today, -1);
  let current = 0;
  while (set.has(cursor)) {
    current++;
    cursor = addDays(cursor, -1);
  }

  const recent = Array.from({ length: window }, (_, i) => {
    const day = addDays(today, i - (window - 1));
    return { day, active: set.has(day) };
  });

  return { current, longest, activeToday, lastDay: sorted.at(-1) ?? null, totalDays: set.size, recent };
}
