import { useEffect, useRef, useState } from "react"
import { Headphones, Plane, TriangleAlert } from "lucide-react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { BorderBeam } from "border-beam"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { GateChip, TailMark } from "@/components/mock/app-ui"
import { Phone } from "@/components/mock/phone"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { PHOTOS, pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

/** A loop that only runs while its card is on screen and the page isn't
 *  being designed or asked to keep still. Returns the current beat. */
function useBeats(count: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [beat, setBeat] = useState(0)
  const running = inView && !reduced && !designing
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setBeat((b) => (b + 1) % count), ms)
    return () => window.clearInterval(id)
  }, [running, count, ms])
  return { ref, beat, setBeat, still: reduced || designing }
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <article className={cn("relative overflow-hidden rounded-(--radius-panel) bg-night-2 shadow-(--shadow-night)", className)}>{children}</article>
}

/** Rain, as thin falling streaks, over the storm card. */
function Rain() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      <div className="absolute -inset-y-[20%] inset-x-0 animate-rain bg-[repeating-linear-gradient(100deg,transparent_0_22px,rgb(195_191_214/0.35)_22px_23px,transparent_23px_47px)] [mask-image:linear-gradient(transparent,black_30%,black_70%,transparent)]" />
    </div>
  )
}

/** The headline card: the phone's flight sheet, and the prediction arriving
 *  in a glowing banner — empty while it thinks, then the reason. */
function DelayCard() {
  const { ref, beat, setBeat, still } = useBeats(2, 3600)
  const revealed = still || beat === 1
  useCanvasAction("Delay prediction shown", (next) => setBeat((next ?? !revealed) ? 1 : 0), { on: revealed, group: "Everything" })
  return (
    <Card className="shadow-(--shadow-glow-soft)">
      <div ref={ref} className="grid min-h-[460px] md:grid-cols-[1fr_1.1fr]">
        <img src={pexels(PHOTOS.storm, 1400)} alt="Lightning over a city at night" className={cn("absolute inset-0 size-full object-cover transition-opacity duration-(--duration-scene)", revealed ? "opacity-60" : "opacity-25")} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-night-2)_25%,rgb(14_10_38/0.35))]" />
        <Rain />
        <div className="relative flex flex-col justify-between gap-10 p-7 md:p-10">
          <h3 className="max-w-[16ch] text-h3 font-semibold text-night-fg">See why you're late. Before anyone says so.</h3>
          <p className="max-w-[38ch] text-night-2fg">
            Airlines tend to sit on delay news until the last minute. Contrail follows the inbound aircraft from 25 hours out, so it can predict a new departure time long before the board changes.
          </p>
        </div>
        <div className="relative h-[380px] md:h-auto">
          <Phone tone="dark" className="absolute top-8 right-6 w-[260px] sm:right-14 md:top-10">
            <div className="absolute inset-0 bg-night px-[1.1em] pt-[3.6em]">
              <p className="flex items-center gap-[0.4em] text-[0.62em] text-night-muted"><TailMark airline="CR" /> CR 88 · SUN, 8 JUN</p>
              <p className="text-[1em] font-semibold">New York to Lisbon</p>
              <div className="h-[7.4em]" />
              <p className="text-[0.66em] font-semibold text-night-2fg">● JFK · John F. Kennedy Intl.</p>
              <p className={cn("text-[2em] leading-tight font-semibold tabular-nums transition-colors duration-(--duration-phase)", revealed ? "text-red-bright" : "text-green-bright")}>
                {revealed ? "8:05PM" : "7:35PM"} {revealed ? <span className="text-[0.32em] font-medium text-night-muted line-through">7:35PM</span> : null}
              </p>
              <p className="text-[0.6em] text-night-muted"><span className={revealed ? "text-red-bright" : "text-green-bright"}>{revealed ? "Predicting 8:05PM" : "On time"}</span> · Departs in 3h 10m</p>
              <div className="mt-[0.8em] flex justify-end"><GateChip gate="A7" className="text-[0.8em]" /></div>
              <p className="mt-[0.6em] text-[0.66em] font-semibold text-night-2fg">● LIS · Humberto Delgado</p>
              <p className="text-[2em] leading-tight font-semibold text-night-dim tabular-nums">{revealed ? "8:20AM" : "7:50AM"}</p>
            </div>
          </Phone>
          {/* the banner sits across the phone's edge, as a notification would */}
          <div className="absolute top-[98px] right-2 left-2 sm:right-6 sm:left-auto sm:w-[340px] md:top-[104px]">
            <BorderBeam size="md" colorVariant="ocean" theme="dark" strength={revealed ? 0.8 : 0.45} className="rounded-2xl">
              <div className="flex h-[68px] items-center gap-3 rounded-2xl bg-black/90 px-4 shadow-(--shadow-glow) backdrop-blur">
                <AnimatePresence mode="wait" initial={false}>
                  {revealed ? (
                    <motion.div key="on" initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} className="flex items-center gap-3">
                      <TriangleAlert className="size-5 shrink-0 text-red-bright" />
                      <div>
                        <p className="text-[15px] font-semibold text-red-bright">Likely 30 min late</p>
                        <p className="text-[13px] text-night-2fg">Inbound held in Denver by storms until 3:20</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p key="off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[14px] text-night-muted">
                      <span className="relative size-2"><span className="absolute inset-0 animate-pulse-dot rounded-full bg-violet-glow" /><span className="absolute inset-0 rounded-full bg-violet-glow" /></span>
                      Watching the inbound aircraft…
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </BorderBeam>
          </div>
        </div>
      </div>
    </Card>
  )
}

/** Where's my plane: the aircraft you'll board, on the leg before yours. */
function InboundCard() {
  const { ref, beat } = useBeats(60, 1000)
  const minutes = 70 - (beat % 60)
  return (
    <Card>
      <div ref={ref} className="flex h-full flex-col p-7 md:p-8">
        <p className="max-w-[34ch] text-night-2fg">
          <span className="font-semibold text-night-fg">Where's my plane?</span> Your aircraft is usually somewhere else an hour before you board. Contrail shows you where — and what that means for you.
        </p>
        <div className="mt-8 flex-1 rounded-(--radius-card) bg-night p-5 shadow-[0_0_0_1px_var(--color-night-line)]">
          <ol className="relative flex flex-col gap-5 pl-7">
            <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-night-line" />
            <span aria-hidden className="absolute top-2 left-[7px] w-px bg-violet-glow transition-[height] duration-1000 ease-linear" style={{ height: `${Math.round((1 - minutes / 70) * 50)}%` }} />
            <li className="relative">
              <span className="absolute top-1 -left-7 size-[15px] rounded-full border-2 border-night-dim bg-night" />
              <p className="text-[13px] text-night-muted">DEN · departed 2:41 pm</p>
            </li>
            <li className="relative">
              <span className="absolute top-0.5 -left-[30px] grid size-5 place-items-center rounded-full bg-violet-bright text-white"><Plane className="size-3 rotate-90" /></span>
              <p className="font-semibold text-night-fg">Denver to San Francisco</p>
              <p className="text-[13px] text-night-2fg">Landing in <span className="text-night-fg tabular-nums">{Math.floor(minutes / 60)}h {String(minutes % 60).padStart(2, "0")}m</span> · on time</p>
            </li>
            <li className="relative">
              <span className="absolute top-1 -left-7 size-[15px] rounded-full border-2 border-night-dim bg-night" />
              <p className="font-semibold text-night-fg">Then: your flight, NW 214</p>
              <p className="text-[13px] text-night-2fg">Same aircraft · A321neo · tail N2105J</p>
            </li>
          </ol>
        </div>
      </div>
    </Card>
  )
}

/** Advisories straight from air traffic control, over the tower at dusk. */
function AdvisoryCard() {
  return (
    <Card className="bg-ember-deep">
      <img src={pexels(PHOTOS.towerDusk, 900)} alt="A control tower silhouetted against a dusk sky" className="absolute inset-0 size-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(14_10_38/0.95)_10%,rgb(14_10_38/0.4)_55%,rgb(42_14_10/0.6))]" />
      <div className="relative flex h-full min-h-[420px] flex-col p-7 md:p-8">
        <p className="max-w-[34ch] text-night-2fg">
          <span className="font-semibold text-night-fg">Straight from the tower.</span> When air traffic control slows an airport down, you see the same advisory the airlines do — ground stops, weather and runway closures.
        </p>
        <div className="mt-auto rounded-(--radius-card) bg-night/80 p-4 shadow-(--shadow-night) backdrop-blur-md">
          <p className="flex items-center justify-between text-[13px] text-night-muted"><span className="font-semibold text-night-fg">JFK arrivals</span> 4:12 pm</p>
          <p className="mt-2 text-[14px] text-night-2fg">Some flights to JFK are held at their origin for the next 45 min because of thunderstorms. Chance of extension: <span className="text-amber">40%</span>.</p>
          <p className="mt-3 flex items-center gap-2 border-t border-night-line pt-3 text-[13px] text-night-muted"><Headphones className="size-4" /> Advisory from air traffic control</p>
        </div>
      </div>
    </Card>
  )
}

const LOCK = [
  { t: "NW 214 · Departed gate", b: "Taxiing for 13 min, wheels up 6:17" },
  { t: "CR 88 · Delayed 30 min", b: "New departure 8:05 pm (was 7:35)" },
  { t: "Gate departure in 1h 16m", b: "Inbound plane is in Lisbon" },
  { t: "Gate changed to B3", b: "4 min walk from where you are" },
]

/** First to know: the lock screen filling with alerts, one by one. */
function FirstToKnowCard() {
  const { ref, beat, still } = useBeats(LOCK.length + 2, 1500)
  const shown = still ? LOCK.length : Math.min(beat, LOCK.length)
  return (
    <Card className="bg-[radial-gradient(120%_80%_at_80%_0%,var(--color-ember)_0%,#7a1d0c_35%,var(--color-night-2)_70%)]">
      <div ref={ref} className="flex h-full max-h-[640px] flex-col p-7 md:p-8">
        <p className="max-w-[36ch] text-night-2fg">
          <span className="font-semibold text-night-fg">First to know, first to rebook.</span> Delays and gate changes reach you before anyone else hears — the crew included — so you're first in the rebooking line, not fortieth.
        </p>
        <div className="relative mt-8 flex flex-1 justify-center">
          <Phone tone="dark" time="9:41" className="w-[270px] translate-y-10">
            <div className="absolute inset-0 bg-[linear-gradient(170deg,#ff7a2f,#c2410c_45%,#3b0d1f)] px-[0.8em] pt-[4em]">
              <p className="text-center text-[0.7em] font-medium text-white/80">Monday 9 June</p>
              <p className="text-center text-[4.2em] leading-none font-semibold tracking-[-0.03em] text-white">9:41</p>
              <ul className="mt-[1em] flex flex-col gap-[0.4em]">
                <AnimatePresence initial={false}>
                  {LOCK.slice(0, shown)
                    .reverse()
                    .map((n) => (
                      <motion.li
                        key={n.t}
                        layout
                        initial={{ opacity: 0, transform: "translateY(-12px) scale(0.96)" }}
                        animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="flex items-start gap-[0.5em] rounded-[1em] bg-white/80 p-[0.6em] text-ink backdrop-blur"
                      >
                        <span className="grid size-[1.8em] shrink-0 place-items-center rounded-[0.5em] bg-ink text-white"><Plane className="size-[1em]" /></span>
                        <span className="min-w-0">
                          <span className="block truncate text-[0.82em] font-semibold">{n.t}</span>
                          <span className="block truncate text-[0.72em] text-ink-2">{n.b}</span>
                        </span>
                      </motion.li>
                    ))}
                </AnimatePresence>
              </ul>
            </div>
          </Phone>
        </div>
      </div>
    </Card>
  )
}

const FORECAST = [
  { label: "Early", v: 18, c: "bg-green-bright" },
  { label: "On time", v: 46, c: "bg-green-bright" },
  { label: "15m late", v: 14, c: "bg-amber" },
  { label: "30m late", v: 9, c: "bg-amber" },
  { label: "45m+ late", v: 8, c: "bg-red-bright" },
  { label: "Cancelled", v: 3, c: "bg-red-bright" },
  { label: "Diverted", v: 2, c: "bg-red-bright" },
]

/** Pro data, plain words: a 60-day forecast that draws in when it's seen. */
function ProDataCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const full = inView || reduced || designing
  return (
    <Card className="bg-[radial-gradient(120%_80%_at_100%_100%,#0f3b23_0%,var(--color-forest)_45%,var(--color-night-2)_80%)]">
      <div ref={ref} className="flex h-full flex-col p-7 md:p-8">
        <p className="max-w-[36ch] text-night-2fg">
          <span className="font-semibold text-night-fg">The 'pro' made approachable.</span> Pilot-grade data you can actually read: gates, terminals, belts, booking codes and how this flight has really run for the past 60 days.
        </p>
        <div className="mt-8 rounded-(--radius-card) bg-night/70 p-5 shadow-(--shadow-night)">
          <div className="flex items-baseline justify-between">
            <p className="font-semibold text-night-fg">Forecast</p>
            <p className="text-[13px] text-night-muted">last 60 days · NW 214</p>
          </div>
          <p className="mt-1 text-[13px] text-night-2fg">Average when late: <span className="text-night-fg">24 min</span></p>
          <ul className="mt-4 flex flex-col gap-2">
            {FORECAST.map((f, i) => (
              <li key={f.label} className="grid grid-cols-[76px_1fr_36px] items-center gap-3 text-[13px]">
                <span className="text-night-muted">{f.label}</span>
                <span className="h-2 overflow-hidden rounded-full bg-night-3">
                  <span
                    className={cn("block h-full origin-left rounded-full transition-transform duration-700 ease-(--ease-out-strong)", f.c)}
                    style={{ transform: `scaleX(${full ? f.v / 46 : 0})`, transitionDelay: `${i * 60}ms` }}
                  />
                </span>
                <span className="text-right text-night-2fg tabular-nums">{f.v}%</span>
              </li>
            ))}
          </ul>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-3">
          {[["Terminal", "1"], ["Belt", "6"], ["Booking", "QX7R2M"]].map(([k, v]) => (
            <div key={k} className="rounded-(--radius-field) bg-night/70 px-4 py-3 shadow-(--shadow-night)">
              <dt className="text-[12.58px] text-night-muted">{k}</dt>
              <dd className="mt-0.5 font-data text-[20px] font-medium text-night-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  )
}

/**
 * Everything Contrail knows: the delay prediction across the top, then where
 * your plane is, the tower's advisories, the alerts and the data.
 */
export function EverythingBento() {
  return (
    <section id="everything" data-theme="night" className="bg-night pb-section">
      <Container>
        <Reveal>
          <h2 className="type-display max-w-[20ch] text-h1 text-balance text-night-fg">Everything you wanted to know about your flight — and the things nobody tells you.</h2>
          <p className="mt-6 max-w-[60ch] text-lead text-night-2fg">
            Contrail tracks more about a flight than any airline app, including the two biggest causes of delay: a late inbound aircraft and the weather. You'll know what's happening, and what it means for you.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal className="md:col-span-2"><DelayCard /></Reveal>
          <Reveal><InboundCard /></Reveal>
          <Reveal delay={0.06}><AdvisoryCard /></Reveal>
          <Reveal><FirstToKnowCard /></Reveal>
          <Reveal delay={0.06}><ProDataCard /></Reveal>
        </div>
      </Container>
    </section>
  )
}
