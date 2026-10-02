import { Carousel3D } from "@/components/motion/carousel-3d"
import { Badge } from "@/components/ui/badge"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Photo } from "@/components/ui/photo"
import { SectionHeading } from "@/components/ui/section-heading"
import { PHOTOS } from "@/data/photos"

const CLUBS = [
  { name: "Robotics", when: "Mon · 16:00 · Lab 2", line: "Build, break, rebuild. Regional heat next month.", photo: PHOTOS.lab, hot: true },
  { name: "Orchestra", when: "Tue · 08:00 · Music block", line: "Strings wanted. Cellists especially.", photo: PHOTOS.music },
  { name: "Art Society", when: "Wed · 15:30 · Room 7", line: "Easels, clay and a very forgiving teacher.", photo: PHOTOS.art },
  { name: "Book Club", when: "Thu · 13:00 · Library", line: "This term: one novel, one argument.", photo: PHOTOS.library },
  { name: "Cross-country", when: "Fri · 16:15 · Gates", line: "Flat course, muddy shoes, free oranges.", photo: PHOTOS.sports },
  { name: "Radio Club", when: "Daily · 08:00 · Basement", line: "Read the brief you just heard. No experience.", photo: PHOTOS.radio, hot: true },
]

/** A pinned card in the carousel. */
function ClubCard({ club }: { club: (typeof CLUBS)[number] }) {
  return (
    <article className="paper-card relative flex h-full flex-col gap-3 border-2 border-ink p-3 shadow-card">
      <span aria-hidden className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rounded-full border border-ink bg-[radial-gradient(circle_at_35%_30%,var(--rust-light),var(--rust-deep))] shadow-[0_2px_2px_rgb(0_0_0/0.4)]" />
      <Photo src={club.photo} alt={`${club.name} meeting`} className="aspect-[4/3] w-full" />
      <h3 className="flex items-center gap-2 font-condensed text-3xl leading-none uppercase">
        {club.name} {club.hot ? <Badge>Join</Badge> : null}
      </h3>
      <p className="text-[0.92rem] leading-snug text-ink-soft">{club.line}</p>
      <p className="mt-auto border-t border-dashed border-ink pt-2 font-type text-[0.68rem] tracking-wider uppercase">{club.when}</p>
    </article>
  )
}

/** The noticeboard: six clubs on a cylinder that turns to the one you pick. */
export function Noticeboard() {
  return (
    <section id="clubs" aria-labelledby="clubs-title" className="scroll-mt-4 border-t-4 border-double border-ink bg-paper-dark/40">
      <Container className="flex flex-col items-center gap-10 py-14">
        <div id="clubs-title" className="w-full">
          <SectionHeading align="center" kicker="Notices" title="Pin it on the board" deck="Six clubs that need you this term. Drag, swipe or use the keys; the board turns to face you." />
        </div>
        <Carousel3D cardWidth={250} cardHeight={340}>
          {CLUBS.map((club) => (
            <ClubCard key={club.name} club={club} />
          ))}
        </Carousel3D>
        <ButtonLink href="#write" variant="rust" size="lg">Start a club of your own</ButtonLink>
      </Container>
    </section>
  )
}
