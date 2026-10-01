import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/ui/container"

const POSTS = [
  { date: "Sep 12, 2026", title: "Introducing Vantage 4", cover: "Vantage 4", bg: "radial-gradient(120% 90% at 80% 60%, #e9e9ee 0%, #5a5c6a 28%, #1a1b22 60%, #0d0d12 100%)" },
  { date: "Sep 14, 2026", title: "Vantage 4 in your editor", cover: "4 in your editor", bg: "radial-gradient(90% 90% at 30% 90%, #12b5c4 0%, #0b5f95 40%, #0a2f63 100%)" },
  { date: "Sep 11, 2026", title: "Introducing Vantage Bot", cover: "Vantage Bot", bg: "radial-gradient(90% 90% at 25% 15%, #d6eaff 0%, #8fc3ff 45%, #4f9bff 100%)" },
  { date: "Sep 7, 2026", title: "Imagine Frame 2.0", cover: "Frame 2.0", bg: "radial-gradient(100% 100% at 85% 40%, #ff6a3d 0%, #a4403c 45%, #4a2a34 100%)" },
]

/** Four posts: the cover is the title, in a gradient the post owns. */
export function News() {
  return (
    <section id="news" className="pb-24 sm:pb-28">
      <Container>
        <div className="flex items-baseline justify-between">
          <h2 className="text-[26px] font-normal tracking-[-0.04em]">Latest news</h2>
          <a href="#news" className="inline-flex items-center gap-1 text-[12px] text-ink-3 transition-colors hover:text-ink">
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
              <div className="grid aspect-[1.9] place-items-center overflow-hidden rounded-lg shadow-card" style={{ backgroundImage: p.bg }}>
                <span className="px-3 text-center text-[clamp(1rem,2vw,1.3rem)] tracking-[-0.03em] text-white transition-transform duration-500 ease-out group-hover:scale-[1.04]">
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
