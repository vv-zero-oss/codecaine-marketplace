import { Accordion as AccordionPrimitive } from "radix-ui"
import { Plus } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's accordion, on Radix, dressed as the page's white question cards. */
function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("rounded-item bg-surface shadow-item", className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex min-h-[4.5rem] flex-1 items-center justify-between gap-4 px-5 py-4 text-left font-serif text-[1.1875rem] leading-snug text-ink outline-none sm:px-6",
          "focus-visible:ring-2 focus-visible:ring-ink/20 rounded-item",
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-hairline text-subtle transition-[transform,background-color,color] duration-(--duration-hover) ease-out group-hover:text-ink-soft group-data-[state=open]:rotate-45 group-data-[state=open]:bg-ink group-data-[state=open]:text-canvas">
          <Plus className="size-3" strokeWidth={2.5} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("-mt-1 px-5 pb-5 text-[0.8125rem] leading-relaxed text-muted sm:px-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
