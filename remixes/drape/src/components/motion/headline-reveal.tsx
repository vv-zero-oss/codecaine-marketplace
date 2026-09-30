import { useCanvasDesignMode } from "@canvas/react"
import { animate, useMotionTemplate, useMotionValue, useReducedMotion, motion } from "motion/react"
import { useEffect } from "react"

import { cn } from "@/lib/utils"
import { ease } from "@/lib/tokens"

/**
 * HeadlineReveal — the hero's "script word + sans words" headline, written in
 * from left to right.
 *
 * A soft-edged mask sweeps across the line (the letters arrive blurred-in, one
 * after another, as in the reference), rather than splitting the text into
 * spans — the script face is connected, and spans would break its joins.
 * `duration` 1000ms and the ease-out were counted off the recording: fifteen
 * frames at 15fps from the first letter to the last.
 */
export function HeadlineReveal({
  script = "Wear",
  rest = "it first",
  duration = 1000,
  delay = 250,
  feather = 14,
  replay = 0,
  className,
}: {
  script?: string
  rest?: string
  /** Milliseconds for the sweep. */
  duration?: number
  delay?: number
  /** Width of the soft edge, as a percentage of the line. */
  feather?: number
  /** Change to play it again. */
  replay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const progress = useMotionValue(reduced || designing ? 100 + feather : -feather)
  const mask = useMotionTemplate`linear-gradient(90deg, #000 ${progress}%, transparent calc(${progress}% + ${feather}%))`

  useEffect(() => {
    if (reduced || designing) {
      progress.set(100 + feather)
      return
    }
    progress.set(-feather)
    const controls = animate(progress, 100 + feather, { duration: duration / 1000, delay: delay / 1000, ease: ease.out })
    return () => controls.stop()
  }, [duration, delay, feather, replay, reduced, designing, progress])

  return (
    <motion.h1
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      className={cn(
        "font-display leading-[0.86] font-semibold tracking-[-0.045em] whitespace-nowrap text-ink",
        className,
      )}
    >
      <span className="mr-[0.3em] inline-block -translate-y-[0.02em] font-script font-normal tracking-[-0.01em]">
        {script}
      </span>
      {rest}
    </motion.h1>
  )
}
