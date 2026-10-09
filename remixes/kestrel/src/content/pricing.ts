/**
 * The pricing page. Invented plans and prices for a template — written to
 * the conventions a buyer expects from a real finance product.
 */

export type Plan = {
  id: "start" | "grow" | "enterprise"
  name: string
  pitch: string
  monthly: number | null
  annual: number | null
  unit: string
  cta: string
  ctaHref: string
  featured?: boolean
  lead: string
  features: string[]
}

export const PLANS: Plan[] = [
  {
    id: "start",
    name: "Start",
    pitch: "Cards, expenses and bill pay for teams finding their feet.",
    monthly: 0,
    annual: 0,
    unit: "free, for every seat",
    cta: "Start for free",
    ctaHref: "/pricing#signup",
    lead: "Everything to stop chasing receipts:",
    features: [
      "Unlimited physical and virtual cards",
      "Receipts matched from a photo or an email",
      "Bill pay by ACH and cheque",
      "Sync to your accounting software",
      "Up to 2% back on card spend",
    ],
  },
  {
    id: "grow",
    name: "Grow",
    pitch: "Policies, approvals and procurement for teams that are scaling.",
    monthly: 15,
    annual: 12,
    unit: "per user, per month",
    cta: "Try Grow free for 30 days",
    ctaHref: "/pricing#signup",
    featured: true,
    lead: "Everything in Start, and:",
    features: [
      "Policy agent that reviews every expense",
      "Multi-step approvals by amount, team or vendor",
      "Purchase requests and purchase orders",
      "Vendor renewal calendar and seat tracking",
      "International cards in 30+ currencies",
      "Custom roles and spend permissions",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    pitch: "Multiple entities, custom controls and someone who picks up the phone.",
    monthly: null,
    annual: null,
    unit: "priced to your volume",
    cta: "Talk to us",
    ctaHref: "/pricing#signup",
    lead: "Everything in Grow, and:",
    features: [
      "Multi-entity consolidation",
      "ERP integrations and custom fields",
      "Single sign-on and SCIM provisioning",
      "Dedicated implementation lead",
      "99.95% uptime commitment",
    ],
  },
]

export type Cell = boolean | string
export type CompareGroup = { label: string; rows: { label: string; values: [Cell, Cell, Cell] }[] }

export const COMPARISON: CompareGroup[] = [
  {
    label: "Cards & expenses",
    rows: [
      { label: "Physical and virtual cards", values: ["Unlimited", "Unlimited", "Unlimited"] },
      { label: "Receipt matching", values: [true, true, true] },
      { label: "Per-diem and travel cards", values: [false, true, true] },
      { label: "Policy agent", values: [false, true, true] },
      { label: "Cards in 30+ currencies", values: [false, true, true] },
    ],
  },
  {
    label: "Bills & procurement",
    rows: [
      { label: "Bill pay (ACH, cheque)", values: [true, true, true] },
      { label: "International wires", values: ["$15 each", "Included", "Included"] },
      { label: "Purchase orders", values: [false, true, true] },
      { label: "Three-way matching", values: [false, true, true] },
      { label: "Vendor renewal calendar", values: [false, true, true] },
    ],
  },
  {
    label: "Accounting",
    rows: [
      { label: "Accounting software sync", values: [true, true, true] },
      { label: "Automatic coding", values: [true, true, true] },
      { label: "ERP integrations", values: [false, false, true] },
      { label: "Multi-entity consolidation", values: [false, false, true] },
    ],
  },
  {
    label: "Controls & security",
    rows: [
      { label: "Approval workflows", values: ["1 step", "Unlimited", "Unlimited"] },
      { label: "Custom roles", values: [false, true, true] },
      { label: "Single sign-on and SCIM", values: [false, false, true] },
      { label: "Audit log retention", values: ["1 year", "3 years", "Unlimited"] },
    ],
  },
  {
    label: "Support",
    rows: [
      { label: "Help centre and chat", values: [true, true, true] },
      { label: "Phone support", values: [false, true, true] },
      { label: "Dedicated implementation lead", values: [false, false, true] },
    ],
  },
]

export const FREE_STRIP = [
  { title: "No card fees", body: "No issuing, replacement or foreign transaction fees on any plan." },
  { title: "No setup cost", body: "Live in a day. Bring your cards, vendors and chart of accounts." },
  { title: "Cashback", body: "Up to 2% back on card spend, paid monthly into your account." },
  { title: "Unlimited users", body: "On Start, every seat is free — add the whole company." },
]

export const FAQ = [
  {
    q: "Is Start really free?",
    a: "Yes. Kestrel earns from the interchange fee merchants pay when your team uses a card, so the core product — cards, expenses, bill pay and accounting sync — costs nothing. There's no trial clock on it.",
  },
  {
    q: "How is a user counted on Grow?",
    a: "A user is anyone who logs in to approve, submit or manage spend in a month. Cardholders who only swipe and snap receipts are free.",
  },
  {
    q: "Can I switch between monthly and annual billing?",
    a: "Any time. Moving to annual applies the lower rate from your next invoice, and we credit the unused part of the month.",
  },
  {
    q: "Is Kestrel a bank?",
    a: "No. Kestrel is a financial technology company. Cards are issued and deposits are held by our partner banks, which are named in the disclosures on every statement.",
  },
  {
    q: "Which accounting software do you sync with?",
    a: "The common cloud ledgers on every plan, and the larger ERPs on Enterprise. Coding rules, classes and custom fields come across both ways.",
  },
  {
    q: "How long does it take to get set up?",
    a: "Most teams issue their first cards the day they sign up. Moving vendors, approval rules and historical data usually takes a week, and we do the heavy lifting.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "You can export every transaction, receipt and approval as CSV and PDF at any time, and we keep it available for 90 days after you close the account.",
  },
  {
    q: "Do you offer nonprofit or startup discounts?",
    a: "Registered nonprofits get Grow at half price. Startups backed by a partner fund get their first year of Grow free — ask us when you book a demo.",
  },
]
