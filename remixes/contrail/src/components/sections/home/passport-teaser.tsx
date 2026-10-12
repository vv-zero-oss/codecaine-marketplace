import { useState } from "react"
import { ArrowRight, Share } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { ContrailMark } from "@/components/site/logo"
import { Aircraft, ContourLines } from "@/components/mock/aircraft"
import { Phone } from "@/components/mock/phone"
import { PassportScreen } from "@/components/mock/screens"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { SplitFlap } from "@/components/motion/split-flap"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { PASSPORT } from "@/lib/flights"
import { cn } from "@/lib/utils"

/** The distance screen: how far you've flown, against the Earth, the Moon
 *  and Mars. */
function DistanceScreen() {
  const bars = [
    { label: "20.4× around Earth", w: "92%", dot: "bg-blue" },
    { label: "0.95× to the Moon", w: "44%", dot: "bg-ink-4" },
    { label: "0.12× to Mars", w: "18%", dot: "bg-red" },
  ]
  return (
    <div className="absolute inset-0 bg-[#121218] px-[1.1em] pt-[3.8em] text-white">
      <p className="flex justify-between text-[0.55em] text-white/50">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}</p>
      <p className="mt-[1.4em] flex items-center justify-between text-[0.72em] font-semibold">Flight distance <span className="flex items-center gap-[0.3em] rounded-full bg-white/10 px-[0.6em] py-[0.2em] text-[0.8em]"><Share className="size-[1em]" /> Share</span></p>
      <p className="font-data text-[2.4em] leading-none font-medium tabular-nums">816,633 <span className="text-[0.5em] text-white/60">mi</span></p>
      <p className="mt-[0.3em] text-[0.58em] text-white/50">Average flight: 1,402 km</p>
      <div className="mt-[1em] flex flex-col gap-[0.5em]">
        {bars.map((b) => (
          <div key={b.label} className="relative h-[1.7em] overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 rounded-full bg-violet-bright" style={{ width: b.w }} />
            <span className={cn("absolute top-1/2 left-[0.25em] size-[1.3em] -translate-y-1/2 rounded-full", b.dot)} />
            <span className="absolute top-1/2 right-[0.7em] -translate-y-1/2 text-[0.58em] font-semibold">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Flights per month, as a line. */
function FlightsScreen() {
  const months = PASSPORT[1].byMonth
  const max = Math.max(...months)
  const points = months.map((v, i) => `${10 + i * 25},${90 - (v / max) * 70}`).join(" ")
  return (
    <div className="absolute inset-0 bg-[#121218] px-[1.1em] pt-[3.8em] text-white">
      <p className="flex items-center justify-between text-[0.72em] font-semibold">Flights <span className="rounded-full bg-white/10 px-[0.6em] py-[0.2em] text-[0.8em]">Share</span></p>
      <p className="font-data text-[2.4em] leading-none font-medium">54 <span className="text-[0.5em] text-white/60">flights</span></p>
      <p className="mt-[0.4em] text-[0.6em] leading-snug text-white/70"><b className="text-white">31</b> domestic<br /><b className="text-white">18</b> international<br /><b className="text-white">5</b> long haul</p>
      <svg viewBox="0 0 300 100" className="mt-[1em] w-full overflow-visible" aria-label="Flights per month">
        {[20, 50, 80].map((y) => <line key={y} x1={0} x2={300} y1={y} y2={y} stroke="rgb(255 255 255 / 0.08)" />)}
        <polyline points={points} fill="none" stroke="var(--color-violet-bright)" strokeWidth={2.4} strokeLinejoin="round" />
        {months.map((v, i) => <circle key={i} cx={10 + i * 25} cy={90 - (v / max) * 70} r={3.4} fill="var(--color-violet-bright)" />)}
      </svg>
    </div>
  )
}

/** The delay report: total time lost, on a split-flap board, by year. */
export function DelayReport({ year: controlled, onYear }: { year?: number; onYear?: (year: number) => void }) {
  const [own, setOwn] = useState(2025)
  const year = controlled ?? own
  const setYear = (y: number) => (onYear ? onYear(y) : setOwn(y))
  const data = PASSPORT.find((p) => p.year === year) ?? PASSPORT[1]
  PASSPORT.forEach((p) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Delay report — ${p.year}`, () => setYear(p.year), { on: year === p.year, group: "Delay report" })
  })
  const hours = String(data.delayHours).padStart(2, "0")
  return (
    <article className="relative flex h-full min-h-[540px] flex-col overflow-hidden rounded-(--radius-panel) bg-[radial-gradient(120%_90%_at_50%_100%,var(--color-violet-deep),var(--color-violet-ink)_70%)] p-7 md:p-9">
      <p className="text-night-fg"><span className="font-semibold">Add up the hours delays took.</span> <span className="text-night-2fg">Then share it, if you dare.</span></p>
      <div className="my-auto py-10">
        <div className="flex items-center justify-between border-b-2 border-violet-bright/60 pb-3">
          <span className="flex items-center gap-2 text-[20px] font-semibold text-white"><ContrailMark tone="light" className="size-6" /> Contrail</span>
          <span className="text-[20px] font-semibold text-violet-glow">Delay Report</span>
        </div>
        <SplitFlap key={year} text={`${hours}HRS`} dimFrom={2} className="mt-6 text-[clamp(40px,6vw,64px)]" />
        <div className="mt-4 grid grid-cols-3 rounded-lg bg-black/25 px-3 py-2 font-mono text-[clamp(12px,1.4vw,16px)] text-violet-glow">
          <span className="text-white">{data.worstDelay.hours} HOURS</span>
          <span className="text-center">{data.worstDelay.flight.replace(" ", "")}</span>
          <span className="text-right">{data.worstDelay.route}</span>
        </div>
        <p className="mt-2 text-[13px] text-night-muted">Worst single delay, flight and route</p>
      </div>
      <div className="flex gap-1 self-start rounded-full bg-black/25 p-1" role="tablist" aria-label="Year">
        {PASSPORT.map((p) => (
          <button
            key={p.year}
            role="tab"
            aria-selected={year === p.year}
            onClick={() => setYear(p.year)}
            className={cn("h-9 rounded-full px-4 text-[14px] font-medium transition-colors duration-(--duration-hover)", year === p.year ? "bg-white text-ink" : "text-night-2fg hover:text-white")}
          >
            {p.year}
          </button>
        ))}
      </div>
    </article>
  )
}

/**
 * Look back: the passport. A hall of fame of four stat screens, the aircraft
 * you fly most, and the delay report on a split-flap board.
 */
export function PassportTeaser() {
  return (
    <section data-theme="day" className="bg-page pb-section">
      <Container>
        <Reveal>
          <h2 className="type-display max-w-[16ch] text-h1 text-balance">Every mile you've flown, kept somewhere nice.</h2>
          <p className="mt-6 max-w-[58ch] text-lead text-ink-2">
            Fly once a year or once a week, Contrail keeps a record of the good stuff. How many times round the Earth? Your worst delay? The plane you're always on? It's all here — and yes, you can import the flights you took before.
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <article className="grid overflow-hidden rounded-(--radius-panel) bg-panel lg:grid-cols-[1fr_1.15fr]">
            <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
              <h3 className="max-w-[14ch] text-h3 font-semibold">A hall of fame for your flying.</h3>
              <div>
                <p className="max-w-[36ch] text-ink-2">Kick back and scroll the most thorough — and best-looking — record of your flying you'll find anywhere.</p>
                <ButtonLink href="/passport" variant="ink" className="mt-6">See the passport <ArrowRight /></ButtonLink>
              </div>
            </div>
            <div className="relative grid h-[520px] grid-cols-2 gap-4 overflow-hidden px-4 pt-6 sm:px-8 [mask-image:linear-gradient(black_80%,transparent)]">
              <div className="flex flex-col gap-4">
                <Phone tone="dark" className="w-full"><DistanceScreen /></Phone>
                <Phone tone="dark" className="w-full"><PassportScreen year={2025} /></Phone>
              </div>
              <div className="-mt-24 flex flex-col gap-4">
                <Phone tone="dark" className="w-full"><PassportScreen year={2024} /></Phone>
                <Phone tone="dark" className="w-full"><FlightsScreen /></Phone>
              </div>
            </div>
          </article>
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Reveal>
            <MostFlown />
          </Reveal>
          <Reveal delay={0.06}><DelayReport /></Reveal>
        </div>
      </Container>
    </section>
  )
}

/** The aircraft you fly most, drawn, with its tail number. */
export function MostFlown({ year = 2025 }: { year?: number }) {
  const plane = (PASSPORT.find((p) => p.year === year) ?? PASSPORT[1]).aircraft
  return (
            <article className="relative flex h-full min-h-[540px] flex-col overflow-hidden rounded-(--radius-panel) bg-panel p-7 md:p-9">
              <p className="text-ink-2"><span className="font-semibold text-violet">Meet the plane you're always on.</span> Track your favourite seats and cabins, too.</p>
              <div className="mt-10 font-data">
                <p className="text-[22px] font-semibold text-ink">Most flown aircraft</p>
                <p className="text-[clamp(48px,6vw,67.77px)] leading-none font-normal tracking-[-0.02em] text-ink">{plane.type}</p>
                <p className="mt-1 text-[22px] text-ink-2"><CountUp key={year} value={plane.flights} prefix="" decimals={0} /> flights · <CountUp key={`h${year}`} value={plane.hours} prefix="" decimals={0} /> hours</p>
              </div>
              <Aircraft className="relative z-10 mt-6 -mr-10 w-[110%]" />
              <div className="relative z-10 ml-auto -mt-2 w-fit border-t border-dashed border-ink-4 pt-2 font-data">
                <p className="text-[15px] font-semibold text-ink">Most frequent tail</p>
                <p className="text-[26px] leading-tight text-ink">{plane.tailFlights} flights</p>
                <p className="mt-1 font-mono text-[14px] font-medium text-ink">{plane.tail}</p>
                <p className="text-[13px] text-ink-3">{plane.type} · {plane.age}</p>
              </div>
              <ContourLines className="absolute inset-x-0 bottom-0 h-56" />
            </article>
  )
}
