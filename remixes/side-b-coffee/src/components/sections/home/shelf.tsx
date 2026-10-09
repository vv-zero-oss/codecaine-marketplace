import { ArrowUpRight } from "lucide-react"

import { CoffeeCard } from "@/components/blocks/coffee-card"
import { Doodle } from "@/components/mock/doodles"
import { Link } from "@/lib/router"

const ACCENTS = ["rust", "ember", "sky"] as const

/**
 * The shelf: three coffees in hairline-ruled cells, and a fourth cell that
 * is a door to the other five. Each cell floods rust on hover.
 */
export function Shelf({ ids = ["deep-cut", "liner-notes", "slow-fade"] }: { ids?: string[] }) {
  return (
    <section className="grid border-b border-line sm:grid-cols-2 xl:grid-cols-4">
      {ids.map((id, i) => (
        <CoffeeCard key={id} coffeeId={id} accent={ACCENTS[i % 3]} className="border-b border-line sm:border-r xl:border-b-0" />
      ))}
      <Link
        href="/shop"
        className="group/all flex min-h-72 flex-col justify-between gap-6 p-(--spacing-gutter) transition-colors duration-300 hover:bg-panel"
      >
        <Doodle name="crate" className="w-28 text-ink" />
        <div className="space-y-3">
          <p className="type-display text-h3 leading-[0.95] tracking-[-0.025em]">
            Five more on the shelf, and one we only roast once a year.
          </p>
          <span className="type-label inline-flex items-center gap-1.5 text-[12px] text-rust">
            Shop all coffee
            <ArrowUpRight className="size-4 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </section>
  )
}
