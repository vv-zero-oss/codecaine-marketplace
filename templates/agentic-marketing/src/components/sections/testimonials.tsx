import { Frame, Section } from "@/components/blocks/frame"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Stars } from "@/components/blocks/stars"
import { testimonials } from "@/content"

/** Four customers in their own words, divided by hairlines rather than boxed. */
export function Testimonials() {
  return (
    <Section rule>
      <Frame>
        <Reveal>
          <SectionHeading light={testimonials.titleLight} bold={testimonials.titleBold} />
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {testimonials.items.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.06} className="bg-canvas">
              <figure className="flex h-full flex-col px-1 py-8 sm:px-8">
                <Stars />
                <blockquote className="mt-5 flex-1 text-[13px] leading-relaxed text-ink-2">“{t.quote}”</blockquote>
                <figcaption className="mt-8 text-[12px]">
                  <p className="font-medium text-ink">{t.name}</p>
                  <p className="mt-0.5 text-ink-faint">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Frame>
    </Section>
  )
}
