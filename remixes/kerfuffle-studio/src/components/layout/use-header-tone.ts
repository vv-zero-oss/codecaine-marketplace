import { useEffect, useState } from "react"

/**
 * Whether the header is over a dark section right now: the nearest
 * `[data-tone]` under a point just below the header's top edge. The logo turns
 * white over dark sections and flame over light ones.
 */
export function useHeaderTone(pathname: string): "light" | "dark" {
  const [tone, setTone] = useState<"light" | "dark">("light")
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const hits = document.elementsFromPoint(28, 44)
      const hit = hits.find((el) => !el.closest("[data-site-header]"))
      const zone = hit?.closest<HTMLElement>("[data-tone]")
      setTone(zone?.dataset.tone === "dark" ? "dark" : "light")
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    const late = window.setTimeout(read, 300)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
      window.clearTimeout(late)
    }
  }, [pathname])
  return tone
}
