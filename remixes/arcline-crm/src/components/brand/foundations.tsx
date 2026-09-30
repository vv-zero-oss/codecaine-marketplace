import { useRef, type CSSProperties } from "react"
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, Copy, Menu, Minus, X } from "lucide-react"

import { GroupLabel } from "@/components/brand/specimen"
import { contrast, grade, toHex, useComputed } from "@/components/brand/read-style"
import { ISOCON_NAMES, Isocon } from "@/components/icons/isocon"
import { Heading } from "@/components/ui/heading"
import { FramedPhoto } from "@/components/sections/stories"
import { BRANDS, BrandLogo } from "@/components/ui/brand-logo"
import { ArclineMark, Wordmark } from "@/components/ui/wordmark"
import { PHOTOS } from "@/photos"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  {
    do: "Say what the agent did: “Logged 14 calls and drafted three follow-ups.”",
    dont: "Sell a feeling: “Supercharge your pipeline with AI magic!”",
  },
  {
    do: "Two tones: state it, then qualify it quietly in the muted half.",
    dont: "Stack adjectives: “The smart, fast, powerful, modern CRM.”",
  },
  {
    do: "Numbers with a unit and a period: “$48k closed this week.”",
    dont: "Vague scale: “Massive revenue gains for every team.”",
  },
  { do: "Sentence case, full stops, one idea per line.", dont: "Title Case, exclamation marks, emoji." },
]

function Plate({ tone, children, label }: { tone: "dark" | "light"; label: string; children: React.ReactNode }) {
  return (
    <div>
      <GroupLabel>{label}</GroupLabel>
      <div
        className={cn(
          "flex h-52 items-center justify-center rounded-panel border",
          tone === "dark" ? "texture-dots border-line-strong bg-page" : "border-transparent bg-ink",
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function BrandIdentity() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 [&>*]:min-w-0">
      <Plate tone="dark" label="Wordmark on the page">
        {/* Clear space: the mark's height on every side, drawn. */}
        <div className="rounded-control p-[17px] outline-1 outline-accent/50 outline-dashed">
          <Wordmark />
        </div>
      </Plate>
      <Plate tone="light" label="Wordmark on light">
        <div className="rounded-control p-[17px] outline-1 outline-accent-strong/50 outline-dashed">
          <Wordmark className="text-page" />
        </div>
      </Plate>
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-panel border border-line-strong bg-line-strong text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="bg-canvas p-5">
          <dt className="font-medium text-ink">Clear space</dt>
          <dd className="mt-1 text-ink-2">The mark’s height (17px) on every side — the dashed box. Nothing enters it.</dd>
        </div>
        <div className="bg-canvas p-5">
          <dt className="font-medium text-ink">Minimum size</dt>
          <dd className="mt-3 flex items-end gap-4 text-ink-2">
            <ArclineMark className="h-3 w-auto text-ink" />
            <ArclineMark className="h-4 w-auto text-ink" />
            <span>12px mark alone; the wordmark only at its set size.</span>
          </dd>
        </div>
        <div className="bg-canvas p-5">
          <dt className="font-medium text-ink">Mark only</dt>
          <dd className="mt-3 flex items-center gap-3 text-ink-2">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-surface shadow-hairline">
              <ArclineMark className="h-3.5 w-auto text-ink" />
            </span>
            <span>Favicon and avatars. Three stepped bars at 100 / 70 / 42% — never recoloured.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-line-strong overflow-hidden rounded-panel border border-line-strong bg-canvas text-sm">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-8">
              <p className="flex gap-2.5 text-ink-soft">
                <Check className="mt-0.5 size-4 shrink-0 text-green" aria-label="Do" />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-3">
                <X className="mt-0.5 size-4 shrink-0 text-red" aria-label="Don’t" />
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

/** `token` names a custom property on :root; `className` a Tailwind colour
 *  that only exists as a utility (shadcn's names are inlined by `@theme inline`). */
type SwatchSpec = { name: string; role: string; token?: string; className?: string }

const COLOUR_GROUPS: { label: string; note?: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface — darkest to lightest",
    swatches: [
      { name: "Void", token: "--void", role: "Footer, dark bands, app windows" },
      { name: "Page", token: "--page", role: "The page" },
      { name: "Canvas", token: "--canvas", role: "Alternate band, logo cells" },
      { name: "Inset", token: "--inset", role: "Sunken panels, menu aside" },
      { name: "Surface", token: "--surface", role: "Cards, popovers, plans" },
      { name: "Field", token: "--field", role: "Inputs, entity chips" },
      { name: "Hover", token: "--hover", role: "Row hover, muted" },
      { name: "Hover 2", token: "--hover-2", role: "Button and nav hover" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "Ink", token: "--ink", role: "Headings, primary text, primary fill" },
      { name: "Ink soft", token: "--ink-soft", role: "Nav, logos, emphasis in body" },
      { name: "Ink 2", token: "--ink-2", role: "Body copy, the muted half of a heading" },
      { name: "Ink 3", token: "--ink-3", role: "Meta, captions, icons at rest" },
      { name: "Ink faint", token: "--ink-faint", role: "Credits, disabled, pins" },
    ],
  },
  {
    label: "Hairlines",
    swatches: [
      { name: "Line", token: "--line", role: "Inner dividers" },
      { name: "Line strong", token: "--line-strong", role: "Every border by default, the frame" },
      { name: "Line bold", token: "--line-bold", role: "Hovered borders, ruler ticks" },
      { name: "Line soft", token: "--line-soft", role: "Barely-there rules" },
      { name: "Grid line", token: "--grid-line", role: "The 8px line texture" },
    ],
  },
  {
    label: "Accent",
    swatches: [
      { name: "Accent", token: "--accent", role: "Markers, focus ring, feature tag" },
      { name: "Accent ink", token: "--accent-ink", role: "Text on the accent tint" },
      { name: "Accent strong", token: "--accent-strong", role: "Outlines, the horizon" },
      { name: "Accent tint", token: "--accent-tint", role: "Eyebrows, selection, “New”" },
    ],
  },
  {
    label: "Signal — each with its tint",
    swatches: [
      { name: "Green", token: "--green", role: "Live, done, success" },
      { name: "Green tint", token: "--green-tint", role: "Chips, avatars" },
      { name: "Orange", token: "--orange", role: "Warm lead, attention" },
      { name: "Orange tint", token: "--orange-tint", role: "Chips, avatars" },
      { name: "Red", token: "--red", role: "Risk, failure" },
      { name: "Red tint", token: "--red-tint", role: "Chips, avatars" },
      { name: "Yellow", token: "--yellow", role: "Pending, horizon" },
      { name: "Yellow tint", token: "--yellow-tint", role: "Chips, avatars" },
      { name: "Purple", token: "--purple", role: "Improvement tag, hero glow" },
      { name: "Purple tint", token: "--purple-tint", role: "Chips, avatars" },
      { name: "Cyan", token: "--cyan", role: "Design tag, horizon" },
    ],
  },
  {
    label: "App windows",
    swatches: [
      { name: "Light red", token: "--light-red", role: "Traffic light" },
      { name: "Light yellow", token: "--light-yellow", role: "Traffic light" },
      { name: "Light green", token: "--light-green", role: "Traffic light" },
    ],
  },
  {
    label: "Tooltips (agent-UI primitives)",
    swatches: [
      { name: "Tooltip bg", token: "--tooltip-bg", role: "Tooltip fill" },
      { name: "Tooltip fg", token: "--tooltip-fg", role: "Tooltip text" },
      { name: "Tooltip muted", token: "--tooltip-muted", role: "Tooltip meta" },
      { name: "Tooltip border", token: "--tooltip-border", role: "Tooltip hairline" },
    ],
  },
  {
    label: "Status pills (agent-UI primitives)",
    note: "A base hue mixed into the surface — read off the pill classes.",
    swatches: [
      { name: "To do", className: "filter-status-todo", role: "Queued task" },
      { name: "In progress", className: "filter-status-progress", role: "Running task" },
      { name: "Done", className: "filter-status-done", role: "Finished task" },
    ],
  },
  {
    label: "shadcn names, pointed at the tokens above",
    swatches: [
      { name: "background", className: "bg-background", role: "→ page" },
      { name: "foreground", className: "bg-foreground", role: "→ ink" },
      { name: "card / popover", className: "bg-card", role: "→ surface" },
      { name: "primary", className: "bg-primary", role: "→ ink" },
      { name: "primary-foreground", className: "bg-primary-foreground", role: "→ page" },
      { name: "secondary", className: "bg-secondary", role: "→ surface" },
      { name: "muted", className: "bg-muted", role: "→ hover" },
      { name: "muted-foreground", className: "bg-muted-foreground", role: "→ ink 2" },
      { name: "destructive", className: "bg-destructive", role: "→ red" },
      { name: "border / input", className: "bg-border", role: "→ line strong" },
      { name: "ring", className: "bg-ring", role: "→ accent" },
    ],
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const [pageRef, page] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="min-w-0 overflow-hidden rounded-card border border-line-strong bg-canvas">
      <div ref={pageRef} className="bg-page">
        <div ref={ref} className={cn("h-16 border-b border-line-strong", className)} style={token ? { background: `var(${token})` } : undefined} />
      </div>
      <figcaption className="space-y-0.5 p-3.5 text-sm">
        <p className="font-medium text-ink">{name}</p>
        <p className="text-caption text-ink-2">{role}</p>
        <p className="pt-1.5 font-mono text-micro break-all text-ink-3">{token ?? `.${className}`}</p>
        <p className="font-mono text-micro break-all text-ink-3">
          {value || "—"}
          <br />
          {value ? toHex(page["background-color"] ?? "", value) : "—"}
          {value.includes("/") || /,\s*0?\.\d+\)$/.test(value) ? " over page" : ""}
        </p>
      </figcaption>
    </figure>
  )
}

/** Text over a stack of backgrounds: `base` fills the pair, `tint` sits on it. */
type PairSpec = { label: string; fg: string; base: string; tint?: string }

const PAIRS: PairSpec[] = [
  { label: "Ink on page", fg: "--ink", base: "--page" },
  { label: "Ink soft on page", fg: "--ink-soft", base: "--page" },
  { label: "Ink 2 on page", fg: "--ink-2", base: "--page" },
  { label: "Ink 3 on page", fg: "--ink-3", base: "--page" },
  { label: "Ink faint on void — credits", fg: "--ink-faint", base: "--void" },
  { label: "Ink 2 on surface", fg: "--ink-2", base: "--surface" },
  { label: "Page on ink — primary button", fg: "--page", base: "--ink" },
  { label: "Accent ink on accent tint — eyebrow", fg: "--accent-ink", base: "--page", tint: "--accent-tint" },
  { label: "Green on green tint — chip", fg: "--green", base: "--surface", tint: "--green-tint" },
  { label: "Red on red tint — chip", fg: "--red", base: "--surface", tint: "--red-tint" },
  { label: "Orange on orange tint — chip", fg: "--orange", base: "--surface", tint: "--orange-tint" },
  { label: "Purple on page — tag", fg: "--purple", base: "--page" },
  { label: "Cyan on page — tag", fg: "--cyan", base: "--page" },
  { label: "Accent on page — tag", fg: "--accent", base: "--page" },
]

export function ContrastPair({ label, fg, base, tint }: PairSpec) {
  const [outer, o] = useComputed<HTMLDivElement>(["background-color"])
  const [inner, i] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(i.color ?? "", o["background-color"] ?? "", i["background-color"] ?? "")
  return (
    <div ref={outer} className="overflow-hidden rounded-card border border-line-strong" style={{ background: `var(${base})` }}>
      <div
        ref={inner}
        className="flex items-end justify-between gap-4 p-4"
        style={{ color: `var(${fg})`, background: tint ? `var(${tint})` : "transparent" }}
      >
        <div className="min-w-0">
          <p className="font-display text-h3 font-semibold">Aa</p>
          <p className="mt-1 text-caption">{label}</p>
        </div>
        <p className="shrink-0 text-right font-mono text-micro tabular">
          {ratio == null ? "—" : `${ratio.toFixed(2)}:1`}
          <span className="block">{grade(ratio)}</span>
        </p>
      </div>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="space-y-12">
      <p className="max-w-[60ch] text-sm text-ink-2">
        One dark theme — the site sets <code className="font-mono text-caption text-ink-soft">color-scheme: dark</code> and
        has no light mode. Every swatch below is painted from its token and read back from the element: the computed
        value, then its hex (translucent tints composited over the page they sit on).
      </p>
      {COLOUR_GROUPS.map((group) => (
        <div key={group.label}>
          <GroupLabel>{group.label}</GroupLabel>
          {group.note && <p className="-mt-2 mb-4 text-caption text-ink-3">{group.note}</p>}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Text on surface — WCAG 2 contrast</GroupLabel>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {PAIRS.map((pair) => (
            <ContrastPair key={pair.label} {...pair} />
          ))}
        </div>
        <p className="mt-4 max-w-[60ch] text-caption text-ink-3">
          Ink 3 and ink faint are for meta and credits, never for sentences someone has to read; body copy stays at ink 2
          or brighter.
        </p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const TYPE_STEPS = [
  { name: "Mega", token: "text-mega", className: "font-display text-mega font-semibold", use: "The largest statement" },
  { name: "Display", token: "text-display", className: "font-display text-display font-semibold", use: "Hero at full width" },
  { name: "H1", token: "text-h1", className: "font-display text-h1 font-semibold", use: "Page titles" },
  { name: "H2", token: "text-h2", className: "font-display text-h2 font-medium", use: "Section headings" },
  { name: "H3", token: "text-h3", className: "text-h3 font-medium", use: "Chapter statements, changelog titles" },
  { name: "H4", token: "text-h4", className: "text-h4 font-medium", use: "Card and sub-feature titles" },
  { name: "Lead", token: "text-lead", className: "text-lead", use: "Ledes at md and up" },
  { name: "Base", token: "text-base", className: "text-base", use: "Body — 450 weight on the body" },
  { name: "Small", token: "text-sm", className: "text-sm", use: "Buttons, nav, card copy" },
  { name: "Caption", token: "text-caption", className: "text-caption", use: "Meta, labels, small buttons" },
  { name: "Micro", token: "text-micro", className: "text-micro", use: "Window titles, key hints" },
]

const HEADING_SIZES = [
  { name: "Heading · mega", size: "mega" },
  { name: "Heading · display", size: "display" },
  { name: "Heading · h1", size: "h1" },
  { name: "Heading · h2", size: "h2" },
  { name: "Heading · h3", size: "h3" },
  { name: "Heading · statement", size: "statement" },
] as const

const METRICS = ["font-size", "line-height", "font-weight", "letter-spacing"]

function Metrics({ values }: { values: Record<string, string> }) {
  return (
    <p className="mt-2 font-mono text-micro text-ink-3 tabular">
      {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
      {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
    </p>
  )
}

export function TypeSample({ name, token, className, use }: (typeof TYPE_STEPS)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(METRICS)
  return (
    <div className="grid gap-3 border-b border-line-strong py-6 last:border-b-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div className="text-sm">
        <p className="font-medium text-ink">
          {name} <code className="ml-1 font-mono text-micro text-ink-3">{token}</code>
        </p>
        <p className="text-ink-2">{use}</p>
        <Metrics values={values} />
      </div>
      <p ref={ref} className={cn("min-w-0 break-words text-ink", className)}>
        Work the pipeline
      </p>
    </div>
  )
}

/** The `Heading` component's sizes, read off the heading it renders. */
function HeadingSample({ name, size }: (typeof HEADING_SIZES)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(METRICS, "child")
  return (
    <div className="grid gap-3 border-b border-line-strong py-6 last:border-b-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div className="text-sm">
        <p className="font-medium text-ink">{name}</p>
        <p className="text-ink-2">Fluid with clamp() — measured at this width</p>
        <Metrics values={values} />
      </div>
      <div ref={ref} className="min-w-0">
        <Heading as="p" size={size} lead="Selling, handled." rest="The rest is logged." />
      </div>
    </div>
  )
}

function FamilyCard({
  label,
  name,
  className,
  sample,
  style,
}: {
  label: string
  name: string
  className: string
  sample: React.ReactNode
  style?: CSSProperties
}) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family", "font-feature-settings", "font-variation-settings"])
  return (
    <div ref={ref} className={cn("min-w-0 rounded-panel border border-line-strong bg-canvas p-6", className)} style={style}>
      <p className="font-sans text-sm font-medium text-ink-soft">{label}</p>
      <p className="mt-4 text-[40px] leading-[44px] text-ink">{name}</p>
      <div className="mt-4 text-sm text-ink-2">{sample}</div>
      <p className="mt-4 font-mono text-micro break-all text-ink-3">
        {values["font-family"]}
        {values["font-feature-settings"] && values["font-feature-settings"] !== "normal" && (
          <>
            <br />
            features {values["font-feature-settings"]}
          </>
        )}
        {values["font-variation-settings"] && values["font-variation-settings"] !== "normal" && (
          <>
            <br />
            variations {values["font-variation-settings"]}
          </>
        )}
      </p>
    </div>
  )
}


export function Typography() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 [&>*]:min-w-0">
        <FamilyCard
          label="Sans — everything you read"
          name="Inter"
          className="font-sans"
          sample={
            <>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz · 400 · 450 · 500 · 600
            </>
          }
        />
        <FamilyCard
          label="Display — Inter at its 32pt optical size"
          name="Inter Display"
          className="font-display font-semibold tracking-[-0.02em]"
          sample={<>Headings, prices, customer names. Semibold, tight, two tones.</>}
        />
        <FamilyCard
          label="Serif — the pull quote"
          name="Newsreader"
          className="font-serif"
          sample={<>“It reads every thread so the team doesn’t have to.”</>}
        />
        <FamilyCard
          label="Mono — code and terminal lines"
          name="JetBrains Mono"
          className="font-mono"
          sample={<>arcline.deals.list({"{ stage: \"won\" }"})</>}
        />
      </div>
      <div>
        <GroupLabel>Scale — the text-* tokens</GroupLabel>
        <div className="rounded-panel border border-line-strong bg-canvas px-5 sm:px-6">
          {TYPE_STEPS.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Heading — one voice, two volumes</GroupLabel>
        <div className="rounded-panel border border-line-strong bg-canvas px-5 sm:px-6">
          {HEADING_SIZES.map((sample) => (
            <HeadingSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-panel border border-line-strong bg-canvas p-6">
          <GroupLabel>Numerals — tabular (.tabular)</GroupLabel>
          <p className="font-display text-h1 font-semibold text-ink tabular">
            $48,120
            <br />
            11.4%
          </p>
        </div>
        <div className="rounded-panel border border-line-strong bg-canvas p-6">
          <GroupLabel>Numerals — proportional</GroupLabel>
          <p className="font-display text-h1 font-semibold text-ink">
            $48,120
            <br />
            11.4%
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const LAYOUT = [
  { name: "--spacing-frame", style: { width: "var(--spacing-frame)" }, use: "The frame’s gutter — clamp(12px, 1.67vw, 24px)" },
  { name: "--spacing-section", style: { width: "var(--spacing-section)" }, use: "A section’s top and bottom — clamp(88px, 10.5vw, 152px)" },
]

const STEPS = ["1", "1.5", "2", "2.5", "3", "4", "5", "6", "8", "10", "12", "14", "16"] as const
/** Class strings written out whole so Tailwind generates them. */
const STEP_CLASS: Record<(typeof STEPS)[number], string> = {
  "1": "w-1",
  "1.5": "w-1.5",
  "2": "w-2",
  "2.5": "w-2.5",
  "3": "w-3",
  "4": "w-4",
  "5": "w-5",
  "6": "w-6",
  "8": "w-8",
  "10": "w-10",
  "12": "w-12",
  "14": "w-14",
  "16": "w-16",
}

function Bar({ label, className, style, use }: { label: string; className?: string; style?: CSSProperties; use?: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[minmax(0,7.5rem)_3.5rem_minmax(0,1fr)] items-center gap-3 py-2 text-sm">
      <span className="truncate font-mono text-micro text-ink-3" title={use}>
        {label}
      </span>
      <span className="font-mono text-micro text-ink-soft tabular">{values.width}</span>
      <div ref={ref} className={cn("h-2.5 max-w-full rounded-[2px] bg-accent/70", className)} style={style} />
    </li>
  )
}

function ContainerGutter() {
  const [ref, values] = useComputed<HTMLDivElement>(["padding-left"], "child")
  return (
    <div className="mt-4 rounded-card border border-line-strong bg-page p-4 text-sm">
      <div ref={ref} className="outline-1 outline-accent/40 outline-dashed">
        <div className="mx-auto w-full px-5 sm:px-8 lg:px-[58px]">
          <div className="rounded-control bg-surface p-2 text-center text-caption text-ink-2">content</div>
        </div>
      </div>
      <p className="mt-3 text-caption text-ink-2">
        Container gutter at this width: <span className="font-mono text-ink-soft">{values["padding-left"]}</span> (20 → 32 →
        58px)
      </p>
    </div>
  )
}

const RADII = [
  { name: "chip", className: "rounded-chip", use: "Tags, tiny marks" },
  { name: "control", className: "rounded-control", use: "Eyebrows, icon buttons" },
  { name: "button", className: "rounded-button", use: "Buttons, nav items" },
  { name: "card", className: "rounded-card", use: "Cards, menus, code" },
  { name: "window", className: "rounded-window", use: "App windows, mega menu" },
  { name: "panel", className: "rounded-panel", use: "Panels, plans, frames" },
  { name: "full", className: "rounded-full", use: "Avatars, pills, dots" },
]

function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="min-w-0 text-sm">
      <div ref={ref} className={cn("h-20 border border-line-bold bg-surface", className)} />
      <figcaption className="mt-2">
        <span className="font-medium text-ink">{name}</span>{" "}
        <span className="font-mono text-micro text-ink-3">{values["border-top-left-radius"]}</span>
        <span className="block text-caption text-ink-2">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "xs", token: "--shadow-xs", use: "Tiny lifts" },
  { name: "sm", token: "--shadow-sm", use: "Plan cards" },
  { name: "md", token: "--shadow-md", use: "Raised mockup parts" },
  { name: "lg", token: "--shadow-lg", use: "Overlays" },
  { name: "hairline", token: "--shadow-hairline", use: "A 1px ring instead of a border" },
  { name: "btn", token: "--shadow-btn", use: "The billing thumb" },
  { name: "btn-primary", token: "--shadow-btn-primary", use: "Light on the primary’s top edge" },
  { name: "card", token: "--shadow-card", use: "Mockup cards" },
  { name: "raised", token: "--shadow-raised", use: "A card lifted off another" },
  { name: "overlay", token: "--shadow-overlay", use: "Mega menu" },
  { name: "inset-field", token: "--shadow-inset-field", use: "Sunken fields" },
  { name: "window", token: "--shadow-window", use: "App windows — five layers" },
  { name: "tile", token: "--shadow-tile", use: "Integration tiles" },
  { name: "ring-accent", token: "--shadow-ring-accent", use: "The featured plan" },
  { name: "outline-accent", token: "--shadow-outline-accent", use: "A selected cell" },
  { name: "chip-neutral", token: "--shadow-chip-neutral", use: "Chip ring" },
  { name: "chip-green", token: "--shadow-chip-green", use: "Chip ring" },
  { name: "chip-accent", token: "--shadow-chip-accent", use: "Chip ring" },
  { name: "chip-orange", token: "--shadow-chip-orange", use: "Chip ring" },
  { name: "chip-red", token: "--shadow-chip-red", use: "Chip ring" },
  { name: "chip-purple", token: "--shadow-chip-purple", use: "Chip ring" },
  { name: "chip-yellow", token: "--shadow-chip-yellow", use: "Chip ring" },
]

function ShadowSample({ name, token, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="min-w-0 text-sm">
      <div ref={ref} className="h-20 rounded-card bg-surface" style={{ boxShadow: `var(${token})` }} />
      <figcaption className="mt-3">
        <span className="font-medium text-ink">{name}</span>
        <span className="block text-caption text-ink-2">{use}</span>
        <span className="mt-1 block font-mono text-micro break-all text-ink-3">{values["box-shadow"]}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-line-strong", use: "Everything, by default" },
  { name: "Inner", className: "border border-line", use: "Dividers inside a card" },
  { name: "Hover", className: "border border-line-bold", use: "A hovered card or button" },
  { name: "Featured", className: "border border-accent/60", use: "The one plan to look at" },
  { name: "Window inset", className: "border border-white/[0.05]", use: "Inside app windows" },
  { name: "Guide", className: "border border-dashed border-accent/50", use: "Clear space — guides only" },
]

function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-bottom-width", "border-bottom-style", "border-bottom-color"])
  return (
    <figure className="min-w-0 text-sm">
      <div ref={ref} className={cn("h-14 rounded-card bg-canvas", className)} />
      <figcaption className="mt-2">
        <span className="font-medium text-ink">{name}</span>
        <span className="block text-caption text-ink-2">{use}</span>
        <span className="mt-1 block font-mono text-micro break-all text-ink-3">
          {values["border-bottom-width"]} {values["border-bottom-style"]} {values["border-bottom-color"]}
        </span>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 [&>*]:min-w-0">
        <div>
          <GroupLabel>Spacing — Tailwind’s 4px steps, and two layout tokens</GroupLabel>
          <ul className="rounded-panel border border-line-strong bg-canvas px-5 py-3">
            {LAYOUT.map((item) => (
              <Bar key={item.name} label={item.name} style={item.style} use={item.use} />
            ))}
            {STEPS.map((step) => (
              <Bar key={step} label={`${step} · ${STEP_CLASS[step]}`} className={STEP_CLASS[step]} />
            ))}
          </ul>
          <ContainerGutter />
        </div>
        <div>
          <GroupLabel>Radii — the radius-* tokens</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-2">
            Sections breathe at <span className="font-mono text-caption text-ink-soft">--spacing-section</span>, cards
            pad at 20–24px, and gaps sit on 8, 10 and 24. Density comes from hairlines, not from boxes.
          </p>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — layered, single-digit opacity, tuned for a dark page</GroupLabel>
        <div className="grid grid-cols-1 gap-8 rounded-panel border border-line-strong bg-page p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3 xl:grid-cols-4">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BORDERS.map((border) => (
            <BorderSample key={border.name} {...border} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

/** Each curve with the Tailwind class that carries it and a duration it is used at. */
const EASINGS = [
  { name: "Out", className: "ease-out duration-[600ms]", where: "Reveal entrances, rolling prices, lines landing" },
  { name: "Emphasized", className: "ease-emphasized duration-300", where: "Every hover and state change — in at 50ms, out over 300ms" },
  { name: "Out cubic", className: "ease-out-cubic duration-150", where: "Link underline, chapter marker, persona marker" },
  { name: "In-out cubic", className: "ease-in-out-cubic duration-300", where: "Accordion, announcement bar" },
  { name: "Reveal", className: "ease-reveal duration-[1200ms]", where: "Charts drawing left to right" },
  { name: "Out strong", className: "ease-out-strong duration-500", where: "Held in reserve for bigger moves" },
  { name: "In-out strong", className: "ease-in-out-strong duration-500", where: "Held in reserve for page-scale moves" },
  { name: "Link", className: "ease-link duration-300", where: "Held in reserve for link motion" },
]

function bezier(value: string): [number, number, number, number] | null {
  const m = value.match(/cubic-bezier\(([^)]+)\)/)
  if (!m) return null
  const n = m[1].split(",").map((x) => Number.parseFloat(x))
  return n.length === 4 && n.every((x) => Number.isFinite(x)) ? (n as [number, number, number, number]) : null
}

function EasingSample({ name, className, where }: (typeof EASINGS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["transition-timing-function", "transition-duration"])
  const dot = useRef<HTMLSpanElement>(null)
  const easing = values["transition-timing-function"] ?? ""
  const duration = Number.parseFloat(values["transition-duration"] ?? "0") * 1000
  const b = bezier(easing)

  const play = () => {
    const el = dot.current
    if (!el || !easing) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.getAnimations().forEach((a) => a.cancel())
    el.animate([{ left: "0%" }, { left: "100%" }], {
      duration: reduced ? 1 : Math.max(duration, 400),
      easing,
      fill: "forwards",
    })
  }

  return (
    <div ref={ref} className={cn("flex min-w-0 flex-col rounded-panel border border-line-strong bg-canvas p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-ink">{name}</p>
          <p className="text-caption text-ink-2">{where}</p>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-8 shrink-0 items-center rounded-button border border-line-strong bg-page px-3 text-caption font-medium text-ink transition-colors duration-300 hover:border-line-bold hover:bg-surface hover:duration-[50ms] active:bg-hover"
        >
          Play
        </button>
      </div>
      <svg viewBox="-4 -14 108 128" className="mt-4 h-24 w-full" preserveAspectRatio="none" aria-hidden>
        <path d="M0 100 L100 0" stroke="var(--line-strong)" strokeDasharray="2 3" fill="none" vectorEffect="non-scaling-stroke" />
        {b && (
          <path
            d={`M0 100 C${b[0] * 100} ${100 - b[1] * 100} ${b[2] * 100} ${100 - b[3] * 100} 100 0`}
            stroke="var(--accent)"
            strokeWidth={1.5}
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      <div className="relative mt-3 h-2 rounded-full bg-hover">
        <span ref={dot} className="absolute top-1/2 left-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
      </div>
      <p className="mt-3 font-mono text-micro break-all text-ink-3">
        {easing} · {duration}ms
      </p>
    </div>
  )
}

const LOOPS = [
  { name: "bob", className: "animate-bob", where: "Floating cards in mockups" },
  { name: "ring-pulse", className: "animate-ring", where: "The intent score’s rings" },
  { name: "caret-blink", className: "animate-caret", where: "The typing caret" },
  { name: "beam-pulse", className: "animate-beam-pulse", where: "BorderBeam, pulse sizes" },
]

function LoopSample({ name, className, where }: (typeof LOOPS)[number]) {
  const [ref, values] = useComputed<HTMLSpanElement>(["animation-duration", "animation-timing-function", "animation-name"])
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-card border border-line-strong bg-canvas p-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-control bg-page">
        <span ref={ref} className={cn("block h-5 w-2 rounded-[2px] bg-accent motion-reduce:animate-none", className)} />
      </span>
      <div className="min-w-0 text-sm">
        <p className="font-medium text-ink">{name}</p>
        <p className="text-caption text-ink-2">{where}</p>
        <p className="font-mono text-micro break-all text-ink-3">
          {values["animation-duration"]} · {values["animation-timing-function"]}
        </p>
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="space-y-10">
      <p className="max-w-[60ch] text-sm text-ink-2">
        Hovers answer the pointer at once and let go softly; content comes into focus rather than sliding in. Every curve
        is a <code className="font-mono text-caption text-ink-soft">--ease-*</code> token, and{" "}
        <code className="font-mono text-caption text-ink-soft">lib/motion.ts</code> holds the same numbers for Framer
        Motion. Play runs through the Web Animations API, and is instant when reduced motion is on.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {EASINGS.map((e) => (
          <EasingSample key={e.name} {...e} />
        ))}
      </div>
      <div>
        <GroupLabel>Loops — CSS keyframes, so the editor’s Motion switch stops them</GroupLabel>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {LOOPS.map((l) => (
            <LoopSample key={l.name} {...l} />
          ))}
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-3 text-sm text-ink-2 md:grid-cols-3">
        <li className="rounded-card border border-line-strong bg-canvas p-5">
          <span className="font-medium text-ink">Scroll</span> is Lenis at lerp 0.1, held in a ref by{" "}
          <code className="font-mono text-caption">SmoothScroll</code> so the editor can pause it; not created at all for
          reduced motion.
        </li>
        <li className="rounded-card border border-line-strong bg-canvas p-5">
          <span className="font-medium text-ink">Reveal</span> — 8px rise, 1.5px blur clearing, 0.6s on Out. Held at its
          end state while designing and for reduced motion.
        </li>
        <li className="rounded-card border border-line-strong bg-canvas p-5">
          <span className="font-medium text-ink">Loops</span> (hero scenes, signals, streaming text) hold still while the
          page is designed; each has an action to step it.
        </li>
      </ul>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const LUCIDE = [
  { name: "ArrowRight", Icon: ArrowRight },
  { name: "ArrowUpRight", Icon: ArrowUpRight },
  { name: "ChevronRight", Icon: ChevronRight },
  { name: "ChevronDown", Icon: ChevronDown },
  { name: "Check", Icon: Check },
  { name: "Minus", Icon: Minus },
  { name: "Copy", Icon: Copy },
  { name: "Menu", Icon: Menu },
  { name: "X", Icon: X },
]

export function Iconography() {
  const isocons = ISOCON_NAMES
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        <div className="rounded-panel border border-line-strong bg-canvas p-6">
          <GroupLabel>Interface icons — Lucide, 14–20px, in currentColor</GroupLabel>
          <div className="flex flex-wrap gap-2">
            {LUCIDE.map(({ name, Icon }) => (
              <span
                key={name}
                title={name}
                className="flex size-10 items-center justify-center rounded-control bg-page text-ink-soft shadow-hairline"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-2">
            Arrows nudge 2px on hover; chevrons turn. Icons sit at ink 3 at rest and ink when their row is hovered.
          </p>
        </div>
        <div className="rounded-panel border border-line-strong bg-canvas p-6">
          <GroupLabel>Isometric line icons — Isocons, hairline, trace in on hover</GroupLabel>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6">
            {isocons.map((name) => (
              <span
                key={name}
                title={name}
                className="group/iso flex aspect-square items-center justify-center rounded-control bg-page p-3 text-ink-2 shadow-hairline transition-colors duration-300 hover:text-accent-ink"
              >
                <Isocon name={name} draw />
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-2">
            CC BY 4.0, recoloured to currentColor, non-scaling 1px stroke. Hover one to see it draw.
          </p>
        </div>
      </div>
      <div className="rounded-panel border border-line-strong bg-canvas p-6">
        <GroupLabel>Customer and integration logos — SVGL, one flat colour through a mask</GroupLabel>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 text-ink-soft">
          {BRANDS.map((brand) => (
            <BrandLogo key={brand} brand={brand} scale={0.8} />
          ))}
        </div>
        <p className="mt-5 text-sm text-ink-2">Never drawn by hand, never in their own colours: every logo takes the ink it is set in.</p>
      </div>
      <div>
        <GroupLabel>Photography — Pexels, framed like a print</GroupLabel>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(Object.keys(PHOTOS) as (keyof typeof PHOTOS)[]).map((key) => (
            <figure key={key} className="min-w-0">
              <FramedPhoto image={key} />
              <figcaption className="mt-2 text-caption text-ink-3">
                {PHOTOS[key].by} · Pexels
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 max-w-[60ch] text-sm text-ink-2">
          Real teams at work, warm and unstaged, in natural light. Always in a surface mat with a hairline and 8px
          corners; never full-bleed, never under text. The product itself is never a picture — mockups are HTML.
        </p>
      </div>
    </div>
  )
}
