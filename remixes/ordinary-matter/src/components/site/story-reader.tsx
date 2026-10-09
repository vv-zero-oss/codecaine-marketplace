import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useScroll } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { STORIES, storyBySlug } from "@/content/stories"
import { photo } from "@/lib/photos"
import { useReader } from "@/lib/reader"

/**
 * A story, opened from any card on any page: a reading sheet from the right,
 * with a hairline that fills as you read and the next story at the end.
 */
export function StoryReader() {
  const { slug, openStory, close } = useReader()
  const story = storyBySlug(slug)
  const scroller = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: scroller })

  useCanvasAction("Story reader", (next) => ((next ?? !slug) ? openStory(STORIES[0].slug) : close()), { on: !!slug, group: "Stories" })

  const index = story ? STORIES.indexOf(story) : -1
  const next = STORIES[(index + 1) % STORIES.length]

  return (
    <Sheet open={!!story} onOpenChange={(open) => !open && close()}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-[720px]">
        {story && (
          <>
            <motion.span aria-hidden style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left bg-ink" />
            <div ref={scroller} key={story.slug} className="h-full overflow-y-auto overscroll-contain" data-lenis-prevent>
              <div className="relative aspect-[4/3] w-full bg-sheet">
                <img src={photo(story.photo, 1400)} alt={`${story.name}, ${story.role}`} className="absolute inset-0 size-full object-cover photo-grade" />
              </div>
              <article className="px-5 pt-8 pb-16 sm:px-12">
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  <span className="type-label text-ink-3">{story.place}</span>
                  <span className="type-label text-ink-3">{story.trade}</span>
                  <span className="type-label text-ink-3">{story.volume === "Online" ? "Online feature" : `Volume ${story.volume}`}</span>
                  <span className="type-label text-ink-3">{story.minutes} min read</span>
                </div>
                <SheetTitle className="type-display mt-5 text-h1 font-normal text-ink">{story.name}</SheetTitle>
                <p className="mt-1 font-serif text-h4 text-ink-3 italic">{story.role}</p>
                <SheetDescription className="mt-8 font-serif text-lead text-ink">{story.dek}</SheetDescription>
                <div className="mt-8 space-y-5 font-serif text-[18px] leading-[1.65] text-ink-2">
                  <p>{story.body[0]}</p>
                </div>
                <blockquote className="type-display my-12 border-y border-rule py-10 text-h3 text-ink">“{story.quote}”</blockquote>
                <div className="space-y-5 font-serif text-[18px] leading-[1.65] text-ink-2">
                  {story.body.slice(1).map((p) => (
                    <p key={p.slice(0, 12)}>{p}</p>
                  ))}
                </div>
                <figure className="mt-12">
                  <img src={photo(story.detail, 1200)} alt="" className="aspect-[3/2] w-full object-cover" loading="lazy" />
                  <figcaption className="type-label mt-3 text-ink-3">Photographed on film, {story.place}</figcaption>
                </figure>

                <button
                  type="button"
                  onClick={() => {
                    scroller.current?.scrollTo({ top: 0 })
                    openStory(next.slug)
                  }}
                  className="group mt-16 flex w-full items-center gap-5 border-t border-rule pt-6 text-left"
                >
                  <img src={photo(next.photo, 300)} alt="" className="size-20 shrink-0 object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="type-label block text-ink-3">Next story</span>
                    <span className="mt-1 block font-serif text-h4 text-ink">{next.name}</span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-ink transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-x-1" />
                </button>
              </article>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
