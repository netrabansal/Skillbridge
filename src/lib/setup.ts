/**
 * The career setup a visitor completes in /start. Persisted through the app store (lib/store.ts).
 */
export type CareerSetup = {
  roleSlug: string;
  experience: ExperienceLevel;
  hoursPerWeek: HoursPerWeek;
  timeline: Timeline;
  savedAt: string;
};

export const experienceOptions = [
  { value: "new", label: "Completely new to tech", hint: "Starting from zero, and that's fine", factor: 1 },
  { value: "basics", label: "Some self-taught basics", hint: "Tutorials, a course or small projects", factor: 0.8 },
  { value: "student", label: "Studying a related subject", hint: "Computer science, math, engineering or similar", factor: 0.7 },
  { value: "switching", label: "Already in tech, switching roles", hint: "Working in a different technical role", factor: 0.6 },
] as const;

export const hoursOptions = [
  { value: "3", label: "Up to 5 hours", hint: "Around evenings or weekends", hours: 3.5 },
  { value: "8", label: "5–10 hours", hint: "A steady side commitment", hours: 7.5 },
  { value: "15", label: "10–20 hours", hint: "Serious part-time study", hours: 15 },
  { value: "25", label: "20+ hours", hint: "Close to full time", hours: 25 },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "6m", label: "Within 6 months" },
  { value: "12m", label: "Within a year" },
  { value: "flexible", label: "No fixed deadline" },
] as const;

export type ExperienceLevel = (typeof experienceOptions)[number]["value"];
export type HoursPerWeek = (typeof hoursOptions)[number]["value"];
export type Timeline = (typeof timelineOptions)[number]["value"];

export const optionLabel = {
  experience: (v: ExperienceLevel) => experienceOptions.find((o) => o.value === v)?.label ?? v,
  hours: (v: HoursPerWeek) => hoursOptions.find((o) => o.value === v)?.label ?? v,
  timeline: (v: Timeline) => timelineOptions.find((o) => o.value === v)?.label ?? v,
};

/** Rough months to entry level. Deliberately a range: it's refined once skills are assessed. */
export function estimateMonths(typicalHours: number, experience: ExperienceLevel, hoursPerWeek: HoursPerWeek) {
  const factor = experienceOptions.find((o) => o.value === experience)?.factor ?? 1;
  const weekly = hoursOptions.find((o) => o.value === hoursPerWeek)?.hours ?? 7.5;
  const months = (typicalHours * factor) / (weekly * 4.33);
  return { low: Math.max(1, Math.round(months * 0.85)), high: Math.max(2, Math.round(months * 1.15)) };
}
