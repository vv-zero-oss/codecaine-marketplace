/**
 * Navigation and footer copy, shared by every page. Each section keeps its
 * own words beside it in `src/content/`.
 */

export type MenuLink = { title: string; blurb: string; href: string }
export type MenuGroup = { label: string; links: MenuLink[] }
export type Menu = { label: string; groups: MenuGroup[]; featured: { kicker: string; title: string; body: string; href: string } }

export const MENUS: Menu[] = [
  {
    label: "Product",
    groups: [
      {
        label: "Spend",
        links: [
          { title: "Corporate cards", blurb: "Limits that set themselves", href: "/platform#cards" },
          { title: "Expenses", blurb: "Receipts, matched on the swipe", href: "/platform#expenses" },
          { title: "Travel", blurb: "Book inside policy, every time", href: "/platform#travel" },
        ],
      },
      {
        label: "Pay",
        links: [
          { title: "Bill pay", blurb: "Invoices read, coded, paid", href: "/platform#bills" },
          { title: "Procurement", blurb: "Requests that route themselves", href: "/platform#procurement" },
          { title: "Vendors", blurb: "Every contract, one renewal calendar", href: "/platform#vendors" },
        ],
      },
      {
        label: "Close",
        links: [
          { title: "Accounting", blurb: "Books that close in days", href: "/platform#accounting" },
          { title: "Treasury", blurb: "Idle cash, earning", href: "/platform#treasury" },
          { title: "Agents", blurb: "The busywork, handed off", href: "/platform#agents" },
        ],
      },
    ],
    featured: { kicker: "Autumn release", title: "Forty-one things new in Kestrel", body: "Per-diem cards, a policy agent that reads PDFs and same-day vendor payouts.", href: "/platform" },
  },
  {
    label: "Solutions",
    groups: [
      {
        label: "By stage",
        links: [
          { title: "Startups", blurb: "Your first card, your first close", href: "/pricing" },
          { title: "Mid-market", blurb: "Controls without the queue", href: "/pricing" },
          { title: "Enterprise", blurb: "Many entities, one ledger", href: "/pricing" },
        ],
      },
      {
        label: "By team",
        links: [
          { title: "Controllers", blurb: "Close calendar, on rails", href: "/platform#accounting" },
          { title: "Procurement", blurb: "Every request, in one queue", href: "/platform#procurement" },
          { title: "Founders", blurb: "Runway, at a glance", href: "/platform#treasury" },
        ],
      },
    ],
    featured: { kicker: "Customer story", title: "How Fieldhouse closed in 3 days", body: "A 900-person retailer that stopped chasing receipts.", href: "/customers" },
  },
  {
    label: "Resources",
    groups: [
      {
        label: "Learn",
        links: [
          { title: "Customer stories", blurb: "Teams that took their time back", href: "/customers" },
          { title: "Pricing", blurb: "Free to start, honest after", href: "/pricing" },
          { title: "Brand guidelines", blurb: "The system this site is built on", href: "/brand" },
        ],
      },
      {
        label: "Tools",
        links: [
          { title: "Savings calculator", blurb: "What the busywork costs you", href: "/#savings" },
          { title: "Policy builder", blurb: "Write an expense policy in minutes", href: "/#policy" },
          { title: "Close checklist", blurb: "Forty steps, most of them automatic", href: "/platform#accounting" },
        ],
      },
    ],
    featured: { kicker: "Report", title: "The 2026 Spend Index", body: "What 40,000 finance teams bought, and what they stopped buying.", href: "/customers" },
  },
]

export const NAV_LINKS = [
  { label: "Customers", href: "/customers" },
  { label: "Pricing", href: "/pricing" },
]

export const FOOTER_COLUMNS = [
  { label: "Company", links: [["About", "/"], ["Careers", "/"], ["Customers", "/customers"], ["Press", "/"], ["Brand guidelines", "/brand"]] },
  { label: "Product", links: [["Corporate cards", "/platform#cards"], ["Expenses", "/platform#expenses"], ["Bill pay", "/platform#bills"], ["Procurement", "/platform#procurement"], ["Accounting", "/platform#accounting"], ["Treasury", "/platform#treasury"], ["Travel", "/platform#travel"]] },
  { label: "Platform", links: [["Overview", "/platform"], ["Agents", "/platform#agents"], ["Integrations", "/#platform"], ["Security", "/platform"], ["API", "/platform"]] },
  { label: "Solutions", links: [["Startups", "/pricing"], ["Mid-market", "/pricing"], ["Enterprise", "/pricing"], ["Nonprofits", "/pricing"]] },
  { label: "Resources", links: [["Savings calculator", "/#savings"], ["Policy builder", "/#policy"], ["Spend Index", "/customers"], ["Help centre", "/"], ["Status", "/"]] },
] as const

export const LEGAL =
  "Kestrel is a financial technology company, not a bank. A template: the company, its customers, figures and quotes are invented, and the card programme described here does not exist."
