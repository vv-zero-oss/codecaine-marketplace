import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A figure that keeps ticking while the page is open — the agents are
 * working right now, and the number says so. It steps on an interval rather
 * than animating, so it reads as a live meter, not a flourish. Frozen while
 * designing, with reduced motion, and while `paused`.
 */
export function LiveCounter({
  start = 0,
  rate = 1,
  decimals = 0,
  prefix = "",
  suffix = "",
  interval = 900,
  paused = false,
  className,
}: {
  start?: number
  /** How much it grows per second. */
  rate?: number
  decimals?: number
  prefix?: string
  suffix?: string
  /** Milliseconds between steps. */
  interval?: number
  paused?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [value, setValue] = useState(start)
  const timer = useRef<number | null>(null)

  useEffect(() => setValue(start), [start])

  useEffect(() => {
    if (paused || reduced || designing) return
    timer.current = window.setInterval(() => {
      // A little jitter, so six counters never step in lockstep.
      setValue((v) => v + rate * (interval / 1000) * (0.6 + Math.random() * 0.8))
    }, interval)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
      timer.current = null
    }
  }, [rate, interval, paused, reduced, designing])

  const text = value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {text}
      {suffix}
    </span>
  )
}
