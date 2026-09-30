import { ArrowUpRight } from "lucide-react"

import { CASE_BG, servicesLine } from "@/components/work/tones"
import { photo, type Case } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * A case in the work grid: a rounded picture that lifts on hover over a block
 * of its case colour, then the client, the year and what we made in one row.
 */
export function WorkCard({ item, className }: { item: Case; className?: string }) {
  return (
    <Link href={`/work/${item.slug}`} className={cn("group/card block", className)}>
      <div className={cn("rounded-card border-2 border-ink", CASE_BG[item.color])}>
        <div className="aspect-[4/5] overflow-hidden rounded-[18px] border-ink transition-transform duration-(--duration-base) ease-out group-hover/card:-translate-x-1.5 group-hover/card:-translate-y-1.5 group-hover/card:border-2">
          <img
            src={photo(item.image, 800)}
            alt={`${item.client}: ${item.title}`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-(--duration-slow) ease-out group-hover/card:scale-[1.04]"
          />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="display text-[clamp(1.9rem,2.8vw,2.6rem)]">{item.client}</h3>
          <p className="mt-1 font-serif text-lg leading-tight italic">{item.title}</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-[transform,background-color,color] duration-(--duration-base) group-hover/card:rotate-45 group-hover/card:bg-ink group-hover/card:text-snow">
          <ArrowUpRight className="size-4" strokeWidth={2.5} />
        </span>
      </div>
      <p className="mt-2 flex gap-2 font-mono text-[11px] text-ink-mute uppercase">
        <span>{item.year}</span>
        <span>·</span>
        <span>{servicesLine(item.services)}</span>
      </p>
    </Link>
  )
}
