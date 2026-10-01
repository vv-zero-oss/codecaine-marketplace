import { Play } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel } from "@/components/brand/specimen"
import { Glow } from "@/components/ui/glow"
import { HaloMark, Wordmark } from "@/components/ui/wordmark"
import { IconByName } from "@/components/ui/icon-by-name"
import { cn } from "@/lib/utils"
import photo from "@/assets/pexels-13443810.jpg"

/* ── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what happens: “Halo ships the winner to 100%.”", dont: "Promise a feeling: “Delight every customer!”" },
  { do: "Name the number: “+1.2 pts, 2,431 conversations.”", dont: "Reach for a superlative: “Revolutionary AI.”" },
  { do: "Plain, a little dry, never breathless.", dont: "Exclamation marks, emoji, sparkles." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Logo on dark</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-card border border-line bg-bg">
          <div className="rounded-lg p-6 outline-1 outline-dashed outline-ember/50"><Wordmark className="text-[28px]" /></div>
        </div>
      </div>
      <div>
        <GroupLabel>Logo on light</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-card bg-[#f4f4f2]">
          <div className="rounded-lg p-6 outline-1 outline-dashed outline-black/25"><Wordmark className="text-[28px] text-onlight" /></div>
        </div>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-card border border-line bg-surface p-5"><dt className="font-medium">Clear space</dt><dd className="mt-1 text-muted">One mark-height on every side (the dashed box).</dd></div>
        <div className="rounded-card border border-line bg-surface p-5"><dt className="font-medium">Minimum size</dt><dd className="mt-2 flex items-center gap-3 text-muted"><Wordmark className="text-xs [&_svg]:size-4" /> 16px mark, 12px word.</dd></div>
        <div className="rounded-card border border-line bg-surface p-5"><dt className="font-medium">Mark only</dt><dd className="mt-2 flex items-center gap-3 text-muted"><HaloMark className="size-8 text-text" /> Favicons and avatars. The lit arc is always the accent.</dd></div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface text-sm">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5"><span className="text-good">✓</span>{line.do}</p>
              <p className="flex gap-2.5 text-faint"><span className="text-ember">✕</span>{line.dont}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── Colour ──────────────────────────────────────────────────────────── */

const COLOUR_GROUPS: { label: string; tokens: string[] }[] = [
  { label: "Surface", tokens: ["bg", "surface", "raised", "bar"] },
  { label: "Text", tokens: ["text", "display", "muted", "faint", "ghost", "onlight"] },
  { label: "Border", tokens: ["line", "line-strong"] },
  { label: "Accent", tokens: ["ember", "ember-soft"] },
  { label: "Status", tokens: ["good", "good-soft", "info", "warn"] },
  { label: "Atmosphere", tokens: ["glow-amber", "glow-teal", "glow-green", "glow-red"] },
  { label: "Chart", tokens: ["chart", "chart-amber"] },
]

function Swatch({ token }: { token: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div ref={ref} className="h-16 border-b border-line" style={{ background: `var(--color-${token})` }} />
      <div className="p-3">
        <p className="font-mono text-[12px] text-text">--color-{token}</p>
        <p className="mt-0.5 font-mono text-[11px] text-faint">{value.startsWith("rgba") ? value : toHex(value)}</p>
      </div>
    </div>
  )
}

const PAIRS = [["text", "bg", "Body on page"], ["muted", "bg", "Secondary on page"], ["faint", "bg", "Tertiary on page"], ["onlight", "text", "Button label"], ["ember", "bg", "Eyebrow on page"], ["good", "bg", "Positive on page"]]

function PairRow({ fg, bg, label }: { fg: string; bg: string; label: string }) {
  const [ref, v] = useComputed<HTMLSpanElement>(["color"])
  const [bgRef, b] = useComputed<HTMLSpanElement>(["background-color"])
  const ratio = contrast(v.color ?? "", b["background-color"] ?? "")
  return (
    <li className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <span ref={bgRef} className="flex h-9 min-w-36 items-center rounded-lg px-3" style={{ background: `var(--color-${bg})` }}>
        <span ref={ref} style={{ color: `var(--color-${fg})` }}>Aa — {label}</span>
      </span>
      <span className="font-mono text-xs text-muted">{ratio ? `${ratio.toFixed(1)}:1` : "—"} <span className={ratio && ratio >= 4.5 ? "text-good" : "text-warn"}>{ratio && ratio >= 4.5 ? "AA" : ratio && ratio >= 3 ? "AA large" : "—"}</span></span>
    </li>
  )
}

export function ColourTokens() {
  return (
    <div className="space-y-10">
      {COLOUR_GROUPS.map((group) => (
        <div key={group.label}>
          <GroupLabel>{group.label}</GroupLabel>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">{group.tokens.map((t) => <Swatch key={t} token={t} />)}</div>
        </div>
      ))}
      <div>
        <GroupLabel>Contrast — text pairs</GroupLabel>
        <ul className="divide-y divide-line rounded-card border border-line bg-surface">{PAIRS.map(([fg, bg, label]) => <PairRow key={label} fg={fg} bg={bg} label={label} />)}</ul>
        <p className="mt-3 text-xs text-faint">Halo is a dark-only product: there is no light theme, so each token has one value.</p>
      </div>
    </div>
  )
}

/* ── Typography ──────────────────────────────────────────────────────── */

const SCALE = [
  { name: "Display", cls: "scanline text-[clamp(30px,4vw,58px)] leading-[1.28] tracking-[-0.03em]", sample: "Your metrics deserve better" },
  { name: "Heading 1", cls: "text-[clamp(26px,2.8vw,36px)] leading-[1.1] font-medium tracking-[-0.025em]", sample: "Built for the way your industry talks" },
  { name: "Heading 2", cls: "text-[clamp(22px,2.4vw,32px)] leading-[1.15] font-medium tracking-[-0.025em]", sample: "One console for every agent" },
  { name: "Title", cls: "text-[22px] leading-tight font-medium tracking-tight", sample: "Revenue Recovery" },
  { name: "Body large", cls: "text-[18px] leading-relaxed text-muted", sample: "Pick the number you answer to." },
  { name: "Body", cls: "text-[15px] leading-relaxed text-muted", sample: "Halo runs small, safe experiments on live conversations." },
  { name: "UI", cls: "text-[13px]", sample: "Auto-improve this KPI with Pilot" },
  { name: "Label (mono)", cls: "font-mono text-[11px] tracking-[0.04em] uppercase text-ember", sample: "Experiment 497442" },
]

function ScaleRow({ name, cls, sample }: (typeof SCALE)[number]) {
  const [ref, v] = useComputed<HTMLDivElement>(["font-size", "font-weight", "line-height", "letter-spacing", "font-family"])
  return (
    <li className="grid gap-3 py-5 lg:grid-cols-[180px_1fr]">
      <div className="font-mono text-[11px] leading-5 text-faint">
        <p className="text-text">{name}</p>
        <p>{v["font-size"]} / {v["line-height"]}</p>
        <p>w{v["font-weight"]} · ls {v["letter-spacing"]}</p>
      </div>
      <div ref={ref} className={cn("min-w-0", cls)}>{sample}</div>
    </li>
  )
}

export function Typography() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-3">
        {[["Geist", "font-sans", "Everything you read: UI, body, headings."], ["Geist Mono", "font-mono", "Labels, IDs, the terminal."], ["Space Mono", "font-display", "Display lines, cut by a scanline raster."]].map(([name, cls, note]) => (
          <div key={name} className="rounded-card border border-line bg-surface p-5">
            <p className={cn("text-[44px] leading-none", cls)}>Aa</p>
            <p className="mt-4 text-sm">{name}</p>
            <p className="mt-1 text-xs text-faint">{note}</p>
            <p className="mt-1 font-mono text-[11px] text-faint">--{cls}</p>
          </div>
        ))}
      </div>
      <div>
        <GroupLabel>Type scale</GroupLabel>
        <ul className="divide-y divide-line rounded-card border border-line bg-surface px-5">{SCALE.map((s) => <ScaleRow key={s.name} {...s} />)}</ul>
      </div>
      <div>
        <GroupLabel>Numerals</GroupLabel>
        <p className="rounded-card border border-line bg-surface p-5 text-[32px] font-medium tracking-tight tabular-nums">0123456789 · 61% · 84% · +23 pts · 4.6 / 5</p>
      </div>
    </div>
  )
}

/* ── Spacing, radii, shadows, borders ────────────────────────────────── */

export function SpaceAndSurface() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Spacing — 4px grid</GroupLabel>
        <ul className="flex flex-wrap items-end gap-4 rounded-card border border-line bg-surface p-5">
          {[1, 2, 3, 4, 6, 8, 12, 16].map((n) => (
            <li key={n} className="flex flex-col items-center gap-2 font-mono text-[11px] text-faint">
              <span className="block rounded-sm bg-ember/70" style={{ width: n * 4, height: n * 4 }} />{n * 4}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[["chip", "rounded-chip"], ["card", "rounded-card"], ["panel", "rounded-panel"], ["pill", "rounded-pill"]].map(([n, c]) => (
            <div key={n} className="rounded-card border border-line bg-surface p-4">
              <div className={cn("h-16 border border-line-strong bg-raised", c)} />
              <p className="mt-3 font-mono text-[12px]">--radius-{n}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {[["card", "shadow-card"], ["panel", "shadow-panel"], ["pill", "shadow-pill"]].map(([n, c]) => (
            <div key={n} className="rounded-card border border-line bg-bg p-6">
              <div className={cn("h-20 rounded-card bg-surface", c)} />
              <p className="mt-4 font-mono text-[12px]">--shadow-{n}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {[["line", "border-line", "Hairline between rows and cards"], ["line-strong", "border-line-strong", "Inputs, popovers, raised panels"], ["ember", "border-ember/60", "The one outlined action"]].map(([n, c, note]) => (
            <div key={n} className={cn("rounded-card border bg-surface p-5", c)}><p className="font-mono text-[12px]">--color-{n}</p><p className="mt-1 text-xs text-faint">{note}</p></div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Atmosphere</GroupLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {(["amber", "teal", "green"] as const).map((t) => (
            <div key={t} className="relative h-40 overflow-hidden rounded-card border border-line bg-[#0e0e10]"><Glow tone={t} intensity={0.8} /><p className="relative p-4 font-mono text-[12px]">Glow tone="{t}"</p></div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Motion ──────────────────────────────────────────────────────────── */

const EASINGS = [
  { name: "ease-out-expo", curve: [0.23, 1, 0.32, 1], note: "Entrances, reveals, anything that responds to a touch." },
  { name: "ease-in-out-soft", curve: [0.65, 0, 0.35, 1], note: "Charts drawing, things that travel across the screen." },
  { name: "linear", curve: [0, 0, 1, 1], note: "Progress rules and marquees only." },
] as const
const DURATIONS = [["fast", 0.15], ["base", 0.28], ["slow", 0.7], ["cycle", 5.6]] as const

export function Motion() {
  const [run, setRun] = useState(0)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Every duration is a token; each easing is played over 1s below.</p>
        <button type="button" onClick={() => setRun((r) => r + 1)} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm transition-[background-color,transform] hover:bg-white/8 active:scale-[0.97]">
          <Play className="size-3.5" />Play
        </button>
      </div>
      <ul className="divide-y divide-line rounded-card border border-line bg-surface">
        {EASINGS.map((e) => (
          <li key={e.name} className="grid gap-3 p-5 md:grid-cols-[220px_1fr] md:items-center">
            <div><p className="font-mono text-[12px]">--{e.name}</p><p className="mt-1 text-xs text-faint">{e.note}</p></div>
            <div className="relative h-8 rounded-full bg-white/5">
              <motion.span key={run} className="absolute top-1 left-1 size-6 rounded-full bg-ember" initial={{ x: 0 }} animate={{ x: "var(--travel)" }} style={{ "--travel": "min(calc(100cqw - 32px), 560px)" } as React.CSSProperties} transition={{ duration: 1, ease: e.curve as unknown as [number, number, number, number] }} />
            </div>
          </li>
        ))}
      </ul>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {DURATIONS.map(([n, s]) => <li key={n} className="rounded-card border border-line bg-surface p-4"><p className="font-mono text-[12px]">--duration-{n}</p><p className="mt-1 text-[22px] font-medium tabular-nums">{s * 1000}<span className="text-xs text-faint">ms</span></p></li>)}
      </ul>
      <p className="text-xs leading-relaxed text-faint">Motion honours reduced-motion: type stops scrambling, charts appear drawn, walkthroughs hold on a step. In the editor the Motion switch and “designing” mode do the same.</p>
    </div>
  )
}

/* ── Iconography and imagery ─────────────────────────────────────────── */

export function Iconography() {
  const names = ["layers", "eye", "trending", "compass", "terminal", "globe", "mic", "landmark", "wallet", "cpu", "bag", "signal", "heart", "truck", "bed", "briefcase", "newspaper", "shield"]
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <GroupLabel>Icons — Lucide, 1.5px line</GroupLabel>
        <ul className="grid grid-cols-6 gap-2 rounded-card border border-line bg-surface p-4">
          {names.map((n) => <li key={n} title={n} className="flex aspect-square items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/6 hover:text-text"><IconByName name={n} className="size-5" strokeWidth={1.5} /></li>)}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-faint">Social marks (X, LinkedIn) come from SVGL and are recoloured with a CSS mask. Brand logos are never drawn by hand; customer wordmarks on the page are fictional type treatments.</p>
      </div>
      <div>
        <GroupLabel>Photography — Pexels</GroupLabel>
        <div className="relative h-60 overflow-hidden rounded-card border border-line">
          <img src={photo} alt="A smiling courier handing a paper bag to a customer" className="absolute inset-0 size-full object-cover object-[50%_58%]" loading="lazy" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-glow-red),transparent_60%)]" />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-faint">Real people in real moments, never grey boxes. One colour wash rises from the bottom edge; overlay data in mono caps. Credit: Mizuno K on Pexels.</p>
      </div>
    </div>
  )
}
