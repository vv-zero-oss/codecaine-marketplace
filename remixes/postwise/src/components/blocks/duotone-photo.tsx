import { cn } from "@/lib/utils"

import type { StoryTone } from "@/content"

const INK: Record<StoryTone, string> = {
  teal: "bg-duo-teal",
  apricot: "bg-duo-apricot",
  sky: "bg-duo-sky",
}
const PAPER: Record<StoryTone, string> = {
  teal: "bg-duo-teal-paper",
  apricot: "bg-duo-apricot-paper",
  sky: "bg-duo-sky-paper",
}

/**
 * A photograph printed in two colours: the picture in greyscale multiplied
 * onto a pale paper, then the ink screened over it so the shadows take its
 * colour. A faint grid over the top, as a studio backdrop would carry.
 */
export function DuotonePhoto({
  src = "",
  alt = "",
  tone = "teal",
  grid = true,
  className,
}: {
  src?: string
  alt?: string
  tone?: StoryTone
  grid?: boolean
  className?: string
}) {
  return (
    <div className={cn("relative isolate overflow-hidden", PAPER[tone], className)}>
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 size-full object-cover grayscale contrast-[1.35] brightness-[0.92] mix-blend-multiply" />
      <div aria-hidden className={cn("absolute inset-0 mix-blend-screen", INK[tone])} />
      {grid && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255 / 0.7) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.7) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
      )}
    </div>
  )
}
