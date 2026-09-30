import { useEffect, useState } from "react"
import {
  ArrowUp,
  AtSign,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Mail,
  Paperclip,
  Phone,
  Search,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Star,
  User,
} from "lucide-react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import type { Brand } from "@/components/ui/brand-logo"
import { ArclineMark } from "@/components/ui/wordmark"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { Avatar, Card, Chip, CompanyMark, type Tone } from "./kit"

/** True once the element has scrolled into view (or straight away when motion is off). */
export function usePlay(ref: React.RefObject<Element | null>) {
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  return { play: inView || !!reduced || designing, still: !!reduced || designing }
}

const COMPANIES: { name: string; brand?: Brand; score: number; owner: string; tone: Tone; research: string }[] = [
  { name: "Linear", brand: "linear", score: 98, owner: "Priya Shah", tone: "accent", research: "Hiring 6 AEs; new VP Sales in March" },
  { name: "Vercel", brand: "vercel", score: 97, owner: "Theo Marsh", tone: "green", research: "Opened 3 roles in RevOps this month" },
  { name: "Supabase", brand: "supabase", score: 96, owner: "Amelia Cole", tone: "orange", research: "Series D; expanding into EMEA" },
  { name: "Figma", brand: "figma", score: 94, owner: "Nathan Reid", tone: "purple", research: "Evaluating CRMs, per job posts" },
  { name: "Loom", brand: "loom", score: 92, owner: "Daniel Frost", tone: "red", research: "Sales team doubled since June" },
  { name: "Webflow", brand: "webflow", score: 91, owner: "Maxwell Turner", tone: "yellow", research: "New enterprise tier launched" },
  { name: "Discord", brand: "discord", score: 88, owner: "Samuel Clark", tone: "accent", research: "Hiring first Head of Partnerships" },
  { name: "Shopify", brand: "shopify", score: 86, owner: "Isla Harrington", tone: "green", research: "Moved deals to a new pipeline" },
]

/** The companies table with an email draft floating over its right edge. */
export function CompaniesTable() {
  const ref = useRef<HTMLDivElement>(null)
  const { play } = usePlay(ref)
  return (
    <div ref={ref} className="relative h-[470px] w-[1000px]">
      <Card className="absolute top-0 left-0 w-[760px] overflow-hidden">
        <div className="flex h-12 items-center gap-2 border-b border-line px-4 text-sm text-ink">
          <Building2 className="size-3.5 text-accent" /> Companies to work
          <span className="ml-auto flex items-center gap-3 text-ink-2">
            <span className="flex -space-x-1">
              <Avatar initials="PS" size={18} className="ring-2 ring-surface" />
              <Avatar initials="TM" tone="green" size={18} className="ring-2 ring-surface" />
            </span>
            <Share2 className="size-3.5" />
            <span className="flex h-7 items-center gap-1.5 rounded-control px-2 shadow-btn">
              <Sparkles className="size-3 text-accent" /> Ask Arcline
            </span>
          </span>
        </div>
        <div className="flex h-11 items-center gap-2 border-b border-line px-4 text-caption text-ink-soft">
          <span className="flex h-7 items-center gap-1 rounded-control px-2 shadow-btn">
            All companies <ChevronDown className="size-3" />
          </span>
          <span className="flex h-7 items-center gap-1 rounded-control px-2 shadow-btn">
            <SlidersHorizontal className="size-3" /> View settings
          </span>
        </div>
        <div className="grid grid-cols-[28px_150px_110px_160px_1fr] border-b border-line text-caption text-ink-2 [&>span]:flex [&>span]:h-9 [&>span]:items-center [&>span]:gap-1.5 [&>span]:border-r [&>span]:border-line [&>span]:px-2">
          <span />
          <span><Building2 className="size-3" /> Company</span>
          <span><Star className="size-3" /> Intent</span>
          <span><User className="size-3" /> Owner</span>
          <span className="border-r-0"><Search className="size-3" /> Research</span>
        </div>
        {COMPANIES.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={cn(
              "grid grid-cols-[28px_150px_110px_160px_1fr] border-b border-line text-sm last:border-b-0 [&>span]:flex [&>span]:h-9 [&>span]:items-center [&>span]:gap-2 [&>span]:border-r [&>span]:border-line [&>span]:px-2",
              i === 5 && "bg-accent-tint/40",
            )}
          >
            <span className="justify-center">
              <span className={cn("size-3.5 rounded-[4px] border border-line-bold", i === 5 && "border-accent-strong bg-accent-strong")}>
                {i === 5 && <Check className="size-3 text-white" />}
              </span>
            </span>
            <span className="text-ink underline decoration-line-bold underline-offset-2">
              <CompanyMark name={c.name} brand={c.brand} tone={c.tone} /> {c.name}
            </span>
            <span><Chip tone="green" className="tabular">{c.score}</Chip></span>
            <span className="text-ink-soft"><Avatar initials={c.owner.split(" ").map((p) => p[0]).join("")} tone={c.tone} /> {c.owner}</span>
            <span className="truncate border-r-0 text-ink-2">{c.research}</span>
          </motion.div>
        ))}
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE.out, delay: 0.5 }}
        className="absolute top-3 right-0 w-[340px]"
      >
        <Card className="p-4 shadow-raised">
          <p className="text-caption text-ink-3">Send email</p>
          <p className="mt-1 text-base font-semibold text-ink">Follow up with Webflow</p>
          <p className="mt-1 text-caption text-ink-2">They launched an enterprise tier and are hiring two AEs to sell it.</p>
          <div className="mt-3 rounded-card border border-line-strong">
            <div className="flex h-9 items-center gap-2 border-b border-line px-3 text-caption text-ink-2">
              To <span className="flex items-center gap-1 rounded-full bg-hover px-1.5 text-ink"><Avatar initials="MT" tone="purple" size={14} /> Maxwell Turner</span>
              <span className="ml-auto">CC / BCC</span>
            </div>
            <p className="border-b border-line px-3 py-2 text-caption text-ink">Selling your new enterprise tier</p>
            <div className="flex flex-col gap-2 px-3 py-3 text-sm text-ink-soft">
              <p>Hi Maxwell,</p>
              <p>Congrats on the enterprise launch. With two new AEs starting, the first month is where pipeline hygiene slips — Arcline logs every call and email for them from day one. Worth 20 minutes Thursday?</p>
              <p>Best,<br />Priya</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-caption">
            <span className="flex h-7 items-center rounded-control bg-accent-strong px-2.5 font-medium text-white">Send email</span>
            <span className="px-2 text-ink-2">Discard</span>
            <span className="ml-auto flex h-7 items-center rounded-control px-2.5 text-ink shadow-btn">Save draft</span>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

/** Activity that logged itself — the small card beside "Free your reps". */
export function AutoLog() {
  const ref = useRef<HTMLDivElement>(null)
  const { play } = usePlay(ref)
  const rows = [
    { icon: Mail, text: "Email from Maya Okonkwo", meta: "logged to Fieldwork", tone: "text-accent" },
    { icon: Phone, text: "Call with Theo Marsh · 24 min", meta: "summary + 3 tasks", tone: "text-green" },
    { icon: CalendarDays, text: "Meeting booked for Thursday", meta: "added to deal", tone: "text-orange" },
    { icon: Paperclip, text: "Security pack sent", meta: "stage → Proposal", tone: "text-purple" },
  ]
  return (
    <div ref={ref} className="flex w-[400px] flex-col gap-2">
      {rows.map((r, i) => (
        <motion.div
          key={r.text}
          initial={{ opacity: 0, x: -10 }}
          animate={play ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE.out, delay: 0.1 + i * 0.12 }}
        >
          <Card className="flex items-center gap-3 px-3 py-2.5">
            <span className="flex size-7 items-center justify-center rounded-control bg-hover">
              <r.icon className={cn("size-3.5", r.tone)} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-ink">{r.text}</p>
              <p className="text-caption text-ink-3">{r.meta}</p>
            </div>
            <Check className="ml-auto size-3.5 text-green" />
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * Enrichment radar: rings breathing around the account, with the facts
 * Arcline found about it bobbing at their edges.
 */
export function EnrichmentRadar() {
  const chips: { label: string; tone: "yellow" | "green" | "accent" | "purple"; pos: string; dur: number; delay: number }[] = [
    { label: "New VP Sales", tone: "yellow", pos: "top-[40px] left-[30px]", dur: 3.8, delay: 1 },
    { label: "Intent 98", tone: "green", pos: "top-[70px] right-[20px]", dur: 4.15, delay: 1.65 },
    { label: "Warm intro via Theo", tone: "accent", pos: "bottom-[70px] left-[10px]", dur: 4.5, delay: 2.3 },
    { label: "$120M Series C", tone: "purple", pos: "bottom-[40px] right-[40px]", dur: 4.85, delay: 2.95 },
  ]
  return (
    <div className="relative flex h-[300px] w-[400px] items-center justify-center">
      <span className="absolute size-[280px] animate-ring rounded-full border border-ink [--ring-from:0.067] [--ring-to:0.135] [animation-delay:0.4s]" />
      <span className="absolute size-[190px] animate-ring rounded-full border border-ink [--ring-from:0.11] [--ring-to:0.22]" />
      <span className="relative flex size-[92px] items-center justify-center rounded-full bg-ink text-page shadow-lg">
        <ArclineMark className="h-7 w-auto" />
      </span>
      {chips.map((c) => (
        <span key={c.label} className={cn("absolute animate-bob", c.pos)} style={{ ["--bob-duration" as string]: `${c.dur}s`, animationDelay: `${c.delay}s` }}>
          <Chip tone={c.tone} className="h-7 rounded-control px-2 text-caption">{c.label}</Chip>
        </span>
      ))}
    </div>
  )
}

const LIST = [
  { name: "Linear", brand: "linear" as Brand, reason: "Hiring 6 AEs after a new VP Sales" },
  { name: "Supabase", brand: "supabase" as Brand, reason: "Series D, expanding into EMEA" },
  { name: "Loom", brand: "loom" as Brand, reason: "Sales team doubled since June" },
  { name: "Figma", brand: "figma" as Brand, reason: "Job posts mention a CRM migration" },
  { name: "Webflow", brand: "webflow" as Brand, reason: "Launched an enterprise tier" },
]

/** "Ask for a list": a prompt types itself, then the list arrives row by row. */
export function PromptList() {
  const ref = useRef<HTMLDivElement>(null)
  const { play, still } = usePlay(ref)
  const text = "Find Series B+ SaaS companies hiring their first enterprise AEs"
  const [n, setN] = useState(still ? text.length : 0)

  useEffect(() => {
    if (!play) return
    if (still) {
      setN(text.length)
      return
    }
    const id = window.setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 28)
    return () => window.clearInterval(id)
  }, [play, still])

  const done = n >= text.length
  return (
    <div ref={ref} className="flex w-[520px] flex-col gap-3">
      <Card className="flex items-center gap-2 py-2 pr-2 pl-3.5">
        <p className="flex-1 text-sm text-ink">
          {text.slice(0, n)}
          {!done && <span className="ml-px inline-block h-[14px] w-[2px] translate-y-[2px] animate-caret bg-accent-strong" />}
        </p>
        <span className="flex size-7 items-center justify-center rounded-control bg-accent-strong text-white">
          <ArrowUp className="size-3.5" />
        </span>
      </Card>
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.out, delay: 0.3 }}
          >
            <Card className="overflow-hidden">
              <p className="flex items-center gap-1.5 border-b border-line px-3.5 py-2 text-micro text-ink-2">
                <Sparkles className="size-3 text-accent" /> 5 accounts ready · added to “Enterprise push”
              </p>
              {LIST.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE.out, delay: 0.45 + i * 0.08 }}
                  className="flex items-center gap-2.5 border-b border-line px-3.5 py-2 last:border-b-0"
                >
                  <CompanyMark name={c.name} brand={c.brand} size={16} />
                  <span className="text-[13px] font-medium text-ink">{c.name}</span>
                  <span className="truncate text-micro text-ink-2">{c.reason}</span>
                </motion.div>
              ))}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** An intent score, broken into the signals that make it up. */
export function IntentScore() {
  const ref = useRef<HTMLDivElement>(null)
  const { play } = usePlay(ref)
  const parts = [
    { label: "Replies within a day", value: 34, tone: "bg-green" },
    { label: "Pricing page, 4 visits", value: 26, tone: "bg-accent" },
    { label: "Economic buyer on the call", value: 20, tone: "bg-purple" },
    { label: "Budget confirmed", value: 12, tone: "bg-orange" },
  ]
  return (
    <div ref={ref} className="w-[400px]">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <CompanyMark name="Fieldwork" tone="green" size={20} />
          <span className="text-sm font-semibold text-ink">Fieldwork</span>
          <span className="ml-auto flex items-baseline gap-1">
            <span className="font-display text-[28px] leading-none font-semibold text-ink tabular">92</span>
            <span className="text-caption text-ink-3">/ 100</span>
          </span>
        </div>
        <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-hover">
          {parts.map((p, i) => (
            <motion.span
              key={p.label}
              className={cn("h-full", p.tone)}
              initial={{ width: 0 }}
              animate={play ? { width: `${p.value}%` } : {}}
              transition={{ duration: 0.9, ease: EASE.outCubic, delay: 0.2 + i * 0.15 }}
            />
          ))}
        </div>
        <ul className="mt-3 flex flex-col gap-1.5">
          {parts.map((p) => (
            <li key={p.label} className="flex items-center gap-2 text-caption text-ink-2">
              <span className={cn("size-[7px] rounded-full", p.tone)} /> {p.label}
              <span className="ml-auto text-ink tabular">+{p.value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center gap-1.5 border-t border-line pt-3 text-caption text-ink-3">
          <AtSign className="size-3" /> 11 sources · updated 2 minutes ago
        </p>
      </Card>
    </div>
  )
}
