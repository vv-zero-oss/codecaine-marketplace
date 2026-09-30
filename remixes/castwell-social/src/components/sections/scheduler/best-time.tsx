import { useState } from "react"

import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { PixelList } from "@/components/ui/pixel-list"
import { Section } from "@/components/sections/shared/section"
import { cn } from "@/lib/utils"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const SLOTS = ["6", "8", "10", "12", "14", "16", "18", "20", "22"]

// Engagement by day and hour, 0–4. Evenings and weekend mornings run hot.
const HEAT = [
  [0, 1, 1, 2, 1, 1, 3, 2, 1],
  [0, 1, 1, 2, 1, 2, 4, 3, 1],
  [0, 1, 2, 3, 1, 1, 3, 2, 1],
  [0, 1, 1, 2, 1, 2, 3, 3, 2],
  [0, 1, 1, 2, 1, 1, 2, 2, 1],
  [1, 2, 3, 3, 2, 1, 1, 2, 2],
  [1, 3, 4, 3, 2, 1, 1, 2, 1],
]
const SHADE = ["bg-sage-deep/60", "bg-mint-soft/60", "bg-mint-soft", "bg-mint", "bg-mint-ink"]

/** When this audience engages, one cell per day and two hours. */
export function Heatmap({ className }: { className?: string }) {
  const [hover, setHover] = useState<[number, number] | null>(null)
  return (
    <div className={cn("border border-line bg-page p-4 md:p-6", className)}>
      <div className="grid grid-cols-[36px_repeat(9,minmax(0,1fr))] gap-1">
        <span />
        {SLOTS.map((s) => (
          <span key={s} className="text-center text-[10px] text-muted tabular-nums">{s}</span>
        ))}
        {HEAT.map((row, d) => (
          <Row key={d} day={DAYS[d]} row={row} d={d} hover={hover} setHover={setHover} />
        ))}
      </div>
      <p className="mt-4 h-4 text-[12px] text-muted">
        {hover
          ? `${DAYS[hover[0]]} ${SLOTS[hover[1]]}:00 — ${["quiet", "low", "steady", "high", "peak"][HEAT[hover[0]][hover[1]]]} engagement`
          : "Hover a slot to see how your audience responds."}
      </p>
    </div>
  )
}

function Row({
  day,
  row,
  d,
  hover,
  setHover,
}: {
  day: string
  row: number[]
  d: number
  hover: [number, number] | null
  setHover: (v: [number, number] | null) => void
}) {
  return (
    <>
      <span className="self-center text-[11px] text-muted">{day}</span>
      {row.map((v, h) => (
        <button
          key={h}
          type="button"
          aria-label={`${day} ${SLOTS[h]}:00`}
          onMouseEnter={() => setHover([d, h])}
          onFocus={() => setHover([d, h])}
          onMouseLeave={() => setHover(null)}
          onClick={() => setHover([d, h])}
          className={cn(
            "aspect-square cursor-pointer transition-[outline-color] duration-150 outline outline-1 -outline-offset-1 outline-transparent",
            SHADE[v],
            hover && hover[0] === d && hover[1] === h && "outline-ink",
          )}
        />
      ))}
    </>
  )
}

export function BestTime() {
  return (
    <Section id="best-time" tone="sage">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>Best-time engine</Eyebrow>
          <h2 className="font-serif text-title font-light text-balance text-ink">Post when your audience is awake, not when you are.</h2>
          <p className="max-w-lg text-[15px] leading-relaxed text-ink-soft md:text-base">
            Castwell learns when each audience engages — per channel, per market — and slots every post into its best
            hour. It keeps learning, and moves next week's slots when the pattern shifts.
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="font-serif text-[4rem] leading-none font-light text-ink">
              <CountUp value={31} prefix="+" suffix="%" />
            </span>
            <span className="text-[14px] text-ink-soft">median reach lift in the first month</span>
          </div>
          <PixelList items={["Per-channel, per-market slots", "Time-zone aware for global teams", "Re-tuned every week"]} accent="mint" className="text-ink-soft" />
        </Reveal>
        <Reveal delay={0.1}>
          <Heatmap />
        </Reveal>
      </Container>
    </Section>
  )
}
