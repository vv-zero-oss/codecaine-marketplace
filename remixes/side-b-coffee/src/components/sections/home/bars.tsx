import { useEffect, useState } from "react"
import { ArrowUpRight, Clock } from "lucide-react"

import { Doodle } from "@/components/mock/doodles"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { CAFES, type Cafe } from "@/content/site"
import { photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function hour(h: number) {
  return h === 12 ? "12 p.m." : h > 12 ? `${h - 12} p.m.` : `${h} a.m.`
}

/** Open right now? Read off the visitor's own clock, refreshed each minute. */
function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

function status(cafe: Cafe, now: Date) {
  const [open, close] = cafe.hours[now.getDay()]
  const h = now.getHours() + now.getMinutes() / 60
  if (h >= open && h < close) {
    const left = close - h
    return { open: true, text: left < 1 ? `Closing soon — until ${hour(close)}` : `Open now · until ${hour(close)}` }
  }
  const tomorrow = cafe.hours[(now.getDay() + 1) % 7][0]
  return { open: false, text: h < open ? `Closed · opens ${hour(open)}` : `Closed · opens ${hour(tomorrow)} tomorrow` }
}

/**
 * Where to find us — set loud: "Come say hi." huge across the top, then
 * the two bars as big photo cards with a live open/closed light, the
 * week's hours (today's row picked out) and directions.
 */
export function Bars() {
  const now = useNow()
  return (
    <section id="bars" className="scroll-mt-16 border-t border-line py-(--spacing-section)">
      <Container>
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="type-display text-display">
            Come say <span className="text-rust">hi.</span>
          </h2>
          <Doodle name="bike" className="hidden w-40 md:block" />
        </div>
        <div className="grid gap-(--spacing-gutter) md:grid-cols-2">
          {CAFES.map((cafe, i) => {
            const s = status(cafe, now)
            return (
              <Reveal key={cafe.id} delay={i * 0.08} as="article" className="group/bar flex flex-col gap-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-card) bg-panel shadow-(--shadow-card)">
                  <img src={photo(cafe.photo, 1400)} alt={`${cafe.name} from the street`} loading="lazy" className="size-full object-cover transition-transform duration-700 ease-(--ease-out-strong) group-hover/bar:scale-[1.03]" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-raised/95 px-3 py-1.5 text-[13px] shadow-(--shadow-xs)">
                    <span className="relative flex size-2">
                      {s.open && <span className="absolute inline-flex size-full rounded-full bg-moss opacity-60 motion-safe:animate-ping" />}
                      <span className={cn("relative inline-flex size-2 rounded-full", s.open ? "bg-moss" : "bg-rust")} />
                    </span>
                    {s.text}
                  </span>
                </div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="type-label text-[11.5px] text-ink-3">{cafe.city}</p>
                    <h3 className="type-display mt-1 text-h3">{cafe.name}</h3>
                    <p className="mt-1 text-[15px] text-ink-2">{cafe.street}</p>
                  </div>
                  <a
                    href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(cafe.street)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="type-label group/dir inline-flex h-9 items-center gap-1.5 rounded-(--radius-button) px-3 text-[11.5px] text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors hover:bg-panel"
                  >
                    Directions <ArrowUpRight className="size-3.5 transition-transform duration-(--duration-hover) group-hover/dir:translate-x-0.5 group-hover/dir:-translate-y-0.5" />
                  </a>
                </div>
                <p className="max-w-[48ch] text-[15px] text-ink-2">{cafe.note}</p>
                <ul className="grid grid-cols-7 overflow-hidden rounded-(--radius-field) border border-line text-center">
                  {cafe.hours.map(([o, c], d) => (
                    <li key={d} className={cn("border-r border-line px-1 py-2 last:border-r-0", d === now.getDay() && "bg-ink text-page")}>
                      <p className="type-label text-[10px]">{DAYS[d]}</p>
                      <p className="mt-0.5 font-mono text-[11px] tabular">
                        {o}–{c > 12 ? c - 12 : c}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="flex items-center gap-1.5 text-[12.5px] text-ink-3">
                  <Clock className="size-3.5" /> Hours in your local time; a.m. opening, p.m. close.
                </p>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
