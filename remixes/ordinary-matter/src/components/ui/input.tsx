import * as React from "react"
import { cn } from "@/lib/utils"

/** A field drawn as a single rule, the way a form on paper is. */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 border-0 border-b border-rule bg-transparent px-0 font-serif text-[17px] text-ink transition-[border-color] duration-(--duration-hover) outline-none placeholder:text-ink-4 focus-visible:border-ink disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-clay",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
