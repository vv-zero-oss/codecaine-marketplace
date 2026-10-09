import { ListOrdered } from "lucide-react"

import { Masthead } from "@/components/masthead"
import { Cube3D } from "@/components/motion/cube-3d"
import { ParallaxRail } from "@/components/motion/parallax-rail"
import { SchoolRadio } from "@/components/radio/school-radio"
import { Container } from "@/components/ui/container"
import { Figure } from "@/components/ui/section-heading"
import { Photo } from "@/components/ui/photo"
import { Stamp } from "@/components/ui/retro"
import { PHOTOS } from "@/data/photos"

/** A postage stamp for the station: a rising sun in rust, a scribbled signature, the particulars. */
function StationStamp() {
  return (
    <Stamp className="w-32 shrink-0 -rotate-2 sm:w-40">
      <svg aria-hidden viewBox="0 0 100 64" className="h-auto w-full text-rust">
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
          {Array.from({ length: 11 }, (_, i) => {
            const a = Math.PI + (i / 10) * Math.PI
            return <line key={i} x1={50 + Math.cos(a) * 18} y1={52 + Math.sin(a) * 18} x2={50 + Math.cos(a) * 44} y2={52 + Math.sin(a) * 44} />
          })}
        </g>
        <path d="M6 56 q6 -10 10 0 t10 0 t10 -6 t10 6 t12 -2 t12 0" stroke="var(--ink)" strokeWidth="1.4" fill="none" />
      </svg>
      <p className="mt-2 font-type text-[0.52rem] leading-tight tracking-wider">
        <b>STATION</b> Marlowe FM<br />
        <b>DATE</b> 02/10/2026
      </p>
    </Stamp>
  )
}

/**
 * Marlowe FM. The title block and a stamp on paper; under them the desk, a dark
 * band the radio sits on, with a rail of dice beside it and a short list of
 * what the controls do.
 */
export function RadioSection() {
  return (
    <section id="radio" aria-labelledby="radio-title" className="scroll-mt-4">
      <Container className="flex items-end gap-4 border-t-4 border-double border-ink pt-10 pb-8 sm:gap-6">
        <div className="flex-1" id="radio-title">
          <Masthead text="ON AIR" className="max-w-[78%]" />
        </div>
        <StationStamp />
      </Container>

      <div className="relative bg-desk text-paper-light [background-image:var(--grain)] [background-blend-mode:screen]">
        <Container className="grid gap-10 py-12 lg:grid-cols-[17rem_1fr_7.5rem] lg:gap-12">
          <div className="flex flex-col gap-5">
            <h3 className="display text-[clamp(2.4rem,4.5vw,3.6rem)]">
              Tune in,<br />turn up.
            </h3>
            <p className="max-w-[30ch] leading-snug text-paper-light/80">
              The radio brief is the day in four minutes: bells, bake sales, fixtures and found property — read by the Radio Club from the basement.
            </p>
            <ol className="flex flex-col gap-2 border-y border-paper-light/30 py-3 font-type text-[0.78rem] leading-snug tracking-wide text-paper-light/90">
              <li className="flex gap-2"><ListOrdered aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />Flip POWER on.</li>
              <li className="pl-6">Turn TUNE, or tap a preset key.</li>
              <li className="pl-6">Press READ ALOUD to hear the brief.</li>
            </ol>
            <Figure caption="The original Marlowe FM set, still on the shelf." className="hidden lg:block [&_figcaption]:text-paper-light/60">
              <Photo src={PHOTOS.radio} alt="A close-up of a vintage brown radio with a round dial" className="aspect-[4/3] w-full border-paper-light/50" />
            </Figure>
          </div>
          <SchoolRadio />
          <ParallaxRail className="hidden border-paper-light/30 lg:flex" distance={36}>
            <Cube3D size={84} speed={14} tone="rust" labels="FM,AM,♪,●,▶,■" />
            <Cube3D size={64} speed={9} labels="1,2,3,4,5,6" />
          </ParallaxRail>
        </Container>
      </div>
    </section>
  )
}
