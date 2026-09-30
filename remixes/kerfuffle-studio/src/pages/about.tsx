import { CtaBand } from "@/components/layout/site-footer"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { StickerBurst } from "@/components/motion/sticker-burst"
import { Team } from "@/components/sections/team"
import { Container } from "@/components/ui/container"
import { DisplayHeading, Eyebrow } from "@/components/ui/heading"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Sticker } from "@/components/ui/sticker"

const NUMBERS = [
  { value: 2019, label: "The year it all kicked off" },
  { value: 8, label: "Makers under one warehouse roof" },
  { value: 140, suffix: "+", label: "Films, loops and series shipped" },
  { value: 38, label: "Clients who came back for more" },
]

const RULES = [
  { sticker: "Keyframe club", tone: "flame" as const, title: "Show, don’t pitch", body: "No decks about decks. We show a first sketch in the first week, and you tell us if it moves you." },
  { sticker: "Render & chill", tone: "lime" as const, title: "Makers, not middlemen", body: "The people on the call are the people who animate, shoot and cut. Nothing gets lost in a handover." },
  { sticker: "Loop de loop", tone: "violet" as const, title: "Made to be shared", body: "Everything we make is made for where it will live — the feed, the big screen, the pocket." },
]

export function AboutPage() {
  return (
    <>
      <section data-tone="light" className="pt-36 pb-16 md:pt-44">
        <Container>
          <StickerBurst count={7} className="mx-auto max-w-6xl py-8">
            <div className="flex flex-col items-center text-center">
              <Eyebrow>About the studio</Eyebrow>
              <h1 className="mt-6 text-[clamp(3.25rem,11vw,10rem)] leading-[0.88]">
                <span className="display">Makers</span> <span className="display-serif text-flame">at heart</span>
              </h1>
              <p className="mt-6 max-w-[40ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug">
                Kerfuffle started in 2019 with two people, one borrowed laptop and a stubborn belief that brand content
                can be fun to watch. Today we are eight — still hands-on, still a little noisy, still making every frame
                ourselves.
              </p>
              <p className="mt-3 font-mono text-xs text-ink-mute">(Go on — click anywhere up here to add a sticker.)</p>
            </div>
          </StickerBurst>
          <div className="mt-8 flex justify-center">
            <ArrowLink label="Meet the crew" href="/about#team" direction="down" />
          </div>
        </Container>
      </section>

      <section data-tone="light" className="pb-8">
        <Container>
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.06} className="rounded-card border-2 border-ink bg-card p-5 md:p-7">
                <dt className="sr-only">{n.label}</dt>
                <dd>
                  <CountUp value={n.value} suffix={n.suffix} className="display block text-[clamp(3rem,6vw,5.5rem)] text-flame tabular-nums" />
                  <p className="mt-2 max-w-[20ch] text-base leading-snug">{n.label}</p>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <Team eyebrow="Eight of us" bold="Who does" serif="what" showRoles />

      <section data-tone="light" className="pb-section">
        <Container>
          <Reveal>
            <DisplayHeading eyebrow="How we roll" bold="Studio" serif="manifesto" inline size="md" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {RULES.map((rule, i) => (
              <Reveal key={rule.title} delay={i * 0.08}>
                <article className="relative h-full rounded-card border-2 border-ink bg-card p-8 pt-14">
                  <div className="absolute -top-6 left-6">
                    <Sticker text={rule.sticker} tone={rule.tone} rotate={i % 2 ? 5 : -6} className="text-base md:text-xl" />
                  </div>
                  <h3 className="display text-4xl">{rule.title}</h3>
                  <p className="mt-3 text-lg leading-snug">{rule.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
