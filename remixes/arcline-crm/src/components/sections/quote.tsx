import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { QUOTE } from "@/content/home"

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total
  const color = useTransform(progress, [start, start + 1 / total], ["var(--ink-faint)", "var(--ink)"])
  return (
    <motion.span style={{ color }} className="transition-colors duration-500 ease-out">
      {word}{" "}
    </motion.span>
  )
}

/**
 * A customer's words, read at the pace of the scroll: each word lights up as
 * the reader reaches it. All lit for reduced motion.
 */
export function Quote({ text = QUOTE.text, name = QUOTE.name, role = QUOTE.role }: { text?: string; name?: string; role?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] })
  const words = text.split(" ")

  return (
    <Section id="quote" className="texture-dots">
      <Container className="flex flex-col items-center py-[var(--spacing-section)] text-center">
        <div ref={ref} className="max-w-[18em] font-serif text-[30px] leading-[1.1] tracking-[-0.015em] md:text-[48px] md:leading-[52px]">
          <span className="text-ink-faint">“</span>
          {reduced ? (
            <span className="text-ink">{text}</span>
          ) : (
            words.map((w, i) => <Word key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />)
          )}
          <span className="text-ink-faint">”</span>
        </div>
        <p className="mt-10 text-sm text-ink">{name}</p>
        <p className="text-sm text-ink-3">{role}</p>
      </Container>
    </Section>
  )
}
