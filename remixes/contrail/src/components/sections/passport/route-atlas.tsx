import { useEffect, useRef, useState } from "react"
import { Plane } from "lucide-react"

import { FlightMap } from "@/components/mock/flight-map"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { AIRPORTS, distanceKm, type PassportYear } from "@/lib/flights"
import { cn } from "@/lib/utils"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/**
 * Where you went: the map holds still beside the list while the trips scroll
 * past it. Whichever trip is in the middle of the window is the one the
 * plane flies.
 */
export function RouteAtlas({ data }: { data: PassportYear }) {
  const [active, setActive] = useState(0)
  const list = useRef<HTMLOListElement>(null)

  useEffect(() => {
    setActive(0)
    const items = [...(list.current?.querySelectorAll<HTMLElement>("[data-trip]") ?? [])]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.trip))
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [data.year])

  // the active trip first, so it's the one the plane flies
  const ordered = [data.routes[active], ...data.routes.filter((_, i) => i !== active)]
  const routes = ordered.map((r) => r.join("-")).join(",")

  return (
    <section data-theme="day" className="bg-page py-section">
      <Container>
        <Reveal>
          <h2 className="type-display max-w-[16ch] text-h1 text-balance">Every leg of {data.year}, on one map.</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="aspect-[1.55] overflow-hidden rounded-(--radius-panel) shadow-(--shadow-float)">
              <FlightMap key={data.year} region="world" palette="violet" routes={routes} drawRoutes labels width={620} height={400} duration={8} />
            </div>
            <p className="mt-3 text-[14px] text-ink-3">
              Now flying: <span className="font-medium text-ink">{AIRPORTS[ordered[0][0]].city} → {AIRPORTS[ordered[0][1]].city}</span>
            </p>
          </div>
          <ol ref={list} className="flex flex-col gap-3">
            {data.routes.map(([a, b], i) => {
              const km = Math.round(distanceKm(AIRPORTS[a], AIRPORTS[b]))
              const on = i === active
              return (
                <li
                  key={`${data.year}-${a}-${b}`}
                  data-trip={i}
                  className={cn(
                    "flex items-center gap-4 rounded-(--radius-card) p-5 transition-[background-color,box-shadow] duration-(--duration-swap) ease-(--ease-out-strong)",
                    on ? "bg-raised shadow-(--shadow-card)" : "bg-panel",
                  )}
                >
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-(--duration-swap)", on ? "bg-violet text-white" : "bg-raised text-ink-3")}>
                    <Plane className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-data text-[22px] leading-none font-semibold tracking-[0.02em]">{a} <span className="text-ink-4">→</span> {b}</p>
                    <p className="mt-1.5 truncate text-[14px] text-ink-3">{AIRPORTS[a].city} to {AIRPORTS[b].city}</p>
                  </div>
                  <div className="text-right text-[14px]">
                    <p className="font-medium tabular-nums">{km.toLocaleString("en-US")} km</p>
                    <p className="text-ink-3">{MONTHS[(i * 5 + data.year) % 12]}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
