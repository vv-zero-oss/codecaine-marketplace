import { useMemo, useRef, useState, type PointerEvent } from "react"

import { CornerLabels } from "@/components/blocks/corner-label"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { Slider } from "@/components/ui/slider"
import { quote, vertiport, type Vertiport } from "@/content/network"
import { cn } from "@/lib/utils"

/** One aircraft's weekday: back to back through both rush hours, one hop at lunch. */
const LEGS: [string, string, string][] = [
  ["harbour", "midtown", "07:10"],
  ["midtown", "airport", "07:35"],
  ["airport", "riverside", "08:00"],
  ["riverside", "midtown", "08:30"],
  ["midtown", "northgate", "12:40"],
  ["northgate", "midtown", "17:05"],
  ["midtown", "airport", "17:30"],
  ["airport", "harbour", "18:00"],
]

const START = 7 * 60
const END = 19 * 60
const SPAN = END - START
/** Illustrative energy model: a lump for lifting off and landing, then a steady draw in cruise. */
const VERTICAL_COST = 12
const CRUISE_PER_MIN = 2.6
const FAST_CHARGE = 0.9 // %/min up to 80%
const SLOW_CHARGE = 0.3 // %/min above it
const CAP = 95
const RESERVE = 20

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}
const clock = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(Math.round(min) % 60).padStart(2, "0")}`

type Hop = { n: number; from: Vertiport; to: Vertiport; depart: number; arrive: number; km: number }
type Sample = { t: number; soc: number }

function simulate() {
  const hops: Hop[] = LEGS.map(([a, b, at], i) => {
    const from = vertiport(a)
    const to = vertiport(b)
    const trip = quote(from, to)
    const depart = toMin(at)
    return { n: i + 1, from, to, depart, arrive: depart + trip.flightMin, km: trip.km }
  })
  const samples: Sample[] = []
  let soc = CAP
  let hopIdx = 0
  for (let t = START; t <= END; t++) {
    samples.push({ t, soc })
    const hop = hops[hopIdx]
    if (hop && t >= hop.depart && t < hop.arrive) {
      const dur = hop.arrive - hop.depart
      soc -= CRUISE_PER_MIN + VERTICAL_COST / dur
      if (t + 1 >= hop.arrive) hopIdx++
    } else if (t >= hops[0].depart) {
      soc = Math.min(CAP, soc + (soc < 80 ? FAST_CHARGE : SLOW_CHARGE))
    }
  }
  return { hops, samples }
}

const W = 1000
const H = 300
const TOP = 16
const BOTTOM = 262
const X = (t: number) => ((t - START) / SPAN) * W
const Y = (soc: number) => BOTTOM - (soc / 100) * (BOTTOM - TOP)

/**
 * A day in the life of one aircraft's battery: eight hops round the
 * network, charging on the pad in between. Drag the slider — or the chart
 * itself — through the day to read the charge, where the aircraft is, and
 * what it is doing. Trip times come from the same quote every page uses.
 */
export function ChargeDay({
  title = "Two rush hours, back to back, and charge to spare.",
  defaultTime = "08:03",
}: {
  title?: string
  defaultTime?: string
}) {
  const { hops, samples } = useMemo(simulate, [])
  const [t, setT] = useState(toMin(defaultTime))
  const svgRef = useRef<SVGSVGElement>(null)

  const area = useMemo(() => {
    const line = samples.map((s, i) => `${i ? "L" : "M"}${X(s.t).toFixed(1)} ${Y(s.soc).toFixed(1)}`).join(" ")
    return { line, fill: `${line} L${W} ${BOTTOM} L0 ${BOTTOM} Z` }
  }, [samples])

  const sample = samples[Math.min(samples.length - 1, Math.max(0, Math.round(t - START)))]
  const flying = hops.find((h) => t >= h.depart && t < h.arrive)
  const lastLanded = [...hops].reverse().find((h) => h.arrive <= t)
  const next = hops.find((h) => h.depart > t)
  const lowest = Math.min(...samples.map((s) => s.soc))
  const totalKm = hops.reduce((a, h) => a + h.km, 0)

  let where: string
  let doing: string
  if (flying) {
    where = `Hop ${flying.n} of 8 · ${flying.from.name} → ${flying.to.name}`
    doing = `In the air, landing at ${clock(flying.arrive)}`
  } else {
    const pad = lastLanded ? lastLanded.to : hops[0].from
    where = `On the pad at ${pad.name}`
    doing =
      sample.soc >= CAP - 0.5
        ? next
          ? `Charged and waiting. Next out at ${clock(next.depart)}`
          : "Charged. Done for the day"
        : `Charging, ${sample.soc < 80 ? "fast" : "topping up"}${next ? ` · next out at ${clock(next.depart)}` : ""}`
  }

  const scrub = (e: PointerEvent<SVGSVGElement>) => {
    if (e.type === "pointermove" && e.buttons !== 1 && e.pointerType === "mouse") return
    const box = svgRef.current?.getBoundingClientRect()
    if (!box) return
    const k = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width))
    setT(Math.round(START + k * SPAN))
  }

  const cx = X(t)

  return (
    <section data-header-tone="dark" className="bg-panel py-(--spacing-section)">
      <Container>
        <CornerLabels left="Charge and turnaround" right="One aircraft, one weekday" className="text-ink-3" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading
              title={title}
              lead="Between flights the aircraft charges on the pad while one set of passengers steps off and the next steps on. Even with departures every half hour, it never touches the reserve."
            />
            <dl className="grid grid-cols-3 gap-4 border-t border-line-strong pt-5">
              {[
                { k: "Hops", v: "8" },
                { k: "Flown", v: `${Math.round(totalKm)} km` },
                { k: "Lowest", v: `${Math.round(lowest)}%` },
              ].map((s) => (
                <div key={s.k} className="flex flex-col gap-1">
                  <dt className="text-micro text-ink-3">{s.k}</dt>
                  <dd className="type-head text-h4 tabular-nums">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6 rounded-(--radius-photo) bg-raised p-5 shadow-(--shadow-card) md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2" aria-live="polite">
              <div className="flex flex-col gap-1">
                <p className="text-micro text-ink-3">{where}</p>
                <p className="text-body font-medium">{doing}</p>
              </div>
              <p className="type-head text-h2 tabular-nums">
                {clock(t)}
                <span className={cn("ml-3 text-h4", sample.soc < 35 ? "text-ember-ink" : "text-sky")}>{Math.round(sample.soc)}%</span>
              </p>
            </div>

            <div className="relative">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="h-[clamp(180px,26vw,300px)] w-full cursor-ew-resize touch-pan-y"
              onPointerDown={scrub}
              onPointerMove={scrub}
              role="img"
              aria-label={`Battery charge through the day: ${Math.round(sample.soc)}% at ${clock(t)}`}
            >
              {[25, 50, 75, 100].map((g) => (
                <line key={g} x1="0" x2={W} y1={Y(g)} y2={Y(g)} stroke="var(--color-line)" vectorEffect="non-scaling-stroke" />
              ))}
              {hops.map((h) => (
                <rect key={h.n} x={X(h.depart)} width={Math.max(2, X(h.arrive) - X(h.depart))} y={TOP} height={BOTTOM - TOP} fill="var(--color-sky)" opacity="0.1" />
              ))}
              <path d={area.fill} fill="var(--color-sky)" opacity="0.12" />
              <path d={area.line} fill="none" stroke="var(--color-sky)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
              <line x1="0" x2={W} y1={Y(RESERVE)} y2={Y(RESERVE)} stroke="var(--color-ember)" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
              <line x1="0" x2={W} y1={BOTTOM} y2={BOTTOM} stroke="var(--color-line-strong)" vectorEffect="non-scaling-stroke" />
              <line x1={cx} x2={cx} y1={TOP} y2={BOTTOM} stroke="var(--color-ink)" vectorEffect="non-scaling-stroke" />
            </svg>
              <span
                aria-hidden
                className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink shadow-[0_0_0_3px_var(--color-raised)]"
                style={{ left: `${(cx / W) * 100}%`, top: `${(Y(sample.soc) / H) * 100}%` }}
              />
            </div>
            <div className="relative -mt-3 hidden h-4 text-micro text-ink-3 sm:block" aria-hidden>
              {hops.map((h) => (
                <span key={h.n} className="absolute -translate-x-1/2 tabular-nums" style={{ left: `${(X(h.depart) / W) * 100}%` }}>
                  {h.n}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <Slider
                aria-label="Time of day"
                min={START}
                max={END}
                step={1}
                value={[t]}
                onValueChange={([v]) => setT(v)}
                className="py-3"
              />
              <div className="flex justify-between text-micro text-ink-3">
                <span>07:00</span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-px w-4 border-t border-dashed border-ember" /> 20% reserve, never touched
                </span>
                <span>19:00</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
