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
  { id: "type", title: "Typography", blurb: "Geist for everything you read, Geist Mono for labels, Space Mono for display lines.", Body: Typography },
  { id: "space", title: "Spacing, radii, shadows, borders", blurb: "A 4px grid, soft corners, hairlines, and light that comes from the bottom edge.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion", blurb: "Eased out, purposeful, and quiet when asked. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "One line weight, real photography.", Body: Iconography },
  { id: "components", title: "Components", blurb: "Every component in the project, live, in its variants and states — with how to use it.", Body: ComponentLibrary },
]

export function BrandPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" aria-label="Halo home"><Wordmark /></Link>
            <span className="text-ghost">/</span>
            <span className="truncate text-sm text-muted">Brand guidelines</span>
          </div>
          <ButtonLink href="#components" size="sm" variant="outline" className="hidden sm:inline-flex">Components</ButtonLink>
        </Container>
      </header>
      <main data-canvas-ignore>
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] tracking-wider text-ember uppercase">Style guide</p>
            <h1 className="scanline mt-3 text-[clamp(30px,4vw,52px)] leading-[1.2] tracking-[-0.03em] text-balance">Halo, as a system</h1>
            <p className="mt-4 text-lg text-muted">The tokens, type and components the site is built from — one place to look before changing any of them.</p>
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <nav aria-label="Style guide" className="hidden lg:block">
              <ul className="sticky top-24 space-y-1 text-sm">
                {CHAPTERS.map((c) => <li key={c.id}><a href={`#${c.id}`} className="block rounded-lg px-3 py-1.5 text-muted transition-colors hover:bg-white/6 hover:text-text">{c.title}</a></li>)}
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
