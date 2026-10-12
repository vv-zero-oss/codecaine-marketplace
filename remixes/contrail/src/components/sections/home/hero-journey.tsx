import { useRef, useState, type FormEvent, type ReactNode } from "react"
import { ArrowDownRight, ArrowUpRight, Briefcase, Check, Footprints, LayoutGrid, Laptop, PlaneLanding, PlaneTakeoff, Smartphone, Sun, TowerControl, Watch } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { TailMark } from "@/components/mock/app-ui"
import { NotificationCard } from "@/components/mock/notification-card"
import { Phone } from "@/components/mock/phone"
import { AirportScreen, ArrivalScreen, PassportScreen, PreflightScreen } from "@/components/mock/screens"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { avatar, PEOPLE } from "@/lib/photos"
import { scrollToY } from "@/lib/scroll"
import { cn } from "@/lib/utils"

const PHASES = [
  { id: "preflight", label: "Preflight", Icon: PlaneTakeoff },
  { id: "airport", label: "At the airport", Icon: TowerControl },
  { id: "landing", label: "After landing", Icon: PlaneLanding },
  { id: "download", label: "Download", Icon: LayoutGrid },
] as const

type Card = { title: string; body: string; icon: ReactNode; phases: number[]; side: "l" | "r"; top: string; offset: number }

const Round = ({ className, children }: { className: string; children: ReactNode }) => (
  <span className={cn("grid size-9 place-items-center rounded-full text-white", className)}>{children}</span>
)

/** Ten notifications around the phone. Each phase lifts the ones about that
 *  moment and lets the rest fall back. */
const CARDS: Card[] = [
  { title: "Ama landed in New York", body: "6:32 pm · 22 min early · 24°", icon: <img src={avatar(PEOPLE[0], 72)} alt="" className="size-9 rounded-full object-cover" />, phases: [0, 2], side: "l", top: "13%", offset: 0 },
  { title: "NW 214 · Departed gate", body: "Taxiing 13 min · wheels up 6:17", icon: <TailMark airline="NW" className="size-8" />, phases: [1], side: "l", top: "28%", offset: 36 },
  { title: "Check-in is open", body: "Seat 14A is still yours", icon: <TailMark airline="CR" className="size-8" />, phases: [0], side: "l", top: "43%", offset: 8 },
  { title: "NW 214 · Landed", body: "6:32 pm, 22 min early", icon: <Round className="bg-green"><ArrowDownRight className="size-5" strokeWidth={2.6} /></Round>, phases: [2], side: "l", top: "58%", offset: 60 },
  { title: "Baggage claim", body: "Belt 6 · first bags at 6:48", icon: <span className="flex items-center gap-1 rounded-md bg-amber px-1.5 py-0.5 text-[13px] font-bold text-amber-ink"><Briefcase className="size-3.5" />6</span>, phases: [2], side: "l", top: "73%", offset: 10 },
  { title: "Gate changed", body: "Now Terminal 1 · Gate B27", icon: <span className="flex items-center rounded-md bg-amber px-1.5 py-0.5 text-[13px] font-bold text-amber-ink"><ArrowUpRight className="size-3.5" strokeWidth={3} />B27</span>, phases: [1], side: "r", top: "13%", offset: 10 },
  { title: "SFO → JFK · 18°", body: "Morning. Today's flight is on time.", icon: <Round className="bg-green"><Sun className="size-5" /></Round>, phases: [0], side: "r", top: "28%", offset: 40 },
  { title: "CR 88 · Delayed 30m", body: "Inbound held in Denver by storms", icon: <Round className="bg-red"><ArrowUpRight className="size-5" strokeWidth={2.6} /></Round>, phases: [1], side: "r", top: "43%", offset: 4 },
  { title: "Flight changed", body: "New departure 8:28 pm (was 7:35)", icon: <Round className="bg-amber text-amber-ink"><span className="text-[17px] font-bold">!</span></Round>, phases: [0], side: "r", top: "58%", offset: 56 },
  { title: "Connection · 12 min walk", body: "Gate A7, Terminal 4 · time to spare", icon: <Round className="bg-blue"><Footprints className="size-5" /></Round>, phases: [2], side: "r", top: "73%", offset: 16 },
]

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 12 28" className={cn("h-7 w-3 text-ink-3", flip && "-scale-x-100")} aria-hidden>
      <path d="M10 26C4 22 2 15 4 4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
      {[6, 11, 16, 21].map((y, i) => (
        <ellipse key={y} cx={4 + i * 0.6} cy={y} rx={1.4} ry={3} fill="currentColor" transform={`rotate(${-40 + i * 6} ${4 + i * 0.6} ${y})`} />
      ))}
    </svg>
  )
}

function Award({ title, line }: { title: string; line: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Laurel />
      <div className="text-center leading-tight">
        <p className="text-[14px] font-semibold text-ink">{title}</p>
        <p className="text-[13px] text-ink-3">{line}</p>
      </div>
      <Laurel flip />
    </div>
  )
}

/** The last phase's ask: where to get it, and a link sent to your phone. */
function DownloadPanel() {
  const [value, setValue] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const v = value.trim()
    if (!/^\+?[\d\s()-]{7,}$/.test(v) && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      setError("A phone number or an email, and we'll send the link there.")
      return
    }
    setError("")
    setSent(true)
  }
  return (
    <div className="flex w-full flex-col gap-3 md:max-w-[340px]">
      <p className="type-eyebrow text-violet-glow max-md:hidden">Free to start</p>
      <p className="text-h3 font-bold tracking-[-0.03em] text-night-fg max-md:hidden">On every screen you fly with.</p>
      <div className="flex gap-3 text-night-2fg max-md:hidden">
        {[Smartphone, Laptop, Watch].map((Icon, i) => (
          <span key={i} className="grid size-11 place-items-center rounded-full bg-night-3 shadow-[0_0_0_1px_var(--color-night-line)]">
            <Icon className="size-5" />
          </span>
        ))}
      </div>
      <form onSubmit={submit} noValidate className="md:mt-2">
        <label htmlFor="send-link" className="text-[14px] text-night-2fg">Send me the link</label>
        <div className="mt-1.5 flex h-12 items-center rounded-full bg-night-3 p-1 pl-4 shadow-[0_0_0_1px_var(--color-night-line)] focus-within:shadow-[0_0_0_2px_var(--color-violet-bright)]">
          <input
            id="send-link"
            value={value}
            onChange={(e) => (setValue(e.target.value), setSent(false))}
            placeholder="Phone or email"
            autoComplete="email"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-night-fg outline-none placeholder:text-night-muted"
          />
          <button
            type="submit"
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[14.5px] font-semibold transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]",
              sent ? "bg-green-bright text-night" : "bg-amber text-amber-ink hover:bg-amber-hover",
            )}
          >
            {sent ? <><Check className="size-4" strokeWidth={3} /> Sent</> : "Send"}
          </button>
        </div>
        <p className="mt-1.5 min-h-5 text-[13px] text-red-bright" role="alert">{error}</p>
      </form>
    </div>
  )
}

/**
 * The hero: the promise, then one trip told in four phases while the phone
 * holds still — preflight, at the airport, after landing, and the download.
 * Scroll moves through them; the tab bar jumps to one. The last phase turns
 * the page to night and hands over to the story below.
 */
export function HeroJourney({
  headline = "Know before the gate agent does.",
  /** Viewport heights of scroll each phase holds for. */
  phaseHeight = 90,
}: {
  headline?: string
  phaseHeight?: number
}) {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })
  const [scrolled, setScrolled] = useState(0)
  const [forced, setForced] = useState<number | null>(null)
  const reduced = useReducedMotion()
  useMotionValueEvent(scrollYProgress, "change", (p) => setScrolled(Math.min(PHASES.length - 1, Math.floor(p * PHASES.length * 0.999))))
  const phase = forced ?? scrolled
  const night = phase === 3

  PHASES.forEach((p, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Hero — ${p.label}`, (next) => setForced((next ?? forced !== i) ? i : null), { on: phase === i, group: "Hero" })
  })

  const jump = (i: number) => {
    setForced(null)
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    scrollToY(top + (span * (i + 0.5)) / PHASES.length)
  }

  const screen = [<PreflightScreen key="0" />, <AirportScreen key="1" />, <ArrivalScreen key="2" />, <PassportScreen key="3" />][phase]

  return (
    <section data-theme={night ? "night" : "day"} className={cn("relative transition-colors duration-(--duration-scene) ease-(--ease-out-strong)", night ? "bg-night" : "bg-page")}>
      <Container className="relative pt-32 text-center sm:pt-40">
        <Reveal>
          <h1 className={cn("type-display mx-auto max-w-[14ch] text-display text-balance transition-colors duration-(--duration-scene)", night ? "text-night-fg" : "text-ink")}>{headline}</h1>
          <p className={cn("mx-auto mt-6 max-w-[56ch] text-lead text-pretty transition-colors duration-(--duration-scene)", night ? "text-night-2fg" : "text-ink-2")}>
            Contrail watches the plane before yours, the weather at both ends and the tower's own advisories — so you hear about delays, gate changes and landings first, in words that make sense.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Award title="Interaction Award" line="Winner 2025" />
            <Award title="Travel App of the Year" line="Finalist 2026" />
          </div>
        </Reveal>
      </Container>

      <div ref={track} className="relative" style={{ height: `${PHASES.length * phaseHeight + 100}vh` }}>
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* the night arriving: a violet glow from above and the runway grid */}
          <div aria-hidden className={cn("night-grid absolute inset-0 transition-opacity duration-(--duration-scene)", night ? "opacity-100" : "opacity-0")} style={{ maskImage: "radial-gradient(ellipse 60% 70% at 50% 40%, black, transparent)" }} />
          <div aria-hidden className={cn("absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_50%_60%_at_50%_10%,rgb(91_43_217/0.55),transparent)] transition-opacity duration-(--duration-scene)", night ? "opacity-100" : "opacity-0")} />

          {/* the cards, either side of the phone (md and up) */}
          <div className="absolute inset-0 max-md:hidden" data-canvas-ignore>
            {CARDS.map((card, i) => {
              const on = card.phases.includes(phase)
              return (
                <div
                  key={card.title}
                  className={cn(
                    "absolute w-[min(340px,34vw)] transition-[opacity,transform] duration-(--duration-phase) ease-(--ease-out-strong)",
                    card.side === "l" ? "right-[calc(50%+110px)]" : "left-[calc(50%+110px)]",
                    night ? "pointer-events-none opacity-0" : "opacity-100",
                  )}
                  style={{
                    top: card.top,
                    transform: `translateX(${card.side === "l" ? -card.offset : card.offset}px) translateY(${on || reduced ? 0 : 6}px)`,
                    zIndex: on ? 20 : 5,
                    transitionDelay: on ? `${(i % 5) * 40}ms` : "0ms",
                  }}
                >
                  <NotificationCard title={card.title} body={card.body} icon={card.icon} dim={!on} />
                </div>
              )
            })}
          </div>

          {/* below md: the moment's two cards, stacked under the phone */}
          <div className="absolute inset-x-4 top-[calc(8vh+min(52vw,25vh)*2.16+10px)] z-20 flex flex-col gap-2 md:hidden" data-canvas-ignore>
            <AnimatePresence mode="popLayout" initial={false}>
              {night
                ? null
                : CARDS.filter((c) => c.phases.includes(phase))
                    .slice(0, 2)
                    .map((card) => (
                      <motion.div
                        key={card.title}
                        initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <NotificationCard title={card.title} body={card.body} icon={card.icon} className="py-2.5 [&_p:first-child]:text-[14px] [&_p:last-child]:text-[12.5px]" />
                      </motion.div>
                    ))}
            </AnimatePresence>
          </div>

          {/* the phone */}
          <div className={cn("absolute top-[8vh] left-1/2 z-10 -translate-x-1/2 md:top-[11vh] md:z-30 transition-transform duration-(--duration-scene) ease-(--ease-out-strong)", night && "md:-translate-x-[calc(50%+190px)]")}>
            <Phone tone={phase === 3 ? "dark" : "light"} className="w-[min(52vw,25vh)] md:w-[min(300px,36vh)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={phase}
                  className="absolute inset-0"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "scale(1.04)" }}
                  animate={{ opacity: 1, transform: "scale(1)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.52, ease: [0.23, 1, 0.32, 1] }}
                >
                  {screen}
                </motion.div>
              </AnimatePresence>
            </Phone>
          </div>

          {/* the download, beside the phone in the last phase */}
          <div
            className={cn(
              "absolute z-20 transition-[opacity,transform] duration-(--duration-scene) ease-(--ease-out-strong) max-md:inset-x-4 max-md:top-[calc(8vh+min(52vw,25vh)*2.16+10px)] md:top-[18vh] md:left-[calc(50%+40px)]",
              night ? "opacity-100 md:translate-x-0" : "pointer-events-none opacity-0 md:translate-x-6",
            )}
          >
            <DownloadPanel />
          </div>

          {/* the tab bar */}
          <nav aria-label="Trip phases" className="absolute inset-x-0 bottom-5 z-30 flex justify-center px-3 sm:bottom-8">
            <div className="flex max-w-full gap-0.5 overflow-x-auto rounded-full bg-ink p-1 shadow-(--shadow-float) [scrollbar-width:none]">
              {PHASES.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={phase === i ? "step" : undefined}
                  className={cn(
                    "relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-[14px] font-medium whitespace-nowrap transition-colors duration-(--duration-hover) sm:px-4",
                    phase === i ? "text-amber-ink" : "text-white/80 hover:text-white",
                  )}
                >
                  {phase === i ? (
                    <motion.span layoutId="hero-phase" className="absolute inset-0 rounded-full bg-amber" transition={{ type: "spring", duration: 0.45, bounce: 0.15 }} />
                  ) : null}
                  <p.Icon className="relative size-4" strokeWidth={2} />
                  <span className={cn("relative", phase !== i && "max-sm:hidden")}>{p.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  )
}
