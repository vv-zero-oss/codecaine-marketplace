import { Braces, FileOutput, Webhook } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const LINES: { text: string; tone?: "dim" | "ok" | "cmd" }[] = [
  { text: "meadow entries list --account 6200 --period 2026-03", tone: "cmd" },
  { text: "→ found 47 entries · $8,420.00", tone: "dim" },
  { text: "  Mar 11  Figma         $45.00   Software", tone: "dim" },
  { text: "  Mar 09  Notion        $96.00   Software", tone: "dim" },
  { text: "  …and 45 more", tone: "dim" },
  { text: "meadow reconcile run --account operating-4417", tone: "cmd" },
  { text: "✓ matched 125 of 128 lines · 3 held for review", tone: "ok" },
]

/** A terminal, because the people who automate things want to see one. */
export function Developers() {
  return (
    <section id="developers" className="bg-page py-12 sm:py-20">
      <Container>
        <Reveal><SectionHeading title="Open books, open API" description="Reach every ledger entry from code — a REST API, SDKs for TypeScript and Python, a CLI for scripting, and clean exports your accountant already knows how to read." /></Reveal>
        <div className="mt-9 grid items-center gap-5 md:grid-cols-[1.25fr_1fr]">
        <Reveal delay={0.08} className="w-full">
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
        <Reveal delay={0.14}>
          <ul className="flex flex-col gap-3">
            {[[Braces, "REST API and SDKs", "Typed clients for TypeScript and Python, with idempotent writes."], [FileOutput, "Exports and filings", "CSV, PDF and XBRL packs for accountants and tax authorities."], [Webhook, "Webhooks and agents", "React to posted entries and let your own agents act within limits."]].map(([I, t, b]) => { const Icon = I as typeof Braces; return (
              <li key={t as string} className="flex gap-3.5 rounded-[var(--radius-card)] bg-surface p-4 shadow-card">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sky-100 text-sky-600"><Icon className="size-4" /></span>
                <div><h3 className="text-[14px] font-semibold">{t as string}</h3><p className="mt-0.5 text-[13px] leading-snug text-ink-500">{b as string}</p></div>
              </li>) })}
          </ul>
        </Reveal>
        </div>
      </Container>
    </section>
  )
}
