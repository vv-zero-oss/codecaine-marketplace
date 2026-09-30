import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Footprints, CableCar } from "lucide-react"
import { useCanvasAction } from "@canvas/react"
import { Container } from "@/components/ui/container"
import { Chapter } from "@/components/ui/chapter"
import { home, spots, type Spot } from "@/content"
import { cn } from "@/lib/utils"

/** Map space is 100 × 75; spot coordinates are given 0–100 on both axes. */
const Y = 0.75

/**
 * What is near the house and how long it takes to get there — a map drawn
 * in the manner of a printed trail map (contours, the river, the rack
 * railway), numbered pins, and the list that keys them. Pointing at either
 * lights up the other and shows a photograph of the place.
 */
export function Around({
  title = "Everything here is timed from our front door.",
  lede = "Walking times are at an easy pace in winter boots. Lift times include the walk to the station.",
}: {
  title?: string
  lede?: string
}) {
  const [active, setActive] = useState<string>(spots[0].id)
  const reduce = useReducedMotion()
  const current = spots.find((s) => s.id === active) ?? spots[0]
  useCanvasAction("Next spot", () => {
    const i = spots.findIndex((s) => s.id === active)
    setActive(spots[(i + 1) % spots.length].id)
  }, { group: "Around" })

  const groups: { how: Spot["how"]; label: string; Icon: typeof Footprints }[] = [
    { how: "foot", label: "On foot", Icon: Footprints },
    { how: "lift", label: "By lift or train", Icon: CableCar },
  ]

  return (
    <section id="around" className="pb-(--spacing-section)">
      <Container>
        <Chapter number="05" label="Around the house" title={title} lede={lede} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <TrailMap active={active} onPick={setActive} />
            <div className="mt-6 grid grid-cols-[7rem_1fr] items-start gap-5 sm:grid-cols-[10rem_1fr]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.alt}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="aspect-square w-full rounded-print bg-sheet object-cover p-1.5 shadow-(--shadow-print) saturate-[0.9] sepia-[0.08]"
                />
              </AnimatePresence>
              <div aria-live="polite">
                <p className="label text-signal">
                  {spots.indexOf(current) + 1} · {current.time} {current.how === "foot" ? "on foot" : "by lift"}
                </p>
                <p className="mt-1 font-serif text-2xl">{current.name}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{current.detail}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {groups.map(({ how, label, Icon }) => (
              <div key={how} className="mb-8 last:mb-0">
                <p className="label flex items-center gap-2 border-b border-ink pb-2 text-ink">
                  <Icon className="size-3.5" /> {label}
                </p>
                <ul>
                  {spots.map((s, i) =>
                    s.how !== how ? null : (
                      <li key={s.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(s.id)}
                          onFocus={() => setActive(s.id)}
                          onClick={() => setActive(s.id)}
                          aria-pressed={active === s.id}
                          className={cn(
                            "flex min-h-12 w-full items-baseline gap-3 border-b border-rule py-3 text-left transition-colors duration-150",
                            active === s.id ? "text-ink" : "text-ink-soft hover:text-ink",
                          )}
                        >
                          <span className={cn("font-mono text-xs tabular-nums", active === s.id ? "text-signal" : "text-ink-faint")}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-serif text-lg">{s.name}</span>
                          <span className="leader" aria-hidden />
                          <span className="font-mono text-sm tabular-nums">{s.time}</span>
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

/** The drawn map: contours, river, railway, the house, and a numbered pin per spot. */
export function TrailMap({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  const hx = home.x
  const hy = home.y * Y
  return (
    <div className="rounded-print bg-sheet p-2 shadow-(--shadow-print)">
      <svg viewBox="0 0 100 75" className="block w-full" role="img" aria-label="Sketch map of the area around the hotel">
        <rect width="100" height="75" className="fill-sheet" />
        {/* Contours round the high ground to the west and north-east */}
        <g fill="none" className="stroke-paper-edge" strokeWidth="0.25">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <path key={`w${k}`} d={`M${-4 + k * 1.5},${4 + k * 5} C${12 + k * 3},${-2 + k * 4} ${26 + k * 2},${10 + k * 5} ${20 + k * 3},${26 + k * 6} S${4 + k},${40 + k * 5} ${-4},${34 + k * 6}`} />
          ))}
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={`e${k}`} d={`M${104},${6 + k * 4} C${86 - k * 3},${2 + k * 3} ${70 - k * 2},${10 + k * 4} ${76 - k * 2},${22 + k * 4} S${96},${34 + k * 3} ${104},${30 + k * 4}`} />
          ))}
        </g>
        {/* The Matterhorn, as a hachured triangle */}
        <g className="stroke-ink-faint" strokeWidth="0.3" fill="none">
          <path d="M5,14 L10,4 L15,14" />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M${10.5 + k},${6 + k * 2} L${11.5 + k},${7.5 + k * 2}`} />
          ))}
        </g>
        <text x="10" y="17" textAnchor="middle" className="fill-ink-faint font-mono" fontSize="1.8" letterSpacing="0.2">
          MATTERHORN 4478
        </text>
        {/* The river Vispa, running down the valley */}
        <path d="M30,-1 C34,14 40,22 44,32 S48,50 44,60 S40,70 42,76" fill="none" className="stroke-pine/50" strokeWidth="0.7" />
        <text x="45.5" y="44" className="fill-pine/70 font-serif italic" fontSize="2" transform="rotate(78 45.5 44)">
          Vispa
        </text>
        {/* Rack railway and lift lines from the village */}
        <g fill="none" className="stroke-ink" strokeWidth="0.35" strokeDasharray="1.2 0.8">
          <path d={`M${hx - 6},${hy + 2} C58,40 70,30 80,${20 * Y}`} />
          <path d={`M${hx - 8},${hy + 3} C38,40 24,24 16,${16 * Y}`} />
        </g>
        {/* Walking lines from the house */}
        <g fill="none" className="stroke-ink-faint" strokeWidth="0.3" strokeDasharray="0.3 0.8" strokeLinecap="round">
          {spots
            .filter((s) => s.how === "foot")
            .map((s) => (
              <path key={s.id} d={`M${hx},${hy} Q${(hx + s.x) / 2},${(hy + s.y * Y) / 2 - 3} ${s.x},${s.y * Y}`} />
            ))}
        </g>
        {/* The house */}
        <g transform={`translate(${hx} ${hy})`}>
          <rect x="-1.9" y="-1.9" width="3.8" height="3.8" className="fill-signal" />
          <text x="3" y="0.9" className="fill-ink font-serif" fontSize="2.6">
            Arven
          </text>
        </g>
        {/* Pins */}
        {spots.map((s, i) => {
          const on = s.id === active
          return (
            <g
              key={s.id}
              transform={`translate(${s.x} ${s.y * Y})`}
              onMouseEnter={() => onPick(s.id)}
              onClick={() => onPick(s.id)}
              className="cursor-pointer"
            >
              <circle r="2.9" className={cn("transition-colors duration-150", on ? "fill-signal" : "fill-sheet")} />
              <circle r="2.9" fill="none" className={on ? "stroke-signal" : "stroke-ink"} strokeWidth="0.3" />
              <text y="0.95" textAnchor="middle" fontSize="2.6" className={cn("font-mono", on ? "fill-sheet" : "fill-ink")}>
                {i + 1}
              </text>
            </g>
          )
        })}
        {/* Scale bar and north arrow */}
        <g transform="translate(78 70)" className="fill-ink-faint stroke-ink-faint" strokeWidth="0.25">
          <path d="M0,0 H16" />
          <path d="M0,-0.8 V0.8 M8,-0.8 V0.8 M16,-0.8 V0.8" />
          <text x="0" y="-1.6" fontSize="1.7" stroke="none" className="font-mono">0</text>
          <text x="13.4" y="-1.6" fontSize="1.7" stroke="none" className="font-mono">1 KM</text>
        </g>
        <g transform="translate(94 10)" className="fill-ink">
          <path d="M0,-4 L1.4,1 L0,0 L-1.4,1 Z" />
          <text y="4" textAnchor="middle" fontSize="2" className="font-mono">N</text>
        </g>
      </svg>
    </div>
  )
}
