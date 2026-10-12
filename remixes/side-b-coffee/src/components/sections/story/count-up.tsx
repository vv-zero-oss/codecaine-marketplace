import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A number that counts up from zero the first time it scrolls into view —
 * 1.6s on a strong ease-out, so it races and then settles. Reduced motion
 * and the editor show the final figure.
 */
export function CountUp({
  value = 100,
  duration = 1.6,
  prefix = "",
  suffix = "",
  className,
}: {
  value?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
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
    const controls = animate(0, value, { duration, ease: [0.23, 1, 0.32, 1], onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value, duration, still])

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {prefix}
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  )
}
