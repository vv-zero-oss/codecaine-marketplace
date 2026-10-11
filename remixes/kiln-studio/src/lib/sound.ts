import { useSyncExternalStore } from "react"

/**
 * The header's sound switch, and the three small sounds it turns on: a soft
 * tick when a cell or row is hovered, a click when something is pressed, and
 * a low knock when a panel opens. Synthesised with Web Audio — no files —
 * and off until someone asks for it, remembered per visitor.
 */
const KEY = "kiln:sound"
let on = read()
let audio: AudioContext | null = null
let lastTick = 0
const listeners = new Set<() => void>()

function read() {
  try {
    return window.localStorage.getItem(KEY) === "on"
  } catch {
    return false
  }
}

export function setSound(next: boolean) {
  on = next
  try {
    window.localStorage.setItem(KEY, next ? "on" : "off")
  } catch {
    /* remembered for this page only */
  }
  if (next) play("press")
  listeners.forEach((l) => l())
}

export function useSound() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => on,
    () => false,
  )
}

export type Sound = "tick" | "press" | "open"

const VOICES: Record<Sound, { freq: number; to: number; dur: number; gain: number; type: OscillatorType }> = {
  tick: { freq: 2400, to: 1800, dur: 0.035, gain: 0.025, type: "sine" },
  press: { freq: 900, to: 420, dur: 0.07, gain: 0.06, type: "triangle" },
  open: { freq: 180, to: 90, dur: 0.18, gain: 0.09, type: "sine" },
}

export function play(sound: Sound) {
  if (!on) return
  const now = performance.now()
  // Hovering across a row of cells should patter, not buzz.
  if (sound === "tick" && now - lastTick < 45) return
  if (sound === "tick") lastTick = now
  try {
    audio ??= new AudioContext()
    if (audio.state === "suspended") void audio.resume()
    const v = VOICES[sound]
    const t = audio.currentTime
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.type = v.type
    osc.frequency.setValueAtTime(v.freq, t)
    osc.frequency.exponentialRampToValueAtTime(v.to, t + v.dur)
    gain.gain.setValueAtTime(v.gain, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + v.dur)
    osc.connect(gain).connect(audio.destination)
    osc.start(t)
    osc.stop(t + v.dur + 0.02)
  } catch {
    /* no audio on this device */
  }
}
