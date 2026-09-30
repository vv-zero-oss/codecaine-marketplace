import Lenis from "lenis"
import { useEffect, useRef } from "react"

import { useMotionAllowed } from "@/components/motion/use-motion"

/** The one Lenis on the page, for the few places that need to move it. */
let active: Lenis | null = null

export function scrollToTop(immediate = true) {
  if (active) active.scrollTo(0, { immediate, force: true })
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" })
}

/**
 * Lenis carries the scroll: a heavy, glossy glide, tuned by `lerp`.
 *
 * Held in a ref for the component's lifetime (and torn down on unmount), so
 * the canvas SDK can find it walking React's tree and the editor's Motion
 * switch can stop it. Off under reduced motion.
 */
export function SmoothScroll({ lerp = 0.09, wheelMultiplier = 1 }: { lerp?: number; wheelMultiplier?: number }) {
  const lenis = useRef<Lenis | null>(null)
  const { reduced } = useMotionAllowed()
  useEffect(() => {
    if (reduced) return
    lenis.current = new Lenis({ autoRaf: true, lerp, wheelMultiplier, anchors: true })
    active = lenis.current
    return () => {
      lenis.current?.destroy()
      lenis.current = null
      active = null
    }
  }, [lerp, wheelMultiplier, reduced])
  return null
}
