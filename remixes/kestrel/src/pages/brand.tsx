import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Reveal } from "@/components/motion/reveal"
import { KestrelMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  {
    id: "brand",
    title: "Brand.",
    continuation: "A bird holding still.",
    blurb: "The wordmark and the mark, the room they need, and how Kestrel talks about money: calm, specific, numbers over adjectives.",
    Body: BrandIdentity,
  },
  {
    id: "colour",
    title: "Colour.",
    continuation: "White, warm grey, one lime.",
    blurb: "Every value here is read from the stylesheet as it is now — change a token in index.css and it changes on this page.",
    Body: ColourTokens,
  },
  {
    id: "type",
    title: "Typography.",
    continuation: "Golden ratio, tight tracking.",
    blurb: "Inter Tight for everything, Geist Mono for figures that move. Ten steps, each √φ from the last.",
    Body: Typography,
  },
  {
    id: "space",
    title: "Space and surface.",
    continuation: "Soft shadows, hairlines.",
    blurb: "A 4px grid, soft radii, 1px hairlines, and layered shadows that lift without a hard edge.",
    Body: SpaceAndSurface,
  },
  {
    id: "motion",
    title: "Motion.",
    continuation: "Quick, eased out, alive.",
    blurb: "Short and settled on a strong out-curve; longer in-out curves only for scenes. Press play.",
    Body: Motion,
  },
  {
    id: "icons",
    title: "Icons and imagery.",
    continuation: "Line icons, daylight.",
    blurb: "Lucide at 1.7 stroke, the dot grid the product sits on, and Pexels photography of real teams at work.",
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

/** Desktop: the chapter list, pinned beside the content. */
function ChapterNav({ active }: { active: string }) {
  return (
    <nav aria-label="Style guide chapters" className="hidden lg:block">
      <ol className="sticky top-24 flex flex-col gap-0.5">
        {CHAPTERS.map((chapter, i) => {
          const on = chapter.id === active
          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "relative flex items-baseline gap-3 rounded-(--radius-field) px-3 py-2 text-[15px] transition-colors duration-(--duration-hover) ease-(--ease-out-strong)",
                  on ? "bg-panel text-ink" : "text-ink-3 hover:bg-panel hover:text-ink",
                )}
              >
                <span className={cn("font-mono text-[11px] tabular-nums", on ? "text-ink" : "text-ink-4")}>{String(i + 1).padStart(2, "0")}</span>
                {chapter.title.replace(/\.$/, "")}
                <span
                  aria-hidden
                  className={cn(
                    "ml-auto size-1.5 self-center rounded-full bg-lime shadow-[0_0_0_1px_var(--color-ink)] transition-[opacity,transform] duration-(--duration-hover) ease-(--ease-out-strong)",
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

/** Below lg: the chapters as chips that scroll sideways, pinned under the site header. */
function ChapterChips({ active }: { active: string }) {
  useEffect(() => {
    document.getElementById(`chip-${active}`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
  }, [active])
  return (
    <nav aria-label="Style guide chapters" className="sticky top-[58px] z-30 -mx-4 border-b border-line bg-page/92 backdrop-blur-md sm:-mx-6 lg:hidden">
      <ol className="flex gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-6">
        {CHAPTERS.map((chapter) => {
          const on = chapter.id === active
          return (
            <li key={chapter.id} className="shrink-0">
              <a
                id={`chip-${chapter.id}`}
                href={`#${chapter.id}`}
                className={cn(
                  "inline-flex h-9 items-center rounded-(--radius-field) px-3 text-[14px] whitespace-nowrap transition-colors duration-(--duration-hover)",
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
 * `/brand` — Kestrel's style guide.
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
      <section className="pt-16 pb-14 md:pt-24 md:pb-20">
        <Container>
          <Reveal>
            <p className="flex items-center gap-2 text-[15px] text-ink-2">
              <KestrelMark className="size-4 text-ink" /> Brand guidelines
            </p>
            <h1 className="type-head mt-5 max-w-[14ch] text-mega text-balance text-ink">
              Kestrel, <span className="text-ink-soft">as a system.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lead text-ink-2">
              The tokens, type and components the site is built from — read live from the stylesheet, so this page is always the product.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#components" variant="ink">
                Jump to components <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/" variant="outline">
                Back to the site
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
      <Container className="pb-section">
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
