import { useScroll } from "motion/react"
import { useRef } from "react"

import { AppWindow } from "@/components/mocks/app-window"
import { ParallaxLayer } from "@/components/motion/parallax-layer"
import { WordReveal } from "@/components/motion/word-reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow, Lede } from "@/components/ui/section-title"
import { cn } from "@/lib/utils"

function Bubble({ name, team, text, tone, className }: { name: string; team: string; text: string; tone: string; className?: string }) {
  return (
    <div className={cn("w-[15.5rem] rounded-xl bg-window p-3 text-[11px] leading-snug shadow-float", className)}>
      <p className="mb-1.5 flex items-center gap-2 text-ink-2"><span className={cn("grid size-5 place-items-center rounded-full text-[9px] font-medium text-ink", tone)}>{name[0]}</span><b className="font-medium text-ink">{name}</b>{team}</p>
      {text}
    </div>
  )
}

/**
 * The deep-analysis scene: a heading that fills in word by word, a product
 * window, and three teammates' comments that drift at different speeds
 * (parallax). Why the drift: it separates the conversation from the product,
 * so the window reads as shared.
 */
export function Unlock({ title = "Unlock deep analysis", body = "Fathom AI goes beyond simple answers to deliver deep, comprehensive analysis grounded in your semantic model." }: { title?: string; body?: string }) {
  const head = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: head, offset: ["start 0.85", "start 0.35"] })
  return (
    <section data-canvas-ignore className="relative overflow-hidden bg-paper pt-24 pb-28 sm:pt-36 sm:pb-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[34%] mx-auto h-[36rem] max-w-5xl [background:radial-gradient(50%_50%_at_50%_50%,var(--color-wash-lilac),transparent_72%)] opacity-80" />
      <Container className="relative">
        <div ref={head} className="max-w-[38rem]">
          <Eyebrow>Fathom AI</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.3rem,4.8vw,3.5rem)]">
            <WordReveal text={title.split(" ").slice(0, -1).join(" ")} progress={scrollYProgress} end={0.7} /> <em className="text-ink-3"><WordReveal text={title.split(" ").slice(-1)[0]} progress={scrollYProgress} start={0.55} end={1} /></em>
          </h2>
          <Lede className="mt-5">{body}</Lede>
          <ButtonLink href="#cta" variant="soft" size="lg" className="mt-7">Learn more <span aria-hidden>→</span></ButtonLink>
        </div>

        <div className="relative mx-auto mt-14 max-w-[52rem] sm:mt-20">
          <div className="h-[26rem] sm:h-[31rem]">
            <AppWindow active="Fathom AI">
              <div className="space-y-3 p-5 pt-10 text-[10px] sm:px-8">
                <p className="ml-auto w-fit max-w-[75%] rounded-xl bg-surface px-3 py-2 font-medium">Why were registrations up last month compared to the year before?</p>
                <div className="rounded-card border border-line p-3">
                  <p className="font-medium">Registration trend</p>
                  <svg viewBox="0 0 300 80" className="mt-2 h-20 w-full" fill="none" aria-hidden><path d="M0 62C30 60 50 40 80 44s40 18 70-4 50-8 80-22 50-6 70-10" stroke="var(--color-chart)" strokeWidth="1.4" /><path d="M0 68C40 66 60 60 110 62s80-2 190-10" stroke="var(--color-ink-3)" strokeWidth="1" strokeDasharray="3 3" /></svg>
                </div>
                <p className="text-ink-2"><b className="text-ink">Organic is the biggest driver.</b> It doubled from 9k → 18k, mostly from search and referrals; paid channels were flat.</p>
              </div>
            </AppWindow>
          </div>
          <ParallaxLayer distance={-70} className="absolute top-[12%] -left-2 z-10 hidden sm:block lg:-left-14">
            <Bubble name="Mary" team="Finance" tone="bg-peach" text="Are subscriptions growing in line with revenue expectations?" />
          </ParallaxLayer>
          <ParallaxLayer distance={-130} className="absolute right-0 bottom-[8%] z-10 hidden sm:block lg:-right-12">
            <Bubble name="Josephine" team="Marketing" tone="bg-lilac" text="Which campaigns drive the most ad conversions? Should we reallocate budget?" />
          </ParallaxLayer>
          <ParallaxLayer distance={-40} className="absolute -bottom-6 left-6 z-10 hidden sm:block lg:-left-6">
            <Bubble name="Carl" team="Sales" tone="bg-sky" text="Analyze customer segments to understand what's performing the best." />
          </ParallaxLayer>
        </div>
      </Container>
    </section>
  )
}
