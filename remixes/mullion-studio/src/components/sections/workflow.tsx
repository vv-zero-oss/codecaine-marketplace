import { useCanvasAction } from "@canvas/react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useRef, useState } from "react"

import { Container } from "@/components/ui/container"
import { SectionHead } from "@/components/ui/section-head"
import { photo } from "@/lib/image"
import { EASE_OUT_EXPO } from "@/lib/motion"

const STEPS = [
  {
    title: "Drop the shoot",
    body: "Drag in a folder straight off the card — RAW, TIFF or JPEG, a few frames or four hundred. Mullion groups them by elevation and by time of day.",
    image: 16631149,
  },
  {
    title: "Pick a direction",
    body: "Choose one frame and set it the way the project should read: the hour, the sky, the season, the grade. That frame becomes the reference for the set.",
    image: 18214902,
  },
  {
    title: "Mask and refine",
    body: "Mullion finds glazing, sky, planting and people on its own. Brush over anything it should leave alone; every edit stays a layer you can switch off.",
    image: 37763125,
  },
  {
    title: "Export the set",
    body: "Full-resolution TIFFs for print, web sizes for the site, and a contact sheet for the client — named to your drawing register, in one pass.",
    image: 11540260,
  },
]

/**
 * How it works, held on screen while it is scrolled through: a giant step
 * number on the left that rolls to the next, the frame for each step wiping up
 * over the last in the middle, and the steps on the right with the current one
 * in ink. `stepLength` is how much scroll (in screen heights) each step takes.
 */
export function Workflow({ stepLength = 0.9 }: { stepLength?: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [active, setActive] = useState(0)
  const n = STEPS.length

  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(n - 1, Math.floor(p * n))))

  // Each step can be jumped to from the editor: scroll to where it is showing.
  STEPS.forEach((step, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Step ${i + 1}: ${step.title}`, () => {
      const el = ref.current
      if (!el) return
      const top = el.offsetTop + ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / n
      window.scrollTo({ top })
    }, { group: "How it works", on: active === i })
  })

  return (
    <section
      id="workflow"
      ref={ref}
      className="relative"
      style={{ height: `${100 + n * stepLength * 100}svh` }}
      aria-labelledby="workflow-title"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-20 pb-6 md:pt-24 md:pb-10">
        <Container className="flex h-full flex-col">
          <SectionHead index="03" label="How it works" aside={`${active + 1} / ${n}`} />
          <h2 id="workflow-title" className="sr-only">
            How it works
          </h2>

          <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-5 pt-6 md:grid-cols-[1fr_1.1fr] md:grid-rows-1 md:gap-10 lg:grid-cols-[1.1fr_1fr_1fr] lg:pt-10">
            {/* The step number, oversize, rolling */}
            <div className="relative overflow-hidden md:col-span-2 lg:col-span-1 lg:self-end" aria-hidden>
              <div className="relative h-[0.82em] overflow-hidden text-[clamp(6rem,24vw,12rem)] leading-[0.82] font-extrabold tracking-giant tabular-nums md:text-[clamp(8rem,20vw,26rem)] lg:text-giant">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={active}
                    className="block"
                    initial={reduced ? { opacity: 0 } : { y: "100%" }}
                    animate={reduced ? { opacity: 1 } : { y: "0%" }}
                    exit={reduced ? { opacity: 0 } : { y: "-100%" }}
                    transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
                  >
                    0{active + 1}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* The frames, wiping up over one another as the scroll goes */}
            <div className="relative min-h-0 overflow-hidden bg-paper-2 md:row-span-1">
              {STEPS.map((step, i) => (
                <StepFrame key={step.image} index={i} count={n} progress={scrollYProgress} image={step.image} reduced={!!reduced} />
              ))}
              <span className="absolute bottom-3 left-3 bg-paper px-1.5 py-0.5 text-label uppercase tracking-ui">
                {STEPS[active].title}
              </span>
            </div>

            {/* The steps */}
            <ol className="relative flex flex-col justify-end gap-6 md:pl-6">
              <span className="absolute inset-y-0 left-0 hidden w-px bg-hairline md:block" aria-hidden>
                <motion.span className="absolute inset-x-0 top-0 h-full origin-top bg-ink" style={{ scaleY: scrollYProgress }} />
              </span>
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className={
                    i === active
                      ? "block transition-opacity duration-500"
                      : "hidden opacity-25 transition-opacity duration-500 md:block"
                  }
                >
                  <p className="mb-2 flex gap-4 text-ui uppercase tracking-ui">
                    <span className="text-muted tabular-nums">0{i + 1}</span>
                    {step.title}
                  </p>
                  <p className="max-w-[44ch] text-body text-ink-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  )
}

function StepFrame({
  index,
  count,
  progress,
  image,
  reduced,
}: {
  index: number
  count: number
  progress: MotionValue<number>
  image: number
  reduced: boolean
}) {
  // Each frame wipes up across the last stretch before its step begins,
  // settling from a slight zoom as it lands.
  const start = index / count - 0.14
  const end = index / count + 0.02
  const clip = useTransform(progress, [start, end], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"])
  const scale = useTransform(progress, [start, end + 0.2], [1.18, 1])
  return (
    <motion.img
      src={photo(image, 720, 900)}
      alt=""
      className="absolute inset-0 size-full object-cover"
      style={index === 0 ? { scale: reduced ? 1 : scale } : { clipPath: clip, scale: reduced ? 1 : scale }}
    />
  )
}
