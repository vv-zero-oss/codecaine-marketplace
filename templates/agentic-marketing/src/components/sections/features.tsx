import { ArrowUp, Check, Folder, Pencil, Plus, TrendingUp } from "lucide-react"

import { BrandChip, BrandLogo } from "@/components/blocks/brand-logo"
import { ChatMessage } from "@/components/blocks/chat-bubble"
import { FeatureCard } from "@/components/blocks/feature-card"
import { Frame, Section } from "@/components/blocks/frame"
import { Photo } from "@/components/blocks/photo"
import { Reveal } from "@/components/blocks/reveal"
import { TypedText } from "@/components/blocks/typed-text"
import { Button } from "@/components/ui/button"
import { features } from "@/content"

/** What it does, as six tiles: two rows of three on desktop, one column on a phone. */
export function Features() {
  const { agent, ask, research, truth, slack, creative } = features
  return (
    <Section id="features" className="pt-4 md:pt-6">
      <Frame>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <FeatureCard title={agent.title} body={agent.body} captionAt="top">
              <div className="relative w-full max-w-[19rem] rounded-lg bg-surface p-4 shadow-float">
                <p className="text-[11px] leading-relaxed text-ink-2">{agent.card.text}</p>
                <dl className="mt-3 flex gap-4">
                  {agent.card.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[9px] text-ink-faint">{m.label}</dt>
                      <dd className="text-[12px] font-semibold text-mint-ink tabular-nums">{m.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-3 flex items-center justify-end gap-1.5">
                  <Button variant="pill-outline" size="xs" className="h-6 rounded-full px-2 text-[10px]">
                    <Pencil className="size-2.5" /> {agent.card.edit}
                  </Button>
                  <Button variant="mint" size="xs" className="h-6 px-2.5 text-[10px]">
                    <Check className="size-2.5" /> {agent.card.approve}
                  </Button>
                </div>
                <span className="absolute -bottom-3 left-4 rounded-full bg-forest px-2.5 py-1 text-[10px] font-medium text-white shadow-card">
                  {agent.card.badge}
                </span>
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={0.06}>
            <FeatureCard title={ask.title} body={ask.body}>
              <div className="w-full max-w-[20rem] rounded-xl bg-surface p-3 shadow-float">
                <p className="min-h-9 text-[12px] leading-snug text-ink">
                  <TypedText text={ask.question} />
                </p>
                <div className="mt-2 flex items-center justify-between text-ink-faint">
                  <Plus className="size-3.5" />
                  <span className="grid size-6 place-items-center rounded-full bg-ink text-white">
                    <ArrowUp className="size-3.5" />
                  </span>
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-2 lg:col-span-1">
            <FeatureCard title={research.title} body={research.body} tone="forest" captionAt="top">
              <ul className="grid w-full max-w-[21rem] gap-2">
                {research.items.map((item) => (
                  <li key={item.source} className="flex gap-3 rounded-md bg-forest-2 p-2 ring-1 ring-white/5 first:bg-forest-3">
                    <span className="block size-14 shrink-0 overflow-hidden rounded-[4px]">
                      <Photo photo={item.photo} widths={[120, 240]} sizes="56px" />
                    </span>
                    <div className="min-w-0 text-[10.5px] leading-snug">
                      <p className="line-clamp-3 text-white/90">{item.text}</p>
                      <p className="mt-1 flex justify-between text-white/45">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="size-2.5" /> {item.source}
                        </span>
                        {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </FeatureCard>
          </Reveal>

          <Reveal>
            <FeatureCard title={truth.title} body={truth.body}>
              <div className="w-full max-w-[20rem] rounded-xl bg-surface p-3 shadow-float">
                <p className="text-[12px] leading-[1.9] text-ink-2">
                  {truth.chips.map((c, i) => (
                    <span key={c.name}>
                      <BrandChip name={c.logo} label={c.name} />
                      {i < truth.chips.length - 2 ? ", " : i === truth.chips.length - 2 ? " and " : " "}
                    </span>
                  ))}
                  {truth.sentence}
                </p>
                <div className="mt-2 flex items-center justify-between text-ink-faint">
                  <Plus className="size-3.5" />
                  <span className="grid size-6 place-items-center rounded-full bg-ink text-white">
                    <ArrowUp className="size-3.5" />
                  </span>
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={0.06}>
            <FeatureCard title={slack.title} body={slack.body}>
              <div className="grid w-full max-w-[20rem] gap-3 rounded-lg bg-surface p-3.5 shadow-float">
                <ChatMessage who="You" time="9:14 AM">
                  {slack.you}{" "}
                  <span className="rounded-[3px] bg-sky/10 px-0.5 text-sky">@Adwright</span>
                </ChatMessage>
                <ChatMessage who="Adwright" time="9:14 AM" bot>
                  <p>{slack.reply}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-sky shadow-button">
                    <TrendingUp className="size-3" /> {slack.action}
                  </span>
                </ChatMessage>
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-2 lg:col-span-1">
            <FeatureCard title={creative.title} body={creative.body} tone="paper" captionAt="top">
              <div className="flex w-full max-w-[22rem] gap-2 rounded-md bg-surface p-2 shadow-card">
                <ul className="hidden w-20 shrink-0 content-start gap-1 py-1 text-[9px] text-ink-soft min-[380px]:grid">
                  {creative.folders.map((f, i) => (
                    <li key={f} className={`flex items-center gap-1 rounded px-1 py-0.5 ${i === 0 ? "bg-stone text-ink" : ""}`}>
                      <Folder className="size-2.5" /> {f}
                    </li>
                  ))}
                </ul>
                <ul className="grid flex-1 grid-cols-2 gap-1.5">
                  {creative.photos.map((p, i) => (
                    <li key={i} className="overflow-hidden rounded-[4px]">
                      <div className="aspect-[4/5]">
                        <Photo photo={p} widths={[200, 400]} sizes="120px" />
                      </div>
                      <p className="flex items-center justify-between px-0.5 pt-1 text-[8.5px] text-ink-faint">
                        <span>Score {92 - i * 7}</span>
                        <BrandLogo name={["meta", "tiktok", "pinterest", "snapchat"][i]} className="size-2.5" />
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </FeatureCard>
          </Reveal>
        </div>
      </Frame>
    </Section>
  )
}
