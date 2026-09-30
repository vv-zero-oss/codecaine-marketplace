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
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/section-heading"
import { studio } from "@/content"

const CHAPTERS = [
  { id: "brand", title: "Brand", short: "Brand", blurb: "The name, where it sits, and how the studio talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    short: "Colour",
    blurb:
      "Six tokens and ink at three opacities — read from the stylesheet as it renders now. Change one in index.css and it changes here.",
    Body: ColourTokens,
  },
  {
    id: "type",
    title: "Typography",
    short: "Typography",
    blurb: "Cormorant Garamond for everything said aloud, Inter for everything read or pressed.",
    Body: Typography,
  },
  {
    id: "space",
    title: "Spacing, radii, shadows & borders",
    short: "Space & surface",
    blurb: "Generous section rhythm, square corners, no shadows, and one-pixel lines in ink at an opacity.",
    Body: SpaceAndSurface,
  },
  { id: "motion", title: "Motion", short: "Motion", blurb: "Barely there, on purpose. Press play.", Body: Motion },
  {
    id: "icons",
    title: "Iconography & imagery",
    short: "Icons & imagery",
    blurb: "Few icons, and photographs given room.",
    Body: Iconography,
  },
  {
    id: "components",
    title: "Components",
    short: "Components",
    blurb: "Every component on the site, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

/** The chapter list: a sticky column on wide screens, a wrapped row above the content on phones. */
export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="lg:sticky lg:top-28 lg:self-start">
      <ol className="flex flex-wrap gap-x-6 gap-y-1 lg:flex-col lg:gap-y-3">
        {CHAPTERS.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="inline-flex min-h-11 items-center gap-3 text-xs tracking-[0.2em] text-ink-400 uppercase transition-colors hover:text-ink lg:min-h-0"
            >
              <span className="font-display text-base tracking-normal tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              {chapter.short}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — the studio's style guide.
 *
 * Built from the real components and the real tokens: every value on it is
 * read off the rendered element, so it cannot drift from the site. A
 * component added to the site is added here in the same change. The site's
 * header and footer wrap it, as they wrap every page (see `App.tsx`).
 */
export function BrandPage() {
  return (
    <Container className="pt-20">
      <div className="max-w-3xl">
        <Eyebrow>Brand guidelines</Eyebrow>
        <h1 className="mt-5 font-display text-6xl leading-[0.95] md:text-7xl">{studio.name}, as a system.</h1>
        <p className="mt-8 max-w-xl leading-relaxed text-ink-600">
          The colours, type, spacing and components the site is made of — one place to look before changing any of
          them, and a record of what each one is for.
        </p>
      </div>
      <div className="mt-20 grid gap-x-16 gap-y-12 lg:grid-cols-[12rem_minmax(0,1fr)]">
        <BrandNav />
        <div className="min-w-0">
          {CHAPTERS.map(({ id, title, blurb, Body }, index) => (
            <GuideSection key={id} id={id} index={index + 1} title={title} blurb={blurb}>
              <Body />
            </GuideSection>
          ))}
        </div>
      </div>
    </Container>
  )
}
