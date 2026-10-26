import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's accordion, in Heirloom's hairlines. The panel opens by animating
 *  its grid row from 0fr to 1fr, so the height is never measured in script. */
export function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />
}

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-line", className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group/acc flex min-h-14 flex-1 items-center justify-between gap-6 py-4 text-left text-[15px] font-medium tracking-[-0.01em] transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
          className,
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden
          className="size-4 shrink-0 text-fg-muted transition-transform duration-300 ease-soft group-data-[state=open]/acc:rotate-45"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      forceMount
      // Radix hides closed content; kept in the layout so the row can animate.
      hidden={false}
      className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-soft data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100 motion-reduce:transition-none"
      {...props}
    >
      <div data-canvas-ignore className="overflow-hidden">
        <div className={cn("max-w-xl pb-5 text-sm leading-relaxed text-fg-muted", className)}>{children}</div>
      </div>
    </AccordionPrimitive.Content>
  )
}
