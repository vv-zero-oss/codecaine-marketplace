import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

/** True when a scroll story should pin: a window at least `md` wide and no
 *  request for reduced motion. Below that the story stacks. */
export function usePinned(query = "(min-width: 768px)") {
  const reduced = useReducedMotion()
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [query])
  return wide && !reduced
}
