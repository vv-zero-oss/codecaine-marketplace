import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/heading"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The name, where it goes, and how the studio writes.", Body: BrandIdentity },
  { id: "colour", title: "Colour", blurb: "Paper, ink and one accent — read live from index.css.", Body: ColourTokens },
  { id: "type", title: "Typography", blurb: "One family and a mono. Values are measured off the rendered text.", Body: Typography },
  { id: "space", title: "Space and grid", blurb: "A 4px grid, twelve columns, hairlines, almost no shadow.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion", blurb: "Few moves, each with a job. Press play.", Body: Motion },
  { id: "icons", title: "Icons and imagery", blurb: "Lucide at 2px; photography does the colour.", Body: Iconography },
  { id: "components", title: "Components", blurb: "Every component on the site, live, in its states — with how to use it.", Body: ComponentLibrary },
]

export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="hidden lg:block">
      <ul className="sticky top-28 space-y-1 text-sm">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <a href={`#${chapter.id}`} className="flex gap-3 py-1 text-ink-soft transition-colors hover:text-ink">
              <span className="label pt-0.5 text-ink-mute">0{i + 1}</span>
              {chapter.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * `/brand` — the studio's style guide, built from the real components and the
 * real tokens, so it cannot drift from the site.
 */
export function BrandPage() {
  return (
    <section data-tone="light" className="pt-40 pb-section md:pt-48">
      <Container>
        <SectionHeader
          as="h1"
          size="xl"
          label="Style guide"
          title="Kerfuffle, as a system."
          aside="The tokens, type, motion and components the site is built from — one place to look before changing any of them."
        />
        <div className="mt-20 grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <BrandNav />
          <div className="min-w-0">
            {CHAPTERS.map(({ id, title, blurb, Body }) => (
              <GuideSection key={id} id={id} title={title} blurb={blurb}>
                <Body />
              </GuideSection>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
