import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { brand, nav, social } from "@/content"
import { cn } from "@/lib/utils"
import { Link } from "@/router"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The menu: the whole screen, in paper, with the pages set large.
 *
 * Links rise in one after another (60ms apart) once the sheet has landed;
 * hovering one crossfades its photograph in on the right. Registered with
 * the editor by the page shell (see App.tsx) as the "Menu" switch.
 */
export function MenuOverlay({ open, onOpenChange, pathname }: { open: boolean; onOpenChange: (open: boolean) => void; pathname: string }) {
  const [hovered, setHovered] = useState(() => Math.max(0, nav.findIndex((item) => item.href === pathname)))
  const reduced = useReducedMotion()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" showCloseButton={false} className="h-svh gap-0 overflow-y-auto border-none bg-paper p-0 data-[state=open]:duration-700" data-lenis-prevent>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Pages of the Aurel site</SheetDescription>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-gutter pt-4 sm:pt-6 lg:pt-8">
          <Button variant="chip" size="chip-sm" onClick={() => onOpenChange(false)} className="justify-self-start lg:w-[130px]">
            CLOSE
          </Button>
          <Wordmark className="text-[26px] sm:text-[30px]" />
          <span />
        </div>
        <div className="grid flex-1 gap-10 px-gutter pb-10 pt-12 lg:grid-cols-[1.3fr_1fr] lg:gap-[6vw] lg:pt-16">
          <nav aria-label="Pages" className="flex flex-col">
            {nav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                animate={open ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.8, delay: 0.25 + index * 0.06, ease: EASE }}
              >
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  onMouseEnter={() => setHovered(index)}
                  onFocus={() => setHovered(index)}
                  aria-current={item.href === pathname ? "page" : undefined}
                  className="group flex items-baseline gap-4 border-b border-ink/10 py-2 font-display text-[clamp(44px,7.4vw,124px)] leading-[0.95] tracking-[-0.015em] text-ink sm:py-1"
                >
                  <span className="w-8 font-serif text-[14px] tabular-nums text-ink-muted sm:w-12 sm:text-[16px]">0{index + 1}</span>
                  <span className={cn("transition-transform duration-500 ease-(--ease-out-soft) group-hover:translate-x-4", item.href === pathname && "italic")}>{item.label.toUpperCase()}</span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="relative hidden aspect-[4/5] self-center overflow-hidden lg:block">
            <AnimatePresence initial={false}>
              <motion.img
                key={nav[hovered].image}
                src={nav[hovered].image}
                alt=""
                className="absolute inset-0 size-full object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </AnimatePresence>
          </div>
        </div>
        <div className="grid gap-6 border-t border-ink/10 px-gutter py-8 font-sans text-[14px] text-ink-soft sm:grid-cols-3">
          <p>
            {brand.address[0]}
            <br />
            {brand.address[1]}
          </p>
          <p>
            <a href={`mailto:${brand.email}`} className="hover:text-ink">{brand.email}</a>
            <br />
            {brand.phone}
          </p>
          <p className="flex gap-5 sm:justify-end">
            {social.slice(0, 2).map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="py-2 hover:text-ink">
                {item.label} ↗
              </a>
            ))}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
