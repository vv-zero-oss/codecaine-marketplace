import { useState, type FormEvent } from "react"
import { CalendarDays, Mail, Plane, Plus, Share2, Smartphone, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { TailMark } from "@/components/mock/app-ui"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { AIRLINES, AIRPORTS, parseFlight, type Flight } from "@/lib/flights"
import { cn } from "@/lib/utils"

const EXAMPLES = [
  "NW 214",
  "Your trip is confirmed! Flight SK 902 LHR → HND on 3 July",
  "md1406 LIS-OSL",
]

/** The three ways in — mail, calendar, a share — under an arc of planes. */
function Sources() {
  return (
    <div className="relative mx-auto h-[190px] w-[300px]" aria-hidden>
      <svg viewBox="0 0 300 190" className="absolute inset-0">
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${30 + i * 18} 150 A ${120 - i * 18} ${110 - i * 18} 0 0 1 ${270 - i * 18} 150`} fill="none" stroke="var(--color-night-dim)" strokeWidth={1.6} strokeDasharray="1 7" strokeLinecap="round" />
        ))}
      </svg>
      {/* planes travelling the arcs */}
      <div className="absolute inset-x-0 top-0 h-[150px] overflow-hidden">
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute top-full left-1/2 size-0 animate-orbit" style={{ ["--orbit-duration" as string]: `${16 + i * 5}s`, animationDelay: `${-i * 4}s` }}>
          <Plane className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rotate-45 text-violet-glow" style={{ left: 0, top: -(115 - i * 18) }} />
        </div>
      ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2">
        <span className="grid size-[72px] place-items-center rounded-[20px] bg-night-3 text-night-2fg shadow-(--shadow-night)"><Mail className="size-8" strokeWidth={1.4} /></span>
        <span className="grid size-[96px] place-items-center rounded-[24px] bg-night-3 shadow-(--shadow-night)">
          <span className="text-center leading-none">
            <span className="block text-[16px] font-bold text-violet-glow">SAT</span>
            <span className="block text-[44px] font-light text-night-2fg">20</span>
          </span>
        </span>
        <span className="grid size-[72px] place-items-center rounded-[20px] bg-night-3 text-night-2fg shadow-(--shadow-night)"><Share2 className="size-8" strokeWidth={1.4} /></span>
      </div>
      <div className="absolute inset-x-0 -bottom-6 mx-auto h-10 w-48 bg-violet/40 blur-2xl" />
    </div>
  )
}

function ImportedRow({ flight, onRemove }: { flight: Flight; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-(--radius-field) bg-night-3 px-4 py-3 shadow-[0_0_0_1px_var(--color-night-line)]">
      <TailMark airline={flight.airline} className="size-7" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-night-fg">
          {AIRPORTS[flight.from].city} → {AIRPORTS[flight.to].city}
        </p>
        <p className="truncate text-[13px] text-night-muted">
          {AIRLINES[flight.airline].name} {flight.number} · {flight.date} · {flight.dep} → {flight.arr} · Gate {flight.gate}
        </p>
      </div>
      <span className={cn("text-[13px] font-semibold", flight.status === "Delayed" ? "text-red-bright" : "text-green-bright")}>
        {flight.status === "Delayed" ? `+${flight.delay}m` : "On time"}
      </span>
      <button type="button" onClick={onRemove} aria-label="Remove flight" className="grid size-8 place-items-center rounded-full text-night-muted transition-colors hover:bg-night-2 hover:text-night-fg">
        <X className="size-4" />
      </button>
    </div>
  )
}

/**
 * Import flights: paste a flight number or a whole confirmation email and the
 * flight appears in the list, parsed — carrier, route, date, gate. Unknown
 * carriers are refused with a reason, not guessed.
 */
export function ImportFlights() {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [flights, setFlights] = useState<Flight[]>([])
  const reduced = useReducedMotion()
  useCanvasAction("Import — error", (next) => setError((next ?? !error) ? "We don't know carrier “ZZ” yet. Try NW, CR, MD, SK or AL." : ""), { on: Boolean(error), group: "Import" })
  useCanvasAction("Import — one flight added", (next) => setFlights((next ?? !flights.length) ? [(parseFlight("NW 214") as { flight: Flight }).flight] : []), { on: flights.length > 0, group: "Import" })

  const add = (text: string) => {
    const result = parseFlight(text)
    if ("error" in result) {
      setError(result.error)
      return
    }
    setError("")
    setValue("")
    setFlights((list) => [result.flight, ...list.filter((f) => f.airline + f.number !== result.flight.airline + result.flight.number)].slice(0, 4))
  }
  const submit = (event: FormEvent) => {
    event.preventDefault()
    add(value)
  }

  return (
    <section data-theme="night" className="relative overflow-hidden bg-night pb-section">
      <Container className="text-center">
        <Reveal>
          <Sources />
          <h2 className="type-display mt-12 text-h1 text-balance text-night-fg">Your flights, in before you finish this sentence.</h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-night-2fg">
            Forward the confirmation, share it from your calendar, or paste anything with a flight number in it. Try it — this one works.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mx-auto mt-10 max-w-[620px] text-left">
          <form onSubmit={submit} noValidate>
            <label htmlFor="import-flight" className="sr-only">Flight number or confirmation text</label>
            <div className="flex items-center gap-2 rounded-full bg-night-2 p-1.5 pl-5 shadow-[0_0_0_1px_var(--color-night-line)] transition-shadow duration-(--duration-hover) focus-within:shadow-[0_0_0_2px_var(--color-violet-bright),0_0_40px_-8px_var(--color-violet)]">
              <Plane className="size-5 shrink-0 text-night-muted" />
              <input
                id="import-flight"
                value={value}
                onChange={(e) => (setValue(e.target.value), setError(""))}
                placeholder="Paste a flight number or a booking email"
                className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-night-fg outline-none placeholder:text-night-muted"
              />
              <button type="submit" className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-white px-5 text-[15px] font-semibold text-ink transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-white/90 active:scale-[0.97]">
                <Plus className="size-4" strokeWidth={2.6} /> Add
              </button>
            </div>
            <p className="mt-2 min-h-5 pl-5 text-[13.5px] text-red-bright" role="alert">{error}</p>
          </form>
          <div className="mt-1 flex flex-wrap gap-2 pl-1">
            <span className="text-[13px] text-night-muted">Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => add(ex)}
                className="max-w-full truncate rounded-full bg-night-2 px-3 py-1 text-[13px] text-night-2fg shadow-[0_0_0_1px_var(--color-night-line)] transition-[color,background-color,transform] duration-(--duration-hover) hover:bg-night-3 hover:text-night-fg active:scale-[0.97]"
              >
                {ex.length > 34 ? `${ex.slice(0, 34)}…` : ex}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {flights.map((f) => (
                <motion.div
                  key={f.airline + f.number}
                  layout={!reduced}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px) scale(0.98)" }}
                  animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                  exit={{ opacity: 0, transform: "scale(0.98)" }}
                  transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                >
                  <ImportedRow flight={f} onRemove={() => setFlights((list) => list.filter((x) => x !== f))} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p className="mt-8 flex items-center justify-center gap-4 text-[14px] text-night-muted">
            <span className="inline-flex items-center gap-1.5"><Mail className="size-4" /> trips@contrail.app</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" /> Calendar sync</span>
            <span className="inline-flex items-center gap-1.5"><Smartphone className="size-4" /> Share sheet</span>
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
