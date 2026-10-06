/**
 * Smooth scroll, held where the canvas editor can reach it.
 *
 * Every other moving thing on these pages is CSS — transitions, keyframes and
 * scroll timelines — which the editor's Motion switch stops and reduces from
 * outside the page. Lenis is the one `requestAnimationFrame` loop, so it is
 * kept in a ref for the component's lifetime: the SDK finds instances by
 * walking React's tree, and one created in an effect and dropped could never
 * be paused from the editor.
 *
 * Off under `prefers-reduced-motion`, read through the media query so the
 * editor's Reduced mode (which answers that query from inside the page)
 * switches it off too.
 */

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const start = () => {
      lenis.current?.destroy()
      lenis.current = reduced.matches ? null : new Lenis({ autoRaf: true })
    }
    start()
    reduced.addEventListener("change", start)
    return () => {
      reduced.removeEventListener("change", start)
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
}
