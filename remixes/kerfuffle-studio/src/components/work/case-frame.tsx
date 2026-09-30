import { servicesLine } from "@/components/work/meta"
import { photo, type Case } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** A case in the reel: a full-bleed picture with a caption row under it. */
export function CaseFrame({ item, index, className }: { item: Case; index?: number; className?: string }) {
  return (
    <Link href={`/work/${item.slug}`} className={cn("group/frame flex size-full flex-col bg-night", className)}>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <img
          src={photo(item.image, 1400)}
          alt={`${item.client}: ${item.title}`}
          className="size-full object-cover transition-transform duration-(--duration-slow) ease-out group-hover/frame:scale-[1.03]"
        />
      </div>
      <div className="grid grid-cols-12 gap-4 pt-3 text-sm text-snow">
        <span className="label col-span-2 text-snow-mute">{index !== undefined ? String(index + 1).padStart(2, "0") : ""}</span>
        <span className="col-span-5 truncate font-medium">{item.client}</span>
        <span className="col-span-5 truncate text-right text-snow-mute">{servicesLine(item.services)}</span>
      </div>
    </Link>
  )
}
