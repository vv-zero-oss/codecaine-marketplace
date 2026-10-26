import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, useState } from "react"

import { LibraryPhone, RecapDoc, ShareCard, WalkingRecorder } from "@/components/mockups/rail-mockups"
import { RAIL } from "@/content"
import { cn } from "@/lib/utils"

const MOCKUPS = { library: LibraryPhone, walk: WalkingRecorder, recap: RecapDoc, share: ShareCard }

/**
 * A row of espresso product cards that slides sideways as the page scrolls
 * past it (desktop), and scrolls by swipe on touch. `travel` is how far, in
 * pixels, the row moves over the section's passage.
 */
export function ProductRail({ travel = 260 }: { travel?: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  // Touch screens scroll the row themselves; the scroll-linked drift is for wide screens.
  const [desktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches)
  const still = reduce || !desktop
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const transform = useTransform(scrollYProgress, [0, 1], still ? ["translateX(0px)", "translateX(0px)"] : [`translateX(${travel * 0.4}px)`, `translateX(${-travel * 0.6}px)`])

  return (
    <section id="rail" ref={ref} aria-label="More from Orra" className="scroll-mt-20 overflow-hidden pt-20 sm:pt-24">
      <div className="snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:overflow-visible">
        <motion.ul
          data-canvas-ignore
          style={{ transform }}
          className="flex w-max gap-4 px-5 sm:px-10 lg:pl-[max(2.5rem,calc((100vw-1200px)/2))]"
        >
          {RAIL.map((item) => (
            <RailCard key={item.id} label={item.label} kind={item.kind} wide={"wide" in item && item.wide} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export function RailCard({ label, kind, wide = false }: { label: string; kind: keyof typeof MOCKUPS; wide?: boolean }) {
  const Mockup = MOCKUPS[kind]
  return (
    <li
      className={cn(
        "relative flex h-[440px] shrink-0 snap-start items-center justify-center overflow-hidden rounded-card bg-graphite shadow-subtle sm:h-[560px]",
        wide ? "w-[86vw] sm:w-[640px]" : "w-[78vw] sm:w-[380px]",
      )}
    >
      <Mockup />
      <span className="absolute bottom-6 left-6 rounded-pill bg-void/50 px-3 py-1 text-[14px] text-snow backdrop-blur-[4px]">{label}</span>
    </li>
  )
}
