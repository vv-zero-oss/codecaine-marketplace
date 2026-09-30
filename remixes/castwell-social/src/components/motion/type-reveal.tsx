import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"
import { cn } from "@/lib/utils"

/**
 * Types a line in behind a solid block: the block sits over the letters not
 * yet written and shrinks as each one lands. Used for the one title the page
 * wants read slowly. Runs once, when it scrolls into view.
 */
export function TypeReveal({
  text = "How it works",
  speed = 55,
  delay = 150,
  underline = true,
  className,
}: {
  text?: string
  /** Milliseconds per character. */
  speed?: number
  /** Milliseconds before the first character. */
  delay?: number
  /** Underline the last word once it is written. */
  underline?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = designing || reduce
  const [count, setCount] = useState(still ? text.length : 0)

  useEffect(() => {
    if (still) {
      setCount(text.length)
      return
    }
    if (!inView) return
    setCount(0)
    let i = 0
    let timer = window.setTimeout(function tick() {
      i += 1
      setCount(i)
      if (i < text.length) timer = window.setTimeout(tick, speed)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [inView, still, text, speed, delay])

  const done = count >= text.length
  const lastSpace = text.lastIndexOf(" ")
  const head = text.slice(0, lastSpace + 1)
  const tail = text.slice(lastSpace + 1)

  return (
    <span ref={ref} className={cn("relative inline-block whitespace-pre", className)} aria-label={text}>
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0">
        {done ? (
          <>
            {head}
            <span className={cn(underline && "underline decoration-1 underline-offset-[0.18em]")}>{tail}</span>
          </>
        ) : (
          <>
            {text.slice(0, count)}
            <span className="inline-block h-[1.02em] w-[0.5em] translate-y-[0.14em] bg-current" />
            <span className="inline-block h-[1.02em] translate-y-[0.14em] bg-current/80">
              <span className="invisible">{text.slice(count + 1)}</span>
            </span>
          </>
        )}
      </span>
    </span>
  )
}
