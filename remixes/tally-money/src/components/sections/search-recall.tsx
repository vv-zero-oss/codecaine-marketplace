import { Search } from "lucide-react"

import { Container } from "@/components/ui/container"
import { AppIcon } from "@/components/ui/app-icon"
import { Reveal } from "@/components/motion/reveal"
import { SearchDemo } from "@/components/motion/search-demo"

export function SearchRecall() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="text-center">
        <Reveal>
          <div className="flex justify-center">
            <AppIcon icon={Search} />
          </div>
          <h2 className="mx-auto mt-5 max-w-xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance">
            Search. Recall. Filter.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <SearchDemo />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink-600 sm:text-base">
            Type in a café, and see every time you have spent there. Then type in “gym membership”
            and realise there are no such payments. Look yourself in the mirror, and maybe walk
            past the café a little more often.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
