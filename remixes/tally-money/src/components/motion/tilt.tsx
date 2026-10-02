import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import type * as React from "react"

import { useFinePointer } from "@/components/motion/use-fine-pointer"
import { cn } from "@/lib/utils"

/**
 * Tilts its content toward the pointer, up to `max` degrees, and grows by `lift`.
 * Purpose: spatial consistency: a device on the page behaves like an object.
 */
export function Tilt({ max = 8, lift = 1.02, className, children }: { max?: number; lift?: number; className?: string; children?: React.ReactNode }) {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 20, mass: 0.6 }
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)
  const scale = useSpring(1, spring)
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
  const active = fine && !reduced

  return (
    <motion.div
      className={cn(className)}
      style={active ? { transform } : undefined}
      onPointerEnter={() => active && scale.set(lift)}
      onPointerMove={(event) => {
        if (!active) return
        const rect = event.currentTarget.getBoundingClientRect()
        px.set((event.clientX - rect.left) / rect.width)
        py.set((event.clientY - rect.top) / rect.height)
      }}
      onPointerLeave={() => {
        px.set(0.5)
        py.set(0.5)
        scale.set(1)
      }}
    >
      {children}
    </motion.div>
  )
}
