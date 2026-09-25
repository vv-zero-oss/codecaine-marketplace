/**
 * Every word on the page, and every picture. The sections read from here, so
 * the product can be renamed, re-pitched or re-photographed in one file.
 *
 * The storyline: Adwright is a team of AI agents that runs paid social and
 * search for direct-to-consumer brands. The page goes — what it is (hero),
 * who already trusts it (proof), what it does (features), how you start
 * (steps), what a night of it looks like (overnight), where you talk to it
 * (Slack), why it beats the alternatives (comparison), what customers say
 * (testimonials), what it plugs into (platforms), what people still ask
 * (FAQ), and where to go next (footer).
 */

import { photos } from "@/photos"

export const brand = {
  name: "Adwright",
  domain: "adwright.ai",
}

export const nav = {
  product: [
    { title: "Campaign agent", description: "Plans, launches and tunes paid campaigns on its own.", href: "#features" },
    { title: "Creative studio", description: "Briefs, variants and a library that tags itself.", href: "#features" },
    { title: "Research desk", description: "Trends and competitor moves, summarised every morning.", href: "#features" },
    { title: "Adwright for Slack", description: "Ask, approve and adjust from your team's channel.", href: "#slack" },
  ],
  links: [
    { label: "Customers", href: "#customers" },
    { label: "Compare", href: "#compare" },
    { label: "FAQ", href: "#faq" },
  ],
  login: "Log in",
  demo: "Book a demo",
  signup: "Start free",
}

export const hero = {
  eyebrow: "AI growth team for DTC brands",
  titleLight: "Your",
  titleBold: "always-on growth team",
  body: "Adwright's agents plan, launch and tune your paid campaigns around the clock — built for lean teams, trusted by fast-growing brands.",
  primary: "Start free",
  secondary: "Talk to sales",
  facts: [
    { icon: "timer", label: "Live in 10 minutes" },
    { icon: "number", strong: "3,400+", label: "brands on board" },
    { icon: "calendar", label: "Cancel any month" },
  ],
}

export const dashboard = {
  workspace: "Juniper & Co.",
  nav: ["Home", "Insights", "Plans", "Library"],
  channelsLabel: "Channels",
  channels: [
    { name: "Meta", logo: "meta" },
    { name: "Google", logo: "google" },
    { name: "TikTok", logo: "tiktok" },
    { name: "Snapchat", logo: "snapchat" },
  ],
  threadsLabel: "Recent",
  threads: ["Scale the spring bundle", "Why did CPA jump Tuesday?", "Refresh hook variants", "Q3 budget split"],
  overview: "This week",
  kpis: [
    { label: "Spend", value: "$18.4k", delta: "+6%", up: true },
    { label: "Revenue", value: "$71.2k", delta: "+19%", up: true },
    { label: "ROAS", value: "3.87", delta: "+0.4", up: true },
    { label: "CPA", value: "$21.40", delta: "−8%", up: true },
  ],
  prompt: "What should we work on today?",
  promptHint: "Ask about any campaign, creative or budget…",
  agent: "Growth agent",
  tasksLabel: "Running now",
  tasks: [
    { title: "Rebalance budget toward TikTok", tags: ["meta", "tiktok"] },
    { title: "Pause three fatigued hooks", tags: ["meta"] },
    { title: "Draft May promo brief", tags: ["google", "meta", "snapchat"] },
  ],
  queueLabel: "Up next",
  queue: [
    { title: "Weekly creative review", note: "12 variants to score" },
    { title: "Search terms audit", note: "Negative list update" },
    { title: "Lookalike refresh", note: "Seed from repeat buyers" },
  ],
}

export const stats = [
  { label: "Agents live now", value: null },
  { label: "Accounts watched", value: 7912 },
  { label: "Campaigns tuned today", value: 2381 },
  { label: "Ad spend managed", value: 41, prefix: "$", suffix: "M+" },
  { label: "Creatives shipped", value: 1204 },
]

export const proof = {
  titleBold: "Trusted by 3,400+ fast-growing brands",
  titleLight: "who run every channel from one screen, and scale faster for it.",
  logos: [
    { name: "OAKHOLLOW", style: "font-serif tracking-[0.18em] text-[15px]" },
    { name: "Lumen", style: "font-semibold tracking-[-0.04em] text-[22px]" },
    { name: "fieldnote", style: "italic tracking-tight text-[20px]" },
    { name: "SALT & SUN", style: "font-medium tracking-[0.28em] text-[12px]" },
    { name: "Kinfolk Co", style: "font-bold tracking-[-0.02em] text-[18px]" },
    { name: "MERIDIAN", style: "font-light tracking-[0.4em] text-[13px]" },
  ],
  spotlight: {
    label: "Wildflower Honey Co.",
    value: "$2.4M",
    caption: "added revenue in year one",
    photo: photos.honey,
  },
}

export const features = {
  agent: {
    title: "An agent on every account",
    body: "It reads each campaign every hour and acts inside the limits you set.",
    card: {
      text: "CPA on the spring bundle rose 31% after the Tuesday creative swap. I'd roll back to the April hook and move $400/day to TikTok.",
      metrics: [
        { label: "Forecast CPA", value: "−22%" },
        { label: "Budget moved", value: "$400/d" },
      ],
      approve: "Approve",
      edit: "Edit",
      badge: "Needs you",
    },
  },
  ask: {
    title: "Ask it anything",
    body: "It can see every channel, every order, every creative.",
    question: "Which ads brought in repeat buyers last month?",
  },
  research: {
    title: "A research desk that never sleeps",
    body: "Trends, launches and rival moves, summarised before your coffee.",
    items: [
      { text: "“Slow living” bundles are up 48% on TikTok Shop this week — three rivals launched gift sets.", source: "Trend scan", time: "7m ago", photo: photos.researchA },
      { text: "Northfield cut prices 15% across skincare; their Meta frequency doubled overnight.", source: "Competitor watch", time: "1h ago", photo: photos.researchB },
      { text: "Pinterest searches for “outdoor kitchen” start climbing in two weeks.", source: "Season forecast", time: "3h ago", photo: photos.researchC },
    ],
  },
  truth: {
    title: "One place for the numbers",
    body: "Every ad platform and your store, reconciled into one ledger.",
    chips: [
      { name: "Shopify", logo: "shopify" },
      { name: "Meta", logo: "meta" },
      { name: "Google", logo: "google" },
      { name: "TikTok", logo: "tiktok" },
    ],
    sentence: "all synced, so you never export another CSV.",
  },
  slack: {
    title: "Right there in Slack",
    body: "It only pings you when something needs a person.",
    you: "How did the weekend go?",
    reply: "Revenue hit $24.1k at 4.2× ROAS, up 18% on last weekend. The linen-drop hook did most of the lifting.",
    action: "Raise its budget 20%",
  },
  creative: {
    title: "A creative library that sorts itself",
    body: "Every asset tagged, scored and matched to the ads it ran in.",
    folders: ["All assets", "Hooks", "UGC", "Product", "Lifestyle", "Archive"],
    photos: [photos.creativeA, photos.creativeB, photos.creativeC, photos.creativeD],
  },
}

export const steps = {
  titleLight: "Set up in minutes.",
  titleBold: "Live by lunch.",
  items: [
    {
      n: "1",
      title: "Create your workspace",
      body: "Sign in with Google or email. No card, no sales call.",
      kind: "signup" as const,
    },
    {
      n: "2",
      title: "Connect your channels",
      body: "Link Meta, Google, TikTok and Shopify, then add Slack to talk to it there.",
      kind: "connect" as const,
    },
    {
      n: "3",
      title: "Give it a first job",
      body: "Say what you want, like “find my best-selling hook” — it answers and gets going.",
      kind: "ask" as const,
    },
  ],
  signup: { title: "Create your workspace", body: "Start with a free month. We'll bring your accounts across for you.", cta: "Continue with Google" },
  connect: [
    { name: "Meta", logo: "meta", state: "Connected" },
    { name: "Google Ads", logo: "google", state: "Connected" },
    { name: "TikTok", logo: "tiktok", state: "Connected" },
    { name: "Shopify", logo: "shopify", state: "Connecting…" },
  ],
  ask: {
    you: "What's my best-selling hook?",
    reply: "“Made for slow mornings” — 38% of last month's revenue at a $17 CPA.",
    cta: "Build 5 variants",
    alt: "Later",
  },
}

export const overnight = {
  titleBold: "One night with Adwright.",
  titleLight: "While you were asleep*",
  footnote:
    "*From a real activity log — a candle brand, one Thursday in March. Adwright checks performance every hour, acts when it should, and pings you only when it must.",
  kicker: "Every action logged. Every call yours to undo.",
  cta: "Start free",
  log: [
    { time: "23:14", icon: "pause", text: "Paused two ads with fading click-through", tag: "Done" },
    { time: "00:37", icon: "shift", text: "Moved $300 from Meta to TikTok retargeting", tag: "Done" },
    { time: "01:52", icon: "chart", text: "Flagged a CPM spike on Google Shopping", tag: "Done" },
    { time: "03:05", icon: "bell", text: "Posted the overnight summary to Slack", tag: "Sent" },
    { time: "05:40", icon: "sparkle", text: "Drafted six new hooks from top comments", tag: "Review" },
    { time: "06:58", icon: "check", text: "Raised bids on the best two ad sets", tag: "Done" },
  ],
}

export const slack = {
  eyebrow: "Adwright for Slack",
  titleBold: "Run your ads from Slack.",
  titleLight: "Connect once, then ask and act without leaving your channel.",
  points: [
    "Add Adwright to Slack and connect your ad accounts in one step.",
    "Ask like you'd ask a teammate and get a straight answer.",
    "Approve changes, shift budget or pause ads right from the thread.",
  ],
  channel: "# growth-team",
  digest: {
    who: "Adwright",
    time: "8:02 AM",
    text: "Morning ☀️ Here's yesterday. Revenue $9.8k, ROAS 3.9×, CPA $19. Meta scaled cleanly, Google flat, TikTok testing two new hooks.",
    kpis: [
      { label: "Revenue", value: "$9.8k" },
      { label: "ROAS", value: "3.9×" },
      { label: "CPA", value: "$19" },
    ],
  },
  you: { who: "You", time: "8:10 AM", text: "Nice. Can you pull the month-to-date for the board deck?" },
  answer: { who: "Adwright", time: "8:10 AM", text: "Done — month-to-date summary with a channel breakdown and notes.", file: "May-MTD.pdf" },
}

export const comparison = {
  titleBold: "168 check-ins a week,",
  titleLight: "not one Monday call.",
  body: "No tools to learn, no retainer to renegotiate.",
  columns: ["Adwright", "Agency", "Freelancer", "Doing it yourself"],
  rows: [
    { label: "Time to launch", cells: [["good", "Same day"], ["mid", "2–4 weeks"], ["mid", "1–2 weeks"], ["mid", "Days of setup"]] },
    { label: "How often it optimises", cells: [["good", "Every hour"], ["meh", "Weekly call"], ["meh", "When they're free"], ["meh", "When you find time"]] },
    { label: "Reporting", cells: [["good", "Live, in Slack"], ["mid", "Monthly deck"], ["meh", "Spreadsheets"], ["bad", "Manual exports"]] },
    { label: "Transparency", cells: [["good", "Every action logged"], ["meh", "Summaries, not the detail"], ["meh", "Varies"], ["meh", "Only what you track"]] },
    { label: "Creative", cells: [["good", "Drafted and tested"], ["mid", "Extra fee"], ["none", "Not included"], ["none", "Not included"]] },
    { label: "Cost", cells: [["good", "Flat monthly plan"], ["bad", "10–15% of spend + retainer"], ["meh", "Hourly or monthly"], ["bad", "Your evenings"]] },
    { label: "Scale", cells: [["good", "Add a channel in a click"], ["meh", "New scope, new contract"], ["bad", "One person's hours"], ["bad", "Your hours"]] },
  ] as { label: string; cells: [Verdict, string][] }[],
  cta: "Start free",
}

export type Verdict = "good" | "mid" | "meh" | "bad" | "none"

export const testimonials = {
  titleLight: "Loved by operators",
  titleBold: "and the numbers agree",
  items: [
    {
      quote: "We fired our agency in March. Adwright caught a broken pixel on day two that they'd missed for a quarter. It's the best hire we never made.",
      name: "Priya Raman",
      role: "Founder, Lumen Skin",
    },
    {
      quote: "The overnight Slack summary is the first thing I read. It tells me what changed and why, in plain English.",
      name: "Tom Whitaker",
      role: "Head of Growth, Oakhollow",
    },
    {
      quote: "I was nervous about letting an AI touch budgets. The guardrails won me over — it proposes, I approve, and it's usually right.",
      name: "Alba Moreno",
      role: "Marketing Lead, Salt & Sun",
    },
    {
      quote: "Two people now do what used to take five. CPA is down 27% and I have my Sundays back.",
      name: "Daniel Osei",
      role: "COO, Kinfolk Co",
    },
  ],
}

export const platforms = {
  titleLight: "Wired into every channel",
  titleBold: "where your customers already are.",
  featured: {
    logo: "meta",
    name: "Meta",
    title: "Built deepest on Meta.",
    body: "Advantage+ campaigns, catalog ads and creative testing, run end to end by the agent — our most used channel by far.",
    photo: photos.event,
    caption: "Reels drive 41% of revenue across Adwright accounts.",
  },
  items: [
    { logo: "google", name: "Google", body: "Search, Shopping and Performance Max, with budgets, bids and negative keywords tuned by the hour." },
    { logo: "openai", name: "ChatGPT", body: "Shopping answers are the new search results. Adwright tracks where your products show up and why." },
    { logo: "snapchat", name: "Snapchat", body: "Reach a younger audience with formats and targeting tuned for high-intent, first-time buyers." },
    { logo: "tiktok", name: "TikTok", body: "Spark Ads and Shop campaigns, with hooks rotated before they tire rather than after." },
    { logo: "shopify", name: "Shopify", body: "Orders, margins and stock flow in live, so no campaign spends on something you can't ship." },
    { logo: "pinterest", name: "Pinterest", body: "Plan seasonal pushes early — the agent watches search trends and schedules pins ahead of them." },
  ],
}

export const faq = {
  title: "FAQ",
  aside: "The questions we hear most. Can't find yours? Write to us from the chat in the corner — a person answers.",
  items: [
    {
      q: "What does Adwright actually do?",
      a: "It runs your paid acquisition. Agents watch every campaign hourly, shift budget, pause tired ads, draft new creative and report back in Slack — inside the limits you set.",
    },
    {
      q: "How much does it cost?",
      a: "One flat monthly plan based on your ad spend band, with no percentage-of-spend fee. The first month is free, and you can cancel from settings at any time.",
    },
    {
      q: "How quickly will I see results?",
      a: "Most brands see cleaner reporting on day one and measurable CPA gains within two to three weeks, once the agent has a baseline to improve on.",
    },
    {
      q: "Do I keep control of my campaigns?",
      a: "Always. You choose what it may change on its own, what needs approval, and what it must never touch. Every action is logged and can be undone in one click.",
    },
    {
      q: "Does it replace my marketing team?",
      a: "It replaces the busywork. Your team keeps the strategy, the brand and the final say; Adwright does the hourly checking, the reporting and the first drafts.",
    },
    {
      q: "How does onboarding work?",
      a: "Connect your accounts in about ten minutes. A specialist then reviews your setup with you on a short call and sets your guardrails together.",
    },
    {
      q: "Is my data secure?",
      a: "Your data is encrypted in transit and at rest, never used to train shared models, and access is scoped to exactly what the agent needs.",
    },
  ],
}

export const footer = {
  columns: [
    { title: "Product", links: ["Campaign agent", "Creative studio", "Research desk", "Slack app"] },
    { title: "Stage", links: ["Startups", "Scaling brands", "Enterprise"] },
    { title: "Team", links: ["Founders", "Growth leads", "Media buyers"] },
    { title: "Company", links: ["About", "Careers", "Contact", "Terms", "Privacy"] },
    { title: "Industries", links: ["Fashion", "Beauty", "Food & drink", "Home & living", "Wellness"] },
  ],
  appStore: { small: "Download on the", big: "App Store" },
  copyright: `© ${new Date().getFullYear()} Adwright, Inc. All rights reserved.`,
  credit: "Photography from Pexels.",
}
