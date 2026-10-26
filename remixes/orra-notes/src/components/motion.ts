/**
 * Lenis carries the page's scroll. It runs on `requestAnimationFrame`, so it
 * is held in a ref for the component's lifetime — that is what lets the canvas
 * editor's SDK find it (by walking React's tree) and pause it from the Motion
 * switch. A `new Lenis()` created and dropped inside an effect would be
 * invisible to it.
 */
import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    // A light, slightly heavy glide — the page settles rather than snapping.
    lenis.current = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -72 } })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
}
