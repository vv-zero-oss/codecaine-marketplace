import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, ArrowUpRight, Asterisk, AudioLines, Check, Circle, Copy, Lock, Menu, Play, Search, Tent, X } from "lucide-react"
import { useState } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel } from "@/components/brand/specimen"
import { Duotone } from "@/components/media/media"
import { TONES } from "@/components/media/tone"
import { pexels, PERSON } from "@/content"
import { ease } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what happened: “Four countries changed their rules.”", dont: "Sell a feeling: “Passionate about impact!”" },
  { do: "Name the number, then what it counts.", dont: "Round everything to “lots” or “huge”." },
  { do: "First person, plain words, short sentences.", dont: "Jargon, exclamation marks, emoji." },
]

/** The mark: an asterisk in lime on the ground — the footnote that says “there’s more”. */
export function Mark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex size-10 items-center justify-center rounded-[10px] bg-ground text-lime", className)}>
      <Asterisk className="size-[70%]" strokeWidth={3} />
    </span>
  )
}

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>On the ground</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-[var(--radius-tile)] bg-ground-deep">
          <div className="flex items-center gap-3 rounded-lg p-6 outline-1 outline-dashed outline-ink/30">
            <Mark className="ring-1 ring-line" />
            <span className="text-xl font-semibold tracking-[-0.01em]">{PERSON.name}</span>
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>On a tone</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-[var(--radius-tile)] bg-lime text-night">
          <div className="flex items-center gap-3 rounded-lg p-6 outline-1 outline-dashed outline-night/30">
            <Mark className="bg-night" />
            <span className="text-xl font-semibold tracking-[-0.01em]">{PERSON.name}</span>
          </div>
        </div>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-[var(--radius-tile)] bg-ground-deep p-5">
          <dt className="font-medium">Clear space</dt>
          <dd className="mt-1 text-ink-muted">The mark’s height on every side (the dashed box).</dd>
        </div>
        <div className="rounded-[var(--radius-tile)] bg-ground-deep p-5">
          <dt className="font-medium">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-muted">
            <Mark className="size-5 rounded-[5px] ring-1 ring-line" />
            <span>20px mark, 13px name.</span>
          </dd>
        </div>
        <div className="rounded-[var(--radius-tile)] bg-ground-deep p-5">
          <dt className="font-medium">Mark only</dt>
          <dd className="mt-1 text-ink-muted">Favicon and avatar. Lime on the ground, or night on any tone.</dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-tile)] bg-ground-deep text-sm">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-faint">
                <X className="mt-0.5 size-4 shrink-0 text-orange" />
                {line.dont}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ─── Colour ──────────────────────────────────────────────────────────── */

type SwatchSpec = { name: string; token: string; className: string; role: string }

const COLOURS: { group: string; swatches: SwatchSpec[] }[] = [
  {
    group: "Ground",
    swatches: [
      { name: "ground", token: "--color-ground", className: "bg-ground", role: "The page" },
      { name: "ground-deep", token: "--color-ground-deep", className: "bg-ground-deep", role: "Tiles, cards, press" },
      { name: "ground-raised", token: "--color-ground-raised", className: "bg-ground-raised", role: "Hover on the ground" },
      { name: "ground-sunk", token: "--color-ground-sunk", className: "bg-ground-sunk", role: "Wells" },
    ],
  },
  {
    group: "Text",
    swatches: [
      { name: "ink", token: "--color-ink", className: "bg-ink", role: "Headings, body on ground" },
      { name: "ink-muted", token: "--color-ink-muted", className: "bg-ink-muted", role: "Paragraphs, links at rest" },
      { name: "ink-faint", token: "--color-ink-faint", className: "bg-ink-faint", role: "Captions, labels" },
      { name: "night", token: "--color-night", className: "bg-night", role: "Text on every tone" },
    ],
  },
  {
    group: "Lines",
    swatches: [
      { name: "line", token: "--color-line", className: "bg-line", role: "Hairlines, table rows" },
      { name: "line-strong", token: "--color-line-strong", className: "bg-line-strong", role: "Inputs, outline buttons" },
    ],
  },
  {
    group: "Tones",
    swatches: TONES.map((tone) => ({
      name: tone,
      token: `--color-${tone}`,
      className: `bg-${tone}`,
      role: tone === "lime" ? "Primary action, focus" : "A project’s colour",
    })),
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  return (
    <div className="overflow-hidden rounded-[var(--radius-tile)] bg-ground-deep">
      <div ref={ref} className={cn("h-20 ring-1 ring-inset ring-white/10", className)} />
      <div className="space-y-0.5 p-3 text-xs">
        <p className="font-medium text-ink">{name}</p>
        <p className="font-mono text-ink-faint">{token}</p>
        <p className="font-mono text-ink-muted">{toHex(values["background-color"])}</p>
        <p className="text-ink-faint">{role}</p>
      </div>
    </div>
  )
}

const PAIRS = [
  { label: "ink on ground", className: "bg-ground text-ink" },
  { label: "ink-muted on ground", className: "bg-ground text-ink-muted" },
  { label: "ink-faint on ground", className: "bg-ground text-ink-faint" },
  { label: "night on lime", className: "bg-lime text-night" },
  { label: "night on pink", className: "bg-pink text-night" },
  { label: "night on orange", className: "bg-orange text-night" },
  { label: "night on violet", className: "bg-violet text-night" },
  { label: "lime on ground", className: "bg-ground text-lime" },
]

export function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color, values["background-color"])
  const grade = ratio == null ? "" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className={cn("flex items-center justify-between rounded-[var(--radius-tile)] px-4 py-3 ring-1 ring-line", className)}>
      <span className="text-sm">{label}</span>
      <span className="font-mono text-xs">
        {ratio ? ratio.toFixed(2) : "—"} · {grade}
      </span>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="space-y-10">
      {COLOURS.map(({ group, swatches }) => (
        <div key={group}>
          <GroupLabel>{group}</GroupLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {swatches.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Contrast</GroupLabel>
        <div className="grid gap-2 sm:grid-cols-2">
          {PAIRS.map((pair) => (
            <ContrastPair key={pair.label} {...pair} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const TYPE_SCALE = [
  { name: "Stat", className: "text-[clamp(2.75rem,2rem+3vw,4.25rem)] leading-none font-semibold tracking-[-0.045em]", use: "Numbers that roll in" },
  { name: "Page title", className: "text-[clamp(2rem,1.6rem+1.6vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.03em]", use: "One per page" },
  { name: "Quote", className: "text-[clamp(1.5rem,1.1rem+1.6vw,2.4rem)] leading-[1.18] tracking-[-0.018em]", use: "Testimonials" },
  { name: "Intro", className: "text-[clamp(1.25rem,1rem+1vw,1.55rem)] leading-[1.28] tracking-[-0.012em]", use: "The hero, the proof line" },
  { name: "Heading", className: "text-xl font-semibold tracking-[-0.02em]", use: "Blocks on inner pages" },
  { name: "Lede", className: "text-lg leading-[1.55]", use: "Under a page title" },
  { name: "Body", className: "text-[15px] leading-7", use: "Nav, labels, table, footer" },
  { name: "Caption", className: "text-[13px]", use: "Small print" },
]

export function TypeSample({ name, className, use }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-t border-line py-5 first:border-t-0 md:grid-cols-[11rem_1fr]">
      <div className="text-xs">
        <p className="font-medium text-ink">{name}</p>
        <p className="mt-1 font-mono text-ink-faint">
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} · {values["letter-spacing"]}
        </p>
        <p className="mt-1 text-ink-faint">{use}</p>
      </div>
      <p ref={ref} className={cn("min-w-0 truncate text-ink", className)}>
        Eighteen years, 120 projects
      </p>
    </div>
  )
}

export function Typography() {
  const [sans, sansValues] = useComputed<HTMLDivElement>(["font-family"])
  const [mono, monoValues] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <div className="space-y-10">
      <div className="grid gap-3 sm:grid-cols-2">
        <div ref={sans} className="rounded-[var(--radius-tile)] bg-ground-deep p-6 font-sans">
          <p className="text-5xl font-semibold tracking-[-0.04em]">Aa</p>
          <p className="mt-3 text-sm font-medium">Inter — 400, 500, 600</p>
          <p className="mt-1 truncate font-mono text-xs text-ink-faint">{sansValues["font-family"]}</p>
        </div>
        <div ref={mono} className="rounded-[var(--radius-tile)] bg-ground-deep p-6 font-mono">
          <p className="text-5xl">Aa</p>
          <p className="mt-3 text-sm font-medium">JetBrains Mono — 400, 500</p>
          <p className="mt-1 truncate text-xs text-ink-faint">{monoValues["font-family"]}</p>
        </div>
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        {TYPE_SCALE.map((step) => (
          <TypeSample key={step.name} {...step} />
        ))}
      </div>
      <div>
        <GroupLabel>Numerals</GroupLabel>
        <p className="rounded-[var(--radius-tile)] bg-ground-deep p-6 text-3xl tracking-[-0.03em] text-lime tabular-nums">
          0 1 2 3 4 5 6 7 8 9 · €7bn · 120+ · 1.4%
        </p>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ─────────────────────────────────── */

const SPACING = ["1", "2", "3", "4", "6", "8", "12", "16", "24"]
const NAMED_SPACE = [
  { name: "--spacing-tile-gap", className: "w-[var(--spacing-tile-gap)]" },
  { name: "--spacing-gutter", className: "w-[var(--spacing-gutter)]" },
  { name: "--spacing-section", className: "w-[var(--spacing-section)]" },
]
const RADII = [
  { name: "--radius-button", className: "rounded-[var(--radius-button)]", use: "Buttons, the email pill" },
  { name: "--radius-tile", className: "rounded-[var(--radius-tile)]", use: "Work tiles, client tiles, press" },
  { name: "--radius-media", className: "rounded-[var(--radius-media)]", use: "Pictures inside a tile" },
  { name: "--radius-pill", className: "rounded-[var(--radius-pill)]", use: "The filter field" },
]
const SHADOWS = [
  { name: "--shadow-button", className: "shadow-[var(--shadow-button)]", use: "Filled buttons" },
  { name: "--shadow-media", className: "shadow-[var(--shadow-media)]", use: "A picture in its tile" },
  { name: "--shadow-float", className: "shadow-[var(--shadow-float)]", use: "Hero cards in the air" },
  { name: "--shadow-header", className: "shadow-[var(--shadow-header)]", use: "The header's bottom edge" },
]
const BORDERS = [
  { name: "line · 1px", className: "border-b border-line", use: "Table rows, footer, dividers" },
  { name: "line-strong · 1px", className: "border-b border-line-strong", use: "Inputs, outline buttons" },
]

export function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <div className="flex items-center gap-4 text-xs">
      <span className="w-40 shrink-0 font-mono text-ink-faint">{step}</span>
      <div ref={ref} className={cn("h-3 rounded-sm bg-lime", className)} />
      <span className="font-mono text-ink-muted">{values.width}</span>
    </div>
  )
}

/** Tailwind composes a shadow with empty ring and inset layers; drop those so
 *  the readout is the token's own layers. */
function clean(value = "") {
  return value.replace(/rgba\(0, 0, 0, 0\) 0px 0px( 0px)?( 0px)?(, )?/g, "").replace(/, $/, "") || "none"
}

export function SurfaceSample({ name, className, use, property }: { name: string; className: string; use: string; property: string }) {
  const [ref, values] = useComputed<HTMLDivElement>([property])
  return (
    <div className="rounded-[var(--radius-tile)] bg-ground-deep p-4">
      <div ref={ref} className={cn("h-20 bg-pink", className)} />
      <p className="mt-3 font-mono text-xs text-ink">{name}</p>
      <p className="mt-0.5 line-clamp-3 font-mono text-[11px] text-ink-faint">{clean(values[property])}</p>
      <p className="mt-1 text-xs text-ink-muted">{use}</p>
    </div>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Spacing (4px grid)</GroupLabel>
        <div className="space-y-2">
          {SPACING.map((step) => (
            <SpacingStep key={step} step={`--spacing × ${step}`} className={`w-${step}`} />
          ))}
          {NAMED_SPACE.map((space) => (
            <SpacingStep key={space.name} step={space.name} className={space.className} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {RADII.map((r) => (
            <SurfaceSample key={r.name} {...r} property="border-top-left-radius" />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {SHADOWS.map((s) => (
            <SurfaceSample key={s.name} {...s} className={cn(s.className, "rounded-[var(--radius-media)]")} property="box-shadow" />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          {BORDERS.map((b) => (
            <div key={b.name} className="rounded-[var(--radius-tile)] bg-ground-deep p-4">
              <div className={cn("h-8", b.className)} />
              <p className="mt-3 font-mono text-xs text-ink">{b.name}</p>
              <p className="mt-1 text-xs text-ink-muted">{b.use}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const MOTION = [
  { name: "Page change", tokens: "--duration-page · --ease-out-soft", from: { opacity: 0, filter: "blur(10px)" }, to: { opacity: 1, filter: "blur(0px)" }, seconds: 0.52, curve: "out" as const },
  { name: "Quote change", tokens: "--duration-quote · --ease-out-soft", from: { opacity: 0, filter: "blur(8px)" }, to: { opacity: 1, filter: "blur(0px)" }, seconds: 0.6, curve: "out" as const },
  { name: "Hero card drift", tokens: "7s · --ease-in-out-soft", from: { y: 0 }, to: { y: -14 }, seconds: 1.4, curve: "in-out" as const },
  { name: "Odometer reel", tokens: "--duration-roll · --ease-out-soft", from: { y: 40 }, to: { y: 0 }, seconds: 1.4, curve: "out" as const },
  { name: "Tile hover", tokens: "500ms · --ease-out-soft", from: { scale: 1, rotate: 0 }, to: { scale: 1.06, rotate: -2 }, seconds: 0.5, curve: "out" as const },
  { name: "Button press", tokens: "--duration-press", from: { scale: 1 }, to: { scale: 0.94 }, seconds: 0.12, curve: "out" as const },
]

/** One motion token, played on a sample. Plays through Framer Motion — the
 *  Web Animations API — so the editor's Motion switch stops and reduces it. */
export function MotionSample({ name, tokens, from, to, seconds, curve }: (typeof MOTION)[number]) {
  const [run, setRun] = useState(0)
  const reduce = useReducedMotion()
  return (
    <div className="rounded-[var(--radius-tile)] bg-ground-deep p-4">
      <div className="flex h-24 items-center justify-center overflow-hidden rounded-[var(--radius-media)] bg-ground">
        <motion.div
          key={run}
          className="size-12 rounded-[var(--radius-media)] bg-lime"
          initial={reduce ? false : from}
          animate={to}
          transition={{ duration: seconds, ease: ease(curve) }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink">{name}</p>
          <p className="truncate font-mono text-[11px] text-ink-faint">{tokens}</p>
        </div>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          aria-label={`Play ${name}`}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ground-raised text-ink transition-transform hover:bg-line active:scale-95"
        >
          <Play className="size-4" />
        </button>
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {MOTION.map((m) => (
        <MotionSample key={m.name} {...m} />
      ))}
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [
  { Icon: ArrowRight, name: "arrow-right" },
  { Icon: ArrowUpRight, name: "arrow-up-right" },
  { Icon: Asterisk, name: "asterisk" },
  { Icon: Search, name: "search" },
  { Icon: Copy, name: "copy" },
  { Icon: Check, name: "check" },
  { Icon: Lock, name: "lock" },
  { Icon: Menu, name: "menu" },
  { Icon: X, name: "x" },
  { Icon: Circle, name: "circle" },
  { Icon: Tent, name: "tent" },
  { Icon: AudioLines, name: "audio-lines" },
]

export function Iconography() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Lucide, 2px stroke, 16–20px</GroupLabel>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {ICONS.map(({ Icon, name }) => (
            <li key={name} className="flex flex-col items-center gap-2 rounded-[var(--radius-tile)] bg-ground-deep p-4">
              <Icon className="size-5 text-ink" />
              <span className="font-mono text-[10px] text-ink-faint">{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <GroupLabel>Photography: duotone, one tone per picture</GroupLabel>
        <p className="mb-4 max-w-xl text-sm text-ink-muted">
          Every photograph is from Pexels, turned grey and contrasty, then multiplied onto a tone — so pictures from
          anywhere read as one loud set. The original, then each tone:
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-7">
          <img
            src={pexels(5807613, 400)}
            alt="Cyclists racing, as photographed"
            className="aspect-square rounded-[var(--radius-media)] object-cover"
          />
          {TONES.map((tone) => (
            <Duotone key={tone} src={pexels(5807613, 400)} alt={`Cyclists racing, in ${tone}`} tone={tone} className="aspect-square rounded-[var(--radius-media)]" />
          ))}
        </div>
      </div>
    </div>
  )
}
