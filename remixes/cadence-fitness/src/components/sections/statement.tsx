import { WordReveal } from "@/components/motion/word-reveal"
import { Reveal } from "@/components/motion/reveal"
import { DashboardMock } from "@/components/mock/dashboard"
import { PhoneFrame, PhoneScreen } from "@/components/mock/phone"
import { CadenceMark } from "@/components/site/logo"
import { Container } from "@/components/ui/container"

/**
 * What Cadence is, in one paragraph that lights up word by word as it is read —
 * then the product itself, on desktop and phone.
 */
export function Statement({
  text = "Cadence keeps your whole body in rhythm. Follow heart rate, sleep, HRV and training load, and get guidance that fits how you actually feel today.",
  platforms = "On your wrist, your phone and the web",
}: {
  text?: string
  platforms?: string
}) {
  return (
    <section id="features" className="relative pt-(--spacing-section) pb-16">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <CadenceMark className="size-12 rounded-full bg-action text-forest-ink" />
        </Reveal>
        <WordReveal text={text} className="mt-8 max-w-[30ch] font-sans text-statement font-semibold text-fg" />
        <Reveal className="mt-20 md:mt-28">
          <p className="text-lead text-fg-2">{platforms}</p>
        </Reveal>
      </Container>
      <Container className="relative mt-10 md:mt-14">
        <Reveal y={48} duration={1}>
          <div className="relative md:pr-[22%]">
            <DashboardMock className="min-h-[340px]" />
            <div className="absolute top-[6%] right-0 hidden w-[25%] md:block">
              <PhoneFrame className="w-full">
                <PhoneScreen />
              </PhoneFrame>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
