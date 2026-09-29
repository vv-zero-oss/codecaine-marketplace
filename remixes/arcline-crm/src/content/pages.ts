/**
 * The inner pages: Pricing, Customers, Agents and Changelog.
 */

export const PRICING = {
  title: "Priced for every stage.",
  body: ["Start free, add seats as you hire.", "No credit card, no annual lock-in on Plus."],
  plans: [
    {
      name: "Free",
      monthly: 0,
      annual: 0,
      note: "Per seat / month, free forever",
      tagline: "For founders running their first sales motion.",
      features: ["Email and calendar capture", "Pipeline board and lists", "Up to 3 seats"],
      cta: "Start for free",
    },
    {
      name: "Plus",
      monthly: 36,
      annual: 29,
      note: "Per seat / month",
      tagline: "For small teams selling together.",
      features: ["Automatic enrichment", "Email sequences", "Up to 15 seats"],
      cta: "Continue with Plus",
    },
    {
      name: "Pro",
      monthly: 86,
      annual: 69,
      note: "Per seat / month",
      tagline: "For teams that run on their pipeline.",
      features: ["Arcline Agents", "Call recording & summaries", "Forecasting and workflows"],
      cta: "Continue with Pro",
      featured: true,
    },
    {
      name: "Enterprise",
      monthly: null,
      annual: null,
      note: "Billed annually",
      tagline: "For revenue orgs with their own rules.",
      features: ["SSO, SCIM and audit logs", "Bring your own model", "A named success team"],
      cta: "Talk to sales",
    },
  ],
  compare: [
    {
      group: "Records",
      rows: [
        { label: "Contacts and companies", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
        { label: "Custom objects", values: ["3", "12", "Unlimited", "Unlimited"] },
        { label: "Automatic enrichment", values: [false, true, true, true] },
      ],
    },
    {
      group: "Agents",
      rows: [
        { label: "AI actions a month", values: ["100", "2,000", "Unlimited", "Unlimited"] },
        { label: "Follow-up drafting", values: [true, true, true, true] },
        { label: "Forecast Agent", values: [false, false, true, true] },
        { label: "Bring your own model", values: [false, false, false, true] },
      ],
    },
    {
      group: "Security",
      rows: [
        { label: "SOC 2 Type II", values: [true, true, true, true] },
        { label: "SSO and SCIM", values: [false, false, true, true] },
        { label: "Audit log", values: [false, false, "90 days", "Unlimited"] },
      ],
    },
  ],
  faq: [
    { q: "Can I change plans later?", a: "Any time. Upgrades apply straight away; downgrades apply at the end of the billing period, and nothing is deleted." },
    { q: "What counts as a seat?", a: "Anyone who can sign in and edit records. Viewers who only read dashboards are free on every plan." },
    { q: "What is an AI action?", a: "One thing an agent does for you — a drafted email, an enriched contact, an answered question. Pro and Enterprise are unlimited." },
    { q: "Is my data used to train models?", a: "No. Your data answers your team's questions and is never used to train shared models." },
    { q: "Do you offer startup discounts?", a: "Yes — 50% off Pro for the first year for companies under two years old and $5M raised." },
  ],
} as const

export const CUSTOMERS = {
  pill: "Customers",
  title: "The teams that sell on Arcline.",
  body: "From seed-stage founders to public revenue orgs, here's what changed when the CRM started doing the work.",
  featured: [
    {
      company: "Northbeam",
      overline: "Marketing analytics · Series B",
      lead: "$4.2M in stalled pipeline, recovered.",
      rest: "How a 12-person sales team re-engaged 140 quiet deals in a single quarter.",
      photo: "team",
    },
    {
      company: "Kestrel Health",
      overline: "Healthcare · Enterprise",
      lead: "Nine hours a week back for every AE.",
      rest: "Call notes, CRM updates and follow-ups that write themselves — reviewed, never guessed.",
      photo: "call",
    },
    {
      company: "Orbital Freight",
      overline: "Logistics · Mid-market",
      lead: "A forecast within 3% of actuals.",
      rest: "Two quarters running, with an analyst the board trusts because it shows its working.",
      photo: "board",
    },
  ],
  grid: [
    { company: "Parcelwise", lead: "Spreadsheet to CRM in an afternoon.", rest: "9,000 contacts imported before lunch." },
    { company: "Lumen & Co", lead: "New reps ramped in six weeks.", rest: "Down from fourteen, with playbooks built in." },
    { company: "Fieldwork", lead: "31% higher win rate.", rest: "On deals Arcline scored above 80." },
    { company: "Tessellate", lead: "One record per customer, finally.", rest: "Billing, product and support in one place." },
  ],
  cta: { sans: "Join the revenue teams", serif: "selling on Arcline.", primary: "Start for free", secondary: "Talk to sales" },
} as const

export const AGENTS = {
  title: "Ask Arcline.",
  body: "Every question answered. Every follow-up drafted. Every task done — with the sources one click away.",
  question: "Why did Fieldwork go quiet after the pricing call?",
  answer: [
    { text: "Maya hasn't replied in nine days. On the call she asked about " },
    { text: "SSO on the Plus plan", cite: true },
    { text: ", and two days later her CFO viewed the pricing page four times. The pattern matches deals that stall on security review — " },
    { text: "Kestrel closed after we sent the SOC 2 report", cite: true },
    { text: ". I've drafted a reply with the report attached." },
  ],
  followUps: ["Send the draft to Maya", "Show similar deals", "Add a task for Thursday"],
  bar: { text: "Agents that do the work, not just the talking.", primary: "Start for free", secondary: "Talk to sales" },
  personas: {
    title: "Simply powerful, whoever's asking.",
    items: [
      {
        id: "sales",
        label: "Sales",
        lead: "Walk into every call ready.",
        rest: "A brief on the account, the last conversation and the objection to expect.",
        question: "Want me to book the follow-up with Maya?",
        options: [
          { short: "Thursday 14:00, 30 minutes", body: "Book Thursday at 14:00 with Maya — she accepted this slot twice before." },
          { short: "Friday 10:00, with her CFO", body: "Book Friday at 10:00 and invite her CFO, who has been reading the pricing page." },
        ],
      },
      {
        id: "revops",
        label: "RevOps",
        lead: "Clean data without the clean-up.",
        rest: "Duplicates merged, stages enforced and fields filled — with every change reversible.",
        question: "Merge these duplicate accounts?",
        options: [
          { short: "Merge into Fieldwork (primary)", body: "Merge 'Fieldwork Ltd' and 'fieldwork.co' into Fieldwork — 3 contacts, 2 deals move." },
          { short: "Keep separate, tag as subsidiary", body: "Keep both and link them as parent and subsidiary." },
        ],
      },
      {
        id: "founders",
        label: "Founders",
        lead: "Know the number without the meeting.",
        rest: "Pipeline, forecast and risk in plain language, whenever you ask.",
        question: "Share this week's forecast with the board?",
        options: [
          { short: "Send the summary to #board", body: "Post the forecast summary — $1.24M commit, 3 risks — to #board in Slack." },
          { short: "Draft an email instead", body: "Draft an email to the board with the chart and the three at-risk deals." },
        ],
      },
      {
        id: "success",
        label: "Success",
        lead: "Renewals without the surprise.",
        rest: "Usage drops, unhappy tickets and champion changes, surfaced weeks ahead.",
        question: "Kestrel usage fell 22% this month. Reach out?",
        options: [
          { short: "Offer a training session", body: "Email the new admin at Kestrel with a 30-minute training offer." },
          { short: "Flag to the account owner", body: "Create a task for Priya to call the champion this week." },
        ],
      },
    ],
  },
  tasks: {
    lead: "Agents that report back.",
    rest: "See what ran, what failed and what it retried — every step logged on the record.",
  },
  library: {
    title: "Start from a prompt that works.",
    body: "Copy one, run it, make it yours.",
    items: [
      { icon: "search-insights", tone: "accent", title: "Pre-call brief", body: "Everything about this account before my 2pm." },
      { icon: "trending-up", tone: "green", title: "Pipeline review", body: "What moved this week, and why." },
      { icon: "shield-lock", tone: "red", title: "Deal risks", body: "Deals likely to slip, ranked by value." },
      { icon: "send-time-extension", tone: "orange", title: "Follow-up drafts", body: "Draft replies for every thread waiting on me." },
      { icon: "groups", tone: "purple", title: "Buying committee", body: "Who else is involved at this account?" },
      { icon: "analytics", tone: "cyan", title: "Win/loss", body: "Why did we lose deals last quarter?" },
    ],
  },
} as const

export type ChangelogTag = "feature" | "improvement" | "design"

export const CHANGELOG = {
  eyebrow: "Changelog",
  lead: "What we shipped.",
  rest: "New every week.",
  cta: "View all",
  title: "Changelog",
  body: "New features, improvements and fixes, every week.",
  entries: [
    {
      date: "Sep 24, 2026",
      tag: "feature" as ChangelogTag,
      title: "Forecast Agent, in public beta",
      body: "Ask for the quarter in plain language. The agent builds a commit from activity, lists the deals behind it and shows the query it ran.",
      icon: "trending-up",
      points: ["Commit, best case and pipeline, per rep and region", "Weekly change summaries posted to Slack", "Every number links to its records"],
    },
    {
      date: "Sep 17, 2026",
      tag: "improvement" as ChangelogTag,
      title: "Call summaries in 14 languages",
      body: "Recorded calls are summarised in the language they were held in, with a translation one click away.",
      icon: "public",
      points: ["Speaker labels on every line", "Action items become tasks automatically"],
    },
    {
      date: "Sep 10, 2026",
      tag: "design" as ChangelogTag,
      title: "A calmer record page",
      body: "Highlights now sit above the fold, and the activity timeline groups by day.",
      icon: "layers",
      points: ["Highlights you can pin and reorder", "Keyboard navigation between records"],
    },
    {
      date: "Sep 3, 2026",
      tag: "feature" as ChangelogTag,
      title: "Workflow versions and rollbacks",
      body: "Every change to a workflow is saved as a version. Compare two, or roll back in a click.",
      icon: "account-tree",
      points: ["Side-by-side diff of steps", "Runs record which version they used"],
    },
    {
      date: "Aug 27, 2026",
      tag: "improvement" as ChangelogTag,
      title: "Enrichment for 40M more companies",
      body: "Company data now covers private companies in 38 more countries, refreshed monthly.",
      icon: "dataset-linked",
      points: ["Headcount history and funding rounds", "Tech stack detection"],
    },
    {
      date: "Aug 20, 2026",
      tag: "feature" as ChangelogTag,
      title: "SCIM provisioning",
      body: "Create, update and remove seats from your identity provider — Okta, Entra ID and Google.",
      icon: "key",
      points: ["Group-to-team mapping", "Deprovisioning reassigns open deals"],
    },
  ],
}
