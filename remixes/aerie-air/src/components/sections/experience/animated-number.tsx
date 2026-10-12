import { useEffect, useRef, useState } from "react"
import { animate, useReducedMotion } from "motion/react"

/**
 * A number that glides to its new value when it changes — a fare that
 * re-prices, a minute count that settles. Short ease-out, so it lands.
 */
export function AnimatedNumber({
  value,
  duration = 0.45,
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
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(value)
  const from = useRef(value)

  useEffect(() => {
    if (reduced) {
      from.current = value
      return setShown(value)
    }
    const controls = animate(from.current, value, {
      duration,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => {
        from.current = v
        setShown(v)
      },
    })
    return () => controls.stop()
  }, [value, duration, reduced])

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {Math.round(shown).toLocaleString("en-US")}
      {suffix}
    </span>
  )
}
