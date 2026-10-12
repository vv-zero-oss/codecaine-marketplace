import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CalendarPlus, Check, MapPin, Minus, Plus, RotateCcw } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { PosterArt } from "@/components/mock/poster"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { findEvent, formatDate, type FeteEvent } from "@/content/events"
import { avatar } from "@/lib/photos"
import { cn } from "@/lib/utils"

type Answer = "going" | "maybe" | "no"

const ANSWERS: { id: Answer; label: string }[] = [
  { id: "going", label: "Going" },
  { id: "maybe", label: "Maybe" },
  { id: "no", label: "Can’t go" },
]

const FACES = [3738634, 5496471, 39107476, 7562179, 2112714]

/** A QR-ish code drawn from the guest's name, so every ticket is its own. */
export function TicketCode({ seed, className }: { seed: string; className?: string }) {
  const cells = useMemo(() => {
    let h = 2166136261
    for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
    const out: boolean[] = []
    for (let i = 0; i < 121; i++) {
      h = Math.imul(h ^ (h >>> 13), 1274126177)
      out.push((h & 7) > 3)
    }
    return out
  }, [seed])
  const finder = (x: number, y: number) => (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7)
  return (
    <svg viewBox="0 0 11 11" className={cn("size-16", className)} shapeRendering="crispEdges" aria-label="Ticket code">
      {cells.map((on, i) => {
        const x = i % 11
        const y = Math.floor(i / 11)
        if (finder(x, y)) return null
        return on ? <rect key={i} x={x} y={y} width="1" height="1" fill="currentColor" /> : null
      })}
      {[
        [0, 0],
        [8, 0],
        [0, 8],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x + 0.5} y={y + 0.5} width="2" height="2" fill="none" stroke="currentColor" strokeWidth="1" />
        </g>
      ))}
    </svg>
  )
}

/** A short burst of flare-coloured confetti from the button. */
function Burst({ fire }: { fire: number }) {
  const reduced = useReducedMotion()
  const pieces = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * Math.PI * 2 + (i % 3) * 0.2
        const dist = 70 + ((i * 37) % 60)
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 30,
          r: (i * 47) % 360,
          c: `var(--color-flare-${(i % 6) + 1})`,
          w: i % 2 ? 6 : 4,
        }
      }),
    [],
  )
  if (reduced || !fire) return null
  return (
    <span aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 z-10">
      {pieces.map((p, i) => (
        <motion.span
          key={`${fire}-${i}`}
          className="absolute rounded-[1px]"
          style={{ width: p.w, height: p.w * 1.6, background: p.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 50], opacity: [1, 1, 0], rotate: p.r, scale: 0.8 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], times: [0, 0.6, 1] }}
        />
      ))}
    </span>
  )
}

/**
 * An invitation that works: answer it, bring friends, and it turns into a
 * ticket with a code drawn from your name. The guest count is the event's
 * own, plus you.
 */
export function InviteCard({ eventId = "cocktail-hour", maxPlusOnes = 3 }: { eventId?: string; maxPlusOnes?: number }) {
  const event = findEvent(eventId) ?? (findEvent("cocktail-hour") as FeteEvent)
  const [answer, setAnswer] = useState<Answer | null>(null)
  const [plus, setPlus] = useState(0)
  const [name, setName] = useState("")
  const [ticket, setTicket] = useState(false)
  const [fire, setFire] = useState(0)

  useCanvasAction("Invite: ticket issued", (next) => {
    const on = next ?? !ticket
    setAnswer(on ? "going" : null)
    if (!name && on) setName("Alex Rivera")
    setTicket(on)
  }, { on: ticket, group: "Invite" })

  useEffect(() => {
    if (answer !== "going") setTicket(false)
  }, [answer])

  const going = event.going + (answer === "going" ? 1 + plus : 0)
  const left = Math.max(0, event.capacity - going)

  const confirm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setTicket(true)
    setFire((f) => f + 1)
  }

  return (
    <div className="relative mx-auto w-full max-w-[420px] rounded-[24px] bg-raised p-2 shadow-(--shadow-lift)">
      <span className="pointer-events-none absolute bottom-20 left-1/2 block size-0">
        <Burst fire={fire} />
      </span>
      <div className="relative overflow-hidden rounded-[18px]">
        <div className="aspect-[16/10]">
          <PosterArt poster={event.poster} titleScale={0.62} />
        </div>
      </div>
      <div className="px-3 pt-4 pb-3">
        <p className="type-eyebrow text-berry">You’re invited</p>
        <h3 className="mt-1 text-h4 font-semibold text-ink">{event.name}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <CalendarPlus className="size-4" /> {formatDate(event.date)} · {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" /> {event.city}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex -space-x-2">
            {FACES.map((f) => (
              <img key={f} src={avatar(f)} alt="" className="size-7 rounded-full object-cover ring-2 ring-raised" />
            ))}
          </div>
          <p className="text-[14px] text-ink-3">
            <motion.span key={going} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-medium text-ink tabular-nums">
              {going}
            </motion.span>{" "}
            going · {left === 0 ? "waitlist open" : `${left} spot${left === 1 ? "" : "s"} left`}
          </p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {ticket ? (
            <motion.div
              key="ticket"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.22 }}
              className="mt-4 flex items-center gap-4 rounded-[16px] border border-dashed border-line-strong bg-panel p-3"
            >
              <span className="rounded-[8px] bg-raised p-1.5 text-ink shadow-(--shadow-xs)">
                <TicketCode seed={name + plus} className="size-[72px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[13px] font-medium text-signal-green">
                  <Check className="size-3.5" strokeWidth={3} /> You’re on the list
                </span>
                <span className="mt-0.5 block truncate text-[18px] font-semibold tracking-[-0.02em] text-ink">{name}</span>
                <span className="block text-[14px] text-ink-3">{plus ? `+${plus} guest${plus > 1 ? "s" : ""}` : "Just you"} · show this at the door</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setTicket(false)
                  setAnswer(null)
                }}
                aria-label="Change answer"
                className="grid size-11 shrink-0 place-items-center rounded-full text-ink-3 transition-colors hover:bg-raised hover:text-ink"
              >
                <RotateCcw className="size-4" />
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={confirm} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="mt-4">
              <div role="radiogroup" aria-label="Your answer" className="relative grid grid-cols-3 gap-1 rounded-full bg-panel p-1">
                {ANSWERS.map((a) => {
                  const on = answer === a.id
                  return (
                    <button
                      key={a.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setAnswer(a.id)}
                      className={cn("relative h-10 rounded-full text-[15px] font-medium transition-colors duration-(--duration-hover)", on ? "text-page" : "text-ink-2 hover:text-ink")}
                    >
                      {on && <motion.span layoutId="rsvp-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", duration: 0.35, bounce: 0.15 }} />}
                      <span className="relative">{a.label}</span>
                    </button>
                  )
                })}
              </div>
              <AnimatePresence initial={false}>
                {answer === "going" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 pt-3">
                      <label className="sr-only" htmlFor="invite-name">
                        Your name
                      </label>
                      <Input
                        id="invite-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                      <div className="flex items-center justify-between rounded-(--radius-field) bg-panel px-4 py-1.5">
                        <span className="text-[15px] text-ink-2">Bringing friends?</span>
                        <span className="flex items-center gap-1">
                          <button type="button" aria-label="One fewer" disabled={plus === 0} onClick={() => setPlus((p) => p - 1)} className="grid size-9 place-items-center rounded-full text-ink-2 transition-[background-color,transform] hover:bg-raised active:scale-90 disabled:opacity-30">
                            <Minus className="size-4" />
                          </button>
                          <span className="w-6 text-center text-[16px] font-medium tabular-nums">{plus}</span>
                          <button type="button" aria-label="One more" disabled={plus >= maxPlusOnes} onClick={() => setPlus((p) => p + 1)} className="grid size-9 place-items-center rounded-full text-ink-2 transition-[background-color,transform] hover:bg-raised active:scale-90 disabled:opacity-30">
                            <Plus className="size-4" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-3">
                <Button type="submit" size="lg" className="w-full" disabled={answer !== "going" || !name.trim()}>
                  {answer === "maybe" ? "We’ll remind you the day before" : answer === "no" ? "Thanks for letting them know" : "Get my ticket"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
