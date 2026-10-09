import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, motion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { OpenBook, leavesFor } from "@/components/mock/open-book"
import { Button } from "@/components/ui/button"
import { SPREADS } from "@/content/shop"
import { useBag } from "@/lib/bag"
import { PHOTOS, photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * The volume on the table. A pinned scene: as the reader scrolls, the cover
 * opens around the spine (scrubbed to the scroll, so it is theirs to play
 * back and forth), and the book slides from closed-and-centred to open.
 * Then the pages turn by hand — buttons, a click on either page, or the
 * arrow keys while it is in view.
 */
export function VolumeFeature({
  title = "Ordinary Matter — Volume 3, Salt & Timber",
  body = "Salt & Timber is the third volume of Ordinary Matter: twelve people who build by hand at the water's edge, told over three days with each of them and photographed on film.",
  pinLength = 220,
}: {
  title?: string
  body?: string
  /** Height of the pinned scene, in vh. More is a slower opening. */
  pinLength?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = !!reduced || designing
  const bag = useBag()

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const scrubbed = useTransform(scrollYProgress, [0.04, 0.42], [0, -180], { clamp: true })
  const openStill = useMotionValue(-180)
  // Closed, the cover sits centred (a quarter of the open width to the left);
  // open, the spine is centred. One transform string, so it stays on the GPU.
  const bookTransform = useTransform(scrubbed, (r) => {
    const t = -r / 180
    return `translateX(${-25 * (1 - t)}%) scale(${1 + 0.03 * Math.sin(t * Math.PI)})`
  })

  const [coverOpen, setCoverOpen] = useState(still)
  const [pages, setPages] = useState(0)
  const [flipping, setFlipping] = useState<number | null>(null)
  const maxPages = leavesFor(SPREADS).length - 1 // leaves after the cover

  useMotionValueEvent(scrubbed, "change", (v) => {
    if (still) return
    const open = v < -95
    setCoverOpen(open)
    if (!open) setPages(0)
  })
  useEffect(() => {
    if (still) setCoverOpen(true)
  }, [still])
  // While designing, the "Book open" switch opens and closes the cover.
  useEffect(() => {
    openStill.set(coverOpen ? -180 : 0)
  }, [coverOpen, openStill])

  const turn = (dir: 1 | -1) => {
    if (!coverOpen) return
    const next = Math.min(maxPages, Math.max(0, pages + dir))
    if (next === pages) return
    setFlipping(dir === 1 ? pages + 1 : pages)
    setPages(next)
    window.setTimeout(() => setFlipping(null), 900)
  }

  // Arrow keys while the scene is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const r = ref.current?.getBoundingClientRect()
      if (!r || r.top > 0 || r.bottom < window.innerHeight) return
      if (e.key === "ArrowRight") turn(1)
      if (e.key === "ArrowLeft") turn(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  useCanvasAction("Book open", (next) => setCoverOpen(next ?? !coverOpen), { on: coverOpen, group: "Volume" })
  useCanvasAction("Next spread", () => turn(1), { group: "Volume" })

  const turned = coverOpen ? 1 + pages : 0
  const spreadIndex = Math.max(0, pages - 1)
  const current = pages === 0 ? null : SPREADS[Math.min(spreadIndex, SPREADS.length - 1)]
  const label = !coverOpen ? "Scroll to open" : pages === 0 ? "Title page" : pages > SPREADS.length ? "Colophon" : `Spread ${pages} of ${SPREADS.length}`

  return (
    <section id="volume" ref={ref} className="relative bg-timber-deep" style={{ height: still ? "auto" : `${pinLength}vh` }}>
      <div className={cn("top-0 flex min-h-svh flex-col overflow-hidden", !still && "sticky h-svh")}>
        {/* the table */}
        <img src={photo(PHOTOS.timber, 2000)} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(60_30_10/0.35),rgb(60_30_10/0.05)_40%,rgb(40_20_6/0.3))] mix-blend-multiply" />

        <div className="relative z-20 px-gutter pt-24 md:pt-28">
          <h2 className="type-title max-w-[36ch] text-[17px] text-page md:text-[19px]">{title}</h2>
          <p className="mt-3 max-w-[52ch] font-serif text-[15px] leading-[1.5] text-page/90">{body}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="type-label text-page/85">Now shipping worldwide</p>
            <button
              type="button"
              onClick={() => {
                bag.add("vol-3", "moss")
                bag.setOpen(true)
              }}
              className="type-label link-draw text-page"
            >
              Add to bag — $58
            </button>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-6">
          <motion.div
            className="relative w-[min(92vw,calc((100svh-380px)*1.6),980px)]"
            style={still ? undefined : { transform: bookTransform }}
          >
            <OpenBook spreads={SPREADS} turned={turned} coverRotation={still ? openStill : scrubbed} flipping={flipping} className="w-full" />
            {/* click either page to turn */}
            {coverOpen && (
              <div className="absolute inset-0 z-[300] grid grid-cols-2">
                <button type="button" aria-label="Previous page" className="cursor-w-resize" onClick={() => turn(-1)} disabled={pages === 0} />
                <button type="button" aria-label="Next page" className="cursor-e-resize" onClick={() => turn(1)} disabled={pages === maxPages} />
              </div>
            )}
          </motion.div>

          <div
            className={cn(
              "mt-6 flex items-center gap-3 transition-[opacity,transform] duration-(--duration-swap) ease-(--ease-out-strong) md:mt-8",
              coverOpen ? "opacity-100" : "translate-y-1 opacity-0",
            )}
          >
            <Button variant="paper" size="icon" className="rounded-full" aria-label="Previous page" onClick={() => turn(-1)} disabled={pages === 0}>
              <ArrowLeft />
            </Button>
            <p className="type-label min-w-[13ch] text-center text-page tabular-nums" aria-live="polite">
              {label}
            </p>
            <Button variant="paper" size="icon" className="rounded-full" aria-label="Next page" onClick={() => turn(1)} disabled={pages === maxPages}>
              <ArrowRight />
            </Button>
          </div>
          {/* below md the pages are small: the spread's words, readable */}
          <p className="mt-4 min-h-[3lh] max-w-[34ch] text-center font-serif text-[15px] leading-snug text-page/90 md:hidden">
            {current ? current.quote : coverOpen ? "Tap the right page to turn it." : ""}
          </p>
        </div>
      </div>
    </section>
  )
}
