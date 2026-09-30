import { useEffect, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

type TypeLineProps = {
  text: string
  /** Characters per second. */
  speed?: number
  /** Seconds after it scrolls into view before the first character. */
  delay?: number
  /** Called once the whole line has been typed. */
  onDone?: () => void
  className?: string
}

/**
 * A question typed into the ask bar, a character at a time, the first time it
 * is seen — the one place the page shows Glovebox being asked something.
 * Written out in full at once with reduced motion or in the editor.
 */
export function TypeLine({ text, speed = 38, delay = 0.4, onDone, className }: TypeLineProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const instant = reduce || designing
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (instant) {
      setCount(text.length)
      return
    }
    if (!inView) return
    setCount(0)
    let i = 0
    let tick: number
    const start = window.setTimeout(() => {
      tick = window.setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) window.clearInterval(tick)
      }, 1000 / speed)
    }, delay * 1000)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(tick)
    }
  }, [inView, instant, text, speed, delay])

  const done = count >= text.length
  useEffect(() => {
    if (done && inView) onDone?.()
  }, [done, inView, onDone])

  return (
    <span ref={ref} className={cn("relative", className)}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="sr-only">{text}</span>
      {!done && (
        <span aria-hidden="true" className="ml-px inline-block h-[1.1em] w-px translate-y-[0.2em] animate-caret bg-ink" />
      )}
    </span>
  )
}
