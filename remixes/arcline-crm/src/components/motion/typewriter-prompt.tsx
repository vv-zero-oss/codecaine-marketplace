import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A prompt that types itself, the way someone would ask Arcline for
 * something — it shows what the box is for before anyone clicks into it.
 *
 * `@mentions` are underlined like the source chips they stand for. When the
 * text changes, it clears and types the new one; `onDone` fires once the
 * line has been up for `hold` seconds, which is how the hero moves on to the
 * next prompt. Written out in full, without typing, while designing and for
 * reduced motion.
 */
export function TypewriterPrompt({
  text,
  speed = 38,
  hold = 3.2,
  paused = false,
  onDone,
  className,
}: {
  text: string
  /** Characters per second. */
  speed?: number
  hold?: number
  paused?: boolean
  onDone?: () => void
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const instant = reduced || designing || paused
  const [count, setCount] = useState(instant ? text.length : 0)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    if (instant) {
      setCount(text.length)
      return
    }
    setCount(0)
    let n = 0
    let holdTimer = 0
    const typer = window.setInterval(() => {
      n += 1
      setCount(n)
      if (n >= text.length) {
        window.clearInterval(typer)
        holdTimer = window.setTimeout(() => done.current?.(), hold * 1000)
      }
    }, 1000 / speed)
    return () => {
      window.clearInterval(typer)
      window.clearTimeout(holdTimer)
    }
  }, [text, speed, hold, instant])

  const shown = text.slice(0, count)
  const parts = shown.split(/(@\w+)/g)

  return (
    <p className={cn("text-left", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {parts.map((part, i) =>
          part.startsWith("@") ? (
            <span key={i} className="text-fg-soft underline decoration-subtle decoration-dotted underline-offset-4">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
        <span className="ml-px inline-block h-[1.1em] w-px translate-y-[0.18em] animate-caret bg-fg-soft" />
      </span>
    </p>
  )
}
