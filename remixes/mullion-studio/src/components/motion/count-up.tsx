import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { EASINGS, type EasingName } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** A number that counts up to `value` the first time it scrolls into view. */
export function CountUp({
  value = 100,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  easing = "expo",
  className,
}: {
  value?: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  easing?: EasingName
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduced) return setShown(value)
    const controls = animate(0, value, { duration, ease: EASINGS[easing], onUpdate: setShown })
    return () => controls.stop()
  }, [inView, value, duration, easing, reduced])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  )
}
