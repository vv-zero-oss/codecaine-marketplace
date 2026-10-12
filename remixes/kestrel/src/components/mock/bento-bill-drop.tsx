import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { BarChart3, Check, CreditCard, Landmark, Plane, ReceiptText, RotateCcw, Upload } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { KestrelMark } from "@/components/site/logo"
import { cn } from "@/lib/utils"

type Phase = "idle" | "reading" | "read"
const EASE = [0.23, 1, 0.32, 1] as const

/** Turns whatever file was dropped into a believable vendor name. */
function vendorFrom(name: string) {
  const base = name.replace(/\.[a-z0-9]+$/i, "").replace(/[_-]+/g, " ").replace(/\d+/g, "").trim()
  if (!base || base.length < 3) return "Atlas Cloud"
  return base.replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 22)
}

const CHAIN = [
  { who: "Requester", name: "Maya Okafor" },
  { who: "Budget owner", name: "Dev Raman" },
  { who: "Finance", name: "Scheduled · Oct 14" },
]

/**
 * A bills inbox that actually takes a file. Drop one in (or click to pick
 * one) and it is "read": a scan passes over it, the fields fill, and the
 * approval chain routes itself. Nothing leaves the browser — the file is
 * only used for its name. Reset puts it back.
 */
export function BillDrop({ readDuration = 1.6, className }: { readDuration?: number; className?: string }) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [over, setOver] = useState(false)
  const [vendor, setVendor] = useState("Atlas Cloud")
  const input = useRef<HTMLInputElement>(null)
  useCanvasAction("Bill pay: reading", (next) => setPhase((next ?? phase !== "reading") ? "reading" : "idle"), { on: phase === "reading", group: "Platform" })
  useCanvasAction("Bill pay: read", (next) => setPhase((next ?? phase !== "read") ? "read" : "idle"), { on: phase === "read", group: "Platform" })

  useEffect(() => {
    if (phase !== "reading") return
    const t = window.setTimeout(() => setPhase("read"), readDuration * 1000)
    return () => window.clearTimeout(t)
  }, [phase, readDuration])

  const take = (file?: File | null) => {
    setVendor(file ? vendorFrom(file.name) : "Atlas Cloud")
    setPhase("reading")
  }

  return (
    <div className={cn("flex h-full overflow-hidden rounded-tl-(--radius-card) bg-raised shadow-(--shadow-float)", className)}>
      <div className="hidden w-11 shrink-0 flex-col items-center gap-4 border-r border-line bg-panel/60 pt-11 text-ink-4 sm:flex">
        <KestrelMark className="size-4 text-ink-3" />
        {[BarChart3, CreditCard, ReceiptText, Plane, Landmark].map((Icon, i) => (
          <Icon key={i} className={cn("size-4", i === 2 && "text-ink")} strokeWidth={1.7} />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-9 items-center gap-1.5 border-b border-line px-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-panel-deep" />
          ))}
          <span className="mx-auto text-[12px] text-ink-3">Kestrel · Bills</span>
          {phase !== "idle" && (
            <button onClick={() => setPhase("idle")} className="flex h-7 items-center gap-1 rounded-(--radius-chip) px-2 text-[12px] text-ink-3 transition-colors hover:bg-panel hover:text-ink">
              <RotateCcw className="size-3" /> Reset
            </button>
          )}
        </div>

        <div className="relative flex-1 p-4">
          <AnimatePresence mode="wait" initial={false}>
            {phase === "idle" && (
              <motion.button
                key="idle"
                type="button"
                onClick={() => input.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  setOver(true)
                }}
                onDragLeave={() => setOver(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setOver(false)
                  take(e.dataTransfer.files?.[0])
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE }}
                className={cn(
                  "group grid size-full min-h-[260px] place-items-center rounded-(--radius-field) border border-dashed text-center transition-colors duration-(--duration-hover)",
                  over ? "border-signal-blue bg-signal-blue-soft" : "border-line-strong bg-page hover:bg-panel/60",
                )}
              >
                <span className="flex flex-col items-center gap-2">
                  <span className="grid size-11 place-items-center rounded-full bg-panel text-ink-3 transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover:-translate-y-0.5">
                    <Upload className="size-4" />
                  </span>
                  <span className="text-[15px] text-ink">Drop your invoice</span>
                  <span className="text-[13px] text-ink-3">or click to choose any file</span>
                </span>
              </motion.button>
            )}

            {phase === "reading" && (
              <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="relative mx-auto h-full min-h-[260px] max-w-[300px] overflow-hidden rounded-(--radius-field) bg-page p-4 shadow-(--shadow-card)">
                <p className="text-[13px] font-medium text-ink">{vendor}</p>
                <div className="mt-4 flex flex-col gap-2">
                  {[90, 70, 85, 60, 75, 50, 80].map((w, i) => (
                    <span key={i} className="h-2 rounded-full bg-panel" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <motion.span
                  className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-signal-blue/25 to-transparent"
                  initial={{ top: "-20%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: readDuration * 0.8, ease: [0.77, 0, 0.175, 1], repeat: Infinity }}
                />
                <p className="absolute inset-x-0 bottom-3 text-center text-[12px] text-signal-blue">Reading invoice…</p>
              </motion.div>
            )}

            {phase === "read" && (
              <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid h-full gap-3 sm:grid-cols-[1fr_170px]">
                <dl className="grid content-start gap-1.5">
                  {[
                    ["Vendor", vendor],
                    ["Amount", "$4,210.55"],
                    ["Due", "Oct 14, 2026"],
                    ["GL account", "6410 · Hosting"],
                    ["Matched PO", "PO-1182"],
                  ].map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.05 + i * 0.08 }}
                      className="flex items-center justify-between gap-2 rounded-[5px] bg-panel px-2.5 py-2"
                    >
                      <dt className="text-[12px] text-ink-3">{k}</dt>
                      <dd className="truncate text-[13px] text-ink">{v}</dd>
                    </motion.div>
                  ))}
                </dl>
                <ol className="flex flex-col gap-1">
                  <li className="type-eyebrow mb-1 text-[10px] text-ink-3">Approvals</li>
                  {CHAIN.map((step, i) => (
                    <motion.li
                      key={step.who}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.5 + i * 0.35 }}
                      className="flex items-center gap-2 rounded-[5px] border border-line px-2 py-1.5"
                    >
                      <span className={cn("grid size-5 shrink-0 place-items-center rounded-full", i < 2 ? "bg-signal-green text-white" : "bg-signal-blue-soft text-signal-blue")}>
                        <Check className="size-3" strokeWidth={2.6} />
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block text-[10.5px] text-ink-3">{step.who}</span>
                        <span className="block truncate text-[12px] text-ink">{step.name}</span>
                      </span>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
          <input ref={input} type="file" className="sr-only" tabIndex={-1} aria-hidden onChange={(e) => {
              take(e.target.files?.[0])
              e.target.value = ""
            }} />
        </div>
      </div>
    </div>
  )
}
