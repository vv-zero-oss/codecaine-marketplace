import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { useCanvasDesignMode } from "@canvas/react"

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  className,
}: {
  value: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [shown, setShown] = useState(reduced || designing ? value : 0)
  useEffect(() => {
    if (reduced || designing) return setShown(value)
    if (!inView) return
    const run = animate(0, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setShown(Math.round(n)) })
    return () => run.stop()
  }, [inView, value, duration, reduced, designing])
  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  )
}
