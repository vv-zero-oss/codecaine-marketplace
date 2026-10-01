import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { INDUSTRIES } from "@/content"
import { cn } from "@/lib/utils"

export function IndustryCard({ title, body, className }: { title: string; body: string; className?: string }) {
  return (
    <article
      className={cn(
        "group flex h-[190px] flex-col justify-between rounded-card border border-line bg-surface p-5 shadow-card transition-[border-color,background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:bg-raised",
        className,
      )}
    >
      <h3 className="text-[18px] font-medium tracking-tight">{title}</h3>
      <p className="text-[14px] leading-snug text-muted">{body}</p>
    </article>
  )
}

export function Industries() {
  // The carousel's instance is held for the component's lifetime.
  const [viewport, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: false })
  const apiRef = useRef(api)
  apiRef.current = api
  const [slide, setSlide] = useState(0)
  const [edges, setEdges] = useState({ prev: false, next: true })

  const sync = useCallback(() => {
    const a = apiRef.current
    if (!a) return
    setSlide(a.selectedScrollSnap())
    setEdges({ prev: a.canScrollPrev(), next: a.canScrollNext() })
  }, [])
  useEffect(() => {
    if (!api) return
    sync()
    api.on("select", sync).on("reInit", sync)
    return () => void api.off("select", sync).off("reInit", sync)
  }, [api, sync])

  useCanvasAction("Industries: next card", () => api?.scrollNext(), { group: "Industries" })
  useCanvasAction("Industries: first card", () => api?.scrollTo(0), { group: "Industries" })

  return (
    <section id="industries" className="relative py-16 sm:py-24" data-slide={slide}>
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>{INDUSTRIES.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-[640px] text-[clamp(26px,2.8vw,36px)] leading-[1.1] font-medium tracking-[-0.025em] text-balance">{INDUSTRIES.title}</h2>
            <p className="mt-4 text-[15px] text-muted">{INDUSTRIES.body}</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <Button variant="outline" size="icon" aria-label="Previous" disabled={!edges.prev} onClick={() => api?.scrollPrev()} className="rounded-full">
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next" disabled={!edges.next} onClick={() => api?.scrollNext()} className="rounded-full">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </Container>
      <div ref={viewport} className="mt-10 overflow-hidden">
        <div data-canvas-ignore className="mx-auto flex w-full max-w-[1440px] gap-3.5 px-5 sm:px-8 lg:px-[42px]">
          {INDUSTRIES.cards.map((card) => (
            <IndustryCard key={card.title} {...card} className="w-[min(78vw,267px)] shrink-0 sm:w-[267px]" />
          ))}
        </div>
      </div>
    </section>
  )
}
