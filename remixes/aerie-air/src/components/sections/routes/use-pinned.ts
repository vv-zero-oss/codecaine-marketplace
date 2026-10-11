import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

/** True while the window matches `query`; re-read on change. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches)
  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener("change", update)
    return () => list.removeEventListener("change", update)
  }, [query])
  return matches
}

/**
 * Whether a scroll story should pin its stage: only from `md` up, and never
 * for reduced motion or while the page is being designed — there the story
 * lays itself out as a plain column instead.
 */
export function usePinned() {
  const wide = useMediaQuery("(min-width: 768px)")
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  return wide && !reduced && !designing
}
