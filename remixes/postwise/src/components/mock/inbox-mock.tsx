import {
  Archive,
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  Filter,
  Inbox,
  MoreHorizontal,
  Paperclip,
  Play,
  Search,
  Send,
  Settings,
  Sparkles,
  Star,
  Users,
} from "lucide-react"

import { AppWindow, Initials, Tag } from "@/components/mock/parts"
import { cn } from "@/lib/utils"

const THREADS = [
  { name: "Ana Ferreira", org: "Northwind · Head of Procurement", tag: "Waiting 4 days on your proposal", dot: "bg-dot-red", tone: "bg-[#e0795a]" },
  { name: "Leah Kim", org: "Brightfold · Partner", tag: "Intro to the Northwind team", dot: "bg-dot-blue", tone: "bg-[#6b7de0]" },
  { name: "Jacob Moreno", org: "Acme Legal · Counsel", tag: "Sent MSA version 3", dot: "bg-dot-green", tone: "bg-[#4f9e6a]", active: true },
  { name: "Grace Liu", org: "Halden · Recruiter", tag: "Candidate accepted the offer", dot: "bg-dot-violet", tone: "bg-[#9a6bd6]" },
  { name: "Tom Becker", org: "Oakline · CEO", tag: "Asked for the deck again", dot: "bg-dot-amber", tone: "bg-[#d99a3a]" },
  { name: "Priya Nair", org: "Fathom · Account Executive", tag: "Replied to pricing thread", dot: "bg-dot-green", tone: "bg-[#3f9c9c]" },
  { name: "Omar Haddad", org: "Verra · Finance", tag: "Invoice #2041 overdue", dot: "bg-dot-red", tone: "bg-[#c2587a]" },
  { name: "Sofia Brandt", org: "Kettle & Co · Operations", tag: "Moved Thursday’s call", dot: "bg-dot-amber", tone: "bg-[#7c8a3a]" },
  { name: "Marcus Lee", org: "Oakline · Founder", tag: "Opened your proposal 4 times", dot: "bg-dot-violet", tone: "bg-[#5a6a8a]" },
]

/**
 * The product screen in the hero and the copilot section: Postwise's inbox,
 * with a thread open and Scribe's drafted reply under it. Plain markup at a
 * fixed 1040px, scaled by `ScaledFrame`.
 */
export function InboxMock({ showPlay = true, className }: { showPlay?: boolean; className?: string }) {
  return (
    <AppWindow className={cn("relative w-[1040px] text-[12px]", className)}>
      <div className="flex h-[600px]">
        {/* Rail */}
        <div className="flex w-12 flex-col items-center gap-4 border-r border-line py-4 text-ink-subtle">
          <span className="grid size-7 place-items-center rounded-[7px] bg-ink text-white">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor"><path d="M2 11.6 22 2.5l-4.3 18.3-5.6-5.7-4 3.8v-5.6L19.4 5 10 13.1Z" /></svg>
          </span>
          <Inbox className="size-4 text-ink" />
          <Star className="size-4" />
          <Clock className="size-4" />
          <Send className="size-4" />
          <Archive className="size-4" />
          <Users className="size-4" />
          <Calendar className="size-4" />
          <span className="mt-auto" />
          <Bell className="size-4" />
          <Settings className="size-4" />
        </div>

        {/* List */}
        <div className="flex w-[420px] flex-col border-r border-line">
          <div className="flex items-center gap-2 px-4 pt-3.5 pb-2">
            <Sparkles className="size-3.5" />
            <span className="text-[13px] font-medium">Scribe</span>
            <span className="ml-auto flex items-center gap-2 text-ink-subtle">
              <Search className="size-3.5" />
              <MoreHorizontal className="size-3.5" />
            </span>
          </div>
          <div className="flex gap-4 border-b border-line px-4 text-[11.5px]">
            <span className="border-b-2 border-ink pb-2 font-medium">Needs reply <span className="ml-1 rounded bg-paper px-1 text-ink-muted">12</span></span>
            <span className="pb-2 text-ink-subtle">On autopilot <span className="ml-1 rounded bg-paper px-1">34</span></span>
            <span className="pb-2 text-ink-subtle">FYI <span className="ml-1 rounded bg-paper px-1">58</span></span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 text-[11px] text-ink-subtle">
            <span className="inline-flex items-center gap-1 rounded-[5px] border border-line px-1.5 py-0.5">Group by: Urgency <ChevronDown className="size-3" /></span>
            <span>Sort by: Received</span>
            <span className="inline-flex items-center gap-1"><Filter className="size-3" /> Filter</span>
          </div>
          <p className="px-4 pb-1 text-[11px] text-ink-subtle">Today · 9</p>
          <ul className="flex-1 overflow-hidden">
            {THREADS.map((t) => (
              <li key={t.name} className={cn("flex items-center gap-2.5 px-4 py-[7px]", t.active && "bg-paper")}>
                <Initials name={t.name} tone={t.tone} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[12px] font-medium">{t.name}</span>
                  <span className="truncate text-[10.5px] text-ink-subtle">{t.org}</span>
                </span>
                <Tag dot={t.dot} className="max-w-[170px] truncate">{t.tag}</Tag>
              </li>
            ))}
          </ul>
        </div>

        {/* Thread */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
            <Initials name="Jacob Moreno" tone="bg-[#4f9e6a]" className="size-8" />
            <span className="flex flex-col">
              <span className="flex items-center gap-2 text-[13px] font-medium">
                Jacob Moreno <span className="rounded bg-[#e6f4e8] px-1.5 text-[10px] font-normal text-[#2f7a45]">Contract</span>
              </span>
              <span className="text-[10.5px] text-ink-subtle">Counsel at Acme Legal · 9:12</span>
            </span>
            <span className="ml-auto flex items-center gap-2 text-ink-subtle">
              <Archive className="size-3.5" />
              <Clock className="size-3.5" />
              <MoreHorizontal className="size-3.5" />
            </span>
          </div>
          <div className="flex flex-col gap-4 px-5 py-4">
            <div>
              <p className="mb-1.5 text-[11.5px] font-medium">Summary by Scribe</p>
              <ul className="flex flex-col gap-1 text-[11.5px] leading-snug text-ink-muted">
                <li>• Version 3 of the MSA attached; four clauses changed since v2.</li>
                <li>• Liability cap raised to 12 months of fees; payment terms now net 45.</li>
                <li>• Jacob needs sign-off by Friday to keep the June start date.</li>
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-line px-2 py-1 text-[11px]">
                <Paperclip className="size-3" /> Acme_MSA_v3.pdf
              </span>
              <Tag dot="bg-dot-amber">Due Friday</Tag>
              <Tag dot="bg-dot-blue">3 people on thread</Tag>
            </div>
            <div className="rounded-[10px] border border-line">
              <div className="flex items-center gap-2 border-b border-line px-3 py-2 text-[11px]">
                <Sparkles className="size-3 text-dot-violet" />
                <span className="font-medium">Suggested reply</span>
                <span className="text-ink-subtle">· in your voice</span>
                <span className="ml-auto text-ink-subtle">Send in 1 hour <ChevronDown className="inline size-3" /></span>
              </div>
              <div className="flex flex-col gap-2 px-3 py-3 text-[11.5px] leading-[1.55] text-ink-soft">
                <p>Hi Jacob,</p>
                <p>
                  Thanks for turning this around so quickly. The new liability cap and net-45 terms work for us. On clause 9.2,
                  could we keep the 30-day notice period from v2? Everything else looks good to sign.
                </p>
                <p>If that’s fine on your side, I’ll have it back to you signed by Thursday.</p>
                <p>Best, Sam</p>
              </div>
            </div>
          </div>
          <div className="mt-auto flex items-center gap-2 border-t border-line px-5 py-3">
            <span className="text-[11px] text-ink-subtle">Edit</span>
            <span className="text-[11px] text-ink-subtle">· Shorter</span>
            <span className="text-[11px] text-ink-subtle">· More formal</span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-[6px] bg-app-blue px-4 py-1.5 text-[11.5px] font-medium text-white">
              <Send className="size-3" /> Send reply
            </span>
          </div>
        </div>
      </div>
      {showPlay && (
        <span className="absolute top-1/2 left-1/2 grid h-14 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[12px] bg-ink text-white shadow-(--shadow-float)">
          <Play className="size-6 fill-current" />
        </span>
      )}
    </AppWindow>
  )
}
