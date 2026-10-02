import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

function Word({ word, progress, from, to, floor }: { word: string; progress: MotionValue<number>; from: number; to: number; floor: number }) {
  const opacity = useTransform(progress, [from, to], [floor, 1])
  return <motion.span style={{ opacity }} className="inline-block">{word}&nbsp;</motion.span>
}

/** A paragraph whose words light up one by one as you scroll through it — it makes a long sentence get read. */
export function ScrollText({
  text = "Your body talks all day.",
  floor = 0.18,
  className,
}: {
  text?: string
  /** Opacity of a word that hasn't been reached yet (0–1). */
  floor?: number
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  const words = text.split(" ")
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} floor={reduced ? 1 : floor} from={i / words.length} to={Math.min(1, (i + 1.5) / words.length)} />
      ))}
    </p>
  )
}
