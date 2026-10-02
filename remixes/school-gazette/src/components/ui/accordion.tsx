import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** The shadcn accordion on Radix, skinned as a letters page: ruled, typed, a plus that turns. */
function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b-2 border-ink first:border-t-2", className)} {...props} />
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex min-h-14 flex-1 items-center justify-between gap-4 py-4 text-left font-condensed text-[clamp(1.3rem,2.4vw,1.8rem)] uppercase leading-none tracking-tight transition-colors hover:text-rust focus-visible:outline-2 focus-visible:outline-rust",
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper-bright shadow-[0_2px_0_var(--ink)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-data-[state=open]:rotate-[135deg]">
          <Plus className="size-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
      <div className={cn("max-w-2xl pb-6 text-[1.05rem] leading-relaxed text-ink-soft", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
