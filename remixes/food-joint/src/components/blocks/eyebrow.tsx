import type * as React from "react"

import { cn } from "@/lib/utils"

/** The small condensed label above every section title, with its dot. */
export function Eyebrow({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("flex items-center gap-2 font-condensed text-label uppercase", className)} {...props}>
      <span aria-hidden className="size-2.5 rounded-pill bg-orange" />
      {children}
    </p>
  )
}
