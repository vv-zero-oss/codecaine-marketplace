import { Globe2, KeyRound, Mail, Play } from "lucide-react"

import { PixelCode } from "@/components/pixel/pixel-code"
import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { PixelFlight } from "@/components/motion/pixel-flight"
import { SkyBackdrop } from "@/components/motion/sky-backdrop"
import { TiltCard } from "@/components/motion/tilt-card"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { HERO } from "@/content"
import { openDialog } from "@/lib/ui-events"
import sky from "@/assets/sky-pixel.png"

/**
 * The ticket you tear off to get in: a translucent pass with a cut corner, a
 * dotted tear line, a barcode down its right edge and two ways in. It leans
 * toward the pointer, and its heading and buttons sit above its face.
 */
export function AccessPass({ title = "Start your free run", from = "Legacy", to = "Keep", className }: { title?: string; from?: string; to?: string; className?: string }) {
  return (
    <TiltCard maxTilt={7} perspective={1100} lift={10} className={className}>
      <div className="relative bg-fg/[0.07] backdrop-blur-[3px] shadow-px-lift [--px-drop:rgba(8,6,40,0.5)] [--px-edge:color-mix(in_oklab,var(--color-fg)_60%,transparent)] [clip-path:polygon(0_28px,28px_0,100%_0,100%_100%,0_100%)]">
        <div aria-hidden className="absolute inset-y-0 left-0 w-0 border-l-4 border-dotted border-fg/35" />
        <div className="grid gap-phi-4 p-phi-3 pr-phi-6 sm:p-phi-4 sm:pr-phi-7 md:min-h-[480px]">
          <div className="flex items-center gap-phi-2 text-fg/45 [transform:translateZ(18px)]">
            <PixelSprite name="globe" scale={3} />
            <span className="font-display text-label uppercase tracking-wide">Access pass</span>
          </div>
          <dl className="flex gap-phi-4 text-fg/40 [transform:translateZ(14px)]">
            <div>
              <dt className="font-mono text-base uppercase">Origin</dt>
              <dd className="font-display text-sm uppercase sm:text-base">{from}</dd>
            </div>
            <div aria-hidden className="self-end pb-1 font-display text-xs">{">>"}</div>
            <div>
              <dt className="font-mono text-base uppercase">Destination</dt>
              <dd className="font-display text-sm uppercase sm:text-base">{to}</dd>
            </div>
          </dl>
          <div className="mt-auto grid gap-phi-2 [transform:translateZ(36px)]">
            <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
            <Button variant="glass" size="lg" className="w-full" onClick={() => openDialog("login")}>
              <Mail /> Start with email
            </Button>
            <Button variant="glass" size="lg" className="w-full" onClick={() => openDialog("demo")}>
              <KeyRound /> Use a passkey
            </Button>
          </div>
        </div>
        <PixelCode seed={`${from}-${to}`} className="absolute right-6 top-12 bottom-12 w-12 sm:right-8 sm:w-16" />
      </div>
    </TiltCard>
  )
}

/** Hero: the dusk sky, the headline in two voices, the plane and the pass. */
export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-phi-6 pt-[calc(var(--header-h)+3rem)] sm:pt-[calc(var(--header-h)+4rem)] lg:min-h-svh">
      <SkyBackdrop image={sky} />
      <Container className="relative grid items-center gap-phi-5 lg:min-h-[calc(100svh-var(--header-h)-10rem)] lg:grid-cols-[1.618fr_1fr] lg:gap-phi-4">
        <div>
          <Reveal>
            <p className="mb-phi-4 font-mono text-lg uppercase tracking-widest text-fg/70">{`> ${HERO.kicker}`}</p>
          </Reveal>
          <h1 className="text-5xl font-bold">
            {HERO.lines.map((line, i) => (
              <Reveal key={i} delay={0.08 * i} className="block">
                {line.map((part) => (
                  <span
                    key={part.text}
                    className={
                      part.style === "script"
                        ? "mr-[0.25em] inline-block -skew-x-12 font-medium text-fg/70"
                        : part.style === "light"
                          ? "font-medium text-fg/80"
                          : undefined
                    }
                  >
                    {part.text}
                  </span>
                ))}
              </Reveal>
            ))}
          </h1>
          <PixelFlight className="my-5 max-w-lg" />
          <Reveal delay={0.4}>
            <p className="max-w-measure text-balance text-lg font-semibold leading-tight sm:text-xl">{HERO.sub}</p>
          </Reveal>
          <Reveal delay={0.5} className="mt-phi-4 flex items-center gap-phi-2">
            <span className="text-xl">{HERO.videoLabel}</span>
            <Button variant="glass" size="icon" aria-label="Play the 90 second walkthrough" className="size-14 [--px-edge:var(--color-fg)]" onClick={() => openDialog("demo")}>
              <Play className="size-5 fill-accent-hi text-accent-hi" />
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.25} direction="left" distance={36}>
          <AccessPass />
        </Reveal>
      </Container>
      <span className="sr-only"><Globe2 /></span>
    </section>
  )
}
