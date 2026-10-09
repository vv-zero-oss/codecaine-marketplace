import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { BellRing, Check, ChevronDown, GitBranch, Inbox, Play, Plus, RotateCcw, UserCheck, X } from "lucide-react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const THRESHOLDS = [0, 1000, 5000, 10000, 25000]
const FIELDS = { amount: { label: "Amount", value: 7200 }, tax: { label: "Tax", value: 576 } } as const
type Field = keyof typeof FIELDS

const APPROVERS = [
  { id: "do", initials: "DO", name: "Department owner", tone: "bg-signal-green-soft text-signal-green" },
  { id: "fn", initials: "FN", name: "Finance", tone: "bg-signal-blue-soft text-signal-blue" },
] as const

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" })

/** A node's rail icon: the step's glyph on a soft tile, lit while it runs. */
function RailIcon({ icon: Icon, lit, done, accent = false }: { icon: typeof Inbox; lit: boolean; done: boolean; accent?: boolean }) {
  return (
    <span
      className={cn(
        "relative z-10 grid size-8 shrink-0 place-items-center rounded-(--radius-field) transition-[background-color,color,box-shadow] duration-(--duration-swap)",
        accent ? "bg-signal-blue text-white" : "bg-panel-deep text-ink-3",
        lit && "shadow-[0_0_0_3px_var(--color-lime)]",
        done && !accent && "bg-ink text-page",
      )}
    >
      <Icon className="size-4" strokeWidth={1.8} />
    </span>
  )
}

/** A white chip, the unit the builder is made of. */
function Chip({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("inline-flex min-h-10 items-center gap-2 rounded-(--radius-card) bg-raised px-3 text-[14px] text-ink shadow-(--shadow-card) sm:text-[15px]", className)}>{children}</span>
}

/** What a step says once the test has passed through it. */
function Outcome({ show, tone, children }: { show: boolean; tone: "green" | "grey" | "blue"; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, transform: "translateY(4px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            "inline-flex h-6 items-center gap-1 rounded-full px-2 font-mono text-[11px]",
            tone === "green" && "bg-signal-green-soft text-signal-green",
            tone === "grey" && "bg-panel-deep text-ink-3",
            tone === "blue" && "bg-signal-blue-soft text-signal-blue",
          )}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

/**
 * The pointer that demonstrates the builder before anyone touches it. It
 * drifts between the chips and presses one; it fades away as soon as the
 * visitor's own pointer is over the panel, so it never fights them.
 */
export function AdminCursor({ label = "Admin", duration = 9, paused = false }: { label?: string; duration?: number; paused?: boolean }) {
  const reduced = useReducedMotion()
  const still = reduced || paused
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-20 flex flex-col items-start transition-opacity duration-(--duration-hover) group-hover/builder:opacity-0"
      style={{ left: "64%", top: "70%" }}
      animate={still ? undefined : { left: ["64%", "52%", "52%", "30%", "30%", "64%"], top: ["70%", "36%", "36%", "56%", "56%", "70%"] }}
      transition={{ duration, repeat: Infinity, ease: [0.77, 0, 0.175, 1], times: [0, 0.2, 0.35, 0.55, 0.75, 1] }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="size-6 drop-shadow-[0_2px_3px_rgb(21_20_20/0.25)]"
        animate={still ? undefined : { scale: [1, 1, 0.82, 1, 1, 0.82, 1, 1] }}
        transition={{ duration, repeat: Infinity, times: [0, 0.27, 0.3, 0.33, 0.67, 0.7, 0.73, 1] }}
      >
        <path d="M4 3l15 7.2-6.4 1.9L9.9 19z" className="fill-ink stroke-page" strokeWidth="1.4" strokeLinejoin="round" />
      </motion.svg>
      <span className="mt-1 ml-4 rounded-full bg-raised px-2.5 py-1 text-[12px] text-ink shadow-(--shadow-card)">{label}</span>
    </motion.div>
  )
}

/**
 * A working approval rule. Change the field, the threshold or who has to
 * sign off, then run a test bill through it and watch each step answer.
 */
export function WorkflowBuilder({ testAmount = 7200, stepDelay = 0.6 }: { testAmount?: number; stepDelay?: number }) {
  const [field, setField] = useState<Field>("amount")
  const [threshold, setThreshold] = useState(5000)
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ do: true, fn: true })
  const [step, setStep] = useState(-1) // -1 idle, 0..3 running, 4 done
  const { designing } = useCanvasDesignMode()

  const value = field === "amount" ? testAmount : Math.round(testAmount * 0.08)
  const met = value >= threshold
  const running = step >= 0 && step < 4

  useEffect(() => {
    if (step < 0 || step >= 4) return
    const id = window.setTimeout(() => setStep((s) => s + 1), stepDelay * 1000)
    return () => window.clearTimeout(id)
  }, [step, stepDelay])

  useCanvasAction("Approval test: finished", (next) => setStep((next ?? step < 4) ? 4 : -1), { on: step === 4, group: "Scale" })

  const reset = () => setStep(-1)
  const lit = (n: number) => running && step === n
  const passed = (n: number) => step > n

  return (
    <div className="group/builder relative flex h-full min-h-[420px] flex-col justify-center gap-3 p-5 sm:p-8">
      {/* Trigger */}
      <div className="flex items-center gap-3">
        <RailIcon icon={Inbox} lit={lit(0)} done={passed(0)} accent />
        <Chip>When a bill is created</Chip>
        <Outcome show={passed(0)} tone="blue">{usd(testAmount)} bill</Outcome>
      </div>
      <span aria-hidden className="ml-4 h-3 w-px bg-line-strong" />

      {/* Condition */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        <RailIcon icon={GitBranch} lit={lit(1)} done={passed(1)} />
        <span className="ml-1 text-[14px] text-ink-2 sm:text-[15px]">If the</span>
        <Chip className="relative pr-2">
          <label htmlFor="wf-field" className="sr-only">Field</label>
          <select
            id="wf-field"
            value={field}
            onChange={(e) => { setField(e.target.value as Field); reset() }}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {Object.entries(FIELDS).map(([key, f]) => <option key={key} value={key}>{f.label}</option>)}
          </select>
          <span className="text-ink-3">{FIELDS[field].label}</span>
          <ChevronDown className="size-3.5 text-ink-3" />
        </Chip>
        <span className="text-[14px] text-ink-2 sm:text-[15px]">is at least</span>
        <Chip className="relative pr-1.5">
          <label htmlFor="wf-threshold" className="sr-only">Threshold</label>
          <select
            id="wf-threshold"
            value={threshold}
            onChange={(e) => { setThreshold(Number(e.target.value)); reset() }}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {THRESHOLDS.map((t) => <option key={t} value={t}>{t === 0 ? "Any amount" : usd(t)}</option>)}
          </select>
          <span className="font-mono text-[13px] tabular-nums">{threshold === 0 ? "Any amount" : usd(threshold)}</span>
          <button
            type="button"
            aria-label="Clear threshold"
            onClick={() => { setThreshold(0); reset() }}
            className="relative z-10 grid size-7 place-items-center rounded-full text-ink-3 transition-colors hover:bg-panel hover:text-ink"
          >
            <X className="size-3.5" />
          </button>
        </Chip>
        <Outcome show={passed(1)} tone={met ? "green" : "grey"}>{met ? "Matched" : "Not matched"}</Outcome>
      </div>
      <span aria-hidden className="ml-4 h-3 w-px bg-line-strong" />

      {/* Require */}
      <div className="flex flex-wrap items-center gap-2">
        <RailIcon icon={UserCheck} lit={lit(2)} done={passed(2)} />
        <span className="ml-1 text-[14px] text-ink-2 sm:text-[15px]">Require</span>
        {APPROVERS.map((a, i) => {
          const on = enabled[a.id]
          return (
            <span key={a.id} className="inline-flex items-center gap-2">
              {i > 0 && <Plus className="size-3.5 text-ink-3" />}
              <button
                type="button"
                aria-pressed={on}
                onClick={() => { setEnabled((e) => ({ ...e, [a.id]: !e[a.id] })); reset() }}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 rounded-(--radius-card) px-1.5 pr-3 text-[14px] transition-[background-color,box-shadow,color,transform] duration-(--duration-hover) active:scale-[0.97] sm:text-[15px]",
                  on ? "bg-raised text-ink shadow-(--shadow-card)" : "bg-transparent text-ink-3 shadow-[inset_0_0_0_1px_var(--color-line-strong)] [&>span:first-child]:opacity-40",
                )}
              >
                <span className={cn("grid size-7 place-items-center rounded-(--radius-field) font-mono text-[11px]", a.tone)}>{a.initials}</span>
                {a.name}
                {passed(2) && on && (
                  <Check className={cn("size-3.5", met ? "text-signal-green" : "text-ink-4")} strokeWidth={2.5} />
                )}
              </button>
            </span>
          )
        })}
        <Outcome show={passed(2)} tone={met && Object.values(enabled).some(Boolean) ? "green" : "grey"}>
          {!met ? "Skipped" : Object.values(enabled).some(Boolean) ? "Approved" : "No approver"}
        </Outcome>
      </div>
      <span aria-hidden className="ml-4 h-3 w-px bg-line-strong" />

      {/* Notify */}
      <div className="flex flex-wrap items-center gap-2">
        <RailIcon icon={BellRing} lit={lit(3)} done={passed(3)} />
        <span className="ml-1 text-[14px] text-ink-2 sm:text-[15px]">Notify</span>
        <Chip className="pl-1.5">
          <span className="grid size-7 place-items-center rounded-(--radius-field) bg-signal-amber-soft font-mono text-[11px] text-signal-amber">VM</span>
          Vendor manager
        </Chip>
        <Outcome show={passed(3)} tone="blue">Sent</Outcome>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setStep(step === 4 ? -1 : 0)}
          disabled={running}
          className="inline-flex h-11 items-center gap-2 rounded-(--radius-button) bg-ink px-4 text-[14px] font-medium text-page shadow-(--shadow-button) transition-[transform,background-color] duration-(--duration-hover) hover:bg-ink-2 active:scale-[0.97] disabled:opacity-60"
        >
          {step === 4 ? <RotateCcw className="size-4" /> : <Play className="size-4" />}
          {step === 4 ? "Reset" : running ? "Running…" : `Test with a ${usd(testAmount).replace(".00", "")} bill`}
        </button>
        <span className="text-[13px] text-ink-3">
          {step === 4 ? (met ? `Routed to ${Object.values(enabled).filter(Boolean).length} approver(s) in 2.4s.` : "Under the threshold — paid without a sign-off.") : "Change the rule, then run it."}
        </span>
      </div>

      {!designing && <AdminCursor />}
    </div>
  )
}
