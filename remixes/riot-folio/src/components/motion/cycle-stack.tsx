import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Children, useEffect, useState, type ReactNode } from "react"

import { useCanvasDesignMode } from "@canvas/react"
import { ease } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

/**
 * A card face that changes every few seconds — one client's mark, then the
 * next — as the reference's hero cards do. A quick crossfade with a slight
 * scale, so the change reads as "another one" rather than as motion.
 *
 * Holds on the first face while being designed or under reduced motion.
 */
export function CycleStack({
  interval = 3.2,
  offset = 0,
  paused = false,
  className,
  children,
}: {
  /** Seconds each face shows. */
  interval?: number
  /** Seconds to wait before the first change, so cards don't all flip together. */
  offset?: number
  paused?: boolean
  className?: string
  children: ReactNode
}) {
  const faces = Children.toArray(children)
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const running = !paused && !reduce && !designing && faces.length > 1

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % faces.length),
      (interval + (index === 0 ? offset : 0)) * 1000,
    )
    return () => window.clearTimeout(id)
  }, [running, index, interval, offset, faces.length])

  return (
    <div className={cn("grid", className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="[grid-area:1/1]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: ease("out") } }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: ease("exit") } }}
        >
          {faces[index % faces.length]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
