import { ArrowRight } from "lucide-react"

import { CtaBand } from "@/components/layout/site-footer"
import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { DisplayHeading, Eyebrow } from "@/components/ui/heading"
import { Polaroid } from "@/components/ui/polaroid"
import { Sticker } from "@/components/ui/sticker"
import { CASE_BG, servicesLine } from "@/components/work/tones"
import { CASES, photo } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

export function CasePage({ slug }: { slug: string }) {
  const index = Math.max(0, CASES.findIndex((c) => c.slug === slug))
  const item = CASES[index]
  const next = CASES[(index + 1) % CASES.length]
  return (
    <>
      <section data-tone="light" className="grid min-h-svh md:grid-cols-2">
        <div className="flex flex-col justify-center px-gutter pt-32 pb-16 md:px-[8%] md:pt-28">
          <Reveal>
            <Eyebrow>{item.client}</Eyebrow>
            <DisplayHeading as="h1" bold={servicesLine(item.services)} serif={`for ${item.client}`} size="md" align="left" className="mt-3 [&_.display]:text-ink-mute" />
            <p className="mt-6 max-w-[30ch] font-serif text-2xl leading-[1.08] tracking-tight">{item.summary}</p>
            <dl className="mt-8 flex gap-10 font-mono text-xs uppercase">
              <div>
                <dt className="text-ink-mute">Year</dt>
                <dd className="mt-1">{item.year}</dd>
              </div>
              <div>
                <dt className="text-ink-mute">We made</dt>
                <dd className="mt-1">{servicesLine(item.services)}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <div className={cn("relative flex min-h-[70svh] items-center justify-center overflow-hidden px-8 py-20", CASE_BG[item.color])}>
          <Parallax speed={0.12} className="w-full max-w-md">
            <Polaroid src={photo(item.image, 900)} alt={`${item.client}: ${item.title}`} rotate={3} className="aspect-[4/5]" />
          </Parallax>
          <div className="absolute top-[18%] left-[10%]">
            <Sticker text={item.title} tone="yellow" rotate={-8} className="text-base md:text-xl" />
          </div>
        </div>
      </section>

      <section data-tone="light" className="py-section">
        <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="display text-[clamp(2.75rem,5vw,4.5rem)]">The challenge:</h2>
            <p className="mt-5 max-w-[40ch] font-serif text-xl leading-snug md:text-2xl">{item.challenge}</p>
          </Reveal>
          <Reveal delay={0.1} className="bg-card p-4 shadow-card">
            <img src={photo(item.gallery[1], 900)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
          </Reveal>
        </Container>
      </section>

      <section data-tone="light" className="pb-section">
        <Container className="flex flex-col items-center text-center">
          <Reveal>
            <DisplayHeading bold={item.statement[0]} serif={item.statement[1]} size="lg" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[36ch] font-serif text-2xl leading-[1.1] tracking-tight md:text-3xl">{item.outcome}</p>
          </Reveal>
          <div className="mt-16 grid w-full gap-5 md:grid-cols-3">
            {item.gallery.map((id, i) => (
              <Parallax key={`${id}-${i}`} speed={[0.04, 0.14, 0.08][i]}>
                <img src={photo(id, 800)} alt="" loading="lazy" className={cn("w-full object-cover", i === 1 ? "aspect-[3/4]" : "aspect-square")} />
              </Parallax>
            ))}
          </div>
        </Container>
      </section>

      <section data-tone="light" className="pb-section">
        <Container>
          <Link href={`/work/${next.slug}`} className="group/next flex flex-col items-center gap-6 border-t border-ink pt-12 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="font-serif text-2xl">Next case</p>
              <p className="display mt-1 text-[clamp(3rem,8vw,7rem)] transition-colors duration-(--duration-base) group-hover/next:text-blue">
                {next.client}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img src={photo(next.image, 400, 300)} alt="" loading="lazy" className="h-28 w-36 rotate-3 object-cover shadow-polaroid transition-transform duration-(--duration-slow) ease-out group-hover/next:rotate-0 md:h-36 md:w-48" />
              <span className="flex size-14 items-center justify-center bg-blue text-snow">
                <ArrowRight className="size-6 transition-transform duration-(--duration-base) group-hover/next:translate-x-1" strokeWidth={2.5} />
              </span>
            </div>
          </Link>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
