import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu"
import type * as React from "react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownPrimitive.Root
const DropdownMenuTrigger = DropdownPrimitive.Trigger

const DropdownMenuContent = ({ className, sideOffset = 8, ...props }: React.ComponentProps<typeof DropdownPrimitive.Content>) => (
  <DropdownPrimitive.Portal>
    <DropdownPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-48 origin-top-right rounded-xl bg-paper p-1.5 shadow-pop outline-none data-[state=closed]:animate-none data-[state=open]:duration-150",
        className,
      )}
      {...props}
    />
  </DropdownPrimitive.Portal>
)

const DropdownMenuItem = ({ className, ...props }: React.ComponentProps<typeof DropdownPrimitive.Item>) => (
  <DropdownPrimitive.Item
    className={cn(
      "flex cursor-pointer flex-col gap-0.5 rounded-lg px-3 py-2 text-[13px] text-ink outline-none transition-colors data-[highlighted]:bg-surface",
      className,
    )}
    {...props}
  />
)

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger }
