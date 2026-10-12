import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  {
    id: "brand",
    title: "Brand.",
    continuation: "Two words, set tight.",
    blurb: "The wordmark and the monogram, the room they need, and how Ordinary Matter talks: calm, specific, about people rather than products.",
    Body: BrandIdentity,
  },
  {
    id: "colour",
    title: "Colour.",
    continuation: "Paper, ink, cloth.",
    blurb: "Every value here is read from the stylesheet as it is now — change a token in index.css and it changes on this page.",
    Body: ColourTokens,
  },
  {
    id: "type",
    title: "Typography.",
    continuation: "A bookish serif, a quiet grotesk.",
    blurb: "Newsreader to read, Inter Tight to label. Twelve steps on the golden ratio, tightening as they grow.",
    Body: Typography,
  },
  {
    id: "space",
    title: "Space and surface.",
    continuation: "Square corners, 1px rules.",
    blurb: "Print is square. Hairlines draw the structure, and shadows are soft and warm — the light of a page lying on a table.",
    Body: SpaceAndSurface,
  },
  {
    id: "motion",
    title: "Motion.",
    continuation: "A slow dissolve, a quick hand.",
    blurb: "Photographs change on a slow cross-dissolve; anything a hand touches answers quickly on a strong out-curve. Press play.",
    Body: Motion,
  },
  {
    id: "icons",
    title: "Icons and imagery.",
    continuation: "People in their own rooms.",
    blurb: "Lucide at small sizes, only beside a word. Warm, film-like photography from Pexels. Products drawn, not photographed.",
    Body: Iconography,
  },
  {
    id: "components",
    title: "Components.",
    continuation: "Live, in every state.",
    blurb: "Every component in the project, interactive, in its variants and states — with a snippet to copy.",
    Body: ComponentLibrary,
  },
]

/** Which chapter the reader is in: the last one whose top has passed the
 *  upper third of the window. */
function useActiveChapter() {
  const [active, setActive] = useState(CHAPTERS[0].id)
  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[]
    const update = () => {
      const line = window.innerHeight * 0.33
      let current = CHAPTERS[0].id
      for (const section of sections) if (section.getBoundingClientRect().top <= line) current = section.id
      setActive(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])
  return active
}

const short = (title: string) => title.replace(/\.$/, "")

/** Desktop: the chapters as a table of contents, pinned beside the content. */
function ChapterNav({ active }: { active: string }) {
  return (
    <nav aria-label="Style guide chapters" className="hidden lg:block">
      <div className="sticky top-28">
        <p className="type-label border-b border-rule pb-2 text-ink-3">Contents</p>
        <ol className="mt-2 flex flex-col">
          {CHAPTERS.map((chapter, i) => {
            const on = chapter.id === active
            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "flex items-baseline gap-3 border-b border-line py-2.5 font-serif text-[16px] transition-colors duration-(--duration-hover) ease-(--ease-out-strong)",
                    on ? "text-ink" : "text-ink-3 hover:text-ink",
                  )}
                >
                  <span className="type-label w-5 text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("link-draw", on && "bg-[length:100%_1px]")}>{short(chapter.title)}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

/** Below lg: the chapters as chips that scroll sideways, pinned under the site header. */
function ChapterChips({ active }: { active: string }) {
  useEffect(() => {
    const chip = document.getElementById(`chip-${active}`)
    const row = chip?.parentElement?.parentElement
    if (!chip || !row) return
    // Scroll the row only — scrollIntoView would also move the page.
    row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" })
  }, [active])
  return (
    <nav aria-label="Style guide chapters" className="sticky top-16 z-30 -mx-4 border-b border-line bg-page sm:-mx-6 md:top-[78px] lg:hidden">
      <ol className="relative flex gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-6">
        {CHAPTERS.map((chapter) => {
          const on = chapter.id === active
          return (
            <li key={chapter.id} className="shrink-0">
              <a
                id={`chip-${chapter.id}`}
                href={`#${chapter.id}`}
                className={cn(
                  "type-title inline-flex h-11 items-center rounded-(--radius-button) px-3.5 text-[14px] whitespace-nowrap transition-colors duration-(--duration-hover)",
                  on ? "bg-ink text-page" : "bg-sheet text-ink-2",
                )}
              >
                {short(chapter.title)}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — the style guide.
 *
 * Built from the real components and the real tokens: every value on it is
 * read off the rendered element, so it cannot drift from the site. A
 * component added to the project is added here in the same change. The site
 * header and footer come from App.
 */
export function BrandPage() {
  const active = useActiveChapter()
  return (
    <>
      <section className="pt-32 pb-14 md:pt-44 md:pb-20">
        <Container>
          <Reveal>
            <p className="type-label text-ink-3">Brand guidelines · Style guide</p>
            <h1 className="type-display mt-6 max-w-[12ch] text-mega text-balance text-ink">
              Ordinary Matter, <span className="text-ink-3 italic">as a system.</span>
            </h1>
            <div className="mt-10 grid gap-8 border-t border-rule pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <p className="max-w-[52ch] font-serif text-lead text-ink-2">
                The paper, ink, type and components the publication is made from — read live from the stylesheet, so this page is always the product.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="#components">
                  Jump to components <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/" variant="outline">
                  Back to the site
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
      <Container className="pb-section">
        <ChapterChips active={active} />
        <div className="grid gap-12 pt-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16 lg:pt-6">
          <ChapterNav active={active} />
          <div className="min-w-0">
            {CHAPTERS.map(({ id, title, continuation, blurb, Body }, i) => (
              <GuideSection key={id} id={id} index={i + 1} title={title} continuation={continuation} blurb={blurb}>
                <Body />
              </GuideSection>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}
