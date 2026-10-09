import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A figure that counts up to its value the first time it comes into view —
 * once, so a balance reads as live rather than as decoration. Shown at its
 * final value while designing and with reduced motion.
 */
export function CountUp({
  value = 0,
  duration = 1.2,
  prefix = "$",
  decimals = 2,
  className,
}: {
  value?: number
  /** Seconds to count. */
  duration?: number
  prefix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const [shown, setShown] = useState(still ? value : 0)

  useEffect(() => {
    if (still) {
      setShown(value)
      return
    }
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setShown(v),
    })
    return () => controls.stop()
  }, [inView, value, duration, still])

  const text = shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {text}
    </span>
  )
}
