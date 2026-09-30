import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { PixelMark } from "@/components/marks/pixel-marks"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"

const CHAPTERS = [
  { id: "brand", title: "The mark and the voice", blurb: "A cloud drawn in squares, the room it needs, and how Cirrus argues its case.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Paper, ink and pixels",
    blurb: "White paper, near-black ink, and a pixel palette that only ever appears as squares — every colour in index.css, read from the stylesheet as it is now.",
    Body: ColourTokens,
  },
  { id: "type", title: "Type", blurb: "Geist for everything read, Geist Mono for labels and numbers. Every figure below is measured off its sample.", Body: Typography },
  {
    id: "space",
    title: "Space, corners, lines",
    blurb: "A 9px pixel, a lot of paper between sections, hairline rules, notched corners and a single shadow.",
    Body: SpaceAndSurface,
  },
  { id: "motion", title: "Motion", blurb: "One strong ease-out, a slow ghost for photographs, and letters that flicker in. Press play.", Body: Motion },
  { id: "imagery", title: "Icons and imagery", blurb: "Pixel marks of its own, Lucide for UI, photographs that bleed in, and generative pixels instead of illustration.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component in the project, live and imported from where the page imports it — in its variants and states, with how to use it.",
    Body: ComponentLibrary,
  },
]

/** The top of the style guide, set like the masthead: heavy caps on the left, a narrow column on the right. */
function BrandMasthead() {
  return (
    <header>
      <Container className="grid lg:grid-cols-[minmax(0,1fr)_27.25rem]">
        <h1 className="pt-8 pb-7 text-display font-normal text-ink uppercase sm:pt-10 lg:pb-10">
          <span className="block">Brand</span>
          <span className="block">guidelines</span>
        </h1>
        <div className="flex flex-col justify-between gap-8 border-t border-hairline pt-6 pb-7 lg:border-t-0 lg:border-l lg:pt-10 lg:pb-8 lg:pl-10">
          <Link href="/" className="label group inline-flex min-h-11 items-center gap-2 self-start text-ink">
            <ArrowLeft className="size-3 transition-transform duration-(--duration-hover) ease-(--ease-out) [@media(hover:hover)]:group-hover:-translate-x-0.5" />
            Back to Cirrus
          </Link>
          <div className="flex items-end justify-between gap-6">
            <PixelMark />
            <p className="max-w-[16rem] text-right text-[0.8125rem] leading-[1.55] text-ink-soft">
              The tokens, type and components the page is built from — one place to look before changing any of them.
            </p>
          </div>
        </div>
      </Container>
      <Container>
        <nav aria-label="Chapters" className="grid grid-cols-2 border-t border-l border-hairline sm:grid-cols-4 lg:grid-cols-7">
          {CHAPTERS.map((chapter, i) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="group flex min-h-24 flex-col justify-between gap-3 border-r border-b border-hairline bg-paper/70 p-4 transition-colors duration-(--duration-hover) ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:hover:bg-lime"
            >
              <span className="label text-mute">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-small leading-snug text-ink">{chapter.title}</span>
            </a>
          ))}
        </nav>
      </Container>
    </header>
  )
}

/**
 * `/brand` — Cirrus's brand guidelines.
 *
 * Built from the real tokens and components: every value on it is read off
 * the rendered element, so it cannot drift from the page. A component added
 * to the project is added here in the same change.
 */
export function BrandPage() {
  useEffect(() => {
    const previous = document.title
    document.title = "Brand guidelines — Cirrus"
    return () => {
      document.title = previous
    }
  }, [])
  return (
    <>
      <BrandMasthead />
      <div>
        <Container className="pb-[calc(var(--spacing-section)/2)]">
          {CHAPTERS.map(({ id, title, blurb, Body }, i) => (
            <GuideSection key={id} id={id} index={i + 1} title={title} blurb={blurb}>
              <Body />
            </GuideSection>
          ))}
        </Container>
      </div>
    </>
  )
}
