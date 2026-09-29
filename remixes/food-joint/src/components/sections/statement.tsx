import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { ClipShape } from "@/components/blocks/clip-shape"
import { Eyebrow } from "@/components/blocks/eyebrow"
import { Film } from "@/components/blocks/film"
import { Photo } from "@/components/blocks/photo"
import { statement, type StatementPart } from "@/content"

type Piece = { kind: "word"; text: string } | { kind: "media"; part: Exclude<StatementPart, string> }

function pieces(): Piece[] {
  return statement.flatMap((part): Piece[] =>
    typeof part === "string"
      ? part.split(" ").map((text) => ({ kind: "word" as const, text }))
      : [{ kind: "media" as const, part }],
  )
}

/** One word, inked in as the reader reaches it. */
function Word({ text, progress, range }: { text: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {text}
    </motion.span>
  )
}

/** A picture set into the line, which opens out as the sentence reaches it. */
function Media({ part, progress, range }: { part: Exclude<StatementPart, string>; progress: MotionValue<number>; range: [number, number] }) {
  const scale = useTransform(progress, range, [0.3, 1])
  const rotate = useTransform(progress, range, [-40, 0])
  const width = part.shape === "pill" ? "w-[1.9em]" : "w-[0.86em]"
  return (
    <motion.span className="mx-[0.08em] inline-block align-[-0.1em]" style={{ scale, rotate }}>
      <ClipShape shape={part.shape} className={`inline-block h-[0.86em] ${width}`}>
        {part.film ? <Film film={part.film} /> : part.photo ? <Photo photo={part.photo} width={400} className="absolute inset-0" /> : null}
      </ClipShape>
    </motion.span>
  )
}

/**
 * The idea in one sentence, with the food set into the words. It is read, so
 * the scroll inks it in word by word from pale to full — the eye follows the
 * ink — and each picture swings open as the words reach it, one of them a
 * film of the embers. Reduced motion: the sentence is simply there.
 */
export function Statement() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] })
  const all = pieces()
  const step = 1 / all.length
  return (
    <section ref={ref} className="bg-cream px-gutter pt-section pb-section">
      <Eyebrow className="mb-8">Why it tastes like that</Eyebrow>
      <div className="max-w-[24ch] font-heavy text-statement" style={{ textTransform: "none", letterSpacing: "-0.035em" }}>
        {all.map((piece, i) => {
          const range: [number, number] = reduced ? [0, 0.0001] : [i * step, Math.min(1, i * step + step * 3)]
          return (
            <span key={i}>
              {piece.kind === "word" ? (
                <Word text={piece.text} progress={scrollYProgress} range={range} />
              ) : (
                <Media part={piece.part} progress={scrollYProgress} range={range} />
              )}{" "}
            </span>
          )
        })}
      </div>
    </section>
  )
}
