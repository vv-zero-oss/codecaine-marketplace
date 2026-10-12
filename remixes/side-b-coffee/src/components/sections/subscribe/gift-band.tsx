import { useState } from "react"
import { Check, Gift } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Doodle } from "@/components/mock/doodles"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { money } from "@/content/products"
import { cart } from "@/lib/cart"

const MONTHS = [3, 6, 12] as const
/** two 12 oz bags a month at the subscriber price */
const PER_MONTH = 34

/**
 * Give it away: a rust band with a gift tag, and a dialog that takes a
 * name and a length, prices it live, and puts the gift in the cart.
 * The tag swings a few degrees on hover, like it's tied to the bag.
 */
export function GiftBand() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [months, setMonths] = useState<number>(6)
  const [note, setNote] = useState("")
  const [added, setAdded] = useState(false)
  useCanvasAction("Gift dialog", (next) => setOpen(next ?? !open), { on: open, group: "Subscribe" })

  const total = PER_MONTH * months * (months === 12 ? 0.9 : 1)

  return (
    <section className="bg-rust p-2 sm:p-4">
      <div className="group/gift grid items-center gap-8 overflow-hidden rounded-(--radius-panel) bg-panel p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <p className="type-label text-[11.5px] text-ink-3">Gift a subscription</p>
          <h2 className="type-display text-display">
            Give them <span className="whitespace-nowrap text-rust">side B.</span>
          </h2>
          <p className="max-w-[44ch] text-lead text-ink-2">Three, six or twelve months of fresh coffee, a card with your note on it, and a record recommendation in every box.</p>
          <Button size="lg" onClick={() => setOpen(true)}>
            <Gift /> Gift a subscription
          </Button>
        </div>
        <div className="relative mx-auto grid h-64 w-full max-w-[320px] place-items-center">
          <div className="w-[46%] -rotate-3">
            <CoffeeBag name="A gift for you" label="honey" artwork="honey" />
          </div>
          <div className="absolute top-8 right-6 origin-top-left rotate-6 rounded-(--radius-chip) bg-raised px-3 py-2 shadow-(--shadow-card) transition-transform duration-[520ms] ease-(--ease-out-strong) group-hover/gift:rotate-[-4deg]">
            <p className="type-label text-[9.5px] text-ink-3">To</p>
            <p className="type-display text-[20px] leading-tight">{name.trim() || "Someone good"}</p>
          </div>
          <Doodle name="record" className="absolute bottom-0 left-0 w-20" />
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (!o) window.setTimeout(() => setAdded(false), 200)
        }}
      >
        <DialogContent className="w-[min(500px,calc(100vw-24px))] max-w-none rounded-(--radius-panel) border-0 bg-page p-6 shadow-(--shadow-lift) sm:max-w-none sm:p-8">
          {added ? (
            <div className="space-y-4 py-4 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-moss text-page">
                <Check className="size-6" />
              </span>
              <DialogTitle className="type-display text-h3 font-semibold">{name.trim()}'s gift is in your cart.</DialogTitle>
              <DialogDescription className="text-[15px] text-ink-2">Check out when you're ready — we'll post the card on the day you pick at checkout.</DialogDescription>
              <div className="flex justify-center gap-2">
                <Button onClick={() => (setOpen(false), cart.setOpen(true))}>Open cart</Button>
                <Button variant="outline" onClick={() => setOpen(false)}>Done</Button>
              </div>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                if (!name.trim()) return
                cart.add({ id: `gift-${months}`, name: `Gift subscription for ${name.trim()}`, detail: `${months} months · 2 bags a month${note ? " · with a note" : ""}`, price: total, kind: "subscription" }, { open: false })
                setAdded(true)
              }}
            >
              <div className="space-y-2">
                <DialogTitle className="type-display text-h3 font-semibold">Who's it for?</DialogTitle>
                <DialogDescription className="text-[15px] text-ink-2">Two bags a month of whatever we're most excited about.</DialogDescription>
              </div>
              <label className="block space-y-1.5">
                <span className="text-[13.5px] font-medium">Their name</span>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Mira" autoComplete="off" />
              </label>
              <fieldset>
                <legend className="mb-1.5 text-[13.5px] font-medium">How long</legend>
                <ToggleGroup type="single" variant="outline" value={String(months)} onValueChange={(v) => v && setMonths(Number(v))} className="w-full">
                  {MONTHS.map((m) => (
                    <ToggleGroupItem key={m} value={String(m)} className="h-11 flex-1">
                      {m} months
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </fieldset>
              <label className="block space-y-1.5">
                <span className="text-[13.5px] font-medium">A note for the card (optional)</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, 140))}
                  rows={3}
                  className="w-full resize-none rounded-(--radius-field) border border-input bg-raised px-3 py-2 text-[15px] shadow-(--shadow-xs) outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  placeholder="Happy birthday — flip it over."
                />
                <span className="block text-right font-mono text-[11px] text-ink-3 tabular">{note.length}/140</span>
              </label>
              <div className="flex items-center justify-between border-t border-line pt-4">
                <span className="text-[14px] text-ink-2">
                  {months === 12 && <span className="mr-2 rounded-(--radius-chip) bg-moss-soft px-1.5 py-0.5 text-[12px] text-moss">10% off</span>}
                  Total
                </span>
                <span className="font-mono text-[20px] tabular">{money(total)}</span>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={!name.trim()}>
                Add gift to cart
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
