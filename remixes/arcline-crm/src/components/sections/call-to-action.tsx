import { ParallaxImage } from "@/components/motion/parallax-image"
import { Reveal } from "@/components/motion/reveal"
import { BrandLogo, type Brand } from "@/components/ui/brand-logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { CTA } from "@/content"
import { photo, PHOTOS } from "@/photos"

/** Vertical hairlines bunching toward the right edge, like a floor receding. */
function Perspective() {
  const xs = Array.from({ length: 14 }, (_, i) => 100 - 100 * Math.pow(0.8, i + 1))
  return (
    <div aria-hidden className="relative h-[100px] border-t border-line">
      {xs.map((x) => (
        <span key={x} className="absolute inset-y-0 w-px bg-line-strong" style={{ left: `${x}%` }} />
      ))}
    </div>
  )
}

/** The ask: one line, two buttons, the tools Arcline plugs into, and a picture. */
export function CallToAction() {
  return (
    <section id="cta" className="pt-10 lg:pt-[140px]">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-end">
          <Container className="lg:max-w-none lg:pr-0">
            <Reveal>
              <SectionHeading size="lg">{CTA.title}</SectionHeading>
              <div className="mt-8 flex flex-col gap-2 sm:flex-row">
                <ButtonLink href="#pricing" size="lg">
                  {CTA.primary}
                </ButtonLink>
                <ButtonLink href="#cta" size="lg" variant="outline">
                  {CTA.secondary}
                </ButtonLink>
              </div>
            </Reveal>
          </Container>
          <div className="mt-12">
            <Perspective />
            <Container className="lg:max-w-none lg:pr-0">
              <div className="grid grid-cols-3 border-l border-line-strong">
                {CTA.logos.map((brand) => (
                  <span
                    key={brand}
                    className="flex h-24 items-center justify-center border-r border-b border-line-strong first:border-t [&:nth-child(-n+3)]:border-t md:h-[162px]"
                  >
                    <BrandLogo brand={brand as Brand} scale={1.05} className="max-md:scale-[0.72]" />
                  </span>
                ))}
              </div>
            </Container>
          </div>
        </div>
        <div className="relative mt-12 lg:mt-0">
          <ParallaxImage
            src={photo("orb", 1600)}
            alt={PHOTOS.orb.alt}
            distance={100}
            className="h-[360px] lg:h-full lg:min-h-[640px]"
          />
          {/* Let the picture rise out of the page rather than sit on it. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink via-transparent to-transparent lg:bg-linear-to-br"
          />
        </div>
      </div>
    </section>
  )
}
