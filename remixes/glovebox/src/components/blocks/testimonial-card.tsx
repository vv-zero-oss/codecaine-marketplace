import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

type TestimonialCardProps = {
  quote: string
  name: string
  /** What they drive, set in the mono tag. */
  car: string
  image: string
  alt: string
  className?: string
}

/** A member's words beside their photo, on a white card over the map. */
export function TestimonialCard({ quote, name, car, image, alt, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "grid w-full max-w-[48rem] gap-4 rounded-[1.25rem] bg-surface p-3 shadow-float sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-6 sm:p-4",
        className,
      )}
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-tile object-cover sm:aspect-[5/7]"
      />
      <div className="flex flex-col gap-6 px-1 pb-1 sm:py-2 sm:pr-3">
        <blockquote className="font-display text-[clamp(1.375rem,1.1vw+1rem,2rem)] leading-[1.18] text-ink">
          “{quote}”
        </blockquote>
        <figcaption className="mt-auto flex items-center justify-between gap-3">
          <span className="text-[15px] text-ink sm:text-[17px]">{name}</span>
          <Chip tone="neutral">{car}</Chip>
        </figcaption>
      </div>
    </figure>
  )
}
