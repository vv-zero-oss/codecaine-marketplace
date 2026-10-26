import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { ActivityPill, type PillColour, type PillIcon } from "@/components/motion/activity-pill"
import { cn } from "@/lib/utils"

const ACTIVITIES: { label: string; icon: PillIcon; colour: PillColour }[] = [
  { label: "Running", icon: "run", colour: "lime" },
  { label: "Yoga", icon: "yoga", colour: "spruce" },
  { label: "Cycling", icon: "ride", colour: "red" },
  { label: "Strength", icon: "lift", colour: "mist" },
  { label: "Swim", icon: "swim", colour: "blue" },
  { label: "Sleep", icon: "sleep", colour: "paper" },
  { label: "Hiking", icon: "hike", colour: "spruce" },
  { label: "Cardio", icon: "heart", colour: "red" },
]

/** How many samples of the fall to hand Framer Motion. Linear between them,
 *  so 28 points read as a smooth parabola. */
const STEPS = 28

type Flight = {
  id: number
  x: number
  y: number
  activity: (typeof ACTIVITIES)[number]
  keyframes: { x: number[]; y: number[]; rotate: number[]; scale: number[]; opacity: number[] }
  duration: number
}

const random = (min: number, max: number) => min + Math.random() * (max - min)

/**
 * Plots one pill's flight from where it was clicked: thrown up and sideways,
 * pulled down by gravity, spinning as it goes, fading over its last third.
 * The whole arc is computed up front and played as keyframes, so it runs
 * through the Web Animations path the editor's Motion switch can stop.
 */
function plot(gravity: number, spread: number, lift: number, duration: number, reduced: boolean) {
  if (reduced) {
    return { x: [0, 0], y: [0, 0], rotate: [0, 0], scale: [0.9, 1], opacity: [1, 0] }
  }
  const vx = random(-spread, spread)
  const vy = -random(lift * 0.6, lift)
  const spin = random(-260, 260)
  const r0 = random(-25, 25)
  const frames = { x: [] as number[], y: [] as number[], rotate: [] as number[], scale: [] as number[], opacity: [] as number[] }
  for (let i = 0; i <= STEPS; i++) {
    const p = i / STEPS
    const t = p * duration
    frames.x.push(vx * t)
    frames.y.push(vy * t + 0.5 * gravity * t * t)
    frames.rotate.push(r0 + spin * t)
    // Pops from 40% to full size in the first tenth: the "pop" of the spawn.
    frames.scale.push(p < 0.1 ? 0.4 + (p / 0.1) * 0.6 : 1)
    frames.opacity.push(p < 0.65 ? 1 : 1 - (p - 0.65) / 0.35)
  }
  return frames
}

/**
 * Activity pills that pop out wherever you click, then fall away.
 *
 * Click (or tap) anywhere in its area and `count` random pills burst from
 * the pointer, arc up and out, drop under `gravity` and fade — so the hero is
 * quiet until you touch it, and then it answers. Clicks on links and buttons
 * are left alone. One small burst plays on load (`intro`) so a visitor learns
 * the page responds. For reduced motion a pill just appears and fades where
 * it was clicked.
 *
 * In the editor, the "Burst pills" action fires one from the centre.
 */
export function PillBurst({
  count = 3,
  gravity = 2200,
  spread = 380,
  lift = 900,
  duration = 1.5,
  maxPills = 24,
  intro = true,
  className,
  children,
}: {
  /** Pills per click. */
  count?: number
  /** Downward pull, in px/s². */
  gravity?: number
  /** Widest sideways throw, in px/s. */
  spread?: number
  /** Strongest upward throw, in px/s. */
  lift?: number
  /** Seconds from spawn to gone. */
  duration?: number
  /** Most pills on screen at once; the oldest go first. */
  maxPills?: number
  /** Play one burst on load. */
  intro?: boolean
  className?: string
  children?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const next = useRef(0)
  const [flights, setFlights] = useState<Flight[]>([])
  const reduced = useReducedMotion() ?? false
  const { designing } = useCanvasDesignMode()

  const burst = useCallback(
    (x: number, y: number) => {
      const born: Flight[] = Array.from({ length: count }, () => ({
        id: next.current++,
        x,
        y,
        activity: ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)],
        keyframes: plot(gravity, spread, lift, duration, reduced),
        duration: reduced ? 0.9 : duration,
      }))
      setFlights((all) => [...all, ...born].slice(-maxPills))
    },
    [count, gravity, spread, lift, duration, reduced, maxPills],
  )

  const centre = useCallback(() => {
    const box = ref.current?.getBoundingClientRect()
    if (box) burst(box.width / 2, box.height * 0.42)
  }, [burst])

  useCanvasAction("Burst pills", () => centre(), { group: "Hero" })

  useEffect(() => {
    if (!intro || designing) return
    const timer = window.setTimeout(centre, 900)
    return () => window.clearTimeout(timer)
    // Once, on mount — not again when a prop changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("a, button, input, textarea, select")) return
    const box = event.currentTarget.getBoundingClientRect()
    burst(event.clientX - box.left, event.clientY - box.top)
  }

  return (
    <div ref={ref} onPointerDown={onPointerDown} className={cn("relative", className)}>
      {children}
      <div aria-hidden data-canvas-ignore className="pointer-events-none absolute inset-0 z-20">
        {flights.map((flight) => (
          <motion.div
            key={flight.id}
            className="absolute"
            style={{ left: flight.x, top: flight.y }}
            initial={false}
            animate={flight.keyframes}
            transition={{ duration: flight.duration, ease: "linear" }}
            onAnimationComplete={() => setFlights((all) => all.filter((f) => f.id !== flight.id))}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <ActivityPill {...flight.activity} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
