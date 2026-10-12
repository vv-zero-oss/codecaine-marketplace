import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Check, Flame, Hammer, LayoutGrid, List, Mic, PenTool, Play, Sparkle, Upload, X } from "lucide-react"

import { GroupLabel, Panel } from "@/components/brand/specimen"
import { cleanShadow, contrast, toHex, trackingEm, useComputed } from "@/components/brand/read-style"
import { KilnMark, Wordmark } from "@/components/site/logo"
import { Button } from "@/components/ui/button"
import { PROJECTS } from "@/data/projects"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what we made and what it did: “Three hundred birds. Forty-one thousand people on the hunt.”", dont: "Say what we are: “A full-service, innovation-led creative partner.”" },
  { do: "Short sentences. Full stops. A little dry.", dont: "Exclamation marks, emoji, “Let's go!!”" },
  { do: "The claim in white, the reason in grey — two tones, one line.", dont: "Gradient text, three weights in a sentence, ALL CAPS paragraphs." },
  { do: "Name the people who'll do the work.", dont: "“Our team of experts”, stock handshakes, sparkles on buttons." },
]

export function BrandIdentity() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "On the page — near-white", className: "bg-page text-ink" },
          { label: "On bone — soot", className: "bg-bone text-bone-ink" },
          { label: "On ember — soot", className: "bg-ember text-bone-ink" },
        ].map((g) => (
          <div key={g.label}>
            <div className={cn("flex h-48 items-center justify-center rounded-(--radius-panel) shadow-(--shadow-hairline)", g.className)}>
              {/* Clear space: the vessel's own rim width on every side. */}
              <div className="flex items-center gap-4 rounded-[4px] p-[14px] outline-1 outline-current/25 outline-dashed">
                <KilnMark className="w-9" />
                <Wordmark className="text-[26px]" />
              </div>
            </div>
            <p className="mt-3 text-[14px] text-ink-3">{g.label}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <Panel className="flex flex-wrap items-end gap-8 p-6">
          {[56, 36, 24, 16].map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <span style={{ width: size }} className="block text-ink">
                <KilnMark className="w-full" title={`Kiln mark at ${size}px`} />
              </span>
              <span className="type-label text-ink-4">
                {size}px{size === 16 ? " min" : ""}
              </span>
            </div>
          ))}
        </Panel>
        <Panel className="p-6 text-[15px] text-ink-2">
          <p>
            <span className="font-medium text-ink">The vessel</span> is a fired pot with a rim, two handles and one eye — the studio's mascot. It leads the header on
            its own, sits beside the wordmark at the height of its caps, and is glazed in the intro. Never below 16px, never outlined, never in more than one colour at once.
            The wordmark is Inter Tight semibold, uppercase, tracked −0.04em, with the ® at 42%.
          </p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Voice</GroupLabel>
        <div className="overflow-hidden rounded-(--radius-card) shadow-(--shadow-hairline)">
          {VOICE.map((v) => (
            <div key={v.do} className="grid border-b border-line-2 last:border-b-0 md:grid-cols-2">
              <p className="flex gap-3 p-4 text-[15px] text-ink-2">
                <span className="type-label mt-0.5 text-ok">Do</span>
                {v.do}
              </p>
              <p className="flex gap-3 border-line-2 p-4 text-[15px] text-ink-3 md:border-l">
                <span className="type-label mt-0.5 text-error">Don't</span>
                {v.dont}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Colour ──────────────────────────────────────────────────────────── */

type SwatchSpec = { name: string; role: string }
const GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface",
    swatches: [
      { name: "page", role: "The page" },
      { name: "cell", role: "Wall cells" },
      { name: "cell-hover", role: "A cell under the pointer" },
      { name: "panel", role: "Sheets, cards, fields" },
      { name: "panel-2", role: "Chips, pressed panels" },
      { name: "raised", role: "Tracks, hover on panel-2" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "ink", role: "Headlines, primary text" },
      { name: "ink-2", role: "Body" },
      { name: "ink-3", role: "Secondary, labels" },
      { name: "ink-4", role: "Continuations — large only" },
      { name: "ink-5", role: "Unchosen words, numbers" },
    ],
  },
  {
    label: "Border",
    swatches: [
      { name: "line", role: "Cell edges" },
      { name: "line-2", role: "Rules" },
      { name: "line-3", role: "Outlines, field edges" },
    ],
  },
  {
    label: "Bone",
    swatches: [
      { name: "bone", role: "Primary button, nav pill" },
      { name: "bone-2", role: "Nav ground, hover" },
      { name: "bone-ink", role: "Text on bone" },
      { name: "bone-ink-2", role: "Secondary on bone" },
    ],
  },
  {
    label: "Ember",
    swatches: [
      { name: "ember", role: "The accent — text, dots, fills" },
      { name: "ember-2", role: "Pressed ember" },
      { name: "ember-3", role: "Deep ember" },
      { name: "ember-soft", role: "Hover on ember" },
      { name: "ember-deep", role: "Glows" },
    ],
  },
  {
    label: "Glazes",
    swatches: ["clay", "denim", "peach", "tan", "rose", "chrome", "celadon"].map((g) => ({ name: `glaze-${g}`, role: "Intro and glaze lab" })),
  },
  {
    label: "Status",
    swatches: [
      { name: "ok", role: "Done, valid" },
      { name: "warn", role: "Pending" },
      { name: "error", role: "Errors" },
      { name: "info", role: "Info" },
    ],
  },
]

export function Swatch({ name, role }: SwatchSpec) {
  const [ref, v] = useComputed<HTMLDivElement>(["background-color"])
  return (
    <div className="min-w-0">
      <div ref={ref} className="h-20 rounded-(--radius-card) shadow-(--shadow-hairline)" style={{ background: `var(--color-${name})` }} />
      <p className="mt-2 truncate text-[14px] font-medium text-ink">{name}</p>
      <p className="type-label text-ink-3">{toHex(v["background-color"] ?? "")}</p>
      <p className="truncate text-[12.58px] text-ink-4">{role}</p>
    </div>
  )
}

const PAIRS = [
  ["ink", "page"],
  ["ink-2", "page"],
  ["ink-3", "page"],
  ["ink-3", "panel"],
  ["ink-4", "page"],
  ["ember", "page"],
  ["ember", "panel"],
  ["bone-ink", "bone"],
  ["bone-ink", "ember"],
  ["error", "panel"],
] as const

export function ContrastPair({ fg, bg }: { fg: string; bg: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(v.color ?? "", v["background-color"] ?? "")
  const grade = ratio == null ? "" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className="flex items-center justify-between rounded-(--radius-card) px-4 py-3 shadow-(--shadow-hairline)" style={{ color: `var(--color-${fg})`, background: `var(--color-${bg})` }}>
      <span className="text-[15px] font-medium">
        {fg} on {bg}
      </span>
      <span className="font-mono text-[12px] tabular-nums">
        {ratio?.toFixed(2)}:1 · {grade}
      </span>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="flex flex-col gap-10">
      {GROUPS.map((g) => (
        <div key={g.label}>
          <GroupLabel>{g.label}</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {g.swatches.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Contrast — measured live, WCAG 2</GroupLabel>
        <div className="grid gap-2 md:grid-cols-2">
          {PAIRS.map(([fg, bg]) => (
            <ContrastPair key={`${fg}-${bg}`} fg={fg} bg={bg} />
          ))}
        </div>
      </div>
      <p className="text-[15px] text-ink-3">
        One dark theme, on purpose: the work is the colour. The greys are an HCT ramp from a single warm-neutral seed; ember is an HCT tonal scale from #f2762e; status colours
        were generated from the ember seed for a dark ground. All built and checked with the Coolors MCP.
      </p>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const SCALE = ["giga", "mega", "display", "h2", "h3", "h4", "lead", "body", "caption", "micro"]

function TypeRow({ step }: { step: string }) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "letter-spacing", "font-weight"])
  const big = ["giga", "mega", "display"].includes(step)
  return (
    <div className="grid gap-3 border-b border-line-2 py-5 md:grid-cols-[10rem_1fr] md:items-baseline">
      <div className="type-label flex flex-col gap-1 text-ink-4">
        <span className="text-ink-2">{step}</span>
        <span className="tabular-nums">
          {parseFloat(v["font-size"] ?? "0").toFixed(1)}px / {v["line-height"]}
        </span>
        <span className="tabular-nums">{trackingEm(v["letter-spacing"], v["font-size"])}</span>
      </div>
      <p
        ref={ref}
        className={cn("truncate text-ink", big && "type-head", step === "micro" && "font-mono uppercase")}
        style={{ fontSize: `var(--text-${step})`, lineHeight: `var(--text-${step}--line-height)`, letterSpacing: `var(--text-${step}--letter-spacing)` }}
      >
        {big ? "Fired, properly." : step === "micro" ? "Experience · Website · 2026" : "Ideas get better when they're made — so we make them early."}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: "Inter Tight", use: "Everything you read", className: "font-sans", sample: "Aa" },
          { name: "Geist Mono", use: "Everything you scan — labels, tags, clocks", className: "font-mono", sample: "09:41" },
          { name: "Instrument Serif", use: "Client wordmarks only", className: "font-serif italic", sample: "Aa" },
        ].map((f) => (
          <Panel key={f.name} className="p-6">
            <p className={cn("text-[88px] leading-none text-ink", f.className)}>{f.sample}</p>
            <p className="mt-6 text-[17px] font-medium text-ink">{f.name}</p>
            <p className="text-[14px] text-ink-3">{f.use}</p>
          </Panel>
        ))}
      </div>
      <div>
        <GroupLabel>Scale — φ half-steps from 16px, tracking tightening as it grows</GroupLabel>
        <div className="border-t border-line-2">
          {SCALE.map((s) => (
            <TypeRow key={s} step={s} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Numerals — tabular wherever they line up or change</GroupLabel>
        <Panel className="flex flex-wrap items-baseline gap-x-10 gap-y-4 p-6">
          <span className="type-head text-mega text-ink tabular-nums">186</span>
          <span className="font-mono text-[20px] text-ink-2 tabular-nums">07:46 GMT+1</span>
          <span className="text-[20px] text-ink-2 tabular-nums">1,240°C</span>
        </Panel>
      </div>
    </div>
  )
}

/* ─── Space and surface ───────────────────────────────────────────────── */

function ShadowSample({ token }: { token: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <div>
      <div ref={ref} className="h-24 rounded-(--radius-card) bg-panel" style={{ boxShadow: `var(${token})` }} />
      <p className="mt-3 text-[14px] font-medium text-ink">{token.replace("--shadow-", "")}</p>
      <p className="mt-1 font-mono text-[10.5px] leading-snug break-all text-ink-4">{cleanShadow(v["box-shadow"])}</p>
    </div>
  )
}

function RadiusSample({ token }: { token: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <div className="flex flex-col items-start gap-2">
      <div ref={ref} className="size-16 bg-panel-2 shadow-[inset_0_0_0_1px_var(--color-line-3)]" style={{ borderRadius: `var(${token})` }} />
      <p className="text-[14px] font-medium text-ink">{token.replace("--radius-", "")}</p>
      <p className="type-label text-ink-4">{v["border-top-left-radius"]}</p>
    </div>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Spacing — a 4px grid; gutter and section rhythm are fluid</GroupLabel>
        <Panel className="flex flex-col gap-2 p-6">
          {[4, 8, 12, 16, 24, 32, 48, 64, 96].map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="type-label w-10 text-ink-4 tabular-nums">{n}</span>
              <span className="h-3 rounded-[2px] bg-ember/70" style={{ width: n * 3 }} />
            </div>
          ))}
          <p className="mt-3 text-[14px] text-ink-3">
            <code className="font-mono text-ink-2">--spacing-gutter</code> clamp(16px, 2.4vw, 40px) · <code className="font-mono text-ink-2">--spacing-section</code> clamp(96px, 13vw, 208px)
          </p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="flex flex-wrap gap-8">
          {["--radius-cell", "--radius-field", "--radius-card", "--radius-panel", "--radius-device", "--radius-button"].map((t) => (
            <RadiusSample key={t} token={t} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — soft, long and low: a darker pool under the thing</GroupLabel>
        <div className="grid gap-6 bg-page p-2 sm:grid-cols-2 lg:grid-cols-4">
          {["--shadow-hairline", "--shadow-pill", "--shadow-card", "--shadow-float", "--shadow-device", "--shadow-field", "--shadow-ember", "--shadow-inset-top"].map((t) => (
            <ShadowSample key={t} token={t} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders — 1px hairlines in three greys; dashed only for drop zones and clear space</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-4">
          {["line", "line-2", "line-3"].map((l) => (
            <div key={l} className="flex h-16 items-center justify-center rounded-(--radius-card) text-[14px] text-ink-3" style={{ boxShadow: `inset 0 0 0 1px var(--color-${l})` }}>
              {l}
            </div>
          ))}
          <div className="flex h-16 items-center justify-center rounded-(--radius-card) border border-dashed border-line-3 text-[14px] text-ink-3">dashed</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const CURVES = [
  { name: "ease-out-strong", value: [0.23, 1, 0.32, 1], use: "Anything you touch, entrances, the wall's fade", duration: 0.4 },
  { name: "ease-in-out-strong", value: [0.77, 0, 0.175, 1], use: "Things moving on screen, the hero image opening", duration: 0.9 },
  { name: "ease-drawer", value: [0.32, 0.72, 0, 1], use: "Sheets: Let's Talk, Filter, Apply", duration: 0.52 },
] as const

function CurveDemo({ name, value, use, duration }: (typeof CURVES)[number]) {
  const [run, setRun] = useState(0)
  return (
    <Panel className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-medium text-ink">{name}</p>
        <Button size="sm" variant="soft" onClick={() => setRun((r) => r + 1)} aria-label={`Play ${name}`}>
          <Play className="size-3.5" /> Play
        </Button>
      </div>
      <p className="type-label mt-1 text-ink-4">
        cubic-bezier({value.join(", ")}) · {duration * 1000}ms
      </p>
      <div className="relative mt-5 h-10 rounded-full bg-page">
        <motion.span
          key={run}
          className="absolute top-1 left-1 size-8 rounded-full bg-ember"
          initial={{ left: "4px" }}
          animate={{ left: run ? "calc(100% - 36px)" : "4px" }}
          transition={{ duration, ease: [...value] as [number, number, number, number] }}
        />
      </div>
      <p className="mt-3 text-[14px] text-ink-3">{use}</p>
    </Panel>
  )
}

export function Motion() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-3">
        {CURVES.map((c) => (
          <CurveDemo key={c.name} {...c} />
        ))}
      </div>
      <div>
        <GroupLabel>Durations — measured off the reference at 60fps</GroupLabel>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            ["press", "140ms", "Button press"],
            ["hover", "240ms", "Cell lightening, chips"],
            ["fade", "270ms", "Wall fades out for the list"],
            ["rise", "400ms", "List rows rise in, 30ms stagger"],
            ["panel", "520ms", "Filter panel slides in"],
            ["scene", "900ms", "Photographs settling, hero lines"],
          ].map(([n, v, u]) => (
            <div key={n} className="rounded-(--radius-card) p-4 shadow-(--shadow-hairline)">
              <p className="flex justify-between text-[15px] text-ink">
                {n} <span className="font-mono text-ink-3">{v}</span>
              </p>
              <p className="text-[13px] text-ink-4">{u}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[15px] text-ink-3">
        The wall's drift and the intro are timed off Web Animations so the editor's Motion switch stops them; Lenis carries the scroll; everything respects reduced motion — the wall
        stops drifting, the intro shortens to a fade, scroll-linked type is simply lit.
      </p>
    </div>
  )
}

/* ─── Icons and imagery ───────────────────────────────────────────────── */

export function Iconography() {
  const icons = [ArrowRight, ArrowUpRight, Check, X, Flame, Hammer, PenTool, Sparkle, Mic, Upload, LayoutGrid, List]
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Lucide, 1.75 stroke, in ink-3 — ember only when it means “on”</GroupLabel>
        <Panel className="flex flex-wrap gap-3 p-6">
          {icons.map((Icon, i) => (
            <span key={i} className="grid size-12 place-items-center rounded-(--radius-field) bg-panel-2 text-ink-2 transition-colors duration-(--duration-hover) hover:text-ember">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
          ))}
        </Panel>
      </div>
      <div>
        <GroupLabel>Photography — the work, floating on soot with a soft shadow; people in black and white</GroupLabel>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PROJECTS.slice(0, 3).map((p) => (
            <div key={p.slug} className="flex aspect-square items-center justify-center rounded-(--radius-cell) bg-cell">
              <img src={pexels(p.photo, 300, 306)} alt={p.title} loading="lazy" className="w-[64%] rounded-(--radius-cell) shadow-(--shadow-card)" />
            </div>
          ))}
          <div className="aspect-square overflow-hidden rounded-(--radius-cell)">
            <img src={pexels(13548627, 400, 400)} alt="A portrait in black and white" loading="lazy" className="size-full object-cover grayscale" />
          </div>
        </div>
        <p className="mt-3 text-[14px] text-ink-3">All photography from Pexels, credited in the footer. Client marks are type — the clients are invented.</p>
      </div>
    </div>
  )
}
