import type * as React from "react"
import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A photo that opens from a smaller window the first time it scrolls into
 * view (a clip-path inset), then drifts a little slower than the page while
 * it passes. Still at rest for reduced motion and while designing.
 */
export function ParallaxPhoto({
  src,
  alt,
  drift = 6,
  reveal = true,
  className,
  children,
}: {
  src: string
  alt: string
  /** How far the image drifts across the pass, in % of its height. */
  drift?: number
  reveal?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const frame = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] })
  const transform = useTransform(scrollYProgress, [0, 1], [`translateY(${-drift}%) scale(1.14)`, `translateY(${drift}%) scale(1.14)`])

  return (
    <motion.div
      ref={frame}
      initial={still || !reveal ? false : { clipPath: "inset(10% 8% 10% 8% round 24px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
      className={cn("relative overflow-hidden rounded-(--radius-panel) bg-panel-deep", className)}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={still ? undefined : { transform }}
        className="absolute inset-0 size-full object-cover"
      />
      {children}
    </motion.div>
  )
}
