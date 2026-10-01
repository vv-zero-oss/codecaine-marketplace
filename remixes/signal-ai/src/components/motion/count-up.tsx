import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/** A number that counts up once, when it scrolls into view. */
export function CountUp({
  to = 400,
  suffix = "M+",
  duration = 1.6,
  delay = 0,
  className,
}: {
  to?: number
  suffix?: string
  /** Seconds. */
  duration?: number
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? to : 0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, to, duration, delay])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  )
}
