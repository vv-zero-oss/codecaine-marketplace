import { useEffect, useRef, useState } from "react"
import { Pause, Play, SkipBack, SkipForward, Heart } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { photo, PHOTOS } from "@/lib/photos"
import { TRACKS, clock, radio, useRadio } from "@/lib/radio"
import { cn } from "@/lib/utils"

/**
 * Four little level bars driven by the radio's real output — they only
 * move when something is playing, and rest as short stubs otherwise.
 */
export function EqBars({ playing = false, className }: { playing?: boolean; className?: string }) {
  const bars = useRef<(HTMLSpanElement | null)[]>([])
  useEffect(() => {
    if (!playing) {
      bars.current.forEach((b) => b && (b.style.transform = "scaleY(0.25)"))
      return
    }
    let frame = 0
    const tick = () => {
      const levels = radio.levels(4)
      bars.current.forEach((b, i) => b && (b.style.transform = `scaleY(${0.25 + Math.min(1, levels[i] * 1.6) * 0.75})`))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  return (
    <span className={cn("flex h-3.5 items-end gap-[2px]", className)} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          ref={(el) => {
            bars.current[i] = el
          }}
          className={cn("h-full w-[3px] origin-bottom rounded-[1px] transition-transform duration-100", playing ? "bg-ember" : "bg-ink-4")}
          style={{ transform: "scaleY(0.25)" }}
        />
      ))}
    </span>
  )
}

/**
 * The footer's player: the bar's current rotation as a playlist card —
 * cover collage, play / pause, previous / next, a live progress bar and the
 * tracklist. Everything works: it is the same radio the turntable plays.
 */
export function MusicPlayer({ playlist = "Autumn rotation", className }: { playlist?: string; className?: string }) {
  const { playing, trackIndex, elapsed } = useRadio()
  const [saved, setSaved] = useState(false)
  const track = TRACKS[trackIndex]
  useCanvasAction("Player playing", (next) => ((next ?? !playing) ? radio.play() : radio.pause()), { on: playing, group: "Footer" })

  return (
    <div className={cn("overflow-hidden rounded-(--radius-panel) bg-slate text-slate-fg shadow-(--shadow-player)", className)}>
      <div className="flex gap-4 p-4">
        <div className="grid size-[104px] shrink-0 grid-cols-2 grid-rows-2 overflow-hidden rounded-(--radius-card) shadow-(--shadow-card)">
          {[PHOTOS.spinningRecord, PHOTOS.latteTable, PHOTOS.crateDig, PHOTOS.storefrontTree].map((id) => (
            <img key={id} src={photo(id, 160)} alt="" className="size-full object-cover" loading="lazy" />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="type-display text-[26px] leading-none tracking-[-0.02em]">{playlist}</p>
          <p className="mt-1 text-[13px] text-slate-fg/70">Side B Coffee · {TRACKS.length} tracks</p>
          <button
            onClick={() => setSaved((s) => !s)}
            className="mt-2 inline-flex w-fit items-center gap-1.5 text-[13px] text-slate-fg/90 transition-colors hover:text-white"
            aria-pressed={saved}
          >
            <Heart className={cn("size-4 transition-[transform,color] duration-(--duration-hover) active:scale-90", saved && "fill-honey text-honey")} />
            {saved ? "Saved" : "Save playlist"}
          </button>
          <div className="mt-auto flex items-center justify-end gap-1">
            <button onClick={() => radio.previous()} className="grid size-9 place-items-center rounded-full text-slate-fg/80 hover:bg-white/10 hover:text-white" aria-label="Previous track">
              <SkipBack className="size-4 fill-current" />
            </button>
            <button onClick={() => radio.next()} className="grid size-9 place-items-center rounded-full text-slate-fg/80 hover:bg-white/10 hover:text-white" aria-label="Next track">
              <SkipForward className="size-4 fill-current" />
            </button>
            <button
              onClick={() => radio.toggle()}
              className="ml-1 grid size-11 place-items-center rounded-full bg-slate-fg text-slate transition-transform duration-(--duration-press) hover:scale-105 active:scale-95"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-1">
        <div className="h-[3px] overflow-hidden rounded-full bg-white/15">
          <div className="h-full origin-left bg-honey transition-transform duration-300 ease-linear" style={{ transform: `scaleX(${elapsed / track.length})` }} />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10.5px] text-slate-fg/60 tabular">
          <span>{clock(elapsed)}</span>
          <span>{clock(track.length)}</span>
        </div>
      </div>

      <ol className="pb-2">
        {TRACKS.map((t, i) => {
          const current = i === trackIndex
          return (
            <li key={t.id}>
              <button
                onClick={() => radio.toggle(i)}
                className={cn("flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-white/5", current && "bg-white/[0.07]")}
                aria-current={current}
              >
                <span className="grid w-4 place-items-center font-mono text-[12px] text-slate-fg/60">{current && playing ? <EqBars playing className="h-3" /> : i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block truncate text-[14px] font-medium", current && "text-honey")}>{t.title}</span>
                  <span className="block truncate text-[12px] text-slate-fg/60">{t.artist}</span>
                </span>
                <span className="font-mono text-[12px] text-slate-fg/70 tabular">{clock(t.length)}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
