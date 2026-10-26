import { Marquee } from "@/components/motion/marquee"
import { Container } from "@/components/ui/container"
import { MERCHANTS, PRODUCTS } from "@/content"
import { cn } from "@/lib/utils"

const MERCHANT_STYLE = {
  serif: "font-serif text-[23px] tracking-[-0.01em]",
  spaced: "text-[17px] font-medium tracking-[0.32em] uppercase",
  heavy: "text-[22px] font-semibold tracking-[-0.04em]",
  mono: "font-mono text-[15px] font-medium tracking-[0.02em]",
  script: "font-serif text-[24px] italic tracking-[-0.02em]",
  round: "text-[23px] font-medium tracking-[-0.05em]",
} as const

/** A merchant's name set in its own type — stand-ins for customer logos. */
export function MerchantMark({
  name,
  style,
  className,
}: {
  name: string
  style: keyof typeof MERCHANT_STYLE
  className?: string
}) {
  return <span className={cn("whitespace-nowrap text-ink-3", MERCHANT_STYLE[style], className)}>{name}</span>
}

/** Who already runs on Orra: a still row on wide screens, a slow drift on small ones. */
export function MerchantStrip() {
  return (
    <section id="merchants" aria-label="Merchants using Orra" className="pt-16 sm:pt-24">
      <Container className="hidden items-center justify-between gap-6 xl:flex">
        {MERCHANTS.slice(0, 9).map((merchant) => (
          <MerchantMark key={merchant.name} {...merchant} />
        ))}
      </Container>
      <Marquee speed={45} gap={48} className="xl:hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        {MERCHANTS.map((merchant) => (
          <MerchantMark key={merchant.name} {...merchant} />
        ))}
      </Marquee>
    </section>
  )
}

/** Everything Orra does, as ten links — five columns split by hairlines. */
export function ProductIndex() {
  return (
    <section id="products" aria-label="Products" className="scroll-mt-20 pt-16 sm:pt-20">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 md:grid-cols-3 lg:gap-x-0 lg:grid-flow-col lg:grid-cols-5 lg:grid-rows-2">
          {PRODUCTS.map((product, index) => (
            <li
              key={product.label}
              className={cn(
                "border-line lg:border-l",
                // The first column has no rule to its left.
                index < 2 && "lg:border-l-0",
              )}
            >
              <ProductLink {...product} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function ProductLink({ label, icon: Icon, href }: (typeof PRODUCTS)[number]) {
  return (
    <a
      href={href}
      className="group/product flex min-h-12 items-center gap-3 rounded-md px-0 text-[14px] sm:gap-3.5 sm:text-base text-ink transition-colors duration-(--duration-fast) hover:bg-surface sm:min-h-[68px] lg:px-6"
    >
      <Icon
        className="size-[17px] text-ink-2 transition-colors duration-(--duration-fast) group-hover/product:text-ember-deep"
        strokeWidth={1.5}
      />
      {label}
    </a>
  )
}
