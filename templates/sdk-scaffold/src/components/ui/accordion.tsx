import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The shadcn accordion, on Radix.
 *
 * Its open state lives in React, not in the DOM the way `<details>` does, and
 * the panel is animated by Radix's `--radix-accordion-content-height` variable
 * — so it only works if the project's own JavaScript is running. That is
 * exactly why it is here rather than a native `<details>`: opening it is proof
 * that what the editor framed is a running application, not a rendering of
 * one.
 */
function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item className={cn("border-b border-quartz-200", className)} {...props} />
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
          "flex flex-1 items-center justify-between gap-4 py-5 text-left font-medium tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 text-quartz-400 transition-transform duration-200" />
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
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-5 leading-relaxed text-quartz-600", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
