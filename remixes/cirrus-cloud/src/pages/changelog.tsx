import { PageHero } from "@/components/blocks/page-hero"
import { ChangelogList } from "@/components/sections/changelog"
import { Closing } from "@/components/sections/closing"
import { changelogPage } from "@/content"

export function ChangelogPage() {
  const { hero, cta } = changelogPage
  return (
    <>
      <PageHero title={hero.title} strap={hero.strap} blurb={hero.blurb} />
      <ChangelogList />
      <Closing marquee={cta.marquee} cta={cta.button} />
    </>
  )
}
