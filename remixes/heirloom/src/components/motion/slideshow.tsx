import { useCanvasDesignMode } from "@canvas/react"
import { useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export type Slide = { src: string; alt: string }

/**
 * Photographs that crossfade into one another, each drifting very slowly while
 * it is on screen. Holds still while the page is being designed or when the
 * visitor asks for reduced motion.
 */
export function Slideshow({
  slides,
  interval = 6,
  fade = 1.6,
  drift = true,
  paused = false,
  className,
}: {
  slides: Slide[]
  interval?: number
  fade?: number
  drift?: boolean
  paused?: boolean
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = paused || reduce || designing

  useEffect(() => {
    if (still) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), interval * 1000)
    return () => window.clearInterval(id)
  }, [still, interval, slides.length])

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-ink", className)} aria-hidden>
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          loading={i === 0 ? "eager" : "lazy"}
          className={cn("absolute inset-0 size-full object-cover", i === index ? "opacity-100" : "opacity-0")}
          style={{
            transition: `opacity ${fade}s var(--ease-in-out-soft)`,
            animation: drift && !reduce ? `drift ${interval * 2}s linear infinite alternate` : undefined,
          }}
        />
      ))}
    </div>
  )
}
