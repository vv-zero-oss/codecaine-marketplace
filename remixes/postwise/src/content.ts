/**
 * Every word on the page, in one place. Sections read from here; the editor
 * can still override any of it per element.
 */

export const BRAND = { name: "Postwise", copilot: "Scribe" }

/* ---------------------------------------------------------------- Logos */

export type LogoKey =
  | "linear"
  | "vercel"
  | "notion"
  | "stripe"
  | "figma"
  | "loom"
  | "raycast"
  | "supabase"
  | "framer"
  | "webflow"
  | "dropbox"

/** Logos from SVGL. `mark` ones are a symbol only, so the name sits beside them. */
export const LOGOS: Record<LogoKey, { name: string; mark?: boolean; height: number }> = {
  linear: { name: "Linear", mark: true, height: 20 },
  vercel: { name: "Vercel", height: 20 },
  notion: { name: "Notion", mark: true, height: 22 },
  stripe: { name: "Stripe", height: 24 },
  figma: { name: "Figma", mark: true, height: 22 },
  loom: { name: "Loom", mark: true, height: 22 },
  raycast: { name: "Raycast", height: 22 },
  supabase: { name: "Supabase", height: 20 },
  framer: { name: "Framer", mark: true, height: 20 },
  webflow: { name: "Webflow", height: 18 },
  dropbox: { name: "Dropbox", height: 20 },
}

export const LOGO_ROW: LogoKey[] = [
  "linear",
  "vercel",
  "notion",
  "stripe",
  "figma",
  "raycast",
  "supabase",
  "loom",
  "webflow",
  "dropbox",
  "framer",
]

/* ---------------------------------------------------------------- Nav */

export const NAV = {
  product: {
    label: "Product",
    features: [
      { title: "Smart Triage", body: "Your inbox, sorted before you sit down", dot: "bg-dot-red" },
      { title: "AI Drafting", body: "Replies written in your own voice", dot: "bg-dot-green" },
      { title: "Follow-ups", body: "Nudges that go out on their own", dot: "bg-dot-amber" },
      { title: "Deliverability", body: "Land in the inbox, not the spam folder", dot: "bg-dot-blue" },
    ],
    tools: [
      { title: "Shared Inboxes", body: "One queue for the whole team" },
      { title: "Thread Summaries", body: "Forty replies, read in four lines" },
      { title: "Meeting Scheduler", body: "Slots that suit everyone, offered for you" },
      { title: "Templates", body: "Your best emails, one keystroke away" },
      { title: "Read Receipts", body: "Know when it landed and who opened it" },
      { title: "Integrations", body: "Slack, CRM and calendar, wired in" },
    ],
  },
  why: {
    label: "Why us",
    links: [
      { title: "Security", body: "SOC 2 Type II, encrypted end to end" },
      { title: "Compare", body: "How Postwise stacks up" },
      { title: "Changelog", body: "What shipped this week" },
    ],
  },
  links: ["Customers", "Pricing"],
}

/* ---------------------------------------------------------------- Hero */

export const HERO = {
  badge: "NEW",
  badgeText: "Scribe now replies from Slack",
  titleStart: "Every reply, ready",
  titleAccent: "before",
  titleEnd: "you are: You + AI",
  body: "Postwise reads, sorts and drafts your email in your own voice — so your team spends its mornings on the work, not the inbox.",
  placeholder: "Enter your work email",
  cta: "Get free trial",
  rating: "4.9 from 2,400+ reviews",
  ratingNote: "Loved by 18,000 teams",
}

/* ---------------------------------------------------------------- Quotes */

export type Quote = {
  quote: string
  name: string
  role: string
  photo: number
  logo: LogoKey
}

export const QUOTES: Record<"first" | "second" | "third", Quote> = {
  first: {
    quote:
      "Postwise is like an assistant who has read every thread I’ve ever sent. My replies are drafted before I open the laptop.",
    name: "Maya Okafor",
    role: "Head of Partnerships",
    photo: 6497112,
    logo: "linear",
  },
  second: {
    quote:
      "I wake up to an inbox that’s already sorted, with the three replies that matter drafted and waiting. It gave me my mornings back.",
    name: "Daniel Reyes",
    role: "Chief Operating Officer",
    photo: 6942776,
    logo: "vercel",
  },
  third: {
    quote:
      "Our support team used five tools to answer one customer. Now it’s one inbox, and first replies go out in minutes — not hours.",
    name: "Hana Sato",
    role: "Head of Customer Support",
    photo: 27603433,
    logo: "notion",
  },
}

/* ---------------------------------------------------------------- Copilot */

export const COPILOT = {
  badge: "Scribe",
  badgeText: "AI Inbox Copilot",
  titleStart: "Transform the way you",
  titleAccent: "write",
  titleEnd: "with Scribe",
  body: "Save more than 8 hours a week with daily triage, context from every past thread, and replies drafted in the voice you already use.",
  cta: "Meet Scribe",
  floats: [
    { title: "Waiting on a reply", body: "Ana hasn’t answered your proposal in 4 days. Scribe drafted a gentle nudge.", dot: "bg-dot-red" },
    { title: "Contract, version 3", body: "Legal sent a new MSA. Scribe summarised the four clauses that changed.", dot: "bg-dot-green" },
    { title: "Meeting request", body: "Scribe found three slots that suit everyone and offered them for you.", dot: "bg-dot-blue" },
  ],
  signalsTitle: "Never miss a follow-up",
  signals: [
    [
      { text: "Priya replied to your pricing thread", dot: "bg-dot-green" },
      { text: "Invoice #2041 is three days overdue", dot: "bg-dot-red" },
      { text: "Tom asked for the deck again", dot: "bg-dot-amber" },
      { text: "Sam opened your proposal four times", dot: "bg-dot-violet" },
      { text: "New intro from Leah to Northwind", dot: "bg-dot-blue" },
      { text: "Board update is due on Friday", dot: "bg-dot-pink" },
    ],
    [
      { text: "Acme signed the order form", dot: "bg-dot-green" },
      { text: "Your 9:40 flight moved to gate B12", dot: "bg-dot-blue" },
      { text: "Jordan is still waiting on an answer", dot: "bg-dot-red" },
      { text: "Candidate accepted the offer", dot: "bg-dot-violet" },
      { text: "Twelve newsletters archived for you", dot: "bg-dot-amber" },
      { text: "Renewal notice needs a decision", dot: "bg-dot-pink" },
    ],
    [
      { text: "Lina asked to move Thursday’s call", dot: "bg-dot-amber" },
      { text: "A reply mentions your competitor", dot: "bg-dot-red" },
      { text: "Grace forwarded you a warm lead", dot: "bg-dot-green" },
      { text: "Support ticket escalated to you", dot: "bg-dot-pink" },
      { text: "Ben shared the signed contract", dot: "bg-dot-blue" },
      { text: "Quarterly review invite from Omar", dot: "bg-dot-violet" },
    ],
  ],
}

/* ---------------------------------------------------------------- Platform */

export type DeckCardKey = "triage" | "drafting" | "deliverability" | "followups"

export const PLATFORM = {
  titleStart: "All",
  titleRest: "-in-one inbox to level",
  titleEnd: "up your whole team",
  body: "Give everyone the power to write faster and answer smarter from day one.",
  hint: "click me!",
  cards: [
    {
      key: "triage" as DeckCardKey,
      label: "Smart Triage",
      dot: "bg-dot-red",
      title: "Sorted before you sit down",
      body: "Postwise reads every new email the moment it lands and files it: what needs you, what’s just for your information, and what can wait.",
    },
    {
      key: "drafting" as DeckCardKey,
      label: "AI Drafting",
      dot: "bg-dot-green",
      title: "Better replies, fewer words",
      body: "Tell Scribe what you want to say in a line. It writes the reply in your voice, with the context of every thread before it.",
    },
    {
      key: "deliverability" as DeckCardKey,
      label: "Deliverability",
      dot: "bg-dot-blue",
      title: "Land in every inbox, every time",
      body: "Don’t let a missing record send you to spam. Postwise checks your domain daily and fixes SPF, DKIM and DMARC in a click.",
    },
    {
      key: "followups" as DeckCardKey,
      label: "Follow-ups",
      dot: "bg-dot-amber",
      title: "Nothing slips through",
      body: "Every thread waiting on someone else is tracked. When it goes quiet, a polite nudge is drafted and ready to send.",
    },
  ],
}

/* ---------------------------------------------------------------- CTA band */

export const JOURNEY = {
  lines: ["Start your", "zero inbox", "journey"],
  placeholder: "Enter your work email",
  cta: "Get free trial",
}

/* ---------------------------------------------------------------- Personas */

export type PersonaKey = "founders" | "sales" | "support" | "recruiting" | "operations"

export const PERSONAS = {
  titleStart: "Built to",
  titleAccent: "power",
  titleEnd: "inbox heroes like you",
  items: [
    {
      key: "founders" as PersonaKey,
      label: "Founders",
      title: "Run the company, not the inbox",
      cta: "Explore Postwise for founders",
      points: [
        { title: "Answer investors in minutes", body: "Scribe pulls the numbers from last month’s update and drafts the reply, so you only check and send." },
        { title: "Save 9 hours every week", body: "Newsletters, receipts and cold pitches are filed away before you see them." },
      ],
    },
    {
      key: "sales" as PersonaKey,
      label: "Sales",
      title: "Every lead gets a reply today",
      cta: "Explore Postwise for sales",
      points: [
        { title: "Reply rates up by 41%", body: "Replies that reference the prospect’s last three emails, written in seconds." },
        { title: "No deal goes quiet", body: "Follow-ups are drafted the day a thread stalls, and sent on your say-so." },
      ],
    },
    {
      key: "support" as PersonaKey,
      label: "Support",
      title: "First replies in minutes",
      cta: "Explore Postwise for support",
      points: [
        { title: "One queue for the team", body: "Shared inboxes with assignment, notes and collision detection built in." },
        { title: "Answers from your docs", body: "Scribe cites your help centre in every draft, so replies stay accurate." },
      ],
    },
    {
      key: "recruiting" as PersonaKey,
      label: "Recruiting",
      title: "Candidates never wait on you",
      cta: "Explore Postwise for recruiting",
      points: [
        { title: "Scheduling on autopilot", body: "Interview slots offered and booked without a single back-and-forth." },
        { title: "Warm, personal outreach", body: "Every message reads like you wrote it, because it learned from you." },
      ],
    },
    {
      key: "operations" as PersonaKey,
      label: "Operations",
      title: "Vendors, invoices, handled",
      cta: "Explore Postwise for operations",
      points: [
        { title: "Invoices never slip", body: "Due dates are pulled out of every bill and chased before they’re late." },
        { title: "Approvals in one click", body: "Requests are summarised with the answer drafted — approve, tweak or decline." },
      ],
    },
  ],
}

/* ---------------------------------------------------------------- Results */

export type ResultTone = "butter" | "mint" | "iris" | "blossom"

export type Result =
  | { kind: "stat"; value: string; label: string; tone: ResultTone; logo: LogoKey }
  | { kind: "quote"; quote: string; name: string; role: string; photo: number; logo: LogoKey }

export const RESULTS = {
  titleStart: "Real",
  titleAccent: "results",
  titleRest: "from",
  titleEnd: "real customers",
  hint: "see the numbers!",
  items: [
    { kind: "stat", value: "82%", label: "less time in email", tone: "butter", logo: "stripe" },
    { kind: "stat", value: "3.4x", label: "faster first reply", tone: "mint", logo: "supabase" },
    {
      kind: "quote",
      quote: "Postwise brought our response time from a day to under an hour, and our customers noticed within a week.",
      name: "Tomás Varga",
      role: "VP of Customer Success",
      photo: 5308640,
      logo: "raycast",
    },
    {
      kind: "quote",
      quote: "Having every follow-up drafted and waiting means nothing falls between the cracks anymore — not even on Fridays.",
      name: "Priya Nair",
      role: "Account Executive",
      photo: 6497114,
      logo: "figma",
    },
    { kind: "stat", value: "9h", label: "saved per week", tone: "butter", logo: "loom" },
    { kind: "stat", value: "41%", label: "higher reply rate", tone: "blossom", logo: "webflow" },
    { kind: "stat", value: "12k", label: "threads triaged a day", tone: "iris", logo: "dropbox" },
    { kind: "stat", value: "0", label: "missed follow-ups", tone: "blossom", logo: "framer" },
    {
      kind: "quote",
      quote: "We rolled it out to forty people in an afternoon. The drafts sound like each of them, which is the part I didn’t expect.",
      name: "Jonah Lindqvist",
      role: "Head of Revenue Operations",
      photo: 7397453,
      logo: "stripe",
    },
  ] as Result[],
}

/* ---------------------------------------------------------------- Articles */

export const ARTICLES = {
  title: "Level-up your inbox game",
  cta: "View all articles",
  items: [
    { title: "Inbox zero vs. inbox triage: which one actually saves you time", tag: "Guide", photo: 5208348 },
    { title: "How a support team cut first-reply time from 9 hours to 40 minutes", tag: "Story", photo: 7394380 },
    { title: "The 12 best AI email assistants in 2026, tested by real teams", tag: "Roundup", photo: 9743018 },
    { title: "SPF, DKIM and DMARC in plain English (and why they matter)", tag: "Explainer", photo: 35051393 },
  ],
}

/* ---------------------------------------------------------------- Love wall */

export const LOVE = {
  titleStart: "Some love from",
  titleEnd: "our customers!",
  items: [
    { name: "Elena Marsh", role: "Founder", company: "Brightfold", photo: 16160809, text: "Postwise feels like having a chief of staff who never sleeps. Triage alone saved me an hour every morning, and the drafts are scarily close to how I write." },
    { name: "Kwame Asante", role: "Sales Lead", company: "Northwind", photo: 6102841, text: "I used to juggle four tabs to answer one lead. Now it’s one inbox, one draft, one click. My reply rate went up the first week." },
    { name: "Sofia Brandt", role: "Head of Ops", company: "Kettle & Co", photo: 11701102, text: "The follow-up tracking is the feature I didn’t know I needed. Invoices, vendors, approvals — nothing goes quiet on us anymore." },
    { name: "Arjun Mehta", role: "Recruiter", company: "Halden", photo: 35681211, text: "Scheduling interviews used to take six emails. Scribe offers the slots and books them. Candidates tell us how quick we are." },
    { name: "Clara Jensen", role: "Support Manager", company: "Pinecrest", photo: 38707525, text: "Shared inboxes with drafts that cite our own docs. My team answers faster and more accurately, and nobody steps on each other’s replies." },
    { name: "Marcus Lee", role: "CEO", company: "Oakline", photo: 20782648, text: "It’s the only AI tool our whole company opens every day. The summaries of long threads alone are worth the price." },
    { name: "Nadia Petrova", role: "Partnerships", company: "Lumen", photo: 5649997, text: "It picked up my tone in two days. People reply to the drafts saying thanks for the thoughtful note — I barely touched it." },
    { name: "Owen Carter", role: "Account Executive", company: "Fathom", photo: 11156392, text: "Before Postwise: find the thread, reread it, write, rewrite, send. After: read the draft, send. That’s the whole review." },
    { name: "Imani Brooks", role: "Chief of Staff", company: "Verra", photo: 6923415, text: "Our exec team finally agrees on one tool. Everyone gets a sorted inbox, and I get fewer ‘did you see my email?’ messages." },
  ],
}

/* ---------------------------------------------------------------- Final CTA */

export const UNLOCK = {
  lineOne: "Unlock your AI",
  lineTwoStart: "inbox",
  lineTwoAccent: "superpowers",
  placeholder: "Enter your work email",
  cta: "Get free trial",
}

/* ---------------------------------------------------------------- Footer */

export const FOOTER = {
  columns: [
    { title: "Product", links: ["Smart Triage", "AI Drafting", "Follow-ups", "Deliverability"], expandable: true },
    { title: "Why us", links: ["Pricing", "Customers", "Security", "Compare", "Partner program", "About us", "Manifesto"] },
    { title: "Resources", links: ["Blog", "Academy", "Templates", "Wall of love", "Brand guidelines"] },
    { title: "Contact", links: ["Help centre", "Careers", "X / Twitter", "YouTube"] },
  ],
  ask: "Ask an AI about Postwise",
  legal: ["Privacy", "Terms", "GDPR", "CCPA", "Trust and security", "Do not sell my info"],
  credit: "Photography from Pexels.",
}
