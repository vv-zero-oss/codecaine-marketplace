import type * as React from "react"

import { cn } from "@/lib/utils"

/** A small grey label over a short line of ink — the caption beside every
 *  photograph that needs one. */
export function CaptionBlock({ label, children, className, ...props }: { label: string } & React.ComponentProps<"div">) {
  return (
    <div className={cn("max-w-[210px] text-caption", className)} {...props}>
      <p className="text-muted">{label}</p>
      <p className="mt-1.5 text-ink">{children}</p>
    </div>
  )
}
