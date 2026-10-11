import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { OriginMap } from "@/components/mock/origin-map"
import { coffeeById } from "@/content/coffees"
import { C_MARKET, ORIGINS } from "@/content/origins"
import { money, photo } from "@/lib/photos"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The trips, told while the map holds still: the coffee belt pins to the
 * window on the left and each chapter on the right lights its origin as it
 * crosses the middle of the screen. Below desktop the map rides above the
 * chapters, pinned under the bar.
 */
export function Journeys({ title = "Six farms, one lake" }: { title?: string }) {
  const [active, setActive] = useState(ORIGINS[0].id)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.origin!)
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  useCanvasAction("Map: next origin", () => setActive(ORIGINS[(ORIGINS.findIndex((o) => o.id === active) + 1) % ORIGINS.length].id), { group: "Field notes" })
  const current = ORIGINS.find((o) => o.id === active)!

  return (
    <section id="journeys" className="bg-night text-night-fg">
      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        <div className="sticky top-[84px] z-10 border-b border-night-line bg-night px-[var(--spacing-gutter)] py-4 lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:border-0 lg:py-12">
          <h2 className="type-display hidden text-d4 lg:block">{title}</h2>
          <OriginMap active={active} className="mt-0 lg:mt-10" />
          <div className="mt-3 flex items-baseline justify-between gap-4 lg:mt-6">
            <motion.p key={current.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="type-display text-d1 text-recess">
              {current.country} · {current.region}
            </motion.p>
            <p className="text-caption text-night-muted tabular-nums">
              Paid {money(current.paid)}/lb · {(current.paid / C_MARKET).toFixed(1)}× market
            </p>
          </div>
        </div>
        <div className="px-[var(--spacing-gutter)] lg:py-[30vh]">
          {ORIGINS.map((o, i) => (
            <article
              key={o.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-origin={o.id}
              className={cn("py-16 transition-opacity duration-500 lg:min-h-[80vh] lg:py-10", active === o.id ? "opacity-100" : "lg:opacity-35")}
            >
              <p className="type-eyebrow text-night-muted">
                {String(i + 1).padStart(2, "0")} · Buying since {o.since}
              </p>
              <h3 className="type-display mt-3 text-d3">{o.title}</h3>
              <img src={photo(o.photo, 1000, 640)} alt={o.photoAlt} loading="lazy" className="mt-6 aspect-[16/10] w-full rounded-[var(--radius-tag)] object-cover" />
              <p className="mt-6 max-w-[52ch] text-night-fg/85">{o.story}</p>
              <p className="mt-5 flex flex-wrap gap-2">
                {o.coffeeIds.map((id) => (
                  <Link key={id} href={`/shop?series=${coffeeById[id].series}`} className="type-display rounded-[var(--radius-tag)] px-2.5 pt-1.5 pb-1 text-[17px] shadow-[inset_0_0_0_1px_var(--color-night-line)] transition-colors hover:bg-night-fg hover:text-night">
                    {coffeeById[id].name} →
                  </Link>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
