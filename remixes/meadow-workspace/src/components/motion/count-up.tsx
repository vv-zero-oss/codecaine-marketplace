import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

/**
 * A number that counts up to `value` the first time it scrolls into view.
 * `value`, `duration`, `prefix` and `suffix` are plain props; changing
 * `value` retargets the count. Reduced motion shows the final number.
 */
export function CountUp({
  value,
  duration = 1.4,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setShown(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  )
}
