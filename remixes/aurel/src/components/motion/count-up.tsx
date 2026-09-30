import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

/** A number that counts up from zero the first time it is seen. */
export function CountUp({ value, suffix = "", duration = 1.6, className }: { value: number; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)
  useEffect(() => {
    if (!seen) return
    if (reduced) return setShown(value)
    const controls = animate(0, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [seen, value, duration, reduced])
  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  )
}
