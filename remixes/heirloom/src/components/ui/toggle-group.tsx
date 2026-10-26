import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's toggle group as a row of glass pills: the filter on the founders
 *  and journal pages. */
export function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root className={cn("flex flex-wrap items-center gap-1.5", className)} {...props} />
}

export function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        "inline-flex h-11 items-center rounded-pill border border-line px-4 text-[13px] font-medium text-fg-muted transition-[background-color,color,border-color,transform] duration-200 ease-soft select-none hover:text-fg active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg sm:h-9",
        "data-[state=on]:border-transparent data-[state=on]:bg-paper data-[state=on]:text-on-paper",
        className,
      )}
      {...props}
    />
  )
}
