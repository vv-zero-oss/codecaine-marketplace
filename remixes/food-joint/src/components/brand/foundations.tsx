import { ArrowUp, Check, Clock, Flame, Hand, MapPin, Menu, Minus, Phone, Plus, X, XIcon } from "lucide-react"
import { useRef } from "react"

import { GroupLabel } from "@/components/brand/specimen"
import { cleanShadow, contrast, toHex, toMs, useComputed, useRootVars } from "@/components/brand/read-style"
import { ClipShape } from "@/components/blocks/clip-shape"
import { Photo } from "@/components/blocks/photo"
import { Wordmark } from "@/components/blocks/wordmark"
import { Star } from "@/components/sections/ticker"
import { menu, room, ticker } from "@/content"
import { DURATION, SPRING_FOLLOW, SPRING_POP, STAGGER } from "@/lib/motion"
import type { ShapeName } from "@/lib/shapes"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what's in it: “Thigh, slaw, pickles, oak mayo.”", dont: "Describe a feeling: “An unforgettable flavour journey.”" },
  { do: "Short and loud: “Eat loud.” “Book it.” “You're in.”", dont: "Long, polite and careful: “We would be delighted to welcome you.”" },
  { do: "Own the trade-offs: “Give it twelve minutes.”", dont: "Hide them: “Freshly prepared for your convenience.”" },
  { do: "Talk like the counter: “Trust us.” “Bring an appetite.”", dont: "Talk like a brochure, or pile on emoji and exclamation marks." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Wordmark on lime</GroupLabel>
        <div className="flex h-48 items-center justify-center rounded-card border-2 border-forest bg-lime text-forest">
          {/* Clear space: the height of the dot's lift on every side, drawn. */}
          <div className="rounded-field p-6 outline-2 outline-dashed outline-forest/35">
            <Wordmark className="text-[40px]" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Wordmark on forest</GroupLabel>
        <div className="flex h-48 items-center justify-center rounded-card border-2 border-forest bg-forest text-cream">
          <div className="rounded-field p-6 outline-2 outline-dashed outline-cream/30">
            <Wordmark className="text-[40px]" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-card border-2 border-forest bg-cream p-5">
          <dt className="font-condensed text-label uppercase">Clear space</dt>
          <dd className="mt-2 text-ui text-ink-soft">The height of a capital on every side — the dashed box. Nothing sits inside it.</dd>
        </div>
        <div className="rounded-card border-2 border-forest bg-cream p-5">
          <dt className="font-condensed text-label uppercase">Minimum size</dt>
          <dd className="mt-2 flex flex-wrap items-center gap-3 text-ui text-ink-soft">
            <Wordmark className="min-h-0 text-[16px] [&>span]:mb-2 [&>span]:size-1.5" />
            <span>16px, where the dot still reads as a dot.</span>
          </dd>
        </div>
        <div className="rounded-card border-2 border-forest bg-cream p-5">
          <dt className="font-condensed text-label uppercase">Big version</dt>
          <dd className="mt-2 text-ui text-ink-soft">
            The footer sets the name the full width, with fried chicken showing through the letters — see the foot of
            this page.
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y-2 divide-forest overflow-hidden rounded-card border-2 border-forest bg-cream">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-3 p-5 text-body sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-pill bg-forest text-lime">
                  <Check className="size-4" />
                </span>
                {line.do}
              </p>
              <p className="flex gap-3 text-ink-soft">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-pill bg-orange text-forest">
                  <X className="size-4" />
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
    label: "Surfaces — the five-colour palette",
    swatches: [
      { name: "Lime", token: "--lime · bg-lime", className: "bg-lime", role: "The page, the menu, booking" },
      { name: "Cream", token: "--cream · bg-cream", className: "bg-cream", role: "Statement, room, cards" },
      { name: "Lavender", token: "--lavender · bg-lavender", className: "bg-lavender", role: "Process, the spin badge" },
      { name: "Orange", token: "--orange · bg-orange", className: "bg-orange", role: "Calls to action, reviews, dots" },
      { name: "Forest", token: "--forest · bg-forest", className: "bg-forest", role: "Ink, the oak, the footer" },
      { name: "Forest deep", token: "--forest-deep · bg-forest-deep", className: "bg-forest-deep", role: "Shade over the films" },
    ],
  },
  {
    label: "Type",
    swatches: [
      { name: "Ink", token: "--ink · text-ink", className: "bg-ink", role: "Headlines and body on light" },
      { name: "Ink soft", token: "--ink-soft · text-ink-soft", className: "bg-ink-soft", role: "Secondary copy on light" },
      { name: "On forest", token: "--on-forest · text-on-forest", className: "bg-on-forest", role: "Body on forest" },
      { name: "On forest muted", token: "--on-forest-muted", className: "bg-on-forest-muted", role: "Notes and small print on forest" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { name: "Hairline", token: "--hairline · border-hairline", className: "bg-hairline", role: "Quiet rules on light" },
      { name: "Hairline forest", token: "--hairline-forest", className: "bg-hairline-forest", role: "Rules on forest (drawn on forest here)" },
    ],
  },
  {
    label: "shadcn semantic names — pointed at the same palette",
    swatches: [
      { name: "Background", token: "--color-background", className: "bg-background", role: "= lime" },
      { name: "Foreground", token: "--color-foreground", className: "bg-foreground", role: "= forest" },
      { name: "Primary", token: "--color-primary", className: "bg-primary", role: "= orange" },
      { name: "Primary foreground", token: "--color-primary-foreground", className: "bg-primary-foreground", role: "= forest" },
      { name: "Border / input", token: "--color-border · --color-input", className: "bg-border", role: "= hairline" },
      { name: "Ring", token: "--color-ring", className: "bg-ring", role: "= forest, the focus ring" },
    ],
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  // A translucent line is only visible over the surface it is drawn on.
  const under = className === "bg-hairline-forest" ? "bg-forest" : "bg-cream"
  return (
    <figure className="m-0 overflow-hidden rounded-card border-2 border-forest bg-cream">
      <div className={cn("h-20 border-b-2 border-forest", under)}>
        <div ref={ref} className={cn("size-full", className)} />
      </div>
      <figcaption className="space-y-0.5 p-4">
        <p className="font-condensed text-label uppercase">{name}</p>
        <p className="text-ui text-ink-soft">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-ink-soft">{token}</p>
        <p className="font-mono text-[11px] break-all text-ink-soft">
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
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-card border-2 border-forest p-5", className)}>
      <div>
        <p className="font-heavy text-[40px] leading-none">Aa</p>
        <p className="mt-2 text-ui">{label}</p>
      </div>
      <p className="text-right font-mono text-caption tabular-nums">
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
          <ContrastPair label="Forest on lime — the page" className="bg-lime text-forest" />
          <ContrastPair label="Forest on cream — cards" className="bg-cream text-forest" />
          <ContrastPair label="Ink soft on lime — body" className="bg-lime text-ink-soft" />
          <ContrastPair label="Ink soft on cream — notes" className="bg-cream text-ink-soft" />
          <ContrastPair label="Forest on orange — buttons, reviews" className="bg-orange text-forest" />
          <ContrastPair label="Forest on lavender — process" className="bg-lavender text-forest" />
          <ContrastPair label="Lime on forest — dark buttons" className="bg-forest text-lime" />
          <ContrastPair label="Cream on forest — the oak" className="bg-forest text-cream" />
          <ContrastPair label="On forest muted on forest" className="bg-forest text-on-forest-muted" />
        </div>
        <p className="mt-4 max-w-[60ch] text-ui text-ink-soft">
          Orange is a fill, never text on lime or cream — as type it does not reach AA. The heat flames are the one
          orange mark on light, and they sit beside words that say the same thing.
        </p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const FACES = [
  {
    name: "Heavy",
    utility: "font-heavy",
    className: "font-heavy text-[clamp(44px,6vw,88px)] leading-[0.86]",
    sample: "Eat loud",
    use: "Display words: section titles, dish names, prices. Black, a little wide, uppercase.",
  },
  {
    name: "Condensed",
    utility: "font-condensed",
    className: "font-condensed text-[clamp(36px,5vw,64px)] leading-none uppercase",
    sample: "Book a table",
    use: "Labels, buttons, nav, tabs. Extra-bold, narrowed to 62%.",
  },
  {
    name: "Body",
    utility: "font-sans",
    className: "font-sans text-[clamp(28px,3.4vw,44px)] leading-tight",
    sample: "Fried to order, twelve minutes.",
    use: "Everything read as sentences. Regular weight, normal width.",
  },
]

export function FaceSample({ name, utility, className, sample, use }: (typeof FACES)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-family", "font-weight", "font-stretch", "letter-spacing", "text-transform"])
  return (
    <div className="min-w-0 rounded-card border-2 border-forest bg-cream p-6">
      <GroupLabel>
        {name} · <code className="font-mono text-caption normal-case">{utility}</code>
      </GroupLabel>
      <p ref={ref} className={cn("break-words", className)}>
        {sample}
      </p>
      <p className="mt-4 text-ui text-ink-soft">{use}</p>
      <p className="mt-3 font-mono text-[11px] break-all text-ink-soft">
        {values["font-family"]} · {values["font-weight"]} · stretch {values["font-stretch"]} · tracking{" "}
        {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]} · {values["text-transform"]}
      </p>
    </div>
  )
}

const TYPE_SCALE = [
  { name: "Mega", token: "text-mega", className: "font-heavy text-mega", use: "Reserved for the loudest single word" },
  { name: "Title", token: "text-title", className: "font-heavy text-title", use: "Section titles: Book a table, Loud in the best way" },
  { name: "Statement", token: "text-statement", className: "font-heavy text-statement normal-case tracking-[-0.035em]", use: "The inked sentence" },
  { name: "Tab", token: "text-tab", className: "font-condensed text-tab uppercase", use: "Menu tabs" },
  { name: "Item", token: "text-item", className: "font-heavy text-item", use: "Dish names and prices" },
  { name: "Label", token: "text-label", className: "font-condensed text-label uppercase", use: "Eyebrows, buttons, nav, form labels" },
  { name: "Body", token: "text-body", className: "text-body", use: "Paragraphs and notes" },
  { name: "UI", token: "text-ui", className: "text-ui", use: "Small print, detail lines, inputs" },
  { name: "Caption", token: "text-caption", className: "font-condensed text-caption uppercase", use: "Tags, time chips" },
]

export function TypeSample({ name, token, className, use }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid min-w-0 gap-3 border-b-2 border-forest py-6 last:border-b-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div>
        <p className="font-condensed text-label uppercase">{name}</p>
        <p className="text-ui text-ink-soft">{use}</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-soft tabular-nums">
          {token}
          <br />
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </p>
      </div>
      <p ref={ref} className={cn("min-w-0 overflow-hidden break-words", className)}>
        {name === "Mega" ? "Oak" : name === "Statement" ? "We brine every bird" : "Pick a pile"}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="space-y-10">
      <p className="max-w-[60ch] text-body text-ink-soft">
        One family, Archivo, from Google Fonts — its width axis does the work of three faces. Sizes marked with a
        clamp grow with the window; the values below are what they measure at this width.
      </p>
      <div className="grid gap-4 lg:grid-cols-3">
        {FACES.map((face) => (
          <FaceSample key={face.name} {...face} />
        ))}
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        <div className="rounded-card border-2 border-forest bg-cream px-5 sm:px-6">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border-2 border-forest bg-cream p-6">
          <GroupLabel>Numerals — tabular, for prices and times</GroupLabel>
          <p className="font-heavy text-item tabular-nums">
            <span className="align-top text-[0.5em]">$</span>22 · 17:30 · 012
          </p>
        </div>
        <div className="rounded-card border-2 border-forest bg-cream p-6">
          <GroupLabel>Hero stretch — font-stretch token</GroupLabel>
          <p className="font-heavy text-[clamp(44px,6vw,80px)] leading-[0.8] [font-stretch:var(--stretch-hero)]">Eat loud</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const LAYOUT_STEPS = [
  { step: "gutter", token: "--spacing-gutter", className: "w-gutter", use: "Page margin, clamp(16px, 2.2vw, 36px)" },
  { step: "row", token: "--spacing-row", className: "w-row", use: "Gap between rows, clamp(40px, 6vw, 88px)" },
  { step: "section", token: "--spacing-section", className: "w-section", use: "Section padding, clamp(88px, 13vw, 180px)" },
]

const STEPS = [
  { step: "1", className: "w-1" },
  { step: "2", className: "w-2" },
  { step: "3", className: "w-3" },
  { step: "4", className: "w-4" },
  { step: "5", className: "w-5" },
  { step: "6", className: "w-6" },
  { step: "8", className: "w-8" },
  { step: "10", className: "w-10" },
]

export function SpacingStep({ step, className, use }: { step: string; className: string; use?: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[4.5rem_4.5rem_minmax(0,1fr)] items-center gap-3 py-2">
      <span className="font-mono text-caption">{step}</span>
      <span className="font-mono text-caption text-ink-soft tabular-nums">{values.width}</span>
      <div className="min-w-0">
        <div ref={ref} className={cn("h-3 max-w-full rounded-pill bg-orange", className)} />
        {use ? <p className="mt-1 text-caption text-ink-soft">{use}</p> : null}
      </div>
    </li>
  )
}

const RADII = [
  { name: "card", className: "rounded-card", use: "Cards, stickers, the booking form" },
  { name: "field", className: "rounded-field", use: "Inputs, code, frames" },
  { name: "pill", className: "rounded-pill", use: "Buttons, chips, dots" },
  { name: "ellipse", className: "rounded-[50%]", use: "The call-to-action stamp" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="m-0">
      <div ref={ref} className={cn("h-20 border-2 border-forest bg-cream", className)} />
      <figcaption className="mt-2 text-ui">
        <span className="font-condensed text-label uppercase">{name}</span>{" "}
        <span className="font-mono text-[11px] text-ink-soft">{values["border-top-left-radius"]}</span>
        <span className="block text-ink-soft">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "Sticker", token: "shadow-sticker", className: "shadow-sticker", use: "Cards you could pick up. Hard, no blur." },
  { name: "Sticker, lifted", token: "shadow-sticker-lift", className: "shadow-sticker-lift", use: "A review while it is dragged" },
  { name: "Float", token: "shadow-float", className: "shadow-float", use: "Kept for things over photographs" },
]

export function ShadowSample({ name, token, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="m-0">
      <div ref={ref} className={cn("h-24 rounded-card border-2 border-forest bg-cream", className)} />
      <figcaption className="mt-4 text-ui">
        <span className="font-condensed text-label uppercase">{name}</span>
        <span className="block text-ink-soft">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-soft">
          {token}: {cleanShadow(values["box-shadow"])}
        </span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Forest rule", className: "border-2 border-forest bg-cream", use: "Cards, menu rows, step dividers" },
  { name: "Hairline", className: "border border-hairline bg-cream", use: "Quiet rules on light: hours, sheet rows" },
  { name: "Hairline on forest", className: "border-2 border-dashed border-hairline-forest bg-forest", use: "The ticket's tear line" },
  { name: "Focus ring", className: "ring-2 ring-forest ring-offset-2 ring-offset-lime bg-cream", use: "Every focusable thing" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-bottom-width", "border-bottom-color", "border-bottom-style", "box-shadow"])
  const ring = name === "Focus ring"
  return (
    <figure className="m-0">
      <div ref={ref} className={cn("h-16 rounded-field", className)} />
      <figcaption className="mt-3 text-ui">
        <span className="font-condensed text-label uppercase">{name}</span>
        <span className="block text-ink-soft">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-soft">
          {ring ? cleanShadow(values["box-shadow"]) : `${values["border-bottom-width"]} ${values["border-bottom-style"]} ${values["border-bottom-color"]}`}
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
          <GroupLabel>Layout steps — fluid tokens</GroupLabel>
          <ul className="rounded-card border-2 border-forest bg-cream px-5 py-3">
            {LAYOUT_STEPS.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
          <GroupLabel className="mt-8">Component steps — 4px grid</GroupLabel>
          <ul className="rounded-card border-2 border-forest bg-cream px-5 py-3">
            {STEPS.map((step) => (
              <SpacingStep key={step.step} {...step} />
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <GroupLabel>Radii</GroupLabel>
          <div className="grid grid-cols-2 gap-4">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
          <GroupLabel className="mt-8">Shapes — clip paths, lib/shapes.ts</GroupLabel>
          <ShapeRow />
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid gap-8 rounded-card border-2 border-forest bg-lime p-6 sm:grid-cols-3 sm:p-8">
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

const SHAPE_NAMES: ShapeName[] = ["pillow", "arch", "blob", "scallop", "burst", "ticket", "circle", "pill"]

export function ShapeRow() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {SHAPE_NAMES.map((shape) => (
        <figure key={shape} className="m-0">
          <ClipShape shape={shape} className={cn("w-full bg-forest", shape === "pill" ? "aspect-[2/1]" : "aspect-square")} />
          <figcaption className="mt-1 font-mono text-[11px] text-ink-soft">{shape}</figcaption>
        </figure>
      ))}
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

type MotionSpec = {
  name: string
  where: string
  duration: string | number
  easing: string
  keyframes: Keyframe[]
  /** Where a duration given in ms comes from. */
  source?: string
  target?: "bar" | "stamp" | "sheet"
}

const MOTION: MotionSpec[] = [
  {
    name: "Press",
    where: "Every button and chip",
    duration: "--duration-press",
    easing: "--ease-out-strong",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.96)" }, { transform: "scale(1)" }],
    target: "stamp",
  },
  {
    name: "Tip",
    where: "The call-to-action stamp on hover",
    duration: "--duration-hover",
    easing: "--ease-out-strong",
    keyframes: [{ transform: "rotate(0deg) scale(1)" }, { transform: "rotate(-3deg) scale(1.04)" }],
    target: "stamp",
  },
  {
    name: "Rise",
    where: "Display letters out of their line",
    duration: DURATION.hero * 1000,
    source: "DURATION.hero",
    easing: "--ease-out-strong",
    keyframes: [{ transform: "translateY(105%)" }, { transform: "translateY(0%)" }],
  },
  {
    name: "Reveal",
    where: "Films opening out of a clip",
    duration: "--duration-reveal",
    easing: "--ease-out-strong",
    keyframes: [{ clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }],
  },
  {
    name: "Curtain",
    where: "The preloader lifting",
    duration: "--duration-curtain",
    easing: "--ease-in-out-strong",
    keyframes: [{ clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)" }],
  },
  {
    name: "Drawer",
    where: "The mobile menu sheet",
    duration: 320,
    source: "sheet.tsx",
    easing: "--ease-drawer",
    keyframes: [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
    target: "sheet",
  },
]

/** Plays one of the page's motions on a sample, through the Web Animations API
 *  — so the editor's Motion switch stops and reduces it like the page's own.
 *  Curves and durations are read off `:root` when it plays. */
export function MotionSample({ name, where, duration, easing, keyframes, source, target = "bar" }: MotionSpec) {
  const element = useRef<HTMLDivElement>(null)
  const vars = useRootVars([easing, typeof duration === "string" ? duration : "--duration-press"])
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
    <div className="flex min-w-0 flex-col rounded-card border-2 border-forest bg-cream p-5">
      <div className="flex h-28 items-center justify-center overflow-hidden rounded-field bg-lime px-4">
        {target === "stamp" ? (
          <div ref={element} className="rounded-[50%] bg-orange px-6 py-3 font-condensed text-label uppercase">
            Book it
          </div>
        ) : target === "sheet" ? (
          <div className="relative h-full w-full overflow-hidden">
            <div ref={element} className="absolute inset-y-0 right-0 w-1/2 border-l-2 border-forest bg-cream" />
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            <div ref={element} className="h-14 w-full rounded-field bg-forest" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-condensed text-label uppercase">{name}</p>
          <p className="text-ui text-ink-soft">{where}</p>
          <p className="mt-1 font-mono text-[11px] break-all text-ink-soft">
            {Math.round(ms)}ms · {typeof duration === "string" ? duration : source} · {easing} = {curve}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-11 shrink-0 items-center rounded-pill border-2 border-forest px-4 font-condensed text-label uppercase transition-[transform,background-color,color] duration-(--duration-press) ease-out-strong focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:outline-none active:scale-[0.96] [@media(hover:hover)]:hover:bg-forest [@media(hover:hover)]:hover:text-lime"
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
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-card border-2 border-forest bg-cream p-5 text-ui">
          <p className="font-condensed text-label uppercase">Springs — lib/motion.ts</p>
          <p className="mt-2 font-mono text-[11px] break-all text-ink-soft">
            SPRING_FOLLOW {JSON.stringify(SPRING_FOLLOW)}
            <br />
            SPRING_POP {JSON.stringify(SPRING_POP)}
            <br />
            STAGGER {STAGGER}s
          </p>
          <p className="mt-2 text-ink-soft">Follow chases the pointer (menu blob, dragged stickers). Pop is the one bounce: the stamp and the ticket, seen once.</p>
        </div>
        <div className="rounded-card border-2 border-forest bg-cream p-5 text-ui text-ink-soft">
          <p className="font-condensed text-label text-forest uppercase">Scroll</p>
          <p className="mt-2">
            Lenis carries it at <code className="font-mono">lerp 0.1</code>, held in a ref so the editor can pause it.
            The cushion, the ink, the oak zoom and the kitchen walk are tied to it, not to time.
          </p>
        </div>
        <div className="rounded-card border-2 border-forest bg-cream p-5 text-ui text-ink-soft">
          <p className="font-condensed text-label text-forest uppercase">Reduced motion</p>
          <p className="mt-2">
            Read from the media query where motion starts: letters fade instead of rising, the ticker stands still,
            and the pinned scenes fall back to stacked layouts.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [
  { Icon: Menu, name: "Menu" },
  { Icon: XIcon, name: "X" },
  { Icon: ArrowUp, name: "ArrowUp" },
  { Icon: Flame, name: "Flame" },
  { Icon: Clock, name: "Clock" },
  { Icon: MapPin, name: "MapPin" },
  { Icon: Phone, name: "Phone" },
  { Icon: Minus, name: "Minus" },
  { Icon: Plus, name: "Plus" },
  { Icon: Hand, name: "Hand" },
]

export function Iconography() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="min-w-0 rounded-card border-2 border-forest bg-cream p-6">
        <GroupLabel>Icons — Lucide, in currentColor</GroupLabel>
        <div className="flex flex-wrap gap-3">
          {ICONS.map(({ Icon, name }) => (
            <span key={name} title={name} className="flex size-12 items-center justify-center rounded-pill border-2 border-forest bg-lime">
              <Icon className={cn("size-5", name === "Flame" && "fill-current text-orange")} />
            </span>
          ))}
          <span title="Star" className="flex size-12 items-center justify-center rounded-pill bg-forest text-lime">
            <Star className="size-5" />
          </span>
          <span title="Heat dot" className="flex size-12 items-center justify-center rounded-pill border-2 border-forest bg-lime">
            <span className="size-2.5 rounded-pill bg-orange" />
          </span>
        </div>
        <p className="mt-4 text-ui text-ink-soft">
          Lucide at its default 2px stroke, sized 16–24px beside condensed labels. Flames are filled, in orange, and only
          ever count heat. The ticker's star and the orange dot are the page's own marks.
        </p>
      </div>
      <div className="min-w-0 rounded-card border-2 border-forest bg-cream p-6">
        <GroupLabel>Imagery — Pexels, always in a shape</GroupLabel>
        <div className="grid grid-cols-4 gap-3">
          <ClipShape shape="arch" className="aspect-[3/4]">
            <Photo photo={room.photos[0]} width={300} className="absolute inset-0" />
          </ClipShape>
          <ClipShape shape="scallop" className="aspect-square self-center">
            <Photo photo={menu.tabs[0].items[0].photo} width={300} className="absolute inset-0" />
          </ClipShape>
          <ClipShape shape="burst" className="aspect-square self-center">
            <Photo photo={ticker.photos[0]} width={300} className="absolute inset-0" />
          </ClipShape>
          <ClipShape shape="blob" className="aspect-square self-center bg-orange">
            <Photo photo={menu.tabs[1].items[0].photo} width={300} className="absolute inset-0" />
          </ClipShape>
        </div>
        <p className="mt-4 text-ui text-ink-soft">
          Close, warm, a little messy: food in hands, crust in close-up, fire and fryers as short silent films. Never a
          plain rectangle — every photo sits in one of the shapes. Photographs and films from Pexels, credited in the
          footer.
        </p>
      </div>
    </div>
  )
}
