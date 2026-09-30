/**
 * Every word on the page. Cirrus, its customers and its numbers are fictional.
 */

import type { ChipTone } from "@/components/ui/chip"

const pexels = (path: string, w = 1200) => `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=${w}`

export const brand = {
  name: "Cirrus",
  email: "hello@cirrus.dev",
  console: "#start",
}

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

export type Card = { title: string; body: string; image: string; alt: string; tags?: { label: string; tone: ChipTone }[] }

export const workloads: Card[] = [
  {
    title: "Monorepo, day one",
    body: "A forty-service repository, built and seeded before the new hire finds the coffee.",
    image: pexels("7062/man-people-space-desk.jpg"),
    alt: "An engineer working on a laptop at a long table against an orange wall",
  },
  {
    title: "A preview per pull request",
    body: "Every branch gets a live URL, its own database and a link waiting in the review.",
    image: pexels("17489152/pexels-photo-17489152.jpeg"),
    alt: "Three tower servers lit blue in a rack",
  },
  {
    title: "GPU notebooks",
    body: "Attach an accelerator for an experiment, detach it before the invoice notices.",
    image: pexels("18338417/pexels-photo-18338417.jpeg"),
    alt: "Two graphics cards lying on a bright yellow surface",
  },
  {
    title: "Agent sandboxes",
    body: "Throwaway machines for coding agents, with the network and the secrets fenced off.",
    image: pexels("10482131/pexels-photo-10482131.jpeg"),
    alt: "A small orange toy robot standing on the edge of a table",
  },
  {
    title: "Firmware builds",
    body: "Cross-compile toolchains that used to live on one engineer's desk, now on everyone's.",
    image: pexels("159220/printed-circuit-board-print-plate-via-macro-159220.jpeg"),
    alt: "A close view of a green circuit board and its chips",
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
  body: "The cloud holds the machine; you hold the editor. On a normal day that means most of the waiting disappears and the rest happens somewhere you are not looking.",
  steps: [
    { title: "Clone", body: "Point Cirrus at a repository and a branch. It reads the spec file and nothing else." },
    { title: "Boot", body: "A snapshot of the last good build wakes in about nine seconds, dependencies and all." },
    { title: "Build", body: "Compiles, tests and services run on hardware sized for the job, not for your bag." },
    { title: "Ship", body: "Share a preview URL, hand the branch to CI, and let the machine go back to sleep." },
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
  credits: "Photography from Pexels. Icons from Lucide. Cirrus and its customers are fictional.",
}
