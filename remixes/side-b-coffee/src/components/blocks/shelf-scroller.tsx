import { useEffect, useRef, useState, type ReactNode } from "react"

import { Arrows } from "@/components/blocks/arrows"
import { cn } from "@/lib/utils"

/**
 * A horizontal shelf of cards that scrolls (and snaps) under the finger,
 * with arrows that page it by one card for the mouse. The arrows grey out
 * at either end. Used by the merch and the community board.
 */
export function useShelf() {
  const ref = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])
  const page = (dir: 1 | -1) => {
    const el = ref.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 1), behavior: "smooth" })
  }
  const arrows = <Arrows tone="line" onPrev={() => page(-1)} onNext={() => page(1)} prevDisabled={edges.start} nextDisabled={edges.end} />
  return { ref, arrows }
}

export function ShelfTrack({ shelfRef, className, children }: { shelfRef: React.RefObject<HTMLDivElement | null>; className?: string; children: ReactNode }) {
  return (
    <div
      ref={shelfRef}
      className={cn("flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain border-y border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}
    >
      {children}
    </div>
  )
}
