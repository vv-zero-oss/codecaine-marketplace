import { servicesLine } from "@/components/work/meta"
import { photo, type Case } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** A case in the grid: the picture, then number, client, title and year on one hairline. */
export function WorkCard({ item, index, className }: { item: Case; index?: number; className?: string }) {
  return (
    <Link href={`/work/${item.slug}`} className={cn("group/card block", className)}>
      <div className="aspect-[4/3] overflow-hidden bg-line">
        <img
          src={photo(item.image, 1100)}
          alt={`${item.client}: ${item.title}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-(--duration-slow) ease-out group-hover/card:scale-[1.03]"
        />
      </div>
      <div className="mt-3 grid grid-cols-12 gap-3 border-t border-line pt-3 text-sm">
        <span className="label col-span-2 pt-0.5 text-ink-mute">{index !== undefined ? String(index + 1).padStart(2, "0") : ""}</span>
        <div className="col-span-7">
          <h3 className="font-medium">{item.client}</h3>
          <p className="text-ink-soft">{item.title}</p>
        </div>
        <div className="col-span-3 text-right text-ink-mute">
          <p>{servicesLine(item.services)}</p>
          <p>{item.year}</p>
        </div>
      </div>
    </Link>
  )
}
