import { motion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

import { useMedia } from "@/lib/use-media"
import { cn } from "@/lib/utils"

/**
 * Drifts against the scroll. `distance` is the px it travels across the
 * viewport (negative moves up faster than the page). Off under reduced motion.
 */
export function ParallaxLayer({ children, distance = -60, className }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useMedia("(prefers-reduced-motion: reduce)")
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2])
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={cn(className)}>
      {children}
    </motion.div>
  )
}
