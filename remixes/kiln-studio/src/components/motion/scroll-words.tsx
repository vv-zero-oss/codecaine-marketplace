import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

function Word({ word, progress, range, dim }: { word: string; progress: MotionValue<number>; range: [number, number]; dim: number }) {
  const opacity = useTransform(progress, range, [dim, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  )
}

/**
 * A statement that lights up word by word as it scrolls through the middle
 * of the window — read at the pace you scroll. Scroll-linked, so it is
 * never "playing"; while designing or with reduced motion it is simply lit.
 */
export function ScrollWords({
  text,
  dim = 0.16,
  start = 0.85,
  end = 0.35,
  className,
}: {
  text: string
  /** Opacity of a word not yet reached. */
  dim?: number
  /** Where in the window (0 top, 1 bottom) the first word starts lighting. */
  start?: number
  /** Where the last word is fully lit. */
  end?: number
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${start}`, `end ${end}`] })
  const words = text.split(" ")

  if (reduced || designing) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={cn(className)} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} dim={dim} />
        ))}
      </span>
    </p>
  )
}
