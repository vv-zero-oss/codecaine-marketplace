import { useEffect, useState } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/-_"

/**
 * Text that resolves out of noise, a character at a time, left to right with
 * a little jitter — the archive's loading line. Each character cycles through
 * random glyphs until its moment comes. Spaces and line breaks never scramble,
 * so the measure stays put while it resolves.
 */
export function ScrambleText({
  text,
  duration = 1800,
  delay = 0,
  onDone,
  className,
}: {
  text: string
  duration?: number
  delay?: number
  onDone?: () => void
  className?: string
}) {
  const [out, setOut] = useState(() => text.replace(/\S/g, " "))

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text)
      onDone?.()
      return
    }
    // When each character settles: spread across the duration, jittered.
    const settle = [...text].map((_, i) => (i / text.length) * duration * 0.75 + Math.random() * duration * 0.25)
    let frame = 0
    let start = 0
    let lastSwap = 0
    const tick = (now: number) => {
      if (!start) start = now + delay
      const t = now - start
      if (t >= 0 && now - lastSwap > 45) {
        lastSwap = now
        setOut(
          [...text]
            .map((ch, i) => {
              if (/\s/.test(ch) || t >= settle[i]) return ch
              return t < settle[i] - duration * 0.5 && Math.random() < 0.5 ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0]
            })
            .join(""),
        )
      }
      if (t < duration) frame = requestAnimationFrame(tick)
      else {
        setOut(text)
        onDone?.()
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, duration, delay])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden className="whitespace-pre-wrap">
        {out}
      </span>
    </span>
  )
}
