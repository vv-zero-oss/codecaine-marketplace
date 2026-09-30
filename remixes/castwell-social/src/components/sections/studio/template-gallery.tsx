import { useState } from "react"
import { Play } from "lucide-react"

import { useCanvasAction } from "@canvas/react"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Section } from "@/components/sections/shared/section"
import { photo, type PhotoKey } from "@/photos"

const GROUPS: Record<string, { name: string; img: PhotoKey; len: string; tag: string }[]> = {
  "Food & drink": [
    { name: "One-pan recipe", img: "vlogKitchen", len: "0:30", tag: "Reel" },
    { name: "Bowl build", img: "poke", len: "0:20", tag: "Short" },
    { name: "Barista moment", img: "latte", len: "0:15", tag: "Story" },
    { name: "Morning ritual", img: "mug", len: "0:25", tag: "Reel" },
  ],
  Beauty: [
    { name: "Serum explainer", img: "serum", len: "0:30", tag: "Ad" },
    { name: "Shelfie tour", img: "skincare", len: "0:20", tag: "Reel" },
    { name: "Get ready with me", img: "ringLight", len: "0:45", tag: "Short" },
    { name: "Review quote", img: "maya", len: "0:15", tag: "Story" },
  ],
  "Fitness & outdoors": [
    { name: "Race-night hype", img: "runner", len: "0:30", tag: "Reel" },
    { name: "Gear close-up", img: "shoe", len: "0:15", tag: "Story" },
    { name: "Trail diary", img: "hiker", len: "0:45", tag: "Short" },
    { name: "Destination teaser", img: "lake", len: "0:20", tag: "Ad" },
  ],
  Fashion: [
    { name: "Street lookbook", img: "street", len: "0:30", tag: "Reel" },
    { name: "Colour drop", img: "red", len: "0:15", tag: "Story" },
    { name: "Vlog in town", img: "vlogStreet", len: "0:45", tag: "Short" },
    { name: "Creator collab", img: "ines", len: "0:20", tag: "Ad" },
  ],
}

/** A vertical template card: poster, length, format, name. */
export function TemplateCard({ name, img, len, tag }: { name: string; img: PhotoKey; len: string; tag: string }) {
  return (
    <figure className="group flex cursor-pointer flex-col gap-3">
      <div className="relative aspect-[9/16] overflow-hidden bg-sage-deep">
        <img
          src={photo(img, 600)}
          alt={name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 bg-page px-2 py-1 text-[11px] font-medium text-ink">{tag}</span>
        <span className="absolute right-3 bottom-3 bg-ink/80 px-1.5 py-0.5 text-[11px] text-page tabular-nums">{len}</span>
        <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="grid size-12 place-items-center rounded-full bg-page text-ink">
            <Play className="size-4 fill-current" />
          </span>
        </span>
      </div>
      <figcaption className="text-[14px] font-medium text-ink">{name}</figcaption>
    </figure>
  )
}

export function TemplateGallery() {
  const keys = Object.keys(GROUPS)
  const [tab, setTab] = useState(keys[0])
  keys.forEach((k) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(k, () => setTab(k), { on: tab === k, group: "Templates" })
  })
  return (
    <Section id="templates" tone="sage">
      <Container>
        <SectionHeading
          eyebrow="Templates"
          title="Start from a format that already works"
          description="Every template is built from patterns that perform on each channel, then dressed in your brand kit."
        />
        <Tabs value={tab} onValueChange={setTab} className="mt-10 gap-8 md:mt-14">
          <TabsList variant="line" className="mx-auto h-auto max-w-full flex-wrap justify-center gap-1 border-b border-line-strong/70 bg-transparent p-0">
            {keys.map((k) => (
              <TabsTrigger
                key={k}
                value={k}
                className="h-11 flex-none rounded-none px-4 text-[14px] text-muted after:bottom-[-1px] data-[state=active]:text-ink"
              >
                {k}
              </TabsTrigger>
            ))}
          </TabsList>
          {keys.map((k) => (
            <TabsContent key={k} value={k}>
              <Reveal className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                {GROUPS[k].map((t) => (
                  <TemplateCard key={t.name} {...t} />
                ))}
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}
