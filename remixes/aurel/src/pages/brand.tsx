import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { ClosingCall } from "@/components/blocks/closing-call"
import { PageIntro } from "@/components/blocks/page-intro"
import { SectionRail } from "@/components/motion/section-rail"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { id: "brand", label: "Brand", title: "_the_ NAME", intro: "The wordmark, where it sits and how much room it keeps; the seal; and how the house speaks.", Body: BrandIdentity },
  { id: "colour", label: "Colour", title: "BONE, INK _and_ EMBER", intro: "Every colour token in the stylesheet, painted from its token and read back from the page — so what you see here is what the site is using.", Body: ColourTokens },
  { id: "type", label: "Typography", title: "THREE _faces_", intro: "A condensed display serif for titles, a book serif for reading, a quiet grotesk for the interface.", Body: Typography },
  { id: "space", label: "Space and surface", title: "SQUARE _and_ WARM", intro: "Wide gutters, a slow rhythm between sections, square corners and halos that glow rather than shade.", Body: SpaceAndSurface },
  { id: "motion", label: "Motion", title: "SLOW _to_ SETTLE", intro: "Every curve and duration is a token. Press play to run each one on a sample.", Body: Motion },
  { id: "icons", label: "Icons and imagery", title: "FEW MARKS, _real_ CLOTH", intro: "Icons as thin as the type, and photographs of cloth, hands and rooms.", Body: Iconography },
  { id: "components", label: "Components", title: "EVERY _piece_", intro: "Each component in the site, live, in its variants and states, with how to use it.", Body: ComponentLibrary },
] as const

/**
 * `/brand` — the house's brand guidelines.
 *
 * Built from the real components and the real tokens: every value on it is
 * read off the rendered element, so it cannot drift from the site. A
 * component added to the site is added here in the same change.
 */
export function BrandPage() {
  return (
    <>
      <SectionRail sections={CHAPTERS.map((c) => c.id).join(",")} />
      <PageIntro
        eyebrow="_the_ HOUSE STYLE"
        title="BRAND _guidelines_"
        intro="The name, the palette, the faces and every piece the site is made of — one place to look before changing any of them."
      />
      <Container className="pb-[clamp(56px,8vw,120px)]">
        <nav aria-label="Chapters" className="mx-auto grid max-w-[960px] border-t border-ink/15 sm:grid-cols-2">
          {CHAPTERS.map((chapter, index) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className={cn(
                "group flex items-baseline gap-4 border-b border-ink/15 py-3 font-display text-[clamp(28px,3vw,44px)] leading-none tracking-[-0.01em] text-ink",
                index % 2 === 0 && "sm:border-r sm:pr-6",
                index % 2 === 1 && "sm:pl-6",
              )}
            >
              <span className="w-8 font-serif text-[14px] tabular-nums text-ink-muted">0{index + 1}</span>
              <span className="transition-transform duration-500 ease-(--ease-out-soft) group-hover:translate-x-2">{chapter.label.toUpperCase()}</span>
            </a>
          ))}
        </nav>
      </Container>
      <Container>
        {CHAPTERS.map(({ id, title, intro, Body }, index) => (
          <GuideSection key={id} id={id} index={index + 1} title={title} intro={intro}>
            <Body />
          </GuideSection>
        ))}
      </Container>
      <ClosingCall title="Changing something?" body="Change the token, not the page — this guide will follow." cta="Book _a_ FITTING" />
    </>
  )
}
