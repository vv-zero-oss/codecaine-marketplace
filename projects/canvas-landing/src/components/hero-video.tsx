import { useEffect, useRef, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * The looping screen recording in the hero's frame: the editor, building a
 * page from an empty board. Muted and inline so it autoplays everywhere; held
 * on its poster (the finished page) for reduced motion, and paused while the
 * page is being designed in the editor so it does not move under the cursor.
 *
 * Every knob is a scalar prop, and "Play video" is registered as an action so
 * the editor can switch it from the Actions row.
 */
export function HeroVideo({
  src,
  poster,
  autoplay = true,
  loop = true,
  className,
}: {
  src: string
  poster: string
  autoplay?: boolean
  loop?: boolean
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [playing, setPlaying] = useState(autoplay)
  const run = playing && !reduced && !designing

  useCanvasAction("Play video", (next) => setPlaying(next ?? !playing), { on: playing, group: "Hero" })

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (run) void video.play().catch(() => {})
    else video.pause()
  }, [run])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      loop={loop}
      preload="metadata"
      aria-label="Canvas building a page from an empty board"
      className={cn("block aspect-[16/10] w-full bg-[#2d2d2d] object-cover", className)}
    />
  )
}
