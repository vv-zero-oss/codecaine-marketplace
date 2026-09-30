import { EmailCapture } from "@/components/blocks/email-capture"
import { Reveal } from "@/components/motion/reveal"
import { CLOSING } from "@/content"

/** The last ask, on the forest ground the footer shares, with the tide line under it. */
export function Closing() {
  return (
    <section id="start" className="relative overflow-hidden bg-forest px-gutter pt-section pb-24 text-center text-forest-fg">
      <Reveal className="relative flex flex-col items-center gap-6">
        <h2 className="type-display max-w-[14ch] text-[clamp(52px,8vw,120px)] leading-[0.95] text-balance">
          {CLOSING.titleStart} <em className="italic text-lime">{CLOSING.titleAccent}</em> {CLOSING.titleEnd}
        </h2>
        <p className="max-w-[440px] text-[17px] leading-[1.55] text-forest-muted">{CLOSING.body}</p>
        <EmailCapture name="Closing" tone="forest" placeholder={CLOSING.placeholder} cta={CLOSING.cta} className="mt-4" />
      </Reveal>
      <svg aria-hidden viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full text-forest-line">
        <path d="M0 50 C 150 20, 300 20, 450 50 S 750 80, 900 50 S 1100 20, 1200 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 64 C 150 34, 300 34, 450 64 S 750 94, 900 64 S 1100 34, 1200 54" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
    </section>
  )
}
