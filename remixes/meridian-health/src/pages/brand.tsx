import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { Link } from "@/lib/router"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, where it goes and how it talks.", Body: BrandIdentity },
  { id: "colour", title: "Colour", blurb: "Every colour on the page, read from the stylesheet as it is now. Change a token in index.css and it changes here.", Body: ColourTokens },
  { id: "type", title: "Typography", blurb: "Inter for everything you read, a mono for tokens.", Body: Typography },
  { id: "space", title: "Spacing, radii, shadows, borders", blurb: "A 4px grid, big soft corners, hairlines, and shadows only where something lifts.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion", blurb: "Short, eased out, and only where it says something changed. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "One line weight, real photography.", Body: Iconography },
  { id: "components", title: "Components", blurb: "Every component in the project, live, in its variants — with how to use it.", Body: ComponentLibrary },
]

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label="Meridian home"><Wordmark /></Link>
          <span className="text-line">/</span>
          <span className="truncate text-sm text-ink-2">Brand guidelines</span>
        </div>
        <ButtonLink href="#components" size="sm" variant="outline" className="hidden sm:inline-flex">Components</ButtonLink>
      </Container>
    </header>
  )
}

/** `/brand` — the system, drawn from the real tokens and components. */
export function BrandPage() {
  return (
    <>
      <BrandHeader />
      <main data-canvas-ignore>
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-ink-3 uppercase">Style guide</p>
            <h1 className="display mt-3 text-4xl sm:text-5xl">Meridian, as a system</h1>
            <p className="mt-4 text-lg text-ink-2">The tokens, type and components the site is built from — one place to look before changing any of them.</p>
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <nav aria-label="Style guide" className="hidden lg:block">
              <ul className="sticky top-24 space-y-1 text-sm">
                {CHAPTERS.map((c) => <li key={c.id}><a href={`#${c.id}`} className="block rounded-lg px-3 py-1.5 text-ink-2 transition-colors hover:bg-tint hover:text-ink">{c.title}</a></li>)}
              </ul>
            </nav>
            <div className="min-w-0">
              {CHAPTERS.map(({ id, title, blurb, Body }) => <GuideSection key={id} id={id} title={title} blurb={blurb}><Body /></GuideSection>)}
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
