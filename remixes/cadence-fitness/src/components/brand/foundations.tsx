import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  ArrowUpRight, Baby, Car, ChartLine, Check, ChevronRight, Clapperboard, CreditCard, Dumbbell, Gauge, Gift, House,
  Landmark, Martini, Menu, MessageSquareQuote, PawPrint, Plane, Play, Repeat, Search, Settings, ShoppingBasket, Star,
  Tags, Utensils, Wallet, X, Zap,
} from "lucide-react"

import { contrast, toHex, trackingEm, useComputed } from "@/components/brand/read-style"
import { GroupLabel, Panel } from "@/components/brand/specimen"
import { COLOUR_GROUPS, CONTRAST_PAIRS, DURATIONS, EASINGS, RADII, SHADOWS, SPACING, TYPE_SCALE } from "@/components/brand/tokens"
import { DrawLine } from "@/components/motion/draw-line"
import { FloatingPill } from "@/components/motion/floating-pill"
import { WordReveal } from "@/components/motion/word-reveal"
import { CadenceLogo, CadenceMark } from "@/components/site/logo"
import { Button } from "@/components/ui/button"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"

/** A token's current value, read from :root after the stylesheet applies. */
function useToken(name: string) {
  const [value, setValue] = useState("")
  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim())
  }, [name])
  return value
}

/* ---------------------------------------------------------------- Brand */

export function BrandIdentity() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Panel className="p-6">
        <GroupLabel>On night</GroupLabel>
        <div className="grid h-40 place-items-center rounded-(--radius-field) bg-night">
          <CadenceLogo className="scale-150" />
        </div>
      </Panel>
      <Panel className="p-6">
        <GroupLabel>On day</GroupLabel>
        <div className="grid h-40 place-items-center rounded-(--radius-field) bg-day">
          <span className="inline-flex scale-150 items-center gap-2.5 text-day-ink">
            <CadenceMark className="bg-day-ink text-day" />
            <span className="font-display text-[17px] font-semibold tracking-[-0.01em]">Cadence</span>
          </span>
        </div>
      </Panel>
      <Panel className="p-6">
        <GroupLabel>Clear space — half the tile on every side</GroupLabel>
        <div className="grid h-40 place-items-center">
          <div className="border border-dashed border-action/60 p-6">
            <CadenceMark className="size-12 rounded-[14px]" />
          </div>
        </div>
      </Panel>
      <Panel className="p-6">
        <GroupLabel>Minimum size</GroupLabel>
        <div className="flex h-40 items-end justify-center gap-8">
          {[
            { size: 16, cls: "size-4", note: " min" },
            { size: 24, cls: "size-6", note: "" },
            { size: 28, cls: "size-7", note: " header" },
            { size: 44, cls: "size-11 rounded-[12px]", note: " footer" },
          ].map(({ size, cls, note }) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <CadenceMark className={cls} />
              <span className="font-mono text-[11px] text-fg-4">{size}px{note}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel className="p-6 md:col-span-2">
        <GroupLabel>Voice — calm, specific, on your side</GroupLabel>
        <div className="grid gap-3 text-[15px] sm:grid-cols-2">
          {[
            ["Say what happened, in numbers.", "“Resting HR down 3 bpm since March.”", "“Great job crushing it!”"],
            ["Name the trade-off plainly.", "“No ads. Your subscription is the business.”", "“100% free forever*”"],
            ["Short sentences, real words.", "“Rest today. Your HRV dipped 18%.”", "“Optimise your biometric performance stack.”"],
            ["Warm, never preachy.", "“Find your rhythm.”", "“No excuses. No days off.”"],
          ].map(([rule, yes, no]) => (
            <div key={rule} className="rounded-(--radius-field) bg-surface-2 p-4">
              <p className="font-medium text-fg">{rule}</p>
              <p className="mt-2 flex gap-2 text-fg-2"><Check className="mt-1 size-3.5 shrink-0 text-gain" /> {yes}</p>
              <p className="mt-1 flex gap-2 text-fg-3"><X className="mt-1 size-3.5 shrink-0 text-loss" /> {no}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

/* --------------------------------------------------------------- Colour */

function Swatch({ name }: { name: string }) {
  const value = useToken(`color-${name}`)
  return (
    <div className="min-w-0">
      <div className="h-16 rounded-(--radius-field) shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]" style={{ background: `var(--color-${name})` }} />
      <p className="mt-2 truncate font-mono text-[12px] text-fg">{name}</p>
      <p className="truncate font-mono text-[11px] text-fg-4">{value.startsWith("#") ? value : value ? `${toHex(value)} · ${value}` : "—"}</p>
    </div>
  )
}

function ContrastRow({ fg, bg, use }: { fg: string; bg: string; use: string }) {
  const [ratio, setRatio] = useState<number | null>(null)
  useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    setRatio(contrast(style.getPropertyValue(`--color-${fg}`).trim(), style.getPropertyValue(`--color-${bg}`).trim()))
  }, [fg, bg])
  const grade = ratio == null ? "—" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "decor only"
  return (
    <div className="flex items-center gap-4 border-b border-line py-3 last:border-0">
      <span className="grid h-10 w-16 shrink-0 place-items-center rounded-(--radius-button) text-[15px] font-semibold" style={{ background: `var(--color-${bg})`, color: `var(--color-${fg})` }}>
        Aa
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[12px] text-fg">{fg} on {bg}</span>
        <span className="block text-[13px] text-fg-3">{use}</span>
      </span>
      <span className="text-right font-mono text-[12px] text-fg-2 tabular-nums">
        {ratio ? ratio.toFixed(2) : "—"}:1
        <span className={cn("block text-[11px]", grade.startsWith("AA") ? "text-gain" : "text-warn")}>{grade}</span>
      </span>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="flex flex-col gap-10">
      <p className="max-w-[62ch] text-[15px] text-fg-3">
        Cadence has one theme with two grounds: the night the page lives on, and the Linen Mist panel the progress chapter rises on.
        Every colour below is a <code className="font-mono text-fg-2">--color-*</code> token in <code className="font-mono text-fg-2">index.css</code>;
        both grounds are shown, and the values are read live.
      </p>
      {COLOUR_GROUPS.map((group) => (
        <div key={group.title}>
          <GroupLabel>{group.title}</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {group.tokens.map((name) => (
              <Swatch key={name} name={name} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Contrast — WCAG 2 ratios for the text pairs in use</GroupLabel>
        <Panel className="px-5 py-2">
          {CONTRAST_PAIRS.map((pair) => (
            <ContrastRow key={`${pair.fg}-${pair.bg}-${pair.use}`} {...pair} />
          ))}
        </Panel>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------- Typography */

function TypeRow({ token, sample, family }: { token: string; sample: string; family: "display" | "sans" }) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "letter-spacing", "font-weight"])
  return (
    <div className="grid gap-2 border-b border-line py-5 last:border-0 md:grid-cols-[180px_1fr] md:gap-6">
      <div className="font-mono text-[11px] leading-relaxed text-fg-4">
        <p className="text-[12px] text-fg-2">text-{token}</p>
        <p>{v["font-size"]} / {v["line-height"]}</p>
        <p>{trackingEm(v["letter-spacing"], v["font-size"])} · {v["font-weight"]}</p>
      </div>
      <p ref={ref} className={cn(`text-${token}`, family === "display" ? "type-display" : "font-sans", "min-w-0 text-fg [overflow-wrap:anywhere]")}>
        {sample}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: "Inter Black", token: "--font-display", use: "Display only: hero and section openers, 900, tracked −0.035 to −0.04em.", cls: "font-display font-black tracking-[-0.04em]" },
          { name: "Inter", token: "--font-sans", use: "Everything else. 400 body, 500–600 labels, 700 card titles.", cls: "font-sans" },
          { name: "Geist Mono", token: "--font-mono", use: "Token names and code on this page only.", cls: "font-mono" },
        ].map((f) => (
          <Panel key={f.name} className="p-5">
            <p className={cn("text-[44px] leading-none text-fg", f.cls)}>Aa</p>
            <p className="mt-4 text-[15px] font-medium text-fg">{f.name}</p>
            <p className="font-mono text-[11px] text-fg-4">{f.token}</p>
            <p className="mt-2 text-[14px] text-fg-3">{f.use}</p>
          </Panel>
        ))}
      </div>
      <div>
        <GroupLabel>Scale</GroupLabel>
        <Panel className="px-5">
          {TYPE_SCALE.map((row) => (
            <TypeRow key={row.token} {...row} />
          ))}
        </Panel>
      </div>
      <div>
        <GroupLabel>Numerals — tabular, the unit set small</GroupLabel>
        <Panel className="flex flex-wrap items-baseline gap-x-10 gap-y-4 p-6">
          <p className="text-[44px] font-black tracking-[-0.03em] text-fg tabular-nums">54<span className="ml-1 text-[0.45em] font-medium text-fg-3">bpm</span></p>
          <p className="font-sans text-[17px] text-fg-2 tabular-nums">0123456789 · 7h 12m · 68 ms · 97% SpO₂</p>
        </Panel>
      </div>
    </div>
  )
}

/* ----------------------------------------------------- Space and surface */

function RadiusSample({ name }: { name: string }) {
  const value = useToken(`radius-${name}`)
  return (
    <div>
      <div className="h-20 bg-surface-2 shadow-(--shadow-inner)" style={{ borderRadius: `var(--radius-${name})` }} />
      <p className="mt-2 font-mono text-[12px] text-fg">{name}</p>
      <p className="font-mono text-[11px] text-fg-4">{value}</p>
    </div>
  )
}

function ShadowSample({ name }: { name: string }) {
  const value = useToken(`shadow-${name}`)
  const day = name.startsWith("day")
  return (
    <div className={cn("rounded-(--radius-field) p-5", day ? "bg-day" : "bg-night")}>
      <div className={cn("h-16 rounded-(--radius-field)", day ? "bg-day-card" : name === "pill" ? "bg-candy-lime" : "bg-surface-2")} style={{ boxShadow: `var(--shadow-${name})` }} />
      <p className={cn("mt-4 font-mono text-[12px]", day ? "text-day-ink" : "text-fg")}>{name}</p>
      <p className={cn("line-clamp-3 font-mono text-[10.5px] leading-snug", day ? "text-day-ink-3" : "text-fg-4")}>{value}</p>
    </div>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Spacing — a 4px grid</GroupLabel>
        <Panel className="flex flex-col gap-2 p-5">
          {SPACING.map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-12 font-mono text-[12px] text-fg-3 tabular-nums">{n}px</span>
              <span className="h-3 rounded-[3px] bg-action/70" style={{ width: n * 2 }} />
            </div>
          ))}
          <p className="mt-3 font-mono text-[11px] text-fg-4">--spacing-section: clamp(88px, 11vw, 140px) · --spacing-gutter: clamp(16px, 4vw, 24px)</p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {RADII.map((name) => (
            <RadiusSample key={name} name={name} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SHADOWS.map((name) => (
            <ShadowSample key={name} name={name} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders — hairlines are the only depth</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-(--radius-field) border border-line p-5 text-[13px] text-fg-3"><span className="font-mono text-fg">line</span> — dividers inside cards</div>
          <div className="rounded-(--radius-field) border border-line-strong p-5 text-[13px] text-fg-3"><span className="font-mono text-fg">line-strong</span> — a hovered card, an axis</div>
          <div className="rounded-(--radius-field) border border-day-line bg-day p-5 text-[13px] text-day-ink-3"><span className="font-mono text-day-ink">day-line</span> — every edge on day</div>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- Motion */

function EasingDemo({ name }: { name: string }) {
  const value = useToken(name)
  const reduced = useReducedMotion()
  const [run, setRun] = useState(0)
  const curve = name === "ease-out-strong" ? [0.23, 1, 0.32, 1] : name === "ease-in-out-strong" ? [0.77, 0, 0.175, 1] : [0.45, 0, 0.55, 1]
  return (
    <Panel className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[12px] text-fg">--{name}</p>
          <p className="truncate font-mono text-[11px] text-fg-4">{value}</p>
        </div>
        <Button variant="glass" size="sm" onClick={() => setRun((n) => n + 1)} aria-label={`Play ${name}`}>
          <Play /> Play
        </Button>
      </div>
      <div className="relative mt-4 h-10 rounded-(--radius-button) bg-surface-2">
        <motion.span
          key={run}
          className="absolute top-1 size-8 rounded-(--radius-button) bg-action shadow-(--shadow-button)"
          initial={{ left: "4px" }}
          animate={{ left: run && !reduced ? "calc(100% - 36px)" : "4px" }}
          transition={{ duration: 0.9, ease: curve as [number, number, number, number] }}
        />
      </div>
    </Panel>
  )
}

export function Motion() {
  const [replay, setReplay] = useState(0)
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Easings — press play</GroupLabel>
        <div className="grid gap-3 lg:grid-cols-3">
          {EASINGS.map((name) => (
            <EasingDemo key={name} name={name} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Durations</GroupLabel>
        <Panel className="grid gap-x-6 gap-y-3 p-5 sm:grid-cols-5">
          {DURATIONS.map((name) => (
            <DurationToken key={name} name={name} />
          ))}
        </Panel>
      </div>
      <div>
        <GroupLabel>The page’s moving parts</GroupLabel>
        <div className="grid gap-3 md:grid-cols-2">
          <Panel className="relative h-48 overflow-hidden">
            <FloatingPill label="Running" icon="run" colour="lime" x={-18} y={-12} rotate={-10} depth={0} />
            <FloatingPill label="Swim" icon="swim" colour="blue" x={18} y={18} rotate={12} blur={1.5} depth={0} delay={0.2} />
            <p className="absolute bottom-3 left-4 font-mono text-[11px] text-fg-4">FloatingPill — spring in, slow bob, parallax by depth</p>
          </Panel>
          <Panel className="relative h-48 p-5">
            <svg key={replay} viewBox="0 0 300 100" className="h-28 w-full overflow-visible" preserveAspectRatio="none">
              <DrawLine d="M0 90 C40 80 60 60 100 66 S160 30 200 40 S260 10 300 8" dotX={300} dotY={8} />
            </svg>
            <div className="absolute right-4 bottom-3 left-4 flex items-center justify-between">
              <p className="font-mono text-[11px] text-fg-4">DrawLine — a trend, drawn once</p>
              <Button variant="glass" size="sm" onClick={() => setReplay((n) => n + 1)}>Replay</Button>
            </div>
          </Panel>
          <Panel className="p-6 md:col-span-2">
            <WordReveal text="Scroll this page and each word lights up in turn — WordReveal ties the paragraph to how far you have read." start={1} end={0.6} className="font-display text-[24px] font-medium text-fg" />
            <p className="mt-3 font-mono text-[11px] text-fg-4">WordReveal — scroll-linked opacity and blur, word by word. RisingPanel carries the day chapter on the home page.</p>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function DurationToken({ name }: { name: string }) {
  const value = useToken(name)
  return (
    <div>
      <p className="font-mono text-[12px] text-fg">{name.replace("duration-", "")}</p>
      <p className="font-mono text-[11px] text-fg-4">{value}</p>
    </div>
  )
}

/* ----------------------------------------------------- Icons and imagery */

const ICONS = [
  Gauge, Repeat, Landmark, ChartLine, Tags, CreditCard, Wallet, Search, Settings, Car, Zap, House, Utensils, Clapperboard,
  Dumbbell, Plane, ShoppingBasket, Baby, Gift, PawPrint, Martini, Star, MessageSquareQuote, ArrowUpRight, ChevronRight, Menu, X, Check,
]

export function Iconography() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Lucide, 1.5–2.6px strokes, at 12–20px</GroupLabel>
        <Panel className="grid grid-cols-7 gap-1 p-4 sm:grid-cols-10 lg:grid-cols-14">
          {ICONS.map((Icon, i) => (
            <span key={i} className="grid aspect-square place-items-center rounded-(--radius-button) text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg">
              <Icon className="size-5" />
            </span>
          ))}
        </Panel>
      </div>
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <Panel className="p-5">
          <GroupLabel>Photography — real people, real training</GroupLabel>
          <img src={asset("images/watch-check.jpg")} alt="A runner checking her watch on a track" className="aspect-[16/10] w-full rounded-[10px] object-cover" />
          <p className="mt-3 text-[13px] text-fg-3">From Pexels: real training, high-key and casual. Inside cards at a 10px radius, never tinted.</p>
        </Panel>
        <Panel className="p-5">
          <GroupLabel>Avatars — round, 36px in reviews</GroupLabel>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 9 }, (_, i) => (
              <img key={i} src={asset(`images/avatar-${i + 1}.jpg`)} alt="" className="size-11 rounded-full object-cover" />
            ))}
          </div>
          <p className="mt-4 text-[13px] text-fg-3">The product is never photographed: it is drawn in HTML from the same tokens, so it always matches.</p>
        </Panel>
      </div>
    </div>
  )
}
