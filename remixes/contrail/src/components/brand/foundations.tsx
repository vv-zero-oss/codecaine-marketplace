import { useState, type ReactNode } from "react"
import * as Lucide from "lucide-react"
import { Check, Play, X } from "lucide-react"

import { GroupLabel, Panel } from "@/components/brand/specimen"
import { cleanShadow, contrast, toHex, trackingEm, useComputed } from "@/components/brand/read-style"
import { ContrailMark, Logo } from "@/components/site/logo"
import { PHOTOS, pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/* ---------------------------------------------------------------- brand */

export function BrandIdentity() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="grid min-h-60 place-items-center p-8">
          <Logo className="scale-[1.6]" />
          <p className="mt-6 text-[13px] text-ink-3">On day</p>
        </Panel>
        <div className="grid min-h-60 place-items-center rounded-(--radius-card) bg-night p-8 text-night-fg shadow-(--shadow-night)">
          <Logo tone="light" className="scale-[1.6]" />
          <p className="mt-6 text-[13px] text-night-muted">On night</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Panel className="p-6">
          <GroupLabel>Clear space</GroupLabel>
          <div className="mt-4 grid place-items-center">
            <div className="relative p-6 outline-1 outline-dashed outline-violet/50">
              <ContrailMark className="size-16" />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[11px] text-violet">¼</span>
            </div>
          </div>
          <p className="mt-4 text-[14px] text-ink-2">Keep a quarter of the mark's width clear on every side.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Minimum size</GroupLabel>
          <div className="mt-4 flex items-end justify-center gap-6">
            {[16, 24, 32, 48].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <span style={{ width: s, height: s }} className="inline-block [&>svg]:size-full"><ContrailMark /></span>
                <span className="font-mono text-[11px] text-ink-3">{s}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-2">Never smaller than 16px on screen; the trails drop out below 20px.</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>The mark</GroupLabel>
          <p className="mt-2 text-[14px] text-ink-2">A plane climbing out of the corner, two trails behind it. The square is the app icon's; the plane always points up and right — forward, never down.</p>
        </Panel>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Voice — do</GroupLabel>
          <ul className="mt-2 flex flex-col gap-2 text-[15px]">
            {["“Likely 30 min late. Inbound held in Denver by storms.”", "Say what happened, then what it means for you.", "Numbers over adjectives: “12 min walk”, not “a short walk”."].map((t) => (
              <li key={t} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-green" strokeWidth={2.6} />{t}</li>
            ))}
          </ul>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Voice — don't</GroupLabel>
          <ul className="mt-2 flex flex-col gap-2 text-[15px]">
            {["“Status update: DLY 0030 ATC GDP.”", "Alarm words — URGENT, ALERT, exclamation marks.", "Cute where someone is stressed: no jokes about missed flights."].map((t) => (
              <li key={t} className="flex gap-2"><X className="mt-0.5 size-4 shrink-0 text-red" strokeWidth={2.6} />{t}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- colour */

type SwatchSpec = { name: string; token: string; role: string }

const COLOURS: { group: string; swatches: SwatchSpec[] }[] = [
  { group: "Day surfaces", swatches: [{ name: "page", token: "--color-page", role: "The page" }, { name: "panel", token: "--color-panel", role: "Cards on day" }, { name: "panel-2", token: "--color-panel-2", role: "Pressed panel" }, { name: "raised", token: "--color-raised", role: "Cards on panel" }] },
  { group: "Ink", swatches: [{ name: "ink", token: "--color-ink", role: "Headlines, body" }, { name: "ink-2", token: "--color-ink-2", role: "Secondary text" }, { name: "ink-3", token: "--color-ink-3", role: "Captions" }, { name: "ink-4", token: "--color-ink-4", role: "Display greys only" }, { name: "line", token: "--color-line", role: "Hairlines" }, { name: "line-strong", token: "--color-line-strong", role: "Dividers, inputs" }] },
  { group: "Night", swatches: [{ name: "night", token: "--color-night", role: "Night page" }, { name: "night-2", token: "--color-night-2", role: "Night cards" }, { name: "night-3", token: "--color-night-3", role: "Night fields" }, { name: "night-line", token: "--color-night-line", role: "Night hairlines" }, { name: "night-fg", token: "--color-night-fg", role: "Night text" }, { name: "night-2fg", token: "--color-night-2fg", role: "Night secondary" }, { name: "night-muted", token: "--color-night-muted", role: "Night captions" }] },
  { group: "Accent", swatches: [{ name: "amber", token: "--color-amber", role: "Now: active, gates, buttons" }, { name: "amber-hover", token: "--color-amber-hover", role: "Hover" }, { name: "violet", token: "--color-violet", role: "Links on day, passport" }, { name: "violet-bright", token: "--color-violet-bright", role: "Glow on night" }, { name: "violet-deep", token: "--color-violet-deep", role: "Passport sea" }, { name: "violet-soft", token: "--color-violet-soft", role: "Tint" }] },
  { group: "Signals", swatches: [{ name: "green", token: "--color-green", role: "On time (day)" }, { name: "green-bright", token: "--color-green-bright", role: "On time (night)" }, { name: "red", token: "--color-red", role: "Late (day)" }, { name: "red-bright", token: "--color-red-bright", role: "Late (night)" }, { name: "blue", token: "--color-blue", role: "Live, sharing" }] },
  { group: "Map", swatches: [{ name: "map-sea", token: "--color-map-sea", role: "Sea" }, { name: "map-land", token: "--color-map-land", role: "Land" }, { name: "map-route", token: "--color-map-route", role: "Routes" }, { name: "ember", token: "--color-ember", role: "Dusk card" }, { name: "forest", token: "--color-forest", role: "Data card" }] },
]

export function Swatch({ name, token, role }: SwatchSpec) {
  const [ref, values] = useComputed<HTMLDivElement>(["background-color"])
  return (
    <div className="overflow-hidden rounded-(--radius-field) bg-raised shadow-(--shadow-card)">
      <div ref={ref} className="h-20 shadow-[inset_0_-1px_0_rgb(11_11_16/0.06)]" style={{ background: `var(${token})` }} />
      <div className="p-3">
        <p className="text-[14px] font-semibold">{name}</p>
        <p className="font-mono text-[11.5px] text-ink-3 uppercase">{toHex(values["background-color"] ?? "")}</p>
        <p className="mt-1 text-[12.58px] text-ink-3">{role}</p>
      </div>
    </div>
  )
}

const PAIRS: [string, string, string][] = [
  ["ink on page", "--color-ink", "--color-page"],
  ["ink-2 on page", "--color-ink-2", "--color-page"],
  ["ink-3 on panel", "--color-ink-3", "--color-panel"],
  ["violet on page", "--color-violet", "--color-page"],
  ["green on page", "--color-green", "--color-page"],
  ["amber-ink on amber", "--color-amber-ink", "--color-amber"],
  ["night-fg on night", "--color-night-fg", "--color-night"],
  ["night-2fg on night-2", "--color-night-2fg", "--color-night-2"],
  ["night-muted on night", "--color-night-muted", "--color-night"],
]

function ContrastPair({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  const [ref, values] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(values.color ?? "", values["background-color"] ?? "")
  const pass = ratio && ratio >= 4.5 ? "AA" : ratio && ratio >= 3 ? "AA large" : "—"
  return (
    <div ref={ref} className="flex items-center justify-between rounded-(--radius-field) px-4 py-3" style={{ color: `var(${fg})`, background: `var(${bg})` }}>
      <span className="text-[15px] font-medium">{label}</span>
      <span className="font-mono text-[12px] tabular-nums">{ratio ? `${ratio.toFixed(2)}:1 · ${pass}` : "…"}</span>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="flex flex-col gap-10">
      {COLOURS.map((g) => (
        <div key={g.group}>
          <GroupLabel>{g.group}</GroupLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {g.swatches.map((s) => <Swatch key={s.name} {...s} />)}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Text pairs, with their contrast</GroupLabel>
        <div className="grid gap-2 md:grid-cols-2">
          {PAIRS.map(([label, fg, bg]) => <ContrastPair key={label} label={label} fg={fg} bg={bg} />)}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------- typography */

const FAMILIES = [
  { label: "Words", name: "Inter", className: "font-sans", sample: "Know before the gate agent does.", weights: "400 · 500 · 600 · 700 · 800" },
  { label: "Flight data", name: "Barlow", className: "font-data", sample: "A321neo · N2105J · 93,931 km", weights: "400 · 500 · 600" },
  { label: "Codes", name: "JetBrains Mono", className: "font-mono", sample: "CTRL-7H2K-9QPA · T – 3 h 10", weights: "500" },
]

const SCALE = [
  { name: "mega", className: "text-mega type-display", sample: "Contrail" },
  { name: "display", className: "text-display type-display", sample: "Know before" },
  { name: "h1", className: "text-h1 type-display", sample: "Everything you wanted" },
  { name: "h2", className: "text-h2 type-display", sample: "What Pro adds" },
  { name: "h3", className: "text-h3 font-semibold", sample: "See why you're late." },
  { name: "h4", className: "text-h4 font-semibold", sample: "The tower holds it." },
  { name: "lead", className: "text-lead", sample: "Contrail watches the plane before yours." },
  { name: "body", className: "text-body", sample: "Delays and gate changes reach you before anyone else." },
  { name: "caption", className: "text-caption", sample: "Terminal 1 · first bags at 6:48" },
]

function ScaleRow({ name, className, sample }: (typeof SCALE)[number]) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "letter-spacing", "font-weight"])
  return (
    <div className="grid gap-2 border-b border-line py-5 md:grid-cols-[150px_1fr] md:items-baseline">
      <div className="font-mono text-[11.5px] text-ink-3">
        <p className="text-[13px] font-semibold text-ink">{name}</p>
        <p>{parseFloat(v["font-size"] ?? "0").toFixed(2)}px · {v["font-weight"]}</p>
        <p>lh {v["line-height"] === "normal" ? "normal" : (parseFloat(v["line-height"] ?? "0") / parseFloat(v["font-size"] ?? "1")).toFixed(2)} · {trackingEm(v["letter-spacing"], v["font-size"])}</p>
      </div>
      <p ref={ref} className={cn("min-w-0 truncate", className)}>{sample}</p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-3">
        {FAMILIES.map((f) => (
          <Panel key={f.name} className="p-6">
            <GroupLabel>{f.label}</GroupLabel>
            <p className={cn("text-h3 font-semibold", f.className)}>{f.name}</p>
            <p className={cn("mt-3 text-[17px] text-ink-2", f.className)}>{f.sample}</p>
            <p className="mt-4 font-mono text-[11.5px] text-ink-3">{f.weights}</p>
          </Panel>
        ))}
      </div>
      <div>
        <GroupLabel>The scale — golden ratio, φ half-steps from 16px, tighter as it grows</GroupLabel>
        <div>{SCALE.map((s) => <ScaleRow key={s.name} {...s} />)}</div>
      </div>
      <Panel className="p-6">
        <GroupLabel>Numerals</GroupLabel>
        <div className="grid gap-6 md:grid-cols-3">
          <div><p className="font-sans text-h2 font-semibold tabular-nums">06:04</p><p className="text-[13px] text-ink-3">Inter, tabular — times</p></div>
          <div><p className="font-data text-h2 font-medium tabular-nums">816,633</p><p className="text-[13px] text-ink-3">Barlow — distances, stats</p></div>
          <div><p className="font-mono text-h2 font-medium">N2105J</p><p className="text-[13px] text-ink-3">Mono — tails, codes</p></div>
        </div>
      </Panel>
    </div>
  )
}

/* ---------------------------------------------------- space and surface */

const SPACING = ["1", "2", "3", "4", "6", "8", "12", "16", "24"]
const RADII = [
  { name: "chip", token: "--radius-chip", use: "Small tags" },
  { name: "field", token: "--radius-field", use: "Inputs, rows" },
  { name: "card", token: "--radius-card", use: "Cards, notifications" },
  { name: "panel", token: "--radius-panel", use: "Sections, bento" },
  { name: "full", token: "", use: "Buttons, pills" },
]
const SHADOWS = [
  { name: "xs", token: "--shadow-xs", use: "Chips on panel" },
  { name: "card", token: "--shadow-card", use: "Cards, notifications" },
  { name: "float", token: "--shadow-float", use: "Things above the page" },
  { name: "lift", token: "--shadow-lift", use: "Dialogs, featured" },
  { name: "pill", token: "--shadow-pill", use: "The header pill" },
  { name: "phone", token: "--shadow-phone", use: "Device mockups" },
  { name: "night", token: "--shadow-night", use: "Cards on night", night: true },
  { name: "glow", token: "--shadow-glow", use: "The prediction banner", night: true },
]

function ShadowSample({ name, token, use, night }: (typeof SHADOWS)[number]) {
  const [ref, v] = useComputed<HTMLDivElement>(["box-shadow"])
  return (
    <div className={cn("rounded-(--radius-card) p-6", night ? "bg-night" : "bg-panel")}>
      <div ref={ref} className={cn("h-20 rounded-(--radius-card)", night ? "bg-night-2" : "bg-raised")} style={{ boxShadow: `var(${token})` }} />
      <p className={cn("mt-4 text-[14px] font-semibold", night && "text-night-fg")}>{name}</p>
      <p className={cn("text-[12.58px]", night ? "text-night-muted" : "text-ink-3")}>{use}</p>
      <p className={cn("mt-1 line-clamp-2 font-mono text-[10.5px]", night ? "text-night-dim" : "text-ink-4")}>{cleanShadow(v["box-shadow"])}</p>
    </div>
  )
}

export function SpaceAndSurface() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Spacing — a 4px grid</GroupLabel>
        <Panel className="flex flex-col gap-2 p-6">
          {SPACING.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="w-16 font-mono text-[11.5px] text-ink-3">{Number(s) * 4}px</span>
              <span className="h-3 rounded-full bg-violet" style={{ width: `calc(var(--spacing) * ${s})` }} />
            </div>
          ))}
          <p className="mt-2 text-[13px] text-ink-3">Sections breathe with <code className="font-mono">--spacing-section</code>: clamp(96px, 12vw, 176px).</p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Radii</GroupLabel>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {RADII.map((r) => (
            <Panel key={r.name} className="p-5">
              <div className="h-16 bg-violet-soft shadow-[inset_0_0_0_1.5px_var(--color-violet)]" style={{ borderRadius: r.token ? `var(${r.token})` : 9999 }} />
              <p className="mt-3 text-[14px] font-semibold">{r.name}</p>
              <p className="text-[12.58px] text-ink-3">{r.use}</p>
            </Panel>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Shadows — soft and layered, never one hard drop</GroupLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{SHADOWS.map((s) => <ShadowSample key={s.name} {...s} />)}</div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-3 md:grid-cols-3">
          <Panel className="p-5"><div className="h-12 rounded-(--radius-field) border border-line" /><p className="mt-3 text-[14px] font-semibold">Hairline · 1px line</p><p className="text-[12.58px] text-ink-3">Rows, dividers</p></Panel>
          <Panel className="p-5"><div className="h-12 rounded-(--radius-field) border border-dashed border-ink-4" /><p className="mt-3 text-[14px] font-semibold">Dashed · 1px ink-4</p><p className="text-[12.58px] text-ink-3">Callouts, review headers</p></Panel>
          <div className="rounded-(--radius-card) bg-night p-5"><div className="h-12 rounded-(--radius-field) shadow-[0_0_0_1px_var(--color-night-line)]" /><p className="mt-3 text-[14px] font-semibold text-night-fg">Night ring · 1px</p><p className="text-[12.58px] text-night-muted">Fields and cards on night</p></div>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- motion */

const EASINGS = [
  { name: "ease-out-strong", token: "--ease-out-strong", value: "cubic-bezier(0.23, 1, 0.32, 1)", where: "Entrances, presses, crossfades" },
  { name: "ease-in-out-strong", token: "--ease-in-out-strong", value: "cubic-bezier(0.77, 0, 0.175, 1)", where: "Things moving on screen" },
  { name: "ease-drawer", token: "--ease-drawer", value: "cubic-bezier(0.32, 0.72, 0, 1)", where: "Sheets and drawers" },
]
const DURATIONS = [
  { name: "press", token: "--duration-press", ms: 140 },
  { name: "hover", token: "--duration-hover", ms: 200 },
  { name: "swap", token: "--duration-swap", ms: 320 },
  { name: "phase", token: "--duration-phase", ms: 520 },
  { name: "scene", token: "--duration-scene", ms: 800 },
]

function MotionLane({ label, sub, easing, duration }: { label: string; sub: string; easing: string; duration: number }) {
  const [on, setOn] = useState(false)
  return (
    <div className="flex items-center gap-4 rounded-(--radius-field) bg-raised p-4 shadow-(--shadow-xs)">
      <button type="button" onClick={() => setOn((o) => !o)} aria-label={`Play ${label}`} className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-(--duration-press) active:scale-[0.94]">
        <Play className="size-4" />
      </button>
      <div className="w-44 shrink-0">
        <p className="text-[14px] font-semibold">{label}</p>
        <p className="font-mono text-[11px] text-ink-3">{sub}</p>
      </div>
      <div className="relative h-10 flex-1 rounded-full bg-panel [container-type:inline-size]">
        <span className="absolute top-1 left-1 size-8 rounded-full bg-amber shadow-(--shadow-xs)" style={{ transform: on ? "translateX(calc(100cqw - 2.5rem))" : "translateX(0)", transition: `transform ${duration}ms ${easing}` }} />
      </div>
    </div>
  )
}

export function Motion() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Easings — press play</GroupLabel>
        <div className="flex flex-col gap-2">
          {EASINGS.map((e) => <MotionLane key={e.name} label={e.name} sub={e.where} easing={`var(${e.token})`} duration={700} />)}
        </div>
      </div>
      <div>
        <GroupLabel>Durations, on ease-out-strong</GroupLabel>
        <div className="flex flex-col gap-2">
          {DURATIONS.map((d) => <MotionLane key={d.name} label={d.name} sub={`${d.ms}ms · var(${d.token})`} easing="var(--ease-out-strong)" duration={d.ms} />)}
        </div>
      </div>
      <Panel className="p-6 text-[15px] text-ink-2">
        <GroupLabel>Rules</GroupLabel>
        <ul className="flex list-disc flex-col gap-1.5 pl-5">
          <li>UI motion stays under 300ms; scenes (a hero phase, a photo swap) take 520–800ms.</li>
          <li>Transform and opacity only. Nothing enters from scale 0.</li>
          <li>Scroll-linked pieces (the hero, the delay timeline, the story text) sit still and fully shown for reduced motion and in the editor.</li>
          <li>Every loop holds its instance in a ref, so the editor's Motion switch can stop it.</li>
        </ul>
      </Panel>
    </div>
  )
}

/* -------------------------------------------------- icons and imagery */

const ICONS = ["Plane", "PlaneTakeoff", "PlaneLanding", "TowerControl", "Luggage", "Footprints", "CloudLightning", "Radio", "Sun", "BellRing", "Share2", "Smartphone", "Watch", "Laptop", "Users", "Lock"] as const

export function Iconography() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Lucide, at 1.6–2 stroke</GroupLabel>
        <Panel className="grid grid-cols-4 gap-2 p-4 sm:grid-cols-8">
          {ICONS.map((name) => {
            const Icon = Lucide[name] as (p: { className?: string; strokeWidth?: number }) => ReactNode
            return (
              <div key={name} className="flex flex-col items-center gap-2 rounded-(--radius-field) p-3 transition-colors hover:bg-panel">
                <Icon className="size-6" strokeWidth={1.8} />
                <span className="max-w-full truncate font-mono text-[10px] text-ink-3">{name}</span>
              </div>
            )
          })}
        </Panel>
      </div>
      <div>
        <GroupLabel>Photography — dusk, weather and real airports, never stock smiles at check-in</GroupLabel>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[PHOTOS.storm, PHOTOS.towerDusk, PHOTOS.wingSunset, PHOTOS.terminal].map((id) => (
            <img key={id} src={pexels(id, 500, 500)} alt="" className="aspect-square w-full rounded-(--radius-card) object-cover" />
          ))}
        </div>
        <p className="mt-3 text-[14px] text-ink-2">From Pexels. On night, photos sit at 25–70% under a night gradient so text stays readable; on day they run full-bleed inside a card radius.</p>
      </div>
      <div>
        <GroupLabel>Maps</GroupLabel>
        <p className="text-[14px] text-ink-2">Every map is drawn from Natural Earth's 110m countries with real airport coordinates and great-circle routes — daylight greens and blues in the app, violet in the passport, night for dark cards.</p>
      </div>
    </div>
  )
}
