import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { useCanvasAction } from "@canvas/react"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { Switch } from "@/components/ui/switch"
import { SectionHeading } from "@/components/ui/section-heading"
import { Section } from "@/components/sections/shared/section"
import { cn } from "@/lib/utils"

const FLOW = [
  { title: "Draft", who: "Copy agent", tone: "bg-periwinkle" },
  { title: "Brand check", who: "Automatic", tone: "bg-mint" },
  { title: "Review", who: "Maya, Social lead", tone: "bg-butter" },
  { title: "Scheduled", who: "Tue 18:30 Lisbon", tone: "bg-mint-tile" },
]

const RULES = [
  { id: "paid", label: "Legal review for paid posts", hint: "Adds a legal step to any boosted post." },
  { id: "replies", label: "Auto-publish trusted replies", hint: "FAQ answers go out without a review." },
  { id: "regional", label: "Regional lead signs off local posts", hint: "Lisbon, Austin and Singapore each approve their own." },
  { id: "weekend", label: "Hold posts over the weekend", hint: "Nothing publishes Saturday or Sunday." },
]

/** One approval rule, with a switch the editor can also flip. */
export function RuleRow({ label, hint, on, onChange }: { label: string; hint: string; on: boolean; onChange: (v: boolean) => void }) {
  useCanvasAction(label, (next) => onChange(next ?? !on), { on, group: "Approval rules" })
  return (
    <label className="flex cursor-pointer items-center justify-between gap-6 border-b border-line py-4 last:border-b-0">
      <span>
        <span className="block text-[15px] font-medium text-ink">{label}</span>
        <span className="mt-0.5 block text-[13px] text-muted">{hint}</span>
      </span>
      <Switch checked={on} onCheckedChange={onChange} className="data-[state=checked]:bg-mint" />
    </label>
  )
}

export function Approvals() {
  const [rules, setRules] = useState<Record<string, boolean>>({ paid: true, replies: true, regional: false, weekend: false })
  return (
    <Section id="approvals">
      <Container>
        <SectionHeading
          eyebrow="Approvals"
          title="Nothing ships without the right yes"
          description="Set the path a post takes once. Agents draft, checks run, the right person approves, and the scheduler takes it from there."
        />
        <Reveal className="mt-12 grid border-t border-l border-line md:mt-16 md:grid-cols-4">
          {FLOW.map((f, i) => (
            <div key={f.title} className="relative flex flex-col gap-3 border-r border-b border-line p-6 md:p-7">
              <span className={cn("grid size-8 place-items-center text-[11px] font-medium text-ink", f.tone)}>0{i + 1}</span>
              <p className="mt-3 font-serif text-[1.5rem] font-light text-ink">{f.title}</p>
              <p className="text-[13px] text-muted">{f.who}</p>
              {i < FLOW.length - 1 && (
                <span className="absolute top-1/2 -right-3 z-10 hidden size-6 -translate-y-1/2 place-items-center border border-line bg-page md:grid">
                  <ArrowRight className="size-3" />
                </span>
              )}
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.08} className="mx-auto mt-12 max-w-2xl border border-line bg-panel px-5 md:mt-16 md:px-7">
          {RULES.map((r) => (
            <RuleRow
              key={r.id}
              label={r.label}
              hint={r.hint}
              on={rules[r.id]}
              onChange={(v) => setRules((s) => ({ ...s, [r.id]: v }))}
            />
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
