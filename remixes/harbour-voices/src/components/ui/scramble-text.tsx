import { useEffect, useRef, useState, type ComponentProps } from "react"

import { prefersReducedMotion } from "@/lib/motion"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/-_."

/**
 * Text that decodes into place: each letter flickers through a few random
 * glyphs and settles, left to right.
 *
 * It exists for the moments the page changes what it is showing — a new view,
 * a new count, the intro line — so the change reads as the same terminal
 * printing something new rather than a cut. The type is monospaced, so the
 * width never moves while it runs. Replays whenever `text` (or `replay`)
 * changes; reduced motion prints the text straight away.
 */
export function ScrambleText({
  text,
  replay,
  delay = 0,
  speed = 28,
  ...props
}: ComponentProps<"span"> & { text: string; replay?: unknown; delay?: number; speed?: number }) {
  const [shown, setShown] = useState(text)
  const frame = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(text)
      return
    }
    let start = 0
    const settleEach = speed // ms per letter
    const flicker = 180 // ms a letter scrambles before it settles
    const tick = (now: number) => {
      if (!start) start = now + delay
      const t = now - start
      if (t < 0) {
        frame.current = requestAnimationFrame(tick)
        return
      }
      let done = true
      const out = Array.from(text, (char, i) => {
        if (char === " ") return " "
        const settleAt = i * settleEach + flicker
        if (t >= settleAt) return char
        done = false
        if (t < i * settleEach * 0.5) return " "
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }).join("")
      setShown(out)
      if (!done) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [text, replay, delay, speed])

  return (
    <span aria-label={text} {...props}>
      <span aria-hidden>{shown}</span>
    </span>
  )
}
