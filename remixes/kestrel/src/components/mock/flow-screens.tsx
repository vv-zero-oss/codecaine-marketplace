import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Bell, Camera, Check, CircleDashed, Lock, ScanLine, Sparkles } from "lucide-react"

import { KestrelMark } from "@/components/site/logo"
import { CLOSE_TASKS, LUNCH, PEOPLE } from "@/content/home-story"
import { money } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * The five phone screens of the dollar walk-through. Each plays its own
 * short entrance when it mounts, so swapping steps replays the moment.
 */

const EASE = [0.23, 1, 0.32, 1] as const

function useRise(delay = 0, distance = 12) {
  const reduced = useReducedMotion()
  return {
    initial: { opacity: 0, transform: reduced ? "none" : `translateY(${distance}px)` },
    animate: { opacity: 1, transform: reduced ? "none" : "translateY(0px)" },
    transition: { duration: 0.45, ease: EASE, delay },
  }
}

function Rise({ delay = 0, distance, className, children }: { delay?: number; distance?: number; className?: string; children?: React.ReactNode }) {
  return (
    <motion.div {...useRise(delay, distance)} className={className}>
      {children}
    </motion.div>
  )
}

/** 01 — the swipe lands on the lock screen. */
export function SwipeScreen() {
  return (
    <div className="flex h-full flex-col bg-night px-4 pt-10 pb-5 text-night-fg">
      <div className="flex flex-col items-center gap-1">
        <Lock className="size-3.5 text-night-muted" />
        <p className="font-mono text-[54px] leading-none font-medium tracking-tighter tabular-nums">12:48</p>
        <p className="text-[13px] text-night-muted">Thursday, October 16</p>
      </div>
      <Rise delay={0.25} distance={-16} className="mt-8 rounded-[18px] bg-night-2/90 p-3 shadow-(--shadow-night)">
        <div className="flex items-center gap-2 text-[11.5px] text-night-muted">
          <span className="grid size-5 place-items-center rounded-[6px] bg-lime text-lime-ink"><KestrelMark className="size-3" /></span>
          KESTREL <span className="ml-auto">now</span>
        </div>
        <p className="mt-2 text-[14px] leading-snug">
          {money(LUNCH.amount)} at {LUNCH.merchant} on {LUNCH.card}.
        </p>
        <p className="text-[13px] text-night-muted">Snap the receipt — that’s all we need.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="grid h-9 place-items-center rounded-[10px] bg-night-line text-[13px]">Later</span>
          <span className="grid h-9 place-items-center rounded-[10px] bg-lime text-[13px] font-medium text-lime-ink">Add receipt</span>
        </div>
      </Rise>
      <Rise delay={0.1} className="mt-auto flex aspect-[1.586] w-full flex-col justify-between rounded-(--radius-metal) bg-metal p-4 shadow-(--shadow-metal) ring-1 ring-metal-line">
        <span className="flex items-center justify-between text-night-fg">
          <span className="text-[15px] font-semibold tracking-[-0.04em]">kestrel</span>
          <span className="h-6 w-8 rounded-[5px] bg-night-muted/50" />
        </span>
        <span className="font-mono text-[13px] text-night-muted">{LUNCH.who} · {LUNCH.card}</span>
      </Rise>
    </div>
  )
}

/** 02 — the camera reads the receipt and matches it. */
export function CaptureScreen() {
  const reduced = useReducedMotion()
  return (
    <div className="relative flex h-full flex-col bg-night-2 px-4 pt-8 pb-5">
      <p className="flex items-center justify-center gap-1.5 text-[12px] text-night-muted"><Camera className="size-3.5" /> Receipt</p>
      <div className="relative mx-auto mt-5 w-[78%] rotate-[-2deg] rounded-[4px] bg-raised px-4 py-4 font-mono text-[10.5px] text-ink-2 shadow-(--shadow-lift)">
        <p className="text-center text-[12px] font-medium text-ink">{LUNCH.merchant.toUpperCase()}</p>
        <p className="text-center text-[9.5px] text-ink-3">88 Pearl St · 10/16 12:31</p>
        <div className="my-2 border-t border-dashed border-line-strong" />
        {[
          ["4 × Lunch set", "64.00"],
          ["2 × Sparkling", "8.00"],
          ["Tip 20%", "14.40"],
        ].map(([item, price]) => (
          <p key={item} className="flex justify-between"><span>{item}</span><span>{price}</span></p>
        ))}
        <div className="my-2 border-t border-dashed border-line-strong" />
        <p className="flex justify-between text-[12px] font-medium text-ink"><span>TOTAL</span><span>86.40</span></p>
        {!reduced && (
          <motion.span
            aria-hidden
            initial={{ transform: "translateY(0%)" }}
            animate={{ transform: "translateY(3200%)" }}
            transition={{ duration: 1.1, ease: "linear", repeat: 1, repeatType: "reverse" }}
            className="absolute inset-x-0 top-0 h-[3%] bg-lime/70 blur-[2px]"
          />
        )}
      </div>
      <div className="mt-auto flex flex-col gap-2">
        {[
          ["Total", "$86.40", true],
          ["Tip", "$14.40", false],
          ["Guests", "4 people", false],
        ].map(([label, value, strong], i) => (
          <Rise key={label as string} delay={0.6 + i * 0.12} className="flex items-center gap-2 rounded-[12px] bg-night px-3 py-2 text-[13px] text-night-fg">
            <ScanLine className="size-3.5 text-night-muted" />
            {label}
            <span className={cn("ml-auto font-mono", strong && "text-lime")}>{value}</span>
          </Rise>
        ))}
        <Rise delay={1.05} className="flex items-center gap-2 rounded-[12px] bg-lime px-3 py-2.5 text-[13px] font-medium text-lime-ink">
          <Check className="size-4" strokeWidth={2.5} /> Matched to the card charge
        </Rise>
      </div>
    </div>
  )
}

/** 03 — the manager approves from a notification; finance stays out of it. */
export function ApproveScreen() {
  const chain = [
    { who: LUNCH.who, photo: PEOPLE.jonah.photo, role: "Submitted · 12:49", state: "done" },
    { who: LUNCH.approver, photo: PEOPLE.lena.photo, role: "Manager · approved 12:53", state: "done" },
    { who: "Finance", photo: null, role: "Only if something’s off", state: "skip" },
  ]
  return (
    <div className="flex h-full flex-col bg-page px-4 pt-8 pb-5">
      <p className="text-center text-[12px] text-ink-3">Approval</p>
      <Rise className="mt-4 rounded-(--radius-card) bg-panel p-3">
        <p className="text-[13px] text-ink-3">{LUNCH.merchant}</p>
        <p className="font-mono text-[26px] font-medium tracking-tight text-ink tabular-nums">{money(LUNCH.amount)}</p>
        <p className="mt-1 inline-flex rounded-full bg-signal-amber-soft px-2 py-0.5 text-[11.5px] text-signal-amber">Over $75 — needs a manager</p>
      </Rise>
      <ol className="mt-5 flex flex-col">
        {chain.map((step, i) => (
          <Rise key={step.who} delay={0.25 + i * 0.35} className="relative flex items-center gap-3 pb-5 last:pb-0">
            {i < chain.length - 1 && <span className="absolute top-10 left-[19px] h-[calc(100%-36px)] w-px bg-line-strong" />}
            {step.photo ? (
              <img src={step.photo} alt="" className="size-10 rounded-full object-cover" />
            ) : (
              <span className="grid size-10 place-items-center rounded-full bg-panel-deep text-ink-3"><CircleDashed className="size-4" /></span>
            )}
            <span className="min-w-0 flex-1">
              <span className={cn("block text-[14px]", step.state === "skip" ? "text-ink-3" : "text-ink")}>{step.who}</span>
              <span className="block text-[12px] text-ink-3">{step.role}</span>
            </span>
            {step.state === "done" ? (
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.3, delay: 0.45 + i * 0.35 }}
                className="grid size-6 place-items-center rounded-full bg-signal-green text-page"
              >
                <Check className="size-3.5" strokeWidth={3} />
              </motion.span>
            ) : (
              <span className="text-[11.5px] text-ink-4">skipped</span>
            )}
          </Rise>
        ))}
      </ol>
      <Rise delay={1.3} className="mt-auto flex items-center gap-2 rounded-(--radius-card) bg-signal-green-soft px-3 py-2.5 text-[13px] text-signal-green">
        <Bell className="size-4" /> Approved in 4 minutes. Nobody opened a spreadsheet.
      </Rise>
    </div>
  )
}

/** 04 — the agent fills in the books the way your controller would. */
export function CodeScreen() {
  const fields = [
    ["GL account", "6420 · Meals & Entertainment"],
    ["Department", "Engineering"],
    ["Project", "Q4 offsite"],
    ["Location", "New York"],
    ["Sales tax", "8.875% · $6.40 split"],
  ]
  return (
    <div className="flex h-full flex-col bg-page px-4 pt-8 pb-5">
      <p className="text-center text-[12px] text-ink-3">Accounting</p>
      <Rise className="mt-4 flex items-center justify-between">
        <span className="text-[15px] text-ink">{LUNCH.merchant}</span>
        <span className="font-mono text-[15px] text-ink">{money(LUNCH.amount)}</span>
      </Rise>
      <div className="mt-4 flex flex-col gap-2">
        {fields.map(([label, value], i) => (
          <Rise key={label} delay={0.15 + i * 0.14} distance={8} className="rounded-[10px] px-3 py-2 ring-1 ring-line">
            <p className="text-[11px] text-ink-3">{label}</p>
            <p className="flex items-center gap-1.5 text-[13.5px] text-ink">
              <Sparkles className="size-3 text-signal-blue" />
              {value}
            </p>
          </Rise>
        ))}
      </div>
      <Rise delay={1} className="mt-auto rounded-(--radius-card) bg-panel p-3">
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="text-ink-2">Agent confidence</span>
          <span className="font-mono text-ink">98%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-panel-deep">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 0.98 }} transition={{ duration: 0.9, ease: EASE, delay: 1.1 }} className="h-full origin-left rounded-full bg-ink" />
        </div>
        <p className="mt-2 text-[11.5px] text-ink-3">Learned from 214 lunches your team already coded.</p>
      </Rise>
    </div>
  )
}

/** 05 — month end, already done. */
export function CloseScreen() {
  const reduced = useReducedMotion()
  const step = reduced ? 0 : 0.28
  return (
    <div className="flex h-full flex-col bg-page px-4 pt-8 pb-5">
      <p className="text-center text-[12px] text-ink-3">October close</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="font-mono text-[44px] leading-none font-medium tracking-tighter text-ink tabular-nums">100%</p>
        <p className="pb-1 text-[12px] text-ink-3">6 of 6 done</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-panel-deep">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: step * CLOSE_TASKS.length, ease: "linear", delay: 0.2 }} className="h-full origin-left rounded-full bg-lime" />
      </div>
      <ul className="mt-5 flex flex-col">
        {CLOSE_TASKS.map((task, i) => (
          <li key={task} className="flex items-center gap-3 border-b border-line py-2.5 text-[13.5px] text-ink last:border-0">
            <motion.span
              initial={{ backgroundColor: "var(--color-panel-deep)" }}
              animate={{ backgroundColor: "var(--color-signal-green)" }}
              transition={{ duration: 0.2, delay: 0.2 + (i + 1) * step }}
              className="grid size-5 place-items-center rounded-full text-page"
            >
              <Check className="size-3" strokeWidth={3} />
            </motion.span>
            {task}
          </li>
        ))}
      </ul>
      <Rise delay={0.4 + CLOSE_TASKS.length * step} className="mt-auto rounded-(--radius-card) bg-ink px-3 py-2.5 text-[13px] text-page">
        Books closed · Nov 3, 9:12am
      </Rise>
    </div>
  )
}

export const FLOW_SCREENS = [SwipeScreen, CaptureScreen, ApproveScreen, CodeScreen, CloseScreen]

/** The phone the screens play in. */
export function FlowPhone({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative h-[560px] w-[290px] overflow-hidden rounded-[42px] bg-raised p-2 shadow-(--shadow-lift) ring-1 ring-line", className)}>
      <div className="relative h-full overflow-hidden rounded-[34px]">
        {children}
        <span aria-hidden className="absolute top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
      </div>
    </div>
  )
}
