/**
 * What every page shares: the announcement, the navigation and the footer.
 */

export const ANNOUNCEMENT = {
  text: "Forecast Agent is in public beta — commit numbers built from activity",
  link: "/changelog",
}

export type MenuItem = { title: string; body: string; href: string; icon: string }

export const NAV = {
  menus: [
    {
      label: "Platform",
      columns: [
        {
          title: "Work the pipeline",
          items: [
            { title: "Capture", body: "Every email, call and meeting, logged", href: "/#platform", icon: "dataset-linked" },
            { title: "Qualify", body: "Intent scores with the evidence attached", href: "/#platform", icon: "search-insights" },
            { title: "Engage", body: "Follow-ups drafted, sequences that adapt", href: "/#platform", icon: "send-time-extension" },
          ],
        },
        {
          title: "Run the business",
          items: [
            { title: "Forecast", body: "Commit numbers you can defend", href: "/#platform", icon: "trending-up" },
            { title: "Retain", body: "Risk and expansion, flagged early", href: "/#platform", icon: "verified-user" },
            { title: "Agents", body: "Ask Arcline anything, have it act", href: "/agents", icon: "bolt" },
          ],
        },
      ],
      aside: {
        title: "What's new",
        items: [
          { title: "Forecast Agent", body: "Public beta", href: "/changelog" },
          { title: "Call summaries in 14 languages", body: "Shipped", href: "/changelog" },
        ],
      },
    },
    {
      label: "Resources",
      columns: [
        {
          title: "Learn",
          items: [
            { title: "Customers", body: "How revenue teams run on Arcline", href: "/customers", icon: "groups" },
            { title: "Changelog", body: "Everything we shipped, weekly", href: "/changelog", icon: "event-list" },
            { title: "Playbooks", body: "Motions to copy, step by step", href: "/#playbooks", icon: "layers" },
          ],
        },
        {
          title: "Build",
          items: [
            { title: "Developers", body: "REST API, webhooks and SDKs", href: "/#developers", icon: "deployed-code" },
            { title: "Integrations", body: "Two-way sync with 120+ tools", href: "/#integrations", icon: "linked-services" },
            { title: "Security", body: "SOC 2 Type II, GDPR, SSO", href: "/#security", icon: "shield-lock" },
          ],
        },
      ],
    },
  ],
  links: [
    { label: "Agents", href: "/agents" },
    { label: "Customers", href: "/customers" },
    { label: "Pricing", href: "/pricing" },
  ],
}

export const FOOTER = {
  columns: [
    { title: "Platform", links: [["Capture", "/#platform"], ["Qualify", "/#platform"], ["Engage", "/#platform"], ["Forecast", "/#platform"], ["Retain", "/#platform"], ["Agents", "/agents"]] },
    { title: "Company", links: [["Customers", "/customers"], ["Changelog", "/changelog"], ["Careers", "/#careers"], ["Press", "/#press"]] },
    { title: "Switch from", links: [["Spreadsheets", "/#switch"], ["Legacy CRMs", "/#switch"], ["Inbox folders", "/#switch"]] },
    { title: "Resources", links: [["Pricing", "/pricing"], ["Developers", "/#developers"], ["Security", "/#security"], ["Status", "/#status"], ["Brand guidelines", "/brand"]] },
  ],
  fresh: ["Agents", "Changelog"],
  legal: ["Terms", "Privacy", "Security", "Cookies"],
  copyright: "© 2026 Arcline, Inc.",
}
