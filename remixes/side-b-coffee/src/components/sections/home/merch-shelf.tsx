import { useState } from "react"
import { Check } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { ShelfTrack, useShelf } from "@/components/blocks/shelf-scroller"
import { MerchArt } from "@/components/mock/merch-art"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { MERCH, money, type Merch } from "@/content/products"
import { cart } from "@/lib/cart"

/**
 * Merch, on a shelf you can flick through. "Add" drops it in the cart and
 * the label flips to a tick for a beat — the cart badge hops in the header.
 */
export function MerchShelf() {
  const { ref, arrows } = useShelf()
  return (
    <section className="py-(--spacing-section) pb-0">
      <Container className="mb-8">
        <SectionHeading before="Rep the" highlight="house band!" tone="ember" doodle="record" actions={arrows} />
      </Container>
      <ShelfTrack shelfRef={ref}>
        {MERCH.map((item) => (
          <MerchCard key={item.id} item={item} />
        ))}
      </ShelfTrack>
    </section>
  )
}

export function MerchCard({ item }: { item: Merch }) {
  const [added, setAdded] = useState(false)
  return (
    <article className="group/merch flex w-[min(78vw,300px)] shrink-0 snap-start flex-col gap-4 border-r border-line p-(--spacing-gutter) sm:w-[300px]">
      <div className="grid aspect-square place-items-center overflow-hidden rounded-(--radius-card) bg-panel p-6">
        <div className="w-full transition-transform duration-[420ms] ease-(--ease-out-strong) group-hover/merch:scale-[1.04] group-hover/merch:-rotate-2">
          <MerchArt kind={item.kind} tone={item.tone} />
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="type-display text-[22px] leading-tight tracking-[-0.015em]">{item.name}</h3>
        <span className="font-mono text-[13px] text-ink-2 tabular">{money(item.price)}</span>
      </div>
      <p className="text-[13.5px] text-ink-2">{item.blurb}</p>
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
