import { motionValue, useMotionValueEvent, useScroll, type MotionValue } from "motion/react"
import { useMemo, useRef, useState, type ReactNode } from "react"

import { usePinned } from "@/lib/use-media"
import { cn } from "@/lib/utils"

type SceneProps = {
  /** How many viewport heights the scene lasts. The pinned stage is one of them. */
  heightVh?: number
  className?: string
  stageClassName?: string
  children: (progress: MotionValue<number>, pinned: boolean) => ReactNode
}

/**
 * A pinned, scroll-scrubbed scene. The outer box is `heightVh` tall; inside it
 * a one-screen stage sticks while `progress` runs 0 → 1. Below 900px, or with
 * reduced motion, nothing pins: the stage flows normally and progress rests at 1.
 */
export function StickyScene({ heightVh = 240, className, stageClassName, children }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pinned = usePinned()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const rest = useMemo(() => motionValue(1), [])
  return (
    <div ref={ref} data-canvas-ignore className={cn("relative", className)} style={pinned ? { height: `${heightVh}vh` } : undefined}>
      <div data-canvas-ignore className={cn(pinned ? "sticky top-0 h-screen overflow-hidden" : "relative", stageClassName)}>
        {children(pinned ? scrollYProgress : rest, pinned)}
      </div>
    </div>
  )
}

/** Which of `count` steps the scene's progress is on. */
export function useStep(progress: MotionValue<number>, count: number): number {
  const [step, setStep] = useState(() => Math.min(count - 1, Math.floor(progress.get() * count)))
  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count)))
    setStep((prev) => (prev === next ? prev : next))
  })
  return step
}

/** Scroll the page so step `i` of a scene is the active one. */
export function scrollToStep(scene: HTMLElement | null, i: number, count: number, heightVh: number) {
  if (!scene) return
  const top = scene.getBoundingClientRect().top + window.scrollY
  const travel = (heightVh / 100 - 1) * window.innerHeight
  window.scrollTo({ top: top + travel * ((i + 0.5) / count), behavior: "smooth" })
}
