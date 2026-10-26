import { MessageSquareQuote, Star } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import { Container } from "@/components/ui/container"
import { asset } from "@/lib/asset"

type Review =
  | { kind: "post"; name: string; handle: string; avatar: number; body: string; photo?: string }
  | { kind: "rating"; author: string; title: string; body: string }

const REVIEWS: Review[] = [
  { kind: "post", name: "Priya Raman", handle: "@priyaruns", avatar: 6, body: "Post-intervals ritual: check the recovery score, then decide if tomorrow is easy.", photo: "images/watch-check.jpg" },
  { kind: "rating", author: "Jonah W.", title: "Finally understand my HRV", body: "I’ve worn trackers for years and never knew what the numbers meant. Cadence explains each one in a sentence, and the trends made me take sleep seriously." },
  { kind: "post", name: "Theo Marsh", handle: "@theomarsh", avatar: 2, body: "Shoutout to @cadence for putting my ring, my watch and my scale on one screen. No more app hopping." },
  { kind: "rating", author: "Dana K.", title: "I’ve tried all of them", body: "Every fitness app, you name it, I’ve used it. Cadence is the one I open every morning. Calm design, devices just sync, and support answered in an hour." },
  { kind: "post", name: "Marcus Bell", handle: "@marcusb", avatar: 3, body: "@cadence flagged my HRV drop two days before I got sick. Took the rest day. Not close." },
  { kind: "rating", author: "Sofia L.", title: "Trained smarter for my marathon", body: "Training load and recovery told me when to push and when to back off. I hit my goal time without a single niggle. If you train for anything, try it." },
  { kind: "rating", author: "Ade O.", title: "Quietly brilliant", body: "The right things are automatic and the rest takes a tap. Sleep debt made me stop pretending five hours was fine." },
  { kind: "post", name: "Amara Eze", handle: "@amaraeze", avatar: 7, body: "Moved from a spreadsheet of lifts to Cadence last month. It picked up every session on its own. Wish I’d done it sooner." },
  { kind: "post", name: "Lucas Ortiz", handle: "@lucasrides", avatar: 5, body: "Ten years of training apps and this is the first one I’ve paid for without a second thought." },
  { kind: "rating", author: "Hannah P.", title: "My resting heart rate, explained", body: "Set up in an evening. Six weeks later my resting HR is down 5 bpm and I can see exactly which habits did it." },
  { kind: "post", name: "Ben Hollis", handle: "@benhollis", avatar: 9, body: "Early @cadence user here. Few apps earn a spot on my home screen this quickly." },
]

function Stars() {
  return (
    <span className="flex gap-0.5 text-star" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-4 fill-current" strokeWidth={0} />
      ))}
    </span>
  )
}

/** One review: a post with a face and a handle, or a rating with a title. */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="mb-3 break-inside-avoid rounded-(--radius-field) bg-surface-2 p-5 shadow-(--shadow-card) transition-shadow duration-(--duration-hover) hover:shadow-[0_0_0_1px_var(--color-line-strong)]">
      {review.kind === "post" ? (
        <>
          <header className="flex items-center gap-3">
            <img src={asset(`images/avatar-${review.avatar}.jpg`)} alt="" className="size-9 rounded-full object-cover" loading="lazy" />
            <div className="leading-tight">
              <p className="text-[14px] text-fg">{review.name}</p>
              <p className="text-[12px] text-fg-4">{review.handle}</p>
            </div>
          </header>
          <p className="mt-3 text-[14px] leading-relaxed text-fg">{review.body}</p>
          {review.photo ? (
            <img src={asset(review.photo)} alt="A runner checking her watch on a track" className="mt-3 aspect-[16/10] w-full rounded-[10px] object-cover" loading="lazy" />
          ) : null}
        </>
      ) : (
        <>
          <header className="flex items-start justify-between">
            <div>
              <Stars />
              <p className="mt-1 text-[12px] text-fg-4">{review.author}</p>
            </div>
            <MessageSquareQuote className="size-5 text-fg-3" aria-label="App review" />
          </header>
          <h3 className="mt-3 font-sans text-[15px] font-bold text-fg">{review.title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-fg-2">{review.body}</p>
        </>
      )}
    </article>
  )
}

/** What people say, in three loose columns. */
export function Reviews({ title = "People train with Cadence" }: { title?: string }) {
  return (
    <section id="reviews" className="relative pb-(--spacing-section)">
      <Container>
        <SectionHeading title={title} className="max-w-none text-fg" />
        <Reveal className="mt-14 columns-1 gap-3 sm:columns-2 lg:columns-3 md:mt-16">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
