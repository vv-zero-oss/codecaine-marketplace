import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Handshake, LifeBuoy, Rocket, UserSearch, Workflow, type LucideIcon } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Spark } from "@/components/blocks/doodle"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PERSONAS, type PersonaKey } from "@/content"
import { cn } from "@/lib/utils"

const ICONS: Record<PersonaKey, LucideIcon> = {
  founders: Rocket,
  sales: Handshake,
  support: LifeBuoy,
  recruiting: UserSearch,
  operations: Workflow,
}

/**
 * Who Postwise is for, as tabs: five tiles with a line drawing each, the
 * chosen one lit from below, and what it does for them underneath. Each tab
 * is an action in the editor.
 */
export function Personas({ start = "founders" }: { start?: PersonaKey }) {
  const [active, setActive] = useState<PersonaKey>(start)
  const reduced = useReducedMotion()

  for (const item of PERSONAS.items) {
    // Registered in a fixed order, one switch per tab.
    useCanvasAction(item.label, (next) => next !== false && setActive(item.key), { on: active === item.key, group: "Personas" })
  }

  return (
    <section id="solutions" className="py-section">
      <Container>
        <Reveal className="text-center">
          <h2 className="type-display text-[clamp(34px,4.4vw,52px)] text-balance">
            {PERSONAS.titleStart}{" "}
            <span className="whitespace-nowrap">
              <Spark /> <em className="font-light italic">{PERSONAS.titleAccent}</em> <Spark side="right" />
            </span>
            <br className="hidden sm:block" /> {PERSONAS.titleEnd}
          </h2>
        </Reveal>

        <Reveal y={32} className="mx-auto mt-12 max-w-[840px]">
          <Tabs value={active} onValueChange={(v) => setActive(v as PersonaKey)} className="gap-0 rounded-[var(--radius-panel)] bg-card-soft p-2 shadow-(--shadow-card)">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-2 bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto sm:grid-cols-5">
              {PERSONAS.items.map((item) => {
                const Icon = ICONS[item.key]
                const on = active === item.key
                return (
                  <TabsTrigger
                    key={item.key}
                    value={item.key}
                    className={cn(
                      "relative flex h-auto flex-col items-center gap-3 overflow-hidden rounded-[var(--radius-card)] border-line bg-paper px-2 pt-3 pb-5 text-[13px] font-normal text-ink-subtle transition-colors duration-(--duration-hover)",
                      "hover:text-ink data-[state=active]:border data-[state=active]:bg-card data-[state=active]:text-ink data-[state=active]:shadow-none",
                    )}
                  >
                    {item.label}
                    <span className="relative grid h-20 w-full place-items-center">
                      <motion.span
                        aria-hidden
                        initial={false}
                        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }}
                        transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute bottom-[-18px] h-10 w-3/4 rounded-full bg-gradient-to-r from-apricot via-mint to-mist blur-md"
                      />
                      <Icon className={cn("relative size-14 transition-transform duration-(--duration-swap) ease-(--ease-out-quint)", on && "-translate-y-1 scale-105")} strokeWidth={0.9} />
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
            {PERSONAS.items.map((item) => (
              <TabsContent key={item.key} value={item.key}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={item.key}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="grid gap-8 px-4 pt-8 pb-6 md:grid-cols-2 md:px-6 md:pt-10 md:pb-8"
                  >
                    <div className="flex flex-col items-start gap-5">
                      <h3 className="type-display max-w-[280px] text-[clamp(26px,2.6vw,30px)] text-balance">{item.title}</h3>
                      <ButtonLink href="#cta" variant="outline" size="sm">
                        {item.cta}
                      </ButtonLink>
                    </div>
                    <ul className="flex flex-col">
                      {item.points.map((point, i) => (
                        <li key={point.title} className={cn("flex flex-col gap-1.5 py-4", i > 0 && "border-t border-line", i === 0 && "pt-0")}>
                          <p className="text-[17px] tracking-[-0.01em] text-ink">{point.title}</p>
                          <p className="text-[14px] leading-[1.5] text-ink-muted">{point.body}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </Container>
    </section>
  )
}
