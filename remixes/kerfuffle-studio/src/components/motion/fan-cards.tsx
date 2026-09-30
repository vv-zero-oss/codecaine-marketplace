import { motion, useInView } from "motion/react"
import { useRef, type ReactNode } from "react"

import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * Cards that arrive stacked and fan out when they scroll into view, each to
 * its own tilt. `spread` scales the tilt and the overlap.
 */
export function FanCards({
  children,
  spread = 1,
  className,
}: {
  children: ReactNode[]
  spread?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" })
  const { designing } = useCanvasDesignMode()
  const open = inView || designing
  const mid = (children.length - 1) / 2
  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-0", className)}>
      {children.map((child, i) => {
        const offset = i - mid
        return (
          <motion.div
            key={i}
            className="w-full max-w-[22rem] md:-mx-[1.5%] md:w-1/3 md:max-w-none"
            style={{ zIndex: i === Math.round(mid) ? 2 : 1 }}
            initial={designing ? false : { rotate: 0, x: `${-offset * 90}%`, y: 60, opacity: 0 }}
            animate={
              open
                ? { rotate: offset * 4 * spread, x: "0%", y: Math.abs(offset) * 18 * spread, opacity: 1 }
                : undefined
            }
            whileHover={{ rotate: 0, y: -12, zIndex: 3, transition: { type: "spring", stiffness: 400, damping: 26 } }}
            transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.1 + Math.abs(offset) * 0.08 }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}
