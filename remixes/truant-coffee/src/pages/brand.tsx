import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

import { ComponentLibrary } from "@/components/brand/components"
import { BrandIdentity, ColourTokens, Iconography, Motion, SpaceAndSurface, Typography } from "@/components/brand/foundations"
import { GuideSection } from "@/components/brand/specimen"
import { LineReveal } from "@/components/motion/line-reveal"
import { ButtonLink } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  { id: "brand", title: "Brand.", continuation: "A T in a hurry.", blurb: "The mark, the room it needs, and how Truant talks: about the hour, never the product.", Body: BrandIdentity },
  { id: "colour", title: "Colour.", continuation: "Paper, ink, tomato.", blurb: "Every value is read from the stylesheet as it is now — change a token in index.css and it changes here.", Body: ColourTokens },
  { id: "type", title: "Typography.", continuation: "Golden ratio, tight tracking.", blurb: "Bayon for everything loud, Inter for reading. Each step √φ from the last; tracking tightens as size grows.", Body: Typography },
  { id: "space", title: "Space and surface.", continuation: "Soft and low.", blurb: "A 4px grid, square-ish labels, hairlines, and shadows like a bag standing on a shelf.", Body: SpaceAndSurface },
  { id: "motion", title: "Motion.", continuation: "Live, and breezy.", blurb: "Strong ease-outs, the drawer curve, small springs — and scroll for the big moves. Press play.", Body: Motion },
  { id: "icons", title: "Icons and imagery.", continuation: "Line, drawn, real.", blurb: "Lucide at 1.6, drawn bags instead of packshots, and Pexels photographs of people somewhere other than work.", Body: Iconography },
  { id: "components", title: "Components.", continuation: "Live, in every state.", blurb: "Everything the site is built from, interactive, with the line that puts it on a page.", Body: ComponentLibrary },
]

function useActiveChapter() {
  const [active, setActive] = useState(CHAPTERS[0].id)
  useEffect(() => {
    const update = () => {
      let current = CHAPTERS[0].id
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.33) current = c.id
      }
      setActive(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])
  return active
}

/**
 * `/brand` — Truant's style guide, built from the real tokens and the real
 * components: every value on it is read off the rendered element, so it
 * cannot drift from the site. A component added to the project is added
 * here in the same change.
 */
export function BrandPage() {
  const active = useActiveChapter()
  return (
    <>
      <section className="px-[var(--spacing-gutter)] pt-10 pb-14 lg:pt-[96px] lg:pb-20">
        <p className="type-eyebrow text-ink-3 lg:pl-16">Brand guidelines</p>
        <LineReveal text="Truant,|as a system" className="type-display mt-4 text-d5" />
        <p className="mt-6 max-w-[52ch] text-lead text-ink-2">The tokens, type and components the site is built from — read live from the stylesheet, so this page is always the product.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#components">
            Jump to components <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back to the site
          </ButtonLink>
        </div>
      </section>

      <nav aria-label="Chapters" className="sticky top-[84px] z-20 border-y border-line bg-paper/92 backdrop-blur-md lg:hidden">
        <ol className="flex gap-1.5 overflow-x-auto px-[var(--spacing-gutter)] py-2.5 [scrollbar-width:none]">
          {CHAPTERS.map((c) => (
            <li key={c.id} className="shrink-0">
              <a href={`#${c.id}`} className={cn("inline-flex h-9 items-center rounded-full px-3 text-[13px] whitespace-nowrap transition-colors", active === c.id ? "bg-ink text-paper" : "bg-paper-2 text-ink-2")}>
                {c.title.replace(/\.$/, "")}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="grid gap-12 px-[var(--spacing-gutter)] pt-10 pb-[var(--spacing-section)] lg:grid-cols-[13rem_minmax(0,1fr)] lg:pt-0">
        <nav aria-label="Chapters" className="hidden lg:block">
          <ol className="sticky top-24 flex flex-col gap-0.5">
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  aria-current={active === c.id ? "true" : undefined}
                  className={cn("flex items-baseline gap-3 rounded-[var(--radius-button)] px-3 py-2 text-[14px] transition-colors duration-200", active === c.id ? "bg-paper-2 text-ink" : "text-ink-3 hover:bg-paper-2 hover:text-ink")}
                >
                  <span className="text-[11px] tabular-nums text-ink-4">{String(i + 1).padStart(2, "0")}</span>
                  {c.title.replace(/\.$/, "")}
                  <span aria-hidden className={cn("ml-auto size-1.5 self-center rounded-full bg-tomato transition-[opacity,transform] duration-200", active === c.id ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="min-w-0">
          {CHAPTERS.map(({ id, title, continuation, blurb, Body }, i) => (
            <GuideSection key={id} id={id} index={i + 1} title={title} continuation={continuation} blurb={blurb}>
              <Body />
            </GuideSection>
          ))}
        </div>
      </div>
    </>
  )
}
