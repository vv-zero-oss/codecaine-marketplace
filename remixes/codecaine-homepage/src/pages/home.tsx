import { SiteShell } from "@/components/landing/site-shell";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Gallery } from "@/components/landing/gallery";

/**
 * The landing page.
 *
 * One column of sections in normal flow — no hand-placed positions — so it
 * reflows at every width. Spacing, type and media ratios are `--lp-*` tokens
 * in src/styles/landing.css, which step down at the tablet and mobile breakpoints.
 */
export function LandingPage() {
  return (
    <SiteShell>
      <Hero />
      <Features />
      <Gallery />
    </SiteShell>
  );
}
