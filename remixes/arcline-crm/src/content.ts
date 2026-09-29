/**
 * Every word on the page, in the order a visitor reads it.
 *
 * The storyline: Arcline is a CRM for revenue teams that writes its own
 * records. The hero says what it is and lets you ask it something; the intro
 * names the worry (AI that makes things up) and answers it; the intelligence
 * section shows how a signal becomes a deal; the features, workspace and
 * proof sections answer "what does it do", "what is it like" and "does it
 * work"; pricing and the FAQ answer "what does it cost" and "what about…";
 * the CTA asks for the sale.
 */

export const NAV = {
  menus: [
    {
      label: "Product",
      intro: {
        title: "Arcline Agents",
        body: "AI teammates that log, qualify and follow up on every deal — reviewed by your reps, never guessed.",
      },
      groups: [
        { title: "Platform", links: ["Capture", "Qualify", "Forecast", "Close"] },
        {
          title: "Capabilities",
          links: ["Agents", "Pipeline", "Shared inbox", "Forecasting", "Workflows", "Enrichment", "Mobile", "Integrations"],
        },
      ],
    },
    {
      label: "Teams",
      groups: [
        { title: "Role", links: ["Sales", "Revenue operations", "Founders", "Customer success"] },
        { title: "Industry", links: ["SaaS", "Financial services", "Agencies", "Marketplaces"] },
        { title: "Size", links: ["Startups", "Mid-market", "Enterprise"] },
      ],
    },
    {
      label: "Resources",
      groups: [
        { title: "Learn", links: ["Playbooks", "Templates", "Blog", "Webinars", "Customer stories"] },
        { title: "Build", links: ["Documentation", "API reference", "Changelog", "Status"] },
        { title: "Company", links: ["About", "Careers", "Partners", "Press"] },
      ],
    },
  ],
  links: ["Customers", "Pricing"],
}

export const HERO = {
  title: ["Sell how you want.", "Close on a CRM that", "thinks ahead."],
  prompts: [
    "Draft follow-ups for every stalled deal over $20k and book next steps from my @Gmail threads",
    "Which renewals this quarter show churn signals in @Slack or on recent calls?",
    "Build a forecast for Q4 from last week's meetings and flag anything slipping",
    "Enrich every inbound lead from yesterday and route the top ten to Priya",
  ],
  action: "Ask Arcline",
  footnote: "Talk with our team and",
  footnoteLink: "book a demo",
}

/** The logo strip under the hero swaps between these two sets. */
export const LOGO_SETS = [
  ["stripe", "vercel", "shopify", "supabase", "airbnb", "spotify"],
  ["webflow", "slack", "linear", "figma", "discord", "loom"],
] as const

export const INTRO = {
  badge: "Agents for revenue teams",
  title: ["AI made selling faster.", "Arcline makes it "],
  accent: "accurate.",
  body: "Capture every conversation, qualify every lead and forecast every quarter on a CRM that keeps its own records straight.",
  points: [
    { icon: "inbox", text: "Works inside the inbox, calendar and call tools your reps already live in." },
    { icon: "shield", text: "Every AI-written field is sourced, reviewed and one click from undone." },
    { icon: "chart", text: "Forecasts built from real activity — not from end-of-quarter optimism." },
  ],
} as const

export const INTELLIGENCE = {
  log: ["> SYNCING INBOX", "> SCORING 1,284 LEADS", "> WRITING BACK TO RECORDS", "> RESPONSE READY"],
  left: "Signals",
  right: "Deals & next steps",
  figure: "FIG.2 _QUALIFY",
  status: "STATUS: SCORING",
  eyebrow: "Qualify",
  title: "The intelligence layer for every deal you run",
  body: "Arcline reads every email, call and meeting, scores intent as it happens and writes it back to the record — so the pipeline you review is the pipeline you actually have.",
  link: "See how scoring works",
  cards: [
    {
      eyebrow: "Capture",
      log: ["> LISTENING ON 3 CALLS", "> LOGGING ACTIVITY"],
      title: "Log every touch without typing",
      body: "Emails, meetings and calls land on the right contact and deal automatically, with notes your reps would have written if they had the time.",
      link: "Explore capture",
      tone: "sky",
      pattern: "capture",
    },
    {
      eyebrow: "Qualify",
      log: ["> READING THREADS", "> SCORING INTENT"],
      title: "Know which deals are real",
      body: "Intent scores built from what buyers actually do — replies, attendees, pricing-page visits — with the evidence one click away.",
      link: "See lead scoring",
      tone: "amber",
      pattern: "qualify",
    },
    {
      eyebrow: "Close",
      log: ["> DRAFTING NEXT STEP", "> BOOKING FOLLOW-UP"],
      title: "Close with the next step already drafted",
      body: "Arcline proposes the follow-up, the meeting slot and the mutual plan. Your rep reads it, edits a line and sends.",
      link: "Watch a deal close",
      tone: "teal",
      pattern: "close",
    },
  ],
} as const

export const SHOWCASE = {
  title: ["Sell anything,", "anywhere."],
  film: {
    kicker: "Introducing",
    name: "Arcline Agents",
  },
  pitch: "Meet the agents that work your pipeline overnight.",
  primary: { lead: "Get early access.", link: "Join the waitlist" },
  secondary: { lead: "See it for yourself.", link: "Watch the film" },
  bar: "Get a walkthrough from our team, tailored to your pipeline.",
  barAction: "Book a demo",
}

export const FEATURES = {
  title: "Build and run a modern revenue engine",
  items: [
    {
      icon: "keyboard",
      title: "Death to data entry",
      body: "Reps spend a third of their week updating the CRM. Arcline does it for them — contacts, fields, stages and notes — and shows its work so nobody has to trust it blindly.",
    },
    {
      icon: "network",
      title: "Connect every channel",
      body: "Email, calendar, calls, Slack, product usage and billing. Arcline pulls each signal onto the account it belongs to, so one record tells the whole story.",
    },
    {
      icon: "trending",
      title: "Forecasts you can defend",
      body: "Commit numbers built from activity, not gut feel. See which deals moved, why they moved and what it does to the quarter — before the board asks.",
    },
    {
      icon: "layers",
      title: "Fits your sales stack",
      body: "Two-way sync with the tools you already pay for, an open API and webhooks for the rest. Migrate in an afternoon, not a quarter.",
    },
    {
      icon: "lock",
      title: "Private by default",
      body: "SOC 2 Type II, GDPR and field-level permissions. Your customer data is never used to train shared models — in our cloud or yours.",
    },
    {
      icon: "sparkles",
      title: "An assistant that knows your book",
      body: "Ask in plain language — “who went quiet after the pricing call?” — and get an answer grounded in your own records, with links to every source.",
    },
  ],
} as const

export const WORKSPACE = {
  title: ["Every part of the sale,", "in one place"],
  body: "Skip the tab-switching between inbox, spreadsheet and CRM. Arcline puts the conversation, the pipeline and the follow-through on one surface, so deals keep moving.",
  tabs: [
    {
      id: "chat",
      eyebrow: "Chat",
      title: "Ask your pipeline anything",
      body: "Describe what you need — a list, a summary, a follow-up — and Arcline answers from your own records, with every source linked.",
    },
    {
      id: "pipeline",
      eyebrow: "Pipeline",
      title: "Drag, drop and reshape every stage",
      body: "A board that updates itself as buyers reply. Move a deal and Arcline rewrites the next step, the close date and the forecast with it.",
    },
    {
      id: "automations",
      eyebrow: "Automations",
      title: "Automate the follow-through",
      body: "Turn the steps your best rep never skips into workflows that run for everyone — reviewed, versioned and easy to undo.",
    },
  ],
} as const

export type WorkspaceTab = (typeof WORKSPACE.tabs)[number]["id"]

export const PROOF = {
  title: ["Built for—and proven by", "—revenue teams of every size"],
  body: "Over 4,000 teams, from seed-stage startups to public companies, run their pipeline on Arcline.",
  badges: [
    { top: "AICPA", bottom: "SOC 2", label: "SOC 2 Type II" },
    { top: "EU", bottom: "GDPR", label: "GDPR ready" },
  ],
  rows: [
    ["stripe", "vercel", "shopify", "supabase", "airbnb", "spotify", "webflow"],
    ["slack", "linear", "figma", "discord", "loom", "stripe", "vercel"],
  ],
  stories: [
    { stat: "$4.2M in stalled pipeline recovered in one quarter", company: "Northbeam", tone: "wine" },
    { stat: "31% higher win rate on qualified deals", company: "Fieldwork", tone: "olive" },
    { stat: "9 hours a week back for every account executive", company: "Kestrel Health", tone: "navy" },
    { stat: "Forecast within 3% of actuals, two quarters running", company: "Orbital Freight", tone: "pine" },
    { stat: "New reps ramped in 6 weeks instead of 14", company: "Lumen & Co", tone: "wine" },
    { stat: "18,000 follow-ups drafted and sent each month", company: "Parcelwise", tone: "navy" },
  ],
  storyLink: "Read story",
} as const

export const PRICING = {
  title: "Pricing that grows with your pipeline",
  body: "Every plan includes unlimited contacts and deals. Pay for the seats that sell.",
  plans: [
    {
      name: "Starter",
      blurb: "For founders running their first sales motion.",
      monthly: 0,
      yearly: 0,
      unit: "free for up to 3 seats",
      cta: "Start for free",
      features: ["Email and calendar capture", "Pipeline board and lists", "100 AI actions a month", "Community support"],
    },
    {
      name: "Growth",
      blurb: "For teams that live in their pipeline.",
      monthly: 59,
      yearly: 49,
      unit: "per seat / month",
      cta: "Start a 14-day trial",
      featured: true,
      features: [
        "Everything in Starter",
        "Arcline Agents for follow-up and scoring",
        "Call recording and summaries",
        "Forecasting and workflows",
        "Unlimited AI actions",
      ],
    },
    {
      name: "Enterprise",
      blurb: "For revenue orgs with their own rules.",
      monthly: null,
      yearly: null,
      unit: "annual contract",
      cta: "Talk to sales",
      features: ["Everything in Growth", "SSO, SCIM and audit logs", "Field-level permissions", "Bring your own model or cloud", "A named success team"],
    },
  ],
} as const

export const FAQ = {
  title: "Questions, answered",
  items: [
    {
      q: "Does Arcline replace our current CRM?",
      a: "It can, and most teams switch fully within a month. If you are not ready, Arcline runs beside your current CRM with a two-way sync and writes its updates back there.",
    },
    {
      q: "How does the AI avoid making things up?",
      a: "Every field Arcline writes links to the email, call or meeting it came from. Anything it is unsure of is proposed, not written, until a rep accepts it — and every change can be undone.",
    },
    {
      q: "Is our customer data used to train models?",
      a: "No. Your data is only used to answer your team's questions and is never used to train shared models. Enterprise plans can bring their own model or keep everything in their own cloud.",
    },
    {
      q: "How long does it take to set up?",
      a: "Connect your inbox and calendar and Arcline builds your first pipeline in about ten minutes. Importing from another CRM usually takes an afternoon.",
    },
    {
      q: "Can we try it before we buy?",
      a: "Yes. Starter is free for up to three seats, and Growth comes with a 14-day trial — no card needed.",
    },
  ],
} as const

export const JOURNAL = {
  title: "Get the latest from Arcline",
  lead: {
    title: "Your CRM should write itself. Now it can.",
    by: "By Noor Hadley",
  },
  note: "Playbooks, teardowns and research from the people building Arcline — what agents change about selling, and what they don't.",
  highlight: "What your team can do with Arcline",
  second: {
    title: "Is your pipeline ready for AI agents?",
    by: "By Tomas Ferreira",
  },
}

export const CTA = {
  title: "It's your turn to close",
  primary: "Start for free",
  secondary: "Book a demo",
  logos: ["gmail", "slack", "stripe", "linear", "figma", "loom"],
}

export const FOOTER = {
  columns: [
    { title: "Platform", links: ["Capture", "Qualify", "Forecast", "Close"] },
    {
      title: "Capabilities",
      links: ["Agents", "Pipeline", "Shared inbox", "Forecasting", "Workflows", "Enrichment", "Mobile", "Integrations"],
    },
    { title: "Teams", links: ["Sales", "Revenue operations", "Founders", "Customer success", "Startups", "Enterprise"] },
    {
      title: "Resources",
      links: ["Customers", "Playbooks", "Templates", "Blog", "Webinars", "Documentation", "API reference", "Changelog"],
    },
    { title: "Company", links: ["About", "Careers", "Partners", "Press"] },
  ],
  legal: ["Terms of use", "Privacy policy", "Security", "Trust center", "Status", "Site map"],
  copyright: "© Arcline 2026",
}
