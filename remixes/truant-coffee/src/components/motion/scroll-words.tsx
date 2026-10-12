import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

function Word({ word, index, total, progress, dim }: { word: string; index: number; total: number; progress: MotionValue<number>; dim: number }) {
  const start = index / total
  const opacity = useTransform(progress, [start, start + 1 / total], [dim, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  )
}

/**
 * A paragraph that lights up word by word as it scrolls through the window —
 * reading pace, set by the reader's own scroll. Below `dim` a word is
 * waiting; at 1 it has been read. Reduced motion shows it all at once.
 */
export function ScrollWords({
  text = "",
  dim = 0.28,
  start = "start 85%",
  end = "end 45%",
  className,
}: {
  text?: string
  /** 0–1: how faint an unread word is. */
  dim?: number
  start?: string
  end?: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: [start, end] as never })
  const words = text.split(" ")
  if (reduced) return <p className={className}>{text}</p>
  return (
    <p ref={ref} className={cn(className)}>
      {words.map((w, i) => (
        <Word key={i} word={w} index={i} total={words.length} progress={scrollYProgress} dim={dim} />
      ))}
    </p>
  )
}
