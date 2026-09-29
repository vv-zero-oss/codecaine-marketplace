import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { people, pexels, type Person } from "@/content"
import { Link } from "@/lib/router"

/**
 * The next people along, as a strip that scrolls sideways: drag it, swipe it
 * or scroll it with a trackpad. The short bar under it says how far along the
 * strip you are.
 */
export function MoreVoices({ person }: { person: Person }) {
  const strip = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: strip })
  const left = useTransform(scrollXProgress, [0, 1], ["0%", "88%"])
  const drag = useRef<{ x: number; left: number; moved: number } | null>(null)

  const start = person.number % people.length
  const next = Array.from({ length: 14 }, (_, i) => people[(start + i) % people.length])

  return (
    <section aria-labelledby="more-voices" className="border-t border-rule pt-6">
      <h2 id="more-voices" className="px-gutter text-label font-mono uppercase tracking-label">
        More athletes
      </h2>
      <div
        ref={strip}
        className="no-scrollbar mt-6 flex snap-x gap-3 overflow-x-auto overscroll-x-contain px-gutter pb-2 md:cursor-grab"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || !strip.current) return
          drag.current = { x: event.clientX, left: strip.current.scrollLeft, moved: 0 }
        }}
        onPointerMove={(event) => {
          if (!drag.current || !strip.current) return
          const dx = event.clientX - drag.current.x
          drag.current.moved = Math.max(drag.current.moved, Math.abs(dx))
          strip.current.scrollLeft = drag.current.left - dx
        }}
        onPointerUp={() => {
          setTimeout(() => (drag.current = null))
        }}
        onPointerLeave={() => (drag.current = null)}
        onClickCapture={(event) => {
          // A drag that ends over a portrait is not a click on it.
          if (drag.current && drag.current.moved > 6) event.preventDefault()
        }}
      >
        {next.map((other) => (
          <Link
            key={other.slug}
            href={`/story/${other.slug}`}
            draggable={false}
            className="group w-[42vw] shrink-0 snap-start sm:w-[26vw] md:w-[12.6vw]"
          >
            <span className="mb-1.5 flex justify-between gap-2 text-caption">
              <span>{other.number} .</span>
              <span className="truncate">{other.name}</span>
            </span>
            <span className="block aspect-square overflow-hidden rounded-tile bg-paper-soft">
              <img
                src={pexels(other.photo, 400, 400)}
                alt={`Portrait of ${other.name}`}
                loading="lazy"
                draggable={false}
                className="size-full object-cover transition-transform duration-(--duration-slow) ease-(--ease-out-quart) group-hover:scale-[1.04]"
              />
            </span>
          </Link>
        ))}
      </div>
      <div aria-hidden className="relative mx-gutter mt-4 h-[3px] w-[min(18rem,40vw)] bg-rule">
        <motion.div className="absolute inset-y-0 w-[12%] bg-ink-muted" style={{ left }} />
      </div>
    </section>
  )
}
