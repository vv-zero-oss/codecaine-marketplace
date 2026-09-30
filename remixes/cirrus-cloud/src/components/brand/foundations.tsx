import { useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, Check, Minus, Plus, X } from "lucide-react"

import { GroupLabel, Mono } from "@/components/brand/specimen"
import { contrast, readableRadius, toHex, useComputed, visibleShadow } from "@/components/brand/read-style"
import { PixelFace, PixelMark, StepBadge } from "@/components/marks/pixel-marks"
import { GhostyImage } from "@/components/motion/ghosty-image"
import { Chip } from "@/components/ui/chip"
import { stack, workloads } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  {
    do: "Argue plainly, in full sentences: “We moved every environment off the laptop.”",
    dont: "Shout in fragments: “Dev. Reimagined. In the cloud!”",
  },
  {
    do: "Give the number and the unit: “Booted in nine seconds, billed by the minute.”",
    dont: "Promise speed without a figure: “Blazing-fast workspaces.”",
  },
  {
    do: "Say what stays on the laptop, too — and when not to migrate.",
    dont: "Pretend everything belongs in the cloud.",
  },
  {
    do: "Lower case for the one line in lights; caps only for the masthead and labels.",
    dont: "Title Case Headlines, exclamation marks, emoji.",
  },
]

/** The mark with the name set beside it, as a lockup. */
function Lockup({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <PixelMark className="h-7 text-current" />
      <span className="text-[1.75rem] leading-none font-medium tracking-[-0.02em]">Cirrus</span>
    </span>
  )
}

export function BrandIdentity() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid border-t border-l border-hairline md:grid-cols-2">
        <figure className="flex flex-col border-r border-b border-hairline bg-paper">
          <div className="grid h-60 place-items-center p-6">
            {/* Clear space: the mark's own height on every side. */}
            <div className="p-7 outline-1 -outline-offset-1 outline-cobalt/40 outline-dashed">
              <Lockup className="text-ink" />
            </div>
          </div>
          <figcaption className="label border-t border-hairline px-5 py-3 text-mute">On paper · ink</figcaption>
        </figure>
        <figure className="flex flex-col border-r border-b border-hairline bg-ink">
          <div className="grid h-60 place-items-center p-6">
            <div className="p-7 outline-1 -outline-offset-1 outline-paper/30 outline-dashed">
              <Lockup className="text-paper" />
            </div>
          </div>
          <figcaption className="label border-t border-ink-soft px-5 py-3 text-faint">On ink · paper</figcaption>
        </figure>
        <div className="border-r border-b border-hairline p-5 md:p-7">
          <p className="label text-mute">Clear space</p>
          <p className="mt-3 text-small text-ink-soft">The mark’s height on every side — the dashed box. Nothing else inside it, not even the grid’s ink.</p>
        </div>
        <div className="border-r border-b border-hairline p-5 md:p-7">
          <p className="label text-mute">Minimum size</p>
          <div className="mt-4 flex items-end gap-8">
            <span className="flex flex-col items-start gap-2">
              <PixelMark className="h-[0.8125rem]" />
              <Mono>mark 13px tall</Mono>
            </span>
            <span className="flex flex-col items-start gap-2">
              <PixelMark />
              <Mono>masthead 18px</Mono>
            </span>
            <span className="flex flex-col items-start gap-2">
              <PixelMark className="h-12" />
              <Mono>display</Mono>
            </span>
          </div>
        </div>
        <div className="border-r border-b border-hairline p-5 md:col-span-2 md:p-7">
          <p className="label text-mute">The mark</p>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            <PixelMark className="h-10" />
            <PixelMark className="h-10 text-cobalt" />
            <span className="grid size-16 place-items-center bg-navy">
              <PixelMark className="h-6 text-lime" />
            </span>
            <p className="max-w-[26rem] text-small text-ink-soft">
              A cloud drawn in squares nine wide, each square slightly inset so the grid shows through. Ink by default; one pixel colour at a time
              when it stands alone.
            </p>
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Voice</GroupLabel>
        <ul className="border-t border-hairline">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-3 border-b border-hairline py-4 sm:grid-cols-2 sm:gap-10">
              <p className="flex gap-3 text-small text-ink">
                <Check className="mt-1 size-3.5 shrink-0 text-cobalt" aria-label="Do" />
                {line.do}
              </p>
              <p className="flex gap-3 text-small text-mute">
                <X className="mt-1 size-3.5 shrink-0 text-signal" aria-label="Don't" />
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

type SwatchSpec = { token: string; className: string; role: string }

/** Every colour in the `@theme` block of index.css. Class strings are written whole so Tailwind generates them. */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Paper and ink",
    swatches: [
      { token: "--color-paper", className: "bg-paper", role: "The page, button text" },
      { token: "--color-grid", className: "bg-grid", role: "The 9px grid lines" },
      { token: "--color-wash", className: "bg-wash", role: "Paper button, code wash" },
      { token: "--color-hairline", className: "bg-hairline", role: "Every rule" },
      { token: "--color-faint", className: "bg-faint", role: "Credits, quiet labels" },
      { token: "--color-mute", className: "bg-mute", role: "Labels, secondary copy" },
      { token: "--color-ink-soft", className: "bg-ink-soft", role: "Reading copy" },
      { token: "--color-ink", className: "bg-ink", role: "Headings, the button" },
    ],
  },
  {
    label: "The pixel palette — only ever as squares",
    swatches: [
      { token: "--color-navy", className: "bg-navy", role: "Field edges, step badges, hover" },
      { token: "--color-cobalt", className: "bg-cobalt", role: "Bands, focus, checks" },
      { token: "--color-cobalt-soft", className: "bg-cobalt-soft", role: "Band shading" },
      { token: "--color-cobalt-pale", className: "bg-cobalt-pale", role: "Band shading" },
      { token: "--color-violet", className: "bg-violet", role: "Rare fleck" },
      { token: "--color-gold", className: "bg-gold", role: "The core of every figure" },
      { token: "--color-gold-soft", className: "bg-gold-soft", role: "Gold shading" },
      { token: "--color-gold-pale", className: "bg-gold-pale", role: "Gold shading" },
      { token: "--color-signal", className: "bg-signal", role: "Sparks, the don’t mark" },
      { token: "--color-lime", className: "bg-lime", role: "Plume, highlight, selection" },
    ],
  },
  {
    label: "Chips — deeper fills so white mono reads",
    swatches: [
      { token: "--color-chip-red", className: "bg-chip-red", role: "Chip · red" },
      { token: "--color-chip-blue", className: "bg-chip-blue", role: "Chip · blue" },
      { token: "--color-chip-violet", className: "bg-chip-violet", role: "Chip · violet" },
      { token: "--color-chip-ink", className: "bg-chip-ink", role: "Chip · ink" },
      { token: "--color-chip-lime", className: "bg-chip-lime", role: "Chip · lime, ink text" },
    ],
  },
]

/** A pixel chip in the token's colour, its value read back off it. */
export function Swatch({ token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="flex flex-col border-r border-b border-hairline bg-paper">
      <div className="border-b border-hairline p-3">
        <div ref={ref} className={cn("h-16 w-full", className)} />
      </div>
      <figcaption className="flex flex-col gap-0.5 p-4">
        <p className="font-mono text-[0.75rem] break-all text-ink">{token}</p>
        <p className="text-[0.8125rem] leading-snug text-ink-soft">{role}</p>
        <Mono className="pt-1">{value ? `${toHex(value)} · ${value}` : "—"}</Mono>
      </figcaption>
    </figure>
  )
}

export function ColourTokens() {
  return (
    <div className="flex flex-col gap-12">
      {COLOUR_GROUPS.map((group) => (
        <div key={group.label}>
          <GroupLabel>{group.label}</GroupLabel>
          <div className="grid grid-cols-2 border-t border-l border-hairline sm:grid-cols-3 lg:grid-cols-5">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.token} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Text on ground — WCAG 2 contrast, measured</GroupLabel>
        <div className="grid border-t border-l border-hairline sm:grid-cols-2 lg:grid-cols-3">
          <ContrastPair label="Ink on paper" className="bg-paper text-ink" />
          <ContrastPair label="Ink soft on paper" className="bg-paper text-ink-soft" />
          <ContrastPair label="Mute on paper" className="bg-paper text-mute" />
          <ContrastPair label="Faint on paper" className="bg-paper text-faint" />
          <ContrastPair label="Paper on ink (the button)" className="bg-ink text-paper" />
          <ContrastPair label="Ink on wash (paper button)" className="bg-wash text-ink" />
          <ContrastPair label="Ink on lime (hover, chip)" className="bg-lime text-ink" />
          <ContrastPair label="Paper on chip red" className="bg-chip-red text-paper" />
          <ContrastPair label="Paper on chip blue" className="bg-chip-blue text-paper" />
          <ContrastPair label="Paper on chip violet" className="bg-chip-violet text-paper" />
          <ContrastPair label="Paper on navy (step badge)" className="bg-navy text-paper" />
          <ContrastPair label="Cobalt on paper (checks)" className="bg-paper text-cobalt" />
        </div>
        <p className="mt-3 text-small text-mute">
          Measured honestly: mute reaches AA only for large text and faint does not pass at all. Both are kept to mono caps labels, the
          closing lines and the credits — darken them before using either for reading copy.
        </p>
      </div>
    </div>
  )
}

export function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 border-r border-b border-hairline p-5", className)}>
      <div>
        <p className="text-[2rem] leading-none tracking-[-0.02em]">Aa</p>
        <p className="mt-2 text-[0.8125rem]">{label}</p>
      </div>
      <p className="text-right font-mono text-[0.75rem] tabular-nums">
        {ratio == null ? "—" : `${ratio.toFixed(2)}:1`}
        <span className="block">{grade}</span>
      </p>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const TYPE_SCALE = [
  { name: "Display", className: "text-display font-normal uppercase", use: "The masthead (--text-display)", sample: "Workspaces," },
  { name: "Lede", className: "text-lede", use: "The opening line (--text-lede)", sample: "A short account of what changed." },
  { name: "Heading", className: "text-heading", use: "Section headings, prices (--text-heading)", sample: "What changed" },
  { name: "Title", className: "text-title", use: "Card and plan names (--text-title)", sample: "A preview per pull request" },
  { name: "Body", className: "text-body", use: "Reading copy, questions (--text-body)", sample: "Every branch gets a live URL and its own database." },
  { name: "Small", className: "text-small", use: "Card lines, answers, plans (--text-small)", sample: "Billed by the minute, paused when idle." },
  { name: "Step", className: "text-[0.875rem] leading-[1.6]", use: "Step descriptions", sample: "Clone the repository from any branch." },
  { name: "Strapline", className: "text-[clamp(0.9375rem,0.8rem+0.4vw,1.25rem)] leading-[1.28] uppercase", use: "Masthead strap", sample: "Cloud dev environments" },
  { name: "Label", className: "label", use: "Mono caps: labels, chips, credits (--text-label, --tracking-label)", sample: "How it works" },
  { name: "Badge", className: "font-mono text-[0.5625rem]", use: "Step numbers", sample: "01 02 03 04" },
]

export function TypeSample({ name, className, use, sample }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing", "font-family"])
  const family = (values["font-family"] ?? "").split(",")[0]?.replace(/"/g, "")
  return (
    <div className="grid gap-3 border-b border-hairline py-6 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-10">
      <div>
        <p className="text-small text-ink">{name}</p>
        <p className="text-[0.8125rem] leading-snug text-mute">{use}</p>
        <Mono className="mt-2 block">
          {family} · {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </Mono>
      </div>
      <p ref={ref} className={cn("min-w-0 break-words text-ink", className)}>
        {sample}
      </p>
    </div>
  )
}

export function Typography() {
  const [sans, sansValues] = useComputed<HTMLDivElement>(["font-family"])
  const [mono, monoValues] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <div className="flex flex-col gap-12">
      <div className="grid border-t border-l border-hairline md:grid-cols-2">
        <div ref={sans} className="border-r border-b border-hairline p-6 md:p-8">
          <GroupLabel>Sans — everything read</GroupLabel>
          <p className="text-[3.5rem] leading-none tracking-[-0.035em] text-ink uppercase">Geist</p>
          <p className="mt-5 text-small text-ink-soft">
            Regular (400) almost everywhere, medium (500) to pick out a phrase. Big and tight at the top, calm and justified in the long
            paragraphs.
          </p>
          <p className="mt-4 text-xl text-ink">
            Aa Bb Cc <span className="tabular-nums">0123456789</span>
          </p>
          <Mono className="mt-4 block">{sansValues["font-family"]}</Mono>
        </div>
        <div ref={mono} className="border-r border-b border-hairline p-6 font-mono md:p-8">
          <GroupLabel>Mono — labels and numbers</GroupLabel>
          <p className="text-[3rem] leading-none tracking-[-0.02em] text-ink">Geist Mono</p>
          <p className="mt-5 font-sans text-small text-ink-soft">Uppercase, 11px, tracked 0.18em: every label, chip, credit and step number.</p>
          <p className="label mt-4 text-ink">$0.09 / min · 9 s boot</p>
          <Mono className="mt-4 block">{monoValues["font-family"]}</Mono>
        </div>
      </div>
      <div>
        <GroupLabel>Scale — read off each sample at this width</GroupLabel>
        <div className="border-t border-hairline">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = [
  { step: "pixel", className: "w-(--spacing-pixel)" },
  { step: "3", className: "w-3" },
  { step: "4", className: "w-4" },
  { step: "6", className: "w-6" },
  { step: "7", className: "w-7" },
  { step: "8", className: "w-8" },
  { step: "9", className: "w-9" },
  { step: "10", className: "w-10" },
  { step: "12", className: "w-12" },
  { step: "14", className: "w-14" },
  { step: "16", className: "w-16" },
  { step: "gutter", className: "w-gutter" },
  { step: "section ÷ 2", className: "w-[calc(var(--spacing-section)/2)]" },
  { step: "section", className: "w-(--spacing-section)" },
]

export function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[5.5rem_4.5rem_minmax(0,1fr)] items-center gap-4 border-b border-hairline py-2.5">
      <Mono className="text-ink">{step}</Mono>
      <Mono>{values.width}</Mono>
      <div ref={ref} className={cn("h-2 max-w-full bg-cobalt", className)} />
    </li>
  )
}

function ContainerWidth() {
  const [ref, values] = useComputed<HTMLDivElement>(["max-width"])
  return (
    <p className="mt-4 text-small text-ink-soft">
      <span ref={ref} className="max-w-page" /> The page column is <code className="font-mono text-[0.8125rem]">--container-page</code>,{" "}
      <Mono className="text-ink">{values["max-width"]}</Mono>, between two gutters. Sections sit half a{" "}
      <code className="font-mono text-[0.8125rem]">--spacing-section</code> apart, top and bottom — a lot of paper, on purpose.
    </p>
  )
}

const SHAPES = [
  { name: "Radius", className: "rounded-none bg-ink", use: "Nothing on the page is rounded" },
  { name: "Notch", className: "notch bg-ink", use: "Buttons, the copy button (--notch)" },
  { name: "Notch, small", className: "notch notch-sm bg-ink", use: "Chips and step badges" },
]

export function ShapeSample({ name, className, use }: (typeof SHAPES)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius", "--notch"])
  return (
    <figure className="border-r border-b border-hairline p-5">
      <div ref={ref} className={cn("h-16", className)} />
      <figcaption className="mt-3">
        <span className="text-small text-ink">{name}</span>{" "}
        <Mono>
          radius {readableRadius(values["border-top-left-radius"] ?? "")}
          {name !== "Radius" ? ` · notch ${values["--notch"]}` : ""}
        </Mono>
        <span className="block text-[0.8125rem] text-mute">{use}</span>
      </figcaption>
    </figure>
  )
}

function ShadowSample() {
  const [ref, values] = useComputed<HTMLSpanElement>(["box-shadow"])
  return (
    <figure className="border-r border-b border-hairline p-5">
      <div className="relative h-28 overflow-hidden bg-hairline/40">
        <GhostyImage src={workloads[2].image} alt={workloads[2].alt} />
        <span ref={ref} className="notch absolute top-1/2 right-4 inline-flex size-11 -translate-y-1/2 items-center justify-center bg-ink text-paper shadow-float">
          <ArrowRight className="size-4" />
        </span>
      </div>
      <figcaption className="mt-3">
        <span className="text-small text-ink">Float</span> <span className="text-[0.8125rem] text-mute">— the one lift: the rail arrow over photography</span>
        <Mono className="mt-1 block">{visibleShadow(values["box-shadow"] ?? "")}</Mono>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-hairline", use: "Rules, plan columns, FAQ rows" },
  { name: "Focus", className: "outline-2 outline-offset-4 outline-cobalt", use: "Keyboard focus, 4px off the edge" },
  { name: "Grid", className: "border border-grid", use: "The paper’s 9px grid, at 2.8%" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-bottom-width", "border-bottom-color", "outline-width", "outline-color", "outline-offset"])
  const outline = values["outline-width"] && values["outline-width"] !== "0px"
  return (
    <figure className="border-r border-b border-hairline p-6">
      <div ref={ref} className={cn("h-14 bg-paper", className)} />
      <figcaption className="mt-4">
        <span className="text-small text-ink">{name}</span>
        <span className="block text-[0.8125rem] text-mute">{use}</span>
        <Mono className="mt-1 block">
          {outline
            ? `outline ${values["outline-width"]} ${toHex(values["outline-color"] ?? "")} · offset ${values["outline-offset"]}`
            : `${values["border-bottom-width"]} ${values["border-bottom-color"]}`}
        </Mono>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <GroupLabel>Spacing — the 9px pixel, Tailwind steps, and the rhythm tokens</GroupLabel>
          <ul className="border-t border-hairline">
            {SPACING.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
          <ContainerWidth />
        </div>
        <div className="min-w-0">
          <GroupLabel>Corners — notched a pixel at a time</GroupLabel>
          <div className="grid border-t border-l border-hairline">
            {SHAPES.map((shape) => (
              <ShapeSample key={shape.name} {...shape} />
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="min-w-0">
          <GroupLabel>Shadow — the page is flat</GroupLabel>
          <div className="grid border-t border-l border-hairline">
            <ShadowSample />
          </div>
        </div>
        <div className="min-w-0">
          <GroupLabel>Lines</GroupLabel>
          <div className="grid border-t border-l border-hairline sm:grid-cols-3">
            {BORDERS.map((border) => (
              <BorderSample key={border.name} {...border} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

type MotionSpec = { name: string; where: string; duration: string; easing: string; keyframes: Keyframe[] }

/** Durations and easings name the tokens in index.css; their values are read at play time. */
const MOTION: MotionSpec[] = [
  {
    name: "Press",
    where: "Every button: scale to 0.97",
    duration: "--duration-press",
    easing: "--ease-out",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Hover",
    where: "Ink to navy; arrows nudge, the plus turns",
    duration: "--duration-hover",
    easing: "--ease-out",
    keyframes: [{ backgroundColor: "var(--color-ink)" }, { backgroundColor: "var(--color-navy)" }],
  },
  {
    name: "Ghost",
    where: "Photographs bleeding in through fog",
    duration: "--duration-ghost",
    easing: "--ease-ghost",
    keyframes: [
      { opacity: 0, filter: "blur(10px)", transform: "translateY(12px)" },
      { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
    ],
  },
  {
    name: "Typer letter",
    where: "One letter’s flicker; the wave staggers --stagger-typer",
    duration: "--duration-typer",
    easing: "steps(3, end)",
    keyframes: [{ backgroundColor: "var(--color-ink)" }, { backgroundColor: "var(--color-lime)" }, { backgroundColor: "transparent", boxShadow: "inset 0 0 0 1.5px var(--color-ink)" }, { backgroundColor: "var(--color-ink)" }],
  },
  {
    name: "Accordion",
    where: "FAQ answers: open 240ms, close 200ms",
    duration: "240ms",
    easing: "--ease-out",
    keyframes: [{ transform: "scaleY(0.1)" }, { transform: "scaleY(1)" }],
  },
  {
    name: "Swing",
    where: "Things that go and come back",
    duration: "900ms",
    easing: "--ease-in-out",
    keyframes: [{ transform: "translateX(0)" }, { transform: "translateX(40%)" }, { transform: "translateX(0)" }],
  },
]

function readToken(value: string) {
  return value.startsWith("--") ? getComputedStyle(document.documentElement).getPropertyValue(value).trim() : value
}

function resolveVars(frame: Keyframe): Keyframe {
  return Object.fromEntries(
    Object.entries(frame).map(([k, v]) => [
      k,
      typeof v === "string" ? v.replace(/var\((--[\w-]+)\)/g, (_, name: string) => readToken(name)) : v,
    ]),
  ) as Keyframe
}

/** Plays one of the page's motions through the Web Animations API — so the
 *  editor's Motion switch stops and reduces it like the page's own. */
export function MotionSample({ name, where, duration, easing, keyframes }: MotionSpec) {
  const target = useRef<HTMLDivElement>(null)
  const read = () => ({ duration: readToken(duration), easing: readToken(easing) })
  const [shown, setShown] = useState(() => read())
  const play = () => {
    const element = target.current
    if (!element) return
    const now = read()
    setShown(now)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.getAnimations().forEach((animation) => animation.cancel())
    const ms = parseFloat(now.duration) * (now.duration.endsWith("ms") ? 1 : 1000)
    element.animate(keyframes.map(resolveVars), { duration: reduced ? 1 : ms, easing: now.easing, fill: "none" })
  }
  return (
    <div className="flex flex-col border-r border-b border-hairline p-5">
      <div className="flex h-24 items-center overflow-hidden bg-wash/60 px-4">
        <div ref={target} className="h-9 w-full origin-top bg-ink" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-small text-ink">{name}</p>
          <p className="text-[0.8125rem] leading-snug text-mute">{where}</p>
          <Mono className="mt-1 block">
            {duration.startsWith("--") ? `${duration} ` : ""}
            {shown.duration} · {easing.startsWith("--") ? `${easing} ` : ""}
            {shown.easing}
          </Mono>
        </div>
        <button
          type="button"
          onClick={play}
          className="notch inline-flex h-11 shrink-0 items-center bg-wash px-5 text-base text-ink outline-none transition-[transform,background-color] duration-(--duration-press) ease-(--ease-out) active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt [@media(hover:hover)_and_(pointer:fine)]:hover:bg-lime"
        >
          Play
        </button>
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid border-t border-l border-hairline md:grid-cols-2 xl:grid-cols-3">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <ul className="grid border-t border-l border-hairline text-small text-ink-soft sm:grid-cols-2">
        <li className="border-r border-b border-hairline p-5">
          <span className="text-ink">Scroll</span> is Lenis at <code className="font-mono text-[0.8125rem]">lerp 0.085</code> — soft and slightly
          heavy — held in a ref so the editor can stop it.
        </li>
        <li className="border-r border-b border-hairline p-5">
          <span className="text-ink">The canvases</span> draw from one endless GSAP tween each, held in a ref (
          <code className="font-mono text-[0.8125rem]">motion/frame-loop.ts</code>), so the Motion switch pauses the weather, the streams, the
          marquee and the skyline.
        </li>
        <li className="border-r border-b border-hairline p-5">
          <span className="text-ink">Reduced motion</span> is read from the media query each time motion starts: canvases draw one still frame,
          headings land typed, photographs show at once.
        </li>
        <li className="border-r border-b border-hairline p-5">
          <span className="text-ink">Hover only where there is a pointer.</span> Every hover sits behind{" "}
          <code className="font-mono text-[0.8125rem]">(hover: hover) and (pointer: fine)</code>; a tap gets the press instead.
        </li>
      </ul>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

export function Iconography() {
  return (
    <div className="grid border-t border-l border-hairline lg:grid-cols-2">
      <div className="border-r border-b border-hairline p-6">
        <GroupLabel>Pixel marks — drawn from # patterns on a unit grid</GroupLabel>
        <div className="flex flex-wrap items-end gap-8">
          <span className="flex flex-col items-center gap-2">
            <PixelMark className="h-8" />
            <Mono>PixelMark</Mono>
          </span>
          <span className="flex flex-col items-center gap-2">
            <PixelFace />
            <Mono>PixelFace happy</Mono>
          </span>
          <span className="flex flex-col items-center gap-2">
            <PixelFace mood="sad" />
            <Mono>PixelFace sad</Mono>
          </span>
          <span className="flex flex-col items-center gap-2">
            <StepBadge n={3} />
            <Mono>StepBadge</Mono>
          </span>
          <span className="flex flex-col items-center gap-2">
            <Chip tone="lime">Most teams</Chip>
            <Mono>Chip</Mono>
          </span>
        </div>
        <p className="mt-5 text-small text-ink-soft">The brand’s own drawings: squares, never curves, inset so the grid shows between them.</p>
      </div>
      <div className="border-r border-b border-hairline p-6">
        <GroupLabel>Line icons — Lucide, 14–16px, ink or mute</GroupLabel>
        <div className="flex flex-wrap gap-2">
          {[ArrowRight, ArrowUpRight, Plus, Minus, Check, X].map((Icon, i) => (
            <span key={i} className="grid size-11 place-items-center border border-hairline text-ink">
              <Icon className="size-4" />
            </span>
          ))}
        </div>
        <p className="mt-5 text-small text-ink-soft">
          Only for UI: arrows that move, the FAQ plus that turns 45°, checks in cobalt. Never as a feature illustration — that is the canvases’
          job.
        </p>
      </div>
      <div className="border-r border-b border-hairline p-6 lg:col-span-2">
        <GroupLabel>Imagery — Pexels photography, bled in through fog</GroupLabel>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[workloads[0], workloads[1], stack.cards[0], stack.cards[1]].map((card, i) => (
            <figure key={card.title}>
              <div className="aspect-[420/374] overflow-hidden bg-hairline/40">
                <GhostyImage src={card.image} alt={card.alt} direction={(["up", "down", "left", "right"] as const)[i]} delay={i * 90} />
              </div>
              <figcaption className="mt-2">
                <Mono>direction {(["up", "down", "left", "right"] as const)[i]}</Mono>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-5 max-w-[48rem] text-small text-ink-soft">
          Real hardware and real desks in daylight, cropped square-cornered at 420 × 374. Where there is no photograph there is generative pixel
          art — the weather, the streams, the marquee — never stock illustration. Photography is credited in the footer.
        </p>
      </div>
    </div>
  )
}
