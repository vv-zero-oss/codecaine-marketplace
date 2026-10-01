import { useCycle, useStill } from "@/components/motion"
import { LogoMarquee } from "@/components/motion/logo-marquee"
import { Rotator } from "@/components/motion/rotator"
import { ScrambleText } from "@/components/motion/scramble-text"
import { VoiceComposer } from "@/components/sections/voice-composer"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Glow } from "@/components/ui/glow"
import { HERO, LOGOS } from "@/content"

/** A centred hero: the headline, one sentence about what Halo improves (the
 *  metric word turns over every `cycleSeconds`), and a prompt box that answers. */
export function Hero({ cycleSeconds = 5.6, metrics = HERO.metrics }: { cycleSeconds?: number; metrics?: string }) {
  const words = metrics.split(",")
  const still = useStill()
  const [index] = useCycle(words.length, cycleSeconds, still)

  return (
    <section id="top" className="relative flex min-h-[max(720px,100svh)] flex-col overflow-hidden pt-28 sm:pt-32">
      <Glow tone="iris" intensity={0.75} wide />
      <Container className="relative z-10 flex flex-1 flex-col items-center text-center">
        <h1 className="scanline max-w-[1000px] text-[clamp(30px,4.4vw,64px)] leading-[1.22] tracking-[-0.03em] text-balance">
          <ScrambleText text={HERO.title} duration={1.3} scanlines={false} />
        </h1>
        <h2 className="mt-7 text-[clamp(22px,2.4vw,32px)] leading-[1.15] font-medium tracking-[-0.025em] text-text sm:mt-9">
          {HERO.lead} <Rotator words={words} index={index} />
        </h2>
        <p className="mt-5 max-w-[640px] text-[clamp(15px,1.3vw,18px)] leading-relaxed text-muted">{HERO.body}</p>

        <div className="mt-9 w-full flex-1 sm:mt-10">
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
