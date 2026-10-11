import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Flame } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { VESSEL_BODY, VESSEL_EYE, VESSEL_HANDLES } from "@/components/site/logo"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

/**
 * "Experience", shown working: the Glaze Lab, a little web toy of the kind
 * the studio builds. Pick a glaze, set the kiln's heat, fire — the pot glows,
 * cools, and joins the shelf. Hotter firings come out deeper and glossier.
 */
const GLAZES = [
  { id: "clay", name: "Raw clay", light: "#ffab71", mid: "var(--color-glaze-clay)", deep: "#832700" },
  { id: "denim", name: "Denim", light: "#8fb0d3", mid: "var(--color-glaze-denim)", deep: "#14263a" },
  { id: "rose", name: "Rose", light: "#ffc4e1", mid: "var(--color-glaze-rose)", deep: "#6e1240" },
  { id: "celadon", name: "Celadon", light: "#e1f2e4", mid: "var(--color-glaze-celadon)", deep: "#3d6b4b" },
  { id: "chrome", name: "Chrome", light: "#ffffff", mid: "var(--color-glaze-chrome)", deep: "#2a2e35" },
] as const
type GlazeId = (typeof GLAZES)[number]["id"]

function Vessel({ glaze, heat, size = 200, glow = false }: { glaze: GlazeId; heat: number; size?: number; glow?: boolean }) {
  const id = useId().replace(/:/g, "")
  const g = GLAZES.find((x) => x.id === glaze)!
  const t = (heat - 900) / 400 // 0 cool … 1 hot
  return (
    <svg
      viewBox="0 0 40 52"
      width={size}
      className={cn("h-auto overflow-visible transition-[filter] duration-500", glow && "drop-shadow-[0_0_28px_rgb(253_142_80/0.75)]")}
      aria-hidden
    >
      <defs>
        <linearGradient id={`b${id}`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor={g.light} />
          <stop offset={0.5 - t * 0.15} stopColor={g.mid} />
          <stop offset="1" stopColor={g.deep} />
        </linearGradient>
        <radialGradient id={`h${id}`} cx="0.32" cy="0.3" r="0.35">
          <stop offset="0" stopColor="#fff" stopOpacity={0.15 + t * 0.6} />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="50.5" rx="12" ry="1.6" fill="#000" opacity="0.45" />
      <path d={VESSEL_BODY} fill={`url(#b${id})`} />
      <path d={VESSEL_BODY} fill={`url(#h${id})`} />
      <path d={VESSEL_HANDLES} fill="none" stroke={g.mid} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx={VESSEL_EYE.cx} cy={VESSEL_EYE.cy} r={VESSEL_EYE.r} fill="var(--color-page)" />
    </svg>
  )
}

export function GlazeLab({ defaultGlaze = "clay", defaultHeat = 1180 }: { defaultGlaze?: GlazeId; defaultHeat?: number }) {
  const reduced = useReducedMotion()
  const [glaze, setGlaze] = useState<GlazeId>(defaultGlaze)
  const [heat, setHeat] = useState(defaultHeat)
  const [firing, setFiring] = useState(false)
  const [shelf, setShelf] = useState<{ key: number; glaze: GlazeId; heat: number }[]>([
    { key: 1, glaze: "denim", heat: 1240 },
    { key: 2, glaze: "rose", heat: 1020 },
  ])
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => setGlaze(defaultGlaze), [defaultGlaze])
  useEffect(() => setHeat(defaultHeat), [defaultHeat])
  useEffect(() => () => window.clearTimeout(timer.current), [])
  useCanvasAction("Glaze lab: firing", (next) => setFiring(next ?? !firing), { on: firing, group: "What we make" })

  const fire = () => {
    if (firing) return
    play("open")
    setFiring(true)
    timer.current = window.setTimeout(() => {
      setFiring(false)
      setShelf((s) => [...s.slice(-4), { key: Date.now(), glaze, heat }])
      play("press")
    }, reduced ? 300 : 1400)
  }

  return (
    <div className="grid h-full grid-cols-1 sm:grid-cols-[1.15fr_1fr]">
      <div className="dot-grid relative flex min-h-[220px] flex-col items-center justify-center gap-3 bg-page p-6">
        <motion.div
          animate={firing && !reduced ? { transform: ["scale(1)", "scale(1.03)", "scale(1)"] } : { transform: "scale(1)" }}
          transition={firing ? { duration: 0.7, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
        >
          <Vessel glaze={glaze} heat={heat} size={130} glow={firing} />
        </motion.div>
        <p className="type-label text-ink-3 tabular-nums" aria-live="polite">
          {firing ? <span className="text-ember">Firing at {heat.toLocaleString("en")}°C…</span> : `${GLAZES.find((g) => g.id === glaze)!.name} · ${heat.toLocaleString("en")}°C`}
        </p>
        {/* The shelf of fired pots */}
        <div className="absolute inset-x-4 bottom-3 flex h-10 items-end gap-2 border-b border-line-3 pb-0.5">
          <AnimatePresence initial={false}>
            {shelf.map((pot) => (
              <motion.span
                key={pot.key}
                layout
                initial={reduced ? false : { opacity: 0, transform: "translateY(-14px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
              >
                <Vessel glaze={pot.glaze} heat={pot.heat} size={26} />
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col gap-5 border-t border-line bg-panel p-5 sm:border-t-0 sm:border-l">
        <div>
          <p className="type-label text-ink-4">Glaze</p>
          <div role="radiogroup" aria-label="Glaze" className="mt-3 flex flex-wrap gap-2">
            {GLAZES.map((g) => (
              <button
                key={g.id}
                type="button"
                role="radio"
                aria-checked={glaze === g.id}
                aria-label={g.name}
                onClick={() => {
                  setGlaze(g.id)
                  play("tick")
                }}
                className={cn(
                  "size-9 rounded-full transition-[transform,box-shadow] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-90",
                  glaze === g.id ? "scale-100 shadow-[0_0_0_2px_var(--color-panel),0_0_0_3.5px_var(--color-ink)]" : "scale-90 hover:scale-100",
                )}
                style={{ background: `linear-gradient(135deg, ${g.light}, ${g.mid} 55%, ${g.deep})` }}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="flex justify-between">
            <span className="type-label text-ink-4">Heat</span>
            <span className="type-label text-ink-2 tabular-nums">{heat.toLocaleString("en")}°C</span>
          </p>
          <Slider className="mt-4" min={900} max={1300} step={10} value={[heat]} onValueChange={([v]) => setHeat(v)} aria-label="Kiln heat" />
          <p className="mt-2 flex justify-between font-mono text-[10px] text-ink-5">
            <span>Earthenware</span>
            <span>Stoneware</span>
          </p>
        </div>
        <Button variant="ember" onClick={fire} disabled={firing} className="mt-auto w-full">
          <Flame className={cn(firing && "animate-pulse")} /> {firing ? "Firing" : "Fire it"}
        </Button>
      </div>
    </div>
  )
}
