import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item className={cn("border-b border-line", className)} {...props} />
)

const AccordionTrigger = ({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "group flex min-h-14 flex-1 items-center justify-between gap-4 py-4 text-left text-[15px] tracking-[-0.01em] text-ink transition-colors hover:text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
        className,
      )}
      {...props}
    >
      {children}
      <Plus className="size-4 shrink-0 text-ink-3 transition-transform duration-200 ease-out group-data-[state=open]:rotate-45" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)

const AccordionContent = ({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
    <div className={cn("pb-5 text-[13px] leading-relaxed text-ink-2", className)}>{children}</div>
  </AccordionPrimitive.Content>
)

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
