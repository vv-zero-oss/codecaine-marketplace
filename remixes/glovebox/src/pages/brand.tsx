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
import { Container } from "@/components/ui/container"
import { LogoMark } from "@/components/ui/logo-mark"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, the room it needs, and how Glovebox sounds.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Paper and ink, two quiet signals, and three tints for footage. Read from the stylesheet as it is now — change a token in index.css and it changes here.",
    Body: ColourTokens,
  },
  { id: "type", title: "Typography", blurb: "Newsreader for what we promise, DM Sans for everything else, DM Mono for numbers that matter.", Body: Typography },
  {
    id: "space",
    title: "Spacing, radii, shadows, borders",
    blurb: "Soft corners that grow with the thing they hold, warm stacked shadows, and almost no borders.",
    Body: SpaceAndSurface,
  },
  { id: "motion", title: "Motion", blurb: "Unhurried and scrubbed by the scroll; short and quiet under the finger. Press play.", Body: Motion },
  { id: "icons", title: "Iconography and imagery", blurb: "Thin Lucide strokes, one drawn mark, and footage of people in their cars.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component on the page, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

const KEY =
  "flex h-11 items-center rounded-control bg-surface px-3.5 text-[15px] text-ink shadow-press transition-[background-color,transform] duration-(--duration-press) ease-(--ease-out) hover:bg-surface-soft focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:outline-none active:scale-[0.97] sm:h-10 sm:px-3"

/** The guide's nav: the site's tray of keys, in its sand state, with the way home. */
export function BrandNav() {
  return (
    <header className="pointer-events-none sticky top-3 z-40 flex justify-center px-3 sm:top-4">
      <nav aria-label="Style guide" className="pointer-events-auto flex items-center gap-1 rounded-[0.875rem] bg-sand-deep/90 p-1 shadow-nav backdrop-blur-md">
        <Link href="/" aria-label="Glovebox home" className={cn(KEY, "gap-1.5 px-3")}>
          <LogoMark className="size-[18px]" />
          <span className="font-display text-[17px] leading-none tracking-[-0.01em]">Glovebox</span>
        </Link>
        <a href="#components" className={cn(KEY, "hidden min-[400px]:flex")}>
          Components
        </a>
        <span className="flex h-11 items-center rounded-control bg-sand-press px-3.5 text-[15px] text-ink-soft sm:h-10 sm:px-3">Brand</span>
      </nav>
    </header>
  )
}

/** The chapter list, beside the content on wide screens. */
export function ChapterList() {
  return (
    <nav aria-label="Chapters" className="hidden lg:block">
      <ol className="sticky top-24 space-y-0.5">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="flex min-h-9 items-baseline gap-3 rounded-control px-3 py-1.5 text-[15px] text-ink-soft transition-colors duration-(--duration-ui) ease-(--ease-out) hover:bg-sand-deep hover:text-ink"
            >
              <span className="font-mono text-[11px] text-muted tabular">{String(i + 1).padStart(2, "0")}</span>
              {chapter.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — Glovebox's style guide.
 *
 * Built from the real components and the real tokens: every value on it is
 * read off the rendered element, so it cannot drift from the page. A
 * component added to the page is added here in the same change.
 */
export function BrandPage() {
  return (
    <>
      <BrandNav />
      <main data-canvas-ignore>
        <Container className="pt-20 pb-[12svh] sm:pt-28">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <LogoMark className="size-14 text-ink sm:size-20" />
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-[clamp(2.5rem,4.2vw+1rem,4.75rem)] leading-[1.02] tracking-[-0.022em] text-balance text-ink">
                Brand guidelines
                <br />
                <em>for a quiet product</em>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-muted sm:text-[17px]">
                The tokens, type and components the Glovebox page is built from — one place to look before changing
                any of them, and the place to add anything new.
              </p>
            </Reveal>
          </div>
          <div className="mx-auto mt-[12svh] grid max-w-[88rem] gap-12 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <ChapterList />
            <div className="min-w-0">
              {CHAPTERS.map(({ id, title, blurb, Body }, i) => (
                <GuideSection key={id} id={id} number={String(i + 1).padStart(2, "0")} title={title} blurb={blurb}>
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
