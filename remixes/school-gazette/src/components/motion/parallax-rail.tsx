import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * The strip down the side of a section that carries the 3D pieces. It drifts
 * `distance` px against the scroll — slower than the page, so the dice seem to
 * sit nearer the viewer than the paper does. Still under reduced motion.
 */
export function ParallaxRail({ children, distance = 40, className }: { children: ReactNode; distance?: number; className?: string }) {
  const rail = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: rail, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : distance, reduced ? 0 : -distance])
  return (
    <div ref={rail} data-canvas-ignore className={cn("flex-col items-center justify-start gap-14 border-l border-ink pt-6 pl-6", className)}>
      <motion.div data-canvas-ignore style={{ y }} className="flex flex-col items-center gap-14">
        {children}
      </motion.div>
    </div>
  )
}
