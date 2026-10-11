import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

function StackCard({ index, count, progress, offset, children }: { index: number; count: number; progress: MotionValue<number>; offset: number; children: ReactNode }) {
  const reduced = useReducedMotion()
  // Each card shrinks a little and dims as the ones after it pile on.
  const start = index / count
  const scale = useTransform(progress, [start, 1], [1, 1 - (count - index - 1) * 0.04])
  const dim = useTransform(progress, [start, 1], [0, (count - index - 1) * 0.12])
  return (
    <div className="sticky" style={{ top: `calc(${offset}px + ${index} * clamp(16px, 2.4vw, 32px))` }}>
      <motion.div className="relative origin-top" style={reduced ? undefined : { scale }}>
        {children}
        {!reduced && <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-(--radius-panel) bg-page" style={{ opacity: dim }} />}
      </motion.div>
    </div>
  )
}

/**
 * Cards that pin one over the next as you scroll, each settling a step
 * lower than the last, the ones underneath shrinking back into a stack —
 * a process read one step at a time. Pure scroll position: nothing plays.
 */
export function StackCards({ offset = 120, gap = 96, className, children }: { offset?: number; gap?: number; className?: string; children: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  return (
    <div ref={ref} className={cn("relative flex flex-col", className)} style={{ gap }}>
      {children.map((child, i) => (
        <StackCard key={i} index={i} count={children.length} progress={scrollYProgress} offset={offset}>
          {child}
        </StackCard>
      ))}
    </div>
  )
}
