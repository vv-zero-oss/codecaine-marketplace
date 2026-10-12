import { useState } from "react"
import { Minus, MoveHorizontal, Plus } from "lucide-react"
import { motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { CLOTH } from "@/components/mock/cover-art"
import { ProductVisual } from "@/components/mock/product-visual"
import { AddToBag } from "@/components/sections/add-to-bag"
import { SectionTitle } from "@/components/sections/section-title"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { FREE_SHIPPING, PRODUCTS, productById, type Cloth, type Product } from "@/content/shop"
import { money } from "@/lib/bag"
import { cn } from "@/lib/utils"

/** Cloth swatches as radio cards — the choice is the colour, so show the colour. */
function EditionPicker({ product, value, onChange }: { product: Product; value?: Cloth; onChange: (c: Cloth) => void }) {
  if (!product.editions || product.editions.length < 2) return null
  return (
    <fieldset>
      <legend className="type-label text-ink-3">Edition — {value ? CLOTH[value].label : ""}</legend>
      <div className="mt-3 flex gap-2">
        {product.editions.map((c) => {
          const on = c === value
          return (
            <label key={c} className="cursor-pointer">
              <input type="radio" name={`edition-${product.id}`} value={c} checked={on} onChange={() => onChange(c)} className="peer sr-only" />
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-full transition-[box-shadow] duration-(--duration-hover) peer-focus-visible:ring-2 peer-focus-visible:ring-ink",
                  on ? "shadow-[0_0_0_1.5px_var(--color-page),0_0_0_3px_var(--color-ink)]" : "shadow-[0_0_0_1px_var(--color-line-strong)]",
                )}
              >
                <span className="size-8 rounded-full" style={{ background: CLOTH[c].bg }} />
                <span className="sr-only">{CLOTH[c].label}</span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function Stepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex h-11 items-center shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
      <button type="button" aria-label="One fewer" onClick={() => onChange(Math.max(1, value - 1))} className="grid size-11 place-items-center text-ink-2 hover:text-ink">
        <Minus className="size-3.5" />
      </button>
      <span className="w-6 text-center font-sans tabular-nums">{value}</span>
      <button type="button" aria-label="One more" onClick={() => onChange(Math.min(9, value + 1))} className="grid size-11 place-items-center text-ink-2 hover:text-ink">
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

/** The product, up close: drag the book to turn it, choose the cloth, choose how many. */
function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [edition, setEdition] = useState<Cloth | undefined>()
  const [qty, setQty] = useState(1)
  const cloth = edition && product?.editions?.includes(edition) ? edition : product?.editions?.[0]
  const turnable = product?.kind === "book" || product?.kind === "notebook"

  return (
    <Dialog
      open={!!product}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
          setQty(1)
          setEdition(undefined)
        }
      }}
    >
      <DialogContent>
        {product && (
          <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="relative bg-sheet">
              <ProductVisual product={product} edition={cloth} draggable className="mx-auto max-w-[520px]" />
              {turnable && (
                <p className="type-label absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 text-ink-3">
                  <MoveHorizontal className="size-3.5" /> Drag to turn it over
                </p>
              )}
            </div>
            <div className="flex flex-col p-6 md:p-10">
              {product.badge && <Badge variant={product.badge === "New" ? "moss" : "outline"}>{product.badge}</Badge>}
              <DialogTitle className="mt-4">{product.name}</DialogTitle>
              <p className="type-label mt-2 text-ink-3">{product.note}</p>
              <p className="mt-4 font-sans text-h4 tabular-nums">{money(product.price)}{product.kind === "subscription" && <span className="text-[15px] text-ink-3"> / year</span>}</p>
              <DialogDescription className="mt-5 font-serif text-[17px] leading-[1.55]">{product.description}</DialogDescription>
              <div className="mt-7 flex flex-col gap-6">
                <EditionPicker product={product} value={cloth} onChange={setEdition} />
                <div className="flex flex-wrap items-center gap-3">
                  {product.kind !== "subscription" && <Stepper value={qty} onChange={setQty} />}
                  <AddToBag id={product.id} edition={cloth} price={product.price} qty={qty} className="flex-1" />
                </div>
              </div>
              <ul className="mt-8 border-t border-line">
                {product.details.map((d) => (
                  <li key={d} className="border-b border-line py-2.5 font-serif text-[15px] text-ink-2">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function ProductCard({ product, onOpen, large = false }: { product: Product; onOpen: () => void; large?: boolean }) {
  return (
    <article className="group/product flex flex-col">
      <button type="button" onClick={onOpen} className="relative block overflow-hidden bg-sheet text-left" aria-label={`Look closer at ${product.name}`}>
        {product.badge && <Badge variant={product.badge === "New" ? "moss" : "outline"} className="absolute top-4 left-4 z-10">{product.badge}</Badge>}
        <ProductVisual product={product} className={cn("transition-transform duration-[900ms] ease-(--ease-out-strong) group-hover/product:scale-[1.02]", large && "md:aspect-[5/4]")} />
        <span className="type-label absolute right-4 bottom-4 translate-y-1 text-ink opacity-0 transition-[opacity,transform] duration-(--duration-hover) group-hover/product:translate-y-0 group-hover/product:opacity-100">
          Look closer
        </span>
      </button>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-[18px] leading-snug text-ink">{product.name}</h3>
          <p className="type-label mt-1.5 text-ink-3">{product.note}</p>
        </div>
        <p className="shrink-0 font-sans text-[16px] tabular-nums">{money(product.price)}</p>
      </div>
      <AddToBag id={product.id} edition={product.editions?.[0]} price={product.price} variant="outline" size="sm" className="mt-4 self-start" />
    </article>
  )
}

/**
 * `/shop`: the word, loud; the new volume first and why; everything else on
 * the shelf; then the questions people ask before they buy a book by post.
 */
export function ShopPage() {
  const [open, setOpen] = useState<string | null>(null)
  useCanvasAction("Quick view", (next) => setOpen((next ?? !open) ? "vol-3" : null), { on: !!open, group: "Shop" })
  const lead = productById("vol-3")!
  const rest = PRODUCTS.filter((p) => p.id !== "vol-3")

  return (
    <>
      <section className="px-gutter pt-28 md:pt-36">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-rule pb-4">
            <h1 className="type-display text-colossal text-ink">Shop</h1>
            <p className="type-label mb-[1.4vw] hidden shrink-0 text-right text-ink-3 sm:block">
              Printed books, prints
              <br />
              and the letters
            </p>
          </div>
          <p className="mt-6 max-w-[44ch] font-serif text-lead text-ink-2">
            Everything here is made to be kept: sewn, cloth-bound, printed once and posted from the studio in paper.
          </p>
        </Reveal>
      </section>

      {/* the new volume, first */}
      <section className="px-gutter pt-16 md:pt-24">
        <div className="grid items-center gap-10 bg-stone md:grid-cols-2 md:gap-0">
          <div className="p-6 md:p-[4vw]">
            <motion.div initial={false} className="mx-auto max-w-[460px]">
              <ProductVisual product={lead} draggable />
            </motion.div>
          </div>
          <Reveal className="px-6 pb-10 md:py-[4vw] md:pr-[5vw] md:pl-0">
            <Badge variant="moss">New — shipping now</Badge>
            <h2 className="type-display mt-5 text-h1 text-ink">Salt &amp; Timber</h2>
            <p className="mt-5 max-w-[42ch] font-serif text-[17px] leading-[1.55] text-ink-2">{lead.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AddToBag id={lead.id} edition="moss" price={lead.price} size="lg" />
              <button type="button" onClick={() => setOpen(lead.id)} className="type-label link-draw h-11 px-2 text-ink">
                Choose the cloth
              </button>
            </div>
            <p className="type-label mt-6 text-ink-2">Free shipping over {money(FREE_SHIPPING)} · Posted within two days</p>
          </Reveal>
        </div>
      </section>

      <section className="px-gutter py-section">
        <SectionTitle title="On the shelf" />
        <div className="mt-10 grid gap-x-[2.4vw] gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <ProductCard product={p} onOpen={() => setOpen(p.id)} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line px-gutter py-section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-[5vw]">
          <h2 className="type-display max-w-[12ch] text-h1 text-ink">Before you order.</h2>
          <Accordion type="single" collapsible defaultValue="ship">
            {[
              ["ship", "Where do you ship, and how long does it take?", "Everywhere the post goes. Books leave the studio within two days, wrapped in paper and board; most arrive in under a week in Europe and North America, two elsewhere."],
              ["cost", "What does shipping cost?", `A flat $8, and nothing at all once your bag is over ${money(FREE_SHIPPING)}. Members never pay for shipping.`],
              ["return", "Can I return a book?", "Within 30 days, unread or not. Write to us and we'll send a label; we would rather it found a reader than a shelf."],
              ["members", "How does the membership work?", "One payment a year. You receive the next volume before it goes on sale, four letters by post, and ten percent off everything else. Pause or cancel whenever you like."],
              ["stock", "Will Volume 1 be reprinted?", "Not as it was. When the last copies go, a revised edition with new chapters is planned for 2027 — members will hear first."],
            ].map(([v, q, a]) => (
              <AccordionItem key={v} value={v}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent className="max-w-[60ch] font-serif text-[16px] leading-[1.6]">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <QuickView product={open ? productById(open) ?? null : null} onClose={() => setOpen(null)} />
    </>
  )
}
