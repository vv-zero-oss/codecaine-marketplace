import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { useCanvasAction } from "@canvas/react"
import { ClosingCall } from "@/components/blocks/closing-call"
import { PageIntro } from "@/components/blocks/page-intro"
import { ProductCard } from "@/components/blocks/product-card"
import { HoverPreview } from "@/components/motion/hover-preview"
import { euro } from "@/components/site/bag"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { collection, products } from "@/content"

type Category = (typeof collection.categories)[number]

/** The collection: a filtered grid, then the same pieces as an index. */
export function CollectionPage() {
  const [category, setCategory] = useState<Category>("All")
  for (const each of collection.categories) {
    // One switch per filter, beside the state they drive.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Show ${each}`, () => setCategory(each), { on: category === each, group: "Collection" })
  }
  const shown = category === "All" ? products : products.filter((product) => product.category === category)

  return (
    <>
      <PageIntro eyebrow={collection.eyebrow} title={collection.title} intro={collection.intro} />
      <Container>
        <Tabs value={category} onValueChange={(value) => setCategory(value as Category)} className="items-center">
          <TabsList className="h-auto flex-wrap justify-center gap-1 rounded-none bg-transparent p-0">
            {collection.categories.map((each) => (
              <TabsTrigger
                key={each}
                value={each}
                className="h-11 flex-none rounded-none border-0 px-5 font-display text-[17px] tracking-[0.02em] text-ink-muted shadow-none transition-[color,background-color,box-shadow] duration-(--duration-hover) hover:text-ink data-[state=active]:bg-chip data-[state=active]:text-ink data-[state=active]:shadow-chip"
              >
                {each.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <motion.div layout className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((product) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
      <Container className="pt-section">
        <SectionHeading title={collection.indexTitle} size="md" align="left" />
        <HoverPreview
          className="mt-10"
          rows={products.map((product) => ({
            href: `/collection/${product.slug}`,
            title: product.line,
            meta: `${product.category} · ${product.cloth}`,
            aside: euro(product.price),
            image: product.images[0].src,
            alt: product.images[0].alt,
          }))}
        />
      </Container>
      <ClosingCall title="Not sure of the size?" body="Come in for a fitting, or ask us to send two." cta="Book _a_ FITTING" />
    </>
  )
}
