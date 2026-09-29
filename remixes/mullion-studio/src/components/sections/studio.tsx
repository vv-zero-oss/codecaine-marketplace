import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { animate, AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { useArchive } from "@/components/archive-state"
import { ImageCompare } from "@/components/motion/image-compare"
import { BracketButton } from "@/components/ui/bracket-button"
import { Container } from "@/components/ui/container"
import { MetaItem } from "@/components/ui/meta-item"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FRAMES, type Edit } from "@/frames"
import { photo } from "@/lib/image"
import { EASE_IN_OUT_QUART, EASE_OUT_QUINT } from "@/lib/motion"

/** What each edit does, and how the raw frame looks before it. */
export const EDITS: Record<
  Edit,
  { brief: string[]; filter: string; seconds: number; model: string; sample: number }
> = {
  Relight: {
    brief: [
      "Shot at noon, the facade went flat and the glazing went black. Relight moves the sun to the hour the building was designed for, and turns the interior lamps on behind the glass.",
      "Shadows are recast from the massing, not painted on, so reveals and overhangs read the way they do on site.",
    ],
    filter: "brightness(0.58) saturate(0.45) contrast(0.88) hue-rotate(-10deg)",
    seconds: 11,
    model: "Relight 2.1",
    sample: 4933643,
  },
  Sky: {
    brief: [
      "A white sky on the one day the photographer could come. Sky replaces it with one that matches the sun already in the frame — its direction, its height, its colour.",
      "Edges around mullions, railings and trees are kept to the pixel, so nothing halos against the new sky.",
    ],
    filter: "grayscale(0.85) brightness(1.18) contrast(0.72)",
    seconds: 7,
    model: "Sky 3.0",
    sample: 12903905,
  },
  Season: {
    brief: [
      "The planting went in last month and the render promised a summer. Season grows the landscape to the year the scheme is really about, without touching the architecture.",
      "Choose the month: bare branches, first leaf, high summer or turn of autumn — the light follows.",
    ],
    filter: "sepia(0.6) saturate(0.6) hue-rotate(-14deg) brightness(1.04)",
    seconds: 14,
    model: "Season 1.4",
    sample: 740587,
  },
  Grade: {
    brief: [
      "Forty frames from three shoots, each with its own white balance. Grade matches every frame in a set to the one you pick as the reference, so a project reads as one body of work.",
      "Materials keep their colour: the oak stays oak, the concrete stays concrete.",
    ],
    filter: "contrast(0.78) saturate(0.55) brightness(1.1) sepia(0.14)",
    seconds: 4,
    model: "Grade 2.6",
    sample: 29012619,
  },
}

const MODES = Object.keys(EDITS) as Edit[]

/**
 * The studio: one frame, raw against edited. The brief on the left, the frame
 * in the middle with its split, its spec sheet on the right — and a timeline
 * whose knob is the split, so pressing play sweeps the edit across the frame.
 */
export function Studio() {
  const { studioRequest } = useArchive()
  const { designing } = useCanvasDesignMode()
  const reduced = useReducedMotion()
  const [mode, setMode] = useState<Edit>("Relight")
  const [frameId, setFrameId] = useState<number | null>(null)
  const [position, setPosition] = useState(50)
  const [playing, setPlaying] = useState(false)
  const [briefOpen, setBriefOpen] = useState(true)
  const sweep = useRef<ReturnType<typeof animate> | null>(null)

  for (const m of MODES) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`${m} edit`, () => choose(m), { group: "Studio", on: mode === m })
  }
  useCanvasAction("Brief open", (next) => setBriefOpen(next ?? !briefOpen), { group: "Studio", on: briefOpen })
  useCanvasAction("Show raw", () => setPosition(100), { group: "Studio", on: position >= 99 })
  useCanvasAction("Show edit", () => setPosition(0), { group: "Studio", on: position <= 1 })

  // A frame opened from the archive lands here with its own edit.
  useEffect(() => {
    if (!studioRequest) return
    stop()
    setMode(studioRequest.edit)
    setFrameId(studioRequest.frame.id)
    setPosition(50)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studioRequest])

  const choose = (m: Edit) => {
    stop()
    setMode(m)
    setFrameId(null)
    setPosition(50)
  }

  const stop = () => {
    sweep.current?.stop()
    sweep.current = null
    setPlaying(false)
  }

  // Play: the split sweeps from raw to fully edited and settles back in the
  // middle — the whole edit shown in one pass.
  const play = () => {
    if (playing) return stop()
    if (reduced) return setPosition((p) => (p > 50 ? 0 : 100))
    setPlaying(true)
    sweep.current = animate(100, 0, {
      duration: 2.4,
      ease: EASE_IN_OUT_QUART,
      onUpdate: setPosition,
      onComplete: () => {
        sweep.current = animate(0, 50, { duration: 0.9, ease: EASE_OUT_QUINT, onUpdate: setPosition, onComplete: stop })
      },
    })
  }
  useEffect(() => () => sweep.current?.stop(), [])
  useEffect(() => {
    if (designing) stop()
  }, [designing])

  const edit = EDITS[mode]
  const id = frameId ?? edit.sample
  const frame = FRAMES.find((f) => f.id === id) ?? FRAMES[0]

  return (
    <section id="studio" className="relative scroll-mt-16 py-section" aria-labelledby="studio-title">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline pb-3">
          <h2 id="studio-title" className="flex gap-6 text-ui uppercase tracking-ui">
            <span className="tabular-nums">{String(frame.n).padStart(3, "0")}</span>
            <span>The studio</span>
            <span className="hidden text-muted sm:inline">Drag the split, or press play</span>
          </h2>
          <Tabs value={mode} onValueChange={(v) => choose(v as Edit)}>
            <TabsList variant="line" className="h-auto flex-wrap justify-start gap-x-5 gap-y-1 p-0">
              {MODES.map((m) => (
                <TabsTrigger
                  key={m}
                  value={m}
                  className="group/tab h-auto min-h-11 flex-none gap-[0.9em] rounded-none px-0 py-0 text-ui font-normal uppercase tracking-ui text-ink after:hidden hover:text-ink data-[state=active]:text-ink md:min-h-8"
                >
                  <span className="font-light text-muted">[</span>
                  <span className="decoration-1 underline-offset-[5px] group-hover/tab:underline group-data-[state=active]/tab:underline">{m}</span>
                  <span className="font-light text-muted">]</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-[4vw]">
          {/* Brief and timeline */}
          <div className="order-2 flex flex-col gap-8 lg:order-1">
            <div>
              <div className="mb-4 flex items-center justify-between text-ui uppercase tracking-ui">
                <span>Brief</span>
                <button
                  type="button"
                  className="min-h-11 px-1 text-ink md:min-h-0"
                  aria-expanded={briefOpen}
                  onClick={() => setBriefOpen((o) => !o)}
                >
                  <span className="text-muted">[</span> {briefOpen ? "−" : "+"} <span className="text-muted">]</span>
                </button>
              </div>
              <AnimatePresence initial={false} mode="wait">
                {briefOpen && (
                  <motion.div
                    key={mode}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_OUT_QUINT }}
                    className="overflow-hidden"
                  >
                    {edit.brief.map((line, i) => (
                      <p key={i} className="mb-4 max-w-[52ch] text-body text-muted">
                        {line}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Timeline position={position} playing={playing} onPlay={play} onSeek={(p) => (stop(), setPosition(p))} />

            <div className="mt-auto hidden lg:block">
              <MetaItem label="Model">{edit.model}</MetaItem>
            </div>
          </div>

          {/* The frame */}
          <div className="order-1 lg:order-2">
            <ImageCompare
              src={photo(frame.id, 720, 900)}
              alt={frame.alt}
              beforeFilter={edit.filter}
              position={position}
              onPositionChange={(p) => (stop(), setPosition(Math.max(0, Math.min(100, p))))}
              className="aspect-[4/5] w-full"
            />
          </div>

          {/* Spec sheet */}
          <div className="order-3 grid content-end gap-y-6 lg:pb-2">
            <MetaItem label="Project">{frame.name}</MetaItem>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              <MetaItem label="Location">{frame.place}</MetaItem>
              <MetaItem label="Type">{frame.category}</MetaItem>
              <MetaItem label="Edit">{mode}</MetaItem>
              <MetaItem label="Render time">{edit.seconds} seconds</MetaItem>
              <MetaItem label="Output">Full resolution, 16-bit TIFF</MetaItem>
              <MetaItem label="Photograph">{frame.by} / Pexels</MetaItem>
            </div>
            <div className="flex flex-wrap gap-5 pt-2">
              <BracketButton solid onClick={play}>
                {playing ? "Stop" : "Play the edit"}
              </BracketButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/**
 * The split as a timeline: the percentage edited, a track with a square knob
 * where the split is, and [ ▸ ] to sweep it.
 */
function Timeline({
  position,
  playing,
  onPlay,
  onSeek,
}: {
  position: number
  playing: boolean
  onPlay: () => void
  onSeek: (position: number) => void
}) {
  const edited = Math.round(100 - position)
  const track = useRef<HTMLDivElement>(null)
  const seek = (clientX: number) => {
    const box = track.current?.getBoundingClientRect()
    if (box) onSeek(100 - Math.max(0, Math.min(100, ((clientX - box.left) / box.width) * 100)))
  }
  return (
    <div className="flex items-center gap-4 text-ui tabular-nums">
      <span className="w-12">{String(edited).padStart(2, "0")}%</span>
      <div
        ref={track}
        className="relative flex h-11 flex-1 cursor-pointer touch-none items-center"
        onPointerDown={(e) => {
          ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
          seek(e.clientX)
        }}
        onPointerMove={(e) => e.buttons === 1 && seek(e.clientX)}
        aria-hidden
      >
        <span className="h-px w-full bg-hairline" />
        <span className="absolute left-0 h-px bg-ink" style={{ width: `${edited}%` }} />
        <span className="absolute size-[7px] -translate-x-1/2 bg-ink" style={{ left: `${edited}%` }} />
      </div>
      <button type="button" onClick={onPlay} className="min-h-11 px-1 md:min-h-0" aria-label={playing ? "Stop" : "Play the edit"}>
        <span className="text-muted">[</span> {playing ? "■" : "▸"} <span className="text-muted">]</span>
      </button>
    </div>
  )
}
