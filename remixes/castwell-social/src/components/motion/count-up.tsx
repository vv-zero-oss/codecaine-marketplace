import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"

/** Counts from `from` to `value` once, when it scrolls into view. */
export function CountUp({
  value = 100,
  from = 0,
  duration = 1.4,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value?: number
  from?: number
  /** Seconds. */
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const format = (n: number) => `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (designing || reduce) {
      el.textContent = format(value)
      return
    }
    if (!inView) return
    const controls = animate(from, value, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (n) => (el.textContent = format(n)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, from, duration, decimals, prefix, suffix, designing, reduce])

  return (
    <span ref={ref} className={className}>
      {format(designing || reduce ? value : from)}
    </span>
  )
}
