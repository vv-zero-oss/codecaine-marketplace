import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

export type Clip = { src: string; poster: string; label: string }

/**
 * Full-bleed footage that cuts between clips with a slow crossfade (900ms
 * ease, every `interval` seconds), the way a shop's window loop would.
 * Both videos stay mounted and muted so a cut never waits on a load.
 *
 * Reduced motion shows the first clip's still and nothing plays; while the
 * page is being designed the reel holds on its current clip. "Hero clip" in
 * the editor's Actions steps between them.
 */
export function HeroReel({
  clips,
  interval = 7,
  autoplay = true,
  className,
}: {
  clips: Clip[]
  /** seconds on each clip */
  interval?: number
  autoplay?: boolean
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const running = autoplay && !reduced && !designing

  useCanvasAction("Hero clip", (next) => setIndex((i) => (next == null ? (i + 1) % clips.length : next ? 1 : 0)), {
    on: index === 1,
    group: "Hero",
  })

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % clips.length), interval * 1000)
    return () => window.clearTimeout(id)
  }, [running, interval, clips.length, index])

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return
      if (running && i === index) void v.play().catch(() => {})
      else if (!running) v.pause()
    })
  }, [index, running])

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-cocoa", className)}>
      {clips.map((clip, i) => (
        <video
          key={clip.src}
          ref={(el) => {
            videos.current[i] = el
          }}
          src={reduced ? undefined : clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          aria-label={clip.label}
          className="absolute inset-0 size-full object-cover transition-opacity duration-(--duration-crossfade) ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 flex gap-1.5 p-[var(--spacing-gutter)] sm:justify-end">
        {clips.map((clip, i) => (
          <button key={clip.src} onClick={() => setIndex(i)} className="group/tick grid h-6 w-10 place-items-center" aria-label={`Show ${clip.label}`}>
            <span className="relative h-[2px] w-full overflow-hidden rounded-full bg-page/30">
              {i === index && (
                <motion.span
                  key={`${index}-${running}`}
                  className="absolute inset-0 origin-left bg-page"
                  initial={{ transform: running ? "scaleX(0)" : "scaleX(1)" }}
                  animate={{ transform: "scaleX(1)" }}
                  transition={{ duration: running ? interval : 0, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
