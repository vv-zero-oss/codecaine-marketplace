import { useState } from "react"
import { toast } from "sonner"

import { useCanvasAction } from "@canvas/react"
import { ProductCard } from "@/components/blocks/product-card"
import { ClipReveal, FadeUp } from "@/components/motion/reveal"
import { euro, useBag } from "@/components/site/bag"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ButtonLink } from "@/components/ui/button-link"
import { Container } from "@/components/ui/container"
import { MixedTitle } from "@/components/ui/mixed-title"
import { SectionHeading } from "@/components/ui/section-heading"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { productDetails, products } from "@/content"
import { NotFoundPage } from "@/pages/not-found"
import { Link } from "@/router"

/**
 * One piece. The photographs scroll on the left; everything you need to buy
 * it stays pinned on the right beside them.
 */
export function ProductPage({ slug }: { slug: string }) {
  const product = products.find((each) => each.slug === slug)
  if (!product) return <NotFoundPage />
  return <ProductView key={slug} slug={slug} />
}

function ProductView({ slug }: { slug: string }) {
  const product = products.find((each) => each.slug === slug)!
  const bag = useBag()
  const [size, setSize] = useState("")
  const [missingSize, setMissingSize] = useState(false)
  const [details, setDetails] = useState<string[]>([])

  useCanvasAction("Size chosen", (next) => setSize((next ?? !size) ? product.sizes[Math.floor(product.sizes.length / 2)] : ""), { on: size !== "", group: "Product" })
  useCanvasAction("Size missing error", (next) => setMissingSize(next ?? !missingSize), { on: missingSize, group: "Product" })
  for (const detail of productDetails) {
    const open = details.includes(detail.title)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(detail.title, (next) => setDetails((current) => ((next ?? !open) ? [...current, detail.title] : current.filter((t) => t !== detail.title))), { on: open, group: "Product details" })
  }

  const add = () => {
    if (!size) {
      setMissingSize(true)
      return
    }
    bag.add(product.slug, size)
    toast(`${product.name}, size ${size}, is in your bag.`, { action: { label: "View bag", onClick: () => bag.setOpen(true) } })
  }

  const related = products.filter((each) => each.slug !== product.slug && each.category === product.category).concat(products.filter((each) => each.category !== product.category)).slice(0, 3)

  return (
    <>
      <div className="grid gap-2 px-2 pt-[88px] lg:grid-cols-[1.25fr_1fr] lg:gap-[5vw] lg:pl-2 lg:pr-gutter lg:pt-2">
        <div className="flex flex-col gap-2">
          {product.images.map((image, index) => (
            <ClipReveal key={image.src} src={image.src} alt={image.alt} className="aspect-[4/5] lg:aspect-auto lg:h-[calc(100svh-16px)]" direction={index === 0 ? "down" : "up"} />
          ))}
        </div>
        <div className="px-gutter pb-16 pt-8 lg:px-0 lg:pb-0">
          <div className="flex flex-col gap-8 lg:sticky lg:top-[clamp(110px,16vh,160px)]">
            <FadeUp className="flex flex-col gap-4">
              <Link href="/collection" className="w-fit font-sans text-[13px] uppercase tracking-[0.06em] text-ink-muted hover:text-ink">
                ← Collection / {product.category}
              </Link>
              <h1 className="font-display text-[clamp(48px,5vw,88px)] leading-[0.9] tracking-[-0.015em]">{product.name}</h1>
              <p className="font-sans text-[18px] tabular-nums">{euro(product.price)}</p>
              <p className="max-w-[46ch] font-serif text-[17px] leading-[1.6] text-ink-soft">{product.description}</p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-sans text-[14px]">
                <dt className="text-ink-muted">Colour</dt>
                <dd>{product.colour}</dd>
                <dt className="text-ink-muted">Cloth</dt>
                <dd>{product.cloth}</dd>
              </dl>
            </FadeUp>
            <FadeUp delay={0.1} className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <p className="font-sans text-[13px] uppercase tracking-[0.06em]">Size</p>
                <Link href="/appointments" className="font-serif text-[15px] text-ink-muted underline underline-offset-4 hover:text-ink">
                  Not sure? Book a fitting
                </Link>
              </div>
              <ToggleGroup
                type="single"
                value={size}
                onValueChange={(value) => {
                  setSize(value)
                  if (value) setMissingSize(false)
                }}
                className="flex w-full flex-wrap gap-2"
                aria-label="Size"
              >
                {product.sizes.map((each) => (
                  <ToggleGroupItem
                    key={each}
                    value={each}
                    className="h-12 min-w-14 flex-1 rounded-none border border-line-strong bg-transparent font-sans text-[14px] text-ink transition-[background-color,border-color,color] duration-(--duration-hover) hover:border-ink hover:bg-transparent data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:text-paper"
                  >
                    {each}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {missingSize && (
                <p role="alert" className="font-serif text-[15px] text-ember-deep">
                  Choose a size first — or book a fitting and we will choose it together.
                </p>
              )}
              <div className="grid gap-2 sm:grid-cols-2">
                <Button variant="ink" size="chip" onClick={add}>
                  <MixedTitle as="span" text="Add _to_ BAG" />
                </Button>
                <ButtonLink href="/appointments" label="Try _it_ ON" />
              </div>
            </FadeUp>
            <Accordion type="multiple" value={details} onValueChange={setDetails} className="border-t border-line">
              {productDetails.map((detail) => (
                <AccordionItem key={detail.title} value={detail.title} className="border-line">
                  <AccordionTrigger className="rounded-none py-4 font-sans text-[15px] font-normal hover:no-underline">{detail.title}</AccordionTrigger>
                  <AccordionContent className="font-serif text-[16px] leading-[1.6] text-ink-soft">{detail.body}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <Container className="py-section">
        <SectionHeading eyebrow="_to wear_ WITH IT" title="_the_ REST _of the_ EDIT" size="md" />
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((each) => (
            <ProductCard key={each.slug} product={each} />
          ))}
        </div>
      </Container>
    </>
  )
}
