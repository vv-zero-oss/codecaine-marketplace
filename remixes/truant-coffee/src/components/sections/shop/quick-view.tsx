import { useEffect, useState } from "react"
import { Minus, Plus } from "lucide-react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { coffeeById, GRINDS, seriesById, SIZES, type Grind, type SizeId } from "@/content/coffees"
import { money } from "@/lib/photos"
import { linePrice, useStore, useWeight } from "@/lib/store"

/**
 * A coffee up close: the bag (relabelled live as you change the size), the
 * farm in four lines, size, grind and quantity, and a price that follows
 * all three. Adding closes it and opens the bag.
 */
export function QuickView({ coffeeId, onClose }: { coffeeId: string | null; onClose: () => void }) {
  const { add, setDrawer } = useStore()
  const weight = useWeight()
  const [size, setSize] = useState<SizeId>("12oz")
  const [grind, setGrind] = useState<Grind>("Whole bean")
  const [qty, setQty] = useState(1)
  useEffect(() => {
    setSize("12oz")
    setGrind("Whole bean")
    setQty(1)
  }, [coffeeId])
  const coffee = coffeeId ? coffeeById[coffeeId] : null

  return (
    <Dialog open={!!coffee} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92svh] overflow-y-auto border-0 bg-raised p-0 shadow-float sm:max-w-[820px]" data-lenis-prevent>
        {coffee && (
          <div className="grid md:grid-cols-[1fr_1.1fr]">
            <div className="grid place-items-center bg-shelf p-10">
              <div className="w-[58%] max-w-[240px]">
                <CoffeeBag coffeeId={coffee.id} weight={weight(size)} tilt={-2} />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="type-eyebrow text-ink-3">
                {seriesById[coffee.series].name} · {coffee.country}
              </p>
              <DialogTitle className="type-display mt-2 text-d3 font-normal">{coffee.name}</DialogTitle>
              <DialogDescription className="mt-2 text-ink-2">{coffee.notes.join(", ")}. {seriesById[coffee.series].line}</DialogDescription>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-[13px]">
                {[
                  ["Producer", coffee.producer],
                  ["Region", coffee.region],
                  ["Process", coffee.process],
                  ["Varietal", coffee.varietal],
                  ["Altitude", coffee.altitude],
                ].map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-ink-3">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="type-eyebrow mt-6 text-ink-3">Size</p>
              <ToggleGroup type="single" value={size} onValueChange={(v) => v && setSize(v as SizeId)} className="mt-2 flex w-full gap-1.5" spacing={1}>
                {SIZES.map((s) => (
                  <ToggleGroupItem key={s.id} value={s.id} className="h-10 flex-1 rounded-[var(--radius-button)] text-[13px] shadow-[inset_0_0_0_1px_var(--color-line-strong)] data-[state=on]:bg-ink data-[state=on]:text-paper data-[state=on]:shadow-none">
                    {weight(s.id)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <p className="type-eyebrow mt-5 text-ink-3">Grind</p>
              <ToggleGroup type="single" value={grind} onValueChange={(v) => v && setGrind(v as Grind)} className="mt-2 grid w-full grid-cols-2 gap-1.5" spacing={1}>
                {GRINDS.map((g) => (
                  <ToggleGroupItem key={g} value={g} className="h-10 rounded-[var(--radius-button)] text-[13px] shadow-[inset_0_0_0_1px_var(--color-line-strong)] data-[state=on]:bg-ink data-[state=on]:text-paper data-[state=on]:shadow-none">
                    {g}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <div className="mt-6 flex items-center gap-3">
                <div className="inline-flex h-12 items-center rounded-[var(--radius-button)] shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
                  <button type="button" aria-label="One fewer" onClick={() => setQty(Math.max(1, qty - 1))} className="grid size-12 place-items-center active:scale-90">
                    <Minus className="size-4" />
                  </button>
                  <span className="w-6 text-center tabular-nums">{qty}</span>
                  <button type="button" aria-label="One more" onClick={() => setQty(Math.min(12, qty + 1))} className="grid size-12 place-items-center active:scale-90">
                    <Plus className="size-4" />
                  </button>
                </div>
                <Button
                  variant="tomato"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    add(coffee.id, size, grind, qty)
                    onClose()
                    window.setTimeout(() => setDrawer("cart"), 250)
                  }}
                >
                  Add · {money(linePrice({ coffeeId: coffee.id, size }) * qty)}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
