import { ChangelogStrip, FinalCta, Newsletter } from "@/components/sections/closing"
import { Developers } from "@/components/sections/developers"
import { Hero } from "@/components/sections/hero"
import { Integrations } from "@/components/sections/integrations"
import { Memory } from "@/components/sections/memory"
import { Platform } from "@/components/sections/platform"
import { Quote } from "@/components/sections/quote"
import { Record } from "@/components/sections/record"
import { Scale } from "@/components/sections/scale"
import { Stories } from "@/components/sections/stories"
import { Section } from "@/components/ui/section"
import { LogoWall } from "@/components/ui/logo-wall"
import { LOGOS } from "@/content/home"

/** Home, as a list of sections in reading order. */
export function HomePage() {
  return (
    <>
      <Hero />
      <Section id="logos">
        <LogoWall brands={LOGOS} />
      </Section>
      <Platform />
      <Record />
      <Memory />
      <Integrations />
      <Developers />
      <Quote />
      <Scale />
      <Stories />
      <ChangelogStrip />
      <Newsletter />
      <FinalCta />
    </>
  )
}
