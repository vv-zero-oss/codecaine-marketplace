import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { MODULE_MOCKS } from "@/components/mock/page-module-mocks"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { MODULES, type ModuleId, type PlatformModule } from "@/content/platform"
import { cn } from "@/lib/utils"

/** Scroll a module to just under the sticky header (and the chip bar on phones). */
export function scrollToModule(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = window.innerWidth < 1024 ? 128 : 96
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" })
  window.history.replaceState(null, "", `${window.location.pathname}#${id}`)
}

/** Which module the reader is on, from where each block sits against the window. */
function useActiveModule(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    let frame = 0
    // The last module whose top has passed 45% of the window; the first one
    // while the list hasn't been reached yet.
    const measure = () => {
      frame = 0
      const line = window.innerHeight * 0.45
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])
  return active
}

/** Desktop: the pinned list of modules, with a sliding indicator and a rail that fills as you read. */
function ModuleNav({ active }: { active: string }) {
  const reduced = useReducedMotion()
  const index = MODULES.findIndex((m) => m.id === active)
  return (
    <nav aria-label="Platform modules" className="sticky top-[96px] hidden self-start lg:block">
      <p className="type-eyebrow mb-3 pl-4 text-ink-3">Modules</p>
      <div className="relative">
        <span aria-hidden className="absolute top-1 bottom-1 left-0 w-px bg-line" />
        <span
          aria-hidden
          className="absolute top-1 left-0 w-px bg-ink transition-[height] duration-(--duration-swap) ease-(--ease-out-strong)"
          style={{ height: `calc(${((index + 1) / MODULES.length) * 100}% - 8px)` }}
        />
        <ul className="flex flex-col gap-0.5 pl-3">
          {MODULES.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => scrollToModule(m.id)}
                aria-current={active === m.id ? "true" : undefined}
                className={cn(
                  "relative flex min-h-9 w-full items-center gap-2.5 rounded-(--radius-field) px-2.5 text-left text-[15px] transition-colors duration-(--duration-hover)",
                  active === m.id ? "text-ink" : "text-ink-3 hover:text-ink",
                )}
              >
                {active === m.id && (
                  <motion.span
                    layoutId="module-indicator"
                    className="absolute inset-0 rounded-(--radius-field) bg-panel"
                    transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.4, bounce: 0.1 }}
                  />
                )}
                <m.icon className="relative size-4" strokeWidth={1.7} />
                <span className="relative">{m.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

/** Phones and tablets: the same list as a sticky row of chips that keeps the active one in view. */
function ModuleChips({ active }: { active: string }) {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const chip = bar.current?.querySelector<HTMLElement>(`[data-module="${active}"]`)
    if (!chip || !bar.current) return
    bar.current.scrollTo({ left: chip.offsetLeft - bar.current.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" })
  }, [active])
  return (
    <div className="sticky top-[58px] z-30 -mx-4 border-b border-line bg-page/92 backdrop-blur-md sm:-mx-6 lg:hidden">
      <div ref={bar} className="flex gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-6">
        {MODULES.map((m) => (
          <button
            key={m.id}
            type="button"
            data-module={m.id}
            onClick={() => scrollToModule(m.id)}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[14px] transition-colors duration-(--duration-hover)",
              active === m.id ? "bg-ink text-page" : "bg-panel text-ink-2",
            )}
          >
            <m.icon className="size-3.5" strokeWidth={1.8} />
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/** One module: what it does, three capabilities and its working mockup. */
function ModuleBlock({ module, index }: { module: PlatformModule; index: number }) {
  const Mock = MODULE_MOCKS[module.id as ModuleId]
  return (
    <section id={module.id} className="grid scroll-mt-32 gap-8 border-t border-line py-14 first:border-t-0 first:pt-2 xl:grid-cols-[1fr_400px] xl:gap-12">
      <Reveal>
        <p className="flex items-center gap-2 text-[14px] text-ink-3">
          <span className="font-mono text-[12px] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <module.icon className="size-4" strokeWidth={1.7} />
          {module.label}
        </p>
        <h3 className="type-head text-h3 mt-4 max-w-[18ch] text-balance">
          {module.title} <span className="text-ink-soft">{module.continuation}</span>
        </h3>
        <p className="mt-4 max-w-[48ch] text-ink-2">{module.body}</p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3 xl:grid-cols-1">
          {module.bullets.map((b) => (
            <li key={b.title} className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-(--radius-field) bg-panel text-ink">
                <b.icon className="size-4" strokeWidth={1.7} />
              </span>
              <span>
                <span className="block text-[15px] font-medium">{b.title}</span>
                <span className="block text-[14px] text-ink-3">{b.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.06} className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-(--radius-panel) bg-panel p-4 sm:p-8">
        <div aria-hidden className="dot-grid absolute inset-0 opacity-60" />
        <div className="relative flex w-full justify-center">
          <Mock />
        </div>
      </Reveal>
    </section>
  )
}

/**
 * The platform's nine modules as one long read: a pinned list on the left
 * that follows you down (a chip bar on phones), and each module's story and
 * working mockup on the right.
 */
export function ModuleExplorer() {
  const ids = useRef(MODULES.map((m) => m.id)).current
  const active = useActiveModule(ids)
  return (
    <div className="py-(--spacing-section) pt-12">
      <Container>
        <div className="mb-12 max-w-[640px]">
          <Reveal>
            <h2 className="type-head text-h1 text-balance">
              Nine modules. <span className="text-ink-soft">One ledger underneath.</span>
            </h2>
            <p className="mt-5 text-[17px] text-ink-2">Each one works on its own. Together, a dollar is tracked from the request to the close without anyone re-typing it.</p>
          </Reveal>
        </div>
        <ModuleChips active={active} />
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <ModuleNav active={active} />
          <div className="min-w-0">
            {MODULES.map((m, i) => (
              <ModuleBlock key={m.id} module={m} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
