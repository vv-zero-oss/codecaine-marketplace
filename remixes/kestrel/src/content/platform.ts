/**
 * The platform page: one module per thing money touches, each with its own
 * anchor (the header's mega menu links to them) and its own working mockup.
 */
import {
  Bot,
  CalendarClock,
  Camera,
  CheckCheck,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileSearch,
  Gauge,
  Globe,
  Landmark,
  Layers,
  ListChecks,
  Lock,
  Plane,
  Receipt,
  Repeat,
  Route,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Split,
  Store,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export type ModuleId = "cards" | "expenses" | "travel" | "bills" | "procurement" | "vendors" | "accounting" | "treasury" | "agents"

export type PlatformModule = {
  id: ModuleId
  label: string
  icon: LucideIcon
  title: string
  continuation: string
  body: string
  bullets: { icon: LucideIcon; title: string; body: string }[]
}

export const MODULES: PlatformModule[] = [
  {
    id: "cards",
    label: "Corporate cards",
    icon: CreditCard,
    title: "Cards with the rules built in.",
    continuation: "Not bolted on after.",
    body: "Issue a card in seconds with its limit, merchants and expiry set before the first swipe. Drag a limit and every cardholder sees it change.",
    bullets: [
      { icon: Gauge, title: "Limits that adjust", body: "By team, budget or the day of the month." },
      { icon: Store, title: "Merchant locks", body: "A software card only works at software vendors." },
      { icon: Lock, title: "Freeze in a tap", body: "Lost card? Frozen before you've finished the sentence." },
    ],
  },
  {
    id: "expenses",
    label: "Expenses",
    icon: Receipt,
    title: "Receipts match themselves.",
    continuation: "Your team just keeps working.",
    body: "Snap a photo, forward an email or do nothing — Kestrel finds the receipt, reads it and pairs it with the transaction.",
    bullets: [
      { icon: Camera, title: "Photo, text or email", body: "However the receipt arrives, it lands in the right place." },
      { icon: ScanLine, title: "Read line by line", body: "Tax, tips and line items, extracted and checked." },
      { icon: CheckCheck, title: "Coded on arrival", body: "Category, class and department, filled in for you." },
    ],
  },
  {
    id: "travel",
    label: "Travel",
    icon: Plane,
    title: "Book the trip inside the policy.",
    continuation: "Not against it.",
    body: "Flights and hotels show whether they're in policy before anyone books, and the trip gets its own card that closes when the trip does.",
    bullets: [
      { icon: Route, title: "Policy at the point of booking", body: "Out-of-policy fares ask for a reason, not a fight." },
      { icon: CreditCard, title: "A card per trip", body: "Capped to the trip, closed when it's over." },
      { icon: Globe, title: "Per diems abroad", body: "Daily allowances in the local currency." },
    ],
  },
  {
    id: "bills",
    label: "Bill pay",
    icon: FileSearch,
    title: "Invoices read, coded and paid.",
    continuation: "You only approve.",
    body: "Forward an invoice and Kestrel pulls out the vendor, amount, due date and line items, routes it for approval and pays on the day it's due.",
    bullets: [
      { icon: ScanLine, title: "Read in seconds", body: "PDFs, photos and email bodies alike." },
      { icon: Split, title: "Routed by rule", body: "The right approver for the amount and the team." },
      { icon: CalendarClock, title: "Paid on time", body: "Scheduled for the due date, never a day early." },
    ],
  },
  {
    id: "procurement",
    label: "Procurement",
    icon: ClipboardList,
    title: "Ask for it once.",
    continuation: "Kestrel gets it approved.",
    body: "A purchase request becomes a purchase order, a card or a bill — whichever fits — after the right people have said yes.",
    bullets: [
      { icon: ListChecks, title: "One intake form", body: "Software, hardware, services — one place to ask." },
      { icon: Users, title: "Approvers in order", body: "Budget owner, then IT, then finance, automatically." },
      { icon: Layers, title: "Three-way match", body: "Order, delivery and invoice checked against each other." },
    ],
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: Store,
    title: "Every contract on one calendar.",
    continuation: "No renewal by surprise.",
    body: "Kestrel tracks what you pay each vendor, when it renews and how many seats you actually use — and tells you a month before.",
    bullets: [
      { icon: CalendarClock, title: "Renewal alerts", body: "Thirty days' notice, with usage attached." },
      { icon: Repeat, title: "Duplicate detection", body: "Two teams, one tool, two contracts — flagged." },
      { icon: TrendingUp, title: "Price benchmarks", body: "What similar companies pay for the same seats." },
    ],
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: Landmark,
    title: "Close the books in days.",
    continuation: "Not weeks.",
    body: "Transactions are coded and synced as they happen, so month end is a review rather than a reconstruction.",
    bullets: [
      { icon: CheckCheck, title: "Real-time sync", body: "Every transaction in your ledger the moment it clears." },
      { icon: ListChecks, title: "Close checklist", body: "Forty steps, most of them ticking themselves." },
      { icon: Layers, title: "Accruals and amortisation", body: "Prepaid annual contracts spread month by month." },
    ],
  },
  {
    id: "treasury",
    label: "Treasury",
    icon: Wallet,
    title: "Idle cash, earning.",
    continuation: "Without the paperwork.",
    body: "Move what you won't spend this quarter into a treasury account and watch it earn — then pull it back the same day you need it.",
    bullets: [
      { icon: TrendingUp, title: "Competitive yield", body: "On cash you weren't going to touch this month." },
      { icon: CircleDollarSign, title: "Same-day access", body: "Back in operating cash before the bill is due." },
      { icon: ShieldCheck, title: "Held at partner banks", body: "Spread across banks for wider deposit cover." },
    ],
  },
  {
    id: "agents",
    label: "Agents",
    icon: Bot,
    title: "The busywork, handed off.",
    continuation: "Every step on the record.",
    body: "Kestrel's agents chase receipts, review expenses against policy and draft the close — and every action they take is logged for you to check.",
    bullets: [
      { icon: Sparkles, title: "Policy review", body: "Every expense checked against your written policy." },
      { icon: Bot, title: "Receipt chasing", body: "A polite nudge, by text, at the right moment." },
      { icon: FileSearch, title: "An audit trail", body: "What each agent did, when, and why." },
    ],
  },
]

export const SECURITY = [
  { icon: ShieldCheck, title: "Audited every year", body: "Independent SOC 2 Type II and PCI DSS Level 1 audits of the whole platform." },
  { icon: Lock, title: "Encrypted throughout", body: "AES-256 at rest, TLS 1.3 in transit, and card numbers tokenised end to end." },
  { icon: Users, title: "Roles, not passwords", body: "Single sign-on, two-factor on every account and permissions down to a single card." },
  { icon: FileSearch, title: "Everything on the record", body: "An audit log of every approval, change and agent action, exportable at any time." },
]

/** Integrations, drawn as monograms rather than real brands. */
export const INTEGRATIONS = [
  { name: "Ledgerly", kind: "Accounting", mono: "Lg" },
  { name: "Northbook", kind: "Accounting", mono: "Nb" },
  { name: "Quillbase", kind: "ERP", mono: "Qb" },
  { name: "Payroll One", kind: "Payroll", mono: "P1" },
  { name: "Staffhub", kind: "HR", mono: "Sh" },
  { name: "Waypoint", kind: "Travel", mono: "Wp" },
  { name: "Inkwell", kind: "Contracts", mono: "Iw" },
  { name: "Chatterbox", kind: "Chat", mono: "Cb" },
  { name: "Signet", kind: "SSO", mono: "Sg" },
  { name: "Tallyroll", kind: "Payroll", mono: "Tr" },
  { name: "Openlane", kind: "Banking", mono: "Ol" },
  { name: "Mailroom", kind: "Email", mono: "Mr" },
]
