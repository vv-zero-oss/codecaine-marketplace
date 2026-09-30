import { EmailCapture } from "@/components/blocks/email-capture"
import { Reveal } from "@/components/motion/reveal"
import { JOURNEY } from "@/content"

/**
 * The lagoon band: three lines of poster type, the middle one lit in a
 * cyan-to-mint glow, and the trial form under them.
 */
export function JourneyCta() {
  const [top, middle, bottom] = JOURNEY.lines
  return (
    <section id="cta" data-nav-tone="night" className="px-3 py-10 md:px-6 md:py-16">
      <div className="relative mx-auto flex max-w-[1340px] flex-col items-center overflow-hidden rounded-[var(--radius-panel)] bg-lagoon px-5 py-16 text-center md:py-24">
        {/* Soft light behind the type */}
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lagoon-soft blur-3xl" />
        {/* The looping cloud stroke over the last letters */}
        <svg aria-hidden viewBox="0 0 80 60" className="absolute top-[12%] right-[22%] hidden h-16 w-auto text-white/80 md:block" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M8 40 C 2 26, 18 16, 28 24 C 30 8, 54 6, 56 22 C 70 18, 78 32, 68 40 M60 44 C 66 50, 64 56, 58 58" />
        </svg>
        <Reveal className="relative flex flex-col items-center">
          <h2 className="type-poster text-[clamp(38px,5.4vw,76px)] text-white">
            <span className="block">{top}</span>
            <span className="block bg-gradient-to-r from-glow-mint via-glow-sky to-glow-mint bg-clip-text text-transparent [filter:drop-shadow(0_0_18px_rgb(159_247_212/0.45))]">
              {middle}
            </span>
            <span className="block">{bottom}</span>
          </h2>
          <EmailCapture name="Journey" tone="lagoon" placeholder={JOURNEY.placeholder} cta={JOURNEY.cta} className="mt-10" />
        </Reveal>
      </div>
    </section>
  )
}
