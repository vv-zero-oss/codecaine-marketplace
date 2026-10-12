import type * as React from "react"

import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { useStore, type Drawer as DrawerId } from "@/lib/store"
import { cn } from "@/lib/utils"

/**
 * The right-hand drawer every panel opens in — menu, bag, subscription —
 * on the drawer curve, 480ms in, a touch quicker out. Which one is open lives
 * in the store, so any button anywhere can open any of them.
 */
export function Drawer({ id, title, description, className, children }: { id: Exclude<DrawerId, null>; title: string; description: string; className?: string; children?: React.ReactNode }) {
  const { drawer, setDrawer } = useStore()
  return (
    <Sheet open={drawer === id} onOpenChange={(open) => setDrawer(open ? id : null)}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "w-full gap-0 border-0 bg-raised p-0 shadow-sheet sm:max-w-[420px] data-[state=closed]:duration-[360ms] data-[state=open]:duration-[480ms] ease-[var(--ease-drawer)]",
          className,
        )}
      >
        <SheetTitle className="sr-only">{title}</SheetTitle>
        <SheetDescription className="sr-only">{description}</SheetDescription>
        {children}
      </SheetContent>
    </Sheet>
  )
}
