import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check, Minus, Plus, X } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { MerchArt } from "@/components/mock/merch-art"
import { Button, ButtonLink } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { findCoffee, findMerch, money } from "@/content/products"
import { cart, cartCount, cartTotal, useCart, type CartLine } from "@/lib/cart"

const FREE_SHIPPING = 45

/**
 * The cart, as a drawer from the right: every line with its picture, a
 * quantity stepper and a remove, a bar that fills toward free shipping,
 * and a checkout that confirms the order and empties the cart.
 * Lines leave by collapsing (220ms ease-out) so the list closes up instead
 * of jumping.
 */
export function CartDrawer() {
  const { lines, open } = useCart()
  const [placed, setPlaced] = useState(false)
  const reduced = useReducedMotion()
  const total = cartTotal(lines)
  const toFree = Math.max(0, FREE_SHIPPING - total)

  useCanvasAction("Cart drawer", (next) => cart.setOpen(next ?? !open), { on: open, group: "Shop" })
  useCanvasAction("Order placed", (next) => setPlaced(next ?? !placed), { on: placed, group: "Shop" })

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        cart.setOpen(o)
        if (!o) setPlaced(false)
      }}
    >
      <SheetContent side="right" showCloseButton={false} className="w-full gap-0 border-l border-line bg-page p-0 sm:max-w-[420px]">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <SheetTitle className="type-display text-h4 font-semibold tracking-[-0.02em]">
            Your cart <span className="font-mono text-[14px] font-normal text-ink-3 tabular">({cartCount(lines)})</span>
          </SheetTitle>
          <button onClick={() => cart.setOpen(false)} className="grid size-10 place-items-center rounded-full text-ink-2 transition-colors hover:bg-panel hover:text-ink" aria-label="Close cart">
            <X className="size-4" />
          </button>
        </div>
        <SheetDescription className="sr-only">Items in your cart and checkout</SheetDescription>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-moss text-page">
              <Check className="size-6" />
            </span>
            <p className="type-display text-h3 tracking-[-0.025em]">Order's in the queue.</p>
            <p className="text-[15px] text-ink-2">We roast on Tuesday and ship the same afternoon. A note with tracking is on its way to your inbox.</p>
            <Button variant="outline" onClick={() => (cart.setOpen(false), setPlaced(false))}>Back to the shop</Button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="w-24 opacity-90">
              <CoffeeBag />
            </div>
            <p className="type-display text-h4 tracking-[-0.02em]">Nothing on the platter yet.</p>
            <p className="text-[15px] text-ink-2">Start with the Side B Blend — it's what we pour all day.</p>
            <ButtonLink href="/shop" onClick={() => cart.setOpen(false)}>Browse coffee</ButtonLink>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-5 py-3">
              <p className="text-[13px] text-ink-2">{toFree > 0 ? <>Add <b className="font-mono font-medium tabular">{money(toFree)}</b> for free shipping</> : "Free shipping unlocked — on us."}</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-panel-deep">
                <div className="h-full origin-left rounded-full bg-ember transition-transform duration-500 ease-(--ease-out-strong)" style={{ transform: `scaleX(${Math.min(1, total / FREE_SHIPPING)})` }} />
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto px-5">
              <AnimatePresence initial={false}>
                {lines.map((line) => (
                  <motion.li
                    key={line.key}
                    layout={!reduced}
                    initial={reduced ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <Line line={line} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="space-y-3 border-t border-line bg-raised px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] text-ink-2">Subtotal</span>
                <span className="font-mono text-[18px] tabular">{money(total)}</span>
              </div>
              <Button size="lg" className="w-full" onClick={() => (setPlaced(true), cart.clear())}>
                Check out
              </Button>
              <p className="text-center text-[12.5px] text-ink-3">Roasted Tuesday · shipped the same day</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function Line({ line }: { line: CartLine }) {
  const coffee = line.kind !== "merch" ? findCoffee(line.id) : undefined
  const merch = line.kind === "merch" ? findMerch(line.id) : undefined
  return (
    <div className="flex gap-4 border-b border-line py-4">
      <div className="grid size-20 shrink-0 place-items-center rounded-(--radius-card) bg-panel">
        <div className="w-11">
          {merch ? <MerchArt kind={merch.kind} tone={merch.tone} /> : <CoffeeBag name={coffee?.name} label={coffee?.label} roast={coffee?.roast} />}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <p className="type-display text-[19px] leading-tight tracking-[-0.015em]">{line.name}</p>
          <button onClick={() => cart.remove(line.key)} className="-mt-1 -mr-2 grid size-8 place-items-center rounded-full text-ink-3 hover:bg-panel hover:text-rust" aria-label={`Remove ${line.name}`}>
            <X className="size-3.5" />
          </button>
        </div>
        <p className="text-[13px] text-ink-3">{line.detail}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex h-8 items-center rounded-(--radius-button) shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
            <button className="grid h-full w-8 place-items-center text-ink-2 hover:text-ink" onClick={() => cart.setQty(line.key, line.qty - 1)} aria-label="One fewer">
              <Minus className="size-3" />
            </button>
            <span className="w-5 text-center font-mono text-[13px] tabular">{line.qty}</span>
            <button className="grid h-full w-8 place-items-center text-ink-2 hover:text-ink" onClick={() => cart.setQty(line.key, line.qty + 1)} aria-label="One more">
              <Plus className="size-3" />
            </button>
          </div>
          <span className="font-mono text-[14px] tabular">{money(line.price * line.qty)}</span>
        </div>
      </div>
    </div>
  )
}
