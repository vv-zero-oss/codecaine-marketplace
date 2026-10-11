import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { ButtonLink } from "@/components/ui/button"
import { photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

function MissionWord({ word, index, total, progress, dim }: { word: string; index: number; total: number; progress: MotionValue<number>; dim: number }) {
  const start = (index / total) * 0.26
  const opacity = useTransform(progress, [start, start + 0.26 / total + 0.01], [dim, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

/**
 * The mission, then the escape. One pinned window of lake-sky blue: the
 * statement lights up word by word as you scroll, then a photograph that
 * started as a small print low in the frame opens out — clip-path, not
 * scale, so the picture never blurs — until it fills the window and the
 * captions land in its corners.
 *
 * Scroll-scrubbed over 2.6 windows on desktop. Reduced motion, and the
 * editor while designing, show the end state: the photograph full, words lit.
 */
export function Mission({
  statement = "We've been told we can never stay on task. Fair. We only ever stayed on one: coffee. Every hour we skipped out of something else went into it — the farms, the drum, the water, the grind — until there was nothing left about a cup we hadn't argued over.",
  leftCaption = "Truant.|Always an option.",
  rightCaption = "Grab a bag|and go.",
  coordinates = "46.7867° N — 92.1005° W",
  dim = 0.3,
}: {
  statement?: string
  leftCaption?: string
  rightCaption?: string
  coordinates?: string
  dim?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const progress = useTransform(scrollYProgress, (v) => (still ? 1 : v))

  const clip = useTransform(progress, [0.28, 0.82], ["inset(42% 37% 0% 37% round 4px)", "inset(0% 0% 0% 0% round 0px)"])
  const imageScale = useTransform(progress, [0.28, 0.82], [1.18, 1])
  // Held still, the statement stays on the photograph rather than leaving.
  const textOpacity = useTransform(progress, [0.3, 0.46], [1, still ? 1 : 0])
  const textY = useTransform(progress, [0.3, 0.46], [0, -40])
  const captions = useTransform(progress, [0.74, 0.86], [0, 1])
  const captionY = useTransform(progress, [0.74, 0.86], [12, 0])
  const words = statement.split(" ")

  return (
    <section ref={ref} id="mission" className={cn("relative bg-sky", still ? "h-[100svh]" : "h-[220vh] lg:h-[260vh]")}>
      <div className="sticky top-[84px] h-[calc(100svh-84px)] overflow-hidden lg:top-0 lg:h-[100svh]">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.img
            style={{ scale: imageScale }}
            src={photo("rooftop", 2000)}
            alt="A man in sunglasses standing on the edge of a concrete roof against a clear blue sky"
            loading="lazy"
            className="h-full w-full object-cover object-[50%_35%]"
          />
        </motion.div>

        <motion.div style={{ opacity: textOpacity, y: textY }} className={cn("relative px-[var(--spacing-gutter)] pt-8 lg:pt-[72px] lg:pl-[calc(var(--spacing-gutter)+64px)]", still && "[text-shadow:0_1px_24px_rgb(20_20_20/0.35)]")}>
          <p className="type-eyebrow text-paper/80">Our mission</p>
          <p className="mt-3 max-w-[30ch] text-statement text-paper md:max-w-[34ch]">
            {still ? statement : words.map((w, i) => <MissionWord key={i} word={w} index={i} total={words.length} progress={progress} dim={dim} />)}{" "}
            <ButtonLink href="/field-notes" variant="paper" size="sm" className="ml-1 -translate-y-1 align-middle text-ink">
              Read the notes
            </ButtonLink>
          </p>
        </motion.div>

        <motion.div style={{ opacity: captions, y: captionY }} className="pointer-events-none absolute inset-x-0 top-[38%] flex justify-between px-[var(--spacing-gutter)] font-display text-[15px] uppercase leading-tight text-paper md:text-[17px]">
          <p>
            {leftCaption.split("|").map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <p className="text-right">
            {rightCaption.split("|").map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </motion.div>
        <motion.p style={{ opacity: captions }} className="absolute inset-x-0 bottom-6 text-center text-caption tabular-nums text-paper">
          {coordinates}
        </motion.p>
      </div>
    </section>
  )
}
