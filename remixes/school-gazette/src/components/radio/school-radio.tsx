import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { animate, useReducedMotion } from "motion/react"
import { Power, Volume2, VolumeX } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { RotaryKnob } from "@/components/ui/rotary-knob"
import { Switch } from "@/components/ui/switch"
import { DIAL_MAX, DIAL_MIN, STATIONS, type Station } from "@/data/radio"
import { cn } from "@/lib/utils"

const GLYPHS = "░▒▓█▌▐╳#%&*+~"

type StationId = Station["id"]

/** 0–100 on the knob ⇄ MHz on the dial. */
const toFreq = (tune: number) => DIAL_MIN + (tune / 100) * (DIAL_MAX - DIAL_MIN)
const toTune = (freq: number) => ((freq - DIAL_MIN) / (DIAL_MAX - DIAL_MIN)) * 100

/** Hiss, made on demand: looping white noise through a gain node. */
function useStatic() {
  const ctx = useRef<AudioContext | null>(null)
  const gain = useRef<GainNode | null>(null)

  const start = useCallback(() => {
    if (ctx.current) return
    const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const audio = new AudioCtx()
    const buffer = audio.createBuffer(1, audio.sampleRate * 2, audio.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    const source = audio.createBufferSource()
    source.buffer = buffer
    source.loop = true
    const filter = audio.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = 2400
    const level = audio.createGain()
    level.gain.value = 0
    source.connect(filter).connect(level).connect(audio.destination)
    source.start()
    ctx.current = audio
    gain.current = level
  }, [])

  const level = useCallback((value: number) => {
    if (gain.current && ctx.current) gain.current.gain.setTargetAtTime(value, ctx.current.currentTime, 0.04)
  }, [])

  const stop = useCallback(() => {
    void ctx.current?.close()
    ctx.current = null
    gain.current = null
  }, [])

  return { start, level, stop }
}

/**
 * The school's tabletop radio, and where the daily radio brief is read.
 *
 * Power it on, turn the TUNE knob (or press a preset key) and the brief for
 * that station types itself out on the paper strip. Between stations there is
 * static — real, through the Web Audio API, scaled by the volume knob. READ
 * ALOUD speaks the brief with the browser's speech voice. Nothing plays until
 * you press something, and nothing loops in the editor.
 *
 * Every knob is a scalar prop (`station`, `powered`, `volume`, `typeSpeed`) so
 * it can be restyled and re-set from the editor without opening the code.
 */
export function SchoolRadio({
  station = "morning",
  powered = true,
  volume = 55,
  typeSpeed = 18,
  className,
}: {
  station?: StationId
  powered?: boolean
  volume?: number
  /** ms per typed character */
  typeSpeed?: number
  className?: string
}) {
  const startFreq = STATIONS.find((s) => s.id === station)?.freq ?? STATIONS[0].freq
  const [on, setOn] = useState(powered)
  const [freq, setFreq] = useState(startFreq)
  const [vol, setVol] = useState(volume)
  const [speaking, setSpeaking] = useState(false)
  const [typed, setTyped] = useState(0)
  const [noise, setNoise] = useState("")
  const [meter, setMeter] = useState(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const sweep = useRef<ReturnType<typeof animate> | null>(null)
  const hiss = useStatic()
  const unlocked = useRef(false)

  useEffect(() => setOn(powered), [powered])
  useEffect(() => setVol(volume), [volume])
  useEffect(() => {
    const target = STATIONS.find((s) => s.id === station)
    if (target) tuneTo(target.freq)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [station])

  // What the dial is on, and how clearly.
  const nearest = STATIONS.reduce((best, s) => (Math.abs(s.freq - freq) < Math.abs(best.freq - freq) ? s : best), STATIONS[0])
  const distance = Math.abs(nearest.freq - freq)
  const tuned = on && distance <= 0.55
  const clarity = on ? Math.max(0, 1 - distance / 2.6) : 0
  const script = nearest.lines.join("\n\n")

  const tuneTo = (target: number) => {
    sweep.current?.stop()
    if (reduced || designing) return setFreq(target)
    sweep.current = animate(freq, target, { duration: 0.95, ease: [0.23, 1, 0.32, 1], onUpdate: setFreq })
  }

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel()
    setSpeaking(false)
  }, [])

  const power = (next: boolean) => {
    setOn(next)
    if (next) {
      unlocked.current = true
      hiss.start()
    } else {
      stopSpeaking()
      hiss.stop()
      unlocked.current = false
    }
  }

  // Type the brief when a station comes in clear; start over when it changes.
  useEffect(() => {
    if (!tuned) return setTyped(0)
    if (reduced || designing) return setTyped(script.length)
    setTyped(0)
    const id = window.setInterval(() => setTyped((n) => (n >= script.length ? (window.clearInterval(id), n) : n + 1)), typeSpeed)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tuned, nearest.id, typeSpeed, reduced, designing])

  // Between stations: the strip fills with noise, and the speaker with hiss.
  useEffect(() => {
    if (!on || tuned) return setNoise("")
    if (reduced || designing) return setNoise("· · · signal lost · · ·")
    const id = window.setInterval(() => {
      setNoise(Array.from({ length: 150 }, () => (Math.random() > 0.78 ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""))
    }, 90)
    return () => window.clearInterval(id)
  }, [on, tuned, reduced, designing])

  useEffect(() => {
    if (unlocked.current) hiss.level(on && !tuned ? (vol / 100) * 0.16 * (1 - clarity * 0.8) : on ? (vol / 100) * 0.012 : 0)
  }, [on, tuned, vol, clarity, hiss])

  // The VU needle: lively while a voice is on, flickering with the static otherwise.
  useEffect(() => {
    if (!on) return setMeter(0)
    if (reduced || designing) return setMeter(tuned ? 0.55 : 0.2)
    const id = window.setInterval(() => setMeter(tuned ? (speaking ? 0.4 + Math.random() * 0.55 : 0.35 + Math.random() * 0.15) : Math.random() * 0.35), 130)
    return () => window.clearInterval(id)
  }, [on, tuned, speaking, reduced, designing])

  useEffect(
    () => () => {
      sweep.current?.stop()
      window.speechSynthesis?.cancel()
      hiss.stop()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const readAloud = () => {
    if (!tuned) return
    const synth = window.speechSynthesis
    if (!synth) return
    if (speaking) return stopSpeaking()
    const utterance = new SpeechSynthesisUtterance(`${nearest.name}. ${nearest.lines.join(" ")}`)
    utterance.volume = vol / 100
    utterance.rate = 0.95
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    synth.cancel()
    synth.speak(utterance)
    setSpeaking(true)
  }

  useEffect(() => {
    if (!tuned && speaking) stopSpeaking()
  }, [tuned, speaking, stopSpeaking])

  useCanvasAction("Radio power", (next) => power(next ?? !on), { group: "Radio", on })
  useCanvasAction("Tune: Morning Brief", () => (!on && power(true), tuneTo(89.5)), { group: "Radio" })
  useCanvasAction("Tune: Sports Desk", () => (!on && power(true), tuneTo(93.1)), { group: "Radio" })
  useCanvasAction("Tune: Clubs & Societies", () => (!on && power(true), tuneTo(97.4)), { group: "Radio" })
  useCanvasAction("Tune: Canteen Report", () => (!on && power(true), tuneTo(102.2)), { group: "Radio" })
  useCanvasAction("Between stations (static)", () => (!on && power(true), tuneTo(91.2)), { group: "Radio" })

  const needle = toTune(freq)

  return (
    <section
      aria-label="Marlowe FM radio"
      className={cn("relative mx-auto w-full max-w-[980px]", className)}
    >
      {/* the cabinet */}
      <div className="relative rounded-cabinet border-[3px] border-wood-dark bg-[linear-gradient(180deg,var(--wood-light),var(--wood)_38%,var(--wood-dark))] p-3 shadow-cabinet sm:p-5">
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[image:var(--fibres)] opacity-60 mix-blend-multiply" />
        {/* brass nameplate */}
        <div className="relative mx-auto -mt-1 mb-3 flex w-fit items-center gap-3 rounded-full border-2 border-brass-deep bg-[linear-gradient(180deg,#f1d98f,var(--brass)_50%,var(--brass-deep))] px-5 py-1 shadow-[0_2px_0_var(--wood-dark)]">
          <span className="font-display text-lg leading-none text-ink">Marlowe&nbsp;FM</span>
          <span className="kicker text-ink/70">Deluxe · Est. 1961</span>
        </div>

        <div className="relative grid gap-3 sm:gap-5 md:grid-cols-[5fr_7fr]">
          {/* speaker */}
          <div className="relative flex flex-col gap-3 rounded-[18px] border-2 border-black bg-bakelite p-3 shadow-deboss">
            <div className="flex items-center justify-between gap-3">
              <div className={cn("flex items-center gap-2 rounded-[3px] border border-black px-2 py-1 font-type text-[0.65rem] tracking-[0.2em] transition-colors", on ? "bg-rust-deep text-paper-bright shadow-[0_0_14px_var(--rust)]" : "bg-black/40 text-paper-light/30")}>
                <span aria-hidden className={cn("size-2 rounded-full", on ? "animate-blink bg-paper-bright" : "bg-paper-light/20")} />
                ON AIR
              </div>
              <VuMeter level={meter} />
            </div>
            <div
              aria-hidden
              className="aspect-[5/4] rounded-[12px] border border-black shadow-[inset_0_0_26px_rgb(0_0_0/0.8)] md:aspect-auto md:min-h-40 md:flex-1"
              style={{
                backgroundImage: "radial-gradient(circle, #000 2.2px, transparent 2.8px), repeating-linear-gradient(45deg, #6b5a3c 0 3px, #54452d 3px 6px)",
                backgroundSize: "11px 11px, auto",
              }}
            />
          </div>

          {/* controls */}
          <div className="relative flex flex-col gap-3 sm:gap-4">
            {/* dial window */}
            <div className="relative overflow-hidden rounded-[12px] border-2 border-black bg-lcd px-3 pt-6 pb-3 shadow-deboss sm:px-5">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_srgb,var(--led-amber)_45%,transparent),transparent_70%)] transition-opacity duration-500" style={{ opacity: on ? 1 : 0.08 }} />
              <div className="relative h-[5.5rem] transition-opacity duration-500 sm:h-24" style={{ opacity: on ? 1 : 0.35 }}>
                {STATIONS.map((s) => (
                  <span
                    key={s.id}
                    className={cn("absolute top-0 -translate-x-1/2 whitespace-nowrap font-type text-[0.5rem] tracking-wider uppercase transition-colors sm:text-[0.58rem]", s.id === nearest.id && tuned ? "text-paper-bright" : "text-led/70")}
                    style={{ left: `${toTune(s.freq)}%` }}
                  >
                    {s.name.split(" ")[0]}
                  </span>
                ))}
                <div className="absolute inset-x-0 bottom-5 flex h-8 items-end justify-between">
                  {Array.from({ length: 41 }, (_, i) => (
                    <i key={i} className={cn("block w-px bg-led/80", i % 4 === 0 ? "h-8" : "h-4")} />
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-between font-type text-[0.6rem] text-led/80 tabular-nums">
                  {[88, 92, 96, 100, 104, 108].map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
                {/* needle */}
                <div aria-hidden className="absolute -top-1 bottom-4 w-[2px] -translate-x-1/2 bg-rust shadow-[0_0_8px_var(--rust)]" style={{ left: `${needle}%` }}>
                  <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-rust" />
                </div>
              </div>
              <div className="relative mt-1 flex items-end justify-between gap-3">
                <p className="font-type text-[0.62rem] tracking-[0.18em] text-led/80 uppercase">
                  {on ? (tuned ? nearest.name : "Searching…") : "Standby"}
                </p>
                <p className="font-display text-2xl leading-none text-led tabular-nums [text-shadow:0_0_10px_var(--led-amber)]" aria-live="polite">
                  {on ? toFreq(needle).toFixed(1) : "--.-"}
                  <span className="ml-1 font-type text-[0.6rem] tracking-widest">MHz</span>
                </p>
              </div>
              {/* tuning eye */}
              <span aria-hidden className="absolute top-2 right-3 size-4 rounded-full border border-black transition-[background-color,box-shadow] duration-200" style={{ background: on ? `color-mix(in srgb, var(--led-green) ${Math.round(clarity * 100)}%, #12210f)` : "#0b0b0a", boxShadow: on && clarity > 0.5 ? "0 0 10px var(--led-green)" : "none" }} />
            </div>

            {/* knobs, presets, power */}
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 rounded-[12px] border-2 border-black/60 bg-black/25 px-3 py-3 shadow-[inset_0_2px_6px_rgb(0_0_0/0.5)]">
              <RotaryKnob label="Tune" value={needle} onValueChange={(v) => { sweep.current?.stop(); setFreq(toFreq(v)) }} step={0.25} min={0} max={100} />
              <RotaryKnob label="Volume" value={vol} onValueChange={setVol} />
              <div className="flex flex-col items-center gap-2">
                <Switch checked={on} onCheckedChange={power} aria-label="Power" />
                <span className="kicker flex items-center gap-1 text-paper-light/80"><Power className="size-3" />Power</span>
              </div>
            </div>

            {/* piano-key presets */}
            <div role="group" aria-label="Station presets" className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {STATIONS.map((s, i) => {
                const active = tuned && nearest.id === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={false}
                    aria-pressed={active}
                    onClick={() => { if (!on) power(true); tuneTo(s.freq) }}
                    className={cn(
                      "group relative min-h-16 touch-manipulation rounded-b-[8px] rounded-t-[3px] border-2 border-black px-1 pt-2 pb-1.5 text-center font-type text-[0.58rem] leading-tight tracking-wider uppercase transition-[transform,box-shadow,background-color] duration-[var(--duration-press)] ease-[var(--ease-press)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust sm:text-[0.64rem]",
                      active
                        ? "translate-y-[3px] bg-paper-dark text-ink shadow-[0_1px_0_#000] "
                        : "bg-paper-bright text-ink shadow-[0_5px_0_#000] hover:bg-paper-light active:translate-y-[3px] active:shadow-[0_2px_0_#000]",
                    )}
                  >
                    <span className="block font-display text-lg leading-none">{i + 1}</span>
                    {s.name.split(" ")[0]}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* the slot the strip comes out of */}
        <div aria-hidden className="relative mx-auto mt-4 h-2.5 w-[88%] rounded-full bg-black shadow-[inset_0_2px_3px_rgb(0_0_0/0.9),0_1px_0_rgb(255_255_255/0.2)]" />
      </div>

      {/* the radio brief: a paper strip printing out of the slot */}
      <article className="relative z-10 mx-auto -mt-2 w-[min(92%,34rem)] text-ink origin-top -rotate-[0.6deg] bg-paper-bright px-5 pt-6 pb-8 shadow-[0_14px_24px_-10px_rgb(0_0_0/0.5)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),97%_100%,94%_calc(100%-6px),91%_100%,88%_calc(100%-6px),85%_100%,82%_calc(100%-6px),79%_100%,76%_calc(100%-6px),73%_100%,70%_calc(100%-6px),67%_100%,64%_calc(100%-6px),61%_100%,58%_calc(100%-6px),55%_100%,52%_calc(100%-6px),49%_100%,46%_calc(100%-6px),43%_100%,40%_calc(100%-6px),37%_100%,34%_calc(100%-6px),31%_100%,28%_calc(100%-6px),25%_100%,22%_calc(100%-6px),19%_100%,16%_calc(100%-6px),13%_100%,10%_calc(100%-6px),7%_100%,4%_calc(100%-6px),0_100%)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[image:var(--grain)] opacity-50 mix-blend-multiply" />
        <header className="relative mb-3 flex flex-wrap items-baseline justify-between gap-x-4 border-b-2 border-dashed border-ink pb-2">
          <h3 className="display text-3xl">Radio brief</h3>
          <p className="kicker text-ink-faint">{on ? (tuned ? nearest.slot : "No station") : "Radio is off"}</p>
        </header>
        <div className="relative min-h-44 font-type text-[0.86rem] leading-relaxed whitespace-pre-wrap text-ink sm:text-[0.92rem]">
          <p className="sr-only">{on && tuned ? script : ""}</p>
          <p aria-hidden>
            {!on ? "The radio is switched off. Flip the POWER switch, then turn TUNE or press a preset key." : tuned ? script.slice(0, typed) : noise}
            {on && tuned && typed < script.length ? <span className="ml-0.5 inline-block h-[1em] w-2 translate-y-0.5 animate-blink bg-ink" /> : null}
          </p>
        </div>
        <footer className="relative mt-4 flex items-center justify-between gap-3 border-t-2 border-dashed border-ink pt-3">
          <button
            type="button"
            onClick={readAloud}
            disabled={!tuned}
            className="inline-flex min-h-11 items-center gap-2 rounded-key border-2 border-ink bg-rust px-4 font-type text-[0.72rem] tracking-[0.12em] text-paper-bright uppercase shadow-key transition-[transform,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-press)] enabled:active:translate-y-[3px] enabled:active:shadow-key-down disabled:bg-paper-dark disabled:text-ink-faint disabled:shadow-none"
          >
            {speaking ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            {speaking ? "Stop" : "Read aloud"}
          </button>
          <span className="kicker text-ink-faint">Strip no. {String(STATIONS.findIndex((s) => s.id === nearest.id) + 1).padStart(3, "0")}</span>
        </footer>
      </article>
    </section>
  )
}

/** A half-dial meter with a needle that swings to `level` (0–1). */
function VuMeter({ level }: { level: number }) {
  return (
    <div aria-hidden className="relative h-9 w-16 overflow-hidden rounded-t-[40px] rounded-b-[3px] border-2 border-black bg-paper-bright shadow-[inset_0_2px_4px_rgb(0_0_0/0.4)]">
      <div className="absolute inset-x-1 bottom-0 flex h-3 justify-between font-type text-[0.4rem] text-ink-faint"><span>0</span><span className="text-rust">+3</span></div>
      <div
        className="absolute bottom-[-3px] left-1/2 h-8 w-px origin-bottom bg-rust transition-transform duration-150 ease-out"
        style={{ transform: `rotate(${-55 + level * 110}deg)` }}
      />
      <span className="absolute bottom-[-4px] left-1/2 size-2 -translate-x-1/2 rounded-full bg-ink" />
    </div>
  )
}
