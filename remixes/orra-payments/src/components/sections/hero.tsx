import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { BarChart3, CircleCheck, Landmark, ToggleRight } from "lucide-react"
import { useState } from "react"

import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { useContactSales } from "@/components/contact-sales"
import { RotatingLine } from "@/components/motion/rotating-line"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { HERO, type HeroScene } from "@/content"
import { DURATION, EASE } from "@/lib/easing"
import { cn } from "@/lib/utils"
import { pexels } from "@/photos"

/**
 * The headline, the pitch, two buttons — and the showcase under them. The
 * second line of the headline follows the showcase's scene.
 */
export function Hero() {
  const [scene, setScene] = useState(0)
  const contact = useContactSales()
  return (
    <section id="top" className="pt-14 sm:pt-20 lg:pt-[120px]">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-16">
        <div>
          <Eyebrow className="mb-4 text-ink">{HERO.eyebrow}</Eyebrow>
          <h1 className="text-display font-normal">
            <span className="block">{HERO.lead}</span>
            <RotatingLine text={HERO.scenes[scene].line} />
          </h1>
        </div>
        <div className="lg:pb-3">
          <p className="text-[15px] leading-[1.4] text-ink-2 sm:text-base">{HERO.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="#signup" size="lg">
              {HERO.primary}
            </ButtonLink>
            <Button variant="secondary" size="lg" onClick={contact}>
              {HERO.secondary}
            </Button>
          </div>
        </div>
      </Container>
      <div data-canvas-ignore className="mx-auto mt-12 w-full max-w-[1480px] px-3 sm:px-10 lg:mt-[72px]">
        <HeroShowcase scenes={HERO.scenes} active={scene} onChange={setScene} />
      </div>
    </section>
  )
}

const CHIP_ICONS = { check: CircleCheck, toggle: ToggleRight, chart: BarChart3, bank: Landmark }

/**
 * A photo per product, crossfading on a timer, with status chips that stack
 * in over it and a row of thumbnails that doubles as the timer's progress.
 *
 * The timer *is* the active thumbnail's progress bar — a CSS animation whose
 * end advances the scene — so the editor's Motion switch freezes the
 * carousel along with everything else. `interval` is seconds per scene.
 */
export function HeroShowcase({
  scenes,
  active,
  onChange,
  interval = 6,
  autoplay = true,
  chipStagger = 0.12,
  className,
}: {
  scenes: HeroScene[]
  active: number
  onChange: (index: number) => void
  interval?: number
  autoplay?: boolean
  chipStagger?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const running = autoplay && !designing && !reduce
  const current = scenes[active]

  return (
    <div
      className={cn(
        "relative isolate aspect-[4/5] overflow-hidden rounded-xl bg-espresso sm:aspect-[16/10] lg:aspect-[16/9]",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={current.id}
          src={pexels(current.photo, 2000)}
          alt={current.alt}
          className="absolute inset-0 size-full object-cover"
          initial={{ opacity: 0, transform: "scale(1.04)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.9, ease: EASE.out }}
        />
      </AnimatePresence>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/70 to-transparent" />

      <ul className="absolute top-5 left-5 flex flex-col items-start gap-2 sm:top-10 sm:left-10" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {current.chips.map((chip, index) => {
            const Icon = CHIP_ICONS[chip.icon]
            return (
              <motion.li
                key={`${current.id}-${chip.text}`}
                className="flex h-12 items-center gap-3 rounded-lg border border-white/10 bg-night/45 px-4 text-[14px] text-ink-inverse shadow-chip backdrop-blur-md sm:h-16 sm:px-6 sm:text-[17px]"
                initial={{ opacity: 0, transform: reduce ? "none" : "translateY(8px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transition: { duration: DURATION.fast } }}
                transition={{ duration: DURATION.base, ease: EASE.out, delay: 0.35 + index * chipStagger }}
              >
                <Icon className="size-4 text-ink-inverse/90" strokeWidth={1.6} />
                {chip.text}
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>

      <SceneTabs scenes={scenes} active={active} onChange={onChange} interval={interval} running={running} />
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
    <div
      role="tablist"
      aria-label="Products"
      className="absolute inset-x-3 bottom-3 grid grid-cols-4 gap-2 sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:w-[600px] sm:-translate-x-1/2 sm:gap-3"
    >
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
              "group/tab flex min-h-11 flex-col items-center gap-2 text-center transition-transform duration-(--duration-base) ease-out-soft",
              selected && "sm:-translate-y-1.5",
            )}
          >
            <span
              className={cn(
                "font-mono text-[10px] tracking-[0.06em] uppercase transition-colors duration-(--duration-fast) sm:text-[11px]",
                selected ? "text-ink-inverse" : "text-ink-inverse/60 group-hover/tab:text-ink-inverse/85",
              )}
            >
              {scene.tab}
            </span>
            <span className="relative hidden aspect-[7/4] w-full overflow-hidden rounded-[3px] sm:block">
              <img
                src={pexels(scene.photo, 320)}
                alt=""
                className={cn(
                  "size-full object-cover transition-[opacity,filter] duration-(--duration-base)",
                  selected ? "opacity-100" : "opacity-70 saturate-50 group-hover/tab:opacity-90",
                )}
              />
            </span>
            <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/20 sm:-mt-2 sm:h-[3px] sm:rounded-none">
              {selected ? (
                <span
                  key={`${scene.id}-${running}`}
                  className="absolute inset-0 origin-left bg-ink-inverse"
                  style={{
                    animation: running ? `hero-progress ${interval}s linear forwards` : undefined,
                    transform: running ? undefined : "scaleX(1)",
                  }}
                  onAnimationEnd={() => onChange((active + 1) % scenes.length)}
                />
              ) : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}
