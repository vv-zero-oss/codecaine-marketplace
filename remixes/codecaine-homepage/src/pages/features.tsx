import { Link } from "@/lib/router";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHeader } from "@/components/landing/page-header";
import { ArrowRight } from "@/components/landing/hero";
import { ProductCover } from "@/components/landing/product-cover";
import { Features } from "@/components/landing/features";
import { FeatureList } from "@/components/landing/feature-list";
import { AgentShowcase } from "@/components/landing/agent-showcase";

/** The features page: the shared shell, a header, the agent showcase, then the feature sections. */
export function FeaturesPage() {
  return (
    <SiteShell>
      <PageHeader
        id="lp-features-page-title"
        title="Everything the canvas does"
        lede="A design tool that works on the code you already have."
      >
        <Link className="lp-btn lp-btn-primary" href="/">
          Back to the homepage
          <span className="lp-btn-shine" aria-hidden />
        </Link>
        <Link className="lp-btn lp-btn-outline" href="/brand">
          See the design system
          <ArrowRight />
        </Link>
      </PageHeader>
      <AgentShowcase />
      <ProductCover />
      <Features />
      <FeatureList />
    </SiteShell>
  );
}
