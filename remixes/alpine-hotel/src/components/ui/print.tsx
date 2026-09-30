import { cn } from "@/lib/utils"

/**
 * A photograph printed with a white border, lying on the page, with a
 * numbered caption set underneath as in a printed guide.
 */
export function Print({
  src,
  alt,
  fig,
  caption,
  ratio = "4/3",
  className,
  imgClassName,
}: {
  src: string
  alt: string
  fig?: string
  caption?: string
  ratio?: "4/3" | "3/4" | "4/5" | "1/1" | "16/10" | "3/2"
  className?: string
  imgClassName?: string
}) {
  return (
    <figure className={cn("flex flex-col", className)}>
      <div className="rounded-print bg-sheet p-2 shadow-(--shadow-print) sm:p-2.5">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ aspectRatio: ratio }}
          className={cn("w-full object-cover saturate-[0.92] sepia-[0.08]", imgClassName)}
        />
      </div>
      {(fig || caption) && (
        <figcaption className="mt-3 flex gap-3 text-[13px] leading-snug text-ink-soft">
          {fig && <span className="label shrink-0 pt-px text-ink-faint">Fig. {fig}</span>}
          {caption && <span className="font-serif italic">{caption}</span>}
        </figcaption>
      )}
    </figure>
  )
}
