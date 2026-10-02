/**
 * The random template: a landing page rolled from a seed.
 *
 * A template has three facets — palette, layout and copy — each with its own
 * seed, so one can be re-rolled while the others are locked. The same three
 * seeds always produce the same page, which is what makes a roll shareable.
 */
import type { SpriteName } from "@/components/pixel/sprites"
import { newSeed, rng } from "@/lib/rng"

export type Palette = {
  name: string
  bg: string
  surface: string
  fg: string
  accent: string
  accentHi: string
  sky: [string, string, string, string, string]
}

export const PALETTES: Palette[] = [
  { name: "Dusk", bg: "#0a0a0c", surface: "#111114", fg: "#ffffff", accent: "#8b5cf6", accentHi: "#b79cff", sky: ["#0c1060", "#1d2190", "#5b3fb8", "#c76fae", "#f6b98f"] },
  { name: "Lava", bg: "#120707", surface: "#1d0d0d", fg: "#fff4ec", accent: "#ff5c2b", accentHi: "#ffa36b", sky: ["#2a0606", "#6b0f0f", "#b3261e", "#ff6a3d", "#ffd27a"] },
  { name: "Mint", bg: "#04100d", surface: "#0a1b16", fg: "#eafff6", accent: "#2bd9a0", accentHi: "#8bf5cf", sky: ["#04201c", "#0a4a40", "#139a80", "#6fe3b8", "#e4ffd1"] },
  { name: "Arcade", bg: "#05051a", surface: "#0b0b2a", fg: "#f4f4ff", accent: "#27e1ff", accentHi: "#ffe14d", sky: ["#070726", "#12126b", "#2a1fb0", "#ff4fc8", "#ffe14d"] },
  { name: "Candy", bg: "#12081c", surface: "#1c0e2b", fg: "#fff0fb", accent: "#ff6ec7", accentHi: "#7dffd9", sky: ["#2a1250", "#5a2a9a", "#b04fd6", "#ff8fd1", "#ffe0f4"] },
  { name: "Ice", bg: "#06101a", surface: "#0c1b2a", fg: "#f0fbff", accent: "#4db8ff", accentHi: "#b8ecff", sky: ["#081c3a", "#124f8c", "#3a8fd6", "#9ad8f5", "#f2fdff"] },
  { name: "Handheld", bg: "#0f1a0f", surface: "#172617", fg: "#e2f5c8", accent: "#8bc34a", accentHi: "#d4f08c", sky: ["#0f2a14", "#1f5a24", "#4a9a3a", "#9ad25a", "#e2f5c8"] },
  { name: "Sunset", bg: "#150a12", surface: "#21101c", fg: "#fff5ea", accent: "#ff8a3d", accentHi: "#ffd36b", sky: ["#2a0f3a", "#7a1f7a", "#d6427a", "#ff8a4d", "#ffd98a"] },
]

export type SectionKind = "features" | "stats" | "quote" | "pricing" | "faq" | "cta"
export type HeroLayout = "split" | "center" | "stacked"
export type HeadingFace = "sans" | "display" | "mono"

export type Spec = {
  seeds: { palette: string; layout: string; copy: string }
  palette: Palette
  layout: HeroLayout
  face: HeadingFace
  sections: SectionKind[]
  name: string
  tagline: string
  sub: string
  cta: string
  features: { sprite: SpriteName; title: string; body: string }[]
  stats: { value: string; label: string }[]
  quote: { text: string; name: string }
  plans: { name: string; price: string }[]
  faqs: string[]
}

const ADJECTIVES = ["Voxel", "Turbo", "Neon", "Pocket", "Retro", "Glitch", "Sprite", "Crystal", "Cosmic", "Lucky"]
const NOUNS = ["Vault", "Keep", "Gate", "Guard", "Shield", "Fort", "Watch", "Lock", "Harbor", "Beacon"]
const VERBS = ["Guard", "Shield", "Track", "Defend", "Watch", "Secure", "Map", "Protect"]
const OBJECTS = ["every request", "every device", "your whole team", "every tab", "all your data", "each login", "every download"]
const SPICES = ["before it loads", "without the lag", "in one click", "while you sleep", "level by level", "at the speed of play", "from the first byte"]
const SUBS = [
  "Checks run on the device, so nothing takes a detour and nobody feels a delay.",
  "One quiet agent, one clear dashboard, and an undo for every change you make.",
  "Set a rule once and watch it land on every machine before you finish your coffee.",
  "Built for teams who would rather ship than babysit a firewall.",
]
const CTAS = ["Start free", "Press start", "Join the run", "Try it now", "Insert coin"]
const FEATURE_POOL: { sprite: SpriteName; title: string; body: string }[] = [
  { sprite: "shield", title: "Always-on shield", body: "Phishing and malware caught at the first packet." },
  { sprite: "eye", title: "Sharp-eyed radar", body: "Spot unknown apps the moment someone opens them." },
  { sprite: "bolt", title: "Instant rules", body: "Save once and every device updates in under a second." },
  { sprite: "lock", title: "Locked-down data", body: "Secrets are masked before they leave the laptop." },
  { sprite: "chip", title: "AI on guard", body: "Prompts and files checked on the way to any model." },
  { sprite: "globe", title: "Works anywhere", body: "Same protection at home, in a café or on a plane." },
  { sprite: "key", title: "Single sign-on", body: "Roll out to the whole company with the login you have." },
  { sprite: "coin", title: "Fair prices", body: "Pay per seat, and only for the seats you use." },
]
const FAQ_POOL = ["Does it slow browsing down?", "Do we still need a VPN?", "Where is our data stored?", "How fast is rollout?", "Can we undo a rule?", "What does support look like?"]
const QUOTES = [
  "We forgot it was running, which is exactly the point.",
  "Rollout took an afternoon. The alerts got quieter the same day.",
  "It found tools we had never heard of and let us decide, calmly.",
  "The undo button alone is worth the seat price.",
]
const PEOPLE = ["Ada R.", "Linus K.", "Grace H.", "Alan T.", "Mei T.", "Priya N."]
const SECTION_POOL: SectionKind[] = ["features", "stats", "quote", "pricing", "faq"]

export function newSeeds() {
  return { palette: newSeed(), layout: newSeed(), copy: newSeed() }
}

export function seedsToParam(seeds: Spec["seeds"]) {
  return `${seeds.palette}.${seeds.layout}.${seeds.copy}`
}

export function paramToSeeds(param: string | null): Spec["seeds"] | null {
  if (!param) return null
  const [palette, layout, copy] = param.split(".")
  return palette && layout && copy ? { palette, layout, copy } : null
}

export function generate(seeds: Spec["seeds"]): Spec {
  const p = rng(seeds.palette)
  const l = rng(seeds.layout)
  const c = rng(seeds.copy)
  const palette = p.pick(PALETTES)
  const picked = l.shuffle(SECTION_POOL).slice(0, l.int(3, 4))
  return {
    seeds,
    palette,
    layout: l.pick(["split", "center", "stacked"] as const),
    face: l.pick(["sans", "display", "mono"] as const),
    sections: [...picked, "cta"],
    name: `${c.pick(ADJECTIVES)}${c.pick(NOUNS)}`,
    tagline: `${c.pick(VERBS)} ${c.pick(OBJECTS)} ${c.pick(SPICES)}.`,
    sub: c.pick(SUBS),
    cta: c.pick(CTAS),
    features: c.shuffle(FEATURE_POOL).slice(0, 3),
    stats: [
      { value: `${c.int(97, 99)}.${c.int(10, 99)}%`, label: "Uptime" },
      { value: `${c.int(2, 9)}ms`, label: "Added latency" },
      { value: `${c.int(2, 40) * 500}`, label: "Teams" },
    ],
    quote: { text: c.pick(QUOTES), name: c.pick(PEOPLE) },
    plans: [
      { name: "Solo", price: "$0" },
      { name: "Team", price: `$${c.int(6, 18)}` },
    ],
    faqs: c.shuffle(FAQ_POOL).slice(0, 3),
  }
}

/** The token overrides a palette stands for — what "apply to this site" writes. */
export function paletteVars(pal: Palette): Record<string, string> {
  const mix = (a: string, b: string, pct: number) => `color-mix(in oklab, ${a} ${pct}%, ${b})`
  return {
    "--color-bg": pal.bg,
    "--color-surface": pal.surface,
    "--color-surface-2": mix(pal.fg, pal.surface, 8),
    "--color-surface-3": mix(pal.fg, pal.surface, 15),
    "--color-fg": pal.fg,
    "--color-fg-muted": mix(pal.fg, pal.bg, 62),
    "--color-fg-subtle": mix(pal.fg, pal.bg, 36),
    "--color-line": mix(pal.fg, pal.bg, 18),
    "--color-line-strong": mix(pal.fg, pal.bg, 32),
    "--color-accent": pal.accent,
    "--color-accent-hi": pal.accentHi,
    "--color-sky-1": pal.sky[0],
    "--color-sky-2": pal.sky[1],
    "--color-sky-3": pal.sky[2],
    "--color-sky-4": pal.sky[3],
    "--color-sky-5": pal.sky[4],
    "--color-cloud": pal.sky[4],
  }
}
