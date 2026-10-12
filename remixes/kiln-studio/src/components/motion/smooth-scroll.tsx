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
let current: Lenis | null = null

/** Scrolls the page — through Lenis when it is carrying the scroll, so the two never fight. */
export function scrollToY(top: number) {
  if (current) current.scrollTo(top, { duration: 1.1 })
  else window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
}

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
    current = lenis.current
    return () => {
      lenis.current?.destroy()
      lenis.current = null
      current = null
    }
  }, [enabled, lerp, wheelMultiplier])

  return null
}
