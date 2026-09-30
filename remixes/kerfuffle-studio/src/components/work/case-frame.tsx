import { CASE_BORDER } from "@/components/work/tones"
import { photo, type Case } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** A case in a thick coloured frame, its client's name set big across the
 *  bottom — the cards in the “Recent work” pile. */
export function CaseFrame({ item, className }: { item: Case; className?: string }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={cn("group/frame block size-full border-[14px] bg-night-raised", CASE_BORDER[item.color], className)}
    >
      <div className="relative size-full overflow-hidden">
        <img
          src={photo(item.image, 1000)}
          alt={`${item.client}: ${item.title}`}
          className="size-full object-cover transition-transform duration-(--duration-slow) ease-out group-hover/frame:scale-[1.04]"
        />
        <span className="absolute inset-x-0 bottom-3 text-center display text-[clamp(2.25rem,6vw,4rem)] text-snow [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
          {item.client}
        </span>
      </div>
    </Link>
  )
}
