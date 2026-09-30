import { ArrowUpRight } from "lucide-react"

import { CtaBand } from "@/components/layout/site-footer"
import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { DisplayHeading, Eyebrow } from "@/components/ui/heading"
import { Sticker } from "@/components/ui/sticker"
import { CASE_BG, servicesLine } from "@/components/work/tones"
import { CASES, photo } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

export function CasePage({ slug }: { slug: string }) {
  const index = Math.max(0, CASES.findIndex((c) => c.slug === slug))
  const item = CASES[index]
  const next = CASES[(index + 1) % CASES.length]
  const facts = [
    { label: "Client", value: item.client },
    { label: "Year", value: String(item.year) },
    { label: "We made", value: servicesLine(item.services) },
  ]
  return (
    <>
      <section data-tone="light" className="pt-32 md:pt-40">
        <Container>
          <Reveal>
            <Eyebrow>Case study</Eyebrow>
            <h1 className="mt-6 max-w-5xl text-[clamp(3rem,8vw,7.5rem)] leading-[0.88]">
              <span className="display">{item.client}</span>{" "}
              <span className="display-serif text-flame">{item.title.toLowerCase()}</span>
            </h1>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <Reveal delay={0.08}>
              <p className="max-w-[44ch] text-lg leading-snug md:text-xl">{item.summary}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <dl className="grid grid-cols-3 gap-3">
                {facts.map((f) => (
                  <div key={f.label} className="rounded-chip border-2 border-ink bg-card p-3">
                    <dt className="font-mono text-[10px] text-ink-mute uppercase">{f.label}</dt>
                    <dd className="mt-1 text-sm leading-tight">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <div className={cn("relative mt-12 overflow-hidden rounded-card border-2 border-ink", CASE_BG[item.color])}>
            <Parallax speed={0.08} className="mx-auto w-full max-w-4xl px-6 py-10 md:py-16">
              <img src={photo(item.image, 1400)} alt={`${item.client}: ${item.title}`} className="aspect-[16/10] w-full rounded-[14px] border-2 border-ink object-cover shadow-lift" />
            </Parallax>
            <div className="absolute top-5 right-5 md:top-8 md:right-8">
              <Sticker text={servicesLine(item.services)} tone="yellow" rotate={6} className="text-sm md:text-base" />
            </div>
          </div>
        </Container>
      </section>

      <section data-tone="light" className="py-section">
        <Container className="grid items-start gap-12 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <Reveal>
            <DisplayHeading eyebrow="The brief" bold="What was" serif="stuck" size="md" align="left" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl leading-snug md:text-2xl">{item.challenge}</p>
            <img src={photo(item.gallery[1], 1000)} alt="" loading="lazy" className="mt-10 aspect-[16/10] w-full rounded-card border-2 border-ink object-cover" />
          </Reveal>
        </Container>
      </section>

      <section data-tone="dark" className="bg-night py-section text-snow">
        <Container className="flex flex-col items-start">
          <Reveal>
            <Eyebrow className="text-lime">The result</Eyebrow>
            <h2 className="mt-6 text-[clamp(3rem,8vw,7rem)] leading-[0.88]">
              <span className="display">{item.statement[0]}</span>
              <br />
              <span className="display-serif text-lime">{item.statement[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[40ch] text-lg leading-snug text-snow-mute md:text-xl">{item.outcome}</p>
          </Reveal>
          <div className="mt-14 grid w-full gap-5 md:grid-cols-3">
            {item.gallery.map((id, i) => (
              <Parallax key={`${id}-${i}`} speed={[0.04, 0.14, 0.08][i]}>
                <img src={photo(id, 800)} alt="" loading="lazy" className={cn("w-full rounded-card object-cover", i === 1 ? "aspect-[3/4]" : "aspect-square")} />
              </Parallax>
            ))}
          </div>
        </Container>
      </section>

      <section data-tone="light" className="py-section">
        <Container>
          <Link
            href={`/work/${next.slug}`}
            className={cn("group/next flex flex-col items-start gap-6 rounded-card border-2 border-ink p-6 md:flex-row md:items-center md:justify-between md:p-10", CASE_BG[next.color])}
          >
            <div>
              <p className="label text-xs">Up next</p>
              <p className="display mt-2 text-[clamp(3rem,8vw,6.5rem)]">{next.client}</p>
              <p className="font-serif text-2xl italic">{next.title}</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={photo(next.image, 400, 300)} alt="" loading="lazy" className="h-28 w-36 rotate-3 rounded-chip border-2 border-ink object-cover transition-transform duration-(--duration-slow) ease-out group-hover/next:rotate-0 md:h-36 md:w-48" />
              <span className="flex size-14 items-center justify-center rounded-full bg-ink text-snow transition-transform duration-(--duration-base) group-hover/next:rotate-45">
                <ArrowUpRight className="size-6" strokeWidth={2.5} />
              </span>
            </div>
          </Link>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
