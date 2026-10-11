import { ArrowRight, Smartphone } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { ContrailMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/** The closing ask every inner page ends on: night, the mark, one line, two buttons. */
export function CtaBand({
  title = "Your next flight, minus the guesswork.",
  body = "Free to download. Your first tracked flight comes with every Pro feature turned on.",
  secondary = { label: "See pricing", href: "/pricing" },
}: {
  title?: string
  body?: string
  secondary?: { label: string; href: string }
}) {
  return (
    <section data-theme="day" className="bg-page pb-24">
      <Container>
        <Reveal>
          <div data-theme="night" className="relative overflow-hidden rounded-(--radius-panel) bg-night px-7 py-16 text-center shadow-(--shadow-lift) md:py-24">
            <div aria-hidden className="night-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,black,transparent)]" />
            <div aria-hidden className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_50%_70%_at_50%_0%,rgb(91_43_217/0.5),transparent)]" />
            <div className="relative">
              <ContrailMark tone="light" className="mx-auto size-14" />
              <h2 className="type-display mx-auto mt-8 max-w-[18ch] text-h1 text-balance text-night-fg">{title}</h2>
              <p className="mx-auto mt-5 max-w-[44ch] text-lead text-night-2fg">{body}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/pricing" size="lg"><Smartphone /> Get Contrail</ButtonLink>
                <ButtonLink href={secondary.href} variant="night" size="lg">{secondary.label} <ArrowRight /></ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
