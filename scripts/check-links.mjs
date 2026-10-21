// Usage: npm run check:links   (needs Node 18+ and internet)
// Checks every resource URL in src/data/roadmap.json and prints the ones that fail.
import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("src/data/roadmap.json", "utf8"));
const urls = new Map(); // url -> where it is used

for (const s of data.sectors) {
  for (const r of s.resources ?? []) urls.set(r.url, `${s.slug} > resources`);
  for (const st of s.steps ?? [])
    for (const r of st.resources ?? []) urls.set(r.url, `${s.slug} > ${st.title}`);
}

const headers = { "user-agent": "Mozilla/5.0 (link-checker)" };
async function check(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, { method, headers, redirect: "follow", signal: AbortSignal.timeout(20000) });
      if (res.ok) return { ok: true, status: res.status };
      // Some sites block bots (403/429). Mark as "maybe" so you can open them by hand.
      if (method === "GET") return { ok: false, status: res.status, soft: [401, 403, 429].includes(res.status) };
    } catch (e) {
      if (method === "GET") return { ok: false, status: String(e.cause?.code ?? e.name) };
    }
  }
}

const list = [...urls.entries()];
const bad = [];
const queue = [...list];
await Promise.all(
  Array.from({ length: 10 }, async () => {
    while (queue.length) {
      const [url, where] = queue.shift();
      const r = await check(url);
      if (!r.ok) bad.push({ url, where, ...r });
    }
  })
);

console.log(`Checked ${list.length} links.`);
if (!bad.length) console.log("All links work ✅");
for (const b of bad)
  console.log(`${b.soft ? "⚠️  maybe blocked" : "❌ broken"} [${b.status}] ${b.url}\n     used in: ${b.where}`);
process.exitCode = bad.some((b) => !b.soft) ? 1 : 0;
