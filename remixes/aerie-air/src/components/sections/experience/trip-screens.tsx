import { useState } from "react"
import { ArrowRight, Car, Check, MapPin, Minus, Plus, Wallet } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { AircraftSide } from "@/components/mock/aircraft"
import { CountUp } from "@/components/motion/count-up"
import { StatusBar } from "@/components/mock/phone-frame"
import { addMinutes, quote, vertiport } from "@/content/network"
import { cn } from "@/lib/utils"
import { QrCode } from "./qr-code"

/**
 * The five screens of one trip, as the Aerie app shows them: each is a
 * small working UI (state, buttons, counters), never a picture of one.
 * They all quote the same trip, so the numbers agree from Tap to Arrive.
 */
const FROM = vertiport("midtown")
const TO = vertiport("airport")
const TRIP = quote(FROM, TO)
const DEPART = "08:45"
const LAND = addMinutes(DEPART, TRIP.flightMin)

function ScreenTitle({ eyebrow, title, light, sky }: { eyebrow: string; title: string; light?: boolean; sky?: boolean }) {
  return (
    <div className="px-5 pt-3">
      <p className={cn("text-[11px] font-medium", sky ? "text-on-sky-soft" : light ? "text-dusk-muted" : "text-ink-3")}>{eyebrow}</p>
      <p className="type-head mt-1 text-[24px] leading-[1.05] tracking-[-0.04em]">{title}</p>
    </div>
  )
}

function Endpoints({ light }: { light?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="type-head text-[26px] leading-none tracking-[-0.04em]">{FROM.code}</p>
        <p className={cn("mt-1 text-[10.5px]", light ? "text-dusk-muted" : "text-ink-3")}>{FROM.name}</p>
      </div>
      <ArrowRight className={cn("size-4", light ? "text-dusk-muted" : "text-ink-3")} />
      <div className="text-right">
        <p className="type-head text-[26px] leading-none tracking-[-0.04em]">{TO.code}</p>
        <p className={cn("mt-1 text-[10.5px]", light ? "text-dusk-muted" : "text-ink-3")}>{TO.name}</p>
      </div>
    </div>
  )
}

/** Step 1 — the booking summary, with a seat count and a button that books. */
export function TapScreen() {
  const [seats, setSeats] = useState(1)
  const [booked, setBooked] = useState(false)
  return (
    <div className="flex h-full flex-col bg-raised text-ink">
      <StatusBar />
      <ScreenTitle eyebrow="Tuesday, 08:31" title="Where to this morning?" />
      <div className="mx-4 mt-5 rounded-[18px] bg-page p-4 shadow-(--shadow-hairline)">
        <Endpoints />
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3 text-[10.5px] text-ink-3">
          <p>
            Lifts<span className="block text-[13px] font-medium text-ink tabular-nums">{DEPART}</span>
          </p>
          <p>
            In the air<span className="block text-[13px] font-medium text-ink tabular-nums">{TRIP.flightMin} min</span>
          </p>
          <p>
            By road<span className="block text-[13px] font-medium text-ink tabular-nums">{TRIP.roadMin} min</span>
          </p>
        </div>
      </div>
      <div className="mx-4 mt-3 flex items-center justify-between rounded-[18px] bg-page px-4 py-2.5 shadow-(--shadow-hairline)">
        <span className="text-[12px] text-ink-2">Seats</span>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="One seat fewer" disabled={seats <= 1 || booked} onClick={() => setSeats((s) => s - 1)} className="grid size-7 place-items-center rounded-full bg-panel transition-transform active:scale-[0.94] disabled:opacity-40">
            <Minus className="size-3" />
          </button>
          <span className="w-4 text-center text-[13px] font-medium tabular-nums">{seats}</span>
          <button type="button" aria-label="One seat more" disabled={seats >= 4 || booked} onClick={() => setSeats((s) => s + 1)} className="grid size-7 place-items-center rounded-full bg-panel transition-transform active:scale-[0.94] disabled:opacity-40">
            <Plus className="size-3" />
          </button>
        </div>
      </div>
      <div className="mx-4 mt-3 flex items-center gap-3 rounded-[18px] bg-page px-4 py-2.5 text-[11px] text-ink-2 shadow-(--shadow-hairline)">
        <Car className="size-4 text-sky" /> Car to the pad included, both ends
      </div>
      <div className="mt-auto px-4 pb-8">
        <div className="mb-3 flex items-baseline justify-between px-1">
          <span className="text-[11px] text-ink-3">Total</span>
          <span className="type-head text-[22px] tracking-[-0.03em] tabular-nums">${TRIP.fare * seats}</span>
        </div>
        <button
          type="button"
          onClick={() => setBooked((b) => !b)}
          className={cn(
            "flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14px] font-medium transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]",
            booked ? "bg-signal-green text-white" : "bg-sky text-on-sky",
          )}
        >
          {booked ? (
            <>
              <Check className="size-4" /> Booked, car on its way
            </>
          ) : (
            "Book ride and car"
          )}
        </button>
      </div>
    </div>
  )
}

/** The streets the car takes to the pad, in the map's own 0–278 units. */
const ROAD = "M24 300 L24 236 L92 236 L92 168 L176 168 L176 104 L236 104"

/** Step 2 — the car on its way, a dot riding the road to the vertiport. */
export function RideScreen({ loopSeconds = 9 }: { loopSeconds?: number }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const [called, setCalled] = useState(false)
  return (
    <div className="flex h-full flex-col bg-raised text-ink">
      <StatusBar />
      <ScreenTitle eyebrow="Your ride to the pad" title="Ines is 3 minutes away." />
      <div className="relative mx-4 mt-4 overflow-hidden rounded-[18px] bg-panel shadow-(--shadow-hairline)">
        <svg viewBox="0 0 248 320" className="block h-auto w-full" aria-label="Map: the car driving to Midtown Roof">
          <g stroke="var(--color-raised)" strokeWidth="10" fill="none">
            {[40, 104, 168, 236, 300].map((y) => (
              <line key={y} x1="0" y1={y} x2="248" y2={y} />
            ))}
            {[24, 92, 176, 236].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="320" />
            ))}
          </g>
          <rect x="112" y="186" width="48" height="36" rx="4" fill="var(--color-panel-deep)" />
          <rect x="36" y="56" width="44" height="34" rx="4" fill="var(--color-panel-deep)" />
          <rect x="190" y="120" width="34" height="34" rx="4" fill="var(--color-panel-deep)" />
          <path d={ROAD} fill="none" stroke="var(--color-sky)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="236" cy="104" r="11" fill="var(--color-ink)" />
          <text x="236" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--color-page)">H</text>
          <g
            style={{
              offsetPath: `path("${ROAD}")`,
              offsetRotate: "0deg",
              offsetDistance: still ? "62%" : undefined,
              animation: still ? "none" : `trip-car ${loopSeconds}s cubic-bezier(0.45,0,0.55,1) infinite`,
            }}
          >
            <circle r="11" fill="var(--color-sky)" opacity="0.18" />
            <circle r="6.5" fill="var(--color-sky)" stroke="var(--color-raised)" strokeWidth="2.5" />
          </g>
        </svg>
        <span className="absolute top-3 left-3 rounded-full bg-raised px-2.5 py-1 text-[10px] font-medium shadow-(--shadow-xs)">{FROM.name}, level 31</span>
      </div>
      <div className="mx-4 mt-3 flex items-center gap-3 rounded-[18px] bg-page p-3 shadow-(--shadow-hairline)">
        <div className="grid size-9 place-items-center rounded-full bg-sky-50 text-sky">
          <Car className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-medium">Grey electric saloon</p>
          <p className="font-mono text-[10.5px] text-ink-3">4KJ 218</p>
        </div>
        <button
          type="button"
          onClick={() => setCalled((c) => !c)}
          className="h-8 rounded-full bg-ink px-3 text-[11px] font-medium text-page transition-transform active:scale-[0.96]"
        >
          {called ? "Calling…" : "Call"}
        </button>
      </div>
      <p className="mt-auto px-5 pb-8 text-[10.5px] text-ink-3">The car waits five minutes at no charge. Your seat is held until {addMinutes(DEPART, -5)}.</p>
    </div>
  )
}

/** Step 3 — the boarding pass, with a code drawn from the booking reference. */
export function BoardScreen({ reference = "AER-7KQ2" }: { reference?: string }) {
  const [added, setAdded] = useState(false)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <div className="flex h-full flex-col bg-sky text-on-sky">
      <StatusBar tone="light" />
      <ScreenTitle eyebrow="Boarding pass" title="Pad B, doors at 08:38." sky />
      <div className="mx-4 mt-5 rounded-[20px] bg-raised p-4 text-ink shadow-(--shadow-float)">
        <Endpoints />
        <div className="my-4 border-t border-dashed border-line-strong" />
        <div className="grid grid-cols-3 gap-2 text-[10px] text-ink-3">
          <p>
            Seat<span className="block text-[14px] font-medium text-ink">1A</span>
          </p>
          <p>
            Lifts<span className="block text-[14px] font-medium text-ink tabular-nums">{DEPART}</span>
          </p>
          <p>
            Lands<span className="block text-[14px] font-medium text-ink tabular-nums">{LAND}</span>
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <QrCode value={reference} className="size-[92px] text-ink" />
          <div className="text-[10px] text-ink-3">
            Booking
            <span className="block font-mono text-[13px] font-medium text-ink">{reference}</span>
            <span className="mt-1 block">Hold to the reader at the lift.</span>
          </div>
        </div>
      </div>
      <div className="mx-4 mt-3 rounded-[18px] bg-sky-700/40 p-4 text-[11px]">
        <div className="flex justify-between">
          <span className="text-on-sky-soft">Doors open in</span>
          <span className="font-medium tabular-nums">3 min</span>
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full origin-left rounded-full bg-raised"
            initial={still ? false : { scaleX: 0.4 }}
            animate={{ scaleX: 0.7 }}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>
        <p className="mt-3 text-on-sky-soft">Level 31, lift B. Bags go on the scale by the reader.</p>
      </div>
      <div className="mt-auto px-4 pb-8">
        <button
          type="button"
          onClick={() => setAdded((a) => !a)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-raised text-[14px] font-medium text-ink transition-transform duration-(--duration-press) active:scale-[0.97]"
        >
          {added ? <Check className="size-4 text-signal-green" /> : <Wallet className="size-4" />}
          {added ? "In your wallet" : "Add to wallet"}
        </button>
      </div>
    </div>
  )
}

/** Step 4 — in the air: altitude and speed count up, the route fills in. */
export function LiftScreen() {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <div className="flex h-full flex-col bg-dusk text-dusk-fg">
      <StatusBar tone="light" time="08:48" />
      <ScreenTitle eyebrow="In the air" title={`Landing at ${LAND}.`} light />
      <div className="mx-4 mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-[16px] bg-dusk-2 p-3">
          <p className="text-[10px] text-dusk-muted">Altitude</p>
          <p className="type-head mt-1 text-[26px] leading-none tracking-[-0.04em] tabular-nums">
            <CountUp value={450} duration={2.2} />
            <span className="ml-0.5 text-[12px] text-dusk-muted">m</span>
          </p>
        </div>
        <div className="rounded-[16px] bg-dusk-2 p-3">
          <p className="text-[10px] text-dusk-muted">Ground speed</p>
          <p className="type-head mt-1 text-[26px] leading-none tracking-[-0.04em] tabular-nums">
            <CountUp value={290} duration={1.8} />
            <span className="ml-0.5 text-[12px] text-dusk-muted">km/h</span>
          </p>
        </div>
      </div>
      <div className="mx-4 mt-2 rounded-[16px] bg-dusk-2 p-4">
        <div className="flex justify-between text-[10.5px] text-dusk-muted">
          <span>{FROM.code}</span>
          <span className="tabular-nums">{TRIP.km.toFixed(1)} km</span>
          <span>{TO.code}</span>
        </div>
        <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-white/12">
          <motion.div
            className="absolute inset-0 origin-left rounded-full bg-sky"
            initial={still ? false : { scaleX: 0.1 }}
            animate={{ scaleX: 0.46 }}
            transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>
        <p className="mt-3 text-[11px]">
          <span className="tabular-nums">{Math.ceil(TRIP.flightMin / 2)}</span> min to go. Cabin temperature 21°.
        </p>
      </div>
      <div className="mx-4 mt-2 rounded-[16px] bg-dusk-2 p-4 text-[11px] text-dusk-muted">
        <p className="text-dusk-fg">From the pilot</p>
        <p className="mt-1 leading-snug">Smooth air over the river. The tall one on your left is the old grain tower.</p>
      </div>
      <div className="mt-auto px-6">
        <AircraftSide mode="cruise" tone="light" className="w-full opacity-90" />
      </div>
      <p className="mt-3 px-5 pb-8 text-[10.5px] text-dusk-muted">
        You are saving <span className="text-dusk-fg tabular-nums">{TRIP.savedMin} minutes</span> this morning.
      </p>
    </div>
  )
}

/** Step 5 — on the ground, the car already waiting at the bay. */
export function ArriveScreen() {
  const [walking, setWalking] = useState(false)
  return (
    <div className="flex h-full flex-col bg-raised text-ink">
      <StatusBar time={LAND} />
      <ScreenTitle eyebrow={`${TO.name}, ${TO.area}`} title="Welcome down. Your car is here." />
      <div className="mx-4 mt-5 rounded-[18px] bg-page p-4 shadow-(--shadow-hairline)">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full bg-signal-green-soft text-signal-green">
            <MapPin className="size-4" />
          </div>
          <div>
            <p className="text-[13px] font-medium">Bay 3, a 40 m walk</p>
            <p className="text-[10.5px] text-ink-3">Lift down to level 6, then left</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-3 text-[10.5px] text-ink-3">
          <p>
            Driver<span className="block text-[13px] font-medium text-ink">Marcus</span>
          </p>
          <p>
            Plate<span className="block font-mono text-[13px] font-medium text-ink">7PL 042</span>
          </p>
        </div>
      </div>
      <div className="mx-4 mt-3 rounded-[18px] bg-page p-4 shadow-(--shadow-hairline)">
        <p className="text-[10.5px] text-ink-3">Door to door</p>
        <p className="type-head mt-1 text-[22px] tracking-[-0.03em]">
          <span className="tabular-nums">{TRIP.flightMin + 14}</span> min, not <span className="tabular-nums">{TRIP.roadMin}</span>
        </p>
      </div>
      <div className="mt-auto px-4 pb-8">
        <button
          type="button"
          onClick={() => setWalking((w) => !w)}
          className={cn(
            "flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14px] font-medium transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]",
            walking ? "bg-signal-green text-white" : "bg-ink text-page",
          )}
        >
          {walking ? <Check className="size-4" /> : null}
          {walking ? "Marcus knows you're coming" : "I'm on my way"}
        </button>
      </div>
    </div>
  )
}

export const TRIP_FACTS = { from: FROM, to: TO, trip: TRIP, depart: DEPART, land: LAND }
