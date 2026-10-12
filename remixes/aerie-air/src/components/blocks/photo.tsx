import { photos, type PhotoName } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * A Pexels photograph from `lib/photos.ts`, by name — cover-cropped into
 * whatever box it is given, with the page's photo radius and soft shadow.
 * `rounded={false}` for a full-bleed band.
 */
export function Photo({
  name,
  className,
  imgClassName,
  rounded = true,
  priority = false,
  position = "center",
}: {
  name: PhotoName
  className?: string
  imgClassName?: string
  rounded?: boolean
  priority?: boolean
  /** CSS object-position, e.g. "30% 50%". */
  position?: string
}) {
  const photo = photos[name]
  return (
    <div className={cn("relative overflow-hidden bg-panel-deep", rounded && "rounded-(--radius-photo)", className)}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        style={{ objectPosition: position }}
        className={cn("absolute inset-0 size-full object-cover", imgClassName)}
      />
    </div>
  )
}

/** One line of credits for the photographs a page uses. */
export function PhotoCredits({ names, className }: { names: PhotoName[]; className?: string }) {
  const unique = [...new Set(names)]
  return (
    <p className={cn("text-micro text-ink-3", className)}>
      Photography on Pexels by{" "}
      {unique.map((name, i) => (
        <span key={name}>
          <a href={photos[name].url} target="_blank" rel="noreferrer" className="link-line">
            {photos[name].by}
          </a>
          {i < unique.length - 1 ? ", " : "."}
        </span>
      ))}
    </p>
  )
}
