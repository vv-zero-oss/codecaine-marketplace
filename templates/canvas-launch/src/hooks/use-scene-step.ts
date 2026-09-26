import { useState, type RefObject } from "react"
import { useMotionValueEvent, useScroll, type MotionValue } from "motion/react"

/**
 * Which beat of a pinned scene the reader is on.
 *
 * Each scene is a tall section with a sticky, screen-high stage inside it. The
 * section's scroll progress is cut into `steps` equal beats; the beat changes
 * are what trigger the timed transitions (a headline swap, a camera move) — the
 * way the reference plays: scrolling decides *when*, the animation decides *how*.
 * `progress` is handed back too, for the few things that are scrubbed instead.
 */
export function useSceneStep(target: RefObject<HTMLElement | null>, steps: number) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] })
  const [step, setStep] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(steps - 1, Math.max(0, Math.floor(p * steps)))
    setStep((current) => (current === next ? current : next))
  })
  return { step, progress: scrollYProgress as MotionValue<number> }
}
