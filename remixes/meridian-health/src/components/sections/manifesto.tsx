import { Activity, Droplet, Moon, Wind } from "lucide-react"

import { Aurora } from "@/components/motion/aurora"
import { Floating } from "@/components/motion/floating"
import { ScrollText } from "@/components/motion/scroll-text"
import { Container } from "@/components/ui/container"

function Chip({ icon: Icon, label, value, tint, className, delay = 0 }: { icon: typeof Moon; label: string; value: string; tint: string; className: string; delay?: number }) {
  return (
    <Floating className={`absolute z-10 ${className}`} distance={9} duration={6.5} delay={delay}>
      <div className="flex items-center gap-2.5 rounded-chip bg-paper/85 px-3.5 py-2.5 shadow-chip backdrop-blur">
        <span className="grid size-8 place-items-center rounded-lg" style={{ background: `var(--color-${tint})` }}><Icon className="size-4 text-ink-2" /></span>
        <span className="leading-tight"><span className="block text-[13px] font-semibold tracking-tight">{label}</span><span className="block text-xs text-ink-3 tabular-nums">{value}</span></span>
      </div>
    </Floating>
  )
}

/** A pastel panel between the proof and the product: one paragraph that reads itself in as you scroll, with the numbers it's talking about floating round it. */
export function Manifesto() {
  return (
    <section className="px-1.5 py-10 sm:px-2 sm:py-16">
      <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-card bg-[linear-gradient(120deg,var(--color-pastel-lilac),var(--color-pastel-peach)_55%,var(--color-pastel-sky))] px-5 py-28 sm:py-44">
        <Aurora tone="dawn" intensity={0.55} />
        <Chip icon={Moon} label="Deep sleep" value="2h 06m" tint="pastel-lilac" className="top-[9%] left-[4%] hidden sm:block" />
        <Chip icon={Activity} label="HRV" value="62 ms ↑ 7" tint="pastel-sky" className="top-[16%] right-[5%] hidden md:block" delay={1.1} />
        <Chip icon={Droplet} label="Glucose" value="4.9 mmol/L" tint="pastel-mint" className="bottom-[10%] left-[8%] hidden md:block" delay={2} />
        <Chip icon={Wind} label="VO₂ max" value="53.4" tint="pastel-butter" className="right-[6%] bottom-[8%] hidden sm:block" delay={0.5} />
        <Container className="relative">
          <p className="mb-6 text-center text-xs font-medium tracking-widest text-ink-2 uppercase">Why Meridian</p>
          <ScrollText
            className="display mx-auto max-w-[22ch] justify-center text-center text-[clamp(1.9rem,5vw,3.5rem)]"
            text="Your body talks all day. Your watch hears it, your bloodwork confirms it, and nobody translates. Meridian does."
          />
        </Container>
      </div>
    </section>
  )
}
