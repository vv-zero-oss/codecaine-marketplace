import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/ui/container"

const POSTS = [
  { date: "Sep 12, 2026", title: "Introducing Vantage 4", cover: "Vantage 4", bg: "radial-gradient(120% 90% at 80% 60%, #dff0fc 0%, #4f7fa8 30%, #14263a 65%, #0b1622 100%)", ink: "#fff" },
  { date: "Sep 14, 2026", title: "Vantage 4 in your editor", cover: "4 in your editor", bg: "radial-gradient(90% 90% at 30% 90%, #8ec5f0 0%, #3b86c6 45%, #17406b 100%)", ink: "#fff" },
  { date: "Sep 11, 2026", title: "Introducing Vantage Bot", cover: "Vantage Bot", bg: "radial-gradient(90% 90% at 25% 15%, #ffffff 0%, #cfe8fa 45%, #9ccbf0 100%)", ink: "#0b0b0b" },
  { date: "Sep 7, 2026", title: "Imagine Frame 2.0", cover: "Frame 2.0", bg: "radial-gradient(100% 100% at 85% 40%, #e6f4fe 0%, #78b5e6 40%, #2a5f93 100%)", ink: "#fff" },
]

/** Four posts: the cover is the title, in a gradient the post owns. */
export function News() {
  return (
    <section id="news" className="pt-20 pb-24 sm:pt-28 sm:pb-28">
      <Container>
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.6rem)] leading-none font-normal tracking-[-0.01em]">Latest news</h2>
          <a href="#news" className="inline-flex min-h-11 items-center gap-1 text-[12px] text-ink-3 transition-colors hover:text-ink">
            All posts <ArrowRight className="size-3" />
          </a>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {POSTS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#news"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group block"
            >
              <div className="grid aspect-[1.9] place-items-center overflow-hidden shadow-card" style={{ backgroundImage: p.bg, color: p.ink }}>
                <span className="px-3 text-center font-serif text-[clamp(1.3rem,2.4vw,1.8rem)] leading-none transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                  {p.cover}
                </span>
              </div>
              <p className="mt-3 text-[10px] text-ink-3">{p.date}</p>
              <p className="mt-1 text-[13px] tracking-[-0.01em] text-ink">{p.title}</p>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  )
}
