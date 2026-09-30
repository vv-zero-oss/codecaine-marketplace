import {
  ArrowDown,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Handshake,
  Info,
  LifeBuoy,
  Menu,
  Play,
  Rocket,
  Search,
  Sparkles,
  Star,
  UserSearch,
  Workflow,
  X,
} from "lucide-react"
import { useRef, type ReactNode } from "react"

import { Doodle, Hearts, Spark } from "@/components/blocks/doodle"
import { DuotonePhoto } from "@/components/blocks/duotone-photo"
import { GroupLabel, Panel } from "@/components/brand/specimen"
import { cleanShadow, contrast, toHex, useComputed } from "@/components/brand/read-style"
import { BrandLogo } from "@/components/ui/brand-logo"
import { LogoMark } from "@/components/ui/wordmark"
import { LOGO_ROW, SHOWCASE, STORIES } from "@/content"
import { avatar, pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/** The mark and the name, drawn without the home link `Wordmark` carries. */
export function WordmarkArt({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <LogoMark />
      {!compact && <span className="text-[19px] font-semibold tracking-[-0.04em]">postwise</span>}
    </span>
  )
}

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  {
    do: "Say what it saves: “Nine hours back, every week.”",
    dont: "Sell a feeling: “Revolutionise your inbox!”",
  },
  {
    do: "Talk like a colleague who read the thread: “Priya’s waiting on the contract.”",
    dont: "Talk like a robot: “Action item detected in message 4 of 7.”",
  },
  {
    do: "Calm, warm, a little wry — one italic word per headline, at most.",
    dont: "Exclamation marks, emoji, and ALL CAPS outside the poster bands.",
  },
  {
    do: "Call the copilot Scribe, and the product Postwise.",
    dont: "“Our AI”, “the bot”, or “PostWise”.",
  },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Logo on paper</GroupLabel>
        <div className="flex h-48 items-center justify-center rounded-[var(--radius-panel)] border border-line bg-paper">
          {/* Clear space: the height of the mark's tile on every side, drawn. */}
          <div className="rounded-[var(--radius-field)] p-5 text-ink outline-1 outline-dashed outline-teal/60">
            <WordmarkArt className="[&_svg]:size-7 [&>span]:text-[27px]" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Logo on lagoon</GroupLabel>
        <div className="flex h-48 items-center justify-center rounded-[var(--radius-panel)] bg-lagoon">
          <div className="rounded-[var(--radius-field)] p-5 text-night-fg outline-1 outline-dashed outline-night-fg/25">
            <WordmarkArt className="[&_svg]:size-7 [&>span]:text-[27px]" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 text-[14px] sm:grid-cols-3 lg:col-span-2">
        <Panel className="p-5">
          <dt className="font-medium text-ink">Clear space</dt>
          <dd className="mt-1 text-ink-muted">The mark’s height on every side — the dashed box. Nothing sits inside it.</dd>
        </Panel>
        <Panel className="p-5">
          <dt className="font-medium text-ink">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-muted">
            <WordmarkArt className="text-ink [&_svg]:size-4 [&>span]:text-[14px]" />
            <span>16px mark, 14px name.</span>
          </dd>
        </Panel>
        <Panel className="p-5">
          <dt className="font-medium text-ink">Mark only</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-muted">
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-lagoon text-night-fg">
              <LogoMark className="size-5" />
            </span>
            <span>The floating nav, favicons and the app tile. Ink or night-fg only.</span>
          </dd>
        </Panel>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <Panel className="divide-y divide-line overflow-hidden text-[14.5px]">
          {VOICE.map((line) => (
            <div key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5 text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-dot-green" strokeWidth={2.2} />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-subtle">
                <X className="mt-0.5 size-4 shrink-0 text-dot-red" strokeWidth={2.2} />
                {line.dont}
              </p>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  )
}

/* ─── Colour ──────────────────────────────────────────────────────────── */

type SwatchSpec = { name: string; token: string; className: string; role: string }

/** Class strings are written out whole so Tailwind generates them. */
const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Paper — the page and its surfaces",
    swatches: [
      { name: "Paper", token: "--color-paper", className: "bg-paper", role: "The page" },
      { name: "Paper deep", token: "--color-paper-deep", className: "bg-paper-deep", role: "Wells, quote cards, hovers" },
      { name: "Card", token: "--color-card", className: "bg-card", role: "Cards, fields, the nav" },
      { name: "Card soft", token: "--color-card-soft", className: "bg-card-soft", role: "Tab trays, menu columns" },
    ],
  },
  {
    label: "Ink — text on paper",
    swatches: [
      { name: "Ink", token: "--color-ink", className: "bg-ink", role: "Headlines, primary button" },
      { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft", role: "Nav links, button hover" },
      { name: "Ink muted", token: "--color-ink-muted", className: "bg-ink-muted", role: "Body copy" },
      { name: "Ink subtle", token: "--color-ink-subtle", className: "bg-ink-subtle", role: "Meta, placeholders" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { name: "Line", token: "--color-line", className: "bg-line", role: "Hairlines, dividers" },
      { name: "Line strong", token: "--color-line-strong", className: "bg-line-strong", role: "Outline buttons, dashed rules" },
    ],
  },
  {
    label: "Night — the deep lagoon sections",
    swatches: [
      { name: "Night", token: "--color-night", className: "bg-night", role: "Copilot, love wall, footer" },
      { name: "Night card", token: "--color-night-card", className: "bg-night-card", role: "Cards and chips on night" },
      { name: "Night raised", token: "--color-night-raised", className: "bg-night-raised", role: "Fields and badges on night" },
      { name: "Night line", token: "--color-night-line", className: "bg-night-line", role: "Hairlines on night" },
      { name: "Night fg", token: "--color-night-fg", className: "bg-night-fg", role: "Text on night" },
      { name: "Night muted", token: "--color-night-muted", className: "bg-night-muted", role: "Body on night" },
      { name: "Night subtle", token: "--color-night-subtle", className: "bg-night-subtle", role: "Meta on night" },
    ],
  },
  {
    label: "Lagoon — the call-to-action bands",
    swatches: [
      { name: "Lagoon", token: "--color-lagoon", className: "bg-lagoon", role: "CTA bands, play buttons" },
      { name: "Lagoon soft", token: "--color-lagoon-soft", className: "bg-lagoon-soft", role: "The light behind poster type" },
      { name: "Go", token: "--color-go", className: "bg-go", role: "The mint button on lagoon" },
      { name: "Go hover", token: "--color-go-hover", className: "bg-go-hover", role: "Its hover" },
    ],
  },
  {
    label: "Sea glass — the hero light",
    swatches: [
      { name: "Teal", token: "--color-teal", className: "bg-teal", role: "Hero light, plan wash" },
      { name: "Apricot", token: "--color-apricot", className: "bg-apricot", role: "The warm edge of the light" },
      { name: "Mint", token: "--color-mint", className: "bg-mint", role: "Ribbon, glows" },
      { name: "Mist", token: "--color-mist", className: "bg-mist", role: "Soft light, text selection" },
    ],
  },
  {
    label: "Result cards",
    swatches: [
      { name: "Sand", token: "--color-sand", className: "bg-sand", role: "Stat card" },
      { name: "Sprout", token: "--color-sprout", className: "bg-sprout", role: "Stat card" },
      { name: "Sky", token: "--color-sky", className: "bg-sky", role: "Stat card" },
      { name: "Peach", token: "--color-peach", className: "bg-peach", role: "Stat card, plan wash" },
    ],
  },
  {
    label: "Duotone photography — ink and paper",
    swatches: [
      { name: "Duo teal", token: "--color-duo-teal", className: "bg-duo-teal", role: "Teal ink" },
      { name: "Duo teal paper", token: "--color-duo-teal-paper", className: "bg-duo-teal-paper", role: "Teal paper" },
      { name: "Duo apricot", token: "--color-duo-apricot", className: "bg-duo-apricot", role: "Apricot ink" },
      { name: "Duo apricot paper", token: "--color-duo-apricot-paper", className: "bg-duo-apricot-paper", role: "Apricot paper" },
      { name: "Duo sky", token: "--color-duo-sky", className: "bg-duo-sky", role: "Sky ink" },
      { name: "Duo sky paper", token: "--color-duo-sky-paper", className: "bg-duo-sky-paper", role: "Sky paper" },
    ],
  },
  {
    label: "Signals — dots and product accents",
    swatches: [
      { name: "Dot red", token: "--color-dot-red", className: "bg-dot-red", role: "Triage, urgent, destructive" },
      { name: "Dot green", token: "--color-dot-green", className: "bg-dot-green", role: "Drafting, success" },
      { name: "Dot amber", token: "--color-dot-amber", className: "bg-dot-amber", role: "Follow-ups" },
      { name: "Dot blue", token: "--color-dot-blue", className: "bg-dot-blue", role: "Deliverability" },
      { name: "Dot violet", token: "--color-dot-violet", className: "bg-dot-violet", role: "Signals" },
      { name: "Dot pink", token: "--color-dot-pink", className: "bg-dot-pink", role: "Signals" },
      { name: "App accent", token: "--color-app-accent", className: "bg-app-accent", role: "Selection inside the app" },
    ],
  },
  {
    label: "Glow — gradient poster type",
    swatches: [
      { name: "Glow mint", token: "--color-glow-mint", className: "bg-glow-mint", role: "Gradient text" },
      { name: "Glow sky", token: "--color-glow-sky", className: "bg-glow-sky", role: "Gradient text" },
      { name: "Glow peach", token: "--color-glow-peach", className: "bg-glow-peach", role: "Gradient text" },
      { name: "Glow coral", token: "--color-glow-coral", className: "bg-glow-coral", role: "Gradient text, badge" },
    ],
  },
  {
    label: "shadcn semantic names — pointed at the tokens above",
    swatches: [
      { name: "Background", token: "--background", className: "bg-background", role: "→ paper" },
      { name: "Foreground", token: "--foreground", className: "bg-foreground", role: "→ ink" },
      { name: "Popover", token: "--popover", className: "bg-popover", role: "→ card" },
      { name: "Popover fg", token: "--popover-foreground", className: "bg-popover-foreground", role: "→ ink" },
      { name: "Primary", token: "--primary", className: "bg-primary", role: "→ ink" },
      { name: "Primary fg", token: "--primary-foreground", className: "bg-primary-foreground", role: "White" },
      { name: "Secondary", token: "--secondary", className: "bg-secondary", role: "→ paper deep" },
      { name: "Secondary fg", token: "--secondary-foreground", className: "bg-secondary-foreground", role: "→ ink" },
      { name: "Muted", token: "--muted", className: "bg-muted", role: "→ paper deep" },
      { name: "Muted fg", token: "--muted-foreground", className: "bg-muted-foreground", role: "→ ink muted" },
      { name: "Accent", token: "--accent", className: "bg-accent", role: "→ paper (hover surface)" },
      { name: "Accent fg", token: "--accent-foreground", className: "bg-accent-foreground", role: "→ ink" },
      { name: "Destructive", token: "--destructive", className: "bg-destructive", role: "→ dot red" },
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
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-card">
      <div ref={ref} className={cn("h-16 border-b border-line sm:h-20", className)} />
      <figcaption className="space-y-0.5 p-3.5 text-[13.5px]">
        <p className="font-medium text-ink">{name}</p>
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
    <div ref={ref} className={cn("flex items-end justify-between gap-4 rounded-[var(--radius-card)] border border-line p-5", className)}>
      <div className="min-w-0">
        <p className="type-display text-[30px]">Aa</p>
        <p className="mt-1 text-[13.5px]">{label}</p>
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
          <ContrastPair label="Ink soft on paper" className="bg-paper text-ink-soft" />
          <ContrastPair label="Ink muted on paper" className="bg-paper text-ink-muted" />
          <ContrastPair label="Ink subtle on paper" className="bg-paper text-ink-subtle" />
          <ContrastPair label="Ink muted on card" className="bg-card text-ink-muted" />
          <ContrastPair label="White on ink (button)" className="bg-ink text-white" />
          <ContrastPair label="Night fg on night" className="bg-night text-night-fg" />
          <ContrastPair label="Night muted on night" className="bg-night text-night-muted" />
          <ContrastPair label="Night subtle on night" className="bg-night text-night-subtle" />
          <ContrastPair label="Night fg on lagoon" className="bg-lagoon text-night-fg" />
          <ContrastPair label="Lagoon on go (button)" className="bg-go text-lagoon" />
          <ContrastPair label="Ink on sand" className="bg-sand text-ink" />
          <ContrastPair label="Ink on sky" className="bg-sky text-ink" />
          <ContrastPair label="Ink on peach" className="bg-peach text-ink" />
          <ContrastPair label="Ink on duo teal paper" className="bg-duo-teal-paper text-ink" />
        </div>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const FAMILIES = [
  {
    label: "Sans — everything you read",
    name: "Inter Tight",
    className: "font-sans",
    sample: "text-[44px] font-light tracking-[-0.035em]",
    weights: "300 · 400 · 500 · 600, italic 300–500",
  },
  {
    label: "Display — the poster bands",
    name: "Archivo Expanded",
    className: "font-display",
    sample: "type-poster text-[40px]",
    weights: "900 at 125% width, uppercase",
  },
  {
    label: "Mono — figures and switches",
    name: "Geist Mono",
    className: "font-mono",
    sample: "text-[36px] tracking-[-0.02em]",
    weights: "400 · 500",
  },
  {
    label: "Hand — notes in the margin",
    name: "Reenie Beanie",
    className: "font-hand",
    sample: "text-[48px] leading-[0.9]",
    weights: "400, one size (26px) on the page",
  },
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
  { name: "Poster", className: "type-poster text-[clamp(38px,5.4vw,76px)]", use: "The lagoon and closing bands", text: "Zero inbox" },
  { name: "Story title", className: "text-[clamp(38px,6vw,84px)] leading-[1.02] font-medium tracking-[-0.04em]", use: "Customer stories heading", text: "Teams that write back" },
  { name: "Display XL", className: "type-display text-[clamp(40px,5.6vw,68px)]", use: "SectionTitle size xl", text: "Your inbox, handled" },
  { name: "Hero", className: "type-display text-[clamp(36px,4.2vw,58px)]", use: "The hero headline", text: "The inbox that writes back" },
  { name: "Price", className: "text-[clamp(44px,4.2vw,58px)] leading-[1.1] font-semibold tracking-[-0.04em]", use: "Plan prices", text: "$24" },
  { name: "Display L", className: "type-display text-[clamp(34px,4.4vw,52px)]", use: "Section titles (SectionTitle lg)", text: "Real results from real customers" },
  { name: "Display M", className: "type-display text-[clamp(28px,3.4vw,40px)]", use: "SectionTitle md, FAQ", text: "Questions, answered" },
  { name: "Figure", className: "font-mono text-[clamp(30px,3vw,42px)] leading-none tracking-[-0.02em]", use: "The numbers band", text: "18,000+" },
  { name: "Quote", className: "text-[clamp(22px,2.6vw,30px)] leading-[1.22] tracking-[-0.025em]", use: "QuoteBlock", text: "“It reads like I wrote it.”" },
  { name: "Card title", className: "text-[24px] font-medium tracking-[-0.01em]", use: "Step cards, plan names", text: "Connect your inbox" },
  { name: "Statement", className: "text-[21px] leading-[1.4] tracking-[-0.01em]", use: "Numbers statement, FAQ questions", text: "Less time in email, more in the work." },
  { name: "Lede", className: "text-[17px] leading-[1.5]", use: "Hero and section bodies", text: "Postwise reads, sorts and drafts in your voice." },
  { name: "Body", className: "text-[15px] leading-[1.5]", use: "Default copy", text: "Replies written with the context of every thread." },
  { name: "Button", className: "text-[15px] font-medium tracking-[-0.01em]", use: "Button, nav", text: "Get free trial" },
  { name: "Small", className: "text-[13px]", use: "Menu rows, deck tabs, notes", text: "Synced 21 seconds ago" },
  { name: "Caption", className: "text-[12.5px]", use: "Ratings, roles, badges", text: "4.9 from 2,400+ reviews" },
  { name: "Mono label", className: "font-mono text-[13px] tracking-[0.06em] uppercase", use: "Billing switch, guide labels", text: "Monthly · Yearly" },
  { name: "Hand", className: "font-hand text-[26px] leading-[0.8]", use: "Doodle notes", text: "click me!" },
]

export function TypeSample({ name, className, use, text }: (typeof TYPE_SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "font-weight", "letter-spacing"])
  return (
    <div className="grid gap-3 border-b border-line py-6 last:border-b-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div className="text-[13.5px]">
        <p className="font-medium text-ink">{name}</p>
        <p className="text-ink-muted">{use}</p>
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
      <div className="grid gap-4 md:grid-cols-2">
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
          Display sizes are fluid (<code className="font-mono text-[12px]">clamp()</code>), so the values above are
          the ones at this window’s width. Headlines are light and tight, with one word set in{" "}
          <em className="font-light italic">italic</em>.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Numerals — mono, as the numbers band</GroupLabel>
          <p className="font-mono text-[40px] leading-none tracking-[-0.02em] text-ink">
            82%
            <br />
            3.4x · 9h
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Numerals — sans, as the prices</GroupLabel>
          <p className="text-[40px] leading-[1.1] font-semibold tracking-[-0.04em] text-ink tabular-nums">
            $0 · $12
            <br />
            $24 · $39
          </p>
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
      <div ref={ref} className={cn("h-3 max-w-full rounded-[2px] bg-teal", className)} />
    </li>
  )
}

const RADII = [
  { name: "chip", className: "rounded-[var(--radius-chip)]", use: "Badges, avatars" },
  { name: "field", className: "rounded-[var(--radius-field)]", use: "Buttons, fields" },
  { name: "card", className: "rounded-[var(--radius-card)]", use: "Result and love cards" },
  { name: "nav", className: "rounded-[var(--radius-nav)]", use: "The floating nav" },
  { name: "panel", className: "rounded-[var(--radius-panel)]", use: "App windows, deck, CTA band" },
  { name: "24px", className: "rounded-[24px]", use: "Plan and story cards" },
  { name: "28px", className: "rounded-[28px]", use: "Step art tiles" },
  { name: "full", className: "rounded-full", use: "Round buttons, dots" },
]

/** `rounded-full` computes to an enormous length; say what it means. */
function readRadius(value = "") {
  return parseFloat(value) > 9999 ? "full (pill)" : value
}

export function RadiusSample({ name, className, use }: (typeof RADII)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <figure className="text-[13.5px]">
      <div ref={ref} className={cn("h-20 border border-line-strong bg-card", className)} />
      <figcaption className="mt-2">
        <span className="font-medium text-ink">{name}</span>{" "}
        <span className="font-mono text-[11px] text-ink-subtle">{readRadius(values["border-top-left-radius"])}</span>
        <span className="block text-ink-muted">{use}</span>
      </figcaption>
    </figure>
  )
}

const SHADOWS = [
  { name: "card", className: "shadow-(--shadow-card)", use: "Cards resting on paper", night: false },
  { name: "field", className: "shadow-(--shadow-field)", use: "Fields, badges, round keys", night: false },
  { name: "button", className: "shadow-(--shadow-button) bg-ink", use: "The ink button: a top light and a lift", night: false },
  { name: "nav", className: "shadow-(--shadow-nav)", use: "The floating nav, badge hover", night: false },
  { name: "float", className: "shadow-(--shadow-float)", use: "Notes, menus, the play button", night: false },
  { name: "app", className: "shadow-(--shadow-app)", use: "The product windows", night: false },
  { name: "sheet", className: "shadow-(--shadow-sheet)", use: "Deck cards, lifted from below", night: false },
  { name: "night", className: "shadow-(--shadow-night) bg-night-card", use: "Cards and chips on night", night: true },
]

export function ShadowSample({ name, className, use, night }: (typeof SHADOWS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <figure className={cn("rounded-[var(--radius-card)] p-4 text-[13.5px]", night ? "bg-night" : "bg-paper")}>
      <div ref={ref} className={cn("h-20 rounded-[var(--radius-card)] bg-card", className)} />
      <figcaption className="mt-3">
        <span className={cn("font-medium", night ? "text-night-fg" : "text-ink")}>{name}</span>
        <span className={cn("block", night ? "text-night-muted" : "text-ink-muted")}>{use}</span>
        <span className={cn("mt-1 block font-mono text-[10.5px] break-all", night ? "text-night-subtle" : "text-ink-subtle")}>
          {cleanShadow(values["box-shadow"])}
        </span>
      </figcaption>
    </figure>
  )
}

const BORDERS = [
  { name: "Hairline", className: "border border-line bg-card", use: "Cards, sections, accordion rows" },
  { name: "Strong", className: "border border-line-strong bg-card", use: "Outline buttons, the billing switch" },
  { name: "Dashed rule", className: "border-t border-dashed border-line-strong bg-card", use: "Either side of the step buttons" },
  { name: "Night hairline", className: "border border-night-line bg-night", use: "Footer, night buttons" },
  { name: "Go outline", className: "border-2 border-go bg-lagoon", use: "The secondary button on lagoon" },
]

export function BorderSample({ name, className, use }: (typeof BORDERS)[number]) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-width", "border-top-color", "border-top-style"])
  return (
    <figure className="text-[13.5px]">
      <div ref={ref} className={cn("h-16 rounded-[var(--radius-card)]", className)} />
      <figcaption className="mt-2">
        <span className="font-medium text-ink">{name}</span>
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
            <code className="font-mono text-[12px]">--spacing-gutter</code> is the side margin (16–48px) and{" "}
            <code className="font-mono text-[12px]">--spacing-section</code> the vertical rhythm between blocks (72–128px).
          </p>
        </div>
        <div className="min-w-0">
          <GroupLabel>Radii</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {RADII.map((radius) => (
              <RadiusSample key={radius.name} {...radius} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — one light, layered hairline and lift</GroupLabel>
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

type MotionSpec = {
  name: string
  where: string
  /** Sets the transition the sample reads its duration and curve from. */
  timing: string
  keyframes: Keyframe[]
  shape?: string
}

const MOTION: MotionSpec[] = [
  {
    name: "Press",
    where: "Every button: scale to 0.97",
    timing: "duration-(--duration-press) ease-(--ease-press)",
    keyframes: [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
  },
  {
    name: "Hover",
    where: "Buttons, links, the badge arrow",
    timing: "duration-(--duration-hover) ease-(--ease-out-quint)",
    keyframes: [{ transform: "translateX(0)" }, { transform: "translateX(8px)" }],
  },
  {
    name: "Nav condense",
    where: "The header folding into the floating pill",
    timing: "duration-(--duration-nav) ease-(--ease-out-quint)",
    keyframes: [{ transform: "scaleX(1)", borderRadius: "0px" }, { transform: "scaleX(0.72)", borderRadius: "12px" }],
  },
  {
    name: "Swap",
    where: "Deck cards, persona glow, story dots",
    timing: "duration-(--duration-swap) ease-(--ease-out-quint)",
    keyframes: [
      { transform: "translateY(-18px) scale(0.92)", opacity: 0.6 },
      { transform: "translateY(0) scale(1)", opacity: 1 },
    ],
  },
  {
    name: "Entrance",
    where: "RiseIn: out of a blur, a short rise",
    timing: "duration-(--duration-entrance) ease-(--ease-out-quint)",
    keyframes: [
      { transform: "translateY(24px)", opacity: 0, filter: "blur(16px)" },
      { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
    ],
  },
  {
    name: "Draw",
    where: "Doodle arrows, in and out of a curve",
    timing: "duration-(--duration-entrance) ease-(--ease-in-out-cubic)",
    keyframes: [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
    shape: "origin-left",
  },
]

/** Plays one of the page's motions on a sample through the Web Animations
 *  API, with the duration and curve read off the sample's own transition —
 *  so the numbers are the tokens', and the editor's Motion switch reaches it. */
export function MotionSample({ name, where, timing, keyframes, shape }: MotionSpec) {
  const target = useRef<HTMLDivElement>(null)
  const [ref, values] = useComputed<HTMLDivElement>(["transition-duration", "transition-timing-function"])
  const duration = parseFloat(values["transition-duration"] ?? "0") * ((values["transition-duration"] ?? "").endsWith("ms") ? 1 : 1000)
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
      <div ref={ref} className={cn("flex h-24 items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-paper px-4", timing)}>
        <div ref={target} className={cn("h-12 w-full max-w-[220px] rounded-[var(--radius-field)] bg-ink shadow-(--shadow-button)", shape)} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 text-[13.5px]">
        <div className="min-w-0">
          <p className="font-medium text-ink">{name}</p>
          <p className="text-ink-muted">{where}</p>
          <p className="mt-1 font-mono text-[10.5px] break-all text-ink-subtle">
            {values["transition-duration"]} · {easing}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${name}`}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[var(--radius-field)] border border-line-strong bg-card px-3 text-[13px] font-medium text-ink transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-quint) hover:bg-paper focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none active:scale-[0.97]"
        >
          <Play className="size-3 fill-current" />
          Play
        </button>
      </div>
    </Panel>
  )
}

/** A looping CSS animation from the page, running, with its values read off it. */
export function LoopSample({ name, where, className, children }: { name: string; where: string; className: string; children?: ReactNode }) {
  const [ref, values] = useComputed<HTMLDivElement>(["animation-name", "animation-duration", "animation-timing-function"])
  return (
    <Panel className="p-5">
      <div className="relative h-24 overflow-hidden rounded-[var(--radius-card)] bg-paper">
        <div ref={ref} className={className}>
          {children}
        </div>
      </div>
      <p className="mt-4 text-[13.5px] font-medium text-ink">{name}</p>
      <p className="text-[13.5px] text-ink-muted">{where}</p>
      <p className="mt-1 font-mono text-[10.5px] break-all text-ink-subtle">
        {values["animation-name"]} · {values["animation-duration"]} · {values["animation-timing-function"]}
      </p>
    </Panel>
  )
}

export function Motion() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOTION.map((motion) => (
          <MotionSample key={motion.name} {...motion} />
        ))}
      </div>
      <div>
        <GroupLabel>Keyframes — CSS, so reduced motion and the editor stop them</GroupLabel>
        <div className="grid gap-4 md:grid-cols-3">
          <LoopSample
            name="Blob drift"
            where="The hero light, reshaping slowly"
            className="absolute top-2 left-1/2 h-20 w-32 -translate-x-1/2 animate-blob bg-[radial-gradient(closest-side,var(--color-teal)_45%,var(--color-apricot)_72%,transparent)] blur-md motion-reduce:animate-none"
          />
          <LoopSample
            name="Marquee"
            where="Logo and signal rows, drifting sideways"
            className="absolute inset-y-0 left-0 flex w-max animate-marquee items-center motion-reduce:animate-none"
          >
            {[0, 1].map((half) => (
              <span key={half} className="flex shrink-0 gap-3 pr-3" aria-hidden={half === 1}>
                {["Smart Triage", "AI Drafting", "Follow-ups", "Deliverability"].map((label) => (
                  <span key={label} className="rounded-[var(--radius-field)] bg-card px-3 py-2 text-[12px] whitespace-nowrap text-ink shadow-(--shadow-field)">
                    {label}
                  </span>
                ))}
              </span>
            ))}
          </LoopSample>
          <LoopSample
            name="Accordion"
            where="FAQ answers opening (down) and closing (up)"
            className="absolute inset-x-4 top-4 h-16 origin-top animate-accordion-down rounded-[var(--radius-field)] bg-line-strong [--radix-accordion-content-height:64px] motion-reduce:animate-none"
          />
        </div>
      </div>
      <div className="grid gap-3 text-[14px] text-ink-muted sm:grid-cols-2">
        <Panel className="p-5">
          <span className="font-medium text-ink">Scroll</span> is Lenis at a light <code className="font-mono text-[12px]">lerp 0.1</code>,
          held in a ref by <code className="font-mono text-[12px]">SmoothScroll</code> so the editor can pause it. It is carrying this page.
        </Panel>
        <Panel className="p-5">
          <span className="font-medium text-ink">Reduced motion</span> is read from the media query: entrances show at rest, loops
          stop, Lenis is never created. While the page is being designed, the same happens.
        </Panel>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [ArrowRight, ArrowDown, ChevronDown, Check, Star, Play, Info, Menu, Search, Sparkles, Bot, X]
const PERSONA_ICONS = [Rocket, Handshake, LifeBuoy, UserSearch, Workflow]

export function Iconography() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Interface icons — Lucide, 16px, 2px stroke</GroupLabel>
          <div className="flex flex-wrap gap-2.5">
            {ICONS.map((Icon, i) => (
              <span key={i} className="grid size-10 place-items-center rounded-[var(--radius-field)] bg-paper text-ink">
                <Icon className="size-4" />
              </span>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-muted">
            Always in <code className="font-mono text-[12px]">currentColor</code>, beside a word rather than instead of one.
          </p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Persona drawings — Lucide at 56px, 0.9 stroke</GroupLabel>
          <div className="flex flex-wrap gap-3 text-ink">
            {PERSONA_ICONS.map((Icon, i) => (
              <span key={i} className="grid h-20 w-16 place-items-center rounded-[var(--radius-card)] bg-paper">
                <Icon className="size-12" strokeWidth={0.9} />
              </span>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-muted">A hairline stroke at a large size reads as a line drawing, not an icon.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>The hand — doodles, sparks and hearts</GroupLabel>
          <div className="flex flex-wrap items-end gap-8 text-ink">
            <Doodle text="click me!" arrow="down-left" />
            <Doodle text="see the numbers!" arrow="down" />
            <p className="type-display text-[34px]">
              <Spark /> <em className="font-light italic">yes</em> <Spark side="right" /> <Hearts />
            </p>
          </div>
          <p className="mt-4 text-[14px] text-ink-muted">One note per screen, pointing at something clickable.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Customer logos — SVGL, flattened to one ink</GroupLabel>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {LOGO_ROW.slice(0, 6).map((logo) => (
              <BrandLogo key={logo} logo={logo} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[var(--radius-card)] bg-night px-4 py-3">
            {LOGO_ROW.slice(6).map((logo) => (
              <BrandLogo key={logo} logo={logo} tone="light" />
            ))}
          </div>
        </Panel>
      </div>
      <div>
        <GroupLabel>Photography — Pexels, warm daylight, people at work</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STORIES.items.slice(0, 3).map((story) => (
            <figure key={story.name} className="text-[13.5px]">
              <DuotonePhoto src={pexels(story.photo, 480)} alt={story.name} tone={story.tone} className="aspect-[4/5] rounded-[20px]" />
              <figcaption className="mt-2 text-ink-muted">Duotone, {story.tone} — customer stories</figcaption>
            </figure>
          ))}
          <figure className="text-[13.5px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-paper-deep">
              <img src={pexels(SHOWCASE.photo, 640)} alt="A sunlit desk with a laptop" className="size-full object-cover" loading="lazy" />
            </div>
            <figcaption className="mt-2 text-ink-muted">Full colour, behind the product only</figcaption>
          </figure>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {[6497112, 5308640, 6497114, 16160809].map((id) => (
            <img key={id} src={avatar(id)} alt="" className="size-10 rounded-[var(--radius-chip)] object-cover" loading="lazy" />
          ))}
          <p className="text-[14px] text-ink-muted">Faces are square-cornered chips, never circles.</p>
        </div>
      </div>
    </div>
  )
}
