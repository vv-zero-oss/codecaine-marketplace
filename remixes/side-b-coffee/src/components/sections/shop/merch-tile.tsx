import { useState } from "react"
import { Check } from "lucide-react"

import { MerchArt } from "@/components/mock/merch-art"
import { Button } from "@/components/ui/button"
import { money, type Merch } from "@/content/products"
import { cart } from "@/lib/cart"
import { cn } from "@/lib/utils"

/**
 * A merch piece as a grid cell: the drawing on a warm panel (it tips 2°
 * and grows 4% on hover), name and price, the blurb, and an Add that
 * flips to a tick for a beat while the header's cart badge hops.
 */
export function MerchTile({ item, className }: { item: Merch; className?: string }) {
  const [added, setAdded] = useState(false)
  return (
    <article className={cn("group/merch flex h-full flex-col gap-4 p-(--spacing-gutter)", className)}>
      <div className="grid aspect-square place-items-center overflow-hidden rounded-(--radius-card) bg-panel p-8">
        <div className="w-full transition-transform duration-[420ms] ease-(--ease-out-strong) group-hover/merch:scale-[1.04] group-hover/merch:-rotate-2">
          <MerchArt kind={item.kind} tone={item.tone} />
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="type-display text-h4 leading-none tracking-[-0.02em]">{item.name}</h3>
        <span className="font-mono text-[13px] text-ink-2 tabular">{money(item.price)}</span>
      </div>
      <p className="text-[14px] text-ink-2">{item.blurb}</p>
      <Button
        variant={added ? "ink" : "ember"}
        size="chip"
        className="mt-auto w-fit"
        onClick={() => {
          cart.add({ id: item.id, name: item.name, detail: item.kind === "tee" ? "Size M" : "One size", price: item.price, kind: "merch" }, { open: false })
          setAdded(true)
          window.setTimeout(() => setAdded(false), 1400)
        }}
      >
        {added ? <><Check /> Added</> : "Add to cart"}
      </Button>
    </article>
  )
}
