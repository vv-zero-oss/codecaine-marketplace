import { useState } from "react"
import { ArrowUp, Shuffle } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { LogoSwap } from "@/components/motion/logo-swap"
import { ParallaxImage } from "@/components/motion/parallax-image"
import { TypewriterPrompt } from "@/components/motion/typewriter-prompt"
import { BorderBeam } from "@/components/ui/border-beam"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { HERO } from "@/content"
import { photo, PHOTOS } from "@/photos"

/**
 * The ask box: what you would type to Arcline, typing itself, inside a beam
 * that says "this is the live part of the page".
 */
function PromptBox() {
  const [index, setIndex] = useState(0)
  const next = () => setIndex((i) => (i + 1) % HERO.prompts.length)
  useCanvasAction("Next prompt", next, { group: "Hero" })

  return (
    <BorderBeam size="md" colorVariant="colorful" strength={0.7} duration={7} className="rounded-[var(--radius-field)]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex min-h-[210px] flex-col justify-between gap-6 rounded-[var(--radius-field)] border border-line-strong bg-raised p-4 shadow-(--shadow-field) md:min-h-[243px] md:p-5"
      >
        <TypewriterPrompt
          key={index}
          text={HERO.prompts[index]}
          onDone={next}
          className="text-[17px] leading-[1.45] text-muted md:text-[21px]"
        />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {(["gmail", "slack-mark"] as const).map((brand) => (
                <span
                  key={brand}
                  className="flex size-10 items-center justify-center rounded-full border border-line-strong bg-lift text-fg-soft"
                >
                  <BrandLogo brand={brand} scale={0.6} className="[&>span:last-child]:hidden" />
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Try another prompt"
              className="flex size-10 items-center justify-center rounded-full bg-lift/70 text-muted transition-[color,transform] duration-200 hover:text-fg active:scale-95"
            >
              <Shuffle className="size-[18px]" strokeWidth={1.5} />
            </button>
          </div>
          <Button type="submit">
            {HERO.action}
            <ArrowUp className="size-4 sm:hidden" />
          </Button>
        </div>
      </form>
    </BorderBeam>
  )
}

/**
 * Hero: the promise, a box to ask Arcline something, the logo strip, and a
 * band of photography that opens the page up underneath.
 *
 * Hairlines frame the gutter the way the rest of the page's grids do.
 */
export function Hero() {
  return (
    <section id="top" className="relative">
      <Container>
        <div className="border-x border-line px-2 pt-12 pb-14 text-center md:pt-[50px] md:pb-16">
          <SectionHeading as="h1" size="xl" lines={HERO.title} className="mx-auto max-w-[17ch] leading-[0.93]" />
        </div>
      </Container>

      <div className="border-t border-line">
        <Container>
          <div className="border-x border-line px-0 py-12 sm:px-6 md:pt-[52px] md:pb-[52px]">
            <div className="mx-auto w-full max-w-[730px]">
              <PromptBox />
              <p className="mt-9 text-center text-[17px] text-muted md:text-[21px]">
                {HERO.footnote}{" "}
                <a
                  href="#cta"
                  className="text-fg-soft underline decoration-line-button underline-offset-[6px] transition-colors hover:text-fg hover:decoration-fg"
                >
                  {HERO.footnoteLink}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <LogoSwap className="border-x" />
      </Container>

      <ParallaxImage
        src={photo("band", 2400)}
        alt={PHOTOS.band.alt}
        distance={140}
        className="h-[260px] md:h-[440px]"
      />
    </section>
  )
}
