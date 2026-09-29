import type * as React from "react"
import { motion, type MotionStyle } from "motion/react"

import { cn } from "@/lib/utils"
import { pexels, type Photo as PhotoData } from "@/content"

/**
 * A Pexels photograph filling its box. The box is sized by the caller; the
 * picture is `object-cover` inside it. `width` is the pixel width asked of the
 * CDN — the largest this slot is drawn at, doubled for dense screens.
 * `imgStyle` takes motion values, for pictures that drift inside their frame.
 */
export function Photo({
  photo,
  width = 1200,
  className,
  imgClassName,
  imgStyle,
  eager,
  ...props
}: {
  photo: PhotoData
  width?: number
  imgClassName?: string
  imgStyle?: MotionStyle
  eager?: boolean
} & React.ComponentProps<"figure">) {
  return (
    <figure className={cn("relative m-0 overflow-hidden bg-forest/10", className)} {...props}>
      <motion.img
        src={pexels(photo.id, width)}
        alt={photo.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className={cn("absolute inset-0 size-full object-cover", imgClassName)}
        style={{ objectPosition: photo.focus, ...imgStyle }}
      />
    </figure>
  )
}
