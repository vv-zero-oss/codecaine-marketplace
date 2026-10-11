import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

const VOICES = [
  {
    quote: "We went from a group chat of twelve to four hundred runners in three cities. I still don’t own a spreadsheet.",
    name: "Inès Moreau",
    role: "Runs Riverside Striders",
    stat: "18,400 members",
    photo: 3738634,
    scene: 5965907,
  },
  {
    quote: "The waitlist fills itself, the door list is on everyone’s phone, and I finally get to eat at my own supper club.",
    name: "Kofi Mensah",
    role: "Hosts Long Table Supper",
    stat: "62 dinners sold out",
    photo: 7562179,
    scene: 4809147,
  },
  {
    quote: "Hack nights used to end with me chasing emails. Now the recap goes out at nine and half the room is back next month.",
    name: "Hana Kim",
    role: "Organises Night Compilers",
    stat: "71% come back",
    photo: 39107476,
    scene: 6424590,
  },
]

/**
 * The hosts, in their own words: one oversized quote at a time over the
 * night it is about, turning every seven seconds — or on a tap.
 */
export function HostVoices({ interval = 7, autoplay = true }: { /** Seconds per quote. */ interval?: number; autoplay?: boolean }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  VOICES.forEach((v, n) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- a fixed list
    useCanvasAction(`Quote: ${v.name}`, () => setI(n), { on: i === n, group: "Host voices" })
  })

  useEffect(() => {
    if (!autoplay || paused || reduced || designing) return
    const id = window.setTimeout(() => setI((n) => (n + 1) % VOICES.length), interval * 1000)
    return () => window.clearTimeout(id)
  }, [i, autoplay, paused, reduced, designing, interval])

  const v = VOICES[i]
  return (
    <section id="hosts" className="py-section" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <Container className="max-w-[1180px]">
        <SectionHeading size="loud" eyebrow="From the hosts" title="Built with the people" continuation="who fill the room." />
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.82fr_1fr] lg:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-(--radius-panel) bg-panel shadow-(--shadow-float) max-lg:max-h-[440px] max-lg:w-full">
            <AnimatePresence initial={false}>
              <motion.img
                key={v.scene}
                src={pexels(v.scene, 900, 1100)}
                alt=""
                className="absolute inset-0 size-full object-cover"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[14px] bg-white/80 p-2.5 pr-4 shadow-(--shadow-card) backdrop-blur-md">
              <img src={pexels(v.photo, 120, 120)} alt="" className="size-11 rounded-full object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium text-ink">{v.name}</span>
                <span className="block truncate text-[13px] text-ink-3">{v.role}</span>
              </span>
              <span className="text-[13px] font-medium text-berry tabular-nums">{v.stat}</span>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={i}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="text-[clamp(25.89px,3.4vw,41.89px)] leading-[1.12] font-medium tracking-[-0.032em] text-balance text-ink"
              >
                <span className="flare-text">“</span>
                {v.quote}
                <span className="flare-text">”</span>
              </motion.blockquote>
            </AnimatePresence>
            <div className="flex gap-2" role="tablist" aria-label="Choose a host">
              {VOICES.map((x, n) => (
                <button
                  key={x.name}
                  role="tab"
                  aria-selected={n === i}
                  onClick={() => setI(n)}
                  className={cn(
                    "group flex min-h-11 flex-1 flex-col items-start gap-2 pt-1 text-left transition-colors duration-(--duration-hover)",
                    n === i ? "text-ink" : "text-ink-4 hover:text-ink-2",
                  )}
                >
                  <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-line">
                    {n === i && (
                      <motion.span
                        key={`${i}-${paused}`}
                        className="absolute inset-y-0 left-0 w-full origin-left bg-ink"
                        initial={{ scaleX: autoplay && !paused && !reduced && !designing ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: autoplay && !paused ? interval : 0, ease: "linear" }}
                      />
                    )}
                  </span>
                  <span className="text-[14px] font-medium">{x.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
