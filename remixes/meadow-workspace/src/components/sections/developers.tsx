import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const LINES: { text: string; tone?: "dim" | "ok" | "cmd" }[] = [
  { text: "meadow contacts list --company fernhill", tone: "cmd" },
  { text: "→ found 47 contacts", tone: "dim" },
  { text: "  Noor Haddad    noor@tallow.example", tone: "dim" },
  { text: "  Tomás Reyes    tomas@orchard.example", tone: "dim" },
  { text: "  …and 45 more", tone: "dim" },
  { text: "meadow threads sync --inbox primary", tone: "cmd" },
  { text: "✓ synced 12 threads from primary inbox", tone: "ok" },
]

/** A terminal, because the people who automate things want to see one. */
export function Developers() {
  return (
    <section id="developers" className="bg-page py-12 sm:py-20">
      <Container className="flex flex-col items-center gap-9">
        <Reveal><SectionHeading align="center" title="Made for agents and engineers" description="Reach everything in Meadow from code — a REST API, SDKs for TypeScript, Python and Rust, and a CLI for scripting and automation." /></Reveal>
        <Reveal delay={0.08} className="w-full max-w-[560px]">
          <div className="overflow-hidden rounded-xl bg-terminal text-left shadow-lift">
            <div className="flex gap-1.5 px-4 pt-3.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" />
            </div>
            <pre className="overflow-x-auto p-4 pt-3 font-mono text-[12px] leading-[1.75] text-white/85">
              {LINES.map((line, i) => (
                <div key={i} className={line.tone === "dim" ? "text-white/50" : line.tone === "ok" ? "text-teal" : ""}>
                  {line.tone === "cmd" ? <span className="text-sky-300">$ </span> : null}
                  {line.text}
                </div>
              ))}
              <span className="text-sky-300">$ </span><span className="inline-block h-3.5 w-1.5 translate-y-0.5 bg-white/80 [animation:blink_1.1s_steps(1)_infinite]" />
            </pre>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
