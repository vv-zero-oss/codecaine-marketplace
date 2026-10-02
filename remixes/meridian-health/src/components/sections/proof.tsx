import { Award, Heart } from "lucide-react"
import { useState } from "react"

import { Aurora } from "@/components/motion/aurora"
import { CountUp } from "@/components/motion/count-up"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { PHOTOS, photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

const STORIES = [
  { id: PHOTOS.runner, tag: "Zone 2 · 42 min", name: "Maya" },
  { id: PHOTOS.cyclist, tag: "Strain 71%", name: "Jonas" },
  { id: PHOTOS.breakfast, tag: "Protein 38 g", name: "Priya" },
  { id: PHOTOS.surfer, tag: "Recovery 84%", name: "Theo" },
  { id: PHOTOS.hiker, tag: "Steps 18,402", name: "Lena" },
  { id: PHOTOS.yoga, tag: "HRV +9 ms", name: "Sana" },
  { id: PHOTOS.jogger, tag: "5K · 24:18", name: "Dre" },
] as const

/** One member's day: a photo and the number they were proud of. Tap the heart to cheer them on. */
function StoryCard({ id, tag, name }: { id: number; tag: string; name: string }) {
  const [liked, setLiked] = useState(false)
  return (
    <figure className="group/card relative h-[300px] w-[200px] shrink-0 overflow-hidden rounded-3xl bg-tint sm:h-[340px] sm:w-[230px]">
      <img src={photo(id, 500)} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105" />
      <figcaption className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between rounded-2xl bg-paper/85 py-2 pr-2 pl-3.5 text-sm shadow-chip backdrop-blur">
        <span><b className="font-semibold">{name}</b><span className="block text-xs text-ink-2 tabular-nums">{tag}</span></span>
        <button onClick={() => setLiked(!liked)} aria-pressed={liked} aria-label={`Cheer ${name} on`} className="grid size-11 place-items-center rounded-full transition-transform active:scale-85">
          <Heart className={cn("size-5 transition-[color,fill,transform] duration-200", liked ? "scale-110 fill-rose text-rose" : "text-ink-3")} />
        </button>
      </figcaption>
    </figure>
  )
}

/** Social proof: how many people, the awards, and a strip of real days. */
export function Proof() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-24">
      <Aurora tone="lilac" intensity={0.8} />
      <Container className="text-center">
        <Reveal className="flex items-center justify-center gap-6 text-ink-3">
          {["Editors’ Choice", "App of the Day"].map((label) => (
            <span key={label} className="flex items-center gap-1.5 text-xs leading-tight font-medium">
              <Award className="size-6 text-ink-3/70" strokeWidth={1.4} />
              {label}
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display mx-auto mt-5 max-w-[16ch] text-[clamp(2rem,5vw,3.25rem)]">
            Join over <CountUp value={2.5} decimals={1} suffix=" million" /> members on their health journey
          </h2>
        </Reveal>
      </Container>
      <Reveal delay={0.12} className="mt-10 sm:mt-12">
        <Marquee duration={55} className="[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          {STORIES.map((s) => <StoryCard key={s.id} {...s} />)}
        </Marquee>
      </Reveal>
    </section>
  )
}
