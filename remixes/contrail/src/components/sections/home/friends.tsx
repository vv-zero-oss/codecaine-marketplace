import { useEffect, useRef, useState } from "react"
import { Check, Plane, PlaneLanding, PlaneTakeoff, RotateCcw, Send } from "lucide-react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { TailMark } from "@/components/mock/app-ui"
import { FlightMap } from "@/components/mock/flight-map"
import { Phone } from "@/components/mock/phone"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { Switch } from "@/components/ui/switch"
import { avatar, PEOPLE, PHOTOS, pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

const FRIENDS = [
  { name: "Ama", route: "SFO → JFK", note: "Lands 6:32 pm · early", photo: PEOPLE[0], tone: "text-green" },
  { name: "Theo", route: "LHR → LIS", note: "Boarding at gate 22", photo: PEOPLE[1], tone: "text-blue" },
  { name: "Ines & Kai", route: "HND → SFO", note: "Over the Pacific · 4h left", photo: PEOPLE[2], tone: "text-ink-2" },
  { name: "Dad", route: "AUS → ORD", note: "Delayed 25 min", photo: PEOPLE[4], tone: "text-red" },
]

/** The friends list, on a phone. */
function FriendsScreen() {
  return (
    <div className="absolute inset-0 bg-page pt-[3.6em]">
      <p className="px-[1.1em] text-[1.3em] font-bold tracking-[-0.03em]">Friends' Flights</p>
      <p className="px-[1.1em] text-[0.62em] text-ink-3">4 people sharing with you</p>
      <ul className="mt-[0.8em]">
        {FRIENDS.map((f) => (
          <li key={f.name} className="flex items-center gap-[0.6em] border-t border-line px-[1.1em] py-[0.7em]">
            <img src={avatar(f.photo, 72)} alt="" className="size-[2.2em] rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8em] font-semibold">{f.name} <span className="font-normal text-ink-3">· {f.route}</span></p>
              <p className={cn("truncate text-[0.66em] font-medium", f.tone)}>{f.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ALERTS = [
  { key: "departs", label: "Departing today", Icon: Plane, title: "Ama is flying today", body: "NW 214 to New York departs in 4h" },
  { key: "takeoff", label: "Took off", Icon: PlaneTakeoff, title: "Ama took off for New York", body: "Lands in 5h 30m · 6:34 pm local" },
  { key: "delay", label: "Delays", Icon: Plane, title: "Ama's flight is 15 min late", body: "New arrival 6:49 pm" },
  { key: "landed", label: "Landed", Icon: PlaneLanding, title: "Ama landed in New York", body: "6:32 pm (22 min early) · 24°" },
] as const

/** Choose which alerts you get; the stack replays with just those. */
function AlertsCard() {
  const [on, setOn] = useState<Record<string, boolean>>({ departs: true, takeoff: true, delay: false, landed: true })
  const [beat, setBeat] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-15% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const list = ALERTS.filter((a) => on[a.key])
  const still = reduced || designing

  useEffect(() => {
    if (still || !inView) return
    if (beat > list.length + 2) return
    const id = window.setTimeout(() => setBeat((b) => b + 1), beat === 0 ? 400 : 1100)
    return () => window.clearTimeout(id)
  }, [beat, inView, still, list.length])

  const shown = still ? list.length : Math.min(beat, list.length)
  const toggle = (key: string, value: boolean) => {
    setOn((o) => ({ ...o, [key]: value }))
    setBeat(0)
  }

  return (
    <article className="flex h-full flex-col rounded-(--radius-panel) bg-panel p-7 md:p-8">
      <p className="max-w-[34ch] text-ink-2"><span className="font-semibold text-ink">Pick what they hear.</span> Each person chooses the moments they care about — some want every gate change, most just want “landed”.</p>
      <div ref={ref} className="mt-6 flex flex-col gap-5">
        <ul className="grid grid-cols-1 gap-1 rounded-(--radius-card) bg-raised p-2 shadow-(--shadow-xs) sm:grid-cols-2">
          {ALERTS.map((a) => (
            <li key={a.key}>
              <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 text-[14.5px] transition-colors hover:bg-panel">
                <span className="flex items-center gap-2"><a.Icon className="size-4 text-ink-3" /> {a.label}</span>
                <Switch checked={on[a.key]} onCheckedChange={(v) => toggle(a.key, v)} aria-label={`${a.label} alerts`} />
              </label>
            </li>
          ))}
        </ul>
        <div className="relative flex min-h-[300px] flex-col gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            {list.slice(0, shown).map((a) => (
              <motion.div
                key={a.key}
                layout={!reduced}
                initial={reduced ? { opacity: 0 } : { opacity: 0, transform: "translateY(10px) scale(0.97)" }}
                animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                exit={{ opacity: 0, transform: "scale(0.97)" }}
                transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3 rounded-(--radius-card) bg-raised px-3.5 py-3 shadow-(--shadow-card)"
              >
                <img src={avatar(PEOPLE[0], 64)} alt="" className="size-8 shrink-0 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold">{a.title}</p>
                  <p className="truncate text-[12.5px] text-ink-3">{a.body}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {list.length === 0 ? <p className="m-auto text-center text-[14px] text-ink-3">Nothing on — they won't hear a thing.</p> : null}
          <button type="button" onClick={() => setBeat(0)} className="mt-auto inline-flex h-9 w-fit items-center gap-1.5 rounded-full px-3 text-[13.5px] text-ink-2 transition-colors hover:bg-raised hover:text-ink">
            <RotateCcw className="size-3.5" /> Replay
          </button>
        </div>
      </div>
    </article>
  )
}

const STICKERS = ["day", "night", "violet"] as const

/** A story that looks good: a photo, a boarding-stub sticker, and a send. */
function StoryCard() {
  const [sticker, setSticker] = useState<(typeof STICKERS)[number]>("day")
  const [sent, setSent] = useState(false)
  useCanvasAction("Story — shared", (next) => setSent(next ?? !sent), { on: sent, group: "Friends" })
  useEffect(() => {
    if (!sent) return
    const id = window.setTimeout(() => setSent(false), 2200)
    return () => window.clearTimeout(id)
  }, [sent])
  const skin = {
    day: "bg-raised text-ink",
    night: "bg-night text-night-fg",
    violet: "bg-violet text-white",
  }[sticker]
  return (
    <article className="flex h-full flex-col rounded-(--radius-panel) bg-panel p-7 md:p-8">
      <p className="max-w-[34ch] text-ink-2"><span className="font-semibold text-ink">Stories worth posting.</span> Share a trip to your stories with a sticker that's actually nice to look at.</p>
      <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-6 sm:flex-row">
        <div className="relative aspect-[9/16] w-[200px] overflow-hidden rounded-[22px] shadow-(--shadow-float)">
          <img src={pexels(PHOTOS.coast, 500)} alt="An aerial view of a beach and a coastal city" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-x-0 top-0 flex gap-1 p-2">
            <span className="h-0.5 flex-1 rounded-full bg-white" />
            <span className="h-0.5 flex-1 rounded-full bg-white/40" />
          </div>
          <motion.div layout className={cn("absolute right-3 bottom-4 left-3 rounded-[12px] p-3 shadow-(--shadow-float) transition-colors duration-(--duration-swap)", skin)}>
            <p className="flex items-center justify-between font-data text-[11px] font-semibold tracking-[0.1em] opacity-70">
              <span>BOARDING</span> <TailMark airline="SK" className="size-4" />
            </p>
            <p className="mt-1 flex items-center gap-2 font-data text-[28px] leading-none font-semibold">
              SYD <Plane className="size-4" /> HND
            </p>
            <p className="mt-1.5 flex justify-between font-data text-[11px] opacity-70"><span>SK 21 · 25 SEP</span><span>SEAT 2A</span></p>
          </motion.div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-medium text-ink-3">Sticker</p>
          <div className="flex gap-2">
            {STICKERS.map((s) => (
              <button
                key={s}
                type="button"
                aria-label={`${s} sticker`}
                aria-pressed={sticker === s}
                onClick={() => setSticker(s)}
                className={cn(
                  "size-9 rounded-full ring-offset-2 ring-offset-panel transition-[box-shadow,transform] duration-(--duration-hover) active:scale-[0.92]",
                  s === "day" ? "bg-white shadow-(--shadow-field)" : s === "night" ? "bg-night" : "bg-violet",
                  sticker === s && "ring-2 ring-ink",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSent(true)}
            className={cn(
              "mt-3 inline-flex h-11 items-center gap-2 rounded-full px-4 text-[14.5px] font-medium transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]",
              sent ? "bg-green text-white" : "bg-ink text-white hover:bg-ink-2",
            )}
          >
            {sent ? <Check className="size-4" strokeWidth={2.6} /> : <Send className="size-4" />}
            {sent ? "Shared" : "Share to stories"}
          </button>
        </div>
      </div>
    </article>
  )
}

/**
 * Friends and family: the people waiting for you get told without asking.
 * One wide card with the friends list and map, then the alert picker and the
 * story sticker — both work.
 */
export function Friends() {
  return (
    <section id="friends" data-theme="day" className="bg-page py-section">
      <Container>
        <Reveal>
          <h2 className="type-display max-w-[16ch] text-h1 text-balance">Your flight, shared with the people who ask.</h2>
          <p className="mt-6 max-w-[56ch] text-lead text-ink-2">
            Add someone once and they get your flights automatically — status, delays and the moment you land. You'll never have to paste a flight number into a group chat again.
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <article className="relative grid overflow-hidden rounded-(--radius-panel) bg-panel md:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
              <h3 className="max-w-[14ch] text-h3 font-semibold">Never hear “what time do you land?” again.</h3>
              <p className="max-w-[38ch] text-ink-2">Choose who sees your flying and for how long. They can follow along on their phone, even without Contrail, from a link that expires when you land.</p>
            </div>
            <div className="relative h-[420px] md:h-[480px]">
              <Phone className="absolute top-14 left-[6%] w-[220px] -rotate-[14deg] sm:left-[14%]">
                <div className="absolute inset-0">
                  <FlightMap region="north-america" routes="SFO-JFK,AUS-ORD,HND-SFO" width={300} height={640} duration={16} />
                </div>
              </Phone>
              <Phone className="absolute top-2 right-[4%] w-[220px] rotate-[10deg] sm:right-[12%]">
                <FriendsScreen />
              </Phone>
            </div>
          </article>
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Reveal><AlertsCard /></Reveal>
          <Reveal delay={0.06}><StoryCard /></Reveal>
        </div>
      </Container>
    </section>
  )
}
