import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"

import { useCanvasDesignMode } from "@canvas/react"
import { Duotone } from "@/components/media/media"
import { TONES } from "@/components/media/tone"
import { ABOUT, pexels } from "@/content"
import { ease } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

/**
 * A handful of photographs dealt out like cards when they scroll into view:
 * stacked at first, then fanned across the column. Each is in a different
 * tone, so the fan is also the palette. One lifts forward under the cursor.
 */
export function PhotoFan({
  spread = 1,
  tilt = 5,
  stagger = 0.06,
  className,
}: {
  /** 0 keeps them stacked, 1 fans them to the column's width. */
  spread?: number
  /** Degrees each card leans, alternating. */
  tilt?: number
  stagger?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const open = inView || reduce || designing
  const photos = ABOUT.photos
  const mid = (photos.length - 1) / 2

  return (
    <div ref={ref} className={cn("relative flex h-44 items-center justify-center sm:h-56", className)}>
      {photos.map((photo, i) => {
        const offset = (i - mid) * spread
        return (
          <motion.div
            key={photo.id}
            className="absolute w-[34%] max-w-[11rem] cursor-default"
            initial={false}
            animate={{
              x: open ? `${offset * 58}%` : "0%",
              rotate: open ? (i % 2 ? tilt : -tilt) * 0.8 : (i - mid) * 2,
              opacity: open ? 1 : 0,
            }}
            whileHover={reduce ? undefined : { y: -10, rotate: 0, zIndex: 10, transition: { duration: 0.25, ease: ease("out") } }}
            transition={reduce || designing ? { duration: 0 } : { duration: 0.8, delay: i * stagger, ease: ease("out") }}
            style={{ zIndex: photos.length - Math.abs(i - Math.round(mid)) }}
          >
            <Duotone
              src={pexels(photo.id, 400)}
              alt={photo.alt}
              tone={TONES[(i + 1) % TONES.length]}
              className="aspect-[4/3] rounded-[var(--radius-media)] shadow-[var(--shadow-media)] ring-2 ring-ground"
            />
          </motion.div>
        )
      })}
    </div>
  )
}
