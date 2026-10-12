import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion, type AnimationPlaybackControls } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A figure that rolls to its value — from zero the first time it is seen,
 * then from wherever it is to each new value, so dragging a slider retargets
 * it mid-roll instead of restarting. Still for reduced motion and while the
 * page is being designed.
 */
export function RollingNumber({
  value = 0,
  duration = 0.9,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value?: number
  /** Seconds per roll. */
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const [shown, setShown] = useState(still ? value : 0)
  const current = useRef(shown)
  const controls = useRef<AnimationPlaybackControls | null>(null)

  useEffect(() => {
    if (still) {
      current.current = value
      setShown(value)
      return
    }
    if (!inView) return
    controls.current?.stop()
    controls.current = animate(current.current, value, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => {
        current.current = v
        setShown(v)
      },
    })
    return () => controls.current?.stop()
  }, [inView, value, duration, still])

  const text = shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {text}
      {suffix}
    </span>
  )
}
