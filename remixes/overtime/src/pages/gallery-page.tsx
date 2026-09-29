import { useEffect, useRef, useState } from "react"

import { SiteHeader } from "@/components/site-header"
import { people, pexels } from "@/content"
import { prefersReducedMotion } from "@/lib/motion"
import { go } from "@/lib/transition"

const WINDOW = 2 // portraits kept mounted on each side of the current one

/**
 * Every portrait full screen, one after another, scrolled like a film strip.
 *
 * Scroll, swipe or use the arrow keys to move; the strip glides and settles
 * on the nearest portrait. Each image moves a little slower than its frame, so
 * the cut between two faces has depth instead of being a flat wipe. The name
 * follows the pointer; a click opens the story. The first portrait arrives
 * out of focus and sharpens, the way the page it came from dissolved.
 *
 * Drawn as transformed DOM rather than WebGL: there are never more than five
 * images on the page, and they want to be real images a screen reader and the
 * canvas editor can see.
 */
export function GalleryPage({ pathname }: { pathname: string }) {
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const stage = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLDivElement>(null)
  const position = useRef({ current: 0, target: 0 })

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const reduced = prefersReducedMotion()
    const max = people.length - 1
    let frame = 0
    let settle = 0
    let touchY: number | null = null
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, lx: window.innerWidth / 2, ly: window.innerHeight / 2 }

    const clampTarget = () => {
      position.current.target = Math.min(max, Math.max(0, position.current.target))
    }
    const snapSoon = () => {
      window.clearTimeout(settle)
      settle = window.setTimeout(() => {
        position.current.target = Math.round(position.current.target)
      }, 140)
    }
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const lines = event.deltaMode === 1 ? 16 : 1
      position.current.target += (event.deltaY * lines) / window.innerHeight
      clampTarget()
      snapSoon()
    }
    const onKey = (event: KeyboardEvent) => {
      const step = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 }[event.key]
      if (step === undefined) return
      event.preventDefault()
      position.current.target = Math.round(position.current.target) + step
      clampTarget()
    }
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0].clientY
    }
    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null) return
      event.preventDefault()
      const y = event.touches[0].clientY
      position.current.target += ((touchY - y) / window.innerHeight) * 1.2
      touchY = y
      clampTarget()
    }
    const onTouchEnd = () => {
      touchY = null
      position.current.target = Math.round(position.current.target)
    }
    const onPointer = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const loop = () => {
      frame = requestAnimationFrame(loop)
      const p = position.current
      p.current += (p.target - p.current) * (reduced ? 1 : 0.09)
      if (Math.abs(p.target - p.current) < 0.0005) p.current = p.target
      const h = window.innerHeight
      for (const child of Array.from(el.children) as HTMLElement[]) {
        const i = Number(child.dataset.index)
        const offset = i - p.current
        child.style.transform = `translate3d(0, ${offset * h}px, 0)`
        const image = child.firstElementChild as HTMLElement | null
        if (image) image.style.transform = `translate3d(0, ${offset * -h * 0.35}px, 0) scale(1.08)`
      }
      pointer.lx += (pointer.x - pointer.lx) * (reduced ? 1 : 0.18)
      pointer.ly += (pointer.y - pointer.ly) * (reduced ? 1 : 0.18)
      if (label.current) label.current.style.transform = `translate3d(${pointer.lx + 16}px, ${pointer.ly + 4}px, 0)`
      const nearest = Math.round(p.current)
      setIndex((current) => (current === nearest ? current : nearest))
    }
    frame = requestAnimationFrame(loop)

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKey)
    window.addEventListener("pointermove", onPointer)
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: false })
    el.addEventListener("touchend", onTouchEnd)
    const id = window.setTimeout(() => setReady(true), 60)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(settle)
      window.clearTimeout(id)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("pointermove", onPointer)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  const person = people[index]
  const mounted = people.slice(Math.max(0, index - WINDOW), index + WINDOW + 1)

  return (
    <div className="fixed inset-0 overflow-hidden bg-paper" data-canvas-ignore>
      <SiteHeader pathname={pathname} blend />
      <main data-canvas-ignore className="absolute inset-0">
        <h1 className="sr-only">Gallery</h1>
        <div ref={stage} className="absolute inset-0 touch-none">
          {mounted.map((p) => {
            const i = p.number - 1
            return (
              <button
                key={p.slug}
                type="button"
                data-index={i}
                aria-label={`${p.number}. ${p.name} — open the profile`}
                onClick={() => go(`/story/${p.slug}`)}
                className="absolute inset-0 block cursor-pointer overflow-hidden will-change-transform"
                style={{ transform: `translate3d(0, ${(i - position.current.current) * 100}vh, 0)` }}
              >
                <img
                  src={pexels(p.photo, 1600)}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 size-full object-cover object-[50%_30%] transition-[filter,opacity] duration-[1400ms] ease-(--ease-out-quart) will-change-transform"
                  style={{
                    filter: ready || i !== 0 ? "blur(0px)" : "blur(36px)",
                    opacity: ready || i !== 0 ? 1 : 0.6,
                  }}
                />
              </button>
            )
          })}
        </div>
      </main>

      <div
        ref={label}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-20 hidden text-caption font-mono uppercase tracking-label text-blend mix-blend-difference md:block"
      >
        <p>{person.number}</p>
        <p>{person.name}</p>
      </div>

      <p className="fixed bottom-6 left-gutter z-20 text-caption font-mono uppercase tracking-label text-blend mix-blend-difference md:hidden">
        {person.number} — {person.name}
      </p>
      <p className="fixed right-gutter bottom-6 z-20 font-mono text-caption tracking-label text-blend tabular-nums mix-blend-difference">
        {String(index + 1).padStart(2, "0")} / {people.length}
      </p>
    </div>
  )
}
