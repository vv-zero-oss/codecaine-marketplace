import { Star } from "lucide-react"

/** Five review stars in green squares, as review sites show them. */
export function Stars({ label = "Rated 5 out of 5" }: { label?: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="grid size-[18px] place-items-center rounded-[2px] bg-mint-strong">
          <Star className="size-3 fill-white text-white" strokeWidth={0} />
        </span>
      ))}
    </div>
  )
}
