import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A paragraph that reads itself in as it scrolls: each word comes up from a
 * dim blur to full white in turn, so the sentence is lit at the pace it is
 * read. Tied to scroll rather than time — scroll back and it dims again.
 *
 * Read off the reference: words resolve left to right over roughly the
 * paragraph's own height of scroll, from ~20% opacity and a soft blur.
 * Shown fully lit for reduced motion and while the page is being designed.
 */
export function WordReveal({
  text,
  dim = 0.18,
  blur = 8,
  start = 0.9,
  end = 0.35,
  className,
}: {
  text: string
  /** Opacity of a word before its turn. */
  dim?: number
  /** Blur, in px, of a word before its turn. */
  blur?: number
  /** Where in the window (0 top – 1 bottom) the first word starts lighting. */
  start?: number
  /** Where in the window the paragraph's end must reach for the last word to finish. */
  end?: number
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${start}`, `end ${end}`] })
  const words = text.split(/\s+/).filter(Boolean)
  const still = reduced || designing

  return (
    <p ref={ref} className={cn("text-balance", className)}>
      {words.map((word, i) =>
        still ? (
          <span key={i}>{word} </span>
        ) : (
          <Word key={i} progress={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} dim={dim} blur={blur}>
            {word}
          </Word>
        ),
      )}
    </p>
  )
}

function Word({
  progress,
  from,
  to,
  dim,
  blur,
  children,
}: {
  progress: MotionValue<number>
  from: number
  to: number
  dim: number
  blur: number
  children: string
}) {
  const opacity = useTransform(progress, [from, to], [dim, 1])
  const filter = useTransform(progress, [from, to], [`blur(${blur}px)`, "blur(0px)"])
  return (
    <>
      <motion.span className="inline-block will-change-[opacity,filter]" style={{ opacity, filter }}>
        {children}
      </motion.span>{" "}
    </>
  )
}
