import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  Eye,
  FileText,
  Fingerprint,
  Lock,
  Menu,
  Play,
  Plus,
  ShieldCheck,
  Snowflake,
  X,
} from "lucide-react"
import { useRef, type ReactNode } from "react"

import { GiantWordmark } from "@/components/blocks/giant-wordmark"
import { GroupLabel, Panel } from "@/components/brand/specimen"
import { cleanShadow, contrast, toHex, useComputed } from "@/components/brand/read-style"
import { BrandLogo } from "@/components/ui/brand-logo"
import { LogoMark } from "@/components/ui/wordmark"
import { HERO, LOGO_ROW, VOICES } from "@/content"
import { avatar, pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/** The name in wide caps, without the home link `Wordmark` carries. */
export function WordmarkArt({ className }: { className?: string }) {
  return <span className={cn("type-caps inline-flex items-center text-[22px] leading-none tracking-[0.01em]", className)}>Tidemark</span>
}

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Name the number: “4.10% on idle cash, paid monthly.”", dont: "Promise the moon: “Supercharge your finances!”" },
  { do: "Say what it costs, including when it’s nothing: “$0 wire fees.”", dont: "Hide it: “Competitive pricing.”" },
  { do: "Put the disclosure where the claim is, in plain words.", dont: "Bury risk in a footnote nobody reaches." },
  { do: "Loud in the headline, quiet in the body — caps only for display and labels.", dont: "Caps in running text, exclamation marks, emoji." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Wordmark on oxblood — primary</GroupLabel>
        <div className="flex h-48 items-center justify-center bg-night">
          {/* Clear space: the cap height on every side, drawn. */}
          <div className="p-6 text-pink outline-1 outline-dashed outline-pink/40">
            <WordmarkArt className="text-[34px]" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Wordmark on cream</GroupLabel>
        <div className="flex h-48 items-center justify-center bg-card shadow-(--shadow-card)">
          <div className="p-6 text-ink outline-1 outline-dashed outline-coral/60">
            <WordmarkArt className="text-[34px]" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <GroupLabel>At poster scale — GiantWordmark, cropped at the foot</GroupLabel>
        <div className="bg-night px-4 pt-8 text-pink sm:px-8">
          <GiantWordmark />
        </div>
      </div>
      <dl className="grid gap-px bg-line text-[14.5px] shadow-(--shadow-hairline) sm:grid-cols-3 lg:col-span-2">
        <div className="bg-card p-5">
          <dt className="type-caps text-[13px] text-ink">Clear space</dt>
          <dd className="mt-2 text-ink-muted">The height of the caps on every side — the dashed box. Nothing sits inside it.</dd>
        </div>
        <div className="bg-card p-5">
          <dt className="type-caps text-[13px] text-ink">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-muted">
            <WordmarkArt className="text-[14px] text-ink" />
            <span>14px caps; below that, the mark.</span>
          </dd>
        </div>
        <div className="bg-card p-5">
          <dt className="type-caps text-[13px] text-ink">The mark</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-muted">
            <span className="grid size-10 shrink-0 place-items-center bg-night text-pink">
              <LogoMark />
            </span>
            <span>A ring with the tide line through it. Pink on oxblood, or ink on cream.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <div className="divide-y divide-line bg-card text-[15px] shadow-(--shadow-card)">
          {VOICE.map((line) => (
            <div key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5 text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-gain" strokeWidth={2.4} />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-subtle">
                <X className="mt-0.5 size-4 shrink-0 text-loss" strokeWidth={2.4} />
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
    label: "Cream — the paper and what sits on it",
    swatches: [
      { name: "Paper", token: "--color-paper", className: "bg-paper", role: "The page" },
      { name: "Paper deep", token: "--color-paper-deep", className: "bg-paper-deep", role: "Bento cell, security band" },
      { name: "Card", token: "--color-card", className: "bg-card", role: "Cards, the form, plans" },
      { name: "White", token: "--color-white", className: "bg-white", role: "Switch knobs, badges on photos" },
    ],
  },
  {
    label: "Ink — the maroon family on cream",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Text, the primary button" },
      { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft", role: "Currency chips" },
      { name: "Ink muted", token: "--color-ink-muted", className: "bg-ink-muted", role: "Body copy" },
      { name: "Ink subtle", token: "--color-ink-subtle", className: "bg-ink-subtle", role: "Meta, placeholders" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { name: "Line", token: "--color-line", className: "bg-line", role: "Hairlines on cream" },
      { name: "Line strong", token: "--color-line-strong", className: "bg-line-strong", role: "Inputs, switch track" },
    ],
  },
  {
    label: "Night — the oxblood grounds",
    swatches: [
      { name: "Night", token: "--color-night", className: "bg-night", role: "Header, treasury, closing" },
      { name: "Night deep", token: "--color-night-deep", className: "bg-night-deep", role: "Footer, code" },
      { name: "Night card", token: "--color-night-card", className: "bg-night-card", role: "Calculator, form on night" },
      { name: "Night line", token: "--color-night-line", className: "bg-night-line", role: "Hairlines, chart grid" },
      { name: "Night fg", token: "--color-night-fg", className: "bg-night-fg", role: "Text on night" },
      { name: "Night muted", token: "--color-night-muted", className: "bg-night-muted", role: "Body on night" },
      { name: "Maroon", token: "--color-maroon", className: "bg-maroon", role: "Button hover, card metal" },
    ],
  },
  {
    label: "Accents — pink to press, coral for heat",
    swatches: [
      { name: "Pink", token: "--color-pink", className: "bg-pink", role: "Wordmark, nav, CTA on night" },
      { name: "Pink hover", token: "--color-pink-hover", className: "bg-pink-hover", role: "Its hover" },
      { name: "Coral", token: "--color-coral", className: "bg-coral", role: "Eyebrows, featured plan, chip" },
      { name: "Coral soft", token: "--color-coral-soft", className: "bg-coral-soft", role: "Coral hover, chip light" },
    ],
  },
  {
    label: "Money and charts",
    swatches: [
      { name: "Gain", token: "--color-gain", className: "bg-gain", role: "Money in, earned" },
      { name: "Loss", token: "--color-loss", className: "bg-loss", role: "Money out, destructive" },
      { name: "Chart", token: "--color-chart", className: "bg-chart", role: "Lines on cream" },
      { name: "Chart night", token: "--color-chart-night", className: "bg-chart-night", role: "Lines on oxblood" },
    ],
  },
  {
    label: "shadcn semantic names — pointed at the tokens above",
    swatches: [
      { name: "Background", token: "--background", className: "bg-background", role: "→ paper" },
      { name: "Foreground", token: "--foreground", className: "bg-foreground", role: "→ ink" },
      { name: "Popover", token: "--popover", className: "bg-popover", role: "→ card" },
      { name: "Popover fg", token: "--popover-foreground", className: "bg-popover-foreground", role: "→ ink" },
      { name: "Primary", token: "--primary", className: "bg-primary", role: "→ night" },
      { name: "Primary fg", token: "--primary-foreground", className: "bg-primary-foreground", role: "→ night fg" },
      { name: "Secondary", token: "--secondary", className: "bg-secondary", role: "→ paper deep" },
      { name: "Secondary fg", token: "--secondary-foreground", className: "bg-secondary-foreground", role: "→ ink" },
      { name: "Muted", token: "--muted", className: "bg-muted", role: "→ paper deep" },
      { name: "Muted fg", token: "--muted-foreground", className: "bg-muted-foreground", role: "→ ink muted" },
      { name: "Accent", token: "--accent", className: "bg-accent", role: "→ paper (hover surface)" },
      { name: "Accent fg", token: "--accent-foreground", className: "bg-accent-foreground", role: "→ ink" },
      { name: "Destructive", token: "--destructive", className: "bg-destructive", role: "→ loss" },
      { name: "Border", token: "--border", className: "bg-border", role: "→ line" },
      { name: "Input", token: "--input", className: "bg-input", role: "→ line strong" },
      { name: "Ring", token: "--ring", className: "bg-ring", role: "→ ink subtle" },
    ],
  },
]

export function Swatch({ name, token, className, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <figure className="bg-card shadow-(--shadow-card)">
      <div ref={ref} className={cn("h-16 border-b border-line sm:h-20", className)} />
      <figcaption className="space-y-0.5 p-3.5 text-[13.5px]">
        <p className="type-caps text-[12px] text-ink">{name}</p>
        <p className="leading-snug text-ink-muted">{role}</p>
        <p className="pt-1 font-mono text-[11px] break-all text-ink-subtle">{token}</p>
        <p className="font-mono text-[11px] break-all text-ink-subtle">{value || "—"}</p>
        <p className="font-mono text-[11px] text-ink-subtle">{value ? toHex(value) : "—"}</p>
      </figcaption>
    </figure>
  )
}

export function ContrastPair({ label, className }: { label: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className={cn("flex items-end justify-between gap-4 p-5 shadow-(--shadow-hairline)", className)}>
      <div className="min-w-0">
        <p className="type-display text-[34px]">Aa</p>
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.token} {...swatch} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Text on its surface — WCAG 2 contrast</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ContrastPair label="Ink on paper" className="bg-paper text-ink" />
          <ContrastPair label="Ink muted on paper" className="bg-paper text-ink-muted" />
          <ContrastPair label="Ink subtle on paper" className="bg-paper text-ink-subtle" />
          <ContrastPair label="Ink muted on card" className="bg-card text-ink-muted" />
          <ContrastPair label="Coral on paper (eyebrows)" className="bg-paper text-coral" />
          <ContrastPair label="Gain on paper" className="bg-paper text-gain" />
          <ContrastPair label="Paper on ink (button)" className="bg-ink text-paper" />
          <ContrastPair label="Pink on night (nav, wordmark)" className="bg-night text-pink" />
          <ContrastPair label="Night fg on night" className="bg-night text-night-fg" />
          <ContrastPair label="Night muted on night" className="bg-night text-night-muted" />
          <ContrastPair label="Night muted on night deep" className="bg-night-deep text-night-muted" />
          <ContrastPair label="Ink on pink (button)" className="bg-pink text-ink" />
          <ContrastPair label="Ink on coral (featured plan)" className="bg-coral text-ink" />
          <ContrastPair label="Coral on ink (badge)" className="bg-ink text-coral" />
          <ContrastPair label="Ink on paper deep" className="bg-paper-deep text-ink" />
        </div>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const FAMILIES = [
  { label: "Display — the poster voice", name: "Archivo Expanded", className: "font-display", sample: "type-display text-[44px]", weights: "600–900 at 125% width; 800 display, 700 caps, 600 eyebrows" },
  { label: "Sans — everything you read", name: "Inter", className: "font-sans", sample: "text-[44px] font-medium tracking-[-0.02em]", weights: "400 · 500 · 600, with ss01 and tabular figures" },
  { label: "Mono — figures and account numbers", name: "Geist Mono", className: "font-mono", sample: "text-[40px] tracking-[-0.04em]", weights: "400 · 500" },
]

export function FamilyCard({ label, name, className, sample, weights }: (typeof FAMILIES)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["font-family"])
  return (
    <Panel className="p-6">
      <div ref={ref} className={className}>
        <GroupLabel>{label}</GroupLabel>
        <p className={cn("break-words text-ink", sample)}>{name}</p>
        <p className="mt-4 text-[14px] break-words text-ink-muted">
          Aa Bb Cc Dd Ee Ff Gg 0123456789
          <br />
          {weights}
        </p>
      </div>
      <p className="mt-4 font-mono text-[11px] break-words text-ink-subtle">{values["font-family"]}</p>
    </Panel>
  )
}

const TYPE_SCALE = [
  { name: "Closing", className: "type-display text-[clamp(44px,7vw,108px)]", use: "The last ask", text: "Finally keeping up" },
  { name: "Hero", className: "type-display text-[clamp(46px,6.4vw,96px)]", use: "The hero headline", text: "Money that keeps pace" },
  { name: "Section", className: "type-display text-[clamp(34px,4.6vw,64px)]", use: "SectionHeading, chapter titles", text: "Held like it’s our own" },
  { name: "Numeral", className: "type-display text-[56px]", use: "Step numbers, prices", text: "01 · $49" },
  { name: "Figure", className: "font-mono text-[clamp(34px,3.6vw,48px)] leading-none tracking-[-0.04em]", use: "The numbers band", text: "$4.2B" },
  { name: "Quote large", className: "text-[clamp(24px,2.4vw,34px)] leading-[1.2] font-medium tracking-[-0.02em]", use: "The featured customer", text: "Month-end close went from four days to one afternoon." },
  { name: "Caps title", className: "type-caps text-[22px] leading-[1.05]", use: "Step and bento titles", text: "Cards with limits that think" },
  { name: "Quote", className: "text-[20px] leading-[1.3] font-medium tracking-[-0.01em]", use: "VoiceCard", text: "Bills get paid on time." },
  { name: "Guarantee", className: "text-[18px] font-medium tracking-[-0.01em]", use: "Security titles", text: "Two-person approvals" },
  { name: "Lede", className: "text-[17px] leading-[1.55]", use: "Section bodies, hero", text: "Open an account in ten minutes." },
  { name: "Body", className: "text-[15px] leading-[1.5]", use: "Cells, lists, FAQ answers", text: "Withdraw any business day." },
  { name: "Nav caps", className: "type-caps text-[15px]", use: "Header links", text: "Product · Pricing" },
  { name: "Button", className: "type-caps text-[13px]", use: "Buttons", text: "Open an account" },
  { name: "Eyebrow", className: "type-eyebrow", use: "Labels above sections", text: "Treasury" },
  { name: "Small", className: "text-[12.5px]", use: "Footnotes, captions", text: "Yields vary and are not guaranteed." },
  { name: "Mono small", className: "font-mono text-[11px] tracking-[0.06em] uppercase", use: "Chart ticks, card details", text: "Today · 12 mo" },
]

export function TypeSample({ name, className, use, text }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-line py-6 last:border-b-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div className="text-[13.5px]">
        <p className="type-caps text-[12px] text-ink">{name}</p>
        <p className="mt-1 text-ink-muted">{use}</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-subtle tabular-nums">
          {values["font-size"]} / {values["line-height"]} · {values["font-weight"]} ·{" "}
          {values["letter-spacing"] === "normal" ? "0" : values["letter-spacing"]}
        </p>
      </div>
      <p ref={ref} className={cn("min-w-0 break-words text-ink", className)}>
        {text}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-3">
        {FAMILIES.map((family) => (
          <FamilyCard key={family.name} {...family} />
        ))}
      </div>
      <div>
        <GroupLabel>Scale — every size the page sets</GroupLabel>
        <Panel className="px-5 sm:px-6">
          {TYPE_SCALE.map((sample) => (
            <TypeSample key={sample.name} {...sample} />
          ))}
        </Panel>
        <p className="mt-3 text-[14px] text-ink-muted">
          Display sizes are fluid (<code className="font-mono text-[12px]">clamp()</code>), so the values are the ones at this window’s width.
          Display, caps and eyebrow are utilities in <code className="font-mono text-[12px]">index.css</code>:{" "}
          <code className="font-mono text-[12px]">type-display</code>, <code className="font-mono text-[12px]">type-caps</code>,{" "}
          <code className="font-mono text-[12px]">type-eyebrow</code>.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Numerals — mono, as a statement</GroupLabel>
          <p className="font-mono text-[34px] leading-tight tracking-[-0.04em] text-ink tabular-nums">
            $2,418,902.14
            <br />
            <span className="text-gain">+ $184,220.40</span>
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Numerals — display, as a price</GroupLabel>
          <p className="type-display text-[56px] text-ink">$0 · $49 · $199</p>
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
  { step: "5 · 20px", className: "w-5" },
  { step: "6 · 24px", className: "w-6" },
  { step: "7 · 28px", className: "w-7" },
  { step: "8 · 32px", className: "w-8" },
  { step: "10 · 40px", className: "w-10" },
  { step: "12 · 48px", className: "w-12" },
  { step: "14 · 56px", className: "w-14" },
  { step: "16 · 64px", className: "w-16" },
  { step: "gutter", className: "w-gutter" },
  { step: "section", className: "w-section" },
]

export function SpacingStep({ step, className }: { step: string; className: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["width"])
  return (
    <li className="grid grid-cols-[5.5rem_4.5rem_minmax(0,1fr)] items-center gap-3 py-2 text-[13px]">
      <span className="font-mono text-[11.5px] text-ink-subtle">{step}</span>
      <span className="font-mono text-[11.5px] text-ink-muted tabular-nums">{values.width}</span>
      <div ref={ref} className={cn("h-3 max-w-full bg-coral", className)} />
    </li>
  )
}

const RADII = [
  { name: "chip", className: "rounded-[var(--radius-chip)]", use: "Badges, tags" },
  { name: "field", className: "rounded-[var(--radius-field)]", use: "Buttons, inputs" },
  { name: "card", className: "rounded-[var(--radius-card)]", use: "Cards, cells" },
  { name: "panel", className: "rounded-[var(--radius-panel)]", use: "Plans, grids" },
  { name: "metal", className: "rounded-[var(--radius-metal)]", use: "The payment card only" },
  { name: "full", className: "rounded-full", use: "Switches, chart dots" },
]

function readRadius(value = "") {
  return parseFloat(value) > 9999 ? "full (pill)" : value
}

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="text-[13.5px]">
      <div ref={ref} className={cn("h-20 border border-ink bg-card", className)} />
      <figcaption className="mt-2">
        <span className="type-caps text-[12px] text-ink">{name}</span>{" "}
        <span className="font-mono text-[11px] text-ink-subtle">{readRadius(values["border-top-left-radius"])}</span>
        <span className="block text-ink-muted">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "hairline", className: "shadow-(--shadow-hairline)", use: "Grids and lists drawn by a ring", night: false },
  { name: "card", className: "shadow-(--shadow-card)", use: "Cards, voice cards, plans", night: false },
  { name: "field", className: "shadow-(--shadow-field)", use: "The account form", night: false },
  { name: "float", className: "shadow-(--shadow-float)", use: "Menus, the payment toast, tooltips", night: false },
  { name: "button", className: "shadow-(--shadow-button) bg-ink", use: "None: buttons are flat", night: false },
  { name: "night", className: "shadow-(--shadow-night) bg-night-card", use: "Cards and forms on oxblood", night: true },
  { name: "metal", className: "shadow-(--shadow-metal) bg-maroon rounded-[var(--radius-metal)]", use: "The metal card, lifted", night: true },
]

export function ShadowSample({ name, className, use, night }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className={cn("p-4 text-[13.5px]", night ? "bg-night" : "bg-paper")}>
      <div ref={ref} className={cn("h-20 bg-card", className)} />
      <figcaption className="mt-3">
        <span className={cn("type-caps text-[12px]", night ? "text-night-fg" : "text-ink")}>{name}</span>
        <span className={cn("block", night ? "text-night-muted" : "text-ink-muted")}>{use}</span>
        <span className={cn("mt-1 block font-mono text-[10.5px] break-all", night ? "text-night-muted" : "text-ink-subtle")}>
          {cleanShadow(values["box-shadow"])}
        </span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-line bg-card", use: "Dividers, list rows" },
  { name: "Ink rule", className: "border-t border-ink bg-card", use: "Over each step, chapter rules" },
  { name: "Outline", className: "border border-ink bg-transparent", use: "Outline button, billing switch" },
  { name: "Night hairline", className: "border border-night-line bg-night", use: "Rules on oxblood" },
  { name: "Ghost night", className: "border border-night-fg/40 bg-night", use: "The ghost button on night" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-width", "border-top-color", "border-top-style"])
  return (
    <figure className="text-[13.5px]">
      <div ref={ref} className={cn("h-16", className)} />
      <figcaption className="mt-2">
        <span className="type-caps text-[12px] text-ink">{name}</span>
        <span className="block text-ink-muted">{use}</span>
        <span className="mt-1 block font-mono text-[10.5px] break-all text-ink-subtle">
          {values["border-top-width"]} {values["border-top-style"]} {values["border-top-color"]}
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
          <GroupLabel>Spacing — 4px steps, plus two fluid tokens</GroupLabel>
          <Panel className="overflow-hidden px-5 py-3">
            <ul>
              {SPACING.map((step) => (
                <SpacingStep key={step.step} {...step} />
              ))}
            </ul>
          </Panel>
          <p className="mt-3 text-[14px] text-ink-muted">
            <code className="font-mono text-[12px]">--spacing-gutter</code> is the side margin (16–40px) and{" "}
            <code className="font-mono text-[12px]">--spacing-section</code> the rhythm between sections (80–144px).
          </p>
        </div>
        <div className="min-w-0">
          <GroupLabel>Radii — square, with one exception</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — almost none; flat colour does the work</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SHADOWS.map((shadow) => (
            <ShadowSample key={shadow.name} {...shadow} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
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

type MotionSpec = { name: string; where: string; timing: string; keyframes: Keyframe[]; shape?: string }

const MOTION: MotionSpec[] = [
  {
    name: "Press",
    where: "Every button: scale to 0.97",
    timing: "duration-(--duration-press) ease-(--ease-out-strong)",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Hover",
    where: "Buttons fill, arrows nudge, links turn pink",
    timing: "duration-(--duration-hover) ease-(--ease-out-strong)",
    keyframes: [{ transform: "translateX(0)" }, { transform: "translateX(8px)" }],
  },
  {
    name: "Swap",
    where: "Prices rolling, the toast landing, the header rule",
    timing: "duration-(--duration-swap) ease-(--ease-out-strong)",
    keyframes: [
      { transform: "translateY(55%)", opacity: 0, filter: "blur(2px)" },
      { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
    ],
  },
  {
    name: "Reveal",
    where: "Sparkline and chart drawing in, left to right",
    timing: "duration-(--duration-swap) ease-(--ease-in-out-strong)",
    keyframes: [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }],
  },
]

/** Plays one of the page's motions through the Web Animations API, with the
 *  duration and curve read off the sample's own transition. */
export function MotionSample({ name, where, timing, keyframes, shape }: MotionSpec) {
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
      <div ref={ref} className={cn("flex h-24 items-center justify-center overflow-hidden bg-paper-deep px-4", timing)}>
        <div ref={target} className={cn("h-12 w-full max-w-[220px] bg-coral", shape)} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 text-[13.5px]">
        <div className="min-w-0">
          <p className="type-caps text-[12px] text-ink">{name}</p>
          <p className="mt-1 text-ink-muted">{where}</p>
          <p className="mt-1 font-mono text-[10.5px] break-all text-ink-subtle">
            {raw} · {easing}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${name}`}
          className="type-caps inline-flex h-9 shrink-0 items-center gap-1.5 border border-ink px-3 text-[11px] text-ink transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-ink hover:text-paper focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none active:scale-[0.97]"
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
      <div className="relative h-24 overflow-hidden bg-paper-deep">
        <div ref={ref} className={className}>
          {children}
        </div>
      </div>
      <p className="type-caps mt-4 text-[12px] text-ink">{name}</p>
      <p className="mt-1 text-[13.5px] text-ink-muted">{where}</p>
      <p className="mt-1 font-mono text-[10.5px] break-all text-ink-subtle">
        {values["animation-name"]} · {values["animation-duration"]} · {values["animation-timing-function"]}
      </p>
    </Panel>
  )
}

export function Motion() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <div>
        <GroupLabel>Keyframes — CSS, so reduced motion and the editor stop them</GroupLabel>
        <div className="grid gap-4 md:grid-cols-3">
          <LoopSample name="Marquee" where="The logo row, drifting sideways" className="absolute inset-y-0 left-0 flex w-max animate-marquee items-center motion-reduce:animate-none">
            {[0, 1].map((half) => (
              <span key={half} className="flex shrink-0 gap-3 pr-3" aria-hidden={half === 1}>
                {["Accounts", "Cards", "Treasury", "Bill pay"].map((label) => (
                  <span key={label} className="type-caps bg-card px-3 py-2 text-[11px] whitespace-nowrap text-ink shadow-(--shadow-card)">
                    {label}
                  </span>
                ))}
              </span>
            ))}
          </LoopSample>
          <LoopSample
            name="Accordion open"
            where="FAQ answers opening"
            className="absolute inset-x-4 top-4 h-16 origin-top animate-accordion-down bg-coral [--radix-accordion-content-height:64px] motion-reduce:animate-none"
          />
          <LoopSample
            name="Accordion close"
            where="…and closing, a touch quicker"
            className="absolute inset-x-4 top-4 h-16 origin-top animate-accordion-up bg-ink [--radix-accordion-content-height:64px] motion-reduce:animate-none"
          />
        </div>
      </div>
      <div className="grid gap-3 text-[14px] text-ink-muted sm:grid-cols-3">
        <Panel className="p-5">
          <span className="type-caps text-[12px] text-ink">Springs</span> carry what follows the pointer: the metal card turns (stiffness 150,
          damping 18) and cells lift (0.4s, bounce 0.15).
        </Panel>
        <Panel className="p-5">
          <span className="type-caps text-[12px] text-ink">Scroll</span> is Lenis at <code className="font-mono text-[12px]">lerp 0.1</code>, held
          in a ref by <code className="font-mono text-[12px]">SmoothScroll</code> so the editor can pause it. It is carrying this page.
        </Panel>
        <Panel className="p-5">
          <span className="type-caps text-[12px] text-ink">Reduced motion</span> is read from the media query: counts show their final value,
          lines are drawn, the card holds still, Lenis is never created.
        </Panel>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [ArrowRight, ArrowUpRight, ArrowDownLeft, ChevronDown, Check, Plus, Menu, X, CreditCard, FileText, Clock, Snowflake]
const GUARANTEE_ICONS = [ShieldCheck, Lock, Fingerprint, Eye, BadgeCheck, Snowflake]

export function Iconography() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Interface icons — Lucide, 16px, 2px stroke</GroupLabel>
          <div className="flex flex-wrap gap-2">
            {ICONS.map((Icon, i) => (
              <span key={i} className="grid size-10 place-items-center bg-paper-deep text-ink">
                <Icon className="size-4" />
              </span>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-muted">In currentColor, beside a word. Arrows point where money or the reader goes.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Guarantees — 20px, 1.7 stroke, pink on an oxblood square</GroupLabel>
          <div className="flex flex-wrap gap-2">
            {GUARANTEE_ICONS.map((Icon, i) => (
              <span key={i} className="grid size-11 place-items-center bg-night text-pink">
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-muted">Square tiles, never circles — the page has no round corners but the card.</p>
        </Panel>
      </div>
      <Panel className="p-6">
        <GroupLabel>Customer logos — SVGL, flattened to one ink</GroupLabel>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {LOGO_ROW.slice(0, 5).map((logo) => (
            <BrandLogo key={logo} logo={logo} className="opacity-80" />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 bg-night px-4 py-3">
          {LOGO_ROW.slice(5).map((logo) => (
            <BrandLogo key={logo} logo={logo} tone="light" />
          ))}
        </div>
      </Panel>
      <div>
        <GroupLabel>Photography — Pexels, warm and moody, people who run companies</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <figure className="text-[13.5px]">
            <img src={pexels(HERO.photo, 900, 600)} alt={HERO.photoAlt} className="aspect-[3/2] w-full object-cover" loading="lazy" />
            <figcaption className="mt-2 text-ink-muted">Full bleed behind the hero: coloured light, a direct look, square edges.</figcaption>
          </figure>
          <figure className="text-[13.5px]">
            <img src={pexels(VOICES.featured.photo, 900, 600)} alt={`${VOICES.featured.name}, ${VOICES.featured.role}`} className="aspect-[3/2] w-full object-cover" loading="lazy" />
            <figcaption className="mt-2 text-ink-muted">Beside a quote on oxblood: one person, close, in warm light.</figcaption>
          </figure>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {VOICES.items.map((item) => (
            <img key={item.name} src={avatar(item.photo)} alt="" className="size-10 object-cover" loading="lazy" />
          ))}
          <p className="text-[14px] text-ink-muted">Faces are square, like everything else.</p>
        </div>
      </div>
    </div>
  )
}
