import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { IsoServer, type IsoModel } from "@/components/marks/iso-server"
import { GhostyImage } from "@/components/motion/ghosty-image"
import { Chip } from "@/components/ui/chip"
import type { Card, PanelTone } from "@/content"
import { cn } from "@/lib/utils"

/**
 * A row of cards that starts on the page's left edge and runs off its right,
 * scrolled by swipe, trackpad or the arrow button over the pictures.
 */
export function CardRail({ name, cards, className }: { name: string; cards: Card[]; className?: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [atEnd, setAtEnd] = useState(false)

  const step = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-rail-card]")
    const by = card ? card.offsetWidth + 28 : el.clientWidth * 0.8
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: by * dir, behavior: reduce ? "auto" : "smooth" })
  }

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
    update()
    el.addEventListener("scroll", update, { passive: true })
    return () => el.removeEventListener("scroll", update)
  }, [])

  useCanvasAction(
    `${name}: scrolled to the end`,
    (on) => {
      const el = track.current
      if (!el) return
      el.scrollTo({ left: (on ?? !atEnd) ? el.scrollWidth : 0 })
    },
    { on: atEnd, group: name },
  )

  return (
    <div className={cn("relative", className)}>
      <div
        ref={track}
        data-canvas-ignore
        className="no-scrollbar flex snap-x snap-mandatory scroll-pl-[max(var(--spacing-gutter),calc((100vw-var(--container-page))/2+var(--spacing-gutter)))] gap-7 overflow-x-auto overscroll-x-contain pr-gutter pl-[max(var(--spacing-gutter),calc((100vw-var(--container-page))/2+var(--spacing-gutter)))]"
      >
        {cards.map((card, i) => (
          <RailCard key={card.title} card={card} delay={i * 90} />
        ))}
      </div>
      <button
        type="button"
        aria-label={atEnd ? "Back to the first card" : "Next card"}
        onClick={() => (atEnd ? track.current?.scrollTo({ left: 0, behavior: "smooth" }) : step(1))}
        className="notch absolute top-[calc((min(80vw,26.25rem)*0.89)/2)] right-gutter hidden size-11 -translate-y-1/2 items-center justify-center bg-ink text-paper shadow-float transition-transform duration-(--duration-press) ease-(--ease-out) outline-none active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt sm:flex"
      >
        <ArrowRight
          className={cn("size-4 transition-transform duration-(--duration-hover) ease-(--ease-out)", atEnd && "rotate-180")}
        />
      </button>
    </div>
  )
}

/** One card: a picture that bleeds in, a centred title and a line under it. */
export function RailCard({ card, delay = 0, className }: { card: Card; delay?: number; className?: string }) {
  return (
    <article data-rail-card className={cn("group/card w-[min(80vw,26.25rem)] shrink-0 snap-start text-center", className)}>
      <div className="aspect-[420/374] overflow-hidden bg-hairline/40">
        {card.art ? (
          <ServerPanel model={card.art.model} tone={card.art.tone} />
        ) : (
          card.image && <GhostyImage src={card.image} alt={card.alt ?? ""} delay={delay} />
        )}
      </div>
      <h3 className="mt-7 text-title text-ink">{card.title}</h3>
      <p className="mx-auto mt-3 max-w-[18.5rem] text-small text-ink-soft">{card.body}</p>
      {card.tags && (
        <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
          {card.tags.map((tag) => (
            <li key={tag.label}>
              <Chip tone={tag.tone}>{tag.label}</Chip>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

const PANEL: Record<PanelTone, string> = {
  cobalt: "bg-cobalt",
  gold: "bg-gold",
  night: "bg-night",
  lime: "bg-lime",
  signal: "bg-signal",
}

/**
 * An isometric server on a flat colour, over the page's 9px grid. It lifts a
 * few pixels when the card is hovered with a real pointer.
 */
export function ServerPanel({ model, tone, className }: { model: IsoModel; tone: PanelTone; className?: string }) {
  return (
    <div
      className={cn(
        "group/panel relative flex size-full items-center justify-center bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-size-[var(--spacing-pixel)_var(--spacing-pixel)]",
        PANEL[tone],
        className,
      )}
    >
      <IsoServer
        model={model}
        className="h-[62%] w-[62%] transition-transform duration-(--duration-hover) ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:-translate-y-1.5"
      />
    </div>
  )
}
