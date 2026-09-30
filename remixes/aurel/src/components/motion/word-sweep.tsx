import { motion, useReducedMotion, useScroll, type MotionValue } from "motion/react"
import { useRef } from "react"

import { splitMixed } from "@/components/ui/mixed-title"
import { useRange } from "@/lib/scroll"
import { cn } from "@/lib/utils"

/**
 * A line on the grey band that lights up word by word as it is scrolled.
 *
 * Each word goes from a pale, see-through tone to white in turn, so the
 * sentence reads itself out. `words` is a plain string with the house's
 * `_italic_` markup.
 */
export function WordSweep({ words, length = 180, className }: { words: string; length?: number; className?: string }) {
  const track = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ["start end", "end end"] })
  const parts = words.split(/\s+/).filter(Boolean)
  return (
    <section ref={track} className={cn("relative bg-stone-band", className)} style={{ height: `${Math.max(100, length)}vh` }}>
      <div className="sticky top-0 flex h-svh items-end px-gutter pb-[8vh]" data-canvas-ignore>
        <p className="font-display text-[clamp(40px,5.2vw,100px)] leading-[0.95] tracking-[-0.015em] text-balance">
          {parts.map((word, index) => (
            <SweepWord key={index} word={word} progress={scrollYProgress} from={0.3 + (index / parts.length) * 0.45} to={0.3 + ((index + 1) / parts.length) * 0.45} />
          ))}
        </p>
      </div>
    </section>
  )
}

function SweepWord({ word, progress, from, to }: { word: string; progress: MotionValue<number>; from: number; to: number }) {
  const reduced = useReducedMotion()
  const opacity = useRange(progress, [from, to], [reduced ? 1 : 0.28, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block text-chip">
      {splitMixed(word).map((part, index) => (part.italic ? <em key={index}>{part.text}</em> : <span key={index}>{part.text}</span>))}
    </motion.span>
  )
}
