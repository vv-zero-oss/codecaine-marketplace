import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

/**
 * A number that counts up from zero when it scrolls into view, and tweens from
 * where it is whenever `value` changes after that.
 */
export function CountUp({
  value = 349904,
  prefix = "$",
  duration = 1.4,
  className,
}: {
  value?: number
  prefix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(value)
  const current = useRef(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setShown(value)
      return
    }
    // First time: from zero, slowly. After that: from where it is, quickly.
    const first = !started.current
    started.current = true
    const controls = animate(current.current, value, {
      duration: first ? duration : Math.min(duration, 0.6),
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (latest) => {
        current.current = latest
        setShown(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, reduced, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString("en-US")}
    </span>
  )
}
