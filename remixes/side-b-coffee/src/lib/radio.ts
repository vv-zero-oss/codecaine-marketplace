import { useSyncExternalStore } from "react"

/**
 * The shop radio. Every record in the house rotation is a little lo-fi loop
 * synthesised live with Web Audio — electric-piano chords, a round bass, a
 * soft kick and hat, and vinyl crackle underneath — so the footer player and
 * the turntable genuinely play, with no audio files to ship.
 *
 * One engine for the whole page: the turntable and the player are two views
 * of the same state, so dropping the needle on one lights up the other.
 */

export type Track = {
  id: string
  title: string
  artist: string
  /** nominal length in seconds, shown on the player; the loop advances after it */
  length: number
  bpm: number
  /** chords as MIDI note numbers, one per bar */
  chords: number[][]
  /** sleeve and label colours, as tokens */
  sleeve: string
  label: string
}

export const TRACKS: Track[] = [
  {
    id: "grounds",
    title: "Grounds for Celebration",
    artist: "The Burr Settings",
    length: 192,
    bpm: 84,
    chords: [[62, 65, 69, 72], [55, 59, 62, 65], [60, 64, 67, 71], [57, 60, 64, 67]],
    sleeve: "var(--color-ember)",
    label: "var(--color-honey)",
  },
  {
    id: "second-crack",
    title: "Second Crack",
    artist: "Mavis & the Slow Pour",
    length: 168,
    bpm: 76,
    chords: [[57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 65], [52, 55, 59, 62]],
    sleeve: "var(--color-sky)",
    label: "var(--color-page)",
  },
  {
    id: "bloom",
    title: "Bloom (Forty Seconds)",
    artist: "Low Fidelity Union",
    length: 210,
    bpm: 90,
    chords: [[60, 64, 67, 71], [65, 69, 72, 76], [62, 65, 69, 72], [67, 71, 74, 77]],
    sleeve: "var(--color-moss)",
    label: "var(--color-moss-soft)",
  },
  {
    id: "tin-tie",
    title: "Tin Tie Lullaby",
    artist: "Ines Arcadia",
    length: 245,
    bpm: 68,
    chords: [[64, 67, 71, 74], [60, 64, 67, 71], [62, 65, 69, 72], [59, 62, 65, 69]],
    sleeve: "var(--color-rust)",
    label: "var(--color-rust-soft)",
  },
]

type RadioState = {
  trackIndex: number
  playing: boolean
  /** seconds into the current track */
  elapsed: number
}

let state: RadioState = { trackIndex: 0, playing: false, elapsed: 0 }
const listeners = new Set<() => void>()
function emit(next: Partial<RadioState>) {
  state = { ...state, ...next }
  listeners.forEach((l) => l())
}

export function useRadio() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}

// ---------------------------------------------------------------- engine --

let ctx: AudioContext | null = null
let master: GainNode | null = null
let analyser: AnalyserNode | null = null
let crackle: AudioBufferSourceNode | null = null
let scheduler: number | null = null
let ticker: number | null = null
let nextBeatTime = 0
let beat = 0
let startedAt = 0
let offset = 0

function midiToHz(n: number) {
  return 440 * 2 ** ((n - 69) / 12)
}

function ensureContext() {
  if (ctx) return ctx
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  ctx = new AC()
  master = ctx.createGain()
  master.gain.value = 0
  const warmth = ctx.createBiquadFilter()
  warmth.type = "lowpass"
  warmth.frequency.value = 5200
  analyser = ctx.createAnalyser()
  analyser.fftSize = 64
  master.connect(warmth).connect(analyser).connect(ctx.destination)
  return ctx
}

function crackleBuffer(ac: AudioContext) {
  const length = ac.sampleRate * 4
  const buffer = ac.createBuffer(1, length, ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) {
    const hiss = (Math.random() * 2 - 1) * 0.012
    const pop = Math.random() < 0.0007 ? (Math.random() * 2 - 1) * 0.5 : 0
    data[i] = hiss + pop
  }
  return buffer
}

function voice(time: number, freq: number, dur: number, gain: number, type: OscillatorType, cutoff = 2200) {
  if (!ctx || !master) return
  const osc = ctx.createOscillator()
  const env = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  osc.type = type
  osc.frequency.value = freq
  osc.detune.value = (Math.random() - 0.5) * 8 // tape wobble
  filter.type = "lowpass"
  filter.frequency.value = cutoff
  env.gain.setValueAtTime(0.0001, time)
  env.gain.exponentialRampToValueAtTime(gain, time + 0.012)
  env.gain.exponentialRampToValueAtTime(0.0001, time + dur)
  osc.connect(filter).connect(env).connect(master)
  osc.start(time)
  osc.stop(time + dur + 0.05)
}

function drum(time: number, kind: "kick" | "hat") {
  if (!ctx || !master) return
  if (kind === "kick") {
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.frequency.setValueAtTime(110, time)
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.18)
    env.gain.setValueAtTime(0.5, time)
    env.gain.exponentialRampToValueAtTime(0.0001, time + 0.32)
    osc.connect(env).connect(master)
    osc.start(time)
    osc.stop(time + 0.35)
  } else {
    const len = Math.floor(ctx.sampleRate * 0.04)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len)
    const src = ctx.createBufferSource()
    const hp = ctx.createBiquadFilter()
    const env = ctx.createGain()
    hp.type = "highpass"
    hp.frequency.value = 7000
    env.gain.value = 0.05
    src.buffer = buf
    src.connect(hp).connect(env).connect(master)
    src.start(time)
  }
}

function scheduleAhead() {
  if (!ctx) return
  const track = TRACKS[state.trackIndex]
  const eighth = 60 / track.bpm / 2
  while (nextBeatTime < ctx.currentTime + 0.12) {
    const step = beat % 32 // 4 bars of 8 eighths
    const bar = Math.floor(step / 8)
    const chord = track.chords[bar % track.chords.length]
    if (step % 8 === 0) chord.forEach((n) => voice(nextBeatTime, midiToHz(n), eighth * 7, 0.07, "triangle"))
    if (step % 8 === 3) chord.slice(1).forEach((n) => voice(nextBeatTime + 0.02, midiToHz(n + 12), eighth * 2, 0.025, "sine", 3200))
    if (step % 4 === 0) voice(nextBeatTime, midiToHz(chord[0] - 24), eighth * 3, 0.16, "sine", 400)
    if (step % 8 === 0 || step % 8 === 5) drum(nextBeatTime, "kick")
    if (step % 2 === 1) drum(nextBeatTime, "hat")
    nextBeatTime += eighth * (step % 2 === 0 ? 1.08 : 0.92) // a lazy swing
    beat++
  }
}

function startClock() {
  stopClock()
  startedAt = performance.now()
  ticker = window.setInterval(() => {
    const elapsed = offset + (performance.now() - startedAt) / 1000
    const track = TRACKS[state.trackIndex]
    if (elapsed >= track.length) {
      radio.next()
      return
    }
    emit({ elapsed })
  }, 250)
}
function stopClock() {
  if (ticker != null) window.clearInterval(ticker)
  ticker = null
}

export const radio = {
  async play(trackIndex = state.trackIndex) {
    const ac = ensureContext()
    if (ac.state === "suspended") await ac.resume()
    const changed = trackIndex !== state.trackIndex
    if (changed) offset = 0
    else offset = state.elapsed
    beat = 0
    nextBeatTime = ac.currentTime + 0.06
    if (!crackle) {
      crackle = ac.createBufferSource()
      crackle.buffer = crackleBuffer(ac)
      crackle.loop = true
      crackle.connect(master!)
      crackle.start()
    }
    master!.gain.cancelScheduledValues(ac.currentTime)
    master!.gain.setTargetAtTime(0.55, ac.currentTime, 0.08)
    if (scheduler != null) window.clearInterval(scheduler)
    scheduler = window.setInterval(scheduleAhead, 25)
    emit({ trackIndex, playing: true, elapsed: offset })
    startClock()
  },
  pause() {
    if (scheduler != null) window.clearInterval(scheduler)
    scheduler = null
    stopClock()
    if (ctx && master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.06)
    emit({ playing: false })
  },
  toggle(trackIndex?: number) {
    if (state.playing && (trackIndex == null || trackIndex === state.trackIndex)) radio.pause()
    else void radio.play(trackIndex ?? state.trackIndex)
  },
  next() {
    const i = (state.trackIndex + 1) % TRACKS.length
    if (state.playing) void radio.play(i)
    else emit({ trackIndex: i, elapsed: 0 })
  },
  previous() {
    if (state.elapsed > 3) {
      emit({ elapsed: 0 })
      if (state.playing) void radio.play(state.trackIndex)
      return
    }
    const i = (state.trackIndex - 1 + TRACKS.length) % TRACKS.length
    if (state.playing) void radio.play(i)
    else emit({ trackIndex: i, elapsed: 0 })
  },
  /** 0–1 levels across a handful of bands, for the meters */
  levels(bands = 5): number[] {
    if (!analyser || !state.playing) return Array(bands).fill(0)
    const data = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(data)
    const per = Math.floor(data.length / bands)
    return Array.from({ length: bands }, (_, b) => {
      let sum = 0
      for (let i = b * per; i < (b + 1) * per; i++) sum += data[i]
      return sum / per / 255
    })
  },
}

export function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}
