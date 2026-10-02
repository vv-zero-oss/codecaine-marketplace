import { Search } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Display } from "@/components/ui/display"
import { AppIcon } from "@/components/ui/app-icon"
import { Reveal } from "@/components/motion/reveal"
import { SearchDemo } from "@/components/motion/search-demo"

export function SearchRecall() {
  return (
    <section className="bg-ink-50 py-20 sm:py-28">
      <Container className="text-center">
        <Reveal>
          <div className="flex justify-center">
            <AppIcon icon={Search} tone="night" />
          </div>
          <Display className="mx-auto mt-6 max-w-3xl">
            Search. Recall. Filter.
          </Display>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <SearchDemo />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            Type in a café, and see every time you have spent there. Then type in “gym membership”
            and realise there are no such payments. Look yourself in the mirror, and maybe walk
            past the café a little more often.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
