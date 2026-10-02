import { Aurora } from "@/components/motion/aurora"
import { Reveal } from "@/components/motion/reveal"
import { AppleIcon } from "@/components/ui/apple-icon"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Mark } from "@/components/ui/wordmark"

/** The last word: one sentence, one button, on a pastel panel. */
export function FinalCta() {
  return (
    <section className="px-1.5 pb-10 sm:px-2 sm:pb-16">
      <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-card bg-[linear-gradient(135deg,var(--color-pastel-sky),var(--color-pastel-lilac)_45%,var(--color-pastel-rose))] py-24 text-center sm:py-36">
        <Aurora tone="dawn" intensity={0.7} speed={22} />
        <Container>
          <Reveal>
            <span className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl bg-ink text-paper shadow-chip"><Mark className="size-8" /></span>
            <h2 className="display text-[clamp(2rem,5vw,3.25rem)]">Ready when you are</h2>
            <p className="mx-auto mt-3 max-w-sm text-ink-2">Start with one step. Log one thing at a time. Meridian meets you where you are and helps you move forward.</p>
            <ButtonLink href="#download" size="lg" className="mt-7"><AppleIcon /> Download app</ButtonLink>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}
