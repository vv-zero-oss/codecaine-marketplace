import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Types a line out a character at a time, with a blinking caret, while
 * `playing` is true; rubs it out again when it turns false. The speed is in
 * characters per second.
 */
export function Typewriter({
  text,
  playing = true,
  speed = 38,
  caret = true,
  className,
  onDone,
}: {
  text: string
  playing?: boolean
  speed?: number
  caret?: boolean
  className?: string
  onDone?: () => void
}) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(playing ? (reduced ? text.length : 0) : 0)

  useEffect(() => {
    if (reduced) {
      setCount(playing ? text.length : 0)
      if (playing) onDone?.()
      return
    }
    const target = playing ? text.length : 0
    if (count === target) {
      if (playing) onDone?.()
      return
    }
    const step = playing ? 1 : -3
    const t = window.setTimeout(() => setCount((c) => Math.max(0, Math.min(text.length, c + step))), 1000 / (playing ? speed : speed * 2))
    return () => window.clearTimeout(t)
    // onDone is a callback, not a trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, playing, text, speed, reduced])

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {text.slice(0, count)}
      {caret ? <span aria-hidden className="ml-px inline-block h-[1.05em] w-[1.5px] translate-y-[0.15em] animate-caret bg-current" /> : null}
    </span>
  )
}
