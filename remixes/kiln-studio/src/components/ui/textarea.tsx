import * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's textarea, in the same field style as `Input`. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-(--radius-field) bg-panel px-4 py-3 text-[16px] text-ink shadow-(--shadow-field) transition-shadow duration-(--duration-hover) outline-none placeholder:text-ink-4",
        "focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-ember)] aria-invalid:shadow-[inset_0_0_0_1.5px_var(--color-error)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
