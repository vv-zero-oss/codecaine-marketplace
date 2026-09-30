import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Stamp } from "@/components/ui/stamp"
import { Wordmark } from "@/components/ui/wordmark"
import { hotel } from "@/content"
import { Link } from "@/lib/router"

const CHAPTERS = [
  {
    id: "brand",
    label: "The house",
    title: "A name over a door, and a way of talking.",
    lede: "The wordmark, the seal, the room they need, and how the house writes.",
    Body: BrandIdentity,
  },
  {
    id: "colour",
    label: "Colour",
    title: "Paper, ink, pine and one red.",
    lede: "Every value here is read off the stylesheet as it is now. Change a token in index.css and it changes on this page.",
    Body: ColourTokens,
  },
  {
    id: "type",
    label: "Typography",
    title: "A serif to read, a sans to use, a mono to label.",
    lede: "Sizes and spacing are measured off the rendered type.",
    Body: Typography,
  },
  {
    id: "space",
    label: "Space & surface",
    title: "Square corners, fine rules, sheets on sheets.",
    lede: "One fluid step between chapters, Tailwind’s 4px steps inside them, and shadows only where paper lies on paper.",
    Body: SpaceAndSurface,
  },
  {
    id: "motion",
    label: "Motion",
    title: "Quiet, quick, and only where something changes.",
    lede: "The page’s own curves and durations, read from the stylesheet. Press play.",
    Body: Motion,
  },
  {
    id: "icons",
    label: "Icons & imagery",
    title: "Small icons, drawn marks, printed photographs.",
    Body: Iconography,
  },
  {
    id: "components",
    label: "Components",
    title: "Everything the guide is made of.",
    lede: "Every component in the project, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

/** The masthead, for the style guide: the name, where you are, the chapters. */
export function BrandHeader() {
  return (
    <header className="sticky top-0 z-50 bg-paper">
      <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-baseline gap-3">
          <Link href="/" aria-label={`${hotel.full}, the guide`}>
            <Wordmark />
          </Link>
          <span className="label hidden truncate text-ink-faint sm:inline">/ Brand guidelines</span>
        </div>
        <nav aria-label="Style guide" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  className="text-[13px] text-ink-soft underline decoration-transparent underline-offset-[6px] transition-[color,text-decoration-color] duration-150 hover:text-ink hover:decoration-ink"
                >
                  {chapter.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild variant="outline" size="sm">
          <Link href="/">Back to the guide</Link>
        </Button>
      </div>
      <div aria-hidden className="h-[5px] border-y border-ink/80" />
    </header>
  )
}

/**
 * `/brand` — the house style of Hotel Arven.
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
        <Container className="pt-8 sm:pt-10">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
            <span className="label text-ink-soft">Brand guidelines · for anyone setting the guide</span>
            <span className="label text-ink-faint">
              {hotel.place} · {hotel.altitude}
            </span>
          </div>
          <div className="relative mt-10 grid gap-8 pb-(--spacing-section) lg:mt-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-cover font-normal tracking-[-0.03em] text-balance">The house style.</h1>
              <p className="mt-8 max-w-[46ch] text-lede text-ink-soft">
                The paper, ink, type and pieces the guide to {hotel.full} is set in — one place to look before changing
                any of them.
              </p>
            </div>
            <div className="hidden items-center justify-center lg:col-span-4 lg:flex">
              <Stamp ring="House style · Hotel Arven · " top="Set in" middle="2026" bottom="Zermatt" rotate={-8} className="w-48" />
            </div>
            <ol className="grid grid-cols-2 gap-x-6 border-t border-ink sm:grid-cols-4 lg:col-span-12 lg:grid-cols-7">
              {CHAPTERS.map((chapter, i) => (
                <li key={chapter.id} className="border-b border-rule">
                  <a href={`#${chapter.id}`} className="flex min-h-12 items-baseline gap-2 py-3 transition-colors duration-150 hover:text-signal">
                    <span className="label text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-lg">{chapter.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
          {CHAPTERS.map(({ id, label, title, lede, Body }, i) => (
            <GuideSection key={id} id={id} number={String(i + 1).padStart(2, "0")} label={label} title={title} lede={lede}>
              <Body />
            </GuideSection>
          ))}
        </Container>
      </main>
    </>
  )
}
