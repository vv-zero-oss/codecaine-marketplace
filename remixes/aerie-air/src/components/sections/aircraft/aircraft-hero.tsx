import { useCallback, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { CornerLabels } from "@/components/blocks/corner-label"
import { AircraftSide } from "@/components/mock/aircraft"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

const STATS = [
  { value: 4, suffix: "", label: "Passengers, plus the pilot" },
  { value: 290, suffix: "", unit: "km/h", label: "Top speed, level flight" },
  { value: 160, suffix: "", unit: "km", label: "Range on one charge" },
  { value: 45, suffix: "", unit: "dB", label: "Heard from 500 m away" },
] as const

/** A pill-shaped Hover / Cruise switch for dark grounds. */
export function RotorModeToggle({
  mode,
  onModeChange,
  className,
}: {
  mode: "hover" | "cruise"
  onModeChange: (mode: "hover" | "cruise") => void
  className?: string
}) {
  return (
    <ToggleGroup
      type="single"
      value={mode}
      spacing={1}
      onValueChange={(v) => v && onModeChange(v as "hover" | "cruise")}
      aria-label="Rotor position"
      className={cn("rounded-full bg-white/10 p-1 shadow-[inset_0_0_0_1px_rgb(244_241_218/0.18)]", className)}
    >
      {(["hover", "cruise"] as const).map((m) => (
        <ToggleGroupItem
          key={m}
          value={m}
          className={cn(
            "!h-11 !rounded-full !px-5 text-[15px] capitalize !text-dusk-fg/70 transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong)",
            "hover:!bg-white/10 hover:!text-dusk-fg active:scale-[0.97] focus-visible:!ring-sky/40",
            "data-[state=on]:!bg-dusk-fg data-[state=on]:!text-dusk",
          )}
        >
          {m}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

/**
 * The page opens on the machine itself: the headline, the craft drawn large
 * on dusk, and a switch that tips its rotors from hover to cruise, so the
 * first thing a visitor does is fly it.
 */
export function AircraftHero({
  title = "Six rotors. No runway. Almost no sound.",
  intro = "Aerie A-1 lifts straight up like a helicopter, then tips its rotors forward and flies on a wing. Electric the whole way, and quiet enough to land on a roof.",
  defaultMode = "hover",
}: {
  title?: string
  intro?: string
  defaultMode?: "hover" | "cruise"
}) {
  const [mode, setMode] = useState<"hover" | "cruise">(defaultMode)
  const toggle = useCallback((next?: boolean) => setMode((m) => ((next ?? m === "hover") ? "cruise" : "hover")), [])
  useCanvasAction("Rotors in cruise", toggle, { on: mode === "cruise", group: "Hero" })

  return (
    <section data-header-tone="light" className="relative overflow-hidden bg-dusk pt-28 pb-16 text-dusk-fg md:pt-36 md:pb-24">
      <Container>
        <CornerLabels left="The aircraft" right="Aerie A-1, piloted, all-electric" className="text-dusk-muted" />
        <Reveal>
          <h1 className="type-head mt-10 max-w-[12ch] text-giga text-balance md:mt-16">{title}</h1>
        </Reveal>

        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:items-end">
          <Reveal delay={0.1} className="flex flex-col items-start gap-6">
            <p className="max-w-[36ch] text-body text-dusk-muted">{intro}</p>
            <RotorModeToggle mode={mode} onModeChange={setMode} />
            <p className="text-micro text-dusk-muted" aria-live="polite">
              {mode === "hover" ? "Rotors up: lifting, landing, holding still." : "Rotors forward: the wing carries the weight."}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="px-[4%] pt-[6%]">
            <AircraftSide mode={mode} tone="light" className="mx-auto max-w-[980px]" />
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/12 pt-8 md:mt-24 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <dt className="order-2 text-micro text-dusk-muted">{s.label}</dt>
              <dd className="type-head order-1 text-h2 tabular-nums">
                <CountUp value={s.value} />
                {"unit" in s && <span className="ml-1.5 text-h4 text-dusk-muted">{s.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
