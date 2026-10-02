import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The nameplate, where it goes and how it talks.", Body: BrandIdentity },
  { id: "colour", title: "Colour", blurb: "Every colour on the page, read from the stylesheet as it is now. Change a token in index.css and it changes here.", Body: ColourTokens },
  { id: "type", title: "Typography", blurb: "A Didone for the mastheads, a thickened condensed serif for headlines, a text serif for reading and a typewriter for everything you press.", Body: Typography },
  { id: "space", title: "Spacing, radii, shadows, borders", blurb: "A 4px grid, square corners on paper, soft ones on keys and cabinets, and shadows that mean something: raised, sunk or pressed.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion", blurb: "Keys press in 90ms, things arrive on ease-out, the page is thrown in once. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "One icon set, and photographs printed the way a paper prints them.", Body: Iconography },
  { id: "components", title: "Components", blurb: "Every component in the project, live, in its variants and states — with how to use it.", Body: ComponentLibrary },
]

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper-light/95 backdrop-blur">
      <Container className="flex min-h-14 items-center justify-between gap-4 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label="The Marlowe Gazette home" className="font-display text-xl whitespace-nowrap">The Marlowe Gazette</Link>
          <span aria-hidden className="text-ink-faint">/</span>
          <span className="kicker truncate">Brand guidelines</span>
        </div>
        <ButtonLink href="#components" size="sm" variant="paper" className="hidden sm:inline-flex">Components</ButtonLink>
      </Container>
    </header>
  )
}

/** The chapter list, beside the content on wide screens. */
function Contents() {
  return (
    <nav aria-label="Chapters" className="flex flex-wrap gap-x-5 gap-y-1 lg:sticky lg:top-20 lg:flex-col lg:gap-1">
      {CHAPTERS.map((c, i) => (
        <a key={c.id} href={`#${c.id}`} className="kicker flex min-h-9 items-center gap-2 underline-offset-4 decoration-rust decoration-2 hover:underline">
          <span className="text-ink-faint">{String(i + 1).padStart(2, "0")}</span>{c.title}
        </a>
      ))}
    </nav>
  )
}

export function BrandPage() {
  return (
    <>
      <BrandHeader />
      <main data-canvas-ignore>
        <Container className="py-10 sm:py-14">
          <h1 className="display text-[clamp(3rem,9vw,7rem)]">Brand guidelines</h1>
          <p className="mt-3 max-w-2xl text-[1.1rem] leading-snug text-ink-soft">The system behind the Gazette — rendered from the real tokens and components, never from screenshots.</p>
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <Contents />
            <div>
              {CHAPTERS.map(({ id, title, blurb, Body }) => (
                <GuideSection key={id} id={id} title={title} blurb={blurb}><Body /></GuideSection>
              ))}
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
