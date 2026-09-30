import { ArrowRight, CableCar, CalendarDays, Check, Footprints, Loader2, Menu, Plus, TrainFront, X } from "lucide-react"
import { useRef, type CSSProperties, type ReactNode } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel } from "@/components/brand/specimen"
import { Print } from "@/components/ui/print"
import { Stamp } from "@/components/ui/stamp"
import { TornEdge } from "@/components/ui/torn-edge"
import { Wordmark } from "@/components/ui/wordmark"
import { cover, house, rooms } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  {
    do: "Say it with the number: “Two hundred metres from the Sunnegga funicular.”",
    dont: "Say it with an adjective: “Steps from world-class skiing.”",
  },
  { do: "Say what it isn’t: “It is not a resort.”", dont: "Reach for a slogan: “Luxury, redefined.”" },
  {
    do: "Full sentences and full stops. Times in 24 hours, prices in CHF, as the desk would write them.",
    dont: "Exclamation marks, “nestled”, “unforgettable”, “hidden gem”.",
  },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <GroupLabel>On paper</GroupLabel>
        <div className="flex h-52 items-center justify-center rounded-print bg-sheet shadow-(--shadow-print)">
          {/* Clear space: the height of the A on every side, drawn. */}
          <div className="p-6 outline-1 outline-signal/50 outline-dashed">
            <Wordmark className="[&>span:first-child]:text-5xl" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>On pine</GroupLabel>
        <div className="flex h-52 items-center justify-center rounded-print bg-pine text-pine-ink">
          <div className="p-6 outline-1 outline-pine-ink/35 outline-dashed">
            <Wordmark className="[&>span:first-child]:text-5xl [&>span:last-child]:text-pine-ink/60" />
          </div>
        </div>
      </div>
      <dl className="grid gap-px overflow-hidden rounded-print border border-rule bg-rule text-[15px] sm:grid-cols-3 lg:col-span-2">
        <div className="bg-sheet p-5">
          <dt className="label text-ink-faint">Clear space</dt>
          <dd className="mt-2 text-ink-soft">The height of the name’s capital on every side — the dashed box. Rules and photographs stay out of it.</dd>
        </div>
        <div className="bg-sheet p-5">
          <dt className="label text-ink-faint">Minimum size</dt>
          <dd className="mt-2 flex flex-wrap items-baseline gap-3 text-ink-soft">
            <Wordmark className="[&>span:first-child]:text-lg [&>span:last-child]:text-[9px]" />
            <span>18px name; below that, drop “Since 1911”.</span>
          </dd>
        </div>
        <div className="bg-sheet p-5">
          <dt className="label text-ink-faint">The seal</dt>
          <dd className="mt-2 flex items-center gap-4 text-ink-soft">
            <Stamp className="w-16 shrink-0" />
            <span>Pressed, never drawn: in signal red, multiplied into the paper, once per page.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice — the front desk writing a note, not a brochure</GroupLabel>
        <ul className="border-t border-ink">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-3 border-b border-rule py-5 sm:grid-cols-2 sm:gap-8">
              <p className="flex gap-3 font-serif text-lg leading-snug">
                <Check className="mt-1 size-4 shrink-0 text-pine" aria-label="Do" />
                {line.do}
              </p>
              <p className="flex gap-3 font-serif text-lg leading-snug text-ink-faint">
                <X className="mt-1 size-4 shrink-0 text-signal" aria-label="Don’t" />
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

/** Class strings written out whole, so Tailwind generates each one. */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Paper",
    swatches: [
      { name: "Paper", token: "--color-paper", className: "bg-paper", role: "The page" },
      { name: "Paper deep", token: "--color-paper-deep", className: "bg-paper-deep", role: "“A day”, hovered rows" },
      { name: "Paper edge", token: "--color-paper-edge", className: "bg-paper-edge", role: "Contours, secondary hover" },
      { name: "Sheet", token: "--color-sheet", className: "bg-sheet", role: "Prints, cards, the map" },
    ],
  },
  {
    label: "Ink",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Type, rules, the primary button" },
      { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft", role: "Ledes, notes, nav" },
      { name: "Ink faint", token: "--color-ink-faint", className: "bg-ink-faint", role: "Labels, placeholders" },
      { name: "Rule", token: "--color-rule", className: "bg-rule", role: "Hairlines, leaders" },
    ],
  },
  {
    label: "Pine",
    swatches: [
      { name: "Pine", token: "--color-pine", className: "bg-pine", role: "“Arriving”, the back cover" },
      { name: "Pine deep", token: "--color-pine-deep", className: "bg-pine-deep", role: "Shadowed pine" },
      { name: "Pine ink", token: "--color-pine-ink", className: "bg-pine-ink", role: "Type on pine" },
    ],
  },
  {
    label: "Signal",
    swatches: [
      { name: "Signal", token: "--color-signal", className: "bg-signal", role: "Reserve, the stamp, times, focus" },
      { name: "Signal deep", token: "--color-signal-deep", className: "bg-signal-deep", role: "Reserve, hovered" },
    ],
  },
]

/** shadcn’s names in `:root`, each pointing at the palette. */
const SEMANTIC = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="rounded-print bg-sheet p-1.5 shadow-(--shadow-print)">
      <div ref={ref} className={cn("h-20 rounded-[1px]", className)} />
      <figcaption className="space-y-0.5 px-2 pt-3 pb-2 text-[13px]">
        <p className="font-serif text-lg leading-tight">{name}</p>
        <p className="text-ink-soft">{role}</p>
        <p className="label pt-1 text-[10px] break-all text-ink-faint normal-case">{token}</p>
        <p className="font-mono text-[11px] break-all text-ink-faint">
          {value || "—"} · {value ? toHex(value) : "—"}
        </p>
      </figcaption>
    </figure>
  )
}

function Semantic({ name }: { name: string }) {
  const [ref, values] = useComputed<HTMLSpanElement>(["background-color"])
  return (
    <li className="flex items-baseline gap-2 border-b border-rule py-2 text-[14px]">
      <span ref={ref} className="size-3.5 shrink-0 translate-y-0.5 rounded-[1px] ring-1 ring-ink/15" style={{ background: `var(--${name})` }} />
      <span className="font-mono text-[12px]">--{name}</span>
      <span className="leader" aria-hidden />
      <span className="font-mono text-[11px] text-ink-faint">{values["background-color"] ? toHex(values["background-color"]) : "—"}</span>
    </li>
  )
}

/** The pairs type is actually set in on the page. */
const PAIRS = [
  { label: "Ink on paper — all the type", className: "bg-paper text-ink" },
  { label: "Ink soft on paper — ledes, notes", className: "bg-paper text-ink-soft" },
  { label: "Ink faint on paper — labels", className: "bg-paper text-ink-faint" },
  { label: "Ink on sheet — prints, the card", className: "bg-sheet text-ink" },
  { label: "Ink on paper deep — “A day”", className: "bg-paper-deep text-ink" },
  { label: "Signal on paper — times, “Chosen”", className: "bg-paper text-signal" },
  { label: "Signal on paper deep — timetable", className: "bg-paper-deep text-signal" },
  { label: "Pine ink on pine — “Arriving”", className: "bg-pine text-pine-ink" },
  { label: "Sheet on signal — Reserve button", className: "bg-signal text-sheet" },
  { label: "Paper on ink — primary button", className: "bg-ink text-paper" },
]

export function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Below AA"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-print p-5 shadow-(--shadow-print)", className)}>
      <div className="min-w-0">
        <p className="font-serif text-3xl leading-none">Aa</p>
        <p className="mt-2 text-[13px]">{label}</p>
      </div>
      <p className="shrink-0 text-right font-mono text-[11px] tabular-nums">
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.token} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <GroupLabel>shadcn’s names, in :root</GroupLabel>
          <ul className="sm:columns-2 sm:gap-8 lg:columns-1 xl:columns-2">
            {SEMANTIC.map((name) => (
              <Semantic key={name} name={name} />
            ))}
          </ul>
        </div>
        <div>
          <GroupLabel>The paper itself</GroupLabel>
          <div className="relative h-48 overflow-hidden rounded-print bg-paper shadow-(--shadow-print)">
            <div aria-hidden className="paper-grain absolute inset-0 opacity-60 mix-blend-multiply" />
            <p className="absolute bottom-4 left-4 font-serif text-lg">paper-grain</p>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            A fine tooth and a few slow blotches, multiplied over the whole page at 60% — photographs and film
            included — so everything sits in the sheet rather than on a screen.
          </p>
        </div>
      </div>
      <div>
        <GroupLabel>Type on paper — WCAG 2 contrast</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAIRS.map((pair) => (
            <ContrastPair key={pair.label} {...pair} />
          ))}
        </div>
        <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-ink-soft">
          Ink faint only carries small uppercase labels and placeholders, never a sentence; anything a guest has to
          read is ink or ink soft.
        </p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const TYPE_SCALE = [
  { name: "Cover", className: "font-serif text-cover font-normal tracking-[-0.03em]", use: "The cover line", sample: "The last house before the lifts." },
  { name: "Display", className: "font-serif text-display font-normal tracking-[-0.02em]", use: "Chapter titles", sample: "Four kinds of room, one price list." },
  { name: "Closing", className: "font-serif text-4xl leading-tight sm:text-5xl", use: "The back cover’s line", sample: "The ski room opens at 7:15." },
  { name: "Heading", className: "font-serif text-2xl leading-tight", use: "Rooms, questions, spots", sample: "Double, valley side" },
  { name: "Reading", className: "font-serif text-xl leading-[1.55]", use: "The house’s story", sample: "It is not a resort. There is one lounge with a fire." },
  { name: "Quote", className: "font-serif text-2xl leading-snug italic", use: "The guest book", sample: "“We came for four nights and stayed nine.”" },
  { name: "Lede", className: "font-sans text-lede", use: "Under the cover line", sample: "Thirty-two rooms of larch and stone." },
  { name: "Body", className: "font-sans text-base leading-relaxed", use: "Answers, chapter ledes", sample: "No deposit now. The front desk confirms by email within the hour." },
  { name: "Small", className: "font-sans text-[13px]", use: "Nav, notes, captions", sample: "Free cancellation until 14 days before arrival." },
  { name: "Time", className: "font-mono text-xl tabular-nums", use: "The timetable, prices", sample: "08:00  CHF 420" },
  { name: "Label", className: "label", use: "Every printed label", sample: "No. 04 · Rooms & rates" },
]

export function TypeSample({ name, className, use, sample }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-rule py-6 last:border-b-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
      <div className="text-[13px]">
        <p className="font-serif text-lg leading-tight">{name}</p>
        <p className="text-ink-soft">{use}</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-faint tabular-nums">
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </p>
      </div>
      <p ref={ref} className={cn("min-w-0 break-words text-ink", className)}>
        {sample}
      </p>
    </div>
  )
}

function Family({ label, name, className, weights, children }: { label: string; name: string; className: string; weights: string; children?: ReactNode }) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <div ref={ref} className={cn("rounded-print bg-sheet p-6 shadow-(--shadow-print)", className)}>
      <p className="label text-ink-faint">{label}</p>
      <p className="mt-3 text-4xl leading-none">{name}</p>
      {children}
      <p className="mt-4 text-[14px] text-ink-soft">
        ABCDEFGHIJKLM nopqrstuvwxyz 0123456789
        <br />
        {weights}
      </p>
      <p className="mt-4 font-mono text-[11px] break-all text-ink-faint">{values["font-family"]}</p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-3">
        <Family label="Serif — what you read" name="Newsreader" className="font-serif" weights="300–600, roman and italic, optical sizes">
          <p className="mt-2 text-2xl italic">set like a guide</p>
        </Family>
        <Family label="Sans — what you use" name="Instrument Sans" className="font-sans" weights="400–600" />
        <Family label="Mono — labels and times" name="IBM Plex Mono" className="font-mono" weights="400 · 500" />
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        <div className="rounded-print bg-sheet px-5 shadow-(--shadow-print) sm:px-8">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-print bg-sheet p-6 shadow-(--shadow-print)">
          <p className="label text-ink-faint">Drop cap</p>
          <p className="mt-3 font-serif text-xl leading-[1.55] first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-signal">
            Arven was built in 1911 as a six-room guesthouse for climbers waiting on the weather.
          </p>
        </div>
        <div className="rounded-print bg-sheet p-6 shadow-(--shadow-print)">
          <p className="label text-ink-faint">Numerals — tabular (prices, times)</p>
          <p className="mt-3 font-mono text-2xl tabular-nums">
            {rooms.map((r) => (
              <span key={r.id} className="block">
                CHF {r.winter}
              </span>
            ))}
          </p>
        </div>
        <div className="rounded-print bg-sheet p-6 shadow-(--shadow-print)">
          <p className="label text-ink-faint">Leaders — price lists, the desk</p>
          <ul className="mt-3 text-[15px]">
            {["Ski pass, 6 days", "Sauna, private hour", "Late check-out"].map((what, i) => (
              <li key={what} className="flex items-baseline gap-2 border-b border-rule py-2.5">
                {what}
                <span className="leader" aria-hidden />
                <span className="font-mono text-sm tabular-nums">{["CHF 402", "CHF 45", "CHF 60"][i]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = [
  { step: "section", className: "w-(--spacing-section)", use: "Between chapters (fluid)" },
  { step: "14", className: "w-14", use: "Availability line, above" },
  { step: "12", className: "w-12", use: "Chapter head to content" },
  { step: "10", className: "w-10", use: "Page gutter, desktop" },
  { step: "8", className: "w-8", use: "Gutter, tablet; grid gaps" },
  { step: "6", className: "w-6", use: "Label to title" },
  { step: "5", className: "w-5", use: "Gutter, phone; row padding" },
  { step: "3", className: "w-3", use: "Label on its rule" },
  { step: "2.5", className: "w-2.5", use: "The print’s white border" },
]

export function SpacingStep({ step, className, use }: (typeof SPACING)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[4rem_4rem_minmax(0,1fr)] items-center gap-3 border-b border-rule py-2.5 text-[13px] last:border-b-0">
      <span className="font-mono text-[11px] text-ink-faint">{step}</span>
      <span className="font-mono text-[11px] text-ink-soft tabular-nums">{values.width}</span>
      <span className="flex min-w-0 items-center gap-3">
        <span ref={ref} className={cn("h-3 max-w-full shrink-0 bg-signal/80", className)} />
        <span className="hidden truncate text-ink-soft sm:inline">{use}</span>
      </span>
    </li>
  )
}

const RADII = [
  { name: "print", className: "rounded-print", use: "Prints, cards, popovers" },
  { name: "control", className: "rounded-control", use: "Buttons" },
  { name: "sm", className: "rounded-sm", use: "shadcn small" },
  { name: "md", className: "rounded-md", use: "Inputs (shadcn)" },
  { name: "lg", className: "rounded-lg", use: "shadcn large" },
  { name: "xl", className: "rounded-xl", use: "shadcn extra" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="text-[13px]">
      <div ref={ref} className={cn("h-16 border border-ink bg-sheet", className)} />
      <figcaption className="mt-2">
        <span className="font-serif text-base">{name}</span>{" "}
        <span className="font-mono text-[11px] text-ink-faint">{values["border-top-left-radius"]}</span>
        <span className="block text-ink-soft">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "print", className: "shadow-(--shadow-print)", use: "A photograph lying on the page" },
  { name: "sheet", className: "shadow-(--shadow-sheet)", use: "The registration card, popovers" },
  { name: "none", className: "shadow-(--shadow-none)", use: "Flat print — most things" },
]

export function ShadowSample({ name, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="text-[13px]">
      <div ref={ref} className={cn("h-24 rounded-print bg-sheet", className)} />
      <figcaption className="mt-3">
        <span className="font-serif text-base">{name}</span>
        <span className="block text-ink-soft">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-faint">{values["box-shadow"]}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Chapter rule", className: "border-t border-ink", use: "Above every chapter, tables" },
  { name: "Hairline", className: "border-t border-rule", use: "Rows, dividers" },
  { name: "Card head", className: "border-t-2 border-ink", use: "The registration card, totals" },
  { name: "Leader", className: "border-t border-dotted border-rule", use: "Price lists, the desk" },
  { name: "Fill-in line", className: "border-t border-ink", use: "Form fields — a rule to write on" },
  { name: "On pine", className: "border-t border-pine-ink/25", use: "Rules on the pine sheet" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-width", "border-top-color", "border-top-style"])
  const pine = name === "On pine"
  return (
    <figure className="text-[13px]">
      <div className={cn("flex h-14 items-center px-3", pine ? "bg-pine" : "bg-sheet")}>
        <div ref={ref} className={cn("w-full", className)} />
      </div>
      <figcaption className="mt-2">
        <span className="font-serif text-base">{name}</span>
        <span className="block text-ink-soft">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-faint">
          {values["border-top-width"]} {values["border-top-style"]} {values["border-top-color"]}
        </span>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <GroupLabel>Spacing — Tailwind’s 4px steps, and one for sections</GroupLabel>
          <ul className="rounded-print bg-sheet px-5 py-2 shadow-(--shadow-print)">
            {SPACING.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
        </div>
        <div>
          <GroupLabel>Radii — printed matter has square-ish corners</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — a sheet lying on a sheet</GroupLabel>
        <div className="grid gap-8 rounded-print bg-paper-deep p-6 sm:grid-cols-3 sm:p-8">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders and rules</GroupLabel>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BORDERS.map((border) => (
            <BorderSample key={border.name} {...border} />
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <figure className="text-[13px]">
            <div className="bg-sheet px-3 py-6">
              <div aria-hidden className="h-[5px] border-y border-ink/80" />
            </div>
            <figcaption className="mt-2">
              <span className="font-serif text-base">Masthead double rule</span>
              <span className="block text-ink-soft">Under the running head, as a printed guide carries it.</span>
            </figcaption>
          </figure>
          <figure className="text-[13px]">
            <div className="bg-paper pt-4">
              <TornEdge tone="pine" seed={5} className="-mb-px" />
              <div className="h-6 bg-pine" />
            </div>
            <figcaption className="mt-2">
              <span className="font-serif text-base">Torn edge</span>
              <span className="block text-ink-soft">Where one sheet starts over another — never a straight cut.</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

type MotionSpec = {
  name: string
  where: string
  /** A CSS custom property holding the curve. */
  easing: string
  /** A CSS custom property holding the duration, or milliseconds. */
  duration: string | number
  keyframes: Keyframe[]
  /** What stays under reduced motion; without it, nothing moves. */
  reduced?: Keyframe[]
  sample?: "stamp" | "row"
}

const MOTIONS: MotionSpec[] = [
  {
    name: "Press",
    where: "Every button — scale 0.97",
    easing: "--ease-out",
    duration: "--duration-press",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Reveal",
    where: "Prints, rows and quotes, first time in view",
    easing: "--ease-out",
    duration: 700,
    keyframes: [
      { opacity: 0, transform: "translateY(24px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
  },
  {
    name: "Stamp",
    where: "Pressed onto the card when a request is sent",
    easing: "--ease-out",
    duration: 220,
    keyframes: [
      { opacity: 0, transform: "scale(1.25) rotate(-4deg)" },
      { opacity: 1, transform: "scale(1) rotate(0deg)" },
    ],
    reduced: [{ opacity: 0 }, { opacity: 1 }],
    sample: "stamp",
  },
  {
    name: "Accordion",
    where: "An answer opening — 240ms down, 180ms up",
    easing: "--ease-out",
    duration: 240,
    keyframes: [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
  },
  {
    name: "Rate photo",
    where: "The photograph beside the row in hand",
    easing: "--ease-out",
    duration: 200,
    keyframes: [
      { opacity: 0, transform: "translateY(6px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    reduced: [{ opacity: 0 }, { opacity: 1 }],
    sample: "row",
  },
  {
    name: "Film split",
    where: "Seasons: the screen parts into three",
    easing: "--ease-in-out",
    duration: 900,
    keyframes: [{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(0 34% 0 34%)" }, { clipPath: "inset(0 0 0 0)" }],
  },
]

function read(value: string | number) {
  if (typeof value === "number") return value
  const raw = getComputedStyle(document.documentElement).getPropertyValue(value).trim()
  return raw.endsWith("ms") ? parseFloat(raw) : raw.endsWith("s") ? parseFloat(raw) * 1000 : parseFloat(raw)
}

/** Plays one of the page's motions through the Web Animations API — so the
 *  editor's Motion switch stops and reduces it like the page's own. The curve
 *  and duration are read off the stylesheet when it plays. */
export function MotionSample({ name, where, easing, duration, keyframes, reduced, sample }: MotionSpec) {
  const target = useRef<HTMLDivElement>(null)
  const [readout, values] = useComputed<HTMLSpanElement>(["--probe-ease", "--probe-duration"])
  const probe = {
    "--probe-ease": `var(${easing})`,
    "--probe-duration": typeof duration === "number" ? `${duration}ms` : `var(${duration})`,
  } as CSSProperties
  const play = () => {
    const element = target.current
    if (!element) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.getAnimations().forEach((animation) => animation.cancel())
    if (reduce && !reduced) return
    element.animate(reduce && reduced ? reduced : keyframes, {
      duration: read(duration),
      easing: getComputedStyle(document.documentElement).getPropertyValue(easing).trim(),
      fill: "none",
    })
  }
  return (
    <div className="flex flex-col rounded-print bg-sheet p-4 shadow-(--shadow-print)">
      <div className="flex h-28 items-center justify-center overflow-hidden bg-paper px-4">
        {sample === "stamp" ? (
          <div ref={target} className="w-24">
            <Stamp ring="Received · Hotel Arven · " top="Front desk" middle="12.1." bottom="Zermatt" rotate={9} />
          </div>
        ) : sample === "row" ? (
          <div ref={target} className="w-28 rounded-print bg-sheet p-1 shadow-(--shadow-print)">
            <img src={rooms[0].image} alt="" className="aspect-[4/3] w-full object-cover saturate-[0.92] sepia-[0.08]" />
          </div>
        ) : (
          <div ref={target} className="h-12 w-full origin-top rounded-control bg-ink" />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 text-[13px]">
        <div className="min-w-0">
          <p className="font-serif text-lg leading-tight">{name}</p>
          <p className="text-ink-soft">{where}</p>
          <span ref={readout} style={probe} className="mt-1 block font-mono text-[11px] break-all text-ink-faint">
            {values["--probe-duration"]} · {values["--probe-ease"]}
          </span>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-9 shrink-0 items-center rounded-control border border-ink px-4 text-[13px] font-medium transition-[background-color,color,transform] duration-(--duration-press) ease-(--ease-out) outline-none hover:bg-ink hover:text-paper focus-visible:ring-[3px] focus-visible:ring-signal/35 active:scale-[0.97]"
        >
          Play
        </button>
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOTIONS.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <ul className="grid gap-4 text-[15px] leading-relaxed text-ink-soft sm:grid-cols-2">
        <li className="border-t border-ink pt-3">
          <span className="font-serif text-lg text-ink">Scroll is Lenis</span>, a light glide (lerp 0.12) held in a
          ref so the editor can pause it. Scroll effects — the film zoom, the footage in the letters, the back cover’s
          name — are halved on phones.
        </li>
        <li className="border-t border-ink pt-3">
          <span className="font-serif text-lg text-ink">Reduced motion</span> is read from the media query: reveals
          render in place, the film shows its finished split, parallax stops, and Lenis steps aside.
        </li>
      </ul>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [
  { Icon: ArrowRight, name: "ArrowRight", use: "On to the rates" },
  { Icon: CalendarDays, name: "CalendarDays", use: "Dates" },
  { Icon: Plus, name: "Plus", use: "A question, closed" },
  { Icon: Footprints, name: "Footprints", use: "On foot" },
  { Icon: CableCar, name: "CableCar", use: "By lift" },
  { Icon: TrainFront, name: "TrainFront", use: "By train" },
  { Icon: Menu, name: "Menu", use: "Chapters, phone" },
  { Icon: Loader2, name: "Loader2", use: "Sending" },
]

export function Iconography() {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <GroupLabel>Lucide, small, beside a word</GroupLabel>
          <ul className="grid grid-cols-4 gap-px overflow-hidden rounded-print border border-rule bg-rule">
            {ICONS.map(({ Icon, name, use }) => (
              <li key={name} className="flex flex-col items-center gap-2 bg-sheet px-2 py-4 text-center" title={use}>
                <Icon className="size-4" aria-hidden />
                <span className="font-mono text-[10px] break-all text-ink-faint">{name}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            Icons are 14–20px in the ink of the line they sit on, and always next to a label. Everything else is
            printed matter drawn for the page: the stamp, the torn edge, the trail map’s pins and hachures.
          </p>
        </div>
        <div>
          <GroupLabel>Drawn, not iconified</GroupLabel>
          <div className="flex items-center justify-around gap-4 rounded-print bg-sheet p-6 shadow-(--shadow-print)">
            <Stamp className="w-28" />
            <svg viewBox="0 0 12 12" className="w-10" aria-hidden>
              <circle cx="6" cy="6" r="5" className="fill-signal" />
              <text x="6" y="8" textAnchor="middle" fontSize="5.5" className="fill-sheet font-mono">
                3
              </text>
            </svg>
            <svg viewBox="0 0 12 12" className="w-10" aria-hidden>
              <circle cx="6" cy="6" r="5" className="fill-sheet stroke-ink" strokeWidth="0.5" />
              <text x="6" y="8" textAnchor="middle" fontSize="5.5" className="fill-ink font-mono">
                4
              </text>
            </svg>
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Photography — Pexels, printed with a white border</GroupLabel>
        <div className="grid gap-6 sm:grid-cols-3">
          <Print src={cover.image} alt={cover.imageAlt} fig="1" caption="Mounted, captioned in italic." ratio="4/5" />
          <Print src={house.image} alt={house.imageAlt} fig="2" caption="Warmed a touch: saturation 92%, sepia 8%." ratio="4/5" />
          <Print src={rooms[1].image} alt={rooms[1].alt} fig="3" caption="Never full-bleed on paper; film is." ratio="4/5" />
        </div>
      </div>
    </div>
  )
}
