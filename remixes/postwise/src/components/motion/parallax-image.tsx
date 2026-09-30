import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A photograph that drifts a little slower than the page, so what sits on
 * it reads as nearer. Oversized by `distance` either way so no edge shows;
 * still while designing and with reduced motion.
 */
export function ParallaxImage({
  src = "",
  alt = "",
  distance = 48,
  className,
}: {
  src?: string
  alt?: string
  /** Pixels it travels either way across the section's pass. */
  distance?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [-distance, distance])

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, top: -distance, bottom: -distance, height: `calc(100% + ${distance * 2}px)` }}
        className="absolute inset-x-0 w-full object-cover"
      />
    </div>
  )
}
