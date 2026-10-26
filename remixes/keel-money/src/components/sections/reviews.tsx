import { MessageSquareQuote, Star } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import { Container } from "@/components/ui/container"
import { asset } from "@/lib/asset"

type Review =
  | { kind: "post"; name: string; handle: string; avatar: number; body: string; photo?: string }
  | { kind: "rating"; author: string; title: string; body: string }

const REVIEWS: Review[] = [
  { kind: "post", name: "Priya Raman", handle: "@priyabuilds", avatar: 6, body: "What’s on my home screen this year:", photo: "images/phone-in-hand.jpg" },
  { kind: "rating", author: "Jonah W.", title: "A must-have money app", body: "I wanted one place for spending, investments and net worth. Two years in, it has changed how I plan. The charts are lovely and I finally know where every dollar goes." },
  { kind: "post", name: "Theo Marsh", handle: "@theomarsh", avatar: 2, body: "Shoutout to @keel for being this good. Finally an app with a dashboard that shows every account in one place." },
  { kind: "rating", author: "Dana K.", title: "I’ve tried all of them", body: "Every budgeting app, you name it, I’ve used it. Keel is the one I open daily. The interface is calm, the bank connections just work, and support answered in an hour." },
  { kind: "post", name: "Marcus Bell", handle: "@marcusb", avatar: 3, body: "@keel is the best money app I’ve ever used. Not close." },
  { kind: "rating", author: "Sofia L.", title: "Switched and never looked back", body: "I was a power user of the old desktop tools. Keel feels native on phone and laptop, ships features constantly, and actually listens. If you want to track spending without the chore, try it." },
  { kind: "rating", author: "Ade O.", title: "Quietly magical", body: "The right things are automatic and the rest takes a tap. Rollovers made me stop dreading the end of the month." },
  { kind: "post", name: "Amara Eze", handle: "@amaraeze", avatar: 7, body: "Moved from a spreadsheet to Keel last month. Two cards connected in a minute and it sorted everything. Wish I’d done it sooner." },
  { kind: "post", name: "Lucas Ortiz", handle: "@lucasortiz", avatar: 5, body: "Ten years of budgeting apps and this is the first one I’ve paid for without a second thought." },
  { kind: "rating", author: "Hannah P.", title: "So good, so fast", body: "Set up in an evening. Subscriptions I’d forgotten were flagged by the weekend, and it paid for itself in a week." },
  { kind: "post", name: "Ben Hollis", handle: "@benhollis", avatar: 9, body: "Early @keel user here. Few apps earn a spot on my home screen this quickly." },
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
    <article className="mb-3 break-inside-avoid rounded-(--radius-card) bg-gradient-to-b from-surface-2/70 to-surface p-4 shadow-(--shadow-card) transition-shadow duration-(--duration-hover) hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_var(--color-line-strong),0_20px_40px_-24px_rgb(0_0_0/0.6)]">
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
            <img src={asset(review.photo)} alt="A hand holding a phone" className="mt-3 aspect-[16/10] w-full rounded-[10px] object-cover" loading="lazy" />
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
          <h3 className="mt-3 font-sans text-[14px] font-medium text-fg">{review.title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-fg-2">{review.body}</p>
        </>
      )}
    </article>
  )
}

/** What people say, in three loose columns. */
export function Reviews({ title = "People rely on Keel" }: { title?: string }) {
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
