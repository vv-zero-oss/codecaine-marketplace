import type { MouseEvent } from "react"

import { ComponentLibrary } from "@/components/brand/components"
import {
  BrandIdentity,
  ColourTokens,
  Iconography,
  Motion,
  SpaceAndSurface,
  Typography,
  Wordmark,
} from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { project } from "@/content"
import { getLenis, useSmoothScroll } from "@/lib/motion"

const CHAPTERS = [
  { id: "brand", title: "Brand", blurb: "The mark, where it goes, and how the issue talks.", Body: BrandIdentity },
  {
    id: "colour",
    title: "Colour",
    blurb:
      "Every colour token in index.css, read off the page as it renders now. Change a token and it changes here. The portraits are the colour; everything else is paper and ink.",
    Body: ColourTokens,
  },
  {
    id: "type",
    title: "Typography",
    blurb: "Overpass for what you read, Overpass Mono in capitals for what you press. Five sizes, no bold.",
    Body: Typography,
  },
  {
    id: "space",
    title: "Spacing, radii, shadows, borders",
    blurb: "A 26px page margin, a fluid column gap, hairline rules — and no shadows at all. Only pictures are rounded.",
    Body: SpaceAndSurface,
  },
  {
    id: "motion",
    title: "Motion",
    blurb: "Three curves and three durations, shared by the stylesheet and the TypeScript. Press play.",
    Body: Motion,
  },
  {
    id: "icons",
    title: "Iconography and imagery",
    blurb: "Glyphs before icons, and photographs before anything drawn.",
    Body: Iconography,
  },
  {
    id: "components",
    title: "Components",
    blurb:
      "Every component on the site, live, in its variants and states, each with how to use it. The full-screen pieces sit in frames.",
    Body: ComponentLibrary,
  },
]

/** A chapter link: through Lenis where it is running, so the jump glides. */
function jump(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const lenis = getLenis()
  const target = document.getElementById(id)
  if (!lenis || !target) return
  event.preventDefault()
  lenis.scrollTo(target, { offset: -96 })
  window.history.replaceState(null, "", `#${id}`)
}

/** The chapter list, beside the content on wide screens and above it on phones. */
export function BrandNav() {
  return (
    <nav aria-label="Style guide" className="lg:sticky lg:top-32 lg:self-start">
      <ol className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-label uppercase tracking-label lg:flex-col">
        {CHAPTERS.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              onClick={(event) => jump(event, chapter.id)}
              className="group inline-flex min-h-11 items-center gap-3 text-ink-muted transition-colors duration-(--duration-fast) hover:text-ink lg:min-h-0 lg:py-0.5"
            >
              <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span className="px-[0.15em] group-hover:bg-ink group-hover:text-paper">{chapter.title.split(",")[0]}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — the issue's style guide.
 *
 * Built from the real components and the real tokens: every value on it is
 * read off the rendered element, so it cannot drift from the site. A component
 * added to the site is added here in the same change.
 */
export function BrandPage({ pathname }: { pathname: string }) {
  useSmoothScroll()
  return (
    <div className="min-h-dvh overflow-x-clip bg-paper text-ink" data-canvas-ignore>
      <SiteHeader pathname={pathname} />
      <main data-canvas-ignore className="px-gutter pt-32 md:pt-44">
        <header className="max-w-[40rem]">
          <p className="font-mono text-label uppercase tracking-label text-ink-muted">
            Brand guidelines · {project.issue}
          </p>
          <Wordmark className="mt-10 flex text-label" />
          <h1 className="mt-4 text-headline font-light tracking-headline">
            {project.name}, as a system
          </h1>
          <p className="mt-5 text-ink-soft">
            The tokens, type, motion and components the issue is built from — one place to look before changing any of
            them, and a record of what each one is for.
          </p>
        </header>
        <div className="mt-16 grid gap-x-(--spacing-column) gap-y-12 md:mt-24 lg:grid-cols-[12rem_minmax(0,1fr)]">
          <BrandNav />
          <div className="min-w-0">
            {CHAPTERS.map(({ id, title, blurb, Body }, index) => (
              <GuideSection key={id} id={id} index={index + 1} title={title} blurb={blurb}>
                <Body />
              </GuideSection>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
