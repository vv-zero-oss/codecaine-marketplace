import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"
import { Polaroid } from "@/components/ui/polaroid"
import { Sticker } from "@/components/ui/sticker"
import { photo } from "@/content"

/** Who is behind it: two snapshots of the crew, and a short hello. */
export function Intro() {
  return (
    <section id="intro" data-tone="light" className="scroll-mt-0 py-section">
      <Container className="grid items-center gap-16 md:grid-cols-2 md:gap-10">
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[40rem]">
          <Parallax speed={0.06} className="absolute top-0 left-0 w-[64%]">
            <Polaroid src={photo(6141089, 900)} alt="The crew outside the studio on a sunny afternoon" rotate={-4} className="aspect-[4/5]" />
          </Parallax>
          <Parallax speed={0.18} className="absolute right-0 bottom-0 w-[50%]">
            <Polaroid src={photo(11489970, 800)} alt="The team celebrating a wrap day on the street" rotate={5} className="aspect-[4/5]" />
          </Parallax>
          <div className="absolute top-[40%] left-[52%] z-10 -translate-x-1/2">
            <Sticker text="Made in Rotterdam" tone="pink" rotate={-8} />
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <DisplayHeading eyebrow="Who we are" bold="The makers at" serif="Kerfuffle" size="md" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-snug md:text-lg">
              No slow agency shuffle. We are a small crew of animators, editors and makers who switch fast and think
              ahead — usually before you have finished the brief.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-7">
            <ButtonLink href="/about" label="More about us" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
