import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** The shadcn accordion on Radix, drawn as the page's hairline rows. */
function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-hairline first:border-t", className)} {...props} />
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex min-h-14 flex-1 items-center justify-between gap-6 py-4 text-left text-body text-ink outline-none focus-visible:underline [&[data-state=open]>svg]:rotate-45",
          className,
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden
          className="size-4 shrink-0 text-mute transition-transform duration-(--duration-hover) ease-(--ease-out) group-hover:text-ink"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-6 pr-10 text-small text-ink-soft", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
