import { euro } from "@/components/site/bag"
import { MixedTitle } from "@/components/ui/mixed-title"
import type { Product } from "@/content"
import { cn } from "@/lib/utils"
import { Link } from "@/router"

/**
 * A piece in the grid. On hover the second photograph wipes up over the
 * first — the same wipe the page uses for reveals, run by CSS so it can be
 * interrupted halfway.
 */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const [front, back] = product.images
  return (
    <Link href={`/collection/${product.slug}`} className={cn("group flex flex-col gap-4", className)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
        <img src={front.src} alt={front.alt} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.03]" />
        {back && (
          <img
            src={back.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-[clip-path] duration-700 ease-(--ease-in-out-soft) [clip-path:inset(100%_0_0_0)] [@media(hover:hover)]:group-hover:[clip-path:inset(0_0_0_0)]"
          />
        )}
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <MixedTitle as="h3" text={product.line} className="text-[clamp(22px,1.7vw,30px)] leading-none tracking-[-0.01em] text-ink" />
          <p className="mt-2 font-serif text-[15px] text-ink-muted">
            {product.colour} · {product.cloth}
          </p>
        </div>
        <p className="font-sans text-[14px] tabular-nums text-ink">{euro(product.price)}</p>
      </div>
    </Link>
  )
}
