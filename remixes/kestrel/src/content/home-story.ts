/**
 * Copy for the home page's middle chapters: the pinned "six tools" story, a
 * dollar's walk through the product, the team story and the policy agent.
 * Every person, company and figure here is invented.
 */

import { avatar, pexels } from "@/lib/photos"

export const PEOPLE = {
  priya: { name: "Priya", photo: avatar(11563145) },
  jonah: { name: "Jonah", photo: avatar(40062843) },
  lena: { name: "Lena", photo: avatar(4872080) },
  maren: { name: "Maren Okafor", photo: avatar(8171180) },
}

export const CONVERGE = {
  before: {
    title: "Six tools that never talked.",
    body: "This is what reimbursing one flight looks like today.",
  },
  after: {
    title: "Now they work as one.",
    body: "One swipe, one receipt, one answer — and nobody had to ask twice.",
  },
  expense: {
    merchant: "Aerolinea · SFO → JFK",
    amount: 412.8,
    who: "Priya Raman",
    date: "Oct 14",
    steps: [
      { label: "Receipt matched", detail: "Pulled from Priya’s inbox in 4s" },
      { label: "In policy", detail: "Economy, 5h 20m — under the 6-hour rule" },
      { label: "Coded to Travel", detail: "6200 · Engineering · New York" },
      { label: "Reimbursed", detail: "With the Oct 31 payroll run" },
    ],
  },
}

export type FlowStep = {
  id: string
  number: string
  title: string
  body: string
}

export const FLOW_STEPS: FlowStep[] = [
  {
    id: "swipe",
    number: "01",
    title: "Swipe",
    body: "Jonah buys a $86.40 team lunch on his Kestrel card. Before the waiter is back with the pen, his phone asks for one thing: a photo.",
  },
  {
    id: "capture",
    number: "02",
    title: "Capture",
    body: "He snaps the receipt. Kestrel reads the total, the tip and the guest list, and matches it to the charge without a form in sight.",
  },
  {
    id: "approve",
    number: "03",
    title: "Approve",
    body: "Over $75, so it goes to his manager — who approves it from a notification. Finance only hears about it if something looks off.",
  },
  {
    id: "code",
    number: "04",
    title: "Code",
    body: "The agent books it to Meals & Entertainment, tags the project and splits the tax. Your controller would have picked the same line.",
  },
  {
    id: "close",
    number: "05",
    title: "Close",
    body: "At month end it’s already reconciled. The close checklist ticks itself down, and the books are done before the first coffee of the 3rd.",
  },
]

export const LUNCH = {
  merchant: "Ostra Kitchen",
  amount: 86.4,
  card: "•• 4417",
  who: "Jonah Bell",
  approver: "Lena Sato",
}

export const CLOSE_TASKS = [
  "Bank feeds reconciled",
  "Card transactions coded",
  "Receipts attached",
  "Accruals posted",
  "Intercompany cleared",
  "Reports sent to the board",
]

export const TEAM_STORY = {
  title: "Keep your finance team on the work that matters.",
  continuation: "Let agents take the rest.",
  link: { label: "See how agents work", href: "/platform#agents" },
  photo: pexels(7698912, 1400, 1100),
  photoAlt: "A finance team working together around a long white desk in a bright, skylit office",
  inset: pexels(7654120, 640, 420),
  insetAlt: "Two colleagues reviewing figures on a laptop and a calculator",
  quote:
    "We used to lose the first week of every month to chasing receipts. Now the close is a checklist we glance at — and the team spends that week on forecasting.",
  person: PEOPLE.maren.name,
  role: "Controller, Fieldhouse",
  avatar: PEOPLE.maren.photo,
}

export type Txn = {
  id: string
  who: string
  merchant: string
  category: "meal" | "flight" | "hotel" | "bar"
  amount: number
  /** Meals: was a receipt attached? */
  receipt?: boolean
  /** Flights: hours in the air and cabin. */
  hours?: number
  cabin?: "Economy" | "Business"
  /** Hotels: nightly rate. */
  nightly?: number
}

export const POLICY_TXNS: Txn[] = [
  { id: "t1", who: "Ines", merchant: "Brasserie Lune", category: "meal", amount: 118.2, receipt: false },
  { id: "t2", who: "Jonah", merchant: "Aerolinea SFO → BOS", category: "flight", amount: 1284, hours: 5.6, cabin: "Business" },
  { id: "t3", who: "Priya", merchant: "Hotel Arden, Chicago", category: "hotel", amount: 1032, nightly: 344 },
  { id: "t4", who: "Lena", merchant: "Corner Bar & Grill", category: "bar", amount: 64.5 },
  { id: "t5", who: "Theo", merchant: "Pine & Pasta", category: "meal", amount: 52.75, receipt: false },
  { id: "t6", who: "Ama", merchant: "Aerolinea LAX → SEA", category: "flight", amount: 238, hours: 2.4, cabin: "Economy" },
]

export const POLICY_QUOTE = {
  quote: "We rewrote our hotel cap on a Tuesday. By Wednesday every booking already knew.",
  person: "Theo Lindqvist",
  role: "Head of Finance Ops, Larkspur Health",
  avatar: avatar(7654586),
}
