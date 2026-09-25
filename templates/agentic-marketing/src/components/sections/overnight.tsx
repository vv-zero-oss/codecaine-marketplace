import { ArrowLeftRight, Bell, BarChart3, CheckCheck, History, Pause, Sparkles } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { Frame, Section } from "@/components/blocks/frame"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"
import { StartButton } from "@/components/blocks/start-button"
import { overnight } from "@/content"
import { cn } from "@/lib/utils"

const icons = { pause: Pause, shift: ArrowLeftRight, chart: BarChart3, bell: Bell, sparkle: Sparkles, check: CheckCheck }

/**
 * A night of the product, as its activity log. The rows arrive one after
 * another when the log scrolls in — the passing hours, told in order.
 */
export function Overnight() {
  const reduce = useReducedMotion()
  return (
    <Section className="pt-0">
      <Frame className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col">
          <Reveal>
            <SectionHeading bold={overnight.titleBold} light={overnight.titleLight} order="bold-first" />
          </Reveal>
          <Reveal delay={0.08} className="mt-8 lg:mt-auto">
            <p className="max-w-[28rem] text-[12px] leading-relaxed text-ink-faint">{overnight.footnote}</p>
            <p className="mt-3 text-[12px] text-ink-soft">{overnight.kicker}</p>
            <StartButton label={overnight.cta} className="mt-4" />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid place-items-center rounded-panel bg-gradient-to-br from-mist to-mist-3 px-4 py-12 shadow-inset sm:px-10 md:py-16">
            <div className="w-full max-w-[27rem] rounded-lg bg-surface p-4 shadow-float">
              <p className="flex items-center gap-1.5 text-[11px] font-medium">
                <History className="size-3.5 text-ink-soft" /> Activity log
              </p>
              <motion.ol
                className="mt-3 grid"
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ staggerChildren: reduce ? 0 : 0.11, delayChildren: 0.15 }}
              >
                {overnight.log.map((row) => {
                  const Icon = icons[row.icon as keyof typeof icons]
                  return (
                    <motion.li
                      key={row.time}
                      variants={{
                        hidden: { opacity: 0, transform: reduce ? "none" : "translateY(6px)" },
                        shown: { opacity: 1, transform: "translateY(0px)" },
                      }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="grid grid-cols-[2.6rem_1rem_1fr_auto] items-center gap-2 border-b border-line py-2.5 text-[11px] last:border-b-0"
                    >
                      <span className="font-mono text-[10px] text-mint-ink tabular-nums">{row.time}</span>
                      <Icon className="size-3 text-ink-soft" />
                      <span className="leading-snug text-ink-2">{row.text}</span>
                      <span
                        className={cn(
                          "rounded-[4px] px-1.5 py-0.5 text-[9px] font-medium",
                          row.tag === "Review" ? "bg-surface text-ink-soft shadow-button" : "bg-mint-tint text-mint-ink",
                        )}
                      >
                        {row.tag}
                      </span>
                    </motion.li>
                  )
                })}
              </motion.ol>
            </div>
          </div>
        </Reveal>
      </Frame>
    </Section>
  )
}
