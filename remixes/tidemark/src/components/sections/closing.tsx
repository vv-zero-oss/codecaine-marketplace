import { EmailCapture } from "@/components/blocks/email-capture"
import { GiantWordmark } from "@/components/blocks/giant-wordmark"
import { Reveal } from "@/components/motion/reveal"
import { CLOSING } from "@/content"

/** The last ask, on the oxblood ground the footer shares, with the wordmark set huge under it. */
export function Closing() {
  return (
    <section id="start" className="relative overflow-hidden bg-night px-gutter pt-section text-center text-night-fg">
      <Reveal className="relative flex flex-col items-center gap-6">
        <h2 className="type-display max-w-[14ch] text-[clamp(44px,7vw,108px)] text-balance">
          {CLOSING.titleStart} <span className="text-pink">{CLOSING.titleAccent}</span> {CLOSING.titleEnd}
        </h2>
        <p className="max-w-[440px] text-[17px] leading-[1.55] text-night-muted">{CLOSING.body}</p>
        <EmailCapture name="Closing" tone="night" placeholder={CLOSING.placeholder} cta={CLOSING.cta} className="mt-4" />
      </Reveal>
      <GiantWordmark className="relative mx-auto mt-16 max-w-[1320px] text-pink md:mt-24" />
    </section>
  )
}
