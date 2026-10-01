/**
 * Smooth scroll. Lenis is a requestAnimationFrame loop, so the instance is
 * held in a ref for the page's lifetime and destroyed on unmount — that is
 * what lets the canvas editor's Motion switch find and stop it.
 */
import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    // Lenis, tuned light: lerp 0.1 is the soft, short glide the page scrolls with.
    lenis.current = new Lenis({ autoRaf: true, lerp: 0.1 })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
}
