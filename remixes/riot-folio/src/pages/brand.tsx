import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Container } from "@/components/ui/container"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, where it goes, and how the site talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "An electric ground, white type, and six tones a project can wear. Read from the stylesheet as it is now — change a token in index.css and it changes here.",
    Body: ColourTokens,
  },
  { id: "type", title: "Typography", blurb: "Inter for everything you read; a mono for tokens.", Body: Typography },
  { id: "space", title: "Spacing, radii, shadows, borders", blurb: "A 4px grid, 10px tiles, hairlines, and shadows tinted night blue.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion", blurb: "Blur for replacing, rise for arriving, and one bold flight on the home page. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "Lucide at one stroke weight; photographs in one ink each.", Body: Iconography },
  { id: "components", title: "Components", blurb: "Every component on the site, live, in its variants and states — with how to use it.", Body: ComponentLibrary },
]

/** The chapter list, beside the content on wide screens. */
export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="hidden lg:block">
      <ul className="sticky top-28 space-y-1 text-sm">
        {CHAPTERS.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="block rounded-[var(--radius-button)] px-3 py-1.5 text-ink-muted transition-colors hover:bg-ground-raised hover:text-ink"
            >
              {chapter.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * `/brand` — the site's style guide, built from the real tokens and the real
 * components. Every value on it is read off the rendered element, so it cannot
 * drift from the page; a component added to the site is added here too.
 */
export function BrandPage() {
  return (
    <Container size="wide" className="pt-16 sm:pt-24">
      <div className="max-w-2xl">
        <p className="text-[13px] font-medium tracking-[0.18em] text-lime uppercase">Style guide</p>
        <h1 className="mt-3 text-[clamp(2rem,1.6rem+1.6vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Riot Folio, as a system
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          The tokens, type, motion and components the site is built from — one place to look before changing any of them.
        </p>
      </div>
      <div className="mt-16 grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)]">
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
  )
}
