/**
 * Every word on the home page, in the order a visitor meets it.
 *
 * The story: Orra is one payments platform for merchants who sell in more than
 * one place. The hero says what it is; the merchant logos say who uses it; the
 * product index says everything it does; the cards show the two ways money
 * comes in, then the account it lands in, then the dashboard that runs it.
 * Customers prove it, developers get their own pitch, support answers "what if
 * it breaks", and the CTA asks for the first payment.
 */
import {
  ArrowLeftRight,
  BadgeEuro,
  Banknote,
  CalendarSync,
  ChartLine,
  FileText,
  Landmark,
  Link2,
  ShoppingBag,
  Store,
  type LucideIcon,
} from "lucide-react"

import { PHOTOS } from "@/photos"

export const NAV = [
  { label: "Products", href: "#products" },
  { label: "Developers", href: "#developers" },
  { label: "Customers", href: "#customers" },
  { label: "Resources", href: "/brand" },
  { label: "Pricing", href: "#pricing" },
]

export type HeroScene = {
  id: string
  tab: string
  line: string
  photo: number
  alt: string
  chips: { icon: "check" | "toggle" | "chart" | "bank"; text: string }[]
}

export const HERO = {
  eyebrow: "Trusted by 180,000 merchants in 31 countries",
  lead: "One platform for", // the first line; the second rotates with the scene
  body: "Take payments online and at the counter, run subscriptions, borrow against your sales and reconcile it all in one place — so growing never means another provider.",
  primary: "Start for free",
  secondary: "Talk to sales",
  scenes: [
    {
      id: "in-person",
      tab: "In-person",
      line: "the counter and the cart",
      photo: PHOTOS.counter,
      alt: "A customer taps a card on a payment terminal at a café counter",
      chips: [
        { icon: "check", text: "Paid — €18.40" },
        { icon: "toggle", text: "Tap to Pay is on for this phone" },
        { icon: "chart", text: "Today’s takings are ready" },
      ],
    },
    {
      id: "online",
      tab: "Online",
      line: "every checkout you open",
      photo: PHOTOS.online,
      alt: "Hands holding a phone with a shopping app open",
      chips: [
        { icon: "check", text: "40 local payment methods live" },
        { icon: "chart", text: "Checkout conversion up 11%" },
      ],
    },
    {
      id: "funding",
      tab: "Funding",
      line: "whatever comes next",
      photo: PHOTOS.warehouse,
      alt: "A man stands in a busy warehouse lit by high windows",
      chips: [{ icon: "bank", text: "€42,000 advance landed in 24 hours" }],
    },
    {
      id: "accounts",
      tab: "Accounts",
      line: "money that moves itself",
      photo: PHOTOS.studio,
      alt: "A shop owner works on a laptop beside packed parcels",
      chips: [
        { icon: "check", text: "Payouts to 14 suppliers sent" },
        { icon: "toggle", text: "Card limits updated for the team" },
      ],
    },
  ] satisfies HeroScene[],
}

export const MERCHANTS: { name: string; style: "serif" | "spaced" | "heavy" | "mono" | "script" | "round" }[] = [
  { name: "Halden", style: "spaced" },
  { name: "Terra Vessel", style: "serif" },
  { name: "oak+ash", style: "round" },
  { name: "LONG TABLE", style: "heavy" },
  { name: "crumb&co", style: "script" },
  { name: "FIELDBLOOM", style: "spaced" },
  { name: "Northwind", style: "heavy" },
  { name: "pellow", style: "round" },
  { name: "Atelier Vos", style: "serif" },
  { name: "SUNDAY/SUPPLY", style: "mono" },
]

export const PRODUCTS: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Online payments", icon: ChartLine, href: "#payments" },
  { label: "In-person payments", icon: Store, href: "#payments" },
  { label: "Payment links", icon: Link2, href: "#payments" },
  { label: "Business accounts", icon: Landmark, href: "#accounts" },
  { label: "Invoicing", icon: FileText, href: "#dashboard" },
  { label: "Subscriptions", icon: CalendarSync, href: "#payments" },
  { label: "Flexible funding", icon: BadgeEuro, href: "#rail" },
  { label: "Hosted checkout", icon: ShoppingBag, href: "#payments" },
  { label: "Payouts", icon: ArrowLeftRight, href: "#accounts" },
  { label: "Embedded payments", icon: Banknote, href: "#developers" },
]

export const PAYMENTS = {
  online: {
    eyebrow: "Online payments",
    title: "Take 40+ payment methods — through one integration",
    link: "See online payments",
  },
  inPerson: {
    eyebrow: "In-person payments",
    title: "Sell at the counter, the stall or the pop-up — on one system",
    link: "See in-person payments",
  },
}

export const ACCOUNTS = {
  eyebrow: "Business accounts",
  title: "Run your whole cash flow from one business account",
  points: [
    "Spend today’s sales the moment they settle",
    "Pay suppliers and staff from your own IBAN",
    "Give your team cards with limits you control",
  ],
  link: "See business accounts",
}

export const DASHBOARD = {
  eyebrow: "The Orra dashboard",
  title: "Run the business, not the spreadsheets",
  body: "Refund an order, answer a dispute, recover a failed renewal — yourself, or hand it to an agent.",
  tabs: [
    {
      id: "team",
      label: "Team",
      body: "Invite your accountant, warehouse lead and support desk, with roles that show each of them only what they need.",
    },
    {
      id: "insights",
      label: "Insights",
      body: "See which methods, markets and hours bring in revenue — and exactly where checkouts drop away.",
    },
    {
      id: "assistant",
      label: "Assistant",
      badge: "Beta",
      body: "Ask about your account in plain words, get the numbers behind the answer, and reach a person the moment it can’t help.",
    },
  ],
}

export const CUSTOMERS = {
  eyebrow: "Customers",
  title: "Made for high volume. Open from your first sale.",
  stories: [
    {
      brand: "Halden Cycles",
      style: "spaced" as const,
      photo: PHOTOS.cycles,
      alt: "A bicycle workshop seen through its front window",
      quote: "We’d have needed three providers to sell in the shop, online and on finance. Now it’s one login.",
      person: "Jonas Halden, founder of Halden Cycles",
    },
    {
      brand: "Terra Vessel",
      style: "serif" as const,
      photo: PHOTOS.pottery,
      alt: "Handmade pottery set out on a table in the sun",
      quote: "Orra switched on the right local methods in each country before we asked. Belgian conversion doubled in a month.",
      person: "Mireille Faure, co-founder of Terra Vessel",
    },
    {
      brand: "Long Table",
      style: "heavy" as const,
      photo: PHOTOS.longTable,
      alt: "Friends share a relaxed meal at a long table outdoors",
      quote: "Weekend services used to end with an hour of reconciling. Now the report is waiting when we lock up.",
      person: "Tomás Rivera, owner of Long Table",
    },
    {
      brand: "crumb&co",
      style: "script" as const,
      photo: PHOTOS.bakery,
      alt: "A baker holds out a tray of fresh pastries",
      quote: "Tap to Pay on our phones meant the market stall took cards from the very first Saturday.",
      person: "Ana Petrov, head baker at crumb&co",
    },
    {
      brand: "FIELDBLOOM",
      style: "spaced" as const,
      photo: PHOTOS.florist,
      alt: "A florist hands a bouquet across the counter",
      quote: "Subscriptions, one-off bouquets and wholesale invoices all land in the same account. Finally.",
      person: "Lea Hoffmann, founder of Fieldbloom",
    },
  ],
}

export const DEVELOPERS = {
  title: "Engineered so payments stop being your problem",
  body: "Test keys the moment you sign up — no sales call, no contract. The same endpoints carry your first order and your busiest hour, so nothing changes at launch. And the people who wrote the API still triage the issues.",
  link: "Read the docs",
  mcp: {
    title: "Connect agents through our MCP server",
    body: "Let Claude, Cursor or your own agents refund, reconcile and report through Orra — only within the scopes you grant.",
  },
}

export const SUPPORT = {
  title: "Real people, whenever you need them",
  body: "A stuck payment costs you money. Our team knows your market, speaks your language and picks up fast.",
  stats: [
    { kind: "rating" as const, value: 4.7, note: "4.7 on review sites — well above the industry" },
    { kind: "text" as const, title: "Around the clock", note: "Chat any hour, in nine languages" },
    { kind: "text" as const, title: "Specialists, not scripts", note: "Payment experts on call 7 days a week" },
  ],
}

export const CTA = {
  title: "Take your first payment today — or ask us for volume pricing",
  primary: "Start for free",
  secondary: "Talk to sales",
  aside: {
    title: "Pay only for what you process",
    body: "No setup fee, no monthly minimum, no lock-in.",
    link: "See pricing",
  },
}

export const RAIL = [
  { id: "accounts", label: "Business accounts", kind: "ledger" as const },
  { id: "tap", label: "Tap to Pay", kind: "tap" as const },
  { id: "funding", label: "Funding", kind: "offer" as const, wide: true },
  { id: "links", label: "Payment links", kind: "link" as const },
]

export const FOOTER = [
  {
    groups: [
      {
        title: "Products",
        links: [
          "Online payments",
          "Hosted checkout",
          "Payment links",
          "In-person payments",
          "Subscriptions",
          "Invoicing",
          "Business accounts",
          "Funding",
          "Payouts",
          "Risk & disputes",
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: "Platforms",
        links: ["Embedded online payments", "Embedded terminals", "Embedded accounts", "Embedded funding"],
      },
    ],
  },
  {
    groups: [
      { title: "Solutions", links: ["E-commerce", "Hospitality", "Marketplaces", "SaaS"] },
      { title: "Programmes", links: ["Partners", "Agencies", "Startups"] },
    ],
  },
  {
    groups: [
      { title: "Developers", links: ["Changelog", "API reference", "Integrations", "SDKs", "Status"] },
      { title: "Resources", links: ["Guides", "Brand guidelines", "Customer stories", "Reports", "Events"] },
    ],
  },
  {
    groups: [
      { title: "Support", links: ["Help centre", "Contact support", "Talk to sales", "Why Orra is on your statement"] },
      { title: "Company", links: ["About", "Pricing", "Careers", "Security", "Press"] },
    ],
  },
]

export const LEGAL = ["Terms", "Privacy", "Responsible disclosure", "Whistleblowing", "Imprint", "Cookies"]

export const LANGUAGES = ["English", "Deutsch", "Français", "Nederlands", "Español", "Italiano", "Polski", "Português", "Svenska"]
