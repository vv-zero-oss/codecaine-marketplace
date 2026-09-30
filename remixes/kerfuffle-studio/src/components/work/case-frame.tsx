import { ArrowUpRight } from "lucide-react"

import { CASE_BG, servicesLine } from "@/components/work/tones"
import { photo, type Case } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** A case as a rounded colour card: the picture inset, the client and what we
 *  made in a cream strip along the bottom — the cards in the reel. */
export function CaseFrame({ item, className }: { item: Case; className?: string }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={cn("group/frame flex size-full flex-col gap-2 rounded-card border-2 border-ink p-2 shadow-lift", CASE_BG[item.color], className)}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[14px]">
        <img
          src={photo(item.image, 1000)}
          alt={`${item.client}: ${item.title}`}
          className="size-full object-cover transition-transform duration-(--duration-slow) ease-out group-hover/frame:scale-[1.04]"
        />
      </div>
      <div className="flex items-center justify-between gap-3 rounded-[14px] bg-card px-4 py-3 text-ink">
        <div className="min-w-0">
          <p className="truncate display text-2xl md:text-3xl">{item.client}</p>
          <p className="truncate font-serif text-base italic">{servicesLine(item.services)}</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-snow transition-transform duration-(--duration-base) group-hover/frame:rotate-45">
          <ArrowUpRight className="size-4" strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  )
}
