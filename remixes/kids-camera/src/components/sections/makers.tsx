import { Photo } from "@/components/blocks/photo"
import { Container } from "@/components/ui/container"
import { makers } from "@/content"
import { cn } from "@/lib/utils"

/** Each portrait sits a step higher than the one before it: a staircase
 *  rather than a row of cards. */
const STEP = ["md:mt-[clamp(80px,13.3vw,160px)]", "md:mt-[clamp(40px,6.7vw,80px)]", "md:mt-0"]

function MakerCard({ name, bio, photo, index }: (typeof makers.people)[number] & { index: number }) {
  return (
    <article className={cn("flex flex-col", STEP[index])}>
      <Photo photo={photo} width={800} className="aspect-[305/320] w-full bg-portrait" />
      <h3 className="mt-5 text-caption font-normal text-ink">{name}</h3>
      <p className="mt-2 max-w-[275px] text-caption text-muted">{bio}</p>
    </article>
  )
}

/** Who made it. Paper again after the dark run. */
export function Makers() {
  return (
    <section aria-labelledby="makers-title" className="bg-paper pt-[clamp(48px,6vw,72px)] pb-[clamp(56px,7vw,80px)]">
      <Container>
        <h2 id="makers-title" className="text-label font-normal text-ink">
          {makers.title}
        </h2>
        <div className="mt-10 grid gap-14 sm:grid-cols-2 md:mt-[clamp(20px,3vw,40px)] md:grid-cols-3 md:gap-x-[clamp(24px,10.8vw,130px)]">
          {makers.people.map((person, i) => (
            <MakerCard key={person.name} {...person} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
