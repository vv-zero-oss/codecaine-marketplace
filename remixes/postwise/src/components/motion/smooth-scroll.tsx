import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * Lenis carries the page's scroll: light and quick to settle.
 *
 * Held in a ref for the component's lifetime (and destroyed on unmount), so
 * the canvas editor's SDK finds it in React's tree and its Motion switch can
 * pause it. Not created at all when the visitor asks for reduced motion — the
 * editor's Reduced mode answers that query too.
 */
export function SmoothScroll({
  lerp = 0.1,
  wheelMultiplier = 1,
  enabled = true,
}: {
  /** 0–1: how much of the distance each frame covers. Lower is heavier. */
  lerp?: number
  wheelMultiplier?: number
  enabled?: boolean
}) {
  const lenis = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!enabled || reduced) return
    lenis.current = new Lenis({ autoRaf: true, lerp, wheelMultiplier, anchors: { offset: -96 } })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [enabled, lerp, wheelMultiplier])

  return null
}
