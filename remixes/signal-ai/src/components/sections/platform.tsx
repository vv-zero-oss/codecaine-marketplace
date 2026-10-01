import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const base = import.meta.env.BASE_URL

const MODES = [
  { name: "Chat and reasoning", text: "Long-context answers with tools and live search, tuned for the questions your users actually ask." },
  { name: "Code and agents", text: "Plan, edit and run code in a sandbox, with every step logged so a person can review it." },
  { name: "Voice and images", text: "Sub-second spoken replies and image generation, from the same key and the same bill." },
]

/** One platform for every modality: a photograph beside a dark panel whose list switches the description. */
export function Platform() {
  const [active, setActive] = useState(0)
  useCanvasAction("Platform: next mode", () => setActive((a) => (a + 1) % MODES.length), { group: "Platform" })
  return (
    <section id="platform" className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="grid md:grid-cols-2">
            <img src={`${base}img/platform.jpg`} alt="A woman concentrating on her laptop beside a bright window" loading="lazy" className="h-64 w-full object-cover md:h-full md:min-h-[480px]" />
            <div className="flex flex-col bg-panel p-6 text-panel-ink sm:p-10">
              <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] leading-[0.98] tracking-[-0.01em]">One unified platform for every modality</h2>
              <div className="mt-12 flex flex-1 flex-col justify-end md:mt-24">
                <ul className="flex flex-col">
                  {MODES.map((m, i) => (
                    <li key={m.name}>
                      <button
                        type="button"
                        aria-pressed={active === i}
                        onClick={() => setActive(i)}
                        className={cn(
                          "min-h-11 text-left font-serif text-[clamp(1.4rem,2.4vw,1.8rem)] leading-tight transition-colors duration-200 hover:text-panel-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-panel-ink/40",
                          active === i ? "text-panel-ink" : "text-panel-dim",
                        )}
                      >
                        {m.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="my-6 h-px bg-white/15" />
                <p key={active} className="min-h-[4.5rem] max-w-sm animate-pixel text-[13px] leading-relaxed text-panel-ink/90">
                  {MODES[active].text}
                </p>
                <ButtonLink href="#start" className="mt-6 self-start bg-panel-ink text-panel hover:bg-panel-ink/85">
                  Talk to sales
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
