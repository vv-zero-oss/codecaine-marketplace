import { Pause, Play, X } from "lucide-react"
import { useLayoutEffect, useRef, useState, type ComponentProps } from "react"

import { GroupLabel } from "@/components/brand/specimen"
import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { Bracket } from "@/components/ui/bracket"
import { categories, people, pexels, project, sportAccent } from "@/content"
import { duration, ease, prefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ─── The mark ────────────────────────────────────────────────────────── */

/** The mark: a solid block between two square brackets — the page's button,
 *  with the word taken out. Drawn in currentColor, so it follows the ink. */
export function Mark({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg viewBox="8 10 24 20" fill="none" aria-hidden className={cn("h-[1em] w-[1.2em]", className)} {...props}>
      <path d="M13 11h-4v18h4M27 11h4v18h-4" stroke="currentColor" strokeWidth="2" />
      <rect x="15" y="15" width="10" height="10" fill="currentColor" />
    </svg>
  )
}

/** The mark and the name, set in the label style every page opens with. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-[0.6em] font-mono uppercase tracking-label", className ?? "text-label")}>
      <Mark />
      {project.name}
    </span>
  )
}

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  {
    do: "Ask one plain question and let the athlete answer it: “What does it cost to keep going?”",
    dont: "Sell the sport: “Unleash your inner champion.”",
  },
  { do: "Facts in the margin, set as data: born in, club, career, age.", dont: "Adjectives doing a fact’s job: “legendary”, “iconic”." },
  { do: "Labels in capitals and brackets: [ CLOSE ], [ LEARN MORE ].", dont: "Exclamation marks, emoji, rounded pill buttons." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <GroupLabel>On paper</GroupLabel>
        <div className="flex h-48 items-center justify-center border border-rule bg-paper">
          {/* Clear space: the height of the mark on every side, drawn. */}
          <div className="p-[1.4em] text-label outline-1 outline-ink-faint outline-dashed">
            <Wordmark />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>On ink — reversed</GroupLabel>
        <div className="flex h-48 items-center justify-center bg-ink text-paper">
          <div className="p-[1.4em] text-label outline-1 outline-paper/30 outline-dashed">
            <Wordmark />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <GroupLabel>Over a photograph — difference-blended</GroupLabel>
        <div className="relative h-48 overflow-hidden rounded-card">
          <img src={pexels(people[4].photo, 1200)} alt="" className="absolute inset-0 size-full object-cover object-[50%_30%]" />
          <div className="absolute inset-0 flex items-center justify-center text-blend mix-blend-difference">
            <Wordmark className="text-2xl" />
          </div>
        </div>
      </div>
      <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-3 lg:col-span-2">
        <div className="bg-paper p-5">
          <dt className="font-mono text-caption uppercase tracking-label text-ink-muted">Clear space</dt>
          <dd className="mt-2 text-ink-soft">One mark-height on every side — the dashed box. Nothing else inside it.</dd>
        </div>
        <div className="bg-paper p-5">
          <dt className="font-mono text-caption uppercase tracking-label text-ink-muted">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-soft">
            <Wordmark className="text-caption" />
            <span>11px — the caption size. Never smaller.</span>
          </dd>
        </div>
        <div className="bg-paper p-5">
          <dt className="font-mono text-caption uppercase tracking-label text-ink-muted">Mark only</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-soft">
            <span className="inline-flex size-8 shrink-0 items-center justify-center bg-ink text-paper">
              <Mark className="text-sm" />
            </span>
            <span>Favicon and avatars, square, ink on paper or reversed.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="border-t border-rule">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-2 border-b border-rule py-4 md:grid-cols-2 md:gap-8">
              <p className="flex gap-3">
                <span className="font-mono text-label text-ink">[■]</span>
                <span>{line.do}</span>
              </p>
              <p className="flex gap-3 text-ink-muted">
                <span className="font-mono text-label">[ ]</span>
                <span>{line.dont}</span>
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
const COLOUR_GROUPS: { label: string; blurb: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Paper and ink — every page",
    blurb: "The issue is printed dark: warm ink on night paper.",
    swatches: [
      { name: "Paper", token: "--color-paper", className: "bg-paper", role: "Page background" },
      { name: "Paper soft", token: "--color-paper-soft", className: "bg-paper-soft", role: "Frames before a picture loads" },
      { name: "Rule", token: "--color-rule", className: "bg-rule", role: "Hairlines, progress tracks" },
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Text, the hover block" },
      { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft", role: "Long-form copy" },
      { name: "Ink muted", token: "--color-ink-muted", className: "bg-ink-muted", role: "Labels, small print" },
      { name: "Ink faint", token: "--color-ink-faint", className: "bg-ink-faint", role: "Guides, never text" },
    ],
  },
  {
    label: "Night — the list view",
    blurb: "The list goes one step darker. It sets data-tone=\"night\" on <html>, which points the page tokens here.",
    swatches: [
      { name: "Night", token: "--color-night", className: "bg-night", role: "List background, code" },
      { name: "Night soft", token: "--color-night-soft", className: "bg-night-soft", role: "Portrait frames at night" },
      { name: "Night ink", token: "--color-night-ink", className: "bg-night-ink", role: "Text at night" },
      { name: "Night muted", token: "--color-night-muted", className: "bg-night-muted", role: "Club, sport, small print" },
    ],
  },
  {
    label: "Page — the pair every component reads",
    blurb: "What the brackets invert between. Paper and ink by day, night and night ink on the list.",
    swatches: [
      { name: "Page background", token: "--page-bg", className: "bg-(--page-bg)", role: "Brackets, sheet, header fade" },
      { name: "Page ink", token: "--page-ink", className: "bg-(--page-ink)", role: "Brackets, type cursor" },
    ],
  },
  {
    label: "Blend — over photographs",
    blurb: "Words laid on a full-bleed picture are white with mix-blend-mode: difference, so they read on any image.",
    swatches: [
      { name: "Blend", token: "--color-blend", className: "bg-blend", role: "Header over the gallery" },
      { name: "Blend inverse", token: "--color-blend-inverse", className: "bg-blend-inverse", role: "Its page background" },
    ],
  },
  {
    label: "Sport — one accent each",
    blurb: "The only colour on the site besides the portraits: the glow behind a profile, the dot beside a name.",
    swatches: categories.map((sport) => ({
      name: sport,
      token: `--color-sport-${sport.toLowerCase()}`,
      className: "",
      role: sport === "Track" ? "Track and field" : `${sport} profiles`,
    })),
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="m-0">
      <div
        ref={ref}
        className={cn("h-20 border border-rule", className)}
        style={className ? undefined : { background: `var(${token})` }}
      />
      <figcaption className="mt-2 text-label">
        <p className="text-ink">{name}</p>
        <p className="text-ink-muted">{role}</p>
        <p className="mt-1 font-mono text-caption break-all text-ink-muted">{token}</p>
        <p className="font-mono text-caption break-all text-ink-muted">
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
          <GroupLabel className="mb-1">{group.label}</GroupLabel>
          <p className="mb-5 max-w-[36rem] text-label text-ink-muted">{group.blurb}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.token} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Text on surface — WCAG contrast</GroupLabel>
        <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-4">
          <ContrastPair label="Ink on paper" className="bg-paper text-ink" />
          <ContrastPair label="Ink soft on paper" className="bg-paper text-ink-soft" />
          <ContrastPair label="Ink muted on paper" className="bg-paper text-ink-muted" />
          <ContrastPair label="Ink faint on paper" className="bg-paper text-ink-faint" />
          <ContrastPair label="Paper on ink (hover)" className="bg-ink text-paper" />
          <ContrastPair label="Ink on paper soft" className="bg-paper-soft text-ink" />
          <ContrastPair label="Night ink on night" className="bg-night text-night-ink" />
          <ContrastPair label="Night muted on night" className="bg-night text-night-muted" />
        </div>
      </div>
    </div>
  )
}

export function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 p-5", className)}>
      <div>
        <p className="text-headline font-light tracking-headline">Aa</p>
        <p className="mt-1 text-label">{label}</p>
      </div>
      <p className="text-right font-mono text-caption uppercase tracking-label tabular-nums">
        {ratio == null ? "—" : `${ratio.toFixed(2)}:1`}
        <span className="block">{grade}</span>
      </p>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const TYPE_SCALE = [
  { name: "Headline", token: "--text-headline", className: "text-headline font-light tracking-headline", use: "A profile’s headline, the about title" },
  { name: "Menu", token: "--text-2xl", className: "font-mono text-2xl uppercase tracking-label", use: "The links in the phone menu" },
  { name: "Body", token: "--text-body", className: "text-body", use: "Profiles, the about text, list rows, bracket buttons" },
  { name: "Label", token: "--text-label", className: "font-mono text-label uppercase tracking-label", use: "The header count, section names, the footer name" },
  { name: "Caption", token: "--text-caption", className: "font-mono text-caption uppercase tracking-label", use: "Footer, archive captions, counters" },
]

export function TypeSample({ name, token, className, use }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-rule py-6 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
      <div className="text-label">
        <p className="text-ink">{name}</p>
        <p className="text-ink-muted">{use}</p>
        <p className="mt-2 font-mono text-caption leading-relaxed text-ink-muted tabular-nums">
          {token}
          <br />
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </p>
      </div>
      <p ref={ref} className={cn("min-w-0 break-words text-ink", className)}>
        What does it cost to keep going?
      </p>
    </div>
  )
}

export function Typography() {
  const [sans, sansValues] = useComputed<HTMLDivElement>(["font-family"])
  const [mono, monoValues] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <div className="space-y-14">
      <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
        <div ref={sans} className="bg-paper p-6">
          <GroupLabel>Sans — everything you read</GroupLabel>
          <p className="text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-light tracking-headline">Overpass</p>
          <p className="mt-6 text-ink-soft">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            <span className="tabular-nums">0123456789</span> — 300 · 400 · 500 · 600
          </p>
          <p className="mt-4 font-mono text-caption break-all text-ink-muted">{sansValues["font-family"]}</p>
        </div>
        <div ref={mono} className="bg-paper p-6 font-mono">
          <GroupLabel>Mono — everything you press</GroupLabel>
          <p className="text-[clamp(2rem,5vw,3.75rem)] leading-none uppercase tracking-label">Overpass Mono</p>
          <p className="mt-6 text-label text-ink-soft uppercase tracking-label">
            [ Grid ] [ List ] [ Gallery ]
            <br />
            84 Overtime · 001 · 02:14
          </p>
          <p className="mt-4 text-caption break-all text-ink-muted">{monoValues["font-family"]}</p>
        </div>
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        <div className="border-t border-rule">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        <div className="bg-paper p-6">
          <GroupLabel>Numerals — tabular, for counters</GroupLabel>
          <p className="font-mono text-headline tabular-nums">
            001 / 084
            <br />
            02:14
          </p>
        </div>
        <div className="bg-paper p-6">
          <GroupLabel>Tracking</GroupLabel>
          <TrackingSample className="font-mono text-label uppercase tracking-label" label="--tracking-label" />
          <TrackingSample className="mt-4 text-headline font-light tracking-headline" label="--tracking-headline" />
        </div>
      </div>
    </div>
  )
}

function TrackingSample({ className, label }: { className: string; label: string }) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["letter-spacing"])
  return (
    <div>
      <p ref={ref} className={className}>
        Keep going
      </p>
      <p className="font-mono text-caption text-ink-muted">
        {label} · {values["letter-spacing"]}
      </p>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = [
  { step: "1.5", className: "w-1.5", use: "The sport dot" },
  { step: "2", className: "w-2", use: "Icon to label" },
  { step: "3", className: "w-3", use: "Photo strip gap" },
  { step: "4", className: "w-4", use: "Header top, row gap" },
  { step: "5", className: "w-5", use: "Nav gap, fact rows" },
  { step: "6", className: "w-6", use: "List rows (phone)" },
  { step: "gutter", className: "w-gutter", use: "The page margin — 26px" },
  { step: "9", className: "w-9", use: "List rows" },
  { step: "10", className: "w-10", use: "Tools under the header" },
  { step: "16", className: "w-16", use: "Footer top" },
  { step: "column", className: "w-column", use: "Column gap — fluid" },
  { step: "24", className: "w-24", use: "Section foot" },
  { step: "32", className: "w-32", use: "Page top (phone)" },
]

export function SpacingStep({ step, className, use }: (typeof SPACING)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[4.5rem_4rem_minmax(0,1fr)] items-center gap-3 border-b border-rule py-2 text-label">
      <span className="font-mono text-caption uppercase tracking-label text-ink-muted">{step}</span>
      <span className="font-mono text-caption text-ink-soft tabular-nums">{values.width}</span>
      <span className="flex min-w-0 items-center gap-3">
        <span ref={ref} className={cn("h-2 shrink-0 bg-ink", className)} />
        <span className="truncate text-ink-muted">{use}</span>
      </span>
    </li>
  )
}

const RADII = [
  { name: "None", token: "—", className: "rounded-none", use: "Brackets, inputs, sheet — everything you press" },
  { name: "Tile", token: "--radius-tile", className: "rounded-tile", use: "Portrait squares: list, strip, grid" },
  { name: "Card", token: "--radius-card", className: "rounded-card", use: "Big pictures: profile, archive, about" },
]

export function RadiusSample({ name, token, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="m-0 text-label">
      <div ref={ref} className={cn("h-24 bg-paper-soft outline-1 -outline-offset-1 outline-rule", className)} />
      <figcaption className="mt-2">
        <span className="text-ink">{name}</span>{" "}
        <span className="font-mono text-caption text-ink-muted">
          {token} · {values["border-top-left-radius"]}
        </span>
        <span className="block text-ink-muted">{use}</span>
      </figcaption>
    </figure>
  )
}

export function ShadowSample() {
  const [flat, flatValues] = useComputed<HTMLDivElement>(["box-shadow"])
  const [glow, glowValues] = useComputed<HTMLDivElement>(["filter", "opacity"])
  return (
    <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
      <figure className="m-0 bg-paper p-6 text-label">
        <div ref={flat} className="h-28 rounded-card bg-paper-soft shadow-none" />
        <figcaption className="mt-3">
          <span className="text-ink">No shadows</span>
          <span className="block text-ink-muted">
            Nothing lifts off the page. <code className="font-mono text-caption">--shadow-none</code> is the only one.
          </span>
          <span className="mt-1 block font-mono text-caption break-all text-ink-muted">{flatValues["box-shadow"]}</span>
        </figcaption>
      </figure>
      <figure className="m-0 overflow-hidden bg-paper p-6 text-label">
        <div className="relative h-28">
          <div
            ref={glow}
            aria-hidden
            className="absolute -inset-x-4 -bottom-6 h-2/3 rounded-full opacity-25 blur-[80px]"
            style={{ background: sportAccent.Cycling }}
          />
          <img
            src={pexels(people[2].photo, 400, 400)}
            alt=""
            className="relative mx-auto aspect-square h-full rounded-tile object-cover"
          />
        </div>
        <figcaption className="mt-3">
          <span className="text-ink">The glow</span>
          <span className="block text-ink-muted">Depth comes from the sport’s accent, blurred behind the portrait.</span>
          <span className="mt-1 block font-mono text-caption break-all text-ink-muted">
            filter: {glowValues.filter} · opacity: {glowValues.opacity}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}

const BORDERS = [
  { name: "Rule", className: "border-b border-rule", use: "Section heads, writer rows, the strip’s top" },
  { name: "Input underline", className: "border-b border-ink/30", use: "A caret on a hairline — no box" },
  { name: "Input, focused", className: "border-b border-ink", use: "The line goes to full ink" },
  { name: "Focus outline", className: "outline outline-1 outline-offset-[3px] outline-ink", use: "1px currentColor, 3px off" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const outline = className.includes("outline")
  const [ref, values] = useComputed<HTMLDivElement>(
    outline ? ["outline-width", "outline-style", "outline-color", "outline-offset"] : ["border-bottom-width", "border-bottom-style", "border-bottom-color"],
  )
  const printed = outline
    ? `${values["outline-width"]} ${values["outline-style"]} ${values["outline-color"]} · offset ${values["outline-offset"]}`
    : `${values["border-bottom-width"]} ${values["border-bottom-style"]} ${values["border-bottom-color"]}`
  return (
    <figure className="m-0 text-label">
      <div className="flex h-16 items-end px-1 pb-2">
        <div ref={ref} className={cn("h-8 w-full", className)} />
      </div>
      <figcaption className="mt-2">
        <span className="text-ink">{name}</span>
        <span className="block text-ink-muted">{use}</span>
        <span className="mt-1 block font-mono text-caption break-all text-ink-muted">{printed}</span>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-14">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <GroupLabel>Spacing — 4px steps and two named gutters</GroupLabel>
          <ul className="border-t border-rule">
            {SPACING.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
        </div>
        <div>
          <GroupLabel>Radii — only pictures are rounded</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <ShadowSample />
      </div>
      <div>
        <GroupLabel>Borders and outlines</GroupLabel>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {BORDERS.map((border) => (
            <BorderSample key={border.name} {...border} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

/** Everything is read when Play is pressed, off the stylesheet or `lib/motion.ts`. */
type MotionSpec = {
  name: string
  where: string
  /** A `--animate-*` shorthand to read its duration and curve from… */
  animate?: string
  /** …or a duration token and an easing token. */
  duration?: string
  easing?: string
  keyframes: Keyframe[]
  sample?: "block" | "picture"
}

const MOTION: MotionSpec[] = [
  {
    name: "Bracket hover",
    where: "The word inverts into a block",
    duration: "--duration-fast",
    easing: "--ease-out-quart",
    keyframes: [{ backgroundColor: "--color-paper-soft" }, { backgroundColor: "--color-ink" }],
  },
  {
    name: "Sheet in",
    where: "The phone menu drops from the top",
    animate: "--animate-sheet-in",
    keyframes: [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
  },
  {
    name: "Sheet out",
    where: "…and lifts away",
    animate: "--animate-sheet-out",
    keyframes: [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
  },
  {
    name: "Fade",
    where: "The sheet’s overlay",
    animate: "--animate-fade-in",
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
  {
    name: "Rise in",
    where: "About paragraphs, archive frames",
    duration: "--duration-slow",
    easing: "--ease-out-quart",
    keyframes: [
      { opacity: 0, transform: "translateY(24px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
  },
  {
    name: "Shutter",
    where: "A portrait arriving on its profile",
    duration: "1050ms",
    easing: "--ease-in-out-quart",
    keyframes: [
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", offset: 0.48 },
      { clipPath: "inset(0 0% 0 100%)" },
    ],
  },
]

function readToken(value: string) {
  return value.startsWith("--") ? getComputedStyle(document.documentElement).getPropertyValue(value).trim() : value
}

function resolve(spec: MotionSpec) {
  if (spec.animate) {
    const shorthand = readToken(spec.animate)
    const ms = /(\d+(?:\.\d+)?)(ms|s)\b/.exec(shorthand)
    const time = ms ? Number(ms[1]) * (ms[2] === "s" ? 1000 : 1) : 300
    const curve = /cubic-bezier\([^)]*\)/.exec(shorthand)?.[0] ?? "ease-out"
    return { time, curve, printed: `${spec.animate}: ${shorthand}` }
  }
  const raw = readToken(spec.duration ?? "300ms")
  const time = raw.endsWith("ms") ? parseFloat(raw) : parseFloat(raw) * 1000
  const curve = readToken(spec.easing ?? "ease-out")
  const named = (token: string | undefined, value: string) => (token?.startsWith("--") ? `${token} ${value}` : value)
  return { time, curve, printed: `${named(spec.duration, raw)} · ${named(spec.easing, curve)}` }
}

/** Plays one of the page's motions on a sample, through the Web Animations API
 *  — so the editor's Motion switch stops and reduces it like the page's own. */
export function MotionSample(spec: MotionSpec) {
  const target = useRef<HTMLDivElement>(null)
  const [printed, setPrinted] = useState("")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => setPrinted(resolve(spec).printed), [spec.name])
  const play = () => {
    const element = target.current
    if (!element) return
    const { time, curve } = resolve(spec)
    element.getAnimations().forEach((animation) => animation.cancel())
    const frames = spec.keyframes.map((frame) =>
      Object.fromEntries(Object.entries(frame).map(([key, value]) => [key, typeof value === "string" ? readToken(value) : value])),
    )
    element.animate(frames, { duration: prefersReducedMotion() ? 1 : time, easing: curve, fill: "none" })
  }
  return (
    <div className="flex flex-col border-t border-rule pt-4">
      <div className="flex h-28 items-start overflow-hidden bg-paper-soft">
        <div ref={target} className="h-full w-full bg-ink" />
      </div>
      <div className="mt-3 flex items-start justify-between gap-4 text-label">
        <div className="min-w-0">
          <p className="text-ink">{spec.name}</p>
          <p className="text-ink-muted">{spec.where}</p>
          <p className="mt-1 font-mono text-caption break-all text-ink-muted">{printed}</p>
        </div>
        <Bracket onClick={play} aria-label={`Play ${spec.name}`}>
          Play
        </Bracket>
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="space-y-12">
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <div>
        <GroupLabel>The same curves in TypeScript — lib/motion.ts</GroupLabel>
        <dl className="grid gap-px border border-rule bg-rule font-mono text-caption sm:grid-cols-2 xl:grid-cols-3">
          {Object.entries(ease).map(([name, curve]) => (
            <div key={name} className="bg-paper p-4">
              <dt className="uppercase tracking-label text-ink-muted">ease.{name}</dt>
              <dd className="mt-1 break-all text-ink">cubic-bezier({curve.join(", ")})</dd>
            </div>
          ))}
          {Object.entries(duration).map(([name, seconds]) => (
            <div key={name} className="bg-paper p-4">
              <dt className="uppercase tracking-label text-ink-muted">duration.{name}</dt>
              <dd className="mt-1 text-ink">{Math.round(seconds * 1000)}ms</dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="grid gap-px border border-rule bg-rule text-label text-ink-soft md:grid-cols-3">
        <li className="bg-paper p-5">
          <span className="text-ink">Scroll</span> is Lenis at <code className="font-mono text-caption">lerp 0.1</code> on
          every page that scrolls — a soft glide that settles rather than stops.
        </li>
        <li className="bg-paper p-5">
          <span className="text-ink">Text</span> decodes (ScrambleText) or types in behind a block (TypeReveal) when
          what the page shows changes — the same terminal printing something new.
        </li>
        <li className="bg-paper p-5">
          <span className="text-ink">Reduced motion</span> is read from the media query each time motion starts: text
          prints at once, portraits appear without the shutter, scroll is the browser’s own.
        </li>
      </ul>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

export function Iconography() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <GroupLabel>Icons — typed first, drawn only when a glyph cannot say it</GroupLabel>
        <div className="grid grid-cols-3 gap-px border border-rule bg-rule font-mono text-label sm:grid-cols-6">
          {[
            { glyph: "[ ]", name: "Off" },
            { glyph: "[■]", name: "On" },
            { glyph: "[+]", name: "Open" },
            { glyph: "[–]", name: "Fold" },
          ].map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-2 bg-paper py-5">
              <span className="text-ink">{item.glyph}</span>
              <span className="text-caption uppercase tracking-label text-ink-muted">{item.name}</span>
            </div>
          ))}
          {[
            { Icon: X, name: "Close" },
            { Icon: Play, name: "Play" },
          ].map(({ Icon, name }) => (
            <div key={name} className="flex flex-col items-center gap-2 bg-paper py-5">
              <Icon className="size-3.5 text-ink" strokeWidth={1.75} />
              <span className="text-caption uppercase tracking-label text-ink-muted">{name}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-label text-ink-soft">
          Lucide at 14px and a 1.75 stroke, in currentColor, always inside a bracket:{" "}
          <span className="inline-flex translate-y-0.5 items-center gap-2 text-ink">
            <X className="size-3.5" strokeWidth={1.75} />
            <Play className="size-3.5" strokeWidth={1.75} />
            <Pause className="size-3.5" strokeWidth={1.75} />
          </span>
          . A sport is a square dot of its accent, never a pictogram.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-label">
          {categories.map((sport) => (
            <span key={sport} className="flex items-center gap-2 text-ink-soft">
              <span aria-hidden className="size-1.5" style={{ background: sportAccent[sport] }} />
              {sport}
            </span>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Imagery — portraits in colour, the archive in grey</GroupLabel>
        <div className="grid grid-cols-[1fr_1fr_1.3fr] items-end gap-3">
          <figure className="m-0">
            <img src={pexels(people[0].photo, 300, 300)} alt="" className="aspect-square w-full rounded-tile object-cover" />
            <figcaption className="mt-1.5 font-mono text-caption uppercase tracking-label text-ink-muted">Tile · square</figcaption>
          </figure>
          <figure className="m-0">
            <img src={pexels(people[1].photo, 300, 375)} alt="" className="aspect-[4/5] w-full rounded-card object-cover" />
            <figcaption className="mt-1.5 font-mono text-caption uppercase tracking-label text-ink-muted">Portrait · 4:5</figcaption>
          </figure>
          <figure className="m-0">
            <img
              src={pexels(people[0].archive[0].photo, 500)}
              alt=""
              className="aspect-[4/3] w-full rounded-card object-cover grayscale"
            />
            <figcaption className="mt-1.5 font-mono text-caption uppercase tracking-label text-ink-muted">Archive · grey</figcaption>
          </figure>
        </div>
        <p className="mt-4 text-label text-ink-soft">
          Real photographs from Pexels, credited in every footer and on every profile. People are shot close and
          square; the archive is set in greyscale so the portrait of the day stays the only colour on the page.
        </p>
      </div>
    </div>
  )
}
