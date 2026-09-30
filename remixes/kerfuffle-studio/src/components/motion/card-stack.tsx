import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Cards that pile up as you scroll: the section pins, and each card rides up
 * from below and lands a few pixels above the one before, so the frames of the
 * earlier ones still peek out on top. `step` is how far each one sits above
 * the last; `pin` is how many screens of scroll the pile takes.
 */
export function CardStack({
  items,
  step = 14,
  pin = 1,
  header,
  footer,
  overlay,
  className,
}: {
  items: ReactNode[]
  step?: number
  pin?: number
  header?: ReactNode
  footer?: ReactNode
  overlay?: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  return (
    <div ref={ref} className={cn("relative", className)} style={{ height: reduced ? "auto" : `${100 + pin * 100}svh` }}>
      <div
        data-canvas-ignore
        className={cn("flex flex-col items-center justify-center gap-8 py-24 md:gap-10", !reduced && "sticky top-0 h-svh pt-20 pb-6")}
      >
        {header}
        <div className="relative w-full max-w-[64rem] px-gutter" style={{ height: "min(62svh, 38rem)" }}>
          {items.map((item, i) => (
            <StackCard key={i} index={i} count={items.length} progress={scrollYProgress} step={step} reduced={!!reduced}>
              {item}
            </StackCard>
          ))}
        </div>
        {footer}
        {overlay}
      </div>
    </div>
  )
}

function StackCard({
  children,
  index,
  count,
  progress,
  step,
  reduced,
}: {
  children: ReactNode
  index: number
  count: number
  progress: MotionValue<number>
  step: number
  reduced: boolean
}) {
  const start = index === 0 ? -1 : (index - 1) / (count - 1)
  const end = index === 0 ? 0 : index / (count - 1)
  const y = useTransform(progress, [start, end], ["110svh", `${-(count - 1 - index) * 0 - index * step}px`])
  const scale = useTransform(progress, [end, 1], [1, 1 - (count - 1 - index) * 0.02 * Math.min(1, step)])
  return (
    <motion.div
      className="absolute inset-x-gutter top-0 h-full bg-night"
      style={reduced ? { top: index * -step } : { y, scale, zIndex: index, transformOrigin: "top center" }}
    >
      {children}
    </motion.div>
  )
}
