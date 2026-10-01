import { motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * The headline's cycling word: it clears at once, then types itself in a
 * letter at a time, each letter blurring into focus, under a gradient rule
 * that keeps moving. Why: it tells a visitor, in one line, that the same models
 * do every modality.
 */
export function WordRotator({
  words = "build,reason,imagine,see,hear,create",
  hold = 3000,
  typeSpeed = 100,
  gap = 120,
  paused = false,
  className,
}: {
  /** Comma-separated words, in order. */
  words?: string
  /** How long a finished word stays, in ms. */
  hold?: number
  /** Ms per letter. */
  typeSpeed?: number
  /** Ms of empty rule between one word and the next. */
  gap?: number
  paused?: boolean
  className?: string
}) {
  const list = words.split(",").map((w) => w.trim()).filter(Boolean)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = paused || reduced || designing
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(list[0]?.length ?? 0)
  const key = list.join("|")

  useEffect(() => {
    if (still || list.length < 2) return
    let timer: number
    let i = index
    let n = list[i].length
    const step = () => {
      if (n >= list[i].length) {
        // Finished: hold, then clear in one frame and move on.
        timer = window.setTimeout(() => {
          i = (i + 1) % list.length
          n = 0
          setIndex(i)
          setTyped(0)
          timer = window.setTimeout(step, gap)
        }, hold)
        return
      }
      n += 1
      setTyped(n)
      timer = window.setTimeout(step, typeSpeed)
    }
    timer = window.setTimeout(step, hold)
    return () => window.clearTimeout(timer)
    // `index` is deliberately read once per (re)start.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still, key, hold, typeSpeed, gap])

  const word = list[still ? 0 : index] ?? ""
  const shown = still ? word : word.slice(0, typed)

  return (
    <span className={cn("relative inline-block min-w-[0.9em] whitespace-nowrap", className)}>
      {shown.split("").map((char, i) => (
        <motion.span
          key={`${index}-${i}`}
          className="inline-block"
          initial={still ? false : { opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          {char}
        </motion.span>
      ))}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-[0.06em] h-[2px] animate-underline bg-[length:200%_100%]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--accent-3), var(--accent), var(--accent-2), var(--accent), var(--accent-3))",
        }}
      />
    </span>
  )
}
