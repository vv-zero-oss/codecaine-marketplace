import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  CreditCard,
  FileText,
  Globe,
  Landmark,
  Menu,
  Play,
  Plus,
  Receipt,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react"
import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { GroupLabel, Panel } from "@/components/brand/specimen"
import { cleanShadow, contrast, toHex, trackingEm, useComputed } from "@/components/brand/read-style"
import { KestrelMark, Logo } from "@/components/site/logo"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Name the number: “Books closed in 3 days, not 11.”", dont: "Reach for an adjective: “Lightning-fast close!”" },
  { do: "Say what the agent did: “Matched to Software — receipt attached.”", dont: "Hide the work: “Magic happens.”" },
  { do: "Calm and specific. A full stop, never an exclamation mark.", dont: "Hype, emoji, sparkles on every button." },
  { do: "Claim in ink, reason in grey — the two-tone headline.", dont: "Gradient text, all caps, three weights in one line." },
]

/** The mark on a ground, with its clear space drawn as a dashed box. */
function LogoGround({ tone }: { tone: "page" | "night" | "lime" }) {
  return (
    <div
      className={cn(
        "flex h-48 items-center justify-center rounded-(--radius-panel)",
        tone === "page" && "bg-panel dot-grid text-ink",
        tone === "night" && "bg-night text-night-fg",
        tone === "lime" && "bg-lime text-lime-ink",
      )}
    >
      {/* Clear space: the height of the mark on every side. */}
      <div className={cn("rounded-(--radius-chip) p-[18px] outline-1 outline-dashed", tone === "night" ? "outline-night-line" : "outline-ink-4")}>
        <Logo className="text-[34px]" />
      </div>
    </div>
  )
}

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div>
        <GroupLabel>On the page — primary</GroupLabel>
        <LogoGround tone="page" />
      </div>
      <div>
        <GroupLabel>On night — the footer</GroupLabel>
        <LogoGround tone="night" />
      </div>
      <div>
        <GroupLabel>On lime — sparingly</GroupLabel>
        <LogoGround tone="lime" />
      </div>
      <dl className="grid gap-px overflow-hidden rounded-(--radius-card) bg-line text-[15px] shadow-(--shadow-hairline) sm:grid-cols-3 lg:col-span-3">
        <div className="bg-raised p-5">
          <dt className="type-head text-ink">Clear space</dt>
          <dd className="mt-2 text-ink-2">The height of the mark on every side — the dashed box. Nothing sits inside it.</dd>
        </div>
        <div className="bg-raised p-5">
          <dt className="type-head text-ink">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-2">
            <Logo className="text-[16px] text-ink" />
            <span>16px wordmark; below that, the mark alone at 16px.</span>
          </dd>
        </div>
        <div className="bg-raised p-5">
          <dt className="type-head text-ink">The mark</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-2">
            <span className="grid size-10 shrink-0 place-items-center rounded-(--radius-field) bg-ink text-lime">
              <KestrelMark className="size-5" />
            </span>
            <span>A kestrel holding still in the wind. Always <code className="font-mono text-[12.58px]">currentColor</code>.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-3">
        <GroupLabel>Voice</GroupLabel>
        <div className="divide-y divide-line overflow-hidden rounded-(--radius-card) bg-raised text-[15px] shadow-(--shadow-card)">
          {VOICE.map((line) => (
            <div key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5 text-ink">
                <Check className="mt-1 size-4 shrink-0 text-signal-green" strokeWidth={2.4} />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-3">
                <X className="mt-1 size-4 shrink-0 text-signal-red" strokeWidth={2.4} />
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

/** Class strings are written out whole so Tailwind generates them (and so
 *  emits the variable the swatch reads). */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Paper — the page and the panels the product sits in",
    swatches: [
      { name: "Page", token: "--color-page", className: "bg-page", role: "The page, every section" },
      { name: "Panel", token: "--color-panel", className: "bg-panel", role: "Product stages, fields, hovers" },
      { name: "Panel deep", token: "--color-panel-deep", className: "bg-panel-deep", role: "Pressed panels, featured hover" },
      { name: "Raised", token: "--color-raised", className: "bg-raised", role: "Cards and windows on a panel" },
    ],
  },
  {
    label: "Ink — hierarchy in greys, not in weight",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Headlines, the claim" },
      { name: "Ink 2", token: "--color-ink-2", className: "bg-ink-2", role: "Body copy" },
      { name: "Ink 3", token: "--color-ink-3", className: "bg-ink-3", role: "Meta, captions, placeholders (AA)" },
      { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft", role: "The grey half of large headlines" },
      { name: "Ink 4", token: "--color-ink-4", className: "bg-ink-4", role: "Disabled, decorative strokes" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { name: "Line", token: "--color-line", className: "bg-line", role: "Hairlines, dividers" },
      { name: "Line strong", token: "--color-line-strong", className: "bg-line-strong", role: "Inputs, slider tracks" },
      { name: "Dot", token: "--color-dot", className: "bg-dot", role: "The dot grid behind the product" },
    ],
  },
  {
    label: "Lime — the one thing to press",
    swatches: [
      { name: "Lime", token: "--color-lime", className: "bg-lime", role: "Primary button, selection" },
      { name: "Lime hover", token: "--color-lime-hover", className: "bg-lime-hover", role: "Its hover" },
      { name: "Lime press", token: "--color-lime-press", className: "bg-lime-press", role: "Its press" },
      { name: "Lime soft", token: "--color-lime-soft", className: "bg-lime-soft", role: "Success fills, highlights" },
      { name: "Lime ink", token: "--color-lime-ink", className: "bg-lime-ink", role: "Text on lime" },
    ],
  },
  {
    label: "Night — the footer and the metal card",
    swatches: [
      { name: "Night", token: "--color-night", className: "bg-night", role: "Footer, code blocks" },
      { name: "Night 2", token: "--color-night-2", className: "bg-night-2", role: "Cards and buttons on night" },
      { name: "Night line", token: "--color-night-line", className: "bg-night-line", role: "Hairlines on night" },
      { name: "Night fg", token: "--color-night-fg", className: "bg-night-fg", role: "Text on night" },
      { name: "Night muted", token: "--color-night-muted", className: "bg-night-muted", role: "Links on night" },
      { name: "Metal", token: "--color-metal", className: "bg-metal", role: "The card's face" },
      { name: "Metal line", token: "--color-metal-line", className: "bg-metal-line", role: "The card's engraved lines" },
    ],
  },
  {
    label: "Signals — inside the product mockups only",
    swatches: [
      { name: "Blue", token: "--color-signal-blue", className: "bg-signal-blue", role: "Files, agent activity" },
      { name: "Blue soft", token: "--color-signal-blue-soft", className: "bg-signal-blue-soft", role: "Its chip" },
      { name: "Green", token: "--color-signal-green", className: "bg-signal-green", role: "Matched, approved" },
      { name: "Green soft", token: "--color-signal-green-soft", className: "bg-signal-green-soft", role: "Its chip" },
      { name: "Red", token: "--color-signal-red", className: "bg-signal-red", role: "Out of policy, errors" },
      { name: "Red soft", token: "--color-signal-red-soft", className: "bg-signal-red-soft", role: "Its chip" },
      { name: "Amber", token: "--color-signal-amber", className: "bg-signal-amber", role: "Needs review" },
      { name: "Amber soft", token: "--color-signal-amber-soft", className: "bg-signal-amber-soft", role: "Its chip" },
    ],
  },
  {
    label: "shadcn semantic names — pointed at the tokens above",
    swatches: [
      { name: "Background", token: "--background", className: "bg-background", role: "→ page" },
      { name: "Foreground", token: "--foreground", className: "bg-foreground", role: "→ ink" },
      { name: "Primary", token: "--primary", className: "bg-primary", role: "→ ink" },
      { name: "Secondary", token: "--secondary", className: "bg-secondary", role: "→ panel" },
      { name: "Muted fg", token: "--muted-foreground", className: "bg-muted-foreground", role: "→ ink 3" },
      { name: "Accent", token: "--accent", className: "bg-accent", role: "→ panel (hover surface)" },
      { name: "Destructive", token: "--destructive", className: "bg-destructive", role: "→ signal red" },
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
    <figure className="overflow-hidden rounded-(--radius-card) bg-raised shadow-(--shadow-card)">
      <div ref={ref} className={cn("h-16 border-b border-line sm:h-20", className)} />
      <figcaption className="space-y-0.5 p-3.5 text-[13.5px]">
        <p className="type-head text-ink">{name}</p>
        <p className="leading-snug text-ink-2">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-ink-3">{token}</p>
        <p className="font-mono text-[11px] text-ink-3 uppercase">{value ? toHex(value) : "—"}</p>
      </figcaption>
    </figure>
  )
}

export function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Decorative only"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-(--radius-card) p-5 shadow-(--shadow-hairline)", className)}>
      <div className="min-w-0">
        <p className="type-head text-h3">Aa</p>
        <p className="mt-2 text-[13.5px]">{label}</p>
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
          <ContrastPair label="Ink soft on page (large headlines)" className="bg-page text-ink-soft" />
          <ContrastPair label="Ink 2 on panel" className="bg-panel text-ink-2" />
          <ContrastPair label="Ink 3 on panel" className="bg-panel text-ink-3" />
          <ContrastPair label="Lime ink on lime (button)" className="bg-lime text-lime-ink" />
          <ContrastPair label="Ink on lime soft" className="bg-lime-soft text-ink" />
          <ContrastPair label="Page on ink (ink button)" className="bg-ink text-page" />
          <ContrastPair label="Night fg on night" className="bg-night text-night-fg" />
          <ContrastPair label="Night muted on night" className="bg-night text-night-muted" />
          <ContrastPair label="Lime on night" className="bg-night text-lime" />
          <ContrastPair label="Signal red on page (errors)" className="bg-page text-signal-red" />
        </div>
        <p className="mt-3 max-w-[64ch] text-[14px] text-ink-2">
          Ink 3 is for the grey half of a headline — set at 26px and up, where AA large applies — and for meta. Body copy is ink 2.
        </p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const FAMILIES = [
  { label: "Sans — everything", name: "Inter Tight", className: "font-sans", sample: "type-head text-h2", weights: "400 to read · 500 for headlines, never bold · 600 for the wordmark" },
  { label: "Mono — live figures", name: "Geist Mono", className: "font-mono", sample: "text-h3 tracking-[-0.04em]", weights: "400 · 500, tabular, for tickers, amounts and IDs" },
]

export function FamilyCard({ label, name, className, sample, weights }: (typeof FAMILIES)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <Panel className="p-6">
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
 *  with its own line-height and tracking. */
const SCALE = [
  { step: "caption", className: "text-caption", text: "Matched to Software · receipt attached", use: "Labels, captions, footnotes" },
  { step: "body", className: "text-body", text: "Kestrel reads the receipt and codes the spend.", use: "Running text" },
  { step: "lead", className: "text-lead", text: "Cards, bills and the close — handled.", use: "Ledes, quotes, card titles" },
  { step: "h4", className: "text-h4 type-head", text: "Procure to pay without the chase", use: "Bento titles" },
  { step: "h3", className: "text-h3 type-head", text: "Set access on autopilot", use: "Sub-sections" },
  { step: "h2", className: "text-h2 type-head", text: "One platform for the back office", use: "Section headlines" },
  { step: "h1", className: "text-h1 type-head", text: "Spend that closes itself", use: "Inner-page heroes" },
  { step: "display", className: "text-display type-head", text: "Time back.", use: "The home hero" },
  { step: "mega", className: "text-mega type-head", text: "One ledger.", use: "Pinned story moments" },
  { step: "giga", className: "text-giga type-head", text: "Close.", use: "The loudest single word" },
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
            <div className="text-[13.5px]">
              <p className="type-head text-ink">
                {sample.step} <span className="font-mono text-[11px] font-normal text-ink-3">text-{sample.step}</span>
              </p>
              <p className="mt-1 text-ink-2">{sample.use}</p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-3 tabular-nums">
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
      <div className="grid gap-4 md:grid-cols-2">
        {FAMILIES.map((family) => (
          <FamilyCard key={family.name} {...family} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="p-6 lg:col-span-2">
          <GroupLabel>The golden-ratio scale</GroupLabel>
          <p className="text-[16px] text-ink-2">
            Every step is the one before it × <span className="font-mono text-ink">1.272</span> (√φ), so every second step is ×{" "}
            <span className="font-mono text-ink">1.618</span> (φ): 16 → 25.9 → 41.9 → 67.8 → 109.7, with 20.4, 32.9, 53.3 and 86.3 between.
            Sizes from h2 up are fluid (<code className="font-mono text-[12.58px]">clamp()</code>) and land on their φ value at full width, so the
            ratios below hold exactly on a wide window and compress gracefully on a narrow one.
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Negative tracking</GroupLabel>
          <p className="text-[16px] text-ink-2">
            Tracking tightens as size grows — from <span className="font-mono text-ink">−0.006em</span> at body to{" "}
            <span className="font-mono text-ink">−0.058em</span> at giga — so large type sets as one shape instead of a row of letters.
          </p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Scale — read live off each sample at this window’s width</GroupLabel>
        <TypeScale />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Numerals — mono, tabular, for anything that ticks</GroupLabel>
          <p className="font-mono text-h3 leading-tight tracking-[-0.04em] text-ink tabular-nums">
            $2,418,902.14
            <br />
            <span className="text-signal-green">+ 184,220</span>
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Numerals — sans, as a headline figure</GroupLabel>
          <p className="type-head text-display text-ink tabular-nums">400hrs</p>
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
  { step: "10 · 40px", className: "w-10" },
  { step: "12 · 48px", className: "w-12" },
  { step: "16 · 64px", className: "w-16" },
  { step: "24 · 96px", className: "w-24" },
  { step: "gutter", className: "w-gutter" },
  { step: "section", className: "w-section" },
]

export function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[5.5rem_4.5rem_minmax(0,1fr)] items-center gap-3 py-2 text-[13px]">
      <span className="font-mono text-[11.5px] text-ink-3">{step}</span>
      <span className="font-mono text-[11.5px] text-ink-2 tabular-nums">{values.width}</span>
      <div ref={ref} className={cn("h-3 max-w-full rounded-[2px] bg-lime", className)} />
    </li>
  )
}

const RADII = [
  { name: "chip", className: "rounded-(--radius-chip)", use: "Ticker values, tags" },
  { name: "field", className: "rounded-(--radius-field)", use: "Inputs, menu rows" },
  { name: "button", className: "rounded-(--radius-button)", use: "Buttons" },
  { name: "card", className: "rounded-(--radius-card)", use: "Cards, the email field" },
  { name: "panel", className: "rounded-(--radius-panel)", use: "Product stages, bento" },
  { name: "metal", className: "rounded-(--radius-metal)", use: "The payment card only" },
]

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="text-[13.5px]">
      <div ref={ref} className={cn("h-20 border border-line-strong bg-panel", className)} />
      <figcaption className="mt-2">
        <span className="type-head text-ink">{name}</span> <span className="font-mono text-[11px] text-ink-3">{values["border-top-left-radius"]}</span>
        <span className="block text-ink-2">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "hairline", className: "shadow-(--shadow-hairline)", use: "Grids drawn by a ring", night: false },
  { name: "xs", className: "shadow-(--shadow-xs)", use: "Chips, small controls", night: false },
  { name: "card", className: "shadow-(--shadow-card)", use: "Cards, specimens", night: false },
  { name: "float", className: "shadow-(--shadow-float)", use: "Windows floating on a stage", night: false },
  { name: "lift", className: "shadow-(--shadow-lift)", use: "Mega menu, the lifted card", night: false },
  { name: "field", className: "shadow-(--shadow-field)", use: "Inputs, the outline button", night: false },
  { name: "button", className: "shadow-(--shadow-button) bg-lime", use: "Lime and ink buttons", night: false },
  { name: "metal", className: "shadow-(--shadow-metal) bg-metal rounded-(--radius-metal)", use: "The metal card", night: false },
  { name: "night", className: "shadow-(--shadow-night) bg-night-2", use: "Cards on night", night: true },
]

export function ShadowSample({ name, className, use, night }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className={cn("rounded-(--radius-card) p-5 text-[13.5px]", night ? "bg-night" : "bg-panel")}>
      <div ref={ref} className={cn("h-20 rounded-(--radius-card) bg-raised", className)} />
      <figcaption className="mt-4">
        <span className={cn("type-head", night ? "text-night-fg" : "text-ink")}>{name}</span>
        <span className={cn("block", night ? "text-night-muted" : "text-ink-2")}>{use}</span>
        <span className={cn("mt-1 block font-mono text-[10.5px] break-all", night ? "text-night-muted" : "text-ink-3")}>{cleanShadow(values["box-shadow"])}</span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-line bg-raised", use: "Dividers, menu rules, header" },
  { name: "Strong", className: "border border-line-strong bg-raised", use: "Radii samples, inputs at rest" },
  { name: "Dashed", className: "border border-dashed border-ink-4 bg-panel", use: "Drop zones, clear space" },
  { name: "Night line", className: "border border-night-line bg-night", use: "Rules in the footer" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-width", "border-top-color", "border-top-style"])
  return (
    <figure className="text-[13.5px]">
      <div ref={ref} className={cn("h-16 rounded-(--radius-card)", className)} />
      <figcaption className="mt-2">
        <span className="type-head text-ink">{name}</span>
        <span className="block text-ink-2">{use}</span>
        <span className="mt-1 block font-mono text-[10.5px] break-all text-ink-3">
          {values["border-top-width"]} {values["border-top-style"]} {values["border-top-color"] ? toHex(values["border-top-color"]) : ""}
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
          <GroupLabel>Spacing — a 4px grid, plus two fluid tokens</GroupLabel>
          <Panel className="overflow-hidden px-5 py-3">
            <ul>
              {SPACING.map((step) => (
                <SpacingStep key={step.step} {...step} />
              ))}
            </ul>
          </Panel>
          <p className="mt-3 text-[14px] text-ink-2">
            <code className="font-mono text-[12px]">--spacing-gutter</code> is the side margin and <code className="font-mono text-[12px]">--spacing-section</code> the
            rhythm between sections — both fluid, so the values are this window’s.
          </p>
        </div>
        <div className="min-w-0">
          <GroupLabel>Radii — soft, never pill-shaped buttons</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — soft, low and layered; never one hard drop</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders — 1px hairlines</GroupLabel>
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
    where: "Every button scales to 0.97 under the finger",
    timing: "duration-(--duration-press) ease-(--ease-out-strong)",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Hover · ease-out-strong",
    where: "Fills deepen, arrows nudge 2px",
    timing: "duration-(--duration-hover) ease-(--ease-out-strong)",
    keyframes: [{ transform: "translateX(0)" }, { transform: "translateX(10px)" }],
  },
  {
    name: "Swap · ease-out-strong",
    where: "Form states, figures rolling, chips landing",
    timing: "duration-(--duration-swap) ease-(--ease-out-strong)",
    keyframes: [
      { transform: "translateY(55%)", opacity: 0, filter: "blur(3px)" },
      { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
    ],
  },
  {
    name: "Scene · ease-in-out-strong",
    where: "Hero scenes changing, windows travelling across a stage",
    timing: "duration-(--duration-scene) ease-(--ease-in-out-strong)",
    keyframes: [{ transform: "translateX(-40%) rotate(-4deg)" }, { transform: "translateX(40%) rotate(3deg)" }],
  },
  {
    name: "Drawer · ease-drawer",
    where: "The mobile menu sheet sliding in",
    timing: "duration-(--duration-swap) ease-(--ease-drawer)",
    keyframes: [{ transform: "translateX(110%)" }, { transform: "translateX(0)" }],
  },
  {
    name: "Reveal · ease-in-out-strong",
    where: "Photographs uncovering top to bottom on scroll",
    timing: "duration-(--duration-scene) ease-(--ease-in-out-strong)",
    keyframes: [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }],
  },
]

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
      <div ref={ref} className={cn("flex h-24 items-center justify-center overflow-hidden rounded-(--radius-field) bg-panel dot-grid px-4", timing)}>
        <div ref={target} className="h-12 w-full max-w-[160px] rounded-(--radius-field) bg-lime shadow-(--shadow-button)" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 text-[13.5px]">
        <div className="min-w-0">
          <p className="type-head text-ink">{name}</p>
          <p className="mt-1 text-ink-2">{where}</p>
          <p className="mt-1 font-mono text-[10.5px] break-all text-ink-3">
            {raw} · {easing}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${name}`}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-(--radius-button) bg-raised px-3 text-[13px] text-ink shadow-(--shadow-field) transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-panel focus-visible:ring-[3px] focus-visible:ring-ink/15 focus-visible:outline-none active:scale-[0.97] active:duration-(--duration-press)"
        >
          <Play className="size-3 fill-current" />
          Play
        </button>
      </div>
    </Panel>
  )
}

/** A CSS keyframe animation from the page, running, with its values read off it. */
export function LoopSample({ name, where, className, children }: { name: string; where: string; className: string; children?: ReactNode }) {
  const [ref, values] = useComputed<HTMLDivElement>(["animation-name", "animation-duration", "animation-timing-function"])
  return (
    <Panel className="p-5">
      <div className="relative h-24 overflow-hidden rounded-(--radius-field) bg-panel">
        <div ref={ref} className={className}>
          {children}
        </div>
      </div>
      <p className="type-head mt-4 text-ink">{name}</p>
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
          <LoopSample name="Marquee" where="The receipts wall, drifting sideways" className="absolute inset-y-0 left-0 flex w-max animate-marquee items-center motion-reduce:animate-none">
            {[0, 1].map((half) => (
              <span key={half} className="flex shrink-0 gap-3 pr-3" aria-hidden={half === 1}>
                {["Cards", "Bills", "Close", "Treasury"].map((label) => (
                  <span key={label} className="rounded-(--radius-field) bg-raised px-3 py-2 text-[13px] whitespace-nowrap text-ink shadow-(--shadow-card)">
                    {label}
                  </span>
                ))}
              </span>
            ))}
          </LoopSample>
          <LoopSample
            name="Accordion open"
            where="Answers opening"
            className="absolute inset-x-4 top-4 h-16 origin-top animate-accordion-down rounded-(--radius-field) bg-lime [--radix-accordion-content-height:64px] motion-reduce:animate-none"
          />
          <LoopSample name="Caret blink" where="The agent typing in a mockup" className="absolute inset-0 grid place-items-center">
            <span className="flex items-center gap-0.5 text-[16px] text-ink">
              Coding to Software
              <span className="inline-block h-5 w-[2px] animate-blink bg-ink motion-reduce:animate-none" />
            </span>
          </LoopSample>
        </div>
      </div>
      <div className="grid gap-3 text-[14px] text-ink-2 sm:grid-cols-3">
        <Panel className="p-5">
          <span className="type-head text-ink">Springs</span> carry what follows the pointer or a drag — <code className="font-mono text-[12px]">bounce 0.15–0.2</code>, never more.
        </Panel>
        <Panel className="p-5">
          <span className="type-head text-ink">Scroll</span> is Lenis, held in a ref by <code className="font-mono text-[12px]">SmoothScroll</code> so the editor can pause
          it. It is carrying this page.
        </Panel>
        <Panel className="p-5">
          <span className="type-head text-ink">Reduced motion</span> is read from the media query: figures show their final value, scenes hold
          still, Lenis is never created.
        </Panel>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [ArrowRight, ArrowUpRight, ChevronDown, Check, Plus, X, Menu, RotateCcw]
const PRODUCT_ICONS = [CreditCard, Receipt, FileText, Landmark, Wallet, Building2, Globe, ShieldCheck]

export function Iconography() {
  const [dotsRef, dots] = useComputed<HTMLDivElement>(["background-size", "background-image"])
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Interface — Lucide, 16px, beside a word</GroupLabel>
          <div className="flex flex-wrap gap-2">
            {ICONS.map((Icon, i) => (
              <span key={i} className="grid size-10 place-items-center rounded-(--radius-field) bg-panel text-ink">
                <Icon className="size-4" strokeWidth={1.7} />
              </span>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-2">1.7 stroke, currentColor. Arrows point where the reader goes and nudge 2px on hover.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Product — Lucide, 20px, on a raised tile</GroupLabel>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_ICONS.map((Icon, i) => (
              <span key={i} className="grid size-11 place-items-center rounded-(--radius-card) bg-raised text-ink shadow-(--shadow-card)">
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-2">
            No <Sparkles className="inline size-3.5 align-[-2px]" strokeWidth={1.7} /> on AI buttons and no emoji as icons — the agent is shown by what it did.
          </p>
        </Panel>
      </div>
      <Panel className="overflow-hidden">
        <div ref={dotsRef} className="h-40 bg-panel dot-grid" />
        <div className="p-6">
          <GroupLabel>The dot grid — dot-grid</GroupLabel>
          <p className="text-[14px] text-ink-2">The ground the product is set on in every stage. 1px dots in the dot token.</p>
          <p className="mt-1 font-mono text-[10.5px] break-all text-ink-3">
            {dots["background-size"]} · {dots["background-image"]}
          </p>
        </div>
      </Panel>
      <div>
        <GroupLabel>Photography — Pexels; warm natural light, real offices, people at work</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <figure className="text-[13.5px]">
            <img src={pexels(7698799, 900, 600)} alt="A finance team reviewing reports around a laptop" className="aspect-[3/2] w-full rounded-(--radius-panel) object-cover" loading="lazy" />
            <figcaption className="mt-2 text-ink-2">Teams in daylight, mid-task — never posed handshakes. Panel radius, no border.</figcaption>
          </figure>
          <figure className="text-[13.5px]">
            <img src={pexels(14156554, 900, 600)} alt="A controller standing in a bright office" className="aspect-[3/2] w-full rounded-(--radius-panel) object-cover" loading="lazy" />
            <figcaption className="mt-2 text-ink-2">One person beside their quote. Photos uncover top to bottom on scroll (the Reveal curve above).</figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
