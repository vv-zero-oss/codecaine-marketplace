import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import type { Story } from "@/content/customers"
import { avatar, pexels } from "@/lib/photos"

/**
 * The story we'd tell first: a big photograph, the headline result, the
 * controller's words and three numbers — and the whole thing in a sheet.
 */
export function FeaturedStory({ story, onRead }: { story: Story; onRead: () => void }) {
  return (
    <section className="py-12">
      <Container>
        <Reveal className="grid overflow-hidden rounded-(--radius-panel) bg-panel lg:grid-cols-[1.15fr_1fr]">
          <button type="button" onClick={onRead} aria-label={`Read the ${story.company} story`} className="group relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[560px]">
            <img
              src={pexels(story.photo, 1400, 1050)}
              alt={`Inside a ${story.company} warehouse`}
              className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-(--ease-out-strong) group-hover:scale-[1.03]"
            />
            <span className="absolute top-4 left-4 rounded-full bg-raised/95 px-2.5 py-1 text-[12px] font-medium shadow-(--shadow-card)">Featured story</span>
          </button>
          <div className="flex flex-col p-6 sm:p-10">
            <p className="text-[22px] font-semibold tracking-[-0.04em]">{story.company}</p>
            <p className="text-[14px] text-ink-3">{story.industry} · {story.size}</p>
            <h2 className="type-head text-h3 mt-8 text-balance">{story.headline}</h2>
            <blockquote className="mt-6 border-l-2 border-lime pl-4 text-[17px] leading-snug text-ink-2">“{story.quote.text}”</blockquote>
            <div className="mt-4 flex items-center gap-3">
              <img src={avatar(story.quote.avatar)} alt="" className="size-9 rounded-full object-cover" />
              <span className="text-[14px]">
                <span className="block font-medium">{story.quote.name}</span>
                <span className="block text-ink-3">{story.quote.role}</span>
              </span>
            </div>
            <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-line-strong pt-6">
              {story.metrics.map((m) => (
                <div key={m.label}>
                  <dd className="text-[24px] font-medium tracking-[-0.03em] tabular-nums sm:text-[28px]">{m.value}</dd>
                  <dt className="mt-1 text-[12.5px] leading-snug text-ink-3">{m.label}</dt>
                </div>
              ))}
            </dl>
            <button type="button" onClick={onRead} className="group mt-8 inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-medium text-ink">
              Read the full story
              <ArrowRight className="size-4 transition-transform duration-(--duration-hover) group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
