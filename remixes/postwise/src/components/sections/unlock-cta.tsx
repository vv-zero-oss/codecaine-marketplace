import { EmailCapture } from "@/components/blocks/email-capture"
import { Reveal } from "@/components/motion/reveal"
import { UNLOCK } from "@/content"

/** The last ask, on the dark ground the footer shares: poster type with one word lit. */
export function UnlockCta() {
  return (
    <section id="start" data-nav-tone="night" className="bg-night px-5 pt-16 pb-20 text-center md:pt-24 md:pb-28">
      <Reveal className="flex flex-col items-center">
        <h2 className="type-poster text-[clamp(32px,4.4vw,60px)] text-night-fg">
          <span className="block">{UNLOCK.lineOne}</span>
          <span className="block">
            {UNLOCK.lineTwoStart}{" "}
            <span className="bg-gradient-to-r from-glow-lilac via-glow-peach to-glow-rose bg-clip-text text-transparent [filter:drop-shadow(0_0_16px_rgb(255_180_154/0.35))]">
              {UNLOCK.lineTwoAccent}
            </span>
          </span>
        </h2>
        <EmailCapture name="Closing" tone="night" placeholder={UNLOCK.placeholder} cta={UNLOCK.cta} className="mt-10" />
      </Reveal>
    </section>
  )
}
