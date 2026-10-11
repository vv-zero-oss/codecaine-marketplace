import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

/**
 * A number that counts up to its value the first time it is seen, and
 * glides to a new value when the prop changes. Tabular figures, so the
 * width never jitters.
 */
export function CountUp({ value = 0, decimals = 0, duration = 1.1, prefix = "", suffix = "", className }: { value?: number; decimals?: number; duration?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [shown, setShown] = useState(reduced || designing ? value : 0)
  const from = useRef(0)
  useEffect(() => {
    if (reduced || designing) {
      setShown(value)
      return
    }
    if (!inView) return
    const controls = animate(from.current, value, { duration, ease: [0.23, 1, 0.32, 1], onUpdate: setShown })
    from.current = value
    return () => controls.stop()
  }, [value, inView, duration, reduced, designing])
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  )
}
