import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRef, useState, type CSSProperties } from "react"

import { useCanvasAction } from "@canvas/react"
import { Reveal } from "@/components/motion/reveal"
import { MerchantMark } from "@/components/sections/merchants"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { CUSTOMERS } from "@/content"
import { cn } from "@/lib/utils"
import { pexels } from "@/photos"

type Story = (typeof CUSTOMERS.stories)[number]

/** Proof: a merchant per slide, with the photo, their mark and their words. */
export function Customers() {
  return (
    <section id="customers" className="scroll-mt-20 pt-28 sm:pt-44">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={CUSTOMERS.eyebrow} title={CUSTOMERS.title} className="max-w-[760px]" />
        </Reveal>
      </Container>
      <StoryCarousel stories={CUSTOMERS.stories} className="mt-14 sm:mt-20" />
    </section>
  )
}

/**
 * The active story sits in the middle at full size; its neighbours sit a
 * step back on either side, carrying the arrows. Moving is a CSS transform
 * transition — retargets cleanly if you click twice — and swipes on touch.
 */
export function StoryCarousel({
  stories,
  start = 1,
  duration = 600,
  className,
}: {
  stories: Story[]
  start?: number
  duration?: number
  className?: string
}) {
  const [index, setIndex] = useState(start)
  const go = (next: number) => setIndex(Math.max(0, Math.min(stories.length - 1, next)))
  const pointer = useRef<number | null>(null)

  return (
    <div
      className={cn("relative overflow-hidden pb-2", className)}
      style={{ "--slide": "min(690px, 84vw)", "--gap": "24px" } as CSSProperties}
      onPointerDown={(event) => (pointer.current = event.clientX)}
      onPointerUp={(event) => {
        if (pointer.current === null) return
        const delta = event.clientX - pointer.current
        pointer.current = null
        if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1))
      }}
      aria-roledescription="carousel"
    >
      {/* Structural: the sliding track. Each slide in it stays pickable. */}
      <div
        data-canvas-ignore
        className="flex w-max items-start gap-(--gap) transition-transform ease-in-out-soft motion-reduce:transition-none"
        style={{
          transform: `translateX(calc(50vw - var(--slide) / 2 - ${index} * (var(--slide) + var(--gap))))`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {stories.map((story, position) => (
          <StorySlide
            key={story.brand}
            story={story}
            state={position === index ? "active" : position === index - 1 ? "prev" : position === index + 1 ? "next" : "far"}
            onPrev={() => go(index - 1)}
            onNext={() => go(index + 1)}
          />
        ))}
      </div>
      {stories.map((story, position) => (
        <StoryAction key={story.brand} label={story.brand} on={position === index} select={() => go(position)} />
      ))}
    </div>
  )
}

function StoryAction({ label, on, select }: { label: string; on: boolean; select: () => void }) {
  useCanvasAction(`Customer story: ${label}`, select, { on, group: "Customers" })
  return null
}

export function StorySlide({
  story,
  state,
  onPrev,
  onNext,
}: {
  story: Story
  state: "active" | "prev" | "next" | "far"
  onPrev: () => void
  onNext: () => void
}) {
  const active = state === "active"
  return (
    <figure
      aria-hidden={!active}
      className={cn(
        "w-(--slide) shrink-0 transition-[transform,opacity] duration-600 ease-in-out-soft",
        active ? "opacity-100" : "scale-[0.94] opacity-90",
        state === "prev" && "origin-right",
        state === "next" && "origin-left",
      )}
    >
      <div className="relative aspect-[690/400] overflow-hidden rounded-xl bg-surface">
        <img src={pexels(story.photo, 1400)} alt={story.alt} className="size-full object-cover" draggable={false} />
        {state === "prev" || state === "next" ? (
          <button
            type="button"
            onClick={state === "prev" ? onPrev : onNext}
            aria-label={state === "prev" ? "Previous story" : "Next story"}
            className={cn(
              "absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-night/45 text-ink-inverse backdrop-blur-md transition-[background-color,transform] duration-(--duration-fast) hover:bg-night/65 active:scale-95",
              state === "prev" ? "right-4" : "left-4",
            )}
          >
            {state === "prev" ? <ArrowLeft className="size-5" strokeWidth={1.6} /> : <ArrowRight className="size-5" strokeWidth={1.6} />}
          </button>
        ) : null}
      </div>
      <figcaption className="mx-auto mt-8 max-w-[560px] text-center">
        <MerchantMark name={story.brand} style={story.style} className="text-ink" />
        <blockquote className="mt-4 font-serif text-[17px] leading-[1.3] text-ink-2 sm:text-[19px]">
          “{story.quote}”
        </blockquote>
        <p className="mt-3 text-[12.5px] text-ink-2">{story.person}</p>
      </figcaption>
    </figure>
  )
}
