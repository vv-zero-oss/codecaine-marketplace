import { CoffeeCard } from "@/components/blocks/coffee-card"
import { PhotoCarousel } from "@/components/motion/photo-carousel"
import { PHOTOS } from "@/lib/photos"

/**
 * This week on the bar: the big carousel of the bars on the left, the
 * coffee of the week on the right, split by a hairline.
 */
export function Featured({ coffeeId = "side-b-blend" }: { coffeeId?: string }) {
  return (
    <section className="grid border-b border-line lg:grid-cols-[1fr_minmax(320px,26%)]">
      <div className="p-(--spacing-gutter) lg:border-r lg:border-line">
        <PhotoCarousel
          headline="Good coffee and slow afternoons."
          slides={[
            { photo: PHOTOS.barInterior, alt: "A barista pulling shots behind the Elm Street counter" },
            { photo: PHOTOS.latteTable, alt: "A flat white with a rosetta on a dark wood table" },
            { photo: PHOTOS.barChalkboard, alt: "The bar in the late afternoon, the chalkboard menu by the till" },
          ]}
        />
      </div>
      <CoffeeCard coffeeId={coffeeId} accent="sky" className="border-t border-line lg:border-t-0" />
    </section>
  )
}
