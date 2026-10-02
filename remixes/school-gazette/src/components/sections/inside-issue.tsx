import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Photo } from "@/components/ui/photo"
import { Coupon, Tape } from "@/components/ui/retro"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tilt3D } from "@/components/motion/tilt-3d"
import { PHOTOS } from "@/data/photos"

type Story = { kicker: string; title: string; deck: string; by: string; photo: string; alt: string; tilt: number }

const STORIES: Story[] = [
  { kicker: "Library", title: "The quiet floor gets louder", deck: "A new rule lets pupils whisper, and the librarian says it is going better than anyone feared.", by: "Words by Tomasz O., 10B", photo: PHOTOS.library, alt: "Students studying together at a long library table", tilt: -1.5 },
  { kicker: "Sport", title: "First XI, three goals, no excuses", deck: "A muddy Tuesday, a late equaliser and a winning shot from the halfway line.", by: "Words by Mara I., 12A", photo: PHOTOS.sports, alt: "A school football team running onto the pitch", tilt: 1.2 },
  { kicker: "Music", title: "Cello in the stairwell", deck: "Why the best acoustics in school are between the second and third floors.", by: "Words by Ines R., 9D", photo: PHOTOS.music, alt: "A girl playing the cello in a school orchestra", tilt: 1.8 },
  { kicker: "Corridors", title: "Lost property, found poetry", deck: "The box by the lockers holds forty-one single gloves and one very good sonnet.", by: "Words by Dev P., 11C", photo: PHOTOS.corridor, alt: "A long school corridor lined with lockers at sunset", tilt: -1.1 },
]

/** One story as a polaroid with a strip of tape on it, tilting toward the pointer. */
function Article({ story }: { story: Story }) {
  return (
    <article className="flex flex-col gap-4">
      <Tilt3D rest={story.tilt} max={9}>
        <div className="paper-card relative border border-ink p-2.5 pb-4 shadow-card">
          <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
          <Photo src={story.photo} alt={story.alt} className="aspect-[4/3] w-full" />
        </div>
      </Tilt3D>
      <div className="flex flex-col gap-2">
        <p className="kicker text-rust-deep">{story.kicker}</p>
        <h3 className="display text-[clamp(1.8rem,3vw,2.5rem)]">{story.title}</h3>
        <p className="max-w-[44ch] text-[1rem] leading-snug text-ink-soft">{story.deck}</p>
        <p className="font-type text-[0.7rem] text-ink-faint">{story.by}</p>
        <ButtonLink href="#write" variant="link" size="sm" className="self-start">Read the full story →</ButtonLink>
      </div>
    </article>
  )
}

const INDEX = [
  ["Editor’s page", 2],
  ["Marlowe FM — the brief", 4],
  ["The scoreboard", 6],
  ["Library & lab", 9],
  ["Sport", 12],
  ["Music & art", 16],
  ["Clubs noticeboard", 20],
  ["Letters", 23],
] as const

/** Contents, as a printed index with dotted leaders. */
function ContentsIndex() {
  return (
    <nav aria-label="Contents" className="paper-card border-2 border-ink p-4 shadow-card">
      <h3 className="display border-b-2 border-ink pb-2 text-3xl">In this issue</h3>
      <ul className="mt-3 flex flex-col">
        {INDEX.map(([name, page]) => (
          <li key={name} className="flex items-baseline gap-2 py-1.5 text-[0.95rem]">
            <span>{name}</span>
            <span aria-hidden className="mb-1 flex-1 border-b-2 border-dotted border-ink/50" />
            <span className="font-type tabular-nums">{page}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** The features: four stories in a grid, and the contents and a coupon in the margin. */
export function InsideIssue() {
  return (
    <section id="inside" aria-labelledby="inside-title" className="scroll-mt-4 border-t-4 border-double border-ink">
      <Container className="flex flex-col gap-10 py-14">
        <div id="inside-title">
          <SectionHeading kicker="Pages 9–19" title="Inside this issue" deck="Four things worth putting down your phone for. Every picture is tilted toward your pointer — pick one up." />
        </div>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {STORIES.map((story) => (
              <Article key={story.title} story={story} />
            ))}
          </div>
          <aside className="flex flex-col gap-8 lg:sticky lg:top-6 lg:self-start">
            <ContentsIndex />
            <Coupon title="One free cookie" body="Hand this to the canteen with a friendly face. One per pupil, while the crumbs last." code="MRL-0042-COOKIE" className="-rotate-1" />
          </aside>
        </div>
      </Container>
    </section>
  )
}
