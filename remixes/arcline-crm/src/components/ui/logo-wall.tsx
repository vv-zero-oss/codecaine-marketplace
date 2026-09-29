import { ArrowUpRight } from "lucide-react"

import { BrandLogo, type Brand } from "@/components/ui/brand-logo"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * Logos on a hairline grid. Cells that lead to a story show a small ↗ and
 * lift to the next surface on hover.
 */
export function LogoWall({
  brands,
  columns = 5,
  storyHref = "/customers",
  withStories = 3,
  className,
}: {
  brands: readonly Brand[]
  columns?: 5 | 6
  storyHref?: string
  /** How many of the first cells link to a customer story. */
  withStories?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px bg-line-strong sm:grid-cols-3",
        columns === 5 ? "lg:grid-cols-5" : "lg:grid-cols-6",
        className,
      )}
    >
      {brands.map((brand, i) => {
        const linked = i < withStories
        const logo = <BrandLogo brand={brand} scale={0.9} className="text-ink-soft transition-colors duration-200 group-hover/cell:text-ink" />
        return linked ? (
          <Link
            key={`${brand}-${i}`}
            href={storyHref}
            className="group/cell relative flex h-20 items-center justify-center bg-canvas transition-colors duration-200 hover:bg-surface md:h-24"
            aria-label={`${brand} customer story`}
          >
            {logo}
            <ArrowUpRight className="absolute top-2.5 right-2.5 size-3.5 text-ink-3 transition-[color,transform] duration-200 group-hover/cell:-translate-y-px group-hover/cell:translate-x-px group-hover/cell:text-ink" />
          </Link>
        ) : (
          <div key={`${brand}-${i}`} className="group/cell flex h-20 items-center justify-center bg-canvas md:h-24">
            {logo}
          </div>
        )
      })}
    </div>
  )
}
