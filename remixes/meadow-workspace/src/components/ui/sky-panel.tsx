import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A rounded panel of sky that a small piece of product UI sits on. The same
 * surface the feature tour and assistant use, so every illustration on the
 * page reads as one family. A faint grid and a soft sun glow keep the colour
 * from looking like an empty fill.
 */
export function SkyPanel({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden rounded-[14px] bg-gradient-to-b from-sky-500 to-sky-200",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="absolute -top-16 -right-10 -z-10 size-56 rounded-full bg-white/25 blur-3xl" />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      {children}
    </div>
  )
}
