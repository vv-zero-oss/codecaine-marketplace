import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"
import { Polaroid } from "@/components/ui/polaroid"
import { Sticker } from "@/components/ui/sticker"
import { photo } from "@/content"

/** Who is behind it: a short hello on the left, two snapshots of the crew on the right. */
export function Intro() {
  return (
    <section id="intro" data-tone="light" className="scroll-mt-0 py-section">
      <Container className="grid items-center gap-16 md:grid-cols-[1.1fr_1fr] md:gap-12">
        <div className="flex flex-col items-start">
          <Reveal>
            <DisplayHeading eyebrow="Hello, we're Kerfuffle" bold="Small crew," serif="big commotion" size="md" align="left" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[42ch] text-lg leading-snug">
              Eight people, one warehouse, no account-manager relay race. The animators, directors and editors you meet
              on the first call are the ones who make the thing — so ideas move fast and nothing gets lost on the way.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-8">
            <ButtonLink href="/about" label="Meet the studio" />
          </Reveal>
        </div>
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[40rem]">
          <Parallax speed={0.06} className="absolute top-0 right-0 w-[62%]">
            <Polaroid src={photo(6141089, 900)} alt="The crew outside the studio on a sunny afternoon" rotate={4} className="aspect-[4/5]" />
          </Parallax>
          <Parallax speed={0.18} className="absolute bottom-0 left-0 w-[50%]">
            <Polaroid src={photo(11489970, 800)} alt="The team celebrating a wrap day on the street" rotate={-5} className="aspect-[4/5]" />
          </Parallax>
          <div className="absolute top-[8%] left-[6%] z-10">
            <Sticker text="Made in Rotterdam" tone="violet" rotate={-10} />
          </div>
        </div>
      </Container>
    </section>
  )
}
