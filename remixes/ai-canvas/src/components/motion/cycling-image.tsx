import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { pexels, photos } from "@/content"
import { BLUR, DURATION, EASE_OUT } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * A round photograph set into a line of text that keeps changing — "every
 * frame evolves", shown rather than said. Each change is a blur crossfade.
 * It holds still under reduced motion and whenever the editor's Motion switch
 * is not on Playing.
 */
export function CyclingImage({
  interval = 1.4,
  start = 4,
  className,
}: {
  /** Seconds each photograph stays. */
  interval?: number
  /** Which photograph to begin on. */
  start?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { motion: mode } = useCanvasDesignMode()
  const [index, setIndex] = useState(start)
  const playing = !reduced && mode === "play"

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setIndex((i) => i + 1), interval * 1000)
    return () => window.clearInterval(id)
  }, [playing, interval])

  const photo = photos[index % photos.length]
  return (
    <span
      className={cn(
        "relative mx-[0.2em] inline-block size-[1.12em] translate-y-[0.14em] overflow-hidden rounded-full bg-field align-baseline",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={photo.id}
          src={pexels(photo, 120)}
          alt=""
          className="absolute inset-0 size-full object-cover"
          initial={{ opacity: 0, filter: `blur(${BLUR / 2}px)` }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: `blur(${BLUR / 2}px)` }}
          transition={{ duration: DURATION.swap, ease: EASE_OUT }}
        />
      </AnimatePresence>
    </span>
  )
}
