import { useEffect, useRef, useState } from "react"
import { Footprints, Luggage, Navigation, Share2, X } from "lucide-react"
import { animate, useReducedMotion, type AnimationPlaybackControls } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { BeltChip, GateChip, MyFlightsSheet, TailMark, TimeBlock } from "@/components/mock/app-ui"
import { FlightMap } from "@/components/mock/flight-map"
import { MY_FLIGHTS, PASSPORT } from "@/lib/flights"
import { avatar, PEOPLE } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * The four screens the hero phone moves through, and the passport screen the
 * other phones reuse. Each one is live: maps fly, a plane taxis, a clock
 * counts down.
 */

/** Preflight: the continent, two routes, and "My flights". */
export function PreflightScreen({ paused = false }: { paused?: boolean }) {
  return (
    <div className="relative size-full bg-map-sea">
      <div className="absolute inset-x-0 top-0 h-[58%]">
        <FlightMap region="usa" routes="SFO-JFK,AUS-JFK,SFO-ORD" width={360} height={450} duration={18} paused={paused} />
        <MapControls />
      </div>
      <MyFlightsSheet flights={MY_FLIGHTS} className="absolute inset-x-0 bottom-0 h-[46%] overflow-hidden" />
    </div>
  )
}

function MapControls() {
  return (
    <div className="absolute top-[3.6em] right-[0.8em] flex flex-col gap-[0.5em] rounded-full bg-page/92 px-[0.35em] py-[0.6em] text-ink shadow-(--shadow-xs)">
      <Navigation className="size-[1em]" />
      <Share2 className="size-[1em]" />
    </div>
  )
}

/** The taxi route across the airport diagram, as one path the plane follows. */
const TAXI = "M 58 300 L 120 300 Q 140 300 140 280 L 140 190 Q 140 170 160 170 L 300 170 Q 318 170 318 152 L 318 70"

/** At the airport: a ground diagram with the plane taxiing to the runway. */
export function AirportScreen({ paused = false }: { paused?: boolean }) {
  const path = useRef<SVGPathElement>(null)
  const [pos, setPos] = useState({ x: 58, y: 300, a: 0 })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const taxi = useRef<AnimationPlaybackControls | null>(null)

  useEffect(() => {
    const el = path.current
    if (!el) return
    const length = el.getTotalLength()
    const place = (t: number) => {
      const p = el.getPointAtLength(t * length)
      const q = el.getPointAtLength(Math.min(t * length + 2, length))
      setPos({ x: p.x, y: p.y, a: (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI })
    }
    if (reduced || designing || paused) {
      place(0.42)
      return
    }
    taxi.current = animate(0, 1, { duration: 9, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2, onUpdate: place })
    return () => {
      taxi.current?.stop()
      taxi.current = null
    }
  }, [reduced, designing, paused])

  return (
    <div className="relative size-full bg-[#eef3e6]">
      <svg viewBox="0 0 360 420" preserveAspectRatio="xMidYMid slice" className="absolute inset-x-0 top-0 h-[52%] w-full" aria-label="Airport diagram with the plane taxiing to runway 28L">
        <rect width={360} height={420} fill="#e7efdc" />
        {/* runways */}
        <g transform="rotate(-12 180 120)">
          <rect x={-20} y={44} width={420} height={22} rx={2} fill="#6f7480" />
          <path d="M -10 55 H 390" stroke="#fff" strokeWidth={1.4} strokeDasharray="10 9" />
          <text x={30} y={40} fontSize={11} fontWeight={700} fill="#45454f" style={{ fontFamily: "var(--font-mono)" }}>28L</text>
        </g>
        <rect x={250} y={-10} width={20} height={240} fill="#6f7480" transform="rotate(8 260 100)" />
        {/* taxiways */}
        <path d={TAXI} fill="none" stroke="#c9ccb9" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
        <path ref={path} d={TAXI} fill="none" stroke="var(--color-amber)" strokeWidth={2} strokeDasharray="5 5" strokeLinecap="round" />
        {/* terminal and gates */}
        <rect x={10} y={318} width={250} height={70} rx={10} fill="#d4d8e0" />
        {[30, 70, 110, 150, 190, 230].map((x, i) => (
          <g key={x}>
            <rect x={x - 2} y={300} width={4} height={18} fill="#b9bfcb" />
            <text x={x} y={352} textAnchor="middle" fontSize={10} fontWeight={600} fill="#6b6b76" style={{ fontFamily: "var(--font-sans)" }}>
              B{22 + i}
            </text>
          </g>
        ))}
        <text x={136} y={376} textAnchor="middle" fontSize={11} fontWeight={700} fill="#45454f" letterSpacing="0.08em" style={{ fontFamily: "var(--font-sans)" }}>TERMINAL 1</text>
        <g transform={`translate(${pos.x} ${pos.y}) rotate(${pos.a})`}>
          <circle r={14} fill="var(--color-blue)" opacity={0.16} />
          <path d="M11 0 L-3 -2.4 L-8 -11 L-11 -11 L-8 -2.4 L-14 -2 L-16 -5.5 L-18 -5.5 L-17 0 L-18 5.5 L-16 5.5 L-14 2 L-8 2.4 L-11 11 L-8 11 L-3 2.4 Z" fill="var(--color-ink)" />
        </g>
        <g transform="translate(70 288)">
          <rect x={-46} y={-30} width={92} height={18} rx={9} fill="var(--color-blue)" />
          <text y={-17.5} textAnchor="middle" fontSize={9.5} fontWeight={600} fill="#fff" style={{ fontFamily: "var(--font-sans)" }}>NW 214 · taxiing</text>
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-[54%] rounded-t-[1.4em] bg-page px-[1.1em] pt-[0.9em] shadow-[0_-8px_30px_-12px_rgb(11_11_16/0.25)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="flex items-center gap-[0.35em] text-[0.62em] text-ink-3">
              <TailMark airline="NW" className="size-[1.2em]" /> NW 214 · FRI, 6 JUN
            </p>
            <p className="text-[0.95em] font-bold tracking-[-0.02em]">San Francisco to New York</p>
          </div>
          <X className="size-[0.9em] text-ink-3" />
        </div>
        <div className="mt-[0.6em] flex gap-[0.4em] text-[0.6em] font-semibold">
          <span className="rounded-full bg-blue px-[0.8em] py-[0.35em] text-white">Live Share</span>
          <span className="rounded-full bg-panel px-[0.8em] py-[0.35em]">My Flight</span>
          <span className="rounded-full bg-panel px-[0.8em] py-[0.35em]">Alternatives</span>
        </div>
        <p className="mt-[0.7em] border-b border-line pb-[0.6em] text-[0.7em] font-semibold">
          Taxiing to runway <span className="text-green">28L</span>
          <span className="block text-[0.85em] font-normal text-ink-3">Wheels up in about 9 min · 3 ahead in line</span>
        </p>
        <div className="mt-[0.6em] flex flex-col gap-[0.7em]">
          <TimeBlock code="SFO" time="06:04" was="06:00" note="Departed gate · 4m late" gate="B27" />
          <TimeBlock code="JFK" time="14:39" was="14:41" note="2m early · arrives in 5h 35m" gate="33" arrival />
        </div>
      </div>
    </div>
  )
}

/** After landing: the belt, the walk to the connection, the next leg. */
export function ArrivalScreen() {
  return (
    <div className="relative size-full bg-panel">
      <div className="absolute inset-x-0 top-0 h-[40%] overflow-hidden bg-[linear-gradient(180deg,#dfe8f5,#f5f5f7)]">
        <svg viewBox="0 0 360 200" className="absolute inset-x-0 bottom-0 w-full" aria-hidden>
          <path d="M0 160 Q 90 120 180 140 T 360 120 V200 H0Z" fill="#cdd9ea" />
          <path d="M0 180 Q 120 150 220 170 T 360 160 V200 H0Z" fill="#b9c8de" />
        </svg>
        <div className="absolute inset-x-[1.1em] top-[4em]">
          <p className="text-[0.62em] font-semibold tracking-[0.08em] text-ink-3 uppercase">Landed · JFK</p>
          <p className="mt-[0.2em] text-[1.9em] leading-none font-bold tracking-[-0.04em]">Welcome to<br />New York</p>
          <p className="mt-[0.5em] text-[0.7em] text-ink-2">6:32 pm · 22 min early · 24° and clear</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-[62%] flex-col gap-[0.6em] rounded-t-[1.4em] bg-page px-[1.1em] pt-[1em]">
        <div className="flex items-center justify-between rounded-[0.9em] bg-panel p-[0.8em]">
          <div>
            <p className="flex items-center gap-[0.35em] text-[0.7em] font-semibold"><Luggage className="size-[1.1em]" /> Baggage claim</p>
            <p className="mt-[0.2em] text-[0.62em] text-ink-3">First bags expected 6:48 pm</p>
          </div>
          <BeltChip belt={6} className="text-[1em]" />
        </div>
        <div className="rounded-[0.9em] bg-panel p-[0.8em]">
          <p className="flex items-center gap-[0.35em] text-[0.7em] font-semibold"><Footprints className="size-[1.1em]" /> Connection to Lisbon</p>
          <div className="mt-[0.5em] flex items-center gap-[0.5em]">
            <span className="text-[1.5em] font-bold tracking-[-0.03em] tabular-nums">12 min</span>
            <span className="text-[0.62em] leading-tight text-ink-3">walk to <GateChip gate="A7" className="text-[1em]" /><br />Terminal 4 · 1h 48m to spare</span>
          </div>
          <div className="mt-[0.6em] h-[0.35em] overflow-hidden rounded-full bg-line">
            <div className="h-full w-[38%] rounded-full bg-green" />
          </div>
        </div>
        <div className="flex items-center gap-[0.6em] rounded-[0.9em] bg-violet-soft p-[0.8em]">
          <img src={avatar(PEOPLE[0], 80)} alt="" className="size-[2em] rounded-full object-cover" />
          <p className="text-[0.66em] leading-snug"><span className="font-semibold">Ama was told you landed.</span> <span className="text-ink-2">She's 10 min from Arrivals.</span></p>
        </div>
      </div>
    </div>
  )
}

/** The year in numbers, in violet, over the world it covered. */
export function PassportScreen({ year = 2025, className }: { year?: number; className?: string }) {
  const data = PASSPORT.find((p) => p.year === year) ?? PASSPORT[1]
  return (
    <div className={cn("relative size-full bg-violet-ink text-white", className)}>
      <div className="absolute inset-x-0 top-[4.6em] flex items-center justify-between px-[1.4em] text-[0.7em]">
        <X className="size-[1.1em]" />
        <span className="font-semibold">Contrail Passport</span>
        <Share2 className="size-[1.1em]" />
      </div>
      <div className="absolute inset-x-0 top-[6.6em] flex justify-center gap-[0.6em] text-[0.55em] font-semibold tracking-[0.06em] text-white/50">
        {["ALL TIME", String(year), "OCT", "AUG", "JUL"].map((t, i) => (
          <span key={t} className={cn("rounded-full px-[0.7em] py-[0.25em]", i === 1 && "bg-white/15 text-white")}>{t}</span>
        ))}
      </div>
      <div className="absolute inset-x-0 top-[8.6em] h-[40%]">
        <FlightMap region="world" palette="violet" routes={data.routes.map((r) => r.join("-")).join(",")} labels={false} width={360} height={220} duration={10} />
      </div>
      <div className="absolute inset-x-0 top-[calc(8.6em+40%)] flex items-center gap-[0.5em] overflow-hidden px-[1.1em] py-[0.6em] text-[0.55em] font-semibold tracking-[0.06em] whitespace-nowrap text-white/70" aria-hidden>
        {data.routes.slice(0, 7).map(([a], i) => (
          <span key={i} className="flex items-center gap-[0.5em]"><span className="text-violet-glow">✈</span>{a}</span>
        ))}
      </div>
      <div className="absolute inset-x-[1.1em] bottom-[1.4em]">
        <p className="text-[0.6em] font-semibold tracking-[0.08em] text-white/60">{year} CONTRAIL PASSPORT</p>
        <div className="mt-[0.6em] grid grid-cols-2 gap-x-[0.8em] gap-y-[0.6em] font-data">
          <Stat label="Flights" value={String(data.flights)} />
          <Stat label="Distance" value={data.km.toLocaleString("en-US")} unit="km" />
          <Stat label="Flight time" value={`${data.hours}h ${data.minutes}m`} />
          <div className="grid grid-cols-2">
            <Stat label="Airports" value={String(data.airports)} />
            <Stat label="Airlines" value={String(data.airlines)} />
          </div>
        </div>
        <p className="mt-[0.8em] truncate font-mono text-[0.48em] tracking-[0.04em] text-white/40">
          P&lt;CTR&lt;&lt;PASSPORT&lt;{year}&lt;&lt;&lt;{data.flights}FLT&lt;&lt;{data.km}KM&lt;&lt;&lt;&lt;&lt;&lt;
        </p>
      </div>
    </div>
  )
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <p className="text-[0.52em] font-semibold tracking-[0.08em] text-white/50 uppercase">{label}</p>
      <p className="text-[1.5em] leading-none font-medium tabular-nums">
        {value}
        {unit ? <span className="ml-[0.1em] text-[0.6em] text-white/70">{unit}</span> : null}
      </p>
    </div>
  )
}
