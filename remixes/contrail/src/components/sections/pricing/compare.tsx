import { Check, Minus } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

type Cell = boolean | string
const ROWS: { group: string; rows: [string, Cell, Cell, Cell][] }[] = [
  {
    group: "Before you fly",
    rows: [
      ["Live status, gates and terminals", true, true, true],
      ["Delay predictions", "First flight", true, true],
      ["Where's my plane?", "First flight", true, true],
      ["60-day on-time forecast", false, true, true],
      ["Leave-for-airport alerts", false, true, true],
    ],
  },
  {
    group: "At the airport",
    rows: [
      ["Gate change alerts", true, true, true],
      ["Tower advisories and ground stops", false, true, true],
      ["Seat maps and cabin notes", false, true, true],
      ["Connection walk times", false, true, true],
    ],
  },
  {
    group: "Sharing and history",
    rows: [
      ["Friends follow your flights", true, true, true],
      ["People included", "1", "1", "Up to 5"],
      ["Passport", "This year", "Every year", "Every year"],
      ["Import past flights", false, true, true],
    ],
  },
]

function Mark({ value }: { value: Cell }) {
  if (value === true) return <Check className="mx-auto size-4 text-green" strokeWidth={2.6} aria-label="Included" />
  if (value === false) return <Minus className="mx-auto size-4 text-ink-4" aria-label="Not included" />
  return <span className="text-[14px] text-ink-2">{value}</span>
}

/**
 * Compare plans: the header row sticks under the site header while the rows
 * scroll past it, so the column names are never off screen.
 */
export function Compare() {
  return (
    <section id="compare" data-theme="day" className="bg-page pb-section">
      <Container>
        <Reveal>
          <h2 className="type-display max-w-[18ch] text-h2 text-balance">What Pro adds, line by line.</h2>
        </Reveal>
        <div className="mt-10 overflow-x-auto [scrollbar-width:thin] md:overflow-visible">
          <div className="min-w-[620px]">
            <div className="sticky top-[78px] z-10 grid grid-cols-[2fr_1fr_1fr_1fr] rounded-(--radius-field) bg-page/92 py-3 text-center text-[15px] font-semibold backdrop-blur-md">
              <span className="text-left text-ink-3">Feature</span>
              <span>Free</span>
              <span className="text-violet">Pro</span>
              <span>Family</span>
            </div>
            {ROWS.map((g) => (
              <div key={g.group} className="mt-6">
                <p className="type-eyebrow border-b border-line pb-2 text-ink-3">{g.group}</p>
                {g.rows.map(([label, ...cells]) => (
                  <div key={label} className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border-b border-line py-3.5 text-center transition-colors duration-(--duration-hover) hover:bg-panel">
                    <span className="pl-1 text-left text-[15px] text-ink">{label}</span>
                    {cells.map((c, i) => (
                      <span key={i} className={cn(i === 1 && "bg-violet-soft/40 py-1")}><Mark value={c} /></span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
