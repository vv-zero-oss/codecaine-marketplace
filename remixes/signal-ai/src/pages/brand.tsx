import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { ThemeToggle } from "@/components/site-footer"
import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { Link } from "@/lib/router"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, where it goes and how it talks.", Body: BrandIdentity },
  { id: "colour", title: "Colour", blurb: "Every token, in light and dark, read from the stylesheet as it is now.", Body: ColourTokens },
  { id: "type", title: "Typography", blurb: "Inter Tight for everything you read, JetBrains Mono for code.", Body: Typography },
  { id: "space", title: "Spacing, radii, shadows, borders", blurb: "A 4px grid, soft corners, hairlines and shadows only where something lifts.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion", blurb: "Soft ease-out, short, and only where it says something changed. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "One line weight, real photography.", Body: Iconography },
  { id: "components", title: "Components", blurb: "Every component, live, with how to use it.", Body: ComponentLibrary },
]

export function BrandPage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-xl">
        <Container className="flex h-[50px] max-w-6xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" aria-label="Vantage home"><Wordmark /></Link>
            <span className="text-line-strong">/</span>
            <span className="truncate text-[13px] text-ink-2">Brand guidelines</span>
          </div>
          <ThemeToggle />
        </Container>
      </header>
      <main data-canvas-ignore>
        <Container className="max-w-6xl py-16 sm:py-20">
          <p className="text-[11px] tracking-widest text-ink-3 uppercase">Style guide</p>
          <h1 className="mt-3 max-w-2xl text-[clamp(2.2rem,5vw,3.2rem)] leading-[0.98] tracking-[-0.045em]">Vantage, as a system</h1>
          <p className="mt-4 max-w-xl text-[15px] text-ink-2">The tokens, type and components the site is built from — one place to look before changing any of them.</p>
          <div className="mt-14 grid gap-12 lg:grid-cols-[11rem_minmax(0,1fr)]">
            <nav aria-label="Style guide" className="hidden lg:block">
              <ul className="sticky top-20 space-y-0.5 text-[13px]">
                {CHAPTERS.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="block px-3 py-1.5 text-ink-2 transition-colors hover:bg-surface hover:text-ink">{c.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="min-w-0">
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
