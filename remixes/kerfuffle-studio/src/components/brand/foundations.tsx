import { motion } from "motion/react"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Globe, Mail, Menu, Phone, Send, X } from "lucide-react"
import { useEffect, useState } from "react"

import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { GroupLabel } from "@/components/brand/specimen"
import { Polaroid } from "@/components/ui/polaroid"
import { Emblem, Sticker } from "@/components/ui/sticker"
import { Wordmark } from "@/components/ui/wordmark"
import { photo } from "@/content"
import { requestNavigate } from "@/lib/router"
import { cn } from "@/lib/utils"

/** A custom property's current value on :root, re-read whenever asked. */
function useToken(name: string) {
  const [value, setValue] = useState("")
  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])
  return value
}

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say it plainly: “We make things people watch twice.”", dont: "Agency filler: “Holistic 360° content solutions.”" },
  { do: "A wink, not a joke: “Small crew, big commotion.”", dont: "Trying too hard: “We’re like, totally crazy creatives!!”" },
  { do: "Name the work: “A 90-second film and 24 cut-downs.”", dont: "Vague promises: “Impactful storytelling at scale.”" },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Name on light</GroupLabel>
        <div className="flex h-48 items-center justify-center bg-card">
          <div className="p-6 outline-1 outline-dashed outline-flame/40">
            <Wordmark />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Name on dark</GroupLabel>
        <div className="flex h-48 items-center justify-center bg-night">
          <div className="p-6 outline-1 outline-dashed outline-snow/25">
            <Wordmark tone="snow" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="bg-card p-5">
          <dt className="label text-base">Clear space</dt>
          <dd className="mt-1 text-ink-soft">The height of the “k” on every side — the dashed box.</dd>
        </div>
        <div className="bg-card p-5">
          <dt className="label text-base">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-soft">
            <Wordmark className="text-2xl" />
            <span>24px tall. Smaller, use the seal.</span>
          </dd>
        </div>
        <div className="bg-card p-5">
          <dt className="label text-base">The badge</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-soft">
            <Emblem className="text-2xl" />
            <span>Avatars, stickers, favicons. Lime on ink only.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-line bg-card text-sm">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-green" strokeWidth={3} />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-mute">
                <X className="mt-0.5 size-4 shrink-0 text-red" strokeWidth={3} />
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
      { name: "Paper", token: "--color-paper", role: "Page background" },
      { name: "Card", token: "--color-card", role: "Cards, pills, polaroid edge" },
      { name: "Night (forest)", token: "--color-night", role: "Dark sections, footer" },
      { name: "Night raised", token: "--color-night-raised", role: "Controls on dark" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "Ink", token: "--color-ink", role: "Headlines, body" },
      { name: "Ink soft", token: "--color-ink-soft", role: "Secondary text" },
      { name: "Ink mute", token: "--color-ink-mute", role: "Meta, hints" },
      { name: "Snow", token: "--color-snow", role: "Text on dark and colour" },
      { name: "Snow mute", token: "--color-snow-mute", role: "Secondary on dark" },
    ],
  },
  {
    label: "Border",
    swatches: [
      { name: "Line", token: "--color-line", role: "Hairlines on paper" },
      { name: "Line dark", token: "--color-line-dark", role: "Hairlines on night" },
    ],
  },
  {
    label: "Brand",
    swatches: [
      { name: "Flame", token: "--color-flame", role: "Primary action, accents, transition" },
      { name: "Flame deep", token: "--color-flame-deep", role: "Primary, hover" },
      { name: "Lime", token: "--color-lime", role: "Active states, CTA on dark, badge" },
      { name: "Lime deep", token: "--color-lime-deep", role: "Lime, hover" },
    ],
  },
  {
    label: "Sticker & case colours",
    swatches: [
      { name: "Violet", token: "--color-violet", role: "Social, stickers" },
      { name: "Red", token: "--color-red", role: "Errors, stickers" },
      { name: "Green", token: "--color-green", role: "Stickers, success" },
      { name: "Yellow", token: "--color-yellow", role: "Stickers" },
      { name: "Iris", token: "--color-iris", role: "Scroll badge, cases" },
      { name: "Mint", token: "--color-mint", role: "Case panels" },
      { name: "Blush", token: "--color-blush", role: "Case panels" },
    ],
  },
]

function Swatch({ name, token, role }: SwatchSpec) {
  const value = useToken(token)
  const onPaper = contrast(value, "#f3f3f3")
  const onNight = contrast(value, "#0e0e0e")
  return (
    <div className="bg-card">
      <div className="h-20 border-b border-line" style={{ background: `var(${token})` }} />
      <div className="p-3">
        <p className="label text-sm">{name}</p>
        <p className="font-mono text-[11px] text-ink-mute">
          {token} · {toHex(value)}
        </p>
        <p className="mt-1 text-xs text-ink-soft">{role}</p>
        <p className="mt-2 flex gap-3 font-mono text-[10px] text-ink-mute">
          <span title="Contrast on paper">
            on paper {onPaper?.toFixed(1)}
            {onPaper && onPaper >= 4.5 ? " AA" : ""}
          </span>
          <span title="Contrast on night">
            on night {onNight?.toFixed(1)}
            {onNight && onNight >= 4.5 ? " AA" : ""}
          </span>
        </p>
      </div>
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
            {group.swatches.map((s) => (
              <Swatch key={s.token} {...s} />
            ))}
          </div>
        </div>
      ))}
      <p className="max-w-2xl text-sm text-ink-soft">
        The site is light, with dark chapters rather than a dark mode: sections that set <code className="font-mono">data-tone="dark"</code>{" "}
        switch the signature in the header to white as they pass under it.
      </p>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const FAMILIES = [
  { token: "--font-display", name: "Archivo, 78% width, 900", use: "Every headline and label, always in caps", className: "display text-5xl" },
  { token: "--font-serif", name: "Instrument Serif, italic", use: "The answering words in headlines, case titles, footer links", className: "font-serif text-5xl" },
  { token: "--font-sans", name: "Archivo, normal width", use: "Body copy, intros, form text", className: "font-sans text-3xl" },
  { token: "--font-brand", name: "Shrikhand", use: "The name, name tags and the badge — lower case only", className: "font-brand text-5xl text-flame lowercase" },
  { token: "--font-mono", name: "JetBrains Mono", use: "Numbers in the style guide, counters", className: "font-mono text-2xl" },
]

const SCALE = [
  { name: "Display XL", className: "display text-[clamp(3.25rem,10.5vw,10rem)]", sample: "Motion that" },
  { name: "Display L", className: "display text-[clamp(3rem,8.5vw,7.5rem)]", sample: "Our craft" },
  { name: "Display M", className: "display text-[clamp(2.5rem,6vw,4.75rem)]", sample: "Latest" },
  { name: "Serif display", className: "display-serif text-[clamp(2.5rem,6vw,4.75rem)]", sample: "some noise" },
  { name: "Eyebrow tag", className: "label text-xs", sample: "Fresh off the timeline" },
  { name: "Label", className: "label text-[13px]", sample: "About · Work · What we do" },
  { name: "Body", className: "text-lg leading-snug", sample: "A small crew of animators, editors and makers." },
  { name: "Small", className: "text-sm", sample: "We reply within one working day." },
]

function ScaleRow({ name, className, sample }: (typeof SCALE)[number]) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "font-weight", "line-height", "letter-spacing", "font-family"])
  return (
    <div className="grid gap-2 border-t border-line py-5 md:grid-cols-[12rem_1fr]">
      <div className="font-mono text-[11px] text-ink-mute">
        <p className="label text-sm text-ink">{name}</p>
        <p>
          {v["font-size"]} / {v["line-height"]}
        </p>
        <p>
          weight {v["font-weight"]} · tracking {v["letter-spacing"]}
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
      <div>
        <GroupLabel>Families</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          {FAMILIES.map((f) => (
            <div key={f.token} className="bg-card p-5">
              <p className={f.className}>Aa Kerfuffle</p>
              <p className="mt-3 label text-sm">{f.name}</p>
              <p className="font-mono text-[11px] text-ink-mute">{f.token}</p>
              <p className="mt-1 text-sm text-ink-soft">{f.use}</p>
            </div>
          ))}
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
        <div className="flex flex-wrap items-end gap-10 bg-card p-6">
          <p className="display text-7xl tabular-nums">2019 · 140+</p>
          <p className="font-serif text-4xl tabular-nums">+31 10 204 88 17</p>
          <p className="font-mono text-xl tabular-nums">0123456789</p>
        </div>
      </div>
      <div>
        <GroupLabel>The pairing</GroupLabel>
        <div className="bg-card p-6 text-center text-6xl leading-[0.88] md:text-8xl">
          <span className="display">Heavy caps,</span>
          <br />
          <span className="display-serif text-flame">answered in italics</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Space, radii, shadows, borders ─────────────────────────────────── */

const SPACES = [1, 2, 3, 4, 6, 8, 10, 14, 20]
const SHADOWS = [
  { token: "--shadow-card", name: "Card", use: "Pills and white cards on paper" },
  { token: "--shadow-sticker", name: "Sticker", use: "Stickers, the seal, the scroll badge" },
  { token: "--shadow-polaroid", name: "Polaroid", use: "Photos tipped onto the page" },
  { token: "--shadow-lift", name: "Lift", use: "Service cards and anything picked up" },
]
const RADII = [
  { token: "--radius-card", name: "Card", use: "Cards, photos, panels — the default" },
  { token: "--radius-chip", name: "Chip", use: "Fields, small facts" },
  { token: "--radius-pill", name: "Pill", use: "Buttons, nav, tags, stickers" },
]

function TokenValue({ token }: { token: string }) {
  const value = useToken(token)
  return <p className="font-mono text-[10px] break-all text-ink-mute">{value}</p>
}

export function SpaceAndSurface() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Spacing — a 4px grid</GroupLabel>
        <div className="flex flex-wrap items-end gap-4 bg-card p-6">
          {SPACES.map((n) => (
            <div key={n} className="flex flex-col items-center gap-2">
              <div className="bg-flame" style={{ width: n * 4, height: n * 4 }} />
              <span className="font-mono text-[10px] text-ink-mute">{n * 4}px</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="bg-card p-5">
            <p className="label text-sm">Gutter</p>
            <TokenValue token="--spacing-gutter" />
            <div className="mt-3 h-4 w-gutter bg-lime" />
          </div>
          <div className="bg-card p-5">
            <p className="label text-sm">Section rhythm</p>
            <TokenValue token="--spacing-section" />
            <div className="mt-3 h-4 w-section max-w-full bg-violet" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-3">
          {RADII.map((r) => (
            <div key={r.token} className="bg-card p-5">
              <div className="h-16 bg-flame" style={{ borderRadius: `var(${r.token})` }} />
              <p className="mt-3 label text-sm">{r.name}</p>
              <TokenValue token={r.token} />
              <p className="text-xs text-ink-soft">{r.use}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid gap-6 bg-paper sm:grid-cols-2 lg:grid-cols-4">
          {SHADOWS.map((s) => (
            <div key={s.token}>
              <div className="h-24 bg-card" style={{ boxShadow: `var(${s.token})` }} />
              <p className="mt-3 label text-sm">{s.name}</p>
              <TokenValue token={s.token} />
              <p className="text-xs text-ink-soft">{s.use}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="bg-card p-5">
            <div className="border-t border-line pt-3 text-sm">1px line — dividers on paper</div>
          </div>
          <div className="bg-card p-5">
            <div className="border-t border-ink pt-3 text-sm">1px ink — lists, the FAQ, numbers</div>
          </div>
          <div className="bg-card p-5">
            <div className="rounded-card border-2 border-ink p-3 text-sm">2px ink outline — every card, photo and sticker</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const EASINGS = [
  { token: "--ease-out", name: "Out", use: "Entrances, hovers, reveals", curve: [0.22, 1, 0.36, 1] },
  { token: "--ease-in-out", name: "In-out", use: "Things that move on screen", curve: [0.65, 0, 0.35, 1] },
  { token: "--ease-brush", name: "Brush", use: "The page transition’s stroke", curve: [0.7, 0, 0.3, 1] },
  { token: "--ease-pop", name: "Pop", use: "Stickers and names landing", curve: [0.34, 1.56, 0.64, 1] },
]
const DURATIONS = ["--duration-fast", "--duration-base", "--duration-slow", "--duration-brush"]

function EasingDemo({ token, name, use, curve }: (typeof EASINGS)[number]) {
  const [on, setOn] = useState(false)
  const value = useToken(token)
  return (
    <div className="bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="label text-sm">{name}</p>
        <button type="button" onClick={() => setOn((v) => !v)} className="label text-xs text-flame hover:underline">
          Play
        </button>
      </div>
      <p className="font-mono text-[10px] text-ink-mute">
        {token}: {value}
      </p>
      <p className="text-xs text-ink-soft">{use}</p>
      <div className="relative mt-4 h-8 bg-paper">
        <motion.div
          className="absolute top-0 left-0 size-8 bg-flame"
          animate={{ left: on ? "calc(100% - 2rem)" : "0%" }}
          transition={{ duration: 0.9, ease: curve as [number, number, number, number] }}
        />
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Easings</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          {EASINGS.map((e) => (
            <EasingDemo key={e.token} {...e} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Durations</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {DURATIONS.map((d) => (
            <div key={d} className="bg-card p-5">
              <p className="label text-sm">{d.replace("--duration-", "")}</p>
              <TokenValue token={d} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 bg-night p-6 text-snow">
        <p className="max-w-md text-sm">
          The page transition: a flame-coloured brush stroke covers the screen in 0.9s on the brush curve, holds, and clears in 0.7s.
          It runs on every page change; under reduced motion the page simply swaps.
        </p>
        <button
          type="button"
          onClick={() => requestNavigate("/brand#motion")}
          className="h-11 rounded-pill bg-lime px-5 label text-xs text-ink transition-colors hover:bg-lime-deep"
        >
          Play the transition
        </button>
      </div>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

const ICONS = [ArrowRight, ArrowDown, ArrowLeft, ArrowUp, Check, X, Menu, Phone, Mail, Send, Globe]

export function Iconography() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Icons — Lucide, 2.5px stroke, in a round well</GroupLabel>
        <div className="flex flex-wrap gap-3">
          {ICONS.map((Icon, i) => (
            <span key={i} className="flex size-12 items-center justify-center rounded-full bg-flame text-snow">
              <Icon className="size-5" strokeWidth={2.5} />
            </span>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Photography — real, warm, a bit loud (Pexels)</GroupLabel>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <Polaroid src={photo(6141089, 500)} alt="Polaroid treatment" rotate={-4} className="aspect-[4/5]" />
            <p className="mt-3 text-sm text-ink-soft">Snapshot — the crew and behind the scenes, ink outline, tipped ±3–5°.</p>
          </div>
          <div>
            <div className="aspect-[4/5] rounded-card border-2 border-ink bg-violet p-2">
              <img src={photo(29708294, 500)} alt="Colour card treatment" className="size-full rounded-[14px] object-cover" />
            </div>
            <p className="mt-3 text-sm text-ink-soft">Colour card — cases in the reel, inset in the case colour.</p>
          </div>
          <div>
            <div className="aspect-[4/5] rounded-card border-2 border-ink bg-yellow">
              <img src={photo(7683650, 500)} alt="Lifted treatment" className="size-full -translate-x-1.5 -translate-y-1.5 rounded-[18px] border-2 border-ink object-cover" />
            </div>
            <p className="mt-3 text-sm text-ink-soft">Lifted — the work grid; the picture lifts off its colour block on hover.</p>
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Stickers — the studio’s illustration</GroupLabel>
        <div className="flex flex-wrap items-center gap-6 bg-card p-8">
          <Sticker text="Keyframe club" tone="flame" rotate={-6} />
          <Sticker text="Render & chill" tone="lime" rotate={4} />
          <Sticker text="Ctrl+Z heroes" tone="yellow" rotate={-3} />
          <Sticker text="Loop de loop" tone="violet" rotate={6} />
          <Emblem className="text-4xl" />
        </div>
      </div>
    </div>
  )
}
