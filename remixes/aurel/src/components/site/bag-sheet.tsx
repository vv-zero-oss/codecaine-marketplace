import { X } from "lucide-react"

import { useCanvasAction } from "@canvas/react"
import { euro, useBag } from "@/components/site/bag"
import { Button } from "@/components/ui/button"
import { ButtonLink } from "@/components/ui/button-link"
import { MixedTitle } from "@/components/ui/mixed-title"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { products } from "@/content"

/** The bag, as a sheet from the right. Registered as an editor switch. */
export function BagSheet() {
  const bag = useBag()
  useCanvasAction("Bag", (next) => bag.setOpen(next ?? !bag.open), { on: bag.open, group: "Site" })
  useCanvasAction("Bag with a piece in it", () => {
    if (bag.count === 0) bag.add(products[1].slug, products[1].sizes[2])
    bag.setOpen(true)
  }, { group: "Site" })

  return (
    <Sheet open={bag.open} onOpenChange={bag.setOpen}>
      <SheetContent side="right" showCloseButton={false} className="w-full gap-0 border-l-line bg-paper p-0 sm:max-w-[440px]">
        <SheetHeader className="flex-row items-center justify-between border-b border-line px-6 py-5">
          <SheetTitle className="font-display text-[26px] font-normal leading-none">
            <MixedTitle as="span" text={`_your_ BAG (${bag.count})`} />
          </SheetTitle>
          <SheetDescription className="sr-only">Pieces you have chosen</SheetDescription>
          <Button variant="ghost" size="icon" className="size-11" onClick={() => bag.setOpen(false)} aria-label="Close bag">
            <X className="size-5" />
          </Button>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
          {bag.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 py-16 text-center">
              <p className="font-serif text-[19px] text-ink-muted">Nothing here yet.</p>
              <ButtonLink href="/collection" label="_see the_ COLLECTION" />
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {bag.lines.map((line) => (
                <li key={line.slug + line.size} className="grid grid-cols-[88px_1fr_auto] gap-4 py-5">
                  <img src={line.product.images[0].src} alt={line.product.images[0].alt} className="aspect-[4/5] w-[88px] object-cover" />
                  <div className="flex flex-col gap-1">
                    <p className="font-display text-[22px] leading-tight">{line.product.name}</p>
                    <p className="font-serif text-[15px] text-ink-muted">
                      {line.product.colour} · Size {line.size} · ×{line.quantity}
                    </p>
                    <button type="button" onClick={() => bag.remove(line.slug, line.size)} className="mt-auto w-fit py-2 font-sans text-[13px] text-ink-muted underline-offset-4 hover:text-ink hover:underline">
                      Remove
                    </button>
                  </div>
                  <p className="font-sans text-[14px] tabular-nums">{euro(line.product.price * line.quantity)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {bag.lines.length > 0 && (
          <SheetFooter className="gap-4 border-t border-line px-6 py-6">
            <div className="flex items-baseline justify-between font-sans text-[15px]">
              <span className="text-ink-muted">Subtotal</span>
              <span className="tabular-nums">{euro(bag.total)}</span>
            </div>
            <Button variant="ink" size="chip" className="w-full">
              <MixedTitle as="span" text="_continue to_ CHECKOUT" />
            </Button>
            <p className="text-center font-serif text-[14px] text-ink-muted">Complimentary delivery and returns in Europe.</p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
