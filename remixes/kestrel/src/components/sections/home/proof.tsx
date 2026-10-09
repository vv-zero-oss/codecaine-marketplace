import { useEffect, useRef, useState } from "react"
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react"
import { ArrowRight, FlaskConical, HeartPulse, Leaf, Plane, Plus, Sun, Trees, Warehouse, Waves, X, type LucideIcon } from "lucide-react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { CUSTOMERS, PROOF, type Customer } from "@/content/home-top"
import { Link } from "@/lib/router"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

const ICONS: Record<Customer["icon"], LucideIcon> = {
  warehouse: Warehouse,
  flask: FlaskConical,
  trees: Trees,
  heart: HeartPulse,
  plane: Plane,
  sun: Sun,
  leaf: Leaf,
  waves: Waves,
}

/** Eight invented customers, each set a little differently so the wall reads as eight brands. */
const WORDMARK_STYLES = [
  "text-[19px] font-semibold tracking-[-0.04em]",
  "text-[13px] font-medium uppercase tracking-[0.14em]",
  "text-[17px] font-medium italic tracking-[-0.02em]",
  "text-[18px] font-semibold tracking-[-0.03em]",
  "font-mono text-[14px] uppercase tracking-[0.04em]",
  "text-[20px] font-medium tracking-[-0.05em] lowercase",
  "text-[16px] font-semibold uppercase tracking-[0.06em]",
  "text-[19px] font-normal tracking-[-0.03em]",
]

const SPRING = { type: "spring", duration: 0.55, bounce: 0.12 } as const

/** The cells that have a story to open, by index. */
const STORIED = CUSTOMERS.map((c, i) => (c.story ? i : -1)).filter((i) => i >= 0)

/** A customer's wordmark: its icon and name, grey until hovered. */
function Wordmark({ customer, index }: { customer: Customer; index: number }) {
  const Icon = ICONS[customer.icon]
  return (
    <span className={cn("flex items-center gap-1.5 text-ink-4 transition-colors duration-(--duration-hover) group-hover/cell:text-ink", WORDMARK_STYLES[index % WORDMARK_STYLES.length])}>
      <Icon className="size-[1.05em]" strokeWidth={1.8} />
      {customer.name}
    </span>
  )
}

/** The opened story: the customer's photo, one big number and what it means. */
function StoryCard({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  const story = customer.story!
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 overflow-hidden rounded-(--radius-card) bg-night"
    >
      <motion.img
        src={pexels(story.photo, 900, 700)}
        alt={`The ${customer.name} team at work`}
        className="absolute inset-0 size-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/35 to-night/10" />
      <div className="relative flex h-full flex-col justify-end p-5 text-night-fg sm:p-6">
        <p className="type-eyebrow text-night-fg/80">{customer.name}</p>
        <p className="type-head mt-2 text-h1 leading-none">{story.stat}</p>
        <p className="mt-2 text-[15px] text-night-fg/80">{story.caption}</p>
        <p className="mt-3 hidden text-[14px] text-night-fg/70 italic sm:block">“{story.quote}”</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label={`Close the ${customer.name} story`}
        className="absolute top-2 right-2 grid size-11 place-items-center rounded-full text-night-fg transition-transform duration-(--duration-press) active:scale-95"
      >
        <span className="grid size-7 place-items-center rounded-full bg-night/50 backdrop-blur transition-colors hover:bg-night/80">
          <X className="size-3.5" />
        </span>
      </button>
    </motion.div>
  )
}

/** Registers one story as a switch in the editor's Actions row. */
function StoryAction({ name, active, onToggle }: { name: string; active: boolean; onToggle: (on: boolean) => void }) {
  useCanvasAction(`Story: ${name}`, (next) => onToggle(next ?? !active), { on: active, group: "Proof" })
  return null
}

/**
 * The customer wall. One cell at a time opens into its story — a photo and
 * the number that customer cares about — and the wall reflows around it.
 * It moves on to the next story every few seconds until somebody hovers,
 * picks one, or closes it.
 */
export function CustomerWall({ interval = 4.2, autoplay = true, className }: { interval?: number; autoplay?: boolean; className?: string }) {
  const storied = STORIED
  const [open, setOpen] = useState<number | null>(storied[0])
  const [hovered, setHovered] = useState(false)
  const [stopped, setStopped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-15% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()

  useEffect(() => {
    if (!autoplay || hovered || stopped || !inView || designing || reduced || open === null) return
    const t = window.setTimeout(() => {
      const at = storied.indexOf(open)
      setOpen(storied[(at + 1) % storied.length])
    }, interval * 1000)
    return () => window.clearTimeout(t)
  }, [autoplay, hovered, stopped, inView, designing, reduced, open, interval, storied])

  const choose = (index: number) => {
    setOpen(index)
    setStopped(true)
  }

  return (
    <LayoutGroup>
      {storied.map((i) => (
        <StoryAction
          key={i}
          name={CUSTOMERS[i].name}
          active={open === i}
          onToggle={(on) => {
            setOpen(on ? i : null)
            setStopped(true)
          }}
        />
      ))}
      <motion.div
        ref={ref}
        layout
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className={cn(
          "grid grid-flow-dense auto-rows-[112px] grid-cols-2 gap-px sm:auto-rows-[150px]",
          open !== null ? "sm:grid-cols-4 lg:grid-cols-6" : "sm:grid-cols-3",
          className,
        )}
      >
        {CUSTOMERS.map((customer, index) => {
          const isOpen = open === index
          return (
            <motion.div
              key={customer.name}
              layout
              transition={reduced ? { duration: 0 } : SPRING}
              onClick={() => customer.story && !isOpen && choose(index)}
              className={cn(
                "group/cell relative grid place-items-center bg-page",
                isOpen && "col-span-2 row-span-2",
                customer.story && !isOpen && "cursor-pointer",
              )}
            >
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <StoryCard key="story" customer={customer} onClose={() => { setOpen(null); setStopped(true) }} />
                ) : (
                  <motion.span key="mark" layout="position" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Wordmark customer={customer} index={index} />
                  </motion.span>
                )}
              </AnimatePresence>
              {customer.story && !isOpen && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    choose(index)
                  }}
                  aria-label={`Open the ${customer.name} story`}
                  className="absolute top-1 right-1 grid size-11 place-items-center opacity-100 transition-opacity duration-(--duration-hover) [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/cell:opacity-100 focus-visible:opacity-100"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-panel text-ink-2 shadow-(--shadow-xs) transition-transform duration-(--duration-press) active:scale-90">
                    <Plus className="size-3.5" />
                  </span>
                </button>
              )}
            </motion.div>
          )
        })}
        <motion.div
          layout
          transition={reduced ? { duration: 0 } : SPRING}
          className={cn("grid place-items-center bg-page", open === null && "col-span-2 sm:col-span-1")}
        >
          <Link href="/customers" className="group/more flex min-h-11 items-center gap-1.5 px-3 text-[14px] text-ink-3 transition-colors hover:text-ink">
            + 39,992 more
            <ArrowRight className="size-3.5 transition-transform duration-(--duration-hover) group-hover/more:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  )
}

/** Proof, straight after the promise: who already runs on it. */
export function Proof() {
  return (
    <section id="customers" className="pt-20 sm:pt-28">
      <Container>
        <Reveal className="grid gap-px overflow-hidden rounded-(--radius-panel) bg-line shadow-(--shadow-hairline) lg:grid-cols-[290px_1fr]">
          <div className="flex flex-col justify-between gap-8 bg-panel p-6">
            <p className="type-head text-h4 text-ink">
              {PROOF.title} <span className="text-ink-3">{PROOF.continuation}</span>
            </p>
            <Link href="/customers" className="group inline-flex min-h-11 items-center gap-1.5 text-[15px] text-ink-2 transition-colors hover:text-ink">
              {PROOF.link}
              <ArrowRight className="size-4 transition-transform duration-(--duration-hover) group-hover:translate-x-0.5" />
            </Link>
          </div>
          <CustomerWall className="bg-line" />
        </Reveal>
      </Container>
    </section>
  )
}
