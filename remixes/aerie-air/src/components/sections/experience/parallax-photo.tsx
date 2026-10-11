import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { Photo } from "@/components/blocks/photo"
import type { PhotoName } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * A portrait photo card that drifts against the scroll by `distance` px —
 * the small offset card beside a large one, moving a little slower so the
 * pair reads as two planes rather than one flat collage.
 */
export function ParallaxPhoto({
  name,
  distance = 60,
  position = "center",
  label,
  className,
}: {
  name: PhotoName
  distance?: number
  position?: string
  /** A tiny caption pinned to the card's lower corner. */
  label?: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2])
  const still = reduced || designing

  return (
    <motion.figure ref={ref} style={still ? undefined : { y }} className={cn("relative m-0 shadow-(--shadow-photo)", "rounded-(--radius-photo)", className)}>
      <Photo name={name} position={position} className="size-full" />
      {label && (
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-page/85 px-2.5 py-1 text-micro text-ink backdrop-blur-sm">
          {label}
        </figcaption>
      )}
    </motion.figure>
  )
}
