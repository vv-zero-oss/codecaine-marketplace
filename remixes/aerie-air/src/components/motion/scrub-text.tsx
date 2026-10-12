import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A paragraph that inks itself in as it scrolls through the window — each
 * word goes from the faint tone to full ink in turn, as the reference's
 * "Imagine looking forward to your commute" does. The words are a string
 * prop, so the editor can rewrite them.
 */
export function ScrubText({
  text,
  className,
  start = 0.85,
  end = 0.35,
}: {
  text: string
  className?: string
  /** Where in the window (0 top – 1 bottom) the first word starts to ink. */
  start?: number
  /** Where the last word is fully inked. */
  end?: number
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${start}`, `end ${end}`] })
  const words = text.split(" ")

  if (reduced || designing) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.22, 1])
  return (
    <motion.span aria-hidden style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  )
}
