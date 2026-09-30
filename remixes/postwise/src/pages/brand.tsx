import { ArrowLeft } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import {
  BrandIdentity,
  ColourTokens,
  Iconography,
  Motion,
  SpaceAndSurface,
  Typography,
  WordmarkArt,
} from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { GradientBlob } from "@/components/motion/gradient-blob"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, the room it needs, and how Postwise sounds when it talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb: "Paper and ink by day, deep lagoon by night, and a sea-glass light between them. Every value is read from the stylesheet as it is now — change a token in index.css and it changes here.",
    Body: ColourTokens,
  },
  {
    id: "type",
    title: "Typography",
    blurb: "Inter Tight, light and tight, with one word in italic. Archivo, wide and heavy, only for the poster bands. Geist Mono for figures.",
    Body: Typography,
  },
  {
    id: "space",
    title: "Space and surface",
    blurb: "A 4px grid with a fluid gutter and section rhythm, soft corners from 6 to 28px, hairlines everywhere and layered shadows only where something lifts.",
    Body: SpaceAndSurface,
  },
  {
    id: "motion",
    title: "Motion",
    blurb: "Quick to arrive, slow to settle: an out-quint curve for almost everything, measured durations, and slow loops for light. Press play.",
    Body: Motion,
  },
  { id: "icons", title: "Iconography and imagery", blurb: "Lucide in line, a hand in the margin, logos in one ink, and photographs printed in two colours.", Body: Iconography },
  {
    id: "components",
    title: "Components",
    blurb: "Every component in the project, live, in its variants and states — with how to use it.",
    Body: ComponentLibrary,
  },
]

/** The style guide's own header: the mark home, where you are, and a way back. */
export function BrandHeader() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="mx-auto flex h-[52px] max-w-[1120px] items-center gap-3 rounded-[var(--radius-nav)] bg-card/90 px-2.5 pl-4 shadow-(--shadow-nav) backdrop-blur-md">
        <Link href="/" aria-label="Postwise home" className="shrink-0 text-ink">
          <WordmarkArt />
        </Link>
        <span className="text-line-strong">/</span>
        <span className="min-w-0 truncate text-[14px] text-ink-soft">Brand guidelines</span>
        <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "ml-auto")}>
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
      <ol className="sticky top-24 space-y-0.5 text-[14px]">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className="flex items-baseline gap-3 rounded-[var(--radius-field)] px-3 py-1.5 text-ink-muted transition-colors duration-(--duration-hover) hover:bg-paper-deep hover:text-ink"
            >
              <span className="font-mono text-[11px] text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
              {chapter.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — Postwise's style guide.
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
        <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
          <GradientBlob intensity={0.55} className="h-full" />
          <Container className="relative">
            <p className="font-mono text-[12px] tracking-[0.06em] text-ink-subtle uppercase">Brand guidelines</p>
            <h1 className="type-display mt-4 max-w-[760px] text-[clamp(36px,4.2vw,58px)] text-balance text-ink">
              Postwise, <em className="font-light italic">as a system</em>
            </h1>
            <p className="mt-5 max-w-[520px] text-[16px] leading-[1.5] text-ink-muted md:text-[17px]">
              The tokens, type and components the site is built from — one place to look before changing any of them.
            </p>
          </Container>
        </section>
        <Container className="pb-section">
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
