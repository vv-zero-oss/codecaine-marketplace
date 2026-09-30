import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** The shadcn dialog, on Radix, restyled to the Glovebox tokens. */
function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-ink-strong/60 backdrop-blur-sm data-[state=open]:animate-[overlay-in_220ms_var(--ease-out)]",
        className,
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-panel bg-ink-strong shadow-panel outline-none data-[state=open]:animate-[dialog-in_260ms_var(--ease-out)] motion-reduce:data-[state=open]:animate-[overlay-in_200ms_ease]",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-glass text-surface backdrop-blur-md transition-colors duration-(--duration-ui) hover:bg-surface/30 focus-visible:ring-2 focus-visible:ring-surface/60 focus-visible:outline-none sm:size-9">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn("sr-only", className)} {...props} />
}

export { Dialog, DialogTrigger, DialogContent, DialogTitle }
