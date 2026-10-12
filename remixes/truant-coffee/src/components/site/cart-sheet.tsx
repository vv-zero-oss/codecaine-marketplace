import { useState } from "react"
import { Check, Minus, Plus, Trash2, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Drawer } from "@/components/site/drawer"
import { Button, ButtonLink } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import { coffeeById, COFFEES, FREE_SHIPPING, PROMO_CODE } from "@/content/coffees"
import { money } from "@/lib/photos"
import { linePrice, useStore, useWeight } from "@/lib/store"
import { cn } from "@/lib/utils"

type Checkout = "idle" | "placing" | "placed"

function Stepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex h-8 items-center rounded-[var(--radius-button)] shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
      <button type="button" aria-label={`One fewer ${label}`} onClick={() => onChange(value - 1)} className="grid size-8 place-items-center text-ink-2 transition-colors hover:text-ink active:scale-90">
        <Minus className="size-3.5" />
      </button>
      <span className="w-6 overflow-hidden text-center text-[13px] tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={value} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.18 }} className="inline-block">
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button type="button" aria-label={`One more ${label}`} onClick={() => onChange(value + 1)} className="grid size-8 place-items-center text-ink-2 transition-colors hover:text-ink active:scale-90">
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

/**
 * The bag: every line with its own drawn bag, a stepper and a remove; a bar
 * filling toward free shipping; a code field that really takes TRUANT15; and
 * a checkout that places the order (a demo one — it clears the bag and hands
 * back an order number).
 */
export function CartSheet() {
  const { lines, setQty, remove, subtotal, discount, total, toFreeShipping, promo, applyPromo, add, clear, lastAdded, setDrawer } = useStore()
  const weight = useWeight()
  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState(false)
  const [checkout, setCheckout] = useState<Checkout>("idle")
  const [order, setOrder] = useState("")

  useCanvasAction("Order placed", (next) => {
    const on = next ?? checkout !== "placed"
    setOrder("TR-48213")
    setCheckout(on ? "placed" : "idle")
  }, { on: checkout === "placed", group: "Cart" })

  const progress = Math.min(1, (subtotal - discount) / FREE_SHIPPING)

  const place = () => {
    setCheckout("placing")
    window.setTimeout(() => {
      setOrder(`TR-${Math.floor(10000 + Math.random() * 89999)}`)
      setCheckout("placed")
      clear()
    }, 1100)
  }

  return (
    <Drawer id="cart" title="Your bag" description="The coffees in your bag, shipping and checkout">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <p className="type-display text-d1">Your bag</p>
        <SheetClose className="-mr-2 grid size-11 place-items-center transition-transform hover:rotate-90" aria-label="Close the bag">
          <X className="size-5 stroke-[1.4]" />
        </SheetClose>
      </div>

      {checkout === "placed" ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 flex-col items-start justify-center gap-4 px-7">
          <span className="grid size-12 place-items-center rounded-full bg-ok-soft text-ok">
            <Check className="size-6" />
          </span>
          <p className="type-display text-d3">Skipped out. Coffee's coming.</p>
          <p className="text-ink-2">
            Order <span className="font-medium text-ink tabular-nums">{order}</span> goes in Tuesday's roast and ships Wednesday. We'll email tracking the moment the bag is sealed.
          </p>
          <SheetClose asChild>
            <Button variant="outline" onClick={() => setCheckout("idle")}>
              Back to the page
            </Button>
          </SheetClose>
        </motion.div>
      ) : lines.length === 0 ? (
        <div className="flex flex-1 flex-col px-6 py-8" data-lenis-prevent>
          <p className="type-display text-d2">Nothing in here yet.</p>
          <p className="mt-2 text-ink-2">Start with something the roasters are drinking this week.</p>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {COFFEES.filter((c) => c.isNew).slice(0, 2).map((c) => (
              <li key={c.id} className="rounded-[var(--radius-card)] bg-shelf p-3">
                <div className="mx-auto w-3/4">
                  <CoffeeBag coffeeId={c.id} weight={weight("12oz")} />
                </div>
                <p className="type-display mt-2 text-[20px] leading-none">{c.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-caption tabular-nums text-ink-2">{money(c.price)}</span>
                  <Button size="sm" onClick={() => add(c.id)}>
                    Add
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <ButtonLink href="/shop" variant="outline" className="mt-6 self-start" onClick={() => setDrawer(null)}>
            See every coffee
          </ButtonLink>
        </div>
      ) : (
        <>
          <div className="border-b border-line px-6 py-4">
            <p className="text-[13px] text-ink-2">
              {toFreeShipping > 0 ? (
                <>
                  <span className="font-medium text-ink tabular-nums">{money(toFreeShipping)}</span> away from free shipping
                </>
              ) : (
                <span className="font-medium text-ok">Free shipping is on us.</span>
              )}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-paper-2">
              <motion.div className={cn("h-full rounded-full", progress >= 1 ? "bg-ok" : "bg-ink")} initial={false} animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
            <AnimatePresence initial={false}>
              {lines.map((line) => {
                const coffee = coffeeById[line.coffeeId]
                if (!coffee) return null
                return (
                  <motion.li
                    key={line.key}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto", backgroundColor: lastAdded === line.key ? "var(--color-tomato-soft)" : "rgba(0,0,0,0)" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="-mx-3 overflow-hidden rounded-[var(--radius-card)] px-3"
                  >
                    <div className="flex gap-4 border-b border-line py-4">
                      <div className="w-16 shrink-0 rounded-[var(--radius-tag)] bg-shelf p-1.5">
                        <CoffeeBag coffeeId={coffee.id} weight={weight(line.size)} shadow={false} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="type-display text-[22px] leading-none">{coffee.name}</p>
                          <p className="text-[13px] tabular-nums">{money(linePrice(line) * line.qty)}</p>
                        </div>
                        <p className="mt-1 text-caption text-ink-3">
                          {weight(line.size)} · {line.grind}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <Stepper value={line.qty} onChange={(n) => setQty(line.key, n)} label={coffee.name} />
                          <button type="button" onClick={() => remove(line.key)} aria-label={`Remove ${coffee.name}`} className="grid size-8 place-items-center text-ink-3 transition-colors hover:text-tomato">
                            <Trash2 className="size-4 stroke-[1.5]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ul>
          <div className="border-t border-line px-6 pt-4 pb-6">
            {promo ? (
              <p className="flex items-center gap-2 text-[13px] text-ok">
                <Check className="size-4" /> {PROMO_CODE} — 15% off, applied
              </p>
            ) : (
              <form
                className={cn("flex gap-2", codeError && "shake")}
                onAnimationEnd={() => setCodeError(false)}
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!applyPromo(code)) setCodeError(true)
                }}
              >
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Discount code"
                  aria-label="Discount code"
                  aria-invalid={codeError}
                  className="h-10 min-w-0 flex-1 rounded-[var(--radius-field)] bg-paper px-3 text-[14px] uppercase placeholder:normal-case placeholder:text-ink-4 shadow-[inset_0_0_0_1px_var(--color-line-strong)] outline-none focus:shadow-[inset_0_0_0_1.5px_var(--color-ink)] aria-[invalid=true]:shadow-[inset_0_0_0_1.5px_var(--color-tomato)]"
                />
                <Button variant="outline" type="submit">
                  Apply
                </Button>
              </form>
            )}
            <dl className="mt-4 space-y-1 text-[14px]">
              <div className="flex justify-between text-ink-2">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{money(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-ok">
                  <dt>Discount</dt>
                  <dd className="tabular-nums">−{money(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-ink-2">
                <dt>Shipping</dt>
                <dd>{toFreeShipping > 0 ? "$6.00" : "Free"}</dd>
              </div>
              <div className="flex justify-between pt-2 text-[16px] font-medium">
                <dt>Total</dt>
                <dd className="tabular-nums">{money(total + (toFreeShipping > 0 ? 6 : 0))}</dd>
              </div>
            </dl>
            <Button variant="tomato" size="lg" className="mt-4 w-full" onClick={place} disabled={checkout === "placing"}>
              {checkout === "placing" ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper" /> Placing order
                </span>
              ) : (
                "Check out"
              )}
            </Button>
          </div>
        </>
      )}
    </Drawer>
  )
}
