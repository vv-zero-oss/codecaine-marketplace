import { ArrowRight } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { BlurText } from "@/components/motion/blur-text"
import { LogoMark } from "@/components/blocks/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { brand } from "@/content"
import { Link } from "@/lib/router"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, the room it needs, and how Boundless talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Night, paper and a mauve wash between them. Every value is read off the stylesheet as it is now — change a token in index.css and it changes here.",
    Body: ColourTokens,
  },
  { id: "type", title: "Typography", blurb: "Inter for everything, fluid from phone to desktop, tracked in as it grows.", Body: Typography },
  {
    id: "space",
    title: "Space and surface",
    blurb: "A fluid gutter, a screen per scene, pill corners, hairlines, and soft stacked shadows only where something lifts.",
    Body: SpaceAndSurface,
  },
  { id: "motion", title: "Motion", blurb: "Blur is the motion: things arrive out of focus and sharpen. Press play.", Body: Motion },
  { id: "icons", title: "Icons and imagery", blurb: "Small line icons beside words, and photographs people would pin to a canvas.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component in the project, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

/** The header's paper face, for a page with no canvas under it. */
export function BrandHeader() {
  return (
    <header className="sticky top-0 z-40 h-nav bg-paper/85 text-ink backdrop-blur-md">
      <Container className="flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-[-0.02em]">
            <LogoMark />
            {brand.name}
          </Link>
          <span className="text-ink-muted">/</span>
          <span className="truncate text-nav font-medium text-mist">Brand guidelines</span>
        </div>
        <ButtonLink href="#components" size="nav" className="hidden sm:inline-flex">
          Components
        </ButtonLink>
      </Container>
    </header>
  )
}

/** The chapter list, beside the content on wide screens. */
export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="hidden lg:block">
      <ul className="sticky top-[calc(var(--spacing-nav)+24px)] space-y-0.5 text-nav">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="flex items-center gap-3 rounded-pill px-3 py-2 font-medium text-mist transition-colors duration-(--duration-hover) hover:bg-field hover:text-ink"
            >
              <span className="tabular-nums text-ink-muted">0{i + 1}</span>
              {chapter.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * `/brand` — Boundless's style guide.
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
        <section className="px-inset pt-2">
          <div className="relative overflow-hidden rounded-panel bg-night text-on-night">
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-mauve-glow opacity-40" />
            <Container className="relative py-20 sm:py-28">
              <p className="text-nav font-medium text-mist">Brand guidelines</p>
              <h1 className="mt-4 max-w-[14ch] text-hero font-normal tracking-display text-balance">
                <BlurText text={`${brand.name}, as a system`} by="line" once />
              </h1>
              <p className="mt-6 max-w-[46ch] text-body text-mist">
                The tokens, type, motion and components the site is built from — one place to look before changing
                any of them.
              </p>
              <ButtonLink href="#components" variant="paper" size="default" className="group/go mt-8">
                See the components
                <ArrowRight className="transition-transform duration-(--duration-hover) ease-out-strong group-hover/go:translate-x-1" aria-hidden />
              </ButtonLink>
            </Container>
          </div>
        </section>
        <Container className="py-16 sm:py-24">
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
