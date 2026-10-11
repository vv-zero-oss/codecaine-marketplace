import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowLeft, ArrowRight, Calendar, Check, Copy, Loader2, MapPin, PartyPopper } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Phone } from "@/components/mock/phone"
import { PosterArt } from "@/components/mock/poster"
import { MoodBackdrop, type Mood } from "@/components/motion/mood-backdrop"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/ui/container"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { EVENTS, formatDate, type PosterStyle } from "@/content/events"
import { cn } from "@/lib/utils"

const POSTERS = ["rooftop", "cocktail-hour", "book-talk", "dawn-run", "workshop", "hack-night", "breathe", "handshake"].map(
  (id) => EVENTS.find((e) => e.id === id)!.poster,
)

const PAGE_MOODS: { id: Mood | "plain"; label: string }[] = [
  { id: "plain", label: "Plain" },
  { id: "starlit", label: "Starlit" },
  { id: "electric", label: "Electric" },
  { id: "lovestruck", label: "Lovestruck" },
]

const STEPS = ["The basics", "The look", "Tickets"] as const

type Draft = {
  name: string
  date: string
  time: string
  place: string
  poster: number
  mood: Mood | "plain"
  capacity: number
  paid: boolean
  price: number
  approval: boolean
}

const START: Draft = {
  name: "",
  date: "2026-11-14",
  time: "19:00",
  place: "",
  poster: 0,
  mood: "plain",
  capacity: 60,
  paid: false,
  price: 15,
  approval: false,
}

function Label({ children, htmlFor, hint }: { children: React.ReactNode; htmlFor?: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-[14px] font-medium text-ink-2">
      {children}
      {hint && <span className="font-normal text-ink-4">{hint}</span>}
    </label>
  )
}

/** The event page as a guest will see it, on a phone, drawn from the draft. */
function LivePreview({ d }: { d: Draft }) {
  const onMood = d.mood !== "plain"
  const poster: PosterStyle = { ...POSTERS[d.poster], title: d.name ? d.name.toUpperCase().split(" ").slice(0, 3).join("\n") : POSTERS[d.poster].title }
  return (
    <Phone dark={onMood} className="w-full max-w-[340px]">
      <div className="relative h-full">
        {onMood && <MoodBackdrop mood={d.mood as Mood} className="-top-[12%]" />}
        <div className={cn("relative flex h-full flex-col px-[5cqw] pt-[3cqw] text-[4.1cqw]", onMood && "text-white")}>
          <motion.div layout className="aspect-square overflow-hidden rounded-[4cqw] bg-raised p-[1.4cqw] shadow-(--shadow-poster)">
            <PosterArt poster={poster} className="rounded-[3cqw]" />
          </motion.div>
          <p className={cn("mt-[5cqw] line-clamp-2 text-[7.6cqw] leading-[1.05] font-semibold tracking-[-0.03em]", !d.name && "opacity-35")}>{d.name || "Name your night"}</p>
          <div className={cn("mt-[3cqw] flex flex-col gap-[2cqw]", onMood ? "text-white/85" : "text-ink-2")}>
            <p className="flex items-center gap-[2.4cqw]">
              <Calendar className="size-[4.4cqw]" /> {formatDate(d.date, { weekday: "long", month: "long", day: "numeric" })} · {d.time}
            </p>
            <p className={cn("flex items-center gap-[2.4cqw]", !d.place && "opacity-50")}>
              <MapPin className="size-[4.4cqw]" /> {d.place || "Add a place"}
            </p>
          </div>
          <div className="mt-auto mb-[8cqw]">
            <p className={cn("mb-[2cqw] text-center text-[3.4cqw]", onMood ? "text-white/75" : "text-ink-3")}>
              {d.capacity} spots · {d.paid ? `$${d.price}` : "Free"}
              {d.approval && " · host approves"}
            </p>
            <div className={cn("flex h-[12cqw] items-center justify-center rounded-full text-[4.3cqw] font-medium", onMood ? "bg-white text-ink" : "bg-ink text-page")}>
              {d.approval ? "Request to join" : d.paid ? "Get a ticket" : "RSVP"}
            </div>
          </div>
        </div>
      </div>
    </Phone>
  )
}

/**
 * The event builder: three short steps, a phone that redraws the page as
 * you type, and a publish that ends with a link you can copy. Nothing is
 * faked — the preview is the draft, and the link is the name you gave it.
 */
export function Builder() {
  const reduced = useReducedMotion()
  const [d, setD] = useState<Draft>(START)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<"draft" | "publishing" | "live">("draft")
  const [copied, setCopied] = useState(false)
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((x) => ({ ...x, [k]: v }))

  STEPS.forEach((s, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- a fixed list
    useCanvasAction(`Builder: ${s}`, () => go(i), { on: step === i && status === "draft", group: "Host" })
  })
  useCanvasAction("Builder: published", (next) => {
    const on = next ?? status !== "live"
    if (on && !d.name) setD((x) => ({ ...x, name: "Sunday Supper Club", place: "Casa Roma, CDMX" }))
    setStatus(on ? "live" : "draft")
  }, { on: status === "live", group: "Host" })

  const slug = (d.name || "my-night").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  const nameMissing = touched && !d.name.trim()

  function go(next: number) {
    if (next > step && step === 0 && !d.name.trim()) {
      setTouched(true)
      return
    }
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const publish = () => {
    setStatus("publishing")
    window.setTimeout(() => setStatus("live"), 1100)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://fete.events/${slug}`)
    } catch {
      /* clipboard can be blocked in a frame; the state still says copied */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const slide = {
    enter: (k: number) => (reduced ? { opacity: 0 } : { opacity: 0, x: 24 * k }),
    centre: { opacity: 1, x: 0 },
    exit: (k: number) => (reduced ? { opacity: 0 } : { opacity: 0, x: -24 * k }),
  }

  return (
    <section id="builder" className="pb-section">
      <Container className="max-w-[1180px]">
        <div className="grid items-start gap-10 rounded-[28px] bg-panel p-4 sm:p-8 lg:grid-cols-[1fr_400px] lg:gap-16 lg:p-14">
          <div className="min-w-0">
            {/* progress */}
            <ol className="flex gap-2" aria-label="Steps">
              {STEPS.map((s, i) => (
                <li key={s} className="flex-1">
                  <button
                    type="button"
                    disabled={status !== "draft"}
                    onClick={() => go(i)}
                    aria-current={i === step ? "step" : undefined}
                    className="group w-full text-left disabled:cursor-default"
                  >
                    <span className="block h-1 overflow-hidden rounded-full bg-line-strong">
                      <motion.span className="block h-full origin-left bg-ink" animate={{ scaleX: i <= step || status === "live" ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} />
                    </span>
                    <span className={cn("mt-2 block text-[14px] transition-colors", i === step ? "font-medium text-ink" : "text-ink-3 group-hover:text-ink-2")}>
                      <span className="font-mono text-[12px] text-ink-4">0{i + 1}</span> {s}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="relative mt-10 min-h-[420px]">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                {status === "live" ? (
                  <motion.div key="live" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 0.6, bounce: 0.25 }}>
                    <span className="grid size-14 place-items-center rounded-full bg-ink text-page">
                      <PartyPopper className="size-6" />
                    </span>
                    <h3 className="type-head mt-6 text-display text-ink">You’re live.</h3>
                    <p className="mt-4 max-w-[40ch] text-lead text-ink-3">
                      {d.name} has a page, a guest list and a door. Send the link — the first yes usually lands inside ten minutes.
                    </p>
                    <div className="mt-8 flex max-w-[520px] items-center gap-2 rounded-full bg-raised p-1.5 pl-5 shadow-(--shadow-field)">
                      <span className="min-w-0 flex-1 truncate font-mono text-[14px] text-ink-2">fete.events/{slug}</span>
                      <Button onClick={copy} className="w-[112px]">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span key={String(copied)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }} className="inline-flex items-center gap-1.5">
                            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                            {copied ? "Copied" : "Copy"}
                          </motion.span>
                        </AnimatePresence>
                      </Button>
                    </div>
                    <Button variant="link" className="mt-6" onClick={() => { setStatus("draft"); setStep(0); setD(START); setTouched(false) }}>
                      Start another night <ArrowRight />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="centre" exit="exit" transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
                    {step === 0 && (
                      <div className="flex flex-col gap-6">
                        <h3 className="type-head text-h3 text-ink">What’s the night?</h3>
                        <div>
                          <Label htmlFor="ev-name" hint={`${d.name.length}/48`}>Event name</Label>
                          <Input id="ev-name" autoFocus maxLength={48} value={d.name} onChange={(e) => set("name", e.target.value)} onKeyDown={(e) => e.key === "Enter" && go(1)} placeholder="Sunday Supper Club" aria-invalid={nameMissing} />
                          <AnimatePresence>
                            {nameMissing && (
                              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto", x: reduced ? 0 : [0, -6, 6, -3, 0] }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="mt-2 text-[14px] text-signal-red">
                                Give it a name — it’s the first thing guests read.
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="ev-date">Date</Label>
                            <Input id="ev-date" type="date" value={d.date} min="2026-10-10" onChange={(e) => e.target.value && set("date", e.target.value)} />
                          </div>
                          <div>
                            <Label htmlFor="ev-time">Starts</Label>
                            <Input id="ev-time" type="time" value={d.time} onChange={(e) => set("time", e.target.value)} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="ev-place" hint="Optional">Where</Label>
                          <Input id="ev-place" value={d.place} onChange={(e) => set("place", e.target.value)} placeholder="A rooftop, a backyard, a back room" autoComplete="street-address" />
                        </div>
                      </div>
                    )}
                    {step === 1 && (
                      <div className="flex flex-col gap-8">
                        <h3 className="type-head text-h3 text-ink">Make it look like it’ll feel.</h3>
                        <div>
                          <Label>Poster</Label>
                          <div role="radiogroup" aria-label="Poster" className="grid grid-cols-4 gap-2 sm:gap-3">
                            {POSTERS.map((p, i) => (
                              <button
                                key={i}
                                type="button"
                                role="radio"
                                aria-checked={d.poster === i}
                                aria-label={`Poster ${i + 1}`}
                                onClick={() => set("poster", i)}
                                className={cn(
                                  "aspect-square rounded-[12px] bg-raised p-1 transition-[box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:-translate-y-0.5 active:scale-95",
                                  d.poster === i ? "shadow-[0_0_0_2px_var(--color-ink),var(--shadow-card)]" : "shadow-(--shadow-xs)",
                                )}
                              >
                                <PosterArt poster={{ ...p, kicker: undefined }} className="rounded-[8px]" titleScale={0.8} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Page mood</Label>
                          <div role="radiogroup" aria-label="Page mood" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {PAGE_MOODS.map((m) => (
                              <button
                                key={m.id}
                                type="button"
                                role="radio"
                                aria-checked={d.mood === m.id}
                                onClick={() => set("mood", m.id)}
                                className={cn(
                                  "relative h-16 overflow-hidden rounded-[12px] text-[15px] font-medium transition-[box-shadow,transform] duration-(--duration-hover) active:scale-[0.97]",
                                  d.mood === m.id ? "shadow-[0_0_0_2px_var(--color-ink)]" : "shadow-(--shadow-field)",
                                  m.id === "plain" ? "bg-raised text-ink" : "text-white",
                                )}
                              >
                                {m.id !== "plain" && <MoodBackdrop mood={m.id} />}
                                <span className="relative">{m.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="flex flex-col gap-8">
                        <h3 className="type-head text-h3 text-ink">Who gets in, and how.</h3>
                        <div>
                          <Label hint={`${d.capacity} people`}>Capacity</Label>
                          <Slider value={[d.capacity]} min={8} max={400} step={4} onValueChange={([v]) => set("capacity", v)} aria-label="Capacity" />
                        </div>
                        <div>
                          <Label>Tickets</Label>
                          <div className="relative grid grid-cols-2 rounded-full bg-raised p-1 shadow-(--shadow-field)" role="radiogroup" aria-label="Tickets">
                            {[false, true].map((paid) => (
                              <button key={String(paid)} type="button" role="radio" aria-checked={d.paid === paid} onClick={() => set("paid", paid)} className={cn("relative h-10 rounded-full text-[15px] font-medium transition-colors", d.paid === paid ? "text-page" : "text-ink-2")}>
                                {d.paid === paid && <motion.span layoutId="paid-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", duration: 0.35, bounce: 0.15 }} />}
                                <span className="relative">{paid ? "Paid" : "Free"}</span>
                              </button>
                            ))}
                          </div>
                          <AnimatePresence initial={false}>
                            {d.paid && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="flex items-center gap-3 pt-4">
                                  <span className="text-[15px] text-ink-2">Price</span>
                                  <div className="relative w-32">
                                    <span className="absolute top-1/2 left-4 -translate-y-1/2 text-ink-3">$</span>
                                    <Input type="number" min={1} max={500} value={d.price} onChange={(e) => set("price", Math.max(1, Math.min(500, +e.target.value || 1)))} className="pl-8 tabular-nums" aria-label="Ticket price" />
                                  </div>
                                  <span className="text-[14px] text-ink-3 tabular-nums">You get ${(d.price * 0.95 - 0.3).toFixed(2)} each</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <label className="flex items-center justify-between gap-4 rounded-(--radius-card) bg-raised p-4 shadow-(--shadow-field)">
                          <span>
                            <span className="block text-[15px] font-medium text-ink">Approve each guest</span>
                            <span className="block text-[14px] text-ink-3">Guests request a spot; you say yes.</span>
                          </span>
                          <Switch checked={d.approval} onCheckedChange={(v) => set("approval", v)} />
                        </label>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {status !== "live" && (
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-line-strong pt-6">
                <Button variant="ghost" onClick={() => go(step - 1)} disabled={step === 0} className={cn(step === 0 && "invisible")}>
                  <ArrowLeft /> Back
                </Button>
                {step < STEPS.length - 1 ? (
                  <Button size="lg" onClick={() => go(step + 1)}>
                    Next <ArrowRight />
                  </Button>
                ) : (
                  <Button size="lg" onClick={publish} disabled={status === "publishing"} className="min-w-40">
                    {status === "publishing" ? (
                      <>
                        <Loader2 className="animate-spin" /> Publishing
                      </>
                    ) : (
                      "Publish page"
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center lg:sticky lg:top-24">
            <LivePreview d={d} />
          </div>
        </div>
      </Container>
    </section>
  )
}
