import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { HERO_SLIDES } from "@/content/stories"
import { photo, photoSet } from "@/lib/photos"
import { useReader } from "@/lib/reader"
import { cn } from "@/lib/utils"

/**
 * The people in the current volume, one at a time, filling the right half of
 * the page and holding still while the left half scrolls past.
 *
 * A plain cross-dissolve, measured off the reference at ~380ms — the
 * photographs do the work, the transition only gets out of their way. The
 * active dot fills over the slide's duration so the autoplay reads as live
 * rather than random. Pauses under the pointer, while designing, and for
 * reduced motion.
 */
export function HeroCarousel({
  interval = 5.5,
  autoplay = true,
  dissolve = 0.38,
  className,
}: {
  /** Seconds each portrait holds. */
  interval?: number
  autoplay?: boolean
  /** Seconds the cross-dissolve takes. */
  dissolve?: number
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { openStory } = useReader()
  const running = autoplay && !hover && !designing && !reduced
  const slide = HERO_SLIDES[index]
  const n = HERO_SLIDES.length

  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % n), interval * 1000)
    return () => window.clearTimeout(t)
  }, [running, interval, index, n])

  useCanvasAction("Next portrait", () => setIndex((i) => (i + 1) % n), { group: "Hero" })

  return (
    <div
      className={cn("relative overflow-hidden bg-ink", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.slug}
          src={photo(slide.photo, 1600)}
          srcSet={photoSet(slide.photo)}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={`${slide.name}, ${slide.role}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dissolve, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-0 size-full object-cover photo-grade"
          draggable={false}
        />
      </AnimatePresence>
      {/* a low scrim so the caption holds on a bright photograph */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      {/* the top scrim keeps the header's links legible on a pale sky */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 text-page md:px-[3.4vw] md:pb-[3vw]">
        <p className="font-sans text-[12px] tabular-nums opacity-85">
          {index + 1}/{n}
        </p>
        <button type="button" onClick={() => openStory(slide.slug)} className="group mt-2 block text-left">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={slide.slug}
              initial={{ opacity: 0, transform: "translateY(6px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
              className="link-draw block font-serif text-[clamp(20px,1.6vw,26px)] leading-tight tracking-[-0.015em]"
            >
              {slide.name}, {slide.role}
            </motion.span>
          </AnimatePresence>
        </button>
        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
          <span className="type-label opacity-85">{slide.place}</span>
          <span className="type-label opacity-85">{slide.trade}</span>
          <span className="type-label opacity-85">{slide.volume === "Online" ? "Online feature" : `Volume ${slide.volume}`}</span>
        </p>
        <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="Portraits">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={s.name}
              onClick={() => setIndex(i)}
              className="group/dot grid h-6 place-items-center"
            >
              <span
                className={cn(
                  "relative block h-[5px] overflow-hidden rounded-full bg-page/45 transition-[background-color] duration-(--duration-swap) ease-(--ease-out-strong) group-hover/dot:bg-page/80",
                  i === index ? "w-6" : "w-[5px]",
                )}
              >
                {i === index && (
                  <span
                    key={`${index}-${running}`}
                    className="absolute inset-0 origin-left rounded-full bg-page"
                    style={
                      running
                        ? { animation: `dot-fill ${interval}s linear forwards` }
                        : { transform: "scaleX(1)" }
                    }
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
