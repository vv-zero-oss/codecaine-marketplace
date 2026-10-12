import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeftRight, Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { addMinutes, quote, SLOTS, VERTIPORTS, vertiport } from "@/content/network"
import { cn } from "@/lib/utils"

const CAR_TO_PAD = 8
const CAR_FROM_PAD = 6

function minutes(total: number) {
  const h = Math.floor(total / 60)
  const m = total % 60
  return h ? `${h}h ${String(m).padStart(2, "0")}` : `${m} min`
}

/**
 * The app, on glass: a translucent phone laid over the photograph, as the
 * reference shows its app. It works — pick the pads, pick a departure,
 * swap the direction, and press and hold to book. The route arc and the
 * timeline are worked out by `quote()`, the same numbers every page uses.
 *
 * The craft riding the arc is a CSS animation along an offset path, so the
 * editor's Motion switch stops it.
 */
export function JourneyPhone({ holdMs = 900, className }: { /** How long the book button must be held. */ holdMs?: number; className?: string }) {
  const [from, setFrom] = useState("harbour")
  const [to, setTo] = useState("airport")
  const [slot, setSlot] = useState(7)
  const [booked, setBooked] = useState(false)
  const [holding, setHolding] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useCanvasAction("Trip booked", (next) => setBooked(next ?? !booked), { on: booked, group: "App mockup" })

  const trip = useMemo(() => quote(vertiport(from), vertiport(to)), [from, to])
  const depart = SLOTS[slot]
  const doorToDoor = CAR_TO_PAD + trip.flightMin + CAR_FROM_PAD
  const arrive = addMinutes(depart, doorToDoor)
  const ref = useMemo(() => `AER-${(from + to + depart).split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9000, 7) + 1000}`, [from, to, depart])

  const start = () => {
    if (booked) return
    setHolding(true)
    timer.current = window.setTimeout(() => {
      setHolding(false)
      setBooked(true)
    }, holdMs)
  }
  const cancel = () => {
    setHolding(false)
    window.clearTimeout(timer.current)
  }
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const pick = (which: "from" | "to", id: string) => {
    setBooked(false)
    if (which === "from") {
      if (id === to) setTo(from)
      setFrom(id)
    } else {
      if (id === from) setFrom(to)
      setTo(id)
    }
  }

  return (
    <div
      className={cn(
        "relative aspect-[390/800] w-[min(78vw,300px)] rounded-[44px] bg-white/10 p-5 text-white shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.55),0_30px_60px_-30px_rgb(15_13_11/0.6)] backdrop-blur-xl",
        className,
      )}
    >
      <div aria-hidden className="mx-auto mb-4 h-[22px] w-[86px] rounded-full bg-white/18" />
      <p className="text-[11px] text-white/75">Your journey</p>
      <p className="text-[17px] font-medium tracking-[-0.02em]">
        Today, <span className="tabular-nums">{depart}</span>
      </p>

      {/* the route */}
      <div className="relative mx-auto mt-3 h-[150px] w-[220px]">
        <svg viewBox="0 0 220 150" className="absolute inset-0 size-full" aria-hidden>
          <path id="journey-arc" d="M24 120 C 60 20, 160 10, 196 60" fill="none" stroke="white" strokeOpacity="0.85" strokeWidth="1.5" strokeDasharray="3 5" />
          <circle cx="24" cy="120" r="5" fill="white" />
          <circle cx="196" cy="60" r="5" fill="white" />
          <circle cx="196" cy="60" r="11" fill="none" stroke="white" strokeOpacity="0.5" />
        </svg>
        <span
          aria-hidden
          className="absolute top-0 left-0 size-3 rounded-full bg-white shadow-[0_0_0_4px_rgb(255_255_255/0.25)] motion-reduce:hidden"
          style={{ offsetPath: "path('M24 120 C 60 20, 160 10, 196 60')", animation: "journey 4.2s cubic-bezier(0.77,0,0.175,1) infinite" }}
        />
        <span className="absolute bottom-0 left-2 font-mono text-[11px]">{vertiport(from).code}</span>
        <span className="absolute top-[78px] right-0 font-mono text-[11px]">{vertiport(to).code}</span>
        <span className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full bg-white/16 px-2 py-0.5 text-[10.5px] tabular-nums">
          {trip.flightMin} min in the air
        </span>
      </div>

      {/* pads */}
      <div className="mt-2 flex items-center gap-1.5">
        <PadSelect label="From" value={from} onChange={(id) => pick("from", id)} />
        <button
          type="button"
          aria-label="Swap direction"
          onClick={() => {
            setBooked(false)
            setFrom(to)
            setTo(from)
          }}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/16 transition-[background-color,transform] duration-(--duration-hover) hover:bg-white/26 active:scale-90 active:rotate-180"
        >
          <ArrowLeftRight className="size-3.5" />
        </button>
        <PadSelect label="To" value={to} onChange={(id) => pick("to", id)} />
      </div>

      {/* departures */}
      <div role="radiogroup" aria-label="Departure" className="mt-3 flex gap-1.5">
        {[slot - 1, slot, slot + 1, slot + 2]
          .map((i) => Math.min(Math.max(i, 0), SLOTS.length - 1))
          .filter((i, k, all) => all.indexOf(i) === k)
          .map((i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={i === slot}
              onClick={() => {
                setBooked(false)
                setSlot(i)
              }}
              className={cn(
                "h-8 flex-1 rounded-full text-[11.5px] tabular-nums transition-colors duration-(--duration-hover)",
                i === slot ? "bg-white text-ink" : "bg-white/12 hover:bg-white/22",
              )}
            >
              {SLOTS[i]}
            </button>
          ))}
      </div>

      {/* door to door */}
      <div className="mt-4">
        <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full">
          <span className="bg-white/45" style={{ flex: CAR_TO_PAD }} />
          <span className="bg-white" style={{ flex: trip.flightMin }} />
          <span className="bg-white/45" style={{ flex: CAR_FROM_PAD }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-white/80">
          <span>{depart}</span>
          <span>
            {minutes(doorToDoor)} · road {minutes(trip.roadMin + 6)}
          </span>
          <span>{arrive}</span>
        </div>
      </div>

      {/* book */}
      <div className="absolute inset-x-5 bottom-6">
        <AnimatePresence mode="wait" initial={false}>
          {booked ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-3 rounded-[22px] bg-white p-3 text-ink"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky text-on-sky">
                <Check className="size-4" strokeWidth={3} />
              </span>
              <span className="min-w-0 flex-1 text-[12px] leading-tight">
                Seat held · <span className="font-mono">{ref}</span>
                <br />
                <span className="text-ink-3">Car at your door {addMinutes(depart, -CAR_TO_PAD)}</span>
              </span>
              <button type="button" onClick={() => setBooked(false)} className="h-8 rounded-full px-2 text-[11.5px] text-ink-3 hover:text-ink">
                Undo
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="hold"
              type="button"
              exit={{ opacity: 0 }}
              onPointerDown={start}
              onPointerUp={cancel}
              onPointerLeave={cancel}
              onKeyDown={(e) => (e.key === " " || e.key === "Enter") && !e.repeat && start()}
              onKeyUp={cancel}
              onContextMenu={(e) => e.preventDefault()}
              className="relative h-12 w-full touch-none overflow-hidden rounded-full bg-white text-[13px] font-medium text-ink select-none"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 bg-sky-100"
                style={{
                  width: holding ? "100%" : "0%",
                  transition: holding ? `width ${holdMs}ms linear` : "width 240ms cubic-bezier(0.23,1,0.32,1)",
                }}
              />
              <span className="relative">
                {holding ? "Keep holding…" : `Hold to book · $${trip.fare}`}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function PadSelect({ label, value, onChange }: { label: string; value: string; onChange: (id: string) => void }) {
  return (
    <label className="relative min-w-0 flex-1">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full appearance-none truncate rounded-full bg-white/12 pr-2 pl-3 text-[11.5px] text-white outline-none hover:bg-white/22 focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {VERTIPORTS.map((v) => (
          <option key={v.id} value={v.id} className="text-ink">
            {v.name}
          </option>
        ))}
      </select>
    </label>
  )
}
