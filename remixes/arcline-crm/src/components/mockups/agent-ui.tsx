import { EntityChip } from "@/components/atoms/EntityChip"
import { ValuePill } from "@/components/atoms/ValuePill"
import RecommendationCard, { type RecommendationOption } from "@/components/primitives/RecommendationCard"
import StreamingText, { type StreamingSource, type StreamingToken } from "@/components/primitives/StreamingText"
import TaskRows, { type TaskRow } from "@/components/primitives/TaskRows"
import { AGENTS } from "@/content/pages"

/**
 * The agent-UI primitives (components/primitives, from Beautiful UI) dressed
 * in Arcline's own content: a suggestion to accept, a run that reports back,
 * and an answer that streams in with its sources.
 */

const logo = (name: string) => `${import.meta.env.BASE_URL}logos/${name}.svg`

/** "Suggestions, not surprises": the change Arcline proposes, with its confidence. */
export function DealSuggestion() {
  const options: RecommendationOption[] = [
    {
      key: "stage",
      body: (
        <>
          Move <EntityChip name="Fieldwork" color="var(--green)" /> to <ValuePill tone="accent">Proposal</ValuePill> — Maya asked
          for pricing on <ValuePill>Tuesday's call</ValuePill>
        </>
      ),
      short: "Move Fieldwork to Proposal",
      signal: 3,
      tone: "var(--green)",
      label: "High confidence",
      cta: "Accept",
      ctaVariant: "accent",
    },
    {
      key: "value",
      body: (
        <>
          Raise the deal value to <ValuePill tone="green">$56,000</ValuePill> for the 12 extra seats she mentioned.
        </>
      ),
      short: "Raise value to $56,000",
      signal: 2,
      tone: "var(--orange)",
      label: "Needs review",
      cta: "Review",
      ctaVariant: "primary",
    },
    {
      key: "none",
      body: (
        <>
          Leave the deal as it is and <span className="font-medium text-ink">ask Priya</span> after the demo.
        </>
      ),
      short: "Leave as is, ask Priya",
      signal: 0,
      tone: "var(--ink-3)",
      label: "No signal",
      cta: "Ask Priya",
      ctaVariant: "primary",
    },
  ]
  return <RecommendationCard options={options} labels={{ title: "Update the Fieldwork deal?" }} />
}

/** A persona's question, as a suggestion card with two options. */
export function PersonaSuggestion({ persona }: { persona: (typeof AGENTS.personas.items)[number] }) {
  const options: RecommendationOption[] = persona.options.map((o, i) => ({
    key: `${persona.id}-${i}`,
    body: o.body,
    short: o.short,
    signal: i === 0 ? 3 : 2,
    tone: i === 0 ? "var(--green)" : "var(--orange)",
    label: i === 0 ? "Recommended" : "Alternative",
    cta: "Accept",
    ctaVariant: i === 0 ? "accent" : "primary",
  }))
  return <RecommendationCard key={persona.id} options={options} labels={{ title: persona.question }} />
}

const RUN: TaskRow[] = [
  {
    key: "log",
    label: "Logged yesterday's calls",
    amount: "31 calls",
    status: "done",
    details: [
      { label: "Summaries written", meta: "31/31" },
      { label: "Tasks created", meta: "12" },
    ],
  },
  {
    key: "enrich",
    label: "Enrich new inbound leads",
    amount: "48 leads",
    status: "running",
    step: 2,
    details: [
      { label: "Matched to companies", meta: "46/48" },
      { label: "Scoring intent", meta: "71%" },
    ],
  },
  {
    key: "draft",
    label: "Draft follow-ups for stalled deals",
    amount: "7 emails",
    status: "sequence",
    step: 3,
    details: [
      { label: "Fieldwork — ROI model", meta: "draft" },
      { label: "Parcelwise — mutual plan", meta: "draft" },
    ],
  },
]

/** "Agents that report back": a run's tasks, one failing and retrying. */
export function AgentRun() {
  return <TaskRows rows={RUN} labels={{ completed: "Done", failed: "Retrying" }} />
}

const SOURCES: StreamingSource[] = [
  { name: "Call with Maya", domain: "call · Tue 14:02", href: "#", image: logo("loom") },
  { name: "Kestrel deal", domain: "deal · Kestrel", href: "#", image: logo("slack") },
  { name: "Email thread", domain: "gmail · 9 msgs", href: "#", image: logo("gmail") },
]

/** "Ask Arcline": the answer streams in word by word, with its sources. */
export function StreamingAnswer({ loop = true }: { loop?: boolean }) {
  const tokens: StreamingToken[] = AGENTS.answer.flatMap((part) =>
    "cite" in part && part.cite
      ? [...part.text.split(" ").map((text) => ({ text })), { text: "", cite: true }]
      : part.text.split(" ").filter(Boolean).map((text) => ({ text })),
  )
  return (
    <StreamingText
      content={tokens}
      sources={SOURCES}
      followUps={[...AGENTS.followUps]}
      labels={{ sources: "3 sources", followUps: "Next" }}
      loop={loop}
      fill
    />
  )
}
