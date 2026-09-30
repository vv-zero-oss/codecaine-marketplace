import { ArrowRight } from "lucide-react"

import { PhotoFan } from "@/components/motion/photo-fan"
import { PageIntro, ProseBlock } from "@/components/sections/page-intro"
import { StatGrid } from "@/components/sections/stat-grid"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ABOUT } from "@/content"

/** The story, in numbers and then in words. */
export function AboutPage() {
  const [leadership, consulting, studio, now] = ABOUT.sections
  return (
    <Container size="narrow" className="pt-16 sm:pt-24">
      <PageIntro title="About" lede={ABOUT.intro} />
      <StatGrid stats={ABOUT.stats} className="mt-16" />
      <div className="mt-24 space-y-16">
        <ProseBlock id={leadership.id} title={leadership.title}>
          <p>{leadership.body}</p>
        </ProseBlock>
        <PhotoFan />
        <ProseBlock id={consulting.id} title={consulting.title}>
          <p>{consulting.body}</p>
        </ProseBlock>
        <ProseBlock id={studio.id} title={studio.title}>
          <p>{studio.body}</p>
        </ProseBlock>
        <ProseBlock id={now.id} title={now.title}>
          <p>{now.body}</p>
          <ButtonLink href="/contact" variant="pink" className="group mt-6">
            Start a conversation
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </ButtonLink>
        </ProseBlock>
      </div>
    </Container>
  )
}
