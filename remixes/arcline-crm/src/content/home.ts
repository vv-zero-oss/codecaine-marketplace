/**
 * The home page, in the order a visitor reads it.
 *
 * The storyline: Arcline is a CRM whose agents do the busywork of selling.
 * The hero says so and shows it working; the logo wall says others trust it;
 * the platform chapters walk a deal from first touch to renewal; the record
 * that writes itself shows the result; Deal Memory explains why it's
 * accurate; integrations and the API answer "does it fit my stack"; a
 * customer and the numbers answer "does it work"; the changelog shows it is
 * alive; the CTA asks for the sale.
 */

export const HERO = {
  pill: "Forecast Agent — now in public beta",
  title: ["The CRM that works", "the pipeline for you."],
  body: "Arcline logs every touch, qualifies every lead and drafts every next step — so your team spends the day selling.",
  primary: "Start for free",
  secondary: "Talk to sales",
}

/** The script the hero's app window plays, scene by scene. */
export const HERO_APP = {
  workspace: "Northwind",
  greeting: "Good morning, Priya",
  prompt: "Which deals slipped this week, and what should I do about each?",
  thinking: "Reading 214 emails and 31 calls",
  answer: [
    { name: "Fieldwork", value: "$48,000", reason: "Champion went quiet after pricing. A follow-up with the ROI model is drafted." },
    { name: "Kestrel Health", value: "$96,000", reason: "Legal asked for the DPA on Tuesday. It's attached to a reply, ready to send." },
    { name: "Parcelwise", value: "$18,750", reason: "Moved the close date twice. Suggest a mutual plan — draft below." },
  ],
  suggestions: ["Prep for 2pm with Orbital", "Recap yesterday's calls"],
}

export const LOGOS = ["stripe", "vercel", "shopify", "supabase", "airbnb", "spotify", "webflow", "slack", "linear", "figma"] as const

export const PLATFORM = {
  eyebrow: "Platform",
  lead: "One system for the whole sale.",
  rest: "From first touch to renewal, with agents doing the busywork in between.",
  chapters: [
    {
      id: "capture",
      label: "Capture every touch",
      lead: "Every touch, logged.",
      rest: "Emails, meetings and calls land on the right record, with notes your reps would have written if they had the time.",
      subs: [
        { title: "Free your reps to sell.", body: "Agents do the research and the data entry, so reps spend their hours on deals." },
        { title: "Enriched on arrival.", body: "Every new contact is researched, scored and routed before anyone opens it." },
      ],
    },
    {
      id: "qualify",
      label: "Qualify leads",
      lead: "Know which deals are real.",
      rest: "Intent scores built from what buyers actually do — replies, attendees, pricing-page visits — with the evidence one click away.",
      subs: [
        { title: "Ask for a list, get a plan.", body: "Describe the accounts you want. Arcline builds the list and tells you why each one made it." },
        { title: "Suggestions, not surprises.", body: "Arcline proposes the change and shows its source. A rep accepts it, or picks another." },
      ],
    },
    {
      id: "engage",
      label: "Run sales motions",
      lead: "Follow-through, on autopilot.",
      rest: "Turn the steps your best rep never skips into workflows that run for everyone — reviewed, versioned and easy to undo.",
      subs: [
        { title: "Agents that report back.", body: "Every run shows what it did, what failed and what it retried." },
        { title: "Sequences that adapt.", body: "A reply, a meeting or a champion leaving changes the next step on its own." },
      ],
    },
    {
      id: "forecast",
      label: "Forecast revenue",
      lead: "Commit numbers you can defend.",
      rest: "A pipeline that updates itself as buyers reply, and an analyst that shows its working.",
      subs: [
        { title: "An analyst that shows its working.", body: "Every answer lists the records it read and the query it ran." },
        { title: "See the quarter move.", body: "Pipeline by region and stage, redrawn the moment a deal changes." },
      ],
    },
    {
      id: "retain",
      label: "Retain and expand",
      lead: "Catch churn before it's a number.",
      rest: "Usage, sentiment and billing signals meet on the account, so success teams act weeks earlier.",
      subs: [
        { title: "Signals, as they happen.", body: "Seat growth, funding and new executives, streamed onto the account." },
        { title: "Every change, caught.", body: "When a champion changes jobs, the record updates and the owner hears first." },
      ],
    },
  ],
} as const

export const RECORD = {
  eyebrow: "Records",
  lead: "A record that writes itself.",
  rest: "Open any account and the history, the people and the next step are already there.",
  cta: "See how records work",
  person: {
    name: "Maya Okonkwo",
    role: "VP Revenue, Fieldwork",
    initials: "MO",
    email: "maya@fieldwork.co",
    location: "Lisbon, Portugal",
    company: "Fieldwork",
    stage: "Proposal",
    owner: "Priya Shah",
  },
  highlights: [
    { label: "AI summary", value: "Evaluating two vendors. Budget approved; wants SSO before signing." },
    { label: "Deal value", value: "$48,000 ARR" },
    { label: "Upcoming", value: "Demo call · Thu 14:00" },
    { label: "Intent", value: "92 — high" },
    { label: "Last touch", value: "Replied 2h ago" },
    { label: "Sequence", value: "Step 3 of 6" },
  ],
  activity: [
    { who: "Arcline", what: "logged a call with Maya Okonkwo", when: "2h" },
    { who: "Priya Shah", what: "moved the deal to Proposal", when: "1d" },
    { who: "Arcline", what: "enriched Fieldwork — 42 → 58 employees", when: "3d" },
    { who: "Maya Okonkwo", what: "viewed the pricing page 4 times", when: "4d" },
  ],
}

export const MEMORY = {
  caption: "The only CRM with",
  title: "Deal Memory",
  cells: [
    { icon: "dataset-linked", title: "It logs itself.", body: "Emails, calls, product and billing, captured as they happen." },
    { icon: "linked-services", title: "Your tools, finally talking.", body: "Inbox, calendar, Slack and your warehouse, always in sync." },
    { icon: "account-tree", title: "It learns your playbook.", body: "Each win makes the next suggestion sharper." },
    { icon: "search-insights", title: "Ask, and it's there.", body: "Any record, any answer, in a second." },
    { icon: "verified-user", title: "Nothing is guessed.", body: "Every field links to where it came from." },
  ],
  signals: {
    eyebrow: "Signals",
    lead: "Every signal, none of the noise.",
    rest: "Ready to act on.",
    cta: "See signals",
    items: [
      { title: "Intent", body: "Replies, attendees and pricing visits roll into one score per deal, updated as buyers move.", icon: "search-insights" },
      { title: "Risk", body: "Silence after pricing, a champion leaving, a close date slipping twice — flagged before the forecast call.", icon: "shield-lock" },
      { title: "Expansion", body: "Seat growth and new teams in the product surface upsell moments to the account owner.", icon: "rocket-launch" },
    ],
  },
} as const

export const INTEGRATIONS = {
  eyebrow: "Integrations",
  title: "Fits the stack you already pay for.",
  body: "Two-way sync with 120+ tools, and a webhook for everything else.",
  cta: "Browse integrations",
  tiles: ["gmail", "slack", "stripe", "linear", "figma", "loom", "discord", "vercel", "shopify", "supabase", "webflow", "spotify", "airbnb"],
}

export const DEVELOPERS = {
  eyebrow: "Developers",
  lead: "Built to be built on.",
  rest: "A typed REST API, webhooks for every change and SDKs for the languages your team writes.",
  cta: "Read the docs",
  snippet: `import { Arcline } from "@arcline/sdk"

const arcline = new Arcline(process.env.ARCLINE_KEY)

const deals = await arcline.deals.list({
  stage: "proposal",
  intent: { gte: 80 },
})`,
}

export const QUOTE = {
  text: "We stopped asking reps to update the CRM. Arcline does it better than we ever did, and our forecast has been within three percent two quarters running.",
  name: "Dana Whitfield",
  role: "CRO, Orbital Freight",
}

export const SCALE = {
  eyebrow: "Scale",
  lead: "From first hire to IPO.",
  rest: "The same Arcline at every stage.",
  stats: [
    { value: "4,000+", label: "revenue teams" },
    { value: "38M", label: "activities logged a month" },
    { value: "9 hrs", label: "back per rep, per week" },
    { value: "99.99%", label: "uptime, last 12 months" },
  ],
}

export const STORIES = {
  lead: "Teams that sell on Arcline.",
  rest: "Real numbers from real pipelines.",
  cta: "All customers",
  items: [
    {
      company: "Northbeam",
      overline: "Series B · Marketing analytics",
      lead: "$4.2M in stalled pipeline recovered.",
      rest: "Agents re-engaged 140 quiet deals in one quarter.",
      photo: "team",
    },
    {
      company: "Kestrel Health",
      overline: "Enterprise · Healthcare",
      lead: "Nine hours a week back for every AE.",
      rest: "Call notes, CRM updates and follow-ups now write themselves.",
      photo: "call",
    },
    {
      company: "Orbital Freight",
      overline: "Mid-market · Logistics",
      lead: "Forecast within 3% of actuals.",
      rest: "Two quarters running, with an analyst that shows its working.",
      photo: "board",
    },
    {
      company: "Parcelwise",
      overline: "Seed · Marketplaces",
      lead: "From spreadsheet to CRM in an afternoon.",
      rest: "The founding team imported 9,000 contacts before lunch.",
      photo: "laptop",
    },
  ],
} as const

export const NEWSLETTER = {
  lead: "Stay ahead of the pipeline.",
  rest: "Product updates and playbooks, monthly.",
  placeholder: "you@company.com",
  action: "Subscribe",
  done: "You're on the list",
}

export const FINAL_CTA = {
  title: ["Your pipeline,", "working for you."],
  primary: "Start for free",
  secondary: "Talk to sales",
}
