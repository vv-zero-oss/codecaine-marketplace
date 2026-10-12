import { useState } from "react"

import { Reveal } from "@/components/motion/reveal"
import { MostFlown, DelayReport } from "@/components/sections/home/passport-teaser"
import { Container } from "@/components/ui/container"
import { AIRPORTS, type PassportYear } from "@/lib/flights"
import { cn } from "@/lib/utils"

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

/** Flights by month: a bar per month, and the one you point at says how many. */
function MonthChart({ data }: { data: PassportYear }) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...data.byMonth, 1)
  const busiest = data.byMonth.indexOf(max)
  const shown = hover ?? busiest
  return (
    <article className="flex h-full flex-col rounded-(--radius-panel) bg-panel p-7 md:p-9">
      <p className="text-ink-2"><span className="font-semibold text-ink">When you flew.</span> {MONTH_NAMES[busiest]} was the busiest month.</p>
      <p className="mt-8 font-data text-h2 leading-none font-medium">
        {data.byMonth[shown]} <span className="text-ink-3">flights in {MONTH_NAMES[shown]}</span>
      </p>
      <div className="mt-8 flex h-48 items-end gap-1.5 sm:gap-2" onMouseLeave={() => setHover(null)}>
        {data.byMonth.map((v, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${MONTH_NAMES[i]}: ${v} flights`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onClick={() => setHover(i)}
            className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <span
              className={cn("w-full origin-bottom rounded-t-[6px] transition-[background-color,height] duration-500 ease-(--ease-out-strong)", i === shown ? "bg-violet" : "bg-violet/25 group-hover:bg-violet/45")}
              style={{ height: `${Math.max(4, (v / max) * 100)}%` }}
            />
            <span className={cn("text-[12.58px]", i === shown ? "font-semibold text-ink" : "text-ink-3")}>{MONTHS[i]}</span>
          </button>
        ))}
      </div>
    </article>
  )
}

/** The airports you passed through most, as bars against the top one. */
function TopAirports({ data }: { data: PassportYear }) {
  const top = data.topAirports[0].visits
  return (
    <article className="flex h-full flex-col rounded-(--radius-panel) bg-panel p-7 md:p-9">
      <p className="text-ink-2"><span className="font-semibold text-ink">Your airports.</span> Where you spent the most time between flights.</p>
      <ol className="mt-8 flex flex-col gap-4">
        {data.topAirports.map((a, i) => (
          <li key={`${data.year}-${a.code}`}>
            <div className="flex items-baseline justify-between">
              <span className="font-data text-[26px] leading-none font-semibold">{a.code} <span className="font-sans text-[14px] font-normal text-ink-3">{AIRPORTS[a.code].city}</span></span>
              <span className="text-[14px] text-ink-2 tabular-nums">{a.visits} visits</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-raised">
              <div className={cn("h-full rounded-full transition-[width] duration-700 ease-(--ease-out-strong)", i === 0 ? "bg-amber" : "bg-ink-4")} style={{ width: `${(a.visits / top) * 100}%` }} />
            </div>
          </li>
        ))}
      </ol>
    </article>
  )
}

/** The year in numbers: when, where, which plane, and how long you waited. */
export function YearNumbers({ data, onYear }: { data: PassportYear; onYear: (y: number) => void }) {
  return (
    <section data-theme="day" className="bg-page pb-section">
      <Container>
        <Reveal>
          <h2 className="type-display max-w-[16ch] text-h1 text-balance">The year, in the numbers nobody else keeps.</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal className="h-full"><MonthChart data={data} /></Reveal>
          <Reveal delay={0.06} className="h-full"><TopAirports data={data} /></Reveal>
          <Reveal className="h-full"><MostFlown year={data.year} /></Reveal>
          <Reveal delay={0.06} className="h-full"><DelayReport year={data.year} onYear={onYear} /></Reveal>
        </div>
      </Container>
    </section>
  )
}
