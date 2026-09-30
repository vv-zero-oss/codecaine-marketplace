import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Eye, Layers, Menu, Plus, Rotate3d, Ruler, Sparkles, Wand2, X } from "lucide-react"
import { useRef } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel } from "@/components/brand/specimen"
import { Wordmark } from "@/components/ui/wordmark"
import { pexels } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what it does: “See sixteen colours on you, side by side.”", dont: "Sell a feeling: “Revolutionise your style!”" },
  { do: "Name the number: “91% keep the size we suggest.”", dont: "Reach for a superlative: “Perfect fit, every time.”" },
  { do: "Warm, plain and a little wry — a friend in the fitting room.", dont: "Exclamation marks, emoji, fashion jargon." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Logo on light</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-lg border border-line bg-linen">
          <div className="rounded-sm p-6 outline-1 outline-clay/50 outline-dashed">
            <Wordmark className="text-3xl text-ink" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Logo on dark</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-lg bg-espresso">
          <div className="rounded-sm p-6 outline-1 outline-cream/25 outline-dashed">
            <Wordmark className="text-3xl text-cream" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-lg border border-line bg-paper p-5">
          <dt className="font-medium">Clear space</dt>
          <dd className="mt-1 text-ink-2">The height of the “d” on every side (the dashed box).</dd>
        </div>
        <div className="rounded-lg border border-line bg-paper p-5">
          <dt className="font-medium">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-2">
            <Wordmark className="text-[12px]" />
            <span>12px word. Below that, the mark alone.</span>
          </dd>
        </div>
        <div className="rounded-lg border border-line bg-paper p-5">
          <dt className="font-medium">Mark only</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-2">
            <span className="flex size-8 items-center justify-center rounded-sm bg-espresso font-script text-xl text-clay">d</span>
            <span>Favicon and avatar: the script “d” in clay on espresso.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-paper text-sm">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-sage" />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-3">
                <X className="mt-0.5 size-4 shrink-0 text-clay" />
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
    label: "Surface — light",
    swatches: [
      { name: "Linen", token: "--linen", className: "bg-linen", role: "Hero ground, drafting paper" },
      { name: "Linen 2", token: "--linen-2", className: "bg-linen-2", role: "Hover on light" },
      { name: "Paper", token: "--paper", className: "bg-paper", role: "Cards, outline buttons, canvas" },
    ],
  },
  {
    label: "Surface — dark",
    swatches: [
      { name: "Espresso", token: "--espresso", className: "bg-espresso", role: "Page ground, nav pill" },
      { name: "Espresso 2", token: "--espresso-2", className: "bg-espresso-2", role: "Cards and panels" },
      { name: "Espresso 3", token: "--espresso-3", className: "bg-espresso-3", role: "Inputs, chips, wells" },
      { name: "Espresso 4", token: "--espresso-4", className: "bg-espresso-4", role: "Selected segment, hover" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "Ink", token: "--ink", className: "bg-ink", role: "Primary on light" },
      { name: "Ink 2", token: "--ink-2", className: "bg-ink-2", role: "Secondary on light" },
      { name: "Ink 3", token: "--ink-3", className: "bg-ink-3", role: "Tertiary on light" },
      { name: "Cream", token: "--cream", className: "bg-cream", role: "Primary on dark" },
      { name: "Cream 2", token: "--cream-2", className: "bg-cream-2", role: "Secondary on dark" },
      { name: "Cream 3", token: "--cream-3", className: "bg-cream-3", role: "Tertiary on dark" },
    ],
  },
  {
    label: "Border",
    swatches: [
      { name: "Line", token: "--line", className: "bg-line", role: "Hairlines on light" },
      { name: "Line dark", token: "--line-dark", className: "bg-line-dark", role: "Hairlines on dark" },
      { name: "Grid", token: "--grid", className: "bg-grid", role: "The drafting grid" },
    ],
  },
  {
    label: "Accent",
    swatches: [
      { name: "Clay", token: "--clay", className: "bg-clay", role: "Primary action, selection box" },
      { name: "Clay hover", token: "--clay-hover", className: "bg-clay-hover", role: "Primary, hover" },
      { name: "Clay deep", token: "--clay-deep", className: "bg-clay-deep", role: "The footer band" },
      { name: "Clay soft", token: "--clay-soft", className: "bg-clay-soft", role: "Tints" },
    ],
  },
  {
    label: "Supporting — cursors and status",
    swatches: [
      { name: "Sage", token: "--sage", className: "bg-sage", role: "Success, a collaborator" },
      { name: "Mustard", token: "--mustard", className: "bg-mustard", role: "A collaborator" },
      { name: "Plum", token: "--plum", className: "bg-plum", role: "A collaborator" },
      { name: "Sky", token: "--sky", className: "bg-sky", role: "A collaborator" },
    ],
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-paper">
      <div ref={ref} className={cn("h-20 border-b border-line", className)} />
      <figcaption className="space-y-0.5 p-4 text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-ink-2">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-ink-3">{token}</p>
        <p className="font-mono text-[11px] break-all text-ink-3">{value ? toHex(value) : "—"}</p>
      </figcaption>
    </figure>
  )
}

export function ColourTokens() {
  return (
    <div className="space-y-10">
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
      <div>
        <GroupLabel>Text on surface — WCAG contrast</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ContrastPair label="Ink on linen" className="bg-linen text-ink" />
          <ContrastPair label="Ink 2 on linen" className="bg-linen text-ink-2" />
          <ContrastPair label="Paper on clay" className="bg-clay text-paper" />
          <ContrastPair label="Cream on espresso" className="bg-espresso text-cream" />
          <ContrastPair label="Cream 2 on espresso" className="bg-espresso text-cream-2" />
          <ContrastPair label="Paper on clay deep" className="bg-clay-deep text-paper" />
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
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-lg border border-line p-5", className)}>
      <div>
        <p className="font-display text-2xl font-semibold tracking-tight">Aa</p>
        <p className="mt-1 text-sm">{label}</p>
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
  { name: "Display", className: "font-display text-8xl font-semibold tracking-[-0.045em] leading-[0.86]", use: "The hero line (fluid, up to 19rem)", sample: "Wear it first" },
  { name: "Script", className: "font-script text-7xl leading-none", use: "One word per headline, never a sentence", sample: "Wear" },
  { name: "Heading 1", className: "font-display text-6xl font-medium tracking-[-0.04em] leading-none", use: "Section titles", sample: "Your fitting room" },
  { name: "Heading 2", className: "font-display text-5xl font-medium tracking-[-0.035em] leading-[1.04]", use: "Section titles, smaller sections", sample: "Real people, real closets" },
  { name: "Quote", className: "font-display text-xl font-medium tracking-[-0.02em]", use: "Story quotes", sample: "It showed me in a green I'd have walked past." },
  { name: "Lede", className: "text-[15px] leading-relaxed", use: "Under headings", sample: "Try any outfit on your own photo." },
  { name: "Body", className: "text-[14px] leading-relaxed", use: "Paragraphs, answers", sample: "Ten try-ons a month are free." },
  { name: "UI", className: "text-[13px] font-medium", use: "Buttons, nav, prompts", sample: "Try it on" },
  { name: "Small", className: "text-[12px]", use: "Card copy, panel text", sample: "Shoes, bags and the rest" },
  { name: "Micro", className: "text-[11px] font-medium", use: "Panel titles, chips", sample: "Layers" },
]

export function TypeSample({ name, className, use, sample }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-line py-6 last:border-b-0 md:grid-cols-[12rem_1fr] md:gap-8">
      <div className="text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-ink-2">{use}</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-3 tabular-nums">
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </p>
      </div>
      <p ref={ref} className={cn("min-w-0 break-words text-ink max-sm:text-[min(100%,2.5rem)]", className)}>
        {sample}
      </p>
    </div>
  )
}

const FAMILIES = [
  { label: "Display — Inter Tight", className: "font-display font-semibold tracking-[-0.03em]", sample: "Inter Tight", weights: "500 · 600" },
  { label: "Script — Kaushan Script", className: "font-script", sample: "Kaushan Script", weights: "400" },
  { label: "Sans — Inter", className: "font-sans font-medium", sample: "Inter", weights: "400 · 500 · 600, cv01 ss03" },
  { label: "Mono — JetBrains Mono", className: "font-mono font-medium", sample: "JetBrains", weights: "400 · 500" },
]

export function FamilyCard({ label, className, sample, weights }: (typeof FAMILIES)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <div ref={ref} className={cn("rounded-lg border border-line bg-paper p-6", className)}>
      <GroupLabel>{label}</GroupLabel>
      <p className="text-4xl">{sample}</p>
      <p className="mt-4 text-sm text-ink-2">
        Aa Bb Cc 0123456789 — {weights}
      </p>
      <p className="mt-3 font-mono text-[11px] text-ink-3">{values["font-family"]}</p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2">
        {FAMILIES.map((family) => (
          <FamilyCard key={family.label} {...family} />
        ))}
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        <div className="overflow-hidden rounded-lg border border-line bg-paper px-5 sm:px-6">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-paper p-6">
          <GroupLabel>Numerals — tabular (sizes, prices)</GroupLabel>
          <p className="font-display text-4xl font-semibold tracking-tight tabular-nums">
            94% · $6
            <br />
            S M L XL
          </p>
        </div>
        <div className="rounded-lg border border-line bg-paper p-6">
          <GroupLabel>Numerals — proportional (copy)</GroupLabel>
          <p className="font-display text-4xl font-semibold tracking-tight">
            94% · $6
            <br />
            1,120 looks
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = ["1", "2", "3", "4", "6", "8", "10", "14", "20", "24", "32"].map((step) => ({ step, className: `w-${step}` }))
// Written out so Tailwind sees them: w-1 w-2 w-3 w-4 w-6 w-8 w-10 w-14 w-20 w-24 w-32

export function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[3rem_4rem_1fr] items-center gap-4 py-2 text-sm">
      <span className="font-mono text-xs text-ink-3">{step}</span>
      <span className="font-mono text-xs text-ink-2 tabular-nums">{values.width}</span>
      <div ref={ref} className={cn("h-3 rounded-xs bg-clay", className)} />
    </li>
  )
}

const RADII = [
  { name: "xs", className: "rounded-xs", use: "Chips, swatches, tiles" },
  { name: "sm", className: "rounded-sm", use: "Buttons, inputs, photos" },
  { name: "md", className: "rounded-md", use: "Nav pill, panels, cards" },
  { name: "lg", className: "rounded-lg", use: "The tried-on frame" },
  { name: "full", className: "rounded-full", use: "Carousel arrows" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="text-sm">
      <div ref={ref} className={cn("h-20 border border-line bg-paper", className)} />
      <figcaption className="mt-2">
        <span className="font-medium">{name}</span> <span className="font-mono text-[11px] text-ink-3">{values["border-top-left-radius"]}</span>
        <span className="block text-ink-2">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "Pill", token: "--shadow-pill", className: "shadow-pill bg-espresso", use: "The nav pill, the story pill" },
  { name: "Float", token: "--shadow-float", className: "shadow-float bg-espresso-2", use: "Panels, prompts, the screen" },
  { name: "Lift", token: "--shadow-lift", className: "shadow-lift bg-paper", use: "Anything raised on linen" },
]

export function ShadowSample({ name, token, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="text-sm">
      <div ref={ref} className={cn("h-24 rounded-md", className)} />
      <figcaption className="mt-3">
        <span className="font-medium">{name}</span> <span className="font-mono text-[11px] text-ink-3">{token}</span>
        <span className="block text-ink-2">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-3">{values["box-shadow"]}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-line bg-paper", use: "Dividers and cards on light" },
  { name: "Hairline dark", className: "border border-line-dark bg-espresso-2", use: "Panels and FAQ rows on dark" },
  { name: "Outline button", className: "border border-ink bg-paper", use: "The secondary button" },
  { name: "Selection", className: "border border-clay bg-paper", use: "The try-on box, with 7px handles" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-bottom-width", "border-bottom-color", "border-bottom-style"])
  return (
    <figure className="text-sm">
      <div ref={ref} className={cn("h-16 rounded-sm", className)} />
      <figcaption className="mt-2">
        <span className="font-medium">{name}</span>
        <span className="block text-ink-2">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-3">
          {values["border-bottom-width"]} {values["border-bottom-style"]} {toHex(values["border-bottom-color"] ?? "")}
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
          <GroupLabel>Spacing — 4px steps</GroupLabel>
          <ul className="rounded-lg border border-line bg-paper px-5 py-3">
            {SPACING.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-2">
            Sections breathe at 24–32 (96–128px), panels pad at 2–3, and cards sit 3–4 apart.
          </p>
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
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid gap-6 rounded-lg bg-linen-2 p-6 sm:grid-cols-3 sm:p-8">
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

const MOTION = [
  { name: "Selection box opens", token: "--dur-reveal · --ease-out", duration: "--dur-reveal", easing: "--ease-out", frames: [{ transform: "scale(0.1)" }, { transform: "scale(1)" }] },
  { name: "Selection box closes", token: "--dur-dismiss · --ease-out", duration: "--dur-dismiss", easing: "--ease-out", frames: [{ transform: "scale(1)" }, { transform: "scale(0.1)" }] },
  { name: "Carousel step", token: "--dur-slide · --ease-in-out", duration: "--dur-slide", easing: "--ease-in-out", frames: [{ transform: "translateX(-40%)" }, { transform: "translateX(40%)" }] },
  { name: "Letter in", token: "--dur-letter · --ease-out", duration: "--dur-letter", easing: "--ease-out", frames: [{ opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0)" }] },
] as const

/** Plays one of the page's motions on a sample, through the Web Animations API
 *  — so the editor's Motion switch stops and reduces it like the page's own. */
export function MotionSample({ name, token, duration, easing, frames }: (typeof MOTION)[number]) {
  const target = useRef<HTMLDivElement>(null)
  const [ref, values] = useComputed<HTMLDivElement>([duration, easing])
  const play = () => {
    const element = target.current
    if (!element) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.getAnimations().forEach((animation) => animation.cancel())
    element.animate(frames as unknown as Keyframe[], {
      duration: reduced ? 1 : parseFloat(values[duration] ?? "300"),
      easing: values[easing] || "ease-out",
    })
  }
  return (
    <div ref={ref} className="flex flex-col rounded-lg border border-line bg-paper p-5">
      <div className="flex h-24 items-center justify-center overflow-hidden rounded-md bg-linen grid-paper">
        <div ref={target} className="h-12 w-16 border border-clay bg-clay-soft" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 text-sm">
        <div>
          <p className="font-medium">{name}</p>
          <p className="mt-1 font-mono text-[11px] text-ink-3">{token}</p>
          <p className="font-mono text-[11px] text-ink-3">
            {values[duration]} · {values[easing]}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-9 shrink-0 items-center rounded-sm border border-ink px-3 text-[13px] font-medium transition-[background-color,transform] duration-150 hover:bg-linen-2 active:scale-[0.97]"
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <ul className="grid gap-3 text-sm text-ink-2 sm:grid-cols-2">
        <li className="rounded-lg border border-line bg-paper p-5">
          <span className="font-medium text-ink">Measured, not guessed.</span> The durations and curves were counted off
          the reference recording frame by frame, and live as tokens in <code className="font-mono text-xs">index.css</code>;
          the WebGL stage and Framer Motion read them from there.
        </li>
        <li className="rounded-lg border border-line bg-paper p-5">
          <span className="font-medium text-ink">Scroll is Lenis</span> (lerp 0.09), held in a ref. Scroll-linked pieces —
          the room pull-back, the pinned toolkit, parallax — are scrubbed, never timed. Reduced motion turns them all off.
        </li>
      </ul>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Eye, Layers, Menu, Plus, Rotate3d, Ruler, Sparkles, Wand2]

export function Iconography() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-line bg-paper p-6">
        <GroupLabel>Lucide — 16px in UI, 1.5–2 stroke</GroupLabel>
        <div className="flex flex-wrap gap-2">
          {ICONS.map((Icon, index) => (
            <span key={index} className="flex size-10 items-center justify-center rounded-sm bg-espresso text-cream">
              <Icon className="size-4" />
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-2">
          Icons label controls; they never decorate headings. Sparkles appears once, on the action that generates.
        </p>
      </div>
      <div className="rounded-lg border border-line bg-paper p-6">
        <GroupLabel>Photography — Pexels, studio and daylight</GroupLabel>
        <div className="grid grid-cols-3 gap-2">
          {[20851458, 9775538, 5920763].map((id) => (
            <img key={id} src={pexels(id, 240, 300)} alt="" className="aspect-[4/5] w-full rounded-sm object-cover" />
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-2">
          Full-length people on plain walls for try-ons; warm daylight for rooms and stories. On linen, a photo is drawn
          as a pencil sketch until it is tried on. Credited to Pexels in the footer.
        </p>
      </div>
    </div>
  )
}
