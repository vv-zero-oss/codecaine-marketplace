/**
 * The site's words, kept out of the components that lay them out.
 * Pixelkeep is a made-up secure web gateway; nothing here is a real company.
 */
import type { SpriteName } from "@/components/pixel/sprites"

export const NAV = [
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "Customers", href: "/customers" },
  { label: "Generator", href: "/generator" },
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
