import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef, type ReactNode } from "react"

import { useRange } from "@/lib/scroll"
import { cn } from "@/lib/utils"

/**
 * Cards that pin one over another as they are scrolled.
 *
 * Each card sticks a little lower than the one before, and the ones
 * underneath recede — a touch smaller and dimmer — so the pile reads as a
 * sequence you are working through. `step` is the gap between pinned
 * cards, `recede` how much smaller each buried card becomes.
 */
export function StackCards({
  children,
  top = 96,
  step = 22,
  recede = 0.045,
  className,
}: {
  children: ReactNode[]
  top?: number
  step?: number
  recede?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const count = children.length
  return (
    <div ref={ref} className={cn("relative flex flex-col gap-[12vh] pb-[6vh]", className)}>
      {children.map((child, index) => (
        <StackCard key={index} index={index} count={count} progress={scrollYProgress} top={top + index * step} recede={recede}>
          {child}
        </StackCard>
      ))}
    </div>
  )
}

function StackCard({ children, index, count, progress, top, recede }: { children: ReactNode; index: number; count: number; progress: MotionValue<number>; top: number; recede: number }) {
  const reduced = useReducedMotion()
  const start = index / count
  const scale = useTransform(progress, [start, 1], [1, reduced ? 1 : 1 - (count - 1 - index) * recede])
  const dim = useRange(progress, [start, 1], [0, reduced ? 0 : (count - 1 - index) * 0.08])
  return (
    <div className="sticky" style={{ top }} data-canvas-ignore>
      <motion.div style={{ scale }} className="relative origin-top">
        {children}
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.div>
    </div>
  )
}
