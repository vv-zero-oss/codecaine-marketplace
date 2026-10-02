import * as TabsPrimitive from "@radix-ui/react-tabs"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** Index tabs, as on a card file: the active one is raised and joins the card. */
function Tabs(props: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("flex items-end gap-1 px-2", className)} {...props} />
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "relative -mb-0.5 min-h-11 rounded-t-[10px] border-2 border-b-0 border-ink bg-paper-dark px-4 font-type text-[0.72rem] uppercase tracking-[0.12em] text-ink-soft transition-[transform,background-color] duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-paper focus-visible:outline-2 focus-visible:outline-rust data-[state=active]:z-10 data-[state=active]:-translate-y-1 data-[state=active]:bg-paper-bright data-[state=active]:text-ink",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("focus-visible:outline-2 focus-visible:outline-rust", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
