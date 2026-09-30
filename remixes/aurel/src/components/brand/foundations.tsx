import { ArrowRight, Check, ChevronDown, Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useRef, type ReactNode } from "react"

import { GroupLabel, LABEL } from "@/components/brand/specimen"
import { contrast, grade, toHex, useComputed } from "@/components/brand/read-style"
import { MixedTitle } from "@/components/ui/mixed-title"
import { Photo } from "@/components/ui/photo"
import { SectionHeading } from "@/components/ui/section-heading"
import { Wordmark } from "@/components/ui/wordmark"
import { home, products } from "@/content"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Name the cloth and the hand: “Drafted in Lisbon, sewn by twelve people.”", dont: "Borrow the runway: “Iconic. Timeless. Must-have.”" },
  { do: "Set the small words in italic: “_the_ HOUSE _of_ SLOW TAILORING.”", dont: "Italicise the nouns, or set whole titles in italic." },
  { do: "Speak in the first person plural, and plainly: “We mend what we make.”", dont: "Urgency: “Only 3 left — order now!”" },
  { do: "Prices as they are: €1,480. No “from”, no strike-throughs.", dont: "Sales language, emoji, exclamation marks." },
]

function Plate({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  return (
    <figure className="min-w-0">
      <div className={cn("flex aspect-[4/3] items-center justify-center overflow-hidden", className)}>{children}</div>
      <figcaption className={cn(LABEL, "mt-3 text-ink-muted")}>{label}</figcaption>
    </figure>
  )
}

export function BrandIdentity() {
  return (
    <div className="space-y-14">
      <div className="grid gap-6 md:grid-cols-3">
        <Plate label="On paper" className="bg-chip shadow-chip">
          {/* Clear space: the height of the A, drawn. */}
          <div className="outline-1 outline-dashed outline-ember/60 p-[0.8em] text-[clamp(44px,5vw,72px)]">
            <Wordmark className="text-[1em]" />
          </div>
        </Plate>
        <Plate label="On ink" className="bg-ink text-paper">
          <div className="outline-1 outline-dashed outline-paper/40 p-[0.8em] text-[clamp(44px,5vw,72px)]">
            <Wordmark className="text-[1em]" />
          </div>
        </Plate>
        <Plate label="In the studio" className="bg-studio text-chip">
          <div className="outline-1 outline-dashed outline-chip/40 p-[0.8em] text-[clamp(44px,5vw,72px)]">
            <Wordmark className="text-[1em]" />
          </div>
        </Plate>
      </div>
      <dl className="grid gap-px bg-ink/15 sm:grid-cols-3">
        <div className="bg-paper p-6 sm:pl-0">
          <dt className={cn(LABEL, "text-ink")}>Clear space</dt>
          <dd className="mt-3 font-serif text-[17px] leading-[1.6] text-ink-soft">
            The height of the wordmark’s capitals on every side — the dashed box. Nothing else is set inside it.
          </dd>
        </div>
        <div className="bg-paper p-6">
          <dt className={cn(LABEL, "text-ink")}>Minimum size</dt>
          <dd className="mt-3 flex items-end gap-5">
            <Wordmark className="text-[26px] text-ink" />
            <span className="font-serif text-[17px] leading-[1.4] text-ink-soft">26px, as the header sets it on a phone.</span>
          </dd>
        </div>
        <div className="bg-paper p-6">
          <dt className={cn(LABEL, "text-ink")}>At full width</dt>
          <dd className="mt-3 font-serif text-[17px] leading-[1.6] text-ink-soft">
            In the footer the wordmark runs edge to edge at 35vw — the one place it is allowed to be the picture.
          </dd>
        </div>
      </dl>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col items-start gap-6">
          <GroupLabel className="mb-0">The seal</GroupLabel>
          <span className="grid size-40 place-items-center rounded-full bg-seal shadow-seal">
            <span className="font-display text-[64px] leading-none text-silver-lo/80">A</span>
          </span>
          <p className="max-w-[40ch] font-serif text-[17px] leading-[1.6] text-ink-soft">
            A silver seal, struck with the initial. It turns between the two columns of the house’s verse; it is never
            flattened into an icon.
          </p>
        </div>
        <div>
          <GroupLabel>Voice</GroupLabel>
          <ul className="divide-y divide-ink/15 border-y border-ink/15">
            {VOICE.map((line) => (
              <li key={line.do} className="grid gap-3 py-5 sm:grid-cols-2 sm:gap-8">
                <p className="flex gap-3 font-serif text-[17px] leading-[1.5] text-ink">
                  <Check className="mt-1 size-4 shrink-0" strokeWidth={1.5} aria-label="Do" />
                  <MixedTitle as="span" text={line.do} className="font-serif" />
                </p>
                <p className="flex gap-3 font-serif text-[17px] leading-[1.5] text-ink-muted">
                  <X className="mt-1 size-4 shrink-0 text-ember-deep" strokeWidth={1.5} aria-label="Don’t" />
                  {line.dont}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ─── Colour ──────────────────────────────────────────────────────────── */

/** `className` paints the swatch with a Tailwind colour from `@theme`
 *  (written out whole so Tailwind generates it); `variable` with one of
 *  shadcn's names on `:root`. */
type SwatchSpec = { name: string; role: string; className?: string; variable?: string; token: string }

const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Bone paper",
    swatches: [
      { name: "Paper", token: "--color-paper", className: "bg-paper", role: "The page" },
      { name: "Paper deep", token: "--color-paper-deep", className: "bg-paper-deep", role: "Behind photographs, hover" },
      { name: "Chip", token: "--color-chip", className: "bg-chip", role: "Buttons, cards, the sheet" },
      { name: "Plaster", token: "--color-plaster", className: "bg-plaster", role: "Plaster tones" },
    ],
  },
  {
    label: "Ink",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Type, the ink button" },
      { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft", role: "Serif body copy" },
      { name: "Ink muted", token: "--color-ink-muted", className: "bg-ink-muted", role: "Meta, numbers, links at rest" },
      { name: "Ink faint", token: "--color-ink-faint", className: "bg-ink-faint", role: "Placeholders, rules" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { name: "Line", token: "--color-line", className: "bg-line", role: "Accordion and sheet rules" },
      { name: "Line strong", token: "--color-line-strong", className: "bg-line-strong", role: "Size and time toggles" },
      { name: "Ink / 15", token: "--color-ink @ 15%", className: "bg-ink/15", role: "Section rules, the footer" },
      { name: "Ink / 30", token: "--color-ink @ 30%", className: "bg-ink/30", role: "Form fields’ underline" },
    ],
  },
  {
    label: "The studio",
    swatches: [
      { name: "Ember", token: "--color-ember", className: "bg-ember", role: "The backdrop, selection" },
      { name: "Ember deep", token: "--color-ember-deep", className: "bg-ember-deep", role: "Errors, shadowed backdrop" },
      { name: "Oxblood", token: "--color-oxblood", className: "bg-oxblood", role: "The studio’s edge" },
      { name: "Clay", token: "--color-clay", className: "bg-clay", role: "The plinth" },
    ],
  },
  {
    label: "Stone",
    swatches: [
      { name: "Stone hi", token: "--color-stone-hi", className: "bg-stone-hi", role: "Top of the grey band" },
      { name: "Stone", token: "--color-stone", className: "bg-stone", role: "The grey band" },
      { name: "Stone lo", token: "--color-stone-lo", className: "bg-stone-lo", role: "Foot of the grey band" },
    ],
  },
  {
    label: "The seal",
    swatches: [
      { name: "Silver hi", token: "--color-silver-hi", className: "bg-silver-hi", role: "Highlight" },
      { name: "Silver", token: "--color-silver", className: "bg-silver", role: "The metal" },
      { name: "Silver lo", token: "--color-silver-lo", className: "bg-silver-lo", role: "The strike’s shadow" },
    ],
  },
  {
    label: "shadcn’s names, pointed at the palette",
    swatches: [
      { name: "background", token: "--background", variable: "--background", role: "→ paper" },
      { name: "foreground", token: "--foreground", variable: "--foreground", role: "→ ink" },
      { name: "card", token: "--card", variable: "--card", role: "→ paper" },
      { name: "card-foreground", token: "--card-foreground", variable: "--card-foreground", role: "→ ink" },
      { name: "popover", token: "--popover", variable: "--popover", role: "→ chip" },
      { name: "popover-foreground", token: "--popover-foreground", variable: "--popover-foreground", role: "→ ink" },
      { name: "primary", token: "--primary", variable: "--primary", role: "→ ink" },
      { name: "primary-foreground", token: "--primary-foreground", variable: "--primary-foreground", role: "→ paper" },
      { name: "secondary", token: "--secondary", variable: "--secondary", role: "→ chip" },
      { name: "secondary-foreground", token: "--secondary-foreground", variable: "--secondary-foreground", role: "→ ink" },
      { name: "muted", token: "--muted", variable: "--muted", role: "→ paper deep" },
      { name: "muted-foreground", token: "--muted-foreground", variable: "--muted-foreground", role: "→ ink muted" },
      { name: "accent", token: "--accent", variable: "--accent", role: "→ paper deep (a hover surface)" },
      { name: "accent-foreground", token: "--accent-foreground", variable: "--accent-foreground", role: "→ ink" },
      { name: "destructive", token: "--destructive", variable: "--destructive", role: "→ ember deep" },
      { name: "border", token: "--border", variable: "--border", role: "→ line" },
      { name: "input", token: "--input", variable: "--input", role: "→ line strong" },
      { name: "ring", token: "--ring", variable: "--ring", role: "→ ink muted" },
    ],
  },
]

export function Swatch({ name, token, className, variable, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const [pageRef, page] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="min-w-0">
      <div ref={pageRef} className="bg-paper">
        <div ref={ref} className={cn("aspect-[4/3] outline-1 -outline-offset-1 outline-line", className)} style={variable ? { background: `var(${variable})` } : undefined} />
      </div>
      <figcaption className="mt-3 space-y-0.5">
        <p className="font-display text-[22px] leading-none text-ink">{name}</p>
        <p className="pt-1 font-serif text-[15px] text-ink-soft">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-ink-muted">{token}</p>
        <p className="font-mono text-[11px] break-all text-ink-muted">
          {value || "—"} · {value ? toHex(page["background-color"] ?? "", value) : "—"}
        </p>
      </figcaption>
    </figure>
  )
}

const GRADIENTS = [
  { name: "Stone band", className: "bg-stone-band", role: "The process band: paper into stone" },
  { name: "Studio", className: "bg-studio", role: "Ember to oxblood, lit from above" },
  { name: "Seal", className: "bg-seal", role: "The silver seal’s metal" },
]

function GradientSwatch({ name, className, role }: (typeof GRADIENTS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-image"])
  return (
    <figure className="min-w-0">
      <div ref={ref} className={cn("aspect-[16/9]", className)} />
      <figcaption className="mt-3">
        <p className="font-display text-[22px] leading-none text-ink">{name}</p>
        <p className="pt-1 font-serif text-[15px] text-ink-soft">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-ink-muted">.{className} · {values["background-image"]}</p>
      </figcaption>
    </figure>
  )
}

/** Text over a background, both painted from their tokens and read back. */
const PAIRS = [
  { label: "Ink on paper — titles", className: "bg-paper text-ink" },
  { label: "Ink soft on paper — body", className: "bg-paper text-ink-soft" },
  { label: "Ink muted on paper — meta", className: "bg-paper text-ink-muted" },
  { label: "Ink faint on paper — placeholders only", className: "bg-paper text-ink-faint" },
  { label: "Ink on chip — buttons", className: "bg-chip text-ink" },
  { label: "Paper on ink — the ink button", className: "bg-ink text-paper" },
  { label: "Ember deep on paper — errors", className: "bg-paper text-ember-deep" },
  { label: "Paper on ember — selection", className: "bg-ember text-paper" },
  { label: "Chip on stone lo — the sweep", className: "bg-stone-lo text-chip" },
  { label: "Chip on ember deep — the studio", className: "bg-ember-deep text-chip" },
]

export function ContrastPair({ label, className }: (typeof PAIRS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 p-5 shadow-[inset_0_0_0_1px_var(--color-line)]", className)}>
      <div className="min-w-0">
        <p className="font-display text-[44px] leading-none">Aa</p>
        <p className="mt-2 font-serif text-[15px]">{label}</p>
      </div>
      <p className="shrink-0 text-right font-mono text-[11px] tabular-nums">
        {ratio == null ? "—" : `${ratio.toFixed(2)}:1`}
        <span className="block">{grade(ratio)}</span>
      </p>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="space-y-16">
      {COLOUR_GROUPS.map((group) => (
        <div key={group.label}>
          <GroupLabel>{group.label}</GroupLabel>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Gradients</GroupLabel>
        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-3">
          {GRADIENTS.map((g) => (
            <GradientSwatch key={g.name} {...g} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Text on its ground — WCAG 2 contrast</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {PAIRS.map((pair) => (
            <ContrastPair key={pair.label} {...pair} />
          ))}
        </div>
        <p className="mt-5 max-w-[60ch] font-serif text-[16px] leading-[1.6] text-ink-soft">
          One light theme: the house is bone paper, and has no dark mode. Ink faint is for placeholders and rules, never
          for words someone has to read.
        </p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const METRICS = ["font-size", "line-height", "font-weight", "letter-spacing"]

function Metrics({ values }: { values: Record<string, string> }) {
  return (
    <p className="mt-2 font-mono text-[11px] tabular-nums text-ink-muted">
      {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
      {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
    </p>
  )
}

const SCALE = [
  { name: "Title · xl", use: "Page titles (SectionHeading xl)", className: "text-[clamp(52px,8.4vw,150px)] leading-[0.92] tracking-[-0.015em]", text: "BRAND _guidelines_" },
  { name: "Title · lg", use: "Section titles (SectionHeading lg)", className: "text-[clamp(42px,6.4vw,112px)] leading-[0.92] tracking-[-0.015em]", text: "_the_ HOUSE STYLE" },
  { name: "Title · md", use: "Smaller sections (SectionHeading md)", className: "text-[clamp(34px,5vw,64px)] leading-[0.92] tracking-[-0.015em]", text: "_the_ REST _of the_ EDIT" },
  { name: "Numerals", use: "Atelier figures (CountUp)", className: "text-[clamp(64px,8vw,140px)] leading-[0.85] tracking-[-0.02em]", text: "1,480" },
  { name: "Product name", use: "The product page", className: "text-[clamp(48px,5vw,88px)] leading-[0.9] tracking-[-0.015em]", text: "Vale Overcoat" },
  { name: "Card title", use: "Product cards, the index", className: "text-[clamp(22px,1.7vw,30px)] leading-none tracking-[-0.01em]", text: "VALE _overcoat_" },
  { name: "Chip label", use: "House buttons", className: "text-[15px] tracking-[0.01em] lg:text-[17px]", text: "Book _a_ FITTING" },
  { name: "Eyebrow", use: "Over every title", className: "text-[13px] tracking-[0.02em] sm:text-[15px]", text: "_the_ HOUSE _of_ SLOW TAILORING" },
] as const

const PROSE = [
  { name: "Statement", use: "Grotesk, medium — the plain sentence after a title", className: "font-sans text-[clamp(22px,1.75vw,32px)] font-medium leading-[1.12] tracking-[-0.02em]", text: "Cut in one atelier and sold in one room." },
  { name: "Intro", use: "Book serif — the paragraph under a page title", className: "font-serif text-[clamp(17px,1.15vw,20px)] leading-[1.6]", text: "Every garment is drafted by hand in Lisbon." },
  { name: "Body", use: "Book serif — everything else you read", className: "font-serif text-[17px] leading-[1.6]", text: "We make fewer pieces, in better cloth, and we mend what we make." },
  { name: "Meta", use: "Book serif, muted — colour and cloth", className: "font-serif text-[15px] text-ink-muted", text: "Charcoal · Loden wool" },
  { name: "Interface", use: "Grotesk — links, prices, fields", className: "font-sans text-[16px] tracking-[0.01em]", text: "Collection   €1,480" },
  { name: "Label", use: "Grotesk capitals, spaced", className: "font-sans text-[13px] uppercase tracking-[0.06em]", text: "Letters from the house" },
] as const

function DisplaySample({ name, use, className, text }: (typeof SCALE)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(METRICS, "child")
  return (
    <div className="grid gap-3 border-t border-ink/15 py-7 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
      <div>
        <p className={cn(LABEL, "text-ink")}>{name}</p>
        <p className="mt-1 font-serif text-[15px] text-ink-soft">{use}</p>
        <Metrics values={values} />
      </div>
      <div ref={ref} className="min-w-0">
        <MixedTitle as="p" text={text} className={cn("break-words text-ink", className)} />
      </div>
    </div>
  )
}

function ProseSample({ name, use, className, text }: (typeof PROSE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(METRICS)
  return (
    <div className="grid gap-3 border-t border-ink/15 py-7 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
      <div>
        <p className={cn(LABEL, "text-ink")}>{name}</p>
        <p className="mt-1 font-serif text-[15px] text-ink-soft">{use}</p>
        <Metrics values={values} />
      </div>
      <p ref={ref} className={cn("min-w-0 whitespace-pre-wrap text-ink", className)}>
        {text}
      </p>
    </div>
  )
}

function Family({ label, name, className, children }: { label: string; name: string; className: string; children: ReactNode }) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family", "font-weight", "font-synthesis"])
  return (
    <div ref={ref} className={cn("min-w-0 bg-chip p-6 shadow-chip sm:p-8", className)}>
      <p className={cn(LABEL, "font-sans text-ink-muted")}>{label}</p>
      <p className="mt-5 text-[clamp(44px,4vw,64px)] leading-none text-ink">{name}</p>
      <div className="mt-5 text-[17px] leading-[1.5] text-ink-soft">{children}</div>
      <p className="mt-5 font-mono text-[11px] break-all text-ink-muted">{values["font-family"]}</p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="space-y-16">
      <div className="grid gap-4 lg:grid-cols-3">
        <Family label="Display — titles, buttons, the wordmark" name="Instrument Serif" className="font-display">
          CAPITALS, <em>with the small words in italic</em>. One weight, never faux-bold.
        </Family>
        <Family label="Book serif — everything you read" name="EB Garamond" className="font-serif">
          Body, intros, meta and the verse. <em>Italic</em> for asides. 400 and 500.
        </Family>
        <Family label="Grotesk — the interface" name="Inter" className="font-sans">
          Labels in spaced capitals, prices, links, fields and statements. 400 and 500.
        </Family>
      </div>
      <div>
        <GroupLabel>Display scale — fluid, measured at this width</GroupLabel>
        <div className="border-b border-ink/15">
          {SCALE.map((sample) => (
            <DisplaySample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Reading and interface</GroupLabel>
        <div className="border-b border-ink/15">
          {PROSE.map((sample) => (
            <ProseSample key={sample.name} {...sample} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>The mixed title — how SectionHeading sets it</GroupLabel>
        <div className="bg-chip p-6 shadow-chip sm:p-10">
          <SectionHeading eyebrow="_where_ PATTERN _meets_ PATIENCE" title="_the_ HOUSE _of_ SLOW TAILORING" size="md" />
        </div>
        <p className="mt-4 max-w-[60ch] font-serif text-[16px] leading-[1.6] text-ink-soft">
          Words between underscores come out italic: <code className="font-mono text-[13px]">"_the_ HOUSE _of_ SLOW TAILORING"</code>.
          Figures are tabular wherever they line up — prices, the bag count, step numbers.
        </p>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = [
  { name: "gutter", className: "w-gutter", use: "--spacing-gutter · clamp(16px, 5vw, 96px) — every page edge" },
  { name: "section", className: "w-section", use: "--spacing-section · clamp(88px, 11vw, 200px) — between sections" },
  { name: "rail", className: "w-rail", use: "--spacing-rail · clamp(12px, 2.3vw, 44px) — the section rail’s inset" },
  { name: "2 · 8px", className: "w-2", use: "The gap between photographs" },
  { name: "4 · 16px", className: "w-4", use: "Header top on phones" },
  { name: "6 · 24px", className: "w-6", use: "Grid gaps" },
  { name: "8 · 32px", className: "w-8", use: "Chip padding" },
  { name: "14 · 56px", className: "w-14", use: "Grid rows" },
]

function SpaceBar({ name, className, use }: (typeof SPACING)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[6.5rem_3.5rem_minmax(0,1fr)] items-center gap-3 border-t border-ink/15 py-3">
      <span className="font-mono text-[11px] text-ink-muted">{name}</span>
      <span className="font-mono text-[11px] tabular-nums text-ink">{values.width}</span>
      <div className="min-w-0">
        <div ref={ref} className={cn("h-3 max-w-full bg-ember", className)} />
        <p className="mt-1 truncate font-serif text-[14px] text-ink-soft" title={use}>
          {use}
        </p>
      </div>
    </li>
  )
}

const RADII = [
  { name: "chip", className: "rounded-chip", use: "Buttons" },
  { name: "card", className: "rounded-card", use: "Cards, sheets" },
  { name: "frame", className: "rounded-frame", use: "Photographs" },
  { name: "shadcn --radius", className: "rounded-md", use: "Every shadcn part" },
  { name: "hero", className: "rounded-hero", use: "The film’s card, folding" },
  { name: "full", className: "rounded-full", use: "The seal, one badge" },
]

function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="min-w-0">
      <div ref={ref} className={cn("aspect-square bg-chip shadow-chip", className)} />
      <figcaption className="mt-3">
        <span className="font-display text-[20px] text-ink">{name}</span>{" "}
        <span className="font-mono text-[11px] text-ink-muted">{values["border-top-left-radius"]}</span>
        <span className="block font-serif text-[14px] text-ink-soft">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "chip", className: "shadow-chip", use: "The house button: a warm, wide halo" },
  { name: "chip-hover", className: "shadow-chip-hover", use: "…which widens on hover" },
  { name: "frame", className: "shadow-frame", use: "The film’s card lifting off" },
  { name: "sheet", className: "shadow-sheet", use: "Atelier steps, stacked" },
  { name: "seal", className: "shadow-seal", use: "The struck metal of the seal" },
]

function ShadowSample({ name, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="min-w-0">
      <div ref={ref} className={cn("aspect-[4/3] bg-chip", className, name === "seal" && "mx-auto aspect-square w-3/4 rounded-full bg-seal")} />
      <figcaption className="mt-5">
        <span className="font-display text-[20px] text-ink">{name}</span>
        <span className="block font-serif text-[14px] text-ink-soft">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-muted">{values["box-shadow"]}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Section rule", className: "border-t border-ink/15", use: "Between sections, stats, the footer" },
  { name: "Line", className: "border-t border-line", use: "Accordions, the bag" },
  { name: "Toggle", className: "border border-line-strong", use: "Sizes and times, at rest" },
  { name: "Toggle, chosen", className: "border border-ink", use: "…and chosen, or hovered" },
  { name: "Field", className: "border-b border-ink/30", use: "Fields: an underline, no box" },
  { name: "Field, focused", className: "border-b border-ink", use: "…darkens on focus" },
]

function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const side = className.includes("border-b") ? "bottom" : "top"
  const [ref, values] = useComputed<HTMLDivElement>([`border-${side}-width`, `border-${side}-style`, `border-${side}-color`])
  return (
    <figure className="min-w-0">
      <div ref={ref} className={cn("h-16", className)} />
      <figcaption className="mt-3">
        <span className="font-display text-[20px] text-ink">{name}</span>
        <span className="block font-serif text-[14px] text-ink-soft">{use}</span>
        <span className="mt-1 block font-mono text-[11px] break-all text-ink-muted">
          {values[`border-${side}-width`]} {values[`border-${side}-style`]} {values[`border-${side}-color`]}
        </span>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="min-w-0">
          <GroupLabel>Spacing — three layout tokens, then Tailwind’s 4px steps</GroupLabel>
          <ul className="border-b border-ink/15">
            {SPACING.map((step) => (
              <SpaceBar key={step.name} {...step} />
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <GroupLabel>Radii — square, as the page is</GroupLabel>
          <div className="grid grid-cols-3 gap-4">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — warm and wide, never grey</GroupLabel>
        <div className="grid gap-x-8 gap-y-12 bg-paper-deep/60 p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-5">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders — hairlines and underlines</GroupLabel>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
    name: "Press",
    className: "ease-(--ease-press) duration-(--duration-press)",
    where: "A chip under the finger: scale to 0.97",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Hover",
    className: "ease-(--ease-out-soft) duration-(--duration-hover)",
    where: "Chips brighten and their halo widens",
    keyframes: [{ boxShadow: "--shadow-chip", backgroundColor: "--color-chip" }, { boxShadow: "--shadow-chip-hover", backgroundColor: "#fff" }],
  },
  {
    name: "Enter",
    className: "ease-(--ease-out-soft) duration-(--duration-enter)",
    where: "FadeUp: 24px, on almost every block",
    keyframes: [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }],
  },
  {
    name: "Wipe",
    className: "ease-(--ease-in-out-soft) duration-(--duration-menu)",
    where: "ClipReveal and the product card’s second photograph",
    keyframes: [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
  },
  {
    name: "Menu",
    className: "ease-(--ease-in-out-soft) duration-(--duration-menu)",
    where: "The menu sheet drops from the top",
    keyframes: [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
  },
] as const

function bezier(value: string): [number, number, number, number] | null {
  const m = value.match(/cubic-bezier\(([^)]+)\)/)
  if (!m) return null
  const n = m[1].split(",").map((x) => Number.parseFloat(x))
  return n.length === 4 && n.every((x) => Number.isFinite(x)) ? (n as [number, number, number, number]) : null
}

/** Plays one of the page's motions on a sample, through the Web Animations
 *  API, with the curve and duration read off the token classes. */
function MotionSample({ name, className, where, keyframes }: (typeof MOTION)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["transition-timing-function", "transition-duration"])
  const target = useRef<HTMLDivElement>(null)
  const easing = values["transition-timing-function"] ?? ""
  const duration = Math.round(Number.parseFloat(values["transition-duration"] ?? "0") * 1000)
  const b = bezier(easing)

  const play = () => {
    const element = target.current
    if (!element || !easing) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.getAnimations().forEach((animation) => animation.cancel())
    const root = getComputedStyle(document.documentElement)
    const frames = keyframes.map((frame) =>
      Object.fromEntries(
        Object.entries(frame).map(([property, value]) => [
          property,
          typeof value === "string" && value.startsWith("--") ? root.getPropertyValue(value).trim() : value,
        ]),
      ),
    )
    element.animate(frames as Keyframe[], { duration: reduced ? 1 : name === "Press" ? duration * 2 : duration, easing, fill: "none" })
  }

  return (
    <div ref={ref} className={cn("flex min-w-0 flex-col bg-chip p-5 shadow-chip", className)}>
      <div className="flex h-28 items-center justify-center overflow-hidden bg-paper">
        <div ref={target} className="h-14 w-24 bg-chip shadow-chip" />
      </div>
      <svg viewBox="-4 -14 108 128" className="mt-4 h-16 w-full" preserveAspectRatio="none" aria-hidden>
        <path d="M0 100 L100 0" stroke="var(--color-line-strong)" strokeDasharray="2 3" fill="none" vectorEffect="non-scaling-stroke" />
        {b && (
          <path
            d={`M0 100 C${b[0] * 100} ${100 - b[1] * 100} ${b[2] * 100} ${100 - b[3] * 100} 100 0`}
            stroke="var(--color-ember)"
            strokeWidth={1.5}
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-[24px] leading-none text-ink">{name}</p>
          <p className="mt-1 font-serif text-[14px] leading-snug text-ink-soft">{where}</p>
          <p className="mt-2 font-mono text-[11px] break-all text-ink-muted">
            {duration}ms · {easing}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          className="inline-flex h-10 shrink-0 items-center bg-ink px-4 font-display text-[15px] text-paper transition-[background-color,transform] duration-(--duration-hover) hover:bg-ink-soft active:scale-[0.97]"
        >
          <em>play</em>
        </button>
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <ul className="grid gap-px bg-ink/15 md:grid-cols-3">
        <li className="bg-paper p-6 font-serif text-[16px] leading-[1.6] text-ink-soft md:pl-0">
          <span className={cn(LABEL, "block text-ink")}>Scroll</span>
          Lenis, heavy and soft (lerp 0.08), held in a ref so the editor can pause it; scroll-linked pieces read its
          progress. Off for reduced motion.
        </li>
        <li className="bg-paper p-6 font-serif text-[16px] leading-[1.6] text-ink-soft">
          <span className={cn(LABEL, "block text-ink")}>Pinned scenes</span>
          The film, the rising garment, the sweep, the seal and the stacking cards are tied to scroll, not time — they
          move as far as the reader does.
        </li>
        <li className="bg-paper p-6 font-serif text-[16px] leading-[1.6] text-ink-soft">
          <span className={cn(LABEL, "block text-ink")}>Reduced</span>
          Every entrance is held at its end state while the page is designed and when the visitor asks for less
          motion; Play above is instant then.
        </li>
      </ul>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [
  { name: "ShoppingBag", Icon: ShoppingBag },
  { name: "ArrowRight", Icon: ArrowRight },
  { name: "Check", Icon: Check },
  { name: "X", Icon: X },
  { name: "Plus", Icon: Plus },
  { name: "Minus", Icon: Minus },
  { name: "ChevronDown", Icon: ChevronDown },
]

export function Iconography() {
  const pictures = [products[0].images[0], home.wardrobe.large, home.wardrobe.small[0], home.archive.images[3]]
  return (
    <div className="space-y-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <GroupLabel>Icons — Lucide at a 1.25 stroke, and one glyph</GroupLabel>
          <div className="flex flex-wrap gap-2">
            {ICONS.map(({ name, Icon }) => (
              <span key={name} title={name} className="grid size-12 place-items-center bg-chip text-ink shadow-chip">
                <Icon className="size-5" strokeWidth={1.25} />
              </span>
            ))}
            <span title="Outbound link" className="grid size-12 place-items-center bg-chip font-sans text-[18px] text-ink shadow-chip">
              ↗
            </span>
          </div>
          <p className="mt-5 max-w-[44ch] font-serif text-[16px] leading-[1.6] text-ink-soft">
            As few as possible, thin as the type. Words do the work — MENU, not a hamburger; the arrow ↗ marks a link
            that leaves the page. The section rail’s diamonds are the only ornament.
          </p>
        </div>
        <div>
          <GroupLabel>Photography — Pexels, warm, still, often in black and white</GroupLabel>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {pictures.map((picture, index) => (
              <div key={picture.src} className="aspect-[3/4] overflow-hidden">
                <Photo src={picture.src} alt={picture.alt} className={index === 1 ? "grayscale" : undefined} />
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-[60ch] font-serif text-[16px] leading-[1.6] text-ink-soft">
            Cloth, hands and rooms; bodies seen from behind or in motion. Always full-bleed inside a square frame, 8px
            apart, on paper deep while they load — never rounded, never under a gradient. Photographs from Pexels,
            credited in the footer.
          </p>
        </div>
      </div>
    </div>
  )
}
