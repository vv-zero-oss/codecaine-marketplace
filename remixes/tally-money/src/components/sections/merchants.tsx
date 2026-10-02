import { Sheet, Tags } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"
import { AppIcon } from "@/components/ui/app-icon"
import { Reveal } from "@/components/motion/reveal"
import { MerchantMatch } from "@/components/motion/merchant-match"

export function Merchants() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="text-center">
        <Reveal>
          <div className="flex justify-center">
            <AppIcon icon={Sheet} tone="amber" />
          </div>
          <Display className="mx-auto mt-6 max-w-3xl">
            More than a row in a spreadsheet.
          </Display>
          <p className="mt-4 text-lg text-ink-600">Not just the numbers, but the story as well.</p>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-5xl text-left">
          <MerchantMatch />
          <div className="mt-6 grid gap-6 text-sm text-ink-600 sm:grid-cols-2 sm:text-base">
            <p className="sm:text-right">Merchants are found automatically, from where and when you made the purchase.</p>
            <p className="flex gap-2">
              <Tags className="mt-1 size-4 shrink-0 text-ink-900" />
              Our categoriser sorts each payment into the right category and learns from every correction you make.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
