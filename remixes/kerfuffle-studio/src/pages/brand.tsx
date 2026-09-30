import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The name, the badge, and how the studio talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Every colour on the site, read live from index.css — change a token there and it changes here.",
    Body: ColourTokens,
  },
  { id: "type", title: "Typography", blurb: "Heavy condensed caps answered by italic serif words. Values are measured off the rendered text.", Body: Typography },
  {
    id: "space",
    title: "Space, radii, shadows, borders",
    blurb: "A 4px grid, soft 20px corners, a 2px ink outline and warm, low shadows.",
    Body: SpaceAndSurface,
  },
  { id: "motion", title: "Motion", blurb: "Everything moves — but each move has a reason. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "Lucide in a round well, real photography, and pill stickers.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component on the site, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

/** The chapter list, beside the content on wide screens. */
export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="hidden lg:block">
      <ul className="sticky top-28 space-y-1">
        {CHAPTERS.map((chapter) => (
          <li key={chapter.id}>
            <a href={`#${chapter.id}`} className="block rounded-pill px-3 py-1.5 label text-xs text-ink-soft transition-colors hover:bg-lime hover:text-ink">
              {chapter.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * `/brand` — Kerfuffle's style guide.
 *
 * Built from the real components and the real tokens, so it cannot drift from
 * the site. A component added to the site is added here in the same change.
 */
export function BrandPage() {
  return (
    <section data-tone="light" className="pt-36 pb-section md:pt-44">
      <Container>
        <DisplayHeading as="h1" eyebrow="Brand guidelines" bold="Kerfuffle," serif="as a system" size="lg" align="left" />
        <p className="mt-6 max-w-xl text-lg leading-snug">
          The tokens, type, motion and components the site is built from — one place to look before changing any of them.
        </p>
        <div className="mt-16 grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)]">
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
