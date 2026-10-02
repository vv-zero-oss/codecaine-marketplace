import { useCanvasAction } from "@canvas/react"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

import { SevenSegment } from "@/components/ui/seven-segment"
import { cn } from "@/lib/utils"

type Hue = "amber" | "red" | "green"

const HOUSES = [
  { name: "Heron", enamel: "bg-sky", points: 482 },
  { name: "Kestrel", enamel: "bg-rust", points: 467 },
  { name: "Osprey", enamel: "bg-teal", points: 455 },
  { name: "Wren", enamel: "bg-brass", points: 431 },
]

const pad = (n: number, width = 2) => String(Math.max(0, n)).padStart(width, "0")

/** Time left until the next time `target` comes round (a year on, once it has passed). */
function remaining(target: string, now: number) {
  const date = new Date(target)
  while (date.getTime() < now) date.setFullYear(date.getFullYear() + 1)
  const total = Math.floor((date.getTime() - now) / 1000)
  return { days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 }
}

/** Rivets at the four corners of a plate. */
function Screws() {
  return (
    <>
      {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((spot, i) => (
        <span key={spot} aria-hidden className={cn("absolute size-3.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,var(--paper-dark)_55%,var(--ink-faint))] shadow-[0_1px_1px_rgb(0_0_0/0.5),inset_0_-1px_1px_rgb(0_0_0/0.3)]", spot)}>
          <i className="absolute top-1/2 left-1/2 h-px w-2.5 -translate-x-1/2 -translate-y-1/2 bg-ink/70" style={{ rotate: `${i * 47 + 20}deg` }} />
        </span>
      ))}
    </>
  )
}

/** A glass window sunk into the plate, with the LEDs behind it. */
function Window({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[10px] border-2 border-black bg-lcd px-4 py-4 shadow-deboss sm:px-6", className)}>
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.14),transparent_38%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(0_0_0/0.18)_0_1px,transparent_1px_3px)]" />
    </div>
  )
}

/**
 * The embossed LED board: a countdown to Founders’ Day and the House Points
 * scoreboard, behind glass, on a riveted plate. The 3D comes from stacked
 * insets — a bright lip top-left, a dark one bottom-right — and the type is
 * letterpressed into the metal. Colour is one switch (`hue`); the countdown is
 * live; the points move with the keys under each house.
 */
export function LedBoard({
  title = "Founders’ Day",
  targetDate = "2026-12-12T18:00:00",
  hue = "amber",
  className,
}: {
  title?: string
  /** ISO date; when it has passed, the count runs to the same day next year */
  targetDate?: string
  hue?: Hue
  className?: string
}) {
  const [color, setColor] = useState<Hue>(hue)
  const [now, setNow] = useState(() => Date.now())
  const [points, setPoints] = useState(HOUSES.map((h) => h.points))
  const left = remaining(targetDate, now)
  const leader = points.indexOf(Math.max(...points))

  useEffect(() => setColor(hue), [hue])
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useCanvasAction("LED colour: amber", () => setColor("amber"), { group: "LED board", on: color === "amber" })
  useCanvasAction("LED colour: red", () => setColor("red"), { group: "LED board", on: color === "red" })
  useCanvasAction("LED colour: green", () => setColor("green"), { group: "LED board", on: color === "green" })

  const bump = (i: number, by: number) => setPoints((p) => p.map((v, j) => (j === i ? Math.min(999, Math.max(0, v + by)) : v)))

  return (
    <div
      data-led={color}
      className={cn(
        "relative rounded-[22px] border-2 border-ink bg-[linear-gradient(135deg,var(--paper-bright),var(--paper-light)_45%,var(--paper-dark))] p-5 pb-6 shadow-emboss sm:p-8",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.2)_0_1px,transparent_1px_3px)] before:content-['']",
        className,
      )}
    >
      <Screws />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <h3 className="display letterpress text-[clamp(1.9rem,4vw,2.9rem)]">{title} countdown</h3>
        <div role="radiogroup" aria-label="LED colour" className="flex items-center gap-2">
          <span className="kicker letterpress mr-1 text-ink-soft">LED</span>
          {(["amber", "red", "green"] as Hue[]).map((h) => (
            <button
              key={h}
              type="button"
              role="radio"
              aria-checked={color === h}
              aria-label={h}
              onClick={() => setColor(h)}
              className={cn(
                "size-11 touch-manipulation rounded-full border-2 border-ink transition-[transform,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-press)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust",
                color === h ? "translate-y-[3px] shadow-[0_1px_0_var(--ink),inset_0_0_10px_rgb(0_0_0/0.35)]" : "shadow-[0_4px_0_var(--ink)] active:translate-y-[3px]",
                h === "amber" && "bg-led-amber",
                h === "red" && "bg-led-red",
                h === "green" && "bg-led-green",
              )}
              style={{ backgroundColor: `var(--led-${h})`, backgroundImage: "radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.55), transparent 55%)" }}
            />
          ))}
        </div>
      </div>

      {/* countdown */}
      <Window className="relative mt-5">
        <div className="flex flex-wrap items-end justify-center gap-x-3 gap-y-4 sm:gap-x-6">
          {[
            ["Days", pad(left.days, 3)],
            ["Hours", pad(left.hours)],
            ["Min", pad(left.minutes)],
            ["Sec", pad(left.seconds)],
          ].map(([label, value], i) => (
            <div key={label} className="flex items-end gap-3 sm:gap-6">
              <div className="flex flex-col items-center gap-2">
                <SevenSegment value={value} height={64} label={`${Number(value)} ${label.toLowerCase()}`} className="max-sm:[&]:h-12" />
                <span className="font-type text-[0.6rem] tracking-[0.25em] text-led/80 uppercase">{label}</span>
              </div>
              {i < 3 ? <SevenSegment value=":" height={64} className="max-sm:hidden" /> : null}
            </div>
          ))}
        </div>
      </Window>

      {/* scoreboard */}
      <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
        {HOUSES.map((house, i) => (
          <div key={house.name} className="flex flex-col gap-3 rounded-[12px] border-2 border-ink/80 bg-paper-light/60 p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_2px_0_var(--paper-fold)]">
            <div className="flex items-center justify-between gap-3">
              <span className={cn("rounded-[3px] border border-ink px-2.5 py-1 font-display text-lg leading-none text-paper-bright shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]", house.enamel)}>{house.name}</span>
              {i === leader ? <span className="kicker letterpress text-rust-deep">▲ Leading</span> : null}
            </div>
            <Window className="px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <SevenSegment value={pad(points[i], 3)} height={48} label={`${house.name}: ${points[i]} points`} />
                <span className="font-type text-[0.6rem] tracking-[0.2em] text-led/80 uppercase">pts</span>
              </div>
            </Window>
            <div className="flex gap-2">
              <button type="button" onClick={() => bump(i, -10)} aria-label={`Take 10 from ${house.name}`} className={keyClass}><Minus className="size-4" />10</button>
              <button type="button" onClick={() => bump(i, 10)} aria-label={`Give ${house.name} 10`} className={keyClass}><Plus className="size-4" />10</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const keyClass =
  "inline-flex min-h-11 flex-1 touch-manipulation items-center justify-center gap-1.5 rounded-key border-2 border-ink bg-paper-bright font-type text-[0.78rem] tracking-widest shadow-key transition-[transform,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-press)] hover:bg-paper-light active:translate-y-[3px] active:shadow-key-down focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
