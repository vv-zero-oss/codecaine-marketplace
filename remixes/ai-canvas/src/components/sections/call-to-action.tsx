import { ArrowRight } from "lucide-react"

import { BlurText } from "@/components/motion/blur-text"
import { LogoMarquee } from "@/components/motion/logo-marquee"
import { PortalMark } from "@/components/motion/portal-mark"
import { ButtonLink } from "@/components/ui/button"
import { publishes, scenes } from "@/content"

/**
 * The close. The hero's night comes back as a glow in the top corner, running
 * through mauve to paper; out of it, the portal mark, the line and the
 * enormous black pill — each a φ step below the one before — sit on the
 * upper golden line of the screen (38.2%). The places a page publishes to
 * run along the foot.
 */
export function CallToAction() {
  return (
    <section id="start" className="relative flex min-h-svh flex-col bg-closing-glow px-gutter pt-nav">
      <div className="flex flex-1 flex-col items-center pt-[max(var(--spacing-phi-5),calc(38.2svh-var(--spacing-nav)-var(--spacing-phi-7)))] lg:pt-[max(var(--spacing-phi-5),calc(38.2svh-var(--spacing-nav)-var(--spacing-phi-8)))] text-center">
        <PortalMark />
        <h2 className="mt-phi-5 text-scene font-medium tracking-scene">
          <BlurText text={scenes.cta.title} by="line" />
        </h2>
        <ButtonLink href={scenes.cta.href} size="cta" className="group/cta mt-phi-4">
          {scenes.cta.label}
          <ArrowRight
            className="transition-transform duration-(--duration-hover) ease-out-strong group-hover/cta:translate-x-1.5"
            aria-hidden
          />
        </ButtonLink>
      </div>
      <div className="mx-auto w-full max-w-[1440px] pt-phi-6 pb-phi-5">
        <p className="mb-phi-3 text-center text-micro text-mist">{publishes.label}</p>
        <LogoMarquee logos={publishes.logos} />
      </div>
    </section>
  )
}
