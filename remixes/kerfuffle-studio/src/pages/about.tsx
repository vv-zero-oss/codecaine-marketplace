import { CtaBand } from "@/components/layout/site-footer"
import { CountUp } from "@/components/motion/count-up"
import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { Team } from "@/components/sections/team"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/heading"
import { photo } from "@/content"

const NUMBERS = [
  { value: 2019, label: "Founded" },
  { value: 8, label: "People" },
  { value: 140, suffix: "+", label: "Projects shipped" },
  { value: 38, label: "Returning clients" },
]

const PRINCIPLES = [
  { title: "Show it early", body: "A first sketch or rough cut in week one. It is easier to react to something than to a deck about it." },
  { title: "No handovers", body: "The people on the first call write, shoot, animate and edit. Nothing gets lost between teams." },
  { title: "Made for where it lives", body: "A feed, a lobby screen and a keynote need different films. We cut for each one on purpose." },
]

export function AboutPage() {
  return (
    <>
      <section data-tone="light" className="pt-40 pb-section md:pt-48">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              size="xl"
              label="About"
              title="A small studio that makes the whole thing."
              aside="Kerfuffle started in 2019 with two people and a borrowed laptop. Today we are eight — animators, directors, editors and a producer — working for clubs, archives, start-ups and brands you know, from a warehouse on the Rotterdam waterfront."
            />
          </Reveal>
          <dl className="mt-20 grid grid-cols-2 border-t border-line md:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.05} className="border-b border-line py-6 md:border-b-0 md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0">
                <dt className="label text-ink-mute">{n.label}</dt>
                <dd>
                  <CountUp value={n.value} suffix={n.suffix} className="display mt-2 block text-[clamp(3rem,6vw,5.5rem)] tabular-nums" />
                </dd>
              </Reveal>
            ))}
          </dl>
          <Parallax speed={0.05} className="mt-20">
            <img src={photo(11489970, 1800)} alt="The crew on a wrap day" className="aspect-[21/9] w-full object-cover" />
          </Parallax>
        </Container>
      </section>

      <Team index="01" title="Who does what." showLines />

      <section data-tone="light" className="pb-section">
        <Container>
          <Reveal>
            <SectionHeader index="02" label="How we work" title="Three habits we keep." />
          </Reveal>
          <ol className="mt-16 grid gap-10 md:grid-cols-12 md:gap-6">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="md:col-span-3 md:first:col-start-4">
                <li className="border-t border-ink pt-4">
                  <span className="label text-ink-mute">0{i + 1}</span>
                  <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{p.title}</h3>
                  <p className="mt-3 text-base leading-snug text-ink-soft">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
