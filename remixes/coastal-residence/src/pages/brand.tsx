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
import { Container } from "@/components/ui/container"
import { Emblem } from "@/components/ui/emblem"
import { StretchText } from "@/components/ui/stretch-text"
import { brand } from "@/content"
import { Link } from "@/lib/router"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The badge, the emblem and how Luna speaks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Olive, sand and limestone, with a sky grade kept for the hero. Every value is read off the page as it renders — change a token in index.css and it changes here.",
    Body: ColourTokens,
  },
  {
    id: "type",
    title: "Typography",
    blurb: "A condensed serif in capitals for everything that should be read from across a room, its italic for one warm word, and Manrope for the rest.",
    Body: Typography,
  },
  {
    id: "space",
    title: "Space & surface",
    blurb: "Generous spacing, square corners, hairlines, and a single shadow for the one thing that floats.",
    Body: SpaceAndSurface,
  },
  {
    id: "motion",
    title: "Motion",
    blurb: "Slow and settling: long ease-outs, letters that arrive and relax, a scroll that glides. Press play.",
    Body: Motion,
  },
  { id: "icons", title: "Icons & imagery", blurb: "Hairline icons, one drawn emblem, and photographs of the place.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component the site is built from, live, in its variants and states — and how to use it.",
    Body: ComponentLibrary,
  },
]

/** The style guide's own bar: the emblem home, and where you are. */
export function BrandHeader() {
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-ink/10 bg-shell/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:px-14">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label={`${brand.name} home`} className="flex min-h-11 items-center gap-3 transition-opacity hover:opacity-70">
            <Emblem className="size-8 shrink-0" />
            <span className="label hidden tracking-[0.3em] sm:inline">{brand.name}</span>
          </Link>
          <span className="text-ink/30">/</span>
          <span className="label truncate text-ink-soft">Brand guidelines</span>
        </div>
        <a
          href="#components"
          className="label hidden h-11 items-center rounded-pill border border-current px-5 transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-soft)] hover:bg-ink hover:text-pale active:scale-[0.97] sm:inline-flex"
        >
          Components
        </a>
      </Container>
    </header>
  )
}

/** The chapter list, beside the content on wide screens. */
export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="hidden lg:block">
      <ol className="sticky top-28 space-y-1">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="group flex items-baseline gap-3 py-1.5 text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              <span className="label tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-condensed text-[1.35rem] leading-none">{chapter.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — Luna's style guide.
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
        <Container className="pt-16 pb-8 sm:pt-24 lg:px-14">
          <div className="flex flex-col items-start">
            <p className="label text-ink-soft">Brand guidelines</p>
            <h1 className="mt-6 font-condensed text-[clamp(3.6rem,10vw,10rem)] leading-[0.86]">
              <StretchText text={brand.word[0]} play="mount" className="block" />
              <span className="block">
                <StretchText text="as a system" play="mount" delay={0.12} />
              </span>
            </h1>
            <p className="mt-8 max-w-[34rem] text-body text-ink-soft">
              The palette, type, spacing, motion and components the site is built from — one place to look before
              changing any of them, and the same values the pages use.
            </p>
          </div>
          <div className="mt-20 grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
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
