import { ArrowRight } from "lucide-react"

import { BlurText } from "@/components/motion/blur-text"
import { ButtonLink } from "@/components/ui/button"
import { scenes } from "@/content"

/**
 * The close: one line and the reference's enormous black pill. The arrow
 * steps forward on hover — the one thing on the page that asks to be pressed.
 */
export function CallToAction() {
  return (
    <section id="start" className="flex min-h-scene flex-col items-center justify-center gap-[clamp(24px,2.8vw,40px)] px-gutter text-center">
      <h2 className="text-scene font-medium tracking-scene">
        <BlurText text={scenes.cta.title} by="line" />
      </h2>
      <ButtonLink href={scenes.cta.href} size="cta" className="group/cta">
        {scenes.cta.label}
        <ArrowRight
          className="transition-transform duration-(--duration-hover) ease-out-strong group-hover/cta:translate-x-1.5"
          aria-hidden
        />
      </ButtonLink>
    </section>
  )
}
