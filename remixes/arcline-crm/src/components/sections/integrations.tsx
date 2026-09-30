import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { BrandLogo, type Brand } from "@/components/ui/brand-logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading, Lede } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { INTEGRATIONS } from "@/content/home"

/** One app, as a tile: a lit square with its mark. */
export function AppTile({ brand }: { brand: Brand }) {
  return (
    <span className="flex size-20 shrink-0 items-center justify-center rounded-[23px] bg-surface text-ink-soft shadow-tile md:size-24">
      <BrandLogo brand={brand} scale={0.9} fit={58} label={false} />
    </span>
  )
}

/** Does it fit my stack: the tools it talks to, drifting past. */
export function Integrations() {
  return (
    <Section id="integrations" tone="void">
      <Container className="flex flex-col items-center pt-[var(--spacing-section)] text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <Eyebrow>{INTEGRATIONS.eyebrow}</Eyebrow>
          <Heading lead={INTEGRATIONS.title} className="max-w-[18ch]" />
          <Lede className="max-w-[32em]">{INTEGRATIONS.body}</Lede>
          <ButtonLink href="/#developers" size="sm" arrow>
            {INTEGRATIONS.cta}
          </ButtonLink>
        </Reveal>
      </Container>
      <Marquee speed={48} className="fade-x mt-14 pb-[var(--spacing-section)]">
        {INTEGRATIONS.tiles.map((b) => (
          <span key={b} className="px-3">
            <AppTile brand={b as Brand} />
          </span>
        ))}
      </Marquee>
    </Section>
  )
}
