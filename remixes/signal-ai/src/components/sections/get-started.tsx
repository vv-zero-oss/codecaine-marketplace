import { Container } from "@/components/ui/container"
import { PlanCard } from "@/components/ui/plan-card"

export function GetStarted() {
  return (
    <section id="start" className="border-t border-line pt-20 pb-24 sm:pt-24">
      <Container>
        <h2 className="text-center text-[clamp(1.4rem,3vw,1.7rem)] font-normal tracking-[-0.04em]">Choose how to get started</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <PlanCard
            title="Build on your own"
            blurb="Launch your AI-powered product with:"
            features={["Access to all Vantage models", "Usage-based pricing", "Automatically increasing rate limits", "Comprehensive documentation and guides"]}
            cta="Start Building"
            primary
          />
          <PlanCard
            title="Get extra support"
            blurb="Custom rate limits and hands-on support for your team."
            features={["Dedicated onboarding support", "Custom rate limits", "Billing via monthly invoices", "Single sign-on and audit logging", "Data residency options"]}
            cta="Contact Sales"
          />
        </div>
      </Container>
    </section>
  )
}
