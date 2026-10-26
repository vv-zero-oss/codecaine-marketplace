import { Check, Play, X } from "lucide-react"
import { useEffect, useState } from "react"

import { PAYMENT_MARKS } from "@/components/brand-marks"
import { GroupLabel } from "@/components/brand/specimen"
import { contrast, toHex, useComputed } from "@/components/brand/read-style"
import { PaymentTile } from "@/components/mockups/payment-tile"
import { OrraMark, Wordmark } from "@/components/ui/wordmark"
import { PRODUCTS } from "@/content"
import { cn } from "@/lib/utils"
import { PHOTOS, pexels } from "@/photos"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Say what happens: “Payouts land the next working day.”", dont: "Promise a feeling: “Experience seamless payments!”" },
  { do: "Name the number: “40 methods, one integration.”", dont: "Reach for a superlative: “The world’s best checkout.”" },
  { do: "Plain, warm, a little understated.", dont: "Exclamation marks, emoji, jargon." },
]

export function BrandIdentity() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <GroupLabel>Logo on paper</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-xl border border-line bg-paper">
          <div className="rounded-lg p-6 outline-1 outline-ember/50 outline-dashed">
            <Wordmark className="text-3xl" />
          </div>
        </div>
      </div>
      <div>
        <GroupLabel>Logo on espresso</GroupLabel>
        <div className="flex h-44 items-center justify-center rounded-xl bg-espresso text-ink-inverse">
          <div className="rounded-lg p-6 outline-1 outline-white/25 outline-dashed">
            <Wordmark className="text-3xl" />
          </div>
        </div>
      </div>
      <dl className="grid gap-4 text-sm sm:grid-cols-3 lg:col-span-2">
        <div className="rounded-xl border border-line p-5">
          <dt className="font-medium">Clear space</dt>
          <dd className="mt-1 text-ink-2">The ring’s height on every side — the dashed box above.</dd>
        </div>
        <div className="rounded-xl border border-line p-5">
          <dt className="font-medium">Minimum size</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-2">
            <Wordmark className="text-base" />
            <span>16px wordmark; 12px ring.</span>
          </dd>
        </div>
        <div className="rounded-xl border border-line p-5">
          <dt className="font-medium">Ring only</dt>
          <dd className="mt-2 flex items-center gap-3 text-ink-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-cocoa text-ink-inverse">
              <OrraMark className="size-5" />
            </span>
            <span>App icon and favicon; the dot is always ember.</span>
          </dd>
        </div>
      </dl>
      <div className="lg:col-span-2">
        <GroupLabel>Voice</GroupLabel>
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line text-sm">
          {VOICE.map((line) => (
            <li key={line.do} className="grid gap-2 p-5 sm:grid-cols-2 sm:gap-6">
              <p className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                {line.do}
              </p>
              <p className="flex gap-2.5 text-ink-3">
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
  { title: "Surface", tokens: ["paper", "surface", "surface-2", "surface-3", "espresso", "night", "graphite", "screen"] },
  { title: "Text", tokens: ["ink", "ink-2", "ink-3", "ink-4", "ink-inverse"] },
  { title: "Border", tokens: ["line", "line-strong", "line-inverse"] },
  { title: "Brand", tokens: ["cocoa", "cocoa-hover", "ember", "ember-deep", "ember-glow", "card-tan", "card-cream"] },
  { title: "Status", tokens: ["honey-bg", "honey-ink", "mint", "rose"] },
  { title: "Payment tiles", tokens: PAYMENT_MARKS.map((mark) => `pm-${mark.id}`) },
]

function readToken(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim()
}

export function Swatch({ token }: { token: string }) {
  const [value, setValue] = useState("")
  useEffect(() => setValue(readToken(token)), [token])
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="h-16" style={{ background: `var(--${token})` }} />
      <div className="px-3 py-2">
        <p className="truncate font-mono text-[12px]">--{token}</p>
        <p className="font-mono text-[11px] text-ink-3">{value.startsWith("#") || value.startsWith("rgb") ? toHex(value) : value || "—"}</p>
      </div>
    </div>
  )
}

const PAIRS = [
  ["ink", "paper"],
  ["ink-2", "paper"],
  ["ink-3", "paper"],
  ["ink", "surface"],
  ["ink-2", "surface"],
  ["ink-inverse", "cocoa"],
  ["ink-inverse", "espresso"],
  ["ember-deep", "paper"],
  ["ember", "surface"],
  ["honey-ink", "honey-bg"],
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
        <GroupLabel>Text contrast (WCAG 2)</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PAIRS.map(([fg, bg]) => {
            const ratio = ratios[`${fg}/${bg}`]
            return (
              <div key={`${fg}/${bg}`} className="rounded-lg border border-line p-3" style={{ background: `var(--${bg})` }}>
                <p className="text-lg" style={{ color: `var(--${fg})` }}>
                  Aa 1,284.50
                </p>
                <p className="mt-1 font-mono text-[11px] text-ink-3 mix-blend-difference">
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
  { name: "Display", className: "text-display", sample: "One platform for" },
  { name: "Headline", className: "text-headline", sample: "Run your whole cash flow" },
  { name: "Title", className: "text-title", sample: "Take 40+ payment methods" },
  { name: "Lead", className: "text-xl leading-snug", sample: "Our team knows your market and picks up fast." },
  { name: "Body", className: "text-base leading-[1.4]", sample: "Refund an order, answer a dispute, recover a renewal." },
  { name: "UI", className: "text-[14.5px]", sample: "Products  Developers  Customers  Pricing" },
  { name: "Small", className: "text-[13px] text-ink-3", sample: "No setup fee, no monthly minimum, no lock-in." },
  { name: "Eyebrow", className: "font-mono text-eyebrow uppercase", sample: "Business accounts" },
  { name: "Quote", className: "font-serif text-[19px] text-ink-2", sample: "“Our conversion in Belgium doubled in a month.”" },
]

function TypeRow({ name, className, sample }: (typeof SCALE)[number]) {
  const [ref, values] = useComputed<HTMLParagraphElement>(["font-family", "font-size", "font-weight", "line-height", "letter-spacing"])
  return (
    <div className="grid gap-2 border-b border-line py-5 lg:grid-cols-[10rem_minmax(0,1fr)] lg:items-baseline">
      <div className="font-mono text-[11px] leading-relaxed text-ink-3">
        <p className="text-ink">{name}</p>
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
          { label: "Inter — everything you read", family: "font-sans", sample: "Aa" },
          { label: "JetBrains Mono — eyebrows, codes", family: "font-mono", sample: "Aa" },
          { label: "Source Serif 4 — customer quotes", family: "font-serif", sample: "Aa" },
        ].map((family) => (
          <div key={family.label} className="rounded-xl bg-surface p-5">
            <p className={cn("text-6xl tracking-[-0.04em]", family.family)}>{family.sample}</p>
            <p className="mt-3 text-sm text-ink-2">{family.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {SCALE.map((row) => (
          <TypeRow key={row.name} {...row} />
        ))}
      </div>
      <GroupLabel>Numerals</GroupLabel>
      <p className="text-3xl tracking-[-0.03em] tabular-nums">€184,920.00 · 4.7 · 12.4%</p>
      <p className="mt-1 text-sm text-ink-3">Amounts use tabular figures (`tabular-nums`) so columns line up.</p>
    </div>
  )
}

/* ─── Spacing, radii, shadows, borders ────────────────────────────────── */

const SPACE = [4, 8, 12, 16, 24, 32, 40, 64, 96, 128]
const RADII = ["sm", "md", "lg", "xl", "2xl", "3xl"]
const SHADOWS = ["card", "soft", "button", "pop", "chip", "device"]
const BORDERS = [
  { name: "line", className: "border-line" },
  { name: "line-strong", className: "border-line-strong" },
  { name: "line-inverse", className: "border-line-inverse bg-espresso" },
]

export function SpaceAndSurface() {
  return (
    <div className="space-y-10">
      <div>
        <GroupLabel>Spacing — a 4px grid</GroupLabel>
        <div className="space-y-2">
          {SPACE.map((step) => (
            <div key={step} className="flex items-center gap-4">
              <span className="w-12 font-mono text-[11px] text-ink-3">{step}px</span>
              <span className="h-3 rounded-sm bg-ember/70" style={{ width: step * 2 }} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {RADII.map((radius) => (
            <RadiusSample key={radius} name={radius} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid grid-cols-2 gap-6 rounded-xl bg-surface p-6 sm:grid-cols-3">
          {SHADOWS.map((shadow) => (
            <div key={shadow} className="flex flex-col gap-3">
              <div className="h-20 rounded-lg bg-paper" style={{ boxShadow: `var(--shadow-${shadow})` }} />
              <span className="font-mono text-[11px] text-ink-3">--shadow-{shadow}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders — 1px hairlines only</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          {BORDERS.map((border) => (
            <div key={border.name} className={cn("flex h-20 items-end rounded-lg border p-3", border.className)}>
              <span className="font-mono text-[11px] text-ink-3">--{border.name}</span>
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
      <div ref={ref} className="h-16 border border-line-strong bg-surface" style={{ borderRadius: `var(--radius-${name})` }} />
      <span className="font-mono text-[11px] text-ink-3">
        {name} · {values["border-top-left-radius"]}
      </span>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const EASINGS = [
  { token: "--ease-out-soft", use: "Entrances, reveals, chips, the headline swap" },
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
        className="inline-flex h-10 items-center gap-2 rounded-md bg-cocoa px-4 text-sm text-ink-inverse transition-transform active:scale-[0.97]"
      >
        <Play className="size-3.5" /> {played ? "Play back" : "Play"}
      </button>
      <div className="space-y-3">
        {EASINGS.map((easing) => (
          <div key={easing.token} className="rounded-xl bg-surface p-4">
            <div className="flex flex-wrap justify-between gap-2 font-mono text-[11px] text-ink-3">
              <span className="text-ink">{easing.token}</span>
              <span>{readToken(easing.token.slice(2))}</span>
            </div>
            <div className="relative mt-3 h-8">
              <span
                className="absolute top-1 left-0 size-6 rounded-full bg-ember"
                style={{
                  transform: played ? "translateX(calc(min(560px, 70vw)))" : "translateX(0)",
                  transition: `transform var(--duration-slow) var(${easing.token})`,
                }}
              />
            </div>
            <p className="text-sm text-ink-2">{easing.use}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {DURATIONS.map((duration) => (
          <div key={duration} className="rounded-xl border border-line p-4">
            <p className="font-mono text-[12px]">{duration}</p>
            <p className="mt-1 text-2xl tabular-nums">{readToken(duration.slice(2))}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-ink-2">
        Lenis carries the scroll (lerp 0.11). Constant motion — the method wall, the merchant strip, the orbit — is linear
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
        <GroupLabel>Lucide, 1.5px stroke, 17px in UI</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {PRODUCTS.map((product) => (
            <div key={product.label} className="flex items-center gap-3 rounded-lg border border-line p-3 text-sm">
              <product.icon className="size-[17px] text-ink-2" strokeWidth={1.5} />
              <span className="truncate">{product.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Payment marks — Simple Icons on their brand colour</GroupLabel>
        <div className="flex flex-wrap gap-3">
          {PAYMENT_MARKS.map((mark) => (
            <PaymentTile key={mark.id} mark={mark} className="w-20 rounded-[14px] sm:w-20" />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Photography — warm, real, mid-task</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[PHOTOS.counter, PHOTOS.warehouse, PHOTOS.pottery, PHOTOS.bakery].map((id) => (
            <img key={id} src={pexels(id, 600)} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-2">
          People at work and the things they sell, in daylight and warm interiors, from Pexels. Rounded 16px, never
          filtered; a dark gradient only where text sits on top.
        </p>
      </div>
    </div>
  )
}
