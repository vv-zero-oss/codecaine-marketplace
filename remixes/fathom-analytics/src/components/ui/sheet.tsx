import * as Dialog from "@radix-ui/react-dialog"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** shadcn's Sheet: a Radix dialog that slides in from a side. */
export const Sheet = Dialog.Root
export const SheetTrigger = Dialog.Trigger
export const SheetClose = Dialog.Close

export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof Dialog.Content>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px] data-[state=open]:animate-[rise_var(--duration-base)_var(--ease-out-soft)]" />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col gap-6 border-l border-line bg-paper p-6 shadow-card outline-none data-[state=open]:animate-[rise_var(--duration-base)_var(--ease-out-soft)]",
          className,
        )}
        {...props}
      >
        <Dialog.Title className="sr-only">Menu</Dialog.Title>
        <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
