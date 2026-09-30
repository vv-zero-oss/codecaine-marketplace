import { CardStack } from "@/components/motion/card-stack"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { CaseFrame } from "@/components/work/case-frame"
import { CASES } from "@/content"

/**
 * Selected work, on ink: the section pins while four recent cases pile onto
 * each other, each landing a few pixels above the last.
 */
export function RecentWork({ count = 4 }: { count?: number }) {
  const picks = CASES.slice(0, count)
  return (
    <section id="work" data-tone="dark" className="relative scroll-mt-0 bg-night text-snow">
      <CardStack
        pin={1.2}
        step={0}
        header={
          <Container className="grid gap-6 border-t border-line-dark pt-5 md:grid-cols-12">
            <p className="label text-snow-mute md:col-span-3">
              <span className="mr-3 opacity-50">01</span>Selected work
            </p>
            <h2 className="display text-[clamp(2rem,3.6vw,3.25rem)] md:col-span-6">Four recent projects</h2>
            <div className="flex items-end md:col-span-3 md:justify-end">
              <ArrowLink href="/work" label={`All ${CASES.length} projects`} />
            </div>
          </Container>
        }
        items={picks.map((item, i) => (
          <CaseFrame key={item.slug} item={item} index={i} />
        ))}
      />
    </section>
  )
}
