import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * Text that types itself out, holds, and types again — the prompt box in
 * the drafting card. A timer, not a library, and cleared on unmount; shown
 * whole while designing or with reduced motion.
 */
export function Typewriter({
  text = "",
  speed = 38,
  hold = 2400,
  loop = true,
  paused = false,
  className,
}: {
  text?: string
  /** Milliseconds per character. */
  speed?: number
  /** Milliseconds the full line holds before it types again. */
  hold?: number
  loop?: boolean
  paused?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing || paused
  const [count, setCount] = useState(still ? text.length : 0)

  useEffect(() => {
    if (still) {
      setCount(text.length)
      return
    }
    setCount(0)
    let i = 0
    let timer: number
    const tick = () => {
      i += 1
      setCount(i)
      if (i < text.length) timer = window.setTimeout(tick, speed)
      else if (loop)
        timer = window.setTimeout(() => {
          i = 0
          setCount(0)
          timer = window.setTimeout(tick, speed)
        }, hold)
    }
    timer = window.setTimeout(tick, 400)
    return () => window.clearTimeout(timer)
  }, [text, speed, hold, loop, still])

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {text.slice(0, count)}
      <span className="ml-px inline-block h-[1.05em] w-px translate-y-[0.15em] bg-current motion-safe:animate-pulse" />
    </span>
  )
}
