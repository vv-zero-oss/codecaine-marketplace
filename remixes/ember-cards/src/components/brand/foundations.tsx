import {
  Check,
  ChevronDown,
  CreditCard,
  Flame,
  Globe2,
  House,
  Landmark,
  Lock,
  Menu,
  Nfc,
  Pause,
  Play,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react"
import { useRef, type ComponentType } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel, Panel, Value } from "@/components/brand/specimen"
import { PhotoGlow } from "@/components/sections/hero"
import { Logo, LogoMark } from "@/components/ui/logo"
import { MetalCard, type MetalFinish } from "@/components/ui/metal-card"
import { BRAND, USES } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what the card does: “Lock it to a shop. Burn it after checkout.”", dont: "Sell fear: “Hackers are coming for your money!”" },
  { do: "Put the number in: “Ready in 4 seconds. $0 a month.”", dont: "Wave at speed: “Lightning-fast, next-gen payments.”" },
  { do: "Calm, short, a little wry — “a leak anywhere is a shrug”.", dont: "Exclamation marks, emoji, crypto-bro swagger." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div>
        <GroupLabel>Logo on graphite</GroupLabel>
        <Panel className="flex h-48 items-center justify-center bg-canvas">
          {/* Clear space: the mark's width on every side, drawn. */}
          <div className="rounded-item p-7 outline-1 outline-ink/20 outline-dashed">
            <Logo name={BRAND} href="#brand" className="[&>span]:text-[1.5rem] [&>svg]:size-10" />
          </div>
        </Panel>
      </div>
      <div>
        <GroupLabel>Logo on bone</GroupLabel>
        <div className="flex h-48 items-center justify-center rounded-card bg-inverse shadow-card">
          <div className="rounded-item p-7 outline-1 outline-inverse-ink/25 outline-dashed">
            <Logo name={BRAND} href="#brand" className="text-inverse-ink [&>span]:text-[1.5rem] [&>svg]:size-10" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>The mark, engraved</GroupLabel>
        <div className="grid grid-cols-3 gap-3">
          {(["chrome", "champagne", "graphite"] as MetalFinish[]).map((finish) => (
            <div key={finish} className={cn("metal grain grid aspect-square place-items-center rounded-card [--grain-opacity:0.35]", `metal-${finish}`)}>
              <LogoMark className="engraved relative z-2 size-10" style={{ filter: "drop-shadow(0 1px 0 var(--emboss))" }} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>The wordmark, set huge</GroupLabel>
        <Panel className="flex h-[calc(100%-1.75rem)] min-h-40 items-end overflow-hidden bg-footer">
          <p aria-hidden className="w-full text-center text-[clamp(5rem,16vw,9rem)] leading-[0.8] font-medium tracking-[-0.055em] text-ink" style={{ marginBottom: "-0.12em" }}>
            {BRAND}
          </p>
        </Panel>
      </div>
      <dl className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
        <Panel className="p-5">
          <dt className="font-serif text-[1.3125rem] text-ink">Clear space</dt>
          <dd className="mt-1 text-[0.875rem] leading-relaxed text-muted">The mark’s width on every side — the dashed line. Nothing else enters it.</dd>
        </Panel>
        <Panel className="p-5">
          <dt className="font-serif text-[1.3125rem] text-ink">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-[0.875rem] leading-relaxed text-muted">
            <LogoMark className="size-4 shrink-0 text-ink" />
            <span>16px for the mark alone (on a card); 28px beside the name.</span>
          </dd>
        </Panel>
        <Panel className="p-5">
          <dt className="font-serif text-[1.3125rem] text-ink">Colour</dt>
          <dd className="mt-1 text-[0.875rem] leading-relaxed text-muted">Bone on graphite, ink on bone, or engraved into metal. Never champagne on its own, never a gradient.</dd>
        </Panel>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <Panel className="divide-y divide-hairline">
          {VOICE.map((line) => (
            <div key={line.do} className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-8">
              <p className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink">
                <Check className="mt-1 size-4 shrink-0 text-positive" strokeWidth={2} />
                {line.do}
              </p>
              <p className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                <X className="mt-1 size-4 shrink-0 text-subtle" strokeWidth={2} />
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
    label: "Surfaces",
    swatches: [
      { name: "Canvas", token: "--color-canvas", className: "bg-canvas", role: "The page sheet" },
      { name: "Surface", token: "--color-surface", className: "bg-surface", role: "Cards, tiles, chips" },
      { name: "Surface raised", token: "--color-surface-raised", className: "bg-surface-raised", role: "Step chips, hovers" },
      { name: "Footer", token: "--color-footer", className: "bg-footer", role: "Under the sheet" },
    ],
  },
  {
    label: "Panels",
    swatches: [
      { name: "Panel steel", token: "--color-panel-steel", className: "bg-panel-steel", role: "“Instant” highlight" },
      { name: "Panel smoke", token: "--color-panel-smoke", className: "bg-panel-smoke", role: "“Free” highlight" },
      { name: "Panel umber", token: "--color-panel-umber", className: "bg-panel-umber", role: "“Private” highlight" },
    ],
  },
  {
    label: "Ink",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Headlines, primary text" },
      { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft", role: "Secondary text, eyebrows" },
      { name: "Muted", token: "--color-muted", className: "bg-muted", role: "Blurbs, body" },
      { name: "Subtle", token: "--color-subtle", className: "bg-subtle", role: "Footnotes, numbers" },
      { name: "Footer muted", token: "--color-footer-muted", className: "bg-footer-muted", role: "Footer links" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { name: "Hairline", token: "--color-hairline", className: "bg-hairline", role: "Dividers, the sheet’s edge" },
      { name: "Dot", token: "--color-dot", className: "bg-dot", role: "The dotted world" },
    ],
  },
  {
    label: "Accent — champagne, sparingly",
    swatches: [
      { name: "Accent", token: "--color-accent", className: "bg-accent", role: "Stars, progress, lit words" },
      { name: "Accent soft", token: "--color-accent-soft", className: "bg-accent-soft", role: "Tag text, glow" },
      { name: "Accent deep", token: "--color-accent-deep", className: "bg-accent-deep", role: "Shadowed champagne" },
    ],
  },
  {
    label: "Inverse — the one light surface",
    swatches: [
      { name: "Inverse", token: "--color-inverse", className: "bg-inverse", role: "Bone" },
      { name: "Inverse ink", token: "--color-inverse-ink", className: "bg-inverse-ink", role: "Text on bone, the inverse button" },
      { name: "Inverse muted", token: "--color-inverse-muted", className: "bg-inverse-muted", role: "Quiet text on bone" },
    ],
  },
  {
    label: "Status and button",
    swatches: [
      { name: "Positive", token: "--color-positive", className: "bg-positive", role: "“Never shared”, success" },
      { name: "Positive soft", token: "--color-positive-soft", className: "bg-positive-soft", role: "Its tag" },
      { name: "Button", token: "--color-button", className: "bg-button", role: "The pill" },
      { name: "Button hover", token: "--color-button-hover", className: "bg-button-hover", role: "The pill, hovered" },
      { name: "Button ink", token: "--color-button-ink", className: "bg-button-ink", role: "Its label" },
    ],
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="overflow-hidden rounded-card bg-surface shadow-card">
      <div ref={ref} className={cn("h-20 shadow-[inset_0_-1px_0_var(--color-hairline)]", className)} />
      <figcaption className="space-y-0.5 p-4">
        <p className="font-serif text-[1.1875rem] leading-tight text-ink">{name}</p>
        <p className="text-[0.8125rem] text-muted">{role}</p>
        <Value className="pt-1.5 text-subtle">{token}</Value>
        <Value>
          {value || "—"} · {value ? toHex(value) : "—"}
        </Value>
      </figcaption>
    </figure>
  )
}

const FINISHES: MetalFinish[] = ["chrome", "titanium", "champagne", "graphite", "copper"]

/** A gradient token, read off the root as it is now. */
function GradientSwatch({ name, token, className, role, style }: SwatchSpec & { style?: React.CSSProperties }) {
  const [ref, values] = useComputed<HTMLDivElement>([token])
  const value = values[token] ?? ""
  return (
    <figure className="overflow-hidden rounded-card bg-surface shadow-card">
      <div ref={ref} className={cn("relative h-24", className)} style={style} />
      <figcaption className="space-y-0.5 p-4">
        <p className="font-serif text-[1.1875rem] leading-tight text-ink">{name}</p>
        <p className="text-[0.8125rem] text-muted">{role}</p>
        <Value className="pt-1.5 text-subtle">{token}</Value>
        <Value className="line-clamp-3">{value || "—"}</Value>
      </figcaption>
    </figure>
  )
}

const PAIRS = [
  { label: "Ink on canvas", className: "bg-canvas text-ink", use: "Headlines" },
  { label: "Ink soft on canvas", className: "bg-canvas text-ink-soft", use: "Secondary" },
  { label: "Muted on canvas", className: "bg-canvas text-muted", use: "Blurbs, body" },
  { label: "Subtle on canvas", className: "bg-canvas text-subtle", use: "Footnotes only — decorative" },
  { label: "Ink on surface", className: "bg-surface text-ink", use: "Card titles" },
  { label: "Muted on surface", className: "bg-surface text-muted", use: "Answers, card copy" },
  { label: "Accent on canvas", className: "bg-canvas text-accent", use: "Lit words, stars" },
  { label: "Button ink on button", className: "bg-button text-button-ink", use: "The pill" },
  { label: "Inverse ink on inverse", className: "bg-inverse text-inverse-ink", use: "Bone surfaces" },
  { label: "Inverse muted on inverse", className: "bg-inverse text-inverse-muted", use: "Quiet text on bone" },
  { label: "Positive on positive soft", className: "bg-positive-soft text-positive", use: "“Never shared” tag" },
  { label: "Footer muted on footer", className: "bg-footer text-footer-muted", use: "Footer links" },
]

export function ContrastPair({ label, className, use }: (typeof PAIRS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-card p-5 shadow-item", className)}>
      <div>
        <p className="font-serif text-[2rem] leading-none">Aa</p>
        <p className="mt-2 text-[0.8125rem] font-medium">{label}</p>
        <p className="text-[0.75rem] opacity-80">{use}</p>
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.token} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Metal finishes — .metal .metal-*</GroupLabel>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {FINISHES.map((finish) => (
            <GradientSwatch
              key={finish}
              name={finish[0].toUpperCase() + finish.slice(1)}
              token={`--metal-${finish}`}
              className={cn("metal grain [--grain-opacity:0.35]", `metal-${finish}`)}
              role="Cards, chips, the price"
            />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Atmospheres and texture</GroupLabel>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          <GradientSwatch name="Hero" token="--atmos-hero" className="bg-canvas bg-(image:--atmos-hero) bg-size-[100%_300%]" role="Light at the top of the sheet" />
          <GradientSwatch name="Panel" token="--atmos-panel" className="bg-panel-steel bg-(image:--atmos-panel)" role="Highlights, testimonials" />
          <GradientSwatch name="Steel" token="--atmos-steel" className="bg-(image:--atmos-steel)" role="The sign-up steps card" />
          <GradientSwatch name="Brushed" token="--brushed" className="bg-surface-raised bg-(image:--brushed)" role="Hair-fine lines on metal" />
          <GradientSwatch name="Grain" token="--grain" className="grain bg-surface-raised [--grain-opacity:0.6]" role=".grain, .page-grain" />
        </div>
      </div>
      <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
        There is one theme: dark, with <code className="font-mono text-xs text-ink-soft">color-scheme: dark</code>. Bone
        is the only light surface and champagne the only colour — both used on purpose, never as decoration.
      </p>
      <div>
        <GroupLabel>Text on surface — WCAG contrast</GroupLabel>
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
  { name: "Mega", className: "font-serif text-mega", use: "The manifesto (--text-mega)", sample: "A leak is a shrug." },
  { name: "Display", className: "font-serif text-display", use: "The hero headline (--text-display)", sample: "One card per purchase." },
  { name: "Headline", className: "font-serif text-headline", use: "Section headings (--text-headline)", sample: "Consider it local." },
  { name: "Title", className: "font-serif text-title", use: "Perks (--text-title)", sample: "Freeze or burn anytime" },
  { name: "Card title", className: "font-serif text-[1.75rem] leading-tight", use: "Highlights, use cases, steps", sample: "Private" },
  { name: "Quote", className: "font-serif text-[1.3125rem] leading-[1.2]", use: "Testimonials", sample: "Burned it the second I landed." },
  { name: "Question", className: "font-serif text-[1.1875rem] leading-snug", use: "FAQ triggers", sample: "Is Ember really free?" },
  { name: "Price", className: "text-[4rem] leading-none font-light tracking-[-0.03em]", use: "$0 on the widget and the price card", sample: "$0" },
  { name: "Body", className: "text-[0.9375rem] leading-relaxed", use: "Blurbs and paragraphs", sample: "Spend in 150+ currencies at the real exchange rate." },
  { name: "UI", className: "text-[0.8125rem] font-medium", use: "Nav, buttons (sm), steps", sample: "Download the app" },
  { name: "Caption", className: "text-[0.6875rem] font-medium", use: "Eyebrows, tags, handles", sample: "Now issuing in 40+ countries" },
  { name: "Card number", className: "font-mono text-sm tracking-[0.2em] tabular-nums", use: "Engraved numbers", sample: "•••• 4821" },
  { name: "Wordmark", className: "text-[clamp(4rem,12vw,8rem)] leading-[0.8] font-medium tracking-[-0.055em]", use: "Under the footer (at up to 30rem there)", sample: "Ember" },
]

export function TypeSample({ name, className, use, sample }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-hairline py-6 last:border-b-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
      <div>
        <p className="text-[0.8125rem] font-medium text-ink">{name}</p>
        <p className="text-[0.8125rem] text-muted">{use}</p>
        <Value className="mt-2 text-subtle">
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

function FamilyCard({ label, className, name, weights, sample }: { label: string; className: string; name: string; weights: string; sample: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <Panel className="min-w-0 overflow-hidden p-6">
      <div ref={ref} className={className}>
        <GroupLabel className="font-sans">{label}</GroupLabel>
        <p className="text-[clamp(2.2rem,7vw,3rem)] leading-none text-ink">{name}</p>
        <p className="mt-4 text-[1.05rem] leading-snug break-all text-muted">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz
          <br />
          {sample} — {weights}
        </p>
      </div>
      <Value className="mt-4 text-subtle">{values["font-family"]}</Value>
    </Panel>
  )
}

export function Typography() {
  return (
    <div className="space-y-12">
      <div className="grid gap-4 lg:grid-cols-3">
        <FamilyCard label="Serif — every headline" className="font-serif" name="Newsreader" weights="400 · 500, optical size" sample="0123456789" />
        <FamilyCard label="Sans — interface and copy" className="font-sans" name="Inter" weights="400 · 500 · 600" sample="0123456789" />
        <FamilyCard label="Mono — card numbers" className="font-mono" name="System mono" weights="400 · 500" sample="•••• 4821" />
      </div>
      <div>
        <GroupLabel>Scale — fluid sizes are what this window gets</GroupLabel>
        <Panel className="px-5 sm:px-6">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </Panel>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Numerals — tabular</GroupLabel>
          <p className="text-4xl font-light tracking-[-0.03em] text-ink tabular-nums">
            $1,284.00
            <br />
            7302 → 9034
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Numerals — serif</GroupLabel>
          <p className="font-serif text-4xl text-ink">
            150+ currencies
            <br />
            40+ countries
          </p>
        </Panel>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = [
  { step: "1.5", className: "w-1.5", use: "Tag icon to label" },
  { step: "2.5", className: "w-2.5", use: "FAQ gap, card padding (sm)" },
  { step: "4", className: "w-4", use: "Gutter on phones, grid gap" },
  { step: "5", className: "w-5", use: "Eyebrow to headline" },
  { step: "6", className: "w-6", use: "Gutter from sm, card padding" },
  { step: "[26px]", className: "w-[26px]", use: "Highlight grid gap" },
  { step: "10", className: "w-10", use: "Nav gap" },
  { step: "12", className: "w-12", use: "Heading to grid, widget to title" },
  { step: "14", className: "w-14", use: "Heading to grid from sm" },
  { step: "24", className: "w-24", use: "Section bottom" },
  { step: "36", className: "w-36", use: "Section bottom from sm" },
  { step: "40", className: "w-40", use: "Manifesto, FAQ from sm" },
]

export function SpacingStep({ step, className, use }: (typeof SPACING)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[3.5rem_3.5rem_minmax(0,1fr)] items-center gap-3 py-2 sm:grid-cols-[4rem_4rem_minmax(0,1fr)_14rem]">
      <span className="font-mono text-xs text-subtle">{step}</span>
      <span className="font-mono text-xs text-ink-soft tabular-nums">{values.width}</span>
      <div ref={ref} className={cn("h-2.5 max-w-full rounded-[2px] bg-accent/70", className)} />
      <span className="col-span-3 text-[0.8125rem] text-muted sm:col-span-1">{use}</span>
    </li>
  )
}

const RADII = [
  { name: "item", className: "rounded-item", use: "FAQ cards, code, frames" },
  { name: "widget", className: "rounded-widget", use: "Highlight tiles" },
  { name: "card", className: "rounded-card", use: "Cards and panels" },
  { name: "panel", className: "rounded-panel", use: "The sheet’s corners" },
  { name: "chip", className: "rounded-chip", use: "Buttons, eyebrows, flags" },
  { name: "metal card", className: "rounded-[18px]", use: "MetalCard (8px when small)" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure>
      <div ref={ref} className={cn("h-20 bg-surface shadow-item", className)} />
      <figcaption className="mt-2">
        <span className="text-[0.8125rem] font-medium text-ink">{name}</span>{" "}
        <span className="font-mono text-[11px] text-subtle">{values["border-top-left-radius"]}</span>
        <span className="block text-[0.8125rem] text-muted">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "Card", className: "shadow-card rounded-card bg-surface", use: "Cards and panels" },
  { name: "Widget", className: "shadow-widget rounded-widget bg-surface", use: "The tiles the highlights hold" },
  { name: "Chip", className: "shadow-chip rounded-chip bg-surface", use: "Flags, the timed tag" },
  { name: "Item", className: "shadow-item rounded-item bg-surface", use: "FAQ, icon wells" },
  { name: "Button", className: "shadow-button rounded-chip bg-button", use: "The pill" },
  { name: "Metal", className: "metal metal-titanium rounded-[18px]", use: "Every metal surface" },
]

export function ShadowSample({ name, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure>
      <div ref={ref} className={cn("h-24", className)} />
      <figcaption className="mt-4">
        <span className="text-[0.8125rem] font-medium text-ink">{name}</span>
        <span className="block text-[0.8125rem] text-muted">{use}</span>
        <Value className="mt-1 text-subtle">{values["box-shadow"]}</Value>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border-t border-hairline", use: "Step list, mobile menu rows", read: "border-top-color" },
  { name: "Inset ring", className: "shadow-[inset_0_1px_0_rgb(255_255_255/0.06),inset_0_0_0_1px_rgb(255_255_255/0.05)] rounded-[8px] bg-white/[0.04]", use: "Frosted rows — a border drawn as shadow", read: "box-shadow" },
  { name: "Sheet edge", className: "shadow-[0_1px_0_var(--color-hairline)] rounded-b-card bg-canvas", use: "Where the page lifts off the footer", read: "box-shadow" },
  { name: "Clear space", className: "border border-dashed border-ink/20 rounded-item", use: "Guides only, never shipped", read: "border-top-color" },
]

export function BorderSample({ name, className, use, read }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>([read, "border-top-width"])
  return (
    <figure>
      <div className="flex h-20 items-end rounded-item bg-footer p-3">
        <div ref={ref} className={cn("h-full w-full", className)} />
      </div>
      <figcaption className="mt-2">
        <span className="text-[0.8125rem] font-medium text-ink">{name}</span>
        <span className="block text-[0.8125rem] text-muted">{use}</span>
        <Value className="mt-1 text-subtle">
          {read === "box-shadow" ? values["box-shadow"] : `${values["border-top-width"]} · ${values[read]}`}
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
          <GroupLabel>Spacing — Tailwind’s 4px steps</GroupLabel>
          <Panel className="px-5 py-3">
            <ul>
              {SPACING.map((step) => (
                <SpacingStep key={step.step} {...step} />
              ))}
            </ul>
          </Panel>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
            Content sits in a 1176px container with 16px gutters (24px from sm). Sections breathe at 96–160px, and
            the sheet ends in 40px corners lifted off the footer.
          </p>
        </div>
        <div>
          <GroupLabel>Radii</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-2">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — a hairline of light on top, a deep drop below</GroupLabel>
        <div className="grid gap-8 rounded-card bg-canvas p-6 shadow-item sm:grid-cols-2 sm:p-10 lg:grid-cols-3">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BORDERS.map((border) => (
            <BorderSample key={border.name} {...border} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

type Demo = {
  name: string
  where: string
  duration: string
  easing: string
  keyframes: Keyframe[]
  shape: "block" | "words" | "pill" | "row" | "sheet" | "digits"
}

/** Durations and easings are named by token and resolved when the demo plays. */
const DEMOS: Demo[] = [
  {
    name: "Reveal",
    where: "Every block’s entrance",
    duration: "--duration-reveal",
    easing: "--ease-out",
    keyframes: [
      { opacity: 0, filter: "blur(8px)", transform: "translateY(16px)" },
      { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
    ],
    shape: "block",
  },
  {
    name: "Words arrive",
    where: "SplitText headlines, 50ms apart",
    duration: "700ms",
    easing: "--ease-out",
    keyframes: [
      { opacity: 0, filter: "blur(10px)", transform: "translateY(18px)" },
      { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
    ],
    shape: "words",
  },
  {
    name: "Press",
    where: "Buttons scale to 97%",
    duration: "--duration-press",
    easing: "--ease-out",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
    shape: "pill",
  },
  {
    name: "Accordion",
    where: "FAQ answers open",
    duration: "--animate-accordion-down",
    easing: "--ease-out",
    keyframes: [
      { opacity: 0, clipPath: "inset(0 0 100% 0)" },
      { opacity: 1, clipPath: "inset(0 0 0% 0)" },
    ],
    shape: "row",
  },
  {
    name: "Sheet drops",
    where: "The phone menu from the top edge",
    duration: "--animate-sheet-in",
    easing: "--animate-sheet-in",
    keyframes: [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
    shape: "sheet",
  },
  {
    name: "Number rolls",
    where: "“New number”, 30ms per digit",
    duration: "220ms",
    easing: "--ease-out",
    keyframes: [
      { opacity: 0, filter: "blur(2px)", transform: "translateY(100%)" },
      { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
    ],
    shape: "digits",
  },
]

/** `240ms` from a duration token, or the duration and curve out of an `--animate-*` shorthand. */
function resolve(token: string) {
  const root = getComputedStyle(document.documentElement)
  const raw = token.startsWith("--") ? root.getPropertyValue(token).trim() : token
  const ms = raw.match(/([\d.]+)(ms|s)\b/)
  const duration = ms ? Number(ms[1]) * (ms[2] === "s" ? 1000 : 1) : 300
  const curve = raw.match(/cubic-bezier\([^)]*\)/)?.[0]
  return { raw, duration, curve }
}

function MotionSample({ demo }: { demo: Demo }) {
  const stage = useRef<HTMLDivElement>(null)
  const [durRef, dur] = useComputed<HTMLSpanElement>(demo.duration.startsWith("--") ? [demo.duration] : [])
  const [easeRef, ease] = useComputed<HTMLSpanElement>([demo.easing])
  const easingValue = resolve(demo.easing).curve ?? ease[demo.easing] ?? ""
  const durationRaw = demo.duration.startsWith("--") ? (dur[demo.duration] ?? "") : demo.duration
  const durationLabel = durationRaw.match(/[\d.]+m?s\b/)?.[0] ?? durationRaw

  const play = () => {
    const root = stage.current
    if (!root) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const { duration } = resolve(demo.duration)
    const easing = resolve(demo.easing).curve ?? (ease[demo.easing] || "ease-out")
    const stagger = demo.shape === "words" ? 50 : demo.shape === "digits" ? 30 : 0
    root.querySelectorAll<HTMLElement>("[data-play]").forEach((target, i) => {
      target.getAnimations().forEach((animation) => animation.cancel())
      target.animate(demo.keyframes, {
        duration: reduced ? 1 : duration,
        delay: reduced ? 0 : i * stagger,
        easing,
        fill: "backwards",
      })
    })
  }

  return (
    <Panel className="flex flex-col p-5">
      <span ref={durRef} className="hidden" />
      <span ref={easeRef} className="hidden" />
      <div ref={stage} className="relative flex h-28 items-center justify-center overflow-hidden rounded-item bg-canvas shadow-item">
        {demo.shape === "block" && <div data-play className="h-12 w-2/3 rounded-item bg-surface-raised shadow-item" />}
        {demo.shape === "words" && (
          <p className="font-serif text-[1.75rem] text-ink">
            {"Zero exposure.".split(" ").map((word) => (
              <span key={word} data-play className="mr-[0.25em] inline-block">
                {word}
              </span>
            ))}
          </p>
        )}
        {demo.shape === "pill" && (
          <span data-play className="inline-flex h-10 items-center rounded-chip bg-button px-6 text-sm font-medium text-button-ink shadow-button">
            Get a card
          </span>
        )}
        {demo.shape === "row" && (
          <div className="w-3/4 rounded-item bg-surface px-4 py-3 shadow-item">
            <p className="font-serif text-[1rem] text-ink">Is Ember really free?</p>
            <p data-play className="mt-1 text-[0.75rem] text-muted">
              Yes — no monthly fee and no card fees.
            </p>
          </div>
        )}
        {demo.shape === "sheet" && (
          <div data-play className="absolute inset-x-0 top-0 h-2/3 rounded-b-[20px] bg-surface-raised shadow-widget">
            <div className="flex h-10 items-center px-4">
              <LogoMark className="size-5 text-ink" />
            </div>
          </div>
        )}
        {demo.shape === "digits" && (
          <p className="flex font-mono text-2xl text-ink tabular-nums">
            <span className="mr-2 text-subtle">••••</span>
            {"9034".split("").map((digit, i) => (
              <span key={i} className="relative inline-block overflow-hidden">
                <span data-play className="inline-block">
                  {digit}
                </span>
              </span>
            ))}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-serif text-[1.3125rem] leading-tight text-ink">{demo.name}</p>
          <p className="text-[0.8125rem] text-muted">{demo.where}</p>
          <Value className="mt-1.5 text-subtle">
            {durationLabel || "—"} · {easingValue || "—"}
          </Value>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-chip bg-surface-raised px-4 text-[0.8125rem] font-medium text-ink shadow-item transition-[background-color,transform] duration-(--duration-hover) ease-out hover:bg-hairline focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:outline-none active:scale-[0.97] active:duration-(--duration-press) sm:h-9"
        >
          <Play className="size-3.5" />
          Play
        </button>
      </div>
    </Panel>
  )
}

function TokenRow({ token, use }: { token: string; use: string }) {
  const [ref, values] = useComputed<HTMLSpanElement>([token])
  return (
    <li className="grid gap-1 border-b border-hairline py-3 last:border-b-0 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
      <span ref={ref} className="font-mono text-xs text-ink-soft">
        {token}
      </span>
      <span>
        <Value>{values[token] || "—"}</Value>
        <span className="text-[0.8125rem] text-muted">{use}</span>
      </span>
    </li>
  )
}

export function Motion() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Tokens</GroupLabel>
        <Panel className="px-5">
          <ul>
            <TokenRow token="--ease-out" use="Almost everything: a strong ease-out that settles" />
            <TokenRow token="--ease-in-out" use="Reveal’s in-out option" />
            <TokenRow token="--duration-reveal" use="The blur-and-rise entrance" />
            <TokenRow token="--duration-hover" use="Colour changes on hover" />
            <TokenRow token="--duration-press" use="The press on active" />
            <TokenRow token="--animate-accordion-down" use="FAQ open" />
            <TokenRow token="--animate-accordion-up" use="FAQ close" />
            <TokenRow token="--animate-fade-in" use="Sheet overlay in" />
            <TokenRow token="--animate-fade-out" use="Sheet overlay out" />
            <TokenRow token="--animate-sheet-in" use="The menu drops" />
            <TokenRow token="--animate-sheet-out" use="The menu lifts" />
          </ul>
        </Panel>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DEMOS.map((demo) => (
          <MotionSample key={demo.name} demo={demo} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="p-5">
          <p className="font-serif text-[1.3125rem] text-ink">Scroll</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
            Lenis carries it (lerp 0.1): a soft glide that settles. It drives the pinned steps, the sideways use
            cases, the video opening out and the manifesto lighting up — and it is held in a ref, so the editor’s
            Motion switch pauses it, along with both 3D canvases.
          </p>
        </Panel>
        <Panel className="p-5">
          <p className="font-serif text-[1.3125rem] text-ink">Reduced motion</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
            Entrances keep only the fade, the use-case row becomes a plain swipe, the video opens full-size and
            does not autoplay, and Lenis is off. The samples above jump to their end state.
          </p>
        </Panel>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS: [string, ComponentType<{ className?: string }>][] = [
  ["CreditCard", CreditCard],
  ["Globe2", Globe2],
  ["Flame", Flame],
  ["Plus", Plus],
  ["Lock", Lock],
  ["SlidersHorizontal", SlidersHorizontal],
  ["RefreshCw", RefreshCw],
  ["House", House],
  ["Landmark", Landmark],
  ["Nfc", Nfc],
  ["Check", Check],
  ["Star", Star],
  ["Play", Play],
  ["Pause", Pause],
  ["Menu", Menu],
  ["X", X],
  ["ChevronDown", ChevronDown],
]

const USE_PHOTOS = import.meta.glob<string>("@/assets/uses/*.jpg", { eager: true, query: "?url", import: "default" })

export function Iconography() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel className="p-6">
        <GroupLabel>Icons — Lucide, 16px, in currentColor</GroupLabel>
        <div className="flex flex-wrap gap-2.5">
          {ICONS.map(([name, Icon]) => (
            <span key={name} title={name} className="grid size-11 place-items-center rounded-full bg-canvas text-ink-soft shadow-item">
              <Icon className="size-4" />
            </span>
          ))}
          <span title="LogoMark" className="grid size-11 place-items-center rounded-full bg-canvas text-ink shadow-item">
            <LogoMark className="size-5" />
          </span>
        </div>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
          Lucide at 16px (12px in tags), 1.8–2.5 stroke where it sits small. On metal an icon is engraved like the
          type; in a perk it sits in a 36px surface well on a champagne glow.
        </p>
        <div className="mt-5 flex items-center gap-4">
          <span className="relative grid size-9 place-items-center rounded-full bg-surface text-ink shadow-item before:absolute before:-inset-2 before:-z-10 before:rounded-full before:bg-accent/15 before:blur-md">
            <Flame className="size-4" strokeWidth={1.8} />
          </span>
          <span className="metal metal-champagne grid size-9 place-items-center rounded-full text-inverse-ink">
            <Lock className="size-4" />
          </span>
          <span className="metal metal-graphite grid size-8 place-items-center rounded-md text-ink">
            <CreditCard className="size-4" />
          </span>
        </div>
      </Panel>
      <Panel className="p-6">
        <GroupLabel>Imagery — photographs under metal</GroupLabel>
        <div className="grid grid-cols-3 gap-2">
          {USES.items.slice(0, 3).map((item) => (
            <div key={item.key} className="relative aspect-[3/4] overflow-hidden rounded-item">
              <img src={USE_PHOTOS[`/src/assets/uses/${item.key}.jpg`]} alt="" loading="lazy" className="size-full object-cover" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-black/85" />
              <p className="absolute bottom-2 left-2 font-serif text-[0.9375rem] text-white">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-2 h-28 overflow-hidden rounded-item bg-canvas">
          <PhotoGlow className="inset-0 size-full" opacity={0.8} />
          <div className="absolute inset-0 grid place-items-center">
            <MetalCard finish="chrome" size="sm" interactive={false} className="w-24" />
          </div>
        </div>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
          Real photographs from Pexels (credited in the footer), darkened to black at the foot so white serif reads
          over them. The hero’s light is a liquid-chrome photo blurred 34px and desaturated — never a coloured
          gradient. Phones are live 3D, not screenshots.
        </p>
      </Panel>
    </div>
  )
}
