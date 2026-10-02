import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

/** Counts from 0 to `value` when it scrolls into view (and again if `value` changes). Numerals stay tabular so the width doesn't jitter. */
export function CountUp({
  value = 100,
  decimals = 0,
  duration = 1.4,
  prefix = "",
  suffix = "",
  className,
}: {
  value?: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)
  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setShown(value)
      return
    }
    const controls = animate(0, value, { duration, ease: [0.23, 1, 0.32, 1], onUpdate: setShown })
    return () => controls.stop()
  }, [inView, value, duration, reduced])
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  )
}
