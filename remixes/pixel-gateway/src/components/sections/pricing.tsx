import { Check } from "lucide-react"
import { useState } from "react"

import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PLANS } from "@/content"
import { openDialog } from "@/lib/ui-events"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

export function PlanCard({ plan, annual }: { plan: (typeof PLANS)[number]; annual: boolean }) {
  const price = plan.id === "co-op" && annual ? "$9.60" : plan.price
  return (
    <TiltCard
      maxTilt={plan.featured ? 6 : 8}
      lift={12}
      className={cn(
        "flex h-full flex-col gap-6 bg-surface p-7 [--px-drop:rgba(0,0,0,0.5)] sm:p-8",
        plan.featured ? "bg-surface-2 shadow-px-glow [--px-edge:var(--color-accent)]" : "shadow-px-drop [--px-edge:var(--color-line)]",
      )}
    >
      <div className="flex items-center justify-between [transform:translateZ(16px)]">
        <h3 className="font-display text-xs uppercase">{plan.name}</h3>
        {plan.featured ? <Badge tone="accent">Best loot</Badge> : <PixelSprite name={plan.id === "player-one" ? "coin" : "key"} scale={3} />}
      </div>
      <p className="text-lg text-fg-muted">{plan.blurb}</p>
      <p className="[transform:translateZ(30px)]">
        <span className="font-display text-4xl">{price}</span>
        <span className="ml-2 font-mono text-xl text-fg-muted">{plan.id === "co-op" && annual ? "per seat / month, billed yearly" : plan.cadence}</span>
      </p>
      <ul className="grid gap-3 text-lg">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="mt-1 size-4 shrink-0 text-good" strokeWidth={4} />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        variant={plan.featured ? "accent" : "outline"}
        size="lg"
        className="mt-auto w-full [transform:translateZ(24px)]"
        onClick={() => openDialog(plan.id === "boss-level" ? "demo" : "login")}
      >
        {plan.cta}
      </Button>
    </TiltCard>
  )
}

/** Three plans with a monthly / yearly toggle. Used on the home page and /pricing. */
export function Pricing({ heading = true }: { heading?: boolean }) {
  const [annual, setAnnual] = useState(false)
  return (
    <section id="pricing" className="bg-bg py-24 sm:py-32">
      <Container>
        {heading ? <SectionHeading kicker="choose your class" title="Pick a plan. Change it any time." blurb="Every plan includes the same on-device checks. Higher tiers add the AI tooling and the paperwork." /> : null}
        <Tabs value={annual ? "yearly" : "monthly"} onValueChange={(v) => setAnnual(v === "yearly")} className="mt-10">
          <TabsList className="h-auto gap-1 bg-surface-2 p-1">
            <TabsTrigger value="monthly" className="min-h-11 px-5 font-display text-[9px] uppercase data-[state=active]:bg-fg data-[state=active]:text-bg">Monthly</TabsTrigger>
            <TabsTrigger value="yearly" className="min-h-11 px-5 font-display text-[9px] uppercase data-[state=active]:bg-fg data-[state=active]:text-bg">Yearly −20%</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <PlanCard plan={plan} annual={annual} />
            </Reveal>
          ))}
        </div>
        {heading ? <Link href="/pricing" className={buttonVariants({ variant: "ghost", size: "lg", className: "mt-10" })}>Compare every plan →</Link> : null}
      </Container>
    </section>
  )
}
