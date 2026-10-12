import { useState } from "react"
import { CalendarClock, Pause, Play, SkipForward, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Drawer } from "@/components/site/drawer"
import { Button, ButtonLink } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { coffeeById } from "@/content/coffees"
import { isoDay, shipDates, useStore, useWeight } from "@/lib/store"

const day = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })

/**
 * Your subscription, run from the rail: the next three ship days, skip one,
 * pause and resume, change how often, or cancel (with a second press to be
 * sure). With no subscription yet it points at the builder.
 */
export function AccountSheet() {
  const { subscription: sub, setSubscription, setDrawer } = useStore()
  const weight = useWeight()
  const [confirmCancel, setConfirmCancel] = useState(false)

  useCanvasAction(
    "Has a subscription",
    (next) => {
      const on = next ?? !sub
      setSubscription(on ? { coffeeId: "rotate", size: "12oz", grind: "Whole bean", every: 2, bags: 1, startedAt: new Date().toISOString() } : null)
    },
    { on: !!sub, group: "Subscription" },
  )

  const coffee = sub && sub.coffeeId !== "rotate" ? coffeeById[sub.coffeeId] : null
  const dates = sub ? shipDates(sub) : []

  return (
    <Drawer id="account" title="Your subscription" description="Manage deliveries: skip, pause, change frequency or cancel">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <p className="type-display text-d1">Your subscription</p>
        <SheetClose className="-mr-2 grid size-11 place-items-center transition-transform hover:rotate-90" aria-label="Close">
          <X className="size-5 stroke-[1.4]" />
        </SheetClose>
      </div>
      {!sub ? (
        <div className="flex flex-1 flex-col justify-center gap-4 px-7">
          <CalendarClock className="size-8 stroke-[1.4] text-ink-3" />
          <p className="type-display text-d3">No standing order. Yet.</p>
          <p className="text-ink-2">Pick a coffee — or let us rotate through the series — choose how often, and we'll make sure you never open an empty bag again. Up to 15% off every delivery.</p>
          <ButtonLink href="/subscribe" variant="tomato" size="lg" className="self-start" onClick={() => setDrawer(null)}>
            Build a subscription
          </ButtonLink>
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6" data-lenis-prevent>
          <div className="flex gap-5 rounded-[var(--radius-card)] bg-shelf p-4">
            <div className="w-20 shrink-0">
              <CoffeeBag coffeeId={coffee?.id ?? "the-long-way"} weight={weight(sub.size)} />
            </div>
            <div>
              <p className="type-eyebrow text-ink-3">{sub.paused ? "Paused" : "Active"}</p>
              <p className="type-display mt-1 text-d1">{coffee ? coffee.name : "Roaster's rotation"}</p>
              <p className="mt-1 text-caption text-ink-2">
                {sub.bags} × {weight(sub.size)} · {sub.grind} · every {sub.every === 1 ? "week" : `${sub.every} weeks`}
              </p>
            </div>
          </div>

          <p className="type-eyebrow mt-7 text-ink-3">Next deliveries</p>
          <ul className="mt-2">
            <AnimatePresence initial={false} mode="popLayout">
              {dates.map((d, i) => (
                <motion.li
                  layout
                  key={isoDay(d)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: sub.paused ? 0.45 : 1, y: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="flex h-12 items-center justify-between border-b border-line"
                >
                  <span className="text-[14px] tabular-nums">{day(d)}</span>
                  {i === 0 && !sub.paused && (
                    <button
                      type="button"
                      onClick={() => setSubscription({ ...sub, skipped: [...(sub.skipped ?? []), isoDay(d)] })}
                      className="flex items-center gap-1.5 text-[13px] text-ink-2 transition-colors hover:text-tomato"
                    >
                      <SkipForward className="size-3.5" /> Skip this one
                    </button>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <p className="type-eyebrow mt-7 text-ink-3">How often</p>
          <ToggleGroup
            type="single"
            value={String(sub.every)}
            onValueChange={(v) => v && setSubscription({ ...sub, every: Number(v) as 1 | 2 | 4 })}
            className="mt-2 w-full"
            variant="outline"
          >
            {[
              ["1", "Weekly"],
              ["2", "Every 2 wks"],
              ["4", "Monthly"],
            ].map(([v, l]) => (
              <ToggleGroupItem key={v} value={v} className="h-10 flex-1 text-[13px] data-[state=on]:bg-ink data-[state=on]:text-paper">
                {l}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <div className="mt-auto flex flex-col gap-2 pt-8">
            <Button variant="outline" onClick={() => setSubscription({ ...sub, paused: !sub.paused })}>
              {sub.paused ? <Play /> : <Pause />} {sub.paused ? "Resume deliveries" : "Pause deliveries"}
            </Button>
            <Button
              variant="ghost"
              className="text-tomato"
              onClick={() => {
                if (!confirmCancel) {
                  setConfirmCancel(true)
                  window.setTimeout(() => setConfirmCancel(false), 3000)
                  return
                }
                setSubscription(null)
                setConfirmCancel(false)
              }}
            >
              {confirmCancel ? "Press again to cancel for good" : "Cancel subscription"}
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  )
}
