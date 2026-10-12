import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  LoaderCircle,
  Menu,
  Minus,
  Play,
  Plus,
  Search,
  X,
} from "lucide-react"
import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { cleanShadow, contrast, toHex, trackingEm, useComputed } from "@/components/brand/read-style"
import { GroupLabel, Panel } from "@/components/brand/specimen"
import { BookObject } from "@/components/mock/book-object"
import { PrintStack, Slipcase } from "@/components/mock/product-visual"
import { Monogram, Wordmark } from "@/components/site/logo"
import { PHOTOS, photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  {
    do: "Begin with the person: “Saoirse makes the same plate four hundred times, in a converted dairy.”",
    dont: "Begin with the product: “Discover our premium handcrafted collection.”",
  },
  {
    do: "Be specific — the wood, the town, the hours: “Reclaimed elm, still smelling faintly of diesel.”",
    dont: "Reach for an adjective: “Stunning, authentic, artisanal.”",
  },
  {
    do: "Calm and plain. A full stop. Let the photograph do the shouting.",
    dont: "Exclamation marks, urgency, “Don’t miss out!”, emoji.",
  },
  {
    do: "The shop speaks the same way: “296 pages, sewn binding, shipping now.”",
    dont: "Sales talk in a story, or a story turned into an advert.",
  },
]

/** The wordmark on a ground, with its clear space drawn as a dashed box. */
function LogoGround({ tone, children, label }: { tone: "page" | "sheet" | "night"; children: ReactNode; label: string }) {
  return (
    <figure>
      <div
        className={cn(
          "flex h-56 items-center justify-center",
          tone === "page" && "bg-page text-ink shadow-(--shadow-hairline)",
          tone === "sheet" && "bg-sheet text-ink",
          tone === "night" && "bg-night text-night-fg",
        )}
      >
        {/* Clear space: the height of the "O" on every side. */}
        <div className={cn("p-[24px] outline-1 outline-dashed", tone === "night" ? "outline-night-line" : "outline-ink-4")}>{children}</div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-ink-3">{label}</figcaption>
    </figure>
  )
}

export function BrandIdentity() {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        <LogoGround tone="page" label="Wordmark · on paper — primary">
          <Wordmark className="text-[34px] leading-[0.92]" />
        </LogoGround>
        <LogoGround tone="night" label="Wordmark · on night — the letters band">
          <Wordmark className="text-[34px] leading-[0.92]" />
        </LogoGround>
        <LogoGround tone="sheet" label="Monogram · once the page moves">
          <Monogram className="text-[44px] leading-none" />
        </LogoGround>
      </div>
      <dl className="grid gap-px bg-line shadow-(--shadow-hairline) sm:grid-cols-3">
        <div className="bg-raised p-5">
          <dt className="type-title text-[15px] text-ink">Clear space</dt>
          <dd className="mt-2 font-serif text-[15px] text-ink-2">The height of the “O” on every side — the dashed box. Nothing sits inside it, not even a rule.</dd>
        </div>
        <div className="bg-raised p-5">
          <dt className="type-title text-[15px] text-ink">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-4 font-serif text-[15px] text-ink-2">
            <Wordmark className="shrink-0 text-[16px] leading-[0.92] text-ink" />
            <span>16px for the two-line wordmark. Smaller than that, use the monogram.</span>
          </dd>
        </div>
        <div className="bg-raised p-5">
          <dt className="type-title text-[15px] text-ink">How it is set</dt>
          <dd className="mt-2 font-serif text-[15px] text-ink-2">
            Newsreader, regular, two lines, leading 0.92, tracking −0.025em — the way it sits on the cover. Always <code className="font-mono text-[12.58px]">currentColor</code>; never
            outlined, never in a colour of its own.
          </dd>
        </div>
      </dl>
      <div>
        <GroupLabel>Voice — about people, not products</GroupLabel>
        <div className="divide-y divide-line bg-raised shadow-(--shadow-hairline)">
          {VOICE.map((line) => (
            <div key={line.do} className="grid gap-3 p-5 font-serif text-[16px] sm:grid-cols-2 sm:gap-8">
              <p className="flex gap-3 text-ink">
                <Check className="mt-1 size-4 shrink-0 text-moss" strokeWidth={2.2} />
                <span>{line.do}</span>
              </p>
              <p className="flex gap-3 text-ink-3">
                <X className="mt-1 size-4 shrink-0 text-clay" strokeWidth={2.2} />
                <span>{line.dont}</span>
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

/** Class strings are written out whole so Tailwind generates them (and so
 *  emits the variable each swatch reads). */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Paper — unbleached, never white",
    swatches: [
      { name: "Page", token: "--color-page", className: "bg-page", role: "The page, every section" },
      { name: "Sheet", token: "--color-sheet", className: "bg-sheet", role: "A deeper leaf: chips, quiet buttons" },
      { name: "Stone", token: "--color-stone", className: "bg-stone", role: "The band the shop sits on" },
      { name: "Stone deep", token: "--color-stone-deep", className: "bg-stone-deep", role: "Pressed stone, the product stage" },
      { name: "Raised", token: "--color-raised", className: "bg-raised", role: "Cards, postcards, prints" },
    ],
  },
  {
    label: "Ink — the hierarchy lives in greys",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Headlines, body on paper" },
      { name: "Ink 2", token: "--color-ink-2", className: "bg-ink-2", role: "Running text, blurbs" },
      { name: "Ink 3", token: "--color-ink-3", className: "bg-ink-3", role: "Places, meta, captions" },
      { name: "Ink 4", token: "--color-ink-4", className: "bg-ink-4", role: "Placeholders, decoration" },
    ],
  },
  {
    label: "Rules",
    swatches: [
      { name: "Rule", token: "--color-rule", className: "bg-rule", role: "The 1px line under a section title" },
      { name: "Line", token: "--color-line", className: "bg-line", role: "Hairlines, dividers" },
      { name: "Line strong", token: "--color-line-strong", className: "bg-line-strong", role: "Accordion rules, switch track" },
    ],
  },
  {
    label: "Materials — read off the volumes",
    swatches: [
      { name: "Timber", token: "--color-timber", className: "bg-timber", role: "The table, a badge" },
      { name: "Timber deep", token: "--color-timber-deep", className: "bg-timber-deep", role: "Its shadow side" },
      { name: "Kraft", token: "--color-kraft", className: "bg-kraft", role: "Board, envelopes, selection" },
      { name: "Cloth", token: "--color-cloth", className: "bg-cloth", role: "Charcoal cloth binding" },
      { name: "Moss", token: "--color-moss", className: "bg-moss", role: "Moss cloth, stamps, success" },
      { name: "Clay", token: "--color-clay", className: "bg-clay", role: "Clay cloth, postmarks, errors" },
      { name: "Clay soft", token: "--color-clay-soft", className: "bg-clay-soft", role: "Error text on night" },
    ],
  },
  {
    label: "Night — the letters band and the footer’s last line",
    swatches: [
      { name: "Night", token: "--color-night", className: "bg-night", role: "Letters band, code" },
      { name: "Night 2", token: "--color-night-2", className: "bg-night-2", role: "Controls on night" },
      { name: "Night line", token: "--color-night-line", className: "bg-night-line", role: "Rules on night" },
      { name: "Night fg", token: "--color-night-fg", className: "bg-night-fg", role: "Text on night" },
      { name: "Night muted", token: "--color-night-muted", className: "bg-night-muted", role: "Secondary text on night" },
    ],
  },
  {
    label: "shadcn semantic names — pointed at the tokens above",
    swatches: [
      { name: "Background", token: "--background", className: "bg-background", role: "→ page" },
      { name: "Foreground", token: "--foreground", className: "bg-foreground", role: "→ ink" },
      { name: "Primary", token: "--primary", className: "bg-primary", role: "→ ink" },
      { name: "Secondary", token: "--secondary", className: "bg-secondary", role: "→ sheet" },
      { name: "Muted fg", token: "--muted-foreground", className: "bg-muted-foreground", role: "→ ink 3" },
      { name: "Accent", token: "--accent", className: "bg-accent", role: "→ sheet (hover surface)" },
      { name: "Destructive", token: "--destructive", className: "bg-destructive", role: "→ clay" },
      { name: "Border", token: "--border", className: "bg-border", role: "→ line" },
      { name: "Input", token: "--input", className: "bg-input", role: "→ line strong" },
      { name: "Ring", token: "--ring", className: "bg-ring", role: "→ ink 3" },
    ],
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="bg-raised shadow-(--shadow-hairline)">
      <div ref={ref} className={cn("h-16 border-b border-line sm:h-20", className)} />
      <figcaption className="space-y-0.5 p-3.5">
        <p className="type-title text-[14px] text-ink">{name}</p>
        <p className="font-serif text-[14px] leading-snug text-ink-2">{role}</p>
        <p className="pt-1.5 font-mono text-[11px] break-all text-ink-3">{token}</p>
        <p className="font-mono text-[11px] text-ink-3 uppercase">{value ? toHex(value) : "—"}</p>
      </figcaption>
    </figure>
  )
}

export function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large only" : "Decoration only"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 p-5 shadow-(--shadow-hairline)", className)}>
      <div className="min-w-0">
        <p className="type-display text-h3">Aa</p>
        <p className="mt-2 font-sans text-[13px]">{label}</p>
      </div>
      <p className="shrink-0 text-right font-mono text-[11.5px] tabular-nums">
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
      <div>
        <GroupLabel>Text on its surface — WCAG 2 contrast, measured live</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <ContrastPair label="Ink on page" className="bg-page text-ink" />
          <ContrastPair label="Ink 2 on page — running text" className="bg-page text-ink-2" />
          <ContrastPair label="Ink 3 on page — places, meta" className="bg-page text-ink-3" />
          <ContrastPair label="Ink 4 on page — placeholders" className="bg-page text-ink-4" />
          <ContrastPair label="Ink 2 on sheet" className="bg-sheet text-ink-2" />
          <ContrastPair label="Ink 3 on sheet" className="bg-sheet text-ink-3" />
          <ContrastPair label="Ink on stone" className="bg-stone text-ink" />
          <ContrastPair label="Ink 2 on stone — the floor for small text" className="bg-stone text-ink-2" />
          <ContrastPair label="Ink 3 on stone — large only" className="bg-stone text-ink-3" />
          <ContrastPair label="Page on ink — the ink button" className="bg-ink text-page" />
          <ContrastPair label="Page on timber — badge" className="bg-timber text-page" />
          <ContrastPair label="Page on moss — badge, stamp" className="bg-moss text-page" />
          <ContrastPair label="Night fg on night" className="bg-night text-night-fg" />
          <ContrastPair label="Night muted on night" className="bg-night text-night-muted" />
          <ContrastPair label="Clay soft on night — errors" className="bg-night text-clay-soft" />
        </div>
        <p className="mt-4 max-w-[64ch] font-serif text-[16px] text-ink-2">
          Ink 1–3 pass AA on page and sheet. On stone, small text stops at ink 2 — ink 3 is kept for type set large enough for AA large. Ink 4 never carries
          words a reader needs.
        </p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const FAMILIES = [
  {
    label: "Serif — reading and headlines",
    name: "Newsreader",
    className: "font-serif",
    sample: "type-display text-h2",
    weights: "400 for everything, italic for asides and the grey half of a title · optical sizing on, 6–72",
  },
  {
    label: "Grotesk — titles, labels, controls",
    name: "Inter Tight",
    className: "font-sans",
    sample: "type-title text-h2 tracking-[-0.03em]",
    weights: "400 · 500 for section titles and buttons · small caps tracked +0.08em",
  },
]

export function FamilyCard({ label, name, className, sample, weights }: (typeof FAMILIES)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <Panel className="p-6">
      <GroupLabel>{label}</GroupLabel>
      <div ref={ref} className={className}>
        <p className={cn("break-words text-ink", sample)}>{name}</p>
        <p className="mt-4 text-[16px] break-words text-ink-2">
          Aa Bb Cc Dd Ee Ff Gg Hh <span className="italic">Ii Jj Kk</span> 0123456789
        </p>
        <p className="mt-2 text-[14px] text-ink-3">{weights}</p>
      </div>
      <p className="mt-4 font-mono text-[11px] break-words text-ink-3">{values["font-family"]}</p>
    </Panel>
  )
}

/** The scale, smallest first. Each class is a `--text-*` token in index.css
 *  with its own line-height and tracking. */
const SCALE = [
  { step: "label", className: "text-label type-label", text: "Valparaíso, CL · Volume 3", use: "Small caps: places, tags, “View more”" },
  { step: "caption", className: "text-caption font-sans", text: "Photographed on film over three days in March.", use: "Captions, footnotes" },
  { step: "body", className: "text-body font-serif", text: "The kitchen came first. Before there was a bed upstairs, there was a table downstairs.", use: "Running text" },
  { step: "lead", className: "text-lead font-serif", text: "A cook, a furniture restorer and a house on a hill.", use: "Ledes, blurbs, answers" },
  { step: "h4", className: "text-h4 type-display", text: "Selected Stories", use: "Serif section heads" },
  { step: "h3", className: "text-h3 type-display", text: "Twelve people at the water’s edge", use: "Dialog titles, sub-heads" },
  { step: "h2", className: "text-h2 type-display", text: "The lives of people who make things", use: "Section headlines" },
  { step: "h1", className: "text-h1 type-display", text: "Salt & Timber", use: "Page titles, chapters here" },
  { step: "display", className: "text-display type-display", text: "Slow hands.", use: "The letters band, heroes" },
  { step: "mega", className: "text-mega type-display", text: "Volume 3", use: "Pinned story moments" },
  { step: "colossal", className: "text-colossal type-display", text: "Clay.", use: "The one word a page is about" },
  { step: "masthead", className: "text-masthead type-display", text: "Ordinary", use: "The name, edge to edge in the footer" },
]

/**
 * The whole scale read in one pass, so each step can show its ratio to the
 * one before — the golden ratio is a claim this table checks rather than
 * repeats.
 */
export function TypeScale() {
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
            <div>
              <p className="type-title text-[14px] text-ink">
                {sample.step} <span className="font-mono text-[11px] font-normal text-ink-3">text-{sample.step}</span>
              </p>
              <p className="mt-1 font-serif text-[14px] text-ink-2">{sample.use}</p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-3 tabular-nums">
                {row ? `${row.size.toFixed(2)}px / ${row.line} · ${row.weight}` : "—"}
                <br />
                {row ? `tracking ${row.tracking}` : ""}
                {ratio ? ` · ×${ratio.toFixed(3)}` : ""}
              </p>
            </div>
            <div className="min-w-0 overflow-x-clip py-1">
              <p
                ref={(element) => {
                  refs.current[i] = element
                }}
                className={cn("break-words text-ink", sample.className)}
              >
                {sample.text}
              </p>
            </div>
          </div>
        )
      })}
    </Panel>
  )
}

export function Typography() {
  return (
    <div className="space-y-12">
      <div className="grid gap-4 md:grid-cols-2">
        {FAMILIES.map((family) => (
          <FamilyCard key={family.name} {...family} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="p-6 lg:col-span-2">
          <GroupLabel>The golden-ratio scale</GroupLabel>
          <p className="font-serif text-[16px] text-ink-2">
            Each step is the one before × <span className="font-mono text-[14px] text-ink">1.272</span> (√φ), so every second step is ×{" "}
            <span className="font-mono text-[14px] text-ink">1.618</span> (φ): 16 → 25.9 → 41.9 → 67.8 → 109.7 → 177.4, with 20.4, 32.9, 53.3 and 86.2 between.
            From h2 up the sizes are fluid (<code className="font-mono text-[12.58px]">clamp()</code>) and land on their φ value at full width — so the ratios
            below hold exactly on a wide window and close up on a narrow one.
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Negative tracking</GroupLabel>
          <p className="font-serif text-[16px] text-ink-2">
            Tracking tightens as size grows — <span className="font-mono text-[14px] text-ink">−0.004em</span> at body to{" "}
            <span className="font-mono text-[14px] text-ink">−0.06em</span> at colossal — so oversized type sets as one shape, the way it does on a cover.
          </p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Scale — read live off each sample at this window’s width</GroupLabel>
        <TypeScale />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Numerals — the serif, in running text</GroupLabel>
          <p className="font-serif text-h3 leading-tight text-ink">
            296 pages, 180 photographs, 1,204 kilometres
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Numerals — lining and tabular, for prices and counts</GroupLabel>
          <p className="type-display text-display leading-none text-ink tabular-nums">$58</p>
          <p className="type-label mt-3 text-ink-3 tabular-nums">No. 118 / 400 · 24 × 30 cm</p>
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
  { step: "24 · 96px", className: "w-24" },
  { step: "gutter", className: "w-gutter" },
  { step: "masthead", className: "w-masthead" },
  { step: "section", className: "w-section" },
]

export function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[5.5rem_4.5rem_minmax(0,1fr)] items-center gap-3 py-2">
      <span className="font-mono text-[11.5px] text-ink-3">{step}</span>
      <span className="font-mono text-[11.5px] text-ink-2 tabular-nums">{values.width}</span>
      <div ref={ref} className={cn("h-3 max-w-full bg-timber", className)} />
    </li>
  )
}

const RADII = [
  { name: "none", className: "rounded-(--radius-none)", use: "Photographs, cards, print" },
  { name: "field", className: "rounded-(--radius-field)", use: "Fields" },
  { name: "button", className: "rounded-(--radius-button)", use: "Buttons" },
  { name: "card", className: "rounded-(--radius-card)", use: "The odd soft card" },
  { name: "sheet", className: "rounded-(--radius-sheet)", use: "Dialogs, floating sheets" },
  { name: "chip", className: "rounded-(--radius-chip)", use: "Badges, the switch, dots" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure>
      <div ref={ref} className={cn("h-20 border border-line-strong bg-sheet", className)} />
      <figcaption className="mt-2">
        <span className="type-title text-[14px] text-ink">{name}</span> <span className="font-mono text-[11px] text-ink-3">{values["border-top-left-radius"]}</span>
        <span className="block font-serif text-[14px] text-ink-2">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "hairline", className: "shadow-(--shadow-hairline)", use: "An edge drawn by a ring: panels, prints" },
  { name: "soft", className: "shadow-(--shadow-soft)", use: "The paper button, the switch thumb" },
  { name: "float", className: "shadow-(--shadow-float)", use: "Postcards, prints, dialogs" },
  { name: "book", className: "shadow-(--shadow-book)", use: "A volume or slipcase on the table" },
  { name: "sheet", className: "shadow-(--shadow-sheet)", use: "The side sheet’s leading edge" },
  { name: "field", className: "shadow-(--shadow-field)", use: "A field drawn as an inset line" },
]

export function ShadowSample({ name, className, use }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className="bg-sheet p-6">
      <div ref={ref} className={cn("ml-auto h-20 w-[78%] bg-raised", className)} />
      <figcaption className="mt-5">
        <span className="type-title text-[14px] text-ink">{name}</span>
        <span className="block font-serif text-[14px] text-ink-2">{use}</span>
        <span className="mt-1 block font-mono text-[10.5px] break-all text-ink-3">{cleanShadow(values["box-shadow"])}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Rule", className: "border-b border-rule", use: "Under every section title" },
  { name: "Hairline", className: "border border-line bg-raised", use: "Dividers, the header’s edge" },
  { name: "Strong", className: "border-b border-line-strong", use: "Accordion rows, fields at rest" },
  { name: "Dashed", className: "border border-dashed border-ink-4 bg-sheet", use: "Stamps, clear space" },
  { name: "Night line", className: "border border-night-line bg-night", use: "Rules on night" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const side = className.includes("border-b ") || className.endsWith("border-b") ? "bottom" : "top"
  const [ref, values] = useComputed<HTMLDivElement>([`border-${side}-width`, `border-${side}-color`, `border-${side}-style`])
  const color = values[`border-${side}-color`]
  return (
    <figure>
      <div ref={ref} className={cn("h-16", className)} />
      <figcaption className="mt-2">
        <span className="type-title text-[14px] text-ink">{name}</span>
        <span className="block font-serif text-[14px] text-ink-2">{use}</span>
        <span className="mt-1 block font-mono text-[10.5px] break-all text-ink-3">
          {values[`border-${side}-width`]} {values[`border-${side}-style`]} {color ? toHex(color) : ""}
        </span>
      </figcaption>
    </figure>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          <GroupLabel>Spacing — a 4px grid, and three steps of its own</GroupLabel>
          <Panel className="overflow-hidden px-5 py-3">
            <ul>
              {SPACING.map((step) => (
                <SpacingStep key={step.step} {...step} />
              ))}
            </ul>
          </Panel>
          <p className="mt-3 font-serif text-[15px] text-ink-2">
            <code className="font-mono text-[12px]">--spacing-gutter</code> is the side margin and <code className="font-mono text-[12px]">--spacing-section</code> the
            rhythm between sections — both fluid, so the values are this window’s. Pages breathe: a section is never closer than 88px to the next.
          </p>
        </div>
        <div className="min-w-0">
          <GroupLabel>Radii — print is square; only controls and floating sheets soften</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — soft, warm and layered, the light of a page on a table</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders — 1px, always</GroupLabel>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
    name: "Press · out-strong · press",
    where: "Every button scales to 0.97 under the finger",
    timing: "duration-(--duration-press) ease-(--ease-out-strong)",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Hover · out-strong · hover",
    where: "Links draw their underline in, arrows step 2px",
    timing: "duration-(--duration-hover) ease-(--ease-out-strong)",
    keyframes: [{ transform: "scaleX(0.1)", transformOrigin: "left" }, { transform: "scaleX(1)", transformOrigin: "left" }],
  },
  {
    name: "Swap · out-strong · swap",
    where: "“Add to bag” becoming “Added”, the active dot",
    timing: "duration-(--duration-swap) ease-(--ease-out-strong)",
    keyframes: [
      { transform: "translateY(60%)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
    ],
  },
  {
    name: "Drawer · drawer · swap",
    where: "The bag and the menu sliding in from the edge",
    timing: "duration-(--duration-swap) ease-(--ease-drawer)",
    keyframes: [{ transform: "translateX(110%)" }, { transform: "translateX(0)" }],
  },
  {
    name: "Scene · in-out-strong · scene",
    where: "A pinned chapter changing, a book turning to its back",
    timing: "duration-(--duration-scene) ease-(--ease-in-out-strong)",
    keyframes: [{ transform: "translateX(-40%) rotate(-3deg)" }, { transform: "translateX(40%) rotate(2deg)" }],
  },
]

function PlayButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="type-label inline-flex h-11 shrink-0 items-center gap-2 rounded-(--radius-button) bg-sheet px-3.5 text-ink transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-line active:scale-[0.97] active:duration-(--duration-press)"
    >
      <Play className="size-3 fill-current" />
      Play
    </button>
  )
}

/** Plays one of the page's motions through the Web Animations API, with the
 *  duration and curve read off the sample's own transition. */
export function MotionSample({ name, where, timing, keyframes }: MotionSpec) {
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
      <div ref={ref} className={cn("flex h-24 items-center justify-center overflow-hidden bg-sheet px-4", timing)}>
        <div ref={target} className="h-12 w-full max-w-[150px] bg-ink" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="type-title text-[14px] text-ink">{name}</p>
          <p className="mt-1 font-serif text-[14px] text-ink-2">{where}</p>
          <p className="mt-1 font-mono text-[10.5px] break-all text-ink-3">
            {raw} · {easing}
          </p>
        </div>
        <PlayButton label={`Play ${name}`} onClick={play} />
      </div>
    </Panel>
  )
}

/**
 * The photographs' cross-dissolve — the motion the whole site is built
 * around, measured at ~380ms on the in-out curve. Two photographs stacked,
 * the top one fading over the other: a plain dissolve, no slide, no zoom.
 */
export function DissolveSample() {
  const [second, setSecond] = useState(false)
  const [ref, values] = useComputed<HTMLDivElement>(["transition-duration", "transition-timing-function"])
  return (
    <Panel className="grid overflow-hidden md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div ref={ref} className="relative aspect-[3/2] bg-sheet duration-(--duration-dissolve) ease-(--ease-in-out-strong) md:aspect-auto md:min-h-72">
        <img src={photo(PHOTOS.potterWheel, 900)} alt="A potter's hands at the wheel" className="absolute inset-0 size-full object-cover" loading="lazy" />
        <img
          src={photo(PHOTOS.weaverHands, 900)}
          alt="A weaver's hands at the loom"
          loading="lazy"
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-(--duration-dissolve) ease-(--ease-in-out-strong) motion-reduce:transition-none",
            second ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      <div className="flex flex-col justify-between gap-6 p-6">
        <div>
          <GroupLabel>Dissolve — the hero’s photographs</GroupLabel>
          <p className="font-serif text-[16px] text-ink-2">
            Measured off the frames at about 380ms, on the in-out curve: slow to leave, slow to land, so one photograph becomes the next the way a
            slide projector changes. No slide, no zoom — nothing that pulls the eye off the person.
          </p>
          <p className="mt-2 font-mono text-[10.5px] break-all text-ink-3">
            {values["transition-duration"]} · {values["transition-timing-function"]}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PlayButton label="Play the dissolve" onClick={() => setSecond((s) => !s)} />
          <span className="type-label text-ink-3">{second ? "The weaver" : "The potter"}</span>
        </div>
      </div>
    </Panel>
  )
}

/** A CSS keyframe animation from the page, running, with its values read off it. */
export function LoopSample({ name, where, className, children }: { name: string; where: string; className: string; children?: ReactNode }) {
  const [ref, values] = useComputed<HTMLDivElement>(["animation-name", "animation-duration", "animation-timing-function"])
  return (
    <Panel className="p-5">
      <div className="relative h-24 overflow-hidden bg-sheet">
        <div ref={ref} className={className}>
          {children}
        </div>
      </div>
      <p className="type-title mt-4 text-[14px] text-ink">{name}</p>
      <p className="mt-1 font-serif text-[14px] text-ink-2">{where}</p>
      <p className="mt-1 font-mono text-[10.5px] break-all text-ink-3">
        {values["animation-name"] === "none"
          ? "stopped — reduced motion is on"
          : `${values["animation-name"]} · ${values["animation-duration"]} · ${values["animation-timing-function"]}`}
      </p>
    </Panel>
  )
}

export function Motion() {
  return (
    <div className="space-y-10">
      <DissolveSample />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <div>
        <GroupLabel>Keyframes — CSS, so reduced motion and the editor stop them</GroupLabel>
        <div className="grid gap-4 md:grid-cols-2">
          <LoopSample
            name="Marquee"
            where="The makers’ names, drifting sideways"
            className="absolute inset-y-0 left-0 flex w-max animate-marquee items-center [--marquee-duration:18s] motion-reduce:animate-none"
          >
            {[0, 1].map((half) => (
              <span key={half} className="flex shrink-0 gap-8 pr-8 font-serif text-h4 whitespace-nowrap text-ink" aria-hidden={half === 1}>
                {["Ceramics", "Wood", "Textile", "Image", "Homes", "Garden"].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </span>
            ))}
          </LoopSample>
          <LoopSample
            name="Slide dot"
            where="The hero’s active dot, filling over one slide"
            className="absolute inset-x-8 top-1/2 h-[5px] origin-left -translate-y-1/2 animate-[dot-fill_4s_linear_infinite] rounded-(--radius-chip) bg-ink motion-reduce:animate-none"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Panel className="p-5 font-serif text-[15px] text-ink-2">
          <span className="type-title text-ink">Springs</span> carry what a hand moves — the book turning under a drag springs back to rest, a flick
          keeps its velocity. Bounce 0.18, never more.
        </Panel>
        <Panel className="p-5 font-serif text-[15px] text-ink-2">
          <span className="type-title text-ink">Scroll</span> is Lenis at a light 0.09 lerp, held in a ref by{" "}
          <code className="font-mono text-[12px]">SmoothScroll</code> so the editor can pause it. It is carrying this page.
        </Panel>
        <Panel className="p-5 font-serif text-[15px] text-ink-2">
          <span className="type-title text-ink">Reduced motion</span> is read from the media query: entrances arrive in place, sentences are fully
          inked, books hold still, Lenis is never created.
        </Panel>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [
  { Icon: ArrowRight, name: "ArrowRight" },
  { Icon: ArrowLeft, name: "ArrowLeft" },
  { Icon: ArrowUpRight, name: "ArrowUpRight" },
  { Icon: Plus, name: "Plus" },
  { Icon: Minus, name: "Minus" },
  { Icon: Check, name: "Check" },
  { Icon: X, name: "X" },
  { Icon: Search, name: "Search" },
  { Icon: Menu, name: "Menu" },
  { Icon: LoaderCircle, name: "LoaderCircle" },
]

const IMAGERY = [
  { id: PHOTOS.ceramicistApron, alt: "A ceramicist in her apron in the studio", caption: "Warm, film-like light. People in their own rooms, mid-task — never posed." },
  { id: PHOTOS.carpenter, alt: "A carpenter at his bench", caption: "The hands and the work, close. Square corners, no frame, no border." },
  { id: PHOTOS.midcenturyRoom, alt: "A quiet living room with mid-century furniture", caption: "The room is a portrait too: the chair they restored, the light on the floor." },
]

export function Iconography() {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Icons — Lucide, small, beside a word</GroupLabel>
          <ul className="grid grid-cols-5 gap-2">
            {ICONS.map(({ Icon, name }) => (
              <li key={name} title={name} className="grid aspect-square place-items-center bg-sheet text-ink">
                <Icon className="size-4" />
              </li>
            ))}
          </ul>
          <p className="mt-4 font-serif text-[15px] text-ink-2">
            12–16px, default stroke, <code className="font-mono text-[12px]">currentColor</code>. An icon only ever helps a word — an arrow after “View more”,
            a plus that turns into a cross. Never a picture on its own, never an emoji.
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>At size — inside the type</GroupLabel>
          <div className="space-y-4">
            <p className="type-label inline-flex items-center gap-1.5 text-ink">
              View more <ArrowRight className="size-3" />
            </p>
            <p className="flex items-center justify-between border-b border-line-strong pb-3 font-serif text-lead text-ink">
              Is every book signed? <Plus className="size-4 text-ink-3" />
            </p>
            <p className="type-title inline-flex h-11 items-center gap-2 bg-ink px-5 text-[15px] text-page">
              <Check className="size-4" /> Added to bag
            </p>
          </div>
        </Panel>
      </div>
      <div>
        <GroupLabel>Photography — Pexels; warm, film-like, people in their own rooms</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          {IMAGERY.map((image) => (
            <figure key={image.id}>
              <img src={photo(image.id, 800)} alt={image.alt} className="aspect-[4/5] w-full bg-sheet object-cover" loading="lazy" />
              <figcaption className="mt-3 font-serif text-[15px] text-ink-2">{image.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 max-w-[64ch] font-serif text-[15px] text-ink-2">
          Daylight, grain and a warm cast; skin and wood look like skin and wood. No studio white, no stock smiles at the camera, no flat-lays of
          products. Photographs are never tinted or filtered on the page — the choice of picture does that work. Credited to their photographers on
          /about.
        </p>
      </div>
      <div>
        <GroupLabel>Product mockups — drawn, not photographed</GroupLabel>
        <div className="grid grid-cols-2 gap-4 bg-stone p-4 sm:p-8 md:grid-cols-3">
          <div className="px-[14%] py-[8%]">
            <BookObject volume={2} title="Slow Hands" subtitle="On learning a craft for life" cloth="clay" />
          </div>
          <Slipcase />
          <PrintStack photos={[PHOTOS.houseboats, PHOTOS.loom, PHOTOS.teacup, PHOTOS.cabinLamp]} className="max-md:col-span-2 max-md:mx-auto max-md:w-1/2" />
        </div>
        <p className="mt-4 max-w-[64ch] font-serif text-[15px] text-ink-2">
          The books, slipcase, prints and envelope are built in CSS from the tokens, so a cloth, a number or a title can change live. Each does what
          the real thing would under a hand: the book turns toward the pointer, Volume 3 lifts from its case, the prints fan out. Hover them.
        </p>
      </div>
    </div>
  )
}
