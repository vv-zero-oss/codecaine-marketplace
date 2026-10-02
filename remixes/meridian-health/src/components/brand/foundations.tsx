import { Play } from "lucide-react"
import { useState } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel } from "@/components/brand/specimen"
import { Mark, Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what to do: “Keep strain under 68% today.”", dont: "Gesture at wellness: “Unlock your best self.”" },
  { do: "Show the number and where it came from.", dont: "Scold, shame or count streaks." },
  { do: "Calm, plain, a little warm.", dont: "Exclamation marks, emoji, medical claims." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Logo on light</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-2xl border border-line bg-paper">
          <div className="rounded-lg p-6 outline-1 outline-dashed outline-accent/40"><Wordmark className="text-2xl" markClassName="size-8" /></div>
        </div>
      </div>
      <div>
        <GroupLabel>Logo on dark</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-2xl bg-night text-paper">
          <div className="rounded-lg p-6 outline-1 outline-dashed outline-white/25"><Wordmark className="text-2xl" markClassName="size-8" /></div>
        </div>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-2xl border border-line p-5"><dt className="font-medium">Clear space</dt><dd className="mt-1 text-ink-2">One mark-height on every side (the dashed box).</dd></div>
        <div className="rounded-2xl border border-line p-5"><dt className="font-medium">Minimum size</dt><dd className="mt-2 flex items-center gap-3 text-ink-2"><Wordmark className="text-xs" markClassName="size-4" /> 16px mark, 12px word.</dd></div>
        <div className="rounded-2xl border border-line p-5"><dt className="font-medium">Mark only</dt><dd className="mt-2 flex items-center gap-3 text-ink-2"><span className="grid size-9 place-items-center rounded-xl bg-ink text-paper"><Mark className="size-6" /></span> App icons and favicons.</dd></div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line text-sm">
          {VOICE.map((v) => (
            <li key={v.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6"><p><span className="mr-2 text-mint">✓</span>{v.do}</p><p className="text-ink-3"><span className="mr-2 text-rose">✕</span>{v.dont}</p></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ─── Colour ──────────────────────────────────────────────────────────── */

const GROUPS: { label: string; tokens: string[] }[] = [
  { label: "Surface", tokens: ["paper", "tint", "tint-2", "sky", "night", "night-2", "forest", "forest-2"] },
  { label: "Text", tokens: ["ink", "ink-2", "ink-3"] },
  { label: "Border", tokens: ["line"] },
  { label: "Accent & status", tokens: ["accent", "mint", "amber", "rose", "violet", "ocean"] },
  { label: "Chart", tokens: ["chart-1", "chart-2", "chart-3"] },
]

function Swatch({ name }: { name: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["background-color"])
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <div ref={ref} className="h-16" style={{ background: `var(--color-${name})` }} />
      <div className="p-3 text-xs"><div className="font-medium">{name}</div><div className="font-mono text-ink-3">{toHex(v["background-color"])}</div></div>
    </div>
  )
}

const PAIRS: [string, string, string][] = [["ink", "paper", "Body text"], ["ink-2", "paper", "Secondary text"], ["ink-3", "paper", "Tertiary / captions"], ["paper", "ink", "Button label"], ["paper", "night", "Text on dark"], ["paper", "forest", "Text on forest"], ["ink", "tint", "Text on tint"]]

function PairRow({ fg, bg, label }: { fg: string; bg: string; label: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(v["color"], v["background-color"])
  return (
    <div ref={ref} className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm" style={{ color: `var(--color-${fg})`, background: `var(--color-${bg})` }}>
      <span>{label}</span>
      <span className="font-mono text-xs tabular-nums">{ratio ? `${ratio.toFixed(1)}:1` : "—"}{ratio && ratio >= 4.5 ? " AA" : ratio && ratio >= 3 ? " large" : ""}</span>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="space-y-8">
      {GROUPS.map((g) => (
        <div key={g.label}>
          <GroupLabel>{g.label}</GroupLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{g.tokens.map((t) => <Swatch key={t} name={t} />)}</div>
        </div>
      ))}
      <div>
        <GroupLabel>Contrast — light and dark surfaces</GroupLabel>
        <div className="grid gap-1.5 border border-line p-1.5 sm:grid-cols-2 sm:rounded-2xl">{PAIRS.map(([fg, bg, l]) => <PairRow key={l} fg={fg} bg={bg} label={l} />)}</div>
        <p className="mt-3 text-xs text-ink-3">The site is light by default and switches to the night and forest surfaces for the dark chapters; there is no theme toggle.</p>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const SCALE = [
  { name: "Display XL", cls: "display text-[clamp(2.5rem,7vw,4.25rem)]", note: "Hero · 600 / −0.045em / 1.02" },
  { name: "Display L", cls: "display text-[clamp(2rem,5vw,3.25rem)]", note: "Section titles" },
  { name: "Display M", cls: "display text-[28px]", note: "Card titles" },
  { name: "Lead", cls: "text-xl leading-snug text-ink-2", note: "Intro paragraphs · 400" },
  { name: "Body", cls: "text-[15px] leading-relaxed text-ink-2", note: "15 / 1.6" },
  { name: "Caption", cls: "text-xs text-ink-3", note: "12 / ink-3" },
]

export function Typography() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line p-6"><div className="text-5xl font-semibold tracking-tight">Aa</div><div className="mt-2 text-sm font-medium">Inter</div><div className="text-xs text-ink-3">400 · 500 · 600 · 700 — Google Fonts. Features cv11, ss03.</div></div>
        <div className="rounded-2xl border border-line p-6"><div className="font-mono text-5xl">Aa</div><div className="mt-2 text-sm font-medium">JetBrains Mono</div><div className="text-xs text-ink-3">Tokens and code only.</div></div>
      </div>
      <ul className="divide-y divide-line">
        {SCALE.map((s) => (
          <li key={s.name} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"><div className="text-xs text-ink-3">{s.name}<br />{s.note}</div><div className={cn("min-w-0", s.cls)}>Your connected health coach</div></li>
        ))}
      </ul>
      <div><GroupLabel>Numerals</GroupLabel><p className="text-3xl font-semibold tabular-nums">0123456789 · 62 ms · 8h 30m · 70%</p><p className="mt-1 text-xs text-ink-3">Tabular figures everywhere a number can change, so nothing jitters.</p></div>
    </div>
  )
}

/* ─── Space, radii, shadows, borders ──────────────────────────────────── */

export function SpaceAndSurface() {
  return (
    <div className="space-y-10">
      <div><GroupLabel>Spacing — 4px grid</GroupLabel><div className="flex flex-wrap items-end gap-3">{[1, 2, 3, 4, 6, 8, 12, 16, 24].map((n) => <div key={n} className="text-center text-[11px] text-ink-3"><div className="mx-auto rounded-sm bg-accent/70" style={{ width: n * 4, height: n * 4 }} />{n * 4}</div>)}</div></div>
      <div><GroupLabel>Radii</GroupLabel><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[["chip", "radius-chip"], ["tile", "radius-tile"], ["card", "radius-card"], ["pill", "radius-pill"]].map(([n, v]) => <div key={n} className="h-20 border border-line bg-tint p-3 text-xs text-ink-2" style={{ borderRadius: `var(--${v})` }}>{n}</div>)}</div></div>
      <div><GroupLabel>Shadows</GroupLabel><div className="grid grid-cols-2 gap-5 sm:grid-cols-5">{["card", "chip", "pill", "phone", "pop"].map((n) => <div key={n} className="grid h-24 place-items-center rounded-2xl bg-paper text-xs text-ink-2" style={{ boxShadow: `var(--shadow-${n})` }}>shadow-{n}</div>)}</div></div>
      <div><GroupLabel>Borders</GroupLabel><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-line p-4 text-xs text-ink-2">1px line — dividers, cards</div><div className="rounded-2xl p-4 text-xs text-ink-2 ring-1 ring-white/60" style={{ background: "var(--color-tint)" }}>inset white — glass chips</div><div className="rounded-2xl border border-dashed border-accent/40 p-4 text-xs text-ink-2">dashed accent — clear space</div></div></div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const EASES = [["ease-out", "var(--ease-out)", "cubic-bezier(.23,1,.32,1) — entrances, presses"], ["ease-in-out", "var(--ease-in-out)", "cubic-bezier(.77,0,.175,1) — on-screen moves"]] as const
const DURS = [["fast", "var(--duration-fast)", "150ms — hover, press"], ["base", "var(--duration-base)", "260ms — tabs, toggles"], ["slow", "var(--duration-slow)", "600ms — reveals, rings"]] as const

export function Motion() {
  const [on, setOn] = useState(false)
  const [ease, setEase] = useState<string>(EASES[0][1])
  const [dur, setDur] = useState<string>(DURS[1][1])
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 text-sm">
        {EASES.map(([n, v]) => <button key={n} onClick={() => setEase(v)} className={cn("h-11 rounded-pill px-4", ease === v ? "bg-ink text-paper" : "bg-tint")}>{n}</button>)}
        {DURS.map(([n, v]) => <button key={n} onClick={() => setDur(v)} className={cn("h-11 rounded-pill px-4", dur === v ? "bg-ink text-paper" : "bg-tint")}>{n}</button>)}
        <button onClick={() => setOn(!on)} className="ml-auto inline-flex h-11 items-center gap-2 rounded-pill bg-accent px-5 font-medium text-white"><Play className="size-4" /> Play</button>
      </div>
      <div className="rounded-2xl bg-tint p-4"><div className="size-12 rounded-2xl bg-ink" style={{ transform: `translateX(${on ? "min(60vw, 520px)" : "0"})`, transition: `transform ${dur} ${ease}` }} /></div>
      <ul className="grid gap-2 text-xs text-ink-2 sm:grid-cols-2">{[...EASES, ...DURS].map(([n, , d]) => <li key={n} className="rounded-xl border border-line px-4 py-3"><b className="mr-2 text-ink">{n}</b>{d}</li>)}</ul>
      <p className="text-xs text-ink-3">Everything honours <code className="font-mono">prefers-reduced-motion</code>. Marquees, floating chips and the feature timer stop; reveals and rings settle instantly.</p>
    </div>
  )
}

/* ─── Icons & imagery ─────────────────────────────────────────────────── */

export function Iconography() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-line p-6"><GroupLabel>Icons</GroupLabel><p className="text-sm text-ink-2">Lucide, 1.5–2px stroke, 16–24px, always <code className="font-mono text-xs">currentColor</code>. Brand marks use the Apple glyph from Iconify (<code className="font-mono text-xs">simple-icons:apple</code>).</p></div>
      <div className="rounded-2xl border border-line p-6"><GroupLabel>Imagery</GroupLabel><p className="text-sm text-ink-2">Real people in motion, shot outdoors in daylight, from Pexels. Never stock-poses, never grey boxes. Device screens are live UI, not screenshots.</p></div>
    </div>
  )
}
