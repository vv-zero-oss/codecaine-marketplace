import { Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

import { useCycle, useStill } from "@/components/motion"
import { CountUp } from "@/components/motion/count-up"
import { ScrambleText } from "@/components/motion/scramble-text"
import { LanguageMap } from "@/components/sections/language-map"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Glow } from "@/components/ui/glow"
import { LANGUAGES } from "@/content"
import { cn } from "@/lib/utils"

export function Languages({ cycleSeconds = 3.2 }: { cycleSeconds?: number }) {
  const still = useStill()
  const [index] = useCycle(LANGUAGES.list.length, cycleSeconds, still)
  const [sound, setSound] = useState(false)
  const current = LANGUAGES.list[index]

  return (
    <section id="languages" className="relative overflow-hidden py-16 sm:py-24">
      <Glow tone="green" intensity={0.12} />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <div className="max-w-[760px]">
            <Eyebrow>{LANGUAGES.eyebrow}</Eyebrow>
            <h2 className="scanline mt-6 min-h-[2.4em] text-[clamp(28px,4vw,48px)] leading-[1.15] tracking-[-0.02em]">
              {LANGUAGES.lead}
              <br />
              <ScrambleText key={current.name} text={current.name} duration={0.7} scanlines={false} className="text-muted" />
            </h2>
            <p className="mt-2 max-w-[640px] text-[clamp(15px,1.4vw,18px)] leading-relaxed text-text">{LANGUAGES.body}</p>
          </div>
          <div className="lg:text-right">
            <CountUp to={LANGUAGES.count} className="scanline block text-[clamp(72px,9vw,128px)] leading-none tracking-[-0.04em] text-text" />
            <p className="mt-3 text-[clamp(15px,1.4vw,18px)] text-text">{LANGUAGES.countLabel}</p>
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-[1180px] sm:mt-14">
          <LanguageMap lon={current.lon} lat={current.lat} className="[mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_100%)]" />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            aria-pressed={sound}
            onClick={() => setSound((s) => !s)}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-3.5 font-mono text-[10px] tracking-wider uppercase transition-colors hover:bg-white/6",
              sound ? "text-text" : "text-faint",
            )}
          >
            {sound ? <Volume2 className="size-3" /> : <VolumeX className="size-3" />}
            Sound {sound ? "on" : "off"}
          </button>
        </div>
      </Container>
    </section>
  )
}
