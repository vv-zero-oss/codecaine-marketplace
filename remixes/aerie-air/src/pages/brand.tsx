import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { CornerLabels } from "@/components/blocks/corner-label"
import { Cloud } from "@/components/motion/cloud"
import { Reveal } from "@/components/motion/reveal"
import { AerieMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  {
    id: "brand",
    title: "Brand.",
    continuation: "A wing, and a dot lifting off it.",
    blurb: "The mark and the wordmark, the room they need, and how Aerie talks: about the trip, never the technology.",
    Body: BrandIdentity,
  },
  {
    id: "colour",
    title: "Colour.",
    continuation: "Cream, ink, one sky.",
    blurb: "Every value here is read from the stylesheet as it renders — change a token in index.css and it changes on this page.",
    Body: ColourTokens,
  },
  {
    id: "type",
    title: "Typography.",
    continuation: "One face, set loud.",
    blurb: "Manrope for everything, medium and tight at the top, small and quiet underneath. A mono for codes. Ten steps on the golden ratio.",
    Body: Typography,
  },
  {
    id: "space",
    title: "Space and surface.",
    continuation: "Room, and soft light.",
    blurb: "Full-width layouts on a growing gutter, pill buttons, tall photo cards, hairlines, and wide, low, warm shadows.",
    Body: SpaceAndSurface,
  },
  {
    id: "motion",
    title: "Motion.",
    continuation: "Calm, and on purpose.",
    blurb: "A strong ease-out for anything you touch, an in-out for the craft itself, and scroll stories scrubbed by the reader. Press play.",
    Body: Motion,
  },
  {
    id: "icons",
    title: "Icons and imagery.",
    continuation: "Thin lines, real light.",
    blurb: "Lucide beside words, clouds and craft drawn for the brand, and Pexels photography of the city in late light.",
    Body: Iconography,
  },
  {
    id: "components",
    title: "Components.",
    continuation: "Live, in every state.",
    blurb: "Every component the site is built from, interactive, in its variants and states — with a snippet to copy.",
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

/** Desktop: the chapter list, pinned beside the content. */
function ChapterNav({ active }: { active: string }) {
  return (
    <nav aria-label="Style guide chapters" className="hidden lg:block">
      <ol className="sticky top-24 flex flex-col gap-0.5 pt-10">
        {CHAPTERS.map((chapter, i) => {
          const on = chapter.id === active
          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "group relative flex min-h-10 items-center gap-3 rounded-full px-3 text-[15px] transition-colors duration-(--duration-hover) ease-(--ease-out-strong) focus-visible:ring-[3px] focus-visible:ring-sky/35 focus-visible:outline-none",
                  on ? "text-ink" : "text-ink-3 hover:bg-panel hover:text-ink",
                )}
              >
                <span className={cn("w-5 font-mono text-[11px] tabular-nums", on ? "text-sky" : "text-ink-4")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover:translate-x-0.5">{chapter.title.replace(/\.$/, "")}</span>
                <span
                  aria-hidden
                  className={cn(
                    "ml-auto size-1.5 rounded-full bg-sky transition-[opacity,transform] duration-(--duration-hover) ease-(--ease-out-strong)",
                    on ? "scale-100 opacity-100" : "scale-50 opacity-0",
                  )}
                />
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
    const rail = chip?.parentElement?.parentElement
    if (chip && rail) rail.scrollTo({ left: chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" })
  }, [active])
  return (
    <nav aria-label="Style guide chapters" data-header-tone="dark" className="sticky top-16 z-30 -mx-(--spacing-gutter) border-y border-line bg-page/92 backdrop-blur-md lg:hidden">
      <ol className="flex gap-1.5 overflow-x-auto px-(--spacing-gutter) py-2 [scrollbar-width:none]">
        {CHAPTERS.map((chapter) => {
          const on = chapter.id === active
          return (
            <li key={chapter.id} className="shrink-0">
              <a
                id={`chip-${chapter.id}`}
                href={`#${chapter.id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "inline-flex h-11 items-center rounded-full px-4 text-[14px] whitespace-nowrap transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]",
                  on ? "bg-ink text-page" : "bg-panel text-ink-2",
                )}
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
 * `/brand` — Aerie's style guide.
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
      <section data-header-tone="light" className="relative overflow-hidden bg-sky pt-28 pb-16 text-on-sky md:pt-36 md:pb-24">
        <Cloud shape="tall" className="pointer-events-none absolute right-[6%] bottom-10 hidden w-[min(520px,40vw)] opacity-90 md:block" />
        <Cloud shape="puff" className="pointer-events-none absolute top-[46%] right-[40%] hidden w-40 opacity-80 md:block" />
        <Container className="relative">
          <CornerLabels left="Brand guidelines" right="Version 1 · Autumn 2026" className="text-on-sky-soft" />
          <Reveal className="mt-14 md:mt-24">
            <p className="flex items-center gap-2 text-micro text-on-sky-soft">
              <AerieMark className="size-4 text-on-sky" /> The system underneath
            </p>
            <h1 className="type-head mt-5 max-w-[10ch] text-giga">Aerie, as a system.</h1>
            <p className="mt-8 max-w-[46ch] text-lead text-on-sky-soft">
              The tokens, type, motion and components the site is built from — read live from the stylesheet, so this page is always the product.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/brand#components" variant="cream" size="lg">
                Jump to components <ArrowDown />
              </ButtonLink>
              <ButtonLink href="/" variant="glass" size="lg">
                Back to the site
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
      <Container className="pb-(--spacing-section)">
        <ChapterChips active={active} />
        <div className="grid gap-10 pt-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14 lg:pt-6">
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
