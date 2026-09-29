import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * shadcn's checkbox, drawn as the page draws everything: a pair of square
 * brackets, `[ ]`, that fill with a solid block when ticked.
 */
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center gap-[0.35em] outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span aria-hidden>[</span>
      <span className="relative inline-block h-[0.8em] w-[0.8em]">
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          forceMount
          className="absolute inset-0 origin-center scale-0 bg-current transition-transform duration-(--duration-fast) ease-(--ease-out-quart) data-[state=checked]:scale-100"
        />
      </span>
      <span aria-hidden>]</span>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
