import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Arrows } from "@/components/blocks/arrows"
import { Doodle, type DoodleName } from "@/components/mock/doodles"
import { ButtonLink } from "@/components/ui/button"
import { photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

export type Slide = { photo: number; alt: string }

/**
 * A big rounded photo that dissolves between slides — a straight 500ms
 * crossfade on the in-out curve, nothing moving, so the photographs do the
 * talking. A serif headline and a doodle sit on top; Shop all bottom
 * left; a 01 — 03 counter and arrows bottom right.
 *
 * Autoplays every `interval` seconds, pauses under the pointer, and holds
 * still while the page is being designed. "Carousel slide" steps it.
 */
export function PhotoCarousel({
  slides,
  headline = "Good coffee and slow afternoons.",
  doodle = "bike",
  interval = 6,
  autoplay = true,
  className,
}: {
  slides: Slide[]
  headline?: string
  doodle?: DoodleName
  interval?: number
  autoplay?: boolean
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const step = (d: number) => setIndex((i) => (i + d + slides.length) % slides.length)
  useCanvasAction("Carousel slide", (next) => (next == null ? step(1) : setIndex(next ? 1 : 0)), { on: index > 0, group: "Featured" })

  useEffect(() => {
    if (!autoplay || hover || designing || reduced) return
    const id = window.setTimeout(() => step(1), interval * 1000)
    return () => window.clearTimeout(id)
  }, [index, autoplay, hover, designing, reduced, interval])

  const slide = slides[index]
  return (
    <div
      className={cn("relative isolate aspect-[16/11] overflow-hidden rounded-(--radius-card) bg-cocoa text-page shadow-(--shadow-card) sm:aspect-[16/10]", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.photo}
          src={photo(slide.photo, 1600)}
          alt={slide.alt}
          className="absolute inset-0 size-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--color-cocoa)_45%,transparent),transparent_45%)]" />

      <div className="absolute top-0 left-0 flex items-start gap-3 p-5 sm:p-8">
        <h3 className="type-display max-w-[11ch] text-h2 leading-[0.9]">{headline}</h3>
        <Doodle name={doodle} className="hidden w-24 text-page sm:block" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-7">
        <ButtonLink href="/shop" variant="paper" size="chip">
          Shop all
        </ButtonLink>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[14px] tabular" aria-live="polite">
            {String(index + 1).padStart(2, "0")} <span className="inline-block w-6 border-t border-page/70 align-middle" /> {String(slides.length).padStart(2, "0")}
          </span>
          <Arrows onPrev={() => step(-1)} onNext={() => step(1)} />
        </div>
      </div>
    </div>
  )
}
