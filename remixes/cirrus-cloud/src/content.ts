/**
 * Every word on the page. Cirrus, its customers and its numbers are fictional.
 */

import type { IsoModel } from "@/components/marks/iso-server"
import type { ChipTone } from "@/components/ui/chip"

const pexels = (path: string, w = 1200) => `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=${w}`

export const brand = {
  name: "Cirrus",
  email: "hello@cirrus.dev",
  console: "#start",
}

export const nav = {
  product: [
    { title: "Environments", href: "/product", icon: "laptop-code", body: "Full dev machines from any branch, in nine seconds." },
    { title: "The Environment Spec", href: "/product#spec", icon: "code-block", body: "One file that describes every machine." },
    { title: "Edge network", href: "/network", icon: "globe", body: "Fourteen regions, one hop from every desk." },
    { title: "GPU compute", href: "/product#features", icon: "bolt", body: "Accelerators by the minute, attached on demand." },
  ],
  links: [
    { title: "Network", href: "/network" },
    { title: "Pricing", href: "/pricing" },
    { title: "Changelog", href: "/changelog" },
  ],
  signIn: { title: "Sign in", href: "mailto:hello@cirrus.dev?subject=Sign%20in" },
  start: { title: "Start free", href: "/pricing" },
} as const

export const masthead = {
  title: ["Workspaces,", "anywhere."],
  strap: [
    ["Cloud", "dev", "environments"],
    ["for", "teams", "that", "ship"],
  ],
  blurb: "Full development machines in nine seconds, from any branch, on any laptop.",
  corner: "Open console",
}

export const intro =
  "A short account of what changed when we moved every environment off the laptop, and of what we kept exactly where it was. First, here is what teams run on it:"

export type PanelTone = "cobalt" | "gold" | "night" | "lime" | "signal"
export type Card = {
  title: string
  body: string
  /** A photograph… */
  image?: string
  alt?: string
  /** …or an isometric server on a coloured panel. */
  art?: { model: IsoModel; tone: PanelTone }
  tags?: { label: string; tone: ChipTone }[]
}

export const workloads: Card[] = [
  {
    title: "Monorepo, day one",
    body: "A forty-service repository, built and seeded before the new hire finds the coffee.",
    art: { model: "rack", tone: "cobalt" },
  },
  {
    title: "A preview per pull request",
    body: "Every branch gets its own machine, a live URL and a link waiting in the review.",
    art: { model: "branches", tone: "night" },
  },
  {
    title: "GPU notebooks",
    body: "Attach an accelerator for an experiment, detach it before the invoice notices.",
    art: { model: "gpu", tone: "gold" },
  },
  {
    title: "Agent sandboxes",
    body: "Throwaway machines for coding agents, with the network and the secrets fenced off.",
    art: { model: "sandbox", tone: "lime" },
  },
  {
    title: "Firmware builds",
    body: "Cross-compile toolchains that used to live on one engineer's desk, now on everyone's.",
    art: { model: "board", tone: "signal" },
  },
]

export const origin = {
  heading: "Born in a build queue, where waiting is a tax.",
  label: "Where we started",
  body: [
    "In 2021 we were eleven engineers losing most of every Monday to laptops: a dependency bumped over the weekend, a database that no longer matched, a fan that would not stop. Nobody was bad at their job. The machines were simply doing work they were never meant to do.",
    "So we moved the work. The editor stayed on the desk, where it is fast and familiar; everything that compiles, serves, seeds and trains went to a machine that is the same for everyone and new every morning.",
  ],
  aside: "Four years later the queue is gone and the Mondays are back. The laptop is a terminal again, and a good one.",
}

export const changed = {
  heading: "Laptops are good at everything except being servers.",
  label: "What changed",
  body: [
    "Laptops are very good now, and everybody has a fast one. Editing, reviewing, a call with the camera on: none of that needs to move anywhere.",
    "What they were never built for is the rest of it. Point a laptop at a real stack and it gives you back heat, a full disk and an environment only you can reproduce.",
  ],
  good: { label: "Brilliant at", body: "Editing, browsing, reviewing, and running one small service at a time without complaint." },
  bad: { label: "Hopeless at", body: "Forty containers, a GPU, a seeded database and a clean slate every single morning." },
  closing: "So the laptop keeps the part it is good at, and the cloud takes the part that was costing you the morning.",
}

export const flow = {
  heading: ["Clone. Boot.", "Build. Ship."],
  body: "Every environment starts the way anything alive does: from a code, copied exactly. The cloud grows it into a running machine, the machine into a whole system, and the system sends what it makes out into the world.",
  steps: [
    { title: "Clone", stage: "DNA", body: "The repository is the genome. Cirrus reads its spec and copies it, strand for strand, into a fresh machine." },
    { title: "Boot", stage: "Cell", body: "A snapshot of the last good build comes alive in about nine seconds, dependencies and all." },
    { title: "Build", stage: "Tree", body: "Compiles, tests and services grow on hardware sized for the job, branching as the work needs." },
    { title: "Ship", stage: "Seeds", body: "Previews and releases go out on the wind, and the machine goes back to sleep." },
  ],
}

export const spec = {
  heading: "The Environment Spec.",
  label: "One file, every machine",
  lead: "Our core product.",
  body: "Every repository on Cirrus carries one file that describes the machine it needs: the image, the services, the secrets and the snapshots. People read it, CI reads it, agents read it, and every environment is built from it and checked against it. The four parts below are how it works.",
  cta: "Read the spec",
  steps: [
    { title: "Base image", body: "The toolchain, pinned. One line changes it for every engineer at once." },
    { title: "Services", body: "Databases, queues and caches that start with the machine and seed themselves." },
    { title: "Secrets", body: "Scoped per branch and per person, injected at boot, never written to disk." },
    { title: "Snapshots", body: "A warm copy of every good build, so the next boot starts where the last one ended." },
  ],
}

export const levels = {
  heading: "Move your team up the levels of remote development.",
  label: "How teams adopt it",
  body: [
    "This is the other half of what we do. We run thousands of environments a day, for our own work and our customers', and most of what we have learned about moving a team off local machines is teachable. So we pass it on: migration plans, spec reviews, a pairing week, and help with the part that is really about habits.",
    "It starts with where you actually are. Remote development has levels: at one end a shared staging box nobody trusts, at the other a fleet that appears for every change and vanishes when it merges. Most teams are somewhere in the middle, and we help them move up one level at a time.",
  ],
  rungs: [
    { level: "L1", title: "Shared staging.", body: "One server, everybody's changes, and a queue on the whiteboard." },
    { level: "L3", title: "Per-branch environments.", body: "Every branch gets a machine, with a human deciding when." },
    { level: "L5", title: "Ephemeral fleets.", body: "Environments start and stop with the work, people and agents alike." },
  ],
  closing: "We know where the line is, and we will happily talk you out of a migration you do not need yet.",
}

export const stack = {
  heading: ["The stack is everywhere.", "The setup isn't."],
  body: "Whatever a team builds with, Cirrus runs it from the same spec. The language, the framework and the hardware are the team's choice; the three hours of setup are no longer anybody's.",
  cards: [
    {
      title: "Full-stack web",
      body: "A web app, an API and a database in one spec, booted together in eleven seconds.",
      image: pexels("36025195/pexels-photo-36025195.jpeg"),
      alt: "A soft orange abstract form curling against a pale gradient",
      tags: [
        { label: "Node 22", tone: "red" },
        { label: "Postgres", tone: "blue" },
        { label: "Redis", tone: "ink" },
      ],
    },
    {
      title: "Model training",
      body: "Notebooks on a GPU with the dataset already mounted and warm.",
      image: pexels("33797646/pexels-photo-33797646.jpeg"),
      alt: "Layered violet and blue shapes around a glossy sphere",
      tags: [
        { label: "Python", tone: "red" },
        { label: "CUDA 12", tone: "violet" },
      ],
    },
    {
      title: "Systems work",
      body: "Rust and C++ toolchains with a build cache the whole team shares.",
      image: pexels("35504606/pexels-photo-35504606.jpeg"),
      alt: "Two mechanical keyboards with pastel keycaps on a desk mat",
      tags: [
        { label: "Rust", tone: "red" },
        { label: "Bazel", tone: "blue" },
        { label: "Nix", tone: "lime" },
      ],
    },
    {
      title: "Mobile",
      body: "Emulators in the browser, signed builds from any branch, no Xcode on the laptop.",
      image: pexels("28918449/pexels-photo-28918449.jpeg"),
      alt: "Glassy red geometric shapes floating over a tiled floor",
      tags: [{ label: "Swift", tone: "violet" }],
    },
  ] satisfies Card[],
}

export const pricing = {
  heading: "Priced by the minute, like the machines are.",
  label: "Pricing",
  body: "Every plan bills compute by the minute it runs and stops when you do. Idle environments sleep after thirty minutes and cost nothing while they dream.",
  plans: [
    {
      name: "Hobby",
      price: "$0",
      unit: "forever",
      blurb: "For side projects and trying the spec on a real repository.",
      features: ["60 machine hours a month", "Up to 4 vCPU and 8 GB", "Preview URLs", "Community support"],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Team",
      price: "$24",
      unit: "per seat / month",
      blurb: "For teams that want every branch on its own machine.",
      features: ["Unlimited environments", "Up to 32 vCPU, GPUs on demand", "Shared snapshots and build cache", "Scoped secrets and audit log"],
      cta: "Start a trial",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      unit: "annual",
      blurb: "For fleets, private regions and the paperwork that comes with them.",
      features: ["Your cloud account or ours", "SSO, SCIM and data residency", "99.95% uptime commitment", "A named engineer"],
      cta: "Talk to us",
      featured: false,
    },
  ],
}

export const faq = {
  heading: "Questions, answered plainly.",
  label: "FAQ",
  items: [
    {
      q: "Do I have to change editors?",
      a: "No. Cirrus connects to the editor you already use over SSH or a local extension, and to the browser if you prefer. Your keybindings, themes and extensions stay where they are.",
    },
    {
      q: "What happens when my connection drops?",
      a: "The machine keeps running. Builds finish, servers stay up, and when you reconnect you are back where you left off, terminal history included.",
    },
    {
      q: "Where does my code live?",
      a: "In your git host, as it does now. Environments clone on boot and can run in our cloud or in a private region inside your own account.",
    },
    {
      q: "How fast is nine seconds, really?",
      a: "That is the median time from request to a shell for a warm snapshot of a mid-sized repository. A cold build of a new spec takes as long as your build takes, once.",
    },
    {
      q: "Can coding agents use it?",
      a: "Yes. Agents get the same spec-built machines as people, with their own network rules and scoped secrets, and every change they make can be previewed before anyone merges it.",
    },
  ],
}

export const closing = {
  marquee: "the answer is yes, it runs in the cloud",
  cta: "Start a workspace",
  body: [
    "We are a remote team spread across six time zones, so the odds are good that one of us is awake and near your region. Mostly engineers, a few former ops people, and always glad of a gnarly build to fix.",
    "The nearest humans to you are probably in Lisbon, Toronto or Singapore, and all of them answer email.",
  ],
  address: "Regions in 14 cities, status at status.cirrus.dev.",
  credits: "Photography from Pexels. Pixel icons from the Pixel Icon Library by HackerNoon. City line art from the Minimal Wallpapers city backgrounds community file. Cirrus and its customers are fictional.",
}

export const footer = {
  blurb: "Cloud development environments for teams that ship. Any branch, any laptop, nine seconds.",
  columns: [
    {
      title: "Product",
      links: [
        { title: "Environments", href: "/product" },
        { title: "Environment Spec", href: "/product#spec" },
        { title: "Edge network", href: "/network" },
        { title: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "Changelog", href: "/changelog" },
        { title: "Brand guidelines", href: "/brand" },
        { title: "Contact", href: "mailto:hello@cirrus.dev" },
      ],
    },
    {
      title: "Start",
      links: [
        { title: "Start free", href: "/pricing" },
        { title: "Talk to an engineer", href: "mailto:hello@cirrus.dev?subject=Talk%20to%20an%20engineer" },
        { title: "Questions", href: "/pricing#faq" },
      ],
    },
  ],
}

/* ── Product ─────────────────────────────────────────────────────────── */

export const productPage = {
  hero: {
    title: ["The machine,", "as a file."],
    strap: [
      ["Environments", "from", "a", "spec"],
      ["booted", "from", "any", "branch"],
    ],
    blurb: "Describe the machine once, in the repository. Every engineer, reviewer and agent gets exactly that machine.",
  },
  file: {
    heading: "Write it once. Boot it forever.",
    label: "cirrus.toml",
    body: [
      "The spec lives beside the code and changes with it, so the machine a branch needs is always the machine it gets. Review it like code, roll it back like code.",
      "Cirrus reads it on every boot, builds what changed, and keeps a warm snapshot of the result for the next person who asks.",
    ],
    code: `[machine]
image  = "cirrus/base:2026.09"
cpu    = 8
memory = "16GB"

[services.postgres]
version = "17"
seed    = "db/seed.sql"

[services.redis]
version = "8"

[secrets]
scope = ["branch", "person"]
from  = "vault://team/app"

[snapshots]
warm   = true
keep   = "14d"

[ports]
web = 3000   # → a preview URL per branch`,
  },
  features: {
    heading: "Everything a laptop was pretending to be.",
    label: "Features",
    items: [
      { icon: "refresh", title: "Warm snapshots", body: "Every good build is kept warm, so the next boot starts where the last one ended." },
      { icon: "lock", title: "Scoped secrets", body: "Per branch and per person, injected at boot, never written to disk." },
      { icon: "sitemap", title: "Services that seed", body: "Databases, queues and caches start with the machine and fill themselves." },
      { icon: "bolt", title: "GPUs on a timer", body: "Attach an accelerator for an hour, detach it before the invoice notices." },
      { icon: "link", title: "Preview URLs", body: "Every port you name gets a live address per branch, shared with a link." },
      { icon: "robot", title: "Agent-ready", body: "Coding agents get the same machines as people, with their own fences." },
    ],
  },
  cta: { marquee: "same machine, every time", button: "Start a workspace" },
}

/* ── Network ─────────────────────────────────────────────────────────── */

export const networkPage = {
  hero: {
    title: ["Every region,", "one hop."],
    strap: [
      ["Fourteen", "edge", "regions"],
      ["one", "origin", "per", "team"],
    ],
    blurb: "Environments run in the region nearest the person using them, and previews are cached at every edge.",
  },
  stats: [
    { value: "14", label: "Edge regions" },
    { value: "9.1s", label: "Median boot" },
    { value: "38ms", label: "p50 to nearest edge" },
    { value: "99.97%", label: "Uptime, last 90 days" },
  ],
  regions: {
    heading: "Fourteen regions, and counting.",
    label: "Where it runs",
    body: "Every region runs the full stack: compute, snapshots and a preview cache. Latency is measured from the region's own city to the edge, every minute.",
    rows: [
      { code: "LHR", city: "London", status: "live", p50: "4ms" },
      { code: "FRA", city: "Frankfurt", status: "live", p50: "5ms" },
      { code: "AMS", city: "Amsterdam", status: "live", p50: "4ms" },
      { code: "IAD", city: "Ashburn", status: "live", p50: "3ms" },
      { code: "JFK", city: "New York", status: "live", p50: "4ms" },
      { code: "YUL", city: "Montréal", status: "live", p50: "6ms" },
      { code: "MIA", city: "Miami", status: "live", p50: "5ms" },
      { code: "LAX", city: "Los Angeles", status: "live", p50: "4ms" },
      { code: "GRU", city: "São Paulo", status: "live", p50: "7ms" },
      { code: "SIN", city: "Singapore", status: "live", p50: "3ms" },
      { code: "NRT", city: "Tokyo", status: "live", p50: "4ms" },
      { code: "SYD", city: "Sydney", status: "live", p50: "6ms" },
      { code: "BOM", city: "Mumbai", status: "new", p50: "8ms" },
      { code: "JNB", city: "Johannesburg", status: "new", p50: "9ms" },
    ],
  },
  cities: {
    heading: "Five of our edges, drawn by hand.",
    label: "Regions",
    items: [
      { city: "london", note: "Our first region, under the river." },
      { city: "manhattan", note: "Two halls, one on each side of the island." },
      { city: "montreal", note: "Hydro-powered, and cold on purpose." },
      { city: "miami", note: "The gateway to everything south." },
      { city: "los-angeles", note: "Closest to the studios and their render farms." },
    ],
  },
  cta: { marquee: "one hop from every desk", button: "Start a workspace" },
} as const

/* ── Pricing ─────────────────────────────────────────────────────────── */

export const pricingPage = {
  hero: {
    title: ["Pay for", "what runs."],
    strap: [
      ["Pay", "for", "the", "machine"],
      ["while", "it", "is", "running"],
    ],
    blurb: "Compute is billed by the minute and stops when you do. Idle machines sleep after thirty minutes and cost nothing.",
  },
  compare: {
    heading: "Every plan, side by side.",
    label: "Compare",
    columns: ["Hobby", "Team", "Enterprise"],
    rows: [
      { feature: "Machine hours", values: ["60 / month", "Unlimited", "Unlimited"] },
      { feature: "Largest machine", values: ["4 vCPU · 8 GB", "32 vCPU · 128 GB", "Custom"] },
      { feature: "GPUs", values: ["—", "On demand", "Reserved"] },
      { feature: "Preview URLs", values: ["yes", "yes", "yes"] },
      { feature: "Warm snapshots", values: ["3 days", "14 days", "90 days"] },
      { feature: "Scoped secrets", values: ["—", "yes", "yes"] },
      { feature: "Agent sandboxes", values: ["—", "yes", "yes"] },
      { feature: "SSO and SCIM", values: ["—", "—", "yes"] },
      { feature: "Private regions", values: ["—", "—", "yes"] },
      { feature: "Support", values: ["Community", "Email, 1 day", "Named engineer"] },
    ],
  },
  cta: { marquee: "the first sixty hours are on us", button: "Start free" },
}

/* ── Changelog ───────────────────────────────────────────────────────── */

export const changelogPage = {
  hero: {
    title: ["What's new,", "week by week."],
    strap: [
      ["Every", "change", "we", "ship"],
      ["in", "the", "order", "it", "shipped"],
    ],
    blurb: "Small releases, every week. The big ones get a paragraph; the fixes get a line.",
  },
  entries: [
    {
      date: "Sep 24, 2026",
      version: "2026.39",
      icon: "globe",
      tag: { label: "Network", tone: "blue" },
      title: "Mumbai and Johannesburg are live",
      body: "Two new edge regions bring the count to fourteen. Environments in India and southern Africa now boot in the same nine seconds as everywhere else.",
    },
    {
      date: "Sep 17, 2026",
      version: "2026.38",
      icon: "robot",
      tag: { label: "Agents", tone: "lime" },
      title: "Agent sandboxes get their own network rules",
      body: "Give an agent a machine with egress limited to the hosts you name, and watch every request it makes in the session log.",
    },
    {
      date: "Sep 10, 2026",
      version: "2026.37",
      icon: "refresh",
      tag: { label: "Snapshots", tone: "violet" },
      title: "Snapshots warm themselves after a merge",
      body: "When a pull request merges, Cirrus builds the new main in the background, so the next branch starts from it rather than from yesterday.",
    },
    {
      date: "Sep 3, 2026",
      version: "2026.36",
      icon: "bolt",
      tag: { label: "GPU", tone: "red" },
      title: "GPUs attach to running machines",
      body: "No more rebooting to add an accelerator: attach one to a live environment from the command line, detach it when the cell finishes.",
    },
    {
      date: "Aug 27, 2026",
      version: "2026.35",
      icon: "code-block",
      tag: { label: "Spec", tone: "ink" },
      title: "The spec learns about ports",
      body: "Name a port in cirrus.toml and every branch gets a preview URL for it, shared with the people on the pull request.",
    },
    {
      date: "Aug 20, 2026",
      version: "2026.34",
      icon: "bug",
      tag: { label: "Fixes", tone: "ink" },
      title: "Twelve fixes",
      body: "Faster log streaming, a clearer error when a seed script fails, and secrets that no longer linger in shell history.",
    },
  ],
  cta: { marquee: "shipped on a tuesday", button: "Start a workspace" },
} as const

/* ── Brand ───────────────────────────────────────────────────────────── */

export const brandPage = {
  hero: {
    title: ["Brand", "guidelines."],
    strap: [
      ["How", "Cirrus", "looks"],
      ["sounds", "and", "moves"],
    ],
    blurb: "The system this site is built on, drawn from its own tokens and components. Change a token and this page changes with it.",
  },
  voice: {
    do: [
      "Say what the machine does, then why it matters.",
      "Use numbers people can check: nine seconds, fourteen regions.",
      "Write like an engineer explaining it to a friend.",
    ],
    dont: [
      "Promise magic, revolutions or superpowers.",
      "Lead with the technology when the reader wants the outcome.",
      "Hide the price or the catch.",
    ],
  },
}
