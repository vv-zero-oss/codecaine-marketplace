import { useRef } from "react"
import { Building2, CalendarDays, Link2, Mail, MapPin, MoreHorizontal, Phone, Sparkles, UserRound } from "lucide-react"
import { motion } from "motion/react"

import { RECORD } from "@/content/home"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { usePlay } from "./capture"
import { Avatar } from "./kit"

/** A block that is a grey outline first, then blurs into its real content. */
function Assemble({ play, delay, className, children }: { play: boolean; delay: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-card border border-dashed border-line-bold"
        initial={{ opacity: 1 }}
        animate={play ? { opacity: 0 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      />
      <motion.div
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={play ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, ease: EASE.out, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * The record page that writes itself: every block starts as an empty
 * outline and fills in, in the order Arcline would find it — who, then what
 * matters, then what happened.
 */
export function RecordPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { play } = usePlay(ref)
  const p = RECORD.person
  const icons = [Sparkles, Building2, CalendarDays, UserRound, Mail, Link2]

  return (
    <div ref={ref} className="flex w-[1120px] overflow-hidden rounded-window bg-surface shadow-window">
      <aside className="flex w-[290px] shrink-0 flex-col gap-5 border-r border-line p-5">
        <Assemble play={play} delay={0}>
          <Avatar initials={p.initials} tone="green" size={40} />
          <p className="mt-3 text-lead font-semibold text-ink">{p.name}</p>
          <p className="text-sm text-ink-2">{p.role}</p>
        </Assemble>
        <Assemble play={play} delay={0.15} className="flex gap-2">
          <span className="flex h-7 items-center gap-1.5 rounded-control bg-hover-2 px-2.5 text-caption text-ink">
            <Mail className="size-3" /> Compose email
          </span>
          {[Phone, CalendarDays, MoreHorizontal].map((Icon, i) => (
            <span key={i} className="flex size-7 items-center justify-center rounded-control shadow-btn">
              <Icon className="size-3.5 text-ink-2" />
            </span>
          ))}
        </Assemble>
        <Assemble play={play} delay={0.3}>
          <p className="mb-2 text-caption text-ink-3">Details</p>
          <dl className="grid grid-cols-[80px_1fr] gap-y-2 text-sm">
            {[
              ["Email", p.email],
              ["Location", p.location],
              ["Company", p.company],
              ["Stage", p.stage],
              ["Owner", p.owner],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-caption text-ink-3">{k}</dt>
                <dd className={cn("truncate text-ink", k === "Email" && "text-accent-ink")}>
                  {k === "Location" && <MapPin className="mr-1 inline size-3 text-ink-3" />}
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </Assemble>
      </aside>
      <div className="flex-1 p-5">
        <p className="mb-3 text-sm font-semibold text-ink">Highlights</p>
        <div className="grid grid-cols-3 gap-3">
          {RECORD.highlights.map((h, i) => {
            const Icon = icons[i]
            return (
              <Assemble key={h.label} play={play} delay={0.35 + i * 0.1}>
                <div className="h-[92px] rounded-card border border-line-strong px-3 py-2.5">
                  <p className="flex items-center gap-1.5 text-caption text-ink-3">
                    <Icon className={cn("size-3", i === 0 && "text-accent")} /> {h.label}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-ink">{h.value}</p>
                  {h.label === "Sequence" && (
                    <div className="mt-2 flex gap-1">
                      {[0, 1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className={cn("h-1 flex-1 rounded-full", s < 3 ? "bg-green" : "bg-hover-2")} />
                      ))}
                    </div>
                  )}
                </div>
              </Assemble>
            )
          })}
        </div>
        <p className="mt-6 mb-3 text-sm font-semibold text-ink">Activity</p>
        <ol className="relative flex flex-col gap-3 before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-px before:bg-line-strong">
          {RECORD.activity.map((a, i) => (
            <Assemble key={a.what} play={play} delay={1 + i * 0.12}>
              <li className="relative flex items-center gap-3 text-sm text-ink-soft">
                <span className="relative z-10 flex size-[19px] items-center justify-center rounded-full bg-hover-2">
                  {a.who === "Arcline" ? <Sparkles className="size-2.5 text-accent" /> : <UserRound className="size-2.5 text-ink-2" />}
                </span>
                <span>
                  <span className="text-ink">{a.who}</span> {a.what}
                </span>
                <span className="ml-auto text-caption text-ink-3">{a.when}</span>
              </li>
            </Assemble>
          ))}
        </ol>
      </div>
    </div>
  )
}
