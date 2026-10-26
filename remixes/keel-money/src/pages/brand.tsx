import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Reveal } from "@/components/motion/reveal"
import { KeelMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { id: "brand", title: "Brand.", continuation: "A level line, a steady hull.", blurb: "The mark and the name, the room they need, and how Keel talks about money: calm, specific, on your side.", Body: BrandIdentity },
  { id: "colour", title: "Colour.", continuation: "Night, one blue, a pale day.", blurb: "Every value here is read from the stylesheet as it is now — change a token in index.css and it changes on this page.", Body: ColourTokens },
  { id: "type", title: "Typography.", continuation: "Wide, friendly, tight.", blurb: "Wix Madefor Display for headlines and figures, its Text cut for everything you read. Tabular numbers, always.", Body: Typography },
  { id: "space", title: "Space and surface.", continuation: "Hairlines and soft glows.", blurb: "A 4px grid, 18px cards, 1px hairlines in a cool tint, and shadows that read as light rather than as drop shadows.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion.", continuation: "Calm, then quick.", blurb: "Slow drifts for things that float, quick ease-outs for anything you touch, and scroll that tells the story.", Body: Motion },
  { id: "icons", title: "Icons and imagery.", continuation: "Lines and real people.", blurb: "Lucide line icons; Pexels photography of real people; the product itself drawn in HTML.", Body: Iconography },
  { id: "components", title: "Components.", continuation: "Live, in every state.", blurb: "Every component in the project, interactive, in its variants and states — with a snippet to copy.", Body: ComponentLibrary },
]

function useActiveChapter() {
  const [active, setActive] = useState(CHAPTERS[0].id)
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.33
      let current = CHAPTERS[0].id
      for (const chapter of CHAPTERS) {
        const section = document.getElementById(chapter.id)
        if (section && section.getBoundingClientRect().top <= line) current = chapter.id
      }
      setActive(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])
  return active
}

/** The chapter list: pinned beside the content on desktop, chips that
 *  scroll sideways under the header below lg. */
function ChapterNav({ active }: { active: string }) {
  return (
    <>
      <nav aria-label="Style guide chapters" className="hidden lg:block">
        <ol className="sticky top-32 flex flex-col gap-0.5">
          {CHAPTERS.map((chapter, i) => {
            const on = chapter.id === active
            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "flex items-baseline gap-3 rounded-(--radius-button) px-3 py-2 text-[15px] transition-colors duration-(--duration-hover)",
                    on ? "bg-surface-2 text-fg" : "text-fg-3 hover:bg-surface hover:text-fg",
                  )}
                >
                  <span className="font-mono text-[11px] text-fg-4 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {chapter.title.replace(/\.$/, "")}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
      <nav aria-label="Style guide chapters" className="sticky top-[calc(var(--banner-offset)+68px)] z-30 -mx-(--spacing-gutter) border-b border-line bg-night/90 backdrop-blur-md lg:hidden">
        <ol className="flex gap-1.5 overflow-x-auto px-(--spacing-gutter) py-2.5 [scrollbar-width:none]">
          {CHAPTERS.map((chapter) => (
            <li key={chapter.id} className="shrink-0">
              <a
                href={`#${chapter.id}`}
                className={cn(
                  "inline-flex h-9 items-center rounded-(--radius-button) px-3 text-[14px] whitespace-nowrap transition-colors",
                  chapter.id === active ? "bg-fg text-night" : "bg-surface-2 text-fg-2",
                )}
              >
                {chapter.title.replace(/\.$/, "")}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

/**
 * `/brand` — Keel's style guide, built from the real tokens and components.
 * Every value on it is read off the stylesheet at runtime, so it cannot drift
 * from the site; a component added to the project is added here too.
 */
export function BrandPage() {
  const active = useActiveChapter()
  return (
    <>
      <section className="pt-[calc(var(--banner-offset)+140px)] pb-14 md:pb-20">
        <Container>
          <Reveal>
            <p className="flex items-center gap-2 text-[15px] text-fg-2">
              <KeelMark className="size-5 rounded-[6px]" /> Brand guidelines
            </p>
            <h1 className="type-display mt-5 max-w-[14ch] text-hero text-balance text-silver">Keel, as a system.</h1>
            <p className="mt-6 max-w-[52ch] text-lead text-fg-2">
              The tokens, type and components the site is built from — read live from the stylesheet, so this page is
              always the product.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#components">
                Jump to components <ArrowRight />
              </ButtonLink>
              <Link href="/" className="inline-flex h-10 items-center rounded-(--radius-button) px-4 text-[15px] text-fg shadow-(--shadow-glass) hover:bg-surface-2">
                Back to the site
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
      <Container className="pb-(--spacing-section)">
        <div className="grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)]">
          <ChapterNav active={active} />
          <div className="min-w-0 pt-10 lg:pt-0">
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
