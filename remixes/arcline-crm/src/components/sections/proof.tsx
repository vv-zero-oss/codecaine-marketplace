import { ArrowRight } from "lucide-react"

import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { BrandLogo, type Brand } from "@/components/ui/brand-logo"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { PROOF } from "@/content"
import { cn } from "@/lib/utils"

const TONES = {
  wine: "hover:bg-wine focus-visible:bg-wine",
  olive: "hover:bg-olive focus-visible:bg-olive",
  navy: "hover:bg-navy focus-visible:bg-navy",
  pine: "hover:bg-pine focus-visible:bg-pine",
} as const

/** A compliance seal: two lines in a ring, and its name beneath. */
function Seal({ top, bottom, label }: { top: string; bottom: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="flex size-14 flex-col items-center justify-center rounded-full border border-line-button text-[10px] leading-tight text-fg-soft">
        <span>{top}</span>
        <span className="mt-0.5 border-t border-line-button pt-0.5">{bottom}</span>
      </span>
      <span className="text-[11px] text-fg-soft">{label}</span>
    </div>
  )
}

/**
 * One customer's result. The whole cell fills with the customer's colour on
 * hover (or focus, or tap) and a "Read story" link slides in beside the name.
 */
export function StoryCard({ stat, company, tone }: { stat: string; company: string; tone: keyof typeof TONES }) {
  return (
    <a
      href="#customers"
      className={cn(
        "group/story flex min-h-[240px] flex-col justify-between bg-raised p-6 transition-colors duration-300 ease-out-quint outline-none md:min-h-[335px] md:p-[50px]",
        TONES[tone],
      )}
    >
      <p className="type-heading max-w-[20ch] text-[24px] leading-[1.18] text-fg md:text-[32px]">{stat}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[20px] font-medium tracking-[-0.03em] text-fg md:text-[24px]">{company}</span>
        <span className="flex translate-x-[-6px] items-center gap-1.5 text-[13px] text-fg-soft opacity-0 transition-[opacity,transform] duration-300 ease-out-quint group-hover/story:translate-x-0 group-hover/story:opacity-100 group-focus-visible/story:translate-x-0 group-focus-visible/story:opacity-100">
          {PROOF.storyLink} <ArrowRight className="size-4" />
        </span>
      </div>
    </a>
  )
}

/**
 * Does it work: the claim and seals pinned on the left, and on the right two
 * rows of logos drifting in opposite directions above a grid of results.
 */
export function Proof() {
  return (
    <section id="customers" className="pb-[var(--spacing-section)]">
      <Container className="grid gap-12 lg:grid-cols-[1fr_58.2%] lg:gap-0">
        <div>
          <Reveal className="lg:sticky lg:top-[150px]">
            <SectionHeading lines={PROOF.title} size="md" className="text-[clamp(32px,2.6vw,48px)] leading-[1.05]" />
            <p className="mt-8 max-w-[34ch] text-[17px] leading-[1.55] text-fg-soft md:text-[20px]">{PROOF.body}</p>
            <div className="mt-10 flex gap-10">
              {PROOF.badges.map((b) => (
                <Seal key={b.label} {...b} />
              ))}
            </div>
          </Reveal>
        </div>

        <div className="min-w-0">
          <div className="border border-line-strong">
            {PROOF.rows.map((row, r) => (
              <Marquee
                key={r}
                speed={r === 0 ? 46 : 52}
                direction={r === 0 ? "left" : "right"}
                className={cn(r === 0 && "border-b border-line-strong")}
              >
                {row.map((brand, i) => (
                  <span
                    key={`${brand}-${i}`}
                    className="flex h-20 w-44 shrink-0 items-center justify-center border-r border-line-strong md:h-[120px] md:w-[254px]"
                  >
                    <BrandLogo brand={brand as Brand} scale={0.95} />
                  </span>
                ))}
              </Marquee>
            ))}
          </div>
          <div className="grid gap-px border-x border-b border-line-strong bg-line-strong sm:grid-cols-2">
            {PROOF.stories.map((story) => (
              <StoryCard key={story.company} {...story} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
