import { PixelFlight } from "@/components/motion/pixel-flight"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"
import { buttonVariants } from "@/components/ui/button"
import { openDialog } from "@/lib/ui-events"
import peaks from "@/assets/peaks-pixel.png"

export function CallToAction({ title = "Press start." }: { title?: string }) {
  return (
    <section id="cta" className="relative isolate overflow-hidden border-t-4 border-line bg-bg py-28 sm:py-36">
      <div aria-hidden data-canvas-ignore className="pixelated absolute inset-0 -z-10 bg-cover bg-bottom opacity-40" style={{ backgroundImage: `url(${peaks})` }} />
      <div aria-hidden data-canvas-ignore className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-bg),color-mix(in_oklab,var(--color-sky-2)_60%,transparent)_70%,var(--color-sky-4))]" />
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,7vw,5rem)] uppercase leading-none">
            {title}
            <span className="animate-blink">_</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-2xl text-fg/80">Protect your first device in the time it takes to read this page. No card, no call.</p>
        </Reveal>
        <PixelFlight className="mx-auto my-8 max-w-md" duration={6} />
        <Reveal delay={0.1} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="primary" size="lg" onClick={() => openDialog("login")}>Start free</Button>
          <Button variant="glass" size="lg" onClick={() => openDialog("demo")}>Book a demo</Button>
          <Link href="/generator" className={buttonVariants({ variant: "ghost", size: "lg" })}>Roll a template</Link>
        </Reveal>
      </Container>
    </section>
  )
}
