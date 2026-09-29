import { Container } from "@/components/ui/container"
import { Icon } from "@/components/ui/icon"
import { SectionHeading } from "@/components/ui/section-heading"
import { FEATURES } from "@/content"

/** Four instances on the page, and four layers — one per card, each named for
 *  the component rather than for the classes it happens to carry. */
export function FeatureCard({ title, body, icon }: { title: string; body: string; icon: string }) {
  return (
    <div className="feature-card rounded-2xl border border-quartz-200 bg-white p-8 transition-shadow hover:shadow-lg hover:shadow-quartz-900/5">
      <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon>
          <path d={icon} strokeWidth="1.5" strokeLinecap="round" />
        </Icon>
      </div>
      <h3 className="mt-5 text-lg font-medium tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-quartz-600">{body}</p>
    </div>
  )
}

export function Features() {
  return (
    <section id="features" className="py-24">
      <Container>
        <SectionHeading
          title="Everything the deploy actually needs"
          blurb="Built for teams who would rather ship than babysit a pipeline."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  )
}
