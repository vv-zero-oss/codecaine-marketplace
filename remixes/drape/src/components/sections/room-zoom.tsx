import { ChevronDown, Eye, Layers, Sparkles, Wand2 } from "lucide-react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { pexels } from "@/content"
import { cn } from "@/lib/utils"

const ROOM = 7319191
const LOOK = 20851458

function useViewport() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return size
}

/**
 * RoomZoom — the scroll-scrubbed pull-back after the hero.
 *
 * It opens on the fitting room itself, full-screen: the look you just tried
 * on, with the layers and prompt panels around it. As you scroll, the panels
 * fall away and the camera pulls back until the screen is a display on a
 * sunlit wall — Drape at home — and the headline returns over the room.
 *
 * `from` and `to` are the share of the section's scroll the pull-back takes;
 * `endWidth` is the screen's final width as a share of the viewport.
 */
export function RoomZoom({
  from = 0.12,
  to = 0.72,
  endWidth = 0.4,
  headline = "Wear it first",
}: {
  from?: number
  to?: number
  endWidth?: number
  headline?: string
}) {
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: section, offset: ["start start", "end end"] })
  const { w, h } = useViewport()
  const mobile = w < 640
  const endW = Math.min(w * (mobile ? 0.78 : endWidth), 640)
  const endH = endW * (mobile ? 1.25 : 0.62)
  const endY = h * (mobile ? 0.56 : 0.54)

  const width = useTransform(p, [from, to], [w, endW])
  const height = useTransform(p, [from, to], [h, endH])
  const top = useTransform(p, [from, to], [0, endY - endH / 2])
  const left = useTransform(p, [from, to], [0, (w - endW) / 2])
  const radius = useTransform(p, [from, to], [0, 12])
  const bezel = useTransform(p, [from, to], [0, mobile ? 6 : 9])
  const roomScale = useTransform(p, [from, to], [2.6, 1])
  // Opacity as functions of the scroll rather than ranges: Motion hands a
  // plain range on opacity to a native ScrollTimeline, which misreads this
  // sticky layout. A function keeps it on the main thread, where it is right.
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
  const roomOpacity = useTransform(p, (v) => clamp01((v - from) / 0.12))
  const panels = useTransform(p, (v) => clamp01(1 - v / from))
  const title = useTransform(p, (v) => clamp01((v - to + 0.02) / 0.12))
  const titleY = useTransform(p, [to - 0.02, to + 0.1], [16, 0])

  return (
    <section ref={section} id="room" className="relative h-[300svh] bg-espresso">
      <div className="sticky top-0 h-svh overflow-hidden bg-linen">
        <motion.img
          src={pexels(ROOM, 2000)}
          alt="A sunlit wall above a wooden desk"
          style={{ scale: roomScale, opacity: roomOpacity, transformOrigin: `50% ${(endY / h) * 100}%` }}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/35 via-transparent to-espresso/25" />

        <motion.h2
          style={{ opacity: title, y: titleY }}
          className="absolute inset-x-0 top-[12svh] text-center font-display text-[clamp(3rem,9vw,8.5rem)] leading-none font-semibold tracking-[-0.045em] text-paper max-sm:top-[14svh]"
        >
          <span className="mr-[0.2em] font-script font-normal tracking-normal">{headline.split(" ")[0]}</span>
          {headline.split(" ").slice(1).join(" ")}
        </motion.h2>

        <motion.div
          style={{ width, height, top, left, borderRadius: radius, borderWidth: bezel }}
          className="absolute overflow-hidden border-espresso bg-linen grid-paper shadow-float"
        >
          <FittingScreen panels={panels} />
        </motion.div>
      </div>
    </section>
  )
}

/** What the screen shows: the tried-on look, and the app's panels around it. */
export function FittingScreen({ panels }: { panels: MotionValue<number> }) {
  return (
    <div className="relative size-full">
      <img
        src={pexels(LOOK, 800, 1200)}
        alt="The long black coat, tried on"
        className="absolute top-1/2 left-1/2 h-[82%] -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply"
      />
      <motion.div style={{ opacity: panels }} className="pointer-events-none absolute inset-0 max-md:hidden">
        <AppPanel className="top-20 left-6 w-52" title="Layers" icon={<Layers className="size-3.5" />}>
          {[
            ["Long coat", "Maison Ardent · M"],
            ["You", "Photo, front"],
            ["Wall", "Background"],
          ].map(([name, meta], i) => (
            <div key={name} className={cn("flex items-center gap-2 rounded-sm px-2 py-1.5", i === 0 && "bg-clay/20")}>
              <span className="size-6 rounded-xs bg-espresso-4" />
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] text-cream">{name}</span>
                <span className="block text-[10px] text-cream-3">{meta}</span>
              </span>
              <Eye className="size-3 text-cream-3" />
            </div>
          ))}
        </AppPanel>
        <AppPanel className="top-20 right-6 w-60" title="Modify" icon={<Wand2 className="size-3.5" />}>
          <p className="rounded-sm bg-espresso-3 p-2 text-[11px] leading-snug text-cream-2">
            Make it ankle length, in a warm camel, a little looser at the shoulder
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {["Colour", "Length", "Fit", "Fabric"].map((chip) => (
              <span key={chip} className="rounded-xs bg-espresso-3 px-1.5 py-0.5 text-[10px] text-cream-2">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-cream-3">
            <span>Size</span>
            <span className="text-cream">M · regular</span>
          </div>
          <div className="mt-3 flex h-7 items-center justify-center gap-1.5 rounded-sm bg-clay text-[11px] font-medium text-paper">
            <Sparkles className="size-3" /> Try it on
          </div>
        </AppPanel>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[12px] text-ink-2">
          Scroll
          <ChevronDown className="size-3.5" />
        </div>
      </motion.div>
    </div>
  )
}

export function AppPanel({
  title,
  icon,
  className,
  children,
}: {
  title: string
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("absolute rounded-md border border-line-dark bg-espresso-2 p-2 shadow-float", className)}>
      <p className="mb-2 flex items-center gap-1.5 px-1 text-[11px] font-medium text-cream-2">
        {icon}
        {title}
      </p>
      {children}
    </div>
  )
}
