import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { PhoneFrame } from "@/components/device/phone-frame"
import { Reveal } from "@/components/motion/reveal"
import { ChatScreen, PERSONAS, type Persona } from "@/components/screens/chat"
import { CheckinScreen, FoodScreen, PlanScreen, SourcesScreen } from "@/components/screens/coach"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const ORB: Record<Persona, { glow: string; body: string; eyes: string; halo?: boolean }> = {
  Friend: { glow: "rgb(120 140 255 / 0.5)", body: "radial-gradient(circle at 40% 30%, #aab6ff, #5767d8 70%)", eyes: "round" },
  Guardian: { glow: "rgb(255 170 120 / 0.55)", body: "radial-gradient(circle at 40% 30%, #ffd9b8, #f08a5b 72%)", eyes: "round", halo: true },
  "Data nerd": { glow: "rgb(90 220 170 / 0.45)", body: "radial-gradient(circle at 40% 30%, #a8f0d2, #2f9c7c 72%)", eyes: "glasses" },
}
const VOICE: Record<Persona, string> = {
  Friend: "Warm and encouraging. Celebrates the small wins.",
  Guardian: "Protective and plain-spoken. Tells you when to stop.",
  "Data nerd": "Terse and numerical. Shows the working.",
}

function Orb({ persona, active, onPick }: { persona: Persona; active: boolean; onPick: () => void }) {
  const o = ORB[persona]
  return (
    <button onClick={onPick} aria-pressed={active} className="group flex w-24 flex-col items-center gap-3 sm:w-28">
      <span className={cn("relative grid size-20 place-items-center rounded-full transition-[transform,opacity,filter] duration-500 ease-out sm:size-24", active ? "scale-110" : "scale-90 opacity-50 blur-[1.5px] group-hover:opacity-80")} style={{ background: o.body, boxShadow: active ? `0 0 70px 6px ${o.glow}` : "none" }}>
        {o.halo && <span className="absolute -top-3 h-3 w-12 rounded-full border-2 border-white/80" />}
        <span className="flex gap-3">
          {[0, 1].map((e) => <span key={e} className={cn("block h-4 bg-white/95", o.eyes === "glasses" ? "w-6 rounded-md ring-2 ring-white/60 ring-offset-1 ring-offset-transparent" : "w-3.5 rounded-full")} />)}
        </span>
      </span>
      <span className={cn("rounded-pill border px-3 py-1 text-xs font-medium transition-colors", active ? "border-white/30 bg-white/10 text-white" : "border-transparent text-white/40")}>{persona}</span>
    </button>
  )
}

/** A stack of sticky cards, each with a working phone: logging food, chatting, check-ins, sources, a plan. */
function Card({ title, body, children, index }: { title: string; body: string; children: React.ReactNode; index: number }) {
  return (
    <article className="top-24 grid items-center gap-6 overflow-hidden rounded-card bg-[linear-gradient(120deg,#e9ecfb,#efe4f6_55%,#f9e8ee)] p-7 text-ink shadow-card sm:p-10 lg:sticky lg:h-[600px] lg:grid-cols-2 lg:gap-0 lg:px-14" style={{ top: 96 + index * 14 }}>
      <div className="lg:max-w-sm">
        <h3 className="display text-[clamp(1.75rem,3.5vw,2.6rem)]">{title}</h3>
        <p className="mt-3 text-[15px] leading-snug text-ink-2">{body}</p>
      </div>
      <div className="mx-auto w-[min(250px,70vw)] lg:mt-0 lg:justify-self-center">{children}</div>
    </article>
  )
}

/** The dark chapter: pick a coaching voice, and the chat below answers in it. */
export function Intelligence() {
  const [persona, setPersona] = useState<Persona>("Friend")
  useCanvasAction("Coach voice: next", () => setPersona(PERSONAS[(PERSONAS.indexOf(persona) + 1) % PERSONAS.length]), { group: "Intelligence" })
  return (
    <section id="intelligence" className="mt-24 scroll-mt-10 bg-night pt-20 pb-20 text-paper sm:mt-32 sm:pt-28">
      <Container>
        <div className="relative text-center">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-28 mx-auto h-72 w-[min(560px,90%)] transition-[background] duration-700" style={{ background: `conic-gradient(from 180deg at 50% 0%, transparent 38%, ${ORB[persona].glow} 50%, transparent 62%)`, filter: "blur(18px)" }} />
          <div className="relative flex justify-center gap-2 sm:gap-8" role="group" aria-label="Choose a coaching voice">
            {PERSONAS.map((p) => <Orb key={p} persona={p} active={p === persona} onPick={() => setPersona(p)} />)}
          </div>
          <p className="mt-4 h-5 text-sm text-white/50" aria-live="polite">{VOICE[persona]}</p>
          <Reveal>
            <h2 className="display mt-8 text-[clamp(2.25rem,6vw,3.75rem)]">
              <span className="text-white/45">Go deeper with</span>
              <br />Meridian Intelligence
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/60">Personal guidance and clear advice from a coach who has read everything you’ve ever tracked — 24/7.</p>
          </Reveal>
        </div>

        <div className="mt-14 space-y-5 sm:mt-20">
          <Card index={0} title="Understand what you eat" body="Log a meal in a tap and watch calories and macros settle against what your training needs today.">
            <PhoneFrame><FoodScreen /></PhoneFrame>
          </Card>
          <Card index={1} title="Get answers from your data" body="Ask anything in plain words. Switch the voice above and the same question gets a different kind of answer.">
            <PhoneFrame><ChatScreen persona={persona} onPersona={setPersona} /></PhoneFrame>
          </Card>
          <Card index={2} title="Proactive check-ins" body="Reminders, daily summaries and nudges that arrive when they help — and stay quiet when they don’t.">
            <PhoneFrame><CheckinScreen /></PhoneFrame>
          </Card>
          <Card index={3} title="Finds sources you can trust" body="When Meridian explains something, it shows the research it read — and the sentence that mattered.">
            <PhoneFrame><SourcesScreen /></PhoneFrame>
          </Card>
          <Card index={4} title="Personalized training plans" body="Workouts built from your recovery and your week, with a timer and a checklist to keep you honest.">
            <PhoneFrame><PlanScreen /></PhoneFrame>
          </Card>
        </div>
      </Container>
    </section>
  )
}
