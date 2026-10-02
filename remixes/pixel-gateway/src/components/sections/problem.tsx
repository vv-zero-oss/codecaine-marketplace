import { useMotionValueEvent, useScroll } from "motion/react"
import { useRef, useState } from "react"

import { ScrambleText } from "@/components/motion/scramble-text"
import { Container } from "@/components/ui/container"
import { GENERATIONS } from "@/content"
import { cn } from "@/lib/utils"
import city from "@/assets/city-pixel.png"

/**
 * The problem statement, pinned. The headline holds still while three
 * generations of gateway light up one by one down the right edge, and the note
 * on the left decrypts into the matching story. Scroll drives it; the section
 * is three screens tall and the stage inside it is `sticky`.
 */
export function Problem() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [gen, setGen] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (p) => setGen(Math.min(GENERATIONS.length - 1, Math.floor(p * GENERATIONS.length * 0.999))))
  const current = GENERATIONS[gen]
  return (
    <section ref={ref} id="problem" className="relative h-[240svh] bg-bg">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pb-(--status-h) pt-(--header-h)">
        <div aria-hidden data-canvas-ignore className="pixelated absolute inset-x-0 bottom-0 h-[42%] bg-cover bg-bottom opacity-15 [mask-image:linear-gradient(to_top,#000,transparent)]" style={{ backgroundImage: `url(${city})` }} />
        <Container className="relative grid gap-phi-4 lg:grid-cols-[1fr_auto] lg:gap-phi-5">
          <div className="flex flex-col justify-between gap-phi-4 lg:min-h-[60svh]">
            <h2 className="max-w-4xl text-5xl font-bold">
              Your traffic still takes the{" "}
              <span className="relative inline-block">
                <span className="absolute -top-4 left-0 whitespace-nowrap font-mono text-base font-normal tracking-widest text-fg-muted sm:text-base">[BACKHAUL_DETOUR]</span>
                <span className="px-underline">long way</span>
              </span>{" "}
              round.
            </h2>
            <div className="max-w-md font-mono text-lg uppercase leading-tight text-fg-muted" aria-live="polite">
              <p className="text-fg-subtle">{gen === 0 ? "IN_THE_BEGINNING" : `AFTER_${current.id.replace(" ", "_")}`} {">>"}</p>
              <p className="mt-phi-1 text-fg">
                <ScrambleText key={current.id} text={`${current.title}. ${current.body}`} trigger="mount" duration={1.1} band={6} charset="symbols" />
              </p>
            </div>
          </div>
          <ol className="grid content-center gap-phi-4 self-center lg:justify-items-end">
            {GENERATIONS.map((g, i) => (
              <li key={g.id} className={cn("flex items-center gap-phi-2 font-display text-label uppercase transition-opacity duration-200 ease-[steps(3,end)] lg:flex-row-reverse", i === gen ? "opacity-100" : "opacity-25")}>
                <span className={cn("size-3 shrink-0 bg-fg", i === gen && "animate-blink bg-accent-hi")} />
                {g.id}
                <span className="hidden font-mono text-lg normal-case text-fg-muted sm:inline lg:hidden xl:inline">{g.title}</span>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  )
}
