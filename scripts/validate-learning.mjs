#!/usr/bin/env node
// Validates learning content: every role skill has a lesson and a reason, lessons are complete, quizzes are well-formed.
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = new URL("../src/data/", import.meta.url).pathname;
const tmp = mkdtempSync(join(tmpdir(), "sb-learn-"));
// Copy TS sources to .mts with explicit extensions so Node can strip types and import them directly.
const copy = (from, to) => {
  let src = readFileSync(from, "utf8").replace(/from "\.\/([\w-]+)"/g, 'from "./$1.mts"');
  src = src.replace(/import linkStatus from "\.\/link-status\.json";/, "const linkStatus = { checkedAt: '', results: {} };");
  writeFileSync(to, src);
};
for (const f of readdirSync(join(root, "learning"))) if (f.endsWith(".ts")) copy(join(root, "learning", f), join(tmp, f.replace(/\.ts$/, ".mts")));
copy(join(root, "skills.ts"), join(tmp, "skills.mts"));

const { lessons, getSkillLearning } = await import(join(tmp, "index.mts"));
const { learningMap } = await import(join(tmp, "map.mts"));
const { frameworks } = await import(join(tmp, "skills.mts"));

const problems = [];
const used = new Set();
for (const [role, f] of Object.entries(frameworks)) {
  for (const skill of f.categories.flatMap((c) => c.skills)) {
    const sl = getSkillLearning(role, skill.id);
    if (!sl) problems.push(`${role}/${skill.id}: no lesson (map entry: ${JSON.stringify(learningMap[role]?.[skill.id]?.[0])})`);
    else used.add(sl.lesson.id);
  }
  for (const id of Object.keys(learningMap[role] ?? {})) {
    if (!f.categories.some((c) => c.skills.some((s) => s.id === id))) problems.push(`${role}: map has unknown skill ${id}`);
  }
}
for (const [id, l] of Object.entries(lessons)) {
  if (l.topics.length < 4) problems.push(`${id}: only ${l.topics.length} topics`);
  if (l.resources.length < 3) problems.push(`${id}: only ${l.resources.length} resources`);
  if (l.projects.length < 2) problems.push(`${id}: only ${l.projects.length} projects`);
  if (l.quiz.length < 3) problems.push(`${id}: only ${l.quiz.length} quiz questions`);
  for (const q of l.quiz) if (!(q.answer >= 0 && q.answer < q.options.length)) problems.push(`${id}: bad answer index in "${q.question}"`);
  const ids = [...l.topics.map((t) => t.id), ...l.projects.map((p) => p.id)];
  if (new Set(ids).size !== ids.length) problems.push(`${id}: duplicate topic/project ids`);
  if (!used.has(id)) problems.push(`${id}: lesson not used by any role`);
}
const skillCount = Object.values(frameworks).reduce((n, f) => n + f.categories.flatMap((c) => c.skills).length, 0);
console.log(`${Object.keys(lessons).length} lessons, ${skillCount} role skills, ${Object.values(lessons).reduce((n, l) => n + l.quiz.length, 0)} quiz questions`);
if (problems.length) {
  console.log(problems.join("\n"));
  process.exitCode = 1;
} else console.log("ALL OK");
