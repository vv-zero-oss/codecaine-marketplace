import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { Doodle } from "@/components/mock/doodles"
import { Container } from "@/components/ui/container"
import { photo, PHOTOS } from "@/lib/photos"

/**
 * The sleeve: two oversized lines — side A, side B — rising out of a mask
 * one after the other (900ms ease-out, 120ms apart), a short paragraph,
 * and a wide photo that drifts 8% slower than the page as it scrolls by.
 */
export function StoryOpening({
  sideA = "Side A: the coffee.",
  sideB = "Side B: everything else.",
}: {
  sideA?: string
  sideB?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const frame = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] })
  const drift = useTransform(scrollYProgress, [0, 1], ["translateY(-8%)", "translateY(8%)"])

  const rise = (i: number) =>
    still
      ? {}
      : {
          initial: { transform: "translateY(105%)" },
          animate: { transform: "translateY(0%)" },
          transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.23, 1, 0.32, 1] as const },
        }

  return (
    <section className="border-b border-line pt-(--spacing-section)">
      <Container>
        <p className="type-label mb-6 text-[11.5px] text-ink-3">Our story · liner notes</p>
        <h1 className="type-display text-display">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.16em]">
            <motion.span className="block" {...rise(0)}>
              {sideA}
            </motion.span>
          </span>
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.18em]">
            <motion.span className="block text-rust" {...rise(1)}>
              {sideB}
            </motion.span>
          </span>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            className="max-w-[54ch] text-lead text-ink-2"
            initial={still ? false : { opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
          >
            We started roasting in a building that used to press records, because it was cheap and the floor could take the weight. Ten years on, the coffee is the
            A-side people come for. The flip side — the records, the bars, the regulars, the farmers we call by their first names — is why we're still here.
          </motion.p>
          <Doodle name="record" className="hidden w-32 md:block" />
        </div>
      </Container>
      <div ref={frame} className="relative mt-(--spacing-gutter) h-[min(70svh,720px)] min-h-[320px] overflow-hidden">
        <motion.img
          src={photo(PHOTOS.crateShop, 2000)}
          alt="Crates of records in the corner of the shop"
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
          style={still ? undefined : { transform: drift }}
        />
      </div>
    </section>
  )
}
