import { useMemo, useRef, useState } from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { quote, vertiport } from "@/content/network"
import { cn } from "@/lib/utils"

const DAY_START = 6 * 60
const DAY_END = 22 * 60
const WORK_START = 9 * 60
const WORK_END = 17 * 60 + 30
const CAR_LEGS = 14

function clock(min: number) {
  const m = Math.round(min)
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`
}
const pct = (min: number) => ((min - DAY_START) / (DAY_END - DAY_START)) * 100

/** What the time handed back turns into, morning and evening. */
const GIFTS = ["Breakfast", "Daylight"]

/**
 * The extra chapter: one ordinary weekday, twice. Pinned while it plays —
 * scroll, and the second day's commute shrinks from the road's length to
 * the flight's, the hours it frees fill with something better, and a
 * counter adds up what that is worth in a year.
 *
 * The route is two props (`from`, `to`, vertiport ids), priced by
 * `quote()`, so the editor can re-plan the day.
 */
export function DayReplanned({
  from = "northgate",
  to = "midtown",
  workdays = 230,
}: {
  from?: string
  to?: string
  /** Working days in a year, for the yearly total. */
  workdays?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = !!(reduced || designing)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 36, mass: 0.4 })
  const q = useTransform(smooth, [0.15, 0.75], [0, 1], { clamp: true })

  const trip = useMemo(() => quote(vertiport(from), vertiport(to)), [from, to])
  const road = trip.roadMin + 6
  const air = CAR_LEGS + trip.flightMin
  const savedDay = (road - air) * 2

  const [shown, setShown] = useState(still ? 1 : 0)
  useMotionValueEvent(q, "change", (v) => setShown(v))
  const t = still ? 1 : shown
  const commute = road + (air - road) * t
  const saved = Math.round(savedDay * t)
  const yearly = Math.round((savedDay * workdays * t) / 60)

  return (
    <section ref={ref} data-header-tone="dark" className={cn("relative bg-page", still ? "" : "h-[260svh]")}>
      <div className={cn("flex flex-col justify-center gap-[clamp(28px,6svh,64px)] px-(--spacing-gutter)", still ? "py-(--spacing-section)" : "sticky top-0 h-svh")}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="type-head max-w-[14ch] text-display">Give the weekday its evening back.</h2>
          <p className="max-w-[34ch] text-body text-ink-3">
            {vertiport(from).name} to {vertiport(to).name}, at rush hour. {road} minutes door to door by road; {air} with Aerie, cars
            included.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <DayRow label="By road" commute={road} />
          <DayRow label="With Aerie" commute={commute} road={road} gifts={t} highlight />
          <div aria-hidden className="relative h-4 text-micro text-ink-3">
            {[6, 9, 12, 15, 18, 21].map((h) => (
              <span key={h} className="absolute -translate-x-1/2 tabular-nums first:translate-x-0" style={{ left: `${pct(h * 60)}%` }}>
                {String(h).padStart(2, "0")}:00
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-3">
          <Stat label="Back, every working day" value={`${Math.floor(saved / 60)}h ${String(saved % 60).padStart(2, "0")}`} />
          <Stat label={`Back, over ${workdays} working days`} value={`${yearly} hours`} />
          <p className="col-span-2 max-w-[36ch] self-end text-micro text-ink-3 md:col-span-1">
            Road times are rush-hour averages plus parking; flight times include boarding. Your day may vary — rarely by much.
          </p>
        </div>
      </div>
      {!still && <ScrollHint progress={smooth} />}
    </section>
  )
}

function DayRow({ label, commute, road = commute, gifts = 0, highlight = false }: { label: string; commute: number; road?: number; gifts?: number; highlight?: boolean }) {
  const leave = WORK_START - commute
  const home = WORK_END + commute
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-center gap-3 sm:grid-cols-[7rem_1fr]">
      <span className={cn("text-micro font-medium", highlight ? "text-sky" : "text-ink-2")}>{label}</span>
      <div className="relative h-[clamp(44px,7svh,64px)] overflow-hidden rounded-(--radius-card) bg-panel">
        <Block start={leave} end={WORK_START} className={highlight ? "bg-sky text-on-sky" : "bg-ink-2 text-page"} text={`${Math.round(commute)} min`} />
        <Block start={WORK_START} end={WORK_END} className="bg-panel-deep text-ink-2" text="Work" />
        <Block start={WORK_END} end={home} className={highlight ? "bg-sky text-on-sky" : "bg-ink-2 text-page"} text={`${Math.round(commute)} min`} />
        {highlight && (
          <>
            <Gift start={WORK_START - road} end={leave} visible={gifts} text={GIFTS[0]} />
            <Gift start={home} end={WORK_END + road} visible={gifts} text={GIFTS[1]} />
          </>
        )}
      </div>
    </div>
  )
}

function Block({ start, end, text, className }: { start: number; end: number; text: string; className?: string }) {
  const width = pct(end) - pct(start)
  return (
    <div
      className={cn("absolute inset-y-1.5 flex items-center overflow-hidden rounded-[10px] px-2 text-micro whitespace-nowrap tabular-nums max-md:text-[0px]", className)}
      style={{ left: `${pct(start)}%`, width: `${width}%` }}
      title={`${clock(start)}–${clock(end)}`}
    >
      {width > 5 ? text : ""}
    </div>
  )
}

/** The freed time, filling in as the commute shrinks. */
function Gift({ start, end, visible, text }: { start: number; end: number; visible: number; text: string }) {
  return (
    <div
      className="absolute inset-y-1.5 hidden items-center overflow-hidden rounded-[10px] bg-sky-50 px-2 text-micro text-ellipsis whitespace-nowrap text-sky-700 sm:flex"
      style={{ left: `${pct(start)}%`, width: `${pct(end) - pct(start)}%`, opacity: Math.max(0, visible * 1.4 - 0.4) }}
    >
      {text}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-micro text-ink-3">{label}</p>
      <p className="type-head mt-1 text-h2 tabular-nums">{value}</p>
    </div>
  )
}

/** A hairline at the stage's foot that fills as the day re-plans. */
function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  return (
    <div aria-hidden className="pointer-events-none sticky bottom-0 h-px w-full bg-line">
      <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-ink" />
    </div>
  )
}
