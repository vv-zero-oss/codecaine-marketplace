import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { FLOW_SCREENS, FlowPhone } from "@/components/mock/flow-screens"
import { FLOW_STEPS } from "@/content/home-story"
import { cn } from "@/lib/utils"

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches)
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)")
    const update = () => setDesktop(query.matches)
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return desktop
}

/** The phone on its dotted panel, swapping to the screen for `step`. */
function PhoneStage({ step, swap }: { step: number; swap: "fade" | "slide" }) {
  const Screen = FLOW_SCREENS[step]
  const reduced = useReducedMotion()
  const slide = swap === "slide" && !reduced
  return (
    <div className="dot-grid grid place-items-center rounded-(--radius-panel) bg-panel px-4 py-10 lg:h-[min(720px,calc(100svh-120px))]">
      <FlowPhone className="max-lg:h-[520px] max-lg:w-[270px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, transform: slide ? "translateY(24px)" : "none", filter: "blur(4px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
            exit={{ opacity: 0, transform: slide ? "translateY(-24px)" : "none", filter: "blur(4px)" }}
            transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            <Screen />
          </motion.div>
        </AnimatePresence>
      </FlowPhone>
    </div>
  )
}

/**
 * "How a dollar moves" as a pinned walk-through. On desktop the step list
 * and the phone stick while the section scrolls by `stepHeight` viewport
 * heights per step; the lime rail fills, the active step opens and the
 * phone swaps its screen. Steps are buttons that scroll to their moment.
 * Below `lg` it unpins into a plain stack, each step with its own phone.
 *
 * Each step is also an action in the editor ("Dollar flow"), which holds
 * the stage on that screen.
 */
export function DollarFlowStage({
  stepHeight = 80,
  swap = "slide",
  className,
}: {
  /** Scroll per step while pinned, in viewport heights. */
  stepHeight?: number
  swap?: "fade" | "slide"
  className?: string
}) {
  const pin = useRef<HTMLDivElement>(null)
  const desktop = useIsDesktop()
  const { designing } = useCanvasDesignMode()
  const reduced = useReducedMotion()
  const [scrolled, setScrolled] = useState(0)
  const [forced, setForced] = useState<number | null>(null)
  const count = FLOW_STEPS.length

  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] })
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1])
  useMotionValueEvent(scrollYProgress, "change", (p) => setScrolled(Math.min(count - 1, Math.floor(p * count))))

  FLOW_STEPS.forEach((step, i) => {
    // A fixed list, so the hooks run in the same order every render.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Flow: ${step.title}`, (next) => setForced((next ?? forced !== i) ? i : null), { on: forced === i, group: "Dollar flow" })
  })

  const pinned = desktop && !designing && forced === null
  const active = forced ?? (pinned ? scrolled : 0)

  const goTo = (i: number) => {
    const element = pin.current
    if (!element || !pinned) {
      setForced(i)
      return
    }
    const top = element.getBoundingClientRect().top + window.scrollY
    const travel = element.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + travel * ((i + 0.5) / count), behavior: reduced ? "auto" : "smooth" })
  }

  if (!desktop) {
    return (
      <ol className={cn("flex flex-col gap-14", className)}>
        {FLOW_STEPS.map((step, i) => {
          const Screen = FLOW_SCREENS[i]
          return (
            <li key={step.id} className="flex flex-col gap-5">
              <div>
                <p className="font-mono text-[13px] text-ink-3">{step.number}</p>
                <h3 className="type-head mt-1 text-h3 text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[46ch] text-[16px] text-ink-2">{step.body}</p>
              </div>
              <div className="dot-grid grid place-items-center rounded-(--radius-panel) bg-panel px-4 py-8">
                <FlowPhone className="h-[520px] w-[270px]">
                  <Screen />
                </FlowPhone>
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <div ref={pin} className={cn("relative", className)} style={{ height: pinned ? `${count * stepHeight + 100}vh` : undefined }}>
      <div className={cn("top-0 grid h-svh min-h-[680px] grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-center gap-12 py-[60px]", pinned ? "sticky" : "relative")}>
        <div className="relative pl-8">
          <span aria-hidden className="absolute top-2 bottom-2 left-0 w-[2px] rounded-full bg-line" />
          <motion.span
            aria-hidden
            style={{ scaleY: pinned ? rail : (active + 1) / count }}
            className="absolute top-2 bottom-2 left-0 w-[2px] origin-top rounded-full bg-ink"
          />
          <ol className="flex flex-col gap-1">
            {FLOW_STEPS.map((step, i) => {
              const on = i === active
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={on ? "step" : undefined}
                    className="group/step relative w-full rounded-(--radius-card) py-3 text-left"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-[22px] -left-[37px] size-3 rounded-full ring-4 ring-page transition-[background-color,transform] duration-(--duration-swap) ease-(--ease-out-strong)",
                        on ? "scale-100 bg-lime" : "scale-75 bg-line-strong",
                      )}
                    />
                    <span className="flex items-baseline gap-4">
                      <span className={cn("font-mono text-[13px] transition-colors duration-(--duration-swap)", on ? "text-ink" : "text-ink-4")}>{step.number}</span>
                      <span className={cn("type-head text-h3 transition-colors duration-(--duration-swap)", on ? "text-ink" : "text-ink-4 group-hover/step:text-ink-3")}>{step.title}</span>
                    </span>
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-(--duration-swap) ease-(--ease-out-strong)",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[42ch] pt-2 pl-8 text-[17px] text-ink-2">{step.body}</span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
        <PhoneStage step={active} swap={swap} />
      </div>
    </div>
  )
}
