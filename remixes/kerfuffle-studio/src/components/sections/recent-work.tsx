import { CardStack } from "@/components/motion/card-stack"
import { ScrollBadge } from "@/components/motion/scroll-badge"
import { ButtonLink } from "@/components/ui/button"
import { DisplayHeading } from "@/components/ui/heading"
import { CaseFrame } from "@/components/work/case-frame"
import { CASES } from "@/content"

/**
 * The dark reel: the section pins while four recent cases pile up on each
 * other, their coloured frames peeking out on top.
 */
export function RecentWork({ count = 4 }: { count?: number }) {
  const picks = CASES.slice(0, count)
  return (
    <section id="recent-work" data-tone="dark" className="relative bg-night text-snow">
      <CardStack
        pin={1.2}
        step={16}
        header={
          <DisplayHeading
            eyebrow="Too good to scroll past. A handful of what we made lately."
            bold="Recent"
            serif="work"
            inline
            size="md"
            className="px-gutter [&_p]:max-w-[26ch]"
          />
        }
        items={picks.map((item) => (
          <CaseFrame key={item.slug} item={item} />
        ))}
        footer={<ButtonLink href="/work" tone="pink" label="View our work" />}
        overlay={<ScrollBadge className="absolute right-4 bottom-6 hidden sm:grid md:right-8 md:bottom-10" />}
      />
    </section>
  )
}
