import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const CHARSETS = {
  alnum: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  symbols: "{}[]()<>/\\=+*&%$#@!?;:",
  binary: "01",
} as const

/**
 * Text that decrypts into place: solid letters behind the cursor, a band of
 * scrambled glyphs at it, and the letters still to come drawn as outlines.
 *
 * The tween is held in a ref and stopped on unmount. `trigger` picks what
 * plays it — scrolling into view, hovering, or mounting — and every other
 * knob is a scalar prop that is read live.
 */
export function ScrambleText({
  text = "Scramble",
  duration = 0.8,
  delay = 0,
  band = 4,
  charset = "alnum",
  trigger = "view",
  className,
}: {
  text?: string
  /** Seconds the whole line takes to resolve. */
  duration?: number
  delay?: number
  /** How many glyphs wide the scrambling band is. */
  band?: number
  charset?: keyof typeof CHARSETS
  trigger?: "view" | "hover" | "mount"
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const tween = useRef<ReturnType<typeof animate> | null>(null)
  const [progress, setProgress] = useState(reduced ? 1 : 0)
  const [tick, setTick] = useState(0)

  const play = () => {
    tween.current?.stop()
    if (reduced) {
      setProgress(1)
      return
    }
    setProgress(0)
    tween.current = animate(0, 1, {
      duration,
      delay,
      ease: "linear",
      onUpdate: (value) => {
        setProgress(value)
        setTick((n) => n + 1)
      },
    })
  }

  useEffect(() => {
    if (trigger === "mount" || (trigger === "view" && inView)) play()
    return () => tween.current?.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, inView, text, duration, delay, reduced])

  const cursor = Math.floor(progress * (text.length + band))
  const solid = Math.min(Math.max(cursor - band, 0), text.length)
  const bandEnd = Math.min(cursor, text.length)
  const set = CHARSETS[charset]
  const scrambled = text
    .slice(solid, bandEnd)
    .split("")
    .map((ch, i) => (ch === " " ? " " : set[(tick * 7 + i * 13 + ch.charCodeAt(0)) % set.length]))
    .join("")

  return (
    <span
      ref={ref}
      aria-label={text}
      onPointerEnter={trigger === "hover" ? play : undefined}
      className={cn("whitespace-pre-wrap", className)}
    >
      <span aria-hidden>{text.slice(0, solid)}</span>
      <span aria-hidden className="text-accent-hi">{scrambled}</span>
      <span
        aria-hidden
        className="text-transparent [-webkit-text-stroke:1px_var(--color-fg-subtle)]"
      >
        {text.slice(bandEnd)}
      </span>
    </span>
  )
}
