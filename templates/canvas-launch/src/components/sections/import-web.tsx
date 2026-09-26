import { useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Globe, Rows2, Type, Image as ImageIcon, Columns2 } from "lucide-react"

import { Board } from "@/components/ui/diagram"
import { Scene } from "@/components/ui/scene"
import { Typed } from "@/components/ui/typed"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useBoardScale } from "@/hooks/use-board-scale"
import { EASE_CAMERA, EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Import URL: an address goes in, the page lands on the board at once and
 * fills in section by section — the way the real import streams — and ends as
 * layers somebody can select and restyle.
 */

const W = 1000
const H = 470
const ADDRESS = "tidewater.app/pricing"

const LINES = [
  { line: "Any page on the web, onto your board" },
  { line: "Section by section, as layers you can edit", sub: "Its fonts, colours, pictures, video and SVG come with it." },
  { line: "Then take it apart", sub: "The whole import is one ⌘Z, and nothing is ever written back to the site." },
]

const SECTIONS = [
  { name: "Navigation", icon: Columns2, h: 34 },
  { name: "Hero", icon: Rows2, h: 118 },
  { name: "Plans", icon: Columns2, h: 118 },
  { name: "Footer", icon: Columns2, h: 44 },
]

export function ImportWeb() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 4)
  const { view, scale } = useBoardScale(W)
  const at = Math.min(step, 2)

  return (
    <Scene ref={ref} beats={3.6} id="import" aria-label="Import a web page">
      <SceneHeadline id={at} sub={LINES[at].sub}>
        {LINES[at].line}
      </SceneHeadline>

      <Board width={W} height={H} scale={scale} top={view.width >= 1024 ? "34svh" : "44svh"}>
        {/* The dialog */}
        <AnimatePresence>
          {at === 0 && (
            <motion.div
              className="absolute top-10 left-1/2 w-[440px] rounded-[14px] bg-ed-panel p-5 text-ed-text shadow-window"
              initial={{ opacity: 0, transform: "translateX(-50%) scale(0.97)" }}
              animate={{ opacity: 1, transform: "translateX(-50%) scale(1)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: EASE_SWAP }}
            >
              <p className="text-[14px] font-semibold">Import a web page</p>
              <p className="mt-4 mb-1 text-[11px] font-medium text-ed-text-2">Address</p>
              <div className="flex h-9 items-center gap-2 rounded-[7px] bg-ed-field px-3 text-[14px]">
                <Globe className="size-4 text-ed-text-2" strokeWidth={1.5} />
                <Typed text={ADDRESS} delay={0.3} speed={0.03} />
              </div>
              <p className="mt-4 mb-1 text-[11px] font-medium text-ed-text-2">Theme</p>
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-[150px] rounded-[8px] bg-ed-field p-0.5 text-[12px] font-medium">
                  <span className="grid flex-1 place-items-center rounded-[6px] bg-ed-panel shadow-ed-chip">Light</span>
                  <span className="grid flex-1 place-items-center text-ed-text-2">Dark</span>
                </div>
                <span className="grid h-8 place-items-center rounded-[6px] bg-ed-ink px-4 text-[12px] font-medium text-ed-on-ink">Import</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The page, filling in */}
        <motion.div
          className="absolute top-0 left-[250px] w-[560px]"
          initial={false}
          animate={at >= 1 ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 0, transform: "translateY(24px)" }}
          transition={{ duration: 0.5, ease: EASE_CAMERA }}
        >
          <p className="mb-1.5 font-mono text-[11px] text-ink-muted">{ADDRESS} · 1280</p>
          <div className="flex flex-col gap-2 rounded-[10px] bg-site-bg p-3 shadow-window">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.name}
                className={cn(
                  "relative overflow-hidden rounded-[6px] bg-site-card",
                  at === 2 && s.name === "Hero" && "outline-[1.5px] outline-ed-accent outline-solid",
                )}
                style={{ height: s.h }}
                initial={false}
                animate={at >= 1 ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.45, delay: at >= 1 ? 0.25 + i * 0.28 : 0, ease: EASE_SWAP }}
              >
                <SectionSketch name={s.name} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Layers arriving */}
        <motion.ul
          className="absolute top-6 left-[20px] w-[200px] rounded-[10px] bg-ed-panel py-1.5 text-[12px] text-ed-text shadow-card"
          initial={false}
          animate={at >= 1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <li className="flex h-8 items-center gap-2 px-3 font-medium">
            <Globe className="size-4 text-ed-text-3" strokeWidth={1.5} /> {ADDRESS}
          </li>
          {SECTIONS.map((s, i) => (
            <motion.li
              key={s.name}
              className={cn("flex h-8 items-center gap-2 pr-3 pl-7", at === 2 && s.name === "Hero" && "bg-ed-selected")}
              initial={false}
              animate={at >= 1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2, delay: at >= 1 ? 0.3 + i * 0.28 : 0 }}
            >
              <s.icon className={cn("size-4", at === 2 && s.name === "Hero" ? "text-ed-accent" : "text-ed-text-3")} strokeWidth={1.5} />
              {s.name}
            </motion.li>
          ))}
        </motion.ul>

        {/* The finished import */}
        <AnimatePresence>
          {at === 2 && (
            <motion.div
              className="absolute top-[395px] left-[250px] flex h-10 items-center gap-3 rounded-pill bg-surface pr-1.5 pl-4 text-[14px] shadow-card"
              initial={{ opacity: 0, transform: "translateY(8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: EASE_SWAP }}
            >
              Imported 495 layers from {ADDRESS}
              <span className="flex h-7 items-center rounded-pill bg-ink px-3 text-[12px] font-medium text-on-ink">View details</span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {at === 2 && (
            <motion.div
              className="absolute top-[76px] left-[830px] w-[160px] rounded-[10px] bg-ed-panel p-3 text-[11px] text-ed-text shadow-card"
              initial={{ opacity: 0, transform: "translateX(-8px)" }}
              animate={{ opacity: 1, transform: "translateX(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: EASE_SWAP }}
            >
              <p className="font-semibold">Hero</p>
              {[
                ["Font", "Inter"],
                ["Size", "44px"],
                ["Fill", "171717"],
                ["Gap", "20"],
              ].map(([k, v]) => (
                <p key={k} className="mt-2 flex justify-between rounded-[5px] bg-ed-field px-2 py-1">
                  <span className="text-ed-text-2">{k}</span>
                  {v}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Board>
    </Scene>
  )
}

function SectionSketch({ name }: { name: string }) {
  if (name === "Navigation")
    return (
      <div className="flex h-full items-center justify-between px-3">
        <span className="h-2 w-14 rounded-full bg-site-ink/70" />
        <span className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-8 rounded-full bg-site-ink/20" />
          ))}
        </span>
      </div>
    )
  if (name === "Hero")
    return (
      <div className="flex h-full items-center gap-4 p-4">
        <div className="flex-1 space-y-2">
          <Type className="size-3 text-site-muted" />
          <span className="block h-3 w-4/5 rounded-full bg-site-ink/80" />
          <span className="block h-3 w-3/5 rounded-full bg-site-ink/80" />
          <span className="block h-1.5 w-2/3 rounded-full bg-site-ink/20" />
          <span className="mt-2 block h-5 w-20 rounded-pill bg-site-feature" />
        </div>
        <div className="grid h-full w-40 place-items-center rounded-[6px] bg-site-ink/8">
          <ImageIcon className="size-5 text-site-muted" strokeWidth={1.5} />
        </div>
      </div>
    )
  if (name === "Plans")
    return (
      <div className="grid h-full grid-cols-3 gap-2 p-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cn("space-y-1.5 rounded-[6px] p-2.5", i === 2 ? "bg-site-feature" : "bg-site-bg")}>
            <span className={cn("block h-1.5 w-10 rounded-full", i === 2 ? "bg-site-on-feature/50" : "bg-site-ink/30")} />
            <span className={cn("block h-3 w-12 rounded-full", i === 2 ? "bg-site-on-feature" : "bg-site-ink/80")} />
            <span className={cn("block h-1.5 w-full rounded-full", i === 2 ? "bg-site-on-feature/20" : "bg-site-ink/12")} />
            <span className={cn("block h-1.5 w-4/5 rounded-full", i === 2 ? "bg-site-on-feature/20" : "bg-site-ink/12")} />
          </div>
        ))}
      </div>
    )
  return (
    <div className="flex h-full items-center gap-6 px-3">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="h-1.5 w-12 rounded-full bg-site-ink/20" />
      ))}
    </div>
  )
}

