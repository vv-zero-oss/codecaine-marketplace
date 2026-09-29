import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { STORIES } from "@/content/home"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { photo, PHOTOS } from "@/photos"

/** A photograph in a white-framed mat with a hairline, like a print on a wall. */
export function FramedPhoto({ image, className }: { image: keyof typeof PHOTOS; className?: string }) {
  return (
    <div className={cn("rounded-card border border-line-strong bg-surface p-2", className)}>
      <img
        src={photo(image, 1400)}
        alt={PHOTOS[image].alt}
        loading="lazy"
        className="aspect-[695/430] w-full rounded-[8px] object-cover"
      />
    </div>
  )
}

/**
 * Four customers as tabs; the chosen one's story opens below with its
 * photograph. The marker slides between tabs.
 */
export function Stories() {
  const [tab, setTab] = useState(0)
  useCanvasAction("Next story", () => setTab((t) => (t + 1) % STORIES.items.length), { group: "Customers" })
  const story = STORIES.items[tab]

  return (
    <Section id="customers">
      <Container className="py-[var(--spacing-section)]">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Heading lead={STORIES.lead} rest={STORIES.rest} className="max-w-[16ch]" />
          <ButtonLink href="/customers" size="sm" arrow>
            {STORIES.cta}
          </ButtonLink>
        </Reveal>

        <Tabs value={String(tab)} onValueChange={(v) => setTab(Number(v))} className="mt-12 gap-0">
        <TabsList variant="line" className="!grid !h-auto w-full grid-cols-2 gap-0 rounded-none border border-line-strong p-0 md:grid-cols-4">
          {STORIES.items.map((s, i) => (
            <TabsTrigger
              key={s.company}
              value={String(i)}
              className={cn(
                "relative flex !h-16 items-center justify-center rounded-none border-0 border-line-strong text-base font-semibold tracking-[-0.02em] transition-colors duration-200 after:hidden data-[state=active]:shadow-none md:!h-20",
                i % 2 === 0 && "border-r",
                i < 2 && "border-b md:border-b-0",
                "border-solid md:border-r md:last:border-r-0",
                tab === i ? "bg-surface text-ink" : "text-ink-3 hover:bg-canvas hover:text-ink-soft",
              )}
            >
              {s.company}
              {tab === i && (
                <motion.span layoutId="story-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" transition={{ duration: 0.3, ease: EASE.outCubic }} />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: EASE.emphasized }}
            className="grid grid-cols-1 [&>*]:min-w-0 gap-10 border-x border-b border-line-strong p-6 md:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center"
          >
            <div>
              <p className="text-caption tracking-[0.06em] text-ink-3 uppercase">{story.overline}</p>
              <Heading as="h3" size="h2" lead={story.lead} rest={story.rest} className="mt-4 text-[26px] leading-8 md:text-[32px] md:leading-9" />
              <ButtonLink href="/customers" variant="ghost" size="sm" arrow className="mt-6 -ml-2.5">
                Read the story
              </ButtonLink>
            </div>
            <FramedPhoto image={story.photo} />
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  )
}
