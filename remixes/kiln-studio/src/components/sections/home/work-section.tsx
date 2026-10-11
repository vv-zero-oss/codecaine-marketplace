import { useEffect, useRef } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { ProjectWall } from "@/components/motion/project-wall"
import { Button } from "@/components/ui/button"
import { ProjectList } from "@/components/work/project-list"
import { useWork } from "@/components/work/work-state"

/**
 * The top of the home page is the work: the wall, or the list. Switching
 * fades the wall out (270ms) and lets the list rise in, as the reference
 * does. It tells the bottom bar whether it is on screen.
 */
export function WorkSection() {
  const { view, setView, projects, setOnScreen, reset, active } = useWork()
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useCanvasAction("List view", (next) => setView((next ?? view !== "list") ? "list" : "grid"), { on: view === "list", group: "Work" })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: "0px 0px -35% 0px" })
    io.observe(el)
    return () => {
      io.disconnect()
      setOnScreen(false)
    }
  }, [setOnScreen])

  return (
    <section ref={ref} id="work" aria-label="Work" className="relative">
      <h1 className="sr-only">Kiln Studio — technology-led creative studio. Selected work.</h1>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.27, ease: [0.23, 1, 0.32, 1] }}
        >
          {view === "grid" ? (
            <div className="relative">
              <ProjectWall projects={projects} />
              {projects.length === 0 && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="type-head text-h3 text-ink">Nothing matches all of that.</p>
                    <Button variant="soft" onClick={reset}>
                      Clear {active} filter{active === 1 ? "" : "s"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ProjectList />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
