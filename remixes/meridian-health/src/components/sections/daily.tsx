import { Aurora } from "@/components/motion/aurora"
import { Reveal } from "@/components/motion/reveal"
import { PhoneFrame } from "@/components/device/phone-frame"
import { RecoveryScreen, SleepScreen, StrainScreen } from "@/components/screens/daily"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const CARDS = [
  { title: "Strain", body: "Track how hard you’re pushing through your daily effort and exertion.", tone: "bg-[linear-gradient(#e8eefc,#dfe7fa)]", Screen: StrainScreen, statusTone: "dark" as const, tilt: "titanium" as const },
  { title: "Sleep", body: "Discover what it takes to get a good night’s rest by knowing your sleep stages.", tone: "bg-[linear-gradient(#e6ecfb,#d6def5)]", Screen: SleepScreen, statusTone: "light" as const, tilt: "black" as const },
  { title: "Recovery", body: "See if you’re ready to tackle the day or time to slow down and rest.", tone: "bg-[linear-gradient(#e6f2ea,#d5ecdb)]", Screen: RecoveryScreen, statusTone: "dark" as const, tilt: "white" as const },
]

/** Three daily signals, each with a phone that works: scrub the strain, tap a sleep stage, switch the recovery metric. */
export function Daily() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Aurora tone="sky" intensity={0.7} />
      <Container>
        <Reveal className="text-center">
          <h2 className="display text-[clamp(2rem,5vw,3.25rem)]">Start the day with clarity</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-2">Three numbers that turn the last 24 hours into a plain answer: push, hold or rest.</p>
        </Reveal>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {CARDS.map(({ title, body, tone, Screen, statusTone, tilt }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <article className={cn("relative flex h-[600px] flex-col overflow-hidden rounded-card p-6 sm:h-[640px]", tone)}>
                <h3 className="display text-[28px]">{title}</h3>
                <p className="mt-1.5 max-w-[26ch] text-sm leading-snug text-ink-2">{body}</p>
                <div className="absolute inset-x-[14%] top-[150px] sm:top-[160px]">
                  <PhoneFrame tone={tilt} statusTone={statusTone}><Screen /></PhoneFrame>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
