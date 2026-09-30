import { useRef } from "react"
import { useInView } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const DIRECTIONS = {
  up: { from: "0% 0%", to: "0% 100%", gradient: "to top", size: "100% 400%" },
  down: { from: "0% 100%", to: "0% 0%", gradient: "to bottom", size: "100% 400%" },
  left: { from: "0% 0%", to: "100% 0%", gradient: "to left", size: "400% 100%" },
  right: { from: "100% 0%", to: "0% 0%", gradient: "to right", size: "400% 100%" },
} as const

/**
 * A photograph that bleeds in through fog instead of fading.
 *
 * The whole trick is a mask: a feathered gradient four times the size of the
 * image slides across it with `mask-position`, so the picture appears
 * through a soft, cloudy front rather than a hard edge. A CSS transition, so
 * the editor's Motion switch can finish it; it holds its end state while
 * the page is designed, and reduced motion shows the picture straight away.
 */
export function GhostyImage({
  src,
  alt,
  direction = "up",
  softness = 0.5,
  duration = 1400,
  delay = 0,
  className,
}: {
  src: string
  alt: string
  direction?: "up" | "down" | "left" | "right"
  /** 0–1: how wide and cloudy the feathered front is. */
  softness?: number
  duration?: number
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLImageElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" })
  const { designing } = useCanvasDesignMode()
  const d = DIRECTIONS[direction]
  const shown = inView || designing
  const edge = 12 + softness * 22
  const mask = `linear-gradient(${d.gradient}, #000 ${50 - edge / 2}%, rgb(0 0 0 / 0.72) ${50 - edge / 6}%, rgb(0 0 0 / 0.3) ${50 + edge / 6}%, transparent ${50 + edge / 2}%)`

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn(
        "block size-full object-cover motion-reduce:[mask-image:none]! motion-reduce:[filter:none]!",
        className,
      )}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: d.size,
        WebkitMaskSize: d.size,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: shown ? d.to : d.from,
        WebkitMaskPosition: shown ? d.to : d.from,
        filter: shown ? "blur(0px)" : `blur(${6 + softness * 8}px)`,
        transition: designing
          ? "none"
          : `mask-position ${duration}ms var(--ease-ghost) ${delay}ms, -webkit-mask-position ${duration}ms var(--ease-ghost) ${delay}ms, filter ${duration * 0.8}ms var(--ease-out) ${delay}ms`,
      }}
    />
  )
}
