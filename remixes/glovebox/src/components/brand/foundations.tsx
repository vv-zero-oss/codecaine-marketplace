import {
  ArrowUp,
  CalendarCheck,
  Car,
  Check,
  ChevronDown,
  CircleCheck,
  Download,
  FileSearch,
  FileText,
  Files,
  Filter,
  Gauge,
  Landmark,
  Link2,
  Loader,
  Mic,
  Play,
  Plus,
  Receipt,
  RefreshCw,
  Search,
  ShieldCheck,
  Timer,
  UserPlus,
  X,
} from "lucide-react"
import { useRef } from "react"

import { GroupLabel } from "@/components/brand/specimen"
import { cleanShadow, contrast, toHex, toMs, useComputed, useRootVars } from "@/components/brand/read-style"
import { PhotoTile } from "@/components/blocks/mini-cards"
import { LogoMark, Wordmark } from "@/components/ui/logo-mark"
import { SectionHeading } from "@/components/ui/section-heading"
import { media, photo } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what it did: “Renewed the Outback, saved $312.”", dont: "Say what it is: “An AI-powered insurance platform.”" },
  { do: "Calm and plain, like a note from a careful friend.", dont: "Urgent: “Don't miss out! Act now!”" },
  { do: "Name the real thing — the car, the excess, the date.", dont: "Hide in jargon: “Optimise your coverage portfolio.”" },
  { do: "Say what still needs the driver, and only that.", dont: "Ask for attention it doesn't need, or sprinkle emoji." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>On paper</GroupLabel>
        <div className="flex h-48 items-center justify-center rounded-panel bg-surface shadow-card">
          {/* Clear space: the mark's height on every side, drawn. */}
          <div className="rounded-control p-7 outline-1 outline-dashed outline-faint">
            <Wordmark className="text-ink [&>span]:text-[32px] [&>svg]:size-8" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>On footage</GroupLabel>
        <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-panel bg-ink">
          <img src={media.closing.poster} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-scrim" />
          <div className="relative rounded-control p-7 text-surface outline-1 outline-dashed outline-surface/40">
            <Wordmark className="[&>span]:text-[32px] [&>svg]:size-8" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-panel bg-surface p-5 shadow-hairline">
          <dt className="text-[15px] text-ink">Clear space</dt>
          <dd className="mt-1 text-[14px] leading-relaxed text-muted">The height of the mark on every side — the dashed box.</dd>
        </div>
        <div className="rounded-panel bg-surface p-5 shadow-hairline">
          <dt className="text-[15px] text-ink">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-[14px] text-muted">
            <LogoMark className="size-3.5 text-ink" />
            <span>14px mark alone; 18px beside the name.</span>
          </dd>
        </div>
        <div className="rounded-panel bg-surface p-5 shadow-hairline">
          <dt className="text-[15px] text-ink">Mark only</dt>
          <dd className="mt-2 flex items-center gap-3 text-[14px] text-muted">
            <LogoMark className="size-7 text-ink" />
            <span>A glovebox lid and latch, in currentColor: ink on paper, white on footage.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-hairline overflow-hidden rounded-panel bg-surface shadow-hairline">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-3 p-5 text-[15px] leading-relaxed sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5 text-ink">
                <Check className="mt-1 size-4 shrink-0 text-check" strokeWidth={1.8} />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-muted">
                <X className="mt-1 size-4 shrink-0 text-alert" strokeWidth={1.8} />
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

type SwatchSpec = { name: string; token: string; className: string; role: string; dark?: boolean }

/** Class strings are written out whole so Tailwind generates them. */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Paper and surfaces",
    swatches: [
      { name: "Paper", token: "--color-paper", className: "bg-paper", role: "The page" },
      { name: "Surface", token: "--color-surface", className: "bg-surface", role: "Cards, tiles, keys" },
      { name: "Surface soft", token: "--color-surface-soft", className: "bg-surface-soft", role: "Task panels, key hover" },
      { name: "Sand", token: "--color-sand", className: "bg-sand", role: "Step cards, mini cards" },
      { name: "Sand deep", token: "--color-sand-deep", className: "bg-sand-deep", role: "The nav tray, ghost hover" },
      { name: "Sand press", token: "--color-sand-press", className: "bg-sand-press", role: "Log in key" },
    ],
  },
  {
    label: "Ink",
    swatches: [
      { name: "Ink strong", token: "--color-ink-strong", className: "bg-ink-strong", role: "Primary button, dialog" },
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Headlines and text" },
      { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft", role: "Body under headlines" },
      { name: "Muted", token: "--color-muted", className: "bg-muted", role: "Secondary text, labels" },
      { name: "Faint", token: "--color-faint", className: "bg-faint", role: "Unlit headings, threads" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { name: "Hairline", token: "--color-hairline", className: "bg-hairline", role: "Dividers inside cards" },
      { name: "Dot", token: "--color-dot", className: "bg-dot", role: "The map's empty dots" },
    ],
  },
  {
    label: "Signals",
    swatches: [
      { name: "Money", token: "--color-money", className: "bg-money", role: "Savings, amounts" },
      { name: "Money soft", token: "--color-money-soft", className: "bg-money-soft", role: "Money chip" },
      { name: "Check", token: "--color-check", className: "bg-check", role: "Done ticks" },
      { name: "Link", token: "--color-link", className: "bg-link", role: "Status chips, links" },
      { name: "Link soft", token: "--color-link-soft", className: "bg-link-soft", role: "Link chip" },
      { name: "Alert", token: "--color-alert", className: "bg-alert", role: "A warning mark (don'ts here)" },
    ],
  },
  {
    label: "On footage — translucent, drawn over a frame of film",
    swatches: [
      { name: "Glass", token: "--color-glass", className: "bg-glass", role: "Frosted sign-up tray", dark: true },
      { name: "Glass edge", token: "--color-glass-edge", className: "bg-glass-edge", role: "Its inner hairline", dark: true },
      { name: "Scrim", token: "--color-scrim", className: "bg-scrim", role: "Darkens footage under type", dark: true },
    ],
  },
]

export function Swatch({ name, token, className, role, dark }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="m-0 overflow-hidden rounded-panel bg-surface shadow-hairline">
      <div className={cn("relative h-20 border-b border-hairline", dark ? "bg-ink" : "bg-surface")}>
        {dark ? <img src={media.hero.poster} alt="" className="absolute inset-0 size-full object-cover" /> : null}
        <div ref={ref} className={cn("relative size-full", className)} />
      </div>
      <figcaption className="space-y-0.5 p-4">
        <p className="text-[15px] text-ink">{name}</p>
        <p className="text-[13px] text-muted">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-muted">{token}</p>
        <p className="font-mono text-[11px] break-all text-muted">
          {value || "—"} · {value ? toHex(value) : "—"}
        </p>
      </figcaption>
    </figure>
  )
}

export function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-panel p-5 shadow-hairline", className)}>
      <div>
        <p className="font-display text-[2.25rem] leading-none">Aa</p>
        <p className="mt-2 text-[14px]">{label}</p>
      </div>
      <p className="text-right font-mono text-[11px] tabular">
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
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.token} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Text on surface — WCAG contrast, measured</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ContrastPair label="Ink on paper — headlines" className="bg-paper text-ink" />
          <ContrastPair label="Ink soft on paper — body" className="bg-paper text-ink-soft" />
          <ContrastPair label="Muted on paper — labels" className="bg-paper text-muted" />
          <ContrastPair label="Muted on surface — answers" className="bg-surface text-muted" />
          <ContrastPair label="Ink on sand — step cards" className="bg-sand text-ink" />
          <ContrastPair label="Faint on paper — unlit" className="bg-paper text-faint" />
          <ContrastPair label="Money on money soft — chip" className="bg-money-soft text-money" />
          <ContrastPair label="Link on link soft — chip" className="bg-link-soft text-link" />
          <ContrastPair label="Surface on ink strong — button" className="bg-ink-strong text-surface" />
        </div>
        <p className="mt-4 max-w-[62ch] text-[14px] leading-relaxed text-muted">
          Muted passes AA large, so it carries labels and short answers at 15px and up, never long reading. Faint is
          not for text you must read: it is the colour a heading starts from before it inks in on scroll.
        </p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const FAMILIES = [
  { name: "Newsreader", role: "Display — every headline, set light and tight", className: "font-display text-[3rem] leading-none", sample: "You drive the car." },
  { name: "DM Sans", role: "Interface and body", className: "font-sans text-[2.25rem] leading-tight", sample: "Let Glovebox run it" },
  { name: "DM Mono", role: "Amounts, plates, references, chips", className: "font-mono text-[1.75rem] leading-tight", sample: "$892.00 · 7XKD 214" },
]

export function FamilySample({ name, role, className, sample }: (typeof FAMILIES)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-family", "font-weight", "letter-spacing"])
  return (
    <div className="min-w-0 rounded-panel bg-surface p-6 shadow-hairline">
      <GroupLabel>
        {name} — {role}
      </GroupLabel>
      <p ref={ref} className={cn("break-words text-ink", className)}>
        {sample}
      </p>
      <p className="mt-4 font-mono text-[11px] break-all text-muted">
        {values["font-family"]} · {values["font-weight"]} · {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
      </p>
    </div>
  )
}

const TYPE_SCALE = [
  { name: "Hero", className: "font-display text-[clamp(2.875rem,5.4vw+1rem,6rem)] leading-[0.98] tracking-[-0.03em]", use: "The first screen", sample: "Not the paperwork." },
  { name: "Statistic", className: "font-display text-[clamp(3.5rem,5vw+1.5rem,7rem)] leading-none tracking-[-0.03em] tabular", use: "The pinned number", sample: "92%" },
  { name: "Closing", className: "font-display text-[clamp(2.25rem,3.4vw+1rem,4.5rem)] leading-[1.02] tracking-[-0.025em]", use: "The closing frame", sample: "One quiet place" },
  { name: "Footer", className: "font-display text-[clamp(2.25rem,2.6vw+1rem,4rem)] leading-[1.04] tracking-[-0.025em]", use: "The sign-off", sample: "AI that runs it" },
  { name: "Feature title", className: "font-display text-[clamp(1.625rem,0.9vw+1.1rem,2.125rem)] leading-[1.08] tracking-[-0.02em]", use: "Beside each pinned card", sample: "Keeps you in the loop" },
  { name: "Quote", className: "font-display text-[clamp(1.375rem,1.1vw+1rem,2rem)] leading-[1.18]", use: "Member stories", sample: "Now I get one message." },
  { name: "Step title", className: "text-lg sm:text-xl text-ink", use: "How it works", sample: "Shops every renewal" },
  { name: "Lead", className: "text-[15px] sm:text-[17px]", use: "Under the hero, panel titles", sample: "Let Glovebox run your car insurance" },
  { name: "Body", className: "text-[15px] leading-relaxed sm:text-base", use: "Answers, descriptions", sample: "It shops your renewals weeks before they're due." },
  { name: "Small", className: "text-[13px]", use: "Card rows, links", sample: "Northway Direct · like for like" },
  { name: "Mono", className: "font-mono text-[13px] tabular", use: "Legal line, amounts", sample: "−$312.00 a year" },
  { name: "Mono small", className: "font-mono text-[11px] tracking-[-0.01em]", use: "Chips and plates", sample: "2021 HONDA CIVIC" },
]

export function TypeSample({ name, className, use, sample }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid min-w-0 gap-3 border-b border-hairline py-6 last:border-b-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div>
        <p className="text-[15px] text-ink">{name}</p>
        <p className="text-[13px] text-muted">{use}</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted tabular">
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

export function HeadingSample({ size }: { size: "md" | "lg" }) {
  const [ref, values] = useComputed<HTMLHeadingElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid min-w-0 gap-3 border-b border-hairline py-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div>
        <p className="text-[15px] text-ink">SectionHeading {size}</p>
        <p className="text-[13px] text-muted">{size === "lg" ? "The features' opener" : "Every other section"}</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted tabular">
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </p>
      </div>
      <SectionHeading ref={ref} size={size} align="left" className="min-w-0">
        How Glovebox works
      </SectionHeading>
    </div>
  )
}

export function Typography() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 lg:grid-cols-3">
        {FAMILIES.map((family) => (
          <FamilySample key={family.name} {...family} />
        ))}
      </div>
      <div>
        <GroupLabel>Scale — sizes with a clamp grow with the window; these are measured at this width</GroupLabel>
        <div className="rounded-panel bg-surface px-5 shadow-hairline sm:px-6">
          <HeadingSample size="lg" />
          <HeadingSample size="md" />
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-panel bg-surface p-6 shadow-hairline">
          <GroupLabel>Italic — the second line of a promise</GroupLabel>
          <p className="font-display text-[2.5rem] leading-[1.02] text-ink">
            AI that runs your <em>car insurance</em>
          </p>
        </div>
        <div className="rounded-panel bg-surface p-6 shadow-hairline">
          <GroupLabel>Numerals — tabular in mono for money</GroupLabel>
          <p className="font-mono text-[1.75rem] leading-snug text-money tabular">
            $96.40
            <br />
            $892.00
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const STEPS = ["1", "1.5", "2", "2.5", "3", "4", "5", "6", "8", "10", "12", "16"].map((step) => ({
  step,
  className: `w-${step}`,
}))
// Written out whole so Tailwind generates them: w-1 w-1.5 w-2 w-2.5 w-3 w-4 w-5 w-6 w-8 w-10 w-12 w-16

export function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[3rem_4rem_minmax(0,1fr)] items-center gap-4 py-1.5">
      <span className="font-mono text-[12px] text-muted">{step}</span>
      <span className="font-mono text-[12px] text-ink-soft tabular">{values.width}</span>
      <div ref={ref} className={cn("h-2.5 rounded-full bg-link", className)} />
    </li>
  )
}

const RADII = [
  { name: "chip", className: "rounded-chip", use: "Status chips" },
  { name: "control", className: "rounded-control", use: "Buttons, nav keys" },
  { name: "tile", className: "rounded-tile", use: "Mini cards, rows, photos" },
  { name: "panel", className: "rounded-panel", use: "Task panels, FAQ tiles" },
  { name: "step", className: "rounded-step", use: "How-it-works cards" },
  { name: "frame", className: "rounded-frame", use: "Clip frames at rest" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="m-0">
      <div ref={ref} className={cn("h-20 bg-sand", className)} />
      <figcaption className="mt-2 text-[13px]">
        <span className="text-ink">{name}</span> <span className="font-mono text-[11px] text-muted">{values["border-top-left-radius"]}</span>
        <span className="block text-muted">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "Hairline", className: "shadow-hairline", use: "A 1px ring instead of a border" },
  { name: "Card", className: "shadow-card", use: "Tiles and mini cards" },
  { name: "Float", className: "shadow-float", use: "Photos and stories over the page" },
  { name: "Panel", className: "shadow-panel", use: "Task panels over footage" },
  { name: "Nav", className: "shadow-nav", use: "The nav tray" },
  { name: "Press", className: "shadow-press", use: "White keys — a lit top edge" },
]

export function ShadowSample({ name, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="m-0">
      <div ref={ref} className={cn("h-24 rounded-tile bg-surface", className)} />
      <figcaption className="mt-3 text-[13px]">
        <span className="text-ink">{name}</span>
        <span className="block text-muted">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-muted">{cleanShadow(values["box-shadow"])}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline rule", className: "border-t border-hairline", use: "Dividers inside tiles" },
  { name: "Dashed hairline", className: "border-t border-dashed border-hairline", use: "The policy card's blank lines" },
  { name: "Thread", className: "border-l border-dashed border-faint", use: "Joins two tiles in how it works" },
  { name: "Ask button", className: "border border-ink/70", use: "The round send button" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const side = name === "Thread" ? "left" : name === "Ask button" ? "top" : "top"
  const [ref, values] = useComputed<HTMLDivElement>([`border-${side}-width`, `border-${side}-style`, `border-${side}-color`])
  return (
    <figure className="m-0">
      <div className="flex h-16 items-center justify-center rounded-tile bg-surface px-4 shadow-hairline">
        <div ref={ref} className={cn(name === "Thread" ? "h-10 w-0" : name === "Ask button" ? "size-9 rounded-full" : "w-full", className)} />
      </div>
      <figcaption className="mt-2 text-[13px]">
        <span className="text-ink">{name}</span>
        <span className="block text-muted">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-muted">
          {values[`border-${side}-width`]} {values[`border-${side}-style`]} {values[`border-${side}-color`]}
        </span>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          <GroupLabel>Spacing — 4px steps</GroupLabel>
          <ul className="rounded-panel bg-surface px-5 py-3 shadow-hairline">
            {STEPS.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            The container pads 16 / 24 / 32px (px-4, sm:px-6, lg:px-8) up to 120rem. Sections breathe in screen heights —
            14–18svh — so the rhythm holds on any window.
          </p>
        </div>
        <div className="min-w-0">
          <GroupLabel>Radii</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — soft, warm, stacked</GroupLabel>
        <div className="grid gap-8 rounded-panel bg-paper p-6 shadow-hairline sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders — rare; a hairline shadow does most of the work</GroupLabel>
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
  duration: string | number
  source?: string
  easing: string
  keyframes: Keyframe[]
  target?: "bar" | "button" | "frame" | "line"
}

const MOTION: MotionSpec[] = [
  {
    name: "Press",
    where: "Buttons and nav keys",
    duration: "--duration-press",
    easing: "--ease-out",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
    target: "button",
  },
  {
    name: "Reveal",
    where: "Headings and blocks the first time they scroll in",
    duration: "--duration-reveal",
    easing: "--ease-out",
    keyframes: [
      { opacity: 0, transform: "translateY(16px)", filter: "blur(6px)" },
      { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
    ],
  },
  {
    name: "Ticker roll",
    where: "The hero's status line",
    duration: 500,
    source: "ticker.tsx",
    easing: "--ease-in-out",
    keyframes: [{ transform: "translateY(100%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
    target: "line",
  },
  {
    name: "Accordion",
    where: "FAQ answers opening",
    duration: 260,
    source: "--animate-accordion-down",
    easing: "--ease-out",
    keyframes: [{ transform: "scaleY(0.2)" }, { transform: "scaleY(1)" }],
  },
  {
    name: "Dialog",
    where: "The story film",
    duration: 260,
    source: "dialog-in",
    easing: "--ease-out",
    keyframes: [{ opacity: 0, transform: "scale(0.96)" }, { opacity: 1, transform: "scale(1)" }],
  },
  {
    name: "Clip close",
    where: "The hero frame, scrubbed by scroll (played on time here)",
    duration: 1200,
    source: "scroll-linked",
    easing: "--ease-in-out",
    keyframes: [
      { clipPath: "inset(0% 0% 0% 0% round 0px)" },
      { clipPath: "inset(11% 9% 11% 9% round 44px)" },
    ],
    target: "frame",
  },
]

/** Plays one of the page's motions on a sample, through the Web Animations API
 *  — so the editor's Motion switch stops and reduces it like the page's own.
 *  Curves and durations are read off `:root` when it plays. */
export function MotionSample({ name, where, duration, source, easing, keyframes, target = "bar" }: MotionSpec) {
  const element = useRef<HTMLDivElement>(null)
  const vars = useRootVars([easing, typeof duration === "string" ? duration : "--duration-ui"])
  const ms = typeof duration === "number" ? duration : toMs(vars[duration], 300)
  const curve = vars[easing] || "ease-out"
  const play = () => {
    const node = element.current
    if (!node) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    node.getAnimations().forEach((animation) => animation.cancel())
    node.animate(keyframes, { duration: reduced ? 1 : ms, easing: curve, fill: "none" })
  }
  return (
    <div className="flex min-w-0 flex-col rounded-panel bg-surface p-4 shadow-hairline">
      <div className="flex h-28 items-center justify-center overflow-hidden rounded-tile bg-sand px-4">
        {target === "button" ? (
          <div ref={element} className="flex h-10 items-center rounded-control bg-ink-strong px-4 text-[15px] text-surface">
            Get started
          </div>
        ) : target === "frame" ? (
          <div ref={element} className="relative size-full overflow-hidden bg-ink">
            <img src={media.hero.poster} alt="" className="size-full object-cover" />
          </div>
        ) : target === "line" ? (
          <div className="h-6 overflow-hidden">
            <div ref={element} className="flex h-6 items-center gap-2 text-[15px] text-ink">
              <RefreshCw className="size-4" strokeWidth={1.6} /> Renewed the Outback, saved $312
            </div>
          </div>
        ) : (
          <div ref={element} className="h-14 w-full origin-top rounded-tile bg-surface shadow-card" />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[15px] text-ink">{name}</p>
          <p className="text-[13px] text-muted">{where}</p>
          <p className="mt-1 font-mono text-[11px] break-all text-muted">
            {Math.round(ms)}ms · {typeof duration === "string" ? duration : source} · {easing} = {curve}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-control bg-surface px-3.5 text-[15px] text-ink shadow-press transition-[background-color,transform] duration-(--duration-press) ease-(--ease-out) hover:bg-surface-soft focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:outline-none active:scale-[0.97] sm:h-10"
        >
          <Play className="size-3.5 fill-current" /> Play
        </button>
      </div>
    </div>
  )
}

export function Motion() {
  const vars = useRootVars(["--animate-spin-slow", "--animate-caret", "--duration-ui"])
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-panel bg-surface p-5 text-[14px] leading-relaxed text-muted shadow-hairline">
          <p className="text-[15px] text-ink">Loops</p>
          <p className="mt-2 flex items-center gap-2">
            <Loader className="size-4 animate-spin-slow text-ink" strokeWidth={1.5} /> running task
            <span className="ml-3 inline-block h-4 w-px animate-caret bg-ink" /> caret
          </p>
          <p className="mt-2 font-mono text-[11px] break-all">
            --animate-spin-slow: {vars["--animate-spin-slow"]}
            <br />
            --animate-caret: {vars["--animate-caret"]}
            <br />
            --duration-ui: {vars["--duration-ui"]} (colour changes)
          </p>
        </div>
        <div className="rounded-panel bg-surface p-5 text-[14px] leading-relaxed text-muted shadow-hairline">
          <p className="text-[15px] text-ink">Scroll</p>
          <p className="mt-2">
            Lenis at <code className="font-mono">lerp 0.09</code>, held in a ref so the editor can stop it. The hero
            clip, the stacked cards, the drifting tiles and the closing frame are scrubbed by it, never timed.
          </p>
        </div>
        <div className="rounded-panel bg-surface p-5 text-[14px] leading-relaxed text-muted shadow-hairline">
          <p className="text-[15px] text-ink">Reduced motion</p>
          <p className="mt-2">
            Frames sit open, footage is still, reveals become plain fades and the typed question appears whole. In
            the editor, everything rests on its end state.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [
  FileSearch, Filter, Gauge, ShieldCheck, RefreshCw, Loader, CircleCheck, FileText, UserPlus, Search, CalendarCheck,
  Receipt, Timer, Car, Landmark, Link2, Files, Download, Plus, Mic, ArrowUp, Play, ChevronDown, X, Check,
]

export function Iconography() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="min-w-0 rounded-panel bg-surface p-6 shadow-hairline">
        <GroupLabel>Icons — Lucide, thin strokes, in currentColor</GroupLabel>
        <div className="flex flex-wrap gap-2">
          <span className="grid size-11 place-items-center rounded-tile bg-ink-strong text-surface">
            <LogoMark className="size-5" />
          </span>
          {ICONS.map((Icon, i) => (
            <span key={i} className="grid size-11 place-items-center rounded-tile bg-paper text-ink-soft shadow-hairline">
              <Icon className="size-[18px]" strokeWidth={1.5} />
            </span>
          ))}
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-muted">
          Stroke 1.3–1.8 to sit with the serif, 12–20px, muted beside text and ink where they carry the meaning. Done
          ticks fill with the check green. The mark is the only drawn glyph.
        </p>
      </div>
      <div className="min-w-0 rounded-panel bg-surface p-6 shadow-hairline">
        <GroupLabel>Imagery — people in their cars, warm light, a scrim for type</GroupLabel>
        <div className="grid grid-cols-3 gap-3">
          <PhotoTile src={photo(97079, 400)} alt="A hand holding out a set of car keys" className="aspect-[4/5] w-full" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-tile bg-ink shadow-float">
            <img src={media.policies.poster} alt="" className="absolute inset-0 size-full scale-125 object-cover blur-[10px] saturate-110" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-tile bg-ink shadow-float">
            <img src={media.hero.poster} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-scrim" />
            <p className="absolute inset-x-2 bottom-2 font-display text-[15px] leading-tight text-surface">Type on footage</p>
          </div>
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-muted">
          Pexels photography and film: sharp photo tiles with the tile radius and a float shadow; footage blurred to a
          painterly wash behind task panels; full-bleed footage under a warm scrim wherever white type sits on it.
          Credited in the footer.
        </p>
      </div>
    </div>
  )
}
