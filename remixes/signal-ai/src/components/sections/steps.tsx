import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const base = import.meta.env.BASE_URL

const STEPS = [
  { img: "step1", alt: "A laptop on a wooden desk showing code", title: "Start with a prompt.", text: "Call the API from the language you already use. A first response takes one request and a key." },
  { img: "step2", alt: "Three colleagues sketching ideas on a whiteboard", title: "Shape it with your team.", text: "Share prompts, tools and test cases in one workspace, so what works for one person works for everyone." },
  { img: "step3", alt: "Close-up of server racks with indicator lights", title: "Run it on real traffic.", text: "Evaluate on your own data before launch, then watch cost and latency per request once you are live." },
  { img: "step4", alt: "Hands typing on a laptop keyboard", title: "Scale without rewrites.", text: "Rate limits rise on their own as usage grows. Nothing in your code changes when they do." },
]

/** Four steps from first call to production, each a photograph and a short line. */
export function Steps() {
  return (
    <section id="how" className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <SectionHeading title="From prompt to production" sub="We handle the infrastructure and stay on the hook for the results long after you go live." />
        </Reveal>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {STEPS.map((s, i) => (
            <li key={s.img}>
              <Reveal delay={i * 0.07}>
                <figure className="group">
                  <div className="overflow-hidden">
                    <img src={`${base}img/${s.img}.jpg`} alt={s.alt} loading="lazy" className="aspect-[4/3] w-full object-cover sm:aspect-square transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  </div>
                  <figcaption className="mt-5">
                    <p className="font-mono text-[10px] text-ink-3">0{i + 1}</p>
                    <h3 className="mt-1 font-serif text-[24px] leading-none tracking-[-0.01em]">{s.title}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-ink-2">{s.text}</p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
