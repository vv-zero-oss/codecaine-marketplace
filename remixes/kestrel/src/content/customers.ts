/**
 * The customers page: invented companies, people and figures — a template's
 * stand-ins, written to read like the real thing. Photography from Pexels
 * by photo id (see `lib/photos.ts`).
 */

export const INDUSTRIES = ["All", "Retail", "Software", "Healthcare", "Nonprofit", "Hospitality", "Manufacturing"] as const
export type Industry = Exclude<(typeof INDUSTRIES)[number], "All">

export type Story = {
  id: string
  company: string
  industry: Industry
  photo: number
  size: string
  headline: string
  metrics: { value: string; label: string }[]
  problem: string
  change: string
  result: string
  quote: { text: string; name: string; role: string; avatar: number }
}

export const CUSTOMER_STATS = [
  { value: 40000, suffix: "+", decimals: 0, prefix: "", label: "finance teams run on Kestrel" },
  { value: 2.1, suffix: "M", decimals: 1, prefix: "", label: "hours of busywork handed back last year" },
  { value: 5.2, suffix: "%", decimals: 1, prefix: "", label: "average saved on total spend" },
  { value: 3.4, suffix: " days", decimals: 1, prefix: "", label: "median month-end close" },
]

export const FEATURED: Story = {
  id: "fieldhouse",
  company: "Fieldhouse",
  industry: "Retail",
  photo: 4487383,
  size: "900 people · 64 stores",
  headline: "Fieldhouse closes the month in three days — down from fourteen.",
  metrics: [
    { value: "3 days", label: "to close, from 14" },
    { value: "11,400", label: "receipts matched without a reminder" },
    { value: "$1.8M", label: "in duplicate vendor spend found" },
  ],
  problem:
    "Sixty-four store managers, each with a company card and a shoebox. The finance team spent the first week of every month chasing receipts by text and the second week keying them in.",
  change:
    "Every manager got a Kestrel card with a limit tied to their store's budget. Receipts were matched from a photo at the till, coded by the policy agent, and only the odd one out reached a person.",
  result:
    "The close went from fourteen days to three. The two people who used to chase receipts now run vendor negotiations, and found $1.8M of overlapping contracts in their first quarter.",
  quote: {
    text: "We didn't hire our way out of the close. We stopped doing the parts a computer should have been doing all along.",
    name: "Maren Oyelaran",
    role: "Controller, Fieldhouse",
    avatar: 9064790,
  },
}

export const STORIES: Story[] = [
  {
    id: "linden-moss",
    company: "Linden & Moss",
    industry: "Retail",
    photo: 8484136,
    size: "120 people",
    headline: "A boutique chain that reconciles before the shop opens.",
    metrics: [{ value: "96%", label: "receipts auto-matched" }, { value: "6 hrs", label: "saved a week" }],
    problem: "Buyers travelled to trade shows with personal cards and came back with a month of reimbursements.",
    change: "Virtual cards per buying trip, each capped to the season's budget and closed when the trip ended.",
    result: "Reimbursements stopped. The finance lead now reviews a dozen exceptions a week instead of three hundred lines.",
    quote: { text: "Our buyers stopped fronting money for the company. That alone was worth it.", name: "Isla Penhaligon", role: "Head of Finance", avatar: 23496671 },
  },
  {
    id: "corner-pantry",
    company: "Corner Pantry Co.",
    industry: "Retail",
    photo: 8475204,
    size: "40 people · 5 stores",
    headline: "Five grocery stores, one bookkeeper, no backlog.",
    metrics: [{ value: "0", label: "late supplier payments since" }, { value: "2.4%", label: "back on supplier spend" }],
    problem: "Supplier invoices arrived by email, post and on the back of delivery notes.",
    change: "One inbox for every invoice. Kestrel reads them, matches them to deliveries and schedules payment for the due date.",
    result: "Every supplier is paid on time, and early-payment discounts now cover the software twice over.",
    quote: { text: "I used to dread Fridays. Now I approve a list on my phone and go home.", name: "Tomas Reyes-Aldana", role: "Bookkeeper", avatar: 8937548 },
  },
  {
    id: "parcelwise",
    company: "Parcelwise",
    industry: "Software",
    photo: 6804068,
    size: "310 people",
    headline: "Forty-two SaaS tools found, nine cancelled in a week.",
    metrics: [{ value: "$410K", label: "in yearly software cut" }, { value: "42", label: "tools surfaced" }],
    problem: "Every team bought its own software on its own card, and nobody knew what renewed when.",
    change: "Vendor cards for each subscription, a renewal calendar, and an agent that flags seats nobody uses.",
    result: "Nine tools were cancelled in the first week and every renewal now arrives with a usage report attached.",
    quote: { text: "We were paying three companies to do the same job. Kestrel showed us in a single screen.", name: "Devi Ramaswamy", role: "VP Finance", avatar: 8559932 },
  },
  {
    id: "northbeam",
    company: "Northbeam Labs",
    industry: "Software",
    photo: 3865639,
    size: "85 people",
    headline: "From Series A to audit-ready without a second accountant.",
    metrics: [{ value: "1", label: "person runs finance" }, { value: "4 days", label: "to close" }],
    problem: "A fast-growing team, a first audit on the horizon and one finance person.",
    change: "Kestrel's accounting sync codes every transaction to the chart of accounts as it happens.",
    result: "The audit took two weeks instead of the six the auditors quoted, with no restated months.",
    quote: { text: "The auditors asked who our controller was. It's me, and a lot of good automation.", name: "Jonah Abernathy", role: "Head of Finance", avatar: 7648230 },
  },
  {
    id: "tessellate",
    company: "Tessellate",
    industry: "Software",
    photo: 18999469,
    size: "540 people · 4 countries",
    headline: "Four entities, four currencies, one close.",
    metrics: [{ value: "4", label: "entities, one ledger" }, { value: "31%", label: "less FX spend" }],
    problem: "Each subsidiary ran its own cards and its own spreadsheet, consolidated by hand every month.",
    change: "Local cards in local currencies, rolled up into one view and synced to each entity's books.",
    result: "Consolidation went from a week of spreadsheets to an afternoon of review.",
    quote: { text: "The consolidation used to be a project. Now it's a report.", name: "Anouk Verhaegen", role: "Group Controller", avatar: 8730375 },
  },
  {
    id: "halcyon",
    company: "Halcyon Health",
    industry: "Healthcare",
    photo: 6129450,
    size: "2,100 people · 18 clinics",
    headline: "Clinic supplies ordered inside budget, every time.",
    metrics: [{ value: "18", label: "clinics on one policy" }, { value: "$2.3M", label: "kept inside budget" }],
    problem: "Clinic managers ordered supplies on whatever card was nearest, and budgets were checked a month later.",
    change: "Each clinic got cards bound to its own budget and approved suppliers, with requests routed to the regional lead.",
    result: "Overspend now shows up before the order is placed, not after the quarter closes.",
    quote: { text: "Our clinic managers want to run clinics, not expense reports. Now they do.", name: "Priya Castellanos", role: "Director of Finance", avatar: 9064790 },
  },
  {
    id: "brightwater",
    company: "Brightwater Clinics",
    industry: "Healthcare",
    photo: 8460371,
    size: "260 people",
    headline: "Locum travel booked and reconciled in one place.",
    metrics: [{ value: "100%", label: "of trips inside policy" }, { value: "9 hrs", label: "saved a week" }],
    problem: "Locum doctors booked their own travel and sent receipts weeks later.",
    change: "Trips booked in Kestrel against the travel policy, paid with a card that knows the trip.",
    result: "Every trip arrives coded and receipted. Nobody chases a doctor for a hotel bill.",
    quote: { text: "The best part is what I don't do anymore — chase receipts from people on night shifts.", name: "Samuel Achterberg", role: "Finance Manager", avatar: 31880869 },
  },
  {
    id: "common-table",
    company: "Common Table Fund",
    industry: "Nonprofit",
    photo: 7156163,
    size: "70 staff · 400 volunteers",
    headline: "Every grant dollar traceable to the receipt.",
    metrics: [{ value: "12", label: "grants tracked live" }, { value: "0", label: "audit findings" }],
    problem: "Restricted grants had to be reported line by line, and volunteers bought supplies out of pocket.",
    change: "Cards tagged to grants, so each purchase lands in the right fund and the right report.",
    result: "Grant reports that took a week to assemble now export in minutes, and volunteers never front money.",
    quote: { text: "Funders ask how we spent their money. Now we just send them the link.", name: "Rosalind Mbeki", role: "Operations Director", avatar: 23496671 },
  },
  {
    id: "open-shelf",
    company: "Open Shelf Alliance",
    industry: "Nonprofit",
    photo: 6591154,
    size: "35 people",
    headline: "Food bank purchasing that keeps up with demand.",
    metrics: [{ value: "3×", label: "more purchase orders handled" }, { value: "$0", label: "in software cost" }],
    problem: "Purchase orders lived in email threads and approvals waited on a director's inbox.",
    change: "Requests routed to the right approver by amount, approved from a phone, paid the same day.",
    result: "The team handles three times the orders it did, on Kestrel's free plan.",
    quote: { text: "We spend donors' money on food, not on finance software. Free mattered.", name: "Kwame Asante-Bell", role: "Executive Director", avatar: 8937548 },
  },
  {
    id: "ember-oak",
    company: "Ember & Oak Hotels",
    industry: "Hospitality",
    photo: 6876590,
    size: "11 hotels",
    headline: "Eleven hotels, one view of every invoice.",
    metrics: [{ value: "6,800", label: "invoices a month, read automatically" }, { value: "2 days", label: "faster close" }],
    problem: "Each hotel had its own suppliers, its own approvals and its own spreadsheet.",
    change: "One accounts-payable inbox per property, rolled up into a group view with shared approval rules.",
    result: "The group sees every commitment across eleven properties before it's paid.",
    quote: { text: "I can see a linen order in Lisbon from my desk in Porto. That used to take a phone call.", name: "Beatriz Fontoura", role: "Group CFO", avatar: 8730375 },
  },
  {
    id: "saltgrass",
    company: "Saltgrass Kitchens",
    industry: "Hospitality",
    photo: 4253297,
    size: "6 restaurants",
    headline: "Head chefs with cards, and no surprises at month end.",
    metrics: [{ value: "6", label: "kitchens on live budgets" }, { value: "14%", label: "lower food cost variance" }],
    problem: "Chefs bought produce at the market with cash and receipts went in a drawer.",
    change: "A card for each head chef, limited to food suppliers and the week's budget.",
    result: "Food cost is visible daily, so menus change before margins do.",
    quote: { text: "I snap the receipt at the stall and get back to the pass. That's it.", name: "Felix Navarro-Quinn", role: "Executive Chef", avatar: 7648230 },
  },
  {
    id: "ridgeline",
    company: "Ridgeline Textiles",
    industry: "Manufacturing",
    photo: 31212947,
    size: "1,300 people · 3 plants",
    headline: "Purchase orders matched to deliveries, line by line.",
    metrics: [{ value: "3-way", label: "match on every order" }, { value: "$640K", label: "in overbilling caught" }],
    problem: "Invoices were paid before anyone checked them against what was delivered.",
    change: "Kestrel matches each invoice to its purchase order and the delivery note before it can be paid.",
    result: "Overbilling is caught at the invoice, not in the annual audit.",
    quote: { text: "It found an invoice for 4,000 metres we never received. Paid for itself that week.", name: "Hannah Lindqvist", role: "Procurement Lead", avatar: 8559932 },
  },
  {
    id: "copperline",
    company: "Copperline Works",
    industry: "Manufacturing",
    photo: 14804687,
    size: "450 people",
    headline: "Maintenance spend approved before the machine stops.",
    metrics: [{ value: "40 min", label: "average approval time" }, { value: "22%", label: "less unplanned downtime" }],
    problem: "Urgent parts waited a day for a signature while a line stood still.",
    change: "Pre-approved maintenance cards for shift leads, with limits by machine and supplier.",
    result: "Parts are ordered in minutes, inside policy, and the plant manager sees every one.",
    quote: { text: "A stopped line costs more in an hour than a part costs in a year.", name: "Dmitri Okonkwo", role: "Plant Manager", avatar: 20420129 },
  },
]

/** The logo wall: invented customers, drawn as type. */
export const CUSTOMER_LOGOS = [
  { name: "Fieldhouse", style: "font-semibold tracking-[-0.04em]" },
  { name: "LINDEN & MOSS", style: "font-medium tracking-[0.14em] text-[13px]" },
  { name: "parcelwise", style: "font-semibold tracking-[-0.05em] lowercase" },
  { name: "Northbeam", style: "font-normal italic tracking-[-0.02em]" },
  { name: "TESSELLATE", style: "font-semibold tracking-[0.08em] text-[14px]" },
  { name: "Halcyon", style: "font-medium tracking-[-0.03em]" },
  { name: "brightwater", style: "font-normal tracking-[-0.04em]" },
  { name: "Common Table", style: "font-semibold tracking-[-0.02em]" },
  { name: "EMBER & OAK", style: "font-medium tracking-[0.12em] text-[13px]" },
  { name: "Saltgrass", style: "font-semibold italic tracking-[-0.03em]" },
  { name: "RIDGELINE", style: "font-semibold tracking-[0.1em] text-[14px]" },
  { name: "copperline", style: "font-medium tracking-[-0.04em]" },
]
