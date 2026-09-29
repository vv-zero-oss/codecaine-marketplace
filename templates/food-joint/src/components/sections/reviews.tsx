import { useRef } from "react"
import { Hand } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { Eyebrow } from "@/components/blocks/eyebrow"
import { RiseText } from "@/components/blocks/rise-text"
import { Container } from "@/components/ui/container"
import { reviews } from "@/content"
import { useMedia } from "@/hooks/use-media"
import { DURATION, EASE_OUT, SPRING_FOLLOW, STAGGER } from "@/lib/motion"
import { cn } from "@/lib/utils"

const TONES = {
  cream: "bg-cream",
  lavender: "bg-lavender",
  orange: "bg-orange",
  lime: "bg-lime",
} as const

/** Where each note lands, and its lean — like stickers slapped on a fridge. */
const LEAN = [-4, 3, -2, 5]

/**
 * What people say, as stickers on an orange board. With a mouse you can pick
 * them up and move them — they lift (a harder shadow, a touch bigger) and
 * straighten while held, and keep their momentum when let go, inside the
 * board. On touch they sit in a plain column so the page still scrolls under
 * a thumb. They are dealt onto the board one by one the first time you see it.
 */
export function Reviews() {
  const board = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const drag = useMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)")

  return (
    <section className="overflow-hidden bg-orange py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="[&>span]:bg-forest">{reviews.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-[14ch] font-heavy text-title">
              <RiseText text="People keep" />
              <br />
              <RiseText text="coming back" delay={0.1} />
            </h2>
          </div>
          {drag && (
            <p className="flex items-center gap-2 font-condensed text-label uppercase">
              <Hand className="size-5" aria-hidden /> {reviews.hint}
            </p>
          )}
        </div>

        <div ref={board} className="relative mt-row grid gap-6 md:min-h-[560px] md:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {reviews.items.map((review, i) => (
            <motion.figure
              key={review.name}
              drag={drag}
              dragConstraints={board}
              dragElastic={0.15}
              dragTransition={{ power: 0.25, timeConstant: 220 }}
              whileDrag={{ scale: 1.04, rotate: 0, boxShadow: "var(--shadow-sticker-lift)", cursor: "grabbing", zIndex: 20 }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, rotate: LEAN[i] * 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: LEAN[i] }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: DURATION.reveal, ease: EASE_OUT, delay: i * STAGGER * 2, boxShadow: SPRING_FOLLOW }}
              className={cn(
                "relative m-0 flex flex-col gap-6 rounded-card border-2 border-forest p-6 shadow-sticker sm:p-8",
                TONES[review.tone],
                drag && "cursor-grab touch-none select-none",
                i % 2 === 1 && "lg:mt-20",
              )}
            >
              <span aria-hidden className="font-heavy text-[72px] leading-[0.5]">“</span>
              <blockquote className="m-0 font-heavy text-[clamp(22px,1.9vw,30px)] leading-[1.05]" style={{ textTransform: "none" }}>
                {review.quote}
              </blockquote>
              <figcaption className="mt-auto border-t-2 border-forest pt-4">
                <span className="font-condensed text-label uppercase">{review.name}</span>
                <span className="block text-ui text-ink-soft">{review.detail}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
