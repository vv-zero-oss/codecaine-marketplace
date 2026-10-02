import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"

/** One voice, set large over the meadow. The page's only full-bleed photo
 *  after the hero, so it reads as a pause. */
export function Testimonial({
  quote = "I used to spend half my morning hopping between five tabs. Now one quiet page tells me what needs me, and the rest is already handled. I finally have time to do the actual job.",
  name = "Imogen Hale",
  role = "Head of Operations, Larkfield",
}: {
  quote?: string
  name?: string
  role?: string
}) {
  return (
    <section id="testimonial" className="relative isolate overflow-hidden bg-sky-400 py-24 sm:py-36">
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
    </section>
  )
}
