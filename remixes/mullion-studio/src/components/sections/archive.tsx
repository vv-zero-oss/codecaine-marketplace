import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { AnimatePresence, motion, useScroll } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { CATEGORIES, useArchive } from "@/components/archive-state"
import { useScrollLock, useScrollTo } from "@/components/smooth-scroll"
import { useViewport } from "@/components/use-viewport"
import { BracketButton } from "@/components/ui/bracket-button"
import { ScrambleText } from "@/components/motion/scramble-text"
import type { Frame } from "@/frames"
import { EASE_OUT_QUINT } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { ArchiveGallery } from "./archive-gallery"
import { ArchiveGrid, fieldLayout, type IntroPhase } from "./archive-grid"
import { ArchiveList } from "./archive-list"

const INTRO_LINE =
  "Every building is photographed twice: once on site, and once again at the desk. Mullion is the desk."

/** `?intro=0` (or reduced motion) opens straight onto the field. */
function introWanted() {
  const params = new URLSearchParams(window.location.search)
  return params.get("intro") !== "0" && !params.has("only") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * The opening section: the archive of edited frames, seen as a panning field
 * (grid), a ledger (list) or one frame at a time (gallery). It opens with a
 * line that resolves out of noise, a tight cluster of frames that pops in one
 * by one, and the cluster flying apart into the field.
 */
export function Archive() {
  const { view, setView, setIntroDone, openInStudio } = useArchive()
  const { designing } = useCanvasDesignMode()
  const { w, h } = useViewport()
  const scrollTo = useScrollTo()
  const setLocked = useScrollLock()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [phase, setPhase] = useState<IntroPhase>(() => (introWanted() ? "text" : "done"))

  // While the page is being designed the intro is held at its end state, so
  // the field is there to click; "Replay intro" plays it on demand.
  useEffect(() => {
    if (designing) setPhase("done")
  }, [designing])

  useCanvasAction("Replay intro", () => {
    setView("grid")
    window.scrollTo(0, 0)
    setPhase("text")
  }, { group: "Archive" })
  useCanvasAction("Grid view", () => setView("grid"), { group: "Archive", on: view === "grid" })
  useCanvasAction("List view", () => setView("list"), { group: "Archive", on: view === "list" })
  useCanvasAction("Gallery view", () => setView("gallery"), { group: "Archive", on: view === "gallery" })

  // text → (scramble done) → cluster → spread → done
  useEffect(() => {
    if (phase === "cluster") {
      const t = setTimeout(() => setPhase("spread"), 120 + 13 * 110 + 450)
      return () => clearTimeout(t)
    }
    if (phase === "spread") {
      const t = setTimeout(() => setPhase("done"), 1150)
      return () => clearTimeout(t)
    }
  }, [phase])

  useEffect(() => {
    setLocked(phase !== "done")
    if (phase === "spread" || phase === "done") setIntroDone(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const open = (frame: Frame) => {
    openInStudio(frame)
    scrollTo("#studio", { offset: -8 })
  }

  const pan = fieldLayout(w, h).pan

  return (
    <section
      id="archive"
      ref={ref}
      className="relative"
      style={{ height: view === "grid" ? h + pan : undefined }}
      aria-label="Archive of edited frames"
    >
      <AnimatePresence mode="wait" initial={false}>
        {view === "grid" && (
          <motion.div key="grid" className="sticky top-0 h-svh overflow-hidden" exit={{ opacity: 1 }}>
            <ArchiveGrid w={w} h={h} progress={scrollYProgress} phase={phase} onOpen={open} />
            <ArchiveToolbar className="absolute inset-x-0 top-[68px] z-10" hidden={phase !== "done"} />
            <ScrollCue hidden={phase !== "done"} progress={scrollYProgress} />
          </motion.div>
        )}
        {view === "list" && (
          <motion.div key="list" className="min-h-svh pt-[68px]" exit={{ opacity: 1 }}>
            <ArchiveToolbar className="mb-6" />
            <ArchiveList onOpen={open} />
          </motion.div>
        )}
        {view === "gallery" && (
          <motion.div key="gallery" exit={{ opacity: 1 }}>
            <ArchiveGallery w={w} h={h} onOpen={open} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "text" && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50 grid place-items-center px-gutter"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <p className="max-w-[46ch] text-body leading-[1.45] text-ink-2">
              <ScrambleText text={INTRO_LINE} duration={2000} onDone={() => setTimeout(() => setPhase("cluster"), 450)} />
            </p>
            <div className="absolute bottom-[max(2rem,6vh)]">
              <BracketButton onClick={() => setPhase("cluster")}>Skip</BracketButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/**
 * FILTERS [+] on the left opens a row of building types; SEARCH on the right
 * becomes a field. Both dim what does not match instead of reflowing the field.
 */
function ArchiveToolbar({ className, hidden }: { className?: string; hidden?: boolean }) {
  const { filter, setFilter, query, setQuery } = useArchive()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  useCanvasAction("Filters open", (next) => setFiltersOpen(next ?? !filtersOpen), { group: "Archive", on: filtersOpen })
  useCanvasAction("Search open", (next) => setSearching(next ?? !searching), { group: "Archive", on: searching })

  return (
    <motion.div
      className={cn("px-gutter", className)}
      initial={false}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.5, delay: hidden ? 0 : 0.2 }}
      style={{ pointerEvents: hidden ? "none" : undefined }}
    >
      <div className="flex items-center justify-between gap-4 text-ui uppercase tracking-ui">
        <button
          type="button"
          className="min-h-11 uppercase tracking-ui md:min-h-8"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((o) => !o)}
        >
          Filters <span className="text-muted">[{filtersOpen ? "−" : "+"}]</span>
          {filter && <span className="ml-3 text-blueprint">{filter}</span>}
        </button>
        {searching ? (
          <label className="flex items-center gap-2">
            <span className="sr-only">Search frames</span>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && (setQuery(""), setSearching(false))}
              onBlur={() => !query && setSearching(false)}
              placeholder="NAME, CITY, EDIT"
              className="w-40 border-b border-ink bg-transparent py-1 text-base uppercase tracking-ui outline-none placeholder:text-faint sm:w-56 md:text-ui"
            />
          </label>
        ) : (
          <button type="button" className="min-h-11 uppercase tracking-ui hover:underline md:min-h-8" onClick={() => setSearching(true)}>
            Search
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {filtersOpen && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_QUINT }}
          >
            <div className="flex flex-wrap gap-x-5 gap-y-1 bg-paper/85 py-2 backdrop-blur-sm">
              <BracketButton active={!filter} onClick={() => setFilter(null)}>
                All
              </BracketButton>
              {CATEGORIES.map((c) => (
                <BracketButton key={c} active={filter === c} onClick={() => setFilter(filter === c ? null : c)}>
                  {c}
                </BracketButton>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/** A hairline at the foot of the field that fills as the field is panned. */
function ScrollCue({ hidden, progress }: { hidden: boolean; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-gutter bottom-4 z-10 flex items-center gap-4 text-ui uppercase tracking-ui"
      initial={false}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.6, delay: hidden ? 0 : 0.5 }}
    >
      <span className="bg-paper px-1 whitespace-nowrap">Scroll the archive</span>
      <span className="relative h-px flex-1 bg-hairline">
        <motion.span className="absolute inset-y-0 left-0 w-full origin-left bg-ink" style={{ scaleX: progress }} />
      </span>
      <span className="hidden bg-paper px-1 text-muted sm:inline">Click a frame to edit it</span>
    </motion.div>
  )
}
