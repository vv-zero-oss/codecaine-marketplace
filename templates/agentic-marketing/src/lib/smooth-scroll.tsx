import Lenis from "lenis"
import { useEffect } from "react"

/**
 * Lenis carries the page's scroll: wheel input is eased rather than stepped,
 * and in-page links glide to their section. Touch keeps the platform's own
 * scrolling (Lenis leaves it alone by default), and reduced motion turns it
 * off entirely.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -72 } })
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
  return null
}
