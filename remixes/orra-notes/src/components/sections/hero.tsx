import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check, CircleCheck, ListChecks, Mic, Sparkles } from "lucide-react"
import { useState } from "react"

import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { useContactSales } from "@/components/contact-sales"
import { RotatingLine } from "@/components/motion/rotating-line"
import { Button, ButtonLink } from "@/components/ui/button"
import { HERO, type HeroScene } from "@/content"
import { DURATION, EASE } from "@/lib/easing"
import { cn } from "@/lib/utils"
import { PHOTOS, pexels } from "@/photos"

/**
 * The hero: a full-width horizon gradient (amber → cobalt) holding the
 * headline, four bullet rows and the CTAs on the left, and a device frame on
 * the right with the note Orra is writing. The headline's second line
 * follows the frame's scene.
 */
export function Hero() {
  const [scene, setScene] = useState(0)
  const contact = useContactSales()
  return (
    <section id="top" className="-mt-[68px] px-2 sm:-mt-[72px] sm:px-3">
      <div
        className="relative isolate overflow-hidden rounded-[28px] pt-28 sm:rounded-panel sm:pt-36"
        style={{ background: "var(--gradient-horizon)" }}
      >
        {/* A soft darkening at the foot, so the frame sits into the canvas. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-void/35 to-transparent" />
        <div
          data-canvas-ignore
          className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10"
        >
          <div className="min-w-0 pb-4 lg:pb-24">
            <StatusBanner text={HERO.banner} />
            <h1 className="mt-6 text-display font-medium text-snow">
              <span className="block">{HERO.lead}</span>
              <RotatingLine text={HERO.scenes[scene].line} />
            </h1>
            <p className="mt-6 max-w-[460px] text-subheading leading-[1.45] text-snow/85">{HERO.body}</p>
            <ul className="mt-8 flex flex-col gap-4">
              {HERO.bullets.map((bullet) => (
                <FeatureBullet key={bullet}>{bullet}</FeatureBullet>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#signup" size="lg">
                {HERO.primary}
              </ButtonLink>
              <Button variant="secondary" size="lg" onClick={contact} className="border-snow/40 text-snow">
                {HERO.secondary}
              </Button>
            </div>
          </div>
          <HeroShowcase scenes={HERO.scenes} active={scene} onChange={setScene} className="self-end" />
        </div>
      </div>
    </section>
  )
}

/** The announcement pill above the headline. */
export function StatusBanner({ text, href = "#workspace" }: { text: string; href?: string }) {
  return (
    <a
      href={href}
      className="group/banner inline-flex max-w-full items-center gap-2 rounded-pill border border-snow/35 bg-void/20 py-1.5 pr-3.5 pl-2 text-[14px] font-medium text-snow backdrop-blur-[4px] transition-colors duration-(--duration-fast) hover:bg-void/30"
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-icon bg-snow text-on-snow">
        <Sparkles className="size-3" strokeWidth={2} />
      </span>
      <span className="truncate">{text}</span>
      <ArrowRight className="size-3.5 shrink-0 transition-transform duration-(--duration-fast) ease-out-soft group-hover/banner:translate-x-0.5" />
    </a>
  )
}

/** One hero bullet: a 4px-radius white glyph and a line of text. */
export function FeatureBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-body text-snow/95">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-icon bg-snow text-on-snow">
        <Check className="size-3" strokeWidth={2.5} />
      </span>
      {children}
    </li>
  )
}

const CHIP_ICONS = { record: Mic, check: CircleCheck, list: ListChecks, sparkle: Sparkles }

/**
 * The device frame: a white screen with rounded top corners, bleeding off the
 * bottom of the hero, showing the note Orra is writing for each scene —
 * transcript lines arriving, then what it made of them. A row of pills above
 * picks the scene, and the active pill's bar is the timer.
 *
 * The timer is a CSS animation whose end advances the scene, so the editor's
 * Motion switch freezes the carousel with everything else. `interval` is
 * seconds per scene.
 */
export function HeroShowcase({
  scenes,
  active,
  onChange,
  interval = 6,
  autoplay = true,
  lineStagger = 0.35,
  className,
}: {
  scenes: HeroScene[]
  active: number
  onChange: (index: number) => void
  interval?: number
  autoplay?: boolean
  lineStagger?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const running = autoplay && !designing && !reduce
  const current = scenes[active]
  const enter = (delay: number) => ({
    initial: { opacity: 0, transform: reduce ? "none" : "translateY(8px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: DURATION.base, ease: EASE.out, delay },
  })

  return (
    <div className={cn("flex min-w-0 flex-col gap-4", className)}>
      <SceneTabs scenes={scenes} active={active} onChange={onChange} interval={interval} running={running} />
      <div className="min-h-[400px] overflow-hidden rounded-t-[28px] bg-snow text-on-snow sm:min-h-[460px] sm:rounded-t-large">
        <div className="flex items-center gap-2 border-b border-on-snow/10 px-5 py-4 sm:px-7">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-pill bg-on-snow/15" />
            <span className="size-2.5 rounded-pill bg-on-snow/15" />
            <span className="size-2.5 rounded-pill bg-on-snow/15" />
          </span>
          <span className="ml-3 truncate text-[14px] font-medium">{current.title}</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-pill bg-on-snow/5 px-2.5 py-1 text-[12px] tabular-nums">
            <span className="size-1.5 rounded-pill bg-rose" /> {current.time}
          </span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            className="grid gap-5 p-5 sm:p-7 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
            exit={{ opacity: 0, transition: { duration: DURATION.fast } }}
          >
            <div>
              <p className="text-caption tracking-[0.08em] text-on-snow/50 uppercase">Live transcript</p>
              <ul className="mt-3 flex flex-col gap-3" aria-live="polite">
                {current.transcript.map((line, index) => (
                  <motion.li key={line.text} className="flex gap-3" {...enter(0.15 + index * lineStagger)}>
                    <img
                      src={pexels(PHOTOS.team[line.speaker], 96)}
                      alt=""
                      className="size-7 shrink-0 rounded-pill object-cover"
                    />
                    <p className="text-[14px] leading-[1.45] text-on-snow/85">{line.text}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="rounded-ui bg-on-snow/[0.04] p-4">
              <p className="flex items-center gap-1.5 text-caption tracking-[0.08em] text-on-snow/50 uppercase">
                <Sparkles className="size-3" /> Orra’s notes
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {current.chips.map((chip, index) => {
                  const Icon = CHIP_ICONS[chip.icon]
                  return (
                    <motion.li
                      key={chip.text}
                      className="flex items-start gap-2.5 text-[14px] leading-snug"
                      {...enter(0.15 + current.transcript.length * lineStagger + index * 0.12)}
                    >
                      <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-icon bg-on-snow text-snow">
                        <Icon className="size-3" strokeWidth={2} />
                      </span>
                      {chip.text}
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {scenes.map((scene, index) => (
        <SceneAction key={scene.id} label={scene.tab} on={index === active} select={() => onChange(index)} />
      ))}
    </div>
  )
}

/** Registers one scene with the editor's Actions row, so each is a switch. */
function SceneAction({ label, on, select }: { label: string; on: boolean; select: () => void }) {
  useCanvasAction(`Hero scene: ${label}`, select, { on, group: "Hero" })
  return null
}

export function SceneTabs({
  scenes,
  active,
  onChange,
  interval,
  running,
}: {
  scenes: HeroScene[]
  active: number
  onChange: (index: number) => void
  interval: number
  running: boolean
}) {
  return (
    <div role="tablist" aria-label="Where Orra listens" className="flex flex-wrap gap-2">
      {scenes.map((scene, index) => {
        const selected = index === active
        return (
          <button
            key={scene.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(index)}
            className={cn(
              "relative h-9 min-w-11 overflow-hidden rounded-pill border px-4 text-[14px] transition-colors duration-(--duration-fast)",
              selected
                ? "border-snow/60 bg-void/25 text-snow"
                : "border-snow/25 text-snow/75 hover:border-snow/45 hover:text-snow",
            )}
          >
            {scene.tab}
            {selected ? (
              <span aria-hidden className="absolute inset-x-3 bottom-1 h-px overflow-hidden">
                <span
                  key={`${scene.id}-${running}`}
                  className="absolute inset-0 origin-left bg-snow"
                  style={{
                    animation: running ? `hero-progress ${interval}s linear forwards` : undefined,
                    transform: running ? undefined : "scaleX(1)",
                  }}
                  onAnimationEnd={() => onChange((active + 1) % scenes.length)}
                />
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
