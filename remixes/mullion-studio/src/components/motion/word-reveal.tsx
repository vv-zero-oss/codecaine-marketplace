import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * A paragraph that inks itself in as it is read: every word starts faint and
 * darkens as the scroll reaches it, so the line being read is always the one
 * in full ink. Scroll-scrubbed, so reading back up fades it again.
 *
 * `fromOpacity` is how faint the unread words are; `lift` how far (in em)
 * each word rises as it inks in.
 */
export function WordReveal({
  text = "",
  fromOpacity = 0.14,
  lift = 0.18,
  className,
}: {
  text?: string
  fromOpacity?: number
  lift?: number
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] })
  const words = text.split(" ")

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          start={i / words.length}
          end={(i + 1) / words.length}
          fromOpacity={reduced ? 1 : fromOpacity}
          lift={reduced ? 0 : lift}
        >
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children,
  progress,
  start,
  end,
  fromOpacity,
  lift,
}: {
  children: string
  progress: MotionValue<number>
  start: number
  end: number
  fromOpacity: number
  lift: number
}) {
  const opacity = useTransform(progress, [start, end], [fromOpacity, 1])
  const y = useTransform(progress, [start, end], [`${lift}em`, "0em"])
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  )
}
