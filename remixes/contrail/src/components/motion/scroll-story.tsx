import { useRef, type ReactNode } from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/** One word, brightening as the reading line passes it. */
function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: ReactNode }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

/**
 * Text that lights up word by word as it is scrolled past — the reading line
 * moves down the paragraph with you. Paragraphs are split on blank lines, and
 * `{token}` in the text is replaced with the matching inline element from
 * `tokens` (a gate chip, an icon), which lights up with its word.
 *
 * Shown fully lit while designing and for reduced motion.
 */
export function ScrollStory({
  text = "When you were small, the airport was an adventure.\n\nNow it feels like guesswork.",
  tokens = {},
  start = 0.85,
  end = 0.4,
  className,
  onProgress,
}: {
  text?: string
  tokens?: Record<string, ReactNode>
  /** Where in the window (0 top – 1 bottom) the text starts lighting. */
  start?: number
  /** Where in the window the last word is lit. */
  end?: number
  className?: string
  onProgress?: (p: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${start}`, `end ${end}`] })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  useMotionValueEvent(scrollYProgress, "change", (p) => onProgress?.(p))

  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim().split(/\s+/))
  const total = paragraphs.reduce((n, words) => n + words.length, 0)
  let index = 0

  return (
    <div ref={ref} className={cn("flex flex-col gap-[1.1em]", className)}>
      {paragraphs.map((words, p) => (
        <p key={p}>
          {words.map((word, w) => {
            const i = index++
            const match = word.match(/^\{(\w+)\}(.*)$/)
            const content = match ? (
              <>
                {tokens[match[1]] ?? null}
                {match[2]}
              </>
            ) : (
              word
            )
            if (reduced || designing) return <span key={w}>{content} </span>
            const a = i / total
            return (
              <Word key={w} progress={scrollYProgress} range={[a, a + 1.6 / total]}>
                {content}{" "}
              </Word>
            )
          })}
        </p>
      ))}
    </div>
  )
}
