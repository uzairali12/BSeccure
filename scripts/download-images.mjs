// Downloads the original photos used by the v2 design into /public/images.
// Only fetches files that are MISSING, so any image you replace yourself is never overwritten.
// Runs automatically before `npm run dev` and `npm run build` (also on Vercel). It never fails the build.
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images")
const Q = "?auto=format&fit=crop"
const U = (id, w, q) => `https://images.unsplash.com/photo-${id}${Q}&w=${w}&q=${q}`
const FILES = {
  "hero-bg.jpg": U("1451187580459-43490279c0fa", 1800, 85),
  "section-approach.jpg": U("1560253023-3ec5d502959f", 1100, 85),
  "section-mission.jpg": U("1497366754035-f200968a6e72", 1100, 80),
  "service-cyber-security.jpg": U("1563013544-824ae1b704d3", 900, 80),
  "service-data-privacy.jpg": U("1558494949-ef010cbdcc31", 900, 80),
  "service-threat-management.jpg": U("1550751827-4bd374c3f58b", 900, 80),
  "service-red-teaming.jpg": U("1510511459019-5dda7724fd87", 900, 80),
  "insight-managed-it-security.jpg": U("1563013544-824ae1b704d3", 1000, 80),
  "insight-cloud-security.jpg": U("1451187580459-43490279c0fa", 1000, 80),
  "insight-red-teaming.jpg": U("1510511459019-5dda7724fd87", 1000, 80),
}

mkdirSync(dir, { recursive: true })
let got = 0, failed = []
for (const [name, url] of Object.entries(FILES)) {
  const out = join(dir, name)
  if (existsSync(out)) continue
  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    writeFileSync(out, Buffer.from(await r.arrayBuffer()))
    got++
    console.log(`downloaded ${name}`)
  } catch (e) {
    failed.push(name)
    console.warn(`could not download ${name}: ${e.message}`)
  }
}
if (got) console.log(`Images ready (${got} downloaded). Commit public/images to GitHub.`)
if (failed.length) console.warn(`Missing: ${failed.join(", ")} - add them manually to public/images/`)
