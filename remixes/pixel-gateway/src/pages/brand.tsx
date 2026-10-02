import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { PageHero } from "@/components/page-hero"
import { Container } from "@/components/ui/container"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, where it goes and how it talks.", Body: BrandIdentity },
  { id: "colour", title: "Colour", blurb: "Every token, as the stylesheet has it right now — with contrast.", Body: ColourTokens },
  { id: "type", title: "Typography", blurb: "Three pixel faces, one scale.", Body: Typography },
  { id: "space", title: "Space, shadow, motion", blurb: "A 4px grid, no radii, hard shadows and steps.", Body: SpaceAndSurface },
  { id: "icons", title: "Icons and imagery", blurb: "Sprites for characters, Lucide for chrome, photographs pixelated.", Body: Iconography },
  { id: "components", title: "Components", blurb: "Everything in the project, live, with the snippet that makes it.", Body: ComponentLibrary },
]

/** `/brand` — the style guide, built from the real tokens and components. */
export function BrandPage() {
  return (
    <>
      <PageHero kicker="brand guidelines" title="Pixelkeep, as a system." blurb="The tokens, type and components the site is built from — one place to look before changing any of them." />
      <main data-canvas-ignore className="bg-bg">
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-12 py-16 sm:py-24 lg:grid-cols-[12rem_minmax(0,1fr)]">
          <nav aria-label="Style guide" className="hidden lg:block">
            <ul className="sticky top-24 grid gap-1">
              {CHAPTERS.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="block px-3 py-2 font-display text-[9px] uppercase text-fg-muted transition-colors duration-100 hover:bg-surface-2 hover:text-fg">{c.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0">
            {CHAPTERS.map(({ id, title, blurb, Body }) => (
              <GuideSection key={id} id={id} title={title} blurb={blurb}><Body /></GuideSection>
            ))}
          </div>
        </Container>
      </main>
    </>
  )
}
