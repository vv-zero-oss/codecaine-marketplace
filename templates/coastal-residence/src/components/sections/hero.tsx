import { AnimatePresence, motion, useAnimate, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { DURATION, EASE_OUT, EASE_REVEAL } from "@/components/motion"
import { ScriptReveal, StretchText } from "@/components/ui/stretch-text"
import { brand, hero } from "@/content"
import { cn } from "@/lib/utils"

type Mode = (typeof hero.modes)[number]["id"]

/** The arch the page opens through, as a clip-path the hero is cut to. */
function archPath(width: number, top: number, radius: number) {
  const side = (100 - width) / 2
  return `inset(${top}% ${side}% 0% ${side}% round ${radius}vw ${radius}vw 0vw 0vw)`
}

/** "By day — by night": switches the photograph under the headline. */
function DayNight({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div role="group" aria-label="Time of day" className="flex items-center gap-3 sm:gap-5">
      {hero.modes.map((m, i) => (
        <div key={m.id} className="flex items-center gap-3 sm:gap-5">
          {i === 1 && (
            <span aria-hidden="true" className="relative block h-px w-10 bg-paper/40 sm:w-16">
              <motion.span
                className="absolute top-1/2 block size-1.5 -translate-y-1/2 rounded-full bg-paper"
                animate={{ left: mode === "day" ? "0%" : "calc(100% - 6px)" }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              />
            </span>
          )}
          <button
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => onChange(m.id)}
            className={cn(
              "label min-h-11 px-1 tracking-[0.3em] transition-opacity duration-300",
              mode === m.id ? "opacity-100" : "opacity-45 hover:opacity-80",
            )}
          >
            {m.label}
          </button>
        </div>
      ))}
    </div>
  )
}

/**
 * The opening: a plum screen, an arch rising out of the bottom of it with the
 * house inside, and — as the name writes itself in — the arch opening out to
 * the whole window.
 */
export function Hero({ onReady }: { onReady?: () => void }) {
  const reduce = useReducedMotion()
  const [scope, animate] = useAnimate()
  const [letters, setLetters] = useState(!!reduce)
  const [open, setOpen] = useState(!!reduce)
  const [mode, setMode] = useState<Mode>("day")
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"])

  useEffect(() => {
    if (reduce) {
      onReady?.()
      return
    }
    const narrow = window.innerWidth < 768
    const width = narrow ? 62 : 30
    const radius = width / 2
    const clip = scope.current as HTMLElement
    let cancelled = false
    ;(async () => {
      // The arch is a window onto the photograph, so wait for it (briefly).
      const still = new Image()
      still.src = hero.image
      await Promise.race([still.decode().catch(() => {}), new Promise((r) => setTimeout(r, 2500))])
      if (cancelled) return
      await animate(
        clip,
        { clipPath: [archPath(width, 100, radius), archPath(width, 22, radius)] },
        { duration: DURATION.archRise, ease: EASE_OUT },
      )
      if (cancelled) return
      await new Promise((r) => setTimeout(r, DURATION.archHold * 1000))
      setLetters(true)
      await new Promise((r) => setTimeout(r, 150))
      if (cancelled) return
      setOpen(true)
      onReady?.()
      await animate(
        clip,
        { clipPath: [archPath(width, 22, radius), archPath(100, 0, 0)] },
        { duration: DURATION.archOpen, ease: EASE_REVEAL },
      )
      if (!cancelled) clip.style.clipPath = "none"
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={section} id="top" data-tone="light" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-plum">
      {/* The faint rings round the arch while it waits. */}
      <AnimatePresence>
        {!open && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            {[4, 8].map((grow) => (
              <div
                key={grow}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full border border-b-0 border-plum-soft w-[calc(62vw+var(--g))] h-[calc(78%+var(--g))] md:w-[calc(30vw+var(--g))]"
                style={{ ["--g" as string]: `${grow}vw` }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scope}
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: reduce ? "none" : archPath(30, 100, 15) }}
      >
        <motion.div className="absolute inset-0 -top-[10%]" style={{ y: imageY }}>
          {/* One scene, graded two ways: a deep noon sky, or dusk. */}
          <img
            src={hero.image}
            alt="A white Mediterranean house and a tall palm under a clear sky"
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-[50%_0%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-deep via-sky/70 via-45% to-transparent to-75% mix-blend-multiply" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-dusk-deep via-dusk to-dusk/60 mix-blend-multiply"
            initial={false}
            animate={{ opacity: mode === "night" ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/5 to-transparent" />
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className="relative flex h-full flex-col items-center justify-center pb-[12vh] text-paper sm:justify-start sm:pb-0 sm:pt-[7vh]"
        >
          <h1 className="relative text-center font-condensed text-[clamp(4.5rem,10.4vw,12.5rem)] leading-[0.86]">
            <StretchText text={brand.word[0]} play={letters} className="block" />
            <StretchText text={brand.word[1]} play={letters} delay={0.12} className="block" />
            <span className="absolute left-[34%] top-[70%] -rotate-[8deg] font-script text-[0.82em] normal-case leading-none tracking-normal sm:left-[26%]">
              {letters && (
                <ScriptReveal play="mount" delay={0.5}>
                  {brand.town}
                </ScriptReveal>
              )}
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={letters ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.9 }}
            className="mt-[18vh] grid w-full max-w-[1000px] grid-cols-2 items-center gap-y-6 px-6 sm:mt-[20vh] sm:grid-cols-[1fr_auto_1fr]"
          >
            <p className="whitespace-nowrap font-condensed text-[clamp(1.3rem,2.8vw,3rem)]">{hero.left}</p>
            <div className="order-last col-span-2 justify-self-center sm:order-none sm:col-span-1">
              <DayNight mode={mode} onChange={setMode} />
            </div>
            <p className="whitespace-nowrap text-right font-condensed text-[clamp(1.3rem,2.8vw,3rem)]">{hero.right}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
