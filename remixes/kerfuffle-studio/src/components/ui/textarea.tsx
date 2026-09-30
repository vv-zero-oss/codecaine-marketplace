import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-base text-ink transition-[border-color,background-color] duration-(--duration-fast) outline-none placeholder:text-ink-mute hover:border-ink-mute focus-visible:border-ink focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
