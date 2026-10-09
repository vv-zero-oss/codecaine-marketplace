import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A card that leans toward the pointer in 3D.
 *
 * Every knob is a scalar prop, read live, so the editor can retune the lean
 * without opening the code. Children can sit above the card face with
 * `translate-z-*` utilities (the root preserves 3D). On touch screens and under
 * reduced motion the card simply sits flat.
 */
export function TiltCard({
  maxTilt = 10,
  perspective = 900,
  lift = 0,
  glare = true,
  className,
  children,
  ...props
}: {
  /** Largest lean, in degrees. */
  maxTilt?: number
  /** Camera distance in px; smaller is more dramatic. */
  perspective?: number
  /** How far the card rises toward you while hovered, in px. */
  lift?: number
  /** A hard-edged highlight that follows the pointer. */
  glare?: boolean
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentProps<"div">, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "style">) {
  const reduced = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const hover = useMotionValue(0)
  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring)
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring)
  const z = useSpring(useTransform(hover, [0, 1], [0, lift]), spring)
  const glareX = useTransform(px, [0, 1], ["0%", "100%"])
  const glareY = useTransform(py, [0, 1], ["0%", "100%"])
  const glareOpacity = useTransform(hover, [0, 1], [0, 1])

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === "touch") return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
    hover.set(1)
  }
  const leave = () => {
    px.set(0.5)
    py.set(0.5)
    hover.set(0)
  }

  return (
    <div style={{ perspective }} className="[transform-style:preserve-3d]">
      <motion.div
        onPointerMove={move}
        onPointerLeave={leave}
        style={reduced ? undefined : { rotateX, rotateY, z, transformStyle: "preserve-3d" }}
        className={cn("relative", className)}
        {...props}
      >
        {children}
        {glare && !reduced ? (
          <motion.span
            aria-hidden
            data-canvas-ignore
            style={{ left: glareX, top: glareY, opacity: glareOpacity }}
            className="pointer-events-none absolute size-24 -translate-x-1/2 -translate-y-1/2 bg-fg/15 [clip-path:polygon(30%_0,70%_0,70%_30%,100%_30%,100%_70%,70%_70%,70%_100%,30%_100%,30%_70%,0_70%,0_30%,30%_30%)]"
          />
        ) : null}
      </motion.div>
    </div>
  )
}
