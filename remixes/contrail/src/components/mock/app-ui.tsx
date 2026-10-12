import { ArrowDownRight, ArrowUpRight, Briefcase, ChevronDown, Search, Share, User } from "lucide-react"

import { AIRLINES, AIRPORTS, type Flight } from "@/lib/flights"
import { cn } from "@/lib/utils"

/**
 * The pieces of the app every phone on the site is built from. Sized in `em`,
 * so they scale with the phone they sit in (see `Phone`).
 */

/** An invented carrier's tail fin, in its two colours. */
export function TailMark({ airline = "NW", className }: { airline?: string; className?: string }) {
  const [a, b] = (AIRLINES[airline] ?? AIRLINES.NW).tail
  return (
    <svg viewBox="0 0 20 20" className={cn("size-[1.2em] shrink-0", className)} aria-label={AIRLINES[airline]?.name}>
      <path d="M3 19 9 2h4l-3 17Z" fill={a} />
      <path d="M10 19 13 2h2.4L14 19Z" fill={b} />
    </svg>
  )
}

/** Amber gate chip: an arrow out (departure) or in (arrival) and the gate. */
export function GateChip({ gate = "B27", arrival = false, className }: { gate?: string; arrival?: boolean; className?: string }) {
  const Arrow = arrival ? ArrowDownRight : ArrowUpRight
  return (
    <span className={cn("inline-flex items-center gap-[0.15em] rounded-[0.4em] bg-amber px-[0.4em] py-[0.12em] font-bold text-amber-ink tabular-nums", className)}>
      <Arrow className="size-[1em]" strokeWidth={3} />
      {gate}
    </span>
  )
}

export function statusTone(flight: Flight) {
  if (flight.status === "Delayed") return "text-red"
  return "text-green"
}

/** One row of "My flights": time to departure, route, both times. */
export function FlightRow({ flight, countdown = "1h", unit = "54 min", className }: { flight: Flight; countdown?: string; unit?: string; className?: string }) {
  const from = AIRPORTS[flight.from]
  const to = AIRPORTS[flight.to]
  return (
    <div className={cn("flex items-center gap-[0.8em] border-t border-line px-[1.1em] py-[0.8em]", className)}>
      <div className="w-[3em] shrink-0 text-center leading-none">
        <p className="text-[1.6em] font-semibold tracking-[-0.03em]">{countdown}</p>
        <p className="mt-[0.3em] text-[0.55em] font-semibold tracking-[0.06em] text-ink-3 uppercase">{unit}</p>
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-[0.35em] text-[0.7em] text-ink-3">
          <TailMark airline={flight.airline} className="size-[1.1em]" /> {flight.airline} {flight.number}
          <span className="ml-auto">
            Departs <span className={cn("font-semibold", statusTone(flight))}>{flight.status === "Delayed" ? `${flight.delay}m late` : flight.status}</span>
          </span>
        </p>
        <p className="mt-[0.15em] truncate text-[0.9em] font-semibold">
          {from.city} <span className="font-normal text-ink-3">to</span> {to.city}
        </p>
        <p className="mt-[0.2em] flex gap-[0.8em] text-[0.7em] font-semibold tabular-nums">
          <span className={statusTone(flight)}>● {flight.from} {flight.dep}</span>
          <span className={statusTone(flight)}>● {flight.to} {flight.arr}</span>
        </p>
      </div>
    </div>
  )
}

/** The bottom sheet over the map: "My flights", search, and the list. */
export function MyFlightsSheet({ flights, className }: { flights: Flight[]; className?: string }) {
  return (
    <div className={cn("rounded-t-[1.4em] bg-page shadow-[0_-8px_30px_-12px_rgb(11_11_16/0.25)]", className)}>
      <div className="flex items-center justify-between px-[1.1em] pt-[0.9em]">
        <p className="flex items-center gap-[0.2em] text-[1.25em] font-bold tracking-[-0.03em]">
          My Flights <ChevronDown className="size-[0.8em]" strokeWidth={2.6} />
        </p>
        <span className="flex items-center gap-[0.6em] text-ink-2">
          <Share className="size-[1em]" />
          <span className="grid size-[1.6em] place-items-center rounded-full bg-violet-soft text-violet">
            <User className="size-[0.9em]" />
          </span>
        </span>
      </div>
      <div className="mx-[1.1em] my-[0.7em] flex items-center gap-[0.4em] rounded-[0.7em] bg-panel px-[0.7em] py-[0.5em] text-[0.75em] text-ink-3">
        <Search className="size-[1.1em]" /> Search to add flights
      </div>
      {flights.map((f, i) => (
        <FlightRow key={`${f.airline}${f.number}`} flight={f} countdown={["1h", "2d", "5d"][i] ?? "1w"} unit={["54 min", "days", "days"][i] ?? "away"} />
      ))}
    </div>
  )
}

/** One airport block of the flight sheet: big time, status, gate. */
export function TimeBlock({
  code,
  time,
  was,
  note,
  gate,
  arrival,
  late,
}: {
  code: string
  time: string
  was?: string
  note: string
  gate: string
  arrival?: boolean
  late?: boolean
}) {
  const airport = AIRPORTS[code]
  return (
    <div className="flex items-end justify-between gap-[0.5em]">
      <div>
        <p className="flex items-center gap-[0.35em] text-[0.72em] font-semibold">
          <span className="grid size-[1.1em] place-items-center rounded-full bg-ink text-[0.7em] text-page">{arrival ? "↘" : "↗"}</span>
          {code} · {airport?.name}
        </p>
        <p className={cn("mt-[0.15em] text-[2em] leading-none font-semibold tracking-[-0.03em] tabular-nums", late ? "text-red" : "text-green")}>
          {time}
          {was ? <span className="ml-[0.3em] text-[0.32em] font-medium tracking-normal text-ink-4 line-through">{was}</span> : null}
        </p>
        <p className={cn("mt-[0.25em] text-[0.62em] font-semibold", late ? "text-red" : "text-green")}>{note}</p>
      </div>
      <div className="text-right">
        <GateChip gate={gate} arrival={arrival} className="text-[0.85em]" />
        <p className="mt-[0.3em] text-[0.58em] text-ink-3">Terminal {arrival ? 8 : 1}</p>
      </div>
    </div>
  )
}

/** Belt number chip: a suitcase and a belt. */
export function BeltChip({ belt = 6, className }: { belt?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-[0.25em] rounded-[0.4em] bg-amber px-[0.4em] py-[0.12em] font-bold text-amber-ink", className)}>
      <Briefcase className="size-[0.95em]" strokeWidth={2.6} /> {belt}
    </span>
  )
}
