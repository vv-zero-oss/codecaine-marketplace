import { useState } from "react"

import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { openDialog } from "@/lib/ui-events"

const PRICE = 12
const YEARLY = 0.8
/** What a team typically spends on a proxy licence plus VPN capacity, per seat per month. */
const LEGACY = 21

/**
 * Seats in, a monthly bill out, and the old way's estimate beside it. The
 * assumptions are printed under the numbers so the comparison can be argued with.
 */
export function SeatCalculator({ initialSeats = 120 }: { initialSeats?: number }) {
  const [seats, setSeats] = useState([initialSeats])
  const [yearly, setYearly] = useState(true)
  const n = seats[0]
  const rate = yearly ? PRICE * YEARLY : PRICE
  const monthly = Math.round(n * rate)
  const legacy = n * LEGACY
  const saving = Math.max(0, legacy - monthly)
  const fmt = (v: number) => `$${v.toLocaleString("en-US")}`
  return (
    <section id="calculator" className="border-y-4 border-line bg-surface py-phi-6 sm:py-phi-7">
      <Container className="grid gap-phi-5 lg:grid-cols-[1fr_1.618fr] lg:gap-phi-6">
        <SectionHeading kicker="estimate your plan" title="What would your team pay?" blurb="Slide to your head-count. The Co-op plan is priced per seat, with nothing hidden." />
        <Reveal>
          <div className="grid gap-phi-4 bg-bg p-phi-4 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line-strong)] sm:p-phi-5">
            <div className="grid gap-phi-3">
              <div className="flex items-baseline justify-between gap-phi-3">
                <label htmlFor="seats" className="font-display text-label uppercase text-fg-muted">Seats</label>
                <output htmlFor="seats" className="font-display text-xl tabular-nums">{n.toLocaleString("en-US")}</output>
              </div>
              <Slider id="seats" value={seats} onValueChange={setSeats} min={5} max={2000} step={5} aria-label="Number of seats" />
              <label className="flex min-h-11 items-center justify-between gap-phi-3 text-base">
                Pay yearly, save 20%
                <Switch checked={yearly} onCheckedChange={setYearly} />
              </label>
            </div>
            <dl className="grid gap-phi-3 border-t-2 border-line pt-phi-4 sm:grid-cols-2">
              <div>
                <dt className="text-base text-fg-muted">Pixelkeep Co-op</dt>
                <dd className="mt-phi-1 font-display text-2xl text-accent-hi tabular-nums">{fmt(monthly)}<span className="font-mono text-lg text-fg-muted"> / month</span></dd>
              </div>
              <div>
                <dt className="text-base text-fg-muted">Proxy plus VPN, typical</dt>
                <dd className="mt-phi-1 font-display text-2xl text-fg-subtle tabular-nums line-through decoration-2">{fmt(legacy)}</dd>
              </div>
            </dl>
            <p className="max-w-measure text-base text-fg-muted">
              {saving > 0 ? <>That is about <b className="text-good">{fmt(saving)}</b> a month back. </> : null}
              Estimate only: assumes ${LEGACY} per seat for a proxy licence and VPN capacity. Your own numbers will differ.
            </p>
            <div className="flex flex-wrap gap-phi-2">
              <Button variant="accent" size="lg" onClick={() => openDialog("login")}>Start a trial</Button>
              <Button variant="outline" size="lg" onClick={() => openDialog("demo")}>Get a quote</Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
