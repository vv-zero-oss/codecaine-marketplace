import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

export type Phrase = { text: string; tone?: "ink" | "rust" | "ember" | "sky" | "honey" }

const TONE = { ink: "text-ink", rust: "text-rust", ember: "text-ember", sky: "text-sky-display", honey: "text-honey" }

/**
 * A paragraph that inks itself in as you read: each word starts at 18%
 * and comes up to full as the paragraph scrolls through the middle of the
 * screen, so the eye and the colour travel together. Scroll-linked opacity
 * only — no layout, no transform. Reduced motion and the editor get the
 * finished paragraph.
 */
export function WordReveal({ phrases, from = 0.18, className }: { phrases: Phrase[]; from?: number; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] })

  const words = phrases.flatMap((p) => p.text.split(" ").filter(Boolean).map((w) => ({ w, tone: p.tone ?? "ink" })))
  const still = reduced || designing

  return (
    <p ref={ref} className={cn("type-display text-pretty", className)}>
      {words.map(({ w, tone }, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} from={from} still={still} className={TONE[tone]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({ progress, range, from, still, className, children }: { progress: MotionValue<number>; range: [number, number]; from: number; still: boolean; className: string; children: string }) {
  const opacity = useTransform(progress, range, [from, 1])
  return (
    <>
      <motion.span className={className} style={{ opacity: still ? 1 : opacity }}>
        {children}
      </motion.span>{" "}
    </>
  )
}
