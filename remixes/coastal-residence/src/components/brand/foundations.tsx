import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Menu,
  Plus,
  X,
} from "lucide-react"
import { motion } from "motion/react"
import { useRef, useState, type ComponentType } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel, Panel, Value } from "@/components/brand/specimen"
import { DURATION, EASE_OUT } from "@/components/motion"
import { archPath, DayNight } from "@/components/sections/hero"
import { Badge } from "@/components/site-header"
import { Emblem } from "@/components/ui/emblem"
import { brand, hero } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  {
    do: "Name the place and the minutes: “Five minutes from the old town of Altea.”",
    dont: "Sell the postcode: “An unbeatable prime location!”",
  },
  {
    do: "Talk about materials and how they age: “Limestone that turns warmer each summer.”",
    dont: "Reach for the brochure word: “Luxury finishes throughout.”",
  },
  {
    do: "Slow, plain sentences. Headlines in capitals, one script word for the warm part.",
    dont: "Exclamation marks, yields and returns, countdowns to the last unit.",
  },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>The badge, on limestone</GroupLabel>
        <Panel className="flex h-64 items-center justify-center bg-shell">
          {/* Clear space: half the emblem on every side, drawn. */}
          <div className="p-7 outline-1 outline-offset-0 outline-deep-soft/40 outline-dashed">
            <Badge tone="dark" />
          </div>
        </Panel>
      </div>
      <div>
        <GroupLabel>The badge, on deep olive</GroupLabel>
        <div className="flex h-64 items-center justify-center rounded-[var(--radius-card)] bg-deep">
          <div className="p-7 outline-1 outline-shell/30 outline-dashed">
            <Badge tone="light" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Emblem and name</GroupLabel>
        <Panel className="flex h-44 items-center justify-center gap-5 px-6 text-ink">
          <Emblem className="size-12 shrink-0" />
          <span className="font-condensed text-[clamp(2rem,4vw,2.8rem)] leading-[0.9]">
            {brand.word[0]}
            <br />
            {brand.word[1]}
          </span>
        </Panel>
      </div>
      <div>
        <GroupLabel>Emblem, reversed</GroupLabel>
        <div className="flex h-44 items-center justify-center gap-5 rounded-[var(--radius-card)] bg-ink px-6 text-paper">
          <Emblem className="size-12 shrink-0" />
          <span className="font-condensed text-[clamp(2rem,4vw,2.8rem)] leading-[0.9]">
            {brand.word[0]}
            <br />
            {brand.word[1]}
          </span>
        </div>
      </div>
      <dl className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
        <Panel className="p-5">
          <dt className="label">Clear space</dt>
          <dd className="mt-3 text-body text-ink-soft">
            Half the emblem’s height on every side of the badge — the dashed line. Nothing else enters it.
          </dd>
        </Panel>
        <Panel className="p-5">
          <dt className="label">Minimum size</dt>
          <dd className="mt-3 flex items-center gap-4 text-body text-ink-soft">
            <Emblem className="size-10 shrink-0 text-ink" />
            <span>Emblem 40px; the badge never under 88px, where its ring still reads.</span>
          </dd>
        </Panel>
        <Panel className="p-5">
          <dt className="label">Colour</dt>
          <dd className="mt-3 text-body text-ink-soft">
            Always one flat colour — ink on light grounds, paper over photographs and olive. Never outlined, never on a gradient.
          </dd>
        </Panel>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <Panel className="divide-y divide-ink/10">
          {VOICE.map((line) => (
            <div key={line.do} className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-8">
              <p className="flex gap-3 text-body">
                <Check className="mt-0.5 size-4 shrink-0 text-deep" strokeWidth={1.5} />
                {line.do}
              </p>
              <p className="flex gap-3 text-body text-ink-soft">
                <X className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
                {line.dont}
              </p>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  )
}

/* ─── Colour ──────────────────────────────────────────────────────────── */

type SwatchSpec = { name: string; token: string; className: string; role: string }

/** Class strings are written out whole so Tailwind generates them. */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Grounds",
    swatches: [
      { name: "Shell", token: "--color-shell", className: "bg-shell", role: "Limestone — the page, the story, the team" },
      { name: "Paper", token: "--color-paper", className: "bg-paper", role: "Type over photographs, cards" },
      { name: "Pale", token: "--color-pale", className: "bg-pale", role: "Sand — the reasons, the residences, the disc" },
    ],
  },
  {
    label: "Olive",
    swatches: [
      { name: "Deep", token: "--color-deep", className: "bg-deep", role: "The arrival, the contact footer, code" },
      { name: "Deep soft", token: "--color-deep-soft", className: "bg-deep-soft", role: "The rings round the arch" },
    ],
  },
  {
    label: "Ink",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Headlines, body, hairlines at 10–20%" },
      { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft", role: "Paragraphs, meta" },
    ],
  },
  {
    label: "Sky grade — the hero only",
    swatches: [
      { name: "Sky", token: "--color-sky", className: "bg-sky", role: "By day, the middle of the sky" },
      { name: "Sky deep", token: "--color-sky-deep", className: "bg-sky-deep", role: "By day, the top of the frame" },
      { name: "Dusk", token: "--color-dusk", className: "bg-dusk", role: "By night, the middle" },
      { name: "Dusk deep", token: "--color-dusk-deep", className: "bg-dusk-deep", role: "By night, the top" },
    ],
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-ink/10 bg-paper">
      <div ref={ref} className={cn("h-24 border-b border-ink/10", className)} />
      <figcaption className="space-y-1 p-4">
        <p className="font-condensed text-[1.6rem] leading-none">{name}</p>
        <p className="text-[0.8125rem] leading-snug text-ink-soft">{role}</p>
        <Value className="pt-2">{token}</Value>
        <Value>
          {value || "—"} · {value ? toHex(value) : "—"}
        </Value>
      </figcaption>
    </figure>
  )
}

const PAIRS = [
  { label: "Ink on shell", className: "bg-shell text-ink", use: "Every light chapter" },
  { label: "Ink soft on shell", className: "bg-shell text-ink-soft", use: "Paragraphs" },
  { label: "Ink on pale", className: "bg-pale text-ink", use: "Reasons, residences" },
  { label: "Ink soft on pale", className: "bg-pale text-ink-soft", use: "Reason copy" },
  { label: "Ink on paper", className: "bg-paper text-ink", use: "The note card" },
  { label: "Shell on deep", className: "bg-deep text-shell", use: "Contact footer, menu" },
  { label: "Paper on ink", className: "bg-ink text-paper", use: "Type over dark photographs" },
  { label: "Paper on sky deep", className: "bg-sky-deep text-paper", use: "The hero by day" },
  { label: "Paper on dusk", className: "bg-dusk text-paper", use: "The hero by night" },
]

export function ContrastPair({ label, className, use }: (typeof PAIRS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-[var(--radius-card)] border border-ink/10 p-5", className)}>
      <div>
        <p className="font-condensed text-[2.6rem] leading-none">Aa</p>
        <p className="label mt-3">{label}</p>
        <p className="mt-1 text-[0.8125rem] opacity-80">{use}</p>
      </div>
      <p className="text-right font-mono text-xs tabular-nums">
        {ratio == null ? "—" : `${ratio.toFixed(2)}:1`}
        <span className="block">{grade}</span>
      </p>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="space-y-12">
      {COLOUR_GROUPS.map((group) => (
        <div key={group.label}>
          <GroupLabel>{group.label}</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.token} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <p className="max-w-[40rem] text-body text-ink-soft">
        There is one theme. The page changes tone as you scroll — photographs carry paper type, light grounds carry
        ink — and the fixed badge and rail follow whichever is underneath (<code className="font-mono text-xs">data-tone</code>).
      </p>
      <div>
        <GroupLabel>Text on ground — WCAG contrast</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
  { name: "Name", className: "font-condensed text-[clamp(4.5rem,10.4vw,12.5rem)] leading-[0.86]", use: "The hero: LUNA / RESIDENCE", sample: "Luna" },
  { name: "Chapter", className: "font-condensed text-[clamp(3.2rem,8.6vw,10.5rem)] leading-[0.85]", use: "Reasons, sea views", sample: "Made to last" },
  { name: "Number", className: "font-condensed text-[clamp(3rem,8vw,9.5rem)] leading-none", use: "The phone number in the footer", sample: "120-480" },
  { name: "Residence", className: "font-condensed text-[clamp(3rem,7vw,8.5rem)] leading-[0.9]", use: "Residence type names", sample: "Penthouse" },
  { name: "Statement", className: "font-condensed text-[clamp(2rem,3.9vw,4.4rem)] leading-[0.95]", use: "The idea, the residences statement", sample: "Shaped around slow mornings" },
  { name: "Quote", className: "font-condensed text-[clamp(1.9rem,2.7vw,3rem)] leading-[1]", use: "The studio’s quote, captions", sample: "Garden paths, not corridors" },
  { name: "Figure", className: "font-condensed text-[2.6rem] leading-none", use: "Bedrooms, area", sample: "188 — 240" },
  { name: "Card title", className: "font-condensed text-[2.4rem]", use: "The note card", sample: "Built in limestone" },
  { name: "Nav", className: "font-condensed text-[1.75rem] leading-[1.05]", use: "Choose a residence", sample: "Choose a residence" },
  { name: "Script", className: "font-script text-[clamp(2.6rem,5vw,4.5rem)] leading-none italic", use: "The one warm word: Altea, yours, live in", sample: "Live in" },
  { name: "Body", className: "text-body", use: "Every paragraph (--text-body)", sample: "Deep terraces and planted pergolas pull the evening breeze through every home." },
  { name: "Small caps", className: "font-sans text-[0.8rem] uppercase tracking-[0.04em]", use: "Buttons, the office line, figure labels", sample: "Explore penthouses" },
  { name: "Label", className: "label", use: "The label utility: eyebrows, captions, legal", sample: "Book a viewing" },
  { name: "Label, spaced", className: "label tracking-[0.3em]", use: "Nav links, the day/night switch", sample: "By night" },
  { name: "Label, wide", className: "label text-[0.8rem] tracking-wide", use: "Under a chapter title (--tracking-wide)", sample: "From every rooftop" },
  { name: "Micro", className: "font-sans text-micro", use: "--text-micro, the label size", sample: "Avenida del Mar 14" },
]

export function TypeSample({ name, className, use, sample }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-ink/10 py-6 last:border-b-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div>
        <p className="label">{name}</p>
        <p className="mt-1 text-[0.8125rem] leading-snug text-ink-soft">{use}</p>
        <Value className="mt-2">
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </Value>
      </div>
      <p ref={ref} className={cn("min-w-0 break-words text-ink", className)}>
        {sample}
      </p>
    </div>
  )
}

function FamilyCard({
  label,
  className,
  name,
  weights,
}: {
  label: string
  className: string
  name: string
  weights: string
}) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <Panel className="min-w-0 overflow-hidden p-6">
      <div ref={ref} className={className}>
        <GroupLabel className="font-sans not-italic">{label}</GroupLabel>
        <p className="text-[clamp(2.4rem,8vw,3.4rem)] leading-none">{name}</p>
        <p className="mt-5 text-[1.1rem] leading-snug break-all text-ink-soft">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz
          <br />
          0123456789 — {weights}
        </p>
      </div>
      <Value className="mt-4">{values["font-family"]}</Value>
    </Panel>
  )
}

export function Typography() {
  return (
    <div className="space-y-12">
      <div className="grid gap-4 lg:grid-cols-3">
        <FamilyCard label="Display — headlines, set in capitals" className="font-display" name="Instrument Serif" weights="400" />
        <FamilyCard label="Script — the warm word" className="font-script italic" name="Instrument Serif" weights="400 italic" />
        <FamilyCard label="Sans — copy and labels" className="font-sans" name="Manrope" weights="400 · 600 · 700" />
      </div>
      <Panel className="p-6">
        <GroupLabel>The condensed cut</GroupLabel>
        <p className="text-body text-ink-soft">
          Every headline uses the <code className="font-mono text-xs">font-condensed</code> utility: the display face,
          uppercase, line-height 0.92 and −0.02em tracking. Sizes are fluid (<code className="font-mono text-xs">clamp()</code>{" "}
          against the window), so the numbers below are what this window gets.
        </p>
      </Panel>
      <div>
        <GroupLabel>Scale</GroupLabel>
        <Panel className="px-5 sm:px-6">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </Panel>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Numerals — tabular</GroupLabel>
          <p className="font-sans text-4xl font-semibold tabular-nums">
            104 — 132
            <br />
            00 → 100
          </p>
          <p className="mt-3 text-[0.8125rem] text-ink-soft">The scroll rail and the carousel counters.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Numerals — display</GroupLabel>
          <p className="font-condensed text-[3.2rem] leading-[0.95]">
            168 — 196 m<sup className="text-[0.5em]">2</sup>
            <br />
            50 min
          </p>
        </Panel>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = [
  { step: "1.5", className: "w-1.5", use: "Dot on the coastline" },
  { step: "3", className: "w-3", use: "Label to label" },
  { step: "5", className: "w-5", use: "Gutter on phones" },
  { step: "6", className: "w-6", use: "Note card padding" },
  { step: "8", className: "w-8", use: "Gutter from sm, figure gaps" },
  { step: "10", className: "w-10", use: "Emblem to headline" },
  { step: "12", className: "w-12", use: "Between figures" },
  { step: "16", className: "w-16", use: "Paragraph after a title" },
  { step: "20", className: "w-20", use: "Before the accordion" },
  { step: "24", className: "w-24", use: "Collage rows" },
  { step: "28", className: "w-28", use: "Top of a light chapter" },
  { step: "36", className: "w-36", use: "Top of the team chapter" },
  { step: "13.5rem", className: "w-[13.5rem]", use: "Container gutter from lg" },
]

export function SpacingStep({ step, className, use }: (typeof SPACING)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[3.5rem_3.5rem_minmax(0,1fr)] items-center gap-3 py-2 sm:grid-cols-[4rem_4rem_minmax(0,1fr)_12rem]">
      <span className="font-mono text-xs text-ink-soft">{step}</span>
      <span className="font-mono text-xs tabular-nums">{values.width}</span>
      <div ref={ref} className={cn("h-2.5 max-w-full bg-deep", className)} />
      <span className="col-span-3 text-[0.8125rem] text-ink-soft sm:col-span-1">{use}</span>
    </li>
  )
}

const RADII = [
  { name: "card", className: "rounded-card", use: "Note card, panels — nearly square" },
  { name: "pill", className: "rounded-pill", use: "The pill button" },
  { name: "full", className: "rounded-full", use: "Circle links, points, the disc" },
  { name: "arch", className: "rounded-t-full", use: "The arch the hero opens through" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure>
      <div ref={ref} className={cn("h-24 border border-ink/20 bg-paper", className)} />
      <figcaption className="mt-3">
        <span className="label">{name}</span>
        <Value>{values["border-top-left-radius"]}</Value>
        <span className="block text-[0.8125rem] text-ink-soft">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "Card", className: "shadow-card", use: "The note card — the one floating surface" },
  { name: "None", className: "shadow-none", use: "Everything else: the page is flat" },
]

export function ShadowSample({ name, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure>
      <div ref={ref} className={cn("h-28 rounded-card bg-shell", className)} />
      <figcaption className="mt-4">
        <span className="label">{name}</span>
        <span className="block text-[0.8125rem] text-ink-soft">{use}</span>
        <Value className="mt-1">{values["box-shadow"]}</Value>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-ink/10", use: "Inside the note card, panels", ground: "bg-paper" },
  { name: "Track", className: "border-b border-ink/20", use: "Progress tracks under carousels", ground: "bg-pale" },
  { name: "Current", className: "border border-current text-ink", use: "The pill button, in whatever colour it sits", ground: "bg-shell" },
  { name: "Arch rings", className: "border border-b-0 border-deep-soft rounded-t-full", use: "Round the arch while it waits", ground: "bg-deep" },
  { name: "On photographs", className: "border border-paper/80", use: "The pulsing points", ground: "bg-ink" },
  { name: "Clear space", className: "border border-dashed border-deep-soft/40", use: "Guides only, never shipped", ground: "bg-shell" },
]

export function BorderSample({ name, className, use, ground }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-width", "border-top-color", "border-top-style", "border-bottom-color"])
  const color = values["border-top-style"] === "none" ? values["border-bottom-color"] : values["border-top-color"]
  return (
    <figure>
      <div className={cn("flex h-20 items-end p-3", ground)}>
        <div ref={ref} className={cn("h-full w-full", className)} />
      </div>
      <figcaption className="mt-3">
        <span className="label">{name}</span>
        <span className="block text-[0.8125rem] text-ink-soft">{use}</span>
        <Value className="mt-1">
          {values["border-top-style"] === "none" ? "bottom only" : `${values["border-top-width"]} ${values["border-top-style"]}`} · {color}
        </Value>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-14">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div>
          <GroupLabel>Spacing — Tailwind’s 4px steps, used generously</GroupLabel>
          <Panel className="px-5 py-3">
            <ul>
              {SPACING.map((step) => (
                <SpacingStep key={step.step} {...step} />
              ))}
            </ul>
          </Panel>
          <p className="mt-4 max-w-[36rem] text-body text-ink-soft">
            Chapters are measured in the window, not in pixels: pinned sections run 180–300vh, full screens are 100svh,
            and headlines sit 5–20vh from the top. Lots of empty limestone is the point.
          </p>
        </div>
        <div>
          <GroupLabel>Radii</GroupLabel>
          <div className="grid grid-cols-2 gap-5">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid gap-8 rounded-card bg-pale p-6 sm:grid-cols-2 sm:p-10">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BORDERS.map((border) => (
            <BorderSample key={border.name} {...border} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

type Frames = Keyframe[]
type Step = { frames: Frames; duration: number; easing: "out" | "reveal" | "standard" | "linear"; delay?: number }

const EASING_CLASS = { out: "ease-out-soft", reveal: "ease-in-out-reveal", standard: "ease-standard", linear: "ease-linear" } as const

/** The three easing tokens, read off elements that use them. */
function useEasings() {
  const [outRef, out] = useComputed<HTMLSpanElement>(["transition-timing-function"])
  const [revealRef, reveal] = useComputed<HTMLSpanElement>(["transition-timing-function"])
  const [standardRef, standard] = useComputed<HTMLSpanElement>(["transition-timing-function"])
  const probes = (
    <span aria-hidden="true" className="hidden">
      <span ref={outRef} className={EASING_CLASS.out} />
      <span ref={revealRef} className={EASING_CLASS.reveal} />
      <span ref={standardRef} className={EASING_CLASS.standard} />
    </span>
  )
  const easings = {
    out: out["transition-timing-function"] || "ease-out",
    reveal: reveal["transition-timing-function"] || "ease-in-out",
    standard: standard["transition-timing-function"] || "ease",
    linear: "linear",
  }
  return { probes, easings }
}

type Demo = {
  name: string
  where: string
  shape: "letters" | "arch" | "script" | "panel" | "ring" | "disc"
  steps: (index: number) => Step[]
}

const s = (seconds: number) => Math.round(seconds * 1000)

const DEMOS: Demo[] = [
  {
    name: "Letters settle",
    where: "Every headline — StretchText",
    shape: "letters",
    steps: (i) => [
      {
        frames: [
          { opacity: 0, transform: "translateY(-0.18em) scaleY(2.2)", filter: "blur(6px)" },
          { opacity: 1, transform: "translateY(0) scaleY(1)", filter: "blur(0px)" },
        ],
        duration: s(DURATION.letter),
        easing: "out",
        delay: s(i * DURATION.letterStagger),
      },
    ],
  },
  {
    name: "Arch rises, then opens",
    where: "The arrival — Hero",
    shape: "arch",
    steps: () => [
      { frames: [{ clipPath: archPath(30, 100, 15) }, { clipPath: archPath(30, 22, 15) }], duration: s(DURATION.archRise), easing: "out" },
      {
        frames: [{ clipPath: archPath(30, 22, 15) }, { clipPath: archPath(100, 0, 0) }],
        duration: s(DURATION.archOpen),
        easing: "reveal",
        delay: s(DURATION.archHold),
      },
    ],
  },
  {
    name: "Script writes on",
    where: "Altea, yours, live in — ScriptReveal",
    shape: "script",
    steps: () => [
      {
        frames: [
          { clipPath: "inset(-20% 100% -40% -10%)", opacity: 0.2 },
          { clipPath: "inset(-20% -10% -40% -10%)", opacity: 1 },
        ],
        duration: s(DURATION.script),
        easing: "out",
      },
    ],
  },
  {
    name: "Note card arrives",
    where: "The gardens’ points — Popover",
    shape: "panel",
    steps: () => [
      {
        frames: [
          { opacity: 0, transform: "translateY(8px)", filter: "blur(4px)" },
          { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
        ],
        duration: 450,
        easing: "out",
      },
    ],
  },
  {
    name: "Point pulses",
    where: "Pinned to the photograph — animate-pulse-ring",
    shape: "ring",
    steps: () => [
      {
        frames: [
          { transform: "scale(0.6)", opacity: 0.9 },
          { transform: "scale(1.9)", opacity: 0 },
        ],
        duration: 2400,
        easing: "out",
      },
    ],
  },
  {
    name: "Disc rises",
    where: "Between chapters — CircleReveal, scrubbed by scroll",
    shape: "disc",
    steps: () => [
      { frames: [{ top: "100%" }, { top: "42%" }], duration: 900, easing: "linear" },
      { frames: [{ top: "42%" }, { top: "-60%" }], duration: 700, easing: "linear" },
    ],
  },
]

/** Plays one of the page's motions on a sample, through the Web Animations API
 *  — so the editor's Motion switch stops and reduces it like the page's own. */
function MotionSample({ demo, easings }: { demo: Demo; easings: Record<Step["easing"], string> }) {
  const stage = useRef<HTMLDivElement>(null)
  const play = async () => {
    const root = stage.current
    if (!root) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-play]"))
    for (const [i, target] of targets.entries()) {
      target.getAnimations().forEach((animation) => animation.cancel())
      const steps = demo.steps(i)
      if (reduced) {
        const last = steps[steps.length - 1].frames
        target.animate([last[last.length - 1], last[last.length - 1]], { duration: 1 })
        continue
      }
      ;(async () => {
        for (const step of steps) {
          const animation = target.animate(step.frames, {
            duration: step.duration,
            delay: step.delay ?? 0,
            easing: easings[step.easing],
            fill: "both",
          })
          try {
            await animation.finished
          } catch {
            return
          }
        }
        target.getAnimations().forEach((animation) => animation.cancel())
      })()
    }
  }

  const total = demo.steps(0).reduce((sum, step) => sum + step.duration + (step.delay ?? 0), 0)
  const curves = Array.from(new Set(demo.steps(0).map((step) => easings[step.easing])))

  return (
    <Panel className="flex flex-col p-5">
      <div ref={stage} className="relative flex h-32 items-center justify-center overflow-hidden bg-shell">
        {demo.shape === "letters" && (
          <p className="font-condensed text-[3.4rem] leading-none" aria-label="Luna">
            {Array.from("LUNA").map((char) => (
              <span key={char} data-play className="inline-block origin-top">
                {char}
              </span>
            ))}
          </p>
        )}
        {demo.shape === "arch" && (
          <div className="absolute inset-0 bg-deep">
            <img data-play src={hero.image} alt="" className="size-full object-cover object-top" style={{ clipPath: archPath(100, 0, 0) }} />
          </div>
        )}
        {demo.shape === "script" && (
          <span data-play className="font-script text-[3.4rem] leading-none italic">
            {brand.town}
          </span>
        )}
        {demo.shape === "panel" && (
          <div data-play className="w-40 rounded-card bg-paper p-1 shadow-card">
            <div className="border border-ink/10 p-3 font-condensed text-lg leading-none">Light &amp; air</div>
          </div>
        )}
        {demo.shape === "ring" && (
          <span className="relative grid size-11 place-items-center rounded-full bg-ink">
            <span data-play className="absolute inset-1 rounded-full border border-paper/70" />
            <span className="relative grid size-7 place-items-center rounded-full border border-paper/80 text-paper">
              <Plus className="size-3.5" strokeWidth={1.5} />
            </span>
          </span>
        )}
        {demo.shape === "disc" && (
          <div className="absolute inset-0 bg-ink">
            <div data-play className="absolute top-[-60%] left-1/2 aspect-square w-[200%] -translate-x-1/2 rounded-full bg-pale" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-condensed text-[1.6rem] leading-none">{demo.name}</p>
          <p className="mt-1 text-[0.8125rem] text-ink-soft">{demo.where}</p>
          <Value className="mt-2">
            {total}ms · {curves.join(" → ")}
          </Value>
        </div>
        <button
          type="button"
          onClick={play}
          className="label inline-flex h-11 shrink-0 items-center rounded-pill border border-current px-5 transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-soft)] hover:bg-ink hover:text-pale focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.97]"
        >
          Play
        </button>
      </div>
    </Panel>
  )
}

export function Motion() {
  const { probes, easings } = useEasings()
  const [outRef, out] = useComputed<HTMLSpanElement>(["--animate-accordion-down", "--animate-accordion-up", "--animate-pulse-ring"])
  return (
    <div className="space-y-10">
      {probes}
      <div>
        <GroupLabel>Easings</GroupLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {(
            [
              ["--ease-out-soft", "out", "Almost everything: a fast start that settles long"],
              ["--ease-in-out-reveal", "reveal", "The arch opening out to the window"],
              ["--ease-standard", "standard", "Plain colour and opacity changes"],
            ] as const
          ).map(([token, key, use]) => (
            <Panel key={token} className="p-5">
              <p className="label">{token}</p>
              <Value className="mt-2">{easings[key]}</Value>
              <p className="mt-2 text-[0.8125rem] text-ink-soft">{use}</p>
            </Panel>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DEMOS.map((demo) => (
          <MotionSample key={demo.name} demo={demo} easings={easings} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="p-5">
          <p className="label">Durations</p>
          <Value className="mt-2">
            letter {s(DURATION.letter)}ms · stagger {s(DURATION.letterStagger)}ms · arch {s(DURATION.archRise)} + hold{" "}
            {s(DURATION.archHold)} + open {s(DURATION.archOpen)}ms · script {s(DURATION.script)}ms
          </Value>
          <span ref={outRef} className="hidden" />
          <Value className="mt-1">accordion {out["--animate-accordion-down"]} / {out["--animate-accordion-up"]}</Value>
          <Value>pulse {out["--animate-pulse-ring"]}</Value>
          <p className="mt-2 text-[0.8125rem] text-ink-soft">
            From <code className="font-mono text-xs">DURATION</code> in <code className="font-mono text-xs">components/motion.tsx</code> and
            the <code className="font-mono text-xs">--animate-*</code> tokens.
          </p>
        </Panel>
        <Panel className="p-5">
          <p className="label">Scroll, and reduced motion</p>
          <p className="mt-2 text-body text-ink-soft">
            Lenis carries the scroll — a heavy, slow-settling glide (lerp {0.075}), held in a ref so the editor can
            pause it. Every parallax, disc and letter reads <code className="font-mono text-xs">prefers-reduced-motion</code>{" "}
            and holds still when it is set; so do the samples above.
          </p>
        </Panel>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS: [string, ComponentType<{ className?: string; strokeWidth?: number }>, number][] = [
  ["Menu", Menu, 1.5],
  ["Plus", Plus, 1.5],
  ["X", X, 1.5],
  ["ChevronLeft", ChevronLeft, 1.5],
  ["ChevronRight", ChevronRight, 1.5],
  ["ArrowUp", ArrowUp, 1.5],
  ["ArrowDown", ArrowDown, 1],
  ["Check", Check, 1.5],
  ["Copy", Copy, 1.5],
]

export function Iconography() {
  const [mode, setMode] = useState<"day" | "night">("day")
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel className="p-6">
        <GroupLabel>Icons — Lucide, hairline</GroupLabel>
        <div className="flex flex-wrap gap-3">
          {ICONS.map(([name, Icon, stroke]) => (
            <span key={name} title={name} className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink">
              <Icon className="size-4" strokeWidth={stroke} />
            </span>
          ))}
          <span title="Emblem" className="grid size-11 place-items-center rounded-full bg-deep text-shell">
            <Emblem className="size-7" />
          </span>
        </div>
        <p className="mt-5 text-body text-ink-soft">
          Lucide at 16px with a 1.5 stroke (1 on the scroll rail), always in{" "}
          <code className="font-mono text-xs">currentColor</code>, usually in a 44px circle. The emblem is the only drawn
          ornament; it marks the end of a chapter and the place on the map.
        </p>
      </Panel>
      <Panel className="p-6">
        <GroupLabel>Photography — graded, never boxed</GroupLabel>
        <div className="relative h-56 overflow-hidden bg-deep">
          <img src={hero.image} alt="The house and its palm, graded for the hero" loading="lazy" className="absolute inset-0 size-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-deep via-sky/70 via-45% to-transparent to-75% mix-blend-multiply" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-dusk-deep via-dusk to-dusk/60 mix-blend-multiply"
            initial={false}
            animate={{ opacity: mode === "night" ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
          />
          <div className="absolute inset-x-0 bottom-3 flex justify-center text-paper">
            <DayNight mode={mode} onChange={setMode} />
          </div>
        </div>
        <p className="mt-5 text-body text-ink-soft">
          Real photographs from Pexels, credited in the footer: full-bleed, drifting against the scroll, with ink
          gradients for legibility and the sky/dusk grade on the hero. Bougainvillea sprays are multiplied into light
          grounds (see Bloom below). No rounded photo cards, no illustrations.
        </p>
      </Panel>
    </div>
  )
}
