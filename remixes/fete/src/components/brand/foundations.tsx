import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Calendar, Heart, MapPin, Play, Search, Sparkles, Ticket, Users } from "lucide-react"

import { GroupLabel, Panel } from "@/components/brand/specimen"
import { cleanShadow, contrast, toHex, trackingEm, useComputed } from "@/components/brand/read-style"
import { PosterArt } from "@/components/mock/poster"
import { MoodBackdrop } from "@/components/motion/mood-backdrop"
import { CATEGORY_ICONS } from "@/components/sections/home/directory"
import { FeteMark, Logo } from "@/components/site/logo"
import { CATEGORIES, EVENTS } from "@/content/events"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/* ─── Brand ───────────────────────────────────────────────────────────── */

const VOICE = [
  { do: "Talk about the night: “Spritzes, records and the best sunset in the city.”", dont: "Talk about the software: “Seamless event management.”" },
  { do: "Short, warm, a little wry. Full stops.", dont: "Exclamation marks, emoji, “Don’t miss out!!”" },
  { do: "Loud display type for the promise, quiet grey for the reason.", dont: "Gradient on body copy, or three weights in one line." },
  { do: "Real people and real rooms, photographed in their own light.", dont: "Stock handshakes, illustrated confetti, sparkles on every button." },
]

function LogoGround({ tone }: { tone: "page" | "night" | "flare" }) {
  return (
    <div
      className={cn(
        "relative flex h-48 items-center justify-center overflow-hidden rounded-(--radius-panel)",
        tone === "page" && "bg-panel text-ink",
        tone === "night" && "bg-night text-night-fg",
        tone === "flare" && "text-white",
      )}
    >
      {tone === "flare" && <MoodBackdrop mood="electric" />}
      {/* Clear space: the height of the spark on every side. */}
      <div className={cn("relative rounded-(--radius-chip) p-[16px] outline-1 outline-dashed", tone === "page" ? "outline-ink-4" : "outline-white/40")}>
        <Logo className="text-[44px]" />
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
          <LogoGround tone="night" />
          <p className="mt-3 text-[14px] text-ink-3">On night — near-white.</p>
        </div>
        <div>
          <LogoGround tone="flare" />
          <p className="mt-3 text-[14px] text-ink-3">On a mood — pure white.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <Panel className="flex flex-wrap items-end gap-6 p-6 sm:gap-8">
          {[48, 32, 20, 16].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <span style={{ width: s, height: s }} className="text-ink">
                <FeteMark className="size-full" />
              </span>
              <span className="font-mono text-[11px] text-ink-3">{s}px{s === 16 ? " min" : ""}</span>
            </div>
          ))}
        </Panel>
        <Panel className="p-6 text-[15px] text-ink-2">
          <p>
            <span className="font-medium text-ink">The spark</span> is six rounded rays round a dot — a firework seen from below, a table seen from above. It sits top-right of the
            wordmark, at 42% of its cap height, and stands alone in the header and as the app icon. Never smaller than 16px, never recoloured to the flare.
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

const GROUPS: { label: string; swatches: SwatchSpec[] }[] = [
  {
    label: "Surface",
    swatches: [
      { name: "page", token: "--color-page", role: "The page" },
      { name: "panel", token: "--color-panel", role: "Builders, calculators, chips" },
      { name: "panel-deep", token: "--color-panel-deep", role: "Pressed panel" },
      { name: "raised", token: "--color-raised", role: "Cards, mats, fields" },
    ],
  },
  {
    label: "Text",
    swatches: [
      { name: "ink", token: "--color-ink", role: "Headlines, primary button" },
      { name: "ink-2", token: "--color-ink-2", role: "Body" },
      { name: "ink-3", token: "--color-ink-3", role: "Secondary text" },
      { name: "ink-soft", token: "--color-ink-soft", role: "Hero lead — large only" },
      { name: "ink-4", token: "--color-ink-4", role: "Continuations, hints" },
    ],
  },
  {
    label: "Border",
    swatches: [
      { name: "line", token: "--color-line", role: "Hairlines" },
      { name: "line-strong", token: "--color-line-strong", role: "Hover, dashed" },
    ],
  },
  {
    label: "Flare",
    swatches: [1, 2, 3, 4, 5, 6].map((n) => ({ name: `flare-${n}`, token: `--color-flare-${n}`, role: ["Magenta", "Fuchsia", "Rose", "Coral", "Tangerine", "Amber"][n - 1] })).concat([
      { name: "berry", token: "--color-berry", role: "Flare at text size" },
      { name: "berry-soft", token: "--color-berry-soft", role: "Its ground" },
    ]),
  },
  {
    label: "Moods",
    swatches: [
      { name: "night", token: "--color-night", role: "Starlit, check-in" },
      { name: "night-2", token: "--color-night-2", role: "Night surface" },
      { name: "heart", token: "--color-heart", role: "Lovestruck" },
      { name: "sun", token: "--color-sun", role: "Electric's warm pool" },
    ],
  },
  {
    label: "Status",
    swatches: [
      { name: "signal-green", token: "--color-signal-green", role: "Going, free, checked in" },
      { name: "signal-amber", token: "--color-signal-amber", role: "+1, pending" },
      { name: "signal-blue", token: "--color-signal-blue", role: "Info" },
      { name: "signal-red", token: "--color-signal-red", role: "Errors" },
    ],
  },
  {
    label: "Categories",
    swatches: CATEGORIES.map((c) => ({ name: `cat-${c.id}`, token: `--color-cat-${c.id}`, role: c.label })),
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
  ["ink-3", "panel"],
  ["ink-soft", "page"],
  ["berry", "page"],
  ["berry", "berry-soft"],
  ["night-fg", "night"],
  ["signal-green", "signal-green-soft"],
] as const

export function ContrastPair({ fg, bg }: { fg: string; bg: string }) {
  const [ref, v] = useComputed<HTMLDivElement>(["color", "background-color"])
  const ratio = contrast(v.color ?? "", v["background-color"] ?? "")
  const grade = ratio == null ? "" : ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "Fail"
  return (
    <div ref={ref} className="flex items-center justify-between rounded-(--radius-card) px-4 py-3 shadow-(--shadow-hairline)" style={{ color: `var(--color-${fg})`, background: `var(--color-${bg})` }}>
      <span className="text-[15px] font-medium">
        {fg} on {bg}
      </span>
      <span className="font-mono text-[12px] tabular-nums">
        {ratio?.toFixed(2)}:1 · {grade}
      </span>
    </div>
  )
}

export function ColourTokens() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>The flare, as a fill</GroupLabel>
        <div className="flare-fill h-24 rounded-(--radius-panel)" />
        <p className="mt-2 text-[14px] text-ink-3">Six stops interpolated in HCT so the middle never muddies. Display type, the CTA band and the odd 4px rule — never body copy.</p>
      </div>
      {GROUPS.map((g) => (
        <div key={g.label}>
          <GroupLabel>{g.label}</GroupLabel>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
            {g.swatches.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </div>
        </div>
      ))}
      <div>
        <GroupLabel>Text pairs, measured</GroupLabel>
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
  { name: "giga", className: "text-giga", sample: "What’s on." },
  { name: "mega", className: "text-mega", sample: "Nights out" },
  { name: "display", className: "text-display", sample: "Say yes in one tap." },
  { name: "h2", className: "text-h2", sample: "Built with the people" },
  { name: "h3", className: "text-h3", sample: "What’s the night?" },
  { name: "h4", className: "text-h4", sample: "Cocktail Hour, Volume 9" },
  { name: "lead", className: "text-lead", sample: "Name it, dress it, open the door." },
  { name: "body", className: "text-body", sample: "Spritzes, a DJ who plays only records, and the best sunset in the city." },
  { name: "caption", className: "text-caption", sample: "Photography from Pexels" },
]

function ScaleRow({ name, className, sample }: (typeof SCALE)[number]) {
  const [ref, v] = useComputed<HTMLParagraphElement>(["font-size", "line-height", "letter-spacing", "font-weight"])
  const big = ["giga", "mega", "display", "h2", "h3"].includes(name)
  return (
    <div className="grid gap-2 border-b border-line py-5 last:border-b-0 md:grid-cols-[150px_1fr] md:gap-6">
      <div className="font-mono text-[11.5px] leading-relaxed text-ink-3">
        <p className="text-[13px] text-ink">{name}</p>
        <p>
          {parseFloat(v["font-size"] ?? "0").toFixed(2)}px / {v["line-height"] === "normal" ? "normal" : (parseFloat(v["line-height"] ?? "0") / parseFloat(v["font-size"] ?? "1")).toFixed(2)}
        </p>
        <p>{trackingEm(v["letter-spacing"], v["font-size"])}</p>
      </div>
      <p ref={ref} className={cn(className, big && "type-head", "min-w-0 break-words text-ink")}>
        {sample}
      </p>
    </div>
  )
}

export function Typography() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="p-6">
          <GroupLabel>Interface — Inter</GroupLabel>
          <p className="text-[64px] leading-none font-semibold tracking-[-0.05em] text-ink">Aa</p>
          <p className="mt-4 text-[15px] text-ink-2">Optical sizes on, 400 / 500 / 600. Tight tracking that tightens further as the size grows: −0.8% at body, −6% at giga.</p>
          <p className="mt-4 font-mono text-[13px] text-ink-3">0123456789 · tabular-nums for counts and prices</p>
        </Panel>
        <Panel className="p-6">
          <GroupLabel>Posters only</GroupLabel>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-2 text-ink">
            <span className="font-(family-name:--font-block) text-[44px] leading-none uppercase">Block</span>
            <span className="font-(family-name:--font-serif) text-[44px] leading-none">Serif</span>
            <span className="font-(family-name:--font-script) text-[44px] leading-none">Script</span>
          </div>
          <p className="mt-4 text-[15px] text-ink-2">Anton, Instrument Serif and Yellowtail belong to the events’ artwork. They never set interface text.</p>
        </Panel>
      </div>
      <div>
        <GroupLabel>Scale — φ half-steps from 16px</GroupLabel>
        <p className="mb-4 max-w-[60ch] text-[15px] text-ink-3">
          Each step is √φ (×1.272) from the last, so every second step is ×1.618: 12.58 · 16 · 20.35 · 25.89 · 32.94 · 41.89 · 53.29 · 67.77 · 86.23 · 109.66 · 177.44 · 228.43. The top steps clamp with the window.
        </p>
        {SCALE.map((s) => (
          <ScaleRow key={s.name} {...s} />
        ))}
      </div>
    </div>
  )
}

/* ─── Space and surface ───────────────────────────────────────────────── */

const SPACING = ["1", "2", "3", "4", "6", "8", "10", "12", "16", "20", "28"]
const RADII = [
  { name: "chip", token: "--radius-chip", use: "Badges, clear-space box" },
  { name: "field", token: "--radius-field", use: "Inputs" },
  { name: "card", token: "--radius-card", use: "Directory tiles" },
  { name: "poster", token: "--radius-poster", use: "Poster mats" },
  { name: "panel", token: "--radius-panel", use: "Plans, sheets" },
  { name: "device", token: "--radius-device", use: "Phone frame" },
  { name: "button", token: "--radius-button", use: "Every button — a pill" },
]
const SHADOWS = ["hairline", "xs", "card", "poster", "float", "lift", "field", "button", "device"].map((n) => ({ name: n, token: `--shadow-${n}` }))

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
              <span className="h-3 rounded-full flare-fill" style={{ width: `${+s * 4}px` }} />
            </div>
          ))}
          <p className="mt-2 text-[14px] text-ink-3">Sections breathe on <code className="font-mono text-[12px]">--spacing-section</code>: clamp(88px, 11vw, 168px).</p>
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
        <div className="grid grid-cols-2 gap-6 rounded-(--radius-panel) bg-panel p-6 sm:grid-cols-3 lg:grid-cols-5">
          {SHADOWS.map((s) => (
            <ShadowSample key={s.name} {...s} />
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Borders</GroupLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-(--radius-card) border border-line p-4 text-[14px] text-ink-2">1px line — tiles, rules</div>
          <div className="rounded-(--radius-card) border border-dashed border-line-strong p-4 text-[14px] text-ink-2">1px dashed — tickets, empty states</div>
          <div className="rounded-(--radius-card) p-4 text-[14px] text-ink-2 shadow-[0_0_0_1.5px_var(--color-ink)]">1.5px ink ring — focus, selection</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Motion ──────────────────────────────────────────────────────────── */

const MOTIONS = [
  { name: "Press", where: "Every button and card", detail: "scale .97 · 140ms · ease-out-strong", animate: { scale: [1, 0.94, 1] }, transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] } },
  { name: "Rise", where: "Section reveals", detail: "24px · 700ms · ease-out-strong", animate: { y: [24, 0], opacity: [0, 1] }, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
  { name: "Poster land", where: "Hero orbit", detail: "spring · 900ms · bounce .28", animate: { scale: [0.82, 1], y: [18, 0], opacity: [0, 1] }, transition: { type: "spring", duration: 0.9, bounce: 0.28 } },
  { name: "Line mask", where: "Hero headline", detail: "105% → 0 · 720ms · ease-out-strong", animate: { y: ["105%", "0%"] }, transition: { duration: 0.72, ease: [0.23, 1, 0.32, 1] } },
  { name: "Mood open", where: "Hero circle, from the button", detail: "radius · 200ms · (.33,.7,.4,1)", animate: { scale: [0.15, 1] }, transition: { duration: 0.2, ease: [0.33, 0.7, 0.4, 1] } },
  { name: "Mood close", where: "Hero circle, into the button", detail: "radius · 220ms · ease-in", animate: { scale: [1, 0] }, transition: { duration: 0.22, ease: [0.55, 0, 0.8, 0.4] } },
] as const

function MotionSample({ m }: { m: (typeof MOTIONS)[number] }) {
  const [run, setRun] = useState(0)
  const isMood = m.name.startsWith("Mood")
  return (
    <Panel className="flex flex-col p-4">
      <div className="relative grid h-32 place-items-center overflow-hidden rounded-(--radius-card) bg-panel">
        <motion.div
          key={run}
          initial={false}
          animate={run ? (m.animate as never) : undefined}
          transition={m.transition as never}
          className={cn(isMood ? "size-28 rounded-full flare-fill" : "size-14 rounded-[12px] bg-ink", m.name === "Line mask" && "h-8 w-24 rounded-[6px]")}
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[15px] font-medium text-ink">{m.name}</p>
          <p className="text-[13px] text-ink-3">{m.where}</p>
          <p className="mt-1 font-mono text-[11px] text-ink-3">{m.detail}</p>
        </div>
        <button type="button" onClick={() => setRun((r) => r + 1)} aria-label={`Play ${m.name}`} className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-page transition-transform active:scale-90">
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
      <div className="grid gap-4 sm:grid-cols-3">
        {(["starlit", "electric", "lovestruck"] as const).map((mood) => (
          <div key={mood} className="relative h-40 overflow-hidden rounded-(--radius-panel)">
            <MoodBackdrop mood={mood} />
            <p className="absolute bottom-3 left-4 text-[15px] font-medium text-white capitalize">{mood} — looping</p>
          </div>
        ))}
      </div>
      <p className="max-w-[64ch] text-[15px] text-ink-3">
        Every animation is Framer Motion or CSS, so the editor’s Motion switch stops it; Lenis carries the scroll (lerp 0.09). Reduced motion keeps the end states: the hero opens instantly, the
        story shows each finished screen, and nothing loops.
      </p>
    </div>
  )
}

/* ─── Icons and imagery ───────────────────────────────────────────────── */

export function Iconography() {
  const icons = [Calendar, MapPin, Ticket, Users, Search, Heart, Sparkles, ArrowRight]
  return (
    <div className="flex flex-col gap-10">
      <div>
        <GroupLabel>Lucide, 1.7–1.8 stroke</GroupLabel>
        <Panel className="flex flex-wrap gap-6 p-6 text-ink">
          {icons.map((Icon, i) => (
            <Icon key={i} className="size-6" strokeWidth={1.7} />
          ))}
        </Panel>
      </div>
      <div>
        <GroupLabel>Category icons carry their own tint</GroupLabel>
        <Panel className="grid grid-cols-4 gap-6 p-6 sm:grid-cols-8">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.icon]
            return (
              <div key={c.id} className="flex flex-col items-center gap-2 text-center">
                <Icon className={cn("size-7", c.tint)} strokeWidth={1.6} />
                <span className="text-[12px] text-ink-3">{c.label}</span>
              </div>
            )
          })}
        </Panel>
      </div>
      <div>
        <GroupLabel>Posters — real type over real photographs</GroupLabel>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {EVENTS.slice(0, 6).map((e) => (
            <div key={e.id} className="aspect-square rounded-(--radius-poster) bg-raised p-[5px] shadow-(--shadow-poster)">
              <PosterArt poster={e.poster} className="rounded-[10px]" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <GroupLabel>Photography — people in their own light</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[6760872, 4809147, 3768884, 6521573].map((id) => (
            <img key={id} src={pexels(id, 480, 360)} alt="" className="aspect-[4/3] w-full rounded-(--radius-card) object-cover" />
          ))}
        </div>
        <p className="mt-3 max-w-[64ch] text-[14px] text-ink-3">From Pexels, credited in the footer. Candid, warm, mid-moment; no posed handshakes, no empty venues. Always inside a white mat or a rounded card, never full-bleed edge to edge.</p>
      </div>
    </div>
  )
}
