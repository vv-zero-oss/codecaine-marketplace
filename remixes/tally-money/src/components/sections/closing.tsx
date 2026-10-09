import { Smartphone } from "lucide-react"

import { Coin, Cup, Mango, Notebook, Pizza, PlayTile, Popcorn, Sneaker, Ticket } from "@/components/illustrations/objects"
import { Marquee } from "@/components/motion/marquee"
import { Magnetic } from "@/components/motion/magnetic"
import { Reveal } from "@/components/motion/reveal"
import { QrCode } from "@/components/qr-code"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"

const ART = [Popcorn, Pizza, PlayTile, Cup, Mango, Ticket, Notebook, Sneaker, Coin]

/** The last word: the hero's objects drift by once more, and the line the page has been building to. */
export function Closing() {
  return (
    <section className="overflow-hidden bg-ink-100 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Marquee speed={70} pauseOnHover={false} direction="right" className="opacity-90">
        {ART.map((Art, i) => (
          <Art key={i} className="mx-5 h-24 w-auto sm:h-32" />
        ))}
      </Marquee>
      <Container className="mt-14 flex flex-col items-center text-center sm:mt-20">
        <Reveal>
          <p className="text-sm font-semibold tracking-wider text-ink-600 uppercase">You know,</p>
          <Display size="xl" className="mt-2">It’s just money.</Display>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-600 sm:text-xl">
            Know where it goes, and the rest gets easier. Free on iOS and Android.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
          <QrCode className="size-28" />
          <div className="flex flex-col gap-3 sm:items-start">
            <Magnetic><ButtonLink href="#download" variant="primary" size="lg"><Smartphone /> Get Tally for iOS</ButtonLink></Magnetic>
            <ButtonLink href="#download" variant="outline" size="lg"><Smartphone /> Get Tally for Android</ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
