import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

function Word({ children, progress, range, dim }: { children: string; progress: MotionValue<number>; range: [number, number]; dim: number }) {
  const opacity = useTransform(progress, range, [dim, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {children}
    </motion.span>
  )
}

/**
 * A paragraph that lights up word by word as it is scrolled through — read
 * at the pace of the scroll, so the eye and the highlight move together.
 * `dim` is how faint the unread words start. Fully lit under reduced motion.
 */
export function ScrollText({
  text,
  dim = 0.14,
  accent = "",
  className,
}: {
  text: string
  dim?: number
  accent?: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  const words = text.split(" ")
  const accents = new Set(accent.split(",").map((w) => w.trim()).filter(Boolean))

  return (
    <p ref={ref} className={cn("font-serif text-mega text-ink", className)} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length
        const tone = accents.has(word.replace(/[.,]/g, "")) ? "text-accent" : undefined
        return (
          <span key={i} aria-hidden className={tone}>
            {reduce ? (
              <span className="inline-block whitespace-pre">{word}</span>
            ) : (
              <Word progress={scrollYProgress} range={[start, start + 1 / words.length]} dim={dim}>
                {word}
              </Word>
            )}
            {i < words.length - 1 ? " " : ""}
          </span>
        )
      })}
    </p>
  )
}
