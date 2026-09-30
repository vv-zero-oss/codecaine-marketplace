import { BadgeCheck, Eye, Fingerprint, Lock, ShieldCheck, Snowflake, type LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SECURITY } from "@/content"

const ICONS: Record<string, LucideIcon> = { shield: ShieldCheck, lock: Lock, fingerprint: Fingerprint, eye: Eye, badge: BadgeCheck, snow: Snowflake }

/** One guarantee: its icon on an oxblood square, the promise, the detail. */
export function Guarantee({ icon = "shield", title = "", body = "" }: { icon?: string; title?: string; body?: string }) {
  const Icon = ICONS[icon] ?? ShieldCheck
  return (
    <div className="flex flex-col gap-4 bg-paper p-6 md:p-8">
      <span className="grid size-11 place-items-center rounded-none bg-night text-pink">
        <Icon className="size-5" strokeWidth={1.7} />
      </span>
      <h3 className="text-[18px] font-medium tracking-[-0.01em] text-ink">{title}</h3>
      <p className="text-[14.5px] leading-[1.55] text-ink-muted">{body}</p>
    </div>
  )
}

/** Security: six guarantees in a hairline grid. */
export function Security() {
  return (
    <section id="security" className="bg-paper-deep/60 py-section">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={SECURITY.eyebrow} title={SECURITY.title} />
          <p className="max-w-[380px] text-[16px] leading-[1.55] text-ink-muted">{SECURITY.body}</p>
        </Reveal>
        <Reveal y={32} className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-panel)] bg-line shadow-(--shadow-hairline) sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY.items.map((item) => (
            <Guarantee key={item.title} {...item} />
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
