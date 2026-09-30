import { CtaBand } from "@/components/layout/site-footer"
import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/heading"
import { servicesLine } from "@/components/work/meta"
import { CASES, photo } from "@/content"
import { Link } from "@/lib/router"

export function CasePage({ slug }: { slug: string }) {
  const index = Math.max(0, CASES.findIndex((c) => c.slug === slug))
  const item = CASES[index]
  const next = CASES[(index + 1) % CASES.length]
  const facts = [
    { label: "Client", value: item.client },
    { label: "Year", value: String(item.year) },
    { label: "Services", value: servicesLine(item.services) },
  ]
  return (
    <>
      <section data-tone="light" className="pt-40 md:pt-48">
        <Container>
          <Reveal>
            <SectionHeader as="h1" size="xl" label={`Case ${String(index + 1).padStart(2, "0")}`} title={item.title} aside={item.summary} />
          </Reveal>
          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-4 md:ml-[25%] md:grid-cols-9">
            {facts.map((f) => (
              <div key={f.label} className="md:col-span-3">
                <dt className="label text-ink-mute">{f.label}</dt>
                <dd className="mt-1 text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
        <div className="mt-16 overflow-hidden">
          <Parallax speed={0.06}>
            <img src={photo(item.image, 2000)} alt={`${item.client}: ${item.title}`} className="aspect-[16/9] w-full object-cover" />
          </Parallax>
        </div>
      </section>

      <section data-tone="light" className="py-section">
        <Container className="grid gap-y-8 md:grid-cols-12 md:gap-x-6">
          <p className="label md:col-span-3">The brief</p>
          <Reveal className="md:col-span-6">
            <p className="text-2xl leading-snug tracking-[-0.02em] md:text-3xl">{item.challenge}</p>
          </Reveal>
        </Container>
        <Container className="mt-16 grid gap-6 md:grid-cols-12">
          <img src={photo(item.gallery[1], 1200)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover md:col-span-5 md:col-start-4" />
          <img src={photo(item.gallery[2], 900)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover md:col-span-4 md:mt-40" />
        </Container>
      </section>

      <section data-tone="dark" className="bg-night py-section text-snow">
        <Container className="grid gap-y-8 border-t border-line-dark pt-5 md:grid-cols-12 md:gap-x-6">
          <p className="label text-snow-mute md:col-span-3">Result</p>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="display max-w-[18ch] text-[clamp(2.5rem,6vw,6rem)]">
                {item.statement[0]} <span className="text-snow-mute">{item.statement[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-[44ch] text-lg leading-snug text-snow-mute">{item.outcome}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section data-tone="light" className="py-section">
        <Container>
          <Link href={`/work/${next.slug}`} className="group/next grid gap-6 border-t border-line pt-5 md:grid-cols-12">
            <p className="label md:col-span-3">Next case</p>
            <div className="md:col-span-5">
              <p className="display text-[clamp(2.5rem,6vw,5.5rem)] transition-colors duration-(--duration-base) group-hover/next:text-accent">
                {next.client}
              </p>
              <p className="mt-2 text-ink-soft">{next.title}</p>
            </div>
            <div className="overflow-hidden md:col-span-4">
              <img src={photo(next.image, 800)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-(--duration-slow) ease-out group-hover/next:scale-[1.03]" />
            </div>
          </Link>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
