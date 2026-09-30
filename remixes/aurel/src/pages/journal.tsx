import { ArrowUpRight } from "lucide-react"

import { ClosingCall } from "@/components/blocks/closing-call"
import { PageIntro } from "@/components/blocks/page-intro"
import { HorizontalTrack } from "@/components/motion/horizontal-track"
import { FadeUp } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { journal } from "@/content"
import { cn } from "@/lib/utils"
import { Link } from "@/router"

/** The journal: the features read sideways on a pinned row, then the
 *  archive as a plain list. */
export function JournalPage() {
  return (
    <>
      <PageIntro eyebrow={journal.eyebrow} title={journal.title} intro={journal.intro} />
      <HorizontalTrack>
        {journal.features.map((feature, index) => (
          <FeatureCard key={feature.slug} {...feature} index={index} />
        ))}
      </HorizontalTrack>
      <Container className="pt-section">
        <SectionHeading title="_from the_ ARCHIVE" size="md" align="left" />
        <ul className="mt-10 border-t border-ink/15">
          {journal.entries.map((entry, index) => (
            <li key={entry.title}>
              <FadeUp delay={index * 0.05}>
                <Link href="/journal" className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-ink/15 py-6 md:grid-cols-[160px_160px_1fr_auto]">
                  <span className="font-sans text-[14px] tabular-nums text-ink-muted">{entry.date}</span>
                  <span className="hidden font-serif text-[16px] text-ink-muted md:block">{entry.kicker}</span>
                  <span className="col-span-2 row-start-2 font-display text-[clamp(26px,2.6vw,44px)] leading-none transition-transform duration-500 ease-(--ease-out-soft) group-hover:translate-x-2 md:col-span-1 md:row-start-auto">
                    {entry.title}
                  </span>
                  <ArrowUpRight className="size-5 justify-self-end text-ink-muted transition-transform duration-(--duration-hover) group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" strokeWidth={1.25} />
                </Link>
              </FadeUp>
            </li>
          ))}
        </ul>
      </Container>
      <ClosingCall title="Letters from the house" body="Four a year, in your inbox. The form is at the foot of the page." cta="Visit _the_ HOUSE" href="/house" />
    </>
  )
}

/** A feature on the sideways row; every other one sits lower and narrower. */
export function FeatureCard({ kicker, title, excerpt, image, alt, index }: { kicker: string; title: string; excerpt: string; image: string; alt: string; index: number }) {
  const wide = index % 2 === 0
  return (
    <Link href="/journal" className={cn("group flex shrink-0 flex-col gap-4 md:w-[38vw]", !wide && "md:mt-[18vh] md:w-[28vw]")}>
      <div className={cn("overflow-hidden bg-paper-deep", wide ? "aspect-[4/3] md:aspect-auto md:h-[52svh]" : "aspect-[4/5] md:aspect-auto md:h-[44svh]")}>
        <img src={image} alt={alt} loading="lazy" className="size-full object-cover transition-transform duration-1000 ease-(--ease-out-soft) group-hover:scale-[1.04]" />
      </div>
      <div className="flex items-baseline justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-sans text-[13px] uppercase tracking-[0.06em] text-ink-muted">
            {String(index + 1).padStart(2, "0")} · {kicker}
          </p>
          <h2 className="font-display text-[clamp(30px,2.8vw,52px)] leading-[0.95] tracking-[-0.01em]">{title}</h2>
          <p className="max-w-[40ch] font-serif text-[16px] leading-[1.55] text-ink-soft">{excerpt}</p>
        </div>
      </div>
    </Link>
  )
}
