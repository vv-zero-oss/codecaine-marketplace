import { AnimatePresence, motion } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"

import { Bracket } from "@/components/ui/bracket"
import type { Person } from "@/content"
import { ease } from "@/lib/motion"

const WORDS_PER_SECOND = 2.6

function clock(seconds: number) {
  const s = Math.max(0, Math.round(seconds))
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`
}

/**
 * The story, and a way to hear it.
 *
 * `[ – ]` folds the text away (and `[ + ]` brings it back) for anyone who
 * came for the picture. The player under it reads the story aloud with the
 * browser's own voice — no audio files to host — and its line fills as the
 * voice gets through the words. Where the browser has no voice, the player is
 * not shown.
 */
export function StoryText({ person }: { person: Person }) {
  const [open, setOpen] = useState(true)
  const text = person.story.join(" ")
  const words = useMemo(() => text.split(/\s+/).length, [text])
  const total = words / WORDS_PER_SECOND

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-label uppercase tracking-label">Story</h2>
        <Bracket aria-expanded={open} aria-controls="story-text" onClick={() => setOpen((v) => !v)} className="tracking-normal">
          {open ? "–" : "+"}
          <span className="sr-only">{open ? "Hide the story" : "Show the story"}</span>
        </Bracket>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="story-text"
            key="text"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.outQuart }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-4 text-ink-soft">
              {person.story.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + index * 0.12, duration: 0.6, ease: ease.outQuart }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReadAloud text={text} total={total} name={person.first} />
    </div>
  )
}

function ReadAloud({ text, total, name }: { text: string; total: number; name: string }) {
  const [supported] = useState(() => typeof window !== "undefined" && "speechSynthesis" in window)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const utterance = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => () => window.speechSynthesis?.cancel(), [])
  useEffect(() => {
    window.speechSynthesis?.cancel()
    setPlaying(false)
    setProgress(0)
  }, [text])

  if (!supported) return null

  const toggle = () => {
    const synth = window.speechSynthesis
    if (playing) {
      synth.pause()
      setPlaying(false)
      return
    }
    if (synth.paused && utterance.current) {
      synth.resume()
      setPlaying(true)
      return
    }
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.95
    u.onboundary = (event) => setProgress(Math.min(1, event.charIndex / text.length))
    u.onend = () => {
      setPlaying(false)
      setProgress(1)
      utterance.current = null
    }
    utterance.current = u
    synth.speak(u)
    setProgress(0)
    setPlaying(true)
  }

  return (
    <div className="mt-6 flex items-center gap-4 md:mt-10">
      <span className="tabular-nums">{clock(progress * total)}</span>
      <div
        role="progressbar"
        aria-label={`Listening to ${name}'s story`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        className="relative h-px flex-1 bg-rule"
      >
        <div className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-300 ease-linear" style={{ width: `${progress * 100}%` }} />
        <div
          className="absolute top-1/2 size-[5px] -translate-y-1/2 bg-ink transition-[left] duration-300 ease-linear"
          style={{ left: `${progress * 100}%` }}
        />
      </div>
      <Bracket onClick={toggle} aria-label={playing ? "Pause" : "Read the story aloud"} className="tracking-normal">
        {playing ? "❚❚" : "▸"}
      </Bracket>
    </div>
  )
}
