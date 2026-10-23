import { animate, useInView } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { useStill } from "@/components/motion"
import { cn } from "@/lib/utils"

/** A number that counts up when it scrolls into view. */
export function CountUp({
  to,
  duration = 1.6,
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number
  duration?: number
  suffix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const still = useStill()
  const [value, setValue] = useState(still ? to : 0)
  useEffect(() => {
    if (still) return setValue(to)
    if (!inView) return
    const controls = animate(0, to, { duration, ease: [0.23, 1, 0.32, 1], onUpdate: setValue })
    return () => controls.stop()
  }, [inView, to, duration, still])
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
