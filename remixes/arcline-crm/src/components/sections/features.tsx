import { Keyboard, Layers, Lock, Network, Sparkles, TrendingUp, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { FEATURES } from "@/content"

const ICONS: Record<(typeof FEATURES.items)[number]["icon"], LucideIcon> = {
  keyboard: Keyboard,
  network: Network,
  trending: TrendingUp,
  layers: Layers,
  lock: Lock,
  sparkles: Sparkles,
}

/** A thin icon, a title and a paragraph. */
export function FeatureItem({ icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  const Icon = icon
  return (
    <div>
      <Icon className="size-8 text-subtle" strokeWidth={1} />
      <h3 className="type-heading mt-5 text-[24px] text-fg md:mt-6 md:text-[32px]">{title}</h3>
      <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.55] text-muted md:mt-4 md:text-[20px]">{body}</p>
    </div>
  )
}

/** Six answers to "what does it actually do", in a three-by-two grid. */
export function Features() {
  return (
    <section
      id="features"
      className="py-[var(--spacing-section)]"
      style={{ background: "radial-gradient(50% 40% at 0% 0%, color-mix(in oklab, var(--color-coral) 7%, transparent), transparent 70%)" }}
    >
      <Container>
        <Reveal>
          <SectionHeading size="lg">{FEATURES.title}</SectionHeading>
        </Reveal>
        <div className="mt-14 grid gap-x-12 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-x-[70px] lg:gap-y-[80px]">
          {FEATURES.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08}>
              <FeatureItem icon={ICONS[item.icon]} title={item.title} body={item.body} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
