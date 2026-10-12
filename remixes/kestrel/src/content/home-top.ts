/**
 * Copy for the top of the home page: hero, proof and the platform bento.
 * Every company, figure and quote here is invented.
 */

export const HERO = {
  tickerLabel: "Spend reconciled by Kestrel today",
  tickerStart: 0.4821374,
  title: "Spend less time on spend.",
  continuation: "Close more of it.",
  body: "Cards, bills, expenses and treasury — closed by agents while you sleep.",
  cta: "Start for free",
}

/** The live counters under the hero panel: label, starting value, per-second rate. */
export const AGENT_COUNTERS = [
  { label: "Receipts matched", start: 412_380, rate: 9 },
  { label: "Bills coded", start: 96_214, rate: 3 },
  { label: "Policy checks", start: 238_907, rate: 6 },
  { label: "Cards issued", start: 4_118, rate: 0.4 },
  { label: "Vendors paid", start: 31_552, rate: 1.2 },
  { label: "Hours handed back", start: 18_406, rate: 0.7 },
]

export const PROOF = {
  title: "Join 40,000 finance teams",
  continuation: "closing their books 3× faster than they did on spreadsheets.",
  link: "Read the 2026 Spend Index",
}

export type Customer = {
  name: string
  icon: "warehouse" | "flask" | "trees" | "heart" | "plane" | "sun" | "leaf" | "waves"
  story?: { photo: number; stat: string; caption: string; quote: string }
}

export const CUSTOMERS: Customer[] = [
  { name: "Fieldhouse", icon: "warehouse", story: { photo: 4481259, stat: "312 hrs", caption: "saved on month-end close", quote: "Nine stores, one close." } },
  { name: "Northwind Labs", icon: "flask", story: { photo: 7698799, stat: "3 days", caption: "to close, down from eleven", quote: "Our controller finally takes Fridays." } },
  { name: "Parcel & Pine", icon: "trees" },
  { name: "Oaktree Health", icon: "heart", story: { photo: 6129444, stat: "$1.4M", caption: "in duplicate spend caught", quote: "It reads every invoice twice so we don’t." } },
  { name: "Lumen Air", icon: "plane" },
  { name: "Brightline", icon: "sun", story: { photo: 4353667, stat: "100%", caption: "receipts in before the card is back in a wallet", quote: "Nobody chases anybody now." } },
  { name: "Copperleaf", icon: "leaf" },
  { name: "Halcyon", icon: "waves" },
]

export const BENTO = {
  title: "One platform for the whole back office.",
  continuation: "Agents on every desk, all night.",
  cta: "Make the switch",
  cards: {
    cards: { title: "Cards & expenses", continuation: "that file themselves", href: "/platform#cards" },
    procure: { title: "Bill pay", continuation: "without the approval chase", href: "/platform#bills" },
    accounting: { title: "Accounting", continuation: "that codes as it goes", href: "/platform#accounting" },
    treasury: { title: "Treasury", continuation: "for cash that sits still", href: "/platform#treasury" },
    integrations: { title: "180+ integrations", continuation: "with the stack you have", href: "/platform#agents" },
  },
}

export const EXPENSE_BUBBLES = [
  { kind: "swipe", text: "$240.00 at Figma" },
  { kind: "agent", text: "Grabbing your receipt… nothing for you to do." },
  { kind: "done", text: "Receipt added for $240.00. Coded to Software." },
] as const

export const LEDGER_ROWS = [
  { vendor: "Northline Freight", amount: 1840.0, code: "5120 · Shipping" },
  { vendor: "Atlas Cloud", amount: 4210.55, code: "6410 · Hosting" },
  { vendor: "Greenway Catering", amount: 612.3, code: "6720 · Meals" },
  { vendor: "Pillar Legal LLP", amount: 7500.0, code: "6610 · Legal" },
  { vendor: "Mosaic Print Co.", amount: 248.9, code: "6230 · Marketing" },
  { vendor: "Harbor Coworking", amount: 3200.0, code: "6110 · Rent" },
]

export const INTEGRATIONS = [
  "General ledger", "Payroll", "HRIS", "ERP", "Bank feeds", "Team chat", "Email", "Calendar", "SSO",
  "Travel", "Data warehouse", "Spreadsheets", "CRM", "Tax", "Procurement", "Billing", "Storage", "Identity",
  "Webhooks", "API",
]
