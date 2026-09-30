import { motion } from "motion/react"
import { ArrowDown, ArrowLeft, ArrowRight, Check, Mail, Phone, Send, X } from "lucide-react"
import { useEffect, useState } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel } from "@/components/brand/specimen"
import { Wordmark } from "@/components/ui/wordmark"
import { photo } from "@/content"
import { requestNavigate } from "@/lib/router"
import { cn } from "@/lib/utils"

/** A custom property's current value on :root. */
function useToken(name: string) {
  const [value, setValue] = useState("")
  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])
  return value
}

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what it is: “A 90-second film and 24 cut-downs.”", dont: "Agency filler: “Impactful 360° storytelling.”" },
  { do: "Plain sentences, sentence case.", dont: "Slogans, puns, exclamation marks." },
  { do: "Numbers and names when we have them.", dont: "Superlatives we cannot back up." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>On paper</GroupLabel>
        <div className="flex h-48 items-center justify-center bg-card">
          <div className="p-6 outline-1 outline-dashed outline-ink/20">
            <Wordmark className="text-3xl" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>On ink</GroupLabel>
        <div className="flex h-48 items-center justify-center bg-night">
          <div className="p-6 outline-1 outline-dashed outline-snow/20">
            <Wordmark tone="snow" className="text-3xl" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="border-t border-line pt-3">
          <dt className="font-medium">Clear space</dt>
          <dd className="mt-1 text-ink-soft">The height of the “K” on every side — the dashed box.</dd>
        </div>
        <div className="border-t border-line pt-3">
          <dt className="font-medium">Minimum size</dt>
          <dd className="mt-1 flex items-center gap-3 text-ink-soft">
            <Wordmark className="text-sm" /> 14px
          </dd>
        </div>
        <div className="border-t border-line pt-3">
          <dt className="font-medium">The full stop</dt>
          <dd className="mt-1 text-ink-soft">Always in the accent colour. The only place the accent appears by default.</dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-line border-y border-line text-sm">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-2 py-4 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={2} />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-mute">
                <X className="mt-0.5 size-4 shrink-0 text-danger" strokeWidth={2} />
                {line.dont}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ─── Colour ──────────────────────────────────────────────────────────── */

type SwatchSpec = { name: string; token: string; role: string }

const COLOUR_GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface",
    swatches: [
      { name: "Paper", token: "--color-paper", role: "Page" },
      { name: "Card", token: "--color-card", role: "Raised panels, rare" },
      { name: "Night", token: "--color-night", role: "Dark sections, footer" },
      { name: "Night raised", token: "--color-night-raised", role: "Hover on dark" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "Ink", token: "--color-ink", role: "Headings, body" },
      { name: "Ink soft", token: "--color-ink-soft", role: "Secondary text" },
      { name: "Ink mute", token: "--color-ink-mute", role: "Labels, meta" },
      { name: "Snow", token: "--color-snow", role: "Text on night" },
      { name: "Snow mute", token: "--color-snow-mute", role: "Secondary on night" },
    ],
  },
  {
    label: "Lines",
    swatches: [
      { name: "Line", token: "--color-line", role: "Hairlines on paper" },
      { name: "Line dark", token: "--color-line-dark", role: "Hairlines on night" },
    ],
  },
  {
    label: "Accent & status",
    swatches: [
      { name: "Accent", token: "--color-accent", role: "The full stop, links on dark, active dot" },
      { name: "Accent deep", token: "--color-accent-deep", role: "Accent, hover" },
      { name: "Danger", token: "--color-danger", role: "Form errors" },
      { name: "Success", token: "--color-success", role: "Confirmations" },
    ],
  },
]

function Swatch({ name, token, role }: SwatchSpec) {
  const value = useToken(token)
  const onPaper = contrast(value, "#eeebe5")
  const onNight = contrast(value, "#141311")
  return (
    <div>
      <div className="h-20 border border-line" style={{ background: `var(${token})` }} />
      <p className="mt-2 text-sm font-medium">{name}</p>
      <p className="font-mono text-[11px] text-ink-mute">
        {token} · {toHex(value)}
      </p>
      <p className="mt-0.5 text-xs text-ink-soft">{role}</p>
      <p className="mt-1 font-mono text-[10px] text-ink-mute">
        paper {onPaper?.toFixed(1)} · night {onNight?.toFixed(1)}
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {group.swatches.map((s) => (
              <Swatch key={s.token} {...s} />
            ))}
          </div>
        </div>
      ))}
      <p className="max-w-2xl text-sm text-ink-soft">
        Colour comes from the photography. The interface stays paper and ink; sections marked{" "}
        <code className="font-mono">data-tone="dark"</code> flip the header to paper as they pass under it.
      </p>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const SCALE = [
  { name: "Display XL", className: "display text-[clamp(3rem,8.4vw,8.5rem)]", sample: "Selected work" },
  { name: "Display L", className: "display text-[clamp(2.25rem,4.6vw,4.5rem)]", sample: "Three things, in-house" },
  { name: "Title", className: "text-2xl font-medium tracking-[-0.03em]", sample: "Show it early" },
  { name: "Body L", className: "text-lg leading-snug", sample: "The people you brief are the people who make it." },
  { name: "Body", className: "text-base leading-snug", sample: "We reply within one working day." },
  { name: "Small", className: "text-sm", sample: "Halve Maan FC — Film, Social" },
  { name: "Label", className: "label", sample: "01 Selected work" },
]

function ScaleRow({ name, className, sample }: (typeof SCALE)[number]) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "font-weight", "line-height", "letter-spacing"])
  return (
    <div className="grid gap-2 border-t border-line py-5 md:grid-cols-[12rem_1fr]">
      <div className="font-mono text-[11px] text-ink-mute">
        <p className="text-sm font-medium text-ink">{name}</p>
        <p>
          {v["font-size"]} / {v["line-height"]}
        </p>
        <p>
          {v["font-weight"]} · {v["letter-spacing"]}
        </p>
      </div>
      <p ref={ref} className={cn("min-w-0 truncate", className)}>
        {sample}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border-t border-line pt-4">
          <p className="display text-6xl">Aa</p>
          <p className="mt-3 text-sm font-medium">Instrument Sans</p>
          <p className="text-sm text-ink-soft">Everything: headings at 500 with tight tracking, text at 400.</p>
        </div>
        <div className="border-t border-line pt-4">
          <p className="font-mono text-5xl">Aa</p>
          <p className="mt-3 text-sm font-medium">JetBrains Mono</p>
          <p className="text-sm text-ink-soft">Labels, section numbers and meta, in caps at 11px.</p>
        </div>
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        {SCALE.map((row) => (
          <ScaleRow key={row.name} {...row} />
        ))}
      </div>
      <div>
        <GroupLabel>Numerals</GroupLabel>
        <p className="display text-7xl tabular-nums">2019 · 140+</p>
      </div>
    </div>
  )
}

/* ─── Space, radii, shadows, borders ─────────────────────────────────── */

const SPACES = [1, 2, 3, 4, 6, 8, 10, 14, 20]

function TokenValue({ token }: { token: string }) {
  const value = useToken(token)
  return <p className="font-mono text-[10px] break-all text-ink-mute">{value}</p>
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Spacing — a 4px grid</GroupLabel>
        <div className="flex flex-wrap items-end gap-4">
          {SPACES.map((n) => (
            <div key={n} className="flex flex-col items-center gap-2">
              <div className="bg-ink" style={{ width: n * 4, height: n * 4 }} />
              <span className="font-mono text-[10px] text-ink-mute">{n * 4}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border-t border-line pt-3">
            <p className="text-sm font-medium">Gutter</p>
            <TokenValue token="--spacing-gutter" />
          </div>
          <div className="border-t border-line pt-3">
            <p className="text-sm font-medium">Section rhythm</p>
            <TokenValue token="--spacing-section" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Grid</GroupLabel>
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={cn("h-16", i < 3 ? "bg-ink/20" : "bg-ink/8")} />
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-soft">Twelve columns. Labels take the first three; content starts at column four.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { token: "--radius-none", name: "Radius none", use: "Photos, sections" },
          { token: "--radius-sm", name: "Radius sm", use: "Buttons, chips" },
          { token: "--shadow-lift", name: "Lift", use: "The hover preview only" },
        ].map((t) => (
          <div key={t.token} className="border-t border-line pt-3">
            <div
              className="h-16 bg-card"
              style={t.token.startsWith("--shadow") ? { boxShadow: `var(${t.token})` } : { borderRadius: `var(${t.token})`, background: "var(--color-ink)" }}
            />
            <p className="mt-3 text-sm font-medium">{t.name}</p>
            <TokenValue token={t.token} />
            <p className="text-xs text-ink-soft">{t.use}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-line pt-3 text-sm text-ink-soft">
        Borders: 1px hairlines only — <code className="font-mono">--color-line</code> on paper, <code className="font-mono">--color-line-dark</code> on night.
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const EASINGS = [
  { token: "--ease-out", name: "Out", use: "Entrances, hovers, reveals", curve: [0.23, 1, 0.32, 1] },
  { token: "--ease-in-out", name: "In-out", use: "Things that move on screen", curve: [0.77, 0, 0.175, 1] },
  { token: "--ease-brush", name: "Brush", use: "The page transition", curve: [0.7, 0, 0.3, 1] },
]

function EasingDemo({ token, name, use, curve }: (typeof EASINGS)[number]) {
  const [on, setOn] = useState(false)
  const value = useToken(token)
  return (
    <div className="border-t border-line pt-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{name}</p>
        <button type="button" onClick={() => setOn((v) => !v)} className="text-sm underline underline-offset-4 hover:opacity-60">
          Play
        </button>
      </div>
      <p className="font-mono text-[10px] text-ink-mute">{value}</p>
      <p className="text-xs text-ink-soft">{use}</p>
      <div className="relative mt-4 h-6 bg-card">
        <motion.div
          className="absolute top-0 left-0 size-6 bg-ink"
          animate={{ left: on ? "calc(100% - 1.5rem)" : "0%" }}
          transition={{ duration: 0.8, ease: curve as [number, number, number, number] }}
        />
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-3">
        {EASINGS.map((e) => (
          <EasingDemo key={e.token} {...e} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {["--duration-fast", "--duration-base", "--duration-slow", "--duration-brush"].map((d) => (
          <div key={d} className="border-t border-line pt-3">
            <p className="text-sm font-medium">{d.replace("--duration-", "")}</p>
            <TokenValue token={d} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 bg-night p-6 text-snow">
        <p className="max-w-md text-sm text-snow-mute">
          Page changes: an ink brush stroke covers the screen in 0.9s, holds, and clears in 0.7s. Under reduced motion the page simply swaps.
        </p>
        <button type="button" onClick={() => requestNavigate("/brand#motion")} className="text-sm underline underline-offset-4 hover:opacity-60">
          Play the transition
        </button>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [ArrowRight, ArrowDown, ArrowLeft, Check, X, Phone, Mail, Send]

export function Iconography() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Icons — Lucide at 2px, sparingly</GroupLabel>
        <div className="flex flex-wrap gap-6">
          {ICONS.map((Icon, i) => (
            <Icon key={i} className="size-5" strokeWidth={2} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Photography — real, full-bleed, uncropped by frames</GroupLabel>
        <div className="grid gap-6 sm:grid-cols-3">
          <img src={photo(29708294, 600)} alt="" className="aspect-[4/5] w-full object-cover" />
          <img src={photo(6141089, 600)} alt="" className="aspect-[4/5] w-full object-cover" />
          <img src={photo(20159168, 600)} alt="" className="aspect-[4/5] w-full object-cover grayscale" />
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Work in full colour, square corners, no borders. Team portraits in greyscale until hovered.
        </p>
      </div>
    </div>
  )
}
