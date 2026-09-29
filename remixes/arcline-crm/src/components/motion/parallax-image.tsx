import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * A photograph that drifts a little slower than the page as it passes — just
 * enough depth that the band reads as a window rather than a sticker.
 *
 * `distance` is the total travel in pixels across the pass (halved on small
 * screens, none for reduced motion). The image is oversized by the same
 * amount so no edge ever shows.
 */
export function ParallaxImage({
  src,
  alt,
  distance = 120,
  className,
  imageClassName,
}: {
  src: string
  alt: string
  distance?: number
  className?: string
  imageClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const small = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  const travel = reduced ? 0 : small ? distance / 2 : distance
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [-travel / 2, travel / 2])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y, top: -travel / 2, height: `calc(100% + ${travel}px)` }}
        className={cn("absolute inset-x-0 w-full object-cover", imageClassName)}
      />
    </div>
  )
}
