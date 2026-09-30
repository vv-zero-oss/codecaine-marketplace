import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * Lenis carries the scroll, held in a ref — the place the canvas editor's SDK
 * looks for it, so its Motion switch can stop and resume it.
 *
 * `lerp: 0.085` matches the reference's glide: smooth and a little heavy,
 * never floaty. Off under reduced motion; the native scroll is the gentler one.
 */
export function useSmoothScroll(): React.RefObject<Lenis | null> {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis.current = new Lenis({ autoRaf: true, lerp: 0.085, anchors: true })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
  return lenis
}
