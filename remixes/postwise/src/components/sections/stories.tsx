import { useEffect, useState } from "react"
import { ArrowRight, Play } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { DuotonePhoto } from "@/components/blocks/duotone-photo"
import { Reveal } from "@/components/motion/reveal"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { STORIES, type LogoKey, type StoryTone } from "@/content"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

const WASH: Record<StoryTone, string> = {
  teal: "from-duo-teal-paper/70",
  apricot: "from-duo-apricot-paper/80",
  sky: "from-duo-sky-paper/80",
}

/** One customer story: who, what they changed, and the film of it. */
export function StoryCard({
  logo = "stripe",
  title = "",
  name = "",
  role = "",
  photo = 5717729,
  tone = "teal",
  cta = "Watch video",
}: {
  logo?: LogoKey
  title?: string
  name?: string
  role?: string
  photo?: number
  tone?: StoryTone
  cta?: string
}) {
  return (
    <article
      className={cn(
        "grid h-full gap-6 rounded-[24px] bg-gradient-to-br to-card p-5 shadow-(--shadow-card) sm:grid-cols-[1fr_1.05fr] sm:gap-8",
        WASH[tone],
      )}
    >
      <div className="order-2 flex flex-col gap-5 p-2 sm:order-1 sm:py-6 sm:pl-5">
        <BrandLogo logo={logo} scale={1.25} />
        <h3 className="text-[clamp(24px,2.4vw,34px)] leading-[1.12] font-medium tracking-[-0.02em] text-ink text-balance">{title}</h3>
        <p className="flex flex-col text-[14px] leading-snug">
          <span className="font-medium text-ink">{name}</span>
          <span className="text-ink-muted">{role}</span>
        </p>
        <a href="#stories" className="group mt-auto inline-flex w-fit items-center gap-2 text-[18px] font-medium text-ink">
          {cta}
          <ArrowRight className="size-5 transition-transform duration-(--duration-hover) ease-(--ease-out-quint) group-hover:translate-x-1" />
        </a>
      </div>
      <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[20px] sm:order-2">
        <DuotonePhoto src={pexels(photo, 640)} alt={name} tone={tone} className="absolute inset-0" />
        <button
          type="button"
          aria-label={`Play: ${title}`}
          className="absolute bottom-5 left-5 grid size-[68px] place-items-center rounded-full bg-lagoon text-white shadow-(--shadow-float) transition-transform duration-(--duration-hover) ease-(--ease-out-quint) hover:scale-105 active:scale-95"
        >
          <Play className="ml-1 size-7 fill-current" />
        </button>
      </div>
    </article>
  )
}

/**
 * Customer stories in a carousel that shows its neighbours at the edges.
 * Embla holds the scroll; its API is kept in state for the section's
 * lifetime, and every story is an action in the editor.
 */
export function Stories({ start = 1 }: { start?: number }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(start)

  useEffect(() => {
    if (!api) return
    api.scrollTo(start, true)
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api, start])

  STORIES.items.forEach((story, i) => {
    // Fixed order and count, so the hooks line up render to render.
    useCanvasAction(story.name, (next) => next !== false && api?.scrollTo(i), { on: current === i, group: "Stories" })
  })

  return (
    <section id="customers" className="overflow-hidden py-section">
      <Reveal className="mx-auto max-w-[1200px] px-gutter text-center">
        <h2 className="text-[clamp(38px,6vw,84px)] leading-[1.02] font-medium tracking-[-0.04em] text-balance text-ink">{STORIES.title}</h2>
      </Reveal>
      <Reveal y={32} className="mt-14 md:mt-20">
        <Carousel setApi={setApi} opts={{ align: "center", loop: true, startIndex: start }} className="w-full">
          <CarouselContent className="-ml-4 md:-ml-8">
            {STORIES.items.map((story) => (
              <CarouselItem key={story.name} className="basis-[88%] pl-4 sm:basis-[78%] md:pl-8 lg:basis-[800px]">
                <StoryCard {...story} cta={STORIES.cta} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-1.5">
          {STORIES.items.map((story, i) => (
            <button
              key={story.name}
              type="button"
              aria-label={`Show story ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className="grid size-11 place-items-center"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-(--duration-swap) ease-(--ease-out-quint)",
                  current === i ? "w-6 bg-ink" : "w-1.5 bg-line-strong",
                )}
              />
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
