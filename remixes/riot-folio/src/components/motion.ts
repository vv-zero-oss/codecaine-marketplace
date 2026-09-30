/**
 * Lenis, held in a ref for the life of the app.
 *
 * Lenis runs its own `requestAnimationFrame` loop, which an editor cannot
 * reach from outside the page. The SDK finds it by walking React's tree for
 * the objects a component holds — so the instance lives in a ref and is torn
 * down on unmount, never created in an effect and dropped. See CLAUDE.md,
 * section 11.
 *
 * `lerp` is tuned to the reference's scroll: light, with a short glide.
 * Reduced motion gets the browser's own scrolling back.
 */

import { useEffect, useRef, type RefObject } from "react"
import Lenis from "lenis"

export function useSmoothScroll(lerp = 0.12): RefObject<Lenis | null> {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis.current = new Lenis({ autoRaf: true, lerp, wheelMultiplier: 1 })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [lerp])
  return lenis
}
