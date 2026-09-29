import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

import { useArchive } from "@/components/archive-state"
import { BracketButton } from "@/components/ui/bracket-button"
import { FRAMES, type Frame } from "@/frames"
import { photo } from "@/lib/image"
import { EASE_IN_OUT_QUART } from "@/lib/motion"

/**
 * The archive one frame at a time, full-bleed. Each new frame is wiped in
 * from the side it came from, behind a hairline of ink — the same wipe the
 * studio reveals an edit with.
 */
export function ArchiveGallery({ w, h, onOpen }: { w: number; h: number; onOpen: (frame: Frame) => void }) {
  const { matches } = useArchive()
  const frames = FRAMES.filter(matches)
  const [[index, dir], setIndex] = useState<[number, 1 | -1]>([0, 1])
  const current = frames[Math.min(index, frames.length - 1)]

  const step = (by: 1 | -1) => setIndex(([i]) => [(i + by + frames.length) % frames.length, by])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  if (!current) return <p className="grid h-svh place-items-center text-muted">Nothing matches the filter.</p>

  return (
    <motion.div
      className="relative h-svh overflow-hidden bg-paper-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={current.id}
          custom={dir}
          className="absolute inset-0"
          variants={{
            enter: (d: number) => ({ clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }),
            center: { clipPath: "inset(0 0% 0 0%)", filter: "brightness(1)" },
            // The outgoing frame stays under the wipe and dims as it is covered.
            exit: { filter: "brightness(0.65)" },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9, ease: EASE_IN_OUT_QUART }}
        >
          <img
            src={photo(current.id, Math.min(w, 1920), Math.min(h, 1200), 1.5)}
            alt={current.alt}
            className="size-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Tap either half to step, as well as the buttons. */}
      <button type="button" aria-label="Previous frame" className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize" onClick={() => step(-1)} />
      <button type="button" aria-label="Next frame" className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize" onClick={() => step(1)} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-paper px-gutter py-3">
        <span className="text-ui uppercase tracking-ui">
          <span className="tabular-nums">{String(current.n).padStart(3, "0")}</span>
          <span className="ml-4">{current.name}</span>
          <span className="ml-4 hidden text-muted sm:inline">{current.place} · {current.edit}</span>
        </span>
        <span className="pointer-events-auto flex items-center gap-2">
          <BracketButton onClick={() => step(-1)}>Prev</BracketButton>
          <span className="w-20 text-center text-ui tabular-nums text-muted">
            {index + 1} / {frames.length}
          </span>
          <BracketButton onClick={() => step(1)}>Next</BracketButton>
          <BracketButton solid className="ml-2 hidden sm:inline-flex" onClick={() => onOpen(current)}>
            Open in studio
          </BracketButton>
        </span>
      </div>
    </motion.div>
  )
}
