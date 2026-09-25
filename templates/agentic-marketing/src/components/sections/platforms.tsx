import { BrandChip } from "@/components/blocks/brand-logo"
import { Frame, Section } from "@/components/blocks/frame"
import { Photo } from "@/components/blocks/photo"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"
import { platforms } from "@/content"

/** What it plugs into: the deepest integration up top, then the other channels. */
export function Platforms() {
  const { featured } = platforms
  return (
    <Section className="pt-0">
      <Frame>
        <Reveal>
          <SectionHeading light={platforms.titleLight} bold={platforms.titleBold} />
        </Reveal>

        <Reveal delay={0.06} className="mt-12 grid items-center gap-8 border-b border-line pb-10 md:grid-cols-2 lg:mt-16">
          <div className="max-w-[22rem]">
            <BrandChip name={featured.logo} label={featured.name} />
            <h3 className="mt-6 text-[17px] font-medium tracking-[-0.015em]">{featured.title}</h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">{featured.body}</p>
          </div>
          <figure
            className="relative grid place-items-center overflow-hidden rounded-card py-8"
            style={{
              backgroundImage:
                "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          >
            <div className="relative aspect-[4/5] w-[min(19rem,80%)] overflow-hidden rounded-md shadow-float">
              <Photo photo={featured.photo} widths={[400, 800]} sizes="304px" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas via-canvas/70 to-transparent" />
              <figcaption className="absolute inset-x-4 bottom-4 text-[11px] font-medium text-ink">{featured.caption}</figcaption>
            </div>
          </figure>
        </Reveal>

        <ul className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
          {platforms.items.map((p, i) => (
            <Reveal as="li" key={p.name} delay={(i % 3) * 0.06}>
              <BrandChip name={p.logo} label={p.name} />
              <p className="mt-4 max-w-[21rem] text-[12px] leading-relaxed text-ink-soft">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </Frame>
    </Section>
  )
}
