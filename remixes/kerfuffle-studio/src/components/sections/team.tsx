import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"
import { Emblem } from "@/components/ui/sticker"
import { photo, TEAM } from "@/content"
import { cn } from "@/lib/utils"

/**
 * The crew in a grid: rounded portraits that tip a little on hover, each with a
 * name tag — and, on the about page, a role and a line.
 */
export function Team({
  eyebrow = "Faces behind the frames",
  bold = "The",
  serif = "crew",
  showRoles = false,
  id = "team",
}: {
  eyebrow?: string
  bold?: string
  serif?: string
  showRoles?: boolean
  id?: string
}) {
  return (
    <section id={id} data-tone="light" className="scroll-mt-10 py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <DisplayHeading eyebrow={eyebrow} bold={bold} serif={serif} inline size="lg" align="left" />
          </Reveal>
          <Reveal delay={0.1}>
            <Emblem className="text-4xl md:text-5xl" />
          </Reveal>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-x-6">
          {TEAM.map((person, i) => (
            <Reveal key={person.name} delay={(i % 4) * 0.06}>
              <li>
                <Portrait person={person} showRole={showRoles} tilt={i % 2 ? 2 : -2} />
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function Portrait({
  person,
  showRole = false,
  tilt = 0,
}: {
  person: (typeof TEAM)[number]
  showRole?: boolean
  tilt?: number
}) {
  const [first] = person.name.split(" ")
  return (
    <figure className="group/portrait">
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-card border-2 border-ink bg-line transition-transform duration-(--duration-base) ease-(--ease-pop) group-hover/portrait:rotate-(--tilt)"
        style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
      >
        <img
          src={photo(person.image, 700)}
          alt={`${person.name}, ${person.role}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-(--duration-slow) ease-out group-hover/portrait:scale-[1.05]"
        />
        <span
          className={cn(
            "absolute bottom-3 left-3 rounded-pill border-2 border-ink px-3 py-1 font-brand text-lg leading-none lowercase shadow-sticker md:text-xl",
            tilt > 0 ? "bg-lime text-ink" : "bg-flame text-snow",
          )}
        >
          {first}
        </span>
      </div>
      {showRole ? (
        <figcaption className="mt-3">
          <p className="label text-xs text-flame">{person.role}</p>
          <p className="mt-1 max-w-[28ch] text-base leading-snug">{person.line}</p>
        </figcaption>
      ) : null}
    </figure>
  )
}
