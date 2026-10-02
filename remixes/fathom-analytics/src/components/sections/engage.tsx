import { StickyTabs } from "@/components/motion/sticky-tabs"
import { ENGAGE_PANELS } from "@/components/mocks/panels"
import { ENGAGE_TABS } from "@/content"

/** Light pinned tabs: the product, one verb at a time. */
export function Engage({ holdVh = 70 }: { holdVh?: number }) {
  return (
    <StickyTabs
      id="product"
      eyebrow="Product"
      title="Engage everyone"
      body="AI-powered workflows that unlock deep analysis and reporting for all users."
      holdVh={holdVh}
      tabs={ENGAGE_TABS}
      panels={ENGAGE_PANELS}
    />
  )
}
