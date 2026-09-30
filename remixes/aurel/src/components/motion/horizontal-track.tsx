import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * A row that is pinned and read sideways as the page scrolls down.
 *
 * The section is exactly as tall as the row is wide (plus a screen), so one
 * pixel of scroll moves the row one pixel — no faster, no slower. Below
 * `md` it is an ordinary vertical stack: sideways reading on a phone is a
 * swipe, not a scroll.
 */
export function HorizontalTrack({ children, className }: { children: ReactNode; className?: string }) {
  const section = useRef<HTMLElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const element = row.current
    if (!element) return
    const measure = () => setDistance(Math.max(0, element.scrollWidth - window.innerWidth))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -distance])

  return (
    <section ref={section} className={cn("relative", className)} style={{ height: `calc(100svh + ${reduced ? 0 : distance}px)` }}>
      <div className="flex flex-col gap-10 px-gutter md:sticky md:top-0 md:h-svh md:flex-row md:items-center md:gap-0 md:overflow-hidden md:px-0" data-canvas-ignore>
        <motion.div ref={row} style={{ x }} className="flex flex-col gap-10 md:flex-row md:gap-[4vw] md:px-gutter" data-canvas-ignore>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
