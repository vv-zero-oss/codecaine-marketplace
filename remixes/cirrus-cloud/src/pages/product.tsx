import { PageHero } from "@/components/blocks/page-hero"
import { Closing } from "@/components/sections/closing"
import { Features } from "@/components/sections/features"
import { Spec } from "@/components/sections/spec"
import { SpecFile } from "@/components/sections/spec-file"
import { Workloads } from "@/components/sections/workloads"
import { productPage } from "@/content"

/** The product: the spec as a file, what it describes, what it can do. */
export function ProductPage() {
  const { hero, cta } = productPage
  return (
    <>
      <PageHero title={hero.title} strap={hero.strap} blurb={hero.blurb} />
      <SpecFile />
      <Spec />
      <Features />
      <Workloads />
      <Closing marquee={cta.marquee} cta={cta.button} />
    </>
  )
}
