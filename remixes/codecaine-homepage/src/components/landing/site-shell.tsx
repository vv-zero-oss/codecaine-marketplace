import type { ReactNode } from "react";
import { SiteNav } from "@/components/landing/site-nav";

/**
 * The chrome every marketing page shares: the page surface, the site nav and
 * the <main> landmark. A page passes only its own sections.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="lp-page min-h-screen" data-canvas-ignore>
      <SiteNav />
      <main data-canvas-ignore>{children}</main>
    </div>
  );
}
