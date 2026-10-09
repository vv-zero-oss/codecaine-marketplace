import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** The shadcn accordion on Radix, restyled as stacked soft cards. */
function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "rounded-tile bg-tint/60 text-ink-3 transition-[background-color,box-shadow,color] duration-300 ease-out data-[state=open]:bg-paper data-[state=open]:text-ink data-[state=open]:shadow-card",
        className,
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & { icon?: React.ReactNode }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex min-h-14 flex-1 items-center justify-between gap-4 rounded-tile px-5 py-4 text-left text-lg font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-accent",
          className,
        )}
        {...props}
      >
        {children}
        {icon}
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
      <div className={cn("px-5 pb-5 text-[15px] leading-relaxed text-ink-2", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
