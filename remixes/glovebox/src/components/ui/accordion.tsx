import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** The shadcn accordion, on Radix: each item a white tile on paper. */
function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("rounded-panel bg-surface shadow-hairline", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex min-h-14 flex-1 items-center justify-between gap-4 px-5 py-4 text-left text-[15px] text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink/20 sm:px-6 sm:py-5 sm:text-base rounded-panel",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 text-ink transition-transform duration-(--duration-ui) ease-(--ease-out) group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6 sm:pb-6", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
