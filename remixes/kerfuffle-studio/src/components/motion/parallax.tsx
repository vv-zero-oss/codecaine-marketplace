import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Drifts against the scroll: `speed` 0.2 moves a fifth of the distance the page
 * does, in the other direction; negative moves with it. Flat under reduced
 * motion.
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : [`${speed * 100}%`, `${-speed * 100}%`])
  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  )
}
