import { useState } from "react"
import { ArrowRight, Play, X } from "lucide-react"
import { Dialog } from "radix-ui"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { ParallaxPhoto } from "@/components/motion/parallax-photo"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { TEAM_STORY } from "@/content/home-story"

/** The person behind the quote: face, name, role. */
function Attribution() {
  return (
    <span className="flex items-center gap-3">
      <img src={TEAM_STORY.avatar} alt="" className="size-10 rounded-full object-cover" />
      <span>
        <span className="block text-[15px] text-ink">{TEAM_STORY.person}</span>
        <span className="block text-[14px] text-ink-3">{TEAM_STORY.role}</span>
      </span>
    </span>
  )
}

/**
 * The story in a lightbox: the photo large, the quote beside it. Opens from
 * the play chip; Esc, the close button or the backdrop shut it.
 */
function StoryLightbox() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Team story: video", (next) => setOpen(next ?? !open), { on: open, group: "Team story" })

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="absolute bottom-4 left-4 inline-flex h-11 items-center gap-2 rounded-full bg-raised/90 pr-4 pl-1.5 text-[14px] text-ink shadow-(--shadow-float) backdrop-blur transition-transform duration-(--duration-press) ease-(--ease-out-strong) active:scale-[0.97] sm:bottom-6 sm:left-6">
        <span className="grid size-8 place-items-center rounded-full bg-lime text-lime-ink">
          <Play className="size-3.5 translate-x-px" fill="currentColor" />
        </span>
        Watch the story
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[61] grid max-h-[calc(100svh-32px)] w-[calc(100vw-32px)] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-(--radius-panel) bg-raised shadow-(--shadow-lift) duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.97] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.96] lg:grid-cols-[3fr_2fr]">
          <img src={TEAM_STORY.photo} alt={TEAM_STORY.photoAlt} className="aspect-[4/3] size-full object-cover lg:aspect-auto" />
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <Dialog.Title className="type-head pr-10 text-h4 text-ink">Fieldhouse closes in three days now.</Dialog.Title>
            <Dialog.Description className="text-[17px] leading-relaxed text-ink-2">“{TEAM_STORY.quote}”</Dialog.Description>
            <Attribution />
            <ButtonLink href="/customers" variant="outline" className="mt-auto self-start" onClick={() => setOpen(false)}>
              Read Fieldhouse’s story <ArrowRight />
            </ButtonLink>
          </div>
          <Dialog.Close aria-label="Close" className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-raised/90 text-ink shadow-(--shadow-card) transition-[transform,background-color] duration-(--duration-press) hover:bg-panel active:scale-[0.95]">
            <X className="size-4" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/**
 * A finance team that got its week back: the photo, the claim, and the
 * controller who says so.
 */
export function TeamStory() {
  return (
    <section aria-label="Customer story" className="py-(--spacing-section)">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ParallaxPhoto src={TEAM_STORY.photo} alt={TEAM_STORY.photoAlt} className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[6/7]">
          <StoryLightbox />
        </ParallaxPhoto>

        <div className="flex flex-col gap-10">
          <div>
            <SectionHeading size="h2" title={TEAM_STORY.title} continuation={TEAM_STORY.continuation} breakContinuation={false} />
            <Reveal delay={0.1}>
              <ButtonLink href={TEAM_STORY.link.href} variant="link" className="mt-6 text-[16px]">
                {TEAM_STORY.link.label} <ArrowRight />
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-auto grid gap-5 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-end">
            <img src={TEAM_STORY.inset} alt={TEAM_STORY.insetAlt} loading="lazy" className="aspect-[3/2] w-full rounded-(--radius-card) object-cover shadow-(--shadow-card)" />
            <figure className="flex flex-col gap-4">
              <blockquote className="text-[16px] leading-relaxed text-ink-2">“{TEAM_STORY.quote}”</blockquote>
              <figcaption>
                <Attribution />
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
