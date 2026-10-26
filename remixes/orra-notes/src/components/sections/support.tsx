import { Star, StarHalf } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { SUPPORT } from "@/content"
import { PHOTOS, pexels } from "@/photos"

/** "What if something breaks?" — answered with faces and three facts. */
export function Support() {
  return (
    <section id="support" className="pt-20 sm:pt-28">
      <Container>
        <Reveal className="flex flex-col items-center">
          <AvatarStack />
          <SectionHeading align="center" title={SUPPORT.title} lead={SUPPORT.body} className="mt-5 max-w-[760px]" />
        </Reveal>
        <Reveal delay={0.08}>
          <dl className="mx-auto mt-14 grid max-w-[940px] gap-6 sm:mt-16 sm:grid-cols-3 sm:gap-0">
            {SUPPORT.stats.map((stat) => (
              <div key={stat.note} className="border-l border-hairline pl-3.5 sm:pr-6">
                <dt className="flex h-8 items-center font-heading text-heading-sm font-medium text-bone">
                  {stat.kind === "rating" ? <Rating value={stat.value} /> : stat.title}
                </dt>
                <dd className="mt-1 text-caption text-mist">{stat.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}

/** Six of the support team, overlapping. */
export function AvatarStack({ size = 44 }: { size?: number }) {
  return (
    <ul className="flex" aria-label="Some of the support team">
      {PHOTOS.team.map((id) => (
        <li key={id} className="-ml-2 first:ml-0">
          <img
            src={pexels(id, size * 3)}
            alt=""
            className="rounded-pill object-cover ring-2 ring-canvas"
            style={{ width: size, height: size }}
          />
        </li>
      ))}
    </ul>
  )
}

export function Rating({ value }: { value: number }) {
  return (
    <span className="flex gap-1 text-bone" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) =>
        index + 1 <= value ? (
          <Star key={index} className="size-5 fill-current" strokeWidth={0} />
        ) : index + 0.5 <= value ? (
          <StarHalf key={index} className="size-5" strokeWidth={1.6} />
        ) : (
          <Star key={index} className="size-5" strokeWidth={1.4} />
        ),
      )}
    </span>
  )
}
