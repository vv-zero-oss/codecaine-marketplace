import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Doodle } from "@/components/mock/doodles"
import { Reveal } from "@/components/motion/reveal"
import { RecordMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { id: "brand", title: "Brand.", continuation: "A record with the sun on it.", blurb: "The wordmark, the record mark, the room they need, and how Side B talks: like the person behind the bar.", Body: BrandIdentity },
  { id: "colour", title: "Colour.", continuation: "Cream, roast and rust.", blurb: "Every value is read from the stylesheet as it is now — change a token in index.css and it changes here. Built and audited with Coolors.", Body: ColourTokens },
  { id: "type", title: "Typography.", continuation: "Loud, condensed, golden.", blurb: "A condensed old-style serif for the voice, a quiet grotesque to read, a mono for labels and prices — on a √φ scale with tracking that tightens as it grows.", Body: Typography },
  { id: "space", title: "Space and surface.", continuation: "Hairlines, soft shadows.", blurb: "A 4px grid, square-shouldered labels, soft card corners, 1px hairlines and warm layered shadows.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion.", continuation: "Live and breezy.", blurb: "Quick ease-outs that settle, slow crossfades for footage, springs only for things that pop. Press play.", Body: Motion },
  { id: "icons", title: "Icons and imagery.", continuation: "Drawn by hand.", blurb: "Lucide for the interface, hand-drawn doodles for character, warm Pexels photography for the places and people.", Body: Iconography },
  { id: "components", title: "Components.", continuation: "Live, in every state.", blurb: "Every component in the project, interactive, in its variants and states — with a snippet to copy.", Body: ComponentLibrary },
]

/** Which chapter the reader is in: the last one whose top has passed the upper third. */
function useActiveChapter() {
  const [active, setActive] = useState(CHAPTERS[0].id)
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.33
      let current = CHAPTERS[0].id
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id)
        if (el && el.getBoundingClientRect().top <= line) current = c.id
      }
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

/** Desktop: the chapter list as a tracklist, pinned beside the content. */
function ChapterNav({ active }: { active: string }) {
  return (
    <nav aria-label="Style guide chapters" className="hidden lg:block">
      <ol className="sticky top-20 flex flex-col gap-0.5">
        {CHAPTERS.map((chapter, i) => {
          const on = chapter.id === active
          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "flex items-baseline gap-3 rounded-(--radius-field) px-3 py-2 text-[15px] transition-colors duration-(--duration-hover) ease-(--ease-out-strong)",
                  on ? "bg-panel text-ink" : "text-ink-3 hover:bg-panel hover:text-ink",
                )}
              >
                <span className={cn("font-mono text-[11px] tabular", on ? "text-rust" : "text-ink-4")}>{String(i + 1).padStart(2, "0")}</span>
                {chapter.title.replace(/\.$/, "")}
                <span aria-hidden className={cn("ml-auto size-1.5 self-center rounded-full bg-rust transition-[opacity,transform] duration-(--duration-hover) ease-(--ease-out-strong)", on ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Below lg: the chapters as chips that scroll sideways, pinned under the header. */
function ChapterChips({ active }: { active: string }) {
  useEffect(() => {
    const chip = document.getElementById(`chip-${active}`)
    const row = chip?.parentElement?.parentElement
    if (chip && row) row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" })
  }, [active])
  return (
    <nav aria-label="Style guide chapters" className="sticky top-14 z-30 -mx-(--spacing-gutter) border-b border-line bg-page/95 lg:hidden">
      <ol className="flex gap-1.5 overflow-x-auto px-(--spacing-gutter) py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CHAPTERS.map((chapter) => {
          const on = chapter.id === active
          return (
            <li key={chapter.id} className="shrink-0">
              <a
                id={`chip-${chapter.id}`}
                href={`#${chapter.id}`}
                className={cn("type-label inline-flex h-9 items-center rounded-(--radius-button) px-3 text-[11px] whitespace-nowrap transition-colors duration-(--duration-hover)", on ? "bg-ink text-page" : "bg-panel text-ink-2")}
              >
                {chapter.title.replace(/\.$/, "")}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * `/brand` — Side B's style guide.
 *
 * Built from the real components and tokens: every value on it is read off
 * the rendered element, so it cannot drift from the site. A component
 * added to the project is added here in the same change.
 */
export function BrandPage() {
  const active = useActiveChapter()
  return (
    <>
      <section className="border-b border-line pt-14 pb-14 md:pt-20 md:pb-20">
        <Container>
          <Reveal>
            <p className="type-label flex items-center gap-2 text-[11.5px] text-ink-2">
              <RecordMark className="size-5 text-rust" /> Brand guidelines · Side B Coffee
            </p>
            <h1 className="type-display mt-6 text-mega text-ink">
              The liner
              <br />
              <span className="flex items-end gap-[0.12em] text-rust">
                notes.
                <Doodle name="record" className="mb-[0.08em] w-[0.9em] text-ink" />
              </span>
            </h1>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[52ch] text-lead text-ink-2">
                The tokens, type and components the site is pressed from — read live from the stylesheet, so this page is always the record as it plays now.
              </p>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href="#components" variant="ink">
                  Jump to components <ArrowDown />
                </ButtonLink>
                <ButtonLink href="/" variant="outline">
                  Back to the site
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
      <Container className="pt-10 pb-(--spacing-section) lg:pt-16">
        <ChapterChips active={active} />
        <div className="grid gap-12 pt-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:pt-0">
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
