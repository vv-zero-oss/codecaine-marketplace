import { useEffect, useRef } from "react"
import { useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import type { Film as FilmData } from "@/content"

/**
 * A short, silent Pexels loop filling its box.
 *
 * It only loads once it is near the window and only plays while it is in
 * view, so a page of films costs what the visible ones cost. Under reduced
 * motion it stays on its poster frame: a still picture, no movement.
 */
export function Film({ film, className }: { film: FilmData; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const near = useInView(ref, { margin: "50% 0px 50% 0px", once: true })
  const visible = useInView(ref, { margin: "10% 0px 10% 0px" })
  const reduced = useReducedMotion()

  useEffect(() => {
    const video = ref.current
    if (!video || !near) return
    if (visible && !reduced) video.play().catch(() => {})
    else video.pause()
  }, [near, visible, reduced])

  // The poster also sits under the film as a picture, so the frame is never
  // empty: while the film loads, and where a browser will not autoplay it.
  return (
    <>
      <img src={film.poster} alt="" loading="lazy" decoding="async" draggable={false} className={cn("absolute inset-0 size-full object-cover", className)} />
      <video
      ref={ref}
      src={near ? film.src : undefined}
      poster={film.poster}
      aria-label={film.alt}
      muted
      loop
      playsInline
      preload="none"
      className={cn("absolute inset-0 size-full object-cover", className)}
      />
    </>
  )
}
