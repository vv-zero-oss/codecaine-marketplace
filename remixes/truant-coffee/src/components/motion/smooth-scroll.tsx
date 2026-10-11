import { useEffect, useRef } from "react"
import Lenis from "lenis"

/** The live Lenis, for `scrollToY` — null when reduced motion turned it off. */
let active: Lenis | null = null

/** Scroll the page to a y offset: through Lenis when it carries the
 *  scroll, so the two never fight; natively otherwise. */
export function scrollToY(y: number) {
  if (active) active.scrollTo(y, { duration: 1.1 })
  else window.scrollTo({ top: y, behavior: "smooth" })
}

/**
 * Lenis carries the page's scroll: a touch heavy, like the recording, and
 * quick to settle.
 *
 * Held in a ref for the component's lifetime (and destroyed on unmount), so
 * the canvas editor's SDK finds it in React's tree and its Motion switch can
 * pause it. Not created at all when the visitor asks for reduced motion — the
 * editor's Reduced mode answers that query too.
 */
export function SmoothScroll({
  lerp = 0.1,
  wheelMultiplier = 1,
  enabled = true,
}: {
  /** 0–1: how much of the distance each frame covers. Lower is heavier. */
  lerp?: number
  wheelMultiplier?: number
  enabled?: boolean
}) {
  const lenis = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!enabled || reduced) return
    lenis.current = new Lenis({ autoRaf: true, lerp, wheelMultiplier, anchors: { offset: -96 } })
    active = lenis.current
    // A change of page jumps to the top at once, rather than gliding there.
    const jump = () => lenis.current?.scrollTo(0, { immediate: true, force: true })
    window.addEventListener("truant:navigate", jump)
    return () => {
      window.removeEventListener("truant:navigate", jump)
      lenis.current?.destroy()
      lenis.current = null
      active = null
    }
  }, [enabled, lerp, wheelMultiplier])

  return null
}
