import type * as React from "react"
import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

function Column({
  progress,
  shift,
  className,
  children,
}: {
  progress: MotionValue<number>
  shift: number
  className?: string
  children?: React.ReactNode
}) {
  const y = useTransform(progress, [0, 1], [shift, -shift])
  return (
    <motion.div style={{ y }} className={cn("flex flex-col gap-4", className)}>
      {children}
    </motion.div>
  )
}

/**
 * Cards in columns that slide against each other as the section scrolls —
 * the middle column faster than its neighbours — so a wall of text reads
 * as depth rather than a grid. Flat on small screens, while designing, and
 * with reduced motion.
 */
export function ParallaxColumns({
  columns = 3,
  distance = 60,
  className,
  items,
}: {
  columns?: number
  /** Pixels the fastest column travels either way. */
  distance?: number
  className?: string
  items: React.ReactNode[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const flat = reduced || designing
  const narrow = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches

  const cols = Array.from({ length: columns }, (_, c) => items.filter((_, i) => i % columns === c))
  const shifts = cols.map((_, c) => (flat || narrow ? 0 : c % 2 === 1 ? distance : distance * 0.4))

  return (
    <div ref={ref} className={cn("grid gap-4 md:grid-cols-3", className)}>
      {cols.map((col, c) => (
        <Column key={c} progress={scrollYProgress} shift={shifts[c]} className={c === 1 ? "md:pt-12" : undefined}>
          {col}
        </Column>
      ))}
    </div>
  )
}
