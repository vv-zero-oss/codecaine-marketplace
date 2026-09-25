import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Every photograph on the site. The ratio is held by the frame, not the file,
 * so a gallery lays out before a single image has loaded and swapping a
 * placeholder for real work cannot move anything.
 */
export function Photo({
  src,
  alt,
  ratio = "portrait",
  className,
  ...props
}: Omit<React.ComponentProps<"img">, "src"> & {
  src: string
  ratio?: "portrait" | "landscape" | "square" | "tall"
}) {
  const aspect = {
    portrait: "aspect-[4/5]",
    landscape: "aspect-[3/2]",
    square: "aspect-square",
    tall: "aspect-[2/3]",
  }[ratio]
  return (
    <div className={cn("overflow-hidden bg-paper-200", aspect, className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        {...props}
      />
    </div>
  )
}
