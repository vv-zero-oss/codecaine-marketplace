import { ComponentLibrary } from "@/components/brand/components"
import {
  BrandIdentity,
  ColourTokens,
  Iconography,
  Motion,
  SpaceAndSurface,
  Typography,
} from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { SiteFooter } from "@/components/site-footer"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { Link } from "@/lib/router"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, where it goes, and how Drape talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Linen and espresso, one clay accent. Every value is read from index.css as it is now — change a token and it changes here.",
    Body: ColourTokens,
  },
  { id: "type", title: "Typography", blurb: "Inter Tight for headlines, one Kaushan Script word per headline, Inter for everything you read.", Body: Typography },
  { id: "space", title: "Spacing, radii, shadows, borders", blurb: "A 4px grid, small radii, hairlines, and shadows only on what floats.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion", blurb: "Timed off the reference, frame by frame. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "Lucide at one weight, and real photography.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component on the site, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-espresso/90 text-cream backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label="Drape home">
            <Wordmark />
          </Link>
          <span className="text-cream-3">/</span>
          <span className="truncate text-[13px] text-cream-2">Brand guidelines</span>
        </div>
        <ButtonLink href="/" size="sm" variant="outline-dark">
          Back to the site
        </ButtonLink>
      </Container>
    </header>
  )
}

export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="hidden lg:block">
      <ul className="sticky top-24 space-y-0.5 text-[13px]">
        {CHAPTERS.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="block rounded-sm px-3 py-1.5 text-ink-2 transition-colors hover:bg-linen-2 hover:text-ink"
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
 * `/brand` — Drape's style guide, built from the real tokens and components:
 * every value on it is read off the rendered element, so it cannot drift from
 * the site. A component added to the site is added here in the same change.
 */
export function BrandPage() {
  return (
    <>
      <BrandHeader />
      <main data-canvas-ignore className="bg-linen text-ink">
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium tracking-widest text-ink-3 uppercase">Style guide</p>
            <h1 className="mt-3 font-display text-5xl leading-none font-semibold tracking-[-0.04em] sm:text-6xl">
              <span className="mr-[0.2em] font-script font-normal tracking-normal">Drape,</span>as a system
            </h1>
            <p className="mt-4 text-[15px] text-ink-2">
              The tokens, type, motion and components the site is built from — one place to look before changing any
              of them.
            </p>
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-[11rem_minmax(0,1fr)]">
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
      </main>
      <SiteFooter />
    </>
  )
}
