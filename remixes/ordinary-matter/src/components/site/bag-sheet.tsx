import { Minus, Plus, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { ProductThumb } from "@/components/mock/product-visual"
import { Button, ButtonLink } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { FREE_SHIPPING, productById } from "@/content/shop"
import { CLOTH } from "@/components/mock/cover-art"
import { money, useBag } from "@/lib/bag"
import { cn } from "@/lib/utils"

/** The stamp that lands on a placed order — the one celebratory moment. */
function PostedStamp() {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "rotate(-14deg) scale(1.25)" }}
      animate={{ opacity: 1, transform: "rotate(-8deg) scale(1)" }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.25, delay: 0.15 }}
      className="grid size-36 place-items-center rounded-full border-2 border-moss text-center text-moss"
    >
      <div>
        <p className="type-label text-[10px]">Ordinary Matter</p>
        <p className="type-display text-h3 leading-none">Posted</p>
        <p className="type-label mt-1 text-[10px]">With care</p>
      </div>
    </motion.div>
  )
}

/**
 * The bag: lines with steppers, a free-shipping rule that fills, and a
 * checkout that really empties the bag into an order.
 */
export function BagSheet() {
  const bag = useBag()
  useCanvasAction("Bag", (next) => bag.setOpen(next ?? !bag.open), { on: bag.open, group: "Shop" })
  const toFree = Math.max(0, FREE_SHIPPING - bag.subtotal)
  const progress = Math.min(1, bag.subtotal / FREE_SHIPPING)

  return (
    <Sheet open={bag.open} onOpenChange={bag.setOpen}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-[440px]">
        <div className="border-b border-line px-5 pt-5 pb-4">
          <SheetTitle className="type-display text-h3 font-normal">Your bag</SheetTitle>
          <SheetDescription className="type-label mt-2 text-ink-3">
            {bag.count === 0 ? "Nothing here yet" : `${bag.count} ${bag.count === 1 ? "item" : "items"}`}
          </SheetDescription>
        </div>

        {bag.lastOrder && bag.count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <PostedStamp />
            <p className="type-display mt-8 text-h3">Thank you.</p>
            <p className="mt-3 max-w-[30ch] text-ink-2">
              Order {bag.lastOrder.number} — {bag.lastOrder.items} {bag.lastOrder.items === 1 ? "item" : "items"}, {money(bag.lastOrder.total)}. It leaves the studio wrapped in paper within two days.
            </p>
            <Button variant="outline" className="mt-8" onClick={() => bag.setOpen(false)}>
              Keep reading
            </Button>
          </div>
        ) : bag.count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="type-display text-h3">An empty bag.</p>
            <p className="mt-3 max-w-[28ch] text-ink-2">Start with the new volume — or a set of the field prints.</p>
            <ButtonLink href="/shop" className="mt-8" onClick={() => bag.setOpen(false)}>
              Visit the shop
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="px-5 pt-4">
              <p className="text-[14px] text-ink-2">
                {toFree > 0 ? (
                  <>
                    <span className="text-ink">{money(toFree)}</span> from free shipping
                  </>
                ) : (
                  "Shipping is on us."
                )}
              </p>
              <div className="mt-2 h-px w-full bg-line-strong">
                <div
                  className="h-px origin-left bg-ink transition-transform duration-(--duration-swap) ease-(--ease-out-strong)"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto px-5 py-2" data-lenis-prevent>
              <AnimatePresence initial={false}>
                {bag.lines.map((line) => {
                  const product = productById(line.id)!
                  return (
                    <motion.li
                      key={`${line.id}-${line.edition ?? ""}`}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="flex gap-4 border-b border-line py-4"
                    >
                      <ProductThumb product={product} edition={line.edition} className="w-20 shrink-0" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-serif text-[17px] leading-snug text-ink">{product.name}</p>
                          <button
                            type="button"
                            aria-label={`Remove ${product.name}`}
                            onClick={() => bag.remove(line.id, line.edition)}
                            className="-mt-2 -mr-2 grid size-9 shrink-0 place-items-center text-ink-3 transition-colors hover:text-ink"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        {line.edition && <p className="type-label mt-1 text-ink-3">{CLOTH[line.edition].label}</p>}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
                            <button type="button" aria-label="One fewer" onClick={() => bag.setQty(line.id, line.edition, line.qty - 1)} className="grid size-9 place-items-center text-ink-2 hover:text-ink">
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-6 text-center font-sans text-[14px] tabular-nums">{line.qty}</span>
                            <button type="button" aria-label="One more" onClick={() => bag.setQty(line.id, line.edition, line.qty + 1)} className="grid size-9 place-items-center text-ink-2 hover:text-ink">
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <p className="font-sans text-[15px] tabular-nums">{money(product.price * line.qty)}</p>
                        </div>
                      </div>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ul>
            <div className="border-t border-line px-5 pt-4 pb-6">
              <dl className="space-y-1.5 font-sans text-[14px]">
                <div className="flex justify-between text-ink-2">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{money(bag.subtotal)}</dd>
                </div>
                <div className="flex justify-between text-ink-2">
                  <dt>Shipping</dt>
                  <dd className="tabular-nums">{bag.shipping ? money(bag.shipping) : "Free"}</dd>
                </div>
                <div className={cn("flex justify-between pt-2 text-[16px] text-ink")}>
                  <dt>Total</dt>
                  <dd className="tabular-nums">{money(bag.total)}</dd>
                </div>
              </dl>
              <Button className="mt-5 w-full" size="lg" onClick={bag.checkout}>
                Place order — {money(bag.total)}
              </Button>
              <p className="mt-3 text-center text-[13px] text-ink-3">A demo checkout: nothing is charged.</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
