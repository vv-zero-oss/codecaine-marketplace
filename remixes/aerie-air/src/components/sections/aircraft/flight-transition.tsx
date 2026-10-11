import { useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

import { CornerLabels } from "@/components/blocks/corner-label"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

import { CraftPlan } from "./craft-plan"

/** The flight, as keyframes against scroll progress (0–1). */
const AT = [0, 0.22, 0.5, 0.58, 0.76, 0.9, 1]
const TILT = [0, 0, 90, 90, 90, 0, 0]
const ALT = [0, 150, 450, 450, 450, 150, 0]
const SPEED = [0, 15, 230, 290, 290, 40, 0]
const RANGE = [0, 0.03, 0.34, 0.46, 0.8, 0.95, 0.97]

function interp(p: number, ys: number[]) {
  if (p <= AT[0]) return ys[0]
  for (let i = 1; i < AT.length; i++) {
    if (p <= AT[i]) {
      const k = (p - AT[i - 1]) / (AT[i] - AT[i - 1])
      const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2 // in-out, so each phase eases
      return ys[i - 1] + (ys[i] - ys[i - 1]) * e
    }
  }
  return ys[ys.length - 1]
}

const PHASES = [
  {
    name: "Lift",
    title: "Straight up, off the roof.",
    body: "All six rotors point at the sky. The craft rises like a lift in a building — no runway, no roll, no wash of sound across the street.",
  },
  {
    name: "Transition",
    title: "The rotors tip forward.",
    body: "Climbing, the nacelles tilt together over about thirty seconds. Lift moves from the rotors to the wing, and the cabin barely notices.",
  },
  {
    name: "Cruise",
    title: "Now it is an aeroplane.",
    body: "Rotors fully forward, the wing does the carrying. At 290 km/h the blades turn slower than they did on the roof, which is why it is so quiet up here.",
  },
  {
    name: "Land",
    title: "And gently back down.",
    body: "Over the next pad the rotors swing back up, the speed bleeds off, and the craft settles onto the roof as softly as it left.",
  },
] as const

const PROFILE_W = 1000
const PROFILE_H = 220
const GROUND = 196
const px = (r: number) => 24 + r * (PROFILE_W - 48)
const py = (alt: number) => GROUND - (alt / 450) * 160

function profilePath(to: number) {
  let d = ""
  const steps = Math.max(2, Math.round(to * 140))
  for (let i = 0; i <= steps; i++) {
    const p = (i / steps) * to
    d += `${i ? "L" : "M"}${px(interp(p, RANGE)).toFixed(1)} ${py(interp(p, ALT)).toFixed(1)} `
  }
  return d
}
const FULL_PATH = profilePath(1)

/**
 * The sticky moment: a tall section whose stage stays pinned while scroll
 * flies the craft — up off the roof, through the transition, across in
 * cruise and back down. Rotor tilt, altitude and airspeed are all read off
 * scroll progress, and a caption steps through each phase.
 *
 * Below `md`, and for reduced motion, the same four phases are laid out as
 * a plain sequence with the craft drawn at each one.
 */
export function FlightTransition({
  eyebrow = "One flight, start to finish",
  title = "Watch it change its mind about what it is.",
  length = 420,
}: {
  eyebrow?: string
  title?: string
  /** Height of the scroll track, in svh. */
  length?: number
}) {
  const reduced = useReducedMotion()

  return (
    <>
      {!reduced && <PinnedFlight eyebrow={eyebrow} title={title} length={length} className="hidden md:block" />}
      <FlightSteps eyebrow={eyebrow} title={title} className={reduced ? undefined : "md:hidden"} />
    </>
  )
}

function PinnedFlight({ eyebrow, title, length, className }: { eyebrow: string; title: string; length: number; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const p = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })

  const tilt = useTransform(p, (v) => interp(v, TILT))
  const alt = useTransform(p, (v) => Math.round(interp(v, ALT)))
  const speed = useTransform(p, (v) => Math.round(interp(v, SPEED)))
  const tiltText = useTransform(tilt, (v) => `${Math.round(v)}°`)
  const altText = useTransform(alt, (v) => `${v}`)
  const speedText = useTransform(speed, (v) => `${v}`)
  const flown = useTransform(p, (v) => profilePath(v))
  const dotX = useTransform(p, (v) => `${(px(interp(v, RANGE)) / PROFILE_W) * 100}%`)
  const dotY = useTransform(p, (v) => `${(py(interp(v, ALT)) / PROFILE_H) * 100}%`)
  const lift = useTransform(p, (v) => -interp(v, ALT) / 30)

  const [phase, setPhase] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.24 ? 0 : v < 0.52 ? 1 : v < 0.78 ? 2 : 3
    setPhase((cur) => (cur === next ? cur : next))
  })

  return (
    <section ref={ref} data-header-tone="light" className={cn("relative bg-sky text-on-sky", className)} style={{ height: `${length}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-20 pb-8">
        <Container className="flex h-full flex-col">
          <CornerLabels left={eyebrow} right="Scroll to fly" className="text-on-sky-soft" />
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-10 py-6">
            <div className="flex flex-col gap-8">
              <h2 className="type-head max-w-[14ch] text-h2 text-balance">{title}</h2>
              <PhaseCaption index={phase} />
              <Readouts tilt={tiltText} alt={altText} speed={speedText} />
            </div>
            <motion.div style={{ y: lift }} className="relative mx-auto aspect-[600/560] h-full max-h-[62svh] max-w-full">
              <CraftPlan tiltValue={tilt} tone="light" className="h-full" />
            </motion.div>
          </div>
          <FlightProfile flown={flown} dotX={dotX} dotY={dotY} phase={phase} />
        </Container>
      </div>
    </section>
  )
}

function PhaseCaption({ index }: { index: number }) {
  const phase = PHASES[index]
  return (
    <div className="relative min-h-[9.5rem]" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={phase.name}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="flex max-w-[40ch] flex-col gap-2"
        >
          <p className="text-micro text-on-sky-soft tabular-nums">
            0{index + 1} / 04 · {phase.name}
          </p>
          <p className="type-head text-h4">{phase.title}</p>
          <p className="text-body text-on-sky-soft">{phase.body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Readouts({ tilt, alt, speed }: { tilt: MotionValue<string>; alt: MotionValue<string>; speed: MotionValue<string> }) {
  const cells = [
    { label: "Rotor tilt", value: tilt, unit: "" },
    { label: "Altitude", value: alt, unit: "m" },
    { label: "Airspeed", value: speed, unit: "km/h" },
  ]
  return (
    <dl className="grid max-w-md grid-cols-3 gap-4 border-t border-white/25 pt-5">
      {cells.map((c) => (
        <div key={c.label} className="flex flex-col gap-1">
          <dt className="text-micro text-on-sky-soft">{c.label}</dt>
          <dd className="type-head text-h3 tabular-nums">
            <motion.span>{c.value}</motion.span>
            {c.unit && <span className="ml-1 text-micro text-on-sky-soft">{c.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function FlightProfile({
  flown,
  dotX,
  dotY,
  phase,
}: {
  flown: MotionValue<string>
  dotX: MotionValue<string>
  dotY: MotionValue<string>
  phase: number
}) {
  return (
    <div>
      <div className="relative">
      <svg viewBox={`0 0 ${PROFILE_W} ${PROFILE_H}`} className="h-[clamp(80px,14svh,150px)] w-full" preserveAspectRatio="none" aria-hidden>
        <line x1="0" x2={PROFILE_W} y1={GROUND} y2={GROUND} stroke="var(--color-on-sky)" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
        <path d={FULL_PATH} fill="none" stroke="var(--color-on-sky)" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        <motion.path d={flown} fill="none" stroke="var(--color-on-sky)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* the aircraft's dot in HTML, so it stays round while the profile stretches */}
      <motion.span
        aria-hidden
        style={{ left: dotX, top: dotY }}
        className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-on-sky shadow-[0_0_0_4px_rgb(255_255_255/0.25)]"
      />
      </div>
      <ol className="mt-3 grid grid-cols-4 gap-4 text-micro">
        {PHASES.map((ph, i) => (
          <li
            key={ph.name}
            className={cn(
              "border-t pt-2 transition-[color,border-color] duration-(--duration-swap)",
              i === phase ? "border-on-sky text-on-sky" : "border-white/25 text-on-sky-soft",
            )}
          >
            {ph.name}
          </li>
        ))}
      </ol>
    </div>
  )
}

const STEP_STATES = [
  { tilt: 0, alt: 150, speed: 15 },
  { tilt: 45, alt: 300, speed: 140 },
  { tilt: 90, alt: 450, speed: 290 },
  { tilt: 0, alt: 0, speed: 0 },
]

function FlightSteps({ eyebrow, title, className }: { eyebrow: string; title: string; className?: string }) {
  return (
    <section data-header-tone="light" className={cn("bg-sky py-(--spacing-section) text-on-sky", className)}>
      <Container>
        <CornerLabels left={eyebrow} right="Four phases" className="text-on-sky-soft" />
        <h2 className="type-head mt-10 max-w-[14ch] text-h2 text-balance">{title}</h2>
        <ol className="mt-12 grid gap-12 sm:grid-cols-2">
          {PHASES.map((ph, i) => (
            <Reveal as="li" key={ph.name} className="flex flex-col gap-4 border-t border-white/25 pt-5">
              <p className="text-micro text-on-sky-soft">
                0{i + 1} / 04 · {ph.name}
              </p>
              <div className="mx-auto w-full max-w-[320px]">
                <CraftPlan tilt={STEP_STATES[i].tilt} tone="light" />
              </div>
              <p className="type-head text-h4">{ph.title}</p>
              <p className="text-body text-on-sky-soft">{ph.body}</p>
              <p className="text-micro text-on-sky-soft tabular-nums">
                Tilt {STEP_STATES[i].tilt}° · {STEP_STATES[i].alt} m · {STEP_STATES[i].speed} km/h
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
