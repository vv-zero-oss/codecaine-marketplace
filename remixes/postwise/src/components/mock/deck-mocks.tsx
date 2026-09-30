import { Check, ChevronDown, Search, Send, ShieldCheck, Sparkles, X } from "lucide-react"

import { Initials, Tag } from "@/components/mock/parts"
import { Typewriter } from "@/components/motion/typewriter"
import type { DeckCardKey } from "@/content"
import { cn } from "@/lib/utils"

function TriageMock() {
  const groups = [
    {
      label: "Needs you",
      dot: "bg-dot-red",
      rows: [
        ["Ana Ferreira", "Proposal — can we lock pricing this week?", "bg-[#e0795a]"],
        ["Jacob Moreno", "MSA v3 attached, sign-off by Friday", "bg-[#4f9e6a]"],
        ["Tom Becker", "Deck for Thursday’s board call", "bg-[#d99a3a]"],
      ],
    },
    {
      label: "For your information",
      dot: "bg-dot-blue",
      rows: [
        ["Leah Kim", "Intro: Northwind ↔ Postwise", "bg-[#6b7de0]"],
        ["Grace Liu", "Offer accepted — start date June 3", "bg-[#9a6bd6]"],
      ],
    },
    {
      label: "Can wait",
      dot: "bg-dot-amber",
      rows: [
        ["Product Weekly", "Twelve things we shipped in May", "bg-[#8c8a88]"],
        ["Receipts", "Your invoice from Figma", "bg-[#5a6a8a]"],
      ],
    },
  ]
  return (
    <div className="flex flex-col gap-3 p-4 text-[12px]">
      <div className="flex items-center gap-2 text-[11px] text-ink-subtle">
        <Sparkles className="size-3 text-dot-violet" /> Sorted 48 new emails at 7:02
      </div>
      {groups.map((g) => (
        <div key={g.label} className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-[11px] font-medium text-ink-muted">
            <span className={cn("size-1.5 rounded-full", g.dot)} /> {g.label}
            <span className="text-ink-subtle">{g.rows.length}</span>
          </p>
          {g.rows.map(([name, subject, tone]) => (
            <div key={name} className="flex items-center gap-2.5 rounded-[8px] px-2 py-1.5 odd:bg-card-soft">
              <Initials name={name} tone={tone} className="size-6 text-[9px]" />
              <span className="w-24 shrink-0 truncate font-medium">{name}</span>
              <span className="truncate text-ink-muted">{subject}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function DraftingMock({ paused }: { paused: boolean }) {
  const suggestions = [
    ["Say yes, ask to keep the 30-day notice", "Accept v3 but push back on clause 9.2.", "bg-[#fde2e2]"],
    ["Decline politely, offer next quarter", "Warm no that keeps the door open.", "bg-[#dff4dc]"],
    ["Ask for a call to walk through it", "Offers three times that suit you both.", "bg-[#fff1c2]"],
    ["Forward to finance with a summary", "Adds the four changed clauses as bullets.", "bg-[#e6e1ff]"],
  ]
  return (
    <div className="flex flex-col gap-4 p-5">
      <p className="text-[19px] tracking-[-0.02em] whitespace-nowrap">What should this reply say?</p>
      <div className="flex items-center gap-2 rounded-[8px] border border-line bg-card-soft px-3 py-2.5 text-[12px]">
        <Search className="size-3.5 text-ink-subtle" />
        <Typewriter text="Happy with v3, but keep the old notice period" paused={paused} />
      </div>
      <p className="text-[11px] text-ink-subtle">Suggestions for this thread</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {suggestions.map(([title, body, tone]) => (
          <div key={title} className="flex gap-2.5">
            <span className={cn("mt-0.5 size-5 shrink-0 rounded-[5px]", tone)} />
            <span className="flex flex-col gap-0.5">
              <span className="text-[12px] font-medium">{title}</span>
              <span className="text-[11px] leading-snug text-ink-subtle">{body}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DeliverabilityMock() {
  const rows = [
    ["sam@postwise.io", "62%", "1,204", "99.1"],
    ["hello@postwise.io", "48%", "860", "98.4"],
    ["team@postwise.io", "51%", "412", "97.8"],
    ["billing@postwise.io", "70%", "96", "99.6"],
    ["support@postwise.io", "44%", "2,310", "96.9"],
  ]
  return (
    <div className="relative p-4 text-[11.5px]">
      <p className="mb-2 flex items-center gap-2 text-[12.5px] font-medium">
        <ShieldCheck className="size-3.5" /> Domain health
      </p>
      <div className="mb-2 flex gap-2 text-[10.5px] text-ink-subtle">
        <span>Sender: All <ChevronDown className="inline size-3" /></span>
        <span>Domain: postwise.io <ChevronDown className="inline size-3" /></span>
      </div>
      <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr_0.8fr] border-b border-line py-1.5 text-[10.5px] text-ink-subtle">
        <span>Mailbox</span><span>Open rate</span><span>Sent</span><span>Inbox %</span>
      </div>
      {rows.map(([box, open, sent, inbox]) => (
        <div key={box} className="grid grid-cols-[1.6fr_0.7fr_0.7fr_0.8fr] border-b border-line/70 py-2">
          <span className="truncate">{box}</span><span>{open}</span><span>{sent}</span><span>{inbox}</span>
        </div>
      ))}
      <div className="absolute top-16 left-10 w-[300px] rounded-[10px] bg-card p-3 shadow-(--shadow-float)">
        <p className="mb-1 flex items-center justify-between text-[11.5px] font-medium">
          postwise.io <X className="size-3 text-ink-subtle" />
        </p>
        <p className="mb-2 text-[10.5px] leading-snug text-ink-subtle">Authenticate your domain so every message lands where it should.</p>
        {[
          ["SPF", "Record found and valid", true],
          ["DKIM", "Signing key rotated 3 days ago", true],
          ["DMARC", "No policy yet — one click to add", false],
        ].map(([name, note, ok]) => (
          <div key={name as string} className="flex items-center gap-2 border-t border-line py-1.5">
            <span className={cn("grid size-4 place-items-center rounded-full text-white", ok ? "bg-dot-green" : "bg-dot-amber")}>
              {ok ? <Check className="size-2.5" strokeWidth={3} /> : <span className="text-[9px] font-bold">!</span>}
            </span>
            <span className="w-12 font-medium">{name}</span>
            <span className="flex-1 truncate text-[10.5px] text-ink-subtle">{note}</span>
            {!ok && <span className="rounded-[5px] bg-app-accent px-1.5 py-0.5 text-[10px] text-white">Fix</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function FollowupsMock() {
  const rows = [
    ["Ana Ferreira", "Proposal for Northwind", "4 days", "bg-[#e0795a]", "bg-dot-red"],
    ["Marcus Lee", "Pilot pricing", "2 days", "bg-[#5a6a8a]", "bg-dot-amber"],
    ["Imani Brooks", "Security questionnaire", "6 days", "bg-[#c2587a]", "bg-dot-red"],
    ["Owen Carter", "Renewal terms", "1 day", "bg-[#3f9c9c]", "bg-dot-green"],
    ["Nadia Petrova", "Co-marketing brief", "3 days", "bg-[#9a6bd6]", "bg-dot-amber"],
    ["Kwame Asante", "Intro call next week", "5 days", "bg-[#4f9e6a]", "bg-dot-red"],
  ]
  return (
    <div className="flex flex-col gap-1 p-4 text-[12px]">
      <p className="mb-1 flex items-center gap-2 text-[11px] text-ink-subtle">
        Waiting on others <span className="rounded bg-paper px-1">{rows.length}</span>
      </p>
      {rows.map(([name, subject, age, tone, dot]) => (
        <div key={name} className="flex items-center gap-2.5 rounded-[8px] px-2 py-1.5 odd:bg-card-soft">
          <Initials name={name} tone={tone} className="size-6 text-[9px]" />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-medium">{name}</span>
            <span className="truncate text-[10.5px] text-ink-subtle">{subject}</span>
          </span>
          <Tag dot={dot}>Quiet {age}</Tag>
          <span className="inline-flex items-center gap-1 rounded-[5px] border border-line px-1.5 py-0.5 text-[10.5px]">
            <Send className="size-2.5" /> Nudge ready
          </span>
        </div>
      ))}
    </div>
  )
}

/** The small product screen on each card of the platform deck. */
export function DeckMock({ card, paused = false }: { card: DeckCardKey; paused?: boolean }) {
  if (card === "triage") return <TriageMock />
  if (card === "drafting") return <DraftingMock paused={paused} />
  if (card === "deliverability") return <DeliverabilityMock />
  return <FollowupsMock />
}
