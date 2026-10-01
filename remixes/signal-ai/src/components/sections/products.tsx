import { Container } from "@/components/ui/container"
import { ProductCard } from "@/components/ui/product-card"

/** The five products as a live bento: three across, then two. */
export function Products() {
  return (
    <section id="products" className="pb-24 sm:pb-36">
      <Container>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <ProductCard product="chat" label="Chat" index={0} className="lg:col-span-2" />
          <ProductCard product="build" label="Build" tone="dark" index={1} className="lg:col-span-2" />
          <ProductCard product="bot" label="Bot" index={2} className="sm:col-span-2 lg:col-span-2" />
          <ProductCard product="imagine" label="Imagine" index={3} className="sm:col-span-2 lg:col-span-3" />
          <ProductCard product="voice" label="Voice" index={4} className="sm:col-span-2 lg:col-span-3" />
        </div>
      </Container>
    </section>
  )
}
