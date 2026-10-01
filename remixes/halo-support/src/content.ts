/** Every word on the page, in the order it appears. */

export const ANNOUNCEMENT = {
  text: "New: voice agents can now book a callback and place it themselves.",
  linkLabel: "Learn more",
}

export const NAV = [
  {
    label: "Product",
    items: [
      { title: "Studio", body: "Build your first multimodal agent in under five minutes.", icon: "layers" },
      { title: "Insights", body: "Smart reading of every conversation, at a glance.", icon: "eye" },
      { title: "Autopilot", body: "Experiments that improve your metrics on their own.", icon: "trending" },
      { title: "Pilot", body: "The agent that builds your agents.", icon: "compass" },
      { title: "CLI", body: "Ship and operate agents straight from the terminal.", icon: "terminal" },
      { title: "Browser agent", body: "Run workflows directly inside the systems you already use.", icon: "globe" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { title: "Omnichannel", body: "One agent across chat, email and messaging.", icon: "layers" },
      { title: "Voice", body: "Phone support that sounds like a person.", icon: "mic" },
      { title: "Insights", body: "See what customers ask for before they ask twice.", icon: "eye" },
    ],
  },
  {
    label: "Industries",
    items: [
      { title: "Fintech", icon: "landmark" },
      { title: "Banking", icon: "wallet" },
      { title: "Technology", icon: "cpu" },
      { title: "Retail", icon: "bag" },
      { title: "Telecom", icon: "signal" },
      { title: "Healthcare", icon: "heart" },
      { title: "Freight & logistics", icon: "truck" },
      { title: "Hospitality", icon: "bed" },
    ],
  },
  {
    label: "Company",
    items: [
      { title: "Careers", body: "Join the team teaching software to listen.", icon: "briefcase" },
      { title: "News", body: "Announcements, customer stories and press.", icon: "newspaper" },
      { title: "Trust center", body: "How Halo handles security and privacy.", icon: "shield" },
    ],
  },
] as const

export const HERO = {
  title: "Your metrics deserve better than a Monday meeting",
  lead: "AI support agents that quietly improve",
  metrics: "Resolution Rate,CSAT,Revenue Recovery",
  body: "Pick the number you answer to. Halo runs small, safe experiments on live conversations, keeps what works and shows you the proof — no dashboards to babysit.",
  cta: "See a demo",
  hint: "Try it: tap the mic and say something.",
  prompts: [
    { ask: "show me refund chats that ended well", answer: "412 conversations resolved in one touch this week. Refund requests under $50 resolve fastest, at 94%." },
    { ask: "why did escalations climb on Tuesday?", answer: "A carrier delay sent 38% more “where is my order” chats. Two of them needed a human; Halo drafted the fix." },
    { ask: "ship the quick-issue menu to 100%", answer: "Done. It beat control by +1.2 pts across 2,431 conversations, and it now runs on every chat." },
  ],
}

export const LOGOS = [
  { name: "parcelo", style: "font-sans font-semibold tracking-[0.18em] uppercase text-[15px]" },
  { name: "capsule.io", style: "font-sans font-semibold tracking-tight text-[20px]" },
  { name: "afterglow", style: "font-sans font-medium tracking-tight text-[22px]" },
  { name: "Kettle & Co", style: "font-display text-[19px]" },
  { name: "flux", style: "font-sans font-semibold lowercase text-[24px]" },
  { name: "TESSELLATE", style: "font-mono font-medium tracking-[0.12em] text-[14px]" },
  { name: "ledgerly", style: "font-sans font-semibold tracking-tight text-[21px] italic" },
]

export const SHOWCASE = {
  title: "One console for every agent, experiment and outcome",
}

export const INDUSTRIES = {
  eyebrow: "Industries",
  title: "Built for the way your industry actually talks",
  body: "Halo learns your vocabulary, your policies and your peak hours.",
  cards: [
    { title: "Fintech", body: "Answers that stay inside the rulebook, with a citation for every one." },
    { title: "Banking", body: "Dispute and fraud calls get a calm voice at 3 a.m." },
    { title: "Technology", body: "Most bots plateau in week three. Halo keeps testing past 98%." },
    { title: "Retail", body: "Returns season, handled. Peak traffic without the temp roster." },
    { title: "Telecom", body: "Outage nights and launch weeks stop breaking the queue." },
    { title: "Healthcare", body: "Appointments, refills and benefits — a human is one tap away." },
    { title: "Hospitality", body: "Late check-ins and lost keys, sorted before the front desk wakes." },
  ],
}

export type FeatureGroup = "build" | "observe" | "improve"

export const FEATURES: Record<
  FeatureGroup,
  { eyebrow: string; title: string; body: string; tone: "iris" | "teal" | "green"; steps: { title: string; body: string }[] }
> = {
  build: {
    eyebrow: "Build",
    title: "Go from policy docs to a working agent before your coffee cools.",
    body: "Point Pilot at your help centre, macros and past tickets. It drafts an agent that sounds like your best teammate.",
    tone: "iris",
    steps: [
      { title: "Describe the job to Pilot", body: "Say what the agent should own. Pilot reads your knowledge base and drafts the playbook." },
      { title: "Teach it your voice", body: "Pilot picks up tone from your brand guide and your best-rated replies, so every answer sounds like you." },
      { title: "Set the handoff rules", body: "Decide when the agent asks, escalates or hands over to a person. Rules apply on every channel." },
    ],
  },
  observe: {
    eyebrow: "Observe",
    title: "See the whole queue at a glance.",
    body: "Skip the ticket-by-ticket archaeology. Halo surfaces what changed, where and why, in plain language.",
    tone: "teal",
    steps: [
      { title: "Slice with a sentence", body: "Ask for “refund chats that ended well” and get exactly that cut. No filters to build." },
      { title: "Read the hard conversations", body: "Open any thread to see what was said, how the customer felt and where the agent hesitated." },
      { title: "Know what's working", body: "Watch resolution, CSAT and escalations move for the exact slice you are tracking." },
    ],
  },
  improve: {
    eyebrow: "Improve",
    title: "Halo works on your metrics while you sleep.",
    body: "It runs the loop end to end: find the fix, prove it on a slice of traffic, ship what wins.",
    tone: "green",
    steps: [
      { title: "Choose an objective", body: "Pick a metric — resolution, escalation or CSAT — and set the goal." },
      { title: "Rank the opportunities", body: "Halo turns gaps into ranked ideas. Move them from triage to experiment." },
      { title: "Prove it at scale", body: "Each change rolls out to a share of traffic, measured against control, and graduates when it wins." },
    ],
  },
}

export const LANGUAGES = {
  eyebrow: "Any language, anywhere",
  lead: "Speaks natively in",
  body: "Halo answers every caller in their own language — spoken, not subtitled. Any of 99, out of the box.",
  count: 99,
  countLabel: "languages supported",
  list: [
    { name: "Portuguese", lon: -47, lat: -15 },
    { name: "Swahili", lon: 37, lat: -6 },
    { name: "Spanish", lon: -3, lat: 40 },
    { name: "Hindi", lon: 78, lat: 22 },
    { name: "Japanese", lon: 138, lat: 36 },
    { name: "Arabic", lon: 45, lat: 25 },
    { name: "Mandarin", lon: 104, lat: 34 },
  ],
}

export const CASE_STUDY = {
  eyebrow: "Customer story",
  heading: "How a national courier cut repeat contacts in half",
  company: "PARCELO",
  title: "How Parcelo handled peak season without hiring a second team",
  cta: "Read the story",
  quote:
    "“Peak used to mean a month of temp hiring and apologies. This year the queue held, the answers stayed on-brand, and our people spent their time on the hard cases.”",
  person: "Maren Voss, Head of Support at Parcelo",
  stat: "90%+",
  statLabel: "Resolve rate",
  tags: ["Resolved: first contact", "Sentiment: relieved"],
  footnote: "Resolution is measured on contacts handled end to end without a person, October–December 2025.",
  photoAlt: "A smiling courier handing a paper bag to a customer at the door",
  photoCredit: "Photo: Mizuno K on Pexels",
  avatarAlt: "Black-and-white portrait of Maren Voss",
}

export const CTA = {
  eyebrow: "Get a personalised demo",
  title: "See what Halo would improve first",
  body: "Tell us the metric you care about. We'll show you which agent would own it, which systems it touches and how success is measured.",
  placeholder: "Work email",
}

export const FOOTER = {
  columns: [
    { title: "Product", links: ["Studio", "Pilot", "CLI", "Browser agent"] },
    { title: "Solutions", links: ["Omnichannel", "Voice", "Insights"] },
    { title: "Industries", links: ["Fintech", "Banking", "Technology", "Retail", "Telecom"] },
    { title: "", links: ["Healthcare", "Freight & logistics", "Hospitality", "All industries"] },
    { title: "Company", links: ["Careers", "News", "Contact", "Trust center"] },
  ],
  legal: ["Privacy", "Cookies", "Terms", "Pilot programme terms", "Acceptable use", "Data processing", "Your privacy choices"],
  badges: ["SOC 2", "ISO 27001", "ISO 42001"],
  status: "Compliant",
}
