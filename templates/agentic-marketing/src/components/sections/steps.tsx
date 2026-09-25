import { ArrowUp, Check, Loader } from "lucide-react"

import { BrandLogo } from "@/components/blocks/brand-logo"
import { Frame, Section } from "@/components/blocks/frame"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Mark } from "@/components/blocks/wordmark"
import { steps } from "@/content"

/** How you start: three steps, each with a glimpse of the screen it happens on. */
export function Steps() {
  return (
    <Section id="how-it-works" className="pt-0">
      <Frame>
        <div className="border-y border-line py-12 md:py-16">
          <Reveal>
            <SectionHeading light={steps.titleLight} bold={steps.titleBold} />
          </Reveal>
        </div>
        <ol className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
          {steps.items.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.08}>
              <article className="flex h-full min-h-[24rem] flex-col rounded-card bg-gradient-to-b from-mist-2 to-mist p-5 shadow-inset">
                <span className="text-[11px] font-medium text-ink-soft tabular-nums">{step.n}</span>
                <div className="grid flex-1 place-items-center py-6">
                  {step.kind === "signup" && <SignupCard />}
                  {step.kind === "connect" && <ConnectList />}
                  {step.kind === "ask" && <AskThread />}
                </div>
                <h3 className="text-[13px] font-medium">{step.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </Frame>
    </Section>
  )
}

function SignupCard() {
  return (
    <div className="w-full max-w-[15rem] rounded-lg bg-surface px-5 py-6 text-center shadow-float">
      <Mark className="mx-auto size-6" />
      <p className="mt-3 text-[15px] font-semibold tracking-[-0.02em]">{steps.signup.title}</p>
      <p className="mt-1.5 text-[10px] leading-relaxed text-ink-soft">{steps.signup.body}</p>
      <span className="mt-4 inline-flex h-7 items-center gap-1.5 rounded-full bg-pine px-3 text-[10px] font-medium text-white">
        <BrandLogo name="google" className="size-3 rounded-full bg-white p-[1px]" />
        {steps.signup.cta}
      </span>
    </div>
  )
}

function ConnectList() {
  return (
    <ul className="grid w-full max-w-[16rem] gap-1.5">
      {steps.connect.map((c) => {
        const done = c.state === "Connected"
        return (
          <li key={c.name} className="flex items-center gap-2 rounded-md bg-surface px-3 py-2 text-[11px] shadow-xs">
            <BrandLogo name={c.logo} className="size-3.5" />
            <span className="font-medium">{c.name}</span>
            <span className={`ml-auto flex items-center gap-1 text-[10px] ${done ? "text-mint-ink" : "text-ink-faint"}`}>
              {done ? <Check className="size-3" /> : <Loader className="size-3 animate-spin motion-reduce:animate-none" />}
              {c.state}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function AskThread() {
  return (
    <div className="grid w-full max-w-[17rem] gap-2">
      <p className="justify-self-end rounded-full bg-ink-2 px-3 py-1.5 text-[10px] text-white">{steps.ask.you}</p>
      <div className="rounded-lg bg-surface p-3 shadow-float">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold">
          <Mark className="size-3.5" /> Adwright
        </p>
        <p className="mt-1.5 text-[11px] leading-snug text-ink-2">{steps.ask.reply}</p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="inline-flex h-6 items-center gap-1 rounded-md bg-ink px-2 text-[10px] font-medium text-white">
            <ArrowUp className="size-3" /> {steps.ask.cta}
          </span>
          <span className="inline-flex h-6 items-center rounded-md px-2 text-[10px] text-ink-soft shadow-button">
            {steps.ask.alt}
          </span>
        </div>
      </div>
    </div>
  )
}
