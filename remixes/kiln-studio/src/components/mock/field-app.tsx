import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { BatteryFull, Bookmark, Map as MapIcon, Mic, Signal, Square, Star, Sun, Wifi } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

/**
 * "Product", shown working: Fieldnote, a field-recording app of the kind the
 * studio ships. Record (the waveform listens and the clock runs), stop, and
 * the note lands at the top of Today. Star notes into Saved; see where
 * each was made on the Map.
 */
type Note = { id: number; title: string; place: string; seconds: number; x: number; y: number; starred: boolean; fresh?: boolean }

const START: Note[] = [
  { id: 1, title: "Tram 28, uphill", place: "Graça", seconds: 42, x: 62, y: 30, starred: true },
  { id: 2, title: "Fish market at six", place: "Cais do Sodré", seconds: 118, x: 34, y: 66, starred: false },
  { id: 3, title: "Rain on the tiles", place: "Alfama", seconds: 73, x: 70, y: 52, starred: false },
  { id: 4, title: "Fado through a door", place: "Mouraria", seconds: 96, x: 52, y: 40, starred: true },
]
const PLACES = ["Bairro Alto", "Príncipe Real", "Belém", "Chiado", "Campo de Ourique"]
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

/** A short, seeded waveform for a note's row. */
function MiniWave({ seed, className }: { seed: number; className?: string }) {
  return (
    <span aria-hidden className={cn("flex h-5 items-center gap-[2px]", className)}>
      {Array.from({ length: 22 }, (_, i) => (
        <span key={i} className="w-[2px] rounded-full bg-current" style={{ height: `${20 + Math.abs(Math.sin(seed * 7.3 + i * 1.7)) * 80}%` }} />
      ))}
    </span>
  )
}

export function FieldApp({ accent = "ember" }: { accent?: "ember" | "bone" }) {
  const reduced = useReducedMotion()
  const [tab, setTab] = useState<"today" | "map" | "saved">("today")
  const [notes, setNotes] = useState<Note[]>(START)
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [pin, setPin] = useState<number | null>(null)
  const tick = useRef<number | undefined>(undefined)

  useCanvasAction("Fieldnote: recording", (next) => setRecording(next ?? !recording), { on: recording, group: "What we make" })
  useCanvasAction("Fieldnote: tab", () => setTab((t) => (t === "today" ? "map" : t === "map" ? "saved" : "today")), { group: "What we make" })

  useEffect(() => {
    if (!recording) return
    setSeconds(0)
    tick.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(tick.current)
  }, [recording])

  const stop = () => {
    setRecording(false)
    play("press")
    const id = Date.now()
    const length = Math.max(seconds, 3)
    setNotes((n) => [
      { id, title: "New note", place: PLACES[n.length % PLACES.length], seconds: length, x: 20 + ((id / 7) % 60), y: 20 + ((id / 13) % 60), starred: false, fresh: true },
      ...n.map((x) => ({ ...x, fresh: false })),
    ])
    setTab("today")
  }

  const star = (id: number) => {
    play("tick")
    setNotes((n) => n.map((x) => (x.id === id ? { ...x, starred: !x.starred } : x)))
  }

  const accentBg = accent === "ember" ? "bg-ember text-bone-ink" : "bg-bone text-bone-ink"
  const list = tab === "saved" ? notes.filter((n) => n.starred) : notes

  return (
    <div className="relative flex size-full flex-col bg-[#0b0b0a] font-sans text-ink">
      {/* status bar */}
      <div className="flex h-[54px] shrink-0 items-end justify-between px-8 pb-2 text-[15px] font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-1.5">
          <Signal className="size-4" />
          <Wifi className="size-4" />
          <BatteryFull className="size-5" />
        </span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            className="absolute inset-0 overflow-y-auto px-5 pt-4 pb-40 [scrollbar-width:none]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <p className="font-mono text-[12px] tracking-[0.04em] text-ink-3 uppercase">{tab === "map" ? "Lisbon" : "Saturday 11 October"}</p>
            <h4 className="mt-1 text-[40px] leading-none font-semibold tracking-[-0.045em]">{tab === "today" ? "Today" : tab === "map" ? "Map" : "Saved"}</h4>

            {tab === "map" ? (
              <div className="relative mt-6 aspect-[3/4] overflow-hidden rounded-[22px] bg-panel">
                <svg viewBox="0 0 100 133" className="absolute inset-0 size-full" aria-hidden>
                  <path d="M0 110 C 30 100, 60 118, 100 104 L100 133 L0 133Z" fill="#14263a" />
                  {["M0 20 L100 34", "M10 0 L28 133", "M0 60 L100 52", "M62 0 L48 133", "M0 88 L100 80", "M80 0 L92 110"].map((d) => (
                    <path key={d} d={d} stroke="var(--color-line-3)" strokeWidth="1.4" fill="none" />
                  ))}
                  {["M30 30 L70 70", "M20 72 L60 40"].map((d) => (
                    <path key={d} d={d} stroke="var(--color-line-2)" strokeWidth="0.8" fill="none" />
                  ))}
                </svg>
                {notes.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setPin(pin === n.id ? null : n.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                    aria-label={n.title}
                  >
                    <span className={cn("block size-4 rounded-full shadow-[0_0_0_4px_rgb(253_142_80/0.25)] transition-transform duration-200", accentBg, pin === n.id && "scale-125")} />
                    {pin === n.id && (
                      <span className="absolute bottom-6 left-1/2 w-max -translate-x-1/2 rounded-[12px] bg-bone px-3 py-2 text-left text-[14px] text-bone-ink shadow-(--shadow-float)">
                        <span className="block font-semibold">{n.title}</span>
                        <span className="block text-[12px] text-bone-ink-2">
                          {n.place} · {fmt(n.seconds)}
                        </span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <ul className="mt-6 flex flex-col gap-2.5">
                {list.length === 0 && <li className="rounded-[20px] bg-panel p-5 text-[15px] text-ink-3">Star a note and it waits for you here.</li>}
                <AnimatePresence initial={false}>
                  {list.map((n) => (
                    <motion.li
                      key={n.id}
                      layout={!reduced}
                      initial={reduced ? false : { opacity: 0, transform: "translateY(-12px) scale(0.98)" }}
                      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className={cn("flex items-center gap-4 rounded-[20px] p-4 transition-colors duration-700", n.fresh ? "bg-ember/18" : "bg-panel")}
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-panel-2 text-ember">
                        <MiniWave seed={n.id} className="h-4 w-6 overflow-hidden" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[17px] font-semibold tracking-[-0.02em]">{n.title}</span>
                        <span className="block text-[14px] text-ink-3">
                          {n.place} · {fmt(n.seconds)}
                        </span>
                      </span>
                      <button type="button" onClick={() => star(n.id)} aria-label={n.starred ? "Unstar" : "Star"} className="grid size-10 place-items-center rounded-full active:scale-90">
                        <Star className={cn("size-5 transition-colors duration-200", n.starred ? "fill-ember text-ember" : "text-ink-4")} />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
        </AnimatePresence>

        {/* the record sheet */}
        <AnimatePresence>
          {recording && (
            <motion.div
              className="absolute inset-x-3 bottom-3 z-10 rounded-[30px] bg-panel-2 p-6 shadow-(--shadow-float)"
              initial={{ transform: "translateY(110%)" }}
              animate={{ transform: "translateY(0%)" }}
              exit={{ transform: "translateY(110%)" }}
              transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
            >
              <p className="flex items-center gap-2 font-mono text-[12px] text-ember uppercase">
                <span className="size-2 animate-pulse rounded-full bg-ember" /> Recording · {PLACES[notes.length % PLACES.length]}
              </p>
              <p className="mt-3 text-[56px] leading-none font-semibold tracking-[-0.05em] tabular-nums">{fmt(seconds)}</p>
              <div className="mt-5 flex h-16 items-center gap-[3px]" aria-hidden>
                {Array.from({ length: 36 }, (_, i) => (
                  <span
                    key={i}
                    className="w-1 flex-1 origin-center rounded-full bg-ember"
                    style={reduced ? { height: "40%" } : { height: "100%", animation: `sound-bar ${520 + ((i * 97) % 400)}ms ${(i * 53) % 300}ms ease-in-out infinite alternate` }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={stop}
                className="mx-auto mt-6 grid size-[72px] place-items-center rounded-full bg-bone text-bone-ink transition-transform duration-150 active:scale-90"
                aria-label="Stop recording"
              >
                <Square className="size-6 fill-current" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* record button */}
      {!recording && (
        <button
          type="button"
          onClick={() => {
            play("open")
            setRecording(true)
          }}
          className={cn("absolute bottom-[104px] left-1/2 z-10 grid size-[76px] -translate-x-1/2 place-items-center rounded-full shadow-(--shadow-ember) transition-transform duration-150 active:scale-90", accentBg)}
          aria-label="Record a note"
        >
          <Mic className="size-8" />
        </button>
      )}

      {/* tab bar */}
      <nav className="flex h-[88px] shrink-0 items-start justify-around border-t border-line bg-[#0b0b0a]/95 pt-3 backdrop-blur" aria-label="Fieldnote">
        {(
          [
            ["today", Sun, "Today"],
            ["map", MapIcon, "Map"],
            ["saved", Bookmark, "Saved"],
          ] as const
        ).map(([id, Icon, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setTab(id)
              play("tick")
            }}
            aria-current={tab === id ? "page" : undefined}
            className={cn("flex w-20 flex-col items-center gap-1 text-[12px] font-medium transition-colors duration-200", tab === id ? "text-ink" : "text-ink-4")}
          >
            <Icon className="size-6" strokeWidth={tab === id ? 2.2 : 1.7} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}
