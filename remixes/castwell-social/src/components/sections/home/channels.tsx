import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { BrandLogo, CHANNEL_NAMES, type Channel } from "@/components/ui/brand-logo"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Section } from "@/components/sections/shared/section"
import { Link } from "@/lib/router"

const CHANNELS: Channel[] = ["instagram", "tiktok", "youtube", "linkedin", "x", "threads", "facebook", "pinterest"]

/** One cell of the channel grid: the logo, its name, and a quiet link. */
export function ChannelCell({ channel = "instagram" }: { channel?: Channel }) {
  return (
    <Link
      href="/scheduler"
      className="group flex flex-col items-center justify-center gap-3 border-r border-b border-line px-4 py-9 transition-colors duration-200 hover:bg-sage md:py-12"
    >
      <span className="flex items-center gap-2.5">
        <BrandLogo channel={channel} className="size-6 md:size-7" />
        <span className="text-[15px] font-medium text-ink md:text-base">{CHANNEL_NAMES[channel]}</span>
      </span>
      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-ink">
        Explore
        <ArrowRight className="size-3 transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

export function Channels() {
  return (
    <Section id="channels" className="pb-0 md:pb-0">
      <Container>
        <SectionHeading
          eyebrow="Channels"
          title="Channel-agnostic by design"
          description="Castwell publishes natively to every network your audience scrolls. Post once, format everywhere, never get locked to one platform."
        />
      </Container>
      <Container className="mt-12 px-0 md:mt-16 md:px-(--spacing-gutter)">
        <Reveal className="grid grid-cols-2 border-t border-l border-line md:grid-cols-3">
          {CHANNELS.map((c) => (
            <ChannelCell key={c} channel={c} />
          ))}
          <div className="col-span-2 flex flex-col items-center justify-center gap-3 border-r border-b border-line px-6 py-9 text-center md:col-span-1">
            <p className="text-[13px] text-ink-soft">Don't see yours? Castwell posts anywhere with an API.</p>
            <Link href="/pricing" className="inline-flex items-center gap-1 text-[12px] font-medium text-ink">
              Ask us <ArrowRight className="size-3" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
