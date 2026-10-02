import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"

/** One voice, set large over the meadow. The page's only full-bleed photo
 *  after the hero, so it reads as a pause. */
export function Testimonial({
  quote = "I used to lose the first week of every month to the books. Now it closes itself, I read the summary on the way to a meeting, and I only touch the three things Meadow wasn't sure about.",
  name = "Imogen Hale",
  role = "Finance Lead, Larkfield",
}: {
  quote?: string
  name?: string
  role?: string
}) {
  return (
    <section id="testimonial" className="bg-page px-2 py-2 sm:px-3 sm:py-3">
      <div className="relative isolate overflow-hidden rounded-[var(--radius-section)] bg-sky-400 py-24 sm:py-36">
      <img src="/images/hero-b.jpg" alt="" aria-hidden="true" className="absolute inset-0 -z-10 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-500/40 to-transparent" />
      <Container>
        <Reveal className="max-w-[640px]">
          <blockquote className="font-display text-[clamp(26px,4.6vw,38px)] leading-[1.18] font-semibold tracking-[-0.03em] text-pretty text-white drop-shadow-[0_1px_16px_rgb(20_70_140/0.35)]">
            “{quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 text-white">
            <img src="/images/avatar-1.jpg" alt="" className="size-9 rounded-full object-cover ring-2 ring-white/70" />
            <span className="text-[13px] leading-tight">
              <span className="block font-semibold">{name}</span>
              <span className="text-white/80">{role}</span>
            </span>
          </figcaption>
        </Reveal>
      </Container>
      </div>
    </section>
  )
}
