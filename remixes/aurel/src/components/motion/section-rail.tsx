import { motion } from "motion/react"
import { useEffect, useState } from "react"

import { useLenis } from "@/components/motion/smooth-scroll"
import { cn } from "@/lib/utils"

/**
 * The column of small diamonds on the left edge: one per section, the
 * current one lit. Blended with `difference`, so it reads on paper and on
 * film alike. `sections` is a comma-separated list of section ids.
 */
export function SectionRail({ sections, className }: { sections: string; className?: string }) {
  const ids = sections.split(",").map((s) => s.trim()).filter(Boolean)
  const [current, setCurrent] = useState(ids[0])
  const lenis = useLenis()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id)
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [sections]) // eslint-disable-line react-hooks/exhaustive-deps

  const go = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    if (lenis) lenis.scrollTo(element)
    else element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav aria-label="Sections" className={cn("fixed left-rail top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 mix-blend-difference lg:flex", className)}>
      {ids.map((id) => (
        <button key={id} type="button" onClick={() => go(id)} aria-label={`Go to ${id}`} className="grid size-6 place-items-center">
          <motion.span
            className="block size-[7px] rotate-45 bg-white"
            animate={{ opacity: id === current ? 1 : 0.35, scale: id === current ? 1.25 : 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </button>
      ))}
    </nav>
  )
}
