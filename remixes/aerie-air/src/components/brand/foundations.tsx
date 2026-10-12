import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Car,
  Check,
  Eye,
  Luggage,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Users,
  Wallet,
} from "lucide-react"

import { GroupLabel, Panel, ReplayButton } from "@/components/brand/specimen"
import { cleanShadow, contrast, px, toHex, trackingEm, useColorTokens, useComputed } from "@/components/brand/read-style"
import { Photo, PhotoCredits } from "@/components/blocks/photo"
import { AircraftSide } from "@/components/mock/aircraft"
import { Cloud } from "@/components/motion/cloud"
import { RotorModeToggle } from "@/components/sections/aircraft/aircraft-hero"
import { AerieMark, Logo } from "@/components/site/logo"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what the trip is: “Rooftop to the airport in seven minutes.”", dont: "Sell the future: “The revolutionary future of urban mobility.”" },
  { do: "Short sentences. Calm, sure, a little poetic. Full stops.", dont: "Exclamation marks, emoji, sparkles, “Don’t miss out!”" },
  { do: "One loud line, set big and medium-weight; everything under it quiet.", dont: "Bold display type, gradient headlines, three weights in a line." },
  { do: "Show the city from the air, in its own light.", dont: "Renders of flying cars over a blue grid, stock handshakes." },
]

function LogoGround({ tone }: { tone: "cream" | "sky" | "dusk" }) {
  return (
    <div
      className={cn(
        "relative flex h-52 items-center justify-center overflow-hidden rounded-(--radius-photo)",
        tone === "cream" && "bg-panel text-ink",
        tone === "sky" && "bg-sky text-on-sky",
        tone === "dusk" && "bg-dusk text-dusk-fg",
      )}
    >
      {/* Clear space: half the wordmark's height on every side. */}
      <div className={cn("relative rounded-(--radius-chip) p-[0.5em] text-[44px] outline-1 outline-dashed", tone === "cream" ? "outline-ink-4" : "outline-current/40")}>
        <Logo className="text-[44px]" />
      </div>
    </div>
  )
}

export function BrandIdentity() {
  return (
    <div className="flex flex-col gap-14">
      <div className="grid gap-4 md:grid-cols-3">
        {(
          [
            ["cream", "On cream and panel — ink."],
            ["sky", "On sky — white. The loud bands."],
            ["dusk", "On dusk and photographs — cream."],
          ] as const
        ).map(([tone, caption]) => (
          <figure key={tone}>
            <LogoGround tone={tone} />
            <figcaption className="mt-3 text-micro text-ink-3">{caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Panel className="flex flex-wrap items-end gap-6 p-6 sm:gap-10 sm:p-8">
          {[64, 40, 24, 16].map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <span style={{ width: s, height: s }} className="text-ink">
                <AerieMark className="size-full" />
              </span>
              <span className="font-mono text-[11px] text-ink-3">
                {s}px{s === 16 ? " min" : ""}
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-3">
            <span className="grid size-16 place-items-center rounded-[18px] bg-sky text-on-sky shadow-(--shadow-sky)">
              <AerieMark className="size-9" />
            </span>
            <span className="font-mono text-[11px] text-ink-3">app icon</span>
          </div>
        </Panel>
        <Panel className="p-6 text-body text-ink-2 sm:p-8">
          <p>
            <span className="font-medium text-ink">The mark</span> is one wing stroke — a nest, or open wings — with the craft, a dot, lifting clear of it. It is drawn in{" "}
            <code className="font-mono text-[13px]">currentColor</code>, so it always takes the ink of what it sits in. Keep half the wordmark’s height clear around it; never set the mark
            under 16px, never in sky on sky, never outlined or tilted.
          </p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Voice</GroupLabel>
        <div className="overflow-hidden rounded-(--radius-card) bg-raised shadow-(--shadow-hairline)">
          {VOICE.map((v) => (
            <div key={v.do} className="grid border-b border-line last:border-b-0 md:grid-cols-2">
              <p className="flex gap-3 p-4 text-body text-ink-2 sm:p-5">
                <span className="mt-1 w-10 shrink-0 font-mono text-[11px] text-signal-green">DO</span>
                {v.do}
              </p>
              <p className="flex gap-3 border-line p-4 text-body text-ink-3 sm:p-5 md:border-l">
                <span className="mt-1 w-10 shrink-0 font-mono text-[11px] text-signal-red">DON’T</span>
                {v.dont}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Colour ──────────────────────────────────────────────────────────── */

/** `cls` is the swatch's own utility, written out so Tailwind emits it. */
type SwatchSpec = { name: string; cls: string; role: string }

const GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface",
    swatches: [
      { name: "page", cls: "bg-page", role: "The cream page" },
      { name: "panel", cls: "bg-panel", role: "Panels, tracks, chips" },
      { name: "panel-deep", cls: "bg-panel-deep", role: "Pressed panel, photo ground" },
      { name: "raised", cls: "bg-raised", role: "Cards, fields" },
    ],
  },
  {
    label: "Ink",
    swatches: [
      { name: "ink", cls: "bg-ink", role: "Headlines, ink button" },
      { name: "ink-2", cls: "bg-ink-2", role: "Body copy" },
      { name: "ink-3", cls: "bg-ink-3", role: "Secondary, labels" },
      { name: "ink-4", cls: "bg-ink-4", role: "Decorative only" },
    ],
  },
  {
    label: "Line",
    swatches: [
      { name: "line", cls: "bg-line", role: "Hairlines" },
      { name: "line-strong", cls: "bg-line-strong", role: "Inputs, dashed rules" },
    ],
  },
  {
    label: "Sky scale",
    swatches: [
      { name: "sky-50", cls: "bg-sky-50", role: "Tint, badge ground" },
      { name: "sky-100", cls: "bg-sky-100", role: "Cloud shadow" },
      { name: "sky-200", cls: "bg-sky-200", role: "On dusk" },
      { name: "sky-300", cls: "bg-sky-300", role: "Map routes on dusk" },
      { name: "sky", cls: "bg-sky", role: "The one loud colour" },
      { name: "sky-hover", cls: "bg-sky-hover", role: "Hover" },
      { name: "sky-press", cls: "bg-sky-press", role: "Press" },
      { name: "sky-700", cls: "bg-sky-700", role: "Sky as text" },
      { name: "sky-900", cls: "bg-sky-900", role: "Deepest" },
      { name: "on-sky", cls: "bg-on-sky", role: "Small text on sky" },
      { name: "on-sky-soft", cls: "bg-on-sky-soft", role: "Display on sky" },
    ],
  },
  {
    label: "Dusk",
    swatches: [
      { name: "dusk", cls: "bg-dusk", role: "Tech chapters, code" },
      { name: "dusk-2", cls: "bg-dusk-2", role: "Raised on dusk" },
      { name: "dusk-fg", cls: "bg-dusk-fg", role: "Text on dusk" },
      { name: "dusk-muted", cls: "bg-dusk-muted", role: "Quiet text on dusk" },
    ],
  },
  {
    label: "Horizon",
    swatches: [
      { name: "navy", cls: "bg-navy", role: "Top stripe" },
      { name: "ember", cls: "bg-ember", role: "Middle stripe" },
      { name: "ember-ink", cls: "bg-ember-ink", role: "Ember as text" },
      { name: "peach", cls: "bg-peach", role: "Thin stripe" },
      { name: "haze", cls: "bg-haze", role: "The horizon line" },
    ],
  },
  {
    label: "Signal",
    swatches: [
      { name: "signal-green", cls: "bg-signal-green", role: "Booked, on time" },
      { name: "signal-green-soft", cls: "bg-signal-green-soft", role: "Its ground" },
      { name: "signal-red", cls: "bg-signal-red", role: "Errors" },
    ],
  },
]

const GROUPED = new Set(GROUPS.flatMap((g) => g.swatches.map((s) => `--color-${s.name}`)))
/** Tailwind's own palette and shadcn's aliases are not Aerie tokens. */
const FOREIGN = /^--color-(background|foreground|card|popover|primary|secondary|muted|accent|destructive|border|input|ring|black|white|(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d+)/

export function Swatch({ name, cls, role }: SwatchSpec) {
  const [ref, v] = useComputed<HTMLDivElement>(["background-color"])
  return (
    <div className="min-w-0">
      <div ref={ref} className={cn("h-20 rounded-(--radius-card) shadow-(--shadow-hairline)", cls)} style={cls ? undefined : { background: `var(--color-${name})` }} />
      <p className="mt-2 truncate text-[14px] font-medium text-ink">{name}</p>
      <p className="font-mono text-[11.5px] text-ink-3 uppercase">{toHex(v["background-color"] ?? "")}</p>
      <p className="truncate text-micro text-ink-3">{role}</p>
    </div>
  )
}

const PAIRS = [
  ["text-ink", "bg-page", "ink on page"],
  ["text-ink-2", "bg-page", "ink-2 on page"],
  ["text-ink-3", "bg-page", "ink-3 on page"],
  ["text-ink-3", "bg-panel", "ink-3 on panel"],
  ["text-on-sky", "bg-sky", "on-sky on sky"],
  ["text-on-sky-soft", "bg-sky", "on-sky-soft on sky"],
  ["text-sky-700", "bg-sky-50", "sky-700 on sky-50"],
  ["text-sky", "bg-page", "sky on page"],
  ["text-dusk-fg", "bg-dusk", "dusk-fg on dusk"],
  ["text-dusk-muted", "bg-dusk", "dusk-muted on dusk"],
  ["text-ember-ink", "bg-page", "ember-ink on page"],
  ["text-signal-green", "bg-signal-green-soft", "signal-green on its soft"],
  ["text-signal-red", "bg-page", "signal-red on page"],
] as const

export function ContrastPair({ fg, bg, label }: { fg: string; bg: string; label: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(v.color ?? "", v["background-color"] ?? "")
  const grade = ratio == null ? "" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className={cn("flex items-center justify-between gap-3 rounded-(--radius-card) px-4 py-3.5 shadow-(--shadow-hairline)", fg, bg)}>
      <span className="text-[15px] font-medium">{label}</span>
      <span className="shrink-0 font-mono text-[12px] tabular-nums">
        {ratio?.toFixed(2)}:1 · {grade}
      </span>
    </div>
  )
}

export function ColourTokens() {
  const defined = useColorTokens()
  const extra = defined.filter((t) => !GROUPED.has(t) && !FOREIGN.test(t)).sort()
  return (
    <div className="flex flex-col gap-12">
      <div>
        <GroupLabel>The horizon — four stripes close every page</GroupLabel>
        <div className="overflow-hidden rounded-(--radius-photo)">
          <div className="h-16 bg-sky" />
          <div className="h-12 bg-navy" />
          <div className="h-8 bg-ember" />
          <div className="h-3 bg-peach" />
          <div className="h-4 bg-haze" />
        </div>
        <p className="mt-3 max-w-[64ch] text-micro text-ink-3">Sky for loud bands, then the horizon for accents — the menu wipe, the footer, a rule. Never as a gradient, never behind body copy.</p>
      </div>
      {GROUPS.map((g) => (
        <div key={g.label}>
          <GroupLabel>{g.label}</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-6">
            {g.swatches.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
        </div>
      ))}
      {extra.length > 0 && (
        <div>
          <GroupLabel>Also defined in index.css</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-6">
            {extra.map((t) => (
              <Swatch key={t} name={t.replace("--color-", "")} cls="" role="Not yet grouped" />
            ))}
          </div>
        </div>
      )}
      <div>
        <GroupLabel>Text pairs, measured live (WCAG 2)</GroupLabel>
        <div className="grid gap-2 md:grid-cols-2">
          {PAIRS.map(([fg, bg, label]) => (
            <ContrastPair key={label} fg={fg} bg={bg} label={label} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const SCALE = [
  { name: "tera", className: "text-tera", sample: "Lift." },
  { name: "giga", className: "text-giga", sample: "Skip it." },
  { name: "mega", className: "text-mega", sample: "Seven minutes" },
  { name: "display", className: "text-display", sample: "Rooftop to rooftop." },
  { name: "h2", className: "text-h2", sample: "Every seat is a window seat" },
  { name: "h3", className: "text-h3", sample: "Quieter than the street below" },
  { name: "h4", className: "text-h4", sample: "Midtown Roof to International" },
  { name: "lead", className: "text-lead", sample: "Book from your phone, walk up to the roof, and be there before the coffee cools." },
  { name: "body", className: "text-body", sample: "Four passengers and a pilot, six electric rotors, and a cabin as quiet as a library at cruise." },
  { name: "micro", className: "text-micro", sample: "Launching spring 2027 · Photography on Pexels" },
]

const HEADS = new Set(["tera", "giga", "mega", "display", "h2", "h3", "h4"])

function ScaleRow({ name, className, sample }: (typeof SCALE)[number]) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "letter-spacing", "font-weight"])
  const size = px(v["font-size"]) ?? 0
  const lh = v["line-height"] === "normal" ? "normal" : ((px(v["line-height"]) ?? 0) / (size || 1)).toFixed(2)
  return (
    <div className="grid gap-3 border-b border-line py-6 last:border-b-0 md:grid-cols-[170px_minmax(0,1fr)] md:gap-8">
      <div className="font-mono text-[11.5px] leading-relaxed text-ink-3">
        <p className="text-[13px] text-ink">text-{name}</p>
        <p>
          {size.toFixed(2)}px / {lh}
        </p>
        <p>
          {trackingEm(v["letter-spacing"], v["font-size"])} · {v["font-weight"]}
        </p>
      </div>
      <p ref={ref} className={cn(className, HEADS.has(name) && "type-head", "min-w-0 break-words text-ink")}>
        {sample}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="flex flex-col gap-14">
      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="p-6 sm:p-8">
          <GroupLabel>Everything — Manrope</GroupLabel>
          <p className="type-head text-[88px] leading-none tracking-[-0.06em] text-ink">Aa</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-lead text-ink">
            <span className="font-normal">Regular 400</span>
            <span className="font-medium">Medium 500</span>
            <span className="font-semibold">Semibold 600</span>
          </div>
          <p className="mt-4 text-body text-ink-2">
            Headlines are medium, never bold, set loud and tight — tracking tightens as the size grows, from −1% at body to −6.8% at tera. Body copy stays small and quiet in ink-2.
          </p>
        </Panel>
        <Panel className="p-6 sm:p-8">
          <GroupLabel>Codes and numbers — JetBrains Mono</GroupLabel>
          <p className="font-mono text-[64px] leading-none tracking-[-0.04em] text-ink">MDT→INT</p>
          <p className="mt-5 font-mono text-body text-ink-2">AER-7KQ2 · Seat 1A · 08:45</p>
          <p className="mt-4 text-body text-ink-2">For flight codes, booking references, pad codes and the numbers in code snippets. Never a headline.</p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Numerals</GroupLabel>
        <div className="grid gap-4 md:grid-cols-3">
          <Panel className="p-6">
            <p className="type-head text-h3 text-ink tabular-nums">08:45 → 08:52</p>
            <p className="mt-2 text-micro text-ink-3">tabular-nums — times, fares, counters</p>
          </Panel>
          <Panel className="p-6">
            <p className="type-head text-h3 text-ink [font-variant-numeric:proportional-nums]">1,170 hours</p>
            <p className="mt-2 text-micro text-ink-3">proportional — figures inside a sentence</p>
          </Panel>
          <Panel className="p-6">
            <p className="type-head text-h3 text-ink">
              290<span className="ml-1 text-lead text-ink-3">km/h</span>
            </p>
            <p className="mt-2 text-micro text-ink-3">units set two steps down, in ink-3</p>
          </Panel>
        </div>
      </div>
      <div>
        <GroupLabel>Scale — golden ratio half-steps from 16px</GroupLabel>
        <p className="mb-4 max-w-[64ch] text-body text-ink-3">
          Each step is √φ (×1.272) from the last, so every second step is ×1.618. The display steps clamp with the window — the numbers here are measured off the samples, at this width.
        </p>
        {SCALE.map((s) => (
          <ScaleRow key={s.name} {...s} />
        ))}
      </div>
    </div>
  )
}

/* ─── Space and surface ───────────────────────────────────────────────── */

const SPACING = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]
const RADII = [
  { name: "chip", cls: "rounded-(--radius-chip)", use: "Badges" },
  { name: "field", cls: "rounded-(--radius-field)", use: "Inputs, menus" },
  { name: "card", cls: "rounded-(--radius-card)", use: "Cards, panels" },
  { name: "photo", cls: "rounded-(--radius-photo)", use: "Photo cards, specimens" },
  { name: "stage", cls: "rounded-(--radius-stage)", use: "The folding hero stage" },
  { name: "device", cls: "rounded-(--radius-device)", use: "Phone frame" },
  { name: "button", cls: "rounded-(--radius-button)", use: "Every button — a pill" },
]
const SHADOWS = [
  { name: "hairline", cls: "shadow-(--shadow-hairline)" },
  { name: "xs", cls: "shadow-(--shadow-xs)" },
  { name: "card", cls: "shadow-(--shadow-card)" },
  { name: "photo", cls: "shadow-(--shadow-photo)" },
  { name: "float", cls: "shadow-(--shadow-float)" },
  { name: "device", cls: "shadow-(--shadow-device)" },
  { name: "field", cls: "shadow-(--shadow-field)" },
  { name: "button", cls: "shadow-(--shadow-button)" },
  { name: "sky", cls: "shadow-(--shadow-sky)" },
]

function RadiusSample({ name, cls, use }: (typeof RADII)[number]) {
  const [ref, v] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <div>
      <div ref={ref} className={cn("h-20 border-[1.5px] border-ink bg-raised", cls)} />
      <p className="mt-2 text-[14px] font-medium text-ink">{name}</p>
      <p className="font-mono text-[11.5px] text-ink-3">{v["border-top-left-radius"]}</p>
      <p className="text-micro text-ink-3">{use}</p>
    </div>
  )
}

function ShadowSample({ name, cls }: (typeof SHADOWS)[number]) {
  const [ref, v] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <div>
      <div ref={ref} className={cn("h-24 rounded-(--radius-card) bg-raised", cls)} />
      <p className="mt-3 text-[14px] font-medium text-ink">{name}</p>
      <p className="line-clamp-4 font-mono text-[10.5px] leading-snug break-all text-ink-3">{cleanShadow(v["box-shadow"])}</p>
    </div>
  )
}

function SpacingToken({ name, cls }: { name: string; cls: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["width"])
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-4">
        <span className="w-36 shrink-0 font-mono text-[12px] text-ink-3">--spacing-{name}</span>
        <div ref={ref} className={cn("h-3 max-w-full rounded-full bg-sky", cls)} />
      </div>
      <p className="mt-1 ml-40 font-mono text-[11px] text-ink-3">{v.width} at this width</p>
    </div>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="flex flex-col gap-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <GroupLabel>Spacing — a 4px grid</GroupLabel>
          <div className="flex flex-col gap-2">
            {SPACING.map((s) => (
              <div key={s} className="flex items-center gap-4">
                <span className="w-14 font-mono text-[12px] text-ink-3">{s * 4}px</span>
                <span className="h-3 rounded-full bg-ink" style={{ width: `calc(var(--spacing) * ${s})` }} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <GroupLabel>Page rhythm — fluid tokens</GroupLabel>
          <div className="flex flex-col gap-5">
            <SpacingToken name="gutter" cls="w-(--spacing-gutter)" />
            <SpacingToken name="section" cls="w-(--spacing-section)" />
          </div>
          <p className="mt-5 max-w-[48ch] text-body text-ink-3">
            Full-width layouts with a gutter that grows with the window, and sections that breathe — lots of cream around one loud line.
          </p>
        </div>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-7">
          {RADII.map((r) => (
            <RadiusSample key={r.name} {...r} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — soft, wide, low and warm</GroupLabel>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-(--radius-photo) bg-panel p-6 sm:grid-cols-3 sm:p-8 lg:grid-cols-5">
          {SHADOWS.map((s) => (
            <ShadowSample key={s.name} {...s} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-(--radius-card) border border-line p-4 text-body text-ink-2">1px line — rules, list rows</div>
          <div className="rounded-(--radius-card) border border-dashed border-line-strong p-4 text-body text-ink-2">1px dashed — tickets, clear space</div>
          <div className="rounded-(--radius-card) p-4 text-body text-ink-2 shadow-[0_0_0_1.5px_var(--color-ink)]">1.5px ink — field focus</div>
          <div className="rounded-(--radius-card) p-4 text-body text-ink-2 ring-[3px] ring-sky/35">3px sky ring — button focus</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

/** cubic-bezier(a, b, c, d) → [a, b, c, d]; "ease" and friends fall back. */
function parseBezier(value = ""): [number, number, number, number] {
  const m = value.match(/cubic-bezier\(([^)]+)\)/)
  if (!m) return [0.25, 0.1, 0.25, 1]
  const n = m[1].split(",").map((s) => parseFloat(s))
  return [n[0], n[1], n[2], n[3]]
}
function seconds(value = "") {
  const n = parseFloat(value)
  if (!Number.isFinite(n)) return 0.3
  return value.trim().endsWith("ms") ? n / 1000 : n
}

const EASINGS = [
  { name: "ease-out-strong", where: "Everything you touch, every reveal", style: { transitionTimingFunction: "var(--ease-out-strong)" } },
  { name: "ease-in-out-strong", where: "Rotor tilt, the menu closing", style: { transitionTimingFunction: "var(--ease-in-out-strong)" } },
  { name: "ease-drawer", where: "Sheets and drawers", style: { transitionTimingFunction: "var(--ease-drawer)" } },
] as const

function EasingRow({ name, where, style, run }: (typeof EASINGS)[number] & { run: number }) {
  const [ref, v] = useComputed<HTMLDivElement>(["transition-timing-function"])
  const reduced = useReducedMotion()
  const [a, b, c, d] = parseBezier(v["transition-timing-function"])
  return (
    <div ref={ref} style={style} className="grid items-center gap-4 border-b border-line py-5 last:border-b-0 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-6">
      <svg viewBox="-4 -4 108 108" className="size-20 overflow-visible rounded-(--radius-field) bg-panel" aria-hidden>
        <path d="M0 100 L100 0" stroke="var(--color-line-strong)" strokeDasharray="3 3" fill="none" />
        <path d={`M0 100 C${a * 100} ${100 - b * 100} ${c * 100} ${100 - d * 100} 100 0`} stroke="var(--color-sky)" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p className="text-[15px] font-medium text-ink">--{name}</p>
          <p className="font-mono text-[11.5px] text-ink-3">{v["transition-timing-function"]}</p>
        </div>
        <p className="text-micro text-ink-3">{where}</p>
        <div className="relative mt-3 h-11 rounded-full bg-panel">
          <motion.div
            key={run}
            className="absolute inset-y-0 left-0 right-11"
            initial={{ x: "0%" }}
            animate={{ x: run ? "100%" : "0%" }}
            transition={{ duration: reduced ? 0 : 0.8, ease: [a, b, c, d] }}
          >
            <span className="absolute top-1 left-1 size-9 rounded-full bg-sky shadow-(--shadow-sky)" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const DURATIONS = [
  { name: "press", where: "Button and card press", style: { transitionDuration: "var(--duration-press)" } },
  { name: "hover", where: "Hover colour, focus ring", style: { transitionDuration: "var(--duration-hover)" } },
  { name: "swap", where: "Captions cross-fading, link underline", style: { transitionDuration: "var(--duration-swap)" } },
  { name: "menu", where: "Each stripe of the menu wipe", style: { transitionDuration: "var(--duration-menu)" } },
  { name: "scene", where: "A scene settling, a section reveal", style: { transitionDuration: "var(--duration-scene)" } },
] as const

function DurationRow({ name, where, style, run }: (typeof DURATIONS)[number] & { run: number }) {
  const [ref, v] = useComputed<HTMLDivElement>(["transition-duration"])
  const reduced = useReducedMotion()
  const s = seconds(v["transition-duration"])
  return (
    <div ref={ref} style={style} className="grid items-center gap-2 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
      <div>
        <p className="text-[15px] font-medium text-ink">
          --duration-{name} <span className="font-mono text-[12px] font-normal text-ink-3">{Math.round(s * 1000)}ms</span>
        </p>
        <p className="text-micro text-ink-3">{where}</p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-panel">
        <motion.div
          key={run}
          className="h-full origin-left rounded-full bg-ink"
          initial={{ scaleX: run ? 0 : 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduced ? 0 : s, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  )
}

const MENU_BANDS = ["bg-peach", "bg-ember", "bg-navy", "bg-sky"] as const

/**
 * The menu's stripe wipe, in miniature: peach, ember, navy and sky drop in
 * one after another, the links rise in on the last; closing runs it back.
 * The same numbers as the real menu, as props.
 */
export function StripeBandsDemo({ stagger = 0.06, duration = 0.52, className }: { stagger?: number; duration?: number; className?: string }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  useCanvasAction("Menu bands open", (next) => setOpen(next ?? !open), { on: open, group: "Brand · Motion" })
  const last = MENU_BANDS.length - 1
  const d = reduced ? 0 : duration
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-(--radius-photo) bg-panel">
        <p className="absolute inset-0 grid place-items-center text-micro text-ink-3">The page under the menu</p>
        {MENU_BANDS.map((band, i) => (
          <motion.div
            key={band}
            aria-hidden
            className={cn("absolute inset-0", band)}
            initial={false}
            animate={
              open
                ? { y: "0%", transition: { duration: d, ease: [0.23, 1, 0.32, 1], delay: reduced ? 0 : i * stagger } }
                : { y: "-101%", transition: { duration: d * 0.85, ease: [0.77, 0, 0.175, 1], delay: reduced ? 0 : (last - i) * stagger } }
            }
          />
        ))}
        <motion.ol
          className="absolute inset-0 flex flex-col justify-center gap-0.5 px-6 text-on-sky"
          initial={false}
          animate={open ? { opacity: 1, transition: { delay: reduced ? 0 : last * stagger + duration * 0.45 } } : { opacity: 0, transition: { duration: reduced ? 0 : 0.16 } }}
        >
          {["Experience", "Aircraft", "Routes"].map((l, i) => (
            <li key={l} className="type-head text-h3">
              <span className="mr-3 font-mono text-micro text-on-sky-soft">{String(i + 1).padStart(2, "0")}</span>
              {l}
            </li>
          ))}
        </motion.ol>
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[11.5px] text-ink-3">
          {Math.round(duration * 1000)}ms each · {Math.round(stagger * 1000)}ms apart · ease-out-strong in, in-out back
        </p>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-pressed={open}
          className="inline-flex h-11 shrink-0 items-center rounded-full bg-ink px-5 text-[15px] font-medium text-page shadow-(--shadow-button) transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-ink-2 focus-visible:ring-[3px] focus-visible:ring-sky/35 focus-visible:outline-none active:scale-[0.97]"
        >
          {open ? "Close" : "Open menu"}
        </button>
      </div>
    </div>
  )
}

/** The craft, on dusk, with the switch that tips its rotors. */
export function RotorTiltDemo({ defaultMode = "cruise" }: { defaultMode?: "hover" | "cruise" }) {
  const [mode, setMode] = useState<"hover" | "cruise">(defaultMode)
  useCanvasAction("Rotors in hover", (next) => setMode((next ?? mode !== "hover") ? "hover" : "cruise"), { on: mode === "hover", group: "Brand · Motion" })
  return (
    <div className="flex flex-col gap-6 rounded-(--radius-photo) bg-dusk p-5 text-dusk-fg sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[15px] font-medium">Rotor tilt</p>
          <p className="font-mono text-[11.5px] text-dusk-muted">900ms · ease-in-out-strong · blades in CSS</p>
        </div>
        <RotorModeToggle mode={mode} onModeChange={setMode} />
      </div>
      <AircraftSide mode={mode} tone="light" className="mx-auto max-w-[560px]" />
    </div>
  )
}

export function Motion() {
  const [easeRun, setEaseRun] = useState(0)
  const [durRun, setDurRun] = useState(0)
  return (
    <div className="flex flex-col gap-14">
      <div>
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-line pb-2">
          <h3 className="text-micro text-ink-3">Easings — read from the tokens, played at 800ms</h3>
          <ReplayButton onClick={() => setEaseRun((r) => r + 1)} label="Play the easings" className="-mb-0.5" />
        </div>
        {EASINGS.map((e) => (
          <EasingRow key={e.name} {...e} run={easeRun} />
        ))}
      </div>
      <div>
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-line pb-2">
          <h3 className="text-micro text-ink-3">Durations — each bar fills in its own time</h3>
          <ReplayButton onClick={() => setDurRun((r) => r + 1)} label="Play the durations" className="-mb-0.5" />
        </div>
        <div className="flex flex-col gap-5">
          {DURATIONS.map((d) => (
            <DurationRow key={d.name} {...d} run={durRun} />
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <GroupLabel>The menu — stripes wipe down</GroupLabel>
          <StripeBandsDemo />
        </div>
        <div>
          <GroupLabel>The craft — rotors tilt</GroupLabel>
          <RotorTiltDemo />
        </div>
      </div>
      <p className="max-w-[64ch] text-body text-ink-3">
        Motion is Framer Motion or CSS, so the editor’s Motion switch stops it; Lenis carries the scroll. No bounce, nothing grows from zero, only transform and opacity move. Scroll stories
        are scrubbed, not timed — and with reduced motion every piece shows its end state.
      </p>
    </div>
  )
}

/* ─── Icons and imagery ───────────────────────────────────────────────── */

const ICONS = [
  ["ArrowRight", ArrowRight],
  ["ArrowUpRight", ArrowUpRight],
  ["ArrowLeftRight", ArrowLeftRight],
  ["Check", Check],
  ["MapPin", MapPin],
  ["Calendar", Calendar],
  ["Users", Users],
  ["Luggage", Luggage],
  ["Briefcase", Briefcase],
  ["Car", Car],
  ["Wallet", Wallet],
  ["Search", Search],
  ["Eye", Eye],
  ["RotateCcw", RotateCcw],
  ["Plus", Plus],
  ["Minus", Minus],
] as const

export function Iconography() {
  return (
    <div className="flex flex-col gap-14">
      <div>
        <GroupLabel>Lucide — default 2px stroke, 16px in buttons, 20px on their own</GroupLabel>
        <Panel className="grid grid-cols-4 gap-x-4 gap-y-6 p-6 sm:grid-cols-8 sm:p-8">
          {ICONS.map(([name, Icon]) => (
            <div key={name} className="flex flex-col items-center gap-2 text-ink">
              <Icon className="size-5" />
              <span className="max-w-full truncate text-[11px] text-ink-3">{name}</span>
            </div>
          ))}
        </Panel>
        <p className="mt-3 max-w-[64ch] text-micro text-ink-3">Icons sit beside a word, never instead of one. The mark, the craft, the phone and the maps are drawn in SVG for this brand — no icon stands in for them.</p>
      </div>
      <div>
        <GroupLabel>Clouds — drawn, not photographed</GroupLabel>
        <div className="relative overflow-hidden rounded-(--radius-photo) bg-sky px-6 py-10 sm:px-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {(["tall", "long", "puff"] as const).map((shape) => (
              <figure key={shape} className="flex flex-col items-center gap-3">
                <Cloud shape={shape} className="w-full max-w-64" />
                <figcaption className="font-mono text-[11.5px] text-on-sky-soft">shape="{shape}"</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="mt-3 max-w-[64ch] text-micro text-ink-3">Overlapping circles on a flat base in raised cream, with a sky-100 shadow underneath. They drift and parallax on the sky bands; the drawing never moves on its own.</p>
      </div>
      <div>
        <GroupLabel>Photography — the city from the air, in its own light</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <figure>
            <Photo name="trench-turn" className="aspect-[3/4] shadow-(--shadow-photo)" />
            <figcaption className="mt-2 text-micro text-ink-3">Portrait card · 3:4 · radius photo</figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[3/4] overflow-hidden rounded-(--radius-photo) shadow-(--shadow-photo)">
              <Photo name="cabin-dusk" rounded={false} className="absolute inset-0" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-dusk/70 via-dusk/5 to-dusk/30" />
              <p className="absolute bottom-4 left-4 text-micro text-dusk-fg">Cabin, at dusk</p>
            </div>
            <figcaption className="mt-2 text-micro text-ink-3">Dusk overlay · light type</figcaption>
          </figure>
          <figure>
            <Photo name="pad-aerial" position="50% 30%" className="aspect-[3/4] shadow-(--shadow-photo)" />
            <figcaption className="mt-2 text-micro text-ink-3">Overhead crop · object-position</figcaption>
          </figure>
          <figure>
            <Photo name="towers-up" className="aspect-[3/4] shadow-(--shadow-photo)" />
            <figcaption className="mt-2 text-micro text-ink-3">Looking up · sky in frame</figcaption>
          </figure>
        </div>
        <p className="mt-4 max-w-[64ch] text-body text-ink-3">
          Pexels photography, warm and late in the day: windows, roofs, rivers, people mid-stride. Tall portrait crops with the photo radius and a soft shadow; a dusk gradient only where type
          sits on top. Every page credits its photographers at the bottom.
        </p>
        <PhotoCredits names={["trench-turn", "cabin-dusk", "pad-aerial", "towers-up"]} className="mt-3" />
      </div>
    </div>
  )
}
