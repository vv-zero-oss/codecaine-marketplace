import { useEffect, useState } from "react"
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"

import { ClipShape } from "@/components/blocks/clip-shape"
import { brand, hero, pexels, preloader } from "@/content"
import { DURATION, EASE_IN_OUT, EASE_OUT } from "@/lib/motion"

/** The least time the curtain stays down, so the count reads as a count and
 *  not a flash, and the most, so a slow network never holds the page. */
const MIN_MS = 1800
const MAX_MS = 5000
/** How fast the menu board flicks through its pictures. */
const FLIP_MS = 260

function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = src
  })
}

/**
 * The curtain the page opens behind: a forest-green board with a scalloped
 * plate flicking through the menu, a count to 100, and the name.
 *
 * Purpose: it hides the hero's photograph and the display face arriving in
 * pieces, then hands over to the hero's own entrance. It is seen once a visit,
 * so it is allowed its delight — but it is honest: it waits on the fonts and
 * the hero photograph (never longer than MAX_MS) and lifts the moment both are
 * ready, after MIN_MS.
 *
 * Exit: the board lifts away as a clip-path wipe (an ease-in-out, since it
 * travels across the screen), and the hero's letters start rising as it goes.
 * Reduced motion: no flicking, no wipe — the count and a short fade.
 */
export function Preloader({ onLift, onDone }: { onLift: () => void; onDone: () => void }) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(true)
  const [frame, setFrame] = useState(0)
  const count = useMotionValue(0)
  const label = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"))

  useEffect(() => {
    const started = performance.now()
    const assets = Promise.all([
      document.fonts?.ready,
      preload(pexels(hero.photo.id, 2000)),
      ...preloader.photos.map((p) => preload(pexels(p.id, 640))),
    ])
    const timeout = new Promise((r) => setTimeout(r, MAX_MS))

    // The count eases toward 90 while the assets load, then runs out to 100
    // once they are in — so it never sits at 100 waiting.
    const toNinety = animate(count, 90, { duration: MIN_MS / 1000, ease: EASE_OUT })
    let cancelled = false
    Promise.race([assets, timeout]).then(async () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - started))
      await new Promise((r) => setTimeout(r, wait))
      if (cancelled) return
      toNinety.stop()
      await animate(count, 100, { duration: 0.35, ease: EASE_OUT })
      if (cancelled) return
      setOpen(false)
      onLift()
    })
    return () => {
      cancelled = true
      toNinety.stop()
    }
    // Runs once: the curtain goes up a single time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  useEffect(() => {
    if (reduced || !open) return
    const id = setInterval(() => setFrame((f) => (f + 1) % preloader.photos.length), FLIP_MS)
    return () => clearInterval(id)
  }, [reduced, open])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <motion.div
          key="preloader"
          role="status"
          aria-label={`${preloader.line}…`}
          className="fixed inset-0 z-[60] flex flex-col justify-between bg-forest p-gutter text-lime"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.25 } }
              : { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: DURATION.curtain, ease: EASE_IN_OUT } }
          }
        >
          <div className="flex items-start justify-between">
            <span className="font-heavy text-[22px] leading-none tracking-[-0.03em]">{brand.name}</span>
            <span className="font-condensed text-label uppercase text-on-forest-muted">{brand.tagline}</span>
          </div>

          <motion.div
            className="mx-auto"
            exit={reduced ? undefined : { transform: "scale(0.9) rotate(-20deg)", opacity: 0, transition: { duration: 0.35, ease: EASE_OUT } }}
          >
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "scale(0.9) rotate(-30deg)" }}
              animate={{ opacity: 1, transform: "scale(1) rotate(0deg)" }}
              transition={{ duration: DURATION.reveal, ease: EASE_OUT }}
            >
              <ClipShape shape="scallop" className="size-[min(56vw,300px)] animate-[spin_14s_linear_infinite] bg-orange motion-reduce:animate-none">
                {preloader.photos.map((photo, i) => (
                  <img
                    key={photo.id}
                    src={pexels(photo.id, 640)}
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                    style={{ opacity: i === frame ? 1 : 0 }}
                  />
                ))}
              </ClipShape>
            </motion.div>
          </motion.div>

          <div className="flex items-end justify-between gap-4">
            <p className="font-condensed text-label uppercase">
              {preloader.line}
              <span className="inline-flex w-[1.5em]">
                <span className="animate-pulse">…</span>
              </span>
            </p>
            <motion.span className="font-heavy text-[clamp(64px,14vw,200px)] leading-[0.8] tabular-nums">{label}</motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
