import { useState } from "react"
import { Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Isocon, type IsoconName } from "@/components/icons/isocon"
import { Reveal } from "@/components/motion/reveal"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { FINAL_CTA, NEWSLETTER } from "@/content/home"
import { CHANGELOG, type ChangelogTag } from "@/content/pages"
import { EASE } from "@/lib/motion"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

export const TAG_TONE: Record<ChangelogTag, string> = {
  feature: "text-accent",
  improvement: "text-purple",
  design: "text-cyan",
}

/** A ruler along the bottom edge — a tick every 8px, a taller one every 64. */
export function Ruler({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-3 w-full", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--line-bold) 0 1px, transparent 1px 64px), repeating-linear-gradient(90deg, var(--line-strong) 0 1px, transparent 1px 8px)",
        backgroundSize: "100% 12px, 100% 6px",
        backgroundPosition: "0 0, 0 100%",
        backgroundRepeat: "repeat-x",
      }}
    />
  )
}

/** One changelog entry as a card: date, tag, title. The title firms up on hover. */
export function ChangelogCard({ entry }: { entry: (typeof CHANGELOG.entries)[number] }) {
  return (
    <Link
      href="/changelog"
      className="group/iso group/card flex min-h-[260px] flex-col gap-4 border-line-strong p-6 transition-colors duration-300 hover:bg-canvas hover:duration-[50ms] md:border-l md:first:border-l-0"
    >
      <p className="flex items-center gap-2 text-caption text-ink-3">
        {entry.date} <span className="size-[3px] rounded-full bg-ink-faint" />
        <span className={cn("capitalize", TAG_TONE[entry.tag])}>{entry.tag}</span>
      </p>
      <div className="w-12 text-ink-3 transition-colors duration-300 group-hover/card:text-ink-soft">
        <Isocon name={entry.icon as IsoconName} draw />
      </div>
      <p className="mt-auto text-lead font-medium text-ink-soft transition-colors duration-200 group-hover/card:text-ink">{entry.title}</p>
      <p className="line-clamp-2 text-sm text-ink-2">{entry.body}</p>
    </Link>
  )
}

/** Is it alive: the four latest changes, on a ruler. */
export function ChangelogStrip() {
  return (
    <Section id="changelog">
      <Container className="pt-[var(--spacing-section)]">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>{CHANGELOG.eyebrow}</Eyebrow>
            <Heading lead={CHANGELOG.lead} rest={CHANGELOG.rest} />
          </div>
          <ButtonLink href="/changelog" size="sm" arrow>
            {CHANGELOG.cta}
          </ButtonLink>
        </Reveal>
      </Container>
      <div className="mt-12 grid border-t border-line-strong md:grid-cols-2 lg:grid-cols-4">
        {CHANGELOG.entries.slice(0, 4).map((e) => (
          <ChangelogCard key={e.title} entry={e} />
        ))}
      </div>
      <Ruler className="border-t border-line-strong" />
    </Section>
  )
}

/**
 * Newsletter: a two-tone line and an email field. Submitting swaps the
 * button for a check and a thank-you, and the field locks.
 */
export function Newsletter() {
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState("")
  useCanvasAction("Subscribed", (next) => setDone(next ?? !done), { on: done, group: "Newsletter" })

  return (
    <Section id="newsletter">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <Heading as="p" size="h3" lead={NEWSLETTER.lead} rest={NEWSLETTER.rest} className="max-w-[20ch]" />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (email.includes("@")) setDone(true)
          }}
          className="flex w-full max-w-[420px] gap-2"
        >
          <input
            type="email"
            required
            disabled={done}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={NEWSLETTER.placeholder}
            aria-label="Email address"
            className="h-10 min-w-0 flex-1 rounded-button border border-line-strong bg-page px-3 text-sm text-ink transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-ink-3 focus:border-accent focus:shadow-ring-accent disabled:opacity-60"
          />
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.span
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: EASE.out }}
                className="flex h-10 items-center gap-1.5 rounded-button bg-green-tint px-3 text-sm font-medium text-green"
              >
                <Check className="size-4" /> {NEWSLETTER.done}
              </motion.span>
            ) : (
              <motion.span key="form" exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }}>
                <Button type="submit" variant="primary" className="h-10">
                  {NEWSLETTER.action}
                </Button>
              </motion.span>
            )}
          </AnimatePresence>
        </form>
      </Container>
    </Section>
  )
}

/** The ask, on the fine line texture. */
export function FinalCta({ title = FINAL_CTA.title }: { title?: readonly string[] }) {
  return (
    <Section id="cta" tone="void" className="overflow-hidden">
      <div aria-hidden className="texture-lines absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_80%_at_50%_100%,#000,transparent)]" />
      <Container className="relative flex min-h-[417px] flex-col items-center justify-center py-20 text-center">
        <Reveal>
          <h2 className="font-display text-[40px] leading-[1.02] font-medium tracking-[-0.015em] text-ink md:text-h1">
            {title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex gap-2.5">
          <ButtonLink href="/pricing">{FINAL_CTA.secondary}</ButtonLink>
          <ButtonLink href="/pricing" variant="primary">
            {FINAL_CTA.primary}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  )
}

