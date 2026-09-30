import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-none border-0 border-b border-line bg-transparent px-0 text-base text-ink transition-[border-color,background-color] duration-(--duration-fast) outline-none placeholder:text-ink-mute hover:border-ink-mute focus-visible:border-ink focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger",
        className
      )}
      {...props}
    />
  )
}

export { Input }
