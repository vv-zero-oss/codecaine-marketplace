import { Bus, ChevronDown, Coffee, Landmark, Search, Wallet } from "lucide-react"
import { useRef } from "react"

import { GroupLabel } from "@/components/brand/specimen"
import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { ArrowIcon, CheckIcon, Icon } from "@/components/ui/icon"
import { Coin, Pizza, Popcorn } from "@/components/illustrations/objects"
import { Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what happened: “Coffee, $5, 11:30 AM.”", dont: "Scold: “You overspent again!”" },
  { do: "Name the number: “$1,360 due in 3 days.”", dont: "Reach for a superlative: “Smart insights!”" },
  { do: "Warm, plain, a little dry.", dont: "Exclamation marks, emoji, jargon." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Logo on light</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-2xl border border-ink-200 bg-white">
          {/* Clear space: the height of the mark on every side, drawn. */}
          <div className="rounded-lg p-6 outline-1 outline-dashed outline-brand-500/40">
            <Wordmark className="text-xl" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Logo on dark</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-2xl bg-night-800">
          <div className="rounded-lg p-6 outline-1 outline-dashed outline-white/25">
            <Wordmark className="text-xl text-white" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-2xl border border-ink-200 bg-white p-5">
          <dt className="font-medium">Clear space</dt>
          <dd className="mt-1 text-ink-600">One mark-height on every side (the dashed box).</dd>
        </div>
        <div className="rounded-2xl border border-ink-200 bg-white p-5">
          <dt className="font-medium">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-600">
            <Wordmark className="text-xs [&>span]:size-4" />
            <span>16px mark, 12px word.</span>
          </dd>
        </div>
        <div className="rounded-2xl border border-ink-200 bg-white p-5">
          <dt className="font-medium">Mark only</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-600">
            <span className="size-6 rounded-md bg-gradient-to-br from-brand-500 to-leaf-500" />
            <span>Favicons and avatars, never recoloured.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-ink-200 overflow-hidden rounded-2xl border border-ink-200 bg-white text-sm">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5">
                <span className="mt-0.5 text-leaf-500">
                  <CheckIcon />
                </span>
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-400">
                <span className="mt-0.5 text-coral-500">
                  <Icon>
                    <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.5" strokeLinecap="round" />
                  </Icon>
                </span>
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
      { name: "White", token: "--color-white", className: "bg-white", role: "Page, cards" },
      { name: "Ink 50", token: "--color-ink-50", className: "bg-ink-50", role: "Sunken areas, chips" },
      { name: "Ink 100", token: "--color-ink-100", className: "bg-ink-100", role: "Hero and header" },
      { name: "Night 800", token: "--color-night-800", className: "bg-night-800", role: "Dark section" },
      { name: "Night 950", token: "--color-night-950", className: "bg-night-950", role: "Dark phone screen" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "Ink 900", token: "--color-ink-900", className: "bg-ink-900", role: "Headlines, primary" },
      { name: "Ink 600", token: "--color-ink-600", className: "bg-ink-600", role: "Body, secondary" },
      { name: "Ink 400", token: "--color-ink-400", className: "bg-ink-400", role: "Meta, labels" },
    ],
  },
  {
    label: "Border",
    swatches: [{ name: "Ink 200", token: "--color-ink-200", className: "bg-ink-200", role: "Hairlines, dividers" }],
  },
  {
    label: "Accent",
    swatches: [
      { name: "Brand 50", token: "--color-brand-50", className: "bg-brand-50", role: "Icon wells" },
      { name: "Brand 500", token: "--color-brand-500", className: "bg-brand-500", role: "Primary action" },
      { name: "Brand 600", token: "--color-brand-600", className: "bg-brand-600", role: "Primary, hover" },
      { name: "Brand 700", token: "--color-brand-700", className: "bg-brand-700", role: "Primary, pressed" },
      { name: "Leaf 500", token: "--color-leaf-500", className: "bg-leaf-500", role: "Money in, linked" },
    ],
  },
  {
    label: "Status",
    swatches: [
      { name: "Leaf 400", token: "--color-leaf-400", className: "bg-leaf-400", role: "Inflow on dark" },
      { name: "Coral 500", token: "--color-coral-500", className: "bg-coral-500", role: "Money out, due soon" },
      { name: "Coral 100", token: "--color-coral-100", className: "bg-coral-100", role: "Due-soon wash" },
    ],
  },
  {
    label: "Illustration",
    swatches: [
      { name: "Paper", token: "--color-paper", className: "bg-paper", role: "Object fills" },
      { name: "Stream red", token: "--color-stream-red", className: "bg-stream-red", role: "Play tile, stripes" },
      { name: "Cheese", token: "--color-cheese", className: "bg-cheese", role: "Pizza, mango" },
    ],
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
      <div ref={ref} className={cn("h-20 border-b border-ink-200", className)} />
      <figcaption className="space-y-0.5 p-4 text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-ink-600">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-ink-400">{token}</p>
        <p className="font-mono text-[11px] break-all text-ink-400">
          {value || "—"} · {value ? toHex(value) : "—"}
        </p>
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
          <ContrastPair label="Ink 900 on white" className="bg-white text-ink-900" />
          <ContrastPair label="Ink 600 on white" className="bg-white text-ink-600" />
          <ContrastPair label="Ink 400 on white" className="bg-white text-ink-400" />
          <ContrastPair label="Brand 600 on white" className="bg-white text-brand-600" />
          <ContrastPair label="White on brand 600" className="bg-brand-600 text-white" />
          <ContrastPair label="White on ink 900" className="bg-ink-900 text-white" />
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
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-2xl border border-ink-200 p-5", className)}>
      <div>
        <p className="text-2xl font-semibold tracking-tight">Aa</p>
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
  { name: "Display", className: "text-[5.5rem] leading-[0.95] font-extrabold tracking-[-0.04em]", use: "Hero headline (lg and up)" },
  { name: "Display, small", className: "text-[2.75rem] leading-[0.95] font-extrabold tracking-[-0.04em]", use: "Hero headline on phones" },
  { name: "Heading 1", className: "text-[3.5rem] leading-[1.02] font-extrabold tracking-[-0.03em]", use: "Section titles" },
  { name: "Heading 2", className: "text-[2rem] leading-[1.02] font-extrabold tracking-[-0.03em]", use: "Section titles on phones" },
  { name: "Heading 3", className: "text-lg font-bold tracking-tight", use: "Card titles, bank names" },
  { name: "Body large", className: "text-lg", use: "Hero lede" },
  { name: "Body", className: "text-base", use: "Default copy" },
  { name: "Small", className: "text-sm", use: "Card copy, nav, buttons" },
  { name: "Overline", className: "text-[11px] font-semibold tracking-wider uppercase", use: "Card labels, filters" },
]

export function TypeSample({ name, className, use }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-ink-200 py-6 last:border-b-0 md:grid-cols-[12rem_1fr] md:gap-8">
      <div className="text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-ink-600">{use}</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-400 tabular-nums">
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </p>
      </div>
      <p ref={ref} className={cn("min-w-0 break-words text-ink-900", className)}>
        Spend with your eyes open
      </p>
    </div>
  )
}

export function Typography() {
  const [sans, sansValues] = useComputed<HTMLDivElement>(["font-family"])
  const [mono, monoValues] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div ref={sans} className="rounded-2xl border border-ink-200 bg-white p-6">
          <GroupLabel>Sans — interface and copy</GroupLabel>
          <p className="text-5xl font-semibold tracking-tight">Figtree</p>
          <p className="mt-4 text-sm text-ink-600">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            <span className="tabular-nums">0123456789</span> — 400 · 500 · 600 · 700 · 800
          </p>
          <p className="mt-4 font-mono text-[11px] text-ink-400">{sansValues["font-family"]}</p>
        </div>
        <div ref={mono} className="rounded-2xl border border-ink-200 bg-white p-6 font-mono">
          <GroupLabel>Mono — code and tokens</GroupLabel>
          <p className="text-4xl font-medium tracking-tight">JetBrains Mono</p>
          <p className="mt-4 text-sm text-ink-600">
            npm run dev → :3350
            <br />
            --color-ink-600
          </p>
          <p className="mt-4 text-[11px] text-ink-400">{monoValues["font-family"]}</p>
        </div>
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        <div className="rounded-2xl border border-ink-200 bg-white px-5 sm:px-6">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 bg-white p-6">
          <GroupLabel>Numerals — tabular</GroupLabel>
          <p className="text-4xl font-semibold tracking-tight tabular-nums">
            $1,360.50
            <br />
            $8,400
          </p>
        </div>
        <div className="rounded-2xl border border-ink-200 bg-white p-6">
          <GroupLabel>Numerals — proportional</GroupLabel>
          <p className="text-4xl font-semibold tracking-tight">
            $1,360.50
            <br />
            $8,400
          </p>
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
  { step: "3", className: "w-3" },
  { step: "4", className: "w-4" },
  { step: "5", className: "w-5" },
  { step: "6", className: "w-6" },
  { step: "8", className: "w-8" },
  { step: "10", className: "w-10" },
  { step: "14", className: "w-14" },
  { step: "16", className: "w-16" },
  { step: "20", className: "w-20" },
  { step: "24", className: "w-24" },
]

export function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[3rem_4rem_1fr] items-center gap-4 py-2 text-sm">
      <span className="font-mono text-xs text-ink-400">{step}</span>
      <span className="font-mono text-xs text-ink-600 tabular-nums">{values.width}</span>
      <div ref={ref} className={cn("h-3 rounded-sm bg-brand-500/80", className)} />
    </li>
  )
}

const RADII = [
  { name: "md", className: "rounded-md", use: "The mark" },
  { name: "lg", className: "rounded-lg", use: "Small controls" },
  { name: "xl", className: "rounded-xl", use: "Icon wells, inputs" },
  { name: "2xl", className: "rounded-2xl", use: "Cards, panels" },
  { name: "full", className: "rounded-full", use: "Buttons, badges" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="text-sm">
      <div ref={ref} className={cn("h-20 border border-ink-200 bg-white", className)} />
      <figcaption className="mt-2">
        <span className="font-medium">{name}</span>{" "}
        <span className="font-mono text-[11px] text-ink-400">{values["border-top-left-radius"]}</span>
        <span className="block text-ink-600">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "Card", className: "shadow-card", use: "Rows, tiles, resting cards" },
  { name: "Lift", className: "shadow-lift", use: "Floating cards, search bar" },
  { name: "Device", className: "shadow-device", use: "Phones and the dashboard" },
]

export function ShadowSample({ name, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="text-sm">
      <div ref={ref} className={cn("h-24 rounded-2xl border border-ink-200 bg-white", className)} />
      <figcaption className="mt-3">
        <span className="font-medium">{name}</span>
        <span className="block text-ink-600">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-400">{values["box-shadow"]}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-ink-200", use: "Cards, dividers, inputs" },
  { name: "Header", className: "border-b border-ink-200/70", use: "The sticky header, over blur" },
  { name: "Featured", className: "border-2 border-brand-600", use: "The one card to look at" },
  { name: "Clear space", className: "border border-dashed border-brand-500/40", use: "Guides only, never shipped" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-bottom-width", "border-bottom-color", "border-bottom-style"])
  return (
    <figure className="text-sm">
      <div ref={ref} className={cn("h-16 rounded-xl bg-white", className)} />
      <figcaption className="mt-2">
        <span className="font-medium">{name}</span>
        <span className="block text-ink-600">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-400">
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
          <GroupLabel>Spacing — 4px steps</GroupLabel>
          <ul className="rounded-2xl border border-ink-200 bg-white px-5 py-3">
            {SPACING.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-600">
            Sections breathe at 20–24 (80–96px), cards pad at 8 (32px), and gaps sit at 3–6.
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
        <div className="grid gap-6 rounded-2xl bg-ink-50 p-6 sm:grid-cols-3 sm:p-8">
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
  {
    name: "Reveal",
    where: "Sections entering view",
    duration: 700,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    keyframes: [{ transform: "translateY(24px)", opacity: "0" }, { transform: "translateY(0)", opacity: "1" }],
  },
  {
    name: "Press",
    where: "Buttons, tiles",
    duration: 150,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Switch",
    where: "Bank link toggle, chips",
    duration: 300,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    keyframes: [{ backgroundColor: "--color-ink-200" }, { backgroundColor: "--color-leaf-500" }],
  },
] as const

/** Plays one of the page's motions on a sample, through the Web Animations API
 *  — so the editor's Motion switch stops and reduces it like the page's own. */
export function MotionSample({ name, where, duration, easing, keyframes }: (typeof MOTION)[number]) {
  const target = useRef<HTMLDivElement>(null)
  const play = () => {
    const element = target.current
    if (!element) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.getAnimations().forEach((animation) => animation.cancel())
    // Colour keyframes name a token; resolve it to the value it holds now.
    const root = getComputedStyle(document.documentElement)
    const frames = keyframes.map((frame) =>
      Object.fromEntries(
        Object.entries(frame).map(([property, value]) => [
          property,
          value.startsWith("--") ? root.getPropertyValue(value).trim() : value,
        ]),
      ),
    )
    element.animate(frames, {
      duration: reduced ? 1 : duration,
      easing,
      fill: "none",
    })
  }
  return (
    <div className="flex flex-col rounded-2xl border border-ink-200 bg-white p-5">
      <div className="flex h-24 items-center overflow-hidden rounded-xl bg-ink-50 px-4">
        <div ref={target} className="h-12 w-full origin-top rounded-lg bg-ink-900" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 text-sm">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-ink-600">{where}</p>
          <p className="mt-1 font-mono text-[11px] text-ink-400">
            {duration}ms · {easing}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-9 shrink-0 items-center rounded-full border border-ink-200 px-4 text-sm font-medium transition-colors hover:bg-ink-50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none active:scale-[0.97]"
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
      <div className="grid gap-4 md:grid-cols-3">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <ul className="grid gap-3 text-sm text-ink-600 sm:grid-cols-2">
        <li className="rounded-2xl border border-ink-200 bg-white p-5">
          <span className="font-medium text-ink-900">Scroll</span> is Lenis, held in a ref so the
          editor can pause it (<code className="font-mono text-xs">components/motion.ts</code>).
        </li>
        <li className="rounded-2xl border border-ink-200 bg-white p-5">
          <span className="font-medium text-ink-900">Entrances and pointer motion</span> are Framer Motion; <span className="font-medium text-ink-900">reduced motion</span> is read from the media
          query when motion starts, so the editor’s Reduced mode applies here too.
        </li>
      </ul>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

export function Iconography() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-ink-200 bg-white p-6">
        <GroupLabel>Lucide line icons — 24px grid, 2 stroke, round caps</GroupLabel>
        <div className="flex flex-wrap gap-3">
          {[Landmark, Wallet, Coffee, Bus, Search].map((Glyph, i) => (
            <span key={i} className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Glyph className="size-5" strokeWidth={2} />
            </span>
          ))}
          <span className="flex size-10 items-center justify-center rounded-xl bg-ink-50 text-ink-900">
            <ArrowIcon />
          </span>
          <span className="flex size-10 items-center justify-center rounded-xl bg-ink-50 text-brand-600">
            <CheckIcon />
          </span>
          <span className="flex size-10 items-center justify-center rounded-xl bg-ink-50 text-ink-400">
            <ChevronDown className="size-4" />
          </span>
        </div>
        <p className="mt-4 text-sm text-ink-600">
          Lucide, in{" "}
          <code className="font-mono text-xs">currentColor</code>. Anything Lucide lacks comes from the Iconify sets.
        </p>
      </div>
      <div className="rounded-2xl border border-ink-200 bg-white p-6">
        <GroupLabel>Imagery</GroupLabel>
        <div className="flex h-32 items-center justify-center gap-4 overflow-hidden rounded-xl bg-ink-100">
          <Pizza className="h-24 w-auto" />
          <Popcorn className="h-24 w-auto" />
          <Coin className="h-20 w-auto" />
        </div>
        <p className="mt-4 text-sm text-ink-600">
          Spending is drawn as small objects: flat fills, one ink outline at 2.5px, a soft drop
          shadow. Product screens are built from live components, never screenshots.
        </p>
      </div>
    </div>
  )
}
