import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, Check, Minus, Plus, RotateCcw } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { useCanvasAction } from "@canvas/react"

import { CornerLabels } from "@/components/blocks/corner-label"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { addMinutes, quote, SLOTS, vertiport, VERTIPORTS } from "@/content/network"
import { cn } from "@/lib/utils"
import { AnimatedNumber } from "./animated-number"
import { QrCode } from "./qr-code"
import { RouteMini } from "./route-mini"

type Status = "form" | "loading" | "done"
type Errors = { to?: string; slot?: string }

const EASE = [0.23, 1, 0.32, 1] as const

/** The next seven days, as chips: "Today", "Tomorrow", then "Thu 15". */
function nextDays(count = 7) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-GB", { weekday: "short" })
    return { key: d.toISOString().slice(0, 10), label, day: d.getDate(), month: d.toLocaleDateString("en-GB", { month: "short" }), date: d }
  })
}

function minutesOf(time: string) {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

function makeReference() {
  const alphabet = "ACDEFGHJKLMNPQRTUVWXY3479"
  const bytes = new Uint8Array(4)
  crypto.getRandomValues(bytes)
  return `AER-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`
}

/** A row of chips that behaves as one radio group: arrows move, Space picks. */
function ChipGroup({
  label,
  value,
  onChange,
  invalid,
  describedBy,
  className,
  children,
}: {
  label: string
  value: string | null
  onChange: (v: string) => void
  invalid?: boolean
  describedBy?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <RadioGroupPrimitive.Root
      value={value ?? ""}
      onValueChange={onChange}
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={cn("grid gap-2", className)}
    >
      {children}
    </RadioGroupPrimitive.Root>
  )
}

function Chip({ value, disabled, className, children }: { value: string; disabled?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <RadioGroupPrimitive.Item
      value={value}
      disabled={disabled}
      className={cn(
        "min-h-11 rounded-(--radius-field) px-3 py-2 text-left text-[13px] outline-none",
        "transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]",
        "focus-visible:ring-[3px] focus-visible:ring-sky/35",
        "data-[state=unchecked]:bg-page data-[state=unchecked]:shadow-(--shadow-field) data-[state=unchecked]:hover:bg-panel",
        "data-[state=checked]:bg-ink data-[state=checked]:text-page",
        "disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-page",
        className,
      )}
    >
      {children}
    </RadioGroupPrimitive.Item>
  )
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <span className="text-micro font-medium text-ink">{children}</span>
      {hint && <span className="text-micro text-ink-3">{hint}</span>}
    </div>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="mt-2 text-micro text-signal-red"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

/** Flight against the road, as two bars that re-measure when the trip changes. */
export function TimeBars({ flightMin, roadMin }: { flightMin: number; roadMin: number }) {
  const rows = [
    { label: "Aerie", minutes: flightMin, tone: "bg-sky" },
    { label: "By road, 08:30", minutes: roadMin, tone: "bg-ink-4" },
  ]
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="mb-1.5 flex justify-between text-micro">
            <span className="text-ink-3">{r.label}</span>
            <AnimatedNumber value={r.minutes} suffix=" min" className="font-medium" />
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-panel-deep">
            <motion.div
              className={cn("h-full origin-left rounded-full", r.tone)}
              initial={false}
              animate={{ scaleX: Math.max(0.03, r.minutes / Math.max(flightMin, roadMin)) }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * The booking widget, working: two rooftops (never the same one), a day, a
 * departure and a seat count. The quote comes from the same `quote()` every
 * other mockup on the site uses; reserving holds the seats, then hands back
 * a boarding pass with its reference.
 */
export function BookingWidget({
  title = "Book a seat.",
  holdMs = 1400,
  initialFrom = "midtown",
  initialTo = "airport",
}: {
  title?: string
  /** How long "Reserve seats" takes, in ms. */
  holdMs?: number
  initialFrom?: string
  initialTo?: string
}) {
  const days = useMemo(() => nextDays(7), [])
  const [fromId, setFromId] = useState(initialFrom)
  const [toId, setToId] = useState<string | null>(initialTo)
  const [dayKey, setDayKey] = useState(days[1].key)
  const [slot, setSlot] = useState<string | null>(null)
  const [seats, setSeats] = useState(1)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("form")
  const [reference, setReference] = useState("AER-7KQ2")
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const from = vertiport(fromId)
  const to = toId ? vertiport(toId) : null
  const trip = to ? quote(from, to) : null
  const day = days.find((d) => d.key === dayKey) ?? days[0]
  const isToday = day.key === days[0].key
  const now = new Date()
  const cutoff = now.getHours() * 60 + now.getMinutes() + 20
  const slotGone = (s: string) => isToday && minutesOf(s) < cutoff
  const openSlots = SLOTS.filter((s) => !slotGone(s))

  // A slot that has gone by (switching to today) is no longer a choice.
  useEffect(() => {
    if (slot && slotGone(slot)) setSlot(null)
  })

  const chooseFrom = (id: string) => {
    setFromId(id)
    if (id === toId) {
      setToId(null)
      setErrors((e) => ({ ...e, to: `You're leaving from ${vertiport(id).name} — pick somewhere else to land.` }))
    }
  }

  const validate = (): Errors => {
    const next: Errors = {}
    if (!toId) next.to = "Choose where you're landing."
    else if (toId === fromId) next.to = "Pick a landing pad that isn't the one you're leaving from."
    if (!slot) next.slot = openSlots.length ? "Choose a departure time." : "No more departures today. Try tomorrow."
    return next
  }

  const reserve = () => {
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    setStatus("loading")
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setReference(makeReference())
      setStatus("done")
    }, holdMs)
  }

  const changeTrip = () => {
    window.clearTimeout(timer.current)
    setStatus("form")
    setErrors({})
  }

  /** Fill whatever the form is missing, so a forced state has a real trip. */
  const fillTrip = () => {
    if (!toId || toId === fromId) setToId(VERTIPORTS.find((v) => v.id !== fromId)!.id)
    if (!slot) setSlot(openSlots[2] ?? SLOTS[SLOTS.length - 1])
  }

  useCanvasAction(
    "Booking loading",
    (on) => {
      window.clearTimeout(timer.current)
      if (on ?? status !== "loading") {
        fillTrip()
        setStatus("loading")
      } else setStatus("form")
    },
    { on: status === "loading", group: "Booking" },
  )
  useCanvasAction(
    "Booking confirmed",
    (on) => {
      window.clearTimeout(timer.current)
      if (on ?? status !== "done") {
        fillTrip()
        setStatus("done")
      } else setStatus("form")
    },
    { on: status === "done", group: "Booking" },
  )
  useCanvasAction(
    "Booking errors",
    (on) => {
      setStatus("form")
      if (on ?? !errors.to) {
        setToId(null)
        setSlot(null)
        setErrors({ to: "Choose where you're landing.", slot: "Choose a departure time." })
      } else {
        setErrors({})
        fillTrip()
      }
    },
    { on: Boolean(errors.to || errors.slot), group: "Booking" },
  )

  const total = (trip?.fare ?? 0) * seats
  const lands = slot && trip ? addMinutes(slot, trip.flightMin) : null

  return (
    <section id="book" data-header-tone="dark" className="relative scroll-mt-16 py-(--spacing-section)">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-4">
          <p className="text-micro text-ink-3">Book</p>
          <h2 className="type-head mt-4 text-display">{title}</h2>
          <p className="mt-6 max-w-[34ch] text-lead text-ink-2">
            Bookings open for spring 2027. Reserve now and the seat is held at launch fares; nothing is charged until the week you fly.
          </p>
          <ul className="mt-8 flex flex-col gap-2 text-micro text-ink-3">
            <li>Cars to and from the pad are in the fare.</li>
            <li>Change or cancel free until two hours before.</li>
            <li>Children under two fly on a lap, free.</li>
          </ul>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-(--radius-stage) bg-raised shadow-(--shadow-float)">
            <AnimatePresence mode="wait" initial={false}>
              {status === "done" && trip && to && slot ? (
                <motion.div
                  key="pass"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.36, ease: EASE }}
                  className="p-6 sm:p-10"
                >
                  <BoardingPass
                    reference={reference}
                    fromCode={from.code}
                    fromName={from.name}
                    toCode={to.code}
                    toName={to.name}
                    date={`${day.label === "Today" || day.label === "Tomorrow" ? day.label + ", " : day.label + " "}${day.day} ${day.month}`}
                    departs={slot}
                    lands={lands ?? slot}
                    seats={seats}
                    total={total}
                  />
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button variant="outline" onClick={changeTrip}>
                      <RotateCcw /> Change trip
                    </Button>
                    <p className="text-micro text-ink-3">A copy is on its way to your inbox.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault()
                    reserve()
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="grid lg:grid-cols-[1fr_minmax(260px,0.72fr)]"
                  aria-busy={status === "loading"}
                >
                  <fieldset disabled={status === "loading"} className="flex min-w-0 flex-col gap-8 p-6 sm:p-10">
                    <div>
                      <FieldLabel hint={from.area}>From</FieldLabel>
                      <ChipGroup label="Leaving from" value={fromId} onChange={chooseFrom} className="grid-cols-2 sm:grid-cols-3">
                        {VERTIPORTS.map((v) => (
                          <Chip key={v.id} value={v.id}>
                            <span className="block font-mono text-[11px] opacity-70">{v.code}</span>
                            <span className="block truncate">{v.name}</span>
                          </Chip>
                        ))}
                      </ChipGroup>
                    </div>

                    <div>
                      <FieldLabel hint={to?.area}>To</FieldLabel>
                      <ChipGroup
                        label="Landing at"
                        value={toId}
                        onChange={(id) => {
                          setToId(id)
                          setErrors((e) => ({ ...e, to: undefined }))
                        }}
                        invalid={Boolean(errors.to)}
                        describedBy="book-to-error"
                        className="grid-cols-2 sm:grid-cols-3"
                      >
                        {VERTIPORTS.map((v) => (
                          <Chip key={v.id} value={v.id} disabled={v.id === fromId}>
                            <span className="block font-mono text-[11px] opacity-70">{v.code}</span>
                            <span className="block truncate">{v.id === fromId ? "You're here" : v.name}</span>
                          </Chip>
                        ))}
                      </ChipGroup>
                      <FieldError id="book-to-error" message={errors.to} />
                    </div>

                    <div>
                      <FieldLabel>Day</FieldLabel>
                      <ChipGroup label="Day" value={dayKey} onChange={setDayKey} className="grid-cols-4 sm:grid-cols-7">
                        {days.map((d) => (
                          <Chip key={d.key} value={d.key} className="px-2 text-center">
                            <span className="block text-[11px] opacity-70">{d.label === "Tomorrow" ? "Tmrw" : d.label}</span>
                            <span className="block font-medium tabular-nums">{d.day}</span>
                          </Chip>
                        ))}
                      </ChipGroup>
                    </div>

                    <div>
                      <FieldLabel hint={lands ? `Lands ${lands}` : `${openSlots.length} of ${SLOTS.length} open`}>Departure</FieldLabel>
                      <ChipGroup
                        label="Departure time"
                        value={slot}
                        onChange={(s) => {
                          setSlot(s)
                          setErrors((e) => ({ ...e, slot: undefined }))
                        }}
                        invalid={Boolean(errors.slot)}
                        describedBy="book-slot-error"
                        className="grid-cols-4 sm:grid-cols-8"
                      >
                        {SLOTS.map((s) => (
                          <Chip key={s} value={s} disabled={slotGone(s)} className="px-0 text-center tabular-nums">
                            {s}
                          </Chip>
                        ))}
                      </ChipGroup>
                      <FieldError id="book-slot-error" message={errors.slot} />
                    </div>

                    <div>
                      <FieldLabel hint="Four seats a flight">Passengers</FieldLabel>
                      <div className="flex w-fit items-center gap-1 rounded-full bg-page p-1 shadow-(--shadow-field)">
                        <Button type="button" variant="ghost" size="icon" aria-label="One passenger fewer" disabled={seats <= 1} onClick={() => setSeats((s) => s - 1)} className="rounded-full">
                          <Minus />
                        </Button>
                        <span aria-live="polite" className="w-20 text-center text-body tabular-nums">
                          {seats} {seats === 1 ? "seat" : "seats"}
                        </span>
                        <Button type="button" variant="ghost" size="icon" aria-label="One passenger more" disabled={seats >= 4} onClick={() => setSeats((s) => s + 1)} className="rounded-full">
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  </fieldset>

                  <aside className="flex flex-col gap-6 border-t border-line bg-panel p-6 sm:p-10 lg:border-t-0 lg:border-l">
                    <div>
                      <p className="text-micro text-ink-3">Your trip</p>
                      <p className="type-head mt-2 flex items-center gap-2 text-h4">
                        {from.code} <ArrowRight className="size-4 text-ink-3" /> {to?.code ?? "—"}
                      </p>
                      <p className="mt-1 text-micro text-ink-3">
                        {trip ? `${trip.km.toFixed(1)} km, rooftop to rooftop` : "Choose where you're landing"}
                      </p>
                    </div>

                    <RouteMini fromId={fromId} toId={toId} className="-mx-1 w-[calc(100%+0.5rem)] rounded-(--radius-field) bg-page/60" />

                    {trip ? (
                      <TimeBars flightMin={trip.flightMin} roadMin={trip.roadMin} />
                    ) : (
                      <p className="rounded-(--radius-field) border border-dashed border-line-strong p-4 text-micro text-ink-3">The comparison appears when you choose a destination.</p>
                    )}

                    <div className="border-t border-line-strong pt-5">
                      <div className="flex justify-between text-micro text-ink-3">
                        <span>
                          {trip ? `$${trip.fare}` : "—"} × {seats} {seats === 1 ? "seat" : "seats"}
                        </span>
                        {trip && <span>Saves {trip.savedMin} min</span>}
                      </div>
                      <p className="type-head mt-2 text-h2">
                        <AnimatedNumber value={total} prefix="$" />
                      </p>
                    </div>

                    <Button type="submit" variant="sky" size="lg" className="mt-auto w-full" disabled={status === "loading"}>
                      {status === "loading" ? (
                        <>
                          <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-on-sky/35 border-t-on-sky" />
                          Holding your seats…
                        </>
                      ) : (
                        <>Reserve seats</>
                      )}
                    </Button>
                  </aside>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          <CornerLabels left="Fares include both cars" right="Prices in USD, before tax" className="mt-4 text-ink-3" />
        </div>
      </Container>
    </section>
  )
}

/** The confirmation: a boarding pass for the trip just reserved. */
export function BoardingPass({
  reference = "AER-7KQ2",
  fromCode = "MDT",
  fromName = "Midtown Roof",
  toCode = "INT",
  toName = "International",
  date = "Tomorrow",
  departs = "08:45",
  lands = "08:52",
  seats = 1,
  total = 130,
}: {
  reference?: string
  fromCode?: string
  fromName?: string
  toCode?: string
  toName?: string
  date?: string
  departs?: string
  lands?: string
  seats?: number
  total?: number
}) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(reference)
    } catch {
      /* clipboard can be blocked; the state still confirms the tap */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <p className="flex items-center gap-2 text-micro text-signal-green">
          <span className="grid size-5 place-items-center rounded-full bg-signal-green-soft">
            <Check className="size-3" />
          </span>
          Seats reserved
        </p>
        <div className="mt-6 flex items-end gap-4 sm:gap-8">
          <div>
            <p className="type-head text-mega leading-none">{fromCode}</p>
            <p className="mt-2 text-micro text-ink-3">{fromName}</p>
          </div>
          <ArrowRight className="mb-8 size-6 shrink-0 text-ink-3" />
          <div>
            <p className="type-head text-mega leading-none">{toCode}</p>
            <p className="mt-2 text-micro text-ink-3">{toName}</p>
          </div>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-dashed border-line-strong pt-6 text-micro sm:grid-cols-4">
          {[
            ["Date", date],
            ["Departs", departs],
            ["Lands", lands],
            ["Seats", String(seats)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-ink-3">{k}</dt>
              <dd className="mt-1 text-body font-medium tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-row items-center gap-5 md:flex-col md:items-start">
        <QrCode value={reference} className="size-32 rounded-(--radius-card) text-ink shadow-(--shadow-hairline) sm:size-40" />
        <div>
          <p className="text-micro text-ink-3">Reference</p>
          <button
            type="button"
            onClick={copy}
            className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-(--radius-field) font-mono text-[18px] font-medium outline-none transition-transform active:scale-[0.97] focus-visible:ring-[3px] focus-visible:ring-sky/35"
            aria-label={`Copy booking reference ${reference}`}
          >
            {reference}
            <span className="text-micro font-sans text-ink-3">{copied ? "Copied" : "Copy"}</span>
          </button>
          <p className="mt-1 text-micro text-ink-3">Total ${total.toLocaleString("en-US")}, charged the week you fly</p>
        </div>
      </div>
    </div>
  )
}
