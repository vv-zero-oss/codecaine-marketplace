import { useRef } from "react"
import { motion, useReducedMotion, useScroll, type MotionValue } from "motion/react"

import { BLUR } from "@/lib/motion"
import { useScrub, useScrubBlur } from "@/lib/scrub"
import { cn } from "@/lib/utils"

/** Where each word sits in the panel, as % of its width and height — a
 *  staircase down and to the right. */
const STEPS = [
  { x: 9, y: 20 },
  { x: 24, y: 47 },
  { x: 41, y: 43 },
  { x: 55, y: 62 },
  { x: 72, y: 80 },
]

/**
 * A sentence laid down the panel one word at a time as you scroll, each word
 * sharpening out of a blur where it lands. The panel is pinned for the length
 * of the sentence, so the words arrive at the reader's pace, not the clock's.
 *
 * The panel's paint (`bg-mauve-wash`) fades to paper at the bottom, so it
 * hands straight on to the white page under it.
 */
export function SteppedWords({
  words,
  length = 2.6,
  className,
}: {
  words: string[]
  /** How many screens of scroll the sentence takes. */
  length?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  return (
    <section ref={ref} id="manifesto" className={cn("relative", className)} style={{ height: `${length * 100}svh` }}>
      <div className="sticky top-0 h-svh px-inset pt-nav" data-canvas-ignore>
        <div className="relative size-full overflow-hidden rounded-t-panel bg-mauve-wash">
          {words.map((word, i) => (
            <SteppedWord key={`${word}-${i}`} word={word} index={i} count={words.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SteppedWord({
  word,
  index,
  count,
  progress,
}: {
  word: string
  index: number
  count: number
  progress: MotionValue<number>
}) {
  const reduced = useReducedMotion()
  const step = STEPS[index % STEPS.length]
  const start = 0.08 + (index / count) * 0.62
  const end = start + 0.12
  const opacity = useScrub(progress, [start, end], [0, 1])
  const filter = useScrubBlur(progress, [start, end], [reduced ? 0 : BLUR, 0])
  return (
    <motion.span
      className="absolute text-scene font-normal tracking-scene text-paper"
      style={{ left: `${step.x}%`, top: `${step.y}%`, opacity, filter }}
    >
      {word}
    </motion.span>
  )
}
