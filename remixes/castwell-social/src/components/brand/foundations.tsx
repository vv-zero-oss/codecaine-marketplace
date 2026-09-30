import { useRef, useState } from "react"
import { ArrowRight, CalendarClock, Captions, Check, Clapperboard, MessageCircle, PenLine, ShieldCheck, TrendingUp, X } from "lucide-react"

import { GroupLabel, Mono } from "@/components/brand/specimen"
import { contrast, readableRadius, toHex, useComputed, visibleShadow } from "@/components/brand/read-style"
import { BrandLogo, CHANNEL_NAMES, type Channel } from "@/components/ui/brand-logo"
import { LogoMark } from "@/components/ui/logo-mark"
import { PixelArt } from "@/components/ui/pixel-art"
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon"
import { photo, PHOTOS, type PhotoKey } from "@/photos"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  {
    do: "Say what the team gets back: “Plan the week in one sitting.”",
    dont: "Sell the robot: “Revolutionary AI-powered social synergy!”",
  },
  {
    do: "Name the channel, the hour, the number: “Tue 18:30 Lisbon, +31% reach.”",
    dont: "Hide behind “engagement”, “content” and “growth” with nothing attached.",
  },
  {
    do: "Keep people in charge: “Agents draft; people approve.”",
    dont: "Imply it posts on its own: “Set it and forget it.”",
  },
  {
    do: "Calm and plain, one idea per sentence. Serif for the promise, sans for the detail.",
    dont: "Exclamation marks, emoji, hashtags in headlines.",
  },
]

/** The mark and name, drawn without the home link so it can sit on any ground. */
function Lockup({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={cn("size-[26px]", markClassName)} />
      <span className="text-[26px] font-semibold tracking-[-0.03em]">Castwell</span>
    </span>
  )
}

export function BrandIdentity() {
  return (
    <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
      <figure className="flex flex-col bg-page">
        <div className="grid h-56 place-items-center p-6">
          {/* Clear space: one mark-width on every side, drawn as a dashed box. */}
          <div className="p-[26px] outline-1 -outline-offset-1 outline-mint-ink/40 outline-dashed">
            <Lockup className="text-ink" />
          </div>
        </div>
        <figcaption className="border-t border-line px-5 py-3 text-[13px] text-muted">On page — ink #141414 on cream</figcaption>
      </figure>
      <figure className="night flex flex-col bg-night">
        <div className="night-grid grid h-56 place-items-center p-6">
          <div className="p-[26px] outline-1 -outline-offset-1 outline-night-line-strong outline-dashed">
            <Lockup className="text-night-ink" />
          </div>
        </div>
        <figcaption className="border-t border-night-line px-5 py-3 text-[13px] text-night-muted">On night — night ink on #131313</figcaption>
      </figure>
      <div className="grid gap-px bg-line sm:grid-cols-3 lg:col-span-2">
        <div className="bg-page p-5 md:p-6">
          <p className="text-[15px] font-medium text-ink">Clear space</p>
          <p className="mt-1.5 text-[14px] text-ink-soft">One mark-width (26px at header size) on every side — the dashed box.</p>
        </div>
        <div className="bg-page p-5 md:p-6">
          <p className="text-[15px] font-medium text-ink">Minimum size</p>
          <div className="mt-3 flex items-end gap-5 text-ink">
            <span className="flex flex-col items-start gap-1.5">
              <LogoMark className="size-4" />
              <Mono>mark 16px</Mono>
            </span>
            <span className="flex flex-col items-start gap-1.5">
              <span className="inline-flex items-center gap-1">
                <LogoMark className="size-3.5" />
                <span className="text-[14px] font-semibold tracking-[-0.03em]">Castwell</span>
              </span>
              <Mono>lockup 14px</Mono>
            </span>
          </div>
        </div>
        <div className="bg-page p-5 md:p-6">
          <p className="text-[15px] font-medium text-ink">The mark</p>
          <div className="mt-3 flex items-center gap-4">
            <span className="grid size-12 place-items-center bg-ink text-page">
              <LogoMark className="size-6" />
            </span>
            <span className="grid size-12 place-items-center bg-mint-tile text-ink">
              <LogoMark className="size-6" />
            </span>
            <p className="text-[13px] leading-snug text-ink-soft">A block C with one pixel broadcasting. Ink or night ink, on a square — never rounded.</p>
          </div>
        </div>
      </div>
      <div className="bg-page lg:col-span-2">
        <GroupLabel className="px-5 pt-5 md:px-6">Voice</GroupLabel>
        <ul className="border-t border-line">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-3 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-2 sm:gap-8 md:px-6">
              <p className="flex gap-3 text-[14px] text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-mint-ink" aria-label="Do" />
                {line.do}
              </p>
              <p className="flex gap-3 text-[14px] text-muted">
                <X className="mt-0.5 size-4 shrink-0 text-coral" aria-label="Don't" />
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

type SwatchSpec = { token: string; role: string }

/** Every custom property in `:root` of index.css, grouped by what it does. */
const COLOUR_GROUPS: { label: string; night?: boolean; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface",
    swatches: [
      { token: "--page", role: "The page, cards, buttons’ text" },
      { token: "--panel", role: "Product windows, featured plan" },
      { token: "--sage", role: "Alternate bands, hover" },
      { token: "--sage-deep", role: "Tiles, empty bars, planned" },
    ],
  },
  {
    label: "Ink",
    swatches: [
      { token: "--ink", role: "Text, primary button, CTA blocks" },
      { token: "--ink-soft", role: "Body copy, button hover" },
      { token: "--muted", role: "Eyebrows, meta, captions" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { token: "--line", role: "Every hairline" },
      { token: "--line-strong", role: "Outline buttons, switch off" },
    ],
  },
  {
    label: "Night — the diagram sections",
    night: true,
    swatches: [
      { token: "--night", role: "Night ground" },
      { token: "--night-raised", role: "Raised night surface" },
      { token: "--night-ink", role: "Text on night" },
      { token: "--night-muted", role: "Meta on night" },
      { token: "--night-line", role: "Hairlines on night" },
      { token: "--night-line-strong", role: "Boxes on night" },
    ],
  },
  {
    label: "Accent",
    swatches: [
      { token: "--mint", role: "The one accent: published, focus" },
      { token: "--mint-soft", role: "Scheduled, selection" },
      { token: "--mint-tile", role: "Pillar icon tiles" },
      { token: "--mint-ink", role: "Checks and text on mint" },
      { token: "--coral", role: "Video, needs attention" },
      { token: "--coral-soft", role: "In review" },
      { token: "--butter", role: "Queued, scheduler" },
      { token: "--periwinkle", role: "Rendering, copy agent" },
      { token: "--indigo", role: "Brand memory, a chart figure" },
    ],
  },
  {
    label: "Status and shadcn aliases",
    swatches: [
      { token: "--destructive", role: "Errors (shadcn)" },
      { token: "--background", role: "→ page" },
      { token: "--foreground", role: "→ ink" },
      { token: "--card", role: "→ page" },
      { token: "--popover", role: "→ page" },
      { token: "--primary", role: "→ ink" },
      { token: "--primary-foreground", role: "→ page" },
      { token: "--secondary", role: "→ sage" },
      { token: "--accent", role: "→ sage (hover surface)" },
      { token: "--muted-foreground", role: "→ muted" },
      { token: "--border", role: "→ line" },
      { token: "--input", role: "→ line-strong" },
      { token: "--ring", role: "→ mint" },
    ],
  },
]

/** A colour chip painted with the token itself, its value read back off it. */
export function Swatch({ token, role, night }: SwatchSpec & { night?: boolean }) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className={cn("flex flex-col border-r border-b", night ? "border-night-line bg-night text-night-ink" : "border-line bg-page")}>
      <div ref={ref} className={cn("h-20 border-b", night ? "border-night-line" : "border-line")} style={{ background: `var(${token})` }} />
      <figcaption className="flex flex-col gap-0.5 p-4">
        <p className="font-mono text-[12px] break-all">{token}</p>
        <p className={cn("text-[13px]", night ? "text-night-muted" : "text-ink-soft")}>{role}</p>
        <Mono className={cn("pt-1", night && "text-night-muted")}>
          {value ? `${toHex(value)} · ${value}` : "—"}
        </Mono>
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
          <div
            className={cn(
              "grid grid-cols-2 border-t border-l sm:grid-cols-3 lg:grid-cols-4",
              group.night ? "border-night-line" : "border-line",
            )}
          >
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.token} {...swatch} night={group.night} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Text on ground — WCAG 2 contrast, measured</GroupLabel>
        <div className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          <ContrastPair label="Ink on page" className="bg-page text-ink" />
          <ContrastPair label="Ink soft on page" className="bg-page text-ink-soft" />
          <ContrastPair label="Muted on page" className="bg-page text-muted" />
          <ContrastPair label="Muted on sage" className="bg-sage text-muted" />
          <ContrastPair label="Page on ink (primary button)" className="bg-ink text-page" />
          <ContrastPair label="Ink on mint (mint button)" className="bg-mint text-ink" />
          <ContrastPair label="Mint ink on mint soft (status)" className="bg-mint-soft text-mint-ink" />
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
    <div ref={ref} className={cn("flex items-end justify-between gap-4 border-r border-b border-line p-5", className)}>
      <div>
        <p className="font-serif text-[2rem] leading-none font-light">Aa</p>
        <p className="mt-2 text-[13px]">{label}</p>
      </div>
      <p className="text-right font-mono text-[12px] tabular-nums">
        {ratio == null ? "—" : `${ratio.toFixed(2)}:1`}
        <span className="block">{grade}</span>
      </p>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const TYPE_SCALE = [
  { name: "Display", className: "font-serif text-display font-light", use: "Page heroes (--text-display)", sample: "Run every channel." },
  { name: "Title", className: "font-serif text-title font-light", use: "Section titles (--text-title)", sample: "Channel-agnostic by design" },
  { name: "Heading", className: "font-serif text-heading font-light", use: "CTA band, knowledge base (--text-heading)", sample: "Notes from the always-on feed" },
  { name: "Stat", className: "font-serif text-[5.5rem] leading-none font-light md:text-[7rem]", use: "Outcome numbers", sample: "4.2×" },
  { name: "Price", className: "font-serif text-[3.25rem] leading-none font-light", use: "Plan prices", sample: "$82" },
  { name: "Card title", className: "font-serif text-[1.75rem] leading-tight font-light", use: "Pillars, plans, agents", sample: "Publish" },
  { name: "Question", className: "font-serif text-[1.35rem] leading-snug font-light", use: "FAQ, timeline days", sample: "Will the AI post without asking me?" },
  { name: "Wordmark", className: "text-[26px] font-semibold tracking-[-0.03em]", use: "The name, only", sample: "Castwell" },
  { name: "Lede", className: "text-lg leading-relaxed text-ink-soft", use: "Hero description", sample: "Less time posting, more time building the brand." },
  { name: "Body", className: "text-[15px] leading-relaxed text-ink-soft", use: "Section copy, lists", sample: "Agents draft; people approve." },
  { name: "UI", className: "text-sm font-medium", use: "Buttons, nav, labels", sample: "Start free" },
  { name: "Eyebrow", className: "text-[13px] leading-none text-muted", use: "Above every title", sample: "How the studio works" },
  { name: "Caption", className: "text-[11px] font-medium", use: "Status pills, mockup meta", sample: "Needs review" },
]

export function TypeSample({ name, className, use, sample }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing", "font-family"])
  const family = (values["font-family"] ?? "").split(",")[0]?.replace(/"/g, "")
  return (
    <div className="grid gap-3 border-b border-line py-6 last:border-b-0 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
      <div>
        <p className="text-[15px] font-medium text-ink">{name}</p>
        <p className="text-[13px] text-ink-soft">{use}</p>
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
  const [serif, serifValues] = useComputed<HTMLDivElement>(["font-family"])
  const [sans, sansValues] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-px border border-line bg-line md:grid-cols-2">
        <div ref={serif} className="bg-page p-6 font-serif md:p-8">
          <GroupLabel className="font-sans">Serif — the promise</GroupLabel>
          <p className="text-[3.5rem] leading-none font-light">Newsreader</p>
          <p className="mt-5 text-[1.15rem] leading-snug font-light text-ink-soft">
            Light (300) only, optical size on. Headlines, numbers, questions — anything read as a sentence.
          </p>
          <p className="mt-4 text-xl font-light">Aa Bb Cc 0123456789 — “&amp;”</p>
          <Mono className="mt-4 block font-sans">{serifValues["font-family"]}</Mono>
        </div>
        <div ref={sans} className="bg-page p-6 md:p-8">
          <GroupLabel>Sans — the detail</GroupLabel>
          <p className="text-[3.25rem] leading-none font-semibold tracking-[-0.03em]">Inter</p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
            400 for copy, 500 for UI and emphasis, 600 for the wordmark and product-window titles. Never bold.
          </p>
          <p className="mt-4 text-xl">
            Aa Bb Cc <span className="tabular-nums">0123456789</span>
          </p>
          <Mono className="mt-4 block">{sansValues["font-family"]}</Mono>
        </div>
      </div>
      <div>
        <GroupLabel>Scale — read off each sample at this width</GroupLabel>
        <div className="border border-line bg-page px-5 md:px-8">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        <div className="bg-page p-6">
          <GroupLabel>Numerals — tabular, in tables and slots</GroupLabel>
          <p className="text-3xl font-medium tabular-nums">
            18:30 · 248,310
            <br />
            11:11 · 061,587
          </p>
        </div>
        <div className="bg-page p-6">
          <GroupLabel>Numerals — serif, for the one big figure</GroupLabel>
          <p className="font-serif text-[3.5rem] leading-none font-light">+31%</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = [
  { step: "1", className: "w-1" },
  { step: "1.5", className: "w-1.5" },
  { step: "2", className: "w-2" },
  { step: "2.5", className: "w-2.5" },
  { step: "3", className: "w-3" },
  { step: "4", className: "w-4" },
  { step: "5", className: "w-5" },
  { step: "6", className: "w-6" },
  { step: "8", className: "w-8" },
  { step: "10", className: "w-10" },
  { step: "12", className: "w-12" },
  { step: "16", className: "w-16" },
  { step: "gutter", className: "w-(--spacing-gutter)" },
  { step: "section", className: "w-(--spacing-section)" },
]

export function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[4.5rem_4.5rem_minmax(0,1fr)] items-center gap-4 border-b border-line py-2.5 last:border-b-0">
      <Mono className="text-ink">{step}</Mono>
      <Mono>{values.width}</Mono>
      <div ref={ref} className={cn("h-3 max-w-full bg-mint", className)} />
    </li>
  )
}

const RADII = [
  { name: "radius-sm … xl", className: "rounded-lg", use: "Every card, button, input: square" },
  { name: "none", className: "rounded-none", use: "Menus, sheets, tabs" },
  { name: "full", className: "rounded-full", use: "Chips, discs, avatars, the switch" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="bg-page p-5">
      <div ref={ref} className={cn("h-16 border border-line-strong bg-sage", className)} />
      <figcaption className="mt-3">
        <span className="text-[14px] font-medium text-ink">{name}</span> <Mono>{readableRadius(values["border-top-left-radius"] ?? "")}</Mono>
        <span className="block text-[13px] text-ink-soft">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "Hairline", className: "shadow-hairline", use: "Post chips at rest" },
  { name: "Float", className: "shadow-float", use: "A post chip lifted on hover" },
  { name: "Menu", className: "shadow-menu", use: "The navigation dropdown" },
]

export function ShadowSample({ name, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure>
      <div ref={ref} className={cn("h-24 border border-line bg-page", className)} />
      <figcaption className="mt-4">
        <span className="text-[14px] font-medium text-ink">{name}</span>
        <span className="block text-[13px] text-ink-soft">{use}</span>
        <Mono className="mt-1 block">{visibleShadow(values["box-shadow"] ?? "")}</Mono>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-line", use: "Grids, cards, rows", tone: "page" },
  { name: "Strong", className: "border border-line-strong", use: "Outline buttons, windows", tone: "page" },
  { name: "Ink", className: "border border-ink", use: "Outline button on hover", tone: "page" },
  { name: "Accent edge", className: "border border-l-[3px] border-line border-l-mint", use: "Post chips, by channel colour", tone: "page" },
  { name: "Night hairline", className: "border border-night-line", use: "Grids on night", tone: "night" },
  { name: "Night box", className: "border border-night-line-strong", use: "Diagram boxes on night", tone: "night" },
] as const

export function BorderSample({ name, className, use, tone }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-left-width", "border-left-color", "border-bottom-width", "border-bottom-color", "border-bottom-style"])
  const night = tone === "night"
  return (
    <figure className={cn("p-5", night ? "bg-night" : "bg-page")}>
      <div ref={ref} className={cn("h-14", night ? "bg-night" : "bg-page", className)} />
      <figcaption className="mt-3">
        <span className={cn("text-[14px] font-medium", night ? "text-night-ink" : "text-ink")}>{name}</span>
        <span className={cn("block text-[13px]", night ? "text-night-muted" : "text-ink-soft")}>{use}</span>
        <Mono className={cn("mt-1 block", night && "text-night-muted")}>
          {values["border-bottom-width"]} {values["border-bottom-style"]} {toHex(values["border-bottom-color"] ?? "")}
          {values["border-left-width"] !== values["border-bottom-width"]
            ? ` · left ${values["border-left-width"]} ${toHex(values["border-left-color"] ?? "")}`
            : ""}
        </Mono>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <GroupLabel>Spacing — Tailwind’s 4px steps and the two rhythm tokens</GroupLabel>
          <ul className="border border-line bg-page px-5">
            {SPACING.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-ink-soft">
            <code className="font-mono text-[12px]">--spacing-section</code> is every band’s top and bottom;{" "}
            <code className="font-mono text-[12px]">--spacing-gutter</code> is every side. Both are clamps read at 1440 and scaled down.
          </p>
        </div>
        <div className="min-w-0">
          <GroupLabel>Radii — the page is square</GroupLabel>
          <div className="grid gap-px border border-line bg-line">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — the page is flat; these are the only lifts it allows</GroupLabel>
        <div className="grid gap-8 border border-line bg-sage p-6 sm:grid-cols-3 md:p-10">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders — 1px, everywhere, doing the work shadows would elsewhere</GroupLabel>
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
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
  duration: string
  easing: string
  keyframes: Keyframe[]
}

/** Durations and easings name the tokens in index.css; the values are read at play time. */
const MOTION: MotionSpec[] = [
  {
    name: "Press",
    where: "Every button: scale to 0.97",
    duration: "--duration-press",
    easing: "--ease-out",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "UI change",
    where: "Hover fills, carets, channel arrows",
    duration: "--duration-ui",
    easing: "--ease-out",
    keyframes: [{ transform: "translateX(0)" }, { transform: "translateX(6px)" }],
  },
  {
    name: "Reveal",
    where: "Sections arriving: fade + 16px rise, once",
    duration: "--duration-reveal",
    easing: "--ease-out",
    keyframes: [
      { opacity: 0, transform: "translateY(16px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
  },
  {
    name: "Render bar",
    where: "Studio render queue, breathing",
    duration: "2400ms",
    easing: "--ease-in-out",
    keyframes: [{ transform: "scaleX(0.92)" }, { transform: "scaleX(1)" }],
  },
  {
    name: "Sheet",
    where: "The mobile menu from the right",
    duration: "500ms",
    easing: "--ease-drawer",
    keyframes: [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
  },
]

function readToken(value: string) {
  return value.startsWith("--") ? getComputedStyle(document.documentElement).getPropertyValue(value).trim() : value
}

/** Plays one of the page's motions through the Web Animations API — so the
 *  editor's Motion switch stops and reduces it like the page's own. */
export function MotionSample({ name, where, duration, easing, keyframes }: MotionSpec) {
  const target = useRef<HTMLDivElement>(null)
  const [resolved, setResolved] = useState<{ duration: string; easing: string } | null>(null)
  const read = () => ({ duration: readToken(duration), easing: readToken(easing) })
  const play = () => {
    const element = target.current
    if (!element) return
    const now = read()
    setResolved(now)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.getAnimations().forEach((animation) => animation.cancel())
    element.animate(keyframes, {
      duration: reduced ? 1 : parseFloat(now.duration) * (now.duration.endsWith("ms") ? 1 : 1000),
      easing: now.easing,
      fill: "none",
    })
  }
  const shown = resolved ?? (typeof document !== "undefined" ? read() : null)
  return (
    <div className="flex flex-col border-r border-b border-line bg-page p-5">
      <div className="flex h-24 items-center overflow-hidden bg-sage px-4">
        <div ref={target} className="h-10 w-full origin-left bg-ink" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[15px] font-medium text-ink">{name}</p>
          <p className="text-[13px] text-ink-soft">{where}</p>
          <Mono className="mt-1 block">
            {duration.startsWith("--") ? `${duration} ` : ""}
            {shown?.duration} · {easing.startsWith("--") ? `${easing} ` : ""}
            {shown?.easing}
          </Mono>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 border border-line-strong bg-page px-4 text-sm font-medium text-ink transition-[transform,border-color] duration-(--duration-press) ease-out-strong hover:border-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.97]"
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
      <div className="grid border-t border-l border-line md:grid-cols-2 xl:grid-cols-3">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <ul className="grid gap-px border border-line bg-line text-[14px] text-ink-soft sm:grid-cols-2">
        <li className="bg-page p-5">
          <span className="font-medium text-ink">Scroll</span> is Lenis at <code className="font-mono text-[12px]">lerp 0.09</code>,
          held in a ref so the editor can pause it (<code className="font-mono text-[12px]">motion/smooth-scroll.tsx</code>).
        </li>
        <li className="bg-page p-5">
          <span className="font-medium text-ink">Scroll-linked</span>: the product window unfolds, hero chips drift by depth, and pixel
          steps climb between light and night — all tied to scroll, never to time.
        </li>
        <li className="bg-page p-5">
          <span className="font-medium text-ink">Reduced motion</span> is read from the media query where motion starts: reveals show
          at rest, text is written whole, counters land on their value.
        </li>
        <li className="bg-page p-5">
          <span className="font-medium text-ink">Nothing bounces.</span> One strong ease-out for arrivals, one ease-in-out for things
          that loop, and a drawer curve for the sheet.
        </li>
      </ul>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const PIXEL_ICONS: PixelIconName[] = ["calendar", "film", "send", "chat", "spark", "chart", "shield", "clock", "brain", "inbox"]
const LINE_ICONS = [TrendingUp, MessageCircle, Clapperboard, CalendarClock, ShieldCheck, PenLine, Captions, ArrowRight]
const CHANNELS = Object.keys(CHANNEL_NAMES) as Channel[]
const PHOTO_SAMPLE: PhotoKey[] = ["vlogKitchen", "serum", "runner", "maya"]

export function Iconography() {
  return (
    <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
      <div className="bg-page p-6">
        <GroupLabel>Pixel icons — 9×9 bitmaps, the feature marks</GroupLabel>
        <div className="flex flex-wrap gap-2">
          {PIXEL_ICONS.map((name) => (
            <span key={name} title={name} className="grid size-14 place-items-center bg-mint-tile text-ink">
              <PixelIcon name={name} className="size-7" />
            </span>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-ink-soft">
          Always on a square tile, in ink. Drawn with <code className="font-mono text-[12px]">crispEdges</code> so they stay pixels at any size.
        </p>
      </div>
      <div className="bg-page p-6">
        <GroupLabel>Line icons — Lucide, 2px stroke, in chips and mockups</GroupLabel>
        <div className="flex flex-wrap gap-2">
          {LINE_ICONS.map((Icon, i) => (
            <span key={i} className="grid size-11 place-items-center border border-line text-ink">
              <Icon className="size-4" />
            </span>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-ink-soft">Small and quiet: 12–16px inside product UI and chip discs, never as a feature illustration.</p>
      </div>
      <div className="bg-page p-6">
        <GroupLabel>Channel logos — SVGL, light and dark variants</GroupLabel>
        <div className="grid grid-cols-3 gap-px border border-line bg-line">
          {CHANNELS.map((channel) => (
            <span key={channel} className="flex flex-col items-center gap-2 bg-page p-3">
              <BrandLogo channel={channel} className="size-6" />
              <Mono>{CHANNEL_NAMES[channel]}</Mono>
            </span>
          ))}
        </div>
        <div className="mt-px grid grid-cols-3 gap-px border border-t-0 border-night-line bg-night-line">
          {CHANNELS.map((channel) => (
            <span key={channel} className="grid place-items-center bg-night p-3">
              <BrandLogo channel={channel} theme="dark" className="size-6" />
            </span>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-ink-soft">Never redrawn, never recoloured — the network’s own mark, at the network’s own colours.</p>
      </div>
      <div className="bg-page p-6">
        <GroupLabel>Imagery — Pexels photography and seeded pixel art</GroupLabel>
        <div className="grid grid-cols-4 gap-2">
          {PHOTO_SAMPLE.map((key) => (
            <img key={key} src={photo(key, 300)} alt={PHOTOS[key].alt} loading="lazy" className="aspect-[9/16] w-full bg-sage-deep object-cover" />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {(["mint", "graphite", "sage", "coral"] as const).map((palette, i) => (
            <PixelArt key={palette} palette={palette} seed={i + 3} className="aspect-[1.45]" />
          ))}
        </div>
        <p className="mt-4 text-[13px] text-ink-soft">
          Real creators in warm, natural light, cropped square-cornered to 9:16 like the posts they stand for. Covers without a photo
          are pixel fields in one palette. Every photographer is credited in the footer.
        </p>
      </div>
    </div>
  )
}
