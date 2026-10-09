import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** Drifts its content against the scroll by `distance` px across its pass through the viewport. */
export function Parallax({
  distance = 60,
  className,
  children,
}: {
  distance?: number
  className?: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={{ y: reduced ? 0 : y }}>{children}</motion.div>
    </div>
  )
}
