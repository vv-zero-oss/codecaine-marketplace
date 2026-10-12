import { Reveal } from "@/components/motion/reveal"
import { ProductVisual } from "@/components/mock/product-visual"
import { AddToBag } from "@/components/sections/add-to-bag"
import { SerifHead } from "@/components/sections/section-title"
import { productById } from "@/content/shop"
import { PHOTOS, photo } from "@/lib/photos"

/**
 * The reference's closing band, on stone: two volumes on the table, a name,
 * a paragraph in small caps — and here, a button that puts one in the bag.
 */
export function FeaturedProducts({ title = "Featured Products" }: { title?: string }) {
  const items = [productById("vol-3")!, productById("vol-2")!]
  return (
    <section className="bg-stone px-gutter pt-section pb-12">
      <Reveal>
        <SerifHead title={title} href="/shop" action="Visit the shop" />
      </Reveal>
      <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-2 md:gap-[2.2vw]">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <article>
              <div className="relative aspect-[3/2] overflow-hidden">
                <img src={photo(PHOTOS.timber, 1400)} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" style={{ filter: i ? "brightness(0.82) saturate(0.9)" : undefined }} />
                <div className="absolute inset-0 bg-[rgb(70_35_10/0.1)] mix-blend-multiply" />
                <div className="absolute inset-y-0 left-1/2 w-[46%] -translate-x-1/2">
                  <ProductVisual product={p} className="px-[6%] pt-[6%] pb-[8%]" />
                </div>
              </div>
              <h3 className="mt-5 font-serif text-[17px] text-ink md:text-[19px]">{p.name}</h3>
              <p className="type-label mt-3 max-w-[44ch] leading-[1.6] text-ink-2">{p.description}</p>
              <AddToBag id={p.id} edition={p.editions?.[0]} price={p.price} variant="outline" size="sm" className="mt-5" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
