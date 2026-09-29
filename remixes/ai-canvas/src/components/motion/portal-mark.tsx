import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { pexels, photos } from "@/content"
import { BLUR, DURATION, EASE_OUT } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * A square of photograph with a round window cut through it, so whatever is
 * behind — the closing glow — shows through the middle. The photographs
 * change behind the cut with a blur crossfade; the window stays still.
 *
 * The window is 76% of the square, a mask rather than an element, so the
 * square stays one layer. Holds still under reduced motion and whenever the
 * editor's Motion switch is not on Playing.
 */
export function PortalMark({
  interval = 1.6,
  start = 11,
  className,
}: {
  /** Seconds each photograph stays. */
  interval?: number
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
    <div
      className={cn(
        "relative size-phi-7 overflow-hidden bg-night lg:size-phi-8 [mask-image:radial-gradient(circle_closest-side,transparent_76%,black_76.5%)]",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={photo.id}
          src={pexels(photo, 320)}
          alt=""
          className="absolute inset-0 size-full object-cover grayscale"
          initial={{ opacity: 0, filter: `blur(${BLUR / 2}px)` }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: `blur(${BLUR / 2}px)` }}
          transition={{ duration: DURATION.swap, ease: EASE_OUT }}
        />
      </AnimatePresence>
    </div>
  )
}
