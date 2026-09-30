import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * Lenis carries the page's scroll — smooth, slightly weighted, quick to
 * settle, the feel the page was tuned to.
 *
 * Held in a ref for the component's lifetime so the canvas editor's SDK can
 * find and pause it. Not created at all under reduced motion (which the
 * editor's Reduced mode also answers).
 */
export function SmoothScroll({
  lerp = 0.09,
  wheelMultiplier = 1,
  enabled = true,
}: {
  /** 0–1: how much of the remaining distance each frame covers. */
  lerp?: number
  wheelMultiplier?: number
  enabled?: boolean
}) {
  const lenis = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!enabled || reduced) return
    lenis.current = new Lenis({ autoRaf: true, lerp, wheelMultiplier, anchors: { offset: -84 } })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [enabled, lerp, wheelMultiplier])

  return null
}
