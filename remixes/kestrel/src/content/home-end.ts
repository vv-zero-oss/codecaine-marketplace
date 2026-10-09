/**
 * Copy for the end of the home page: scale, the savings calculator, the
 * receipts wall and the closing ask. Companies, people and quotes are
 * invented for the template.
 */

export const SCALE = {
  title: "Grow the team.",
  continuation: "Not the paperwork.",
  body: "Your headcount doubled. Your approval queue didn’t have to.",
  workflow: {
    title: "Approvals that route themselves.",
    body: "Set the rule once — by amount, department or vendor — and every bill finds the right people without a single forwarded email.",
  },
  global: {
    title: "One card programme, every currency.",
    body: "Issue cards in 40+ currencies and reimburse people in their own, with the conversion booked to the right entity automatically.",
  },
}

export type Pin = { city: string; tag: string; amount: number; currency: "JPY" | "GBP" | "CAD" | "USD" | "MXN"; lat: number; lon: number; flag: string }

/** Spend from around the world, in the currency it was spent in. */
export const PINS: Pin[] = [
  { city: "Tokyo", tag: "Hotel", amount: 52000, currency: "JPY", lat: 35.7, lon: 139.7, flag: "JP" },
  { city: "London", tag: "Travel", amount: 740, currency: "GBP", lat: 51.5, lon: -0.1, flag: "GB" },
  { city: "Toronto", tag: "Transit", amount: 96, currency: "CAD", lat: 43.7, lon: -79.4, flag: "CA" },
  { city: "New York", tag: "Software", amount: 2180, currency: "USD", lat: 40.7, lon: -74, flag: "US" },
  { city: "Mexico City", tag: "Supplies", amount: 6210, currency: "MXN", lat: 19.4, lon: -99.1, flag: "MX" },
]

/** Units of each currency per US dollar — fixed for the demo. */
export const RATES = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149, CAD: 1.37, MXN: 18.2 } as const
export type Currency = keyof typeof RATES
export const SYMBOLS: Record<Currency, string> = { USD: "$", EUR: "€", GBP: "£", JPY: "¥", CAD: "CA$", MXN: "MX$" }

export const SAVINGS = {
  title: "What the busywork costs you.",
  continuation: "Move the sliders.",
  note: "Estimates use median figures from Kestrel customers; yours will differ.",
  cta: "See it on your numbers",
}

export const RECEIPTS = {
  kicker: "40,000 teams and counting",
  title: "We’ve kept the receipts.",
}

export type Testimonial = { name: string; title: string; company: string; quote: string }

export const TESTIMONIALS: Testimonial[] = [
  { name: "Priya Raman", title: "Controller, Fieldhouse Goods", company: "Fieldhouse", quote: "We closed March in three days. February took eleven." },
  { name: "Tomás Echeverría", title: "VP Finance, Lumen Freight", company: "Lumen", quote: "Nobody on my team has typed a GL code since the spring. I asked, and they had to think about it." },
  { name: "Hannah Osei", title: "Head of People, Brightwell", company: "Brightwell", quote: "New hires get a card on day one with the right limits. No ticket, no waiting." },
  { name: "Marcus Lindqvist", title: "CFO, Northpaw", company: "Northpaw", quote: "It paid for itself in cashback before the first quarter was out." },
  { name: "Aiko Tanabe", title: "Senior Accountant, Orchard & Pine", company: "Orchard", quote: "The receipt is matched before I’ve put my phone away. It’s slightly unnerving, in a good way." },
  { name: "Dev Chaudhry", title: "Founder, Tessellate Labs", company: "Tessellate", quote: "I check runway on a Sunday in thirty seconds instead of opening four spreadsheets." },
  { name: "Lena Whitfield", title: "Procurement Lead, Hollis Health", company: "Hollis", quote: "Every request lands in one queue with the quote attached. Our renewals stopped surprising us." },
  { name: "Samuel Adeyemi", title: "Finance Manager, Cobalt Kitchens", company: "Cobalt", quote: "Twelve locations, twelve petty-cash tins, gone. Each manager has a card and a limit, and I sleep fine." },
  { name: "Clara Moretti", title: "Director of Operations, Vela Studio", company: "Vela", quote: "Our auditors asked where the paper trail was. It was already in the export." },
  { name: "Jonah Feld", title: "Controller, Ridgeline Outdoor", company: "Ridgeline", quote: "The policy agent caught a duplicate hotel booking before I’d finished my coffee." },
  { name: "Ines Carvalho", title: "Head of Finance, Parcel & Co", company: "Parcel", quote: "We moved three entities onto one ledger in a week. I had budgeted a quarter." },
  { name: "Wen Zhao", title: "AP Specialist, Kiln Robotics", company: "Kiln", quote: "Invoices come in, get read, get coded, get paid. My job is now the exceptions, which is the interesting part." },
  { name: "Rafael Okafor", title: "COO, Driftline Media", company: "Driftline", quote: "Setup took an afternoon." },
  { name: "Greta Holm", title: "Finance Lead, Saltmarsh Coffee", company: "Saltmarsh", quote: "Baristas snap a receipt and go back to the bar. Our books have never been this tidy." },
  { name: "Ben Avraham", title: "VP Controller, Quorum Analytics", company: "Quorum", quote: "Month-end used to mean late dinners. Now it means a checklist that mostly ticks itself." },
]

export const CLOSING = {
  title: "Time back.",
  continuation: "Money back.",
  note: "Free for teams of any size · Set up in a day",
}
