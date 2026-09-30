import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A photograph that fills its box. Lazy by default, with a paper-toned
 * placeholder behind it so a slow image never shows as a grey hole.
 */
export function Photo({ src, alt, className, eager = false, ...props }: { src: string; alt: string; eager?: boolean } & Omit<React.ComponentProps<"img">, "src" | "alt">) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={cn("block size-full bg-paper-deep object-cover", className)}
      {...props}
    />
  )
}
