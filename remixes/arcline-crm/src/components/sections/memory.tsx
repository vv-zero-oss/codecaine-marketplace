import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Isocon, type IsoconName } from "@/components/icons/isocon"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { MEMORY } from "@/content/home"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * The horizon: a thin, glowing rim of a planet rising under the headline —
 * a conic gradient masked down to its edge. It fades in, then shrinks and
 * fades as the band scrolls past.
 */
export function Horizon() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0.35, 0.9], [1, reduced ? 1 : 0.8])
  const fade = useTransform(scrollYProgress, [0.1, 0.35, 0.8, 1], [0, 1, 1, 0])
  const opacity = reduced ? 1 : fade
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] overflow-hidden">
      <motion.div style={{ scale, opacity }} className="absolute top-0 left-1/2 aspect-square w-[150%] -translate-x-1/2 origin-top md:w-[118%]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 250deg, var(--red), var(--yellow) 8%, var(--ink-soft) 20%, var(--cyan) 34%, var(--accent-strong) 48%, var(--accent-strong) 56%, var(--void) 66%, var(--void) 92%, var(--red))",
            mask: "radial-gradient(circle at 50% 50%, transparent 69.4%, #000 69.8%, #000 70%, transparent 71.5%)",
            WebkitMask: "radial-gradient(circle at 50% 50%, transparent 69.4%, #000 69.8%, #000 70%, transparent 71.5%)",
            filter: "blur(0.4px)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-60 blur-2xl"
          style={{
            background:
              "conic-gradient(from 250deg, var(--red), var(--yellow) 8%, var(--ink-soft) 20%, var(--cyan) 34%, var(--accent-strong) 48%, var(--accent-strong) 56%, transparent 66%, transparent 92%, var(--red))",
            mask: "radial-gradient(circle at 50% 50%, transparent 66%, #000 70%, transparent 74%)",
            WebkitMask: "radial-gradient(circle at 50% 50%, transparent 66%, #000 70%, transparent 74%)",
          }}
        />
        <div className="absolute inset-[15%] rounded-full bg-void" />
      </motion.div>
    </div>
  )
}

/**
 * Signals: three kinds, one open at a time, each with a thin line that fills
 * while it's up and then hands over to the next. The isometric picture on
 * the right changes with it. Holds still while designing and for reduced
 * motion; `Signal` in the editor steps through them.
 */
function SignalsAccordion() {
  const items = MEMORY.signals.items
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = !!reduced || designing
  const duration = 6

  useCanvasAction("Signal", () => setOpen((o) => (o + 1) % items.length), { group: "Deal Memory" })

  useEffect(() => {
    if (still) return
    const id = window.setTimeout(() => setOpen((o) => (o + 1) % items.length), duration * 1000)
    return () => window.clearTimeout(id)
  }, [open, still, items.length])

  const art: IsoconName[][] = [
    ["search-insights", "analytics", "person"],
    ["shield-lock", "security", "key"],
    ["rocket-launch", "trending-up", "groups"],
  ]

  return (
    <div className="grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-2 lg:gap-0">
      <div className="flex flex-col gap-6 lg:border-r lg:border-line-strong lg:pr-14">
        <Eyebrow className="self-start">{MEMORY.signals.eyebrow}</Eyebrow>
        <Heading lead={MEMORY.signals.lead} rest={MEMORY.signals.rest} className="max-w-[16ch]" />
        <ButtonLink href="/agents" size="sm" arrow className="self-start">
          {MEMORY.signals.cta}
        </ButtonLink>
        <ul className="mt-6 flex flex-col">
          {items.map((item, i) => (
            <li key={item.title} className="border-t border-line-strong">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-expanded={open === i}
                className={cn(
                  "flex w-full items-center py-4 text-left text-base font-medium transition-colors duration-300",
                  open === i ? "text-ink" : "text-ink-3 hover:text-ink-2",
                )}
              >
                {item.title}
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE.inOutCubic }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[46ch] pb-4 text-sm text-ink-2">{item.body}</p>
                    <div className="mb-4 h-px bg-line-strong">
                      <motion.div
                        key={`${open}-bar`}
                        className="h-full origin-left bg-ink-soft"
                        initial={{ scaleX: still ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: still ? 0 : duration, ease: "linear" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden lg:pl-14">
        <div aria-hidden className="texture-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(closest-side,#000,transparent)]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={open}
            className="relative grid grid-cols-3 items-end gap-6 text-ink-soft"
            initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(6px)", y: -10 }}
            transition={{ duration: 0.5, ease: EASE.out }}
          >
            {art[open].map((name, i) => (
              <div key={name} className={cn("w-[88px] md:w-[120px]", i === 1 && "-translate-y-10 text-accent-ink")}>
                <Isocon name={name} stroke={1} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Deal Memory: why the CRM is accurate. A dark band with a horizon rising
 * under the name, five things it does (each icon traces itself in on hover),
 * then the signals it watches.
 */
export function Memory() {
  return (
    <Section id="memory" tone="void" className="overflow-hidden">
      <div className="relative flex min-h-[520px] flex-col items-center justify-start pt-[var(--spacing-section)] text-center md:min-h-[640px]">
        <Horizon />
        <Reveal className="relative">
          <p className="text-base text-ink-2">{MEMORY.caption}</p>
          <p className="font-display mt-2 text-[clamp(52px,7.5vw,96px)] leading-none font-semibold tracking-[-0.024em] text-ink">
            {MEMORY.title}
            <sup className="ml-1 align-super text-[0.25em] text-ink-2">™</sup>
          </p>
        </Reveal>
      </div>

      <div className="relative grid border-t border-line-strong sm:grid-cols-2 lg:grid-cols-5">
        {MEMORY.cells.map((cell) => (
          <div
            key={cell.title}
            tabIndex={0}
            className="group/iso flex min-h-[240px] flex-col justify-between border-b border-line-strong p-7 outline-none transition-colors duration-300 hover:bg-page sm:border-r lg:min-h-[278px] lg:border-b-0 lg:last:border-r-0"
          >
            <div className="w-12 text-ink-2 transition-colors duration-300 group-hover/iso:text-accent-ink">
              <Isocon name={cell.icon as IsoconName} draw />
            </div>
            <div>
              <p className="text-base font-medium text-ink">{cell.title}</p>
              <p className="mt-1 text-sm text-ink-2">{cell.body}</p>
            </div>
          </div>
        ))}
      </div>

      <Container className="border-t border-line-strong py-[var(--spacing-section)]">
        <SignalsAccordion />
      </Container>
    </Section>
  )
}
