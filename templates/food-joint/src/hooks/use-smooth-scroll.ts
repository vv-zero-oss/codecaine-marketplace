import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * Lenis carries the scroll, held in a ref — the pattern the scaffold this
 * template started from uses, and the place the canvas editor's SDK looks for
 * it, so the editor can pause and resume it from its Motion controls.
 *
 * `lerp: 0.1` is the weight of the scroll: smooth, never floaty.
 * Off under reduced motion; the native scroll is the gentler one.
 */
export function useSmoothScroll(): React.RefObject<Lenis | null> {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis.current = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
  return lenis
}
