import { useEffect, useRef, useState, type ComponentProps } from "react"

import { prefersReducedMotion } from "@/lib/motion"

/**
 * Text typed in behind a solid block cursor, the way a story's facts arrive
 * when its page opens.
 *
 * The block runs a few characters ahead of the letters, so the eye follows
 * one moving mark down the column instead of watching many lines fade. Runs
 * once, after `delay` ms; reduced motion shows the text at once.
 */
export function TypeReveal({
  text,
  delay = 0,
  perChar = 22,
  ...props
}: ComponentProps<"span"> & { text: string; delay?: number; perChar?: number }) {
  const [count, setCount] = useState(-1)
  const frame = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(text.length + 4)
      return
    }
    setCount(-1)
    let start = 0
    const total = text.length + 4
    const tick = (now: number) => {
      if (!start) start = now + delay
      const t = now - start
      if (t >= 0) setCount(Math.min(total, Math.floor(t / perChar)))
      if (t < total * perChar) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [text, delay, perChar])

  const typed = Math.max(0, count - 4)
  const block = count < 0 || count >= text.length + 4 ? 0 : Math.min(4, count, text.length - typed + 1)

  return (
    <span aria-label={text} {...props}>
      <span aria-hidden>
        <span>{text.slice(0, typed)}</span>
        {block > 0 && <span className="bg-(--page-ink) text-transparent">{"█".repeat(block)}</span>}
        <span className="invisible">{text.slice(typed + block)}</span>
      </span>
    </span>
  )
}
