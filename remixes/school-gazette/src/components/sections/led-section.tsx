import { LedBoard } from "@/components/led/led-board"
import { Cube3D } from "@/components/motion/cube-3d"
import { ParallaxRail } from "@/components/motion/parallax-rail"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

/** The scoreboard. An embossed plate with glowing digits, and a die on each side of it at wide widths. */
export function LedSection() {
  return (
    <section id="scoreboard" aria-labelledby="scoreboard-title" className="scroll-mt-4 border-t-4 border-double border-ink">
      <Container className="grid gap-10 py-14 lg:grid-cols-[7.5rem_1fr] lg:gap-12">
        <ParallaxRail className="hidden border-r border-l-0 pr-6 pl-0 lg:flex" distance={44}>
          <Cube3D size={78} speed={13} tone="ink" labels="✓,✗,★,♞,♜,♛" />
          <Cube3D size={60} speed={8} labels="9,8,7,6,5,4" />
        </ParallaxRail>
        <div className="flex flex-col gap-8">
          <div id="scoreboard-title">
            <SectionHeading kicker="The scoreboard" title="Counting down, counting up." deck="Days until Founders’ Day, and the House Points race, live. Pick an LED colour; give a house ten points if it earned them." />
          </div>
          <LedBoard />
        </div>
      </Container>
    </section>
  )
}
