import { ArrowRight, CalendarClock, Clapperboard, Hash, LineChart, Megaphone, Sparkles, Wand2 } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { ArtDisc, PixelArt } from "@/components/ui/pixel-art"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Section } from "@/components/sections/shared/section"
import { Link } from "@/lib/router"

const POSTS = [
  {
    date: "Sep 24, 2026",
    tag: "AI marketing",
    title: "AI copilots vs. AI marketing managers: which one actually ships the calendar",
    art: { palette: "mint" as const, seed: 3, icons: [<Sparkles key="a" />, <Megaphone key="b" />, <Hash key="c" />] },
  },
  {
    date: "Sep 17, 2026",
    tag: "Short-form video",
    title: "One interview, fourteen clips: the repurposing workflow behind our best month",
    art: { palette: "graphite" as const, seed: 7, icons: [<Clapperboard key="a" />] },
    dark: true,
  },
  {
    date: "Sep 10, 2026",
    tag: "Scheduling",
    title: "Best time to post is a myth — best time for your audience isn't",
    art: { palette: "sage" as const, seed: 11, icons: [<CalendarClock key="a" />, <LineChart key="b" />, <Wand2 key="c" />] },
  },
]

/** An article teaser: pixel cover, date and tag, title. */
export function InsightCard({ post }: { post: (typeof POSTS)[number] }) {
  return (
    <Link href="/" className="group flex flex-col gap-4">
      <PixelArt
        palette={post.art.palette}
        seed={post.art.seed}
        className="aspect-[1.45] transition-transform duration-300 ease-out-strong group-hover:scale-[0.985]"
        icons={post.art.icons.map((icon, i) => (
          <ArtDisc key={i} tone={post.dark ? "light" : "light"}>
            {icon}
          </ArtDisc>
        ))}
      />
      <p className="flex items-center gap-2 text-[11px] text-night-muted">
        {post.date}
        <span className="size-1 rounded-full bg-night-muted" />
        {post.tag}
      </p>
      <h3 className="text-[15px] leading-snug font-medium text-night-ink transition-colors group-hover:text-mint-soft">{post.title}</h3>
    </Link>
  )
}

export function Insights() {
  return (
    <Section id="insights" tone="night">
      <Container>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow className="text-night-muted">From the knowledge base</Eyebrow>
          <h2 className="font-serif text-heading font-light text-night-ink md:text-[2.25rem]">Notes from the always-on feed</h2>
        </Reveal>
        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-3 md:gap-6">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <InsightCard post={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-night-ink hover:text-mint-soft">
            Read more <ArrowRight className="size-3" />
          </Link>
        </div>
      </Container>
    </Section>
  )
}

