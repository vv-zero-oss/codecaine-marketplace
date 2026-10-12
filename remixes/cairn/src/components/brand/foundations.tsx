import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Code2, Crosshair, Eye, LocateFixed, MapPinned, Play, Search, Sparkles } from "lucide-react"

import { GroupLabel, Panel } from "@/components/brand/specimen"
import { cleanShadow, contrast, toHex, trackingEm, useComputed } from "@/components/brand/read-style"
import { MapBase, THEMES } from "@/components/map/map-base"
import { CairnLogo, CairnMark } from "@/components/site/logo"
import { CATEGORIES, type Category } from "@/content/places"
import { pexels, SKIES } from "@/lib/photos"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Name the place: “Cardamom buns out of the oven at 6:40.”", dont: "Name the feature: “Leverage AI-powered geospatial content.”" },
  { do: "Short sentences, full stops, a little dry.", dont: "Exclamation marks, emoji, “Unlock the power of maps!”" },
  { do: "The serif says the promise; the grey sans says why.", dont: "Three weights in one line, or gradient headlines." },
  { do: "Real photographs, softly blurred, of where people actually go.", dont: "Stock globes, pin clip-art, glowing AI sparkles everywhere." },
]

function LogoGround({ tone }: { tone: "page" | "cream" | "accent" }) {
  return (
    <div
      className={cn(
        "relative flex h-48 items-center justify-center overflow-hidden rounded-(--radius-panel)",
        tone === "page" && "bg-panel text-ink",
        tone === "cream" && "bg-cream text-ink",
        tone === "accent" && "bg-accent text-white",
      )}
    >
      {/* Clear space: the height of the top stone on every side. */}
      <div className={cn("relative rounded-(--radius-chip) p-[14px] outline-1 outline-dashed", tone === "accent" ? "outline-white/50" : "outline-ink-4")}>
        <CairnLogo className={cn("scale-[1.6]", tone === "accent" && "text-white")} />
      </div>
    </div>
  )
}

export function BrandIdentity() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <LogoGround tone="page" />
          <p className="mt-3 text-[14px] text-ink-3">On white and panel — ink.</p>
        </div>
        <div>
          <LogoGround tone="cream" />
          <p className="mt-3 text-[14px] text-ink-3">On cream, in the footer — ink.</p>
        </div>
        <div>
          <LogoGround tone="accent" />
          <p className="mt-3 text-[14px] text-ink-3">On the blue, as the app icon — white.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <Panel className="flex flex-wrap items-end gap-6 p-6 sm:gap-8">
          {[56, 40, 24, 16].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <span style={{ width: s, height: s }} className="text-ink">
                <CairnMark className="size-full" />
              </span>
              <span className="font-mono text-[11px] text-ink-3">
                {s}px{s === 16 ? " min" : ""}
              </span>
            </div>
          ))}
        </Panel>
        <Panel className="p-6 text-[15px] text-ink-2">
          <p>
            <span className="font-medium text-ink">The mark</span> is three stones stacked the way walkers mark a path — each a little smaller and a little off true, so it reads as made by
            hand. The wordmark is Newsreader at 600, tracked to −4%. Keep a top stone's height clear on every side; never smaller than 16px; never outlined or put on a photograph.
          </p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Voice</GroupLabel>
        <div className="overflow-hidden rounded-(--radius-card) border border-line">
          {VOICE.map((v) => (
            <div key={v.do} className="grid border-b border-line last:border-b-0 md:grid-cols-2">
              <p className="flex gap-3 p-4 text-[15px] text-ink-2">
                <span className="mt-0.5 font-mono text-[11px] text-signal-green">DO</span>
                {v.do}
              </p>
              <p className="flex gap-3 border-line p-4 text-[15px] text-ink-3 md:border-l">
                <span className="mt-0.5 font-mono text-[11px] text-signal-red">DON’T</span>
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

type SwatchSpec = { name: string; token: string; role: string }

const mapSet = (theme: string): SwatchSpec[] =>
  ["land", "water", "park", "road", "casing", "label", "block"].map((part) => ({ name: `${theme}-${part}`, token: `--color-${theme}-${part}`, role: part }))

const GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface",
    swatches: [
      { name: "page", token: "--color-page", role: "The page" },
      { name: "cream", token: "--color-cream", role: "Footer, panels, plans" },
      { name: "cream-deep", token: "--color-cream-deep", role: "Rules on cream" },
      { name: "panel", token: "--color-panel", role: "Chips, segmented controls" },
      { name: "panel-deep", token: "--color-panel-deep", role: "Pressed panel" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "ink", token: "--color-ink", role: "Headlines" },
      { name: "ink-2", token: "--color-ink-2", role: "Body" },
      { name: "ink-3", token: "--color-ink-3", role: "Secondary text" },
      { name: "ink-soft", token: "--color-ink-soft", role: "Nav, hero lead — large only" },
      { name: "ink-4", token: "--color-ink-4", role: "Hints, dividers" },
    ],
  },
  {
    label: "Border",
    swatches: [
      { name: "line", token: "--color-line", role: "Hairlines" },
      { name: "line-strong", token: "--color-line-strong", role: "Outline buttons, dashed" },
    ],
  },
  {
    label: "Accent",
    swatches: [
      { name: "accent", token: "--color-accent", role: "The one button" },
      { name: "accent-hover", token: "--color-accent-hover", role: "Hover, HCT −4" },
      { name: "accent-press", token: "--color-accent-press", role: "Press, HCT −16" },
      { name: "accent-edge", token: "--color-accent-edge", role: "The button's 1px edge" },
      { name: "accent-soft", token: "--color-accent-soft", role: "Selected rows" },
      { name: "accent-ink", token: "--color-accent-ink", role: "Accent at text size" },
    ],
  },
  {
    label: "Pins",
    swatches: (Object.keys(CATEGORIES) as Category[]).map((c) => ({ name: `pin-${c}`, token: `--color-pin-${c}`, role: CATEGORIES[c].label })),
  },
  {
    label: "Status",
    swatches: [
      { name: "signal-green", token: "--color-signal-green", role: "Saved, copied" },
      { name: "signal-green-soft", token: "--color-signal-green-soft", role: "Its ground" },
      { name: "signal-red", token: "--color-signal-red", role: "Errors, remove" },
      { name: "signal-red-soft", token: "--color-signal-red-soft", role: "Its ground" },
    ],
  },
]

export function Swatch({ name, token, role }: SwatchSpec) {
  const [ref, v] = useComputed<HTMLDivElement>(["background-color"])
  return (
    <div className="min-w-0">
      <div ref={ref} className="h-20 rounded-(--radius-card) shadow-(--shadow-hairline)" style={{ background: `var(${token})` }} />
      <p className="mt-2 truncate text-[14px] font-medium text-ink">{name}</p>
      <p className="font-mono text-[11.5px] text-ink-3 uppercase">{toHex(v["background-color"] ?? "")}</p>
      <p className="truncate text-[12.58px] text-ink-3">{role}</p>
    </div>
  )
}

const PAIRS = [
  ["ink", "page"],
  ["ink-2", "page"],
  ["ink-3", "page"],
  ["ink-3", "cream"],
  ["ink-soft", "page"],
  ["page", "accent"],
  ["accent-ink", "accent-soft"],
  ["accent-ink", "page"],
  ["signal-green", "signal-green-soft"],
  ["signal-red", "page"],
] as const

export function ContrastPair({ fg, bg }: { fg: string; bg: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(v.color ?? "", v["background-color"] ?? "")
  const grade = ratio == null ? "" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div
      ref={ref}
      className="flex items-center justify-between gap-3 rounded-(--radius-card) px-4 py-3 shadow-(--shadow-hairline)"
      style={{ color: `var(--color-${fg})`, background: `var(--color-${bg})` }}
    >
      <span className="text-[15px] font-medium">
        {fg} on {bg}
      </span>
      <span className="font-mono text-[12px] whitespace-nowrap tabular-nums">
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {g.swatches.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Map themes — each a land, water, park, road, casing, label and block set</GroupLabel>
        <div className="flex flex-col gap-6">
          {THEMES.map((t) => (
            <div key={t.id} className="grid gap-4 md:grid-cols-[200px_1fr] md:items-center">
              <div className={cn(`map-${t.id}`, "relative aspect-[3/2] overflow-hidden rounded-(--radius-card) shadow-(--shadow-hairline)")}>
                <MapBase labels={false} />
                <span className="absolute bottom-2 left-2 rounded-full bg-raised/90 px-2 py-0.5 text-[12px] font-medium text-ink">{t.label}</span>
              </div>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
                {mapSet(t.id).map((s) => (
                  <Swatch key={s.name} {...s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Text pairs, measured live</GroupLabel>
        <div className="grid gap-2 md:grid-cols-2">
          {PAIRS.map(([fg, bg]) => (
            <ContrastPair key={fg + bg} fg={fg} bg={bg} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const SCALE = [
  { name: "giga", className: "text-giga type-serif", sample: "Halden." },
  { name: "mega", className: "text-mega type-serif", sample: "Maps people use." },
  { name: "display", className: "text-display type-serif", sample: "From one sentence to a map." },
  { name: "h2", className: "text-h2 type-serif", sample: "Bring your own list." },
  { name: "h3", className: "text-h3 type-serif", sample: "The Cairn studio" },
  { name: "h4", className: "text-h4 type-serif", sample: "Passed around the internet." },
  { name: "lead", className: "text-lead", sample: "Ask for what you want on the map and Cairn finds it." },
  { name: "body", className: "text-body", sample: "Twelve-hour broth, three kinds of noodle, no reservations." },
  { name: "small", className: "text-small", sample: "Columns: name, neighbourhood, category." },
  { name: "caption", className: "text-caption", sample: "Photography from Pexels" },
]

function ScaleRow({ name, className, sample }: (typeof SCALE)[number]) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "letter-spacing", "font-weight", "font-family"])
  const fs = parseFloat(v["font-size"] ?? "0")
  return (
    <div className="grid gap-2 border-b border-line py-5 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-6">
      <div className="font-mono text-[11.5px] leading-relaxed text-ink-3">
        <p className="text-[13px] text-ink">{name}</p>
        <p>
          {fs.toFixed(2)}px / {v["line-height"] === "normal" ? "normal" : (parseFloat(v["line-height"] ?? "0") / (fs || 1)).toFixed(2)}
        </p>
        <p>
          {trackingEm(v["letter-spacing"], v["font-size"])} · {v["font-weight"]}
        </p>
      </div>
      <p ref={ref} className={cn(className, "min-w-0 break-words text-ink")}>
        {sample}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-3">
        <Panel className="p-6">
          <GroupLabel>Headlines — Newsreader</GroupLabel>
          <p className="type-serif text-[72px] leading-none tracking-[-0.05em] text-ink">Aa</p>
          <p className="mt-4 text-[15px] text-ink-2">Display optical size, weight 500, tracked from −2% at h4 to −5.5% at giga. Balanced line breaks.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Interface — Instrument Sans</GroupLabel>
          <p className="text-[72px] leading-none font-medium tracking-[-0.05em] text-ink">Aa</p>
          <p className="mt-4 text-[15px] text-ink-2">400 for reading, 500 for labels and buttons, 600 for names on the map. −0.8% at body.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Code — JetBrains Mono</GroupLabel>
          <p className="font-mono text-[60px] leading-none tracking-[-0.04em] text-ink">{"</>"}</p>
          <p className="mt-4 text-[15px] text-ink-2">Embed codes, step numbers and token values only.</p>
          <p className="mt-3 font-mono text-[13px] text-ink-3 tabular-nums">0123456789</p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Scale — golden ratio, √φ steps from 16px</GroupLabel>
        <p className="mb-4 max-w-[62ch] text-[15px] text-ink-3">
          Each step is √φ (×1.272) from the last, so every second step is ×1.618: 12.58 · 16 · 20.35 · 25.89 · 32.94 · 41.89 · 53.29 · 67.77 · 86.23 · 109.66 · 177.42. Tracking tightens as the size
          grows; the top steps clamp with the window.
        </p>
        {SCALE.map((s) => (
          <ScaleRow key={s.name} {...s} />
        ))}
      </div>
    </div>
  )
}

/* ─── Space and surface ───────────────────────────────────────────────── */

const SPACING = ["1", "2", "3", "4", "6", "8", "10", "12", "16", "24", "40"]
const RADII = [
  { name: "chip", token: "--radius-chip", use: "Badges, clear space" },
  { name: "button", token: "--radius-button", use: "Every button" },
  { name: "field", token: "--radius-field", use: "Inputs, search" },
  { name: "window", token: "--radius-window", use: "Browser and studio" },
  { name: "card", token: "--radius-card", use: "Photo cards" },
  { name: "panel", token: "--radius-panel", use: "Sky panels, plans" },
  { name: "sticker", token: "--radius-sticker", use: "Stickers" },
]
const SHADOWS = ["hairline", "xs", "card", "photo", "pin", "float", "window", "sticker", "field", "outline", "button"].map((n) => ({ name: n, token: `--shadow-${n}` }))

function RadiusSample({ name, token, use }: (typeof RADII)[number]) {
  const [ref, v] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <div>
      <div ref={ref} className="h-20 border-2 border-ink bg-raised" style={{ borderRadius: `var(${token})` }} />
      <p className="mt-2 text-[14px] font-medium text-ink">{name}</p>
      <p className="font-mono text-[11.5px] text-ink-3">{v["border-top-left-radius"]}</p>
      <p className="text-[12.58px] text-ink-3">{use}</p>
    </div>
  )
}

function ShadowSample({ name, token }: { name: string; token: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <div>
      <div ref={ref} className="h-24 rounded-(--radius-card) bg-raised" style={{ boxShadow: `var(${token})` }} />
      <p className="mt-3 text-[14px] font-medium text-ink">{name}</p>
      <p className="line-clamp-3 font-mono text-[10.5px] leading-snug break-all text-ink-3">{cleanShadow(v["box-shadow"])}</p>
    </div>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <GroupLabel>Spacing — a 4px grid</GroupLabel>
        <div className="flex flex-col gap-2">
          {SPACING.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="w-16 font-mono text-[12px] text-ink-3">{+s * 4}px</span>
              <span className="h-3 rounded-full bg-accent" style={{ width: `${+s * 4}px` }} />
            </div>
          ))}
          <p className="mt-2 text-[14px] text-ink-3">
            Sections breathe on <code className="font-mono text-[12px]">--spacing-section</code>: clamp(88px, 11vw, 160px). Feature rows sit 64px apart on a 1000px measure.
          </p>
        </div>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {RADII.map((r) => (
            <RadiusSample key={r.name} {...r} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — soft, wide and low</GroupLabel>
        <div className="grid grid-cols-2 gap-6 rounded-(--radius-panel) bg-panel p-6 sm:grid-cols-3 lg:grid-cols-4">
          {SHADOWS.map((s) => (
            <ShadowSample key={s.name} {...s} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-(--radius-card) border border-line p-4 text-[14px] text-ink-2">1px line — the header rule, tables</div>
          <div className="rounded-(--radius-card) border border-dashed border-line-strong p-4 text-[14px] text-ink-2">1px dashed — empty states</div>
          <div className="rounded-(--radius-card) p-4 text-[14px] text-ink-2 shadow-[0_0_0_1.5px_var(--color-accent)]">1.5px accent ring — focus, selection</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const MOTIONS = [
  { name: "Press", where: "Every button and card", detail: "scale .97 · 140ms · ease-out-strong", shape: "box", animate: { scale: [1, 0.94, 1] }, transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] } },
  { name: "Rise", where: "Section reveals", detail: "24px · 700ms · ease-out-strong", shape: "box", animate: { y: [24, 0], opacity: [0, 1] }, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
  { name: "Line mask", where: "Hero headline", detail: "105% → 0 · 900ms · 90ms stagger", shape: "bar", animate: { y: ["105%", "0%"] }, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } },
  { name: "Pin drop", where: "Every pin, 45ms apart", detail: "spring · stiffness 420 · damping 24", shape: "pin", animate: { y: [-18, 0], scale: [0.6, 1], opacity: [0, 1] }, transition: { type: "spring", stiffness: 420, damping: 24 } },
  { name: "Map glide", where: "Pan and zoom to a pin", detail: "spring · stiffness 260 · damping 34", shape: "box", animate: { x: [-40, 0], scale: [1.3, 1] }, transition: { type: "spring", stiffness: 260, damping: 34 } },
  { name: "Theme crossfade", where: "Changing a map's style", detail: "fill · 600ms · ease-out-strong", shape: "theme", animate: {}, transition: {} },
] as const

function MotionSample({ m }: { m: (typeof MOTIONS)[number] }) {
  const [run, setRun] = useState(0)
  const theme = THEMES[run % THEMES.length].id
  return (
    <Panel className="flex flex-col p-4">
      <div className={cn("relative grid h-32 place-items-center overflow-hidden rounded-(--radius-card) bg-panel", m.shape === "theme" && `map-${theme}`)}>
        {m.shape === "theme" ? (
          <MapBase labels={false} />
        ) : (
          <motion.div
            key={run}
            initial={false}
            animate={run ? (m.animate as never) : undefined}
            transition={m.transition as never}
            className={cn(
              m.shape === "box" && "size-14 rounded-[12px] bg-ink",
              m.shape === "bar" && "h-8 w-28 rounded-[6px] bg-ink",
              m.shape === "pin" && "size-9 rounded-[9px] bg-raised p-[2px] shadow-(--shadow-pin)",
            )}
          >
            {m.shape === "pin" ? <img src={pexels(39784928, 80, 80)} alt="" className="size-full rounded-[7px] object-cover" /> : null}
          </motion.div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[15px] font-medium text-ink">{m.name}</p>
          <p className="text-[13px] text-ink-3">{m.where}</p>
          <p className="mt-1 font-mono text-[11px] text-ink-3">{m.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          aria-label={`Play ${m.name}`}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-page transition-transform active:scale-90"
        >
          <Play className="size-4" fill="currentColor" />
        </button>
      </div>
    </Panel>
  )
}

export function Motion() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOTIONS.map((m) => (
          <MotionSample key={m.name} m={m} />
        ))}
      </div>
      <p className="max-w-[66ch] text-[15px] text-ink-3">
        Framer Motion and CSS only, so the editor's Motion switch reaches all of it; Lenis carries the scroll (lerp 0.1). The home page's story pins on wide screens and stacks on phones;
        the stickers drift against the scroll at their own depth. Reduced motion keeps every end state: headlines arrive in place, pins are already down, numbers already counted.
      </p>
    </div>
  )
}

/* ─── Icons and imagery ───────────────────────────────────────────────── */

export function Iconography() {
  const icons = [MapPinned, Search, Sparkles, Crosshair, LocateFixed, Eye, Code2, ArrowRight]
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Lucide, 1.75–2.2 stroke</GroupLabel>
        <Panel className="flex flex-wrap gap-6 p-6 text-ink">
          {icons.map((Icon, i) => (
            <Icon key={i} className="size-6" strokeWidth={1.75} />
          ))}
        </Panel>
      </div>
      <div>
        <GroupLabel>Pins carry their category's colour and icon — never colour alone</GroupLabel>
        <Panel className="grid grid-cols-4 gap-6 p-6 sm:grid-cols-8">
          {(Object.keys(CATEGORIES) as Category[]).map((c) => {
            const C = CATEGORIES[c]
            return (
              <div key={c} className="flex flex-col items-center gap-2 text-center">
                <span className="grid size-9 place-items-center rounded-full text-white shadow-(--shadow-pin) ring-2 ring-white" style={{ background: C.color }}>
                  <C.icon className="size-4" strokeWidth={2.2} />
                </span>
                <span className="text-[12px] text-ink-3">{C.label}</span>
              </div>
            )
          })}
        </Panel>
      </div>
      <div>
        <GroupLabel>Photography — soft skies and slightly blurred places</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[SKIES.lavender, SKIES.blush, 9582689, 11808088].map((id) => (
            <img key={id} src={pexels(id, 480, 360)} alt="" className="aspect-[4/3] w-full rounded-(--radius-card) object-cover" />
          ))}
        </div>
        <p className="mt-3 max-w-[64ch] text-[14px] text-ink-3">
          From Pexels, credited in the footer. Skies sit behind product shots; the use-case photos get a 1.5px blur and a little extra saturation so they read as a feeling rather than a
          place. Pins and stickers wear a white mat. Brand logos come from SVGL, and only Google's G, on sign-in.
        </p>
      </div>
    </div>
  )
}
