import { useMemo, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { STORIES, TRADES, type Trade } from "@/content/stories"
import { photo } from "@/lib/photos"
import { useReader } from "@/lib/reader"
import { cn } from "@/lib/utils"

/**
 * The index of makers, set loud: every name in the display serif, one per
 * line. Filter by trade; hover a name and their photograph follows the
 * pointer on a spring (fine pointers only — on touch, a tap opens the story).
 */
export function MakersIndex({
  id,
  title = "Index",
  size = "display",
}: {
  id?: string
  title?: string
  /** How loud the names are set. */
  size?: "display" | "h1"
}) {
  const [trade, setTrade] = useState<Trade | "All">("All")
  const [hovered, setHovered] = useState<string | null>(null)
  const { openStory } = useReader()
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  const list = useMemo(() => STORIES.filter((s) => trade === "All" || s.trade === trade).sort((a, b) => a.name.localeCompare(b.name)), [trade])
  const counts = useMemo(() => Object.fromEntries(TRADES.map((t) => [t, STORIES.filter((s) => s.trade === t).length])), [])
  useCanvasAction("Index: Ceramics only", (next) => setTrade((next ?? trade !== "Ceramics") ? "Ceramics" : "All"), { on: trade === "Ceramics", group: "Index" })

  const hoverStory = STORIES.find((s) => s.slug === hovered)

  return (
    <section
      id={id}
      className="relative px-gutter py-section"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
    >
      <div className="flex flex-col gap-6 border-b border-rule pb-4 md:flex-row md:items-end md:justify-between">
        <h2 className="type-title text-[19px] text-ink">
          {title} <span className="text-ink-3 tabular-nums">({list.length})</span>
        </h2>
        <div className="-mx-1 flex flex-wrap gap-1.5" role="group" aria-label="Filter by trade">
          {(["All", ...TRADES] as const).map((t) => {
            const on = trade === t
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setTrade(t)}
                className={cn(
                  "type-label relative inline-flex h-9 items-center gap-1.5 rounded-(--radius-chip) px-3.5 transition-colors duration-(--duration-hover)",
                  on ? "text-page" : "text-ink-2 hover:text-ink",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="index-chip"
                    className="absolute inset-0 rounded-(--radius-chip) bg-ink"
                    transition={{ type: "spring", duration: 0.35, bounce: 0.12 }}
                  />
                )}
                <span className="relative">{t}</span>
                {t !== "All" && <span className="relative text-[9px] opacity-70 tabular-nums">{counts[t]}</span>}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-2" onPointerLeave={() => setHovered(null)}>
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((s) => (
            <motion.li
              key={s.slug}
              layout={!reduced}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="border-b border-line"
            >
              <button
                type="button"
                onClick={() => openStory(s.slug)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(s.slug)}
                className={cn(
                  "group/row flex w-full items-baseline justify-between gap-6 py-3 text-left transition-opacity duration-(--duration-hover) md:py-4",
                  hovered && hovered !== s.slug && "opacity-30",
                )}
              >
                <span
                  className={cn(
                    "type-display text-ink transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover/row:translate-x-3",
                    size === "display" ? "text-h1 md:text-display" : "text-h2 md:text-h1",
                  )}
                >
                  {s.name}
                </span>
                <span className="hidden shrink-0 items-center gap-6 sm:flex">
                  <span className="type-label text-ink-3">{s.trade}</span>
                  <span className="type-label w-[16ch] text-right text-ink-3">{s.place}</span>
                  <ArrowUpRight className="size-4 text-ink opacity-0 transition-opacity duration-(--duration-hover) group-hover/row:opacity-100" />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* the photograph that follows the pointer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 hidden w-[min(22vw,300px)] md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-60%" }}
      >
        <AnimatePresence>
          {hoverStory && (
            <motion.img
              key={hoverStory.slug}
              src={photo(hoverStory.photo, 600)}
              alt=""
              initial={{ opacity: 0, transform: "scale(0.94) rotate(-2deg)" }}
              animate={{ opacity: 1, transform: "scale(1) rotate(-2deg)" }}
              exit={{ opacity: 0, transform: "scale(0.96) rotate(-2deg)" }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-x-0 top-0 aspect-[4/5] w-full object-cover shadow-(--shadow-float)"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
