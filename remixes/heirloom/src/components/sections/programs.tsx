import { Reveal } from "@/components/motion/reveal"
import { SectionIntro } from "@/components/sections/section-intro"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Tag } from "@/components/ui/tag"
import { PROGRAMS } from "@/content"

export function ProgramCard({
  image,
  alt,
  tag,
  title,
  body,
  cta,
  href,
}: {
  image: string
  alt: string
  tag: string
  title: string
  body: string
  cta: string
  href: string
}) {
  return (
    <article className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card bg-surface p-5 shadow-card sm:aspect-[3/4] sm:p-6">
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />
      <Tag className="absolute top-4 right-4">{tag}</Tag>
      <h3 className="text-lg font-medium tracking-[-0.02em]">{title}</h3>
      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-fg-muted">{body}</p>
      <ButtonLink href={href} size="sm" className="mt-5 self-start">
        {cta}
      </ButtonLink>
    </article>
  )
}

export function Programs() {
  return (
    <section id="membership" className="bg-ink pt-24 pb-12 sm:pt-[22vh] sm:pb-16">
      <Container>
        <SectionIntro before="The private family office investing in founders shaping the" accent="future" after="of humanity." />
        <div className="mx-auto mt-14 grid max-w-3xl gap-3 sm:mt-20 sm:grid-cols-2 sm:gap-4">
          {PROGRAMS.map((program, i) => (
            <Reveal key={program.title} delay={i * 0.12}>
              <ProgramCard {...program} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
