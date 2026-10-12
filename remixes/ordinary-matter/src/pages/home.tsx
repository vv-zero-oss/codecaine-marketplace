import { ScrollWords } from "@/components/motion/scroll-words"
import { FeaturedProducts } from "@/components/sections/home/featured-products"
import { ProcessPinned } from "@/components/sections/home/process-pinned"
import { SelectedStories } from "@/components/sections/home/selected-stories"
import { SplitHero } from "@/components/sections/home/split-hero"
import { VolumeFeature } from "@/components/sections/home/volume-feature"
import { LettersSignup } from "@/components/sections/letters-signup"
import { MakersIndex } from "@/components/sections/makers-index"
import { PULL_QUOTE } from "@/content/site"

/**
 * The home page, as a conversation. Who is in this volume (the split) → the
 * volume itself, opened on the table → more of the people → how each story
 * gets made → why we bother (the line that inks in) → everyone we've
 * visited, by name → the letters that keep you in touch → and the books.
 */
export function HomePage() {
  return (
    <>
      <SplitHero />
      <VolumeFeature />
      <SelectedStories />
      <ProcessPinned />
      <section className="border-t border-line px-gutter py-section">
        <ScrollWords text={PULL_QUOTE} className="type-display mx-auto max-w-[22ch] text-center text-h1 text-ink" />
      </section>
      <MakersIndex id="index" title="Everyone we've visited" />
      <LettersSignup />
      <FeaturedProducts />
    </>
  )
}
