import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { TESTIMONIALS } from "@/content"
import { duration, ease } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

/**
 * One quote at a time, changing on its own, with a row of bars that says how
 * many there are and how long until the next.
 *
 * The change is a soft blur-through, the same language as the page change,
 * so the site has one way of saying "this is replacing that". The active bar
 * fills over `interval` — it is the timer, made visible. Hovering or focusing
 * the carousel pauses it; clicking a bar goes straight to that quote.
 *
 * It holds still while the page is being designed, and every slide and the
 * pause are reachable from the editor's Actions row.
 */
export function QuoteCarousel({
  interval = 7,
  autoplay = true,
  startAt = 0,
  className,
}: {
  /** Seconds each quote stays up. */
  interval?: number
  autoplay?: boolean
  /** The quote shown first (0-based). */
  startAt?: number
  className?: string
}) {
  const count = TESTIMONIALS.length
  const [index, setIndex] = useState(() => Math.min(Math.max(0, startAt), count - 1))
  const [hovered, setHovered] = useState(false)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const running = autoplay && !paused && !hovered && !designing && !reduce

  useEffect(() => setIndex(Math.min(Math.max(0, startAt), count - 1)), [startAt, count])

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval * 1000)
    return () => window.clearTimeout(id)
  }, [running, index, interval, count])

  useCanvasAction("Next testimonial", () => setIndex((i) => (i + 1) % count), { group: "Testimonials" })
  useCanvasAction("Pause testimonials", (next) => setPaused(next ?? !paused), { on: paused, group: "Testimonials" })

  const quote = TESTIMONIALS[index]
  const blur = reduce ? 0 : 8

  return (
    <figure
      className={cn("relative", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-roledescription="carousel"
    >
      <div className="grid">
        {/* Every quote, invisible, in the same cell: the block is always as
            tall as the longest one, so nothing below jumps when they change. */}
        {TESTIMONIALS.map((t) => (
          <div key={t.name} aria-hidden className="invisible [grid-area:1/1]">
            <QuoteBody quote={t} />
          </div>
        ))}
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="[grid-area:1/1]"
            initial={{ opacity: 0, filter: `blur(${blur}px)` }}
            animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: duration("quote", 600), ease: ease("out") } }}
            exit={{ opacity: 0, filter: `blur(${blur}px)`, transition: { duration: duration("quote", 600) * 0.6, ease: ease("exit") } }}
            aria-live="polite"
          >
            <QuoteBody quote={quote} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-2" role="tablist" aria-label="Choose a testimonial">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Quote from ${t.name}`}
            onClick={() => setIndex(i)}
            className="group flex h-11 w-10 items-center"
          >
            <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-line transition-colors duration-200 group-hover:bg-line-strong">
              {i === index ? (
                <motion.span
                  key={`${index}-${running}`}
                  className="absolute inset-0 origin-left bg-lime"
                  initial={{ scaleX: running ? 0 : 1 }}
                  animate={{ scaleX: 1 }}
                  transition={running ? { duration: interval, ease: "linear" } : { duration: 0 }}
                />
              ) : i < index ? (
                <span className="absolute inset-0 bg-ink-faint" />
              ) : null}
            </span>
          </button>
        ))}
      </div>
    </figure>
  )
}

/** The quote and who said it. */
export function QuoteBody({ quote }: { quote: (typeof TESTIMONIALS)[number] }) {
  return (
    <>
      <blockquote className="text-[clamp(1.5rem,1.1rem+1.6vw,2.4rem)] leading-[1.18] font-normal tracking-[-0.018em] text-balance text-ink">
        <span className="text-pink">“</span>
        {quote.quote}
        <span className="text-pink">”</span>
      </blockquote>
      <figcaption className="mt-8 text-base leading-snug sm:text-lg">
        <span className="block text-ink">{quote.name}</span>
        <span className="block text-ink-faint">{quote.role}</span>
      </figcaption>
    </>
  )
}
