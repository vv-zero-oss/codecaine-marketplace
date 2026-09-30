import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/heading"
import { photo } from "@/content"

/** The studio in two photographs and a paragraph. */
export function Intro({ index = "03" }: { index?: string }) {
  return (
    <section id="studio" data-tone="light" className="pb-section">
      <Container>
        <Reveal>
          <SectionHeader
            index={index}
            label="Studio"
            title="The people you brief are the people who make it."
            aside="Eight animators, directors, editors and producers in one former harbour warehouse. No account layer, no handovers to a production partner — which is most of the reason things move quickly here."
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <Parallax speed={0.04} className="md:col-span-7">
            <img src={photo(6141089, 1400)} alt="Three of the team outside the studio" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </Parallax>
          <div className="flex flex-col justify-between gap-8 md:col-span-4 md:col-start-9">
            <Parallax speed={0.12}>
              <img src={photo(11489970, 900)} alt="The crew on a wrap day" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </Parallax>
            <ArrowLink href="/about" label="About the studio" />
          </div>
        </div>
      </Container>
    </section>
  )
}
