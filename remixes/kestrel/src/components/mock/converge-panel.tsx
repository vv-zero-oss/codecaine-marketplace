import { motion, useTransform, type MotionValue } from "motion/react"
import { Check, Plane } from "lucide-react"

import { KestrelMark } from "@/components/site/logo"
import { CONVERGE, PEOPLE } from "@/content/home-story"
import { money } from "@/lib/photos"

/** One line of the resolved expense; its tick lands at `at` (0–1 of the pin). */
function ResolvedStep({ progress, at, label, detail }: { progress: MotionValue<number>; at: number; label: string; detail: string }) {
  const opacity = useTransform(progress, [at, at + 0.04], [0.35, 1])
  const tick = useTransform(progress, [at, at + 0.04], [0.6, 1])
  const tickOpacity = useTransform(progress, [at, at + 0.03], [0, 1])
  return (
    <motion.li style={{ opacity }} className="flex items-start gap-3 border-t border-line py-3 first:border-t-0">
      <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-panel-deep">
        <motion.span style={{ scale: tick, opacity: tickOpacity }} className="absolute inset-0 grid place-items-center rounded-full bg-signal-green text-page">
          <Check className="size-3" strokeWidth={3} />
        </motion.span>
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] text-ink">{label}</span>
        <span className="block text-[13px] text-ink-3">{detail}</span>
      </span>
    </motion.li>
  )
}

/**
 * The "after": the same flight as one resolved expense in Kestrel. Its four
 * steps tick green one after another as the pin plays out.
 */
export function ConvergePanel({ progress, tickFrom = 0.72 }: { progress: MotionValue<number>; tickFrom?: number }) {
  const { expense } = CONVERGE
  return (
    <div className="w-[min(460px,calc(100vw-32px))] overflow-hidden rounded-(--radius-panel) bg-raised shadow-(--shadow-lift) ring-1 ring-line">
      <div className="flex items-center justify-between border-b border-line bg-panel px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
          <KestrelMark className="size-3.5" /> Expense
        </span>
        <span className="rounded-full bg-lime px-2 py-0.5 text-[11.5px] font-medium text-lime-ink">Resolved by agent</span>
      </div>
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-(--radius-card) bg-signal-blue-soft text-signal-blue">
          <Plane className="size-5" strokeWidth={1.7} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[16px] font-medium text-ink">{expense.merchant}</span>
          <span className="flex items-center gap-1.5 text-[13px] text-ink-3">
            <img src={PEOPLE.priya.photo} alt="" className="size-4 rounded-full object-cover" />
            {expense.who} · {expense.date}
          </span>
        </span>
        <span className="font-mono text-[20px] font-medium tracking-tight text-ink tabular-nums">{money(expense.amount)}</span>
      </div>
      <ul className="px-4 pb-2">
        {expense.steps.map((step, i) => (
          <ResolvedStep key={step.label} progress={progress} at={tickFrom + i * 0.05} label={step.label} detail={step.detail} />
        ))}
      </ul>
    </div>
  )
}
