import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's Sheet on Radix Dialog: the mobile menu slides in like a folded page. */
const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close

function SheetContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-desk/70 data-[state=closed]:animate-[fade-out_160ms_ease-out_forwards] data-[state=open]:animate-[fade-in_200ms_ease-out]" />
      <DialogPrimitive.Content
        data-lenis-prevent
        className={cn(
          "paper-sheet fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col gap-6 border-l-4 border-double border-ink p-6 shadow-[-18px_0_40px_rgb(0_0_0/0.4)] data-[state=closed]:animate-[sheet-out_220ms_var(--ease-out)_forwards] data-[state=open]:animate-[sheet-in_320ms_var(--ease-out)]",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close aria-label="Close" className="absolute top-4 right-4 grid size-11 place-items-center rounded-full border-2 border-ink bg-paper-bright shadow-[0_3px_0_var(--ink)] transition-transform active:translate-y-0.5 active:shadow-[0_1px_0_var(--ink)]">
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

const SheetTitle = DialogPrimitive.Title
const SheetDescription = DialogPrimitive.Description

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription }
