import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { QuoteBlock } from "@/components/blocks/quote-block"
import { ScaledFrame } from "@/components/blocks/scaled-frame"
import { SectionTitle } from "@/components/blocks/section-title"
import { InboxMock } from "@/components/mock/inbox-mock"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { COPILOT, QUOTES } from "@/content"
import { cn } from "@/lib/utils"

/** A note Scribe raises, floating off the edge of the product screen. */
function FloatingNote({
  title,
  body,
  dot,
  delay = 0,
  className,
}: {
  title: string
  body: string
  dot: string
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <motion.div
      initial={still ? false : { opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "absolute z-10 hidden w-[250px] rounded-[var(--radius-card)] bg-card/95 p-3.5 text-left shadow-(--shadow-float) backdrop-blur md:block",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
        <span className={cn("size-2.5 rounded-[3px]", dot)} />
        {title}
      </p>
      <p className="mt-1 text-[12px] leading-snug text-ink-muted">{body}</p>
    </motion.div>
  )
}

/** A chip in the signal rows: a coloured dot and one thing Scribe noticed. */
function SignalChip({ text, dot }: { text: string; dot: string }) {
  return (
    <span className="mx-1.5 inline-flex h-9 shrink-0 items-center gap-2 rounded-[var(--radius-field)] bg-night-card px-3.5 text-[13px] whitespace-nowrap text-night-fg shadow-(--shadow-night)">
      <span className={cn("size-2 rounded-[2px]", dot)} />
      {text}
    </span>
  )
}

/**
 * The dark block: Scribe, the copilot, on its product screen with notes
 * floating off it; then rows of the signals it catches drifting past; then a
 * customer in their own words.
 */
export function Copilot({ signalSpeed = 60 }: { signalSpeed?: number }) {
  return (
    <section id="copilot" data-nav-tone="night" className="relative overflow-hidden bg-night pt-section text-night-fg">
      <Container className="flex flex-col items-center">
        <Reveal className="flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] bg-night-raised py-1 pr-2.5 pl-1 text-[12.5px] text-night-muted shadow-(--shadow-night)">
            <span className="rounded-[4px] bg-gradient-to-r from-glow-rose to-glow-lilac px-1.5 py-0.5 text-[10px] font-semibold text-ink">
              {COPILOT.badge}
            </span>
            {COPILOT.badgeText}
          </span>
          <SectionTitle tone="night" lineOne={COPILOT.titleStart} accent={COPILOT.titleAccent} accentPosition="line-two" lineTwo={COPILOT.titleEnd} body={COPILOT.body} />
          <ButtonLink href="#platform" variant="light" size="sm">
            {COPILOT.cta}
          </ButtonLink>
        </Reveal>

        <div className="relative mt-14 w-full max-w-[1000px] md:mt-16">
          <Reveal y={40}>
            <ScaledFrame width={1040}>
              <InboxMock showPlay={false} />
            </ScaledFrame>
          </Reveal>
          <FloatingNote {...COPILOT.floats[0]} className="top-[34%] -left-[6%]" delay={0.2} />
          <FloatingNote {...COPILOT.floats[1]} className="top-[58%] -right-[5%]" delay={0.35} />
          <FloatingNote {...COPILOT.floats[2]} className="-bottom-[8%] left-[26%]" delay={0.5} />
          {/* The lilac light the screen sits on */}
          <div aria-hidden className="absolute inset-x-[10%] -bottom-6 -z-0 h-10 rounded-full bg-lilac/40 blur-2xl" />
        </div>
      </Container>

      <div className="mt-24 flex flex-col items-center gap-8 md:mt-32">
        <p className="text-[clamp(18px,2vw,22px)] text-night-muted">{COPILOT.signalsTitle}</p>
        <div className="flex w-full flex-col gap-3 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
          {COPILOT.signals.map((row, i) => (
            <Marquee key={i} speed={signalSpeed + i * 8} direction={i % 2 ? "right" : "left"}>
              {row.map((signal) => (
                <SignalChip key={signal.text} {...signal} />
              ))}
            </Marquee>
          ))}
        </div>
      </div>

      <Container className="py-section">
        <Reveal>
          <QuoteBlock {...QUOTES.second} tone="night" />
        </Reveal>
      </Container>
    </section>
  )
}
