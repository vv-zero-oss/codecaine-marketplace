import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { CursorPreview } from "@/components/motion/cursor-preview"
import { ClientMark } from "@/components/work/client-mark"
import { useWork } from "@/components/work/work-state"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"
import { pexels } from "@/lib/photos"
import { Link } from "@/lib/router"
import { play } from "@/lib/sound"

/**
 * The same work as an index: "All projects" against the count, then year by
 * year, one row each — name, discipline and tags, client. Rows rise in on a
 * 30ms stagger (400ms, as the reference does when it swaps in), and the
 * hovered row's work follows the pointer.
 */
export function ProjectList({ title = "All projects" }: { title?: string }) {
  const { projects, reset, active } = useWork()
  const [hovered, setHovered] = useState<Project | null>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing

  const years = useMemo(() => {
    const map = new Map<number, Project[]>()
    for (const p of [...projects].sort((a, b) => b.year - a.year)) map.set(p.year, [...(map.get(p.year) ?? []), p])
    return [...map.entries()]
  }, [projects])

  let n = 0
  return (
    <section aria-label={title} className="min-h-svh px-(--spacing-gutter) pt-36 pb-40 md:pt-44" onPointerLeave={() => setHovered(null)}>
      <header className="grid items-end gap-2 border-b border-line-2 pb-3 md:grid-cols-[1fr_2fr]">
        <h2 className="type-head text-h2 text-ink">{title}</h2>
        <p className="type-head text-h2 text-ink-4 tabular-nums">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="flex flex-col items-start gap-5 py-24 md:pl-[33.333%]">
          <p className="text-lead text-ink-2">Nothing we've made matches all of those at once.</p>
          <Button variant="soft" onClick={reset}>
            Clear {active} filter{active === 1 ? "" : "s"}
          </Button>
        </div>
      ) : (
        years.map(([year, list]) => (
          <div key={year} className="grid gap-4 border-b border-line-2 py-6 md:grid-cols-[1fr_2fr] md:py-8">
            <h3 className="type-head text-h4 text-ink tabular-nums">{year}</h3>
            <ul>
              {list.map((p) => {
                const i = n++
                return (
                  <motion.li
                    key={p.slug}
                    initial={still ? false : { opacity: 0, transform: "translateY(10px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ duration: 0.4, delay: Math.min(i, 16) * 0.03, ease: [0.23, 1, 0.32, 1] }}
                    className="border-b border-line last:border-b-0"
                  >
                    <Link
                      href={`/work/${p.slug}`}
                      onPointerEnter={() => {
                        setHovered(p)
                        play("tick")
                      }}
                      onFocus={() => setHovered(p)}
                      className="group/row -mx-2 grid grid-cols-[56px_1fr] items-center gap-x-4 gap-y-1 rounded-[4px] px-2 py-2.5 transition-colors duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-panel-2 focus-visible:bg-panel-2 sm:grid-cols-[1.3fr_1.7fr_auto] md:py-2"
                    >
                      <img
                        src={pexels(p.photo, 112, 112)}
                        alt=""
                        loading="lazy"
                        className="row-span-2 size-14 rounded-[3px] object-cover sm:hidden"
                      />
                      <span className="text-[17px] font-medium tracking-[-0.02em] text-ink transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover/row:translate-x-1">
                        {p.title}
                      </span>
                      <span className="flex flex-wrap gap-1">
                        <span className="type-label rounded-full px-2 py-1 text-ink-3 shadow-[inset_0_0_0_1px_var(--color-line-3)]">{p.discipline}</span>
                        {p.tags.map((t) => (
                          <span key={t} className="type-label rounded-full bg-panel-2 px-2 py-1 text-ink-2 transition-colors duration-(--duration-hover) group-hover/row:bg-raised">
                            {t}
                          </span>
                        ))}
                      </span>
                      <ClientMark client={p.client} mark={p.mark} className="hidden text-right text-[15px] text-ink-2 sm:block" />
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        ))
      )}
      <CursorPreview photo={hovered?.photo ?? null} alt={hovered ? `${hovered.title} for ${hovered.client}` : ""} />
    </section>
  )
}
