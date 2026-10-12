import * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's input, in the page's field style: soot, an inset hairline
 *  shadow, an ember ring on focus and a coral one when invalid. */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-(--radius-field) bg-panel px-4 text-[16px] text-ink shadow-(--shadow-field) transition-shadow duration-(--duration-hover) outline-none placeholder:text-ink-4",
        "focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-ember)]",
        "aria-invalid:shadow-[inset_0_0_0_1.5px_var(--color-error)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
