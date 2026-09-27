import { useEffect, useState } from "react"

/**
 * A beat's own clock: while `active`, steps through `at` (seconds from the
 * start of the beat) and returns how many marks have passed. Leaving the beat
 * resets it, so scrolling back plays it again. Reduced motion jumps to the end.
 */
export function useTimeline(active: boolean, at: readonly number[]) {
  const [passed, setPassed] = useState(0)
  const key = at.join(",")
  useEffect(() => {
    if (!active) {
      setPassed(0)
      return
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPassed(at.length)
      return
    }
    const ids = at.map((t, i) => setTimeout(() => setPassed(i + 1), t * 1000))
    return () => ids.forEach(clearTimeout)
    // `key` stands for `at`, which callers pass as a fresh literal each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, key])
  return passed
}
