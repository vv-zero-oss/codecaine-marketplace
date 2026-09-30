import { ArrowLeft } from "lucide-react"

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
import { Eyebrow } from "@/components/blocks/eyebrow"
import { RiseText } from "@/components/blocks/rise-text"
import { Container } from "@/components/ui/container"
import { brand } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The name, where it goes, and how Oakbird talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Every colour on the page, read from the stylesheet as it is now. Change a token in index.css and it changes here.",
    Body: ColourTokens,
  },
  { id: "type", title: "Type", blurb: "Archivo, three ways: heavy, condensed, and plain for reading.", Body: Typography },
  {
    id: "space",
    title: "Space & surface",
    blurb: "Fluid gutters, fat forest rules, stickers with a hard shadow, and photos that are never square.",
    Body: SpaceAndSurface,
  },
  { id: "motion", title: "Motion", blurb: "Quick to answer, strong ease-out, one bounce allowed. Press play.", Body: Motion },
  { id: "icons", title: "Icons & imagery", blurb: "Lucide for the small marks, Pexels for the food, a shape around every picture.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component on the site, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

const LINK =
  "inline-flex min-h-11 items-center font-condensed text-label uppercase underline-offset-[6px] decoration-2 [@media(hover:hover)]:hover:underline"

export function BrandHeader() {
  return (
    <header id="top" className="sticky top-0 z-40 border-b-2 border-forest bg-lime">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label={`${brand.name} home`} className="inline-flex min-h-11 items-center gap-1 font-heavy text-[22px] leading-none tracking-[-0.03em]">
            {brand.name}
            <span aria-hidden className="mb-3 size-2 rounded-pill bg-orange" />
          </Link>
          <span className="hidden truncate font-condensed text-label text-ink-soft uppercase min-[400px]:inline">/ Brand guidelines</span>
        </div>
        <nav aria-label="Style guide, short" className="flex items-center gap-6">
          <a href="#components" className={cn(LINK, "hidden sm:inline-flex")}>
            Components
          </a>
          <Link href="/" className={LINK}>
            <ArrowLeft className="mr-1 size-4" aria-hidden /> Site
          </Link>
        </nav>
      </Container>
    </header>
  )
}

/** The chapter list, beside the content on wide screens. */
export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="hidden lg:block">
      <ol className="sticky top-24 space-y-1">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="flex min-h-10 items-center gap-3 rounded-pill px-3 font-condensed text-label uppercase transition-colors duration-(--duration-hover) ease-out-strong [@media(hover:hover)]:hover:bg-forest [@media(hover:hover)]:hover:text-lime"
            >
              <span className="font-mono text-caption tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
              {chapter.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — Oakbird's style guide.
 *
 * Built from the real components and the real tokens: every value on it is
 * read off the rendered element, so it cannot drift from the site. A
 * component added to the site is added here in the same change.
 */
export function BrandPage() {
  return (
    <>
      <BrandHeader />
      <main data-canvas-ignore>
        <Container className="pt-row pb-section">
          <div className="max-w-5xl">
            <Eyebrow>Style guide</Eyebrow>
            <h1 className="mt-4 font-heavy text-title">
              <RiseText text={`${brand.name},`} />
              <br />
              <RiseText text="by the rules" delay={0.1} />
            </h1>
            <p className="mt-6 max-w-[46ch] text-body text-ink-soft">
              The colours, type, shapes, motion and parts the site is built from — one place to look before changing any
              of them, and the place to add anything new.
            </p>
          </div>
          <div className="mt-section grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <BrandNav />
            <div className="min-w-0">
              {CHAPTERS.map(({ id, title, blurb, Body }, i) => (
                <GuideSection key={id} id={id} number={`Chapter ${String(i + 1).padStart(2, "0")}`} title={title} blurb={blurb}>
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
