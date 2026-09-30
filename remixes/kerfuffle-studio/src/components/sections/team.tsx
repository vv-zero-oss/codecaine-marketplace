import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/heading"
import { photo, TEAM } from "@/content"

/** The crew: portraits in a four-column grid, name and role under each. */
export function Team({
  index = "04",
  title = "Eight people, one building.",
  showLines = false,
  id = "team",
}: {
  index?: string
  title?: string
  showLines?: boolean
  id?: string
}) {
  return (
    <section id={id} data-tone="light" className="scroll-mt-16 pb-section">
      <Container>
        <Reveal>
          <SectionHeader index={index} label="Team" title={title} />
        </Reveal>
        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-14">
          {TEAM.map((person, i) => (
            <Reveal key={person.name} delay={(i % 4) * 0.05}>
              <li>
                <Portrait person={person} showLine={showLines} />
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function Portrait({ person, showLine = false }: { person: (typeof TEAM)[number]; showLine?: boolean }) {
  return (
    <figure className="group/portrait">
      <div className="aspect-[4/5] overflow-hidden bg-line">
        <img
          src={photo(person.image, 700)}
          alt={`${person.name}, ${person.role}`}
          loading="lazy"
          className="size-full object-cover grayscale transition-[filter,transform] duration-(--duration-slow) ease-out group-hover/portrait:scale-[1.03] group-hover/portrait:grayscale-0"
        />
      </div>
      <figcaption className="mt-3 border-t border-line pt-3">
        <p className="text-sm font-medium">{person.name}</p>
        <p className="text-sm text-ink-mute">{person.role}</p>
        {showLine ? <p className="mt-2 text-sm leading-snug text-ink-soft">{person.line}</p> : null}
      </figcaption>
    </figure>
  )
}
