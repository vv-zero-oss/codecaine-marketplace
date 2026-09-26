import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { MARK_HOLE } from "@/components/ui/mark"
import { Scene } from "@/components/ui/scene"
import { SwapText } from "@/components/ui/swap-text"
import { WINDOW } from "@/content/photos"
import { useSceneStep } from "@/hooks/use-scene-step"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { StackMarquee } from "./stack-marquee"

/**
 * The ask. Photographs of people at work flick past behind the mark, whose
 * window shows the gradient straight through; then the line gives way to the
 * form, which sits over the mark as the reference sets it.
 */
export function Waitlist() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 3)
  const [frame, setFrame] = useState(0)

  // A new photograph every 0.9s — quick enough to read as a reel, slow enough
  // to see each one. Paused for reduced motion.
  useEffect(() => {
    if (WINDOW.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setFrame((f) => (f + 1) % WINDOW.length), 900)
    return () => clearInterval(id)
  }, [])

  const photo = WINDOW[frame]
  const masked = step >= 1

  return (
    <Scene ref={ref} beats={3} tone="bare" id="access" aria-label="Request access">
      <div
        aria-hidden
        className="absolute top-[20svh] left-1/2 size-[clamp(200px,19.9vw,286px)] -translate-x-1/2 overflow-hidden"
        style={masked ? MARK_MASK : undefined}
      >
        {photo ? (
          <img src={photo.src} alt="" className="size-full object-cover grayscale-[35%]" />
        ) : (
          <div className="size-full bg-ink" />
        )}
      </div>

      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key="line"
            className="absolute inset-x-0 top-[55svh] flex justify-center px-4 text-center"
            exit={{ opacity: 0, filter: "blur(8px)", transform: "translateY(-14px)" }}
            transition={{ duration: 0.5, ease: EASE_SWAP }}
          >
            <SwapText id="line" className="max-w-[16ch] text-[clamp(32px,3.1vw,44px)]">
              Frame it, design it, save it. All in Codecaine.
            </SwapText>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{step >= 2 && <AccessForm key="form" />}</AnimatePresence>

      <div className="absolute inset-x-0 bottom-[3svh] sm:bottom-[4svh]">
        <p className="mb-5 text-center text-[12px] text-ink-soft sm:mb-7">Frames whatever your dev server is running</p>
        <StackMarquee />
      </div>
    </Scene>
  )
}

/** The mark's window as a mask: the photo is the frame, the hole shows through. */
const MARK_MASK = (() => {
  const i = MARK_HOLE.inset * 100
  const r = MARK_HOLE.radius * 100
  const s = 100 - i * 2
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill-rule='evenodd' d='M0 0H100V100H0Z M${i + r} ${i}H${i + s - r}A${r} ${r} 0 0 1 ${i + s} ${i + r}V${i + s - r}A${r} ${r} 0 0 1 ${i + s - r} ${i + s}H${i + r}A${r} ${r} 0 0 1 ${i} ${i + s - r}V${i + r}A${r} ${r} 0 0 1 ${i + r} ${i}Z'/></svg>`
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  return { maskImage: url, WebkitMaskImage: url, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }
})()

function AccessForm() {
  const [sent, setSent] = useState(false)
  return (
    <motion.form
      className="absolute top-[calc(20svh+clamp(200px,19.9vw,286px)*0.415)] left-1/2 flex w-[min(426px,calc(100%-32px))] -translate-x-1/2 flex-col items-center gap-3"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: EASE_SWAP }}
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <div className="flex h-[52px] w-full items-center rounded-pill bg-white/95 p-1 shadow-ring backdrop-blur-sm">
        <label htmlFor="access-email" className="sr-only">
          Work email
        </label>
        <Input
          id="access-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="h-full flex-1 border-0 bg-transparent pl-4 text-base shadow-none placeholder:text-ink-faint focus-visible:ring-0 md:text-base"
        />
        <Button type="submit" className="h-11 min-w-[152px] sm:h-[43px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={sent ? "sent" : "ask"}
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, filter: "blur(4px)", transform: "scale(0.96)" }}
              animate={{ opacity: 1, filter: "blur(0px)", transform: "scale(1)" }}
              exit={{ opacity: 0, filter: "blur(4px)", transform: "scale(0.96)" }}
              transition={{ duration: 0.25, ease: EASE_SWAP }}
            >
              {sent ? (
                <>
                  <Check className="size-4" /> On the list
                </>
              ) : (
                "Request access"
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
      <label className={cn("flex min-h-11 cursor-pointer items-center gap-2 text-[14px] text-ink-soft sm:min-h-0")}>
        <Checkbox name="updates" />
        Email me when a new build ships.
      </label>
    </motion.form>
  )
}
