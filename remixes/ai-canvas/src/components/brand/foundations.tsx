import { ArrowRight, Check, Loader2, Menu, PenLine, Sparkles, X, XIcon } from "lucide-react"
import { useRef, type CSSProperties } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel } from "@/components/brand/specimen"
import { CursorChip } from "@/components/blocks/cursor-chip"
import { Logo, LogoMark } from "@/components/blocks/logo"
import { mockups, pexels, photos } from "@/content"
import { BLUR, DURATION, SPRING_FOLLOW, SPRING_POP, STAGGER } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  {
    do: "Two short lines, the second answering the first: “Great work isn’t prompted. It’s shaped.”",
    dont: "One long line that explains itself: “Our AI-powered platform empowers teams to…”",
  },
  { do: "Say what happens on the canvas: “Publish it straight from the frame.”", dont: "Reach for a feeling: “A seamless, magical workflow.”" },
  { do: "Sentence case, full stops, plain words. Agents are named for their job.", dont: "Exclamation marks, emoji, sparkles in the copy, “unleash”." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>On paper</GroupLabel>
        <div className="flex h-48 items-center justify-center rounded-card bg-paper shadow-card">
          {/* Clear space: the mark's height on every side, drawn. */}
          <div className="rounded-frame p-6 outline-1 outline-mauve-500/60 outline-dashed">
            <Logo className="pointer-events-none scale-150" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>On night</GroupLabel>
        <div className="flex h-48 items-center justify-center rounded-card bg-night">
          <div className="rounded-frame p-6 text-on-night outline-1 outline-hairline-night outline-dashed">
            <Logo className="pointer-events-none scale-150" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 text-[14px] sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-card bg-paper p-5 shadow-chip">
          <dt className="font-medium">Clear space</dt>
          <dd className="mt-1 text-ink-soft">One mark-height on every side — the dashed box. Nothing else inside it.</dd>
        </div>
        <div className="rounded-card bg-paper p-5 shadow-chip">
          <dt className="font-medium">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-2 text-ink-soft">
            <LogoMark className="size-5 rounded-[6px]" />
            <span className="text-[13px] font-semibold tracking-[-0.02em] text-ink">Boundless</span>
            <span>— 20px mark, 13px name.</span>
          </dd>
        </div>
        <div className="rounded-card bg-paper p-5 shadow-chip">
          <dt className="font-medium">Mark only</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-soft">
            <LogoMark />
            <span>Favicon, avatars and the footer. Never recoloured or cropped.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-hairline overflow-hidden rounded-card bg-paper text-[14px] shadow-chip">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-live" aria-label="Do" />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-mist">
                <X className="mt-0.5 size-4 shrink-0 text-mauve-900" aria-label="Don’t" />
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

type SwatchSpec = { token: string; role: string; night?: boolean }

/** Every custom property in `:root`, by what it is for. */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface",
    swatches: [
      { token: "--night", role: "The hero canvas" },
      { token: "--night-raised", role: "Badge on night" },
      { token: "--night-field", role: "Prompt pill on night" },
      { token: "--night-field-edge", role: "Prompt pill fade" },
      { token: "--paper", role: "The page" },
      { token: "--field", role: "Prompt pill, paper hover" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { token: "--ink", role: "Headlines, body" },
      { token: "--ink-soft", role: "Step copy, token chips" },
      { token: "--ink-muted", role: "Resting steps, © year" },
      { token: "--mist", role: "Ledes, eyebrows, meta" },
      { token: "--on-night", role: "Type on the canvas" },
    ],
  },
  {
    label: "Button",
    swatches: [
      { token: "--button", role: "The ink pill" },
      { token: "--button-hover", role: "The ink pill, hovered" },
    ],
  },
  {
    label: "Mauve",
    swatches: [
      { token: "--mauve-900", role: "Wash top, sparkle" },
      { token: "--mauve-700", role: "Wash" },
      { token: "--mauve-500", role: "Wash, focus ring" },
      { token: "--mauve-400", role: "Wash, product glow" },
      { token: "--mauve-300", role: "Glow, text selection" },
      { token: "--mauve-100", role: "Wash foot" },
      { token: "--mauve-50", role: "Wash end, soft wells" },
    ],
  },
  {
    label: "Cursors and status",
    swatches: [
      { token: "--cursor-1", role: "Agents" },
      { token: "--cursor-2", role: "Person" },
      { token: "--cursor-3", role: "Person" },
      { token: "--cursor-4", role: "Person" },
      { token: "--cursor-5", role: "Person" },
      { token: "--cursor-6", role: "Person" },
      { token: "--live", role: "Published, copied" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { token: "--hairline", role: "Borders, dividers" },
      { token: "--hairline-strong", role: "Agent wires, outlines" },
      { token: "--hairline-night", role: "Lines on night", night: true },
    ],
  },
]

/** shadcn's names, pointed at the palette in `@theme`. */
const ALIASES = [
  { name: "background", token: "--color-background" },
  { name: "foreground", token: "--color-foreground" },
  { name: "primary", token: "--color-primary" },
  { name: "primary-foreground", token: "--color-primary-foreground" },
  { name: "border", token: "--color-border" },
  { name: "input", token: "--color-input" },
  { name: "ring", token: "--color-ring" },
]

export function Swatch({ token, role, night }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="overflow-hidden rounded-frame bg-paper shadow-chip">
      <div className={cn("h-16 border-b border-hairline", night ? "bg-night" : "bg-paper")}>
        <div ref={ref} className="size-full" style={{ background: `var(${token})` }} />
      </div>
      <figcaption className="space-y-0.5 p-3 text-[13px]">
        <p className="font-medium break-all">{token.slice(2)}</p>
        <p className="text-ink-soft">{role}</p>
        <p className="pt-1 font-mono text-[10.5px] break-all text-mist">
          {value || "—"}
          <br />
          {value ? toHex(value) : "—"}
        </p>
      </figcaption>
    </figure>
  )
}

function Alias({ name, token }: { name: string; token: string }) {
  const [ref, values] = useComputed<HTMLSpanElement>(["background-color"])
  return (
    <li className="flex items-center gap-3 py-2 text-[13px]">
      <span ref={ref} className="size-5 shrink-0 rounded-full shadow-chip" style={{ background: `var(${token})` }} />
      <span className="font-medium">{name}</span>
      <span className="ml-auto font-mono text-[10.5px] text-mist">{values["background-color"] ? toHex(values["background-color"]) : "—"}</span>
    </li>
  )
}

/** Real pairs from the page — the ones text is actually set in. */
const PAIRS: { label: string; fg: string; bg: string }[] = [
  { label: "Ink on paper — headlines", fg: "--ink", bg: "--paper" },
  { label: "Ink soft on paper — step copy", fg: "--ink-soft", bg: "--paper" },
  { label: "Mist on paper — eyebrows, meta", fg: "--mist", bg: "--paper" },
  { label: "Ink muted on paper — © year", fg: "--ink-muted", bg: "--paper" },
  { label: "On-night on night — hero", fg: "--on-night", bg: "--night" },
  { label: "Mist on night — hero lede", fg: "--mist", bg: "--night" },
  { label: "Paper on button — Get started", fg: "--paper", bg: "--button" },
  { label: "Ink on field — paper pill, hovered", fg: "--ink", bg: "--field" },
  { label: "Mist on field — prompt pill", fg: "--mist", bg: "--field" },
  { label: "Paper on mauve 900 — manifesto", fg: "--paper", bg: "--mauve-900" },
  { label: "Paper on mauve 400 — manifesto, lower", fg: "--paper", bg: "--mauve-400" },
  { label: "Paper on cursor 1 — agent chip", fg: "--paper", bg: "--cursor-1" },
]

export function ContrastPair({ label, fg, bg }: (typeof PAIRS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Below AA"
  return (
    <div
      ref={ref}
      className="flex items-end justify-between gap-4 rounded-frame p-5 shadow-chip"
      style={{ color: `var(${fg})`, background: `var(${bg})` }}
    >
      <div className="min-w-0">
        <p className="text-[28px] leading-none font-medium tracking-scene">Aa</p>
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.token} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <GroupLabel>Gradients</GroupLabel>
          <div className="grid grid-cols-2 gap-3">
            <figure>
              <div className="h-40 rounded-panel bg-mauve-wash" />
              <figcaption className="mt-2 text-[13px]">
                <span className="font-medium">bg-mauve-wash</span>
                <span className="block text-ink-soft">The manifesto panel, 900 → 50.</span>
              </figcaption>
            </figure>
            <figure>
              <div className="h-40 rounded-panel bg-paper bg-mauve-glow shadow-chip" />
              <figcaption className="mt-2 text-[13px]">
                <span className="font-medium">bg-mauve-glow</span>
                <span className="block text-ink-soft">What the product shot rises from.</span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div>
          <GroupLabel>shadcn names, in @theme</GroupLabel>
          <ul className="divide-y divide-hairline rounded-card bg-paper px-5 py-2 shadow-chip">
            {ALIASES.map((alias) => (
              <Alias key={alias.name} {...alias} />
            ))}
          </ul>
        </div>
      </div>
      <div>
        <GroupLabel>Text on surface — WCAG 2 contrast</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {PAIRS.map((pair) => (
            <ContrastPair key={pair.label} {...pair} />
          ))}
        </div>
        <p className="mt-4 max-w-[70ch] text-[14px] text-ink-soft">
          Mist and ink-muted sit below AA on paper on purpose: they only carry meta — eyebrows, the year,
          a resting step — never a sentence someone has to read.
        </p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const TYPE_SCALE = [
  { name: "Hero", className: "text-hero font-normal tracking-display", use: "The canvas headline", sample: "Build anything" },
  { name: "Scene", className: "text-scene font-medium tracking-scene", use: "Every white scene, section titles", sample: "Great work isn’t prompted." },
  { name: "CTA", className: "text-cta font-medium tracking-[-0.01em]", use: "The closing pill’s label", sample: "Get started" },
  { name: "Step", className: "text-[clamp(18px,1.6vw,24px)] font-medium tracking-scene", use: "Live-pages steps", sample: "Shape it like a design file" },
  { name: "Menu", className: "text-[22px] font-medium tracking-scene", use: "Links in the mobile sheet", sample: "Product" },
  { name: "Body", className: "text-body", use: "Ledes and step copy", sample: "Prompt, sketch and ship. Pages, apps and ideas, live." },
  { name: "Wordmark", className: "text-[14px] font-semibold tracking-[-0.02em]", use: "Logo name", sample: "Boundless" },
  { name: "Nav", className: "text-nav font-medium", use: "Header links, eyebrows", sample: "Product  Agents  Log in" },
  { name: "Toast", className: "text-[12px] font-medium", use: "Status toast, nav pill", sample: "Generating 2 frames" },
  { name: "Micro", className: "text-micro font-medium", use: "Badge, cursor chips, footer", sample: "Introducing agents on the canvas" },
]

export function TypeSample({ name, className, use, sample }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-hairline py-6 last:border-b-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div className="text-[13px]">
        <p className="font-medium">{name}</p>
        <p className="text-ink-soft">{use}</p>
        <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-mist tabular-nums">
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

export function Typography() {
  const [sans, sansValues] = useComputed<HTMLDivElement>(["font-family", "font-feature-settings"])
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div ref={sans} className="rounded-card bg-paper p-6 shadow-chip sm:p-8">
          <GroupLabel>One family — Inter, optical sizes 14–32</GroupLabel>
          <p className="text-hero font-normal tracking-display">Inter</p>
          <p className="mt-4 text-[14px] text-ink-soft">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            <span className="tabular-nums">0123456789</span> — 400 · 500 · 600
          </p>
          <p className="mt-4 font-mono text-[10.5px] break-all text-mist">
            {sansValues["font-family"]}
            <br />
            features: {sansValues["font-feature-settings"]}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6 rounded-card bg-night p-6 text-on-night sm:p-8">
          <GroupLabel>Rules</GroupLabel>
          <ul className="space-y-3 text-[14px] text-mist">
            <li>
              <span className="text-on-night">Medium (500)</span> for what speaks; regular for the hero, so the
              canvas behind it carries the weight.
            </li>
            <li>
              <span className="text-on-night">Tight tracking</span> grows with size: −0.025em for scenes,
              −0.035em for the hero.
            </li>
            <li>
              <span className="text-on-night">Balanced wrap</span> on every headline; scenes stay under two lines.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <GroupLabel>Scale — fluid between 375 and 1440</GroupLabel>
        <div className="rounded-card bg-paper px-5 shadow-chip sm:px-8">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-card bg-paper p-6 shadow-chip">
          <GroupLabel>Numerals — tabular (step numbers, versions)</GroupLabel>
          <p className="text-scene font-medium tracking-scene tabular-nums">
            01 02 03
            <br />
            v0.9 → v1.0
          </p>
        </div>
        <div className="rounded-card bg-paper p-6 shadow-chip">
          <GroupLabel>Numerals — proportional (copy)</GroupLabel>
          <p className="text-scene font-medium tracking-scene">
            01 02 03
            <br />
            v0.9 → v1.0
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

/** The page's own steps, from `@theme`. */
const LAYOUT = [
  { name: "gutter", token: "--spacing-gutter", use: "Side margin of every section" },
  { name: "inset", token: "--spacing-inset", use: "The mauve panel’s edge" },
  { name: "nav", token: "--spacing-nav", use: "Header height, pinned-scene top" },
  { name: "scene", token: "--spacing-scene", use: "One scene — a full screen" },
]

export function LayoutStep({ name, token, use }: (typeof LAYOUT)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["height"])
  return (
    <li className="grid grid-cols-[4.5rem_minmax(0,1fr)_5rem] items-center gap-4 py-2.5 text-[13px]">
      <span className="font-medium">{name}</span>
      <span className="text-ink-soft">{use}</span>
      <span className="text-right font-mono text-[11px] text-mist tabular-nums">{values.height}</span>
      {/* Measured, not drawn: a zero-width element the token sets the height of. */}
      <div ref={ref} aria-hidden className="pointer-events-none absolute w-0 opacity-0" style={{ height: `var(${token})` }} />
    </li>
  )
}

/** The Tailwind 4px steps the page uses between things. */
const STEPS = [
  { step: "1.5", className: "w-1.5", use: "Icon to label in a chip" },
  { step: "2.5", className: "w-2.5", use: "Icon to label in a toast" },
  { step: "4", className: "w-4", use: "Pill padding" },
  { step: "6", className: "w-6", use: "Badge to headline" },
  { step: "10", className: "w-10", use: "Stacks in a scene" },
  { step: "16", className: "w-16", use: "Steps to shot, desktop" },
  { step: "24", className: "w-24", use: "A scene’s vertical padding" },
]

export function SpacingStep({ step, className, use }: (typeof STEPS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[2.5rem_3.5rem_minmax(0,1fr)] items-center gap-3 py-2 text-[13px]">
      <span className="font-mono text-[11px] text-mist">{step}</span>
      <span className="font-mono text-[11px] text-ink-soft tabular-nums">{values.width}</span>
      <span className="flex min-w-0 items-center gap-3">
        <span ref={ref} className={cn("h-3 shrink-0 rounded-[3px] bg-mauve-500", className)} />
        <span className="truncate text-ink-soft">{use}</span>
      </span>
    </li>
  )
}

const RADII = [
  { name: "tile", token: "--radius-tile", use: "Scattered photos" },
  { name: "frame", token: "--radius-frame", use: "Product shot, toasts" },
  { name: "panel", token: "--radius-panel", use: "The mauve panel" },
  { name: "card", token: "--radius-card", use: "Cards on this page" },
  { name: "pill", token: "--radius-pill", use: "Buttons, chips, prompt" },
]

export function RadiusSample({ name, token, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="text-[13px]">
      <div ref={ref} className="h-20 border border-hairline-strong bg-paper" style={{ borderRadius: `var(${token})` }} />
      <figcaption className="mt-2">
        <span className="font-medium">{name}</span>{" "}
        <span className="font-mono text-[10.5px] text-mist">{values["border-top-left-radius"]}</span>
        <span className="block text-ink-soft">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "card", token: "--shadow-card", use: "Product shot, published card — tinted mauve, three layers" },
  { name: "chip", token: "--shadow-chip", use: "Cursor chips, toasts, the prompt" },
  { name: "float", token: "--shadow-float", use: "Anything lifted over the canvas" },
]

export function ShadowSample({ name, token, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="text-[13px]">
      <div ref={ref} className="h-24 rounded-frame bg-paper" style={{ boxShadow: `var(${token})` }} />
      <figcaption className="mt-3">
        <span className="font-medium">{name}</span>
        <span className="block text-ink-soft">{use}</span>
        <span className="mt-1 block font-mono text-[10.5px] break-all text-mist">{values["box-shadow"]}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-hairline bg-paper", use: "Sheet edge, toast captions, dividers" },
  { name: "Hairline, strong", className: "border border-hairline-strong bg-paper", use: "Agent wires, empty token dots" },
  { name: "Hairline, night", className: "border border-hairline-night bg-night", use: "Lines over the canvas" },
  { name: "Key", className: "border border-ink/25 bg-field", use: "The ⌘K key — current colour at 25%" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-bottom-width", "border-bottom-color", "border-bottom-style"])
  return (
    <figure className="text-[13px]">
      <div ref={ref} className={cn("h-16 rounded-frame", className)} />
      <figcaption className="mt-2">
        <span className="font-medium">{name}</span>
        <span className="block text-ink-soft">{use}</span>
        <span className="mt-1 block font-mono text-[10.5px] break-all text-mist">
          {values["border-bottom-width"]} {values["border-bottom-style"]} {values["border-bottom-color"]}
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
          <GroupLabel>Layout tokens — fluid</GroupLabel>
          <ul className="relative divide-y divide-hairline rounded-card bg-paper px-5 py-2 shadow-chip">
            {LAYOUT.map((step) => (
              <LayoutStep key={step.name} {...step} />
            ))}
          </ul>
          <div className="mt-8">
            <GroupLabel>Between things — 4px steps</GroupLabel>
          </div>
          <ul className="rounded-card bg-paper px-5 py-3 shadow-chip">
            {STEPS.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
        </div>
        <div>
          <GroupLabel>Radii</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — the page is flat; lifts are soft and stacked</GroupLabel>
        <div className="grid gap-8 rounded-card bg-mauve-50/60 p-6 sm:grid-cols-3 sm:p-8">
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

type MotionSpec = {
  name: string
  where: string
  /** A CSS custom property holding the curve, or a literal. */
  easing: string
  /** A CSS custom property holding the duration, or milliseconds. */
  duration: string | number
  keyframes: Keyframe[]
  /** What stays under reduced motion — the rest is dropped. */
  reducedKeyframes?: Keyframe[]
  target?: string
}

const MOTIONS: MotionSpec[] = [
  {
    name: "Blur in",
    where: "Every word, tile and headline",
    easing: "--ease-out-strong",
    duration: DURATION.reveal * 1000,
    keyframes: [
      { opacity: 0, filter: `blur(${BLUR}px)` },
      { opacity: 1, filter: "blur(0px)" },
    ],
    reducedKeyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
  {
    name: "Press",
    where: "Every pill — scale 0.97",
    easing: "--ease-out-strong",
    duration: "--duration-press",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Nudge",
    where: "The closing call’s arrow, on hover",
    easing: "--ease-out-strong",
    duration: "--duration-hover",
    keyframes: [{ transform: "translateX(0)" }, { transform: "translateX(6px)" }],
    target: "arrow",
  },
  {
    name: "Face change",
    where: "Header, night → paper",
    easing: "--ease-out-strong",
    duration: "--duration-theme",
    keyframes: [{ backgroundColor: "var(--night)" }, { backgroundColor: "var(--paper)" }],
  },
  {
    name: "Sheet",
    where: "The mobile menu slides in",
    easing: "--ease-drawer",
    duration: 320,
    keyframes: [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
    reducedKeyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
  {
    name: "Wire",
    where: "Agent draws to its tokens",
    easing: "--ease-in-out-strong",
    duration: 700,
    keyframes: [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
  },
]

function resolve(value: string | number): string {
  if (typeof value === "number") return String(value)
  return value.startsWith("--") ? getComputedStyle(document.documentElement).getPropertyValue(value).trim() : value
}

function toMs(value: string): number {
  if (value.endsWith("ms")) return parseFloat(value)
  if (value.endsWith("s")) return parseFloat(value) * 1000
  return parseFloat(value)
}

/** Resolves `var(--token)` inside keyframes to what the token holds now. */
function frames(keyframes: Keyframe[]): Keyframe[] {
  const root = getComputedStyle(document.documentElement)
  return keyframes.map((frame) =>
    Object.fromEntries(
      Object.entries(frame).map(([property, value]) => [
        property,
        typeof value === "string" ? value.replace(/var\((--[\w-]+)\)/g, (_, name: string) => root.getPropertyValue(name).trim()) : value,
      ]),
    ),
  )
}

/** Plays one of the page's motions on a sample through the Web Animations
 *  API — so the editor's Motion switch stops and reduces it like the page's
 *  own. Curve and duration are read off the stylesheet when it plays. */
export function MotionSample({ name, where, easing, duration, keyframes, reducedKeyframes, target }: MotionSpec) {
  const box = useRef<HTMLDivElement>(null)
  const arrow = useRef<SVGSVGElement>(null)
  const [readout, values] = useComputed<HTMLSpanElement>(["--probe-ease", "--probe-duration"])
  const probe = {
    "--probe-ease": easing.startsWith("--") ? `var(${easing})` : easing,
    "--probe-duration": typeof duration === "number" ? `${duration}ms` : `var(${duration})`,
  } as CSSProperties
  const play = () => {
    const element = target === "arrow" ? arrow.current : box.current
    if (!element) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.getAnimations().forEach((animation) => animation.cancel())
    const ms = toMs(resolve(duration))
    if (reduced && !reducedKeyframes) return
    element.animate(frames(reduced && reducedKeyframes ? reducedKeyframes : keyframes), {
      duration: reduced ? Math.min(ms, 200) : ms,
      easing: resolve(easing),
      fill: target === "arrow" ? "none" : "both",
    })
  }
  return (
    <div className="flex flex-col rounded-card bg-paper p-5 shadow-chip">
      <div className="flex h-24 items-center justify-center overflow-hidden rounded-frame bg-mauve-50/70 px-4">
        {target === "arrow" ? (
          <span className="inline-flex h-11 items-center gap-2 rounded-pill bg-button px-6 text-[15px] font-medium text-paper">
            Get started
            <ArrowRight ref={arrow} className="size-4" aria-hidden />
          </span>
        ) : (
          <div
            ref={box}
            className={cn(
              "h-12 rounded-frame bg-button",
              name === "Sheet" || name === "Wire" ? "w-full origin-left" : "w-2/3",
              name === "Face change" && "shadow-chip",
            )}
          />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 text-[13px]">
        <div className="min-w-0">
          <p className="font-medium">{name}</p>
          <p className="text-ink-soft">{where}</p>
          <span ref={readout} style={probe} className="mt-1 block font-mono text-[10.5px] break-all text-mist">
            {values["--probe-duration"]} · {values["--probe-ease"]}
          </span>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-9 shrink-0 items-center rounded-pill bg-button px-4 text-[13px] font-medium text-paper transition-[background-color,transform] duration-(--duration-press) ease-out-strong hover:bg-button-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.97]"
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
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOTIONS.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <ul className="grid gap-3 text-[14px] text-ink-soft sm:grid-cols-2">
        <li className="rounded-card bg-paper p-5 shadow-chip">
          <span className="font-medium text-ink">Framer Motion shares the curves.</span>{" "}
          <code className="font-mono text-[12px]">lib/motion.ts</code> mirrors the tokens: reveal{" "}
          {DURATION.reveal}s, swap {DURATION.swap}s, blur {BLUR}px, stagger {STAGGER}s, springs of{" "}
          {SPRING_FOLLOW.duration}s / bounce {SPRING_FOLLOW.bounce} (follow) and {SPRING_POP.duration}s / bounce{" "}
          {SPRING_POP.bounce} (pop).
        </li>
        <li className="rounded-card bg-paper p-5 shadow-chip">
          <span className="font-medium text-ink">Scroll is Lenis</span> at lerp 0.085, held in a ref so the
          editor can pause it. Under reduced motion the blur goes and the fade stays; Lenis and the canvas
          warp are skipped.
        </li>
      </ul>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [
  { Icon: Sparkles, name: "Sparkles", use: "Agents, the prompt" },
  { Icon: ArrowRight, name: "ArrowRight", use: "Calls to action" },
  { Icon: Menu, name: "Menu", use: "Mobile menu" },
  { Icon: XIcon, name: "X", use: "Close the sheet" },
  { Icon: Loader2, name: "Loader2", use: "Generating" },
  { Icon: PenLine, name: "PenLine", use: "Editing" },
]

export function Iconography() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-card bg-paper p-6 shadow-chip">
          <GroupLabel>Lucide, 2px stroke, in currentColor</GroupLabel>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
            {ICONS.map(({ Icon, name, use }) => (
              <li key={name} className="flex flex-col items-center gap-2 text-center" title={use}>
                <span className="flex size-11 items-center justify-center rounded-pill bg-field">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="font-mono text-[10.5px] text-mist">{name}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] text-ink-soft">
            Icons stay small — 12 to 20px — and always sit beside a word. The sparkle means an agent, and only an
            agent.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-card bg-night p-6 text-on-night">
          <GroupLabel>People and agents</GroupLabel>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <CursorChip name="Maya" tone="2" />
            <CursorChip name="Layout agent" agent tone="1" />
            <CursorChip name="Ines" tone="3" />
            <CursorChip name="Review agent" agent tone="4" />
          </div>
          <p className="mt-5 text-[14px] text-mist">
            A pointer and a name in a pill. People take the ink and mauve tones; agents carry the sparkle.
          </p>
        </div>
      </div>
      <div className="rounded-card bg-paper p-6 shadow-chip">
        <GroupLabel>Imagery — Pexels photography, product shots</GroupLabel>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {photos.slice(0, 6).map((photo) => (
            <img
              key={photo.id}
              src={pexels(photo, 240)}
              alt={photo.alt}
              loading="lazy"
              className="aspect-square w-full rounded-tile object-cover"
            />
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <img src={mockups.light.src} alt={mockups.light.alt} loading="lazy" className="w-full rounded-frame shadow-card" />
          <img src={mockups.dark.src} alt={mockups.dark.alt} loading="lazy" className="w-full rounded-frame shadow-card" />
        </div>
        <p className="mt-5 max-w-[70ch] text-[14px] text-ink-soft">
          Moody objects, renders, portraits and rooms — what people pin to a canvas — from Pexels, always credited
          in the footer. They arrive blurred and sharpen; they are never tinted. Product shots sit on the mauve glow
          with the card shadow.
        </p>
      </div>
    </div>
  )
}
