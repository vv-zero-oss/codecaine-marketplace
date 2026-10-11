import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, ArrowUp, Flame, Minus, Package, Plus, ShoppingBag, Shuffle, Truck, UserRound, X } from "lucide-react"

import { cleanShadow, contrast, toHex, trackingEm, useComputed } from "@/components/brand/read-style"
import { GroupLabel, Panel } from "@/components/brand/specimen"
import { CoffeeBag } from "@/components/mock/coffee-bag"
import { TruantLogo, TruantMark } from "@/components/site/logo"
import { SocialIcon } from "@/components/site/social-icon"
import { photo } from "@/lib/photos"
import { BEZIER } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Talk about the hour: “Coffee for the hour you stole back.”", dont: "Talk about the product: “Premium artisanal coffee solutions.”" },
  { do: "Short, dry, a little truant. Full stops.", dont: "Exclamation marks, emoji, “Treat yourself!!”" },
  { do: "Loud poster type for the promise, a plain grotesk for the reason.", dont: "Poster type for paragraphs, or three weights in one line." },
  { do: "Name the farm, the process and the price.", dont: "“Ethically sourced” with nothing behind it." },
]

function LogoGround({ tone }: { tone: "paper" | "night" | "photo" }) {
  return (
    <div className={cn("relative flex h-48 items-center justify-center overflow-hidden rounded-[var(--radius-panel)]", tone === "paper" && "bg-paper-2 text-ink", tone === "night" && "bg-night text-night-fg", tone === "photo" && "text-white")}>
      {tone === "photo" && (
        <>
          <img src={photo("sunsetLake", 700, 400)} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/25" />
        </>
      )}
      {/* Clear space: the stem's width on every side. */}
      <div className={cn("relative rounded-[var(--radius-tag)] p-[12px] outline-1 outline-dashed", tone === "paper" ? "outline-ink-4" : "outline-white/50")}>
        <TruantLogo className="[&_svg]:h-9 [&>span]:text-[34px]" />
      </div>
    </div>
  )
}

export function BrandIdentity() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-3">
        {(["paper", "night", "photo"] as const).map((t) => (
          <div key={t}>
            <LogoGround tone={t} />
            <p className="mt-3 text-[14px] text-ink-3">{t === "paper" ? "On paper — ink." : t === "night" ? "On night — paper." : "On a photograph — white, or blend-difference when it floats."}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <Panel className="flex flex-wrap items-end gap-6 p-6 sm:gap-8">
          {[56, 40, 28, 20].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <span style={{ height: s }} className="flex items-end">
                <TruantMark className="h-full w-auto text-ink" />
              </span>
              <span className="text-[11px] text-ink-3 tabular-nums">
                {s}px{s === 20 ? " min" : ""}
              </span>
            </div>
          ))}
        </Panel>
        <Panel className="p-6 text-[15px] text-ink-2">
          <p>
            <span className="font-medium text-ink">The mark</span> is a T leaving in a hurry: its bar and stem, with two speed lines trailing off to the left. It floats top-left on every page in blend-difference, so it is white over photographs and dark over paper without a scroll listener. Never under 20px tall, never in a series colour, never rotated.
          </p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Voice</GroupLabel>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line">
          {VOICE.map((v) => (
            <div key={v.do} className="grid border-b border-line last:border-b-0 md:grid-cols-2">
              <p className="flex gap-3 p-4 text-[15px] text-ink-2">
                <span className="mt-0.5 text-[11px] font-semibold text-ok">DO</span>
                {v.do}
              </p>
              <p className="flex gap-3 border-line p-4 text-[15px] text-ink-3 md:border-l">
                <span className="mt-0.5 text-[11px] font-semibold text-tomato">DON’T</span>
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

type SwatchSpec = { name: string; role: string; on?: string }

const GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface",
    swatches: [
      { name: "paper", role: "The page" },
      { name: "paper-2", role: "Brew guide, taste map, inputs" },
      { name: "shelf", role: "Behind every bag" },
      { name: "raised", role: "Cards, drawers, dialogs" },
      { name: "rail", role: "The right-hand rail" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "ink", role: "Headlines, solid button", on: "paper" },
      { name: "ink-2", role: "Body", on: "paper" },
      { name: "ink-3", role: "Secondary, eyebrows", on: "paper" },
      { name: "ink-4", role: "Placeholders only", on: "paper" },
    ],
  },
  {
    label: "Border",
    swatches: [
      { name: "line", role: "Hairlines" },
      { name: "line-strong", role: "Fields, outlined chips" },
    ],
  },
  {
    label: "Accent",
    swatches: [
      { name: "tomato", role: "Shop now, cart count, checkout", on: "paper" },
      { name: "tomato-hover", role: "Hover", on: "paper" },
      { name: "tomato-press", role: "Pressed", on: "paper" },
      { name: "tomato-soft", role: "Its ground" },
      { name: "sky", role: "The mission band" },
    ],
  },
  {
    label: "Series",
    swatches: [
      { name: "recess", role: "Recess — bright" },
      { name: "recess-ink", role: "Its type", on: "recess" },
      { name: "detour", role: "Detour — warm" },
      { name: "field", role: "Field Trip — limited" },
      { name: "field-ink", role: "Its type", on: "field" },
      { name: "latebell", role: "Late Bell — dark" },
    ],
  },
  {
    label: "Night and status",
    swatches: [
      { name: "night", role: "Footer, journeys" },
      { name: "night-2", role: "Raised on night" },
      { name: "night-fg", role: "Type on night", on: "night" },
      { name: "night-muted", role: "Secondary on night", on: "night" },
      { name: "ok", role: "Success", on: "raised" },
      { name: "ok-soft", role: "Its ground" },
    ],
  },
]

function Swatch({ spec }: { spec: SwatchSpec }) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  const value = values["background-color"] ?? ""
  const ratio = spec.on ? contrast(value, getComputedStyle(document.documentElement).getPropertyValue(`--color-${spec.on}`).trim()) : null
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-raised shadow-card">
      <div ref={ref} className="h-20" style={{ backgroundColor: `var(--color-${spec.name})` }} />
      <div className="p-3">
        <p className="text-[13px] font-medium">{spec.name}</p>
        <p className="text-[11.5px] text-ink-3 tabular-nums">
          {toHex(value)}
          {ratio ? ` · ${ratio.toFixed(1)}:1 on ${spec.on}` : ""}
        </p>
        <p className="mt-1 text-[12px] text-ink-2">{spec.role}</p>
      </div>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="flex flex-col gap-10">
      {GROUPS.map((g) => (
        <div key={g.label}>
          <GroupLabel>{g.label}</GroupLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {g.swatches.map((s) => (
              <Swatch key={s.name} spec={s} />
            ))}
          </div>
        </div>
      ))}
      <p className="text-[14px] text-ink-3">There is one theme: warm paper by day and the night footer. Series colours are always printed with the series name — the palette was checked for colour-blind confusion and Recess and Detour separate on lightness, not hue alone.</p>
    </div>
  )
}

/* ─── Typography ──────────────────────────────────────────────────────── */

const DISPLAY = ["d6", "d5", "d4", "d3", "d2", "d1", "label"]
const TEXT = ["statement", "lead", "body", "caption", "micro"]

function TypeRow({ step, display }: { step: string; display: boolean }) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "letter-spacing", "font-family", "font-weight"])
  return (
    <div className="grid gap-2 border-b border-line py-5 last:border-0 md:grid-cols-[160px_1fr] md:items-baseline">
      <div className="text-[11.5px] text-ink-3 tabular-nums">
        <p className="text-[13px] font-medium text-ink">text-{step}</p>
        <p>
          {parseFloat(v["font-size"] ?? "0").toFixed(2)}px / {v["line-height"] === "normal" ? "normal" : (parseFloat(v["line-height"] ?? "0") / parseFloat(v["font-size"] ?? "1")).toFixed(2)}
        </p>
        <p>tracking {trackingEm(v["letter-spacing"], v["font-size"])}</p>
      </div>
      <p ref={ref} className={cn(`text-${step}`, display ? "type-display" : "", "truncate")}>
        {display ? "Take the long way" : "Coffee for the hour you stole back, roasted on the shore."}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="p-6">
          <p className="type-display text-d4">Bayon</p>
          <p className="mt-2 text-[14px] text-ink-2">Display. One weight, always capitals, round shoulders on a condensed frame. Headlines, buttons, labels on bags, spec rows.</p>
          <p className="type-display mt-4 text-d2 tracking-normal">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
        </Panel>
        <Panel className="p-6">
          <p className="text-d4 font-medium tracking-[-0.04em]">Inter</p>
          <p className="mt-2 text-[14px] text-ink-2">Reading. 400 for body, 500 for emphasis, never bold. Tabular figures in prices, timers and the roast log.</p>
          <p className="mt-4 text-[20px] tabular-nums">$19.00 · 10:40 · 213° · 1 : 16</p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Poster scale — φ half-steps from 16px, tighter as it grows</GroupLabel>
        <Panel className="px-6">
          {DISPLAY.map((s) => (
            <TypeRow key={s} step={s} display />
          ))}
        </Panel>
      </div>
      <div>
        <GroupLabel>Reading scale</GroupLabel>
        <Panel className="px-6">
          {TEXT.map((s) => (
            <TypeRow key={s} step={s} display={false} />
          ))}
        </Panel>
      </div>
    </div>
  )
}

/* ─── Space and surface ───────────────────────────────────────────────── */

function ShadowSample({ name }: { name: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <div>
      <div ref={ref} className="grid h-24 place-items-center rounded-[var(--radius-card)] bg-raised text-[13px] font-medium" style={{ boxShadow: `var(--shadow-${name})` }}>
        {name}
      </div>
      <p className="mt-2 line-clamp-3 text-[11px] text-ink-3">{cleanShadow(v["box-shadow"])}</p>
    </div>
  )
}

function RadiusSample({ name }: { name: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["border-top-left-radius"])
  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={ref} className="size-20 bg-ink" style={{ borderRadius: `var(--radius-${name})` }} />
      <p className="text-[12px]">{name}</p>
      <p className="text-[11px] text-ink-3 tabular-nums">{v["border-top-left-radius"]}</p>
    </div>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Spacing — a 4px grid, with three fluid steps</GroupLabel>
        <Panel className="flex flex-col gap-3 p-6">
          {[4, 8, 12, 16, 24, 32, 48, 64].map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-12 text-[11.5px] text-ink-3 tabular-nums">{n}px</span>
              <span className="h-3 rounded-sm bg-ink" style={{ width: n * 3 }} />
            </div>
          ))}
          {["gutter", "section", "rail"].map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-12 text-[11.5px] text-ink-3">{n}</span>
              <span className="h-3 rounded-sm bg-tomato" style={{ width: `var(--spacing-${n})` }} />
            </div>
          ))}
        </Panel>
      </div>
      <div>
        <GroupLabel>Radii — square-ish labels, soft cards</GroupLabel>
        <Panel className="flex flex-wrap justify-around gap-6 p-6">
          {["tag", "button", "card", "panel"].map((r) => (
            <RadiusSample key={r} name={r} />
          ))}
        </Panel>
      </div>
      <div>
        <GroupLabel>Shadows — soft and low, a bag standing on a shelf</GroupLabel>
        <div className="grid grid-cols-2 gap-6 rounded-[var(--radius-panel)] bg-paper-2 p-6 md:grid-cols-4">
          {["hairline", "card", "float", "bag", "button", "photo", "sheet"].map((s) => (
            <ShadowSample key={s} name={s} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <Panel className="grid gap-4 p-6 sm:grid-cols-3">
          <div className="h-16 rounded-[var(--radius-card)] border border-line p-3 text-[12px] text-ink-3">1px line — dividers, rows</div>
          <div className="h-16 rounded-[var(--radius-card)] p-3 text-[12px] text-ink-3 shadow-[inset_0_0_0_1px_var(--color-line-strong)]">1px line-strong — fields</div>
          <div className="h-16 rounded-[var(--radius-card)] p-3 text-[12px] shadow-[inset_0_0_0_1.5px_var(--color-ink)]">1.5px ink — outlined buttons, chosen options</div>
        </Panel>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const CURVES = [
  { name: "out", token: "--ease-out-strong", use: "Anything you touch; headline lines, 0.9s" },
  { name: "in-out", token: "--ease-in-out-strong", use: "Things that travel: roast curve ink, reveals" },
  { name: "drawer", token: "--ease-drawer", use: "Menu, bag and subscription drawers, 480ms" },
] as const

export function Motion() {
  const [run, setRun] = useState(0)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="max-w-[56ch] text-[15px] text-ink-2">Strong ease-outs for anything touched, the drawer curve for panels, springs for things that land (the cart count, bags in the builder). Scroll carries the big moves — the stacked series, the opening photograph, NEVER RUN DRY — and Lenis carries the scroll.</p>
        <button type="button" onClick={() => setRun((r) => r + 1)} className="type-display h-10 shrink-0 rounded-[var(--radius-button)] bg-ink px-4 pt-1 text-[20px] text-paper active:scale-[0.97]">
          Play
        </button>
      </div>
      {CURVES.map((c) => (
        <Panel key={c.name} className="p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[14px] font-medium">
              {c.name} <span className="text-ink-3">· {c.token} · cubic-bezier({BEZIER[c.name].join(", ")})</span>
            </p>
            <p className="text-[12px] text-ink-3">{c.use}</p>
          </div>
          <div className="relative mt-4 h-10 rounded-[var(--radius-tag)] bg-paper-2">
            <motion.div key={run} className="absolute top-1 left-1 size-8 rounded-[var(--radius-tag)] bg-tomato" initial={{ left: 4 }} animate={{ left: "calc(100% - 36px)" }} transition={{ duration: 0.9, ease: [...BEZIER[c.name]] as [number, number, number, number] }} />
          </div>
        </Panel>
      ))}
      <Panel className="p-5">
        <p className="text-[14px] font-medium">
          spring <span className="text-ink-3">· bounce 0.2 · cart count, builder bags, taste-map marker</span>
        </p>
        <div className="relative mt-4 h-10 rounded-[var(--radius-tag)] bg-paper-2">
          <motion.div key={run} className="absolute top-1 left-1 size-8 rounded-full bg-ink" initial={{ left: 4 }} animate={{ left: "calc(100% - 36px)" }} transition={{ type: "spring", duration: 0.9, bounce: 0.2 }} />
        </div>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["press", "--duration-press"],
          ["hover", "--duration-hover"],
          ["swap", "--duration-swap"],
          ["drawer", "--duration-drawer"],
          ["scene", "--duration-scene"],
        ].map(([n, t]) => (
          <Panel key={n} className="p-4">
            <p className="text-[13px] font-medium">{n}</p>
            <p className="text-[12px] text-ink-3 tabular-nums">{getComputedStyle(document.documentElement).getPropertyValue(t)}</p>
          </Panel>
        ))}
      </div>
    </div>
  )
}

/* ─── Icons and imagery ───────────────────────────────────────────────── */

const ICONS = [ShoppingBag, UserRound, ArrowRight, ArrowUp, Plus, Minus, X, Shuffle, Flame, Package, Truck]

export function Iconography() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Lucide, 1.6 stroke</GroupLabel>
          <div className="mt-2 flex flex-wrap gap-4">
            {ICONS.map((I, i) => (
              <span key={i} className="grid size-11 place-items-center rounded-[var(--radius-tag)] bg-paper-2">
                <I className="size-5 stroke-[1.6]" />
              </span>
            ))}
          </div>
          <GroupLabel className="mt-6">Brand logos — Simple Icons via Iconify, masked to currentColor</GroupLabel>
          <div className="flex gap-3">
            {(["instagram", "spotify", "strava"] as const).map((n) => (
              <span key={n} className="grid size-11 place-items-center rounded-full bg-ink text-paper">
                <SocialIcon name={n} />
              </span>
            ))}
          </div>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Bags are drawn, never photographed</GroupLabel>
          <div className="mt-2 grid grid-cols-4 gap-3 rounded-[var(--radius-card)] bg-shelf p-4">
            {["half-day-4", "the-long-way", "field-trip-9", "last-bell"].map((id) => (
              <CoffeeBag key={id} coffeeId={id} />
            ))}
          </div>
          <p className="mt-3 text-[13px] text-ink-2">Each series has a line drawing — sun, road, mountain, moon — on its colour panel, with the brand strip up the left edge.</p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Photography — Pexels; people outdoors, mid-moment, warm light; landscapes for series</GroupLabel>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {(["hero", "sunsetLake", "rooftop", "chemex"] as const).map((k) => (
            <img key={k} src={photo(k, 500, 500)} alt="" loading="lazy" className="aspect-square w-full rounded-[var(--radius-tag)] object-cover" />
          ))}
        </div>
        <p className="mt-3 text-[13px] text-ink-3">Full-bleed with a light scrim when type sits on them; 3px corners when they sit in a grid. No third-party logos in frame.</p>
      </div>
    </div>
  )
}
