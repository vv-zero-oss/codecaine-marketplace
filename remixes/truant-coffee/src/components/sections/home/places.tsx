import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"

import { Reveal } from "@/components/motion/reveal"
import { PLACES } from "@/content/coffees"
import { photo } from "@/lib/photos"

/**
 * Where to find us, as a list you can feel: on a pointer, the place's
 * photograph follows the cursor on a soft spring while you are over its
 * row; on touch, each row carries its own photo.
 */
export function Places({ title = "Skip out with us" }: { title?: string }) {
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 })

  return (
    <section
      id="places"
      className="relative bg-paper px-[var(--spacing-gutter)] py-[var(--spacing-section)]"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
      }}
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="type-display text-d5">{title}</h2>
        <p className="max-w-[34ch] text-ink-2">A roastery bar, a window on the canal and a summer cabin up the shore. All three pour whatever came off the drum that week.</p>
      </Reveal>
      <ul className="mt-12 border-t border-ink">
        {PLACES.map((p, i) => (
          <li key={p.name} onPointerEnter={() => setActive(i)} onPointerLeave={() => setActive(null)} className="group border-b border-ink">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(p.address)}`}
              target="_blank"
              rel="noreferrer"
              className="grid gap-3 py-6 md:grid-cols-[1.618fr_1fr_1fr_auto] md:items-baseline md:gap-6"
            >
              <span className="type-display text-d3 transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:translate-x-3">{p.name}</span>
              <span className="text-ink-2">
                {p.kind}
                <br />
                <span className="text-caption text-ink-3">{p.note}</span>
              </span>
              <span className="text-[14px] text-ink-2">
                {p.address}
                <br />
                {p.hours}
              </span>
              <ArrowUpRight className="hidden size-6 stroke-[1.4] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:block" />
              <img src={photo(p.photo, 800, 500)} alt="" loading="lazy" className="mt-2 aspect-[16/10] w-full rounded-[var(--radius-tag)] object-cover md:hidden" />
            </a>
          </li>
        ))}
      </ul>
      <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block" aria-hidden>
        <AnimatePresence>
          {active !== null && (
            <motion.img
              key={active}
              src={photo(PLACES[active].photo, 560, 400)}
              alt=""
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="absolute w-[280px] -translate-x-1/2 -translate-y-[115%] rounded-[var(--radius-tag)] object-cover shadow-photo"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
