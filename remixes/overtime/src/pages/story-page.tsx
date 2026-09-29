import type { CSSProperties } from "react"
import { motion } from "motion/react"

import { SiteFooter } from "@/components/site-footer"
import { ArchivePhotos } from "@/components/story/archive-photos"
import { FactList } from "@/components/story/fact-list"
import { MoreVoices } from "@/components/story/more-voices"
import { PortraitReveal } from "@/components/story/portrait-reveal"
import { StoryText } from "@/components/story/story-text"
import { BracketLink } from "@/components/ui/bracket"
import { ScrambleText } from "@/components/ui/scramble-text"
import { pexels, sportAccent, type Person } from "@/content"
import { ease, useSmoothScroll } from "@/lib/motion"
import { go } from "@/lib/transition"

/**
 * One person: the story on the left, the portrait in the middle, the facts on
 * the right. The two side columns hold still while the middle one scrolls on
 * into the archive frames, then the next athletes along, then the foot of the
 * page. On a phone the three stack: picture, facts, story, album.
 */
export function StoryPage({ person, back }: { person: Person; back: string }) {
  useSmoothScroll()

  return (
    <div
      className="min-h-dvh overflow-x-clip bg-paper text-ink"
      style={{ "--accent": sportAccent[person.category] } as CSSProperties}
      data-canvas-ignore
    >
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-gutter pt-4 lg:pt-5">
        <span className="pointer-events-auto flex items-center gap-3 font-mono text-label uppercase tabular-nums tracking-label">
          <ScrambleText text={String(person.number).padStart(3, "0")} />
          <span aria-hidden className="size-2 bg-(--accent)" />
          <span>{person.category}</span>
        </span>
        <BracketLink
          href={back}
          className="pointer-events-auto"
          onClick={(event) => {
            event.preventDefault()
            go(back)
          }}
        >
          Close
        </BracketLink>
      </header>

      <main data-canvas-ignore>
        <article
          aria-labelledby="person-name"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-y-10 px-gutter pt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-(--spacing-column) lg:pt-[8.75rem]"
        >
          <h1 id="person-name" className="sr-only">
            {person.name}, {person.role}
          </h1>

          <div className="order-3 lg:order-1 lg:sticky lg:top-[8.75rem] lg:self-start">
            <StoryText person={person} />
          </div>

          <div className="relative order-1 lg:order-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-8 -bottom-10 h-2/3 rounded-full bg-(--accent) opacity-25 blur-[80px]"
            />
            <PortraitReveal
              key={person.slug}
              src={pexels(person.photo, 1000, 1250)}
              alt={`Portrait of ${person.name}`}
              className="relative aspect-[4/5] w-full rounded-card"
            />
            <div className="hidden lg:mt-32 lg:block">
              <ArchivePhotos person={person} />
            </div>
          </div>

          <div className="order-2 lg:order-3 lg:sticky lg:top-0 lg:-mt-[8.75rem] lg:flex lg:h-dvh lg:flex-col lg:justify-end lg:self-start lg:pb-[6.5rem]">
            <FactList person={person} />
          </div>

          <div className="order-4 lg:hidden">
            <ArchivePhotos person={person} />
          </div>
        </article>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6, ease: ease.outQuart }}
          className="mx-auto max-w-2xl px-gutter pt-12 lg:mx-0 lg:max-w-none lg:pointer-events-none lg:fixed lg:bottom-6 lg:left-0 lg:z-20 lg:pt-0"
        >
          <dt className="text-ink-muted">Words</dt>
          <dd className="mb-3">{person.writer}</dd>
          <dt className="text-ink-muted">Photograph</dt>
          <dd>{person.photographer} / Pexels</dd>
        </motion.dl>

        <div className="relative z-30 mt-24 bg-paper lg:mt-40">
          <MoreVoices person={person} />
          <SiteFooter />
        </div>
      </main>
    </div>
  )
}
