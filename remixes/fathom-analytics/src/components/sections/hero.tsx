import { motion, useTransform, type MotionValue } from "motion/react"

import { AppWindow } from "@/components/mocks/app-window"
import { AnswerView, HomeGrid } from "@/components/mocks/home-screen"
import { StickyScene } from "@/components/motion/sticky-scene"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

function HeroCopy({ title, accent, body }: { title: string; accent: string; body: string }) {
  return (
    <>
      <h1 className="display mx-auto max-w-[46rem] text-[clamp(2.4rem,5.2vw,4.1rem)]">
        {title} <em>{accent}</em>
      </h1>
      <p className="mx-auto mt-6 max-w-[30rem] text-[clamp(1rem,1.5vw,1.1rem)] leading-normal text-ink text-pretty">{body}</p>
      <div className="mt-7 flex items-center justify-center gap-2">
        <ButtonLink href="#cta" size="lg">Get started</ButtonLink>
        <ButtonLink href="#cta" variant="ghost" size="lg">Book a demo</ButtonLink>
      </div>
    </>
  )
}

function Wash({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.55], [1, 0.12])
  return (
    <motion.div aria-hidden style={{ opacity }} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -inset-[10%] animate-drift [background:radial-gradient(38%_44%_at_58%_44%,var(--color-wash-peach),transparent_72%),radial-gradient(30%_36%_at_76%_58%,var(--color-wash-rose),transparent_72%),radial-gradient(34%_40%_at_32%_62%,var(--color-wash-lilac),transparent_72%)] blur-2xl" />
    </motion.div>
  )
}

/**
 * The opening scene. Scattered metric widgets drift in from the edges and land
 * as the home screen of a product window; the headline recedes behind them;
 * then the screen answers a question. Scroll-scrubbed (`heightVh` is its length).
 * Why the motion: it shows the product assembling itself, which is the pitch.
 */
export function Hero({
  title = "AI analytics for faster insights and",
  accent = "zero chaos",
  body = "Fathom is an AI analytics platform built on governed metrics that powers analysis, reporting and company-wide engagement.",
  heightVh = 280,
}: {
  title?: string
  accent?: string
  body?: string
  heightVh?: number
}) {
  return (
    <section id="top" data-canvas-ignore>
      <StickyScene heightVh={heightVh} stageClassName="bg-paper">
        {(p, pinned) =>
          pinned ? <PinnedHero p={p} title={title} accent={accent} body={body} /> : <StackedHero title={title} accent={accent} body={body} />
        }
      </StickyScene>
    </section>
  )
}

function PinnedHero({ p, title, accent, body }: { p: MotionValue<number>; title: string; accent: string; body: string }) {
  const copyOpacity = useTransform(p, [0, 0.26], [1, 0])
  const copyY = useTransform(p, [0, 0.3], [0, -36])
  const copyBlur = useTransform(p, [0, 0.26], ["blur(0px)", "blur(8px)"])
  const chrome = useTransform(p, [0.14, 0.42], [0, 1])
  const home = useTransform(p, [0.58, 0.78], [1, 0])
  const answer = useTransform(p, [0.64, 0.86], [0, 1])
  const answerY = useTransform(p, [0.64, 0.9], [18, 0])

  // Each tile flies in from a spot around the headline to its cell in the grid.
  const fly = (x0: string, y0: string, r0: number, from = 0, to = 0.4) => ({
    x: useTransform(p, [from, to], [x0, "0vw"]),
    y: useTransform(p, [from, to], [y0, "0vh"]),
    rotate: useTransform(p, [from, to], [r0, 0]),
  })
  const tiles = {
    metrics: fly("-51vw", "-17vh", -1.2),
    reg: fly("9vw", "1vh", 1.4),
    act: fly("-21vw", "6vh", 1),
    ask: { ...fly("4vw", "51vh", 0), scale: useTransform(p, [0, 0.4], [0.62, 1]) },
    mau: fly("12vw", "50vh", 0, 0.1, 0.46),
    head: { opacity: useTransform(p, [0.26, 0.42], [0, 1]) },
    bar: { opacity: useTransform(p, [0.26, 0.42], [0, 1]) },
  }

  return (
    <>
      <Wash progress={p} />
      <motion.div
        style={{ opacity: copyOpacity, y: copyY, filter: copyBlur }}
        className="absolute inset-x-0 top-[29vh] z-10 px-5 text-center will-change-transform"
        data-canvas-ignore
      >
        <HeroCopy title={title} accent={accent} body={body} />
      </motion.div>
      <div
        className="absolute inset-x-0 top-[17vh] bottom-[-8vh] mx-auto w-[min(94vw,940px)] will-change-transform"
        data-canvas-ignore
      >
        <AppWindow className="h-full" chrome={chrome}>
          <motion.div style={{ opacity: home }} className="absolute inset-0"><HomeGrid tile={tiles} className="[&_*]:will-change-auto" /></motion.div>
          <motion.div style={{ opacity: answer, y: answerY }} className="absolute inset-0 overflow-hidden p-5 pt-10">
            <AnswerView className="mx-auto max-w-[34rem]" />
          </motion.div>
        </AppWindow>
      </div>
    </>
  )
}

/** Narrow screens and reduced motion: the same story, laid out top to bottom. */
function StackedHero({ title, accent, body }: { title: string; accent: string; body: string }) {
  return (
    <div className="relative overflow-hidden pt-28 pb-12 sm:pt-32">
      <div aria-hidden className="absolute inset-0 [background:radial-gradient(60%_50%_at_60%_30%,var(--color-wash-peach),transparent_70%),radial-gradient(50%_40%_at_20%_60%,var(--color-wash-lilac),transparent_70%)]" />
      <Container className="relative text-center">
        <HeroCopy title={title} accent={accent} body={body} />
        <div className="mx-auto mt-12 h-[34rem] max-w-[34rem] text-left sm:h-[38rem]">
          <AppWindow className="h-full"><HomeGrid className="[&>*]:min-w-0 max-sm:grid-cols-2 max-sm:[&>*]:col-span-2" /></AppWindow>
        </div>
      </Container>
    </div>
  )
}
