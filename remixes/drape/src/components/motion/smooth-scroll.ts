import Lenis from "lenis"
import { useEffect, useRef } from "react"

import { prefersReducedMotion } from "@/lib/tokens"

/**
 * Lenis carries the page's scroll, held in a ref for the component's lifetime
 * so the canvas editor's Motion switch can find and pause it.
 *
 * `lerp` 0.09 — a touch heavier than the default, matching the long, glassy
 * glide of the reference's scroll. Reduced motion gets the native scroll.
 */
export function useSmoothScroll(lerp = 0.09) {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    lenis.current = new Lenis({ autoRaf: true, lerp, anchors: { offset: -80 } })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [lerp])
  return lenis
}
