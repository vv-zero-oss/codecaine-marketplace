import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  BookOpen, Boxes, Calendar, Code2, Contact, Database, Fingerprint, HardDrive, KeyRound, Landmark, Mail, MessageSquare,
  Percent, Plane, Receipt, Sheet, ShoppingCart, Users, Wallet, Webhook, type LucideIcon,
} from "lucide-react"

import { KestrelMark } from "@/components/site/logo"
import { INTEGRATIONS } from "@/content/home-top"
import { cn } from "@/lib/utils"

const ICONS: LucideIcon[] = [
  BookOpen, Wallet, Users, Boxes, Landmark, MessageSquare, Mail, Calendar, KeyRound, Plane,
  Database, Sheet, Contact, Percent, ShoppingCart, Receipt, HardDrive, Fingerprint, Webhook, Code2,
]

/**
 * Twenty kinds of tool in two slow rings around Kestrel. Point at one and
 * the centre names it. The rings turn on a CSS animation (so the editor's
 * Motion switch and reduced motion stop it), and pause under the pointer
 * so a chip holds still to be read.
 */
export function IntegrationOrbit({ speed = 80, className }: { /** Seconds per turn of the outer ring. */ speed?: number; className?: string }) {
  const [hover, setHover] = useState<string | null>(null)
  const rings = [
    { r: 74, items: INTEGRATIONS.slice(0, 8), dir: "normal" as const, dur: speed * 0.75 },
    { r: 132, items: INTEGRATIONS.slice(8), dir: "reverse" as const, dur: speed },
  ]

  return (
    <div className={cn("group/orbit relative mx-auto aspect-square w-full max-w-[320px]", className)}>
      <style>{`@keyframes bento-orbit { to { transform: rotate(360deg) } } @keyframes bento-orbit-counter { to { transform: rotate(-360deg) } }`}</style>
      {rings.map((ring, ri) => (
        <div
          key={ring.r}
          className="absolute inset-0 motion-reduce:[animation:none] group-hover/orbit:[animation-play-state:paused]"
          style={{ animation: `bento-orbit ${ring.dur}s linear infinite`, animationDirection: ring.dir }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full border border-dashed border-line-strong" style={{ width: `${(ring.r / 160) * 100}%`, height: `${(ring.r / 160) * 100}%` }} />
          {ring.items.map((name, i) => {
            const Icon = ICONS[ri === 0 ? i : i + 8]
            const a = (i / ring.items.length) * Math.PI * 2 + ri * 0.4
            const pct = (ring.r / 320) * 100 // of the 320px square
            return (
              <span key={name} className="absolute -translate-1/2" style={{ left: `${50 + Math.cos(a) * pct}%`, top: `${50 + Math.sin(a) * pct}%` }}>
                <span
                  className="block motion-reduce:[animation:none] group-hover/orbit:[animation-play-state:paused]"
                  style={{ animation: `bento-orbit-counter ${ring.dur}s linear infinite`, animationDirection: ring.dir }}
                >
                  <button
                    type="button"
                    aria-label={name}
                    onPointerEnter={() => setHover(name)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(name)}
                    onBlur={() => setHover(null)}
                    onClick={() => setHover(name)}
                    className={cn(
                      "grid size-9 place-items-center rounded-full bg-raised text-ink-3 shadow-(--shadow-card) transition-[color,scale,box-shadow] duration-(--duration-hover) ease-(--ease-out-strong) hover:scale-110 hover:text-ink hover:shadow-(--shadow-float)",
                      hover === name && "text-ink",
                    )}
                  >
                    <Icon className="size-4" strokeWidth={1.7} />
                  </button>
                </span>
              </span>
            )
          })}
        </div>
      ))}
      <div className="absolute top-1/2 left-1/2 grid size-[92px] -translate-1/2 place-items-center rounded-full bg-ink text-lime shadow-(--shadow-float)">
        <AnimatePresence mode="wait" initial={false}>
          {hover ? (
            <motion.span key={hover} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.16 }} className="px-2 text-center text-[11.5px] leading-tight text-night-fg">
              {hover}
            </motion.span>
          ) : (
            <motion.span key="mark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
              <KestrelMark className="size-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
