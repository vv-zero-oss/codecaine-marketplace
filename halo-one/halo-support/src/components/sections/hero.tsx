import { LogoMarquee } from "@/components/motion/logo-marquee"
import { ScrambleText } from "@/components/motion/scramble-text"
import { VoiceComposer } from "@/components/sections/voice-composer"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Glow } from "@/components/ui/glow"
import { HERO, LOGOS } from "@/content"

/** A centred hero: one headline, one paragraph, and a prompt box that answers. */
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[max(680px,100svh)] flex-col overflow-hidden pt-28 sm:pt-32">
      <Glow tone="iris" intensity={0.75} wide />
      <Container className="relative z-10 flex flex-1 flex-col items-center text-center">
        <h1 className="scanline max-w-[820px] text-[clamp(24px,3vw,42px)] leading-[1.25] tracking-[-0.03em] text-balance">
          <ScrambleText text={HERO.title} duration={1.2} scanlines={false} />
        </h1>
        <p className="mt-5 max-w-[600px] text-[clamp(15px,1.3vw,17px)] leading-relaxed text-muted">{HERO.body}</p>

        <div className="mt-10 w-full flex-1 sm:mt-12">
          <VoiceComposer prompts={HERO.prompts} hint={HERO.hint} />
          <ButtonLink href="#cta" size="lg" className="mt-4">
            {HERO.cta}
          </ButtonLink>
        </div>
      </Container>
      <LogoMarquee names={LOGOS} className="relative z-10 pt-10 pb-9" />
    </section>
  )
}
