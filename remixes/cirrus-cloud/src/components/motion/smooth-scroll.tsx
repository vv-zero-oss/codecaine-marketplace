import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * Lenis carries the page's scroll: soft and slightly heavy, the way the
 * reference glides between long sections.
 *
 * Held in a ref for the component's lifetime (destroyed on unmount), so the
 * canvas editor's SDK finds it and its Motion switch can stop it. Not
 * created when the visitor asks for reduced motion.
 */
export function SmoothScroll({
  lerp = 0.085,
  wheelMultiplier = 1,
  enabled = true,
  resetKey,
}: {
  /** When this changes (a new page), jump back to the top. */
  resetKey?: string
  /** 0–1: how much of the distance each frame covers. Lower is heavier. */
  lerp?: number
  wheelMultiplier?: number
  enabled?: boolean
}) {
  const lenis = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!enabled || reduced) return
    lenis.current = new Lenis({ autoRaf: true, lerp, wheelMultiplier, anchors: true })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [enabled, lerp, wheelMultiplier])

  useEffect(() => {
    if (window.location.hash) return
    lenis.current?.scrollTo(0, { immediate: true })
  }, [resetKey])

  return null
}
