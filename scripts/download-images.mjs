// Downloads photos into /public/images.
// Only fetches missing files so existing images are not overwritten.
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images")
const Q = "?auto=format&fit=crop"
const U = (id, w, q) => `https://images.unsplash.com/photo-${id}${Q}&w=${w}&q=${q}`

const FILES = {
  // Existing Section Assets
  "hero-bg.jpg": U("1451187580459-43490279c0fa", 1800, 85),
  "section-approach.jpg": U("1560253023-3ec5d502959f", 1100, 85),
  "section-mission.jpg": U("1497366754035-f200968a6e72", 1100, 80),

  // Services Images (Dedicated & Topic-Matched)
  "service-cyber-security.jpg": U("1563013544-824ae1b704d3", 900, 80),      // Digital lock on laptop keyboard
  "service-data-privacy.jpg": U("1558494949-ef010cbdcc31", 900, 80),        // Secure server data center
  "service-threat-management.jpg": U("1550751827-4bd374c3f58b", 900, 80),   // Matrix threat code monitoring
  "service-red-teaming.jpg": U("1510511459019-5dda7724fd87", 900, 80),       // Ethical hacking dark terminal
  "service-cloud-security.jpg": U("1544197150-b99a580bb7a8", 900, 80),      // High-speed cloud server hardware
  "service-managed-soc.jpg": U("1526374965328-7f61d4dc18c5", 900, 80),       // Cybersecurity control center

  // Insights Images (Dedicated & Topic-Matched)
  "insight-managed-it-security.jpg": U("1563013544-824ae1b704d3", 1000, 80), // Managed security infrastructure
  "insight-cloud-security.jpg": U("1451187580459-43490279c0fa", 1000, 80),   // Global network & cloud data
  "insight-red-teaming.jpg": U("1510511459019-5dda7724fd87", 1000, 80),      // Red team offensive simulation
  "insight-zero-trust.jpg": U("1563986768609-322da13575f3", 1000, 80),       // Biometric lock & zero-trust identity
  "insight-cyber-culture.jpg": U("1522071820081-009f0129c71c", 1000, 80),    // Corporate team security training
  "insight-compliance-governance.jpg": U("1450133064473-71024230f91b", 1000, 80), // Legal security compliance audit
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