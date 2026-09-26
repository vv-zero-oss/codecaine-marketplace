import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { EditorWindow, EDITOR_SIZE } from "@/components/mockup/editor-window"
import { NameTag } from "@/components/ui/name-tag"
import { Scene } from "@/components/ui/scene"
import { SwapText } from "@/components/ui/swap-text"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { CAMERA_DURATION, EASE_CAMERA, EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { IntroMark } from "./intro"
import { RetroWindows } from "./retro-windows"
import { StatusCard, type Status } from "./status-card"

/*
 * The first act, on one pinned stage with one editor in it: the promise, then
 * the camera flies into the inspector while a card narrates a save, pulls back
 * for thirty years of separate tools, and lands on the whole editor.
 *
 * One continuous stage rather than four sections because the editor is the
 * thread — it never leaves the screen, it is only looked at from closer or
 * further away.
 */

const BEATS = [
  { kind: "hero", line: "A design editor that works on your running app, not on a picture of it" },
  { kind: "hero", line: "Design the real product, with your code as the source of truth" },
  { kind: "zoom", line: "Design on the elements that are really there" },
  { kind: "zoom", line: "Save hands every change to the assistant that writes your code" },
  { kind: "zoom", line: "Your code stays the one source of truth" },
  { kind: "history", line: "For thirty years, design and code have lived in separate apps" },
  { kind: "ends", line: "That ends here." },
  { kind: "ends", line: "No handoff. No redlines. The design is the app." },
] as const

const STATUS: Status[] = [
  { title: "Reading localhost:5173", tag: "LIVE", done: "Found 42 components", doing: "Framing Hero at Desktop…" },
  { title: "Saving to code", tag: "DESKTOP", done: "3 changes counted", doing: "Writing src/components/hero.tsx…" },
  { title: "Saved to hero.tsx", tag: "+4 −2", finished: true },
]

type Camera = { x: number; y: number; scale: number }

/** Where the editor sits for each beat, from the screen size. */
function camera(kind: (typeof BEATS)[number]["kind"], index: number, W: number, H: number): Camera {
  const wide = W >= 1024
  const { width: EW } = EDITOR_SIZE
  if (kind === "hero") {
    const scale = (wide ? Math.min(1220, W * 0.847) : W - 32) / EW
    return { scale, x: (W - EW * scale) / 2, y: H * (wide ? 0.8 : 0.66) }
  }
  if (kind === "zoom" || kind === "history") {
    // Close on the inspector: its right edge a little left of centre, the tab
    // strip a third of the way down — the reference's framing of its panel.
    const scale = wide ? (1.85 * W) / 1440 : Math.min(1.7, (W - 32) / 259)
    const right = wide ? W * 0.43 : W - 16
    const top = wide ? H * 0.3 : 76
    // For the history beat the panel scrolls on and slides out left, clearing
    // the stage for the old tools.
    if (kind === "history") return { scale, x: -EW * scale - 40, y: top - H * 0.6 }
    return { scale, x: right - EW * scale, y: top }
  }
  const scale = (wide ? 0.658 * W : W - 32) / EW
  const top = index === 7 ? H * (wide ? 0.07 : 0.16) : H * (wide ? 0.2 : 0.24)
  return { scale, x: (W - EW * scale) / 2, y: top }
}

export function Story({ onIntroDone }: { onIntroDone: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, BEATS.length)
  const view = useViewport()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<"mark" | "teaser" | "ready">(reduce ? "ready" : "mark")

  // The opening owns the scroll until it has played: start at the top, hold
  // Lenis still, then give the page back.
  useEffect(() => {
    if (phase === "ready") {
      window.__lenis?.start()
      onIntroDone()
      return
    }
    window.scrollTo(0, 0)
    window.__lenis?.stop()
  }, [phase, onIntroDone])

  const markDone = useCallback(() => setPhase("teaser"), [])
  useEffect(() => {
    if (phase !== "teaser") return
    const id = setTimeout(() => setPhase("ready"), 1400)
    return () => clearTimeout(id)
  }, [phase])

  const beat = BEATS[step]
  const cam = camera(beat.kind, step, view.width, view.height)
  const wide = view.width >= 1024
  const ready = phase === "ready"

  // The pointer that flips the State strip to Hover, in screen space: the
  // chip's place in the editor, through the camera.
  const field = { x: EDITOR_SIZE.width - 259 + 128, y: 196 }
  const pointer =
    step === 2
      ? { x: cam.x + field.x * cam.scale, y: cam.y + field.y * cam.scale }
      : { x: view.width * (wide ? 0.55 : 0.7), y: view.height * (wide ? 0.2 : 0.62) }

  return (
    <Scene ref={ref} beats={BEATS.length * 1.1 + 0.4} id="top" aria-label="Codecaine">
      {/* The editor and the glow it rises out of */}
      <motion.div
        className="absolute top-0 left-0 origin-top-left will-change-transform"
        initial={false}
        animate={
          ready
            ? { x: cam.x, y: cam.y, scale: cam.scale, opacity: 1 }
            : { x: cam.x, y: view.height + 40, scale: cam.scale, opacity: 1 }
        }
        transition={{ duration: ready && step > 0 ? CAMERA_DURATION : 1.1, ease: EASE_CAMERA }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            width: EDITOR_SIZE.width * 1.08,
            height: EDITOR_SIZE.width * 0.33,
            bottom: EDITOR_SIZE.height - 10,
            background:
              "radial-gradient(50% 100% at 50% 100%, var(--color-glow-deep) 0%, var(--color-glow-deep) 6%, var(--color-glow) 28%, var(--color-glow-soft) 52%, color-mix(in srgb, var(--color-glow-soft) 30%, transparent) 72%, transparent 88%)",
            filter: "blur(22px)",
          }}
          initial={false}
          animate={{ opacity: ready && beat.kind === "hero" ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_SWAP }}
        />
        <div className="relative">
          <EditorWindow editing={step === 2} />
        </div>
      </motion.div>

      <RetroWindows show={beat.kind === "history"} compact={!wide} />

      {/* The opening line, seen through the mark's window */}
      <AnimatePresence>
        {phase !== "ready" && (
          <motion.div
            key="teaser"
            className="absolute inset-0 z-10 grid place-items-center px-6 text-center"
            exit={{ opacity: 0, filter: "blur(8px)", transform: "translateY(-14px)" }}
            transition={{ duration: 0.6, ease: EASE_SWAP }}
          >
            <motion.p
              className="display max-w-[16ch] text-[clamp(26px,2.5vw,36px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.4, ease: "easeOut" }}
            >
              The next chapter of building for the web
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {phase === "mark" && <IntroMark onDone={markDone} />}

      {/* Headlines */}
      {ready && (
        <Headline step={step} kind={beat.kind} line={beat.line} wide={wide} status={STATUS[step - 2]} />
      )}

      {/* The pointer that does the editing */}
      <motion.div
        className="absolute top-0 left-0 z-10"
        initial={false}
        animate={{ x: pointer.x, y: pointer.y, opacity: step === 2 || step === 3 ? 1 : 0 }}
        transition={{ duration: 0.7, ease: EASE_CAMERA }}
      >
        <NameTag label="You" />
      </motion.div>
    </Scene>
  )
}

function Headline({
  step,
  kind,
  line,
  wide,
  status,
}: {
  step: number
  kind: (typeof BEATS)[number]["kind"]
  line: string
  wide: boolean
  status?: Status
}) {
  if (kind === "hero") {
    return (
      <div className="absolute inset-x-0 top-[26svh] flex justify-center px-4 text-center sm:top-[27svh]">
        <SwapText id={step} as={step === 0 ? "h1" : "h2"} className="max-w-[15ch] text-[clamp(34px,3.6vw,52px)] sm:max-w-[22ch]">
          {line}
        </SwapText>
      </div>
    )
  }
  if (kind === "zoom") {
    return (
      <div
        className={cn(
          "absolute flex flex-col gap-[clamp(20px,4.5svh,64px)]",
          wide
            ? "top-[33.5svh] left-1/2 w-[min(620px,43vw)]"
            : "inset-x-0 bottom-0 bg-gradient-to-t from-paper from-70% to-transparent px-4 pt-16 pb-10",
        )}
      >
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", transform: "translateY(14px)" }}
              animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_SWAP, delay: 0.25 }}
            >
              <StatusCard status={status} />
            </motion.div>
          )}
        </AnimatePresence>
        <SwapText id={step} delay={0.15} className="max-w-[17ch] text-[clamp(30px,3.35vw,48px)]">
          {line}
        </SwapText>
      </div>
    )
  }
  if (kind === "history") {
    return (
      <div className="absolute inset-x-0 bottom-[8svh] flex justify-center px-4 text-center">
        <SwapText id={step} className="max-w-[20ch] text-[clamp(30px,2.95vw,42px)]">
          {line}
        </SwapText>
      </div>
    )
  }
  return (
    <div
      className={cn(
        "absolute inset-x-0 flex justify-center px-4 text-center",
        step === 6 ? "top-[72svh] sm:top-[74svh]" : "top-[62svh] sm:top-[70svh]",
      )}
    >
      <SwapText
        id={step}
        className={step === 6 ? "text-[clamp(44px,4.6vw,66px)]" : "max-w-[22ch] text-[clamp(30px,2.95vw,42px)]"}
      >
        {line}
      </SwapText>
    </div>
  )
}
