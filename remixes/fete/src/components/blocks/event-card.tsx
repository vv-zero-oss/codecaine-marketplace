import { MapPin } from "lucide-react"

import { PosterArt } from "@/components/mock/poster"
import { Badge } from "@/components/ui/badge"
import { formatDate, priceLabel, type FeteEvent } from "@/content/events"
import { cn } from "@/lib/utils"

/**
 * One event in a list: the poster in its white mat, then the date, the name
 * and who is hosting. The whole card is the button; the poster leans in a
 * touch on hover.
 */
export function EventCard({ event, onOpen, className }: { event: FeteEvent; onOpen?: (event: FeteEvent) => void; className?: string }) {
  const full = event.going >= event.capacity
  return (
    <button
      type="button"
      onClick={() => onOpen?.(event)}
      className={cn(
        "group flex w-full flex-col rounded-(--radius-panel) p-2 text-left transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-panel active:scale-[0.985] active:duration-(--duration-press)",
        className,
      )}
    >
      <span className="block aspect-square w-full rounded-(--radius-poster) bg-raised p-[5px] shadow-(--shadow-poster) transition-transform duration-(--duration-scene) ease-(--ease-out-strong) group-hover:-translate-y-1 group-hover:-rotate-1">
        <PosterArt poster={event.poster} className="rounded-[10px]" />
      </span>
      <span className="mt-4 flex items-center gap-2 px-1 text-[14px] text-ink-3">
        <span className="font-medium text-berry">{formatDate(event.date)}</span>
        <span aria-hidden>·</span>
        <span className="tabular-nums">{event.time}</span>
        <Badge variant={event.price === 0 ? "green" : "default"} className="ml-auto rounded-full px-2 group-hover:bg-raised">
          {priceLabel(event.price)}
        </Badge>
      </span>
      <span className="mt-1 px-1 text-[19px] leading-tight font-semibold tracking-[-0.022em] text-ink">{event.name}</span>
      <span className="mt-1 flex items-center gap-1 px-1 text-[14px] text-ink-3">
        <MapPin className="size-3.5" /> {event.city} · {event.host}
      </span>
      <span className="mt-3 flex items-center gap-2 px-1 pb-1 text-[13px] text-ink-3 tabular-nums">
        <span className="h-1 w-16 overflow-hidden rounded-full bg-line">
          <span className="block h-full rounded-full flare-fill" style={{ width: `${Math.min(100, (event.going / event.capacity) * 100)}%` }} />
        </span>
        {full ? "Waitlist" : `${event.going} going`}
      </span>
    </button>
  )
}
