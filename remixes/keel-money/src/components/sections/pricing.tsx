import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { PhoneFrame, PhoneScreen } from "@/components/mock/phone"
import { SectionHeading } from "@/components/sections/section-heading"
import { KeelMark } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const PLANS = {
  yearly: { price: "6.67", note: "$80 billed once a year" },
  monthly: { price: "9", note: "billed monthly, cancel any time" },
}

/**
 * The price, swapped with a short blur-and-slide when the billing changes —
 * long enough to notice that the number moved, short enough not to wait for.
 */
function Price({ billing }: { billing: keyof typeof PLANS }) {
  const reduced = useReducedMotion()
  const plan = PLANS[billing]
  return (
    <div className="relative flex h-[92px] flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={billing}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center"
        >
          <p className="font-display text-[clamp(40px,5vw,52px)] leading-none font-semibold tracking-[-0.02em] text-fg tabular-nums">
            ${plan.price}/mo
          </p>
          <p className="mt-2 text-[15px] text-fg-3">{plan.note}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** Why there is no free tier — the question a fair price should answer. */
function WhyFreeDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Why isn’t Keel free?</DialogTitle>
          <DialogDescription>Because free money apps are paid for by someone, and it is usually you.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 text-[15px] text-fg-2">
          <p>
            A free app earns from ads, from steering you to credit cards it gets a fee for, or from what it learns about
            your spending. Each of those makes your money the product.
          </p>
          <p>
            Keel earns one way: your subscription. No ads, no referral fees, no data sold or shared. If Keel stops being
            worth it, you stop paying — which keeps us building for you.
          </p>
        </div>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}

/** Try it first, then a single honest price. */
export function Pricing({ title = "Fair pricing, said plainly" }: { title?: string }) {
  const [billing, setBilling] = useState<keyof typeof PLANS>("yearly")
  const [why, setWhy] = useState(false)
  useCanvasAction("Monthly billing", (next) => setBilling((next ?? billing === "yearly") ? "monthly" : "yearly"), {
    on: billing === "monthly",
    group: "Pricing",
  })
  useCanvasAction("Why isn’t it free?", (next) => setWhy(next ?? !why), { on: why, group: "Pricing" })

  return (
    <section id="pricing" className="relative pt-(--spacing-section) pb-(--spacing-section)">
      <Container>
        <SectionHeading title={title} className="max-w-[14ch] text-fg" />
        <div className="mt-14 grid gap-3 md:mt-16 md:grid-cols-[1.55fr_1fr]">
          <Reveal className="relative flex min-h-[380px] overflow-hidden rounded-(--radius-card) bg-gradient-to-b from-surface-2/70 to-surface shadow-(--shadow-card)">
            <div className="relative z-10 flex flex-col p-6 sm:max-w-[45%]">
              <h3 className="type-display text-[22px] text-fg">Try the demo first</h3>
              <p className="mt-2 text-[15px] leading-snug text-fg-3">
                Explore Keel with sample accounts before you link a single bank. Like it? Start a 30-day trial.
              </p>
              <ButtonLink href="#" size="lg" className="mt-auto w-fit pl-2.5 max-sm:mt-6">
                <KeelMark className="size-6 rounded-[7px] text-blue" />
                Start free
              </ButtonLink>
            </div>
            <div className="absolute top-10 right-[8%] hidden w-[38%] max-w-[260px] sm:block">
              <PhoneFrame className="w-full">
                <PhoneScreen demo />
              </PhoneFrame>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col items-center justify-center rounded-(--radius-card) bg-gradient-to-b from-surface-2/70 to-surface px-6 py-10 text-center shadow-(--shadow-card)">
            <Price billing={billing} />
            <label className="mt-10 flex items-center gap-4 text-[16px]">
              <span className={cn("transition-colors duration-(--duration-hover)", billing === "yearly" ? "text-fg" : "text-fg-3")}>Yearly</span>
              <Switch
                checked={billing === "monthly"}
                onCheckedChange={(on) => setBilling(on ? "monthly" : "yearly")}
                aria-label="Bill monthly"
              />
              <span className={cn("transition-colors duration-(--duration-hover)", billing === "monthly" ? "text-fg" : "text-fg-3")}>Monthly</span>
            </label>
            <p className="mt-10 text-[15px] text-fg-2">No ads. No hidden fees.</p>
            <p className="mt-2 max-w-[30ch] text-[15px] text-fg-3">Your data stays yours. Your subscription is the whole business model.</p>
            <button
              type="button"
              onClick={() => setWhy(true)}
              className="mt-3 min-h-11 text-[15px] text-fg-2 underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              Why isn’t Keel free?
            </button>
          </Reveal>
        </div>
      </Container>
      <WhyFreeDialog open={why} onOpenChange={setWhy} />
    </section>
  )
}
