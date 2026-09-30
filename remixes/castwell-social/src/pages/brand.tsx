import { BookOpen, Palette, Ruler, Shapes, Sparkles, Type } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { PageHero, type ChipSpec } from "@/components/sections/shared/page-hero"
import { Container } from "@/components/ui/container"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, the room it needs, and how Castwell talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Cream and ink, a night ground for diagrams, and mint as the one accent — every token in index.css, read from the stylesheet as it is now.",
    Body: ColourTokens,
  },
  { id: "type", title: "Typography", blurb: "Newsreader Light for the promise, Inter for the detail. Every figure below is measured off its sample.", Body: Typography },
  {
    id: "space",
    title: "Space, corners, shadows, lines",
    blurb: "Square corners, 1px hairlines, a clamp for the gutter and one for the section — and almost no shadow.",
    Body: SpaceAndSurface,
  },
  { id: "motion", title: "Motion", blurb: "One strong ease-out, short durations, and scroll that feels slightly weighted. Press play.", Body: Motion },
  { id: "imagery", title: "Iconography and imagery", blurb: "Pixel marks for features, Lucide for UI, the networks’ own logos, and real creators on camera.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component in the project, live and imported from where the pages import it — in its variants and states, with how to use it.",
    Body: ComponentLibrary,
  },
]

const CHIPS: ChipSpec[] = [
  { label: "Colour tokens", tone: "mint", icon: <Palette />, depth: 0.25, size: "lg", className: "left-[5%] top-[24%]" },
  { label: "Type scale", tone: "periwinkle", icon: <Type />, depth: 0.2, className: "right-[8%] top-[16%]" },
  { label: "Components", tone: "butter", icon: <Shapes />, depth: 0.35, size: "lg", className: "right-[4%] top-[58%]" },
  { label: "Voice", tone: "coral", icon: <BookOpen />, depth: 0.15, size: "sm", className: "left-[15%] top-[76%]" },
  { label: "Spacing", tone: "sage", icon: <Ruler />, depth: 0.25, size: "sm", className: "left-[36%] top-[10%]" },
  { label: "Motion", tone: "mint-soft", icon: <Sparkles />, depth: 0.2, size: "sm", className: "right-[22%] top-[86%]" },
  { tone: "mint", depth: 0.8, size: "lg", className: "left-[14%] top-[46%]" },
  { tone: "coral", depth: 0.85, className: "right-[12%] top-[40%]" },
]

/** The chapter index: a hairline grid of numbered cells, as the site lays out everything. */
function ChapterIndex() {
  return (
    <nav aria-label="Style guide chapters" className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-4 xl:grid-cols-7">
      {CHAPTERS.map((chapter, i) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          className="group flex min-h-24 flex-col justify-between gap-4 border-r border-b border-line p-4 transition-colors duration-200 hover:bg-sage md:p-5"
        >
          <span className="text-[11px] text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-serif text-[1.2rem] leading-tight font-light text-ink">{chapter.title}</span>
        </a>
      ))}
    </nav>
  )
}

/**
 * `/brand` — Castwell's brand guidelines.
 *
 * Built from the real tokens and components: every value on it is read off
 * the rendered element, so it cannot drift from the site. A component added
 * to the project is added here in the same change.
 */
export function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Brand guidelines"
        title="Castwell, as a system."
        description="The mark, the palette, the type, the motion and every component the site is built from — one place to look before changing any of them."
        cta="See the components"
        ctaHref="#components"
        secondary="Start with colour"
        secondaryHref="#colour"
        chips={CHIPS}
        compact
      />
      <Container className="pb-(--spacing-section)">
        <ChapterIndex />
        {CHAPTERS.map(({ id, title, blurb, Body }, i) => (
          <GuideSection key={id} id={id} index={i + 1} title={title} blurb={blurb}>
            <Body />
          </GuideSection>
        ))}
      </Container>
    </>
  )
}
