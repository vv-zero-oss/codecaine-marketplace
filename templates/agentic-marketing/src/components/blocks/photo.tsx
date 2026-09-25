import { cn } from "@/lib/utils"
import { pexels, pexelsSrcSet, type Photo as PhotoData } from "@/photos"

/** A Pexels photograph, painted in its average colour until it arrives. */
export function Photo({
  photo,
  sizes = "100vw",
  widths = [320, 640, 960, 1280],
  className,
  eager = false,
}: {
  photo: PhotoData
  sizes?: string
  widths?: number[]
  className?: string
  eager?: boolean
}) {
  // A photo not yet chosen (`id: 0` in photos.ts) paints its tone only.
  if (!photo.id) return <div aria-hidden style={{ backgroundColor: photo.tone }} className={cn("size-full", className)} />
  return (
    <img
      src={pexels(photo, widths[Math.min(1, widths.length - 1)])}
      srcSet={pexelsSrcSet(photo, widths)}
      sizes={sizes}
      alt={photo.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ backgroundColor: photo.tone }}
      className={cn("block size-full object-cover", className)}
    />
  )
}
