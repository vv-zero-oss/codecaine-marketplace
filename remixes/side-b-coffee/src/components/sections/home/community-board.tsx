import { Disc3, Mic, Music2, Sprout } from "lucide-react"

import { useState } from "react"
import { Doodle } from "@/components/mock/doodles"
import { PostReader } from "@/components/blocks/post-reader"
import { ShelfTrack, useShelf } from "@/components/blocks/shelf-scroller"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { POSTS, type Post } from "@/content/site"
import { photo } from "@/lib/photos"

const ICON = { note: Music2, disc: Disc3, bean: Sprout, mic: Mic }

/**
 * The community board: what's on at the bars and in the roastery, as a
 * row of pinned cards — photo, date, headline, a line of copy and a
 * coloured label. Photos ease in 4% on hover; a card opens the post.
 */
export function CommunityBoard() {
  const { ref, arrows } = useShelf()
  return (
    <section className="py-(--spacing-section)">
      <Container className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="type-display text-h2">
            <span className="flex items-end gap-3 text-ember">
              Community board:
              <Doodle name="cup" className="mb-1 w-[1.4em] text-ink" />
            </span>
            What's on at the bars
          </h2>
          {arrows}
        </div>
      </Container>
      <ShelfTrack shelfRef={ref}>
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ShelfTrack>
    </section>
  )
}

export function PostCard({ post }: { post: Post }) {
  const Icon = post.emoji ? ICON[post.emoji] : null
  const [open, setOpen] = useState(false)
  return (
    <>
    <article tabIndex={0} aria-label={`${post.title} — open`} onClick={() => setOpen(true)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen(true))} className="group/post flex cursor-pointer outline-none focus-visible:bg-panel w-[min(80vw,340px)] shrink-0 snap-start flex-col gap-4 border-r border-line p-(--spacing-gutter) sm:w-[340px]">
      <div className="aspect-[4/5] overflow-hidden rounded-(--radius-card) bg-panel">
        <img src={photo(post.photo, 800)} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 ease-(--ease-out-strong) group-hover/post:scale-[1.04]" />
      </div>
      <p className="font-mono text-[12.5px] tracking-[0.08em] text-ink-3 uppercase">
        {post.kicker} <span className="mx-1 text-line-strong">|</span> {post.date}
      </p>
      <h3 className="type-display flex items-start gap-2 text-[24px] leading-[1.02] tracking-[-0.02em]">
        {post.title}
        {Icon && <Icon className="mt-1 size-5 shrink-0 text-ember" strokeWidth={1.6} />}
      </h3>
      <p className="line-clamp-3 text-[14px] text-ink-2">{post.excerpt}</p>
      <Button variant={post.tone} size="chip" className="mt-auto w-fit">
        {post.cta}
      </Button>
    </article>
    <PostReader post={post} open={open} onOpenChange={setOpen} />
    </>
  )
}
