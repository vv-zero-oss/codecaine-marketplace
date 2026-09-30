import { useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react"
import { Loader2, PenLine } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { BlurText } from "@/components/motion/blur-text"
import { Container } from "@/components/ui/container"
import { live, mockups } from "@/content"
import { BLUR, DURATION, EASE_OUT } from "@/lib/motion"
import { useScrub, useScrubBlur } from "@/lib/scrub"
import { cn } from "@/lib/utils"

/**
 * The product, in three steps, pinned while you scroll through them: prompt a
 * page, shape it, publish it. The product shot rises out of a mauve glow and
 * sharpens; each step swaps the shot and the status toast with a blur
 * crossfade, so nothing cuts.
 *
 * Each step is also an action in the editor ("Live pages" group), so a
 * designer can hold any one of them without scrolling.
 */
export function LivePages() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [scrolled, setScrolled] = useState(0)
  const [forced, setForced] = useState<number | null>(null)
  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(v < 0.38 ? 0 : v < 0.68 ? 1 : 2))
  const step = forced ?? scrolled

  const stepNames = ["Prompt", "Shape", "Publish"]
  // Three hooks, one per step — written out because hooks cannot be looped.
  useCanvasAction(stepNames[0], (on) => setForced(on === false ? null : 0), { on: forced === 0, group: "Live pages" })
  useCanvasAction(stepNames[1], (on) => setForced(on === false ? null : 1), { on: forced === 1, group: "Live pages" })
  useCanvasAction(stepNames[2], (on) => setForced(on === false ? null : 2), { on: forced === 2, group: "Live pages" })

  const rise = useScrub(scrollYProgress, [0, 0.14], [reduced ? 0 : 80, 0])
  const scale = useScrub(scrollYProgress, [0, 0.14], [reduced ? 1 : 0.92, 1])
  const filter = useScrubBlur(scrollYProgress, [0, 0.14], [reduced ? 0 : BLUR, 0])
  const current = live.steps[step]

  return (
    <section ref={ref} id="live" className="relative h-[340svh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-nav" data-canvas-ignore>
        <Container className="flex flex-1 flex-col justify-center gap-6 py-6 md:gap-10 lg:gap-12">
          <div className="text-center">
            <p className="mb-3 text-nav font-medium text-mist">
              <BlurText text={live.eyebrow} by="line" />
            </p>
            <h2 className="text-scene font-medium tracking-scene text-balance">
              <BlurText text={live.title} by="line" delay={0.08} />
            </h2>
          </div>

          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-16">
            <StepList step={step} />

            <motion.div className="relative" style={{ y: rise, scale, filter }}>
              <div aria-hidden className="absolute inset-x-[-12%] -top-1/4 bottom-[-18%] -z-10 bg-mauve-glow opacity-80" />
              <div className="relative aspect-[1600/918] overflow-hidden rounded-frame bg-paper shadow-card">
                {[mockups.dark, mockups.light, mockups.light].map((shot, i) => (
                  <motion.img
                    key={i}
                    src={shot.src}
                    alt={i === step ? shot.alt : ""}
                    aria-hidden={i !== step}
                    className="absolute inset-0 size-full object-cover"
                    initial={false}
                    animate={{
                      opacity: i === step ? 1 : 0,
                      filter: i === step || reduced ? "blur(0px)" : `blur(${BLUR / 2}px)`,
                    }}
                    transition={{ duration: DURATION.swap, ease: EASE_OUT }}
                  />
                ))}
                <StatusToast status={current.status} version={current.version} step={step} />
              </div>
              <PublishedCard shown={step === 2} />
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  )
}

/** The three steps, the current one in ink with its sentence under it. On a
 *  phone only the current one shows. */
export function StepList({ step }: { step: number }) {
  return (
    <ol className="flex flex-col gap-1 lg:gap-5">
      {live.steps.map((item, i) => (
        <li key={item.title} className={cn(i !== step && "hidden lg:block")}>
          <p
            className={cn(
              "text-[clamp(18px,1.6vw,24px)] font-medium tracking-scene transition-colors duration-(--duration-theme)",
              i === step ? "text-ink" : "text-ink-muted/60",
            )}
          >
            <span className="mr-3 text-nav text-mist tabular-nums">0{i + 1}</span>
            {item.title}
          </p>
          <AnimatePresence initial={false}>
            {i === step && (
              <motion.p
                className="max-w-[40ch] overflow-hidden pt-2 text-body text-ink-soft"
                initial={{ opacity: 0, filter: `blur(${BLUR / 2}px)`, height: 0 }}
                animate={{ opacity: 1, filter: "blur(0px)", height: "auto" }}
                exit={{ opacity: 0, filter: `blur(${BLUR / 2}px)`, height: 0 }}
                transition={{ duration: DURATION.swap, ease: EASE_OUT }}
              >
                {item.body}
              </motion.p>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ol>
  )
}

/** What the canvas is doing, as a toast in the corner of the shot. */
export function StatusToast({ status, version, step }: { status: string; version: string; step: number }) {
  const Icon = step === 0 ? Loader2 : PenLine
  return (
    <div className="absolute top-[4%] right-[3%] w-[min(260px,58%)]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={status}
          className="flex items-center gap-2.5 rounded-[12px] bg-paper/95 px-3 py-2.5 text-[12px] shadow-chip backdrop-blur-sm"
          initial={{ opacity: 0, filter: `blur(${BLUR / 2}px)`, transform: "translateY(-6px) scale(0.97)" }}
          animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px) scale(1)" }}
          exit={{ opacity: 0, filter: `blur(${BLUR / 2}px)`, transform: "translateY(6px) scale(0.97)" }}
          transition={{ duration: DURATION.swap, ease: EASE_OUT }}
        >
          {step === 2 ? (
            <span className="size-2 shrink-0 rounded-full bg-live" aria-hidden />
          ) : (
            <Icon className={cn("size-3.5 shrink-0 text-mist", step === 0 && "animate-spin")} aria-hidden />
          )}
          <span className="truncate font-medium">{status}</span>
          <span className="ml-auto font-mono text-[10px] text-mist">{version}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** The published site, lifting out of the shot on the last step. */
export function PublishedCard({ shown }: { shown: boolean }) {
  const reduced = useReducedMotion()
  return (
    <AnimatePresence>
      {shown && (
        <motion.figure
          className="absolute -bottom-[8%] -left-[4%] w-[38%] overflow-hidden rounded-frame bg-paper shadow-card sm:-left-[6%]"
          initial={{ opacity: 0, filter: `blur(${reduced ? 0 : BLUR}px)`, transform: reduced ? "none" : "translateY(24px) scale(0.96)" }}
          animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px) scale(1)" }}
          exit={{ opacity: 0, filter: `blur(${reduced ? 0 : BLUR}px)`, transform: reduced ? "none" : "translateY(24px) scale(0.96)" }}
          transition={{ duration: DURATION.reveal, ease: EASE_OUT }}
        >
          <figcaption className="flex items-center gap-1.5 border-b border-hairline px-2.5 py-1.5 text-[10px] text-mist">
            <span className="size-1.5 rounded-full bg-live" aria-hidden />
            {mockups.published.url}
          </figcaption>
          <img src={mockups.published.src} alt={mockups.published.alt} className="aspect-square w-full object-cover" />
        </motion.figure>
      )}
    </AnimatePresence>
  )
}
