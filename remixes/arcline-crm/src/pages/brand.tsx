import { useEffect, useState } from "react"

import { ComponentLibrary } from "@/components/brand/components"
import {
  BrandIdentity,
  ColourTokens,
  Iconography,
  Motion,
  SpaceAndSurface,
  Typography,
} from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { Reveal } from "@/components/motion/reveal"
import { Ruler } from "@/components/sections/closing"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading, Lede } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { id: "brand", label: "Brand", lead: "The mark and the voice.", rest: "Calm, precise, and specific about what the agent did.", Body: BrandIdentity },
  { id: "colour", label: "Colour", lead: "One dark palette.", rest: "Every token, read from the stylesheet as it is now.", Body: ColourTokens },
  { id: "type", label: "Typography", lead: "Inter for everything you read.", rest: "Set at its display size for headings.", Body: Typography },
  { id: "space", label: "Space and surface", lead: "Hairlines, not boxes.", rest: "Spacing, radii, shadows and borders.", Body: SpaceAndSurface },
  { id: "motion", label: "Motion", lead: "In at once, out softly.", rest: "Every curve is a token. Press play.", Body: Motion },
  { id: "icons", label: "Icons and imagery", lead: "Hairline icons, real photographs.", rest: "And a product that is never a picture.", Body: Iconography },
  { id: "components", label: "Components", lead: "Every component, live.", rest: "In its variants and states, with how to use it.", Body: ComponentLibrary },
] as const

/** The chapter list, sticky beside the chapters on wide screens, with a
 *  hairline marker on the one in view — as the platform tour marks its own. */
function ChapterNav() {
  const [active, setActive] = useState<string>(CHAPTERS[0].id)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: "-30% 0px -60% 0px" },
    )
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <nav aria-label="Style guide chapters" className="sticky top-[120px] hidden flex-col gap-1 self-start lg:flex">
      {CHAPTERS.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={cn(
            "relative py-1 text-base font-medium transition-colors duration-[320ms] ease-out-cubic",
            active === c.id ? "text-ink" : "text-ink-faint hover:text-ink-2",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "absolute top-1 bottom-1 -left-[25px] w-0.5 bg-accent transition-opacity duration-[320ms] ease-out-cubic",
              active === c.id ? "opacity-100" : "opacity-0",
            )}
          />
          {c.label}
        </a>
      ))}
    </nav>
  )
}

/**
 * `/brand` — Arcline's brand guidelines.
 *
 * Built from the real components and the real tokens: every value on it is
 * read off the rendered element, so it cannot drift from the site. A
 * component added to the site is added here in the same change.
 */
export function BrandPage() {
  return (
    <>
      <Section className="texture-dots overflow-hidden">
        <Container className="flex flex-col items-start pt-20 pb-14 md:pt-28 md:pb-20">
          <Reveal onMount>
            <Eyebrow>Brand guidelines</Eyebrow>
          </Reveal>
          <Reveal onMount delay={0.1} className="mt-6">
            <Heading as="h1" size="h1" lead="Arcline, as a system." rest="The tokens, type and parts the site is built from." className="max-w-[20ch]" />
          </Reveal>
          <Reveal onMount delay={0.2} className="mt-5">
            <Lede className="max-w-[34em]">
              One place to look before changing any of them. Every value here is measured off the rendered element, so
              it is always the value the site is using.
            </Lede>
          </Reveal>
          <Reveal onMount delay={0.3} className="mt-8 flex flex-wrap gap-2.5">
            <ButtonLink href="#colour" variant="outline">
              Tokens
            </ButtonLink>
            <ButtonLink href="#components" variant="primary" arrow>
              Components
            </ButtonLink>
          </Reveal>
        </Container>
        <Ruler className="border-t border-line-strong" />
      </Section>

      <Section>
        <Container className="grid grid-cols-1 gap-x-10 py-16 md:py-20 lg:grid-cols-[200px_minmax(0,1fr)]">
          <ChapterNav />
          <div className="min-w-0">
            <nav aria-label="Style guide chapters" className="-mt-2 mb-12 flex flex-wrap gap-1.5 lg:hidden">
              {CHAPTERS.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="inline-flex h-8 items-center rounded-button border border-line-strong px-3 text-sm text-ink-2 transition-colors hover:bg-surface hover:text-ink"
                >
                  {c.label}
                </a>
              ))}
            </nav>
            <div>
              {CHAPTERS.map(({ id, lead, rest, Body }, i) => (
                <GuideSection key={id} id={id} index={i + 1} lead={lead} rest={rest}>
                  <Body />
                </GuideSection>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
