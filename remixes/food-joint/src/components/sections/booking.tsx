import { useMemo, useState } from "react"
import { Clock, MapPin, Minus, Phone, Plus } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { ClipShape } from "@/components/blocks/clip-shape"
import { CtaEllipse } from "@/components/blocks/cta-ellipse"
import { Eyebrow } from "@/components/blocks/eyebrow"
import { Photo } from "@/components/blocks/photo"
import { RiseText } from "@/components/blocks/rise-text"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { booking, brand, visit } from "@/content"
import { DURATION, EASE_OUT, SPRING_POP } from "@/lib/motion"
import { cn } from "@/lib/utils"

const MIN_PARTY = 1
const MAX_PARTY = 8

/** The next seven evenings, labelled the way a person says them. */
function nextDays() {
  const days: { value: string; label: string }[] = []
  const now = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)
    const label = i === 0 ? "Tonight" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en", { weekday: "short", day: "numeric" })
    days.push({ value: d.toISOString().slice(0, 10), label })
  }
  return days
}

/** A choice chip: an outlined pill that fills forest when picked. */
export function Chip({ active, ...props }: { active: boolean } & React.ComponentProps<"button">) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-pressed={active}
      className={cn("h-11 px-4 sm:h-10", active && "bg-forest text-lime")}
      {...props}
    />
  )
}

/**
 * The party-size counter. The number rolls the way the count went — up out
 * of the top when it grows, down when it shrinks — so the change is legible
 * at a glance. A transition keyed on the number: quick taps retarget.
 */
export function PartySize({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [direction, setDirection] = useState(1)
  const reduced = useReducedMotion()
  const step = (d: number) => {
    setDirection(d)
    onChange(Math.min(MAX_PARTY, Math.max(MIN_PARTY, value + d)))
  }
  const offset = reduced ? 0 : 60
  return (
    <div className="flex items-center gap-3">
      <Button type="button" size="icon" aria-label="One fewer" onClick={() => step(-1)} disabled={value <= MIN_PARTY}>
        <Minus className="size-5" />
      </Button>
      <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden" aria-live="polite">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.span
            key={value}
            className="font-heavy text-[56px] leading-none tabular-nums"
            initial={{ opacity: 0, transform: `translateY(${direction * offset}%)` }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            exit={{ opacity: 0, transform: `translateY(${-direction * offset}%)` }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <Button type="button" size="icon" aria-label="One more" onClick={() => step(1)} disabled={value >= MAX_PARTY}>
        <Plus className="size-5" />
      </Button>
    </div>
  )
}

/**
 * Where a visit ends: book a table. The form is a cream card with a hard
 * sticker shadow — name, how many, which evening, what time — and the orange
 * stamp to send it. Sending swaps the card for a ticket stub with a tick that
 * draws itself (a one-time success moment, so it gets a little spring).
 *
 * There is no back end: the form keeps its answers in state and shows the
 * confirmation. Wire `onSubmit` to a booking service to make it real.
 */
export function Booking() {
  const days = useMemo(nextDays, [])
  const [name, setName] = useState("")
  const [size, setSize] = useState(2)
  const [day, setDay] = useState(days[0].value)
  const [time, setTime] = useState(booking.times[3])
  const [sent, setSent] = useState(false)
  const reduced = useReducedMotion()
  const dayLabel = days.find((d) => d.value === day)?.label ?? ""

  return (
    <section id="book" className="bg-lime py-section">
      <Container className="grid gap-row lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col">
          <Eyebrow>{booking.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heavy text-title">
            <RiseText text={booking.title[0]} />
            <br />
            <RiseText text={booking.title[1]} delay={0.1} />
          </h2>
          <p className="mt-6 max-w-[38ch] text-body text-ink-soft">{booking.intro}</p>

          <div className="mt-row grid gap-6 sm:grid-cols-[auto_1fr]">
            <ClipShape shape="arch" className="hidden aspect-[3/4] w-[min(220px,40vw)] sm:block">
              <Photo photo={booking.photo} width={500} className="absolute inset-0" />
            </ClipShape>
            <dl className="grid content-start gap-5">
              <div>
                <dt className="flex items-center gap-2 font-condensed text-label uppercase">
                  <Clock className="size-4" aria-hidden /> Hours
                </dt>
                {visit.hours.map((h) => (
                  <dd key={h.days} className="mt-2 flex max-w-72 justify-between gap-6 border-b border-hairline pb-2 text-body">
                    <span>{h.days}</span>
                    <span className="tabular-nums">{h.time}</span>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="flex items-center gap-2 font-condensed text-label uppercase">
                  <MapPin className="size-4" aria-hidden /> Find us
                </dt>
                <dd className="mt-2 text-body">{brand.address.join(", ")}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-condensed text-label uppercase">
                  <Phone className="size-4" aria-hidden /> Call
                </dt>
                <dd className="mt-2 text-body">
                  <a href={`tel:${brand.phone.replace(/[^0-9]/g, "")}`} className="underline underline-offset-4">
                    {brand.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {!sent ? (
              <motion.form
                key="form"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
                className="flex flex-col gap-8 rounded-card border-2 border-forest bg-cream p-6 shadow-sticker sm:p-10"
                initial={{ opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(-12px)" }}
                transition={{ duration: DURATION.item, ease: EASE_OUT }}
              >
                <div className="grid gap-3">
                  <Label htmlFor="book-name">Name on the table</Label>
                  <Input
                    id="book-name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 rounded-field border-2 border-forest bg-lime/40 px-4 text-body focus-visible:bg-lime/70"
                  />
                </div>

                <div className="grid gap-3">
                  <Label>How many</Label>
                  <PartySize value={size} onChange={setSize} />
                </div>

                <fieldset className="grid gap-3">
                  <legend className="mb-3 font-condensed text-label uppercase">Which evening</legend>
                  <div className="flex flex-wrap gap-2">
                    {days.map((d) => (
                      <Chip key={d.value} active={d.value === day} onClick={() => setDay(d.value)}>
                        {d.label}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="grid gap-3">
                  <legend className="mb-3 font-condensed text-label uppercase">What time</legend>
                  <div className="grid grid-cols-4 gap-2">
                    {booking.times.map((t) => (
                      <Chip key={t} active={t === time} onClick={() => setTime(t)} className="px-0 tabular-nums">
                        {t}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <div className="flex justify-end pt-2">
                  <CtaEllipse type="submit" className="text-[clamp(24px,2.4vw,36px)] leading-none">
                    {booking.submit}
                  </CtaEllipse>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                className="relative"
                initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "scale(0.94) rotate(-3deg)" }}
                animate={{ opacity: 1, transform: "scale(1) rotate(-2deg)" }}
                exit={{ opacity: 0 }}
                transition={reduced ? { duration: 0.25 } : SPRING_POP}
              >
                <ClipShape shape="ticket" className="bg-forest p-8 text-cream sm:p-12">
                  <svg viewBox="0 0 64 64" className="size-20 text-lime" aria-hidden>
                    <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="4" />
                    <motion.path
                      d="M18 33 L28 43 L47 22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: reduced ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.2 }}
                    />
                  </svg>
                  <h3 className="mt-6 font-heavy text-[clamp(48px,6vw,96px)] leading-[0.85] text-lime">{booking.success.title}</h3>
                  <p className="mt-4 max-w-[34ch] text-body text-on-forest">
                    {booking.success.body(name.trim(), size, `${time}, ${dayLabel.toLowerCase()}`)}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-dashed border-hairline-forest pt-6 font-condensed text-label uppercase">
                    <span>{dayLabel}</span>
                    <span>{time}</span>
                    <span>Party of {size}</span>
                  </div>
                  <Button type="button" variant="orange" className="mt-8" onClick={() => setSent(false)}>
                    {booking.success.again}
                  </Button>
                </ClipShape>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
