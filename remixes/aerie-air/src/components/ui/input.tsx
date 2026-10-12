import * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's input, in the page's field style: white, a soft hairline
 *  shadow, an ink ring on focus and a red one when invalid. */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-(--radius-field) bg-raised px-4 text-[16px] text-ink shadow-(--shadow-field) transition-shadow duration-(--duration-hover) outline-none placeholder:text-ink-4",
        "focus-visible:shadow-[0_0_0_1.5px_var(--color-ink)]",
        "aria-invalid:shadow-[0_0_0_1.5px_var(--color-signal-red)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
