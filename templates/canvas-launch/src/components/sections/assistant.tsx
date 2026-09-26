import type * as React from "react"
import { useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Sparkles, Square } from "lucide-react"

import { Mark } from "@/components/ui/mark"
import { NameTag } from "@/components/ui/name-tag"
import { Typed } from "@/components/ui/typed"
import { Scene } from "@/components/ui/scene"
import { SwapText } from "@/components/ui/swap-text"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { EASE_CAMERA, EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * The assistant, asked for a primary button, builds it out of the project's
 * own theme — so the scene shows the button *and* the tokens it was made of,
 * wired to it. Laid out on a 600 × 440 board (its own units), scaled to fit.
 */

const TOKENS = {
  colours: [
    { name: "primary", swatch: "bg-signal", used: true },
    { name: "accent", swatch: "bg-violet" },
    { name: "success", swatch: "bg-mint-deep" },
  ],
  type: [
    { name: "radius-md", icon: "radius", used: true },
    { name: "font-semibold", icon: "Aa", used: true },
    { name: "font-light", icon: "Aa" },
  ],
} as const

const PROMPT = "Make this the primary button"
const BW = 600

export function Assistant() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 4)
  const view = useViewport()
  const scale = Math.min(1, (view.width - 16) / BW, view.height / 903)
  const at = Math.min(step, 2)

  return (
    <Scene ref={ref} beats={4} id="assistant" aria-label="The assistant">
      <div
        className="absolute top-[26svh] left-1/2 origin-top sm:top-[240px]"
        style={{ width: BW, height: 440, transform: `translateX(-50%) scale(${scale})` }}
      >
        {/* The prompt, typed into the assistant bar on the selection */}
        <AnimatePresence>
          {at >= 1 && (
            <motion.div
              className="absolute top-[21px] left-1/2 flex h-[42px] items-center gap-2 rounded-[8px] bg-surface px-3 text-[16px] font-medium whitespace-nowrap shadow-chip"
              initial={{ opacity: 0, filter: "blur(6px)", transform: "translateX(-50%) translateY(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)", transform: "translateX(-50%) translateY(0px)" }}
              transition={{ duration: 0.5, ease: EASE_SWAP }}
            >
              <Sparkles className="size-3.5 text-ink-faint" strokeWidth={1.5} />
              <Typed text={PROMPT} delay={0.25} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The mark becomes the thing that was asked for */}
        <motion.div
          className="absolute top-[147px] left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden text-[16px] font-semibold text-on-accent"
          initial={false}
          animate={
            at === 0
              ? { width: 98, height: 98, borderRadius: 0, backgroundColor: "color-mix(in srgb, var(--color-ink) 0%, transparent)" }
              : at === 1
                ? { width: 124, height: 98, borderRadius: 0, backgroundColor: "var(--color-ink)" }
                : { width: 170, height: 44, borderRadius: 8, backgroundColor: "var(--color-signal)" }
          }
          transition={{ duration: 0.7, ease: EASE_CAMERA }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {at === 0 ? (
              <motion.span key="mark" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <Mark className="size-[98px] text-ink" />
              </motion.span>
            ) : at === 2 ? (
              <motion.span
                key="label"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 0.3, ease: EASE_SWAP }}
              >
                Get started
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute top-0 left-0"
          initial={false}
          animate={at === 0 ? { x: 318, y: 118, opacity: 1 } : { x: 470, y: -40, opacity: at === 1 ? 0.55 : 0 }}
          transition={{ duration: 0.7, ease: EASE_CAMERA }}
        >
          <NameTag label="You" />
        </motion.div>

        {/* Wires from the button to the tokens it used */}
        <svg className="pointer-events-none absolute inset-0 overflow-visible" width={BW} height={440} aria-hidden>
          {at === 2 && (
            <>
              <Wire d="M300 169 V240 Q300 250 290 250 H253 Q243 250 243 260 V287" className="stroke-signal" />
              <Wire d="M300 169 V240 Q300 250 310 250 H322 Q332 250 332 260 V287" className="stroke-ink" />
              <Wire d="M332 299 V327" className="stroke-ink" delay={0.15} />
              <Dot x={243} y={293} className="stroke-signal" />
              <Dot x={332} y={293} className="stroke-ink" />
              <Dot x={332} y={339} className="stroke-ink" />
            </>
          )}
        </svg>

        <TokenColumn side="left" show={at >= 1} lit={at === 2}>
          {TOKENS.colours.map((t) => (
            <TokenChip key={t.name} used={"used" in t && at === 2}>
              <span className={cn("size-[18px] rounded-full", t.swatch)} />
              {t.name}
            </TokenChip>
          ))}
        </TokenColumn>
        <TokenColumn side="right" show={at >= 1} lit={at === 2}>
          {TOKENS.type.map((t) => (
            <TokenChip key={t.name} used={"used" in t && at === 2}>
              {t.icon === "radius" ? (
                <Square className="size-[15px] text-ink" strokeWidth={1.75} />
              ) : (
                <span className="w-[15px] text-[10px] font-semibold text-ink">Aa</span>
              )}
              {t.name}
            </TokenChip>
          ))}
        </TokenColumn>
      </div>

      <div className="absolute inset-x-0 bottom-[10svh] flex justify-center px-4 text-center">
        <SwapText id="assistant" className="max-w-[14ch] text-[clamp(34px,3.9vw,56px)] sm:max-w-none">
          An assistant that reads your board
        </SwapText>
      </div>
    </Scene>
  )
}

function TokenColumn({
  side,
  show,
  lit,
  children,
}: {
  side: "left" | "right"
  show: boolean
  lit: boolean
  children: React.ReactNode
}) {
  return (
    <motion.ul
      className={cn("absolute top-[276px] flex flex-col gap-[10px]", side === "left" ? "right-[367px]" : "left-[345px]")}
      initial={false}
      animate={show ? "in" : "out"}
      variants={{ in: { transition: { staggerChildren: 0.06 } }, out: {} }}
      data-lit={lit}
    >
      {children}
    </motion.ul>
  )
}

function TokenChip({ used, children }: { used: boolean; children: React.ReactNode }) {
  return (
    <motion.li
      variants={{
        in: { opacity: 1, transform: "translateY(0px)" },
        out: { opacity: 0, transform: "translateY(8px)" },
      }}
      transition={{ duration: 0.4, ease: EASE_SWAP }}
      className={cn(
        "flex h-9 items-center gap-2 rounded-pill pr-4 pl-2 text-[15px] transition-[background-color,color,box-shadow] duration-300",
        used ? "bg-surface text-ink shadow-chip" : "bg-surface/40 text-ink-muted",
      )}
    >
      {children}
    </motion.li>
  )
}

function Wire({ d, className, delay = 0 }: { d: string; className?: string; delay?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      strokeWidth={1.5}
      className={className}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, delay: 0.35 + delay, ease: EASE_SWAP }}
    />
  )
}

function Dot({ x, y, className }: { x: number; y: number; className?: string }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={6}
      strokeWidth={1.5}
      className={cn("fill-paper", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.8 }}
    />
  )
}

