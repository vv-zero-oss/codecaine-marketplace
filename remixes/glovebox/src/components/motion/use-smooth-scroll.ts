import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * Lenis carries the page's scroll: a light, slightly heavy glide that settles
 * softly, tuned so scroll-linked frames feel scrubbed rather than stepped.
 *
 * Held in a ref for the page's lifetime, which is what lets the editor's
 * `@canvas/react` find the instance and stop or resume it from the Motion
 * switch. Skipped entirely when the visitor asks for reduced motion.
 */
export function useSmoothScroll(lerp = 0.09): React.RefObject<Lenis | null> {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis.current = new Lenis({ autoRaf: true, lerp, anchors: true, smoothWheel: true })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [lerp])
  return lenis
}
