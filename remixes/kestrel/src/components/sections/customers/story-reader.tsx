import { ArrowRight, Quote } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import type { Story } from "@/content/customers"
import { avatar, pexels } from "@/lib/photos"

/**
 * One customer's full story in a side sheet: the photo, the numbers, then
 * the problem, what changed and the result — and the quote last, in their
 * own words.
 */
export function StoryReader({ story, onClose }: { story: Story | null; onClose: () => void }) {
  return (
    <Sheet open={!!story} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto border-l border-line bg-raised p-0 sm:max-w-[560px]">
        {story && (
          <>
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-panel">
              <img src={pexels(story.photo, 1120, 700)} alt={`The ${story.company} team at work`} className="size-full object-cover" />
              <span className="absolute bottom-3 left-3 rounded-full bg-raised/95 px-2.5 py-1 text-[12px] font-medium shadow-(--shadow-card)">{story.industry}</span>
            </div>
            <div className="flex flex-col gap-8 p-6 sm:p-8">
              <div>
                <p className="text-[14px] text-ink-3">{story.company} · {story.size}</p>
                <SheetTitle className="type-head text-h3 mt-2 text-balance">{story.headline}</SheetTitle>
                <SheetDescription className="sr-only">How {story.company} uses Kestrel</SheetDescription>
              </div>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-card) bg-line">
                {story.metrics.map((m) => (
                  <div key={m.label} className="bg-panel p-4">
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="text-[26px] font-medium tracking-[-0.03em] tabular-nums">{m.value}</dd>
                    <dd className="text-[13px] text-ink-3">{m.label}</dd>
                  </div>
                ))}
              </dl>
              {[
                ["The problem", story.problem],
                ["What changed", story.change],
                ["The result", story.result],
              ].map(([label, text]) => (
                <div key={label}>
                  <p className="type-eyebrow text-ink-3">{label}</p>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{text}</p>
                </div>
              ))}
              <figure className="rounded-(--radius-card) bg-panel p-5">
                <Quote className="size-5 text-ink-3" strokeWidth={1.6} />
                <blockquote className="mt-3 text-[18px] leading-snug tracking-[-0.012em] text-ink">“{story.quote.text}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <img src={avatar(story.quote.avatar)} alt="" className="size-10 rounded-full object-cover" />
                  <span>
                    <span className="block text-[14px] font-medium">{story.quote.name}</span>
                    <span className="block text-[13px] text-ink-3">{story.quote.role}, {story.company}</span>
                  </span>
                </figcaption>
              </figure>
              <ButtonLink href="/pricing" size="lg" onClick={onClose}>Get the same results <ArrowRight /></ButtonLink>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
