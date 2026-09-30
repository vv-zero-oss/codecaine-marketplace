import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { cn } from "@/lib/utils"

/**
 * Writes its text out word by word, the way an agent's answer arrives, with
 * a blinking caret at the end while it is still writing. Starts when it
 * scrolls into view; shown whole while designing or under reduced motion.
 */
export function StreamingText({
  text = "",
  speed = 38,
  delay = 400,
  className,
  label = "Brief",
}: {
  text?: string
  /** Milliseconds per word. */
  speed?: number
  delay?: number
  className?: string
  /** Name of the editor switch that shows the finished answer. */
  label?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const words = text.split(" ")
  const [count, setCount] = useState(0)
  const [forced, setForced] = useState(false)
  const whole = designing || reduce || forced

  useCanvasAction(`${label}: finished`, (next) => setForced(next ?? !forced), { on: whole, group: "Streaming" })

  useEffect(() => {
    if (whole || !inView) return
    setCount(0)
    let i = 0
    let timer = window.setTimeout(function tick() {
      i += 1
      setCount(i)
      if (i < words.length) timer = window.setTimeout(tick, speed + Math.random() * speed * 0.8)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [inView, whole, text, speed, delay, words.length])

  const shown = whole ? words.length : count
  return (
    <p ref={ref} className={cn(className)} aria-label={text}>
      <span aria-hidden>{words.slice(0, shown).join(" ")}</span>
      {shown < words.length && (
        <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-caret bg-current" />
      )}
    </p>
  )
}
