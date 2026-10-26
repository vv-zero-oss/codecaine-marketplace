import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The ring, where it goes, and how Orra talks — calmly.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "A dusk-lit canvas: near-black, graphite and frosted glass, warm greys for text, and colour only in three gradients. Read from index.css as it is now — change a token and it changes here.",
    Body: ColourTokens,
  },
  { id: "type", title: "Typography", blurb: "DM Sans at weight 500 — never bolder — for display and body; Geist for section headings.", Body: Typography },
  {
    id: "space",
    title: "Spacing, radii, shadows, borders",
    blurb: "Pills for controls, 10px for UI, 24px cards, 40px panels — and hairlines where others use shadows.",
    Body: SpaceAndSurface,
  },
  { id: "motion", title: "Motion", blurb: "Strong ease-outs, nothing over 640ms, and drift only where it explains. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "One icon set, one stroke; monochrome app marks; photography only where customers speak.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component in the project, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

/** The chapter list, beside the content on wide screens. */
export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="hidden lg:block">
      <ul className="sticky top-24 space-y-1 text-sm">
        {CHAPTERS.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="block rounded-pill px-3 py-1.5 text-ash transition-colors hover:bg-glass hover:text-bone"
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
 * `/brand` — Orra's style guide, built from the real tokens and components:
 * every value is read off the rendered page, so it cannot drift from the site.
 */
export function BrandPage() {
  return (
    <main data-canvas-ignore>
      <Container className="py-14 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow>Brand guidelines</Eyebrow>
          <h1 className="mt-3 text-display font-medium">Orra, as a system</h1>
          <p className="mt-5 text-xl leading-snug text-ash">
            The tokens, type, motion and components the site is built from — one place to look before changing any of
            them.
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
    </main>
  )
}
