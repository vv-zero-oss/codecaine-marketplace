import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { PhoneFrame } from "@/components/mock/phone-frame"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { ArriveScreen, BoardScreen, LiftScreen, RideScreen, TapScreen, TRIP_FACTS } from "./trip-screens"
import { usePinned } from "./use-pinned"

const { trip, depart, land } = TRIP_FACTS

const STEPS = [
  { name: "Tap", time: "08:31", copy: "Pick two rooftops and a time. The seat, the car to the pad and the car at the other end are one booking.", Screen: TapScreen },
  { name: "Ride", time: "08:34", copy: "A car collects you from the door. You watch it come; it watches the clock so you don't have to.", Screen: RideScreen },
  { name: "Board", time: "08:41", copy: "Up the lift, past the reader, onto the pad. No queue, no security hall, no gate change.", Screen: BoardScreen },
  { name: "Lift", time: depart, copy: `Straight up, then forward. ${trip.flightMin} minutes at 450 metres, quiet enough to finish a call.`, Screen: LiftScreen },
  { name: "Arrive", time: land, copy: "Down on the roof, out of the lift, and the next car is already at the kerb.", Screen: ArriveScreen },
] as const

/** One switch per screen, so the editor can hold the phone on any step. */
function StepAction({ index, active, onPick }: { index: number; active: boolean; onPick: (i: number | null) => void }) {
  useCanvasAction(`Trip step: ${STEPS[index].name}`, (next) => onPick((next ?? !active) ? index : null), { on: active, group: "Journey" })
  return null
}

/** The phone's screen for a step, sliding in from the direction of travel. */
function StepScreen({ index, direction, slide = 28 }: { index: number; direction: number; slide?: number }) {
  const Screen = STEPS[index].Screen
  return (
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <motion.div
        key={index}
        custom={direction}
        variants={{
          enter: (d: number) => ({ opacity: 0, y: d * slide }),
          center: { opacity: 1, y: 0 },
          exit: (d: number) => ({ opacity: 0, y: d * -slide }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
        className="absolute inset-0"
      >
        <Screen />
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * The trip, pinned: five steps on the left light up in turn as the page
 * scrolls, while the phone on the right changes screen with them. Below
 * `md` (or with reduced motion) it unpins and each step sits above its own
 * phone.
 */
export function TripJourney({
  title = "Twenty-one minutes, five screens.",
  screensPerViewport = 1,
}: {
  title?: string
  /** How many viewport heights of scroll each step holds for. */
  screensPerViewport?: number
}) {
  const pinned = usePinned()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [scrolled, setScrolled] = useState(0)
  const [forced, setForced] = useState<number | null>(null)
  const [direction, setDirection] = useState(1)
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length))
    if (next !== scrolled) {
      setDirection(next > scrolled ? 1 : -1)
      setScrolled(next)
      setForced(null)
    }
  })

  const active = forced ?? scrolled
  const pick = (i: number | null) => {
    if (i !== null) setDirection(i >= active ? 1 : -1)
    setForced(i)
  }

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return pick(i)
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + span * ((i + 0.5) / STEPS.length), behavior: "smooth" })
  }

  return (
    <section id="journey" data-header-tone="dark" className="relative">
      {STEPS.map((_, i) => (
        <StepAction key={i} index={i} active={active === i} onPick={pick} />
      ))}

      {pinned ? (
        <div ref={ref} className="relative" style={{ height: `${(STEPS.length * screensPerViewport + 1) * 100}svh` }}>
          <div data-canvas-ignore className="sticky top-0 flex h-svh items-center">
            <Container className="grid grid-cols-2 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6 lg:col-start-1">
                <p className="text-micro text-ink-3">The journey</p>
                <h2 className="type-head mt-4 max-w-[18ch] text-h3 text-balance">{title}</h2>

                <div className="relative mt-10 pl-6">
                  <div aria-hidden className="absolute top-1 bottom-1 left-0 w-px bg-line" />
                  <motion.div aria-hidden style={{ scaleY: rail }} className="absolute top-1 bottom-1 left-0 w-px origin-top bg-ink" />
                  <ol className="flex flex-col">
                    {STEPS.map((step, i) => (
                      <li key={step.name}>
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          aria-current={active === i ? "step" : undefined}
                          className={cn(
                            "group flex min-h-11 w-full items-baseline gap-4 rounded-md py-1 text-left outline-none transition-colors duration-(--duration-swap) ease-(--ease-out-strong) focus-visible:ring-[3px] focus-visible:ring-sky/35",
                            active === i ? "text-ink" : "text-ink-4 hover:text-ink-3",
                          )}
                        >
                          <span className="w-12 shrink-0 text-micro tabular-nums">{step.time}</span>
                          <span className="type-head text-h2">{step.name}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="relative mt-8 min-h-[5.5em] max-w-[38ch] pl-6 text-lead text-ink-2">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={active}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    >
                      {STEPS[active].copy}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex justify-center lg:col-span-5 lg:col-start-8">
                <PhoneFrame className="w-[min(320px,calc((100svh-8rem)*0.462))]">
                  <StepScreen index={active} direction={direction} />
                </PhoneFrame>
              </div>
            </Container>
          </div>
        </div>
      ) : (
        <Container className="py-(--spacing-section)">
          <p className="text-micro text-ink-3">The journey</p>
          <h2 className="type-head mt-4 max-w-[18ch] text-h2 text-balance">{title}</h2>
          <ol className="mt-14 flex flex-col gap-20">
            {STEPS.map((step) => (
              <Reveal as="li" key={step.name} className="grid gap-8 sm:grid-cols-2 sm:items-center">
                <div>
                  <p className="text-micro tabular-nums text-ink-3">{step.time}</p>
                  <h3 className="type-head mt-2 text-h3">{step.name}</h3>
                  <p className="mt-3 max-w-[38ch] text-body text-ink-2">{step.copy}</p>
                </div>
                <PhoneFrame className="mx-auto w-[min(280px,78vw)]">
                  <step.Screen />
                </PhoneFrame>
              </Reveal>
            ))}
          </ol>
        </Container>
      )}
    </section>
  )
}
