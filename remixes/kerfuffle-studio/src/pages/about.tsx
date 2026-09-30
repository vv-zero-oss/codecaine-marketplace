import { CtaBand } from "@/components/layout/site-footer"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { StickerBurst } from "@/components/motion/sticker-burst"
import { Team } from "@/components/sections/team"
import { Container } from "@/components/ui/container"
import { DisplayHeading, Eyebrow } from "@/components/ui/heading"
import { ScribbleLink } from "@/components/ui/scribble-link"
import { Sticker } from "@/components/ui/sticker"

const NUMBERS = [
  { value: 2019, label: "The year we started, in a borrowed room" },
  { value: 7, label: "Makers under one warehouse roof" },
  { value: 140, suffix: "+", label: "Films, loops and series shipped" },
  { value: 38, label: "Clients who came back for more" },
]

const RULES = [
  { sticker: "No fluff!", tone: "blue" as const, title: "Straight to the point", body: "No decks about decks. We show a first sketch in the first week, and you tell us if it moves you." },
  { sticker: "Less talk, more frames", tone: "green" as const, title: "Makers, not middlemen", body: "The people on the call are the people who animate, shoot and cut. Nothing gets lost in a handover." },
  { sticker: "Always in motion", tone: "yellow" as const, title: "Made to be shared", body: "Everything we make is made for where it will live — the feed, the big screen, the pocket." },
]

export function AboutPage() {
  return (
    <>
      <section data-tone="light" className="pt-36 pb-16 md:pt-44">
        <Container>
          <StickerBurst count={7} className="mx-auto max-w-6xl py-8">
            <div className="flex flex-col items-center text-center">
              <Eyebrow>About us</Eyebrow>
              <h1 className="mt-3 text-[clamp(3.25rem,11vw,10rem)]">
                <span className="display">We are</span> <span className="display-serif">makers</span>
              </h1>
              <p className="mt-6 max-w-[34ch] font-serif text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.08] tracking-tight">
                At Kerfuffle there is no slow agency shuffle. We are a crew of makers who switch gears fast and think
                ahead. We give your idea some weight, then give it wings — from a still story to one people cannot
                stop sharing.
              </p>
              <p className="mt-3 font-mono text-xs text-ink-mute">(Go on — click anywhere up here to add a sticker.)</p>
            </div>
          </StickerBurst>
          <div className="mt-8 flex justify-center">
            <ScribbleLink label="Meet the crew" href="/about#team" direction="down" />
          </div>
        </Container>
      </section>

      <section data-tone="light" className="pb-8">
        <Container>
          <dl className="grid grid-cols-2 border-t border-ink md:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.06} className="border-b border-ink py-6 pr-4 md:border-b-0 md:py-10">
                <dt className="sr-only">{n.label}</dt>
                <dd>
                  <CountUp value={n.value} suffix={n.suffix} className="display block text-[clamp(3rem,6vw,5.5rem)] tabular-nums" />
                  <p className="mt-2 max-w-[20ch] font-serif text-lg leading-tight">{n.label}</p>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <Team eyebrow="The makers at Kerfuffle" bold="Meet the" serif="crew" showRoles />

      <section data-tone="light" className="pb-section">
        <Container>
          <Reveal>
            <DisplayHeading eyebrow="How we roll" bold="House" serif="rules" size="md" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {RULES.map((rule, i) => (
              <Reveal key={rule.title} delay={i * 0.08}>
                <article className="relative h-full bg-card p-8 pt-14 shadow-card">
                  <div className="absolute -top-6 left-6">
                    <Sticker text={rule.sticker} tone={rule.tone} rotate={i % 2 ? 5 : -6} className="text-base md:text-xl" />
                  </div>
                  <h3 className="display text-4xl">{rule.title}</h3>
                  <p className="mt-3 font-serif text-xl leading-snug">{rule.body}</p>
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
