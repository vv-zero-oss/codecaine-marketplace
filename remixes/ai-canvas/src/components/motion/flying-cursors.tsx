import { motion, useReducedMotion, useSpring, useTransform, useVelocity, type MotionValue } from "motion/react"

import { CursorChip, type CursorTone } from "@/components/blocks/cursor-chip"
import { EASE_IN_OUT } from "@/lib/motion"
import { useScrub } from "@/lib/scrub"

/** Scattered across the stage, then gathered round the headline — as % of
 *  the stage. */
const PATHS = [
  { from: [12, 16], to: [26, 38] },
  { from: [80, 14], to: [68, 36] },
  { from: [6, 58], to: [22, 58] },
  { from: [88, 50], to: [74, 56] },
  { from: [30, 84], to: [40, 64] },
  { from: [64, 86], to: [58, 66] },
  { from: [48, 8], to: [50, 30] },
  { from: [92, 80], to: [80, 70] },
]
const TONES: CursorTone[] = ["2", "1", "4", "1", "3", "6", "1", "5"]

/**
 * A room full of pointers — people and agents — drifting on their own and,
 * as the reader scrolls, closing in on the same idea. The gathering is tied
 * to the scroll; the drift is a looping Framer Motion animation the editor's
 * Motion switch can stop. They blur with the speed of the scroll.
 */
export function FlyingCursors({
  cursors,
  progress,
  wander = 10,
}: {
  cursors: { name: string; agent: boolean }[]
  /** 0 → 1: scattered → gathered. */
  progress: MotionValue<number>
  /** How far each one wanders on its own, in px. */
  wander?: number
}) {
  const reduced = useReducedMotion()
  const velocity = useSpring(useVelocity(progress), { stiffness: 300, damping: 40 })
  const filter = useTransform(velocity, (v) => `blur(${reduced ? 0 : Math.min(6, Math.abs(v) * 5).toFixed(2)}px)`)
  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ filter }}>
      {cursors.map((cursor, i) => (
        <FlyingCursor
          key={cursor.name}
          name={cursor.name}
          agent={cursor.agent}
          tone={TONES[i % TONES.length]}
          path={PATHS[i % PATHS.length]}
          progress={progress}
          wander={reduced ? 0 : wander}
          index={i}
        />
      ))}
    </motion.div>
  )
}

function FlyingCursor({
  name,
  agent,
  tone,
  path,
  progress,
  wander,
  index,
}: {
  name: string
  agent: boolean
  tone: CursorTone
  path: { from: number[]; to: number[] }
  progress: MotionValue<number>
  wander: number
  index: number
}) {
  const left = useTransform(progress, [0, 1], [`${path.from[0]}%`, `${path.to[0]}%`])
  const top = useTransform(progress, [0, 1], [`${path.from[1]}%`, `${path.to[1]}%`])
  const opacity = useScrub(progress, [0, 0.15], [0.6, 1])
  return (
    <motion.div className="absolute" style={{ left, top, opacity }}>
      <motion.div
        animate={
          wander
            ? {
                transform: [
                  "translate3d(0px, 0px, 0)",
                  `translate3d(${wander}px, ${-wander * 0.6}px, 0)`,
                  `translate3d(${-wander * 0.5}px, ${wander * 0.8}px, 0)`,
                ],
              }
            : undefined
        }
        transition={{ duration: 4 + (index % 4) * 0.7, repeat: Infinity, repeatType: "mirror", ease: EASE_IN_OUT }}
      >
        <CursorChip name={name} agent={agent} tone={tone} />
      </motion.div>
    </motion.div>
  )
}
