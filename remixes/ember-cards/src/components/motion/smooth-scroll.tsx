import Lenis from "lenis"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

/**
 * Lenis carries the scroll, tuned to the reference's feel: a soft, slightly
 * heavy glide that settles rather than stops. Held in a ref for the page's
 * lifetime, so the canvas editor's Motion switch can find and pause it.
 * Off entirely under reduced motion.
 */
export function SmoothScroll({ lerp = 0.1, wheelMultiplier = 1 }: { lerp?: number; wheelMultiplier?: number }) {
  const lenis = useRef<Lenis | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    lenis.current = new Lenis({ autoRaf: true, lerp, wheelMultiplier, anchors: { offset: -72 } })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [lerp, wheelMultiplier, reduce])

  return null
}
