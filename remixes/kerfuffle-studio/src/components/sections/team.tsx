import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { DisplayHeading, Eyebrow } from "@/components/ui/heading"
import { Emblem } from "@/components/ui/sticker"
import { Container } from "@/components/ui/container"
import { photo, TEAM } from "@/content"
import { cn } from "@/lib/utils"

/** Where each portrait sits on the wide layout, and how fast it drifts. */
const PLACES = [
  "md:col-start-8 md:col-span-4 md:row-start-1",
  "md:col-start-1 md:col-span-4 md:row-start-2 md:mt-16",
  "md:col-start-6 md:col-span-3 md:row-start-2 md:mt-40",
  "md:col-start-9 md:col-span-4 md:row-start-2 md:mt-4",
  "md:col-start-2 md:col-span-3 md:row-start-3 md:mt-10",
  "md:col-start-5 md:col-span-4 md:row-start-3 md:mt-40",
  "md:col-start-10 md:col-span-3 md:row-start-3 md:mt-20",
]
const SPEEDS = [0.12, 0.05, 0.2, 0.1, 0.16, 0.06, 0.18]

/**
 * The crew, scattered down the page at different depths: each portrait has
 * a first name set big over its corner, and — on the about page — a role and
 * a line under it.
 */
export function Team({
  eyebrow = "The makers at Kerfuffle",
  bold = "Meet the",
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
    <section id={id} data-tone="light" className="scroll-mt-10 overflow-hidden py-section">
      <Container>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          <div className="col-span-2 flex flex-col gap-6 md:col-span-6 md:col-start-1 md:row-start-1 md:self-center">
            <Reveal>
              <Emblem className="text-4xl md:text-6xl" />
            </Reveal>
            <Reveal delay={0.08}>
              <Eyebrow className="md:ml-[18%]">{eyebrow}</Eyebrow>
              <DisplayHeading bold={bold} serif={serif} inline size="md" align="left" className="mt-2 md:ml-[18%] [&_h2]:whitespace-nowrap" />
            </Reveal>
          </div>
          {TEAM.map((person, i) => (
            <div key={person.name} className={cn("col-span-1", PLACES[i], i % 2 === 1 && "mt-10 md:mt-0")}>
              <Parallax speed={SPEEDS[i]}>
                <Portrait person={person} showRole={showRoles} tilt={i % 2 ? 2 : -2} />
              </Parallax>
            </div>
          ))}
        </div>
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
  return (
    <figure className="group/portrait">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        <img
          src={photo(person.image, 700)}
          alt={`${person.name}, ${person.role}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-(--duration-slow) ease-out group-hover/portrait:scale-[1.04]"
        />
        <span
          className="absolute bottom-2 left-3 font-bubble text-[clamp(2.25rem,5vw,4.5rem)] leading-none text-snow [text-shadow:0_3px_0_rgb(0_0_0/0.18)] transition-transform duration-(--duration-base) ease-(--ease-pop) group-hover/portrait:-rotate-6"
          style={{ rotate: `${tilt * 3}deg` }}
        >
          {person.name}
        </span>
      </div>
      {showRole ? (
        <figcaption className="mt-3 text-center">
          <p className="label text-base md:text-lg">{person.role}</p>
          <p className="mx-auto mt-0.5 max-w-[26ch] font-serif text-lg leading-tight">{person.line}</p>
        </figcaption>
      ) : null}
    </figure>
  )
}
