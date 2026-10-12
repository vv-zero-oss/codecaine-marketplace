import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

function Word({ word, progress, range, dim }: { word: string; progress: MotionValue<number>; range: [number, number]; dim: number }) {
  const opacity = useTransform(progress, range, [dim, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  )
}

/**
 * A sentence that inks itself in, word by word, as it crosses the window —
 * scrubbed to the scroll, so reading speed is the reader's. Fully inked
 * while designing and for reduced motion.
 */
export function ScrollWords({
  text,
  dim = 0.14,
  className,
}: {
  text: string
  /** Opacity of a word not yet reached. */
  dim?: number
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] })
  const words = text.split(" ")

  if (reduced || designing) return <p className={className}>{text}</p>
  return (
    <p ref={ref} className={cn(className)}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} dim={dim} />
      ))}
    </p>
  )
}
