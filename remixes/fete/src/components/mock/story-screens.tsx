import { Calendar, Check, MapPin, QrCode, Share2, Users } from "lucide-react"

import { PosterArt } from "@/components/mock/poster"
import { findEvent, formatDate } from "@/content/events"
import { avatar, pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * The four screens of the hosting story, each driven by `t` — how far the
 * reader has scrolled through its step, 0 to 1. Scroll back and they run
 * backwards. Sizes are in `cqw` of the phone's screen, so the UI scales
 * with the phone rather than the window.
 */

const EVENT = findEvent("rooftop")!
const clamp = (v: number) => Math.min(1, Math.max(0, v))
/** Progress through a slice of `t`. */
const span = (t: number, from: number, to: number) => clamp((t - from) / (to - from))

const GUESTS = [
  { name: "Inès Moreau", photo: 3738634 },
  { name: "Tomás Reyes", photo: 5496471 },
  { name: "Hana Kim", photo: 39107476 },
  { name: "Kofi Mensah", photo: 7562179 },
  { name: "Lea Novak", photo: 2112714 },
  { name: "Arjun Patel", photo: 8217534 },
  { name: "Maya Brooks", photo: 3769136 },
]

/** 01 — the page builds itself: poster, then the title types in, then the
 *  details land. */
export function ScreenCreate({ t }: { t: number }) {
  const title = EVENT.name
  const typed = title.slice(0, Math.round(span(t, 0.12, 0.55) * title.length))
  const details = span(t, 0.5, 0.8)
  const button = span(t, 0.78, 0.95)
  return (
    <div className="flex h-full flex-col px-[5cqw] pt-[3cqw] text-[4.1cqw]">
      <div className="aspect-square overflow-hidden rounded-[4cqw] shadow-(--shadow-card)" style={{ opacity: 0.3 + span(t, 0, 0.15) * 0.7, transform: `scale(${0.94 + span(t, 0, 0.15) * 0.06})` }}>
        <PosterArt poster={EVENT.poster} />
      </div>
      <p className="mt-[5cqw] min-h-[2.4em] text-[7.4cqw] leading-[1.08] font-semibold tracking-[-0.03em]">
        {typed}
        <span className={cn("ml-px inline-block h-[0.9em] w-[0.5cqw] translate-y-[0.12em] bg-berry", t < 0.6 ? "animate-blink" : "opacity-0")} />
      </p>
      <div className="mt-[3cqw] flex flex-col gap-[2.4cqw]" style={{ opacity: details, transform: `translateY(${(1 - details) * 8}px)` }}>
        <p className="flex items-center gap-[2.4cqw] text-ink-2">
          <span className="grid size-[9cqw] place-items-center rounded-[2.4cqw] border border-line">
            <Calendar className="size-[4.4cqw]" />
          </span>
          {formatDate(EVENT.date, { weekday: "long", month: "long", day: "numeric" })} · 5:30 PM
        </p>
        <p className="flex items-center gap-[2.4cqw] text-ink-2">
          <span className="grid size-[9cqw] place-items-center rounded-[2.4cqw] border border-line">
            <MapPin className="size-[4.4cqw]" />
          </span>
          {EVENT.venue}
        </p>
      </div>
      <div
        className="mt-auto mb-[7cqw] flex h-[12cqw] items-center justify-center rounded-full bg-ink text-[4.3cqw] font-medium text-page"
        style={{ opacity: button, transform: `scale(${0.9 + button * 0.1})` }}
      >
        {t > 0.92 ? "Published ✓" : "Publish page"}
      </div>
    </div>
  )
}

/** 02 — the invite goes out and the guest list fills. */
export function ScreenInvite({ t }: { t: number }) {
  const going = Math.round(span(t, 0.1, 0.9) * 82)
  const shown = Math.round(span(t, 0.1, 0.9) * GUESTS.length)
  return (
    <div className="flex h-full flex-col px-[5cqw] pt-[3cqw] text-[4.1cqw]">
      <div className="flex items-center gap-[3cqw]">
        <div className="size-[16cqw] shrink-0 overflow-hidden rounded-[3cqw]">
          <PosterArt poster={EVENT.poster} titleScale={0.6} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[4.6cqw] font-semibold tracking-[-0.02em]">{EVENT.name}</p>
          <p className="text-[3.6cqw] text-ink-3">{formatDate(EVENT.date)} · Condesa</p>
        </div>
      </div>
      <div className="mt-[5cqw] rounded-[4cqw] bg-panel p-[4cqw]">
        <div className="flex items-baseline justify-between">
          <p className="text-[3.4cqw] tracking-[0.04em] text-ink-3 uppercase">Going</p>
          <p className="text-[3.4cqw] text-ink-3 tabular-nums">of 90</p>
        </div>
        <p className="text-[13cqw] leading-none font-semibold tracking-[-0.05em] tabular-nums">{going}</p>
        <div className="mt-[3cqw] h-[1.6cqw] overflow-hidden rounded-full bg-line">
          <div className="flare-fill h-full rounded-full" style={{ width: `${(going / 90) * 100}%` }} />
        </div>
      </div>
      <p className="mt-[5cqw] mb-[2cqw] text-[3.4cqw] tracking-[0.04em] text-ink-3 uppercase">Just said yes</p>
      <ul className="flex flex-col">
        {GUESTS.slice(0, shown)
          .reverse()
          .map((g, i) => (
            <li key={g.name} className="flex items-center gap-[3cqw] border-b border-line py-[2.2cqw] animate-in fade-in-0 slide-in-from-top-2" style={{ animationDuration: "320ms" }}>
              <img src={avatar(g.photo)} alt="" className="size-[9cqw] rounded-full object-cover" />
              <span className="flex-1 truncate">{g.name}</span>
              <span className={cn("rounded-full px-[2.4cqw] py-[0.6cqw] text-[3.2cqw]", i % 3 === 1 ? "bg-signal-amber-soft text-signal-amber" : "bg-signal-green-soft text-signal-green")}>
                {i % 3 === 1 ? "+1" : "Going"}
              </span>
            </li>
          ))}
      </ul>
      <div className="mt-auto mb-[7cqw] flex h-[12cqw] items-center justify-center gap-[2cqw] rounded-full border border-line-strong text-[4.1cqw] font-medium">
        <Share2 className="size-[4.4cqw]" /> Share invite link
      </div>
    </div>
  )
}

/** 03 — the doors: a ticket scans, names tick off, the count climbs. */
export function ScreenCheckIn({ t }: { t: number }) {
  const arrived = Math.round(span(t, 0.05, 0.95) * 76)
  const scanning = Math.floor(span(t, 0, 1) * 5) % 2 === 0
  return (
    <div className="flex h-full flex-col px-[5cqw] pt-[3cqw] text-[4.1cqw]">
      <p className="text-[3.4cqw] tracking-[0.04em] text-night-muted uppercase">Check-in · Door 1</p>
      <p className="mt-[1cqw] text-[6cqw] font-semibold tracking-[-0.03em]">{EVENT.name}</p>
      <div className="relative mx-auto mt-[6cqw] grid aspect-square w-[70%] place-items-center rounded-[5cqw] bg-night-2">
        {/* the finder's corners */}
        {["top-[6%] left-[6%] border-t-2 border-l-2 rounded-tl-[3cqw]", "top-[6%] right-[6%] border-t-2 border-r-2 rounded-tr-[3cqw]", "bottom-[6%] left-[6%] border-b-2 border-l-2 rounded-bl-[3cqw]", "right-[6%] bottom-[6%] border-r-2 border-b-2 rounded-br-[3cqw]"].map((c) => (
          <span key={c} className={cn("absolute size-[14%] transition-colors duration-200", c, scanning ? "border-white/70" : "border-signal-green")} />
        ))}
        <QrCode className={cn("size-[52%] transition-opacity duration-200", scanning ? "opacity-80" : "opacity-30")} strokeWidth={1.2} />
        {!scanning && (
          <span className="absolute grid size-[30%] place-items-center rounded-full bg-signal-green text-white animate-in zoom-in-50 fade-in-0" style={{ animationDuration: "260ms" }}>
            <Check className="size-[55%]" strokeWidth={3} />
          </span>
        )}
        <span
          aria-hidden
          className="absolute inset-x-[10%] h-[2px] bg-flare-3 shadow-[0_0_14px_var(--color-flare-3)]"
          style={{ top: `${12 + ((t * 5) % 1) * 76}%`, opacity: scanning ? 1 : 0 }}
        />
      </div>
      <div className="mt-[6cqw] flex items-end justify-between">
        <div>
          <p className="text-[3.4cqw] tracking-[0.04em] text-night-muted uppercase">Arrived</p>
          <p className="text-[12cqw] leading-none font-semibold tracking-[-0.05em] tabular-nums">
            {arrived}
            <span className="text-[6cqw] text-night-muted">/82</span>
          </p>
        </div>
        <div className="flex items-center gap-[1.6cqw] rounded-full bg-signal-green/20 px-[3cqw] py-[1.4cqw] text-[3.4cqw] text-[#6ee7a8]">
          <span className="size-[1.8cqw] rounded-full bg-[#6ee7a8] motion-safe:animate-pulse-dot" /> 3 doors live
        </div>
      </div>
      <ul className="mt-[4cqw] flex flex-col gap-[1.6cqw]">
        {GUESTS.slice(0, 3).map((g, i) => {
          const done = t > 0.2 + i * 0.22
          return (
            <li key={g.name} className="flex items-center gap-[3cqw] rounded-[3cqw] bg-night-2 px-[3cqw] py-[2cqw]">
              <img src={avatar(g.photo)} alt="" className="size-[8cqw] rounded-full object-cover" />
              <span className="flex-1 truncate text-[3.8cqw]">{g.name}</span>
              <span className={cn("grid size-[6cqw] place-items-center rounded-full transition-colors duration-200", done ? "bg-signal-green text-white" : "border border-night-line")}>
                {done && <Check className="size-[3.6cqw]" strokeWidth={3} />}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const RECAP = [6760872, 36729891, 5935206, 36729887, 1267694, 8910376]

/** 04 — the morning after: photos fill in, a thank-you, the next date. */
export function ScreenRecap({ t }: { t: number }) {
  const photos = Math.round(span(t, 0.05, 0.6) * RECAP.length)
  const note = span(t, 0.55, 0.8)
  const next = span(t, 0.75, 0.95)
  return (
    <div className="flex h-full flex-col px-[5cqw] pt-[3cqw] text-[4.1cqw]">
      <p className="text-[3.4cqw] tracking-[0.04em] text-ink-3 uppercase">The morning after</p>
      <p className="mt-[1cqw] text-[6cqw] font-semibold tracking-[-0.03em]">126 photos from last night</p>
      <div className="mt-[4cqw] grid grid-cols-3 gap-[1.6cqw]">
        {RECAP.map((id, i) => (
          <div key={id} className="aspect-square overflow-hidden rounded-[2.4cqw] bg-panel">
            {i < photos && <img src={pexels(id, 240, 240)} alt="" className="size-full object-cover animate-in fade-in-0 zoom-in-95" style={{ animationDuration: "380ms" }} />}
          </div>
        ))}
      </div>
      <div className="mt-[4cqw] rounded-[4cqw] bg-panel p-[4cqw]" style={{ opacity: note, transform: `translateY(${(1 - note) * 10}px)` }}>
        <p className="text-[3.9cqw] leading-snug text-ink-2">
          “Thank you for making the roof feel like a living room. Same sunset, next month?”
        </p>
        <p className="mt-[2cqw] text-[3.4cqw] text-ink-3">— Upstairs Society</p>
      </div>
      <div className="mt-[4cqw] flex items-center gap-[3cqw] rounded-[4cqw] border border-line p-[3cqw]" style={{ opacity: next, transform: `scale(${0.94 + next * 0.06})` }}>
        <span className="grid size-[12cqw] place-items-center rounded-[3cqw] bg-berry-soft text-berry">
          <Users className="size-[5cqw]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[4cqw] font-medium">Golden Hour, No. 2</span>
          <span className="block text-[3.4cqw] text-ink-3">Nov 28 · 64 already going</span>
        </span>
      </div>
    </div>
  )
}
