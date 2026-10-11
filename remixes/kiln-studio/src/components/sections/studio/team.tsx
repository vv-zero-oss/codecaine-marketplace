import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/blocks/section-label"
import { TEAM, VALUES } from "@/data/studio"
import { pexels } from "@/lib/photos"
import { play } from "@/lib/sound"

/** A person: portrait in black and white, name and role, and one true thing on hover or focus. */
export function TeamCard({ name, role, city, photo, fact }: { name: string; role: string; city: string; photo: number; fact: string }) {
  return (
    <figure tabIndex={0} onPointerEnter={() => play("tick")} className="group/person outline-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-(--radius-cell) bg-panel shadow-(--shadow-card)">
        <img
          src={pexels(photo, 640, 800)}
          alt={`${name}, ${role}`}
          loading="lazy"
          className="absolute inset-0 size-full object-cover grayscale transition-transform duration-(--duration-scene) ease-(--ease-out-strong) group-hover/person:scale-[1.04] group-focus-visible/person:scale-[1.04]"
        />
        <p className="absolute inset-x-3 bottom-3 translate-y-2 rounded-[10px] bg-page/80 p-3 text-[14px] text-ink opacity-0 backdrop-blur-md transition-[opacity,transform] duration-(--duration-hover) ease-(--ease-out-strong) group-hover/person:translate-y-0 group-hover/person:opacity-100 group-focus-visible/person:translate-y-0 group-focus-visible/person:opacity-100">
          {fact}
        </p>
        <span className="type-label absolute top-3 left-3 rounded-full bg-page/70 px-2.5 py-1 text-ink-2 backdrop-blur-md">{city}</span>
      </div>
      <figcaption className="mt-3">
        <span className="block text-[17px] font-medium tracking-[-0.02em] text-ink">{name}</span>
        <span className="block text-[15px] text-ink-3">{role}</span>
      </figcaption>
    </figure>
  )
}

export function Team() {
  return (
    <section aria-label="People" className="px-(--spacing-gutter) py-(--spacing-section)">
      <SectionHeading index="04" label="People" title="The ones you'd work with." continuation="Not a pitch team — the actual makers." />
      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {TEAM.map((p, i) => (
          <Reveal key={p.name} delay={(i % 4) * 0.05}>
            <TeamCard {...p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** What the studio holds to, as four short lines on hairlines. */
export function Values() {
  return (
    <section aria-label="What we hold to" className="px-(--spacing-gutter) pb-(--spacing-section)">
      <SectionHeading index="03" label="What we hold to" title="Four rules." continuation="We break the others." />
      <dl className="mt-14 grid border-t border-line-2 md:grid-cols-2">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.05} className="border-b border-line-2 py-8 md:odd:border-r md:odd:pr-10 md:even:pl-10">
            <dt className="type-head text-h3 text-ink">{v.title}</dt>
            <dd className="mt-3 text-lead text-ink-3">{v.body}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
