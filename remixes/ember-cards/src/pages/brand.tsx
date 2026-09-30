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
import { Reveal } from "@/components/motion/reveal"
import { SplitText } from "@/components/motion/split-text"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { LogoMark } from "@/components/ui/logo"
import { BRAND } from "@/content"
import { Link } from "@/lib/router"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, the name and how Ember talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Graphite black, warm bone and one champagne accent — plus the metal finishes and the light. Every value is read off the page as it renders; change a token in index.css and it changes here.",
    Body: ColourTokens,
  },
  { id: "type", title: "Typography", blurb: "Newsreader for everything worth reading slowly, Inter for everything you act on.", Body: Typography },
  {
    id: "space",
    title: "Space and surface",
    blurb: "A 4px grid, soft corners, and shadows that light a surface from above before they drop it.",
    Body: SpaceAndSurface,
  },
  { id: "motion", title: "Motion", blurb: "Blur that clears, a short rise, a strong ease-out. Press play.", Body: Motion },
  { id: "icons", title: "Icons and imagery", blurb: "Lucide at one weight, photographs under metal, and no coloured gradients.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component on the site, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

/** The style guide's own header: the mark home, and where you are. */
export function BrandHeader() {
  return (
    <header id="nav" className="relative z-40">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label={`${BRAND} home`} className="inline-flex min-h-11 items-center gap-1.5 text-ink">
            <LogoMark className="size-7" />
            <span className="text-[1.0625rem] font-medium tracking-[-0.02em]">{BRAND}</span>
          </Link>
          <span className="text-subtle">/</span>
          <span className="truncate text-[0.8125rem] text-muted">Brand guidelines</span>
        </div>
        <ButtonLink href="#components" size="sm" variant="light" className="hidden sm:inline-flex">
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
      <ol className="sticky top-24 space-y-0.5">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="flex items-baseline gap-3 rounded-item px-3 py-2 text-[0.8125rem] text-muted transition-colors duration-(--duration-hover) ease-out hover:bg-surface hover:text-ink"
            >
              <span className="font-mono text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
              {chapter.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — Ember's style guide.
 *
 * Built from the real components and the real tokens: every value on it is
 * read off the rendered element, so it cannot drift from the site. A component
 * added to the site is added here in the same change.
 */
export function BrandPage() {
  return (
    <>
      <BrandHeader />
      <main data-canvas-ignore>
        <Container className="pt-12 pb-24 sm:pt-20 sm:pb-32">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow label="Brand guidelines" className="mb-5" />
            </Reveal>
            <SplitText as="h1" text={`${BRAND}, as a system.`} className="font-serif text-display text-ink" />
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                The tokens, type, motion and components the site is made of — one place to look before changing any of
                them, reading the same values the page does.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14">
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
