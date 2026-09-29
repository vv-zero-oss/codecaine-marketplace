import type * as React from "react"

import { cn } from "@/lib/utils"
import { pexels, type Photo as PhotoData } from "@/content"

/**
 * A Pexels photograph filling its box.
 *
 * The box is sized by the caller (an aspect ratio, a height); the picture is
 * `object-cover` inside it. `width` is the pixel width asked of the Pexels
 * CDN — the largest this slot is ever drawn at, doubled for dense screens.
 */
export function Photo({
  photo,
  width = 1200,
  className,
  imgClassName,
  eager,
  ...props
}: {
  photo: PhotoData
  width?: number
  imgClassName?: string
  eager?: boolean
} & React.ComponentProps<"figure">) {
  return (
    <figure className={cn("relative m-0 overflow-hidden bg-swirl", className)} {...props}>
      {photo.id != null && (
        <img
          src={pexels(photo.id, width)}
          alt={photo.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={cn("absolute inset-0 size-full object-cover", imgClassName)}
          style={photo.focus ? { objectPosition: photo.focus } : undefined}
        />
      )}
    </figure>
  )
}
