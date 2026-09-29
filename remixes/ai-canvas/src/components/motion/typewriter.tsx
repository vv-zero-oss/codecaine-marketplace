import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * A prompt typed out a character at a time, with a caret. `play` starts it;
 * `done` shows the whole line at once (the editor's end state, and reduced
 * motion). `onDone` fires when the last character lands.
 */
export function Typewriter({
  text,
  play,
  done = false,
  speed = 38,
  onDone,
  className,
}: {
  text: string
  play: boolean
  done?: boolean
  /** Milliseconds per character. */
  speed?: number
  onDone?: () => void
  className?: string
}) {
  const [count, setCount] = useState(done ? text.length : 0)

  useEffect(() => {
    if (done) {
      setCount(text.length)
      return
    }
    if (!play) return
    setCount(0)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setCount(i)
      if (i >= text.length) {
        window.clearInterval(id)
        onDone?.()
      }
    }, speed)
    return () => window.clearInterval(id)
    // onDone is a callback from the parent; restarting on its identity would
    // retype the prompt on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, done, text, speed])

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span aria-hidden className="ml-px inline-block h-[1.1em] w-px animate-[caret_1s_steps(1)_infinite] bg-current" />
      <span className="sr-only">{text}</span>
    </span>
  )
}
