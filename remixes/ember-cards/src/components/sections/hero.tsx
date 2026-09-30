import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { HERO } from "@/content"
import { cn } from "@/lib/utils"
import { lazy, Suspense } from "react"
import glowPhoto from "@/assets/hero-glow.jpg"

/**
 * A photograph of liquid chrome, blurred and mostly desaturated into a soft
 * metallic glow and faded out at its edges: the light the phones stand in.
 */
export function PhotoGlow({
  src = glowPhoto,
  blur = 34,
  opacity = 0.55,
  className,
}: {
  src?: string
  blur?: number
  opacity?: number
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{
        opacity,
        maskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)",
      }}
    >
      <img src={src} alt="" className="size-full object-cover" style={{ filter: `blur(${blur}px) saturate(0.35) brightness(0.9)` }} />
    </div>
  )
}

// Three.js is most of the page's weight, so it arrives after the words do.
const HeroPhones = lazy(() => import("@/components/phone/hero-phones").then((m) => ({ default: m.HeroPhones })))

/** The headline, one call to action, and the two phones in 3D over the glow. */
export function Hero({
  eyebrow = HERO.eyebrow,
  title = HERO.title,
  blurb = HERO.blurb,
  cta = HERO.cta,
}: {
  eyebrow?: string
  title?: string
  blurb?: string
  cta?: string
}) {
  return (
    <section id="top" className="relative pt-10 sm:pt-16">
      <Container>
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} blurb={blurb} />
        <Reveal delay={0.18} className="mt-7 flex justify-center">
          <ButtonLink href="#get-started">{cta}</ButtonLink>
        </Reveal>
      </Container>
      <Reveal delay={0.24} distance={40} blur={12} duration={0.9} className="relative mx-auto -mt-2 max-w-[1176px]">
        <PhotoGlow className="top-[4%] left-1/2 h-[94%] w-[min(96vw,600px)] -translate-x-1/2" />
        <Suspense fallback={<div className="h-[500px] sm:h-[660px] lg:h-[760px]" />}>
          <HeroPhones className="h-[500px] w-full sm:h-[660px] lg:h-[760px]" />
        </Suspense>
      </Reveal>
    </section>
  )
}
