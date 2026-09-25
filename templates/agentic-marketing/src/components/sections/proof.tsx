import { Frame, Section } from "@/components/blocks/frame"
import { Photo } from "@/components/blocks/photo"
import { Reveal } from "@/components/blocks/reveal"
import { proof } from "@/content"
import { cn } from "@/lib/utils"

/** Social proof: who uses it, and one customer's number to make it concrete. */
export function Proof() {
  return (
    <Section id="customers" className="pb-10 md:pb-14">
      <Frame>
        <Reveal>
          <h2 className="max-w-[46rem] text-title font-[550]">
            <span className="text-ink">{proof.titleBold}</span>{" "}
            <span className="block text-ink-faint">{proof.titleLight}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 grid gap-4 border-y border-line py-4 md:mt-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)]">
          {/* gap-px over a hairline fill: lines between the cells, none round the edge */}
          <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
            {proof.logos.map((logo) => (
              <li key={logo.name} className="grid h-24 place-items-center bg-canvas text-ink-2 sm:h-32">
                <span className={cn("select-none opacity-80", logo.style)}>{logo.name}</span>
              </li>
            ))}
          </ul>
          <figure className="relative min-h-60 overflow-hidden rounded-card shadow-card">
            <Photo photo={proof.spotlight.photo} sizes="(min-width: 1024px) 440px, 100vw" className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <figcaption className="absolute bottom-4 left-4 text-white">
              <p className="text-[11px] opacity-85">{proof.spotlight.label}</p>
              <p className="text-[2rem] leading-none font-semibold tracking-[-0.03em]">{proof.spotlight.value}</p>
              <p className="mt-1 text-[11px] opacity-85">{proof.spotlight.caption}</p>
            </figcaption>
          </figure>
        </Reveal>
      </Frame>
    </Section>
  )
}
