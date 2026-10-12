import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

/**
 * A number that counts up to `value` the first time it scrolls into view —
 * a short ease-out, so it lands rather than spins.
 */
export function CountUp({
  value,
  duration = 1.4,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [shown, setShown] = useState(reduced || designing ? value : 0)

  useEffect(() => {
    if (reduced || designing) return setShown(value)
    if (!inView) return
    const controls = animate(0, value, { duration, ease: [0.23, 1, 0.32, 1], onUpdate: setShown })
    return () => controls.stop()
  }, [inView, value, duration, reduced, designing])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
