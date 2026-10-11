import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowDownUp, ChevronDown, RotateCcw } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { Button, ButtonLink } from "@/components/ui/button"
import { CornerLabels } from "@/components/blocks/corner-label"
import { Reveal } from "@/components/motion/reveal"
import { quote, vertiport, VERTIPORTS } from "@/content/network"
import { cn } from "@/lib/utils"

import { NetworkMap } from "./network-map"
import { useMediaQuery } from "./use-pinned"

/** A few routes worth jumping to from the editor's Actions row. */
const PRESETS = [
  ["harbour", "airport"],
  ["northgate", "stadium"],
  ["midtown", "riverside"],
] as const

/**
 * The page opens on the network itself: a loud headline over the sky, and
 * under it the map, live. Pick where you leave from and where you land and
 * the trip is quoted beside it — the same `quote()` every page uses.
 */
export function RouteHero({
  title = "Six rooftops. One city, rewired.",
  lead = "Every pad on the first network, and what the hop between any two of them costs you — in minutes and in money.",
}: {
  title?: string
  lead?: string
}) {
  const [from, setFrom] = useState<string | null>("harbour")
  const [to, setTo] = useState<string | null>("midtown")
  const narrow = useMediaQuery("(max-width: 639px)")

  const pick = (id: string) => {
    if (!from || (from && to)) {
      setFrom(id)
      setTo(null)
    } else if (id !== from) setTo(id)
  }

  useCanvasAction(
    "Route selected",
    (next) => {
      if (next ?? !to) {
        setFrom(from ?? "harbour")
        setTo(from === "airport" ? "midtown" : "airport")
      } else setTo(null)
    },
    { on: !!(from && to), group: "Network map" },
  )
  for (const [a, b] of PRESETS) {
    // A fixed list, so the hook order never changes.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(
      `Route ${vertiport(a).code} to ${vertiport(b).code}`,
      () => {
        setFrom(a)
        setTo(b)
      },
      { on: from === a && to === b, group: "Network map" },
    )
  }

  return (
    <section data-header-tone="light" className="relative overflow-hidden bg-sky pt-28 pb-(--spacing-section) text-on-sky md:pt-36">
      <Container>
        <CornerLabels left="The network — 01" right="Opening spring 2027" className="mb-10 text-on-sky-soft md:mb-14" />
        <Reveal>
          <h1 className="type-head max-w-[12ch] text-giga text-balance text-page">{title}</h1>
        </Reveal>
        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[40ch] text-lead text-on-sky-soft">{lead}</p>
          <p className="text-micro text-on-sky-soft">
            {from && !to ? "Now tap where you land." : "Tap a pad to leave from it."}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <Reveal delay={0.1} className="flex items-center overflow-hidden rounded-(--radius-stage) bg-sky-hover/40 p-2 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] sm:p-4 lg:col-span-8">
            <NetworkMap from={from} to={to} onPick={pick} crop={narrow} />
          </Reveal>
          <Reveal delay={0.18} className="lg:col-span-4">
            <QuotePanel
              from={from}
              to={to}
              onFrom={(id) => {
                setFrom(id)
                if (id === to) setTo(null)
              }}
              onTo={(id) => {
                setTo(id)
                if (id === from) setFrom(null)
              }}
              onSwap={() => {
                setFrom(to)
                setTo(from)
              }}
              onClear={() => {
                setFrom(null)
                setTo(null)
              }}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function PadSelect({ id, label, value, onChange }: { id: string; label: string; value: string | null; onChange: (id: string) => void }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="text-micro text-ink-3">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none truncate rounded-(--radius-field) bg-raised pr-10 pl-4 text-[16px] font-medium text-ink shadow-(--shadow-field) transition-shadow duration-(--duration-hover) outline-none focus-visible:shadow-[0_0_0_1.5px_var(--color-ink)]"
        >
          <option value="" disabled>
            Choose a pad
          </option>
          {VERTIPORTS.map((v) => (
            <option key={v.id} value={v.id}>
              {v.code} · {v.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-3" />
      </div>
    </div>
  )
}

/** The trip, quoted: minutes in the air against minutes on the road, the distance, the fare and what it gives back. */
export function QuotePanel({
  from,
  to,
  onFrom,
  onTo,
  onSwap,
  onClear,
  className,
}: {
  from: string | null
  to: string | null
  onFrom: (id: string) => void
  onTo: (id: string) => void
  onSwap: () => void
  onClear: () => void
  className?: string
}) {
  const reduced = useReducedMotion()
  const trip = from && to ? quote(vertiport(from), vertiport(to)) : null
  const key = `${from}-${to}`

  return (
    <div className={cn("flex h-full flex-col gap-6 rounded-(--radius-photo) bg-page p-5 text-ink shadow-(--shadow-float) sm:p-7", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-3 lg:flex-col lg:items-stretch lg:gap-2">
        <PadSelect id="route-from" label="From" value={from} onChange={onFrom} />
        <Button
          variant="soft"
          size="icon"
          aria-label="Swap from and to"
          onClick={onSwap}
          disabled={!from || !to}
          className="shrink-0 self-end -my-1 sm:my-0 lg:-my-1 [&_svg]:transition-transform [&_svg]:duration-(--duration-swap) hover:[&_svg]:rotate-180"
        >
          <ArrowDownUp />
        </Button>
        <PadSelect id="route-to" label="To" value={to} onChange={onTo} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={trip ? key : "empty"}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-1 flex-col"
          aria-live="polite"
        >
          {trip ? (
            <>
              <p className="text-micro text-ink-3">
                {vertiport(from!).name} to {vertiport(to!).name}
              </p>
              <p className="type-head mt-2 text-mega tabular-nums">
                {trip.flightMin}
                <span className="ml-2 text-h4 text-ink-3">min</span>
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Bar label="By air" minutes={trip.flightMin} max={trip.roadMin} tone="sky" />
                <Bar label="By road, at rush hour" minutes={trip.roadMin} max={trip.roadMin} tone="ink" />
              </div>
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
                <Stat label="Distance" value={`${trip.km.toFixed(1)} km`} />
                <Stat label="Fare" value={`$${trip.fare}`} />
                <Stat label="Saved" value={`${trip.savedMin} min`} accent />
              </dl>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                <ButtonLink href="/routes#waitlist" variant="sky" className="max-sm:h-11 sm:h-8 sm:px-3.5 sm:text-[12.58px]">
                  Wait for this route
                </ButtonLink>
                <button type="button" onClick={onClear} className="inline-flex min-h-11 items-center gap-1.5 text-micro text-ink-3 transition-colors hover:text-ink">
                  <RotateCcw className="size-3.5" /> Start over
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col justify-center gap-2 py-6">
              <p className="type-head text-h3">{from ? "Where to?" : "Where from?"}</p>
              <p className="max-w-[30ch] text-body text-ink-3">
                {from
                  ? `Leaving ${vertiport(from).name}. Pick a second pad on the map, or choose it above.`
                  : "Tap any pad on the map, or choose one above, to start a route."}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Bar({ label, minutes, max, tone }: { label: string; minutes: number; max: number; tone: "sky" | "ink" }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-micro text-ink-3">
        <span>{label}</span>
        <span className="tabular-nums">{minutes} min</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-panel">
        <motion.div
          className={cn("h-full origin-left rounded-full", tone === "sky" ? "bg-sky" : "bg-ink-2")}
          initial={{ scaleX: 0.04 }}
          animate={{ scaleX: Math.max(0.04, minutes / max) }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
        />
      </div>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <dt className="text-micro text-ink-3">{label}</dt>
      <dd className={cn("truncate text-[17px] font-medium tabular-nums", accent && "text-sky")}>{value}</dd>
    </div>
  )
}
