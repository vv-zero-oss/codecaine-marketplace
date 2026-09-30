import { ArrowLeft, ArrowRight, Check, ChevronDown, Copy, Menu, X } from "lucide-react"
import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { GroupLabel } from "@/components/brand/specimen"
import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { Photo } from "@/components/photo"
import { Button } from "@/components/ui/button"
import { photo, studio } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

/** The name set as the header sets it, without the link — for the samples. */
function Signature({ className, taglineClassName }: { className?: string; taglineClassName?: string }) {
  return (
    <span className={cn("leading-none", className)}>
      <span className="block font-display text-2xl tracking-tight">{studio.name}</span>
      <span className={cn("mt-1 block text-[10px] tracking-[0.32em] uppercase", taglineClassName ?? "text-ink-400")}>
        {studio.tagline}
      </span>
    </span>
  )
}

const VOICE = [
  {
    do: "Say what happened, plainly: “A fog that lifted exactly at the vows.”",
    dont: "Reach for the brochure: “Timeless, magical memories to treasure forever.”",
  },
  { do: "First person, one photographer: “I’ll reply within two working days.”", dont: "A studio voice: “Our team of passionate creatives…”" },
  { do: "Name the place and the year under every story.", dont: "Exclamation marks, emoji, “stunning”." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <GroupLabel>On paper</GroupLabel>
        <div className="flex h-52 items-center justify-center border border-ink/10 bg-paper">
          {/* Clear space: the cap height of the name on every side, drawn. */}
          <div className="p-6 outline-1 outline-accent/40 outline-dashed">
            <Signature />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>On ink</GroupLabel>
        <div className="flex h-52 items-center justify-center bg-ink text-paper">
          <div className="p-6 outline-1 outline-paper/25 outline-dashed">
            <Signature taglineClassName="text-paper/60" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <GroupLabel>Over a photograph</GroupLabel>
        <div className="relative h-56 overflow-hidden bg-ink">
          <img src={photo("hero-a", 1600, 700)} alt="" className="absolute inset-0 size-full object-cover opacity-70" />
          <div className="absolute inset-0 flex items-center justify-center text-paper">
            <Signature className="scale-125" taglineClassName="text-paper/75" />
          </div>
        </div>
        <p className="mt-3 text-sm text-ink-600">Only on a dark, quiet part of the frame, in paper — never over a face.</p>
      </div>
      <dl className="grid gap-px border border-ink/10 bg-ink/10 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="bg-paper p-6">
          <dt className="text-xs tracking-[0.2em] text-ink-400 uppercase">Clear space</dt>
          <dd className="mt-3 leading-relaxed text-ink-600">The height of the name on every side — the dashed box.</dd>
        </div>
        <div className="bg-paper p-6">
          <dt className="text-xs tracking-[0.2em] text-ink-400 uppercase">Minimum size</dt>
          <dd className="mt-3 flex items-center gap-4 text-ink-600">
            <span className="leading-none">
              <span className="block font-display text-base tracking-tight text-ink">{studio.name}</span>
            </span>
            <span>16px name; drop the tagline below 20px.</span>
          </dd>
        </div>
        <div className="bg-paper p-6">
          <dt className="text-xs tracking-[0.2em] text-ink-400 uppercase">Monogram</dt>
          <dd className="mt-3 flex items-center gap-4 text-ink-600">
            <span className="flex size-10 shrink-0 items-center justify-center bg-ink font-display text-xl text-paper">ME</span>
            <span>Favicon and avatars. Square, paper on ink.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="border-t border-ink/15">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-3 border-b border-ink/15 py-6 md:grid-cols-2 md:gap-10">
              <p className="flex gap-3 leading-relaxed">
                <Check className="mt-1 size-4 shrink-0 text-accent" />
                {line.do}
              </p>
              <p className="flex gap-3 leading-relaxed text-ink-400">
                <X className="mt-1 size-4 shrink-0" />
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

/** Class strings are written out whole so Tailwind generates them. */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface",
    swatches: [
      { name: "Paper", token: "--color-paper", className: "bg-paper", role: "Page, cards, the light button" },
      { name: "Paper 200", token: "--color-paper-200", className: "bg-paper-200", role: "Photo frames while loading, light hover" },
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "The call to book, featured package" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Headlines, body, active nav" },
      { name: "Ink 600", token: "--color-ink-600", className: "bg-ink-600", role: "Paragraphs, footer links" },
      { name: "Ink 400", token: "--color-ink-400", className: "bg-ink-400", role: "Eyebrows, captions, idle nav" },
    ],
  },
  {
    label: "Border — ink at an opacity",
    swatches: [
      { name: "Ink / 10", token: "--color-ink @ 10%", className: "bg-ink/10", role: "Header, footer, press strip" },
      { name: "Ink / 15", token: "--color-ink @ 15%", className: "bg-ink/15", role: "Cards, facts, testimonials" },
      { name: "Ink / 25", token: "--color-ink @ 25%", className: "bg-ink/25", role: "Outline button, form fields" },
    ],
  },
  {
    label: "Accent",
    swatches: [{ name: "Accent", token: "--color-accent", className: "bg-accent", role: "The one italic word, ticks, focus ring" }],
  },
  {
    label: "From Tailwind’s palette — the accordion",
    swatches: [
      { name: "Stone 200", token: "--color-stone-200", className: "bg-stone-200", role: "FAQ dividers" },
      { name: "Stone 400", token: "--color-stone-400", className: "bg-stone-400", role: "FAQ chevron" },
      { name: "Stone 600", token: "--color-stone-600", className: "bg-stone-600", role: "FAQ answers" },
    ],
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="m-0">
      <div ref={ref} className={cn("h-24 border border-ink/10", className)} />
      <figcaption className="mt-3 space-y-0.5 text-sm">
        <p className="font-display text-xl leading-tight">{name}</p>
        <p className="text-ink-600">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-ink-400">{token}</p>
        <p className="font-mono text-[11px] break-all text-ink-400">
          {value ? toHex(value) : "—"} · {value || "—"}
        </p>
      </figcaption>
    </figure>
  )
}

export function ColourTokens() {
  return (
    <div className="space-y-14">
      {COLOUR_GROUPS.map((group) => (
        <div key={group.label}>
          <GroupLabel>{group.label}</GroupLabel>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3">
            {group.swatches.map((swatch) => (
              <Swatch key={`${group.label}${swatch.token}`} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <p className="max-w-2xl text-sm leading-relaxed text-ink-600">
        One light theme, on purpose: the photographs carry the colour, and warm paper flatters them more than a dark
        page would. There is no dark mode to document.
      </p>
      <div>
        <GroupLabel>Text on surface — WCAG contrast</GroupLabel>
        <div className="grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          <ContrastPair label="Ink on paper" className="bg-paper text-ink" />
          <ContrastPair label="Ink 600 on paper" className="bg-paper text-ink-600" />
          <ContrastPair label="Ink 400 on paper" className="bg-paper text-ink-400" />
          <ContrastPair label="Accent on paper" className="bg-paper text-accent" />
          <ContrastPair label="Ink on paper 200" className="bg-paper-200 text-ink" />
          <ContrastPair label="Stone 600 on paper" className="bg-paper text-stone-600" />
          <ContrastPair label="Paper on ink" className="bg-ink text-paper" />
          <ContrastPair label="Paper / 75 on ink" className="bg-ink text-paper/75" />
          <ContrastPair label="Paper / 60 on ink" className="bg-ink text-paper/60" />
        </div>
      </div>
    </div>
  )
}

/** Paper / 75 is a translucent colour: its contrast is read against what it
 *  sits on, so the text colour is painted over the background first and the
 *  pixel that results is what gets measured. */
let canvas: CanvasRenderingContext2D | null = null
function composite(foreground: string, background: string) {
  if (!foreground || !background) return foreground
  canvas ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true })
  if (!canvas) return foreground
  canvas.clearRect(0, 0, 1, 1)
  canvas.fillStyle = background
  canvas.fillRect(0, 0, 1, 1)
  canvas.fillStyle = foreground
  canvas.fillRect(0, 0, 1, 1)
  const [r, g, b] = canvas.getImageData(0, 0, 1, 1).data
  return `rgb(${r}, ${g}, ${b})`
}

export function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const background = values["background-color"] ?? ""
  const ratio = contrast(composite(values.color ?? "", background), background)
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 p-6", className)}>
      <div>
        <p className="font-display text-4xl leading-none">Aa</p>
        <p className="mt-2 text-sm">{label}</p>
      </div>
      <p className="text-right font-mono text-xs tabular-nums">
        {ratio == null ? "—" : `${ratio.toFixed(2)}:1`}
        <span className="block">{grade}</span>
      </p>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const TYPE_SCALE = [
  { name: "Display", className: "font-display text-8xl leading-[0.95] tracking-tight", use: "Home headline (md and up)" },
  { name: "Title", className: "font-display text-7xl leading-none", use: "A gallery’s title (md and up)" },
  { name: "Page title", className: "font-display text-6xl leading-[0.95]", use: "About, contact, phone headlines" },
  { name: "Section", className: "font-display text-5xl leading-[1.05]", use: "Section headings, prices, facts, the call to book" },
  { name: "Section, small", className: "font-display text-4xl leading-[1.05]", use: "Section headings on phones, “Thank you.”" },
  { name: "Footer name", className: "font-display text-3xl", use: "The name in the footer" },
  { name: "Card title", className: "font-display text-2xl", use: "Gallery cards, FAQ questions, the wordmark" },
  { name: "Quote", className: "font-display text-2xl leading-snug italic", use: "Testimonials" },
  { name: "Press", className: "font-display text-xl italic", use: "The press strip" },
  { name: "Body", className: "leading-relaxed", use: "Paragraphs" },
  { name: "Small", className: "text-sm", use: "Footer, package details, contact details" },
  { name: "Label", className: "text-xs uppercase tracking-[0.2em]", use: "Nav, captions, card meta, field labels" },
  { name: "Button", className: "text-xs font-medium uppercase tracking-[0.18em]", use: "Every button and filter" },
  { name: "Eyebrow", className: "text-[11px] font-medium uppercase tracking-[0.28em]", use: "Above every heading" },
  { name: "Tagline", className: "text-[10px] uppercase tracking-[0.32em]", use: "Under the name in the header" },
]

export function TypeSample({ name, className, use }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-ink/10 py-7 last:border-b-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
      <div className="text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-ink-600">{use}</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-400 tabular-nums">
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </p>
      </div>
      <p ref={ref} className={cn("min-w-0 break-words", className)}>
        Quiet photographs of loud days
      </p>
    </div>
  )
}

export function Typography() {
  const [display, displayValues] = useComputed<HTMLDivElement>(["font-family"])
  const [sans, sansValues] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <div className="space-y-14">
      <div className="grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-2">
        <div ref={display} className="min-w-0 bg-paper p-6 font-display md:p-8">
          <GroupLabel>Display — headlines, names, prices</GroupLabel>
          <p className="text-5xl leading-none tracking-tight md:text-6xl">Cormorant Garamond</p>
          <p className="mt-6 text-xl break-all text-ink-600">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz · <em>italic</em>
            <br />
            0123456789 — 400 · 500 · 600
          </p>
          <p className="mt-6 font-mono text-[11px] break-all text-ink-400">{displayValues["font-family"]}</p>
        </div>
        <div ref={sans} className="min-w-0 bg-paper p-6 md:p-8">
          <GroupLabel>Sans — reading and labels</GroupLabel>
          <p className="text-5xl leading-none font-medium tracking-tight">Inter</p>
          <p className="mt-6 break-all text-ink-600">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            <span className="tabular-nums">0123456789</span> — 400 · 500 · 600
          </p>
          <p className="mt-6 font-mono text-[11px] break-all text-ink-400">{sansValues["font-family"]}</p>
        </div>
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        <div className="border-t border-ink/10">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2">
        <div className="bg-paper p-8">
          <GroupLabel>Numerals — display, for facts and prices</GroupLabel>
          <p className="font-display text-5xl">240+ · €3,400</p>
        </div>
        <div className="bg-paper p-8">
          <GroupLabel>Numerals — sans, tabular, for dates</GroupLabel>
          <p className="text-3xl font-medium tracking-tight tabular-nums">2026 · 09 · 30</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = [
  { step: "2", className: "w-2", use: "Filter chips" },
  { step: "3", className: "w-3", use: "Icon to label, footer links" },
  { step: "4", className: "w-4", use: "Hero photo gap, buttons" },
  { step: "6", className: "w-6", use: "Container edge (phone), gallery grid" },
  { step: "8", className: "w-8", use: "Card padding, gallery card gap" },
  { step: "10", className: "w-10", use: "Container edge (md), nav gap" },
  { step: "12", className: "w-12", use: "Section heading to filter" },
  { step: "14", className: "w-14", use: "Heading to grid" },
  { step: "16", className: "w-16", use: "Footer padding, grid rows" },
  { step: "20", className: "w-20", use: "Header height, page top" },
  { step: "24", className: "w-24", use: "Call to book padding" },
  { step: "28", className: "w-28", use: "Section rhythm" },
  { step: "32", className: "w-32", use: "Section rhythm, footer top" },
]

export function SpacingStep({ step, className, use }: (typeof SPACING)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[2.5rem_3.5rem_minmax(0,1fr)] items-center gap-3 border-b border-ink/10 py-2.5 text-sm">
      <span className="font-mono text-xs text-ink-400">{step}</span>
      <span className="font-mono text-xs text-ink-600 tabular-nums">{values.width}</span>
      <span className="flex min-w-0 items-center gap-3">
        <span ref={ref} className={cn("h-2.5 shrink-0 bg-accent/70", className)} />
        <span className="truncate text-ink-600">{use}</span>
      </span>
    </li>
  )
}

function Measured({ className, properties, children }: { className: string; properties: string[]; children: (values: Record<string, string>) => ReactNode }) {
  const [ref, values] = useComputed<HTMLDivElement>(properties)
  return (
    <>
      <div ref={ref} className={className} />
      {children(values)}
    </>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border-b border-ink/10", use: "Header, footer, press strip, guide chapters" },
  { name: "Card", className: "border-b border-ink/15", use: "Package cards, facts, testimonials" },
  { name: "Field", className: "border-b border-ink/25", use: "Form fields, outline button" },
  { name: "Solid", className: "border-b border-ink", use: "Focused field, active filter, featured package" },
  { name: "Accordion", className: "border-b border-stone-200", use: "FAQ dividers" },
]

export function SpaceAndSurface() {
  const [container, containerValues] = useComputed<HTMLDivElement>(["max-width", "padding-left"])
  return (
    <div className="space-y-14">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <GroupLabel>Spacing — Tailwind’s 4px steps</GroupLabel>
          <ul className="border-t border-ink/10">
            {SPACING.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
        </div>
        <div className="space-y-10">
          <div>
            <GroupLabel>The container</GroupLabel>
            <div ref={container} className="mx-auto w-full max-w-7xl px-6 md:px-10">
              <div className="h-12 bg-paper-200" />
            </div>
            <p className="mt-3 font-mono text-[11px] text-ink-400">
              max-width {containerValues["max-width"]} · side padding {containerValues["padding-left"]} (24px on phones,
              40px from md)
            </p>
          </div>
          <div>
            <GroupLabel>Radii — none</GroupLabel>
            <div className="flex items-end gap-6">
              <Measured className="size-24 border border-ink/15 bg-paper-200" properties={["border-top-left-radius"]}>
                {(values) => (
                  <p className="text-sm text-ink-600">
                    Every corner is square — photographs, buttons, cards, fields.{" "}
                    <span className="font-mono text-[11px] text-ink-400">{values["border-top-left-radius"]}</span>
                  </p>
                )}
              </Measured>
            </div>
          </div>
          <div>
            <GroupLabel>Shadows — none</GroupLabel>
            <div className="flex items-end gap-6">
              <Measured className="size-24 shrink-0 border border-ink/15 bg-paper" properties={["box-shadow"]}>
                {(values) => (
                  <p className="text-sm text-ink-600">
                    Nothing floats. Weight comes from a filled ink block or a darker border, never a shadow.{" "}
                    <span className="font-mono text-[11px] text-ink-400">{values["box-shadow"]}</span>
                  </p>
                )}
              </Measured>
            </div>
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Borders — one pixel, ink at an opacity</GroupLabel>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {BORDERS.map((border) => (
            <BorderSample key={border.name} {...border} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-bottom-width", "border-bottom-style", "border-bottom-color"])
  return (
    <figure className="m-0 text-sm">
      <div ref={ref} className={cn("h-12", className)} />
      <figcaption className="mt-3">
        <span className="font-medium">{name}</span>
        <span className="block text-ink-600">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-400">
          {values["border-bottom-width"]} {values["border-bottom-style"]} {values["border-bottom-color"]}
        </span>
      </figcaption>
    </figure>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

type MotionSpec = {
  name: string
  where: string
  /** Read at play time: a `--animate-*` shorthand, or Tailwind's default transition. */
  source: "--animate-accordion-down" | "--animate-accordion-up" | "default" | "700ms ease-out" | "200ms"
  keyframes: Keyframe[]
  sample: "bar" | "photo" | "chevron"
}

const MOTION: MotionSpec[] = [
  {
    name: "Colour change",
    where: "Buttons, nav, links, fields",
    source: "default",
    keyframes: [{ backgroundColor: "--color-ink" }, { backgroundColor: "--color-ink-600" }],
    sample: "bar",
  },
  {
    name: "Accordion open",
    where: "FAQ answers",
    source: "--animate-accordion-down",
    keyframes: [{ transform: "scaleY(0.1)" }, { transform: "scaleY(1)" }],
    sample: "bar",
  },
  {
    name: "Accordion close",
    where: "FAQ answers",
    source: "--animate-accordion-up",
    keyframes: [{ transform: "scaleY(1)" }, { transform: "scaleY(0.1)" }],
    sample: "bar",
  },
  {
    name: "Photo drift",
    where: "A gallery card’s cover on hover",
    source: "700ms ease-out",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }],
    sample: "photo",
  },
  {
    name: "Chevron turn",
    where: "The FAQ chevron",
    source: "200ms",
    keyframes: [{ transform: "rotate(0deg)" }, { transform: "rotate(180deg)" }],
    sample: "chevron",
  },
]

function readToken(value: string) {
  return value.startsWith("--") ? getComputedStyle(document.documentElement).getPropertyValue(value).trim() : value
}

function resolve(source: MotionSpec["source"]) {
  let text: string = source
  if (source === "default") {
    text = `${readToken("--default-transition-duration")} ${readToken("--default-transition-timing-function")}`
  } else if (source === "200ms") {
    text = `200ms ${readToken("--default-transition-timing-function")}`
  } else if (source.startsWith("--")) {
    text = readToken(source)
  }
  const time = /(\d+(?:\.\d+)?)(ms|s)\b/.exec(text)
  const duration = time ? Number(time[1]) * (time[2] === "s" ? 1000 : 1) : 200
  const easing = /cubic-bezier\([^)]*\)|ease-in-out|ease-out|ease-in|linear|ease/.exec(text)?.[0] ?? "ease"
  return { duration, easing, printed: source.startsWith("--") ? `${source}: ${text}` : text }
}

/** Plays one of the site's motions on a sample, through the Web Animations API
 *  — so the editor's Motion switch stops and reduces it like the site's own. */
export function MotionSample({ name, where, source, keyframes, sample }: MotionSpec) {
  const target = useRef<HTMLDivElement>(null)
  const [printed, setPrinted] = useState("")
  useLayoutEffect(() => setPrinted(resolve(source).printed), [source])
  const play = () => {
    const element = target.current
    if (!element) return
    const { duration, easing } = resolve(source)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.getAnimations().forEach((animation) => animation.cancel())
    const frames = keyframes.map((frame) =>
      Object.fromEntries(Object.entries(frame).map(([key, value]) => [key, typeof value === "string" ? readToken(value) : value])),
    )
    element.animate(frames, { duration: reduced ? 1 : sample === "photo" ? duration * 2 : duration, easing, fill: "none" })
  }
  return (
    <div className="flex flex-col border border-ink/15">
      <div className="flex h-32 items-center justify-center overflow-hidden bg-paper-200">
        {sample === "bar" && <div ref={target} className="mx-6 h-16 w-full origin-top bg-ink" />}
        {sample === "photo" && (
          <div ref={target} className="size-full">
            <img src={photo("sintra-cover", 600, 400)} alt="" className="size-full object-cover" />
          </div>
        )}
        {sample === "chevron" && (
          <div ref={target}>
            <ChevronDown className="size-8 text-stone-400" />
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-4 p-5 text-sm">
        <div className="min-w-0">
          <p className="font-display text-xl leading-tight">{name}</p>
          <p className="text-ink-600">{where}</p>
          <p className="mt-1 font-mono text-[11px] break-all text-ink-400">{printed}</p>
        </div>
        <Button variant="outline" size="sm" onClick={play} className="shrink-0">
          Play
        </Button>
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-ink-600">
        Motion is kept almost out of sight: colour changes, a slow drift on a cover, an answer unfolding. No scroll
        effects and no entrances — the photographs should hold still. The drift plays here out and back at twice its
        700ms. Reduced motion collapses every sample to a single frame.
      </p>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [
  { Icon: ArrowRight, name: "ArrowRight", use: "Onward: next story, call to book" },
  { Icon: ArrowLeft, name: "ArrowLeft", use: "Back to the portfolio" },
  { Icon: Check, name: "Check", use: "Package inclusions, in accent" },
  { Icon: ChevronDown, name: "ChevronDown", use: "FAQ" },
  { Icon: Menu, name: "Menu", use: "Phone menu" },
  { Icon: X, name: "X", use: "Close the menu" },
  { Icon: Copy, name: "Copy", use: "This guide’s snippets" },
]

export function Iconography() {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <GroupLabel>Icons — Lucide, 16–20px, default stroke</GroupLabel>
        <ul className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {ICONS.map(({ Icon, name, use }) => (
            <li key={name} className="flex flex-col gap-3 bg-paper p-5">
              <Icon className="size-5" />
              <span className="text-xs tracking-[0.2em] uppercase">{name}</span>
              <span className="text-xs leading-relaxed text-ink-600">{use}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-ink-600">
          Few, small and functional — an icon only where it points somewhere or ticks something off. In buttons they
          sit after the label at 16px.
        </p>
      </div>
      <div>
        <GroupLabel>Imagery — the frame holds the ratio</GroupLabel>
        <div className="grid grid-cols-2 items-end gap-3 sm:grid-cols-[1fr_1fr_1fr_1.5fr]">
          {(["portrait", "tall", "square", "landscape"] as const).map((ratio) => (
            <figure key={ratio} className="m-0">
              <Photo src={photo(`guide-${ratio}`, 600, 600)} alt="" ratio={ratio} />
              <figcaption className="mt-2 text-[10px] tracking-[0.2em] text-ink-400 uppercase">{ratio}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-600">
          Four ratios — 4:5, 2:3, 1:1 and 3:2 — held by the frame, so a gallery lays out before an image loads. Full
          colour, uncropped by filters, square corners, on a paper 200 ground while loading. The pictures in this
          build are seeded placeholders standing in for the photographer’s own work.
        </p>
      </div>
    </div>
  )
}
