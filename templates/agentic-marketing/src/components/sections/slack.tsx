import { Check, FileText, Hash } from "lucide-react"

import { BrandLogo } from "@/components/blocks/brand-logo"
import { ChatMessage } from "@/components/blocks/chat-bubble"
import { Frame, Section } from "@/components/blocks/frame"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"
import { slack } from "@/content"

/** Where you talk to it: a Slack channel on one side, the three steps on the other. */
export function SlackSection() {
  return (
    <Section id="slack" className="pt-0">
      <Frame>
        <div className="grid border-b border-line lg:grid-cols-2">
          <Reveal className="grid place-items-center py-6 lg:border-r lg:border-line lg:py-10 lg:pr-12">
            <div className="w-full max-w-[25rem] overflow-hidden rounded-lg bg-surface shadow-float">
              <p className="flex items-center gap-1 bg-aubergine px-4 py-2.5 text-[11px] font-medium text-white/85">
                <Hash className="size-3" /> {slack.channel.replace("# ", "")}
              </p>
              <div className="grid gap-4 p-4">
                <ChatMessage who={slack.digest.who} time={slack.digest.time} bot>
                  <p>{slack.digest.text}</p>
                  <dl className="mt-2 flex gap-5 border-t border-line pt-2">
                    {slack.digest.kpis.map((k) => (
                      <div key={k.label}>
                        <dd className="text-[13px] font-semibold text-ink tabular-nums">{k.value}</dd>
                        <dt className="text-[9px] text-ink-faint">{k.label}</dt>
                      </div>
                    ))}
                  </dl>
                </ChatMessage>
                <ChatMessage who={slack.you.who} time={slack.you.time}>
                  {slack.you.text}
                </ChatMessage>
                <ChatMessage who={slack.answer.who} time={slack.answer.time} bot>
                  <p>{slack.answer.text}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-mint-wash px-2 py-1 text-[10px] font-medium text-mint-ink">
                    <Check className="size-3" /> <FileText className="size-3" /> {slack.answer.file}
                  </span>
                </ChatMessage>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 py-10 lg:pl-12">
            <Reveal>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2 py-1 text-[11px] font-medium shadow-button">
                <BrandLogo name="slack" className="size-3" /> {slack.eyebrow}
              </p>
              <SectionHeading bold={slack.titleBold} light={slack.titleLight} order="bold-first" className="mt-4" />
            </Reveal>
            <Reveal delay={0.08} className="lg:mt-auto">
              <ol className="grid gap-3">
                {slack.points.map((point, i) => (
                  <li key={point} className="flex items-start gap-3 text-[12px] leading-relaxed text-ink-2">
                    <span className="grid size-5 shrink-0 place-items-center rounded-[4px] bg-mint-wash text-[10px] font-semibold text-mint-ink">
                      {i + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Frame>
    </Section>
  )
}
