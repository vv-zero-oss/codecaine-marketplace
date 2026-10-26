import { Check, Play, X } from "lucide-react"
import { useEffect, useState } from "react"

import { APP_MARKS } from "@/components/brand-marks"
import { GroupLabel } from "@/components/brand/specimen"
import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { AppTile } from "@/components/mockups/app-tile"
import { OrraMark, Wordmark } from "@/components/ui/wordmark"
import { FEATURES } from "@/content"
import { cn } from "@/lib/utils"
import { PHOTOS, pexels } from "@/photos"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what happens: “Your summary is ready when the call ends.”", dont: "Promise magic: “AI-powered productivity revolution!”" },
  { do: "Name the number: “Search a year of meetings in a second.”", dont: "Reach for a superlative: “The smartest notes ever.”" },
  { do: "Calm, plain, a little understated — weight 500, never shouting.", dont: "Exclamation marks, emoji, sparkles on everything." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Logo on canvas</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-card border border-hairline bg-canvas">
          <div className="rounded-ui p-6 outline-1 outline-bone/40 outline-dashed">
            <Wordmark className="text-3xl" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Logo on the horizon</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-card text-snow" style={{ background: "var(--gradient-horizon)" }}>
          <div className="rounded-ui p-6 outline-1 outline-white/25 outline-dashed">
            <Wordmark className="text-3xl" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-card border border-hairline p-5">
          <dt className="font-medium">Clear space</dt>
          <dd className="mt-1 text-ash">The ring’s height on every side — the dashed box above.</dd>
        </div>
        <div className="rounded-card border border-hairline p-5">
          <dt className="font-medium">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ash">
            <Wordmark className="text-base" />
            <span>16px wordmark; 12px ring.</span>
          </dd>
        </div>
        <div className="rounded-card border border-hairline p-5">
          <dt className="font-medium">Ring only</dt>
          <dd className="mt-2 flex items-center gap-3 text-ash">
            <span className="flex size-8 items-center justify-center rounded-ui bg-void text-bone shadow-subtle">
              <OrraMark className="size-5" />
            </span>
            <span>App icon and favicon, bone on void black.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-hairline overflow-hidden rounded-card border border-hairline text-sm">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-mist">
                <X className="mt-0.5 size-4 shrink-0 text-rose" />
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

const COLOUR_GROUPS = [
  { title: "Surface", tokens: ["canvas", "graphite", "raised", "glass", "void", "snow", "snow-dim"] },
  { title: "Text", tokens: ["bone", "ash", "smoke", "mist", "slate", "on-snow"] },
  { title: "Border", tokens: ["hairline-color", "hairline", "hairline-strong"] },
  { title: "Accent — gradients only", tokens: ["violet"] },
  { title: "Status", tokens: ["mint", "rose"] },
  { title: "Devices", tokens: ["device", "device-deep", "screen"] },
]

const GRADIENTS = [
  { token: "gradient-horizon", use: "Hero only — amber to cobalt" },
  { token: "gradient-wash", use: "A thin violet strip on dark UI" },
  { token: "gradient-spotlight", use: "A product reveal — the workspace panel" },
]

function readToken(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim()
}

export function Swatch({ token }: { token: string }) {
  const [value, setValue] = useState("")
  useEffect(() => setValue(readToken(token)), [token])
  return (
    <div className="overflow-hidden rounded-ui border border-hairline">
      <div className="h-16" style={{ background: `var(--${token})` }} />
      <div className="px-3 py-2">
        <p className="truncate font-mono text-[12px]">--{token}</p>
        <p className="font-mono text-[11px] text-mist">{value.startsWith("#") ? toHex(value) : value || "—"}</p>
      </div>
    </div>
  )
}

const PAIRS = [
  ["bone", "canvas"],
  ["ash", "canvas"],
  ["mist", "canvas"],
  ["slate", "canvas"],
  ["bone", "graphite"],
  ["ash", "graphite"],
  ["on-snow", "snow"],
  ["bone", "raised"],
  ["snow", "void"],
  ["mist", "graphite"],
]

export function ColourTokens() {
  const [ratios, setRatios] = useState<Record<string, number | null>>({})
  useEffect(() => {
    setRatios(Object.fromEntries(PAIRS.map(([fg, bg]) => [`${fg}/${bg}`, contrast(readToken(fg), readToken(bg))])))
  }, [])
  return (
    <div className="space-y-10">
      {COLOUR_GROUPS.map((group) => (
        <div key={group.title}>
          <GroupLabel>{group.title}</GroupLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-6">
            {group.tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Gradients — the only colour</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-3">
          {GRADIENTS.map((gradient) => (
            <div key={gradient.token} className="overflow-hidden rounded-ui shadow-subtle">
              <div className="h-20 bg-void" style={{ background: `var(--${gradient.token})` }} />
              <div className="px-3 py-2">
                <p className="truncate font-mono text-[12px]">--{gradient.token}</p>
                <p className="text-[12px] text-mist">{gradient.use}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Text contrast (WCAG 2)</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PAIRS.map(([fg, bg]) => {
            const ratio = ratios[`${fg}/${bg}`]
            return (
              <div key={`${fg}/${bg}`} className="rounded-ui border border-hairline p-3" style={{ background: `var(--${bg})` }}>
                <p className="text-lg" style={{ color: `var(--${fg})` }}>
                  Aa 1,284.50
                </p>
                <p className="mt-1 font-mono text-[11px] opacity-70" style={{ color: `var(--${fg})` }}>
                  {fg} on {bg} · {ratio ? ratio.toFixed(2) : "—"}
                  {ratio && ratio >= 4.5 ? " AA" : ratio && ratio >= 3 ? " AA large" : ""}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const SCALE = [
  { name: "Display", className: "text-display font-medium", sample: "AI notes for every meeting" },
  { name: "Heading lg", className: "font-heading text-heading-lg font-medium", sample: "One searchable memory" },
  { name: "Heading", className: "font-heading text-heading font-medium", sample: "What Orra handles for you" },
  { name: "Heading sm", className: "font-heading text-heading-sm font-medium", sample: "Works in every call app" },
  { name: "Subheading", className: "font-heading text-subheading font-medium text-ash", sample: "Done before you’ve closed the tab." },
  { name: "Body", className: "text-body", sample: "Orra hears “I’ll send that over” and makes it a task." },
  { name: "UI", className: "text-[14px] text-snow/85", sample: "Product  Security  Customers  Pricing" },
  { name: "Caption", className: "text-caption text-mist", sample: "No credit card, no meeting bot, cancel any time." },
  { name: "Eyebrow", className: "text-caption font-medium tracking-[0.08em] text-mist uppercase", sample: "Shared memory" },
]

function TypeRow({ name, className, sample }: (typeof SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-family", "font-size", "font-weight", "line-height", "letter-spacing"])
  return (
    <div className="grid gap-2 border-b border-hairline py-5 lg:grid-cols-[10rem_minmax(0,1fr)] lg:items-baseline">
      <div className="font-mono text-[11px] leading-relaxed text-mist">
        <p className="text-bone">{name}</p>
        <p>
          {values["font-size"]} / {values["line-height"]}
        </p>
        <p>
          {values["font-weight"]} · {values["letter-spacing"]}
        </p>
        <p className="truncate">{values["font-family"]?.split(",")[0]}</p>
      </div>
      <p ref={ref} className={cn("min-w-0 truncate", className)}>
        {sample}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "DM Sans 500 — display, body and UI", family: "font-sans", sample: "Aa" },
          { label: "Geist 500/600 — section headings from 24px", family: "font-heading", sample: "Aa" },
          { label: "Tabular figures — times and counts", family: "font-sans tabular-nums", sample: "32:14" },
        ].map((family) => (
          <div key={family.label} className="rounded-card bg-glass p-5">
            <p className={cn("text-6xl font-medium tracking-[-0.035em]", family.family)}>{family.sample}</p>
            <p className="mt-3 text-sm text-ash">{family.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {SCALE.map((row) => (
          <TypeRow key={row.name} {...row} />
        ))}
      </div>
      <GroupLabel>Numerals</GroupLabel>
      <p className="text-3xl font-medium tracking-[-0.03em] tabular-nums">32:14 · 4.8 · 2,184 meetings</p>
      <p className="mt-1 text-sm text-mist">Timers and counts use tabular figures (`tabular-nums`) so they don’t jitter.</p>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACE = [4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56]
const RADII = ["icon", "ui", "nav", "card", "large", "panel", "pill"]
const SHADOWS = ["subtle", "float"]
const BORDERS = [
  { name: "hairline", className: "border-hairline" },
  { name: "hairline-strong", className: "border-hairline-strong" },
  { name: "hairline-color", className: "border-[var(--hairline-color)]" },
]

export function SpaceAndSurface() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Spacing — 8–16px inside, 64–80px between sections</GroupLabel>
        <div className="space-y-2">
          {SPACE.map((step) => (
            <div key={step} className="flex items-center gap-4">
              <span className="w-12 font-mono text-[11px] text-mist">{step}px</span>
              <span className="h-3 rounded-icon bg-bone/70" style={{ width: step * 4 }} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-7">
          {RADII.map((radius) => (
            <RadiusSample key={radius} name={radius} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid grid-cols-2 gap-6 rounded-card bg-glass p-6">
          {SHADOWS.map((shadow) => (
            <div key={shadow} className="flex flex-col gap-3">
              <div className="h-20 rounded-ui bg-graphite" style={{ boxShadow: `var(--shadow-${shadow})` }} />
              <span className="font-mono text-[11px] text-mist">--shadow-{shadow}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders — 1px hairlines, never heavier; no shadows for elevation</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          {BORDERS.map((border) => (
            <div key={border.name} className={cn("flex h-20 items-end rounded-ui border p-3", border.className)}>
              <span className="font-mono text-[11px] text-mist">--{border.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RadiusSample({ name }: { name: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <div className="flex flex-col gap-2">
      <div ref={ref} className="h-16 border border-hairline-strong bg-glass" style={{ borderRadius: `var(--radius-${name})` }} />
      <span className="font-mono text-[11px] text-mist">
        {name} · {values["border-top-left-radius"]}
      </span>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const EASINGS = [
  { token: "--ease-out-soft", use: "Entrances, reveals, transcript lines, the headline swap" },
  { token: "--ease-in-out-soft", use: "Things moving on screen: the story carousel" },
  { token: "--ease-drawer", use: "Sheets and drawers" },
]
const DURATIONS = ["--duration-fast", "--duration-base", "--duration-slow"]

export function Motion() {
  const [played, setPlayed] = useState(false)
  return (
    <div className="space-y-8">
      <button
        type="button"
        onClick={() => setPlayed((value) => !value)}
        className="inline-flex h-10 items-center gap-2 rounded-ui bg-snow px-4 text-sm text-on-snow transition-transform active:scale-[0.97]"
      >
        <Play className="size-3.5" /> {played ? "Play back" : "Play"}
      </button>
      <div className="space-y-3">
        {EASINGS.map((easing) => (
          <div key={easing.token} className="rounded-card bg-glass p-4">
            <div className="flex flex-wrap justify-between gap-2 font-mono text-[11px] text-mist">
              <span className="text-bone">{easing.token}</span>
              <span>{readToken(easing.token.slice(2))}</span>
            </div>
            <div className="relative mt-3 h-8">
              <span
                className="absolute top-1 left-0 size-6 rounded-pill bg-snow"
                style={{
                  transform: played ? "translateX(calc(min(560px, 70vw)))" : "translateX(0)",
                  transition: `transform var(--duration-slow) var(${easing.token})`,
                }}
              />
            </div>
            <p className="text-sm text-ash">{easing.use}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {DURATIONS.map((duration) => (
          <div key={duration} className="rounded-card border border-hairline p-4">
            <p className="font-mono text-[12px]">{duration}</p>
            <p className="mt-1 text-2xl tabular-nums">{readToken(duration.slice(2))}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-ash">
        Lenis carries the scroll (lerp 0.11). Constant motion — the app wall, the team strip, the orbit — is linear
        CSS. Everything honours reduced motion: drift stops, fades stay.
      </p>
    </div>
  )
}

/* ─── Iconography and imagery ─────────────────────────────────────────── */

export function Iconography() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Lucide, 1.5px stroke, 16–20px; 4px-radius glyph containers</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {FEATURES.map((feature) => (
            <div key={feature.label} className="flex items-center gap-3 rounded-ui border border-hairline p-3 text-sm">
              <feature.icon className="size-[17px] text-ash" strokeWidth={1.5} />
              <span className="truncate">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>App marks — Simple Icons, monochrome on graphite</GroupLabel>
        <div className="flex flex-wrap gap-3">
          {APP_MARKS.map((mark) => (
            <AppTile key={mark.id} mark={mark} className="w-20 sm:w-20" />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Imagery — sparing; product UI first</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[PHOTOS.lecture, PHOTOS.clinic, PHOTOS.cafe, PHOTOS.studio].map((id) => (
            <img key={id} src={pexels(id, 600)} alt="" className="aspect-[4/3] w-full rounded-ui object-cover" />
          ))}
        </div>
        <p className="mt-3 text-sm text-ash">
          The hero and the workspace show the product, not people. Photography appears only where a customer tells
          their story — real teams mid-conversation, from Pexels, in 24px frames, never filtered.
        </p>
      </div>
    </div>
  )
}
