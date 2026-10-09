import type * as React from "react"

import { cn } from "@/lib/utils"

/** A printed photograph: sepia, halftone, a hairline frame. */
export function Photo({ src, alt, className, imgClassName, ...props }: { src: string; alt: string; imgClassName?: string } & React.ComponentProps<"div">) {
  return (
    <div className={cn("photo border border-ink", className)} {...props}>
      <img src={src} alt={alt} loading="lazy" className={imgClassName} />
    </div>
  )
}
