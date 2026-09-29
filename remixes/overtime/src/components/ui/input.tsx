import * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's input, reduced to a caret on a hairline: no box, no radius. */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 border-0 border-b border-current/30 bg-transparent px-0 py-1 text-base font-mono uppercase tracking-label text-current outline-none transition-colors placeholder:text-ink-muted focus-visible:border-current md:text-label",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
