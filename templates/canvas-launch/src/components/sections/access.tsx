import type * as React from "react"
import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { ArrowRight, Check } from "lucide-react"

import { Gallery3D } from "@/components/art/gallery-3d"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Mark } from "@/components/ui/mark"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { StackMarquee } from "./stack-marquee"

/*
 * The ask. A ring of things people made turns behind the line; then the form.
 * Getting in is the one moment on the page that earns a flourish: the button
 * leans toward the pointer, and on submit a ticket flips in with your place in
 * line.
 */

export function Access() {
  const ref = useRef<HTMLElement>(null)
  const { step, progress } = useSceneStep(ref, 3)

  return (
    <Scene
      ref={ref}
      beats={3.6}
      tone="bare"
      id="access"
      aria-label="Get early access"
      backdrop={<div className="size-full bg-closing bg-fixed" />}
      backdropExits={false}
    >
      <Gallery3D progress={progress} className={cn("top-[6svh] transition-opacity duration-700", step >= 1 ? "opacity-35" : "opacity-90")} />
      <SceneHeadline id={step >= 1 ? "in" : "possible"} size="xl" at="center" className="-mt-[8svh]">
        {step >= 1 ? "Get in early" : "Amazing things are possible"}
      </SceneHeadline>
      <AnimatePresence>{step >= 1 && <AccessForm key="form" />}</AnimatePresence>
      <div className="absolute inset-x-0 bottom-[3svh] sm:bottom-[4svh]">
        <p className="mb-5 text-center text-[12px] text-ink-soft sm:mb-7">Frames whatever your dev server is running</p>
        <StackMarquee />
      </div>
    </Scene>
  )
}

function AccessForm() {
  const [sent, setSent] = useState(false)
  return (
    <motion.div
      className="absolute top-[58svh] left-1/2 flex w-[min(440px,calc(100%-32px))] -translate-x-1/2 flex-col items-center gap-3 [perspective:900px]"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: EASE_SWAP }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <Ticket key="ticket" />
        ) : (
          <motion.form
            key="form"
            className="flex w-full flex-col items-center gap-3"
            exit={{ opacity: 0, rotateX: 60, transition: { duration: 0.25 } }}
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <div className="flex h-[54px] w-full items-center rounded-pill bg-surface/95 p-1 shadow-ring backdrop-blur-sm">
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
              <MagneticButton>Get early access</MagneticButton>
            </div>
            <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[14px] text-ink-soft sm:min-h-0">
              <Checkbox name="updates" />
              Email me when a new build ships.
            </label>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/** Leans a few pixels toward the pointer, and a highlight runs across it. */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })
  return (
    <motion.button
      type="submit"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.18)
        y.set((e.clientY - r.top - r.height / 2) * 0.3)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className="group relative flex h-[46px] cursor-pointer items-center gap-2 overflow-hidden rounded-pill bg-ink px-5 text-[15px] font-medium text-on-ink transition-transform duration-160 ease-press active:scale-[0.97]"
    >
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-on-ink/20 motion-safe:animate-[shine_2.8s_ease-in-out_infinite]" />
      <span className="relative">{children}</span>
      <ArrowRight className="relative size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </motion.button>
  )
}

/** Your place in line, as a ticket that flips up into view. */
function Ticket() {
  const [number] = useState(() => String(1000 + Math.floor(Math.random() * 400)).padStart(4, "0"))
  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-card bg-surface p-5 shadow-window"
      initial={{ opacity: 0, rotateX: -70, transform: "translateY(20px)" }}
      animate={{ opacity: 1, rotateX: 0, transform: "translateY(0px)" }}
      transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-[10px] bg-ink text-on-ink">
          <Mark className="size-6" />
        </span>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-[16px] font-medium">
            <Check className="size-4 text-mint-deep" strokeWidth={2.5} /> You're in
          </p>
          <p className="text-[13px] text-ink-muted">We'll email you when your build is ready.</p>
        </div>
        <div className={cn("text-right font-mono")}>
          <p className="text-[10px] tracking-widest text-ink-faint">NO.</p>
          <p className="text-[22px] font-medium tabular-nums">{number}</p>
        </div>
      </div>
      <div className="mt-4 border-t border-dashed border-ink/15 pt-3 font-mono text-[11px] tracking-wider text-ink-faint">
        CODECAINE · EARLY ACCESS · MACOS
      </div>
    </motion.div>
  )
}
