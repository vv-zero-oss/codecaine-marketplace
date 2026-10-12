import { BookOpen, Code2, Dice5, Flame, Heart, Leaf, Music2, Sparkles } from "lucide-react"

import type { FeteEvent, PosterStyle } from "@/content/events"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

const MARKS = { flame: Flame, sparkles: Sparkles, heart: Heart, music: Music2, book: BookOpen, code: Code2, leaf: Leaf, dice: Dice5 }

const FACE: Record<PosterStyle["type"], string> = {
  block: "font-(family-name:--font-block) uppercase leading-[0.86] tracking-[-0.01em]",
  outline: "font-(family-name:--font-block) uppercase leading-[0.86] tracking-[0.01em] [-webkit-text-stroke:1.4px_currentColor] text-transparent",
  serif: "font-(family-name:--font-serif) leading-[0.9] tracking-[-0.02em]",
  script: "font-(family-name:--font-script) leading-[0.85] -rotate-6",
}

const PLACE = { top: "justify-start", center: "justify-center", bottom: "justify-end" }

/**
 * An event's artwork: a photograph with the title set over it, or a flat
 * colour with a mark — drawn in the page, so it is real type that scales,
 * not a flattened image. The poster's own face (block, serif, script,
 * outline) never leaks into the interface around it.
 */
export function PosterArt({
  poster,
  className,
  titleScale = 1,
}: {
  poster: PosterStyle
  className?: string
  /** Multiplies the title size, for big previews. */
  titleScale?: number
}) {
  const Mark = poster.mark ? MARKS[poster.mark] : null
  return (
    <div
      className={cn("@container relative isolate flex size-full flex-col overflow-hidden p-[8%]", PLACE[poster.place], className)}
      style={{ background: poster.ground, color: poster.ink }}
    >
      {poster.photo ? (
        <>
          <img src={pexels(poster.photo, 480, 480)} alt="" loading="lazy" draggable={false} className="absolute inset-0 -z-10 size-full object-cover" />
          {poster.title && (
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 -z-10",
                poster.place === "top" && "bg-linear-to-b from-black/45 via-black/5 to-transparent",
                poster.place === "bottom" && "bg-linear-to-t from-black/50 via-black/5 to-transparent",
                poster.place === "center" && "bg-black/15",
              )}
            />
          )}
        </>
      ) : (
        Mark && <Mark aria-hidden strokeWidth={1.5} className="absolute -right-[10%] -bottom-[12%] -z-10 size-[70%] opacity-25" />
      )}
      {poster.title && (
        <p
          className={cn("text-center whitespace-pre-line", FACE[poster.type])}
          style={{ fontSize: `calc(${poster.type === "script" ? 24 : poster.type === "serif" ? 20 : 21}cqw * ${titleScale})` }}
        >
          {poster.title}
        </p>
      )}
      {poster.kicker && (
        <p className="mt-[5%] text-center text-[max(6px,6.4cqw)] font-semibold tracking-[0.06em] uppercase opacity-90">{poster.kicker}</p>
      )}
    </div>
  )
}

/**
 * The poster as the reference frames it: a square of artwork inset in a
 * white mat with a soft, wide shadow, like a print resting on a table.
 */
export function Poster({ event, className, size }: { event: FeteEvent; className?: string; size?: number }) {
  return (
    <figure
      className={cn("rounded-(--radius-poster) bg-raised p-[5px] shadow-(--shadow-poster)", className)}
      style={size ? { width: size, height: size } : undefined}
    >
      <PosterArt poster={event.poster} className="rounded-[10px]" />
      <figcaption className="sr-only">{event.name}</figcaption>
    </figure>
  )
}
