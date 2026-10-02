import { ArrowUp, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Screen } from "@/components/screens/kit"
import { cn } from "@/lib/utils"

export const PERSONAS = ["Friend", "Guardian", "Data nerd"] as const
export type Persona = (typeof PERSONAS)[number]

const ASKS = ["How hard should I push today?", "Why was my sleep short?", "What’s my best workout window?"]
const REPLIES: Record<Persona, string[]> = {
  Friend: [
    "Honestly? Ease in. Your recovery is 70%, so a steady run feels great — save the hard intervals for Saturday. 🙂",
    "You went to bed 52 minutes later than usual and that late coffee probably didn’t help. Earlier wind-down tonight?",
    "Late morning. Your body temperature peaks around 11 a.m., and that’s when your last three best runs happened.",
  ],
  Guardian: [
    "Keep strain under 70% today. Your HRV dipped 9% on Tuesday and hasn’t fully returned — I’d rather you finish strong than stall.",
    "Bedtime slipped by 52 minutes and caffeine landed 6 hours before sleep. Cut it off by 2 p.m. and I’ll check in at 9.",
    "10:30 a.m. to noon. Avoid training after 7 p.m. this week; your resting heart rate is still elevated.",
  ],
  "Data nerd": [
    "Recovery 70% (HRV 62 ms vs 55 baseline, RHR 48). Target strain 55–68%. Zone-2 volume is 21 min short of weekly goal.",
    "Sleep onset +52 min vs 30-day median (22:10). Latency 24 min; caffeine at 13:40 → t½ ≈ 5 h. Deep sleep unchanged at 2h 06m.",
    "Core temp acrophase ≈ 11:05. Your top-quartile sessions (n=14) start between 10:20 and 11:40. Effect size 0.6.",
  ],
}
const FALLBACK: Record<Persona, string> = {
  Friend: "Good question — give me a second to look through your week. What I can see so far says you’re trending the right way.",
  Guardian: "Let me check your last 14 days before I answer, so the advice is based on your numbers, not a guess.",
  "Data nerd": "Query noted. 14-day window loaded; 2,016 samples. Short version: your trend is positive, variance is low.",
}

type Message = { from: "me" | "coach"; text: string }

/** A conversation with the coach. Tap a prompt or type your own; the coach answers in the voice you picked. */
export function ChatScreen({ persona = "Friend", onPersona }: { persona?: Persona; onPersona?: (next: Persona) => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState("")
  const [typing, setTyping] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)

  // A new voice starts a new thread — the answers wouldn't match otherwise.
  useEffect(() => {
    setMessages([])
    setTyping(false)
    window.clearTimeout(timer.current)
  }, [persona])
  useEffect(() => () => window.clearTimeout(timer.current), [])
  useEffect(() => {
    const scroller = end.current?.parentElement
    scroller?.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" })
  }, [messages, typing])

  const ask = (text: string, index = -1) => {
    if (!text.trim() || typing) return
    setMessages((m) => [...m, { from: "me", text }])
    setDraft("")
    setTyping(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setMessages((m) => [...m, { from: "coach", text: index >= 0 ? REPLIES[persona][index] : FALLBACK[persona] }])
      setTyping(false)
    }, 900)
  }

  return (
    <Screen className="flex flex-col bg-[linear-gradient(#ece9fb,#fff_220px)] px-4 pb-0">
      <div className="flex items-center justify-between">
        <div className="text-[17px] font-semibold tracking-tight">Ask Meridian</div>
        <div className="flex gap-1 rounded-full bg-paper/80 p-1 text-[11px] font-medium shadow-sm">
          {PERSONAS.map((p) => (
            <button key={p} onClick={() => onPersona?.(p)} className={cn("rounded-full px-2.5 py-1 transition-colors", p === persona ? "bg-ink text-paper" : "text-ink-3")}>{p}</button>
          ))}
        </div>
      </div>
      <div data-lenis-prevent className="mt-4 flex-1 space-y-2.5 overflow-y-auto pb-3 [scrollbar-width:none]">
        {messages.length === 0 && (
          <div className="pt-6 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-paper shadow-card"><Sparkles className="size-5 text-violet" /></span>
            <p className="mx-auto mt-3 max-w-[240px] text-[14px] leading-snug text-ink-2">Ask about your sleep, strain, recovery or labs. I’ve read all of it.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("max-w-[84%] animate-[pop-in_220ms_var(--ease-out)] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug", m.from === "me" ? "ml-auto bg-accent text-white" : "bg-paper shadow-card")}>{m.text}</div>
        ))}
        {typing && (
          <div className="flex w-14 gap-1 rounded-2xl bg-paper px-4 py-3.5 shadow-card">
            {[0, 1, 2].map((d) => <span key={d} className="size-1.5 animate-[blink_1s_infinite] rounded-full bg-ink-3" style={{ animationDelay: `${d * 150}ms` }} />)}
          </div>
        )}
        <div ref={end} />
      </div>
      <div className="-mx-4 border-t border-line bg-paper/90 px-4 pt-2.5 pb-8 backdrop-blur">
        {messages.length < 2 && (
          <div className="mb-2 flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {ASKS.map((q, i) => <button key={q} onClick={() => ask(q, i)} className="shrink-0 rounded-full bg-tint px-3 py-1.5 text-[12px] font-medium text-ink-2 transition-colors hover:bg-tint-2">{q}</button>)}
          </div>
        )}
        <form onSubmit={(e) => { e.preventDefault(); ask(draft) }} className="flex items-center gap-2 rounded-full bg-tint py-1 pr-1 pl-4">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask Meridian anything" aria-label="Message" className="h-9 min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink-3" />
          <button type="submit" aria-label="Send" className="grid size-9 place-items-center rounded-full bg-ink text-paper transition-transform active:scale-90"><ArrowUp className="size-4" /></button>
        </form>
      </div>
    </Screen>
  )
}
