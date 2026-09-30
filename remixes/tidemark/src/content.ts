/**
 * Every word on the page, in one place. Sections read from here; the editor
 * can still override any of it per element.
 */

export const BRAND = { name: "Tidemark" }

/* ---------------------------------------------------------------- Logos */

export type LogoKey = "linear" | "vercel" | "notion" | "figma" | "supabase" | "raycast" | "loom" | "framer" | "webflow" | "dropbox"

/** Logos from SVGL. `mark` ones are a symbol only, so the name sits beside them. */
export const LOGOS: Record<LogoKey, { name: string; mark?: boolean; height: number }> = {
  linear: { name: "Linear", mark: true, height: 20 },
  vercel: { name: "Vercel", height: 19 },
  notion: { name: "Notion", mark: true, height: 21 },
  figma: { name: "Figma", mark: true, height: 21 },
  supabase: { name: "Supabase", height: 19 },
  raycast: { name: "Raycast", height: 21 },
  loom: { name: "Loom", mark: true, height: 21 },
  framer: { name: "Framer", mark: true, height: 19 },
  webflow: { name: "Webflow", height: 17 },
  dropbox: { name: "Dropbox", height: 19 },
}

export const LOGO_ROW: LogoKey[] = ["linear", "vercel", "notion", "figma", "supabase", "raycast", "loom", "webflow", "dropbox", "framer"]

/* ---------------------------------------------------------------- Nav */

export const NAV = {
  product: {
    label: "Product",
    items: [
      { title: "Business accounts", body: "Checking and savings, in dollars and 30 currencies", icon: "landmark" },
      { title: "Corporate cards", body: "Physical and virtual, with limits per person", icon: "card" },
      { title: "Treasury", body: "Earn up to 4.10% on cash you’re not using", icon: "trend" },
      { title: "Bill pay", body: "Invoices in, approvals out, paid on time", icon: "receipt" },
      { title: "Spend controls", body: "Rules that stop a bad charge before it lands", icon: "shield" },
      { title: "Integrations", body: "Syncs with your accounting stack every night", icon: "plug" },
    ],
  },
  company: {
    label: "Company",
    items: [
      { title: "About", body: "Why we started Tidemark" },
      { title: "Security", body: "How we keep your money safe" },
      { title: "Careers", body: "We’re hiring in four cities" },
    ],
  },
  links: ["Pricing", "Customers"],
  login: "Log in",
  cta: "Open an account",
}

/* ---------------------------------------------------------------- Hero */

export const HERO = {
  eyebrow: "Business banking for startups",
  titleStart: "Money that",
  titleAccent: "keeps",
  titleEnd: "pace",
  photo: 9363215,
  photoAlt: "A founder lit in pink and violet, arms folded, looking into the camera",
  body: "Accounts, cards, bill pay and a treasury that earns on idle cash — opened in ten minutes, run from one place, and priced like you’re still early.",
  placeholder: "Work email",
  cta: "Open an account",
  secondary: "Talk to us",
  trust: ["FDIC coverage up to $5M", "SOC 2 Type II", "No monthly fees"],
}

export const ACCOUNT = {
  label: "Total balance",
  balance: 2418902.14,
  change: "+ $184,220.40 this month",
  accounts: [
    { name: "Operating", number: "•• 4821", amount: 612340.22 },
    { name: "Treasury", number: "4.10% APY", amount: 1706561.92 },
    { name: "Payroll", number: "•• 0917", amount: 100000.0 },
  ],
  toast: { title: "Payment received", body: "Northwind Labs — invoice #1042", amount: "+ $48,200.00" },
  card: { holder: "Amara Lewis", last4: "4821", expiry: "09/29" },
}

/* ---------------------------------------------------------------- Numbers */

export const NUMBERS = [
  { value: "$4.2B", label: "held for 9,000+ companies" },
  { value: "4.10%", label: "yield on treasury cash" },
  { value: "$0", label: "monthly fees, minimums or wire fees" },
  { value: "10 min", label: "from application to account" },
]

/* ---------------------------------------------------------------- Features */

export const FEATURES = {
  eyebrow: "One account, everything around it",
  title: "Everything finance used to need five tools for",
  body: "Tidemark puts your money, your spending and your bills in one place — so the numbers agree with each other at the end of the month.",
  accounts: {
    title: "Accounts in 30 currencies",
    body: "Hold, receive and send in dollars, euros, pounds and 27 more — with local details in each.",
  },
  cards: {
    title: "Cards with limits that think",
    body: "Issue a card to anyone in seconds. Set a limit per person, per merchant, per month.",
  },
  treasury: {
    title: "Idle cash that earns",
    body: "Sweep what you don’t need this month into treasury. Withdraw any business day.",
  },
  bills: {
    title: "Bills approved in one tap",
    body: "Forward an invoice, we read it, the right person approves it, it’s paid on the due date.",
  },
  controls: {
    title: "Controls that stop bad charges",
    body: "Block categories, require receipts, freeze a card from your phone.",
  },
}

/* ---------------------------------------------------------------- Treasury */

export const TREASURY = {
  eyebrow: "Treasury",
  title: "Your runway, working",
  titleAccent: "overtime",
  body: "Money you won’t spend this quarter sits in government money market funds, earning a yield that moves with the market — and comes back to checking the same day you ask.",
  points: [
    "4.10% current yield, paid monthly",
    "Same-day withdrawals, any business day",
    "Held in US Treasury money market funds",
  ],
  calculator: {
    label: "If you keep",
    earnLabel: "Tidemark earns you",
    compareLabel: "A typical checking account",
    footnote: "Illustration at today’s 4.10% yield, compounded monthly. Yields vary and are not guaranteed.",
    min: 50000,
    max: 5000000,
    step: 50000,
    start: 1000000,
    rate: 0.041,
    checkingRate: 0.0001,
  },
}

/* ---------------------------------------------------------------- Steps */

export const STEPS = {
  eyebrow: "Getting started",
  title: "Open in ten minutes. Run it for years.",
  items: [
    { n: "01", title: "Apply online", body: "Tell us about your company and upload your formation documents. Most applications are approved the same day." },
    { n: "02", title: "Move your money", body: "Fund by wire or ACH, or connect your old bank and we’ll move balances and payees for you." },
    { n: "03", title: "Hand out cards", body: "Invite your team, set their limits, and let receipts, approvals and bookkeeping take care of themselves." },
  ],
}

/* ---------------------------------------------------------------- Security */

export const SECURITY = {
  eyebrow: "Security",
  title: "Held like it’s our own",
  body: "Your deposits sit with regulated partner banks, spread across them so every dollar up to $5M is covered.",
  items: [
    { icon: "shield", title: "FDIC coverage to $5M", body: "Deposits are swept across partner banks to multiply standard coverage." },
    { icon: "lock", title: "Encryption everywhere", body: "AES-256 at rest, TLS 1.3 in transit, keys in hardware modules." },
    { icon: "fingerprint", title: "Two-person approvals", body: "Require a second approver for any payment over a limit you set." },
    { icon: "eye", title: "Real-time monitoring", body: "Every transaction is screened for fraud before it settles." },
    { icon: "badge", title: "SOC 2 Type II", body: "Audited every year by an independent firm. Report on request." },
    { icon: "snow", title: "Freeze in one tap", body: "Lost a card? Freeze it from the app and issue a new one instantly." },
  ],
}

/* ---------------------------------------------------------------- Testimonials */

export const VOICES = {
  eyebrow: "Customers",
  featured: {
    quote: "We moved our operating account, our cards and our treasury over a weekend. Month-end close went from four days to one afternoon.",
    name: "Lena Albrecht",
    role: "CFO, Brightfold",
    photo: 13738020,
    stat: { value: "4 days → 4 hrs", label: "month-end close" },
  },
  items: [
    { quote: "The treasury yield alone covers our software bill. The rest of Tidemark is a bonus.", name: "Marcus Hale", role: "Co-founder, Oakline", photo: 33857898 },
    { quote: "I issued twelve cards with twelve different limits before my coffee got cold.", name: "Priya Raman", role: "Head of Ops, Kettle & Co", photo: 11054058 },
    { quote: "Bills used to live in my inbox. Now they live in Tidemark, and they get paid on time.", name: "Daniel Okoye", role: "Founder, Fathom", photo: 32349727 },
  ],
}

/* ---------------------------------------------------------------- Pricing */

export type Plan = {
  name: string
  monthly: number | null
  yearly: number | null
  label?: string
  blurb: string
  features: string[]
  cta: string
  featured?: boolean
}

export const PRICING = {
  eyebrow: "Pricing",
  title: "Priced like you’re still early",
  body: "Every plan includes accounts, cards and FDIC coverage. Upgrade when your finance team does.",
  monthly: "Monthly",
  yearly: "Yearly — 2 months free",
  plans: [
    { name: "Launch", monthly: 0, yearly: 0, label: "Free", blurb: "For companies finding their first customers.", features: ["Business checking and savings", "Unlimited virtual cards", "Free domestic ACH and wires", "Treasury at 3.60%"], cta: "Open an account" },
    { name: "Growth", monthly: 49, yearly: 41, blurb: "For teams with a budget to protect.", features: ["Everything in Launch", "Treasury at 4.10%", "Bill pay with approvals", "Spend controls and receipt rules", "Accounting sync"], cta: "Start Growth", featured: true },
    { name: "Scale", monthly: 199, yearly: 166, blurb: "For finance teams closing books monthly.", features: ["Everything in Growth", "Multi-entity accounts", "30 currencies with local details", "Custom approval chains", "A dedicated account manager"], cta: "Start Scale" },
  ] as Plan[],
}

/* ---------------------------------------------------------------- FAQ */

export const FAQ = {
  eyebrow: "Questions",
  title: "Before you move your money",
  items: [
    { q: "Is Tidemark a bank?", a: "Tidemark is a financial technology company, not a bank. Banking services are provided by our FDIC-member partner banks, and treasury is offered through a registered investment adviser." },
    { q: "How does coverage reach $5M?", a: "Deposits are swept across a network of partner banks in amounts that stay under each bank’s standard FDIC limit, so the coverage adds up." },
    { q: "Who can open an account?", a: "US-incorporated companies — C-corps and LLCs — with a US address. Most applications are approved the same business day." },
    { q: "Can I get my treasury cash back quickly?", a: "Yes. Withdrawals requested before 2pm Eastern on a business day land in your checking account the same day." },
    { q: "What does it cost to switch?", a: "Nothing. We’ll move your balances, payees and recurring payments for you, and there are no setup or closing fees." },
  ],
}

/* ---------------------------------------------------------------- CTA and footer */

export const CLOSING = {
  titleStart: "Your money,",
  titleAccent: "finally",
  titleEnd: "keeping up",
  body: "Open an account in ten minutes. Move your balance whenever you’re ready.",
  placeholder: "Work email",
  cta: "Open an account",
}

export const FOOTER = {
  columns: [
    { title: "Product", links: ["Business accounts", "Corporate cards", "Treasury", "Bill pay", "Spend controls"] },
    { title: "Company", links: ["About", "Customers", "Careers", "Press"] },
    { title: "Resources", links: ["Help centre", "Guides", "API docs", "Status", "Brand guidelines"] },
    { title: "Legal", links: ["Privacy", "Terms", "Disclosures", "Licenses"] },
  ],
  disclosure:
    "Tidemark is a financial technology company, not a bank. Banking services provided by FDIC-member partner banks. FDIC insurance covers the failure of an insured bank; coverage above $250,000 is achieved through a sweep network. Treasury is offered through a registered investment adviser; investments are not FDIC-insured, not bank-guaranteed and may lose value. Yields shown are illustrative and may change.",
  credit: "Photography from Pexels.",
}
