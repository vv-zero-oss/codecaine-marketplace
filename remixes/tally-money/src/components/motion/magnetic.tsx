import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import type * as React from "react"

import { useFinePointer } from "@/components/motion/use-fine-pointer"
import { cn } from "@/lib/utils"

/**
 * Pulls its content toward the pointer, then lets go with a spring.
 * `strength` is the share of the pointer's offset it follows (0 to 1).
 * Purpose: feedback: the control leans in before it is pressed.
 */
export function Magnetic({ strength = 0.25, className, children }: { strength?: number; className?: string; children?: React.ReactNode }) {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const transform = useMotionTemplate`translate(${sx}px, ${sy}px)`
  const active = fine && !reduced

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={active ? { transform } : undefined}
      onPointerMove={(event) => {
        if (!active) return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
