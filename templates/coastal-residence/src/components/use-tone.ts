import { useEffect, useState } from "react"

export type Tone = "light" | "dark"

/**
 * Which tone the page has under a given height of the viewport: every section
 * says whether it is a photograph (`data-tone="light"` — white type on top)
 * or a pale ground (`data-tone="dark"` — ink type). The fixed chrome reads it
 * so it stays legible over whatever passes beneath.
 */
export function useToneAt(offset: number) {
  const [tone, setTone] = useState<Tone>("light")
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const y = typeof offset === "number" && offset < 1 ? window.innerHeight * offset : offset
      const x = window.innerWidth / 2
      const hit = document
        .elementsFromPoint(x, y)
        .map((el) => el.closest<HTMLElement>("[data-tone]"))
        .find(Boolean)
      const next = (hit?.dataset.tone as Tone) ?? "dark"
      setTone((current) => (current === next ? current : next))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    const timer = window.setInterval(schedule, 400)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      window.clearInterval(timer)
      cancelAnimationFrame(frame)
    }
  }, [offset])
  return tone
}
