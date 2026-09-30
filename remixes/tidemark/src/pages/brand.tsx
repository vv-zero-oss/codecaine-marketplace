import { ArrowLeft } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography, WordmarkArt } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The name in wide caps, the ring and tide line, the room they need, and how Tidemark talks about money.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Oxblood and cream, pink to press and coral for heat, and two colours for money. Every value is read from the stylesheet as it is now — change a token in index.css and it changes here.",
    Body: ColourTokens,
  },
  { id: "type", title: "Typography", blurb: "Archivo, extended and heavy, in caps for anything that shouts; Inter for anything you read; Geist Mono for every figure.", Body: Typography },
  { id: "space", title: "Space and surface", blurb: "A 4px grid, square corners, hairline rings instead of shadows, and one lifted metal card.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion", blurb: "Short and firm on a strong out-curve; springs only for what follows the pointer. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "Lucide in square tiles, logos in one ink, and warm, moody photographs of people who run companies.", Body: Iconography },
  { id: "components", title: "Components", blurb: "Every component in the project, live, in its variants and states — with how to use it.", Body: ComponentLibrary },
]

/** The style guide's own header: the oxblood bar, the name home, where you are, and a way back. */
export function BrandHeader() {
  return (
    <header className="sticky top-0 z-40 bg-night shadow-[0_1px_0_var(--color-night-line)]">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center gap-3 px-gutter md:h-[76px]">
        <Link href="/" aria-label="Tidemark home" className="shrink-0 text-pink">
          <WordmarkArt className="text-[17px] sm:text-[20px] md:text-[22px]" />
        </Link>
        <span className="text-night-line">/</span>
        <span className="type-caps min-w-0 truncate text-[12px] text-night-muted sm:text-[13px]">Brand guidelines</span>
        <Link href="/" className={cn(buttonVariants({ variant: "pink", size: "sm" }), "ml-auto h-10 px-3 sm:px-4")}>
          <ArrowLeft />
          <span className="hidden sm:inline">Back to the site</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>
    </header>
  )
}

/** The chapter list, beside the content on wide screens. */
export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="hidden lg:block">
      <ol className="sticky top-28 border-t border-ink">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id} className="border-b border-line">
            <a
              href={`#${chapter.id}`}
              className="flex items-baseline gap-3 px-1 py-2.5 text-[14px] text-ink-muted transition-colors duration-(--duration-hover) hover:bg-paper-deep hover:text-ink"
            >
              <span className="font-mono text-[11px] text-coral">{String(i + 1).padStart(2, "0")}</span>
              {chapter.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — Tidemark's style guide.
 *
 * Built from the real components and the real tokens: every value on it is
 * read off the rendered element, so it cannot drift from the page. A
 * component added to the project is added here in the same change.
 */
export function BrandPage() {
  return (
    <>
      <BrandHeader />
      <main data-canvas-ignore>
        <section className="bg-night pt-16 pb-16 text-night-fg md:pt-24 md:pb-24">
          <Container>
            <p className="type-eyebrow text-pink">Brand guidelines</p>
            <h1 className="type-display mt-5 max-w-[14ch] text-[clamp(46px,6.4vw,96px)] text-balance">
              Tidemark, <span className="text-pink">as a</span> system
            </h1>
            <p className="mt-6 max-w-[520px] text-[17px] leading-[1.55] text-night-muted">
              The tokens, type and components the site is built from — one place to look before changing any of them.
            </p>
          </Container>
        </section>
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <BrandNav />
            <div className="min-w-0">
              {CHAPTERS.map(({ id, title, blurb, Body }, i) => (
                <GuideSection key={id} id={id} index={i + 1} title={title} blurb={blurb}>
                  <Body />
                </GuideSection>
              ))}
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
