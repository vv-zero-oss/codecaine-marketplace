import { createContext, useContext, type ReactNode } from "react"
import { motion } from "motion/react"
import { Check, FileText, Inbox, Loader2 } from "lucide-react"

import { KestrelMark } from "@/components/site/logo"
import { MetalCard } from "@/components/mock/hero-metal-card"
import { cn } from "@/lib/utils"

/**
 * The four scenes of the hero stage, drawn on a fixed 960×480 canvas that
 * the stage scales to fit. Each scene choreographs its own pieces with
 * short ease-outs and small staggers; with `still` set (reduced motion, or
 * the editor holding a scene) every piece renders at its end state.
 */

const EASE = [0.23, 1, 0.32, 1] as const
export const StageMotion = createContext({ still: false })

/** A piece that pops into place: a little rise, a little scale, a fade. */
function Pop({
  x,
  y,
  w,
  delay = 0,
  from = { y: 10, scale: 0.97 },
  className,
  children,
}: {
  x: number
  y: number
  w?: number
  delay?: number
  from?: { x?: number; y?: number; scale?: number }
  className?: string
  children: ReactNode
}) {
  const { still } = useContext(StageMotion)
  const hidden = { opacity: 0, x: from.x ?? 0, y: from.y ?? 0, scale: from.scale ?? 1, filter: "blur(3px)" }
  const shown = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ left: x, top: y, width: w }}
      initial={still ? shown : hidden}
      animate={shown}
      transition={{ duration: 0.6, ease: EASE, delay: still ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}

/** A panel floating over the dot grid: white, soft shadow, small radius. */
function Panel({ label, className, children }: { label?: string; className?: string; children?: ReactNode }) {
  return (
    <div className={cn("rounded-(--radius-card) bg-raised p-3 shadow-(--shadow-float)", className)}>
      {label && <p className="type-eyebrow text-[9.5px] text-ink-3">{label}</p>}
      {children}
    </div>
  )
}

/** A check that lands after `delay`. */
function Tick({ delay = 0, className }: { delay?: number; className?: string }) {
  const { still } = useContext(StageMotion)
  return (
    <motion.span
      className={cn("grid size-4 shrink-0 place-items-center rounded-full bg-signal-green text-white", className)}
      initial={still ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0.3, delay: still ? 0 : delay }}
    >
      <Check className="size-2.5" strokeWidth={3} />
    </motion.span>
  )
}

/** Grey bars standing in for text the eye skims. */
function Lines({ widths, className }: { widths: number[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {widths.map((w, i) => (
        <span key={i} className="h-1.5 rounded-full bg-panel-deep" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */

/** (a) The card leaves its slot. */
export function CardScene() {
  const { still } = useContext(StageMotion)
  return (
    <>
      <motion.div
        className="absolute rounded-[28px] bg-raised shadow-(--shadow-float)"
        style={{ left: 368, top: 52, width: 224, height: 200 }}
        initial={still ? false : { opacity: 0, scale: 0.96 }}
        animate={still ? { opacity: 0 } : { opacity: [0, 1, 1, 0], scale: [0.96, 1, 1, 0.98] }}
        transition={{ duration: 2.2, times: [0, 0.18, 0.62, 1], ease: "easeOut" }}
      >
        <span className="absolute inset-x-8 top-6 h-2 rounded-full bg-panel shadow-[inset_0_1px_2px_var(--color-line-strong)]" />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ left: 405, top: 96, width: 150 }}
        initial={still ? false : { opacity: 0, y: -70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: still ? 0 : 0.25 }}
      >
        <MetalCard className="w-full" />
      </motion.div>
      {!still &&
        [
          [300, 120],
          [640, 170],
          [330, 330],
          [610, 360],
        ].map(([x, y], i) => (
          <motion.span
            key={i}
            className="absolute size-1 rounded-full bg-ink"
            style={{ left: x, top: y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, delay: 1.1 + i * 0.12 }}
          />
        ))}
    </>
  )
}

/** (b) The agents gather around the card: receipt, policy, coding. */
export function MatchScene() {
  const { still } = useContext(StageMotion)
  return (
    <>
      <Pop x={405} y={120} w={150} from={{ scale: 0.98 }}>
        <MetalCard className="w-full" />
      </Pop>
      <Pop x={196} y={64} w={190} delay={0.15}>
        <Panel label="Matching receipt">
          <div className="mt-2 flex items-center gap-3">
            <div className="h-16 w-12 rounded-[4px] bg-panel p-1.5">
              <Lines widths={[90, 60, 80, 50, 70]} className="gap-1" />
            </div>
            <div className="flex-1 text-[11px] leading-tight">
              <p className="font-medium text-ink">Coastline Coffee</p>
              <p className="text-ink-3">$18.40 · 8:12am</p>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] text-signal-green">
                <Tick delay={1.2} /> Matched
              </div>
            </div>
          </div>
        </Panel>
      </Pop>
      <Pop x={580} y={82} w={200} delay={0.3}>
        <Panel label="Fetching receipt">
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-ink-2">
            <Loader2 className="size-3 animate-spin text-ink-3 motion-reduce:animate-none" /> Searching inbox for “Coastline”
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-panel">
            <motion.span
              className="block h-full origin-left rounded-full bg-signal-blue"
              initial={still ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay: still ? 0 : 0.5 }}
            />
          </div>
        </Panel>
      </Pop>
      <Pop x={170} y={268} w={214} delay={0.45}>
        <Panel label="Checking policy">
          <ul className="mt-2 flex flex-col gap-1.5 text-[11px] text-ink-2">
            {["Meals under $25", "Weekday, home city", "Receipt attached"].map((rule, i) => (
              <li key={rule} className="flex items-center justify-between gap-2">
                {rule}
                <Tick delay={0.9 + i * 0.25} />
              </li>
            ))}
          </ul>
        </Panel>
      </Pop>
      <Pop x={598} y={300} w={184} delay={0.6}>
        <Panel className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-signal-green-soft text-signal-green">
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
          <div className="text-[11px] leading-tight">
            <p className="font-medium text-ink">Coded to Meals</p>
            <p className="font-mono text-[10px] text-ink-3">GL 6720 · Sales</p>
          </div>
        </Panel>
      </Pop>
    </>
  )
}

/** (c) Invoices are dragged into the capture window. */
export function CaptureScene() {
  const { still } = useContext(StageMotion)
  const files = ["inv_2041.pdf", "inv_2042.pdf", "inv_2043.pdf", "inv_2044.pdf"]
  return (
    <>
      <Pop x={270} y={46} w={420}>
        <div className="overflow-hidden rounded-(--radius-card) bg-raised shadow-(--shadow-float)">
          <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full bg-panel-deep" />
            ))}
            <span className="ml-2 type-eyebrow text-[9.5px] text-ink-3">Capture invoice</span>
          </div>
          <div className="p-4">
            <motion.div
              className="grid h-[250px] place-items-center rounded-(--radius-field) border border-dashed"
              initial={still ? false : { borderColor: "var(--color-line-strong)", backgroundColor: "var(--color-panel)" }}
              animate={{ borderColor: "var(--color-signal-blue)", backgroundColor: "var(--color-signal-blue-soft)" }}
              transition={{ duration: 0.3, delay: still ? 0 : 1.35 }}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <KestrelMark className="size-7 text-ink-4" />
                <motion.p
                  className="text-[12px] text-ink-3"
                  initial={still ? false : { opacity: 1 }}
                  animate={{ opacity: still ? 0 : [1, 1, 0] }}
                  transition={{ duration: 1.6, times: [0, 0.85, 1] }}
                >
                  {still ? "" : "Drop your invoice"}
                </motion.p>
                <motion.p
                  className="flex items-center gap-1.5 text-[12px] font-medium text-signal-blue"
                  initial={still ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: still ? 0 : 1.7 }}
                >
                  <Inbox className="size-3.5" /> 4 invoices received
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </Pop>
      {/* the drag: cursor and its stack of files travel in together */}
      <motion.div
        className="absolute"
        style={{ left: 0, top: 0 }}
        initial={still ? false : { x: 770, y: 360, opacity: 0 }}
        animate={still ? { x: 470, y: 190, opacity: 0 } : { x: [770, 770, 470], y: [360, 360, 190], opacity: [0, 1, 1] }}
        transition={{ duration: 1.35, times: [0, 0.2, 1], ease: [0.77, 0, 0.175, 1] }}
      >
        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: still ? 0 : 1, scale: 1 }}
          animate={still ? { opacity: 0 } : { opacity: [1, 1, 0], scale: [1, 1, 0.9] }}
          transition={{ duration: 1.8, times: [0, 0.78, 1] }}
        >
          {files.map((file, i) => (
            <span
              key={file}
              className="flex items-center gap-1.5 rounded-[5px] bg-signal-blue px-2 py-1 text-[10px] font-medium text-white shadow-(--shadow-card)"
              style={{ marginLeft: i * 6 }}
            >
              <FileText className="size-3" /> {file}
            </span>
          ))}
        </motion.div>
        <svg viewBox="0 0 24 24" className="absolute -top-3 -left-3 size-6 drop-shadow-sm" aria-hidden>
          <path d="M5 3l14 8-6 1.5L10 19z" fill="var(--color-ink)" stroke="var(--color-raised)" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </>
  )
}

/** (d) The invoice is read, coded and one field flagged. */
export function InvoiceScene() {
  const { still } = useContext(StageMotion)
  const lines = [
    ["Brand identity", "1", "$8,500.00"],
    ["Website build", "1", "$18,000.00"],
    ["Support retainer", "3", "$2,400.00"],
  ]
  const coding = [
    ["Memo", "Website build"],
    ["Amount", "$18,000.00"],
    ["Category", "Professional services"],
    ["Department", "Marketing"],
    ["Location", "New York"],
  ]
  return (
    <>
      <Pop x={70} y={92} w={190} delay={0.25}>
        <Panel label="Matched to PO">
          <div className="mt-2 flex items-center gap-2">
            {["PO #2041", "INV #2041"].map((t) => (
              <div key={t} className="flex-1 rounded-[4px] bg-panel p-1.5">
                <p className="text-[9px] text-ink-3">{t}</p>
                <Lines widths={[80, 55, 70]} className="mt-1 gap-1" />
              </div>
            ))}
          </div>
        </Panel>
      </Pop>
      <Pop x={300} y={26} w={330} from={{ y: 16, scale: 0.98 }}>
        <div className="rounded-(--radius-card) bg-raised p-5 shadow-(--shadow-float)">
          <p className="text-[15px] font-medium tracking-[-0.02em] text-ink">Loft &amp; Lumen Studio</p>
          <div className="mt-3 flex justify-between text-[9.5px] leading-snug text-ink-3">
            <div>
              <p className="text-ink-2">Bill to</p>
              <p>Northwind Labs</p>
              <p>88 Hudson St, NY</p>
            </div>
            <div className="text-right">
              <p className="text-ink-2">Invoice details</p>
              <p>Date 09/14/26</p>
              <p>No. LL-2041 · Due 10/14/26</p>
            </div>
          </div>
          <div className="mt-4 border-t border-line pt-2 text-[10px]">
            <div className="grid grid-cols-[1fr_30px_70px] pb-1 text-ink-3">
              <span>Description</span>
              <span>Qty</span>
              <span className="text-right">Amount</span>
            </div>
            {lines.map(([d, q, a]) => (
              <div key={d} className="grid grid-cols-[1fr_30px_70px] border-t border-line py-1.5 text-ink-2">
                <span>{d}</span>
                <span>{q}</span>
                <span className="text-right font-mono">{a}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 ml-auto w-40 text-[10px] text-ink-3">
            {[
              ["Subtotal", "$28,900.00"],
              ["Tax (8%)", "$2,312.00"],
            ].map(([k, v]) => (
              <p key={k} className="flex justify-between py-0.5">
                {k}
                <span className="font-mono">{v}</span>
              </p>
            ))}
            <p className="mt-1 flex justify-between border-t border-line pt-1.5 text-[11px] font-medium text-ink">
              Total due <span className="font-mono">$31,212.00</span>
            </p>
          </div>
        </div>
      </Pop>
      <Pop x={664} y={56} w={210} delay={0.5}>
        <div className="relative border border-ink/30 bg-raised/90 p-3">
          {["-top-[3px] -left-[3px]", "-top-[3px] -right-[3px]", "-bottom-[3px] -left-[3px]", "-right-[3px] -bottom-[3px]"].map((pos) => (
            <span key={pos} className={cn("absolute size-1.5 bg-ink", pos)} />
          ))}
          <p className="flex items-center gap-1.5 type-eyebrow text-[9.5px] text-ink">
            Flagged for review <span className="size-1.5 rounded-full bg-signal-red" />
          </p>
          <dl className="mt-2 grid grid-cols-[1fr_auto] gap-y-1 text-[10px]">
            <dt className="text-ink-3">Invoice date</dt>
            <dd className="font-mono text-ink-2">09/14/26</dd>
            <dt className="text-signal-red">Invoice #</dt>
            <dd className="font-mono text-signal-red">LL-2041 · seen</dd>
            <dt className="text-ink-3">Due date</dt>
            <dd className="font-mono text-ink-2">10/14/26</dd>
          </dl>
        </div>
      </Pop>
      <Pop x={584} y={258} w={320} delay={0.7}>
        <Panel label="Auto-coding">
          <dl className="mt-2 grid grid-cols-2 gap-1.5">
            {coding.map(([k, v], i) => (
              <div key={k} className={cn("rounded-[5px] bg-panel px-2 py-1.5", i === 0 && "col-span-2")}>
                <dt className="text-[9px] text-ink-3">{k}</dt>
                <motion.dd
                  className="text-[11px] text-ink"
                  initial={still ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.45, ease: EASE, delay: still ? 0 : 1.1 + i * 0.22 }}
                >
                  {v}
                </motion.dd>
              </div>
            ))}
          </dl>
        </Panel>
      </Pop>
    </>
  )
}
