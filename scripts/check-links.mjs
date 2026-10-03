#!/usr/bin/env node
/**
 * Checks every learning-resource URL in src/data/learning/*.ts and writes the results to
 * src/data/learning/link-status.json. The app only labels a resource as checked if it passed here.
 *
 * Some sites (W3C, Cloudflare, …) block automated requests. Those can be opened in a real browser and recorded
 * in src/data/learning/browser-checks.json as { "url": "YYYY-MM-DD" }; they're then reported as browser-checked.
 *
 *   npm run check-links
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../src/data/learning/", import.meta.url).pathname;
const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
const urls = new Set();
for (const f of files) {
  for (const m of readFileSync(join(dir, f), "utf8").matchAll(/"(https:\/\/[^"\s]+)"/g)) urls.add(m[1]);
}

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function check(url) {
  let result;
  for (let attempt = 0; attempt < 3; attempt++) {
    result = await checkOnce(url);
    // Retry transient failures (timeouts, rate limits, server errors) with a growing delay.
    if (result.ok || ![0, 429, 500, 502, 503, 504].includes(result.status)) return result;
    await sleep(3000 * (attempt + 1));
  }
  return result;
}

async function checkOnce(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,*/*" },
        signal: AbortSignal.timeout(20000),
      });
      if (res.ok) return { ok: true, status: res.status, finalUrl: res.url };
      if (method === "GET") return { ok: false, status: res.status, finalUrl: res.url };
    } catch (e) {
      if (method === "GET") return { ok: false, status: 0, error: String(e.cause?.code ?? e.name) };
    }
  }
}

const list = [...urls].sort();
const results = {};
let i = 0;
async function worker() {
  while (i < list.length) {
    const url = list[i++];
    results[url] = await check(url);
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

const today = new Date().toISOString().slice(0, 10);
const browserChecks = JSON.parse(readFileSync(join(dir, "browser-checks.json"), "utf8"));
const sorted = Object.fromEntries(
  Object.keys(results)
    .sort()
    .map((k) => {
      const r = results[k];
      if (r.ok) return [k, { ok: true, status: r.status, method: "automated", on: today }];
      if (browserChecks[k]) return [k, { ok: true, status: r.status, method: "browser", on: browserChecks[k] }];
      return [k, { ok: false, status: r.status }];
    }),
);
writeFileSync(join(dir, "link-status.json"), JSON.stringify({ checkedAt: today, results: sorted }, null, 2) + "\n");

const auto = list.filter((u) => results[u].ok).length;
const viaBrowser = list.filter((u) => !results[u].ok && browserChecks[u]);
const failed = list.filter((u) => !results[u].ok && !browserChecks[u]);
console.log(`Checked ${list.length} links: ${auto} passed automatically, ${viaBrowser.length} blocked but browser-checked, ${failed.length} unverified`);
for (const u of failed) console.log(`  ${results[u].status || results[u].error}  ${u}`);
process.exitCode = failed.length ? 1 : 0;
