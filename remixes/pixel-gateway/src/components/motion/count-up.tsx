import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/** A number that counts up to `value` once it scrolls into view. */
export function CountUp({
  value = 100,
  duration = 1.4,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const tween = useRef<ReturnType<typeof animate> | null>(null)
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setShown(value)
      return
    }
    tween.current = animate(0, value, { duration, ease: [0.22, 0.9, 0.24, 1], onUpdate: setShown })
    return () => tween.current?.stop()
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
