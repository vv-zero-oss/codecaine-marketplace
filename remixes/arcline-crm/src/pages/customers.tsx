import { ArrowRight } from "lucide-react"

import { Quote } from "@/components/sections/quote"
import { FramedPhoto } from "@/components/sections/stories"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Heading, Lede } from "@/components/ui/heading"
import { LogoWall } from "@/components/ui/logo-wall"
import { Section } from "@/components/ui/section"
import { LOGOS } from "@/content/home"
import { CUSTOMERS } from "@/content/pages"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** A customer's name, set as a wordmark. */
export function CompanyName({ name }: { name: string }) {
  return <p className="font-display text-[22px] leading-none font-semibold tracking-[-0.04em] text-ink">{name}</p>
}

/** Customers: who sells on Arcline, three stories told in full and four in brief. */
export function CustomersPage() {
  return (
    <>
      <Section className="texture-dots">
        <Container className="flex flex-col items-center py-20 text-center md:py-28">
          <Reveal onMount>
            <span className="inline-flex h-[30px] items-center rounded-[13px] border border-line-strong bg-page px-3 text-[13px] text-ink-soft">
              {CUSTOMERS.pill}
            </span>
          </Reveal>
          <Reveal onMount delay={0.1} className="mt-6">
            <Heading as="h1" size="h1" lead={CUSTOMERS.title} className="max-w-[15em]" />
          </Reveal>
          <Reveal onMount delay={0.2} className="mt-5">
            <Lede className="max-w-[30em]">{CUSTOMERS.body}</Lede>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <LogoWall brands={[...LOGOS, "discord", "loom"]} columns={6} withStories={0} />
      </Section>

      {CUSTOMERS.featured.map((s, i) => (
        <Section key={s.company}>
          <Container className="grid grid-cols-1 [&>*]:min-w-0 gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal className={cn("flex flex-col items-start gap-5", i % 2 === 1 && "lg:order-2")}>
              <CompanyName name={s.company} />
              <p className="text-caption tracking-[0.06em] text-ink-3 uppercase">{s.overline}</p>
              <Heading as="h2" lead={s.lead} rest={s.rest} className="text-[26px] leading-8 md:text-[32px] md:leading-9" />
              <Link href="/customers" className="group/link mt-2 inline-flex items-center gap-1.5 text-base text-ink">
                <span className="link-draw">Read case study</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <span aria-hidden className="absolute -inset-4 border border-dashed border-line-strong" />
              <FramedPhoto image={s.photo} className="relative" />
            </Reveal>
          </Container>
        </Section>
      ))}

      <Section>
        <div className="grid md:grid-cols-2">
          {CUSTOMERS.grid.map((s, i) => (
            <Link
              key={s.company}
              href="/customers"
              className={cn(
                "group/link flex min-h-[240px] flex-col justify-between gap-8 border-line-strong p-8 transition-colors duration-300 hover:bg-canvas hover:duration-[50ms] md:p-12",
                i % 2 === 0 && "md:border-r",
                i < 2 && "border-b",
                i === 2 && "border-b md:border-b-0",
              )}
            >
              <CompanyName name={s.company} />
              <div>
                <Heading as="h3" size="h3" lead={s.lead} rest={s.rest} />
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors group-hover/link:text-ink">
                  Read the story <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Quote />

      <Section tone="void">
        <Container className="flex flex-col items-center py-24 text-center md:py-32">
          <Reveal>
            <p className="font-display text-[36px] leading-[1.1] font-medium tracking-[-0.015em] text-ink md:text-h1">{CUSTOMERS.cta.sans}</p>
            <p className="font-serif text-[36px] leading-[1.1] text-ink-soft italic md:text-[56px]">{CUSTOMERS.cta.serif}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-9 flex gap-2.5">
            <ButtonLink href="/pricing">{CUSTOMERS.cta.secondary}</ButtonLink>
            <ButtonLink href="/pricing" variant="primary">
              {CUSTOMERS.cta.primary}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
