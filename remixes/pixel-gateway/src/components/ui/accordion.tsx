import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("bg-surface shadow-px [--px-edge:var(--color-line)] data-[state=open]:[--px-edge:var(--color-accent)]", className)}
      {...props}
    />
  )
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex min-h-14 flex-1 items-center justify-between gap-phi-2 px-phi-3 py-phi-2 text-left text-base font-semibold text-fg outline-none focus-visible:bg-surface-2 sm:text-lg",
          className,
        )}
        {...props}
      >
        {children}
        <Plus className="size-5 shrink-0 text-accent-hi transition-transform duration-150 ease-[steps(3,end)] group-data-[state=open]:rotate-45" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-phi-3 pb-phi-3 text-base text-fg-muted", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
