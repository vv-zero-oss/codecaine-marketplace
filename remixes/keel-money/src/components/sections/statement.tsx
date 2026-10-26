import { WordReveal } from "@/components/motion/word-reveal"
import { Reveal } from "@/components/motion/reveal"
import { DashboardMock } from "@/components/mock/dashboard"
import { PhoneFrame, PhoneScreen } from "@/components/mock/phone"
import { KeelMark } from "@/components/site/logo"
import { Container } from "@/components/ui/container"

/**
 * What Keel is, in one paragraph that lights up word by word as it is read —
 * then the product itself, on desktop and phone.
 */
export function Statement({
  text = "Keel keeps your whole financial life on an even course. Sort your spending, plan budgets, follow investments and net worth, and get nudges that fit how you actually live.",
  platforms = "On iPhone, iPad, Mac and the web",
}: {
  text?: string
  platforms?: string
}) {
  return (
    <section id="features" className="relative pt-(--spacing-section) pb-16">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <KeelMark className="size-12 rounded-[14px]" />
        </Reveal>
        <WordReveal text={text} className="mt-8 max-w-[30ch] font-display text-statement font-medium text-fg" />
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
