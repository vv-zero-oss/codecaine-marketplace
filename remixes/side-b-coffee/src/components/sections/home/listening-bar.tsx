import { Pause, Play } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Turntable } from "@/components/mock/turntable"
import { EqBars } from "@/components/site/now-playing"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/motion/reveal"
import { TRACKS, clock, radio, useRadio } from "@/lib/radio"
import { cn } from "@/lib/utils"

const PAIRINGS = ["Side B Blend", "Deep Cut", "Liner Notes", "Slow Fade"]

/**
 * The listening bar: the turntable from Elm Street (it plays — press the
 * record) beside this month's rotation, each record paired with a coffee.
 * Press a row to drop the needle on it.
 */
export function ListeningBar() {
  const { playing, trackIndex, elapsed } = useRadio()

  return (
    <section className="border-b border-line bg-panel py-(--spacing-section)">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 [&>*]:min-w-0">
        <Reveal className="order-2 lg:order-1">
          <div className="rounded-(--radius-frame) bg-page p-3 shadow-(--shadow-float) sm:p-5">
            <Turntable />
          </div>
          <p className="mt-3 text-center text-[13px] text-ink-3">Press the record to drop the needle.</p>
        </Reveal>

        <div className="order-1 space-y-8 lg:order-2">
          <SectionHeading kicker="The listening bar" before="Every coffee comes" highlight="with a record." tone="ember" doodle="record" />
          <p className="max-w-[460px] text-lead text-ink-2">
            Six hundred LPs live behind the Elm Street bar. Every month we pick four to pair with what's on the brew bar — here's the rotation.
          </p>
          <ol className="divide-y divide-line border-y border-line">
            {TRACKS.map((t, i) => {
              const current = i === trackIndex
              const on = current && playing
              return (
                <li key={t.id}>
                  <button
                    onClick={() => radio.toggle(i)}
                    className="group/row flex w-full items-center gap-4 py-3 text-left transition-colors hover:bg-page/60"
                    aria-label={`${on ? "Pause" : "Play"} ${t.title} by ${t.artist}`}
                  >
                    <span className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-(--radius-chip) shadow-(--shadow-xs)" style={{ background: t.sleeve }}>
                      <span className={cn("size-9 rounded-full bg-cocoa ring-4 ring-cocoa/30 transition-transform duration-500 ease-(--ease-out-strong) group-hover/row:translate-x-2", on && "translate-x-3")}>
                        <span className="m-auto mt-3 block size-3 rounded-full" style={{ background: t.label }} />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("type-display block truncate text-[22px] leading-tight tracking-[-0.015em]", current && "text-rust")}>{t.title}</span>
                      <span className="block truncate text-[13.5px] text-ink-3">
                        {t.artist} · pairs with {PAIRINGS[i]}
                      </span>
                    </span>
                    <span className="hidden font-mono text-[12.5px] text-ink-3 tabular sm:block">{current ? clock(elapsed) : clock(t.length)}</span>
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-full transition-colors", on ? "bg-rust text-page" : "bg-page text-ink group-hover/row:bg-ink group-hover/row:text-page")}>
                      {on ? <EqBars playing className="[&>span]:bg-page" /> : <Play className="ml-0.5 size-4 fill-current" />}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
          {playing && (
            <button onClick={() => radio.pause()} className="type-label inline-flex items-center gap-2 text-[11.5px] text-ink-2 hover:text-rust">
              <Pause className="size-3.5" /> Lift the needle
            </button>
          )}
        </div>
      </Container>
    </section>
  )
}
