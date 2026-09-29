import { useEffect, useRef, useState, type KeyboardEvent } from "react"

import { people, type Person } from "@/content"
import { filters, matches } from "@/lib/filters"
import { prefersReducedMotion } from "@/lib/motion"
import { Link } from "@/lib/router"
import { go, registerExit } from "@/lib/transition"

import { GridRenderer } from "./grid-renderer"

/**
 * The home page: every portrait on an endless, draggable sheet.
 *
 * Drag (or swipe) to move, scroll to move, pinch or ⌘/ctrl + scroll to zoom,
 * click a portrait to open the profile. Arrow keys and +/− do the same from the
 * keyboard once the grid has focus. The drawing is `GridRenderer`'s; this
 * component owns the canvases, the page it lives on, and a plain list of
 * links behind it for screen readers and anyone without WebGL.
 */
export function InfiniteGrid({
  stage,
  onIntroPhase,
}: {
  /** `loading`: draw nothing yet. `intro`: play the diamond and the burst. `live`: the grid. */
  stage: "loading" | "intro" | "live"
  /** The burst has started ("burst") or the grid is settled ("live"). */
  onIntroPhase?: (phase: "burst" | "live") => void
}) {
  const glRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<GridRenderer | null>(null)
  const [failed, setFailed] = useState(false)
  const phaseRef = useRef(onIntroPhase)
  phaseRef.current = onIntroPhase

  useEffect(() => {
    const canvas = glRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay) return
    let renderer: GridRenderer
    try {
      renderer = new GridRenderer(canvas, overlay, {
        people,
        matches: (person) => matches(person),
        onOpen: (person: Person) => go(`/story/${person.slug}`),
        onPhase: (phase) => phaseRef.current?.(phase),
        reducedMotion: prefersReducedMotion(),
      })
    } catch {
      setFailed(true)
      return
    }
    rendererRef.current = renderer

    const observer = new ResizeObserver(() => renderer.resize())
    observer.observe(canvas)
    document.fonts?.ready.then(() => renderer.restyle())
    const unsubscribe = filters.subscribe(() => renderer.refilter())
    const unregister = registerExit((done) => renderer.leave(done))

    return () => {
      observer.disconnect()
      unsubscribe()
      unregister()
      renderer.destroy()
      rendererRef.current = null
    }
  }, [])

  // The intro plays once, when the loading line has finished.
  useEffect(() => {
    const renderer = rendererRef.current
    if (!renderer || stage === "loading") return
    if (stage === "intro") {
      renderer.playIntro()
      if (prefersReducedMotion()) phaseRef.current?.("live")
      return
    }
    renderer.finishIntro()
  }, [stage])

  const onKeyDown = (event: KeyboardEvent) => {
    const renderer = rendererRef.current
    if (!renderer) return
    const step = event.shiftKey ? 480 : 160
    const keys: Record<string, () => void> = {
      ArrowLeft: () => renderer.panBy(-step, 0),
      ArrowRight: () => renderer.panBy(step, 0),
      ArrowUp: () => renderer.panBy(0, -step),
      ArrowDown: () => renderer.panBy(0, step),
      "+": () => renderer.zoomBy(1.2),
      "=": () => renderer.zoomBy(1.2),
      "-": () => renderer.zoomBy(1 / 1.2),
    }
    const action = keys[event.key]
    if (action) {
      event.preventDefault()
      action()
    }
  }

  return (
    <section aria-label="All athletes" className="fixed inset-0 overflow-hidden bg-paper">
      <canvas ref={glRef} aria-hidden className="absolute inset-0 size-full" />
      <canvas
        ref={overlayRef}
        tabIndex={0}
        role="application"
        aria-label="Athlete grid. Drag or use the arrow keys to move, plus and minus to zoom. The list of profiles follows."
        onKeyDown={onKeyDown}
        className="absolute inset-0 size-full cursor-grab touch-none outline-none select-none"
      />
      {failed && (
        <p className="absolute inset-x-gutter top-1/2 -translate-y-1/2 text-center text-ink-soft">
          This browser cannot draw the grid. Every profile is in the <Link href="/list" className="underline">list</Link>.
        </p>
      )}
      <nav aria-label="Profiles" className="sr-only">
        <ul>
          {people.map((person) => (
            <li key={person.slug}>
              <Link href={`/story/${person.slug}`}>
                {person.number}. {person.name}, {person.role}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
