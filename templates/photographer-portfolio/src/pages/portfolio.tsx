import { useState } from "react"

import { GalleryCard } from "@/components/gallery-card"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { categories, galleries, type Category } from "@/content"
import { cn } from "@/lib/utils"

export function CategoryFilter({
  value,
  onChange,
}: {
  value: Category | "All"
  onChange: (value: Category | "All") => void
}) {
  return (
    <div role="tablist" className="flex flex-wrap gap-2">
      {(["All", ...categories] as const).map((category) => (
        <button
          key={category}
          role="tab"
          type="button"
          aria-selected={value === category}
          data-state={value === category ? "active" : "inactive"}
          onClick={() => onChange(category)}
          className={cn(
            "h-9 border px-4 text-xs uppercase tracking-[0.18em] transition-colors",
            value === category ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink-600 hover:border-ink",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export function PortfolioPage() {
  const [category, setCategory] = useState<Category | "All">("All")
  const shown = category === "All" ? galleries : galleries.filter((gallery) => gallery.category === category)
  return (
    <Container className="pt-20">
      <SectionHeading eyebrow="Portfolio" title="Every story, start to finish">
        Galleries are delivered as whole days rather than highlights — here are a few, shared with permission.
      </SectionHeading>
      <div className="mt-12">
        <CategoryFilter value={category} onChange={setCategory} />
      </div>
      <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((gallery) => (
          <GalleryCard key={gallery.slug} gallery={gallery} />
        ))}
      </div>
    </Container>
  )
}
