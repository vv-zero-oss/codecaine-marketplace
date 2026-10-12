import { useEffect, useState } from "react"
import { Minus, Plus, Disc3 } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { FlavorDial, RoastBar } from "@/components/blocks/flavor"
import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { COFFEES, GRINDS, SIZES, findCoffee, money } from "@/content/products"
import { cart } from "@/lib/cart"
import { quickView, useQuickView } from "@/lib/quick-view"

/**
 * Quick view: the whole coffee in one dialog — the bag large, its story,
 * the tasting dials, and a size / grind / quantity picker whose price
 * updates as you choose. "Add to cart" puts it in the real cart and opens
 * the drawer. One instance for the site, opened from any card.
 */
export function QuickView() {
  const id = useQuickView()
  const coffee = id ? findCoffee(id) : undefined
  const [size, setSize] = useState<string>("12oz")
  const [grind, setGrind] = useState<string>("Whole bean")
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setSize("12oz")
    setGrind("Whole bean")
    setQty(1)
  }, [id])

  useCanvasAction("Quick view", (next) => ((next ?? !id) ? quickView.open(COFFEES[0].id) : quickView.close()), {
    on: !!id,
    group: "Shop",
  })

  const sizing = SIZES.find((s) => s.id === size) ?? SIZES[0]
  const unit = coffee ? Math.round(coffee.price * sizing.multiplier) : 0

  return (
    <Dialog open={!!coffee} onOpenChange={(open) => !open && quickView.close()}>
      <DialogContent className="max-h-[92dvh] w-[min(940px,calc(100vw-24px))] max-w-none gap-0 overflow-y-auto rounded-(--radius-panel) border-0 bg-page p-0 shadow-(--shadow-lift) sm:max-w-none">
        {coffee && (
          <div className="grid md:grid-cols-[1fr_1.1fr]">
            <div className="grid place-items-center bg-panel px-10 py-10 md:rounded-l-(--radius-panel) md:py-14">
              <div className="w-[min(240px,60%)] md:w-[72%]">
                <CoffeeBag name={coffee.name} notes={coffee.notes.join(" · ")} origin={coffee.origin} roast={coffee.roast} label={coffee.label} artwork={coffee.badge === "house" ? "honey" : "cream"} weight={sizing.label} />
              </div>
            </div>
            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="space-y-2">
                <p className="type-label text-[11.5px] text-ink-3">
                  {coffee.origin} · {coffee.process}
                </p>
                <DialogTitle className="type-display text-h3 leading-none font-semibold tracking-[-0.025em]">{coffee.name}</DialogTitle>
                <DialogDescription className="text-[15px] leading-relaxed text-ink-2">{coffee.story}</DialogDescription>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 border-y border-line py-4 text-[13.5px]">
                <dt className="text-ink-3">Producer</dt>
                <dd>{coffee.producer}</dd>
                <dt className="text-ink-3">Region</dt>
                <dd>{coffee.region}</dd>
                <dt className="text-ink-3">Notes</dt>
                <dd>{coffee.notes.join(", ")}</dd>
              </dl>

              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex gap-1">
                  <FlavorDial label="Sweetness" value={coffee.sweetness} />
                  <FlavorDial label="Acidity" value={coffee.acidity} />
                  <FlavorDial label="Complexity" value={coffee.complexity} />
                </div>
                <RoastBar level={coffee.roastLevel} roast={coffee.roast} className="w-40" />
              </div>

              <fieldset className="space-y-2">
                <legend className="type-label mb-2 text-[11px] text-ink-3">Size</legend>
                <ToggleGroup type="single" variant="outline" value={size} onValueChange={(v) => v && setSize(v)} className="w-full">
                  {SIZES.map((s) => (
                    <ToggleGroupItem key={s.id} value={s.id} className="h-10 flex-1">
                      {s.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="type-label mb-2 text-[11px] text-ink-3">Grind</legend>
                <ToggleGroup type="single" variant="outline" spacing={1} value={grind} onValueChange={(v) => v && setGrind(v)} className="flex w-full flex-wrap">
                  {GRINDS.map((g) => (
                    <ToggleGroupItem key={g} value={g} className="h-9 rounded-(--radius-button) normal-case">
                      {g}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </fieldset>

              <div className="flex items-center gap-3">
                <div className="flex h-11 items-center rounded-(--radius-button) shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
                  <button className="grid h-full w-10 place-items-center text-ink-2 hover:text-ink disabled:opacity-40" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="One fewer">
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-6 text-center font-mono text-[14px] tabular" aria-live="polite">
                    {qty}
                  </span>
                  <button className="grid h-full w-10 place-items-center text-ink-2 hover:text-ink" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="One more">
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <Button
                  className="flex-1"
                  onClick={() => {
                    cart.add({ id: coffee.id, name: coffee.name, detail: `${sizing.label} · ${grind}`, price: unit, qty, kind: "coffee" })
                    quickView.close()
                  }}
                >
                  Add to cart · <span className="tabular">{money(unit * qty)}</span>
                </Button>
              </div>
              <p className="flex items-center gap-2 text-[13px] text-ink-3">
                <Disc3 className="size-4 text-ember" /> Pairs with: {coffee.pairsWith}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
