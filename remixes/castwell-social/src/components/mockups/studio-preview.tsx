import { useState } from "react"
import { Captions, Mic, Play, Ratio, Timer, Wand2 } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { useCanvasAction } from "@canvas/react"
import { AppWindow } from "@/components/mockups/kit"
import { photo, type PhotoKey } from "@/photos"
import { cn } from "@/lib/utils"

type Format = "reel" | "short" | "story" | "ad"

const FORMATS: Record<Format, { label: string; ratio: string; scenes: { img: PhotoKey; line: string }[] }> = {
  reel: {
    label: "Reel",
    ratio: "9:16 · 30s",
    scenes: [
      { img: "vlogKitchen", line: "Hook: “Five minutes, one pan.”" },
      { img: "poke", line: "Top-down build, fast cuts" },
      { img: "latte", line: "Pause on the pour" },
      { img: "mug", line: "CTA: save for Sunday" },
    ],
  },
  short: {
    label: "Short",
    ratio: "9:16 · 45s",
    scenes: [
      { img: "runner", line: "Cold open: race lights" },
      { img: "shoe", line: "Lace-up close-up" },
      { img: "hiker", line: "Trail b-roll, captions on" },
      { img: "lake", line: "End card + subscribe" },
    ],
  },
  story: {
    label: "Story",
    ratio: "9:16 · 15s",
    scenes: [
      { img: "street", line: "New in: autumn edit" },
      { img: "red", line: "Swipe for colour" },
      { img: "vlogStreet", line: "Behind the shoot" },
      { img: "ringLight", line: "Poll: which one?" },
    ],
  },
  ad: {
    label: "Ad",
    ratio: "1:1 · 20s",
    scenes: [
      { img: "serum", line: "Problem in one line" },
      { img: "skincare", line: "Product hero shot" },
      { img: "maya", line: "Customer quote" },
      { img: "mug", line: "Offer + shop button" },
    ],
  },
}

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * The video studio: a prompt on the left, the storyboard it produced in the
 * middle, the render queue on the right. The format tabs swap the storyboard.
 */
export function StudioPreview({ className }: { className?: string }) {
  const [format, setFormat] = useState<Format>("reel")
  const reduce = useReducedMotion()
  ;(Object.keys(FORMATS) as Format[]).forEach((f) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Format: ${FORMATS[f].label}`, () => setFormat(f), { on: format === f, group: "Video studio" })
  })
  const current = FORMATS[format]

  return (
    <AppWindow className={cn("grid grid-cols-1 text-left lg:grid-cols-[300px_1fr_260px]", className)}>
      {/* prompt */}
      <div className="flex flex-col gap-4 border-b border-line p-5 lg:border-r lg:border-b-0">
        <p className="text-[13px] font-semibold text-ink">Brief</p>
        <div className="min-h-28 border border-line bg-page p-3 text-[13px] leading-relaxed text-ink-soft">
          Turn our Sunday recipe post into a quick vertical video. Warm light, fast cuts, captions on, end with “save it
          for later”.
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {[
            [Ratio, current.ratio],
            [Mic, "Voice: Ines (warm)"],
            [Captions, "Captions: on"],
            [Timer, "Pace: fast"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Ratio
            return (
              <span key={label as string} className="flex items-center gap-1.5 border border-line bg-page px-2 py-1.5 text-ink-soft">
                <I className="size-3" /> {label as string}
              </span>
            )
          })}
        </div>
        <button
          type="button"
          className="mt-auto inline-flex h-10 cursor-pointer items-center justify-center gap-2 bg-ink text-[13px] font-medium text-page transition-transform duration-150 active:scale-[0.97]"
        >
          <Wand2 className="size-3.5" /> Generate video
        </button>
      </div>

      {/* storyboard */}
      <div className="min-w-0 border-b border-line p-5 lg:border-b-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] font-semibold text-ink">Storyboard</p>
          <div role="tablist" className="flex border border-line bg-page">
            {(Object.keys(FORMATS) as Format[]).map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={format === f}
                type="button"
                onClick={() => setFormat(f)}
                className={cn(
                  "h-8 cursor-pointer px-3 text-[12px] font-medium transition-colors duration-150",
                  format === f ? "bg-ink text-page" : "text-muted hover:text-ink",
                )}
              >
                {FORMATS[f].label}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={format}
            initial={reduce ? false : { opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {current.scenes.map((s, i) => (
              <figure key={s.img + i} className="flex flex-col gap-2">
                <div className={cn("relative overflow-hidden bg-sage-deep", format === "ad" ? "aspect-square" : "aspect-[9/16]")}>
                  <img src={photo(s.img, 400)} alt={`Scene ${i + 1}`} className="size-full object-cover" loading="lazy" />
                  <span className="absolute top-2 left-2 bg-page/90 px-1.5 py-0.5 text-[10px] font-medium text-ink tabular-nums">0{i + 1}</span>
                  {i === 0 && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid size-9 place-items-center rounded-full bg-page/90 text-ink">
                        <Play className="size-3.5 fill-current" />
                      </span>
                    </span>
                  )}
                </div>
                <figcaption className="text-[11px] leading-snug text-ink-soft">{s.line}</figcaption>
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* render queue */}
      <div className="flex flex-col gap-3 p-5 lg:border-l lg:border-line">
        <p className="text-[13px] font-semibold text-ink">Render queue</p>
        {[
          { name: "Recipe reel · 9:16", pct: 100, tone: "bg-mint" },
          { name: "Recipe reel · 1:1", pct: 72, tone: "bg-periwinkle", live: true },
          { name: "Founder Q&A · Short 2", pct: 38, tone: "bg-periwinkle", live: true },
          { name: "Autumn ad · 4:5", pct: 0, tone: "bg-sage-deep" },
        ].map((r) => (
          <div key={r.name} className="border border-line bg-page p-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="truncate text-ink">{r.name}</span>
              <span className="text-muted tabular-nums">{r.pct === 100 ? "Ready" : r.pct ? `${r.pct}%` : "Queued"}</span>
            </div>
            <div className="mt-2 h-1 bg-sage-deep">
              <div
                className={cn("h-full origin-left", r.tone, r.live && "motion-safe:animate-[render_2.4s_var(--ease-in-out)_infinite_alternate]")}
                style={{ width: `${Math.max(r.pct, 2)}%` }}
              />
            </div>
          </div>
        ))}
        <p className="mt-auto text-[11px] leading-snug text-muted">Average render 90s. Captions and resizes included.</p>
      </div>
    </AppWindow>
  )
}
