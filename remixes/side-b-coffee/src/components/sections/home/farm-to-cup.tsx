import { PinnedStory, type StoryStep } from "@/components/motion/pinned-story"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { PHOTOS } from "@/lib/photos"

const STEPS: StoryStep[] = [
  {
    track: "01",
    title: "Picked when it's red, not when it's convenient.",
    body: "Rosa Elena's pickers go over the same trees four times a season, taking only the ripe cherries. It costs more. It's the whole difference.",
    stat: "4×",
    statLabel: "Passes per tree",
    photo: PHOTOS.cherriesBasket,
    alt: "Hands holding ripe red coffee cherries over a woven basket",
  },
  {
    track: "02",
    title: "Dried slowly, turned by hand.",
    body: "On raised beds under shade cloth, raked every hour until the beans rattle in the parchment. Rush this and the cup tastes like cardboard.",
    stat: "21 days",
    statLabel: "On the drying beds",
    photo: PHOTOS.dryingBeds,
    alt: "A farmer sorting green coffee under drying racks",
  },
  {
    track: "03",
    title: "Roasted on Tuesday, in five-kilo batches.",
    body: "Small enough that we can taste every batch before it's bagged, and roast to the orders that came in over the weekend.",
    stat: "11:40",
    statLabel: "Minutes in the drum",
    photo: PHOTOS.drumBeans,
    alt: "Roasted coffee turning in the cooling tray of the roaster",
  },
  {
    track: "04",
    title: "Rested, then bagged with the date on it.",
    body: "Fresh coffee needs a few days to let its gas out. We hold every bag until it's ready, and print the roast date where you can see it.",
    stat: "5 days",
    statLabel: "Resting before it ships",
    photo: PHOTOS.kraftBags,
    alt: "Bags of coffee lined up on rustic wooden shelves",
  },
  {
    track: "05",
    title: "Poured slow, with the needle down.",
    body: "Bloom for forty seconds, pour in circles, flip the record. At the bar, or at your kitchen counter — the last step is always yours.",
    stat: "3:30",
    statLabel: "From bloom to cup",
    photo: PHOTOS.pourKettle,
    alt: "Hot water poured from a gooseneck kettle over a pour-over",
  },
]

/**
 * How a cherry becomes your cup, as a five-track side: the picture pins
 * and changes while the steps scroll past it.
 */
export function FarmToCup() {
  return (
    <section className="border-b border-line py-(--spacing-section)">
      <Container>
        <SectionHeading
          kicker="From farm to cup"
          before="Five tracks from"
          highlight="cherry to cup."
          tone="rust"
          doodle="bean"
          size="h1"
          className="mb-12 lg:mb-16"
        />
        <PinnedStory steps={STEPS} />
      </Container>
    </section>
  )
}
