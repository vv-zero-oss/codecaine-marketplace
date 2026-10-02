import { Star, Wind } from "lucide-react"
import { useState } from "react"

import { PhoneFrame } from "@/components/device/phone-frame"
import { WatchFrame } from "@/components/device/watch-frame"
import { Floating } from "@/components/motion/floating"
import { Reveal } from "@/components/motion/reveal"
import { TodayScreen } from "@/components/screens/today"
import { WATCH_FACES, WatchFace } from "@/components/screens/watch-face"
import { AppleIcon } from "@/components/ui/apple-icon"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/** A glass chip that floats near the phone: a metric with a little sparkline. */
function MetricChip({ label, value, className, children }: { label: string; value: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-chip bg-paper/90 px-3.5 py-2.5 shadow-chip backdrop-blur ${className ?? ""}`}>
      {children}
      <div className="leading-tight">
        <div className="text-[13px] font-semibold tracking-tight">{label}</div>
        <div className="text-xs text-ink-3 tabular-nums">{value}</div>
      </div>
    </div>
  )
}

/** The headline, the download button, and a phone and a watch you can really use. */
export function Hero() {
  const [face, setFace] = useState(0)
  return (
    <section id="top" className="p-1.5 sm:p-2">
      <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(#cfe0f4,#e8f0fa_46%,#f6f4f8)] pb-16 sm:rounded-[36px]">
        {/* the sky: a soft rainbow band behind the devices */}
        <div aria-hidden="true" data-canvas-ignore className="pointer-events-none absolute inset-x-[-10%] top-[46%] h-[34%] bg-[radial-gradient(60%_50%_at_50%_30%,rgb(110_212_240/0.9),transparent_70%),radial-gradient(70%_45%_at_50%_60%,rgb(255_176_198/0.8),transparent_72%),radial-gradient(60%_35%_at_50%_85%,rgb(255_232_150/0.75),transparent_75%)] blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />

        <Container className="relative pt-24 text-center sm:pt-28">
          <Reveal>
            <h1 className="display mx-auto max-w-[11ch] text-[clamp(2.5rem,7vw,4.25rem)]">
              Your connected health coach
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-md text-[clamp(1rem,2.2vw,1.25rem)] leading-snug text-ink-2">
              Meridian reads your wearable, your bloodwork and your habits together — then tells you what to do today.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col items-center gap-3">
            <ButtonLink href="#download" size="lg"><AppleIcon /> Download app</ButtonLink>
            <div className="flex items-center gap-2 text-xs text-ink-2">
              <span className="flex text-amber" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-3.5 fill-current" />)}</span>
              4.8 · 49.1K ratings globally
            </div>
          </Reveal>

          {/* the devices */}
          <div className="relative mx-auto mt-10 w-[min(300px,72vw)] [perspective:1400px]">
            <Reveal delay={0.25}>
              <div className="origin-bottom transition-transform duration-700 ease-out sm:[transform:rotateY(-6deg)_rotateZ(1deg)] sm:hover:[transform:rotateY(0deg)_rotateZ(0deg)]">
                <PhoneFrame tone="titanium"><TodayScreen /></PhoneFrame>
              </div>
            </Reveal>
            <div className="absolute right-[-16%] bottom-[8%] z-10 w-[44%] sm:right-[-34%] sm:w-[56%]">
              <Floating distance={8} duration={7}>
                <WatchFrame onCrown={() => setFace((f) => (f + 1) % WATCH_FACES.length)} className="drop-shadow-2xl">
                  <WatchFace face={WATCH_FACES[face]} />
                </WatchFrame>
              </Floating>
            </div>
            <Floating className="absolute top-[20%] left-[-62%] z-10 hidden sm:block" distance={10} duration={6}>
              <MetricChip label="VO₂ Max" value="53.4 ml/kg">
                <span className="grid size-8 place-items-center rounded-lg bg-mint/15 text-mint"><Wind className="size-4" /></span>
              </MetricChip>
            </Floating>
            <Floating className="absolute top-[52%] left-[-52%] z-10 hidden sm:block" distance={7} duration={5} delay={1.2}>
              <MetricChip label="HRV" value="62 ms ↑ 7">
                <span className="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-7 4 14 3-7h6" /></svg>
                </span>
              </MetricChip>
            </Floating>
          </div>
        </Container>
      </div>
    </section>
  )
}
