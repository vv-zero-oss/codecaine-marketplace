/**
 * The site's words, kept out of the components that lay them out.
 * Pixelkeep is a made-up secure web gateway; nothing here is a real company.
 */
import type { SpriteName } from "@/components/pixel/sprites"

export const NAV = [
  { label: "Products", href: "/products" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Customers", href: "/customers" },
  { label: "Generator", href: "/generator" },
] as const

/** Pages that live in the footer, the mobile menu and ⌘K rather than the top bar. */
export const MORE_PAGES = [
  { label: "Get started", href: "/get-started" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
  { label: "Brand", href: "/brand" },
] as const

export const HERO = {
  kicker: "Secure web gateway · v3.0",
  lines: [
    [{ text: "Play", style: "script" }, { text: "safe", style: "solid" }],
    [{ text: "on the open", style: "solid" }],
    [{ text: "web, with", style: "solid" }],
    [{ text: "AI", style: "script" }, { text: "on guard.", style: "light" }],
  ],
  sub: "Every request is checked on the device, then goes straight where it was headed. No detours. No lag tax.",
  videoLabel: "Watch the run in 90s",
}

export type Feature = {
  id: string
  title: string
  short: string
  body: string
  sprite: SpriteName
}

/** Eight capabilities: the decrypting list on the home page and the grid on /products. */
export const FEATURES: Feature[] = [
  {
    id: "tls",
    title: "TLS INSPECTION",
    short: "Open the lock, look inside, close it again.",
    body: "Decrypts and inspects encrypted traffic on the device, with certificate pinning respected and banking sites left alone.",
    sprite: "lock",
  },
  {
    id: "urls",
    title: "URL FILTERING",
    short: "Categories, reputation and your own block list.",
    body: "Sixty-four categories refreshed every few minutes, plus allow and block lists that apply the moment you save them.",
    sprite: "globe",
  },
  {
    id: "mail",
    title: "MAIL LEAK BLOCK",
    short: "Keep company files out of personal inboxes.",
    body: "Spots uploads and pastes headed for personal mail and storage, and stops them before the request leaves the laptop.",
    sprite: "bug",
  },
  {
    id: "radar",
    title: "SHADOW AI RADAR",
    short: "Find the AI tools nobody signed off on.",
    body: "A live map of every AI app your people reach, scored for risk, with one click to allow, coach or block.",
    sprite: "eye",
  },
  {
    id: "policy",
    title: "INSTANT POLICY PUSH",
    short: "One save, every device, under a second.",
    body: "Rules are versioned, diffed and pushed to every endpoint at once. Roll one back as fast as you shipped it.",
    sprite: "bolt",
  },
  {
    id: "prompts",
    title: "PROMPT DLP",
    short: "Redact secrets before they reach a model.",
    body: "Reads prompts and attachments on the way out, masks keys, customer data and source code, and logs what it caught.",
    sprite: "chip",
  },
  {
    id: "saas",
    title: "SAAS DLP",
    short: "Sensitive data stays where it belongs.",
    body: "Fingerprints documents and patterns across the apps you already pay for, so a leak is flagged in the tab it happens in.",
    sprite: "key",
  },
  {
    id: "ux",
    title: "ZERO-LAG UX",
    short: "Your people will forget it is there.",
    body: "Checks run beside the browser, so a page loads at the speed it would without us. Median overhead: three milliseconds.",
    sprite: "coin",
  },
]

export type StageId = "block" | "detect" | "control"

export const STAGES: {
  id: StageId
  index: string
  label: string
  title: string
  body: string
  bullets: string[]
  metric: { label: string; value: number; suffix?: string }
}[] = [
  {
    id: "block",
    index: "01",
    label: "BLOCK",
    title: "Stop the bad level before it loads.",
    body: "Phishing kits, malware hosts and command-and-control calls are caught at the first packet, on the laptop, not in a far-away data centre.",
    bullets: ["Threat feeds updated every 90 seconds", "Zero-day domains held until they are scored", "Works the same at home, in a café, on a plane"],
    metric: { label: "Threats stopped today", value: 2184093 },
  },
  {
    id: "detect",
    index: "02",
    label: "DETECT",
    title: "See the AI nobody told you about.",
    body: "Pixelkeep maps every AI tool your team reaches, what they paste into it, and which ones are quietly storing it.",
    bullets: ["412 AI apps fingerprinted and risk scored", "Prompt and file contents classified in flight", "Coach people with a note, not a wall"],
    metric: { label: "Shadow apps found", value: 187 },
  },
  {
    id: "control",
    index: "03",
    label: "CONTROL",
    title: "Push a rule everywhere in one press.",
    body: "Write a policy once. It reaches every device in under a second, with a diff to read first and an undo if you change your mind.",
    bullets: ["Versioned policies with one-click rollback", "Per-group rules that follow the person, not the network", "Every decision written to an audit log you can query"],
    metric: { label: "Policies pushed", value: 9312 },
  },
]

export const GENERATIONS = [
  { id: "GEN 1", title: "Appliances in a closet", body: "Every request squeezed through one box in one office, and a VPN to reach it." },
  { id: "GEN 2", title: "Clouds that reroute", body: "Cleaner to run, but all your traffic still detours through someone else's data centre." },
  { id: "GEN 3", title: "Pixelkeep", body: "Checks the request on the device, then lets it go direct. Nothing to backhaul." },
]

export const STATS = [
  { value: 99.99, decimals: 2, suffix: "%", label: "Median uptime, every region" },
  { value: 3, decimals: 0, suffix: "ms", label: "Added to a typical page load" },
  { value: 14200, decimals: 0, suffix: "", label: "Teams keeping watch with us" },
  { value: 2.1, decimals: 1, suffix: "B", label: "Threats stopped every day" },
]

export const TESTIMONIALS = [
  {
    quote:
      "We turned off the VPN the week we rolled this out. Nobody noticed, which is the nicest thing a security tool can earn.",
    name: "Priya Raman",
    role: "Head of IT, Northwind Labs",
    hearts: 5,
  },
  {
    quote:
      "The shadow AI map found eleven tools I had never heard of. We coached nine of them and blocked two, all in an afternoon.",
    name: "Tomás Oliveira",
    role: "CISO, Kestrel Freight",
    hearts: 5,
  },
  {
    quote:
      "Policy push is the feature. I change a rule, I watch the diff land on four thousand laptops, and I go to lunch.",
    name: "Mei Tanaka",
    role: "Platform Lead, Halcyon Games",
    hearts: 4,
  },
]

export const CUSTOMER_LOGOS = ["NORTHWIND", "KESTREL", "HALCYON", "APERTURE", "LUMEN", "VERTEX", "OTTER & CO", "BRIGHTWAVE"]

export const CASES = [
  { name: "Kestrel Freight", result: "Retired the VPN for 6,200 staff", metric: 38, suffix: "% faster page loads", sprite: "plane" as SpriteName },
  { name: "Halcyon Games", result: "Found and tamed 61 shadow AI tools", metric: 61, suffix: " tools reviewed", sprite: "eye" as SpriteName },
  { name: "Northwind Labs", result: "Cut leak alerts to the ones that matter", metric: 92, suffix: "% fewer false alarms", sprite: "shield" as SpriteName },
]

export const PLANS = [
  {
    id: "player-one",
    name: "Player One",
    price: "$0",
    cadence: "forever",
    blurb: "A single-seat run, for trying it on your own laptop.",
    features: ["1 device", "URL filtering and TLS inspection", "7-day activity log"],
    cta: "Start free",
    featured: false,
  },
  {
    id: "co-op",
    name: "Co-op",
    price: "$12",
    cadence: "per seat / month",
    blurb: "The full gateway for a team that ships every week.",
    features: ["Unlimited devices", "Shadow AI radar and prompt DLP", "Instant policy push with rollback", "90-day audit log"],
    cta: "Start a trial",
    featured: true,
  },
  {
    id: "boss-level",
    name: "Boss Level",
    price: "Custom",
    cadence: "talk to us",
    blurb: "Single sign-on, regional data and a human who knows your name.",
    features: ["Everything in Co-op", "SSO, SCIM and custom retention", "Private regions", "Dedicated support channel"],
    cta: "Book a demo",
    featured: false,
  },
]

export const FAQ = [
  { q: "Does it slow my browsing down?", a: "No. Checks run on the device beside the browser, so pages load at their normal speed. The median overhead we measure is three milliseconds." },
  { q: "Do I still need a VPN?", a: "Most teams switch theirs off. Traffic goes straight to its destination after the on-device check, so there is nothing to tunnel back to an office." },
  { q: "What does the AI actually look at?", a: "Prompts and attachments headed for AI tools, classified in flight. Secrets and customer data are masked before they leave, and you choose whether a match blocks, coaches or only logs." },
  { q: "Where does my data live?", a: "Policies and audit logs live in the region you pick. Traffic contents are inspected on the device and are never copied to our servers." },
  { q: "How long does rollout take?", a: "A pilot group is usually protected within the hour. Mobile device management pushes the agent to everyone else in a day." },
]

export const PALETTE_NAMES = ["Dusk", "Lava", "Mint", "Sunset", "Arcade", "Ice"] as const

export const HOW_STEPS = [
  { id: "install", index: "01", title: "Install the agent", body: "Push one small agent with your device manager. It runs beside the browser, starts in under a second and needs no tunnel.", detail: "Works on macOS, Windows, ChromeOS and Linux. Silent install, signed and notarised.", tone: "accent" as const },
  { id: "inspect", index: "02", title: "It checks every request", body: "Each request is inspected on the device: the address, the certificate, and for AI tools, the prompt and files going out.", detail: "TLS inspection respects pinned apps and leaves banking alone.", tone: "warn" as const },
  { id: "decide", index: "03", title: "Your policy decides", body: "Block it, mask it, coach the person, or let it through. The decision is made locally in milliseconds from the rules you wrote.", detail: "Every rule shows a diff before it ships and has an undo.", tone: "good" as const },
  { id: "direct", index: "04", title: "Traffic goes direct", body: "Allowed requests head straight to where they were going. Nothing is backhauled, so nothing slows down.", detail: "Median overhead across all customers: three milliseconds.", tone: "sky" as const },
]

export const SCENARIOS = [
  { id: "phish", label: "Open a phishing link", detail: "login-secure-bank.example", stop: 1, verdict: "BLOCK", tone: "bad", log: "Newly registered domain, matches a known phishing kit.", ms: 2 },
  { id: "secret", label: "Paste an API key into an AI chat", detail: "chat.ai-notes.app", stop: 2, verdict: "MASK", tone: "warn", log: "Key pattern found in the prompt. Replaced with [REDACTED] before sending.", ms: 3 },
  { id: "mail", label: "Upload a file to personal mail", detail: "mail.personal-inbox.example", stop: 2, verdict: "COACH", tone: "accent", log: "Company file headed for personal mail. Person shown a note, upload held.", ms: 3 },
  { id: "docs", label: "Read the framework docs", detail: "docs.framework.example", stop: 3, verdict: "ALLOW", tone: "good", log: "Known good category. Went direct, nothing logged beyond the count.", ms: 1 },
] as const

export const GET_STARTED = [
  { id: "account", title: "Make your workspace", body: "Name it and pick the region your policies and logs will live in.", cta: "Create workspace" },
  { id: "policy", title: "Pick a starting policy", body: "Choose how strict to begin. You can change any rule later and every change has an undo.", cta: "Use this policy" },
  { id: "agent", title: "Protect a device", body: "Copy the install command, or send the agent to your device manager. Your first device appears here in seconds.", cta: "Finish setup" },
]

export const TRUST = [
  { title: "Audited", body: "Independent SOC 2 Type II and ISO 27001 reports, shared under NDA on request.", sprite: "shield" as SpriteName },
  { title: "Stays on the device", body: "Traffic contents are inspected locally and never copied to our servers.", sprite: "lock" as SpriteName },
  { title: "Your region", body: "Policies and audit logs are stored in the region you choose: US, EU or APAC.", sprite: "globe" as SpriteName },
  { title: "Keys you hold", body: "Bring your own key for audit-log encryption on Boss Level plans.", sprite: "key" as SpriteName },
  { title: "Fast disclosure", body: "A public security contact and a 72-hour acknowledgement promise.", sprite: "bolt" as SpriteName },
  { title: "Open about changes", body: "A plain-language changelog for every agent release, with a rollback.", sprite: "chip" as SpriteName },
]

export const VALUES = [
  { title: "Quiet by default", body: "The best security tool is the one nobody has to think about." },
  { title: "Explain it", body: "Every block comes with a reason a person can read in one breath." },
  { title: "Undo everything", body: "If a change can hurt, it can also be rolled back in a click." },
]

export const TEAM = [
  { name: "Ottilie Moreau", role: "Founder, security", sprite: "shield" as SpriteName },
  { name: "Kenji Arai", role: "Agent engineering", sprite: "chip" as SpriteName },
  { name: "Sade Okafor", role: "Policy and research", sprite: "eye" as SpriteName },
  { name: "Lars Nilsen", role: "Customer success", sprite: "heart" as SpriteName },
]
