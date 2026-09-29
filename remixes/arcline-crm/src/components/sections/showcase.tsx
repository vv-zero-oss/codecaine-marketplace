import { useState } from "react"
import { Play, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { BorderBeam } from "@/components/ui/border-beam"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ArclineMark } from "@/components/ui/wordmark"
import { SHOWCASE } from "@/content"
import { curve } from "@/lib/motion"
import { photo, PHOTOS } from "@/photos"

/**
 * The launch card: a film poster on the left, the pitch and two ways in on
 * the right, all inside a beam — the one thing on the page that is new.
 * Pressing play opens the film over the page.
 */
export function Showcase() {
  const [playing, setPlaying] = useState(false)
  useCanvasAction("Film playing", (next) => setPlaying(next ?? !playing), { on: playing, group: "Showcase" })

  return (
    <section
      id="agents"
      className="relative overflow-hidden py-[var(--spacing-section)]"
      style={{
        background:
          "radial-gradient(60% 50% at 20% 0%, color-mix(in oklab, var(--color-coral) 9%, transparent), transparent 70%), radial-gradient(50% 60% at 90% 100%, color-mix(in oklab, var(--color-amber) 6%, transparent), transparent 70%)",
      }}
    >
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <SectionHeading lines={SHOWCASE.title} size="lg" className="text-[clamp(38px,3.6vw,64px)] leading-[1.02]" />
        </Reveal>

        <Reveal delay={0.1} className="mt-10 w-full max-w-[690px] md:mt-12">
          <BorderBeam size="md" colorVariant="sunset" strength={0.6} duration={8} className="rounded-[var(--radius-card)]">
            <div className="grid gap-5 rounded-[var(--radius-card)] border border-line-strong bg-raised p-3 text-left shadow-(--shadow-card) sm:grid-cols-[1.1fr_1fr] sm:gap-6">
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group/film relative aspect-[4/3] overflow-hidden rounded-[14px] text-left"
                aria-label={`Play: ${SHOWCASE.film.kicker} ${SHOWCASE.film.name}`}
              >
                <img
                  src={photo("film", 900)}
                  alt={PHOTOS.film.alt}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-quint group-hover/film:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
                <ArclineMark className="absolute top-3 left-3 h-4 w-auto text-ink/80" />
                <span className="absolute bottom-3 left-3 text-[22px] leading-[1.02] font-normal tracking-[-0.03em] text-fg">
                  {SHOWCASE.film.kicker}
                  <br />
                  {SHOWCASE.film.name}
                </span>
                <span className="absolute top-1/2 left-1/2 flex size-14 -translate-1/2 items-center justify-center rounded-full bg-void text-fg transition-transform duration-300 ease-out-quint group-hover/film:scale-110 group-active/film:scale-95">
                  <Play className="size-5 translate-x-px fill-current" />
                </span>
              </button>

              <div className="flex flex-col justify-center gap-3 px-1 pb-2 sm:px-0 sm:pr-2 sm:pb-0">
                <p className="text-[19px] leading-[1.2] text-fg md:text-[21px]">{SHOWCASE.pitch}</p>
                <ButtonLink href="#pricing" size="sm" className="mt-3 h-10 justify-center gap-1 text-[14px]">
                  <span className="text-ink/60">{SHOWCASE.primary.lead}</span> {SHOWCASE.primary.link}
                </ButtonLink>
                <Button
                  size="sm"
                  variant="soft"
                  onClick={() => setPlaying(true)}
                  className="h-10 justify-center gap-1 text-[14px]"
                >
                  <span className="text-muted">{SHOWCASE.secondary.lead}</span> {SHOWCASE.secondary.link}
                </Button>
              </div>
            </div>
          </BorderBeam>
        </Reveal>

        <Reveal
          delay={0.16}
          className="mt-6 flex w-full max-w-[690px] flex-col items-center gap-3 rounded-[14px] border border-line bg-panel/80 px-5 py-4 sm:flex-row sm:justify-between"
        >
          <p className="text-[15px] text-muted">{SHOWCASE.bar}</p>
          <ButtonLink href="#cta" size="sm" variant="soft" className="h-9 px-4 text-[13px]">
            {SHOWCASE.barAction}
          </ButtonLink>
        </Reveal>
      </Container>

      <AnimatePresence>
        {playing && (
          <motion.div
            role="dialog"
            aria-label={SHOWCASE.film.name}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={curve("out", 0.3)}
            onClick={() => setPlaying(false)}
          >
            <motion.div
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[var(--radius-card)] border border-line-strong bg-raised"
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 6 }}
              transition={curve("out", 0.4)}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={photo("film", 1800)} alt="" className="absolute inset-0 size-full object-cover opacity-60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <p className="type-eyebrow text-fg-soft">Premieres with the launch</p>
                <p className="type-heading text-[clamp(28px,4vw,56px)] text-fg">{SHOWCASE.film.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setPlaying(false)}
                aria-label="Close film"
                className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-void/70 text-fg transition-colors hover:bg-void"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
