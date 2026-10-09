import {
  ArrowDown,
  ArrowUpRight,
  AtSign,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Disc3,
  Heart,
  Mail,
  Menu,
  Mic,
  Minus,
  Music2,
  Pause,
  Play,
  Plus,
  ShoppingBag,
  SkipBack,
  SkipForward,
  Sprout,
  X,
} from "lucide-react"
import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { cleanShadow, contrast, toHex, trackingEm, useComputed } from "@/components/brand/read-style"
import { GroupLabel, Panel } from "@/components/brand/specimen"
import { Doodle, type DoodleName } from "@/components/mock/doodles"
import { Logo, RecordMark } from "@/components/site/logo"
import { photo, PHOTOS } from "@/lib/photos"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Talk like the person behind the bar: “Bloom for forty seconds, then flip the record.”", dont: "Talk like a label: “Experience our artisanal, curated blends.”" },
  { do: "Name the farm, the person, the number: “Rosa Elena’s third harvest with us.”", dont: "Hide behind adjectives: “Ethically sourced premium beans.”" },
  { do: "Warm, a little wry. One exclamation mark a page, earned.", dont: "Shouting, emoji, “✨ amazing ✨” on every button." },
  { do: "One phrase in colour — the bit you'd say louder.", dont: "Gradient text, all caps headlines, three colours in a line." },
]

/** The wordmark on a ground, with its clear space drawn as a dashed box. */
function LogoGround({ tone, stacked = false }: { tone: "page" | "rust" | "cocoa"; stacked?: boolean }) {
  const ink = tone === "page" ? "text-ink" : "text-page"
  return (
    <div
      className={cn(
        "flex min-h-56 items-center justify-center overflow-hidden rounded-(--radius-panel) p-6",
        tone === "page" && "bg-panel",
        tone === "rust" && "bg-rust",
        tone === "cocoa" && "bg-cocoa",
      )}
    >
      {/* Clear space: the cap height of the wordmark on every side. */}
      <div className={cn("rounded-(--radius-chip) outline-1 outline-dashed", tone === "page" ? "outline-ink-4" : "outline-page/40", stacked ? "p-4" : "p-[18px]")}>
        {stacked ? <Logo stacked className={cn("text-[64px] sm:text-[72px]", ink, "[&_svg]:text-current")} /> : <Logo className={cn("text-[30px]", ink)} />}
      </div>
    </div>
  )
}

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div>
        <GroupLabel>Inline — the header, on cream</GroupLabel>
        <LogoGround tone="page" />
      </div>
      <div>
        <GroupLabel>Inline — on rust</GroupLabel>
        <LogoGround tone="rust" />
      </div>
      <div>
        <GroupLabel>Inline — on cocoa</GroupLabel>
        <LogoGround tone="cocoa" />
      </div>
      <div className="lg:col-span-2">
        <GroupLabel>Stacked — the footer, set huge</GroupLabel>
        <LogoGround tone="page" stacked />
      </div>
      <div>
        <GroupLabel>Stacked — on cocoa</GroupLabel>
        <LogoGround tone="cocoa" stacked />
      </div>
      <dl className="grid gap-px overflow-hidden rounded-(--radius-card) bg-line text-[15px] shadow-(--shadow-hairline) sm:grid-cols-3 lg:col-span-3">
        <div className="bg-raised p-5">
          <dt className="type-display text-h4 text-ink">Clear space</dt>
          <dd className="mt-2 text-ink-2">The wordmark's cap height on every side — the dashed box. Nothing sits inside it.</dd>
        </div>
        <div className="bg-raised p-5">
          <dt className="type-display text-h4 text-ink">Minimum size</dt>
          <dd className="mt-2 flex flex-wrap items-center gap-3 text-ink-2">
            <Logo className="text-[16px]" />
            <span>16px inline; the stacked wordmark never below 48px. Under that, the mark alone at 16px.</span>
          </dd>
        </div>
        <div className="bg-raised p-5">
          <dt className="type-display text-h4 text-ink">The record mark</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-2">
            <span className="grid size-11 shrink-0 place-items-center rounded-(--radius-field) bg-rust text-page">
              <RecordMark className="size-6" />
            </span>
            <span className="grid size-11 shrink-0 place-items-center rounded-(--radius-field) bg-panel text-ink">
              <RecordMark className="size-4" />
            </span>
            <span>An LP in its sleeve with the sun on the label. Always <code className="font-mono text-[12.58px]">currentColor</code>.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-3">
        <GroupLabel>Voice</GroupLabel>
        <div className="divide-y divide-line overflow-hidden rounded-(--radius-card) bg-raised text-[15px] shadow-(--shadow-card)">
          {VOICE.map((line) => (
            <div key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5 text-ink">
                <Check className="mt-1 size-4 shrink-0 text-moss" strokeWidth={2.4} />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-3">
                <X className="mt-1 size-4 shrink-0 text-rust" strokeWidth={2.4} />
                {line.dont}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Colour ──────────────────────────────────────────────────────────── */

type SwatchSpec = { name: string; token: string; className: string; role: string }

/** Class strings are written out whole so Tailwind generates them. */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Paper — the page, the shelf and the cards",
    swatches: [
      { name: "Page", token: "--color-page", className: "bg-page", role: "The page, every section" },
      { name: "Panel", token: "--color-panel", className: "bg-panel", role: "Bag shelves, the listening bar" },
      { name: "Panel deep", token: "--color-panel-deep", className: "bg-panel-deep", role: "Pressed panels, progress tracks" },
      { name: "Raised", token: "--color-raised", className: "bg-raised", role: "Cards, dialogs, the footer card" },
    ],
  },
  {
    label: "Ink — roasted brown, three readable steps",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Headlines and the claim" },
      { name: "Ink 2", token: "--color-ink-2", className: "bg-ink-2", role: "Body copy" },
      { name: "Ink 3", token: "--color-ink-3", className: "bg-ink-3", role: "Meta, labels (AA on panel)" },
      { name: "Ink 4", token: "--color-ink-4", className: "bg-ink-4", role: "Steam, disabled strokes" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { name: "Line", token: "--color-line", className: "bg-line", role: "Hairlines between shelf cells" },
      { name: "Line strong", token: "--color-line-strong", className: "bg-line-strong", role: "Inputs, outline buttons" },
    ],
  },
  {
    label: "Rust — the brand red",
    swatches: [
      { name: "Rust", token: "--color-rust", className: "bg-rust", role: "Primary button, footer frame, card hover" },
      { name: "Rust hover", token: "--color-rust-hover", className: "bg-rust-hover", role: "Its hover (HCT −8 tone)" },
      { name: "Rust press", token: "--color-rust-press", className: "bg-rust-press", role: "Its press (HCT −16 tone)" },
      { name: "Rust soft", token: "--color-rust-soft", className: "bg-rust-soft", role: "Record labels, selection tints" },
    ],
  },
  {
    label: "Ember — burnt orange",
    swatches: [
      { name: "Ember", token: "--color-ember", className: "bg-ember", role: "Large type, chips, the roast bar" },
      { name: "Ember ink", token: "--color-ember-ink", className: "bg-ember-ink", role: "Ember for small text" },
    ],
  },
  {
    label: "Honey, sky, moss and lilac — labels and stickers",
    swatches: [
      { name: "Honey", token: "--color-honey", className: "bg-honey", role: "House label, selection, the progress fill" },
      { name: "Honey soft", token: "--color-honey-soft", className: "bg-honey-soft", role: "Quiet highlights" },
      { name: "Sky", token: "--color-sky", className: "bg-sky", role: "Wholesale frame, quick view chips" },
      { name: "Sky display", token: "--color-sky-display", className: "bg-sky-display", role: "Sky for display type on cream" },
      { name: "Sky ink", token: "--color-sky-ink", className: "bg-sky-ink", role: "Sky for small text" },
      { name: "Sky soft", token: "--color-sky-soft", className: "bg-sky-soft", role: "Tinted panels" },
      { name: "Moss", token: "--color-moss", className: "bg-moss", role: "The tee, open-now light, success" },
      { name: "Moss soft", token: "--color-moss-soft", className: "bg-moss-soft", role: "Kenya label, success fills" },
      { name: "Lilac", token: "--color-lilac", className: "bg-lilac", role: "Natural-process labels" },
    ],
  },
  {
    label: "Night — the player, the bag and the small print",
    swatches: [
      { name: "Slate", token: "--color-slate", className: "bg-slate", role: "The music player" },
      { name: "Slate 2", token: "--color-slate-2", className: "bg-slate-2", role: "Rows inside the player" },
      { name: "Slate fg", token: "--color-slate-fg", className: "bg-slate-fg", role: "Text on slate" },
      { name: "Navy", token: "--color-navy", className: "bg-navy", role: "Every coffee bag" },
      { name: "Cocoa", token: "--color-cocoa", className: "bg-cocoa", role: "Overlays, code, the bottom bar" },
    ],
  },
  {
    label: "Hardware — the turntable, the tote and the pin",
    swatches: [
      { name: "Wood", token: "--color-wood", className: "bg-wood", role: "Turntable plinth, light edge" },
      { name: "Wood deep", token: "--color-wood-deep", className: "bg-wood-deep", role: "Plinth, shadowed edge" },
      { name: "Deck", token: "--color-deck", className: "bg-deck", role: "The deck plate" },
      { name: "Vinyl", token: "--color-vinyl", className: "bg-vinyl", role: "Platter mat" },
      { name: "Vinyl hi", token: "--color-vinyl-hi", className: "bg-vinyl-hi", role: "Record, centre of the sheen" },
      { name: "Vinyl lo", token: "--color-vinyl-lo", className: "bg-vinyl-lo", role: "Record, outer edge" },
      { name: "Chrome", token: "--color-chrome", className: "bg-chrome", role: "Tonearm base, labels on the deck" },
      { name: "Chrome hi", token: "--color-chrome-hi", className: "bg-chrome-hi", role: "Tonearm" },
      { name: "Chrome mid", token: "--color-chrome-mid", className: "bg-chrome-mid", role: "Platter rim" },
      { name: "Chrome low", token: "--color-chrome-low", className: "bg-chrome-low", role: "Pivot, counterweight" },
      { name: "Chrome off", token: "--color-chrome-off", className: "bg-chrome-off", role: "Start button at rest, idle light" },
      { name: "Canvas", token: "--color-canvas", className: "bg-canvas", role: "Natural tote canvas" },
      { name: "Canvas line", token: "--color-canvas-line", className: "bg-canvas-line", role: "Tote handles and seams" },
      { name: "Brass", token: "--color-brass", className: "bg-brass", role: "Enamel pin plating" },
      { name: "White", token: "--color-white", className: "bg-white", role: "Highlights and sheen in the SVGs" },
    ],
  },
  {
    label: "shadcn semantic names — pointed at the tokens above",
    swatches: [
      { name: "Background", token: "--background", className: "bg-background", role: "→ page" },
      { name: "Foreground", token: "--foreground", className: "bg-foreground", role: "→ ink" },
      { name: "Primary", token: "--primary", className: "bg-primary", role: "→ rust" },
      { name: "Secondary", token: "--secondary", className: "bg-secondary", role: "→ panel" },
      { name: "Muted fg", token: "--muted-foreground", className: "bg-muted-foreground", role: "→ ink 3" },
      { name: "Border", token: "--border", className: "bg-border", role: "→ line" },
      { name: "Input", token: "--input", className: "bg-input", role: "→ line strong" },
      { name: "Ring", token: "--ring", className: "bg-ring", role: "→ ember" },
    ],
  },
]

function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="overflow-hidden rounded-(--radius-card) bg-raised shadow-(--shadow-card)">
      <div ref={ref} className={cn("h-16 border-b border-line sm:h-20", className)} />
      <figcaption className="space-y-0.5 p-3.5 text-[13.5px]">
        <p className="font-medium text-ink">{name}</p>
        <p className="leading-snug text-ink-2">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-ink-3">{token}</p>
        <p className="font-mono text-[11px] text-ink-3 uppercase">{value ? toHex(value) : "—"}</p>
      </figcaption>
    </figure>
  )
}

function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Decorative only"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-(--radius-card) p-5 shadow-(--shadow-hairline)", className)}>
      <div className="min-w-0">
        <p className="type-display text-h3">Aa</p>
        <p className="mt-2 text-[13.5px]">{label}</p>
      </div>
      <p className="shrink-0 text-right font-mono text-[11.5px] tabular">
        {ratio == null ? "—" : `${ratio.toFixed(2)}:1`}
        <span className="block">{grade}</span>
      </p>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="space-y-10">
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
      <div>
        <GroupLabel>Text on its surface — WCAG 2 contrast, measured live</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <ContrastPair label="Ink on page" className="bg-page text-ink" />
          <ContrastPair label="Ink 2 on page (body)" className="bg-page text-ink-2" />
          <ContrastPair label="Ink 3 on page" className="bg-page text-ink-3" />
          <ContrastPair label="Ink 3 on panel" className="bg-panel text-ink-3" />
          <ContrastPair label="Rust on page (highlights)" className="bg-page text-rust" />
          <ContrastPair label="Ember on page (large type only)" className="bg-page text-ember" />
          <ContrastPair label="Ember ink on page (small text)" className="bg-page text-ember-ink" />
          <ContrastPair label="Sky display on page (large type)" className="bg-page text-sky-display" />
          <ContrastPair label="Sky ink on panel (small text)" className="bg-panel text-sky-ink" />
          <ContrastPair label="Page on rust (primary button)" className="bg-rust text-page" />
          <ContrastPair label="Ink on honey (honey chip)" className="bg-honey text-ink" />
          <ContrastPair label="Ink on sky (sky chip)" className="bg-sky text-ink" />
          <ContrastPair label="Slate fg on slate (player)" className="bg-slate text-slate-fg" />
          <ContrastPair label="Page on cocoa (small print)" className="bg-cocoa text-page" />
          <ContrastPair label="Moss on moss soft (success)" className="bg-moss-soft text-moss" />
        </div>
        <p className="mt-3 max-w-[64ch] text-[14px] text-ink-2">
          Ember and sky-display are for type at 26px and up, where AA large applies; below that, use ember ink and sky ink. Honey is never text on cream.
        </p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const FAMILIES = [
  { label: "Display — the voice", name: "Libre Caslon Condensed", className: "font-display", sample: "type-display text-h2", weights: "600 for headlines and the wordmark · condensed, tight, old-style" },
  { label: "Sans — reading", name: "Instrument Sans", className: "font-sans", sample: "text-h3 font-medium tracking-[-0.025em]", weights: "400 to read · 500 for emphasis, never bold" },
  { label: "Mono — labels and prices", name: "DM Mono", className: "font-mono", sample: "text-h3 tracking-[-0.03em]", weights: "400 · 500 in caps with +0.08em tracking: buttons, chips, prices" },
]

function FamilyCard({ label, name, className, sample, weights }: (typeof FAMILIES)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <Panel className="min-w-0 p-6">
      <div ref={ref} className={className}>
        <GroupLabel>{label}</GroupLabel>
        <p className={cn("break-words text-ink", sample)}>{name}</p>
        <p className="mt-4 text-[15px] break-words text-ink-2">
          Aa Bb Cc Dd Ee Ff Gg 0123456789
          <br />
          {weights}
        </p>
      </div>
      <p className="mt-4 font-mono text-[11px] break-words text-ink-3">{values["font-family"]}</p>
    </Panel>
  )
}

/** The scale, smallest first. Each class is a `--text-*` token in index.css
 *  carrying its own line-height and tracking. */
const SCALE = [
  { step: "micro", className: "text-micro type-label", text: "Sweetness · acidity · complexity", use: "Dial labels" },
  { step: "caption", className: "text-caption", text: "Roasted Tuesday · shipped the same day", use: "Captions, meta, hints" },
  { step: "body", className: "text-body", text: "Bloom for forty seconds, pour in circles, flip the record.", use: "Running text" },
  { step: "lead", className: "text-lead", text: "Fresh bags on your doorstep every other week.", use: "Ledes, hero captions" },
  { step: "h4", className: "text-h4 type-display", text: "Liner Notes", use: "Card names, plan names" },
  { step: "h3", className: "text-h3 type-display", text: "The Pressing Plant", use: "Bar names, dialog titles" },
  { step: "h2", className: "text-h2 type-display", text: "Rep the house band!", use: "Section headlines" },
  { step: "h1", className: "text-h1 type-display", text: "Never hear the last track.", use: "Big section moments, chapters" },
  { step: "display", className: "text-display type-display", text: "Come say hi.", use: "The loud closers" },
  { step: "mega", className: "text-mega type-display", text: "Side B", use: "The hero wordmark" },
]

/** The whole scale read in one pass, so each step shows its ratio to the
 *  one before — the golden ratio is checked here, not just claimed. */
function TypeScale() {
  const refs = useRef<(HTMLParagraphElement | null)[]>([])
  const [rows, setRows] = useState<{ size: number; line: string; tracking: string; weight: string }[]>([])

  useLayoutEffect(() => {
    const read = () =>
      setRows(
        refs.current.map((element) => {
          if (!element) return { size: 0, line: "", tracking: "", weight: "" }
          const style = getComputedStyle(element)
          const size = parseFloat(style.fontSize)
          const lineHeight = parseFloat(style.lineHeight)
          return {
            size,
            line: Number.isFinite(lineHeight) ? (lineHeight / size).toFixed(2) : style.lineHeight,
            tracking: trackingEm(style.letterSpacing, style.fontSize),
            weight: style.fontWeight,
          }
        }),
      )
    read()
    document.fonts?.ready.then(read)
    window.addEventListener("resize", read)
    return () => window.removeEventListener("resize", read)
  }, [])

  return (
    <Panel className="overflow-hidden">
      {SCALE.map((sample, i) => {
        const row = rows[i]
        const prev = rows[i - 1]
        const ratio = row && prev && prev.size ? row.size / prev.size : null
        return (
          <div key={sample.step} className="grid gap-3 border-b border-line px-5 py-6 last:border-b-0 sm:px-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
            <div className="text-[13.5px]">
              <p className="font-medium text-ink">
                {sample.step} <span className="font-mono text-[11px] font-normal text-ink-3">text-{sample.step}</span>
              </p>
              <p className="mt-1 text-ink-2">{sample.use}</p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-3 tabular">
                {row ? `${row.size.toFixed(2)}px / ${row.line} · ${row.weight}` : "—"}
                <br />
                {row ? `tracking ${row.tracking}` : ""}
                {ratio ? ` · ×${ratio.toFixed(3)}` : ""}
              </p>
            </div>
            <p
              ref={(element) => {
                refs.current[i] = element
              }}
              className={cn("min-w-0 break-words text-ink", sample.className)}
            >
              {sample.text}
            </p>
          </div>
        )
      })}
    </Panel>
  )
}

export function Typography() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 lg:grid-cols-3">
        {FAMILIES.map((family) => (
          <FamilyCard key={family.name} {...family} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="p-6 lg:col-span-2">
          <GroupLabel>The golden-ratio scale</GroupLabel>
          <p className="text-[16px] text-ink-2">
            Every step is the one before × <span className="font-mono text-ink">1.272</span> (√φ), so every second step is ×{" "}
            <span className="font-mono text-ink">1.618</span> (φ): 9.9 → 12.6 → 16 → 20.4 → 25.9 → 32.9 → 41.9 → 53.3 → 87.2 → 141 → 228. From h2 up the sizes are
            fluid (<code className="font-mono text-[12.58px]">clamp()</code>) and land on their φ value on a wide window — the ratios below are measured at this
            window's width.
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Negative tracking</GroupLabel>
          <p className="text-[16px] text-ink-2">
            Tracking tightens as type grows — <span className="font-mono text-ink">−0.005em</span> at body to <span className="font-mono text-ink">−0.055em</span> at mega —
            so the condensed serif sets as one loud shape.
          </p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Scale — read live off each sample</GroupLabel>
        <TypeScale />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel className="min-w-0 p-6">
          <GroupLabel>Numerals — mono, tabular: prices, times, counts</GroupLabel>
          <p className="font-mono text-h3 leading-tight tracking-[-0.03em] text-ink tabular">
            $19.00 · 12 oz
            <br />
            <span className="text-ember-ink">3:30 · 11:40</span>
          </p>
        </Panel>
        <Panel className="min-w-0 p-6">
          <GroupLabel>Numerals — serif, as a headline figure</GroupLabel>
          <p className="type-display text-display text-ink tabular">21 days</p>
        </Panel>
      </div>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACING = [
  { step: "1 · 4px", className: "w-1" },
  { step: "2 · 8px", className: "w-2" },
  { step: "3 · 12px", className: "w-3" },
  { step: "4 · 16px", className: "w-4" },
  { step: "6 · 24px", className: "w-6" },
  { step: "8 · 32px", className: "w-8" },
  { step: "12 · 48px", className: "w-12" },
  { step: "16 · 64px", className: "w-16" },
  { step: "gutter", className: "w-(--spacing-gutter)" },
  { step: "section", className: "w-(--spacing-section)" },
]

function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[5.5rem_4.5rem_minmax(0,1fr)] items-center gap-3 py-2 text-[13px]">
      <span className="font-mono text-[11.5px] text-ink-3">{step}</span>
      <span className="font-mono text-[11.5px] text-ink-2 tabular">{values.width}</span>
      <div ref={ref} className={cn("h-3 max-w-full rounded-[2px] bg-ember", className)} />
    </li>
  )
}

const RADII = [
  { name: "chip", className: "rounded-(--radius-chip)", use: "Visit-us tag, photo tiles" },
  { name: "button", className: "rounded-(--radius-button)", use: "Every button — printed labels" },
  { name: "field", className: "rounded-(--radius-field)", use: "Inputs, menu rows" },
  { name: "card", className: "rounded-(--radius-card)", use: "Bag panels, photos" },
  { name: "panel", className: "rounded-(--radius-panel)", use: "Dialogs, footer card, player" },
  { name: "frame", className: "rounded-(--radius-frame)", use: "The turntable's frame" },
]

function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="text-[13.5px]">
      <div ref={ref} className={cn("h-20 border border-line-strong bg-panel", className)} />
      <figcaption className="mt-2">
        <span className="font-medium text-ink">{name}</span> <span className="font-mono text-[11px] text-ink-3">{values["border-top-left-radius"]}</span>
        <span className="block text-ink-2">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "hairline", className: "shadow-(--shadow-hairline)", use: "Grids drawn by a ring", dark: false },
  { name: "xs", className: "shadow-(--shadow-xs)", use: "Chips, small controls, arrows", dark: false },
  { name: "card", className: "shadow-(--shadow-card)", use: "Cards, photos, the footer card", dark: false },
  { name: "float", className: "shadow-(--shadow-float)", use: "Plan cards, the turntable frame", dark: false },
  { name: "lift", className: "shadow-(--shadow-lift)", use: "Dialogs, the shop menu", dark: false },
  { name: "bag", className: "shadow-(--shadow-bag)", use: "A bag standing on the shelf", dark: false },
  { name: "button", className: "shadow-(--shadow-button) bg-rust", use: "Filled buttons — a shaded lower edge", dark: false },
  { name: "player", className: "shadow-(--shadow-player) bg-slate", use: "The music player", dark: false },
]

function ShadowSample({ name, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="rounded-(--radius-card) bg-panel p-5 text-[13.5px]">
      <div ref={ref} className={cn("h-20 rounded-(--radius-card) bg-raised", className)} />
      <figcaption className="mt-4">
        <span className="font-medium text-ink">{name}</span>
        <span className="block text-ink-2">{use}</span>
        <span className="mt-1 block font-mono text-[10.5px] break-all text-ink-3">{cleanShadow(values["box-shadow"])}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-line bg-raised", use: "Shelf cells, header, dividers" },
  { name: "Strong", className: "border border-line-strong bg-raised", use: "Inputs, outline buttons" },
  { name: "Dashed", className: "border border-dashed border-ink-4 bg-panel", use: "Clear space on the logo" },
  { name: "Frame", className: "border-[6px] border-rust bg-panel", use: "The footer's rust frame" },
]

function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-width", "border-top-color", "border-top-style"])
  return (
    <figure className="text-[13.5px]">
      <div ref={ref} className={cn("h-16 rounded-(--radius-card)", className)} />
      <figcaption className="mt-2">
        <span className="font-medium text-ink">{name}</span>
        <span className="block text-ink-2">{use}</span>
        <span className="mt-1 block font-mono text-[10.5px] break-all text-ink-3">
          {values["border-top-width"]} {values["border-top-style"]} {values["border-top-color"] ? toHex(values["border-top-color"]) : ""}
        </span>
      </figcaption>
    </figure>
  )
}

/** The bag's drop shadow is a `filter`, so it follows the pouch's outline. */
function DropBagSample() {
  const [ref, values] = useComputed<HTMLDivElement>(["filter"])
  return (
    <figure className="rounded-(--radius-card) bg-panel p-5 text-[13.5px]">
      <div className="grid h-20 place-items-center">
        <div ref={ref} className="h-16 w-12 rounded-t-[4px] rounded-b-[6px] bg-navy [filter:var(--drop-bag)]" />
      </div>
      <figcaption className="mt-4">
        <span className="font-medium text-ink">drop-bag</span>
        <span className="block text-ink-2">A filter drop-shadow under every bag SVG</span>
        <span className="mt-1 block font-mono text-[10.5px] break-all text-ink-3">{values.filter}</span>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          <GroupLabel>Spacing — a 4px grid, plus two fluid tokens</GroupLabel>
          <Panel className="overflow-hidden px-5 py-3">
            <ul>
              {SPACING.map((step) => (
                <SpacingStep key={step.step} {...step} />
              ))}
            </ul>
          </Panel>
          <p className="mt-3 text-[14px] text-ink-2">
            <code className="font-mono text-[12px]">--spacing-gutter</code> is the side margin and the padding in every shelf cell;{" "}
            <code className="font-mono text-[12px]">--spacing-section</code> is the rhythm between sections. Both are fluid — these are this window's values.
          </p>
        </div>
        <div className="min-w-0">
          <GroupLabel>Radii — square shoulders on labels, soft on cards</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — soft, warm, layered; never one hard drop</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
          <DropBagSample />
        </div>
      </div>
      <div>
        <GroupLabel>Borders — 1px hairlines, one rust frame</GroupLabel>
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

type MotionSpec = { name: string; where: string; timing: string; keyframes: Keyframe[] }

const MOTION: MotionSpec[] = [
  {
    name: "Press · ease-out-strong",
    where: "Every button and toggle sinks to 0.97 under the finger",
    timing: "duration-(--duration-press) ease-(--ease-out-strong)",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Hover · ease-out-strong",
    where: "A bag lifts 6px and tips 2° off the shelf",
    timing: "duration-(--duration-hover) ease-(--ease-out-strong)",
    keyframes: [{ transform: "translateY(0) rotate(0deg)" }, { transform: "translateY(-6px) rotate(-2deg)" }],
  },
  {
    name: "Swap · ease-out-strong",
    where: "Track numbers flipping, sent states arriving",
    timing: "duration-(--duration-swap) ease-(--ease-out-strong)",
    keyframes: [
      { transform: "translateY(60%)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
    ],
  },
  {
    name: "Scene · ease-out-strong",
    where: "The hero wordmark rising out of its mask",
    timing: "duration-(--duration-scene) ease-(--ease-out-strong)",
    keyframes: [{ transform: "translateY(105%)" }, { transform: "translateY(0)" }],
  },
  {
    name: "Crossfade · ease-in-out",
    where: "Hero clips and carousel photos changing",
    timing: "duration-(--duration-crossfade) ease-in-out",
    keyframes: [{ opacity: 1 }, { opacity: 0.1 }, { opacity: 1 }],
  },
  {
    name: "Drawer · ease-drawer",
    where: "The cart and the mobile menu sliding in",
    timing: "duration-(--duration-swap) ease-(--ease-drawer)",
    keyframes: [{ transform: "translateX(110%)" }, { transform: "translateX(0)" }],
  },
]

/** Plays one of the page's motions through the Web Animations API, with the
 *  duration and curve read off the sample's own transition. */
function MotionSample({ name, where, timing, keyframes }: MotionSpec) {
  const target = useRef<HTMLDivElement>(null)
  const [ref, values] = useComputed<HTMLDivElement>(["transition-duration", "transition-timing-function"])
  const raw = values["transition-duration"] ?? ""
  const duration = parseFloat(raw || "0") * (raw.endsWith("ms") ? 1 : 1000)
  const easing = values["transition-timing-function"] || "ease-out"
  const play = () => {
    const element = target.current
    if (!element) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    element.getAnimations().forEach((animation) => animation.cancel())
    element.animate(keyframes, { duration: reduced ? 1 : duration, easing })
  }
  return (
    <Panel className="flex flex-col p-5">
      <div ref={ref} className={cn("flex h-24 items-center justify-center overflow-hidden rounded-(--radius-field) bg-panel px-4", timing)}>
        <div ref={target} className="h-12 w-full max-w-[150px] rounded-(--radius-button) bg-rust shadow-(--shadow-button)" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 text-[13.5px]">
        <div className="min-w-0">
          <p className="font-medium text-ink">{name}</p>
          <p className="mt-1 text-ink-2">{where}</p>
          <p className="mt-1 font-mono text-[10.5px] break-all text-ink-3">
            {raw} · {easing}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${name}`}
          className="type-label inline-flex h-9 shrink-0 items-center gap-1.5 rounded-(--radius-button) bg-raised px-3 text-[11px] text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-panel active:scale-[0.97]"
        >
          <Play className="size-3 fill-current" />
          Play
        </button>
      </div>
    </Panel>
  )
}

/** A CSS keyframe loop from the page, running, with its values read off it. */
function LoopSample({ name, where, className, children }: { name: string; where: string; className: string; children?: ReactNode }) {
  const [ref, values] = useComputed<HTMLDivElement>(["animation-name", "animation-duration", "animation-timing-function"])
  return (
    <Panel className="p-5">
      <div className="relative h-28 overflow-hidden rounded-(--radius-field) bg-panel">
        <div ref={ref} className={className}>
          {children}
        </div>
      </div>
      <p className="mt-4 font-medium text-ink">{name}</p>
      <p className="mt-1 text-[13.5px] text-ink-2">{where}</p>
      <p className="mt-1 font-mono text-[10.5px] break-all text-ink-3">
        {values["animation-name"]} · {values["animation-duration"]} · {values["animation-timing-function"]}
      </p>
    </Panel>
  )
}

export function Motion() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <div>
        <GroupLabel>Keyframes — CSS, so reduced motion and the editor stop them</GroupLabel>
        <div className="grid gap-4 md:grid-cols-3">
          <LoopSample name="Marquee" where="The photo strip in the footer" className="absolute inset-y-0 left-0 flex w-max animate-marquee items-center [--marquee-duration:14s] motion-reduce:animate-none">
            {[0, 1].map((half) => (
              <span key={half} className="flex shrink-0 gap-2 pr-2" aria-hidden={half === 1}>
                {[PHOTOS.storefrontTree, PHOTOS.crates, PHOTOS.latteTable, PHOTOS.beanie].map((id) => (
                  <img key={id} src={photo(id, 160)} alt="" className="size-16 rounded-(--radius-chip) object-cover" loading="lazy" />
                ))}
              </span>
            ))}
          </LoopSample>
          <LoopSample name="Record spin" where="33⅓ on the turntable; stickers at 18s a turn" className="absolute inset-0 grid place-items-center">
            <span className="grid size-20 animate-spin-record place-items-center rounded-full bg-cocoa">
              <span className="grid size-8 place-items-center rounded-full bg-honey">
                <span className="size-1.5 rounded-full bg-cocoa" />
              </span>
              <span className="absolute top-3 left-1/2 h-3 w-[2px] rounded-full bg-page/30" />
            </span>
          </LoopSample>
          <LoopSample name="Steam" where="Rising off the mug, on a loop" className="absolute inset-0 grid place-items-center">
            <svg viewBox="0 0 60 40" className="h-16 w-24 text-ink-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <g className="animate-steam" style={{ transformOrigin: "30px 30px" }}>
                <path d="M18 34 Q12 24 18 14" />
                <path d="M30 34 Q24 22 30 10" />
                <path d="M42 34 Q36 26 42 18" />
              </g>
            </svg>
          </LoopSample>
        </div>
      </div>
      <div className="grid gap-3 text-[14px] text-ink-2 sm:grid-cols-3">
        <Panel className="p-5">
          <span className="font-medium text-ink">Springs</span> for things that pop — the kettle's speech bubble at <code className="font-mono text-[12px]">bounce 0.25</code>, the cart count
          hopping 1.25×. Never more.
        </Panel>
        <Panel className="p-5">
          <span className="font-medium text-ink">Scroll</span> is Lenis at <code className="font-mono text-[12px]">lerp 0.09</code>, held in a ref so the editor can pause it.
          The manifesto inks in and the farm-to-cup story pins against it.
        </Panel>
        <Panel className="p-5">
          <span className="font-medium text-ink">Reduced motion</span> is read from the media query: the hero shows a still, the story swaps without travel, records stop
          turning, Lenis is never created.
        </Panel>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [ShoppingBag, Menu, ArrowUpRight, ArrowDown, ChevronLeft, ChevronRight, Plus, Minus, X, Check, Clock, Mail, AtSign]
const MEDIA_ICONS = [Play, Pause, SkipBack, SkipForward, Heart, Disc3, Music2, Mic, Sprout]
const DOODLES: DoodleName[] = ["cup", "boombox", "kettle", "record", "crate", "bike", "bean", "sun"]

export function Iconography() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Interface — Lucide, 16px, 1.6–1.7 stroke</GroupLabel>
          <div className="flex flex-wrap gap-2">
            {ICONS.map((Icon, i) => (
              <span key={i} className="grid size-10 place-items-center rounded-(--radius-field) bg-panel text-ink">
                <Icon className="size-4" strokeWidth={1.7} />
              </span>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-2">currentColor, always beside a word or with an aria-label. Arrows nudge 2px toward where they go.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Media and the board — Lucide, filled where they're pressed</GroupLabel>
          <div className="flex flex-wrap gap-2">
            {MEDIA_ICONS.map((Icon, i) => (
              <span key={i} className="grid size-10 place-items-center rounded-(--radius-field) bg-slate text-slate-fg">
                <Icon className="size-4" strokeWidth={1.7} />
              </span>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-2">Transport icons are filled on the player; board icons sit in ember beside a headline. No emoji as icons.</p>
        </Panel>
      </div>
      <Panel className="p-6">
        <GroupLabel>Doodles — hand-drawn, one stroke weight, they draw themselves in</GroupLabel>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {DOODLES.map((name) => (
            <figure key={name} className="flex flex-col items-center gap-2 rounded-(--radius-field) bg-panel p-4">
              <Doodle name={name} className="w-20" />
              <figcaption className="font-mono text-[11px] text-ink-3">{name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-[14px] text-ink-2">
          <code className="font-mono text-[12px]">{"<Doodle name=\"kettle\" />"}</code> — traced in over 1.1s the first time it scrolls into view, tilts 6° on hover. One per section, leaning on a
          headline's last word or sitting in a corner. The record mark <RecordMark className="inline size-4 align-[-3px]" /> is the only drawn logo.
        </p>
      </Panel>
      <div>
        <GroupLabel>Photography — Pexels; warm, low light, people at work, real counters</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { id: PHOTOS.barInterior, alt: "A barista behind the counter", note: "Bars in warm tungsten light, mid-pour — never empty, never posed." },
            { id: PHOTOS.cherriesBasket, alt: "Coffee cherries in a basket", note: "The farm close-up and in daylight: hands, cherries, drying beds." },
            { id: PHOTOS.crateDig, alt: "Hands flicking through records", note: "Records in use, not styled flat-lays. Card radius, no border, soft card shadow." },
          ].map((p) => (
            <figure key={p.id} className="text-[13.5px]">
              <img src={photo(p.id, 900)} alt={p.alt} className="aspect-[4/3] w-full rounded-(--radius-card) object-cover shadow-(--shadow-card)" loading="lazy" />
              <figcaption className="mt-2 text-ink-2">{p.note}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-[14px] text-ink-2">
          Over a photo, type sits on a cocoa gradient from the corner it's set in — never a flat black scrim. Product shots are drawn, not photographed: every bag and every piece of merch is an SVG.
        </p>
      </div>
    </div>
  )
}
