import { FlaskConical, Gauge, Layers, Wrench } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { ArtTile } from "@/components/ui/art-tile"
import { Container } from "@/components/ui/container"

const ROWS = [
  { icon: Layers, title: "Long context that holds", text: ["A million tokens is only useful if the model still finds the sentence on page 400. We train and test for recall across the whole window, not just the start of it.", "Drop in a codebase, a contract bundle or a year of tickets and ask a question about any of it."] },
  { icon: Wrench, title: "Tools that act", text: ["Models call your functions, search the web and run code, and each call is typed and logged.", "When a step fails the model sees the error and recovers, instead of carrying on as if it worked."] },
  { icon: Gauge, title: "Latency you can plan around", text: ["We publish the median and the slow tail, per model and per region, so your timeouts are numbers and not guesses.", "Streaming starts in under 200 ms, which is the difference between a reply and a wait."] },
  { icon: FlaskConical, title: "Evals before every release", text: ["Each model ships only after it beats the last one on a private suite built from real customer tasks.", "You get the same harness: run your own cases against any version before you switch."] },
]

/** A numbered list on hairlines: the words on the left, a framed illustration on the right. */
export function Differences() {
  return (
    <section id="different" className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="grid gap-4 border-b border-line pb-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="inline-flex items-center gap-1.5 text-[12px] text-accent">
                <span className="size-1.5 bg-accent" /> Solid foundation
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.2rem,4.6vw,3.2rem)] leading-[0.95] tracking-[-0.02em]">What makes Vantage different</h2>
            </div>
            <p className="max-w-md self-end text-[14px] leading-relaxed text-ink-2">Real products are messy: long inputs, flaky tools, deadlines. Vantage is built for the work after the demo.</p>
          </div>
        </Reveal>
        <ol>
          {ROWS.map((r, i) => (
            <li key={r.title} className="grid gap-8 border-b border-line py-12 md:grid-cols-2 md:gap-16">
              <Reveal>
                <p className="font-mono text-[11px] text-ink-3">0{i + 1}</p>
                <h3 className="mt-3 text-[20px] font-medium tracking-[-0.02em]">{r.title}</h3>
                <div className="mt-4 max-w-md space-y-4 text-[14px] leading-relaxed text-ink-2">
                  {r.text.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <ArtTile icon={r.icon} seed={i + 2} tilt={150 + i * 25} />
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
