import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { PhoneFrame } from "@/components/device/phone-frame"
import { Ring } from "@/components/motion/ring"
import { Reveal } from "@/components/motion/reveal"
import { AgeScreen } from "@/components/screens/age"
import { CycleScreen, JournalScreen, LiftScreen } from "@/components/screens/more"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/ui/container"

const FEATURES = [
  { id: "age", title: "Biological Age", body: "One score that shows how you’re ageing — and the five habits that move it most.", Screen: AgeScreen },
  { id: "cycle", title: "Cycle Tracking", body: "Understand your body’s rhythm and train smarter around each phase of it.", Screen: CycleScreen },
  { id: "lift", title: "Strength Training", body: "Log your lifts in two taps and watch your volume stack up week by week.", Screen: LiftScreen },
  { id: "journal", title: "Journal", body: "Tag what happened today and see, in your own numbers, what it did to you.", Screen: JournalScreen },
] as const
const DWELL = 7000

/** Four more features. The open one plays for seven seconds (a ring counts it down), then the next opens — touch the phone and it stays put. */
export function MoreFeatures() {
  const [active, setActive] = useState<string>(FEATURES[0].id)
  const [held, setHeld] = useState(false)
  const [tick, setTick] = useState(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const paused = held || reduced || designing
  useCanvasAction("Feature: next", () => setActive(FEATURES[(FEATURES.findIndex((f) => f.id === active) + 1) % FEATURES.length].id), { group: "Features" })

  // Restart the dwell whenever a different feature opens.
  useEffect(() => setTick(0), [active])
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setTick((t) => t + 100), 100)
    return () => window.clearInterval(id)
  }, [paused])
  useEffect(() => {
    if (tick >= DWELL) setActive((a) => FEATURES[(FEATURES.findIndex((f) => f.id === a) + 1) % FEATURES.length].id)
  }, [tick])

  const current = FEATURES.find((f) => f.id === active)!
  return (
    <section className="pt-24 sm:pt-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20" onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}>
          <div>
            <Reveal>
              <h2 className="display text-[clamp(2rem,5vw,3.25rem)]">And that’s not all</h2>
              <p className="mt-3 text-ink-2">Meridian also comes with the following features.</p>
            </Reveal>
            <Accordion type="single" value={active} onValueChange={(v) => v && setActive(v)} className="mt-8 max-w-xl space-y-2.5">
              {FEATURES.map((f) => (
                <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger
                    icon={
                      f.id === active ? (
                        <Ring value={(tick / DWELL) * 100} size={30} stroke={3.5} color="var(--color-ink)" track="var(--color-line)" className="shrink-0" />
                      ) : (
                        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink-2"><ArrowRight className="size-4" /></span>
                      )
                    }
                  >
                    {f.title}
                  </AccordionTrigger>
                  <AccordionContent>{f.body}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="mx-auto w-[min(270px,72vw)] lg:mr-8">
            <PhoneFrame>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={current.id} className="absolute inset-0" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
                  <current.Screen />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </div>
        </div>
      </Container>
    </section>
  )
}
